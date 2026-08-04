# AUDIT — Projet Bloc 3 · Plateforme SaaS de santé financière
*Phase 1 de la méthode. Confrontation de l'existant (12 documents du Drive) aux
exigences du CDC Euridis et aux deux grilles d'évaluation (dossier écrit +
soutenance). Classement par criticité : **P0** = bloquant pour la note ·
**P1** = fragilise face au jury · **P2** = finition.*

---

## 0. Verdict d'ensemble

Le fond stratégique est réel : le positionnement (neutralité · activation ·
mesure), la séparation utilisateur/décideur/payeur, l'identification honnête de
l'hypothèse la plus risquée (l'adoption) et le document Q&R sont au-dessus du
niveau attendu d'un dossier d'école. **Mais aucun des quatre livrables exigés
n'existe encore à l'état livrable.** Ce qui existe, ce sont des squelettes de
qualité (résumés d'une page par section, trame de 20 slides en texte brut, BMC).
Le travail restant n'est pas de la relecture : c'est de la production, et la
partie la plus lourde (le financier détaillé et les tableaux de bord) est
précisément celle que les deux grilles d'évaluation notent explicitement.

Deuxième constat : **les documents du Drive contredisent l'offre actuelle** sur
trois points (pilote, déclaration de revenus, packs). Tant que ce n'est pas
purgé, chaque document produit propage l'erreur.

---

## 1. État des livrables exigés

| Livrable | Exigence | État actuel | Verdict |
|---|---|---|---|
| Dossier écrit 25-30 p. | Structure imposée en 13 sections, écrit pour un investisseur, noté /20 (70 % du bloc) | N'existe pas. Seul existe `Structure_Attendue` : ~1 paragraphe par section (≈ 3 pages d'équivalent) | **P0 — à écrire intégralement** |
| Annexes financières | Compte de résultat 3 ans, plan de financement 3 ans + ante-création, trésorerie, seuil de rentabilité + point mort **traduit en quantités**, besoin de trésorerie de démarrage, montant sollicité justifié (critères littéraux de la grille de soutenance) | Rien. Seuls des agrégats (ARR, marge ~78 %, +0,9 M€ an 3) sans aucun calcul sous-jacent | **P0 — le BP actuel est invérifiable, donc indéfendable** |
| Tableaux de bord de contrôle de l'activité | Exigés en annexe ET critère de validation de la soutenance (« les tableaux de bord correspondent aux objectifs fixés ») | Rien. Le tableau de bord DRH (produit) existe en concept, mais ce n'est pas ça : il faut les tableaux de pilotage de LA SOCIÉTÉ (commercial, adoption, finance) | **P0 — critère éliminatoire de la soutenance (acquis/non acquis)** |
| Pitch deck ≤ 20 slides | Peu de texte, icônes, images, graphiques, tableaux ; 3 slides financières imposées par la grille (KPI · compte de résultat 15 lignes max · plan de financement) | Trame texte de ~22 blocs (`Structure_De_Prez`), zéro slide designée, pas de trame minutée | **P0 — l'oral blanc arrive 1 mois avant, le support doit être prêt tôt** |
| Maquette interactive | Preuve d'exécution (captures dossier + démo orale) | Dépôt Git vide. Rien n'existe | **P1 — pas exigée par l'école, mais tout le storytelling s'appuie dessus (« prototype et maquette réalisés » est écrit dans le deck : aujourd'hui c'est FAUX)** |
| Évaluation des risques | Critère de validation de la soutenance (« les risques sont évalués et justifiés ») | Fragments épars (Q&R « qu'est-ce qui rendrait le projet inutile ») jamais formalisés en analyse de risques avec parades | **P0 — critère explicite non couvert** |

## 2. Incohérences internes (à purger AVANT toute production)

1. **Pilote.** Offre actuelle : 3 mois à 4 €/salarié/mois, déduits si signature.
   `Note_Intention` (P2) et `Sereane_QR` disent « pilote gratuit de 3 mois ».
   Un jury qui lit « gratuit » ici et « 4 € » là conclut que le prix n'est pas
   maîtrisé. → corriger dans tous les documents.
2. **Déclaration de revenus.** Offre actuelle : la déclaration n'est PAS dans
   les forfaits (pack 99 €). `Structure_Attendue` met « aide à la déclaration »
   dans Essentiel et « revue de déclaration par un expert » dans Patrimoine.
   → contradiction frontale, qui en plus cannibalise le pack. À corriger.
3. **Packs salariés.** Les 4 packs et leurs prix (79 / 99 / 149 / 179 €) ne
   figurent dans AUCUN document du Drive — on n'y trouve que « packs premium »
   sans prix. Le second flux de revenus du BMC n'est donc jamais spécifié.
4. **Culture financière.** « 12,82/20 » (`Note_Intention`) vs « ~13/20 »
   (partout ailleurs). Choisir une écriture unique et un millésime unique.
5. **Timing de la levée.** Le plan 12-18 mois du deck dit « lever 1,5 M€ à
   18 mois », mais le BP an 1 (15 clients, 6 000 salariés, MVP, équipe
   commerciale) n'est pas finançable sans cet argent. Soit la levée est à
   t0-6 mois, soit l'an 1 est revu à la baisse. En l'état, un investisseur voit
   la faille en 30 secondes.
6. **« Prototype et maquette réalisés »** (`The_Pitch_Deck`, section Story) :
   faux à ce jour. Soit on la construit (livrable 3), soit on retire la phrase.
7. **Prix moyen implicite du BP.** 0,8 M€ / 6 000 salariés / 12 = 11,11 €/mois,
   ce qui suppose ~45 % des salariés en Patrimoine dès l'an 1 — jamais justifié,
   et le mix implicite bouge chaque année (11,11 → 11,67 → 11,31 €). Le modèle
   xlsx devra rendre le mix explicite.
8. **SOM.** « SOM 10 M€ » vs ARR an 3 « 9,5 M€ » : dire lequel est l'arrondi de
   l'autre, et l'écrire pareil partout.

## 3. Trous P0 (bloquants pour la note)

- **BP financier reconstruit de bas en haut** : hypothèses → mix d'offres →
  revenus mensualisés → CAC/équipe commerciale → masse salariale → compte de
  résultat 3 ans (≤ 15 lignes pour la slide) → plan de financement avec
  ante-création → plan de trésorerie mensuel an 1 → seuil de rentabilité
  exprimé en salariés couverts / clients ETI → besoin de trésorerie →
  justification des 1,5 M€. Aujourd'hui : rien de tout cela n'existe.
- **Tableaux de bord de pilotage de l'activité** (annexe notée) : pipeline
  commercial (leads → démos → pilotes → contrats), adoption (activation,
  usage, NPS), finance (MRR, churn, cash). Avec cibles chiffrées reliées aux
  objectifs du BP — c'est LE critère « les tableaux de bord correspondent aux
  objectifs fixés ».
- **Entonnoir commercial chiffré an 1** : 15 clients avec un cycle de 3-5 mois
  et une fondatrice seule ⇒ combien de comptes ciblés, de RDV, de démos, de
  pilotes ? Sans ce calcul, l'objectif de 15 clients est un vœu. (Ordre de
  grandeur à valider dans le modèle : 15 contrats ≈ 25-30 pilotes ≈ 60-80
  démos ≈ 250-400 comptes travaillés — incompatible avec une personne seule,
  donc l'équipe an 1 doit être écrite et financée.)
- **Analyse de risques formalisée** : marché / adoption / réglementaire (AMF-
  CIF, RGPD données sensibles) / dépendance fondatrice / concurrence bancaire —
  avec probabilité, impact, parade, indicateur de suivi.
- **Stratégie de communication** : la grille de soutenance évalue « présente
  une stratégie de communication pertinente » — quasi absente des documents
  (le GTM couvre la vente, pas la communication).
- **Équipe** : « fondatrice seule + freelances + advisors » est le point le plus
  attaqué par un jury investisseur (« crédibilité du projet et de l'équipe »
  est un critère de notation). Il faut une réponse construite : rôles couverts
  an 1, recrutements financés par la levée avec calendrier, advisors nommés
  (même anonymisés par fonction), et pourquoi le profil commercial de la
  fondatrice est le bon premier profil pour un projet dont le risque n°1 est
  la vente et l'adoption.

## 4. Trous P1 (le jury attaquera)

- **Adoption 40 % à 3 mois** : aucune référence externe citée. À benchmarker
  (voir §6) et à re-présenter : hypothèse basse/centrale/haute + dispositif de
  preuve (pilote concierge) plutôt qu'un chiffre sec.
- **Périmètre des stats** : les chiffres PwC sont vraisemblablement américains ;
  un jury français le sait. Il faut soit des stats françaises en tête, soit
  assumer explicitement « données US, marché précurseur » (voir §5).
- **Défendabilité** : « structurellement incopiable » est trop fort. Une
  banque ne peut pas être neutre, mais un Moka.care peut ajouter une brique
  financière, un Epsor peut ajouter de la pédagogie. La vraie barrière est
  l'exécution + la marque de tiers neutre + les données de benchmark. À
  réécrire en ces termes.
- **Frontière réglementaire** : l'argument « pédagogie, pas conseil » doit être
  étayé en annexe (critères CIF/AMF, pourquoi le Cockpit ne franchit pas la
  ligne, charte CGP). Un jury peut dérouler le fil « vous dites "activez 1 240 €"
  — n'est-ce pas une recommandation personnalisée ? ».
- **RGPD** : données financières de salariés + tableau de bord employeur =
  sujet sensible à traiter frontalement (anonymisation, seuils de restitution,
  hébergement UE, AIPD).
- **TAM/SAM/SOM** : méthode à documenter (bottom-up), et le SAM à justifier par
  des critères (ETI avec épargne salariale en place, DRH structurée…).
- **Nom non arrêté** à 2-3 mois du rendu : risque opérationnel (tous les
  livrables à re-marquer). Décision à prendre vite (short-list vérifiée INPI).

## 5. Validation des faits (recherche web du 04/08/2026 — détail : `02_VALIDATION_FAITS.md`)

- **Les deux chiffres d'accroche sont américains.** « 59 % stressés » = PwC 2026,
  périmètre US uniquement. « 3 h/semaine » = PwC 2023, US, et ne concerne que
  les salariés déjà stressés ET distraits (56 % d'entre eux) — la formulation
  actuelle est doublement fausse. → l'architecture de preuve passe aux stats
  françaises : Malakoff Humanis 2025 (18 % des salariés en difficulté financière,
  +9 pts vs 2020), CSA 2025 (24 % à découvert chaque mois), Ciclade (7,9 Md€
  d'avoirs en déshérence), AFG (200 Md€ d'épargne salariale, 3 113 €
  bruts/salarié en 2024). PwC passe en « marché précurseur US ». **P0.**
- Confirmés : 12,82/20 (janv. 2026 — écrire 12,8, pas « 13/20 »), 56 %
  connaissance de base (2023), dépression 28 % vs 9 % (SPF 2024), Grande Cause
  2025 **prolongée 2026** (bonus). À reformuler : « plan 10 ans EDUCFI » →
  généralisation du Passeport en 4e à la rentrée 2026, plan 2026-2028.

## 6. Concurrence (recherche web du 04/08/2026 — détail : `03_CONCURRENCE.md`)

- **L'USP actuelle est réfutée : Filib' existe.** 200+ entreprises clientes,
  ~500 000 salariés couverts (Carrefour, Air France, Microsoft…), distribution
  AXA, neutralité revendiquée mot pour mot, spécialisation épargne
  salariale/retraite, dashboard employeur. « Le seul dispositif neutre qui
  mesure et active » ne survit pas à 30 secondes de Google. **P0 — reconstruire
  l'USP** sur : produit self-service + coach hybride IA/humain + indice &
  benchmark continus + ciblage ETI + couverture 100 % de l'effectif — et mettre
  Filib' EN PREMIER dans la matrice concurrentielle.
- Matrice à 5 : Filib' (frontal), Epsor (possède la relation DRH + les encours,
  non neutre = notre angle), Rosaly (EWA + éducation, 10 M€ levés), Wagestream
  (352 M€ levés, GM France en recrutement — menace d'entrée), Klaro (budget
  « pouvoir d'achat » des DRH).
- **Northstar : racheté par Nayya (sept. 2025), sortie médiocre probable — à
  retirer des preuves de marché.** Origin a partiellement pivoté B2C. Brightside
  n'a pas levé depuis 2022. Récit honnête : catégorie validée mais en
  consolidation, la distribution est le nerf de la guerre (détail :
  `04_BENCHMARKS.md`).
- **Adoption : 40 % à 3 mois est le niveau du MEILLEUR client de Moka.care**
  (moyenne implicite ~20 %, RAND ~20 %, EAP digitaux 10-20 %). → re-scénariser :
  central 20-25 %, haut 40 % conditionné, bas 10-15 % avec parade. **P0 — le BP
  et l'argumentaire de rétention doivent tenir au scénario central.**
- **Prix : 8-15 € = haut de gamme des benefits facultatifs français** (seul
  benchmark public : Wellpass 1-20 €/salarié/mois ; Alan ~30 € mais obligatoire).
  8 € est l'ancrage défendable ; 15 € se vend au ROI. Aucun concurrent ne
  publie ses prix → le test prix DRH reste l'hypothèse n°1.

## 7. Les questions qui feront mal (préparer AVANT l'oral)

0. « Connaissez-vous Filib' ? Ils font ce que vous décrivez, avec Carrefour et
   AXA comme références. Pourquoi vous ? » — LA question à préparer en premier.
1. « Votre BP suppose 15 ETI en an 1 avec un cycle de 3-5 mois et une équipe
   d'une personne. Refaites le calcul devant nous. »
2. « Pourquoi une DRH paierait 8-15 € par salarié pour TOUS les salariés alors
   que 60 % ne l'utiliseront jamais ? » (réponse à construire : logique
   assurantielle + prix ancré sur le coût du problème + tableau de bord)
3. « Qu'est-ce qui empêche Moka.care — 300+ clients, la confiance des DRH —
   d'ajouter votre produit en 12 mois ? »
4. « "Activez vos 1 240 €" : en quoi n'est-ce pas du conseil financier
   réglementé ? »
5. « Vos statistiques sont américaines. Montrez-moi la douleur en France. »
6. « Un salarié sur trois en dessous de 2 500 €/mois : que fait votre produit
   pour quelqu'un qui n'a PAS d'argent dormant ? »
7. « Le pilote à 4 € : que se passe-t-il si l'activation du pilote est à 15 % ? »
8. « Pourquoi vous, seule, sans profil tech ni licence financière ? »

## 8. Plan de production (phases 2-4)

| # | Chantier | Produit | Priorité |
|---|---|---|---|
| 0 | Reconstruction de l'USP + matrice concurrentielle intégrant Filib', Epsor, Rosaly, Wagestream, Klaro ; re-scénarisation adoption 20-25 % | positionnement réécrit, répercuté partout | P0 |
| 1 | Purge des incohérences (§2) dans les documents socles | `00_SOCLE_CHIFFRES.md` fait foi | P0 |
| 2 | Modèle financier xlsx complet (hypothèses → CR → tréso → financement → seuil) | `annexes/BP_Modele.xlsx` | P0 |
| 3 | Tableaux de bord de pilotage | `annexes/Tableaux_de_bord.xlsx` | P0 |
| 4 | Dossier écrit 25-30 p. | `docs/Dossier.docx` | P0 |
| 5 | Pitch deck 20 slides + trame minutée 20 min | `pitch/Deck.pptx` | P0 |
| 6 | Analyse de risques + annexe réglementaire | dans dossier + annexe | P0 |
| 7 | Maquette interactive (4 piliers, Cockpit, tableau de bord DRH) | `maquette/` | P1 |
| 8 | Nom : short-list vérifiée + reco | note de décision | P1 |
| 9 | Identité visuelle : 2-3 directions argumentées | note de décision | P1 |
| 10 | Préparation Q&R jury (à partir de §7 + Q&R existant) | `docs/Prep_Jury.md` | P1 |
