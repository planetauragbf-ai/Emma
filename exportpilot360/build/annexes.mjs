// Annexes du dossier (hors des 30 pages du deck) : hypothèses, trésorerie mensuelle, KPI, sources.
import { C, M, COL, kfmt, page, n0, eur, keur, pct, signed, monthLabels } from "./lib.mjs";

const T = 5;
const P = (n, body) => page(body, { n: "A" + n, total: "A" + T, note: "Annexes — projections non auditées" });
const head = (k, t) => `<div class="kicker">${k}</div><h1 style="font-size:30px">${t}</h1>`;

export function annexSlides() {
  const S = [];
  // A1 — hypothèses
  const hyp = [
    ["Prix des offres", "59 / 129 / 249 € HT par mois", "Ancrage ROI (une commande par mois) et benchmark (CRM 7–20 €, outils vin US 59–399 $)", "HYP"],
    ["Mix des clients", "40 % / 45 % / 15 %", "L'offre Export est la raison d'être du produit", "HYP"],
    ["Mise en service", "390 € (offerte aux 10 pilotes, + 3 mois gratuits)", "Une demi-journée de paramétrage et de formation", "HYP"],
    ["Signatures (central)", "45 / 125 / 200", "≈ 6 signatures par mois par BizDev en haute saison de vente, 30 % de conversion", "HYP"],
    ["Saisonnalité", "70 % des signatures de novembre à avril", "Disponibilité des domaines hors saison", "HYP"],
    ["Churn", "1,5 % par mois (pess. 2,5 % · opt. 1,0 %)", "Fourchette prudente de 1,5 à 3 % par mois pour des TPE", "HYP / benchmark secondaire"],
    ["Commission", "2 % × 250 € × 8 / 14 / 18 réachats par an", "Prudence : volumes non prouvés", "HYP"],
    ["Packs", "30 % des nouveaux clients × 750 €, coût 60 %", "Freelances partenaires", "HYP"],
    ["Coût variable", "5 € par domaine actif et par mois", "Hébergement UE, e-mails, SMS, traduction API", "HYP"],
    ["Équipe", "Fondateurs 2 300 → 4 600 €/mois ; BizDev 3 900 € ; dev 4 800 € ; CS 3 500 €", "Coûts employeur chargés", "HYP"],
    ["MVP", "5 k€ par mois de déc. 2026 à avril 2027, puis 0,8 k€ de maintenance", "Freelance au forfait encadré par le CTO", "HYP"],
    ["Financement", "Apport 10 k€ · prêts d'honneur 40 k€ · BFT 30 k€ · banque 60 k€ (4,5 %, 60 mois) · BA 120 k€", "Montants usuels des dispositifs, à confirmer", "HYP / à vérifier"],
    ["IS", "15 % jusqu'à 42 500 €, puis 25 %, report des déficits", "Droit commun PME", "FAIT"],
  ];
  S.push(P(1, `${head("Annexe 1", "Hypothèses du business plan")}
    <table class="t" style="margin-top:14px;font-size:12.5px"><tr><th>Hypothèse</th><th style="text-align:left">Valeur</th><th style="text-align:left">Justification</th><th>Statut</th></tr>
    ${hyp.map((r) => `<tr><td><b>${r[0]}</b></td><td style="text-align:left">${r[1]}</td><td style="text-align:left">${r[2]}</td><td>${r[3]}</td></tr>`).join("")}</table>`));
  // A2 — trésorerie mensuelle 2027
  const rows = [["Domaines actifs", "active", 1], ["MRR", "mrr"], ["Chiffre d'affaires", "ca"], ["EBE", "ebitda"], ["Apports, prêts, levée", "inflow"], ["Trésorerie fin de mois", "cash"]];
  const cols = Array.from({ length: 14 }, (_, i) => i); // nov. 26 → déc. 27
  S.push(P(2, `${head("Annexe 2", "Plan de trésorerie mensuel — ante-création et 2027 (central)")}
    <table class="t" style="margin-top:14px;font-size:11.5px"><tr><th>€</th>${cols.map((i) => `<th>${monthLabels[i]}</th>`).join("")}</tr>
    ${rows.map(([l, k, isN]) => `<tr class="${k === "cash" ? "tot" : ""}"><td>${l}</td>${cols.map((i) => { const v = M[k][i]; return `<td class="${v < 0 ? "neg" : ""}">${isN ? n0(v) : signed(v)}</td>`; }).join("")}</tr>`).join("")}</table>
    <h3 style="margin-top:22px">2028-2029 par trimestre</h3>
    <table class="t" style="font-size:12px"><tr><th>€</th>${["T1 28", "T2 28", "T3 28", "T4 28", "T1 29", "T2 29", "T3 29", "T4 29"].map((t) => `<th>${t}</th>`).join("")}</tr>
    ${[["CA du trimestre", "ca", "sum"], ["EBE du trimestre", "ebitda", "sum"], ["Trésorerie fin de trimestre", "cash", "end"]].map(([l, k, mode]) => `<tr class="${k === "cash" ? "tot" : ""}"><td>${l}</td>${Array.from({ length: 8 }, (_, q) => { const s = 14 + q * 3; const v = mode === "sum" ? M[k][s] + M[k][s + 1] + M[k][s + 2] : M[k][s + 2]; return `<td class="${v < 0 ? "neg" : ""}">${signed(v)}</td>`; }).join("")}</tr>`).join("")}</table>`));
  // A3 — KPI
  const kpi = [
    ["MRR", "Domaines actifs × prix moyen (hors mois offerts)", "Mensuelle", "CEO"], ["ARR", "MRR × 12", "Mensuelle", "CEO"],
    ["CAC", "(Salaires commerciaux + 50 % CEO + marketing + salons + primes) ÷ nouveaux domaines", "Trimestrielle", "CEO"],
    ["Churn", "Résiliations du mois ÷ actifs en début de mois", "Mensuelle", "Customer success"],
    ["ARPA", "(CA abonnements + commissions) ÷ domaines actifs moyens", "Trimestrielle", "CEO"],
    ["LTV", "ARPA × marge brute ÷ churn annuel", "Trimestrielle", "CEO"], ["LTV / CAC", "LTV ÷ CAC", "Trimestrielle", "CEO"],
    ["Marge brute", "(CA − coûts directs) ÷ CA", "Mensuelle", "CTO"], ["Autonomie", "Trésorerie ÷ consommation moyenne des 3 derniers mois", "Mensuelle", "CEO"],
    ["Utilisation", "Domaines ayant capté ≥ 10 contacts dans le mois ÷ actifs", "Mensuelle", "Customer success"],
    ["Taux de capture", "Contacts collectés ÷ visiteurs exposés au QR", "Mensuelle (pilotes)", "Customer success"],
    ["Taux de réachat", "Contacts ayant commandé ÷ contacts collectés (6 mois)", "Trimestrielle", "CEO"], ["NPS domaines", "% promoteurs − % détracteurs", "Trimestrielle", "CEO"],
  ];
  S.push(P(3, `${head("Annexe 3", "Tableau de bord : formules, fréquences, responsables")}
    <table class="t" style="margin-top:14px;font-size:12.5px"><tr><th>KPI</th><th style="text-align:left">Formule</th><th style="text-align:left">Fréquence</th><th style="text-align:left">Responsable</th></tr>
    ${kpi.map((r) => `<tr><td><b>${r[0]}</b></td><td style="text-align:left">${r[1]}</td><td style="text-align:left">${r[2]}</td><td style="text-align:left">${r[3]}</td></tr>`).join("")}</table>
    <p class="small" style="margin-top:12px">Objectifs et décisions en cas d'écart : page 29 du dossier. Le modèle Excel (onglets Mensuel et Synthèse) sert de budget ; le réel est saisi à côté chaque mois.</p>`));
  // A4 — validation terrain
  S.push(P(4, `${head("Annexe 4", "Plan de validation terrain (avant le premier versement de la levée)")}
    <div class="grid g2" style="margin-top:18px">
      <div class="card"><h3>Questionnaire (30 à 50 domaines)</h3><ul class="clean small"><li>Visiteurs par saison, part d'étrangers, nationalités</li><li>Demandes d'expédition refusées par an</li><li>Outil de gestion des contacts actuel</li><li>Disposition à payer : 59 / 129 / 249 €</li><li>Logisticien utilisé, satisfaction</li></ul></div>
      <div class="card"><h3>20 entretiens approfondis</h3><ul class="clean small"><li>Validation des personas et des objections</li><li>Test du discours ROI</li><li>Choix des 2 régions de lancement</li></ul></div>
      <div class="card"><h3>10 pilotes (mars → juin 2027)</h3><ul class="clean small"><li>Taux de capture (cible ≥ 25 %, seuil d'arrêt 15 %)</li><li>Réachat à 3 et 6 mois (cible ≥ 3 %, seuil d'arrêt 2 %)</li><li>Conversion en payant (cible ≥ 5 sur 10)</li></ul></div>
      <div class="card"><h3>Partenaires et juridique</h3><ul class="clean small"><li>Devis comparés de 3 à 5 logisticiens (États-Unis, Royaume-Uni, Suisse, Belgique, Allemagne)</li><li>Accord de connexion avec 2 logisticiens</li><li>Avis d'avocat : vente, transport, loi Évin, RGPD, paiement de l'alcool</li></ul></div>
    </div>`));
  // A5 — sources
  const src = [
    "OIV — State of the World Wine Sector in 2025 (mai 2026)", "FranceAgriMer — Fiche filière vin 2026 ; Chiffres-clés viti-vinicoles 2024 ; note de conjoncture oct. 2025",
    "Vin & Société — Chiffres-clés filière 2026 ; étude œnotourisme (Deloitte, juillet 2025)", "Atout France — Baromètre de l'œnotourisme 2025 ; Destination France mars 2025 ; bilan touristique 2025",
    "FEVS — bilan export 2025 (via Pleinchamp, LSA)", "Réussir Vigne — arrachage 2026, distillation de crise, circuits courts (RA 2020)",
    "Afnic — Réussir avec le web, agriculture (décembre 2025)", "Winalist — Observatoire 2026 (données de plateforme)",
    "Xerfi / Sowine — vente en ligne de vin (2026)", "Commission européenne — réponse P-10-2025-003934 (accises, novembre 2025) ; directive (UE) 2020/262",
    "Sovos ShipCompliant — DtC Wine Shipping Report 2026 ; analyses import/DtC", "SVB — State of the US Wine Industry 2026 ; Commerce7 — State of Wine Clubs",
    "Hillebrand Gori — FAQ eShipping ; Commerce7, WineDirect — grilles tarifaires publiques", "Bpifrance (Bourse French Tech), Réseau Entreprendre (rapport 2025), Initiative France (2024)",
  ];
  S.push(P(5, `${head("Annexe 5", "Principales sources (liens complets dans la base de faits)")}
    <ul class="clean" style="margin-top:16px;columns:2;column-gap:40px">${src.map((s) => `<li class="small">${s}</li>`).join("")}</ul>
    <p class="small" style="margin-top:14px">Toutes les données de marché sont datées et sourcées ; les données incertaines sont signalées. Aucune donnée interne d'entreprise n'est utilisée. Les chiffres financiers sont des projections issues du modèle à formules fourni.</p>`));
  return S;
}
