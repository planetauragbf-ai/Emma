// Génère livrables/Dossier_Bloc3.docx — dossier investisseur 25-30 pages.
// Identité : encre 1B2A41 · vert 2E9E6B · coquille FAF7F2 · or E0B84C.
// Polices bureautiques de l'identité : Calibri (corps) + Georgia (titres/chiffres).
const fs = require("fs");
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  Table, TableRow, TableCell, WidthType, BorderStyle, ShadingType,
  ImageRun, Footer, PageNumber, LevelFormat, PageBreak, TabStopType, VerticalAlign,
} = require("docx");

const INK = "1B2A41", GREEN = "2E9E6B", SHELL = "FAF7F2", GOLD = "E0B84C", GREY = "55606E";
const W = 9638; // largeur utile A4 (DXA), marges 2 cm

const noBorder = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const thin = { style: BorderStyle.SINGLE, size: 4, color: "D9D2C4" };

function runs(spec) {
  // spec: string ou tableau de {t, b, i, c, sz, f}
  if (typeof spec === "string") spec = [{ t: spec }];
  return spec.map(r => new TextRun({
    text: r.t, bold: !!r.b, italics: !!r.i, color: r.c || INK,
    size: r.sz || 21, font: r.f || "Calibri",
  }));
}

function P(spec, opts = {}) {
  return new Paragraph({
    children: runs(spec),
    alignment: opts.align || AlignmentType.JUSTIFIED,
    spacing: { after: opts.after ?? 120, line: 264 },
    ...(opts.bullet ? { numbering: { reference: "puces", level: 0 } } : {}),
    ...(opts.keepNext ? { keepNext: true } : {}),
  });
}

function H1(num, text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 300, after: 160 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: GOLD } },
    children: [
      new TextRun({ text: num + "  ", bold: true, color: GREEN, size: 30, font: "Georgia" }),
      new TextRun({ text, bold: true, color: INK, size: 30, font: "Georgia" }),
    ],
  });
}

function H2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 200, after: 100 },
    children: [new TextRun({ text, bold: true, color: GREEN, size: 24, font: "Georgia" })],
  });
}

function callout(spec) {
  return new Table({
    width: { size: W, type: WidthType.DXA }, columnWidths: [W],
    borders: { top: noBorder, bottom: noBorder, right: noBorder, insideHorizontal: noBorder, insideVertical: noBorder,
               left: { style: BorderStyle.SINGLE, size: 18, color: GOLD } },
    rows: [new TableRow({ children: [new TableCell({
      width: { size: W, type: WidthType.DXA },
      shading: { type: ShadingType.CLEAR, fill: SHELL },
      margins: { top: 120, bottom: 120, left: 200, right: 200 },
      children: [new Paragraph({ children: runs(spec), alignment: AlignmentType.LEFT, spacing: { after: 0, line: 264 } })],
    })] })],
  });
}

function spacer(after = 120) { return new Paragraph({ children: [], spacing: { after } }); }

function table(widths, header, rows, opts = {}) {
  const mkCell = (content, i, isHeader, rowIdx) => new TableCell({
    width: { size: widths[i], type: WidthType.DXA },
    shading: { type: ShadingType.CLEAR, fill: isHeader ? INK : (rowIdx % 2 ? SHELL : "FFFFFF") },
    margins: { top: 60, bottom: 60, left: 100, right: 100 },
    verticalAlign: VerticalAlign.CENTER,
    children: [new Paragraph({
      alignment: (opts.alignFirstLeft && i === 0) ? AlignmentType.LEFT : (opts.align || AlignmentType.LEFT),
      spacing: { after: 0, line: 240 },
      children: runs(typeof content === "string"
        ? [{ t: content, b: isHeader, c: isHeader ? "FFFFFF" : INK, sz: opts.sz || 19 }]
        : content.map(r => ({ sz: opts.sz || 19, ...r, c: isHeader ? "FFFFFF" : (r.c || INK), b: isHeader ? true : r.b }))),
    })],
  });
  return new Table({
    width: { size: W, type: WidthType.DXA }, columnWidths: widths,
    borders: { top: thin, bottom: thin, left: thin, right: thin, insideHorizontal: thin, insideVertical: thin },
    rows: [
      ...(header ? [new TableRow({ tableHeader: true, children: header.map((h, i) => mkCell(h, i, true, 0)) })] : []),
      ...rows.map((r, ri) => new TableRow({ children: r.map((cell, i) => mkCell(cell, i, false, ri)) })),
    ],
  });
}

function img(file, wpx, hpx) {
  const data = fs.readFileSync(path.join(__dirname, "charts", file));
  return new Paragraph({
    alignment: AlignmentType.CENTER, spacing: { before: 80, after: 160 },
    children: [new ImageRun({ type: "png", data, transformation: { width: wpx, height: hpx } })],
  });
}

function pageBreak() { return new Paragraph({ children: [new PageBreak()] }); }

// ————————————————————————————————————————————— COUVERTURE
const cover = [
  new Paragraph({ spacing: { before: 2600, after: 0 }, alignment: AlignmentType.CENTER,
    children: [ new TextRun({ text: "lucéane", bold: true, size: 96, color: INK, font: "Calibri" }),
                new TextRun({ text: ".", bold: true, size: 96, color: GREEN, font: "Calibri" }) ] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 60 },
    children: [new TextRun({ text: "La santé financière des salariés — mesurée, éclairée, activée.", italics: true, size: 26, color: GREY, font: "Georgia" })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 500, after: 60 },
    children: [new TextRun({ text: "DOSSIER DE PRÉSENTATION DU PROJET ENTREPRENEURIAL", bold: true, size: 24, color: INK })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 40 },
    children: [new TextRun({ text: "Bloc 3 — Management d'une équipe et d'un réseau commercial", size: 21, color: GREY })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 700, after: 40 },
    children: [new TextRun({ text: "[Nom Prénom] — [Promotion]", bold: true, size: 24, color: INK })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 40 },
    children: [new TextRun({ text: "Année 2026", size: 21, color: GREY })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 900 },
    children: [new TextRun({ text: "Document destiné à un lecteur investisseur. Données sourcées ou étiquetées hypothèse ; aucun chiffre d'illustration n'entre dans les calculs. Le nom « Lucéane » est un nom de marque en cours de sécurisation (annexe F).", italics: true, size: 17, color: GREY })] }),
  pageBreak(),
];

// ————————————————————————————————————————————— SOMMAIRE
const toc = [
  H1("", "Sommaire"),
  ...[
    ["1", "La vision — pourquoi ce projet"],
    ["2", "Le problème — le stress financier, angle mort des politiques RH"],
    ["3", "La solution — la plateforme Lucéane"],
    ["4", "Le marché"],
    ["5", "La clientèle — personas et rôles"],
    ["6", "Les produits et services en détail"],
    ["7", "Le business model"],
    ["8", "La stratégie opérationnelle"],
    ["9", "L'analyse de la concurrence"],
    ["10", "Avantages concurrentiels et proposition de valeur"],
    ["11", "L'équipe"],
    ["12", "Le business plan à 3 ans et le besoin de financement"],
    ["13", "Les risques, évalués et traités"],
    ["14", "Annexes"],
  ].map(([n, t]) => new Paragraph({
    spacing: { after: 90 }, alignment: AlignmentType.LEFT,
    children: [ new TextRun({ text: n.padEnd(4, " "), bold: true, color: GREEN, size: 22, font: "Georgia" }),
                new TextRun({ text: t, size: 22, color: INK }) ] })),
  spacer(200),
  callout([{ t: "Lecture rapide — ", b: true }, { t: "le projet en cinq faits : (1) 18 % des salariés français déclarent des difficultés financières, en hausse de 9 points depuis 2020 ; (2) personne ne traite ce problème par un produit neutre, quotidien et mesurable ; (3) Lucéane le fait, payée par l'employeur 8 à 15 € par salarié et par mois ; (4) le modèle est rentable au 7ᵉ trimestre et robuste à −30 % de ventes ; (5) nous levons 1,5 M€ pour l'exécuter." }]),
  pageBreak(),
];

// ————————————————————————————————————————————— RÉSUMÉ INVESTISSEUR
const resume = [
  H1("", "L'essentiel en une page"),
  table([2238, 7400], null, [
    [[{ t: "Le problème", b: true }], "18 % des salariés français déclarent des difficultés financières (+9 points depuis 2020) ; ~200 Md€ d'épargne salariale dorment faute d'être compris ; aucun acteur n'adresse le sujet de façon neutre, quotidienne et mesurable."],
    [[{ t: "La solution", b: true }], "Lucéane : plateforme de santé financière payée par l'employeur, offerte aux salariés — académie certifiante EDUCFI, Cockpit de l'argent dormant, coach hybride IA + experts agréés, tableau de bord DRH strictement anonyme."],
    [[{ t: "Le marché", b: true }], "7 442 ETI françaises, 3,5 M de salariés. TAM ≈ 500 M€ · SAM ≈ 200 M€ · SOM 3 ans ≈ 10 M€. Catégorie validée (Filib', Rosaly, marché US) ; position produit + IA + ETI vacante."],
    [[{ t: "Le modèle", b: true }], "Abonnement 8-15 € par salarié et par mois payé par l'employeur (engagement 12 mois) + packs à l'acte payés par le salarié. Marge brute ~80 %."],
    [[{ t: "La trajectoire", b: true }], "15 → 50 → 120 ETI · 6 000 → 25 000 → 70 000 salariés · ARR 0,7 → 3,0 → 8,8 M€ · EBITDA trimestriel positif dès le T7 ; +1,95 M€ en année 3."],
    [[{ t: "La robustesse", b: true }], "Rentable en année 3 même à −30 % de ventes ; coût d'acquisition remboursé en 4-5 mois de marge brute ; scénario central assis sur une adoption prudente (20-25 %)."],
    [[{ t: "L'équipe", b: true }], "Fondatrice au profil commercial — le bon premier profil pour un projet dont les risques sont la vente et l'adoption — entourée d'un studio produit, d'experts agréés sous charte de neutralité et de trois advisors (juridique, EDUCFI, DRH)."],
    [[{ t: "La demande", b: true }], "Levée d'amorçage de 1,5 M€, encaissée à la création : elle couvre le besoin du scénario prudent (1,43 M€) et mène à l'autofinancement sans tour intermédiaire."],
  ], { alignFirstLeft: true, sz: 19 }),
  spacer(120),
  callout([{ t: "Pourquoi maintenant : ", b: true }, { t: "pouvoir d'achat préoccupation n° 1, généralisation du Passeport EDUCFI (rentrée 2026), précédent santé mentale (Grande Cause 2025-2026), maturité de l'IA — et une fenêtre concurrentielle qui ne restera pas ouverte." }]),
  pageBreak(),
];

// ————————————————————————————————————————————— 1 VISION
const s1 = [
  H1("1", "La vision — pourquoi ce projet"),
  P("Dans chaque entreprise où j'ai travaillé, j'ai vu la même scène : des collaborateurs compétents, engagés, que les soucis d'argent rongeaient en silence. Un découvert qu'on n'ose pas regarder, une épargne salariale qu'on ne comprend pas, une retraite qu'on préfère ne pas calculer. Personne n'en parle — pas au manager, pas aux RH, encore moins au banquier, dont on sait qu'il finira par vendre quelque chose."),
  P("Ce silence a un coût. Pour le salarié : du stress, du sommeil perdu, des décisions évitées ou prises dans l'urgence. Pour l'entreprise : de la concentration en moins, de l'absentéisme et du turnover en plus, une obligation de prévention des risques psychosociaux mal couverte. Et pourtant, la santé mentale a montré la voie : en quelques années, elle est passée de sujet tabou à pilier des politiques RH, avec des acteurs dédiés, des budgets et des indicateurs."),
  P([{ t: "Notre conviction : " }, { t: "la santé financière des salariés est le prochain pilier des politiques RH", b: true }, { t: ", au même titre que la santé mentale l'est devenue. Elle se mesure, elle s'améliore, et l'entreprise a un intérêt économique direct à s'en occuper — à condition qu'un tiers de confiance s'en charge : un acteur qui n'a rien à vendre d'autre que la sérénité de ses utilisateurs." }]),
  P([{ t: "C'est le sens du nom. " }, { t: "Lucéane", b: true }, { t: " vient du latin " }, { t: "lux", i: true }, { t: " — la lumière : celle qui éclaire l'argent qui dort, les droits qu'on ne réclame pas, les décisions qu'on n'ose pas prendre. Notre ambition à cinq ans : faire de la santé financière un réflexe RH en France, et de Lucéane la référence de cette catégorie." }]),
  callout([{ t: "L'approche est pragmatique : ", b: true }, { t: "nous ne réinventons pas la finance, nous activons ce qui existe déjà — les dispositifs d'épargne salariale que les entreprises financent et que les salariés n'utilisent pas, les aides auxquelles ils ont droit, les décisions simples qu'ils repoussent. La valeur est déjà là, dormante ; nous la révélons et nous la mettons en mouvement." }]),
];

// ————————————————————————————————————————————— 2 PROBLÈME
const s2 = [
  H1("2", "Le problème — le stress financier, angle mort des politiques RH"),
  H2("2.1  La douleur est massive, française et documentée"),
  P([{ t: "18 % des salariés français déclarent des difficultés financières — une hausse de 9 points depuis 2020", b: true }, { t: " (Malakoff Humanis, Baromètre Fragilités 2025, Harris Interactive, 2 060 salariés du privé). Plus largement, 59 % des salariés traversent au moins une fragilité personnelle, et 64 % d'entre eux disent qu'elle pèse sur leur vie professionnelle. Le sujet n'est pas marginal : il touche le cœur productif des entreprises." }]),
  P("Cette fragilité s'ancre dans un déficit de culture financière : la France obtient 12,8/20 au test OCDE de littératie financière (Banque de France, enquête CSA, janvier 2026), et seuls 56 % des Français disposent d'une connaissance financière de base (Banque de France, 2023). Concrètement : 24 % des Français sont à découvert tous les mois ou presque — 42 % chez les 25-34 ans (CSA Research, 2025)."),
  P("Les conséquences débordent largement le portefeuille : l'épisode dépressif est trois fois plus fréquent chez les personnes qui perçoivent leur situation financière comme difficile — 28 % contre 9 % chez celles à l'aise (Santé publique France, Baromètre 2024). L'argent est le tabou qui reste : on n'en parle ni à son manager, ni à ses proches, ni à sa banque."),
  table([4638, 2400, 2600],
    ["Indicateur", "Valeur", "Source (année)"],
    [
      ["Salariés français en difficulté financière", "18 % (+9 pts vs 2020)", "Malakoff Humanis (2025)"],
      ["Littératie financière des Français (test OCDE)", "12,8 / 20", "Banque de France (2026)"],
      ["Français à découvert tous les mois ou presque", "24 % (42 % des 25-34 ans)", "CSA Research (2025)"],
      ["Épisode dépressif si situation financière difficile", "28 % vs 9 %", "Santé publique France (2024)"],
      ["Encours d'épargne salariale", "≈ 200 Md€", "AFG (2025)"],
      ["Avoirs en déshérence (Caisse des Dépôts)", "7,9 Md€", "Ciclade (2025)"],
    ], { alignFirstLeft: true, sz: 18 }),
  spacer(80),
  H2("2.2  Un paradoxe : la valeur existe, mais elle dort"),
  P([{ t: "Le paradoxe français est unique : l'argent des salariés existe, mais il dort. " }, { t: "≈ 200 milliards d'euros d'encours d'épargne salariale", b: true }, { t: " pour plus de 13 millions de porteurs (AFG, 2024-2025) — des dispositifs financés par les employeurs, largement sous-utilisés faute d'être compris. Et 7,87 milliards d'euros d'avoirs non réclamés dormaient fin 2025 à la Caisse des Dépôts (dispositif Ciclade). Le salarié moyen a perçu 3 113 € bruts d'épargne salariale en 2024 : chaque entreprise cliente possède déjà le gisement sur lequel notre produit crée de la valeur." }]),
  H2("2.3  Le coût pour l'employeur"),
  P("Pour l'entreprise, ce stress se paie en concentration, en absentéisme, en turnover — et en marque employeur. Aux États-Unis, marché précurseur de la catégorie, 59 % des salariés se déclarent stressés par leurs finances (PwC, Employee Financial Wellness Survey 2026, périmètre US) et les employeurs en ont fait un poste d'investissement : le marché américain du financial wellness dépasse 587 M$ et croît de ~13 % par an (ResearchAndMarkets, 2025). La DRH française, elle, n'a aujourd'hui ni outil ni indicateur pour agir sur ce coût."),
  callout([{ t: "Le nœud du problème : ", b: true }, { t: "chaque acteur qui pourrait aider est disqualifié par son modèle. La banque vend ses produits ; le conseiller en gestion de patrimoine vit des gros patrimoines ; les applis de budget constatent sans agir ; les dispositifs publics informent sans engager ; les acteurs de la QVT n'ont pas la compétence financière. Il manque un tiers neutre, quotidien et mesurable — c'est exactement la place que prend Lucéane." }]),
];

// ————————————————————————————————————————————— 3 SOLUTION
const s3 = [
  H1("3", "La solution — la plateforme Lucéane"),
  P([{ t: "Lucéane est une plateforme de santé financière ", b: true }, { t: "payée par l'employeur et offerte aux salariés" }, { t: ", en libre-service quotidien, animée par un coach hybride IA + humain. Strictement neutre : nous ne vendons aucun produit financier, nous ne touchons aucune commission, et le conseil réglementé est délégué à des experts agréés sous charte de neutralité." }]),
  H2("3.1  Quatre piliers pour le salarié"),
  P([{ t: "Apprendre. ", b: true }, { t: "Une académie sans jargon — des parcours courts sur la fiche de paie, le budget, l'épargne, le crédit, la retraite — alignée sur le référentiel public EDUCFI, avec un Passeport certifiant qui valorise la progression." }]),
  P([{ t: "Comprendre. ", b: true }, { t: "Le Cockpit : le tableau de bord personnel qui agrège les dispositifs de l'entreprise (PEE, PER, intéressement, participation) et révèle l'argent dormant — abondement non réclamé, versements oubliés, aides non demandées. Dès la première connexion, le salarié voit un montant : « voici ce qui est déjà à vous, à activer »." }]),
  P([{ t: "Être accompagné. ", b: true }, { t: "Un coach IA disponible 24/7 pour toutes les questions — sans honte, sans jugement, sans rendez-vous — et des experts humains agréés (conseillers en gestion de patrimoine sous charte) pour les situations qui exigent un conseil personnalisé." }]),
  P([{ t: "Optimiser. ", b: true }, { t: "Le moteur « Moments de vie » : naissance, achat immobilier, versement de l'intéressement, déclaration de revenus, préparation de la retraite — le bon contenu et le bon geste, proposés au bon moment, de façon proactive." }]),
  H2("3.2  La couche de preuve pour la DRH"),
  P("Côté entreprise, un tableau de bord strictement anonyme : indice de santé financière agrégé, taux d'activation, valeur activée, progression pédagogique, benchmark inter-entreprises. Aucune donnée individuelle n'est accessible à l'employeur — par construction (seuils d'agrégation, anonymisation). La DRH ne pilote pas ses salariés : elle prouve l'impact de son investissement à sa direction."),
  H2("3.3  Le parcours type"),
  P([{ t: "Sophie se connecte via le portail RH (connexion unique, sans mot de passe supplémentaire). Diagnostic en 3 minutes : situation, projets, dispositifs. Le Cockpit s'allume : abondement non réclamé, prime d'intéressement en attente d'affectation, aide au logement non demandée — un montant chiffré s'affiche, par exemple " }, { t: "1 240 € (montant illustratif d'un parcours type)", i: true }, { t: ". Elle active en trois gestes guidés, pose ses questions au coach, et reçoit au fil de l'année les alertes de ses moments de vie. L'effet « waouh » des premières minutes fait d'elle une ambassadrice interne — c'est le moteur de notre adoption." }]),
  callout([{ t: "La neutralité n'est pas un argument marketing, c'est le produit. ", b: true }, { t: "Le seul acteur que le salarié écoute sur l'argent est celui qui n'a rien à lui vendre. Toute notre architecture — facturation à l'employeur, services payés à l'acte et jamais commissionnés, conseil délégué sous charte — protège cet actif." }]),
  H2("3.4  Trois innovations signature"),
  table([3213, 3213, 3212],
    ["Le Cockpit", "Les Moments de vie", "Le Passeport"],
    [[
      "Agrège les dispositifs réels du salarié et chiffre l'argent dormant. Ne dit pas « épargnez » : dit « voici ce qui est déjà à vous, activez-le ». C'est le déclencheur du « waouh » initial — et de l'adoption.",
      "Détecte les moments où la décision financière se joue (naissance, prime, déclaration, projet, retraite) et pousse le bon contenu au bon moment. Transforme un outil qu'on consulte en un service qui pense à vous.",
      "Certifie la progression pédagogique sur le référentiel public EDUCFI. Donne au salarié une preuve valorisable, à la DRH un indicateur de montée en compétence, à la marque une légitimité institutionnelle.",
    ]], { sz: 17 }),
  spacer(80),
  H2("3.5  Feuille de route produit"),
  table([1638, 4000, 4000],
    ["Version", "Périmètre", "Objectif"],
    [
      ["V1 (M1-M6)", "Académie, Cockpit v1 (épargne salariale), coach IA, diagnostic, tableau de bord DRH, SSO", "Démontrer l'activation en pilote"],
      ["V2 (M7-M18)", "Moments de vie, Passeport certifiant, simulateurs avancés, connecteurs SIRH étendus, benchmark inter-entreprises", "Industrialiser le déploiement et la preuve"],
      ["V3 (an 3)", "Offre Patrimoine complète, packs à l'acte intégrés, indice de santé financière v2, données de cohortes", "Monter en gamme et verrouiller le standard de mesure"],
    ], { alignFirstLeft: true, sz: 17 }),
  spacer(80),
  P([{ t: "État d'avancement : ", b: true }, { t: "la maquette interactive du produit (Cockpit, académie, tableau de bord DRH) est en cours de développement et sera présentée en démonstration à la soutenance." }], { after: 60 }),
];

// ————————————————————————————————————————————— 4 MARCHÉ
const s4 = [
  H1("4", "Le marché"),
  H2("4.1  Le cœur de cible : les ETI françaises"),
  P([{ t: "La France compte " }, { t: "7 442 entreprises de taille intermédiaire (250 à 4 999 salariés), employant environ 3,5 millions de salariés", b: true }, { t: " (INSEE). L'ETI est la tête de pont idéale : assez grande pour avoir une DRH structurée, un budget social et des dispositifs d'épargne salariale en place ; assez agile pour décider en 3 à 5 mois, là où le grand groupe exige 18 mois d'appels d'offres. Et elle est sous-servie : les acteurs existants du bien-être visent les grands comptes." }]),
  img("chart_marche.png", 620, 257),
  P("Méthode : le TAM est calculé en bottom-up (3,5 M de salariés × prix moyen ~11,5 € × 12 mois ≈ 500 M€). Le SAM retient les ETI réellement adressables à 3 ans — épargne salariale déployée, fonction RH structurée — soit ~40 % du parc. Le SOM correspond à notre objectif an 3 : 120 ETI, 70 000 salariés couverts. Les hypothèses détaillées figurent en annexe A."),
  H2("4.2  Une catégorie déjà validée — une position encore vacante"),
  P("Le marché n'est pas à évangéliser de zéro. En France, Filib' (coaching financier B2B) revendique 200 entreprises clientes et ~500 000 salariés couverts ; Rosaly a levé 10 M€ sur l'acompte sur salaire ; Moka.care a prouvé sur la santé mentale que les employeurs financent le bien-être mesurable (320+ clients). Aux États-Unis, la catégorie pèse déjà plus d'un demi-milliard de dollars. Ce qui reste vacant — et que nous prenons — c'est la position produit : une plateforme self-service quotidienne, à coach hybride IA + humain, neutre, pensée pour couvrir 100 % de l'effectif d'une ETI (analyse complète : section 9)."),
  P("Relais de croissance au-delà de l'horizon du plan : les PME via les prescripteurs (experts-comptables, mutuelles) avec une offre packagée, puis l'international européen — le déficit de littératie financière est paneuropéen."),
];

// ————————————————————————————————————————————— 5 CLIENTÈLE
const s5 = [
  H1("5", "La clientèle — personas et rôles"),
  P([{ t: "Notre marché sépare trois rôles, et cette séparation est la clé du modèle : " }, { t: "celui qui a l'intérêt économique (l'employeur) paie pour celui qui a le besoin (le salarié)", b: true }, { t: ", et celle qui décide est la DRH." }]),
  H2("5.1  Hélène, 47 ans — DRH d'une ETI de 850 salariés (décide et paie)"),
  P("Au comité de direction, Hélène porte l'engagement, la marque employeur et la prévention des risques psychosociaux. Sa douleur n'est pas de trouver des idées : c'est de justifier chaque euro. Son budget QVT est rempli de dispositifs sympathiques et non mesurables, et sa direction exige un retour démontrable. Son job-to-be-done : « quand je construis ma politique sociale, je veux un dispositif crédible et mesurable, afin de réduire l'absentéisme et le turnover et de prouver mon impact à ma direction. » Le signal qui la qualifie : elle demande « comment je mesure l'impact ? » avant « combien ça coûte ? ». Cycle d'achat constaté sur ce type de dispositif : 3 à 5 mois, décision avec DG et DAF, parfois cofinancement CSE."),
  H2("5.2  Sophie, 34 ans — cheffe de projet (utilise)"),
  P("Un jeune enfant, un crédit immobilier, une charge mentale déjà pleine. Sophie n'ouvre pas un livre de finance : elle veut comprendre ses options au moment où elle en a besoin, sans être jugée, et avec une certitude absolue : que son employeur ne voie rien de sa situation. Son job-to-be-done : « quand je suis face à une décision d'argent, je veux comprendre simplement mes options et agir en confiance, afin de ne plus subir mon budget. » La confidentialité pèse plus lourd que la richesse fonctionnelle : c'est un principe de conception, pas une option."),
  table([1638, 4000, 4000],
    ["", "Hélène — décide et paie", "Sophie — utilise"],
    [
      ["Déclencheur", "Turnover en hausse, direction qui exige un ROI sur la QVT, épargne salariale en place mais sous-utilisée", "Un moment de vie : naissance, imprévu, prime d'intéressement, déclaration, projet immobilier"],
      ["Critère n° 1", "La preuve : « comment je mesure l'impact ? »", "La confidentialité : « mon employeur ne voit rien »"],
      ["Objection type", "« Encore un gadget bien-être non mesurable »", "« Encore quelqu'un qui va me vendre un produit »"],
      ["Notre réponse", "Tableau de bord anonyme, benchmark, pilote payant de 3 mois qui fait ses preuves avant l'engagement", "Neutralité totale : rien à vendre, anonymat garanti, gain concret dès la première connexion"],
    ], { alignFirstLeft: true, sz: 17 }),
  spacer(80),
  H2("5.3  Les prescripteurs"),
  P("Autour de ce couple décideuse-utilisatrice, un écosystème prescrit : courtiers en assurance collective et mutuelles (qui cherchent des services différenciants), cabinets de conseil RH, experts-comptables, et la communauté DRH elle-même (ANDRH, réseaux). La santé financière complète leur offre sans la concurrencer — ils sont notre canal d'accélération en année 2-3 et la porte d'entrée du futur marché PME."),
];

// ————————————————————————————————————————————— 6 PRODUITS
const s6 = [
  H1("6", "Les produits et services en détail"),
  H2("6.1  Deux offres d'abonnement, payées par l'employeur"),
  table([3438, 3100, 3100],
    ["", "Essentiel — 8 € / salarié / mois", "Patrimoine — 15 € / salarié / mois"],
    [
      ["Pour qui", "Toute ETI — la porte d'entrée", "ETI matures — la montée en gamme"],
      ["Apprendre", "Académie complète + Passeport EDUCFI", "Académie + modules investissement, immobilier, retraite"],
      ["Comprendre", "Cockpit des dispositifs + simulateurs de base", "Cockpit + simulateurs avancés (retraite, fiscalité, projets)"],
      ["Être accompagné", "Coach IA 24/7", "Coach IA + accès coachs humains agréés (sous charte)"],
      ["Optimiser", "Moments de vie (les fondamentaux)", "Moments de vie étendus (patrimoine, transmission)"],
      ["Pour la DRH", "Tableau de bord anonyme + benchmark", "Tableau de bord + revue d'impact annuelle dédiée"],
    ], { alignFirstLeft: true, sz: 18 }),
  spacer(60),
  P([{ t: "Conditions : " }, { t: "engagement 12 mois, sans remise au volume", b: true }, { t: " — le prix est déjà pensé pour couvrir tout l'effectif, et la valeur ne baisse pas avec la taille. " }, { t: "Pilote de 3 mois à 4 € par salarié et par mois", b: true }, { t: ", intégralement déduits du contrat en cas de signature : l'entreprise teste avec un engagement réel mais sans risque, et le pilote payant qualifie les décideurs sérieux." }]),
  H2("6.2  Les packs à l'acte, payés par le salarié"),
  P("Sur le socle offert par l'employeur, le salarié peut acheter en direct un accompagnement personnalisé, réalisé par un expert agréé. Nous facturons un service — jamais une commission sur un produit :"),
  table([4838, 1600, 3200],
    ["Pack", "Prix", "Contenu"],
    [
      ["Consultation expert", "79 €", "45 min avec un conseiller agréé, toute question"],
      ["Stratégie fiscale + déclaration", "99 €", "Optimisation et accompagnement de la déclaration de revenus"],
      ["Bilan retraite", "149 €", "Reconstitution de carrière, projection, plan d'action"],
      ["Projet immobilier", "179 €", "Capacité, montage, sécurisation du projet"],
    ], { alignFirstLeft: true, sz: 18 }),
  spacer(60),
  P([{ t: "Point d'offre assumé : " }, { t: "l'accompagnement de la déclaration de revenus n'est pas inclus dans les forfaits", b: true }, { t: " — c'est le pack à 99 €. Le socle employeur couvre la pédagogie et l'activation ; l'expertise individuelle se paie à l'acte, au moment où le besoin est le plus personnel et la disposition à payer la plus forte. L'expert est rémunéré à la consultation (65 % du prix du pack) : le modèle reste sans conflit d'intérêt." }]),
  H2("6.3  Le déploiement client : 30 jours, sans projet informatique"),
  table([2038, 7600], null, [
    [[{ t: "Semaine 1", b: true }], "Cadrage avec la DRH : périmètre, offre, calendrier ; connexion SSO à l'annuaire (aucune donnée RH sensible transmise)."],
    [[{ t: "Semaines 2-3", b: true }], "Paramétrage des dispositifs de l'entreprise dans le Cockpit (PEE, PER, intéressement, avantages) ; préparation du kit de lancement interne (managers, CSE, communication salariés)."],
    [[{ t: "Semaine 4", b: true }], "Lancement : campagne interne, session de présentation, ouverture des comptes. Premier rapport d'activation à J+30, puis mensuel."],
  ], { alignFirstLeft: true, sz: 18 }),
  spacer(80),
  H2("6.4  Intégration, conformité, sécurité"),
  P("Déploiement en un clic via l'annuaire de l'entreprise (SSO, connecteurs SIRH et épargne salariale), hébergement souverain dans l'Union européenne, chiffrement de bout en bout, analyse d'impact RGPD (données financières = données sensibles), restitution employeur exclusivement agrégée et seuillée. Frontière réglementaire : Lucéane délivre de la pédagogie et de l'information générique ; toute recommandation personnalisée relevant du conseil réglementé (CIF) est réalisée par les experts agréés partenaires — cadrage juridique détaillé en annexe D."),
];

// ————————————————————————————————————————————— 7 BUSINESS MODEL
const s7 = [
  H1("7", "Le business model"),
  P([{ t: "Un abonnement SaaS par salarié couvert, payé par l'employeur", b: true }, { t: " — 8 € (Essentiel) ou 15 € (Patrimoine) par mois — complété par les packs à l'acte payés par les salariés. Le revenu est récurrent et prévisible ; l'unité de valeur est le salarié couvert ; et celui qui paie est celui qui a le retour économique." }]),
  H2("7.1  Pourquoi ce prix tient"),
  P("Le prix est ancré sur la valeur, pas sur les coûts : un seul départ évité vaut plusieurs mois de salaire ; quelques points d'absentéisme en moins valent des dizaines de milliers d'euros — contre 8 à 15 € par salarié et par mois. Les référentiels que toute DRH connaît encadrent notre fourchette : la mutuelle obligatoire coûte ~30 €/salarié/mois, l'abonnement sport type Wellpass est public entre 1 et 20 €. Nous nous plaçons en haut de gamme du facultatif, assumé par la preuve d'impact — et le 8 € d'entrée rend l'essai indolore. Le prix reste notre hypothèse n° 1, testée en continu par les pilotes payants (annexe B, tableau de bord commercial)."),
  H2("7.2  L'économie du modèle"),
  P([{ t: "Le mix évolue en « land and expand » : les entreprises entrent en Essentiel puis montent en gamme — 20 % des salariés couverts en Patrimoine en année 1, 35 % en année 3, soit un prix moyen de 9,40 € à 10,45 €. La marge brute s'établit à " }, { t: "~80 %", b: true }, { t: " : les coûts variables (infrastructure, IA, support, experts inclus, facturation) pèsent ~2 € par salarié et par mois. Le coach IA est l'avantage structurel : là où un modèle de téléconsultation paie chaque interaction humaine, notre coût marginal par question tend vers zéro — plus l'usage monte, plus l'économie s'améliore." }]),
  P("Unit economics (année 2, en régime établi) : coût d'acquisition ~18 k€ par client ETI ; revenu récurrent apporté par client ~60 k€/an ; remboursement du coût d'acquisition en 4 à 5 mois de marge brute. La rétention visée (> 90 % logo) est portée par la preuve : le tableau de bord DRH démontre l'impact à chaque renouvellement. La publicité et la monétisation des données sont exclues par principe — elles détruiraient l'actif de confiance."),
  H2("7.3  Le business model en un coup d'œil (canvas)"),
  table([3213, 3213, 3212], null, [
    [
      [{ t: "Partenaires clés — ", b: true }, { t: "experts agréés sous charte · studio de développement · prescripteurs (mutuelles, experts-comptables) · advisors AMF / EDUCFI · hébergeur UE" }],
      [{ t: "Proposition de valeur — ", b: true }, { t: "DRH : réduire le coût du stress financier et le prouver. Salarié : maîtriser son argent sereinement, activer l'argent dormant — sans qu'on lui vende rien" }],
      [{ t: "Segments — ", b: true }, { t: "DRH / QVT d'ETI (250-5 000 salariés) · salariés utilisateurs · demain : PME via prescripteurs" }],
    ],
    [
      [{ t: "Activités clés — ", b: true }, { t: "produit & algorithmes (Cockpit, indice) · contenu certifiant · vente et pilotage des comptes · mesure d'impact · conformité" }],
      [{ t: "Relation client — ", b: true }, { t: "vente directe · démo → pilote payant 3 mois → contrat annuel · revue d'impact annuelle · coach IA 24/7 côté salarié" }],
      [{ t: "Canaux — ", b: true }, { t: "prospection directe DRH (LinkedIn, ANDRH, événements RH) · prescripteurs · bouche-à-oreille entre DRH" }],
    ],
    [
      [{ t: "Ressources clés — ", b: true }, { t: "plateforme & IA · marque de tiers neutre · référentiel de benchmark · réseau d'experts agréés" }],
      [{ t: "Coûts — ", b: true }, { t: "majoritairement fixes (équipe, produit, contenu) ; variables faibles (~2 €/salarié/mois) → marge brute ~80 %" }],
      [{ t: "Revenus — ", b: true }, { t: "abonnement par salarié couvert (8-15 €/mois, employeur) · packs à l'acte (salarié) · récurrent et prévisible (ARR)" }],
    ],
  ], { alignFirstLeft: true, sz: 16 }),
];

// ————————————————————————————————————————————— 8 STRATÉGIE
const s8 = [
  H1("8", "La stratégie opérationnelle"),
  H2("8.1  Les étapes clés"),
  table([1438, 4100, 4100],
    ["Phase", "Jalon", "Critère de passage"],
    [
      ["M1-M6", "MVP (académie, Cockpit v1, coach IA, tableau de bord DRH) construit en asset-light avec un studio ; recrutement du premier commercial (M4)", "MVP démontrable ; 5 pilotes signés"],
      ["M4-M12", "5 pilotes payants (4 €/salarié/mois), mesure d'activation par cohorte ; 15 clients fin d'année 1", "Activation ≥ 20 % à 3 mois ; conversion pilote ≥ 60 %"],
      ["An 2", "Industrialisation commerciale (3 AE, 1 SDR), canal prescripteurs, montée en gamme Patrimoine ; 50 clients", "EBITDA trimestriel positif au T7 ; rétention > 90 %"],
      ["An 3", "Passage à l'échelle : 120 clients, 70 000 salariés, internalisation technologique progressive", "EBITDA annuel positif ; préparation série A ou croissance autofinancée"],
    ], { alignFirstLeft: true, sz: 18 }),
  spacer(60),
  H2("8.2  La stratégie commerciale"),
  P([{ t: "Vente directe aux DRH d'ETI, en cycle court maîtrisé : " }, { t: "démonstration du Cockpit → pilote payant de 3 mois → contrat annuel", b: true }, { t: ". L'entonnoir de l'année 1 est chiffré et piloté : 500 comptes travaillés → 125 rendez-vous (25 %) → 63 démonstrations (50 %) → 25 pilotes (40 %) → 15 contrats (60 %). Ce volume est intenable pour une personne seule : le premier account executive est recruté dès le mois 4, financé par la levée. Chaque taux de passage est un indicateur du tableau de bord commercial (annexe B) — si un étage de l'entonnoir décroche, nous le voyons en semaines, pas en trimestres." }]),
  img("chart_traction.png", 620, 175),
  P("À partir de l'année 2, les prescripteurs (mutuelles, courtiers, experts-comptables, cabinets RH) apportent ~25 % du flux contre une commission de ~15 % — le canal qui préparera aussi l'offre PME. L'expansion dans les comptes existants (effectifs couverts, montée en gamme) a un coût d'acquisition quasi nul et porte une part croissante de la croissance."),
  H2("8.3  Marketing et communication"),
  P("Notre marketing crée la catégorie « santé financière » en France, sur le modèle de ce que Moka.care a réussi pour la santé mentale. Trois piliers : (1) l'autorité — un baromètre annuel de la santé financière des salariés français, co-produit avec un institut, qui installe Lucéane comme référence de données ; (2) la communauté DRH — présence ANDRH, événements RH, contenus concrets (kits de déploiement, études de cas chiffrées) ; (3) la preuve sociale — chaque pilote documenté en étude de cas avec ses métriques. Le budget marketing passe de 60 k€ (an 1) à 700 k€ (an 3), en soutien d'une vente qui reste fondamentalement directe et relationnelle. Auprès des salariés, la communication est interne (kit employeur, managers, CSE) : c'est l'employeur qui donne la légitimité, l'anonymat qui donne la confiance."),
  H2("8.4  Objectifs et chiffres clés (rappel synthétique)"),
  table([3838, 1934, 1933, 1933],
    ["Objectif", "An 1", "An 2", "An 3"],
    [
      ["Nouveaux clients ETI (bruts)", "15", "36", "75"],
      ["Salariés couverts (fin d'année)", "6 000", "25 000", "70 000"],
      ["ARR (fin d'année)", "0,68 M€", "3,0 M€", "8,8 M€"],
      ["Activation salariés à 3 mois", "≥ 20 %", "≥ 22 %", "≥ 25 %"],
      ["Rétention logo", "—", "> 90 %", "> 90 %"],
      ["EBITDA", "−0,53 M€", "−0,17 M€", "+1,95 M€"],
    ], { alignFirstLeft: true, sz: 18, align: AlignmentType.CENTER }),
  spacer(60),
  P([{ t: "Chaque ligne de ce tableau a son double opérationnel dans les tableaux de bord de pilotage (annexe B) : mêmes indicateurs, mêmes cibles, déclinés par trimestre avec seuils d'alerte — le pilotage de l'activité correspond aux objectifs fixés, par construction.", i: true, sz: 19 }]),
  H2("8.5  Pourquoi maintenant"),
  P("Cinq lames de fond convergent : (1) le pouvoir d'achat est la préoccupation n° 1 des Français et les difficultés financières des salariés progressent (+9 points depuis 2020) ; (2) l'État généralise l'éducation financière — Passeport EDUCFI pour tous les élèves de 4ᵉ à la rentrée 2026, plan stratégique 2026-2028 — et cherche des relais privés vers les actifs ; (3) la santé mentale, Grande Cause nationale 2025 prolongée en 2026, a appris aux DRH à acheter du bien-être mesurable ; (4) la maturité de l'IA rend enfin viable un coach financier de qualité à coût marginal quasi nul — l'avantage économique qui n'existait pas il y a trois ans ; (5) la catégorie est validée (Filib', Rosaly, marché US) mais la position produit + IA + ETI est encore vacante. Cette fenêtre ne restera pas ouverte : Wagestream (352 M€ levés) prépare son entrée en France."),
];

module.exports = { cover, toc, resume, s1, s2, s3, s4, s5, s6, s7, s8, H1, H2, P, callout, table, img, spacer, pageBreak, runs, INK, GREEN, SHELL, GOLD, GREY, W };
