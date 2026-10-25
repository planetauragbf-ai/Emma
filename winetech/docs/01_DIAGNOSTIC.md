# Étape 1 — Diagnostic de faisabilité indépendant (concept « Planet Nova »)

> **Note V2** : ce diagnostic date de la V1 (France, WooCommerce). Les faiblesses qu'il relève — marché étroit, rentabilité tardive — sont traitées dans `12_V2_EUROPE.md` (Europe, 3 CMS, marque blanche). Les chiffres de rentabilité à jour sont dans `13_BP_V2_RESULTATS.md` : ils remplacent ceux cités ici (seuil « ≈ 210 clients », « 3-4 personnes »).

> Étiquetage : **[FAIT]** = donnée sourcée (voir `04_MARCHE_CONCURRENCE.md`) · **[HYP]** = hypothèse de travail non validée · **[AVIS]** = jugement d'expert argumenté.
> Rien dans ce document n'est une demande validée : aucun client n'a encore payé.

## 1.1 Ce que dit vraiment la présentation actuelle

La présentation Planet Nova (12 slides) est **une présentation de partenariat, pas un dossier d'investissement**. Constat du jury-investisseur :

| Point | Constat | Gravité |
|---|---|---|
| Problème | Formulé en une phrase (« parcours fragmenté ») ; non chiffré (temps, coût, ventes perdues) | Élevée |
| Preuve | « 10 intégrations / 5 en cours / 3 pistes » = **références Planet Aura**, pas des clients du projet (la slide le dit, c'est honnête) | Élevée : zéro traction propre |
| Offre | 3 offres (Shop, Flow, Partners) pour une équipe de 1 → dispersion | Élevée |
| Marché | Absent (pas de TAM/SAM/SOM, pas de concurrence) | Élevée |
| Modèle | « Mise en place / récurrence / sur mesure » sans prix | Élevée |
| Dépendance | Schéma Domaine → Nova → **Planet Aura** : la start-up apparaît comme un canal de Planet Aura | Critique |
| Identité | « Planet » laisse croire à une filiale | Critique (corrigé étape 2) |
| Points forts | Bonne intuition « produit réutilisable plutôt qu'intégrations une par une » ; démarrage sur un seul CMS ; croissance « pilotée par l'usage » | — |

## 1.2 Le problème, reformulé précisément

**Un domaine qui vend en ligne à des particuliers étrangers fait aujourd'hui trois choses à la main [HYP à mesurer] :**

1. **Avant la vente** — il configure des zones et tarifs de livraison approximatifs dans WooCommerce (forfait par pays), sans savoir si la destination est réellement livrable pour de l'alcool, ni le coût réel (droits, accises, taxes). Conséquences : marge perdue ou commande annulée.
2. **Après la vente** — il ressaisit la commande dans le portail ou le fichier du logisticien (adresse, nombre de bouteilles, valeur, appellation, degré), puis attend la cotation ou l'étiquette.
3. **Après l'expédition** — il copie le numéro de suivi dans la commande et répond aux clients inquiets.

**Pourquoi ce problème existe** : l'expédition de vin aux particuliers à l'international n'est pas un colis ordinaire. Les grands agrégateurs (Sendcloud, Boxtal, Packlink…) restreignent ou excluent l'alcool hors UE, et les transporteurs exigent des contrats « alcool » spécifiques [FAIT : Packlink exclut le vin hors UE, FedEx refuse l'alcool international aux particuliers — voir 04]. Les domaines passent donc par des **logisticiens spécialisés vin** (dont Planet Aura) dont les outils ne sont pas branchés nativement aux boutiques.

| Critère | Évaluation | Justification |
|---|---|---|
| Fréquent ? | **Moyen** [AVIS] | Concerne uniquement les domaines qui ont (a) une boutique en ligne, (b) des clients particuliers hors de France, (c) un volume suffisant. Une minorité des ~59 000 exploitations viticoles. |
| Coûteux ? | **Faible à moyen par client** [HYP] | 20 commandes internationales/mois × ~12 min de ressaisie ≈ 4 h/mois ≈ 120-160 € de temps. Le vrai coût est ailleurs : ventes perdues au checkout et erreurs (non mesurées). |
| Insuffisamment résolu ? | **Oui, partiellement** [AVIS] | Les plugins génériques n'acceptent pas bien l'alcool international ; les logisticiens vin ont des intégrations au cas par cas. Le « trou » est réel mais étroit. |

## 1.3 Qui est concerné et comment ils travaillent

| Acteur | Situation actuelle | Ce qu'il utilise | Douleur principale |
|---|---|---|---|
| Domaine familial exportateur en direct (2-10 salariés), boutique WooCommerce | Gère l'e-shop lui-même ou via une agence locale ; 5-50 commandes étrangères/mois [HYP] | WooCommerce + extension de zones de livraison + mail/portail logisticien | Ressaisie, prix de livraison faux, pays non livrables proposés |
| Domaine sur Shopify / Wix / boutique intégrée au logiciel de gestion | Idem, outils différents | Outils natifs CMS | Idem, mais hors cible MVP |
| Domaine sans boutique | Vend au caveau, salons, mail, marketplaces | Mail, téléphone, Vivino, cavistes | Absence de canal → ce n'est **pas** un problème logistique |
| Agence web spécialisée vin | Refait une intégration logistique à chaque client, ou n'en fait pas | Développement spécifique | Coût non refacturable, maintenance |
| Logisticien vin (Planet Aura et concurrents) | Développe des intégrations sur mesure (Planet Aura : 10 déclarées) | API propriétaires | Coût d'intégration par client, onboarding lent |

**Insight clé [AVIS]** : la douleur la plus coûteuse est probablement **côté logisticien** (chaque intégration sur mesure coûte des jours de développement), pas côté domaine. C'est ce qui justifie un modèle de revenus **à deux faces** (domaine + logisticien), à valider.

## 1.4 Pourquoi un domaine nous paierait plutôt que…

| Alternative | Ce qu'elle fait bien | Pourquoi nous ? | Pourquoi pas nous ? |
|---|---|---|---|
| Un développeur freelance | Sur mesure, une fois | Produit maintenu (mises à jour WooCommerce, API logisticiens), prix récurrent faible | Un freelance coûte 1 500-3 000 € une fois ; un domaine peut préférer l'achat ponctuel |
| Une agence web | Relation de confiance, boutique complète | On équipe l'agence au lieu de la concurrencer | L'agence peut « bricoler » sans nous |
| Le logisticien lui-même | Intégration gratuite pour gagner le client | Multi-logisticiens : le domaine compare et n'est pas captif | **Menace n°1** : si chaque logisticien offre son plugin gratuit, notre valeur côté domaine s'effondre |
| Plugin générique (Sendcloud, Boxtal…) | Mature, multi-transporteurs, pas cher | Spécialisation alcool international (destinations, droits, logisticiens vin) | Ils pourraient ajouter des transporteurs vin |
| Ne rien faire (ressaisie) | Gratuit | Gain de temps + moins d'erreurs | À faible volume, la ressaisie reste rationnelle |

## 1.5 Arguments pour / contre

**Pour**
- Intuition terrain réelle : 10 intégrations réalisées dans l'écosystème Planet Aura montrent qu'il existe une demande d'intégration (preuve **indirecte**, appartenant à Planet Aura).
- Faisabilité technique bonne : une extension WooCommerce + des connecteurs API sont des technologies standard.
- Marges brutes SaaS élevées (> 80 %) et coûts variables faibles.
- Accès privilégié au terrain (le porteur est commercial dans le transport de vin) → cycle de validation court.
- Peu d'acteurs sur le croisement « CMS × logistique vin internationale » : le seul plugin trouvé (Hillebrand Gori eShipping, WooCommerce/PrestaShop) est **mono-logisticien** et compte **< 10 installations actives** [FAIT, wordpress.org, oct. 2026].

**Contre**
- **Marché étroit** : ≈ 9 000 domaines vendent en ligne (21 % des producteurs, Afnic 2025) ; SAM WooCommerce + export particuliers ≈ 500-950 domaines [HYP] (voir 04).
- **Panier SaaS faible** (≈ 50-200 €/mois) → il faut ~200 clients pour couvrir une équipe de 3-4 personnes (calcul `07_BUSINESS_MODEL_BP.md` §7.7).
- **Différenciation fragile** : un logisticien (Hillebrand Gori, groupe DHL) a **déjà** un plugin WooCommerce ; un agrégateur peut s'étendre au vin.
- **Signal faible inquiétant** : ce plugin existant n'a quasiment pas d'utilisateurs → soit la demande est faible, soit sa distribution est mauvaise. À élucider en entretiens avant tout développement.
- **Dépendance** à l'accès aux API logisticiens (non garanti contractuellement à ce jour).
- Situation du porteur vis-à-vis de son employeur : projet scolaire, réduit en V2 à une ligne de risque (voir `03_INDEPENDANCE.md` §3.2).
- **Aucune équipe technique** identifiée : profil CTO manquant.
- Planet'Shop (création de boutiques) = métier d'agence, non scalable, en concurrence avec les futurs partenaires.

## 1.6 Notation argumentée [AVIS]

| Dimension | Note /5 | Justification |
|---|---|---|
| Potentiel commercial | **3** | Irritant réel pour une niche de domaines exportateurs ; prix acceptable non prouvé |
| Différenciation | **2** | Un plugin mono-logisticien existe déjà ; la spécialisation vin + multi-logisticiens est un positionnement, pas une barrière ; la barrière viendra des données d'éligibilité et du réseau de logisticiens |
| Faisabilité technique | **4** | Standard ; la difficulté est la qualité des règles pays/produits et l'hétérogénéité des API |
| Rentabilité | **2,5** | Seuil ≈ 210 clients actifs (central) ; atteignable en 3-4 ans seulement si revenu logisticien validé |
| Potentiel de croissance | **3** | Extensible : autres CMS (Shopify, PrestaShop), autres pays producteurs (Italie, Espagne), spiritueux, autres logisticiens |
| Petite équipe rentable ? | **Oui, sous conditions** | 3-4 personnes, ~210 clients, ou ~280 sans revenu logisticien |
| Grande échelle ? | **Limitée** | Plutôt « belle PME SaaS de niche » que licorne : à assumer devant des business angels, pas des VC |

## 1.7 Verdict : **MODIFIER, puis TESTER AVANT D'INVESTIR**

Ni « lancer » (aucune demande validée), ni « abandonner » (problème réel, coût de test faible).

**Modifications imposées :**
1. **Un seul produit** : le connecteur multi-logisticiens pour WooCommerce (ex-Planet'Flow). Planet'Shop est **abandonné comme produit** ; la création de boutique est confiée aux agences partenaires.
2. **Agences = canal de distribution**, pas une troisième offre.
3. **Multi-logisticiens dès la conception** (au moins 2 logisticiens signés avant la levée seed) ; Planet Aura est un partenaire parmi d'autres.
4. **Modèle à deux faces à tester** : abonnement domaine + frais de plateforme par expédition payés par le logisticien.
5. **Nouveau nom** totalement indépendant.
6. Situation du porteur : sans objet pour un projet scolaire (une ligne de risque, voir `03_INDEPENDANCE.md`).

**Coût du test** : ≈ 3 mois et < 8 000 € (entretiens, prototype cliquable, pré-ventes) avant d'engager le MVP à 30 000 €. Critères de passage : voir `06_VALIDATION.md` §6.4.
