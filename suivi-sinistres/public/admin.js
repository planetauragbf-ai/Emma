/* Page d'administration : membres, import, sauvegarde. Réservée au rôle admin (vérifié aussi par la base). */
(async function () {
  if (!window.PCRT) return;
  const { sb } = PCRT;
  const S = await PCRT.ready;
  const $ = s => document.querySelector(s);
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const log = t => { $('#log').textContent += t + '\n'; };
  $('#who').textContent = 'Connecté : ' + S.email + ' (' + S.role + ')';
  if (S.role !== 'admin') { document.querySelectorAll('section').forEach(s => s.remove()); $('main').insertAdjacentHTML('beforeend', '<section><p>Cette page est réservée aux administrateurs.</p></section>'); return; }

  /* ---------- membres ---------- */
  async function members() {
    const { data, error } = await sb.from('members').select('*').order('email');
    if (error) return log('Lecture des membres impossible : ' + error.message);
    $('#mem').innerHTML = data.map(m => `<tr><td>${esc(m.email)}</td><td>${esc(m.name)}</td><td>${esc(m.role)}</td><td>${m.email === S.email ? '<span class="m">vous</span>' : `<button class="d" data-rm="${esc(m.email)}">Retirer</button>`}</td></tr>`).join('');
  }
  members();
  $('#add').onsubmit = async e => {
    e.preventDefault();
    const { error } = await sb.from('members').upsert({ email: $('#a-e').value.trim().toLowerCase(), role: $('#a-r').value, name: $('#a-n').value.trim(), added: Date.now() });
    if (error) return alert('Ajout impossible : ' + error.message);
    $('#add').reset(); members();
  };
  document.addEventListener('click', async e => {
    const id = e.target.dataset && e.target.dataset.rm;
    if (!id || !confirm('Retirer l’accès de ' + id + ' ?')) return;
    const { error } = await sb.from('members').delete().eq('email', id);
    if (error) alert(error.message); else members();
  });

  /* ---------- écriture par lots ---------- */
  const COLS = ['dossiers', 'mails', 'pots', 'docs', 'compta', 'balancier', 'logs', 'team', 'config', 'cf_share'];
  async function writeAll(items, overwrite) { // items: [{col,id,data}]
    let n = 0, skip = 0;
    for (let i = 0; i < items.length; i += 200) {
      const part = items.slice(i, i + 200);
      const rows = part.filter(x => x.col !== 'members').map(x => ({ col: x.col, id: String(x.id), data: x.data, ts: x.data && typeof x.data.ts === 'number' ? x.data.ts : null, updated_by: S.uid }));
      const mem = part.filter(x => x.col === 'members').map(x => ({ email: String(x.id).toLowerCase(), role: x.data.role, name: x.data.name || '', added: x.data.added || Date.now() }));
      if (rows.length) {
        const q = sb.from('docs').upsert(rows, { onConflict: 'col,id', ignoreDuplicates: !overwrite, count: 'exact' });
        const { error, count } = await q;
        if (error) throw error;
        const w = count == null ? rows.length : count; n += w; skip += rows.length - w;
      }
      if (mem.length) { const { error } = await sb.from('members').upsert(mem, { ignoreDuplicates: !overwrite }); if (error) throw error; n += mem.length; }
      log('… ' + Math.min(i + 200, items.length) + ' / ' + items.length);
    }
    return { n, skip };
  }

  /* ---------- import des dossiers embarqués dans l'HTML claude.ai ---------- */
  $('#b-html').onclick = async () => {
    const f = $('#f-html').files[0]; if (!f) return alert('Choisissez le fichier HTML.');
    const s = await f.text(), k = s.indexOf('const SEED=');
    if (k < 0) return log('Aucune donnée SEED trouvée dans ce fichier.');
    let seed;
    try { seed = parseJsonPrefix(s.slice(k + 11)); } catch (x) { return log('Lecture impossible : ' + x.message); }
    log(seed.length + ' dossiers trouvés.');
    try { const r = await writeAll(seed.filter(d => d && d.id).map(d => ({ col: 'dossiers', id: d.id, data: d })), false); log('Terminé : ' + r.n + ' ajoutés, ' + r.skip + ' déjà présents.'); }
    catch (x) { log('Erreur : ' + x.message); }
  };
  function parseJsonPrefix(t) { // lit un tableau JSON en tête de chaîne
    let d = 0, q = false, e = false;
    for (let i = 0; i < t.length; i++) {
      const c = t[i];
      if (q) { if (e) e = false; else if (c === '\\') e = true; else if (c === '"') q = false; continue; }
      if (c === '"') q = true; else if (c === '[' || c === '{') d++; else if (c === ']' || c === '}') { d--; if (!d) return JSON.parse(t.slice(0, i + 1)); }
    }
    throw new Error('tableau incomplet');
  }

  /* ---------- restauration JSON ---------- */
  $('#b-json').onclick = async () => {
    const f = $('#f-json').files[0]; if (!f) return alert('Choisissez le fichier JSON.');
    let j; try { j = JSON.parse(await f.text()); } catch (x) { return log('JSON invalide.'); }
    const C = j.collections || {}, items = [];
    Object.keys(C).forEach(col => { if (!/^[a-z_]{1,40}$/.test(col) || col === 'profiles') return; Object.keys(C[col]).forEach(id => items.push({ col, id, data: C[col][id] })); });
    if (!items.length) return log('Aucun document dans ce fichier.');
    if (!confirm(items.length + ' documents à restaurer' + ($('#ow').checked ? ' (en écrasant l’existant)' : '') + '. Continuer ?')) return;
    try { const r = await writeAll(items, $('#ow').checked); log('Terminé : ' + r.n + ' écrits, ' + r.skip + ' ignorés (déjà présents).'); }
    catch (x) { log('Erreur : ' + x.message); }
  };

  /* ---------- export ---------- */
  $('#b-exp').onclick = async () => {
    const out = { app: 'planet-claim', version: 1, exported: new Date().toISOString(), collections: {} };
    for (let from = 0; ; from += 1000) {
      const { data, error } = await sb.from('docs').select('col,id,data').order('col').order('id').range(from, from + 999);
      if (error) return alert('Export impossible : ' + error.message);
      data.forEach(r => ((out.collections[r.col] = out.collections[r.col] || {})[r.id] = r.data));
      if (data.length < 1000) break;
    }
    const { data: m } = await sb.from('members').select('*');
    out.collections.members = {}; (m || []).forEach(x => (out.collections.members[x.email] = { role: x.role, name: x.name, added: x.added }));
    COLS.forEach(c => (out.collections[c] = out.collections[c] || {}));
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([JSON.stringify(out, null, 1)], { type: 'application/json' }));
    a.download = 'sauvegarde-sinistres-' + new Date().toISOString().slice(0, 10) + '.json';
    document.body.appendChild(a); a.click(); a.remove();
  };
})();
