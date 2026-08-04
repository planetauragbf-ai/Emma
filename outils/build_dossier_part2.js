// Sections 9-14 + assemblage du document.
const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, AlignmentType, Footer, PageNumber,
  LevelFormat, TabStopType,
} = require("docx");
const C = require("./build_dossier.js");
const { H1, H2, P, callout, table, img, spacer, pageBreak, INK, GREEN, GREY, W } = C;

// ————————————————————————————————————————————— 9 CONCURRENCE
const s9 = [
  H1("9", "L'analyse de la concurrence"),
  P("Nous présentons la concurrence telle qu'elle est — active et sérieuse — parce que c'est elle qui valide le marché, et parce qu'un investisseur la connaîtra. Notre différenciation ne repose pas sur un désert concurrentiel : elle repose sur une position que personne n'occupe."),
  H2("9.1  La matrice concurrentielle"),
  table([1958, 1250, 1250, 1250, 1250, 1430, 1250],
    ["", "Lucéane", "Filib'", "Epsor", "Rosaly", "Wagestream", "Klaro"],
    [
      ["Neutralité (0 produit vendu)", "●", "●", "○ gère les fonds", "◐ roadmap produits", "○ produits financiers", "●"],
      ["Self-service quotidien", "●", "○ modèle RDV", "◐", "●", "●", "●"],
      ["Coach IA 24/7", "●", "○", "○", "○", "◐", "○"],
      ["Activation épargne salariale", "●", "◐ via RDV", "● juge et partie", "○", "○", "○ aides sociales"],
      ["Mesure continue DRH (indice, benchmark)", "●", "◐ reporting", "◐", "◐", "◐", "◐"],
      ["Éducation certifiante (EDUCFI)", "●", "◐", "◐", "◐", "○", "○"],
      ["Cible assumée ETI", "●", "○ grands comptes", "◐", "◐", "○", "◐"],
    ], { alignFirstLeft: true, sz: 16 }),
  P([{ t: "● couvert · ◐ partiel · ○ absent. Sources : sites et communications des acteurs, presse spécialisée (avril-août 2026) — détail et liens en annexe E.", i: true, sz: 17, c: GREY }], { after: 160 }),
  H2("9.2  Lecture honnête des forces en présence"),
  P([{ t: "Filib'", b: true }, { t: " est le concurrent le plus sérieux : 200+ entreprises clientes, ~500 000 salariés couverts (Carrefour, Air France), neutralité revendiquée, distribution en marque blanche via AXA. Sa force est aussi sa limite : un modèle de téléconsultation — la valeur passe par un rendez-vous humain, son coût croît avec l'usage, et son reach dépend de qui ose prendre rendez-vous. C'est le Doctolib du conseil financier ; nous sommes l'app de santé quotidienne." }]),
  P([{ t: "Epsor", b: true }, { t: " (gestionnaire d'épargne salariale, ~2 Md€ d'encours, série C 2025) possède la relation DRH et un discours d'éducation financière — mais il est rémunéré sur la gestion des fonds : il ne peut pas être neutre, c'est structurel. " }, { t: "Rosaly", b: true }, { t: " (acompte sur salaire, 10 M€ levés) occupe le budget « pouvoir d'achat » mais traite l'urgence, pas la santé de long terme. " }, { t: "Wagestream", b: true }, { t: " (352 M€ levés, lancement France en préparation) est la menace d'entrée massive — sur un modèle avance sur salaire + produits financiers, donc non neutre. " }, { t: "Klaro", b: true }, { t: " active les aides sociales : adjacent, partenaire potentiel plus que concurrent." }]),
  P("Substituts installés : la banque (juge et partie — elle vend), le conseiller en gestion de patrimoine (excellent, mais réservé aux patrimoines élevés), les applis de budget (constat sans action), les contenus publics EDUCFI (fiables mais froids), les lignes d'écoute QVT (sans compétence financière). Et le substitut dominant : ne rien faire — c'est lui que nous délogeons."),
  callout([{ t: "« Pourquoi Filib' ne vous écrase-t-il pas ? » ", b: true }, { t: "Parce que nos économies sont inversées : chaque salarié aidé lui coûte un rendez-vous ; chaque salarié aidé nous coûte quelques centimes d'inférence. À 8-15 € par salarié et par mois pour 100 % de l'effectif, notre modèle est inaccessible à une structure de coûts fondée sur l'humain au guichet. Le pari est générationnel : le self-service + IA est au coaching financier ce que Moka.care a été aux lignes d'écoute téléphoniques." }]),
];

// ————————————————————————————————————————————— 10 AVANTAGES
const s10 = [
  H1("10", "Avantages concurrentiels et proposition de valeur"),
  callout([{ t: "Proposition de valeur. ", b: true }, { t: "Pour les DRH d'ETI qui doivent réduire le coût du stress financier de leurs salariés sans pouvoir ni le mesurer ni s'aventurer sur un terrain sensible, Lucéane est la plateforme de santé financière en self-service, animée par un coach hybride IA + humain, strictement neutre, qui mesure en continu (indice, benchmark) et active concrètement (Cockpit, Moments de vie) — pour 100 % des salariés, pas seulement ceux qui osent demander un rendez-vous." }]),
  spacer(80),
  P("Quatre barrières se construisent avec chaque client — aucune n'est un brevet, toutes sont cumulatives :"),
  P([{ t: "La marque de tiers neutre. ", b: true }, { t: "Longue à bâtir, impossible à copier pour quiconque vit des produits ou des encours : une banque, un gestionnaire ou un acteur de l'avance sur salaire ne peuvent pas devenir neutres sans détruire leur modèle. La confiance est notre actif : tout le design du modèle économique la protège." }]),
  P([{ t: "Les données de benchmark. ", b: true }, { t: "Chaque entreprise cliente enrichit l'indice de santé financière et le référentiel inter-entreprises — le tableau de bord DRH devient plus précieux à mesure que le parc grandit. Le premier acteur qui atteint la masse critique de données devient le standard de mesure de la catégorie." }]),
  P([{ t: "L'intégration RH. ", b: true }, { t: "SSO, connecteurs SIRH et épargne salariale, benchmark historicisé : une fois déployée, la plateforme est coûteuse à débrancher — le churn logo visé (< 10 %) n'est pas un vœu, c'est une conséquence de l'ancrage." }]),
  P([{ t: "L'économie unitaire de l'IA. ", b: true }, { t: "Notre coût marginal par interaction tend vers zéro quand celui des modèles à rendez-vous croît avec l'usage. À prix égal, nous servons tout l'effectif là où ils servent une file d'attente — c'est l'avantage qui finance tous les autres." }]),
  P("Ce que nous ne prétendons pas : être incopiables. C'est une course d'exécution — et notre structure de coûts nous permet de la courir plus vite, plus bas en prix, et sur un segment (l'ETI) que les acteurs installés délaissent."),
];

// ————————————————————————————————————————————— 11 ÉQUIPE
const s11 = [
  H1("11", "L'équipe"),
  P([{ t: "[Nom Prénom], fondatrice. ", b: true }, { t: "Profil commercial et marketing (Mastère Marketing et Digital Business), expérience de la vente et de la relation client en environnement B2B. Ce profil est délibérément le bon premier profil pour ce projet : les deux risques mortels de Lucéane ne sont pas technologiques — ce sont la vente (convaincre des DRH) et l'adoption (engager des salariés). La technologie, elle, s'achète et se recrute ; la traction commerciale, non." }]),
  H2("11.1  L'organisation autour de la fondatrice"),
  P([{ t: "Le studio de développement", b: true }, { t: " construit le MVP en mode asset-light (300 k€ en année 1), avec internalisation progressive : 1 développeur en année 2, 4 en année 3 — nous achetons de la vitesse au départ, nous construisons l'actif ensuite. " }, { t: "Le réseau d'experts agréés", b: true }, { t: " (conseillers en gestion de patrimoine sous charte de neutralité : pas de vente de produits, pas de rétrocommissions, rémunération à la consultation) porte l'accompagnement humain sans salarier l'expertise. " }, { t: "Trois advisors", b: true }, { t: " complètent le dispositif : un profil juridique et conformité (périmètre CIF/AMF, RGPD), un profil éducation financière (référentiel EDUCFI), un profil DRH d'ETI — le miroir de notre cliente." }]),
  H2("11.2  Le plan de recrutement, financé par la levée"),
  table([4238, 1800, 1800, 1800],
    ["Effectifs (ETP moyens)", "An 1", "An 2", "An 3"],
    [
      ["Commercial (AE, SDR, VP Sales)", "0,8", "4,0", "8,0"],
      ["Customer success", "0,5", "3,0", "6,0"],
      ["Produit, tech, data", "0,8", "3,0", "7,5"],
      ["Contenu pédagogique", "0,5", "1,5", "2,5"],
      ["Conformité, ops, support fonctions", "0", "1,5", "3,5"],
      [[{ t: "Total (avec fondatrice)", b: true }], [{ t: "~4", b: true }], [{ t: "~13", b: true }], [{ t: "~27", b: true }]],
    ], { alignFirstLeft: true, sz: 18, align: AlignmentType.CENTER }),
  spacer(60),
  P("Les recrutements suivent la preuve, pas l'inverse : le premier account executive arrive au mois 4 (l'entonnoir de 500 comptes est intenable seule), le premier customer success au premier pilote, l'équipe technique interne quand le produit a démontré son adoption. La gouvernance de gestion est assurée par les tableaux de bord de l'annexe B — revue mensuelle des indicateurs commerciaux, d'adoption et financiers, avec seuils d'alerte explicites."),
];

// ————————————————————————————————————————————— 12 BUSINESS PLAN
const s12 = [
  H1("12", "Le business plan à 3 ans et le besoin de financement"),
  P([{ t: "Le modèle complet — 650 formules, chaque hypothèse justifiée — figure en annexe A ; en voici les équilibres. Convention de lecture : " }, { t: "l'ARR est le revenu récurrent annualisé de fin de période ; le chiffre d'affaires est le revenu comptabilisé sur l'exercice", b: true }, { t: " — la distinction que tout investisseur attend." }]),
  img("chart_arr.png", 560, 396),
  H2("12.1  Compte de résultat prévisionnel (synthèse)"),
  table([4238, 1800, 1800, 1800],
    ["En k€", "An 1", "An 2", "An 3"],
    [
      ["CA abonnements (employeurs)", "186", "1 897", "6 061"],
      ["CA pilotes", "48", "144", "350"],
      ["CA packs (salariés)", "5", "87", "319"],
      [[{ t: "Chiffre d'affaires total", b: true }], [{ t: "240", b: true }], [{ t: "2 129", b: true }], [{ t: "6 730", b: true }]],
      ["Coûts variables (COGS)", "(40)", "(419)", "(1 332)"],
      [[{ t: "Marge brute", b: true }], [{ t: "199 (83 %)", b: true }], [{ t: "1 710 (80 %)", b: true }], [{ t: "5 398 (80 %)", b: true }]],
      ["Masse salariale", "(259)", "(966)", "(1 962)"],
      ["Développement externalisé (studio)", "(300)", "(350)", "(150)"],
      ["Marketing & commissions prescripteurs", "(60)", "(338)", "(927)"],
      ["Frais généraux, juridique, conformité", "(110)", "(230)", "(405)"],
      [[{ t: "EBITDA", b: true }], [{ t: "(530)", b: true }], [{ t: "(174)", b: true }], [{ t: "1 954 (29 %)", b: true }]],
      ["Amortissements", "(10)", "(20)", "(30)"],
      ["Impôt sur les sociétés (après reports)", "—", "—", "(298)"],
      [[{ t: "Résultat net", b: true }], [{ t: "(540)", b: true }], [{ t: "(194)", b: true }], [{ t: "1 627", b: true }]],
    ], { alignFirstLeft: true, sz: 18, align: AlignmentType.CENTER }),
  spacer(60),
  H2("12.2  Seuil de rentabilité et robustesse"),
  P([{ t: "Le point mort, traduit en quantités : " }, { t: "~19 600 salariés couverts (≈ 39 ETI moyennes) en structure de coûts d'année 2", b: true }, { t: " — franchi au 7ᵉ trimestre ; ~34 200 salariés (≈ 59 ETI) en structure pleine d'année 3. La robustesse est testée : avec 30 % de ventes en moins en année 3, l'EBITDA reste positif (+0,33 M€) ; avec un prix raboté de 20 %, également (+0,61 M€). Le plan ne repose ni sur un prix héroïque ni sur une exécution parfaite." }]),
  table([4738, 2450, 2450],
    ["Sensibilité — EBITDA année 3", "Hypothèse", "Résultat"],
    [
      ["Scénario central", "Plan nominal", "+1 954 k€"],
      ["Ventes dégradées", "−30 % de marge brute, charges fixes constantes", "+335 k€"],
      ["Prix dégradé", "−20 % sur tout le chiffre d'affaires", "+608 k€"],
      ["Montée en gamme nulle", "Mix Patrimoine gelé à 20 % (prix moyen 9,40 €)", "+1 399 k€"],
    ], { alignFirstLeft: true, sz: 18 }),
  spacer(60),
  table([4738, 1633, 1633, 1634],
    ["Unit economics", "An 1", "An 2", "An 3"],
    [
      ["Coût d'acquisition client (k€)", "8", "18", "21"],
      ["ARR apporté par nouveau client (k€)", "45", "60", "73"],
      ["Payback du CAC (mois de marge brute)", "2,6", "4,5", "4,2"],
    ], { alignFirstLeft: true, sz: 18, align: AlignmentType.CENTER }),
  spacer(80),
  H2("12.3  Trésorerie et plan de financement"),
  img("chart_treso.png", 620, 262),
  P([{ t: "Le besoin est dimensionné par les faits : " }, { t: "besoin de trésorerie cumulé maximal de 0,92 M€ hors levée", b: true }, { t: " en scénario central, 1,43 M€ en scénario prudent (ventes −30 %). " }, { t: "Nous levons 1,5 M€ en amorçage, encaissés à la création", b: true }, { t: " : la levée couvre intégralement le scénario prudent, la trésorerie ne descend jamais sous 0,60 M€, et le plan atteint la rentabilité sans tour intermédiaire. L'ante-création (60 k€ : étude, juridique, marque, maquette) est financée par apport personnel (30 k€), prêt d'honneur (20 k€) et subvention à confirmer (30 k€). Allocation de la levée : 40 % produit, 35 % commercial, 15 % contenu, 10 % structure — le détail emplois-ressources figure en annexe A." }]),
  table([4038, 1400, 1400, 1400, 1400],
    ["Plan de financement (k€)", "Ante-création", "An 1", "An 2", "An 3"],
    [
      ["Emplois — frais d'établissement, marque, maquette", "60", "—", "—", "—"],
      ["Emplois — capex, variation de BFR", "—", "40", "64", "92"],
      ["Emplois — insuffisance d'autofinancement", "—", "530", "174", "—"],
      ["Emplois — remboursement prêt d'honneur", "—", "—", "—", "20"],
      ["Ressources — apport, prêt d'honneur, subvention", "80", "—", "—", "—"],
      ["Ressources — levée d'amorçage", "—", "1 500", "—", "—"],
      ["Ressources — capacité d'autofinancement", "—", "—", "—", "1 657"],
      [[{ t: "Trésorerie cumulée (fin de période)", b: true }], [{ t: "20", b: true }], [{ t: "930", b: true }], [{ t: "713", b: true }], [{ t: "2 257", b: true }]],
    ], { alignFirstLeft: true, sz: 17, align: AlignmentType.CENTER }),
  spacer(80),
  callout([{ t: "Ce que finance ce 1,5 M€ : ", b: true }, { t: "la traversée jusqu'à l'autofinancement. Pas une expérimentation — une exécution : le produit (MVP puis internalisation), la machine commerciale (entonnoir chiffré, équipe recrutée au rythme de la preuve), et la marge de sécurité qui permet de tenir le cap si l'adoption ou les ventes déçoivent de 30 %." }]),
];

// ————————————————————————————————————————————— 13 RISQUES
const s13 = [
  H1("13", "Les risques, évalués et traités"),
  P("Un projet honnête regarde ses risques en face. Les voici, hiérarchisés, avec leur probabilité (P), leur impact (I), la parade et l'indicateur de suivi (tableaux de bord, annexe B)."),
  table([2438, 700, 700, 3600, 2200],
    ["Risque", "P", "I", "Parade", "Indicateur"],
    [
      ["Adoption salariés insuffisante — le risque n° 1, tout en dépend", "Moy.", "Fort", "Scénario central prudent (22 % vs 40 % du meilleur comparable) ; pilote « concierge » avant industrialisation ; sponsoring direction + onboarding intégré ; plan de relance sous 12 %", "Activation à 3 mois par cohorte ; seuil d'alerte 12 %"],
      ["Cycle de vente plus long que 3-5 mois", "Moy.", "Moy.", "Pilote payant qui qualifie ; entonnoir suivi étage par étage ; prescripteurs en relais", "Durée moyenne de cycle ; taux démo→pilote"],
      ["Riposte concurrentielle (Filib', entrée Wagestream)", "Moy.", "Moy.", "Vitesse sur le segment ETI délaissé ; ancrage produit (SSO, benchmark) ; économie IA inaccessible aux modèles RDV", "Win rate ; churn logo"],
      ["Requalification en conseil réglementé (CIF)", "Faible", "Fort", "Périmètre pédagogique borné en amont (avis juridique) ; conseil délégué aux agréés sous charte ; revue conformité annuelle", "Audit juridique annuel"],
      ["Incident données (RGPD, sécurité)", "Faible", "Fort", "Hébergement UE, chiffrement, AIPD, agrégation seuillée côté employeur, pentest annuel dès l'an 2", "Audit sécurité ; incidents = 0"],
      ["Dépendance à la fondatrice", "Moy.", "Moy.", "Documentation des process ; VP Sales an 2 ; advisors actifs ; gouvernance mensuelle", "Part du CA portée par la fondatrice"],
      ["Coupe des budgets QVT (macro)", "Faible", "Moy.", "Ancrage prix bas (8 €) ; argumentaire ROI (coût du départ) ; contrats annuels engagés", "Taux de renouvellement"],
    ], { alignFirstLeft: true, sz: 16 }),
  spacer(60),
  P("Le scénario qui rendrait le projet inutile — des salariés qui n'utilisent pas l'outil — est traité en priorité absolue : c'est le sens du pilote payant avec mesure d'activation par cohorte avant toute industrialisation commerciale, et du scénario financier central volontairement assis sur une adoption de 20-25 %, pas sur le meilleur cas."),
];

// ————————————————————————————————————————————— 14 ANNEXES
const s14 = [
  H1("14", "Annexes"),
  P([{ t: "Annexe A — Modèle financier détaillé (classeur). ", b: true }, { t: "Hypothèses documentées, moteur trimestriel T1-T12, compte de résultat, plan de financement avec ante-création, seuil de rentabilité et sensibilités. Chaque cellule bleue est une hypothèse modifiable ; le modèle recalcule tout." }]),
  P([{ t: "Annexe B — Tableaux de bord de contrôle de l'activité (classeur). ", b: true }, { t: "Trois tableaux — commercial (entonnoir et portefeuille), adoption (activation par cohorte, usage, NPS), finance (ARR, marge, trésorerie, runway) — dont les objectifs sont figés depuis le business plan : chaque indicateur correspond à un objectif chiffré du dossier, avec seuils d'alerte et règles de pilotage." }]),
  P([{ t: "Annexe C — Produit. ", b: true }, { t: "Maquette interactive (Cockpit, académie, coach, tableau de bord DRH) présentée en démonstration lors de la soutenance." }]),
  P([{ t: "Annexe D — Cadre réglementaire et conformité. ", b: true }, { t: "Frontière pédagogie / conseil en investissement (statut CIF, position AMF) : Lucéane délivre information et pédagogie génériques ; toute recommandation personnalisée est réalisée par des conseillers agréés partenaires, sous charte (pas de vente de produits, pas de rétrocommissions, rémunération au temps). RGPD : données financières traitées comme sensibles — hébergement UE, AIPD, minimisation, restitution employeur exclusivement agrégée et seuillée, droit à l'effacement outillé." }]),
  P([{ t: "Annexe E — Sources. ", b: true }, { t: "Malakoff Humanis, Baromètre Fragilités 2025 (Harris Interactive) · Banque de France / CSA : littératie financière 12,8/20 (janv. 2026) ; connaissances de base 56 % (2023) · CSA Research, Le découvert des Français, éd. 2025 · Santé publique France, Baromètre 2024 (épisodes dépressifs) · Caisse des Dépôts, bilan Ciclade 2025 · AFG / Cercle de l'Épargne, encours d'épargne salariale 2024-2025 · PwC, Employee Financial Wellness Survey 2026 (US) · ResearchAndMarkets, U.S. Financial Wellness Benefits 2025-2029 · INSEE, Entreprises de taille intermédiaire · education.gouv.fr, généralisation du Passeport EDUCFI (mai 2026) · info.gouv.fr, Grande Cause nationale 2025-2026 · sites et presse des acteurs cités (Filib', Epsor, Rosaly, Wagestream, Klaro, Moka.care, EGYM Wellpass). Les URL complètes sont fournies dans le classeur de l'annexe A." }]),
  P([{ t: "Annexe F — Marque. ", b: true }, { t: "« Lucéane » est un nom en cours de sécurisation : la pré-vérification (registre des sociétés, usages web, domaines) n'a identifié aucun acteur des classes visées (logiciel, finance, formation) ; une marque homonyme existe en cosmétique (classes distinctes). La recherche d'antériorité INPI officielle (classes 9, 36, 41, en similarité phonétique) sera réalisée avant le dépôt ; une alternative vérifiée est documentée." }]),
];

// ————————————————————————————————————————————— ASSEMBLAGE
const footer = new Footer({
  children: [new Paragraph({
    tabStops: [{ type: TabStopType.RIGHT, position: W }],
    spacing: { before: 60, after: 0 },
    children: [
      new TextRun({ text: "lucéane — dossier de présentation · Bloc 3 · [Nom Prénom]", size: 15, color: GREY }),
      new TextRun({ text: "\t", size: 15 }),
      new TextRun({ children: [PageNumber.CURRENT], size: 15, color: GREY }),
    ],
  })],
});

const doc = new Document({
  styles: {
    default: {
      document: { run: { font: "Calibri", size: 21, color: INK } },
    },
  },
  numbering: {
    config: [{
      reference: "puces",
      levels: [{
        level: 0, format: LevelFormat.BULLET, text: "–", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 360, hanging: 200 } } },
      }],
    }],
  },
  sections: [{
    properties: {
      page: {
        margin: { top: 1134, bottom: 1134, left: 1134, right: 1134 },
      },
    },
    footers: { default: footer },
    children: [
      ...C.cover, ...C.toc, ...C.resume,
      ...C.s1, pageBreak(),
      ...C.s2, pageBreak(),
      ...C.s3, pageBreak(),
      ...C.s4, pageBreak(),
      ...C.s5, pageBreak(),
      ...C.s6, pageBreak(),
      ...C.s7, pageBreak(),
      ...C.s8, pageBreak(),
      ...s9, pageBreak(),
      ...s10, pageBreak(),
      ...s11, pageBreak(),
      ...s12, pageBreak(),
      ...s13, pageBreak(),
      ...s14,
    ],
  }],
});

const out = "/home/user/Emma/livrables/Dossier_Bloc3.docx";
fs.mkdirSync("/home/user/Emma/livrables", { recursive: true });
Packer.toBuffer(doc).then(buf => { fs.writeFileSync(out, buf); console.log("OK —", out); });
