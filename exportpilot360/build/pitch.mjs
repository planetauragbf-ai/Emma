// Soutenance ExportPilot 360 — 20 slides, 20 minutes (grille Euridis : KPI, CR ≤ 15 lignes, plan de financement ≤ 15 lignes).
import { C, M, RES, COL, kfmt, page, logoMark, wordmark, stackedBars, lineChart, hbars, shareBar, monthLabels, n0, eur, keur, keur1, pct, signed, ks } from "./lib.mjs";

const T = 20;
const y = (k, c) => C[k][c];
const P = (n, body, o = {}) => page(body, { n, total: T, theme: "pitch", ...o });
const big = (k, t) => `<div class="kicker">${k}</div><h1 style="font-size:44px">${t}</h1>`;
const stat = (v, l, cls = "") => `<div><div class="stat ${cls}">${v}</div><div class="statlbl">${l}</div></div>`;

// Notes orales (≈ 60 s par slide, 20 min au total) — reprises dans le PPTX.
export const NOTES = [
  "[0:00 – 0:45] Accroche. « Vendez au monde entier depuis votre caveau. » Je me présente : fondatrice d'ExportPilot 360, quatre saisons passées au contact des caveaux dans l'expédition internationale de vin.",
  "[0:45 – 1:45] Story : Emily, de Chicago, goûte six vins, en adore deux, en achète deux bouteilles parce que sa valise est pleine. Rentrée chez elle, elle voudrait racheter. Elle ne sait ni comment ni combien. Le domaine ne la reverra jamais. Multipliez par 5,4 millions de visiteurs étrangers par an.",
  "[1:45 – 2:45] Start with why : un vigneron ne devrait jamais perdre un client parce qu'il habite à 8 000 km. Genèse : la question entendue au comptoir. Projet indépendant, aucune donnée de mon ancien employeur, qui pourra être un partenaire parmi d'autres.",
  "[2:45 – 3:45] Environnement : consommation −3,2 %, arrachage de 27 929 ha, exportations vers les États-Unis −21 %. Mais 12 M d'œnotouristes, dont 45 % d'étrangers. La croissance passe par la valeur, la vente directe et l'international.",
  "[3:45 – 4:45] Douleurs : le domaine (payeur) perd des ventes et craint la douane ; le caveau (utilisateur) n'a pas le temps ; le visiteur (client final) craint les taxes ; offices de tourisme et logisticiens sont prescripteurs et partenaires. Payeur, utilisateur, client : trois personnes différentes.",
  "[4:45 – 5:45] Alternatives : les logisticiens expédient — myBottlesDelivered de Hillebrand-DHL permet même de commander sur place par QR code, gratuitement. Les caisses encaissent, les plateformes réservent. Mais personne ne relance le visiteur une fois rentré chez lui. C'est notre espace.",
  "[5:45 – 6:45] Solution : quatre verbes. Capter avec un QR de dégustation, relancer dans sa langue, faire recommander avec un prix rendu chez lui, expédier via un partenaire. Le domaine ne touche jamais à la douane.",
  "[6:45 – 7:45] Démonstration du concept : quatre écrans. Ce sont des maquettes, le produit n'existe pas encore. Insister : le QR WinePass est distinct de l'e-label réglementaire.",
  "[7:45 – 8:45] Notre crash-test : le concept initial à trois activités était trop large. Hub export réduit à une connexion, WinePass au cœur, services transformés en activation. Ce qui tuerait le projet : capture < 15 %, réachat < 2 %, refus des logisticiens.",
  "[8:45 – 9:45] Marché : TAM ≈ 26 M€, SAM ≈ 7,4 M€ (5 000 domaines ouverts à la visite avec clientèle étrangère), SOM 2029 = 308 domaines, 6 % du SAM. Cœur de cible : Julien, vigneron de 18 ha dans le Luberon. Une PME rentable, l'Europe ensuite.",
  "[9:45 – 10:45] Positionnement et USP : le seul acteur spécialisé ET relationnel. Avantages durables : données de préférence, réseau de partenaires, ancrage terrain. Le concurrent le plus proche est aussi un partenaire potentiel.",
  "[10:45 – 11:45] Business model : 59, 129, 249 € par mois. Prix justifié : une seule commande de réachat par mois rembourse l'offre Export ; entre les CRM génériques et les outils américains. Plus 390 € de mise en service, packs et 2 % de commission.",
  "[11:45 – 12:45] Stratégie commerciale : terrain de novembre à avril, prescripteurs ensuite. 45, 125 puis 200 signatures, soit environ 30 % des démonstrations. 10 pilotes avant tout.",
  "[12:45 – 13:30] Communication : un message répété, « Vendez au monde entier depuis votre caveau ». Preuves réelles uniquement, ton terrien, conformité loi Évin et RGPD.",
  "[13:30 – 14:15] Mise en œuvre : MVP en mars 2027, développement en 2027-2028, croissance en 2029. Chaque phase a ses critères de passage chiffrés.",
  "[14:15 – 15:00] Équipe : moi en CEO, un CTO associé à recruter — c'est notre principale faiblesse, et le lancement en dépend. Recrutements déclenchés par des jalons, pas par le calendrier.",
  "[15:00 – 16:00] Chiffres clés : 308 domaines actifs, 439 k€ d'ARR en 2029, CAC ≈ 1 060 €, LTV ≈ 8 600 €, churn 1,5 % par mois. Seuil : 306 domaines actifs en 2029.",
  "[16:00 – 17:00] Compte de résultat : 45 k€, 236 k€ puis 490 k€ de chiffre d'affaires ; EBE positif en 2029 (+17 k€), point mort en septembre 2029. Les postes principaux : salaires, MVP sous-traité, salons.",
  "[17:00 – 18:15] Plan de financement : besoin de 260 k€, point bas sans financement −208 k€. Trésorerie de démarrage de 50 k€ en décembre 2026. Nous sollicitons 120 k€ auprès de business angels, en BSA-AIR. Plan de gel en scénario pessimiste.",
  "[18:15 – 20:00] Résumé : un vrai besoin, une réponse focalisée, un plan prudent. Les 90 prochains jours : 20 entretiens, 10 pilotes, 2 logisticiens, l'avis d'un avocat, un CTO. Répéter la phrase d'accroche. Merci, place aux questions.",
];

export function pitchSlides() {
  const S = [];
  // 1
  S.push(page(`
    <div style="position:absolute;inset:0;background:radial-gradient(circle at 80% 30%,#3a2133 0,${COL.ink} 60%)"></div>
    <div style="position:absolute;right:-90px;top:-60px;opacity:.12">${logoMark(560, true)}</div>
    <div style="position:relative;height:100%;display:flex;flex-direction:column;justify-content:center">
      <div style="display:flex;align-items:center;gap:14px;margin-bottom:40px">${logoMark(60, true)}${wordmark(40, true)}</div>
      <h1 style="font-size:64px">Vendez au monde entier<br><em>depuis votre caveau.</em></h1>
      <p class="lead" style="margin-top:22px">[Prénom Nom] · fondatrice · Soutenance Bloc 3 — Euridis Business School</p>
    </div>`, { theme: "dark" }));
  // 2 — story
  S.push(P(2, `
    <div class="grid g2" style="grid-template-columns:1fr 1fr;gap:50px;height:100%;align-items:center">
      <div>
        <div class="kicker">Une histoire vraie… 5,4 millions de fois par an</div>
        <h1 style="font-size:46px">Emily a goûté <em>6 vins</em>.<br>Elle en a acheté <em>2</em>.</h1>
        <p class="lead">Sa valise était pleine. Rentrée à Chicago, elle voudrait en racheter. Elle ne sait ni comment, ni combien ça coûte livré.</p>
        <p class="lead" style="font-weight:700;color:${COL.wine}">Le domaine ne la reverra jamais.</p>
      </div>
      <div class="card" style="text-align:center;padding:40px">
        <div class="stat" style="font-size:96px">5,4&nbsp;M</div>
        <div class="statlbl" style="font-size:18px">œnotouristes étrangers par an en France</div>
        <div class="src">Atout France via Vin &amp; Société, 2025</div>
      </div>
    </div>`));
  // 3 — why
  S.push(P(3, `
    ${big("Start with Why", "Un vigneron ne devrait jamais perdre un client <em>parce qu'il habite à 8&nbsp;000&nbsp;km</em>.")}
    <div class="grid g3" style="margin-top:44px">
      <div class="card"><div class="num">Why</div><p style="margin-top:10px">Rendre aux petits domaines la relation avec leurs clients du monde entier.</p></div>
      <div class="card"><div class="num">How</div><p style="margin-top:10px">Un seul outil pour capter, relancer, faire recommander, avec des partenaires spécialisés pour expédier.</p></div>
      <div class="card"><div class="num">What</div><p style="margin-top:10px">WinePass + connexion aux logisticiens + activation des domaines.</p></div>
    </div>
    <p class="lead" style="margin-top:30px">Genèse : quatre saisons dans l'expédition internationale de vin, et une question entendue au comptoir — <i>« Comment je fais pour en racheter, une fois rentré chez moi ? »</i></p>`));
  // 4 — environnement
  S.push(P(4, `
    ${big("L'environnement", "La filière doit <em>vendre mieux</em>, pas plus")}
    <div class="grid g4" style="margin-top:44px">
      <div class="card">${stat("−3,2&nbsp;%", "consommation de vin en France, 2025")}</div>
      <div class="card">${stat("27&nbsp;929&nbsp;ha", "de vignes arrachées en 2026")}</div>
      <div class="card">${stat("−21&nbsp;%", "d'exportations vers les États-Unis en 2025")}</div>
      <div class="card tint">${stat("12&nbsp;M", "d'œnotouristes, dont 45&nbsp;% d'étrangers")}</div>
    </div>
    <p class="lead" style="margin-top:34px">La croissance passe par la <b>valeur</b>, la <b>vente directe</b> et l'<b>international</b> — et le client international vient déjà jusqu'au domaine.</p>
    <p class="xs" style="margin-top:10px">Sources : OIV 2026, Réussir Vigne 2026, FEVS 2026, Atout France via Vin &amp; Société 2025.</p>`));
  // 5 — douleurs
  const sh = [["Domaine", "Payeur", "Ventes perdues, peur de la douane", COL.s1], ["Équipe du caveau", "Utilisateur", "Pas le temps au comptoir", COL.s3], ["Visiteur étranger", "Client final", "Taxes et colis bloqué", COL.s4], ["Tourisme, interprofessions", "Prescripteurs", "Visiteurs repartis les mains vides", COL.s2], ["Logisticiens", "Partenaires", "Coût d'acquisition des envois", COL.muted]];
  S.push(P(5, `
    ${big("Le problème", "Cinq parties prenantes, <em>un seul payeur</em>")}
    <div class="grid g5" style="margin-top:44px">
      ${sh.map(([a, b, c, col]) => `<div class="card" style="border-top:6px solid ${col};text-align:center"><h2 style="font-size:19px">${a}</h2><span class="tag">${b}</span><p class="small" style="margin-top:12px">${c}</p></div>`).join("")}
    </div>
    <p class="lead" style="margin-top:34px">Le parcours se casse <b>au moment du départ</b> : aucun contact laissé, aucun prix « livré chez moi », aucune relance.</p>`));
  // 6 — alternatives
  S.push(P(6, `
    ${big("Ce qui existe", "Tout est couvert… <em>sauf l'après-visite</em>")}
    <div class="grid g4" style="margin-top:40px">
      ${[["Expédier", "Commissionnaires · myBottlesDelivered (Hillebrand / DHL) : commande sur place par QR, sans coût fixe", "✔"], ["Encaisser", "Caisses viticoles (Vitisoft, Wino)", "✔"], ["Réserver", "Winalist, Rue des Vignerons", "✔"], ["Relancer et faire recommander depuis l'étranger", "Aucun acteur francophone", "✘"]]
        .map(([a, b, c], i) => `<div class="card ${i === 3 ? "tint" : ""}" style="${i === 3 ? `border:2px solid ${COL.s1}` : ""}"><div class="num" style="color:${i === 3 ? COL.s1 : COL.s3}">${c}</div><h2 style="margin-top:8px">${a}</h2><p class="small">${b}</p></div>`).join("")}
    </div>
    <p class="lead" style="margin-top:30px">Le concurrent le plus proche, <b>myBottlesDelivered</b>, traite le visiteur qui achète sur place. <b>Nous relançons tous les autres</b> — et il peut devenir l'un de nos partenaires.</p>`));
  // 7 — solution
  S.push(P(7, `
    ${big("La solution", "ExportPilot 360, <em>de la dégustation à la livraison internationale</em>")}
    <div style="display:flex;gap:16px;margin-top:46px">
      ${[["1", "Capter", "QR de dégustation : 30&nbsp;s, consentement", COL.s1], ["2", "Relancer", "Dans sa langue : vos vins, millésime, Noël", COL.s2], ["3", "Faire recommander", "Prix rendu chez lui, fourni par un partenaire", COL.s3], ["4", "Expédier", "Le logisticien choisi dédouane et livre", COL.s4]]
        .map(([n, t, d, c]) => `<div class="card" style="flex:1;border-top:6px solid ${c};padding:26px"><div class="num" style="color:${c};font-size:40px">${n}</div><h2 style="margin-top:12px;font-size:26px">${t}</h2><p>${d}</p></div>`).join('<div class="arrow" style="align-self:center;font-size:28px">→</div>')}
    </div>
    <p class="lead" style="margin-top:34px;font-weight:600">Le domaine vend. Le partenaire expédie. ExportPilot 360 relie les deux — sans jamais toucher à la douane.</p>`));
  // 8 — démo concept (réutilise des écrans simplifiés)
  const ph = (t, lines, btn) => `<div class="phone" style="width:210px;height:410px"><div class="scr"><div style="font-weight:700;font-size:13px;margin-bottom:8px">${t}</div>${lines.map((l) => `<div style="border-bottom:1px solid #eee;padding:8px 0">${l}</div>`).join("")}${btn ? `<div style="margin-top:12px;background:${COL.wine};color:#fff;border-radius:8px;padding:9px;text-align:center;font-weight:700">${btn}</div>` : ""}</div></div>`;
  S.push(P(8, `
    ${big("Le produit — concept", "Quatre écrans, <em>zéro douane pour le domaine</em>")}
    <div style="display:flex;justify-content:space-between;margin-top:26px">
      ${ph("Your tasting · EN", ["Rosé 2025 ★", "Rouge Réserve 2022 ★", "Cuvée Prestige", "☐ 18+ · ☐ Keep me informed"], "Save my wines")}
      ${ph("J+3 · Your wines", ["Rouge Réserve 2022", "Cuvée Prestige — new vintage"], "Order again")}
      ${ph("Order · Chicago", ["6 × Rouge Réserve", "Delivery, duties, taxes*", "*Estimate by partner"], "Pay &amp; ship")}
      ${ph("Tableau de bord", ["Contacts captés", "Taux de capture", "Réachats", "CA généré"], "")}
    </div>
    <div class="concept">CONCEPT — MAQUETTES, PRODUIT NON DÉVELOPPÉ</div>`));
  // 9 — crash-test
  S.push(P(9, `
    ${big("Notre crash-test", "Trois activités au départ : <em>nous avons recentré</em>")}
    <div class="grid g3" style="margin-top:40px">
      <div class="card"><span class="tag ink">Hub export</span><h2 style="margin-top:12px">→ Une connexion</h2><p class="small">Les logisticiens le font déjà. On branche, on ne reconstruit pas.</p></div>
      <div class="card tint" style="border:2px solid ${COL.s1}"><span class="tag wine">WinePass</span><h2 style="margin-top:12px">→ Le cœur</h2><p class="small">Le seul espace libre, mesurable en ventes nouvelles.</p></div>
      <div class="card"><span class="tag ink">Services</span><h2 style="margin-top:12px">→ Activation</h2><p class="small">Mise en service et packs freelances, pas d'agence.</p></div>
    </div>
    <div class="card brass" style="margin-top:28px"><p style="font-size:18px"><b>Ce qui tuerait le projet :</b> capture &lt;&nbsp;15&nbsp;% · réachat &lt;&nbsp;2&nbsp;% · refus des logisticiens. Mesuré sur 10 pilotes <b>avant</b> de dépenser la levée.</p></div>`));
  // 10 — marché + cible
  S.push(P(10, `
    ${big("Marché et cible", `≈&nbsp;5&nbsp;000 domaines visés, <em>${n0(y("k_act", "E"))}</em> clients en 2029`)}
    <div class="grid" style="grid-template-columns:1fr 1fr;gap:40px;margin-top:30px;align-items:center">
      <div class="grid" style="gap:14px">
        ${[["TAM", "≈ 26 M€", "17 700 domaines en vente directe", "#E9D2DA"], ["SAM", "≈ 7,4 M€", "5 000 domaines ouverts à la visite, clientèle étrangère", "#D9A9B8"], ["SOM 2029", keur(y("k_arr", "E")), `${n0(y("k_act", "E"))} domaines = ${pct(y("k_act", "E") / 5000, 1)} du SAM`, COL.s1]]
          .map(([a, b, c, bg], i) => `<div style="background:${bg};border-radius:14px;padding:16px 22px;color:${i === 2 ? "#fff" : COL.ink};margin-left:${i * 40}px"><div style="display:flex;justify-content:space-between;align-items:baseline"><b>${a}</b><span style="font-family:Fraunces;font-size:28px;font-weight:700">${b}</span></div><div class="small">${c}</div></div>`).join("")}
      </div>
      <div class="card" style="border-top:6px solid ${COL.s1}"><span class="tag wine">Persona cœur de cible</span><h2 style="margin-top:12px">Julien, 46 ans</h2><p>Vigneron de 18&nbsp;ha dans le Luberon, 35&nbsp;% de visiteurs étrangers, pas d'outil de relance.</p><p class="small" style="margin-top:10px"><b>Il veut :</b> vendre plus sans embaucher.<br><b>Il craint :</b> « encore un abonnement ».<br><b>On lui dit :</b> une commande par mois paie l'outil.</p></div>
    </div>`));
  // 11 — positionnement
  S.push(P(11, `
    ${big("Positionnement", "Le seul acteur <em>spécialisé et relationnel</em>")}
    <div class="grid g2" style="margin-top:30px;gap:40px;align-items:center">
      <svg width="520" height="360" viewBox="0 0 520 360">
        <line x1="260" y1="10" x2="260" y2="350" stroke="${COL.ink}"/><line x1="10" y1="180" x2="510" y2="180" stroke="${COL.ink}"/>
        <text x="266" y="22" font-size="12" fill="${COL.muted}">Spécialisé vin international</text><text x="14" y="172" font-size="12" fill="${COL.muted}">Transaction</text><text x="506" y="172" text-anchor="end" font-size="12" fill="${COL.muted}">Relation</text>
        <rect x="268" y="30" width="236" height="142" rx="12" fill="${COL.rose}"/>
        ${[[90, 70, "Logisticiens, myBottlesDelivered"], [80, 250, "Transporteurs"], [150, 300, "Caisses viticoles"], [370, 250, "Commerce7 (US)"], [390, 315, "CRM génériques"]].map(([x, yy, t]) => `<circle cx="${x}" cy="${yy}" r="7" fill="${COL.muted}"/><text x="${x + 12}" y="${yy + 4}" font-size="13">${t}</text>`).join("")}
        <circle cx="390" cy="90" r="13" fill="${COL.s1}"/><text x="390" y="126" text-anchor="middle" font-size="15" font-weight="700" fill="${COL.wine}">ExportPilot 360</text>
      </svg>
      <div><div class="card tint"><span class="tag wine">USP</span><p style="margin-top:10px;font-size:19px;font-weight:600;line-height:1.4">Le visiteur étranger devient un client récurrent, au prix livré chez lui, expédié par le logisticien choisi par le domaine.</p></div>
      <ul class="clean" style="margin-top:16px"><li>Données de préférence accumulées</li><li>Réseau de partenaires, neutralité</li><li>Ancrage terrain et densité régionale</li></ul></div>
    </div>`));
  // 12 — business model
  S.push(P(12, `
    ${big("Business model", "Une commande par mois <em>paie l'abonnement</em>")}
    <div class="grid g3" style="margin-top:36px">
      ${[["Caveau", "59", "Fichier et relances"], ["Export", "129", "Réachat international"], ["Signature", "249", "Multi-sites, intégrations"]].map(([n, p, d], i) => `<div class="card ${i === 1 ? "tint" : ""}" style="text-align:center;${i === 1 ? `border:2px solid ${COL.s1}` : ""}"><h2>${n}</h2><div class="stat">${p}&nbsp;€</div><div class="small muted">HT/mois · 12&nbsp;mois</div><p style="margin-top:8px">${d}</p></div>`).join("")}
    </div>
    <div class="grid g3" style="margin-top:22px">
      <div class="card"><b>+ 390&nbsp;€</b> de mise en service</div><div class="card"><b>+ 2&nbsp;%</b> sur les réachats</div><div class="card"><b>+ packs</b> ≈&nbsp;750&nbsp;€ (freelances)</div>
    </div>
    <p class="lead" style="margin-top:22px"><b>Prix justifié :</b> 12 bouteilles × 25&nbsp;€ = 300&nbsp;€ de vente, ≈&nbsp;150&nbsp;€ de marge pour le domaine — l'offre Export est remboursée par <b>une seule commande par mois</b>. Positionné entre les CRM génériques (7–20&nbsp;€) et les outils vin américains (59–399&nbsp;$ + commission).</p>`));
  // 13 — stratégie commerciale
  S.push(P(13, `
    ${big("Stratégie commerciale", "Terrain l'hiver, prescripteurs toute l'année")}
    <div class="grid g2" style="margin-top:30px;gap:40px">
      <div>
        ${stackedBars({ cats: ["2027", "2028", "2029"], series: [{ name: "Signatures", color: COL.s1, values: ["C", "D", "E"].map((c) => y("k_new", c)) }], w: 520, h: 300, fmt: (v) => n0(v) })}
        <p class="small" style="text-align:center">Nouveaux domaines signés (≈&nbsp;30&nbsp;% des démonstrations)</p>
      </div>
      <div>
        <h3>Séquencement</h3>
        <ul class="clean"><li><b>Mars-juin 2027 :</b> 10 pilotes, 3 mois offerts</li><li><b>Sept. 2027 :</b> 1er BizDev terrain</li><li><b>2028 :</b> 2 BizDev + prescripteurs (offices de tourisme, interprofessions, logisticiens)</li><li><b>2029 :</b> national + pilote Italie ou Espagne</li></ul>
        <h3 style="margin-top:16px">Mix des canaux (2028)</h3>
        ${hbars({ items: [{ l: "Terrain", v: 45 }, { l: "Prescripteurs", v: 30, c: COL.s3 }, { l: "Digital", v: 15, c: COL.s4 }, { l: "Salons", v: 10, c: COL.s2 }], w: 520, rowH: 30, fmt: (v) => v + " %", max: 50 })}
      </div>
    </div>`));
  // 14 — communication
  S.push(P(14, `
    ${big("Communication", "Un message, <em>répété partout</em>")}
    <div class="card wine" style="margin-top:36px;background:${COL.wine};color:#fff;text-align:center;padding:34px"><p style="font-family:Fraunces;font-size:38px">« Vendez au monde entier depuis votre caveau. »</p></div>
    <div class="grid g3" style="margin-top:24px">
      <div class="card"><h3>Preuves</h3><p class="small">Cas pilotes chiffrés (avec accord écrit), démonstration sur ses vins, partenaires reconnus.</p></div>
      <div class="card"><h3>Canaux</h3><p class="small">Terrain, LinkedIn, webinaires interprofessions, Wine Paris, Sitevi, presse viticole.</p></div>
      <div class="card"><h3>Règles</h3><p class="small">Ton terrien, sans jargon. Loi Évin, RGPD, aucune communication vers les mineurs.</p></div>
    </div>`));
  // 15 — mise en œuvre
  S.push(P(15, `
    ${big("Mise en œuvre", "Trois phases, <em>trois portes de passage</em>")}
    <div style="display:flex;margin-top:46px;gap:0">
      ${[["MVP", "Déc. 26 → juin 27", "≥ 5 pilotes payants · 2 logisticiens", COL.s1], ["Développement", "Juil. 27 → déc. 28", "ARR ≥ 200 k€ · LTV/CAC ≥ 3 mesuré", COL.s3], ["Croissance", "2029", "EBE positif · pilote européen", COL.s4]]
        .map(([t, d, c, col], i) => `<div style="flex:1;position:relative;padding-right:20px"><div style="height:10px;background:${col};border-radius:5px"></div><div class="num" style="color:${col};margin-top:16px">${i + 1}</div><h2 style="margin-top:8px">${t}</h2><div class="small muted">${d}</div><p class="small" style="margin-top:10px"><b>Porte :</b> ${c}</p></div>`).join("")}
    </div>
    <p class="lead" style="margin-top:40px">Jamais construit : moteur de taxes, documents douaniers, transport. <b>Nous assistons, les partenaires exécutent.</b></p>`));
  // 16 — équipe
  S.push(P(16, `
    ${big("L'équipe", "Une fondatrice du terrain, <em>un CTO à embarquer</em>")}
    <div class="grid g2" style="margin-top:34px;gap:28px">
      <div class="card tint"><span class="tag wine">CEO</span><h2 style="margin-top:10px">[Prénom Nom]</h2><p>Quatre ans dans l'export B2C de vin, Mastère Marketing &amp; Digital Business. Vente, partenariats, finance.</p></div>
      <div class="card"><span class="tag">CTO · à recruter</span><h2 style="margin-top:10px">Associé·e technique</h2><p>Full-stack, 5 ans ou plus d'expérience SaaS. 25 à 30&nbsp;% avec vesting. <b>Condition du lancement.</b></p></div>
    </div>
    <div style="display:flex;gap:12px;margin-top:24px">
      ${[["Sept. 27", "BizDev + alternant"], ["Janv. 28", "Développeur"], ["Sept. 28", "BizDev n°2"], ["Janv. 29", "Customer success"]].map(([d, r]) => `<div class="card" style="flex:1;text-align:center"><div class="num" style="font-size:20px">${d}</div><p class="small" style="margin-top:6px">${r}</p></div>`).join("")}
    </div>
    <p class="small" style="margin-top:14px">Chaque recrutement est déclenché par un jalon (pilotes payants, domaines actifs), pas par le calendrier.</p>`));
  // 17 — KPI
  S.push(P(17, `
    ${big("Chiffres clés", "Les indicateurs qui pilotent l'entreprise")}
    <div class="grid g4" style="margin-top:34px">
      <div class="card">${stat(n0(y("k_act", "E")), "domaines actifs fin 2029")}</div>
      <div class="card">${stat(keur(y("k_arr", "E")), "ARR fin 2029")}</div>
      <div class="card">${stat(keur(y("ca", "E")), "chiffre d'affaires 2029")}</div>
      <div class="card">${stat(pct(y("mbpct", "E")), "marge brute 2029")}</div>
      <div class="card">${stat(eur(y("k_cac", "E")), "CAC")}</div>
      <div class="card">${stat(eur(y("k_ltv", "E")), "LTV")}</div>
      <div class="card">${stat("1,5&nbsp;%", "churn mensuel (≈&nbsp;17&nbsp;%/an)")}</div>
      <div class="card tint">${stat(n0(y("b_units", "E")), "domaines actifs = seuil de rentabilité 2029")}</div>
    </div>
    <p class="xs" style="margin-top:14px">Scénario central · projections non auditées · modèle à formules disponible en annexe.</p>`));
  // 18 — compte de résultat (≤ 15 lignes)
  const cr = [["CA abonnements", (c) => y("ca_sub", c)], ["CA mises en service + packs", (c) => y("ca_set", c) + y("ca_svc", c)], ["CA commissions", (c) => y("ca_com", c)], ["Chiffre d'affaires", (c) => y("ca", c), "tot"], ["Coûts directs", (c) => -y("cd", c)], ["Marge brute", (c) => y("mb", c), "sub"], ["Salaires et charges", (c) => -y("sal", c)], ["Tech (MVP, hébergement)", (c) => -y("tech", c)], ["Marketing, salons", (c) => -y("mkt", c)], ["Frais généraux", (c) => -y("ovh", c)], ["EBE", (c) => y("ebitda", c), "tot"], ["Amortissements, intérêts", (c) => -(y("dep", c) + y("int", c))], ["Subvention", (c) => y("grant", c)], ["Résultat net", (c) => y("net", c), "tot"]];
  S.push(P(18, `
    <div class="kicker">Compte de résultat (k€)</div><h1>CA ×11 entre 2027 et 2029, <em>EBE positif en 2029</em></h1>
    <table class="t" style="margin-top:18px;font-size:15px">
      <tr><th>14 lignes</th><th>Ante-création</th><th>2027</th><th>2028</th><th>2029</th></tr>
      ${cr.map(([l, f, cls]) => `<tr class="${cls || ""}"><td>${l}</td>${["B", "C", "D", "E"].map((c) => { const v = f(c); return `<td class="${v < 0 ? "neg" : ""}">${kfmt(v)}</td>`; }).join("")}</tr>`).join("")}
    </table>`, { note: "Projections non auditées" }));
  // 19 — plan de financement (≤ 15 lignes)
  const fp = [["Capacité d'autofinancement", "e_ebitda"], ["Apport des fondateurs", "e_apport"], ["Prêts d'honneur (comptes courants)", "e_cc"], ["Levée business angels", "e_ba"], ["Emprunt bancaire", "e_bank"], ["Total ressources externes", "e_tot", 1, "sub"], ["Investissements", "u_capex", -1], ["Remboursement d'emprunt", "u_princ", -1], ["Variation de trésorerie", "var", 1, "sub"], ["Trésorerie fin de période", "cash_end", 1, "tot"]];
  S.push(P(19, `
    <div class="kicker">Plan de financement (k€) · ante-création + 3 ans</div><h1>Besoin : <em>260&nbsp;k€</em> · montant sollicité : <em>120&nbsp;k€</em></h1>
    <div class="grid" style="grid-template-columns:1.25fr .75fr;gap:26px;margin-top:16px">
      <table class="t" style="font-size:14.5px">
        <tr><th>10 lignes</th><th>Ante-création</th><th>2027</th><th>2028</th><th>2029</th></tr>
        ${fp.map(([l, k, sgn, cls]) => `<tr class="${cls || ""}"><td>${l}</td>${["B", "C", "D", "E"].map((c) => { const v = y(k, c) * (sgn || 1); return `<td class="${v < 0 ? "neg" : ""}">${kfmt(v)}</td>`; }).join("")}</tr>`).join("")}
      </table>
      <div>
        <div class="card"><h3>Trésorerie de démarrage</h3><p class="small"><b>50&nbsp;k€</b> en décembre 2026 (apport + prêts d'honneur) : MVP et juridique avant la levée.</p></div>
        <div class="card" style="margin-top:10px"><h3>Besoin brut</h3><p class="small">Point bas sans financement : <b>${keur(RES.central_sans_financement.synthese.cashlow.B)}</b> → 260&nbsp;k€ avec réserve de sécurité.</p></div>
        <div class="card tint" style="margin-top:10px"><h3>L'ask</h3><p class="small"><b>120&nbsp;k€</b> business angels en BSA-AIR (plafond proposé 600&nbsp;k€ pré-monnaie) + banque 60&nbsp;k€ + prêts d'honneur 40&nbsp;k€ + Bourse French Tech 30&nbsp;k€ + apport 10&nbsp;k€.</p></div>
      </div>
    </div>`, { note: "Projections non auditées" }));
  // 20 — conclusion
  S.push(page(`
    <div style="position:absolute;right:-80px;bottom:-120px;opacity:.10">${logoMark(520, true)}</div>
    <div style="position:relative">
      <div class="kicker">En résumé</div>
      <h1 style="font-size:46px">Le visiteur a déjà goûté.<br><em>Il ne manque que la suite.</em></h1>
      <div class="grid g3" style="margin-top:34px">
        ${[["Un vrai besoin", "5,4&nbsp;M de visiteurs étrangers, aucun outil pour l'après-visite"], ["Une réponse focalisée", "WinePass + partenaires logistiques, responsabilités claires"], ["Un plan prudent", "Point mort fin 2029, plan de gel, 120&nbsp;k€ sollicités"]].map(([a, b]) => `<div class="card"><h3 style="color:${COL.brass}">${a}</h3><p class="small">${b}</p></div>`).join("")}
      </div>
      <p class="small" style="margin-top:22px;color:#E8E2EC"><b>90 prochains jours :</b> 20 entretiens · 10 pilotes · 2 logisticiens · avis d'avocat · CTO.</p>
      <p style="margin-top:22px;font-family:Fraunces;font-size:30px;color:${COL.brass}">Vendez au monde entier depuis votre caveau.</p>
    </div>`, { theme: "dark", n: 20, total: T }));
  return S;
}
