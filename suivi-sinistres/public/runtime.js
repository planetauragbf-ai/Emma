/* Planet'Claim — couche d'exécution autonome.
   Remplace l'environnement claude.ai (window.claude.use) par Firebase :
     - 'db'     -> Cloud Firestore (même API collection/doc/onSnapshot)
     - 'assets' -> Cloud Storage (fichiers joints, lus avec le jeton de connexion)
     - 'user'   -> Firebase Authentication + rôles (collection members)
   'mcp' (Gmail), 'sample' (IA) et 'comments' ne sont pas disponibles : l'application
   bascule d'elle-même sur ses solutions de repli (mailto, boutons masqués).
   Rien n'est accessible tant que l'utilisateur n'est pas connecté ET inscrit dans members. */
(function () {
  'use strict';
  const cfg = window.FIREBASE_CONFIG;
  if (!cfg || !cfg.apiKey || cfg.apiKey === 'A_REMPLIR') {
    window.claude = { use: async () => null };
    const show = () => { const d = document.createElement('div'); d.style.cssText = 'position:fixed;inset:0;z-index:2147483646;background:#f1f6f7;display:flex;align-items:center;justify-content:center;font:15px sans-serif;padding:16px;text-align:center'; d.textContent = 'Configuration manquante : remplissez public/firebase-config.js (voir GUIDE.md, étape 3).'; document.body.appendChild(d); };
    if (document.body) show(); else document.addEventListener('DOMContentLoaded', show);
    return;
  }
  firebase.initializeApp(cfg);
  const auth = firebase.auth();
  const fs = firebase.firestore();
  fs.settings({ ignoreUndefinedProperties: true });
  const st = firebase.storage();
  auth.languageCode = 'fr';
  // Tests locaux uniquement (émulateurs Firebase) : window.FIREBASE_EMULATORS = true dans firebase-config.js
  const EMU = window.FIREBASE_EMULATORS === true && /^(localhost|127\.0\.0\.1)$/.test(location.hostname);
  if (EMU) { auth.useEmulator('http://127.0.0.1:9099'); fs.useEmulator('127.0.0.1', 8080); st.useEmulator('127.0.0.1', 9199); }
  const STORAGE_API = EMU ? 'http://127.0.0.1:9199' : 'https://firebasestorage.googleapis.com';

  /* ---------- session ---------- */
  let SESSION = null; // {user, role, name, email}
  let readyRes; const ready = new Promise(r => (readyRes = r));
  const ROLES = ['admin', 'staff', 'cf'];

  auth.onAuthStateChanged(async u => {
    if (!u) { if (SESSION) location.reload(); return gate(); }
    if (!u.emailVerified) return gateVerify(u);
    const email = (u.email || '').toLowerCase();
    let m = null;
    try { const s = await fs.doc('members/' + email).get(); m = s.exists ? s.data() : null; } catch (e) { m = null; }
    if (!m || !ROLES.includes(m.role)) return gate('Le compte ' + email + " n'est pas autorisé. Demandez à l'administrateur de vous ajouter.", true);
    SESSION = { user: u, role: m.role, name: m.name || u.displayName || email, email };
    try { await fs.doc('profiles/' + u.uid).set({ name: SESSION.name, email, role: m.role, seen: Date.now() }); } catch (e) {}
    ungate(); readyRes(SESSION);
  });

  /* ---------- encodage : chaque document est stocké en JSON (_j) ----------
     Évite les limites Firestore (tableaux imbriqués, valeurs undefined) et restitue
     exactement l'objet écrit par l'application. 'ts' est recopié pour orderBy(). */
  const enc = d => { const o = { _j: JSON.stringify(d == null ? {} : d), _u: SESSION ? SESSION.user.uid : '', _at: Date.now() }; if (d && typeof d.ts === 'number') o.ts = d.ts; return o; };
  const dec = raw => (raw && typeof raw._j === 'string') ? JSON.parse(raw._j) : raw;

  const wDoc = s => ({ id: s.id, exists: s.exists, ref: new DocRef(s.ref), metadata: s.metadata, data: () => (s.exists ? dec(s.data()) : undefined) });
  const wQuery = q => ({ docs: q.docs.map(wDoc), empty: q.empty, size: q.size, metadata: q.metadata, forEach(f) { this.docs.forEach(f); } });

  class DocRef {
    constructor(r) { this._r = r; this.id = r.id; this.path = r.path; }
    async get() { return wDoc(await this._r.get()); }
    set(d) { return this._r.set(enc(d)); }
    async update(p) {
      return fs.runTransaction(async t => { const s = await t.get(this._r); const cur = s.exists ? dec(s.data()) : {}; t.set(this._r, enc({ ...cur, ...p })); });
    }
    delete() { return this._r.delete(); }
    onSnapshot(next, err) { return this._r.onSnapshot(s => next(wDoc(s)), err); }
    collection(p) { return new Query(this._r.collection(p)); }
  }
  class Query {
    constructor(q) { this._q = q; this.id = q.id; this.path = q.path; }
    doc(id) { return new DocRef(id ? this._q.doc(id) : this._q.doc()); }
    async add(d) { const r = this._q.doc(); await r.set(enc(d)); return new DocRef(r); }
    async get() { return wQuery(await this._q.get()); }
    onSnapshot(next, err) { return this._q.onSnapshot(s => next(wQuery(s)), err); }
    orderBy(f, dir) { return new Query(this._q.orderBy(f, dir)); }
    limit(n) { return new Query(this._q.limit(n)); }
  }
  const DB = { doc: p => new DocRef(fs.doc(p)), collection: p => new Query(fs.collection(p)) };

  /* ---------- fichiers ---------- */
  const rid = () => (crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + Math.random()).replace(/[^a-z0-9]/gi, '');
  const ASSETS = {
    async upload(file, opts) {
      if (!SESSION || SESSION.role === 'cf') throw new Error('Envoi non autorisé');
      const id = rid(), type = (opts && opts.type) || file.type || 'application/octet-stream';
      const meta = { contentType: type, customMetadata: { name: (file.name || 'fichier').slice(0, 200), by: SESSION.user.uid } };
      await st.ref('assets/' + id).put(file, meta);
      return { id, sizeBytes: file.size, type };
    }
  };
  async function blobOf(id) {
    if (!/^[a-z0-9]{8,64}$/i.test(id)) throw new Error('Identifiant de fichier invalide');
    await ready;
    const tok = await auth.currentUser.getIdToken();
    const url = STORAGE_API + '/v0/b/' + encodeURIComponent(cfg.storageBucket) + '/o/' + encodeURIComponent('assets/' + id) + '?alt=media';
    const r = await fetch(url, { headers: { Authorization: 'Firebase ' + tok } });
    if (!r.ok) throw new Error('Fichier inaccessible (' + r.status + ')');
    return r.blob();
  }
  // L'application utilise des liens "/_blob/<id>" : on les intercepte.
  const nativeFetch = window.fetch.bind(window);
  window.fetch = (u, o) => {
    const s = typeof u === 'string' ? u : (u && u.url) || '';
    const m = /\/_blob\/([^/?#]+)/.exec(s);
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
    async me() { return { id: SESSION.user.uid, name: SESSION.name }; },
    async profiles(ids) {
      const out = {};
      await Promise.all([...new Set(ids || [])].filter(Boolean).map(async id => {
        try { const s = await fs.doc('profiles/' + id).get(); if (s.exists) out[id] = { name: s.data().name || '' }; } catch (e) {}
      }));
      if (SESSION && ids && ids.includes(SESSION.user.uid)) out[SESSION.user.uid] = { name: SESSION.name };
      return out;
    },
    async search(q) {
      const n = String(q || '').toLowerCase();
      try { const s = await fs.collection('profiles').get(); return s.docs.map(d => ({ id: d.id, ...d.data() })).filter(p => (p.name + ' ' + p.email).toLowerCase().includes(n)).slice(0, 20).map(p => ({ id: p.id, name: p.name || p.email })); }
      catch (e) { return []; }
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
  window.PCRT = { auth, fs, enc, dec, ready, session: () => SESSION, signOut: () => auth.signOut() };

  /* ---------- écran de connexion ---------- */
  const CSS = `#pcg{position:fixed;inset:0;z-index:2147483646;display:flex;align-items:center;justify-content:center;background:var(--bg,#f1f6f7);color:var(--ink,#0b2530);font:14px/1.5 Poppins,system-ui,sans-serif;padding:16px}
#pcg form{width:min(380px,100%);background:var(--sf,#fff);border:1px solid var(--ln,#d3e1e5);border-radius:8px;padding:28px}
#pcg h1{font:600 24px/1.2 "Playfair Display",Georgia,serif;margin:0 0 4px}#pcg p{margin:0 0 16px;color:var(--mut,#52707b)}
#pcg label{display:block;margin:0 0 12px;font-size:13px}#pcg input{width:100%;padding:9px 12px;border:1px solid var(--ln,#d3e1e5);border-radius:6px;background:var(--sf,#fff);color:inherit;font:inherit;margin-top:4px}
#pcg button{width:100%;padding:10px;border-radius:6px;border:1px solid var(--ac,#12475b);background:var(--ac,#12475b);color:var(--onac,#fff);font:500 14px Poppins,system-ui,sans-serif;cursor:pointer;margin-top:4px}
#pcg button.s{background:transparent;color:var(--ac,#12475b)}#pcg .lk{background:none;border:0;color:var(--ac,#12475b);padding:6px 0;text-decoration:underline;width:auto}
#pcg .er{color:var(--ko,#722f45);min-height:1.5em;margin:10px 0 0}#pcg .or{text-align:center;margin:12px 0;color:var(--na,#8aa3ab);font-size:12px}
#pcout{position:fixed;left:12px;bottom:12px;z-index:2147483000;border:1px solid var(--ln,#d3e1e5);background:var(--sf,#fff);color:var(--mut,#52707b);border-radius:20px;padding:4px 12px;font:12px Poppins,system-ui,sans-serif;cursor:pointer;opacity:.85}
#pcout:hover{opacity:1;color:var(--ko,#722f45)}`;
  function box(html) {
    let g = document.getElementById('pcg');
    if (!g) { const s = document.createElement('style'); s.textContent = CSS; document.head.appendChild(s); g = document.createElement('div'); g.id = 'pcg'; document.body.appendChild(g); }
    g.innerHTML = html; g.hidden = false; return g;
  }
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  function whenBody(f) { if (document.body) f(); else document.addEventListener('DOMContentLoaded', f); }
  function gate(msg, signedIn) {
    whenBody(() => {
      const g = box(`<form autocomplete="on"><h1>Planet’Claim</h1><p>Suivi des sinistres — accès réservé.</p>
${signedIn ? '' : `<button type="button" id="pcg-go" class="s">Se connecter avec Google</button><div class="or">ou</div>
<label>E-mail<input id="pcg-e" type="email" autocomplete="username" required></label>
<label>Mot de passe<input id="pcg-p" type="password" autocomplete="current-password" required></label>
<button type="submit">Se connecter</button><button type="button" class="lk" id="pcg-r">Mot de passe oublié ?</button>`}
${signedIn ? '<button type="button" id="pcg-x">Changer de compte</button>' : ''}<p class="er" id="pcg-m">${msg ? esc(msg) : ''}</p></form>`);
      const m = t => (g.querySelector('#pcg-m').textContent = t);
      const err = x => m(({ 'auth/invalid-credential': 'E-mail ou mot de passe incorrect.', 'auth/wrong-password': 'E-mail ou mot de passe incorrect.', 'auth/user-not-found': 'E-mail ou mot de passe incorrect.', 'auth/too-many-requests': 'Trop de tentatives : réessayez dans quelques minutes.', 'auth/popup-closed-by-user': 'Connexion annulée.' })[x.code] || 'Connexion impossible (' + (x.code || x.message) + ')');
      g.querySelector('form').onsubmit = e => { e.preventDefault(); m(''); auth.signInWithEmailAndPassword(g.querySelector('#pcg-e').value.trim(), g.querySelector('#pcg-p').value).catch(err); };
      const go = g.querySelector('#pcg-go'); if (go) go.onclick = () => auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).catch(err);
      const r = g.querySelector('#pcg-r'); if (r) r.onclick = () => { const e = g.querySelector('#pcg-e').value.trim(); if (!e) return m('Saisissez votre e-mail puis recliquez.'); auth.sendPasswordResetEmail(e).then(() => m('Si ce compte existe, un e-mail de réinitialisation vient d’être envoyé.')).catch(err); };
      const x = g.querySelector('#pcg-x'); if (x) x.onclick = () => auth.signOut();
    });
  }
  function gateVerify(u) {
    whenBody(() => {
      const g = box(`<form><h1>Vérifiez votre e-mail</h1><p>Un lien de confirmation doit être validé pour ${esc(u.email)} avant le premier accès.</p>
<button type="button" id="pcg-s">Envoyer le lien</button><button type="button" class="s" id="pcg-ok">J’ai cliqué sur le lien</button><button type="button" class="lk" id="pcg-x">Changer de compte</button><p class="er" id="pcg-m"></p></form>`);
      const m = t => (g.querySelector('#pcg-m').textContent = t);
      g.querySelector('#pcg-s').onclick = () => u.sendEmailVerification().then(() => m('Lien envoyé : consultez votre boîte mail.')).catch(x => m(x.code === 'auth/too-many-requests' ? 'Lien déjà envoyé, patientez.' : x.message));
      g.querySelector('#pcg-ok').onclick = async () => { await u.reload(); await u.getIdToken(true); if (auth.currentUser.emailVerified) location.reload(); else m('Pas encore vérifié.'); };
      g.querySelector('#pcg-x').onclick = () => auth.signOut();
    });
  }
  function ungate() {
    whenBody(() => {
      const g = document.getElementById('pcg'); if (g) g.remove();
      if (!document.getElementById('pcout')) { const b = document.createElement('button'); b.id = 'pcout'; b.type = 'button'; b.textContent = 'Déconnexion'; b.title = SESSION.email; b.onclick = () => auth.signOut(); document.body.appendChild(b); }
    });
  }
  // Masque l'application tant que la session n'est pas prête.
  whenBody(() => { if (!SESSION) box('<form><p>Chargement…</p></form>'); });
})();
