/* Planet'Claim — couche d'exécution autonome (Supabase).
   Remplace l'environnement claude.ai (window.claude.use) :
     - 'db'     -> table public.docs (API collection/doc/onSnapshot reproduite, temps réel)
     - 'assets' -> Supabase Storage, compartiment privé "assets"
     - 'user'   -> Supabase Auth + rôles (table public.members)
   'mcp' (Gmail), 'sample' (IA) et 'comments' ne sont pas disponibles : l'application
   bascule d'elle-même sur ses solutions de repli (mailto, boutons masqués).
   Les droits sont appliqués par la base (supabase/schema.sql), pas seulement par l'écran. */
(function () {
  'use strict';
  const cfg = window.SUPABASE_CONFIG || {};
  if (!cfg.url || /A_REMPLIR/.test(cfg.url + cfg.anonKey)) {
    window.claude = { use: async () => null };
    const show = () => { const d = document.createElement('div'); d.style.cssText = 'position:fixed;inset:0;z-index:2147483646;background:#f1f6f7;display:flex;align-items:center;justify-content:center;font:15px sans-serif;padding:16px;text-align:center'; d.textContent = 'Configuration manquante : remplissez public/supabase-config.js (voir GUIDE.md, étape 3).'; document.body.appendChild(d); };
    if (document.body) show(); else document.addEventListener('DOMContentLoaded', show);
    return;
  }
  // Lien d'invitation ou de réinitialisation : on le repère avant que la bibliothèque ne nettoie l'adresse.
  const LM = /type=(recovery|invite)/.exec(location.hash), LINK = LM ? LM[1] : null;
  const sb = window.supabase.createClient(cfg.url, cfg.anonKey, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } });

  /* ---------- session ---------- */
  let SESSION = null; // {uid, email, role, name}
  let readyRes; const ready = new Promise(r => (readyRes = r));
  let booting = false, pwMode = LINK;

  async function boot(user) {
    if (booting || SESSION) return; booting = true;
    try {
      const email = (user.email || '').toLowerCase();
      const { data: m } = await sb.from('members').select('role,name').eq('email', email).maybeSingle();
      if (!m) return gate('Le compte ' + email + " n'est pas autorisé. Demandez à l'administrateur de vous ajouter.", true);
      const name = m.name || (user.user_metadata && (user.user_metadata.full_name || user.user_metadata.name)) || email;
      await sb.from('profiles').upsert({ uid: user.id, name, email, role: m.role, seen: Date.now() });
      if (pwMode) return gatePassword(user, () => { pwMode = null; booting = false; boot(user); });
      SESSION = { uid: user.id, email, role: m.role, name };
      ungate(); live(); readyRes(SESSION);
    } finally { booting = false; }
  }
  sb.auth.onAuthStateChange((ev, s) => {
    if (ev === 'PASSWORD_RECOVERY') pwMode = 'recovery';
    if (ev === 'SIGNED_OUT') { if (SESSION) location.reload(); else gate(); return; }
    if (s && s.user) setTimeout(() => boot(s.user), 0); // hors du rappel (recommandation supabase-js)
    else if (ev === 'INITIAL_SESSION') gate();
  });

  /* ---------- base : documents ---------- */
  const CACHE = new Map();              // col -> Map(id -> data)
  const LISTENERS = new Set();          // {col, id?, order?, lim?, cb, err}
  const colMap = c => { if (!CACHE.has(c)) CACHE.set(c, new Map()); return CACHE.get(c); };
  const clone = o => (o == null ? o : JSON.parse(JSON.stringify(o)));
  const META = { fromCache: false, hasPendingWrites: false };
  const split = p => { const s = String(p).split('/').filter(Boolean); if (s.length !== 2) throw new Error('Chemin invalide : ' + p); return s; };
  const fail = (e) => { const x = new Error(e.message || String(e)); x.code = e.code === '42501' || /row-level security|permission/i.test(e.message || '') ? 'permission-denied' : (e.code || 'unknown'); return x; };
  const rid = () => (crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + Math.random()).replace(/[^a-z0-9]/gi, '');

  const snapDoc = (col, id, data) => ({ id, exists: data !== undefined, metadata: META, ref: new DocRef(col, id), data: () => (data === undefined ? undefined : clone(data)) });
  function snapQuery(L) {
    let rows = [...colMap(L.col).entries()];
    if (L.order) { const [f, d] = L.order, k = d === 'desc' ? -1 : 1; rows.sort((a, b) => { const x = a[1] && a[1][f], y = b[1] && b[1][f]; return x === y ? 0 : (x === undefined ? 1 : y === undefined ? -1 : (x < y ? -k : k)); }); }
    if (L.lim) rows = rows.slice(0, L.lim);
    const docs = rows.map(([id, d]) => snapDoc(L.col, id, d));
    return { docs, empty: !docs.length, size: docs.length, metadata: META, forEach(f) { docs.forEach(f); } };
  }
  function emit(col, id) {
    for (const L of LISTENERS) {
      if (L.col !== col || (L.id && id && L.id !== id) || !L.loaded) continue;
      try { L.cb(L.id ? snapDoc(col, L.id, colMap(col).get(L.id)) : snapQuery(L)); } catch (e) { console.error(e); }
    }
  }
  const put = (col, id, data) => { if (data === undefined) colMap(col).delete(id); else colMap(col).set(id, data); emit(col, id); };

  async function fetchCol(col) {
    const out = new Map(); let from = 0;
    for (;;) {
      const { data, error } = await sb.from('docs').select('id,data').eq('col', col).order('id').range(from, from + 999);
      if (error) throw fail(error);
      data.forEach(r => out.set(r.id, r.data)); if (data.length < 1000) break; from += 1000;
    }
    CACHE.set(col, out); return out;
  }
  async function fetchDoc(col, id) {
    const { data, error } = await sb.from('docs').select('data').eq('col', col).eq('id', id).maybeSingle();
    if (error) throw fail(error);
    if (data) colMap(col).set(id, data.data); else colMap(col).delete(id);
    return data ? data.data : undefined;
  }
  async function load(L) {
    try { if (L.id) await fetchDoc(L.col, L.id); else await fetchCol(L.col); L.loaded = true; emit(L.col, L.id); }
    catch (e) { L.err && L.err(e); }
  }
  function listen(L) { LISTENERS.add(L); ready.then(() => load(L)); return () => LISTENERS.delete(L); }

  // Temps réel : un seul canal pour toute la table ; resynchronisation complète à chaque reconnexion.
  let chan = null, wasDown = false;
  function live() {
    chan = sb.channel('docs-all')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'docs' }, p => {
        if (p.eventType === 'DELETE') { const o = p.old || {}; if (o.col) put(o.col, o.id, undefined); }
        else if (p.new && p.new.col) put(p.new.col, p.new.id, p.new.data);
      })
      .subscribe(st => {
        if (st === 'SUBSCRIBED' && wasDown) { wasDown = false; LISTENERS.forEach(load); }
        if (st === 'CHANNEL_ERROR' || st === 'TIMED_OUT' || st === 'CLOSED') wasDown = true;
      });
    document.addEventListener('visibilitychange', () => { if (!document.hidden && wasDown) LISTENERS.forEach(load); });
  }

  class DocRef {
    constructor(col, id) { this.col = col; this.id = id; this.path = col + '/' + id; }
    async get() { await ready; return snapDoc(this.col, this.id, await fetchDoc(this.col, this.id)); }
    async set(d) {
      await ready;
      const data = clone(d == null ? {} : d);
      const { error } = await sb.from('docs').upsert({ col: this.col, id: this.id, data, ts: typeof data.ts === 'number' ? data.ts : null, updated_by: SESSION.uid, updated_at: new Date().toISOString() });
      if (error) throw fail(error);
      put(this.col, this.id, data); // affichage immédiat, sans attendre l'écho temps réel
    }
    async update(p) { const cur = await fetchDoc(this.col, this.id); if (cur === undefined) { const e = new Error('Document introuvable'); e.code = 'not-found'; throw e; } return this.set({ ...cur, ...p }); }
    async delete() {
      await ready;
      const { error } = await sb.from('docs').delete().eq('col', this.col).eq('id', this.id);
      if (error) throw fail(error);
      put(this.col, this.id, undefined);
    }
    onSnapshot(cb, err) { return listen({ col: this.col, id: this.id, cb, err }); }
  }
  class Query {
    constructor(col, order, lim) { this.col = col; this.id = col; this.path = col; this._o = order; this._l = lim; }
    doc(id) { return new DocRef(this.col, id || rid()); }
    async add(d) { const r = this.doc(); await r.set(d); return r; }
    async get() { await ready; const L = { col: this.col, order: this._o, lim: this._l }; await fetchCol(this.col); return snapQuery(L); }
    onSnapshot(cb, err) { return listen({ col: this.col, order: this._o, lim: this._l, cb, err }); }
    orderBy(f, d) { return new Query(this.col, [f, d || 'asc'], this._l); }
    limit(n) { return new Query(this.col, this._o, n); }
  }
  const DB = {
    doc: p => { const [c, i] = split(p); return new DocRef(c, i); },
    collection: c => { if (String(c).includes('/')) throw new Error('Sous-collections non prises en charge'); return new Query(c); }
  };

  /* ---------- fichiers ---------- */
  const ASSETS = {
    async upload(file, opts) {
      if (!SESSION || SESSION.role === 'cf') throw new Error('Envoi non autorisé');
      const id = rid(), type = (opts && opts.type) || file.type || 'application/octet-stream';
      const { error } = await sb.storage.from('assets').upload(id, file, { contentType: type, upsert: false });
      if (error) throw fail(error);
      return { id, sizeBytes: file.size, type };
    }
  };
  async function blobOf(id) {
    if (!/^[a-z0-9]{8,64}$/i.test(id)) throw new Error('Identifiant de fichier invalide');
    await ready;
    const { data, error } = await sb.storage.from('assets').download(id);
    if (error) throw new Error('Fichier inaccessible');
    return data;
  }
  // L'application utilise des liens "/_blob/<id>" : on les intercepte.
  const nativeFetch = window.fetch.bind(window);
  window.fetch = (u, o) => {
    const s = typeof u === 'string' ? u : (u && u.url) || '';
    const m = /^(?:https?:\/\/[^/]+)?\/_blob\/([^/?#]+)/.exec(s);
    if (m && (s.startsWith('/_blob/') || s.startsWith(location.origin + '/_blob/'))) return blobOf(m[1]).then(b => new Response(b, { status: 200, headers: { 'Content-Type': b.type } }));
    return nativeFetch(u, o);
  };
  document.addEventListener('click', e => {
    const a = e.target.closest && e.target.closest('a[href^="/_blob/"]');
    if (!a) return;
    e.preventDefault(); e.stopPropagation();
    const id = a.getAttribute('href').slice(7);
    const w = window.open('', '_blank');
    if (w) w.document.write('<p style="font:14px sans-serif;padding:20px">Ouverture du fichier…</p>');
    blobOf(id).then(b => { const u = URL.createObjectURL(b); if (w) w.location.href = u; else location.href = u; })
      .catch(x => { if (w) w.close(); alert(x.message); });
  }, true);

  /* ---------- utilisateur ---------- */
  const USER = {
    async me() { return { id: SESSION.uid, name: SESSION.name }; },
    async profiles(ids) {
      const out = {}, L = [...new Set(ids || [])].filter(x => /^[0-9a-f-]{36}$/i.test(x));
      if (L.length) { const { data } = await sb.from('profiles').select('uid,name').in('uid', L); (data || []).forEach(p => (out[p.uid] = { name: p.name })); }
      if (SESSION && (ids || []).includes(SESSION.uid)) out[SESSION.uid] = { name: SESSION.name };
      return out;
    },
    async search(q) {
      const n = String(q || '').replace(/[%_,()]/g, ' ').trim();
      const { data } = await sb.from('profiles').select('uid,name,email').or(`name.ilike.%${n}%,email.ilike.%${n}%`).limit(20);
      return (data || []).map(p => ({ id: p.uid, name: p.name || p.email }));
    },
    async canEdit() { return SESSION.role === 'admin'; },
    async isOwner() { return SESSION.role === 'admin'; },
    async can(p) { return p === 'data.write' ? (SESSION.role === 'admin' || SESSION.role === 'staff') : SESSION.role === 'admin'; }
  };

  window.claude = {
    async use(name) {
      await ready;
      if (name === 'db') return DB;
      if (name === 'assets') return SESSION.role === 'cf' ? null : ASSETS;
      if (name === 'user') return USER;
      return null; // mcp, sample, comments : non disponibles hors claude.ai
    }
  };
  window.PCRT = { sb, ready, session: () => SESSION, signOut: () => sb.auth.signOut() };

  /* ---------- écrans de connexion ---------- */
  const CSS = `#pcg{position:fixed;inset:0;z-index:2147483646;display:flex;align-items:center;justify-content:center;background:var(--bg,#f1f6f7);color:var(--ink,#0b2530);font:14px/1.5 Poppins,system-ui,sans-serif;padding:16px}
#pcg form{width:min(380px,100%);background:var(--sf,#fff);border:1px solid var(--ln,#d3e1e5);border-radius:8px;padding:28px}
#pcg h1{font:600 24px/1.2 "Playfair Display",Georgia,serif;margin:0 0 4px}#pcg p{margin:0 0 16px;color:var(--mut,#52707b)}
#pcg label{display:block;margin:0 0 12px;font-size:13px}#pcg input{width:100%;padding:9px 12px;border:1px solid var(--ln,#d3e1e5);border-radius:6px;background:var(--sf,#fff);color:inherit;font:inherit;margin-top:4px}
#pcg button{width:100%;padding:10px;border-radius:6px;border:1px solid var(--ac,#12475b);background:var(--ac,#12475b);color:var(--onac,#fff);font:500 14px Poppins,system-ui,sans-serif;cursor:pointer;margin-top:4px}
#pcg button.s{background:transparent;color:var(--ac,#12475b)}#pcg .lk{background:none;border:0;color:var(--ac,#12475b);padding:6px 0;text-decoration:underline;width:auto}
#pcg .er{color:var(--ko,#722f45);min-height:1.5em;margin:10px 0 0}#pcg .or{text-align:center;margin:12px 0;color:var(--na,#8aa3ab);font-size:12px}
#pcout{position:fixed;left:12px;bottom:12px;z-index:2147483000;display:flex;gap:4px}#pcout button{border:1px solid var(--ln,#d3e1e5);background:var(--sf,#fff);color:var(--mut,#52707b);border-radius:20px;padding:4px 12px;font:12px Poppins,system-ui,sans-serif;cursor:pointer;opacity:.85}
#pcout button:hover{opacity:1;color:var(--ac,#12475b)}`;
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  function whenBody(f) { if (document.body) f(); else document.addEventListener('DOMContentLoaded', f); }
  function box(html) {
    let g = document.getElementById('pcg');
    if (!g) { if (!document.getElementById('pcg-css')) { const s = document.createElement('style'); s.id = 'pcg-css'; s.textContent = CSS; document.head.appendChild(s); } g = document.createElement('div'); g.id = 'pcg'; document.body.appendChild(g); }
    g.innerHTML = html; return g;
  }
  const ERR = { 'Invalid login credentials': 'E-mail ou mot de passe incorrect.', 'Email not confirmed': 'E-mail pas encore confirmé : utilisez le lien reçu.', 'Signups not allowed for this instance': "Ce compte n'existe pas : demandez à l'administrateur de vous créer un accès." };
  const msg = e => ERR[e.message] || (/rate limit/i.test(e.message) ? 'Trop de tentatives : réessayez dans quelques minutes.' : 'Erreur : ' + e.message);
  function gate(text, signedIn) {
    whenBody(() => {
      const g = box(`<form autocomplete="on"><h1>Planet’Claim</h1><p>Suivi des sinistres — accès réservé.</p>
${signedIn ? '<button type="button" id="pcg-x">Changer de compte</button>' : `<button type="button" id="pcg-go" class="s">Se connecter avec Google</button><div class="or">ou</div>
<label>E-mail<input id="pcg-e" type="email" autocomplete="username" required></label>
<label>Mot de passe<input id="pcg-p" type="password" autocomplete="current-password" required></label>
<button type="submit">Se connecter</button><button type="button" class="lk" id="pcg-r">Mot de passe oublié ?</button>`}
<p class="er" id="pcg-m">${text ? esc(text) : ''}</p></form>`);
      const m = t => (g.querySelector('#pcg-m').textContent = t);
      g.querySelector('form').onsubmit = async e => { e.preventDefault(); m(''); const { error } = await sb.auth.signInWithPassword({ email: g.querySelector('#pcg-e').value.trim(), password: g.querySelector('#pcg-p').value }); if (error) m(msg(error)); };
      const go = g.querySelector('#pcg-go'); if (go) go.onclick = async () => { const { error } = await sb.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: location.origin + location.pathname } }); if (error) m(msg(error)); };
      const r = g.querySelector('#pcg-r'); if (r) r.onclick = async () => { const e = g.querySelector('#pcg-e').value.trim(); if (!e) return m('Saisissez votre e-mail puis recliquez.'); const { error } = await sb.auth.resetPasswordForEmail(e, { redirectTo: location.origin + location.pathname }); m(error ? msg(error) : 'Si ce compte existe, un e-mail vient d’être envoyé.'); };
      const x = g.querySelector('#pcg-x'); if (x) x.onclick = () => sb.auth.signOut();
    });
  }
  function gatePassword(user, done, cancellable) {
    whenBody(() => {
      const g = box(`<form><h1>${cancellable ? 'Changer mon mot de passe' : 'Choisissez votre mot de passe'}</h1><p>${esc(user.email)}</p>
<label>Nouveau mot de passe (10 caractères minimum)<input id="pcg-n" type="password" autocomplete="new-password" minlength="10" required></label>
<label>Confirmation<input id="pcg-c" type="password" autocomplete="new-password" minlength="10" required></label>
<button type="submit">Enregistrer</button>${cancellable ? '<button type="button" class="lk" id="pcg-k">Annuler</button>' : ''}<p class="er" id="pcg-m"></p></form>`);
      const m = t => (g.querySelector('#pcg-m').textContent = t);
      g.querySelector('form').onsubmit = async e => {
        e.preventDefault(); const a = g.querySelector('#pcg-n').value;
        if (a !== g.querySelector('#pcg-c').value) return m('Les deux saisies sont différentes.');
        const { error } = await sb.auth.updateUser({ password: a }); if (error) return m(msg(error));
        g.remove(); done();
      };
      const k = g.querySelector('#pcg-k'); if (k) k.onclick = () => g.remove();
    });
  }
  function ungate() {
    whenBody(() => {
      const g = document.getElementById('pcg'); if (g) g.remove();
      if (document.getElementById('pcout')) return;
      const d = document.createElement('div'); d.id = 'pcout';
      d.innerHTML = '<button type="button" id="pco-pw">Mot de passe</button><button type="button" id="pco-x">Déconnexion</button>';
      d.title = SESSION.email; document.body.appendChild(d);
      d.querySelector('#pco-pw').onclick = () => gatePassword({ email: SESSION.email }, () => alert('Mot de passe modifié.'), true);
      d.querySelector('#pco-x').onclick = () => sb.auth.signOut();
      if (!document.getElementById('pcg-css')) { const s = document.createElement('style'); s.id = 'pcg-css'; s.textContent = CSS; document.head.appendChild(s); }
    });
  }
  // Masque l'application tant que la session n'est pas prête.
  whenBody(() => { if (!SESSION) box('<form><p>Chargement…</p></form>'); });
})();
