# PROMPT — PASSAVIN V2 (dossier Bloc 3 Euridis)

## 1. Contexte

Je suis étudiant en Mastère Marketing & Digital Business à Euridis Business School. Dans la vie, je suis commercial dans le transport de vin pour les particuliers, partout dans le monde.

Je prépare l'évaluation du **Bloc 3 « Management d'une équipe et d'un réseau commercial »**. Ce projet est **uniquement scolaire** :
- il n'y a pas de lancement réel prévu ;
- il n'y a pas de sujet de conflit avec mon employeur à traiter ;
- il n'y a pas de contrainte de temps.

L'objectif est d'obtenir la **meilleure note possible** au dossier écrit (/20) et de **valider tous les critères** de la soutenance (Acquis / Non acquis).

Une version 1 existe déjà dans le dépôt GitHub `planetauragbf-ai/emma`, dossier `winetech/`, sur la branche `claude/youthful-cannon-c5hyst` :

| Fichier | Contenu |
|---|---|
| `winetech/docs/01` à `11` | Étude complète : diagnostic, nom, indépendance, marché, produit, validation, BP, stratégie, équipe, risques, Euridis |
| `winetech/outils/bp_model.py` → `build_annexes.py` → `build_decks.py` | Chaîne reproductible : modèle financier, Excel et graphiques, decks |
| `winetech/livrables/` | Dossier de 30 pages et pitch de 20 slides (.pptx et .pdf) |
| `winetech/annexes/BP_3ans.xlsx` | Business plan |

**Lis tous ces fichiers avant de commencer.** Ne casse pas l'autre projet du dépôt (Lucéane, dossiers `docs/`, `annexes/`, `livrables/` à la racine).

## 2. Le projet (décisions déjà prises, à conserver)

- **Nom : Passavin.** C'est un nom de travail. Il vient du « passavant », l'ancien laissez-passer douanier des vins.
- **Signature :** « Vos vins passent les frontières. Vos commandes passent toutes seules. »
- **Produit :** un connecteur SaaS neutre et multi-logisticiens. Il relie la boutique en ligne d'un domaine viticole (WooCommerce d'abord) à plusieurs logisticiens spécialisés vin. Il fait trois choses :
  - au checkout, il ne propose que les destinations réellement livrables, au tarif réel ;
  - il transmet automatiquement la commande au logisticien ;
  - il récupère le suivi.
- **Abandonné :** Planet'Shop (création de boutiques). Les agences web deviennent un **canal de distribution**.
- **Indépendance :** Planet Aura n'est qu'un logisticien partenaire parmi d'autres. Ses intégrations ne sont jamais présentées comme des clients de Passavin.
- **Concurrence vérifiée :**
  - Hillebrand Gori eShipping : plugin WooCommerce mono-logisticien, moins de 10 installations ;
  - VinTrail, Baqio, Wineriz ;
  - Sendcloud, Boxtal, Packlink (alcool international mal couvert) ;
  - Commerce7, Vinoshipper, Sovos (marché américain) ;
  - les marketplaces.
- **USP :** « Le connecteur neutre qui branche votre boutique à plusieurs logisticiens vin. » Ne jamais écrire « le seul plugin vin ».
- **Réglementation :**
  - pas d'envoi direct à des particuliers aux États-Unis ;
  - Passavin applique les règles d'éligibilité fournies par les logisticiens ; il ne promet pas de conformité automatique.

## 3. Ce que la V2 doit changer

La V1 a deux faiblesses pour la note :
- un marché de niche (SAM WooCommerce France d'environ 500 à 950 domaines) ;
- pas de rentabilité sur 3 ans en scénario central (point mort vers M40-42).

Il faut les corriger avec une **stratégie plus ambitieuse mais cohérente**, sans gonfler les chiffres artificiellement.

1. **Ambition européenne dès l'an 2.**
   - Producteurs italiens et espagnols, puis Allemagne et Portugal.
   - Recherche et cite des chiffres sourcés : nombre d'exploitations, part de vente directe, e-commerce du vin dans ces pays.
   - Recalcule TAM, SAM et SOM par pays.
2. **Shopify dès l'an 2**, PrestaShop en an 3. Justifie le coût de développement.
3. **Deuxième offre : Passavin en marque blanche pour les logisticiens (B2B2B).**
   - Le logisticien paie une licence (forfait mensuel + frais par expédition) et offre le connecteur à ses domaines clients.
   - Construis une grille tarifaire argumentée et ajoute cette ligne de revenus au business plan.
4. **Volet management renforcé.** C'est le cœur du Bloc 3 : « équipe ET réseau commercial ».
   - **Équipe commerciale :**
     - sales France (chasse et gestion des comptes) ;
     - sales Italie et Espagne (natifs ou bilingues) ;
     - partner manager (agences et logisticiens) ;
     - customer success.
   - **Réseau commercial externe :**
     - agences web partenaires (niveaux Silver et Gold) ;
     - apporteurs d'affaires (consultants vin, œnologues, syndicats d'appellation) ;
     - logisticiens revendeurs.
   - Pour chacun, détaille :
     - rôle et objectifs SMART chiffrés ;
     - rémunération fixe et variable, ou commission ;
     - recrutement, intégration et formation ;
     - animation : rituels, outils (CRM), challenges ;
     - indicateurs de performance ;
     - gestion des sous-performances.
   - Ajoute :
     - un style de management argumenté (situationnel, OKR) ;
     - une politique de motivation et de fidélisation ;
     - un organigramme qui évolue sur 3 ans ;
     - un plan de recrutement relié au business plan.
5. **Business plan recalculé** (scénarios pessimiste, central, optimiste).
   - Objectif à **tester honnêtement** : atteindre le point mort mensuel dans les 36 mois en scénario central, grâce à l'Europe, à Shopify et à la marque blanche.
   - Si les hypothèses réalistes ne le permettent pas, dis-le et montre ce qu'il faudrait.
   - Chaque ligne de chiffre d'affaires doit être produite par une ressource commerciale identifiée : commercial, agence, apporteur ou logisticien revendeur, avec sa productivité.
   - Besoin de financement recalculé. Un seed plus important est acceptable s'il est justifié, avec son affectation.
6. **Alléger le volet « conflit avec l'employeur »**, puisque le projet est scolaire. Garde une seule ligne de risque et une phrase de réponse si le jury pose la question.

## 4. Exigences Euridis (référentiel obligatoire)

### Dossier écrit
- Un « deck » de **25 à 30 pages maximum**, individuel, noté sur 20, rédigé pour convaincre un investisseur (business angel, fonds, partenaire).
- Il doit couvrir tous les critères de la grille :
  - vision (start with why), motivation, approche pragmatique ;
  - situation actuelle et environnement ;
  - problème ;
  - solution en lien avec l'environnement ;
  - marché (market size) ;
  - cible (buyer persona) ;
  - produits et services détaillés ;
  - business model ;
  - stratégie commerciale (objectifs, chiffres clés) ;
  - stratégie marketing (étapes clés, pourquoi maintenant) ;
  - analyse exhaustive de la concurrence ;
  - avantages concurrentiels et USP ;
  - équipe (rôles, complémentarités) ;
  - business plan (viabilité, rentabilité, pérennité, potentiel de croissance, besoin financier) ;
  - annexes (produits, financiers, tableaux de bord).
- Les correcteurs notent aussi :
  - l'USP ;
  - la stratégie commerciale et marketing ;
  - le **potentiel de croissance face aux enjeux économiques mondiaux et à l'économie numérique** ;
  - la crédibilité du projet et de l'équipe ;
  - le besoin financier.
- Orthographe et grammaire irréprochables.

### Soutenance
- Pitch de 20 slides maximum et 20 minutes, puis 15 minutes de questions, puis autoévaluation et débriefing.
- Peu de texte, des visuels, des graphiques, des chiffres utiles. Méthode des 7 S de Phil Waknell.
- **Trois démonstrations impératives :**
  1. le business plan correspond aux objectifs commerciaux ;
  2. les risques sont évalués et justifiés ;
  3. les tableaux de bord correspondent aux objectifs fixés.

## 5. Règles de rigueur

- Chaque chiffre porte une étiquette : **[FAIT]** (source + année + fiabilité), **[HYP]** (hypothèse) ou **[AVIS]** (jugement).
- N'invente aucun client, aucun résultat, aucun associé, aucun diplôme.
- Les personas sont présentés comme illustratifs.
- Garde les placeholders `[Nom Prénom]` et `[Promotion]`.
- Ne prétends jamais qu'une donnée est vérifiée si elle ne l'est pas. Liste ce qui reste non vérifié.
- Le moteur unique des chiffres est `bp_model.py`. Un chiffre qui change doit changer partout : docs, Excel, deck, pitch.
- Ne mets aucun identifiant de modèle d'IA dans les fichiers ni dans les commits.

## 6. Livrables attendus

1. `winetech/docs/` mis à jour, avec une section V2 qui explique ce qui change et pourquoi.
2. `bp_model.py` étendu : pays, CMS, offre marque blanche, équipe commerciale et réseau. Puis l'Excel `BP_3ans.xlsx` régénéré, avec un onglet hypothèses, le détail mensuel par scénario, la synthèse, le financement, le plan de recrutement et les tableaux de bord.
3. **Dossier investisseur V2** (≤ 30 pages) et **pitch V2** (≤ 20 slides) en .pptx et .pdf, régénérés par `build_decks.py`.
   - Vérifie visuellement le rendu de chaque page : pas de texte qui déborde ni qui se chevauche.
4. Document soutenance mis à jour :
   - trame minutée ;
   - texte des 3 démonstrations ;
   - 15 questions probables du jury avec réponses ;
   - autoévaluation.
5. Commit et push sur la branche `claude/youthful-cannon-c5hyst`, sans créer de pull request.

## 7. Méthode

Travaille dans cet ordre et résume chaque étape en quelques lignes :
1. relecture de la V1 ;
2. recherche marché Europe ;
3. stratégie V2 ;
4. management de l'équipe et du réseau ;
5. business plan V2 ;
6. risques et tableaux de bord ;
7. decks ;
8. préparation de l'oral.

Challenge chaque décision. Si une partie de la V2 rend le projet moins crédible, dis-le et propose une meilleure option.
