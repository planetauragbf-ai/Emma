// Dossier d'investissement ExportPilot 360 — 30 pages (CDC Bloc 3 : deck de 25 à 30 pages).
import { C, M, RES, COL, kfmt, page, logoMark, wordmark, stackedBars, lineChart, hbars, shareBar, monthLabels, n0, eur, keur, keur1, pct, signed, ks } from "./lib.mjs";

const T = 30;
const P = (n, body, o = {}) => page(body, { n, total: T, ...o });
const y = (k, c) => C[k][c];
const PROJ = "Projections non auditées — hypothèses détaillées dans le modèle financier";

// --------------------------------------------------------------------------- composants
const head = (kicker, title, lead) => `<div class="kicker">${kicker}</div><h1>${title}</h1>${lead ? `<p class="lead">${lead}</p>` : ""}`;
const stat = (v, l, src, cls = "") => `<div><div class="stat ${cls}">${v}</div><div class="statlbl">${l}</div>${src ? `<div class="src">${src}</div>` : ""}</div>`;
const takeaway = (t) => `<div style="position:absolute;left:64px;right:64px;bottom:58px;display:flex;align-items:center;gap:14px;background:${COL.ink};color:#fff;border-radius:12px;padding:16px 22px"><span class="tag" style="background:${COL.brass};color:${COL.ink}">À retenir</span><span style="font-size:16.5px;font-weight:600">${t}</span></div>`;
const phone = (inner, label = "") => `<div style="text-align:center"><div class="phone"><div class="scr">${inner}</div></div>${label ? `<div class="small" style="margin-top:10px;font-weight:600">${label}</div>` : ""}</div>`;

// --------------------------------------------------------------------------- pages
export function deckSlides() {
  const S = [];

  // 1 — Couverture
  S.push(page(`
    <div style="position:absolute;inset:0;background:radial-gradient(circle at 85% 20%,#3a2133 0,${COL.ink} 55%)"></div>
    <div style="position:absolute;right:-120px;top:-120px;opacity:.10">${logoMark(620, true)}</div>
    <div style="position:relative;display:flex;flex-direction:column;height:100%;justify-content:space-between">
      <div style="display:flex;align-items:center;gap:14px">${logoMark(54, true)}${wordmark(34, true)}</div>
      <div>
        <div class="kicker">Dossier d'investissement · Pré-amorçage · 2026</div>
        <h1 style="font-size:58px;max-width:900px">Vendez au monde entier<br><em>depuis votre caveau.</em></h1>
        <p class="lead" style="max-width:760px">La plateforme qui transforme chaque visiteur étranger d'un domaine viticole en client international récurrent, avec des partenaires logistiques spécialisés.</p>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:flex-end" class="small">
        <div>[Prénom Nom], fondatrice · Mastère Marketing &amp; Digital Business, Euridis Business School<br>Projet de création d'entreprise — Bloc 3</div>
        <div style="text-align:right;color:#bdb4c4">Document confidentiel · Les visuels produit sont des <b>concepts</b><br>Aucune donnée client réelle : chiffres sourcés ou hypothèses explicites</div>
      </div>
    </div>`, { theme: "dark" }));

  // 2 — L'essentiel
  S.push(P(2, `
    ${head("L'essentiel en une page", "Un problème réel, une réponse <em>focalisée</em>, un besoin de <em>260&nbsp;k€</em>")}
    <div class="grid g3" style="margin-top:22px">
      <div class="card"><h3>Le problème</h3><p class="small">5,4&nbsp;M d'œnotouristes étrangers visitent nos domaines chaque année. Ils goûtent, achètent peu, rentrent chez eux… et le domaine ne les revoit jamais : pas de contact, pas de relance, pas de prix livré chez eux.</p></div>
      <div class="card"><h3>La solution</h3><p class="small"><b>WinePass</b> capte le visiteur en 30&nbsp;secondes (QR de dégustation), le relance dans sa langue et lui permet de recommander depuis chez lui, au prix rendu fourni par un <b>logisticien partenaire</b> qui expédie, dédouane et livre.</p></div>
      <div class="card"><h3>Le modèle</h3><p class="small">Abonnement SaaS de 59 à 249&nbsp;€ HT/mois (engagement 12&nbsp;mois), mise en service 390&nbsp;€, packs et 2&nbsp;% de commission. Marge brute ≈&nbsp;${pct(y("mbpct", "E"))} en 2029.</p></div>
    </div>
    <div class="grid g4" style="margin-top:22px">
      ${stat(n0(y("k_act", "E")), "domaines actifs fin 2029 (central)")}
      ${stat(keur(y("k_arr", "E")), "d'ARR fin 2029")}
      ${stat("sept.&nbsp;29", "point mort (EBE glissant durablement positif)")}
      ${stat("120&nbsp;k€", "sollicités auprès de business angels sur un plan de financement de 260&nbsp;k€")}
    </div>
    <p class="xs" style="margin-top:18px">Ce que nous savons : marché sourcé (OIV, Atout France, Vin &amp; Société, FEVS, Afnic…). Ce que nous ne savons pas encore : la disposition à payer et le taux de réachat — d'où 20&nbsp;entretiens et 10&nbsp;pilotes avant tout décaissement de la levée.</p>
  `, { note: PROJ }));

  // 3 — Start with why
  S.push(P(3, `
    <div class="grid g2" style="grid-template-columns:1.1fr .9fr;gap:40px;height:100%">
      <div>
        ${head("Vision · Start with Why", "Un vigneron ne devrait jamais perdre un client parce qu'il habite à <em>8&nbsp;000&nbsp;km</em>.")}
        <div style="margin-top:26px" class="grid">
          <div class="pill"><span class="num">Why</span><p>Rendre aux petits domaines la relation avec leurs clients du monde entier.</p></div>
          <div class="pill"><span class="num">How</span><p>Un seul outil pour capter, relancer et faire recommander — et des partenaires spécialisés pour expédier.</p></div>
          <div class="pill"><span class="num">What</span><p>WinePass + connexion aux logisticiens + activation des domaines.</p></div>
        </div>
      </div>
      <div class="card" style="align-self:center">
        <span class="tag wine">Genèse</span>
        <h2 style="margin-top:12px">Quatre saisons au contact des caveaux</h2>
        <p class="small">La fondatrice a passé quatre ans dans l'expédition internationale B2C de vins (stage puis alternances) : salons, domaines, clients étrangers, outils digitaux. Une phrase revenait sans cesse au comptoir : <i>« Et comment je fais pour en racheter une fois rentré chez moi ? »</i></p>
        <p class="small" style="margin-top:10px">Les logisticiens savent expédier une vente. Personne n'aide le domaine à <b>provoquer la suivante</b>. ExportPilot 360 naît de cet écart — en entreprise indépendante, sans reprise d'aucune donnée de l'ancien employeur, qui pourra devenir un partenaire logistique parmi d'autres.</p>
      </div>
    </div>`));

  // 4 — Contexte
  S.push(P(4, `
    ${head("L'environnement", "Une filière sous pression : la croissance ne viendra plus du <em>volume vendu en France</em>")}
    <div class="grid g4" style="margin-top:30px">
      <div class="card">${stat("−3,2&nbsp;%", "consommation de vin en France en 2025 (22,0&nbsp;Mhl)", "OIV, mai 2026")}</div>
      <div class="card">${stat("11&nbsp;%", "de consommateurs réguliers en 2022, contre 28&nbsp;% en 1995", "Ipsos / FranceAgriMer")}</div>
      <div class="card">${stat("27&nbsp;929&nbsp;ha", "de vignes arrachées avec aide en 2026 + 774&nbsp;000&nbsp;hl distillés", "Réussir Vigne, 2026")}</div>
      <div class="card">${stat("−21&nbsp;%", "d'exportations de vins et spiritueux vers les États-Unis en 2025 (droits de 15&nbsp;%)", "FEVS, 2026")}</div>
    </div>
    <div class="grid g2" style="margin-top:22px">
      <div class="card tint"><h3>Ce que cela change pour un domaine</h3><ul class="clean small"><li>Il doit vendre <b>mieux</b> (plus de valeur, plus de vente directe) plutôt que plus.</li><li>L'export classique via importateurs devient plus risqué et plus lent.</li><li>Chaque client qui vient au domaine prend de la valeur.</li></ul></div>
      <div class="card sage"><h3>Pourquoi maintenant</h3><ul class="clean small"><li>Record de 102&nbsp;M de touristes internationaux en France (2025).</li><li>Traduction et automatisation devenues quasi gratuites (API).</li><li>Les logisticiens spécialisés ont ouvert plateformes et API.</li><li>Aucun acteur francophone sur l'après-visite.</li></ul></div>
    </div>`));

  // 5 — Gisement
  S.push(P(5, `
    ${head("Le gisement", "<em>5,4 millions</em> de visiteurs étrangers chaque année dans les lieux du vin")}
    <div class="grid" style="grid-template-columns:1.15fr .85fr;gap:30px;margin-top:24px">
      <div class="grid g2" style="gap:16px">
        <div class="card">${stat("12&nbsp;M", "d'œnotouristes par an, dont 45&nbsp;% d'étrangers", "Atout France via Vin &amp; Société, 2025")}</div>
        <div class="card">${stat("17&nbsp;M", "de touristes internationaux placent le vin dans leur top&nbsp;3 des raisons de venir", "Vin &amp; Société / Dynata, 2025")}</div>
        <div class="card">${stat("75&nbsp;%", "des visiteurs achètent du vin au domaine (panier vin moyen 164&nbsp;€ chez les acheteurs)", "Winalist, 15&nbsp;000 réservations, 2025")}</div>
        <div class="card">${stat("82&nbsp;%", "de visiteurs internationaux en Champagne sur la même plateforme", "Winalist, 2025")}</div>
      </div>
      <div class="card brass" style="display:flex;flex-direction:column;justify-content:center">
        <h2>Le paradoxe</h2>
        <p class="small">Le visiteur étranger est le client le plus qualifié qui soit : il a <b>goûté</b>, il a <b>aimé</b>, il a souvent un pouvoir d'achat élevé.</p>
        <p class="small" style="margin-top:10px">Mais il repart avec deux bouteilles dans sa valise — la franchise et le poids limitent l'achat — et le domaine n'a ni son contact, ni le moyen de lui revendre à distance.</p>
        <p class="small" style="margin-top:10px"><b>La vente perdue n'est pas au comptoir. Elle est dans les douze mois qui suivent.</b></p>
      </div>
    </div>`));

  // 6 — Problème : parcours cassé
  const stepsP = [
    ["Avant", "Il réserve une dégustation", "ok"],
    ["Visite", "Il goûte 6 vins, en achète 2", "warn"],
    ["Départ", "Aucun contact laissé", "ko"],
    ["Chez lui", "Il ne sait ni comment commander ni combien ça coûte livré", "ko"],
    ["12 mois", "Le domaine l'a perdu", "ko"],
  ];
  S.push(P(6, `
    ${head("Le problème", "Le parcours du visiteur étranger <em>se casse au moment du départ</em>")}
    <div style="display:flex;gap:14px;margin-top:40px;align-items:stretch">
      ${stepsP.map(([t, d, s], i) => `<div class="card" style="flex:1;border-top:5px solid ${s === "ok" ? COL.s3 : s === "warn" ? COL.s2 : COL.s1}">
        <div class="kicker" style="margin-bottom:6px">${i + 1} · ${t}</div><p style="font-weight:600">${d}</p></div>`).join('<div class="arrow" style="align-self:center;font-size:22px">→</div>')}
    </div>
    <div class="grid g3" style="margin-top:34px">
      <div><h3>Pour le domaine</h3><p class="small">Des ventes qui n'ont jamais lieu, aucun fichier client exploitable, la peur de la douane et des accises dès qu'il faut expédier.</p></div>
      <div><h3>Pour le visiteur</h3><p class="small">Aucun prix « livré chez moi », des règles d'import opaques (accises UE, système des trois niveaux américain), la crainte de frais surprise.</p></div>
      <div><h3>Pour la filière</h3><p class="small">Un canal de vente directe — le plus rémunérateur, ≈&nbsp;+44&nbsp;% au litre vs la grande distribution (donnée 2009) — qui reste sous-exploité.</p></div>
    </div>
    ${takeaway("Chaque étape rouge est une vente qui n'aura pas lieu, et aucun outil ne s'en charge aujourd'hui.")}`));

  // 7 — Parties prenantes
  const sh = [
    ["Propriétaire du domaine", "Payeur · décideur", "Vendre plus en direct sans embaucher", "« Encore un abonnement, et je n'ai pas le temps »"],
    ["Équipe du caveau", "Utilisateur", "Un outil qui ne ralentit pas la dégustation", "Saisonniers, comptoir chargé en été"],
    ["Visiteur étranger", "Client final (bénéficiaire)", "Retrouver ses vins, un prix livré clair", "Peur des taxes et du colis bloqué"],
    ["Offices de tourisme, interprofessions", "Prescripteurs", "Des visiteurs qui repartent satisfaits", "Ne pas « vendre » un logiciel"],
    ["Logisticiens spécialisés", "Partenaires d'exécution", "Des commandes qualifiées, sans coût d'acquisition", "Ne pas être mis en concurrence frontale"],
  ];
  S.push(P(7, `
    ${head("Points de douleur", "Cinq parties prenantes, <em>un seul payeur</em> : le domaine")}
    <table class="t" style="margin-top:26px;font-size:14px">
      <tr><th>Partie prenante</th><th style="text-align:left">Rôle</th><th style="text-align:left">Ce qu'elle attend</th><th style="text-align:left">Sa douleur / son objection</th></tr>
      ${sh.map((r) => `<tr><td><b>${r[0]}</b></td><td style="text-align:left"><span class="tag ${r[1].startsWith("Payeur") ? "wine" : r[1].startsWith("Utilisateur") ? "sage" : ""}">${r[1]}</span></td><td style="text-align:left">${r[2]}</td><td style="text-align:left" class="muted">${r[3]}</td></tr>`).join("")}
    </table>
    <p class="small" style="margin-top:22px"><b>Conséquence produit :</b> l'utilisateur (le caveau) doit gagner du temps, le payeur doit voir des ventes, le client final doit être rassuré — et les partenaires doivent y gagner des volumes. Un produit qui oublie l'un des cinq ne sera pas adopté.</p>
    ${takeaway("Payeur, utilisateur, client final : la valeur doit être visible pour chacun, sinon pas d'adoption.")}`));

  // 8 — Alternatives
  S.push(P(8, `
    ${head("Comment font-ils aujourd'hui ?", "Des briques isolées : <em>personne ne s'occupe de l'après-visite</em>")}
    <div class="grid g2" style="margin-top:24px;gap:22px">
      <div class="card"><span class="tag">Expédier un achat</span><p class="small" style="margin-top:10px">Commissionnaires spécialisés (simulateur, suivi), comptes transporteurs, ou « débrouillez-vous ». <b>Hillebrand Gori eShipping / myBottlesDelivered (DHL)</b> permet même de commander sur place par QR code, sans coût fixe pour le domaine.</p><p class="xs" style="margin-top:6px">Limite : rien après la visite ; 15 destinations, États-Unis «&nbsp;TBC&nbsp;».</p></div>
      <div class="card"><span class="tag">Garder le contact</span><p class="small" style="margin-top:10px">Livre d'or papier, fichier Excel, caisse avec mailing basique (Vitisoft, Wino). 79&nbsp;% des vignerons ont un site, mais seulement 21&nbsp;% vendent en ligne.</p><p class="xs" style="margin-top:6px">Limite : pas de segmentation par pays, pas de multilingue, pas de prix rendu. (Afnic, 2025)</p></div>
      <div class="card"><span class="tag">Revendre à distance</span><p class="small" style="margin-top:10px">E-shop français souvent sans livraison internationale ; marketplaces (Vivino, Vinatis).</p><p class="xs" style="margin-top:6px">Limite : la marketplace capte le client et une partie de la marge.</p></div>
      <div class="card"><span class="tag">Fidéliser (modèle américain)</span><p class="small" style="margin-top:10px">Aux États-Unis, salle de dégustation + club = 53&nbsp;% des ventes d'une winery (SVB 2026) ; Commerce7 ou WineDirect outillent ces clubs.</p><p class="xs" style="margin-top:6px">Limite : pensés pour le marché intérieur américain, pas pour un domaine français qui vend à l'étranger.</p></div>
    </div>
    ${takeaway("Expédier, encaisser, réserver : tout existe. Relancer le visiteur une fois rentré chez lui : rien.")}`));

  // 9 — Recentrage critique
  S.push(P(9, `
    ${head("Notre propre crash-test", "Le concept initial était trop large : nous l'avons <em>recentré</em>")}
    <div class="grid g3" style="margin-top:26px">
      <div class="card"><span class="tag ink">A · Hub export</span><h3 style="margin-top:10px">Réduit à une couche de connexion</h3><p class="small">Les logisticiens offrent déjà simulateurs et suivi, parfois gratuitement. Reconstruire leur plateforme serait inutile et risqué. On <b>branche</b> leurs estimations, la transmission de commande et le suivi.</p></div>
      <div class="card tint"><span class="tag wine">B · WinePass</span><h3 style="margin-top:10px">Devient le cœur du produit</h3><p class="small">C'est le seul espace libre : capter le visiteur, le relancer dans sa langue et le faire recommander depuis chez lui. La valeur se mesure en ventes nouvelles.</p></div>
      <div class="card"><span class="tag ink">C · DomaineDigital</span><h3 style="margin-top:10px">Transformé en activation</h3><p class="small">Pas d'agence : une mise en service payante et des packs ponctuels réalisés par des freelances partenaires. Aucune dérive vers un métier de service non scalable.</p></div>
    </div>
    <div class="card brass" style="margin-top:20px"><p><b>Ce qui tuerait le projet</b> — et que nous mesurerons avant de dépenser la levée : un taux de capture des contacts au comptoir &lt;&nbsp;15&nbsp;%, un réachat à 6&nbsp;mois &lt;&nbsp;2&nbsp;% des contacts, ou le refus des logisticiens de se connecter.</p></div>
    ${takeaway("Moins de fonctionnalités, plus de valeur : un produit que deux fondateurs peuvent livrer en 90 jours.")}`));

  // 10 — Solution en une image
  S.push(P(10, `
    ${head("La solution", "ExportPilot 360 : <em>de la dégustation à la livraison internationale</em>")}
    <div style="display:flex;gap:16px;margin-top:34px;align-items:stretch">
      ${[["1", "Capter", "QR de dégustation : le visiteur coche ses vins et laisse son contact (consentement RGPD) en 30&nbsp;s.", COL.s1],
         ["2", "Relancer", "Scénarios automatiques dans sa langue : « vos vins », nouveau millésime, Noël.", COL.s2],
         ["3", "Faire recommander", "Sa page « mes vins » affiche un prix rendu chez lui, fourni par un partenaire.", COL.s3],
         ["4", "Expédier via partenaires", "Le logisticien choisi expédie, dédouane, assure, livre. Suivi unifié.", COL.s4]]
        .map(([n, t, d, c]) => `<div class="card" style="flex:1;border-top:5px solid ${c}"><div class="num" style="color:${c}">${n}</div><h2 style="margin-top:8px">${t}</h2><p class="small">${d}</p></div>`).join("")}
    </div>
    <div class="grid g3" style="margin-top:24px">
      <div class="pill"><span class="dot" style="background:${COL.s1}"></span><p class="small"><b>WinePass</b> — le cœur : capter, fidéliser, faire recommander.</p></div>
      <div class="pill"><span class="dot" style="background:${COL.s3}"></span><p class="small"><b>ExportPilot</b> — la connexion export : prix rendu, commande, suivi, fiches destinations.</p></div>
      <div class="pill"><span class="dot" style="background:${COL.s2}"></span><p class="small"><b>Activation</b> — mise en service, formation, packs (freelances).</p></div>
    </div>
    <p class="small" style="margin-top:18px"><b>Promesse :</b> un seul outil pour attirer, convertir, fidéliser et accompagner les commandes internationales — avec des partenaires spécialisés pour tout ce qui est réglementé.</p>
    ${takeaway("Le domaine ne touche jamais à la douane : il vend, le partenaire expédie, ExportPilot 360 relie les deux.")}`));

  // 11 — Parcours produit (concept)
  const scr1 = `<div style="font-weight:700;font-size:12px">Domaine des Collines</div><div class="xs">Your tasting · EN</div>
     ${["Rosé 2025", "Blanc 2024", "Rouge Réserve 2022", "Cuvée Prestige"].map((v, i) => `<div style="display:flex;justify-content:space-between;border-bottom:1px solid #eee;padding:7px 0"><span>${v}</span><span style="color:${i % 2 ? COL.muted : COL.s1}">${i % 2 ? "☆" : "★ favourite"}</span></div>`).join("")}
     <div style="margin-top:10px;background:${COL.wine};color:#fff;border-radius:8px;padding:8px;text-align:center;font-weight:700">Save my wines</div>
     <div class="xs" style="margin-top:6px">☐ I am of legal drinking age · ☐ Keep me informed</div>`;
  const scr2 = `<div class="xs">E-mail · J+3</div><div style="font-weight:700;margin:6px 0">Emily, your wines from Domaine des Collines</div>
     <div style="background:${COL.chalk};border-radius:8px;padding:8px">Rouge Réserve 2022<br><span class="xs">The one you loved</span></div>
     <div style="background:${COL.chalk};border-radius:8px;padding:8px;margin-top:6px">Cuvée Prestige<br><span class="xs">New vintage in November</span></div>
     <div style="margin-top:10px;background:${COL.wine};color:#fff;border-radius:8px;padding:8px;text-align:center;font-weight:700">Order again</div>`;
  const scr3 = `<div style="font-weight:700">My order · Chicago, USA</div>
     <div style="display:flex;justify-content:space-between;margin-top:8px"><span>6 × Rouge Réserve</span><span>162&nbsp;€</span></div>
     <div style="display:flex;justify-content:space-between"><span>Delivery, duties &amp; taxes*</span><span>[partner]</span></div>
     <div class="xs" style="margin-top:4px">*Estimate provided by the logistics partner, via a compliant US import channel.</div>
     <div style="margin-top:10px;background:${COL.wine};color:#fff;border-radius:8px;padding:8px;text-align:center;font-weight:700">Pay &amp; ship</div>`;
  const scr4 = `<div style="font-weight:700">Tableau de bord du domaine</div>
     <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:8px">
     ${[["Contacts captés", "412"], ["Taux de capture", "27 %"], ["Réachats", "18"], ["CA généré", "5 940 €"]].map(([a, b]) => `<div style="background:${COL.chalk};border-radius:8px;padding:6px"><div class="xs">${a}</div><div style="font-weight:700;font-size:14px">${b}</div></div>`).join("")}</div>
     <div class="xs" style="margin-top:8px">Valeurs fictives d'illustration</div>`;
  S.push(P(11, `
    ${head("Le produit", "Le parcours en quatre écrans — <em>maquettes de concept</em>")}
    <div style="display:flex;justify-content:space-between;margin-top:28px;position:relative">
      ${phone(scr1, "1 · QR de dégustation")}${phone(scr2, "2 · Relance dans sa langue")}${phone(scr3, "3 · Réachat, prix rendu partenaire")}${phone(scr4, "4 · Le domaine mesure")}
    </div>
    <div class="concept">CONCEPT — PRODUIT NON DÉVELOPPÉ</div>
    <p class="xs" style="margin-top:14px">Maquettes illustratives : le produit n'existe pas encore. Noms, montants et chiffres fictifs. Le QR WinePass est un support distinct de l'e-label réglementaire (qui ne peut collecter aucune donnée).</p>`));

  // 12 — Construire / intégrer / partenaires + responsabilités
  S.push(P(12, `
    ${head("Architecture et responsabilités", "Nous construisons la relation, nous intégrons l'outillage, <em>les partenaires exécutent</em>")}
    <div class="grid g3" style="margin-top:22px">
      <div class="card tint"><h3>Nous construisons</h3><ul class="clean small"><li>Parcours WinePass multilingue</li><li>CRM centré sur le domaine (visites, vins, pays)</li><li>Page de réachat avec prix rendu</li><li>Connecteur normalisé « logisticiens »</li><li>Fiches destinations datées</li><li>Tableaux de bord</li></ul></div>
      <div class="card"><h3>Nous intégrons</h3><ul class="clean small"><li>Envoi d'e-mails et SMS (API)</li><li>Traduction automatique, relue</li><li>Paiement via un prestataire agréé</li><li>Connecteurs e-shop (WooCommerce, Shopify, PrestaShop)</li><li>Caisses viticoles (phase 2)</li><li>Hébergement UE</li></ul></div>
      <div class="card sage"><h3>Nos partenaires exécutent</h3><ul class="clean small"><li>Commissionnaires spécialisés : transport, douane, DDP, assurance (≥&nbsp;2 par destination)</li><li>Représentants fiscaux : accises UE</li><li>Offices de tourisme, interprofessions : prescription</li><li>Freelances : packs</li></ul></div>
    </div>
    <table class="t" style="margin-top:18px;font-size:14px">
      <tr><th>Acte</th><th style="text-align:left">Responsable juridique</th><th style="text-align:left">Rôle d'ExportPilot 360</th></tr>
      <tr><td>Vente du vin (prix, facture, majorité)</td><td style="text-align:left">Le domaine, vendeur</td><td style="text-align:left">Outil de commande</td></tr>
      <tr><td>Transport, dédouanement, DDP, sinistres</td><td style="text-align:left">Le commissionnaire partenaire</td><td style="text-align:left">Transmission, suivi, orientation</td></tr>
      <tr><td>Accises de destination UE · documents d'accises</td><td style="text-align:left">Représentant fiscal · entrepositaire agréé</td><td style="text-align:left">Information fournie par le partenaire — aucun conseil</td></tr>
      <tr><td>Données des visiteurs</td><td style="text-align:left">Le domaine (responsable de traitement)</td><td style="text-align:left">Sous-traitant RGPD, hébergement UE</td></tr>
    </table>`));

  // 13 — IA
  const ai = [
    ["Traduction des fiches et relances (4 à 6 langues)", "Forte", "MVP · relecture humaine", COL.s3],
    ["Rédaction assistée des campagnes (garde-fous loi Évin)", "Moyenne", "Phase 2 · validation obligatoire", COL.s2],
    ["Recommandations de vins par visiteur", "Moyenne", "Phase 2 (règles) → 3 (modèle)", COL.s2],
    ["Réponse automatique « où est ma commande ? »", "Moyenne", "Phase 3", COL.s2],
    ["Conseil douanier ou fiscal automatisé", "Négative", "Exclu : métier et responsabilité des partenaires", COL.s1],
  ];
  S.push(P(13, `
    ${head("Intelligence artificielle", "L'IA là où elle fait gagner du temps — <em>jamais là où elle engage la responsabilité</em>")}
    <table class="t" style="margin-top:28px;font-size:16px">
      <tr><th>Usage</th><th style="text-align:left">Valeur réelle</th><th style="text-align:left">Décision</th></tr>
      ${ai.map((r) => `<tr><td>${r[0]}</td><td style="text-align:left"><span class="pill"><span class="dot" style="background:${r[3]}"></span>${r[1]}</span></td><td style="text-align:left">${r[2]}</td></tr>`).join("")}
    </table>
    <div class="card brass" style="margin-top:24px"><p><b>Pourquoi c'est important :</b> la langue est le premier frein à la vente internationale d'un petit domaine. La traduction automatique relue rend le multilingue accessible pour quelques euros par mois — c'est un vrai avantage de coût, pas un argument marketing.</p></div>`));

  // 14 — TAM SAM SOM
  S.push(P(14, `
    ${head("Taille du marché", "Un marché adressable de <em>≈&nbsp;7&nbsp;M€/an</em> en France : de quoi bâtir une PME rentable")}
    <div class="grid" style="grid-template-columns:.9fr 1.1fr;gap:34px;margin-top:22px;align-items:center">
      <svg width="470" height="430" viewBox="0 0 470 430">
        <circle cx="235" cy="215" r="205" fill="${COL.rose}"/><circle cx="235" cy="285" r="135" fill="#E7C6D0"/><circle cx="235" cy="352" r="62" fill="${COL.s1}"/>
        <text x="235" y="58" text-anchor="middle" font-family="Fraunces" font-size="30" font-weight="700" fill="${COL.wine}">≈ 26 M€</text>
        <text x="235" y="80" text-anchor="middle" font-size="13" fill="${COL.ink}">TAM · 17 700 domaines en vente directe</text>
        <text x="235" y="196" text-anchor="middle" font-family="Fraunces" font-size="28" font-weight="700" fill="${COL.wine}">≈ 7,4 M€</text>
        <text x="235" y="217" text-anchor="middle" font-size="13" fill="${COL.ink}">SAM · 5 000 domaines ouverts à la visite</text>
        <text x="235" y="233" text-anchor="middle" font-size="13" fill="${COL.ink}">avec clientèle étrangère</text>
        <text x="235" y="352" text-anchor="middle" font-family="Fraunces" font-size="22" font-weight="700" fill="#fff">${keur(y("k_arr", "E"))}</text>
        <text x="235" y="370" text-anchor="middle" font-size="11" fill="#fff">ARR · SOM 2029</text>
      </svg>
      <div>
        <table class="t" style="font-size:16px">
          <tr><th>Niveau</th><th style="text-align:left">Calcul</th><th>Valeur</th></tr>
          <tr><td><b>TAM</b></td><td style="text-align:left">59&nbsp;000 exploitations × ≈&nbsp;30&nbsp;% en circuit court (RA&nbsp;2020) × ARPA 1&nbsp;480&nbsp;€</td><td>≈&nbsp;26&nbsp;M€</td></tr>
          <tr><td><b>SAM</b></td><td style="text-align:left">≈&nbsp;10&nbsp;000 caves ouvertes à la visite (Atout France) × 50&nbsp;% avec ≥&nbsp;10 étrangers/semaine en saison <span class="tag">HYP</span> × 1&nbsp;480&nbsp;€</td><td>≈&nbsp;7,4&nbsp;M€</td></tr>
          <tr><td><b>SOM</b></td><td style="text-align:left">${n0(y("k_act", "E"))} domaines actifs fin 2029 = ${pct(y("k_act", "E") / 5000, 1)} du SAM</td><td>${keur(y("k_arr", "E"))}&nbsp;ARR</td></tr>
        </table>
        <p class="small" style="margin-top:14px">Recoupement : 2&nbsp;954 caves labellisées Vignobles &amp; Découvertes forment le cœur du SAM ; le RGA&nbsp;2010 (30&nbsp;248 caves en vente directe) porterait le TAM à ≈&nbsp;45&nbsp;M€.</p>
        <p class="small" style="margin-top:8px"><b>Au-delà :</b> Italie, Espagne et Portugal partagent la même structure (petits domaines, œnotourisme, contraintes UE) — non quantifiés à ce stade.</p>
      </div>
    </div>`));

  // 15 — Segments & ICP
  S.push(P(15, `
    ${head("Cibles", "Trois profils de clients idéaux, <em>un cœur de cible</em>")}
    <div class="grid g3" style="margin-top:26px">
      <div class="card tint" style="border-top:5px solid ${COL.s1}"><span class="tag wine">ICP 1 · Cœur</span><h2 style="margin-top:10px">Le domaine familial touristique</h2><ul class="clean small"><li>10 à 40&nbsp;ha, 3 à 10 salariés, caveau avec dégustation</li><li>≥&nbsp;10 visiteurs étrangers/semaine en saison</li><li>Bouteilles ≥&nbsp;12&nbsp;€, pas d'outil de relance</li></ul><p class="small" style="margin-top:8px"><b>Offre :</b> Export</p></div>
      <div class="card"><span class="tag">ICP 2</span><h2 style="margin-top:10px">La maison structurée</h2><ul class="clean small"><li>40 à 80&nbsp;ha ou maison de Champagne de vigneron</li><li>Responsable œnotourisme, e-shop</li><li>Clientèle premium américaine, britannique, belge, suisse</li></ul><p class="small" style="margin-top:8px"><b>Offre :</b> Signature</p></div>
      <div class="card"><span class="tag">ICP 3</span><h2 style="margin-top:10px">La cave touristique</h2><ul class="clean small"><li>Caviste ou cave en zone touristique</li><li>Flux étranger toute l'année</li><li>Demandes d'expédition fréquentes</li></ul><p class="small" style="margin-top:8px"><b>Offre :</b> Export</p></div>
    </div>
    <div class="grid g2" style="margin-top:20px">
      <div><h3>Régions de lancement</h3><p class="small">Deux destinations à fort tourisme international (Provence, Bourgogne ou Champagne), choisies après 20 entretiens. Densité terrain d'abord, national à partir de 2028.</p></div>
      <div><h3>Exclusions</h3><p class="small">Vente en vrac ou au négoce uniquement, pas de flux de visiteurs, vins &lt;&nbsp;8&nbsp;€ (le transport tue le réachat).</p></div>
    </div>`));

  // 16 — Personas
  const per = [
    ["Julien, 46 ans", "Vigneron-propriétaire · payeur", "18&nbsp;ha dans le Luberon, 35&nbsp;% de visiteurs étrangers", "Vendre plus sans embaucher", "« Encore un abonnement »", "Une commande par mois paie l'outil"],
    ["Claire, 34 ans", "Responsable œnotourisme · utilisatrice", "60&nbsp;ha en Bourgogne, 3 saisonniers, e-shop", "Prouver le ROI de l'œnotourisme", "« Pas le temps au comptoir »", "30&nbsp;s par visiteur, relances automatiques"],
    ["Emily, 52 ans", "Visiteuse de Chicago · cliente finale", "A goûté 6 vins, en a acheté 2", "Retrouver ces vins chez elle", "« Peur des taxes surprises »", "Prix rendu par un partenaire reconnu"],
    ["Marc, 50 ans", "Directeur de destination · prescripteur", "Destination Vignobles &amp; Découvertes", "Valoriser la destination", "« Ce n'est pas mon rôle »", "Tableau de bord régional, attractivité"],
  ];
  S.push(P(16, `
    ${head("Buyer personas", "Qui décide, qui utilise, qui achète, qui recommande")}
    <div class="grid g4" style="margin-top:24px">
      ${per.map((p, i) => `<div class="card" style="border-top:5px solid ${[COL.s1, COL.s3, COL.s4, COL.s2][i]}">
        <h2 style="font-size:19px">${p[0]}</h2><div class="xs" style="font-weight:700;color:${COL.ink}">${p[1]}</div>
        <p class="small" style="margin-top:8px">${p[2]}</p>
        <p class="small" style="margin-top:8px"><b>Objectif :</b> ${p[3]}</p>
        <p class="small" style="margin-top:6px"><b>Objection :</b> ${p[4]}</p>
        <p class="small" style="margin-top:6px"><b>Réponse :</b> ${p[5]}</p></div>`).join("")}
    </div>
    <p class="xs" style="margin-top:16px">Personas construits à partir des données sectorielles (Atout France, Winalist, Afnic) — à valider lors des 20 entretiens prévus avant mars 2027.</p>
    ${takeaway("Le payeur achète un résultat, l'utilisatrice adopte un outil simple, la cliente achète une promesse tenue.")}`));

  // 17 — Concurrence
  const ck = (v) => (v === 2 ? `<b style="color:${COL.s3}">●●</b>` : v === 1 ? `<span style="color:${COL.s2}">●</span>` : v === 0.5 ? `<span style="color:${COL.muted}">◐</span>` : `<span style="color:#ccc">—</span>`);
  const comp = [
    ["Hillebrand eShipping / myBottlesDelivered (DHL)", 0, 2, 0, 2, "0&nbsp;€ fixe, paiement à l'envoi"],
    ["Commissionnaires spécialisés", 0, 1, 0, 2, "Prestation de transport"],
    ["Winalist, Rue des Vignerons", 2, 0.5, 0, 0, "Commission par réservation"],
    ["Vitisoft, Isagri / Wino", 0, 1, 0.5, 0.5, "Sur devis"],
    ["Commerce7, WineDirect (US)", 0.5, 1, 2, 0, "59 à 1&nbsp;249&nbsp;$/mois + 0,75 à 2&nbsp;%"],
    ["HubSpot, Brevo", 0.5, 0, 1, 0, "7 à 20&nbsp;€/mois/siège"],
    ["Vivino, Vinatis (marketplaces)", 2, 1, 0.5, 1, "Commission — capte le client"],
  ];
  S.push(P(17, `
    ${head("Concurrence", "Le marché est couvert par briques. <em>L'après-visite est vide.</em>")}
    <table class="t" style="margin-top:20px;font-size:16px">
      <tr><th>Acteur</th><th style="text-align:center">Attirer</th><th style="text-align:center">Convertir</th><th style="text-align:center">Fidéliser · réachat</th><th style="text-align:center">Expédier · conformité</th><th>Modèle</th></tr>
      ${comp.map((r) => `<tr><td>${r[0]}</td>${[1, 2, 3, 4].map((k) => `<td style="text-align:center">${ck(r[k])}</td>`).join("")}<td>${r[5]}</td></tr>`).join("")}
      <tr class="tot"><td>ExportPilot 360</td><td style="text-align:center">${ck(0.5)}</td><td style="text-align:center">${ck(1)}</td><td style="text-align:center">${ck(2)}</td><td style="text-align:center">via partenaires</td><td>59 à 249&nbsp;€/mois + 2&nbsp;%</td></tr>
    </table>
    <p class="small" style="margin-top:14px"><b>Le concurrent le plus proche, myBottlesDelivered, est aussi un partenaire potentiel :</b> il traite le visiteur qui achète sur place ; ExportPilot 360 relance tous les autres et peut lui confier les réachats. Prix relevés sur les sites publics, octobre 2026 · ●● cœur de métier · ● couvert · ◐ partiel.</p>`));

  // 18 — Positionnement & USP
  S.push(P(18, `
    <div class="grid g2" style="grid-template-columns:1fr 1fr;gap:34px">
      <div>
        ${head("Positionnement", "Le seul acteur <em>spécialisé et relationnel</em>")}
        <svg width="520" height="390" viewBox="0 0 520 390" style="margin-top:14px">
          <line x1="260" y1="10" x2="260" y2="380" stroke="${COL.ink}"/><line x1="10" y1="195" x2="510" y2="195" stroke="${COL.ink}"/>
          <text x="262" y="22" font-size="11" fill="${COL.muted}">Spécialisé « domaine français → international »</text>
          <text x="262" y="376" font-size="11" fill="${COL.muted}">Générique</text>
          <text x="12" y="186" font-size="11" fill="${COL.muted}">Transaction</text>
          <text x="508" y="186" font-size="11" text-anchor="end" fill="${COL.muted}">Relation complète</text>
          <rect x="268" y="30" width="236" height="156" rx="12" fill="${COL.rose}"/>
          ${[[90, 70, "Hillebrand eShipping"], [90, 120, "Commissionnaires"], [80, 260, "MBE, Chronopost"], [150, 300, "Vitisoft, Wino"], [380, 250, "Commerce7 (US)"], [400, 320, "HubSpot, Brevo"]]
            .map(([x, yy, t]) => `<circle cx="${x}" cy="${yy}" r="7" fill="${COL.muted}"/><text x="${x + 12}" y="${yy + 4}" font-size="12" fill="${COL.ink}">${t}</text>`).join("")}
          <circle cx="400" cy="90" r="11" fill="${COL.s1}"/><text x="400" y="122" text-anchor="middle" font-size="14" font-weight="700" fill="${COL.wine}">ExportPilot 360</text>
        </svg>
      </div>
      <div style="padding-top:8px">
        <div class="card tint"><span class="tag wine">USP</span><p style="margin-top:10px;font-size:17px;line-height:1.4;font-weight:600">Le seul outil qui transforme le visiteur étranger d'un caveau en client récurrent, avec un prix rendu chez lui et une expédition confiée au logisticien de son choix.</p></div>
        <h3 style="margin-top:20px">Avantages durables</h3>
        <ul class="clean small">
          <li><b>Données de préférence</b> accumulées saison après saison (coût de changement élevé).</li>
          <li><b>Réseau de partenaires connectés</b> et neutralité, difficile à copier pour un logisticien.</li>
          <li><b>Ancrage terrain</b> dans la filière et densité régionale (recommandation entre voisins).</li>
          <li><b>Conformité intégrée</b> (RGPD, loi Évin, fiches destinations datées).</li>
        </ul>
        <p class="xs" style="margin-top:10px">Limite assumée : ces avantages se construisent ; ils ne sont pas acquis au lancement.</p>
      </div>
    </div>`));

  // 19 — Business model & offres
  S.push(P(19, `
    ${head("Business model", "Trois offres, un ancrage simple : <em>une commande par mois paie l'abonnement</em>")}
    <div class="grid g3" style="margin-top:22px">
      ${[["Caveau", "59", "Constituer son fichier", ["QR WinePass, carnet de dégustation", "Contacts et consentements", "3 relances FR/EN", "Tableau de bord"], ""],
         ["Export", "129", "La raison d'être du produit", ["Tout Caveau +", "Réachat international, prix rendu partenaires", "4 langues, fiches destinations", "Suivi des commandes"], "tint"],
         ["Signature", "249", "Domaine structuré", ["Tout Export +", "Multi-sites, connexion e-shop ou caisse", "Club (phase 2)", "Point trimestriel"], ""]]
        .map(([n, p, s, f, c]) => `<div class="card ${c}" ${c ? `style="border:2px solid ${COL.s1}"` : ""}>${c ? '<span class="tag wine">Recommandée</span>' : '<span class="tag">Offre</span>'}
          <h2 style="margin-top:10px">${n}</h2><div><span class="stat s">${p}&nbsp;€</span> <span class="small muted">HT/mois · 12&nbsp;mois</span></div>
          <p class="small muted" style="margin:6px 0">${s}</p><ul class="clean small">${f.map((x) => `<li>${x}</li>`).join("")}</ul></div>`).join("")}
    </div>
    <div class="grid g4" style="margin-top:18px">
      <div class="card"><h3>Mise en service</h3><p class="small">390&nbsp;€ HT : paramétrage, import catalogue, formation 1&nbsp;h, kit QR</p></div>
      <div class="card"><h3>Commission</h3><p class="small">2&nbsp;% du montant vin des réachats passés par la plateforme (offres Export et Signature)</p></div>
      <div class="card"><h3>Packs</h3><p class="small">≈&nbsp;750&nbsp;€ : campagne, photos, traduction pro — réalisés par des freelances</p></div>
      <div class="card"><h3>Prix justifié</h3><p class="small">Entre les CRM génériques (7–20&nbsp;€) et les outils vin américains (59–399&nbsp;$ + commission)</p></div>
    </div>`));

  // 20 — Unit economics & saisonnalité
  S.push(P(20, `
    ${head("Économie par client", "Un client rapporte ≈&nbsp;8 fois ce qu'il coûte à acquérir — <em>si le churn tient</em>")}
    <div class="grid g5" style="margin-top:24px">
      <div class="card">${stat(eur(119.4), "prix moyen pondéré / mois (mix 40/45/15&nbsp;%)", "", "s")}</div>
      <div class="card">${stat(eur(y("k_arpa", "E")), "revenu récurrent annuel par domaine (2029)", "", "s")}</div>
      <div class="card">${stat(eur(y("k_cac", "E")), "coût d'acquisition (CAC) 2029", "", "s")}</div>
      <div class="card">${stat(eur(y("k_ltv", "E")), "valeur vie client (LTV)", "", "s")}</div>
      <div class="card">${stat(Math.round(y("k_payback", "E")) + "&nbsp;mois", "pour récupérer le CAC", "", "s")}</div>
    </div>
    <div class="grid g2" style="margin-top:22px;gap:26px">
      <div><h3>Hypothèses clés</h3><ul class="clean small"><li>Churn 1,5&nbsp;%/mois (≈&nbsp;17&nbsp;%/an) — bas de la fourchette prudente de 1,5 à 3&nbsp;%/mois pour des TPE.</li><li>Marge brute récurrente ≈&nbsp;96&nbsp;% (5&nbsp;€/domaine/mois d'hébergement, e-mails, traduction).</li><li>LTV/CAC ≈&nbsp;${Math.round(y("k_ratio", "E"))} en central, 3,3 en pessimiste (churn 2,5&nbsp;%).</li></ul></div>
      <div class="card brass"><h3>Saisonnalité : un risque traité dès la conception</h3><p class="small">Usage de mai à octobre, ventes de novembre à avril (70&nbsp;% des signatures). Parades : engagement 12&nbsp;mois, scénarios d'hiver (Noël, millésime), bilan de saison chiffré envoyé en octobre avant le renouvellement.</p></div>
    </div>
    ${takeaway("Passer de 1,5 % à 1 % de churn mensuel fait passer la LTV de ≈ 8 600 € à ≈ 12 500 € par domaine.")}`, { note: PROJ }));

  // 21 — Stratégie commerciale
  S.push(P(21, `
    ${head("Stratégie commerciale", `Terrain d'abord, prescripteurs ensuite : <em>${n0(y("k_new", "C"))} → ${n0(y("k_new", "D"))} → ${n0(y("k_new", "E"))}</em> signatures`)}
    <div class="grid" style="grid-template-columns:1fr 1fr;gap:28px;margin-top:20px">
      <div>
        <h3>Processus de vente (cycle de 2 à 6 semaines)</h3>
        <div style="display:flex;flex-direction:column;gap:8px;margin-top:8px">
          ${["Qualification en 5 questions (visiteurs étrangers, outil actuel, décideur)", "Démonstration de 30 min au caveau, sur ses propres vins", "ROI calculé avec ses chiffres", "Proposition sous 24 h, signature électronique, SEPA", "Onboarding : premier contact capté sous 7 jours"].map((s, i) => `<div class="pill"><span class="num" style="font-size:20px;width:22px">${i + 1}</span><p class="small">${s}</p></div>`).join("")}
        </div>
        <h3 style="margin-top:16px">Pilotes</h3><p class="small">10 domaines de mars à juin 2027 : 3 mois offerts contre données d'usage et témoignage. Critère : ≥&nbsp;5 deviennent payants.</p>
      </div>
      <div>
        <h3>Mix des canaux (part des signatures visée en 2028)</h3>
        ${hbars({ items: [{ l: "Prospection terrain", v: 45 }, { l: "Prescripteurs", v: 30, c: COL.s3 }, { l: "Marketing digital", v: 15, c: COL.s4 }, { l: "Salons", v: 10, c: COL.s2 }], w: 560, fmt: (v) => v + " %", max: 50 })}
        <table class="t" style="margin-top:12px;font-size:14px">
          <tr><th>Objectifs</th><th>2027</th><th>2028</th><th>2029</th></tr>
          <tr><td>Démonstrations</td><td>≈&nbsp;150</td><td>≈&nbsp;420</td><td>≈&nbsp;670</td></tr>
          <tr><td>Signatures (≈&nbsp;30&nbsp;%)</td><td>${n0(y("k_new", "C"))}</td><td>${n0(y("k_new", "D"))}</td><td>${n0(y("k_new", "E"))}</td></tr>
          <tr class="sub"><td>Domaines actifs au 31/12</td><td>${n0(y("k_act", "C"))}</td><td>${n0(y("k_act", "D"))}</td><td>${n0(y("k_act", "E"))}</td></tr>
          <tr><td>Équipe commerciale</td><td>CEO + 1 BizDev</td><td>+ 1 BizDev</td><td>+ Customer success</td></tr>
        </table>
      </div>
    </div>`));

  // 22 — Marketing & communication
  S.push(P(22, `
    ${head("Marketing et communication", "Un message, des preuves : <em>« Vendez au monde entier depuis votre caveau »</em>")}
    <div class="grid g3" style="margin-top:24px">
      <div class="card"><h3>Ton et preuves</h3><p class="small">Concret, terrien, sans jargon : on parle de visiteurs, de bouteilles et de ventes, pas d'« IA ». Les preuves : cas pilotes chiffrés (publiés avec accord écrit), démonstration en direct, partenaires logistiques reconnus.</p></div>
      <div class="card"><h3>Canaux</h3><p class="small">LinkedIn et contenus « vendre au monde depuis son caveau », webinaires avec les interprofessions, salons (Wine Paris en février, Sitevi en novembre), presse viticole, kit comptoir chez les clients.</p></div>
      <div class="card"><h3>Conformité</h3><p class="small">Aucune communication vers les mineurs ; contenus des relances informatifs (loi Évin) ; e-label et QR WinePass séparés ; consentement explicite (RGPD).</p></div>
    </div>
    <h3 style="margin-top:22px">Calendrier annuel</h3>
    <div style="display:flex;margin-top:8px;border-radius:10px;overflow:hidden">
      ${[["Nov. → avril", "Vente, salons, démonstrations", COL.s1, 6], ["Mai → sept.", "Accompagnement, collecte de preuves", COL.s3, 5], ["Oct.", "Bilans de saison, cas clients", COL.s2, 1]].map(([a, b, c, f]) => `<div style="flex:${f};background:${c};color:#fff;padding:12px 14px"><b>${a}</b><div class="small">${b}</div></div>`).join("")}
    </div>
    <div class="grid g2" style="margin-top:18px">
      <div><h3>Onboarding</h3><p class="small">J0 compte et catalogue · J+2 fiches traduites et QR livrés · J+5 formation 1&nbsp;h · J+7 premiers contacts · J+30 premier point d'usage.</p></div>
      <div><h3>Fidélisation</h3><p class="small">Tableau de bord de valeur, scénarios d'hiver prêts à l'emploi, club utilisateurs régional, parrainage (1 mois offert), tarif garanti aux pionniers.</p></div>
    </div>`));

  // 23 — Roadmap
  S.push(P(23, `
    ${head("Développement du produit", "Trois phases, <em>des critères de passage chiffrés</em>")}
    <div class="grid g3" style="margin-top:22px">
      ${[["Phase 1 · MVP", "Déc. 2026 → juin 2027", ["QR de dégustation, contacts, consentement", "3 relances FR/EN/DE", "Réachat avec prix rendu d'1 à 2 partenaires", "Suivi, tableau de bord"], "≈&nbsp;25&nbsp;k€ de freelance + fondateurs", "≥&nbsp;5 pilotes payants · 2 logisticiens connectés · avis juridique favorable", COL.s1],
         ["Phase 2 · Développement", "Juil. 2027 → déc. 2028", ["Club et abonnements", "Scénarios d'hiver, 6 langues", "Connecteurs e-shop + 1 caisse", "2ᵉ partenaire par destination"], "Développeur salarié (janv. 2028)", "ARR ≥&nbsp;200&nbsp;k€ · LTV/CAC ≥&nbsp;3 mesuré · 1 partenariat de distribution", COL.s3],
         ["Phase 3 · Croissance", "2029", ["Recommandations par modèle", "Module « Attirer » (réservation œnotouristique)", "API partenaires, tableau de bord régional", "Pilote Italie ou Espagne"], "Autofinancé (central)", "EBE positif · rétention nette ≥&nbsp;100&nbsp;%", COL.s4]]
        .map(([t, d, f, inv, crit, c]) => `<div class="card" style="border-top:5px solid ${c}"><h2>${t}</h2><div class="xs" style="font-weight:700">${d}</div><ul class="clean small" style="margin-top:8px">${f.map((x) => `<li>${x}</li>`).join("")}</ul><p class="small" style="margin-top:8px"><b>Investissement :</b> ${inv}</p><p class="small" style="margin-top:6px"><b>Passage :</b> ${crit}</p></div>`).join("")}
    </div>
    <p class="small" style="margin-top:16px"><b>Jamais construit :</b> un moteur de taxes propre, l'émission de documents douaniers, une activité de transport ou de stockage, une marketplace qui vendrait le vin des domaines.</p>`));

  // 24 — Équipe
  S.push(P(24, `
    ${head("L'équipe", "Deux fondateurs complémentaires, des recrutements <em>déclenchés par des jalons</em>")}
    <div class="grid g2" style="margin-top:22px;gap:22px">
      <div class="card tint"><span class="tag wine">CEO · fondatrice</span><h2 style="margin-top:8px">[Prénom Nom]</h2><p class="small">Mastère Marketing &amp; Digital Business (Euridis). ≈&nbsp;4 ans dans la logistique export B2C du vin : domaines, salons, outils digitaux, gestion de projet logiciel.</p><p class="small" style="margin-top:6px"><b>Rôle :</b> vision, vente et partenariats, pilotes, marketing, finance. 60 à 65&nbsp;% du capital.</p></div>
      <div class="card"><span class="tag">CTO · cofondateur à recruter</span><h2 style="margin-top:8px">Profil recherché</h2><p class="small">Développeur full-stack de 5 ans d'expérience ou plus, idéalement passé par un SaaS B2B. Recherche active dès novembre 2026 (écoles d'ingénieurs, incubateurs).</p><p class="small" style="margin-top:6px"><b>Rôle :</b> architecture, intégrations, sécurité. 25 à 30&nbsp;% avec vesting 4 ans. <b>Pas de lancement sans responsable technique.</b></p></div>
    </div>
    <table class="t" style="margin-top:18px;font-size:14px">
      <tr><th>Recrutement</th><th style="text-align:left">Date</th><th style="text-align:left">Jalon déclencheur</th><th>Coût chargé/mois</th></tr>
      <tr><td>BizDev terrain n°1 + alternant marketing</td><td style="text-align:left">Sept. 2027</td><td style="text-align:left">≥&nbsp;5 pilotes payants</td><td>3&nbsp;900&nbsp;€ + 950&nbsp;€</td></tr>
      <tr><td>Développeur full-stack</td><td style="text-align:left">Janv. 2028</td><td style="text-align:left">≥&nbsp;40 domaines actifs</td><td>4&nbsp;800&nbsp;€</td></tr>
      <tr><td>BizDev terrain n°2</td><td style="text-align:left">Sept. 2028</td><td style="text-align:left">BizDev n°1 ≥&nbsp;6 signatures/mois</td><td>4&nbsp;000&nbsp;€</td></tr>
      <tr><td>Customer success</td><td style="text-align:left">Janv. 2029</td><td style="text-align:left">≥&nbsp;150 domaines actifs</td><td>3&nbsp;500&nbsp;€</td></tr>
    </table>
    <p class="small" style="margin-top:12px"><b>Externalisé :</b> comptabilité, juridique, design, packs (freelances), exécution logistique (partenaires). <b>Management :</b> OKR trimestriels, rituel pipeline hebdomadaire, revue KPI mensuelle, variable commercial sur les domaines <i>activés</i>.</p>`));

  // 25 — Risques
  const risks = [
    ["Adoption insuffisante", 4, 5, "Pilotes mesurés avant la levée, 30&nbsp;s au comptoir"],
    ["Rentabilité tardive", 3, 5, "Plan de gel des recrutements au 30/06/2028"],
    ["Dépendance aux logisticiens", 3, 4, "≥&nbsp;2 partenaires par destination, repli par fichiers"],
    ["Concurrence (DHL/Hillebrand, ERP)", 3, 4, "Neutralité, intégration, vitesse"],
    ["Saisonnalité", 4, 3, "Engagement 12 mois, scénarios d'hiver"],
    ["Financement", 3, 4, "Plan diversifié, version bootstrap"],
    ["Loi Évin, majorité, paiement de l'alcool", 3, 3, "Avocat, modèles conformes"],
    ["Données personnelles", 2, 4, "Hébergement UE, sous-traitance RGPD"],
  ];
  S.push(P(25, `
    ${head("Risques", "Les risques sont identifiés, <em>notés et traités</em>")}
    <div class="grid" style="grid-template-columns:420px 1fr;gap:30px;margin-top:18px">
      <svg width="420" height="400" viewBox="0 0 420 400">
        ${[1, 2, 3, 4, 5].map((p) => [1, 2, 3, 4, 5].map((i) => { const v = p * i; const f = v >= 15 ? "#E9C3CE" : v >= 9 ? COL.brassLight : "#EEF3EF"; return `<rect x="${40 + (i - 1) * 74}" y="${330 - p * 64}" width="72" height="62" rx="6" fill="${f}"/>`; }).join("")).join("")}
        <text x="225" y="392" text-anchor="middle" font-size="12" fill="${COL.muted}">Impact →</text>
        <text x="14" y="170" font-size="12" fill="${COL.muted}" transform="rotate(-90 14 170)" text-anchor="middle">Probabilité →</text>
        ${risks.map((r, k) => { const jitter = [[-14, -10], [14, 10], [-16, 14], [16, -14], [0, 0], [-18, -14], [18, 12], [10, 0]][k]; return `<circle cx="${40 + (r[2] - 1) * 74 + 36 + jitter[0]}" cy="${330 - r[1] * 64 + 31 + jitter[1]}" r="11" fill="${COL.wine}"/><text x="${40 + (r[2] - 1) * 74 + 36 + jitter[0]}" y="${330 - r[1] * 64 + 35 + jitter[1]}" text-anchor="middle" font-size="11" font-weight="700" fill="#fff">${k + 1}</text>`; }).join("")}
      </svg>
      <table class="t" style="font-size:14px">
        <tr><th>#</th><th style="text-align:left">Risque</th><th>P×I</th><th style="text-align:left">Mesure</th></tr>
        ${risks.map((r, k) => `<tr><td>${k + 1}</td><td style="text-align:left">${r[0]}</td><td><b>${r[1] * r[2]}</b></td><td style="text-align:left">${r[3]}</td></tr>`).join("")}
      </table>
    </div>
    <p class="small" style="margin-top:6px"><b>Principe :</b> ExportPilot 360 assiste ; il ne vend pas, ne transporte pas, ne déclare pas. Le schéma de responsabilités sera validé par un avocat avant le lancement (5,5&nbsp;k€ prévus en ante-création).</p>`));

  // 26 — BP : CA + CR
  const crRows = [
    ["CA abonnements", "ca_sub"], ["CA mises en service + packs", null, (c) => y("ca_set", c) + y("ca_svc", c)], ["CA commissions", "ca_com"],
    ["Chiffre d'affaires", "ca", null, "tot"], ["Marge brute", "mb", null, "sub"], ["Salaires et charges", "sal", null, "", -1], ["Tech (MVP, hébergement)", "tech", null, "", -1],
    ["Marketing, salons", "mkt", null, "", -1], ["Frais généraux", "ovh", null, "", -1], ["EBE", "ebitda", null, "tot"], ["Subvention Bourse French Tech", "grant"], ["Résultat net", "net", null, "tot"],
  ];
  const cell = (r, c) => { const v = r[2] ? r[2](c) : y(r[1], c) * (r[4] || 1); return `<td class="${v < 0 ? "neg" : ""}">${kfmt(v) === "–" ? "–" : kfmt(v) + "&nbsp;k€"}</td>`; };
  S.push(P(26, `
    ${head("Business plan", `Un chiffre d'affaires de <em>${keur(y("ca", "E"))}</em> en 2029, porté aux trois quarts par le récurrent`)}
    <div class="grid" style="grid-template-columns:.95fr 1.05fr;gap:28px;margin-top:16px">
      <div>
        ${stackedBars({ cats: ["2027", "2028", "2029"], series: [
          { name: "Abonnements", color: COL.s1, values: ["C", "D", "E"].map((c) => y("ca_sub", c)) },
          { name: "Mises en service", color: COL.s2, values: ["C", "D", "E"].map((c) => y("ca_set", c)) },
          { name: "Packs", color: COL.s3, values: ["C", "D", "E"].map((c) => y("ca_svc", c)) },
          { name: "Commissions", color: COL.s4, values: ["C", "D", "E"].map((c) => y("ca_com", c)) }], w: 540, h: 330 })}
        <div class="legend" style="margin-top:4px"><span><i style="background:${COL.s1}"></i>Abonnements</span><span><i style="background:${COL.s2}"></i>Mises en service</span><span><i style="background:${COL.s3}"></i>Packs</span><span><i style="background:${COL.s4}"></i>Commissions</span></div>
      </div>
      <table class="t" style="font-size:14px">
        <tr><th>Compte de résultat</th><th>Ante-création</th><th>2027</th><th>2028</th><th>2029</th></tr>
        ${crRows.map((r) => `<tr class="${r[3] || ""}"><td>${r[0]}</td>${["B", "C", "D", "E"].map((c) => cell(r, c)).join("")}</tr>`).join("")}
      </table>
    </div>`, { note: PROJ }));

  // 27 — Trésorerie, seuil, scénarios
  const cash = M.cash;
  const iMin = 27 + M.cash.slice(27).indexOf(Math.min(...M.cash.slice(27)));
  const sc = RES;
  S.push(P(27, `
    ${head("Rentabilité", "Point mort en <em>septembre 2029</em> avec ≈&nbsp;300 domaines ; un plan de gel protège le scénario pessimiste")}
    <div class="grid" style="grid-template-columns:1.05fr .95fr;gap:26px;margin-top:14px">
      <div>
        <h3>Trésorerie mensuelle (central, financement inclus)</h3>
        ${lineChart({ values: cash, labels: monthLabels, w: 600, h: 260, color: COL.s4, annotations: [{ i: 4, text: "levée + prêts", dy: -12, anchor: "start", dx: 10 }, { i: iMin, text: "point bas " + keur(cash[iMin]), dy: 22 }, { i: 34, text: "point mort", dy: -14 }], tickEvery: 6 })}
        <div class="grid g3" style="margin-top:8px">
          ${stat(n0(y("b_units", "E")), "domaines actifs = seuil 2029", "", "s")}${stat(keur1(y("b_mrr", "E")), "de MRR au seuil", "", "s")}${stat(keur(-RES.central_sans_financement.synthese.cashlow.B), "besoin brut (point bas sans financement)", "", "s")}
        </div>
      </div>
      <div>
        <h3>Scénarios (2029)</h3>
        <table class="t" style="font-size:14px">
          <tr><th></th><th>Pessimiste</th><th>Central</th><th>Optimiste</th><th>Pess. + gel</th></tr>
          <tr><td>Churn mensuel</td><td>2,5&nbsp;%</td><td>1,5&nbsp;%</td><td>1,0&nbsp;%</td><td>2,5&nbsp;%</td></tr>
          <tr><td>Domaines actifs</td>${["pessimiste", "central", "optimiste", "pessimiste_plan_gel"].map((k) => `<td>${n0(sc[k].synthese.k_act.E)}</td>`).join("")}</tr>
          <tr><td>ARR</td>${["pessimiste", "central", "optimiste", "pessimiste_plan_gel"].map((k) => `<td>${keur(sc[k].synthese.k_arr.E)}</td>`).join("")}</tr>
          <tr><td>CA</td>${["pessimiste", "central", "optimiste", "pessimiste_plan_gel"].map((k) => `<td>${keur(sc[k].synthese.ca.E)}</td>`).join("")}</tr>
          <tr class="sub"><td>EBE</td>${["pessimiste", "central", "optimiste", "pessimiste_plan_gel"].map((k) => `<td class="${sc[k].synthese.ebitda.E < 0 ? "neg" : ""}">${ks(sc[k].synthese.ebitda.E)}</td>`).join("")}</tr>
          <tr><td>Trésorerie min. 27-29</td>${["pessimiste", "central", "optimiste", "pessimiste_plan_gel"].map((k) => { const v = Math.min(...["C", "D", "E"].map((c) => sc[k].synthese.cash_min[c])); return `<td class="${v < 0 ? "neg" : ""}">${ks(v)}</td>`; }).join("")}</tr>
        </table>
        <div class="card brass" style="margin-top:14px"><p class="small"><b>Plan de gel :</b> si moins de 70 domaines sont actifs au 30 juin 2028, nous ne recrutons ni le 2ᵉ BizDev, ni le customer success, et le développeur est remplacé par de la maintenance freelance. Le besoin du pessimiste passe d'≈&nbsp;240&nbsp;k€ à ≈&nbsp;16&nbsp;k€.</p></div>
      </div>
    </div>`, { note: PROJ }));

  // 28 — Financement
  const fin = [
    ["Capacité d'autofinancement", "e_ebitda"], ["Apport des fondateurs", "e_apport"], ["Prêts d'honneur (comptes courants)", "e_cc"], ["Levée business angels", "e_ba"], ["Emprunt bancaire", "e_bank"],
    ["Investissements matériels", "u_capex", -1], ["Remboursement d'emprunt", "u_princ", -1], ["Variation de trésorerie", "var", 1, "sub"], ["Trésorerie fin de période", "cash_end", 1, "tot"],
  ];
  S.push(P(28, `
    ${head("Besoin de financement", "260&nbsp;k€ pour atteindre le point mort, dont <em>120&nbsp;k€ sollicités</em> auprès de business angels")}
    <div class="grid" style="grid-template-columns:1.1fr .9fr;gap:28px;margin-top:16px">
      <table class="t" style="font-size:14px">
        <tr><th>Plan de financement</th><th>Ante-création</th><th>2027</th><th>2028</th><th>2029</th></tr>
        ${fin.map((r) => `<tr class="${r[3] || ""}"><td>${r[0]}</td>${["B", "C", "D", "E"].map((c) => { const v = y(r[1], c) * (r[2] || 1); return `<td class="${v < 0 ? "neg" : ""}">${kfmt(v) === "–" ? "–" : kfmt(v) + "&nbsp;k€"}</td>`; }).join("")}</tr>`).join("")}
      </table>
      <div>
        <h3>Ressources (260&nbsp;k€)</h3>
        ${shareBar({ parts: [{ v: 120, c: COL.s1 }, { v: 60, c: COL.s4 }, { v: 40, c: COL.s3 }, { v: 30, c: COL.s2 }, { v: 10, c: COL.muted }], w: 480, h: 40 })}
        <div class="legend" style="margin-top:8px"><span><i style="background:${COL.s1}"></i>BA 120&nbsp;k€</span><span><i style="background:${COL.s4}"></i>Banque 60&nbsp;k€</span><span><i style="background:${COL.s3}"></i>Prêts d'honneur 40&nbsp;k€</span><span><i style="background:${COL.s2}"></i>Bourse French Tech 30&nbsp;k€</span><span><i style="background:${COL.muted}"></i>Apport 10&nbsp;k€</span></div>
        <div class="card tint" style="margin-top:16px"><h3>L'ask</h3><p class="small"><b>120&nbsp;k€</b> en BSA-AIR, plafond de valorisation proposé : 600&nbsp;k€ pré-monnaie (≈&nbsp;17&nbsp;% au plafond) — base de négociation, pas une valorisation démontrée.</p></div>
        <div class="card" style="margin-top:12px"><h3>Utilisation (18 premiers mois)</h3><p class="small">Produit ≈&nbsp;40&nbsp;% · équipe commerciale ≈&nbsp;35&nbsp;% · marketing et terrain ≈&nbsp;15&nbsp;% · frais généraux et juridique ≈&nbsp;10&nbsp;%.</p><p class="xs" style="margin-top:4px">Trésorerie de démarrage : 50&nbsp;k€ en décembre 2026 (apport + prêts d'honneur) pour financer le MVP avant la levée.</p></div>
      </div>
    </div>`, { note: PROJ }));

  // 29 — KPI
  const kpi = [
    ["MRR (décembre)", keur1(y("k_mrr", "C")), keur1(y("k_mrr", "D")), keur1(y("k_mrr", "E")), "Écart >&nbsp;15&nbsp;% : analyse mix et churn"],
    ["ARR", keur(y("k_arr", "C")), keur(y("k_arr", "D")), keur(y("k_arr", "E")), "Idem"],
    ["Domaines actifs", n0(y("k_act", "C")), n0(y("k_act", "D")), n0(y("k_act", "E")), "&lt;&nbsp;70 au 30/06/2028 : plan de gel"],
    ["Churn mensuel", "≤ 1,5 %", "≤ 1,5 %", "≤ 1,5 %", "&gt;&nbsp;2&nbsp;% : appel des domaines à risque"],
    ["CAC", eur(y("k_cac", "C")), eur(y("k_cac", "D")), eur(y("k_cac", "E")), "&gt;&nbsp;1&nbsp;500&nbsp;€ : moins de salons, plus de prescripteurs"],
    ["LTV / CAC", Math.round(y("k_ratio", "C")) + "", Math.round(y("k_ratio", "D")) + "", Math.round(y("k_ratio", "E")) + "", "&lt;&nbsp;3 : gel de l'acquisition payante"],
    ["Marge brute", pct(y("mbpct", "C")), pct(y("mbpct", "D")), pct(y("mbpct", "E")), "&lt;&nbsp;85&nbsp;% : revue des coûts directs"],
    ["Trésorerie", "≥ 25 k€", "≥ 25 k€", "≥ 25 k€", "&lt;&nbsp;3 mois de charges : gel ou levée"],
    ["Taux de capture (domaine)", "≥ 25 %", "≥ 25 %", "≥ 25 %", "&lt;&nbsp;15&nbsp;% : revoir le parcours"],
  ];
  S.push(P(29, `
    ${head("Pilotage", "Un tableau de bord qui <em>déclenche des décisions</em>")}
    <table class="t" style="margin-top:20px;font-size:16px">
      <tr><th>KPI</th><th>2027</th><th>2028</th><th>2029</th><th style="text-align:left">Décision si écart</th></tr>
      ${kpi.map((r) => `<tr><td><b>${r[0]}</b></td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td><td style="text-align:left" class="small">${r[4]}</td></tr>`).join("")}
    </table>
    <p class="small" style="margin-top:14px">Formules, fréquences et responsables détaillés en annexe. Chaque mois, le réel est saisi à côté du budget dans le modèle ; l'écart déclenche la décision prévue.</p>
    ${takeaway("Trois alertes déclenchent une décision écrite d'avance : < 70 domaines au 30/06/2028, churn > 2 %, trésorerie < 3 mois.")}`, { note: PROJ }));

  // 30 — Conclusion
  S.push(page(`
    <div style="position:absolute;right:-100px;bottom:-140px;opacity:.10">${logoMark(560, true)}</div>
    <div style="position:relative">
      <div class="kicker">Conclusion</div>
      <h1 style="font-size:44px">Le visiteur a déjà goûté. <em>Il ne manque que la suite.</em></h1>
      <div class="grid g3" style="margin-top:34px">
        <div class="card"><h3 style="color:${COL.brass}">Un vrai besoin</h3><p class="small">5,4&nbsp;M de visiteurs étrangers par an, une filière qui doit vendre mieux, aucun outil francophone pour l'après-visite.</p></div>
        <div class="card"><h3 style="color:${COL.brass}">Une réponse focalisée</h3><p class="small">WinePass + connexion aux logisticiens : léger, neutre, responsabilités claires.</p></div>
        <div class="card"><h3 style="color:${COL.brass}">Un plan prudent</h3><p class="small">Point mort fin 2029 en central, plan de gel en pessimiste, 260&nbsp;k€ dont 120&nbsp;k€ en BA.</p></div>
      </div>
      <div class="card" style="margin-top:22px"><h3 style="color:${COL.brass}">Les 90 prochains jours</h3><p class="small">20 entretiens de domaines · 10 pilotes signés · 2 logisticiens connectés · avis d'avocat · recrutement du CTO. Le premier versement de la levée est conditionné à ces preuves.</p></div>
      <p style="margin-top:26px;font-family:Fraunces;font-size:24px;color:${COL.brass}">Vendez au monde entier depuis votre caveau.</p>
    </div>`, { theme: "dark", n: 30, total: T }));

  return S;
}
