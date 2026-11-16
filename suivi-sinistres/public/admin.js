/* Page d'administration : membres, import, sauvegarde. Réservée au rôle admin (vérifié aussi par firestore.rules). */
(async function () {
  if (!window.PCRT) return;
  const { fs, enc, dec } = PCRT;
  const S = await PCRT.ready;
  const $ = s => document.querySelector(s);
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const log = t => { $('#log').textContent += t + '\n'; };
  $('#who').textContent = 'Connecté : ' + S.email + ' (' + S.role + ')';
  if (S.role !== 'admin') { document.querySelector('main').innerHTML += '<section><p>Cette page est réservée aux administrateurs.</p></section>'; document.querySelectorAll('section').forEach((s, i, a) => { if (i < a.length - 1) s.remove(); }); return; }

  // Collections utilisées par l'application
  const COLS = ['dossiers', 'mails', 'pots', 'docs', 'compta', 'balancier', 'logs', 'team', 'config', 'cf_share'];

  /* ---------- membres ---------- */
  fs.collection('members').onSnapshot(s => {
    $('#mem').innerHTML = s.docs.map(d => { const m = d.data(); return `<tr><td>${esc(d.id)}</td><td>${esc(m.name)}</td><td>${esc(m.role)}</td><td>${d.id === S.email ? '<span class="m">vous</span>' : `<button class="d" data-rm="${esc(d.id)}">Retirer</button>`}</td></tr>`; }).join('');
  }, e => log('Lecture des membres impossible : ' + e.code));
  $('#add').onsubmit = async e => {
    e.preventDefault();
    const em = $('#a-e').value.trim().toLowerCase();
    try { await fs.doc('members/' + em).set({ role: $('#a-r').value, name: $('#a-n').value.trim(), added: Date.now() }); $('#add').reset(); }
    catch (x) { alert('Ajout impossible : ' + x.code); }
  };
  document.addEventListener('click', async e => {
    const id = e.target.dataset && e.target.dataset.rm;
    if (id && confirm('Retirer l’accès de ' + id + ' ?')) { try { await fs.doc('members/' + id).delete(); } catch (x) { alert(x.code); } }
  });

  /* ---------- écriture par lots ---------- */
  async function writeAll(items, overwrite) { // items: [{col,id,data}]
    let n = 0, skip = 0;
    for (let i = 0; i < items.length; i += 200) {
      const part = items.slice(i, i + 200);
      let keep = part;
      if (!overwrite) {
        const ex = await Promise.all(part.map(x => fs.doc(x.col + '/' + x.id).get().then(s => s.exists)));
        keep = part.filter((_, k) => !ex[k]); skip += part.length - keep.length;
      }
      const b = fs.batch();
      keep.forEach(x => b.set(fs.doc(x.col + '/' + x.id), x.col === 'members' ? x.data : enc(x.data)));
      if (keep.length) await b.commit();
      n += keep.length; log('… ' + (n + skip) + ' / ' + items.length);
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
    try { const r = await writeAll(seed.filter(d => d && d.id).map(d => ({ col: 'dossiers', id: String(d.id), data: d })), false); log('Terminé : ' + r.n + ' ajoutés, ' + r.skip + ' déjà présents.'); }
    catch (x) { log('Erreur : ' + (x.code || x.message)); }
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
    Object.keys(C).forEach(col => { if (!/^[a-z_]+$/i.test(col) || col === 'profiles') return; Object.keys(C[col]).forEach(id => items.push({ col, id, data: C[col][id] })); });
    if (!items.length) return log('Aucun document dans ce fichier.');
    if (!confirm(items.length + ' documents à restaurer' + ($('#ow').checked ? ' (en écrasant l’existant)' : '') + '. Continuer ?')) return;
    try { const r = await writeAll(items, $('#ow').checked); log('Terminé : ' + r.n + ' écrits, ' + r.skip + ' ignorés (déjà présents).'); }
    catch (x) { log('Erreur : ' + (x.code || x.message)); }
  };

  /* ---------- export ---------- */
  $('#b-exp').onclick = async () => {
    const out = { app: 'planet-claim', version: 1, exported: new Date().toISOString(), collections: {} };
    for (const c of [...COLS, 'members']) {
      const s = await fs.collection(c).get();
      out.collections[c] = {}; s.docs.forEach(d => (out.collections[c][d.id] = c === 'members' ? d.data() : dec(d.data())));
    }
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([JSON.stringify(out, null, 1)], { type: 'application/json' }));
    a.download = 'sauvegarde-sinistres-' + new Date().toISOString().slice(0, 10) + '.json';
    document.body.appendChild(a); a.click(); a.remove();
  };
})();
