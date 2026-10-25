# V2 — Ce qui change, pourquoi, et l'ambition européenne

> Étiquettes : **[FAIT]** donnée sourcée (source, année, fiabilité) · **[HYP]** hypothèse de travail · **[AVIS]** jugement argumenté.
> Fiabilité des sources : **OFF** statistique officielle · **ÉP** étude privée · **PR** presse · **DÉC** déclaratif d'entreprise · **NV** non vérifié.
> Les chiffres du business plan cités ici sont produits par `outils/bp_model.py` et reproduits automatiquement dans `13_BP_V2_RESULTATS.md` (source de vérité).

## 12.1 Ce qui change entre la V1 et la V2, et pourquoi

| Sujet | V1 | V2 | Pourquoi |
|---|---|---|---|
| Marché | France, WooCommerce : SAM ≈ 500-950 domaines | France, Italie, Espagne, puis Allemagne et Portugal ; 3 CMS : **SAM ≈ 3 700 domaines** | Un marché de niche plafonnait la croissance (critère « potentiel de croissance » de la grille) |
| CMS | WooCommerce ; Shopify « en bêta » à M30 | WooCommerce M5 → **Shopify M18** → **PrestaShop M25** | 25 % des boutiques en France sont sur PrestaShop, 13 % sur Shopify (WMTips 2026) |
| Offres | 1 offre (abonnement domaine) + frais logisticien à valider | 2 offres : **Passavin Direct** (domaines) et **Passavin Partner** (marque blanche pour logisticiens) | La V1 identifiait déjà la marque blanche comme pivot ; la V2 en fait une ligne de revenus |
| Organisation commerciale | Dirigeant, alternant·e, 1 business developer en an 3 | **3 sales pays, 1 partner manager, 2 customer success, 1 alternant·e** ; réseau de 27 agences, 20 apporteurs, 4 logisticiens revendeurs | Le Bloc 3 évalue le management d'une équipe **et** d'un réseau commercial |
| Lien BP ↔ ressources | « ≈ 4 signatures/mois/commercial » | Chaque ligne de CA est produite par une ressource nommée, avec sa productivité, sa rampe et son seuil d'embauche | Démonstration n°1 de la soutenance |
| Recrutements | Par calendrier, avec un seuil pour le business developer | Tous déclenchés par un **jalon** (domaines actifs) **et** une règle de trésorerie (≥ 6 mois de burn) | Montrer que le plan se protège seul en scénario pessimiste |
| Financement | 320 k€ (120 k€ + seed 200 k€ à M15-M18) | **890 k€** (140 k€ de pré-amorçage + seed de 750 k€ à M12) | 6 recrutements en an 2 (commerciaux, réseau, produit, customer success) |
| Rentabilité | Point mort M40-M42 (central) | **Point mort M38** (central) ; EBITDA du mois 36 : −3 k€ | Objectif testé honnêtement : **non atteint à M36 en central**, atteint à M32 en optimiste (voir §12.7) |
| Conflit avec l'employeur | Section complète (loyauté, PI, non-concurrence) | **Une ligne de risque et une phrase de réponse** (`03_INDEPENDANCE.md` §3.2) | Projet scolaire, sans lancement réel |

**Ce qui ne change pas** : le nom de travail Passavin, la signature, le produit (éligibilité au checkout, transmission, suivi), la neutralité (Planet Aura est un logisticien partenaire parmi d'autres, ses intégrations ne sont jamais présentées comme des clients), l'exclusion des envois directs à des particuliers aux États-Unis, l'USP « connecteur neutre », le plan de validation avant tout développement.

## 12.2 Recherche marché Europe (octobre 2026)

### Production et exportations

| Pays | Indicateur | Valeur | Source (année) | Fiab. |
|---|---|---|---|---|
| France | Producteurs qui vinifient chaque année | ≈ 43 000 | FranceAgriMer, fiche filière 2026 | OFF |
| France | Exportations vins & spiritueux | 14,3 Md€ en 2025 (−8 %) | FEVS via LSA / Pleinchamp (2026) | PR |
| Italie | Exploitations avec vigne | 255 000 (791 000 en 2000) | ISTAT, recensement 2020, retraité par UIV | OFF |
| Italie | Producteurs inscrits au registre télématique du vin | ≈ 17 000 | ICQRF, « Cantina Italia », 2020 | OFF |
| Italie | Entreprises qui vinifient | ≈ 38 000 (série 37 300 à 45 700 selon l'année) | ISMEA, fiches filière 2022 (données 2021) | OFF, **NV** (lu dans un résumé) |
| Italie | Exportations de vin | 7,77 Md€ en 2025 (−3,7 %) ; plus de 8 Md€ en 2024 | ISTAT, diffusé le 11/03/2026, via Gambero Rosso | OFF (via PR) |
| Italie | Premiers marchés | États-Unis 1,75 Md€ ; Allemagne > 1 Md€ ; Royaume-Uni ≈ 0,77 Md€ (11 mois) | ISTAT via Vinetur / Gambero Rosso (2026) | OFF (via PR) |
| Espagne | Exploitations avec vigne | ≈ 137 300 | INE, Censo Agrario 2020 (annuaire MAPA) | OFF |
| Espagne | Bodegas (code d'activité CNAE 1102) | **3 925** en 2024 (+2,1 %) | INE DIRCE, via rapport Mercasa 2026 | OFF |
| Espagne | Exportations de vin | 2,88 Md€ en 2025 (−5 %) ; record 3,03 Md€ en 2024 | AEAT, analysé par l'OIVE (2026) | OFF (via PR) |
| Espagne | Premiers marchés | Allemagne 360 M€, Royaume-Uni 312 M€, États-Unis 304 M€, France 266 M€ | Cajamar via Vinetur (2026) | ÉP |
| Allemagne | Exploitations ≥ 0,5 ha | **15 151** en 2020 ; 14 150 en 2023 (−30 % depuis 2010) | Destatis, dans DWI « Deutscher Wein Statistik 2025/2026 » | OFF |
| Allemagne | Exportations de vin | 377 M€ en 2025 (−2 %) | DWI, communiqué du 16/03/2026 (données Destatis) | OFF |
| Portugal | Exploitations avec vigne | 114 220 | Eurostat, enquête vignoble 2020 (vit_t1) | OFF |
| Portugal | Exportations de vin | 953,5 M€ en 2025 (965,8 M€ en 2024) | ViniPortugal, données INE | OFF |

### Vente directe et vente en ligne

| Pays | Indicateur | Valeur | Source (année) | Fiab. |
|---|---|---|---|---|
| France | Viticulteurs vendant en ligne via leur site | 21 % | Afnic, déc. 2025 | ÉP déclaratif |
| France | Exploitations vendant en direct | 27 % de celles qui commercialisent du vin | Agreste Primeur n°5, 2023 | OFF |
| Italie | Vente directe (part du marché intérieur des grandes caves) | 8,2 % (données 2024) | Mediobanca, enquête 2025 | ÉP |
| Italie | Canal en ligne | ≈ 10 % de la vente directe ; sites des producteurs −5,7 % en 2024 | Forbes Italia (sept. 2026) citant Mediobanca | PR |
| Italie | Caves qui vendent en ligne | ≈ 50 % (+ 17 % qui le prévoient), panel de ≈ 200 caves | Nomisma Wine Monitor / Vino75, date non précisée | ÉP, **date NV** |
| Italie | Marché du vin en ligne | > 300 M€ (2024) | Forbes Italia 2026, « stime di settore » sans source nommée | PR, **fiabilité faible** |
| Espagne | Vente directe depuis la bodega (boutique + en ligne) | 4,6 % (2019) → 8,4 % (2020), grandes bodegas | OIVE / OeMv / Wine Intelligence (2021) | ÉP |
| Espagne | Bodegas qui ne vendent pas en ligne | 30 % ; chez les autres, le canal pèse 5,5 % du CA | EAE Business School (2022) | ÉP |
| Allemagne | Part de la vente directe dans le CA des domaines | **46 %** (2024, panel ≈ 400 domaines) | DWI / Hochschule Geisenheim, via Meininger | ÉP |
| Allemagne | Achats de vin en ligne (domaines + cavistes) | 13 % des achats des ménages en 2023 (+2 points) | DWI / NielsenIQ, via Tageskarte (2024) | ÉP |

### Plateformes de boutique (CMS) — tous secteurs, faute de données propres au vin

| Pays | WooCommerce | PrestaShop | Shopify | Source (année) | Fiab. |
|---|---|---|---|---|---|
| France | 35,5 % | 26,6 % | 13,2 % | WMTips (2026) | ÉP |
| France (autre mesure, ≈ 125 000 sites actifs) | 47,4 % | 19,3 % | 22,2 % | Baromètre Friends of Presta, via E-commerce Nation | ÉP |
| Italie | 52,9 % | 10,8 % | 10,4 % | WMTips (2026) | ÉP |
| Espagne | 57,2 % | 20,3 % | 5,8 % | WMTips (2026) | ÉP |
| Allemagne | 32,5 % | — | 13,4 % (Shopware 10,1 %) | WMTips (2026) | ÉP |
| Portugal | 49,2 % | 9,8 % | 9,3 % | WMTips (2026) | ÉP |

**Réglementation Shopify** [FAIT, DÉC] : Shopify autorise la vente d'alcool si le marchand respecte la loi locale (licences, âge, expédition) — help.shopify.com. Les applications ne paient **aucune commission sur le premier million de dollars** de revenus cumulés, puis 15 % ; inscription unique de 19 $ (shopify.dev, 2026). La commission de la marketplace PrestaShop Addons n'a pas été trouvée sur une source officielle : le module PrestaShop sera **vendu en direct** (site Passavin), sans commission.

## 12.3 TAM, SAM et SOM par pays

**Méthode** : TAM = producteurs × part qui vend en ligne via son propre site. SAM = TAM × part des boutiques sur les 3 CMS couverts × part qui expédie à des particuliers hors de son pays. SOM = domaines Direct actifs à M36 dans le scénario central.

| Pays | Base | Vend en ligne | 3 CMS | Export particuliers | **TAM** | **SAM** | SOM M36 | Pénétration |
|---|---|---|---|---|---|---|---|---|
| France | 43 000 [FAIT] | 21 % [FAIT Afnic] | 75 % [FAIT WMTips] | 30 % [HYP] | **9 030** | **2 040** | 289 | 14 % |
| Italie | 17 000 [FAIT ICQRF] | 25 % [HYP] | 74 % [FAIT] | 30 % [HYP] | **4 250** | **945** | 108 | 11 % |
| Espagne | 3 925 [FAIT INE] | 50 % [HYP] | 83 % [FAIT] | 25 % [HYP] | **1 962** | **409** | 75 | **18 %** |
| Allemagne | 15 151 [FAIT Destatis] | 25 % [HYP] | 49 % [FAIT ; PrestaShop 3 % HYP] | 10 % [HYP] | **3 788** | **185** | 4 | 2 % |
| Portugal | 3 000 [HYP, **NV**] | 25 % [HYP] | 68 % [FAIT] | 30 % [HYP] | **750** | **154** | 2 | 1 % |
| **Total** | | | | | **≈ 19 800** | **≈ 3 730** | **478** | **13 %** |

En valeur (abonnement 94 €/mois + 15 € de frais logisticien ≈ 1 300 €/an par domaine [HYP]) : **TAM ≈ 26 M€/an, SAM ≈ 4,9 M€/an**. S'y ajoutent les domaines activés par les logisticiens revendeurs (137 à M36 en central), qui ne sont pas limités à un pays.

**Lecture critique [AVIS]**
- Le SAM est multiplié par **4 à 7** par rapport à la V1 : c'est l'effet combiné de l'Europe (×1,8) et des deux CMS supplémentaires (×2,1 en France).
- **Hypothèses les plus fragiles** : la part « vend en ligne » en Italie (25 %) et en Espagne (50 %), et toutes les parts « export particuliers ». Elles sont à mesurer en phase 1, au même titre que les 30 % de la V1.
- **Espagne** : 18 % du SAM équipé en 17 mois d'activité est ambitieux. C'est la ligne la plus à risque du plan, d'où un poste « Sales Espagne & Portugal » unique, déclenché seulement à 90 domaines actifs.
- **Allemagne** : c'est surtout un **pays de destination** (premier marché des vins italiens et espagnols), pas un vivier de producteurs exportateurs (export 377 M€, 10 % [HYP] d'exportateurs vers des particuliers, Shopware fréquent). Elle est donc servie par des agences et des logisticiens revendeurs, **sans commercial dédié**.

## 12.4 Shopify en an 2, PrestaShop en an 3 : justification et coût

| | Shopify | PrestaShop |
|---|---|---|
| Lancement | M18 (juin 2028) | M25 (janv. 2029) |
| Qui le développe | Développeur·se n°2, recruté·e à M13 | Le/la même, après Shopify (le cœur cloud et les adaptateurs logisticiens sont réutilisés) |
| Coût de développement [HYP] | ≈ 5 mois × 5 800 € ≈ **29 k€** + recette ≈ **35 k€** | ≈ 6 mois × 5 800 € ≈ **35 k€** |
| Frais de plateforme | 19 $ une fois ; 0 % de commission jusqu'à 1 M$ cumulé | Aucun si vendu en direct |
| Domaines Direct sur ce CMS à M36 (central) | 70 | 88 |
| Contribution mensuelle à M36 (≈ 99 €/domaine) | ≈ 6,9 k€ | ≈ 8,7 k€ |
| Retour sur coût de développement | ≈ 5 mois au rythme de M36 | ≈ 4 mois au rythme de M36 |
| Autres bénéfices | Canal App Store, agences Shopify Partners, marques DTC récentes, Portugal et Allemagne | Base installée en France (27 %) et en Espagne (20 %) |

**Challenge de l'ordre demandé [AVIS]** : les données WMTips montrent que **PrestaShop pèse plus que Shopify** en France et en Espagne. J'ai testé l'ordre inverse (PrestaShop M18, Shopify M30) : le point mort gagne un mois seulement. Je garde Shopify en premier pour trois raisons : la dynamique des nouvelles boutiques, le canal de distribution de l'App Store et les agences Shopify. En revanche, **j'avance PrestaShop de M30 à M25** : la même personne l'enchaîne après Shopify. Le modèle transforme ces parts de CMS en productivité : un·e commercial·e ne signe que les domaines dont le CMS est couvert (part du vivier couverte : France 47 % avec WooCommerce seul, 65 % avec Shopify, 100 % avec PrestaShop).

## 12.5 Deuxième offre : Passavin Partner (marque blanche pour logisticiens)

**Principe** : le logisticien paie une licence et offre le connecteur, à ses couleurs, à ses domaines clients. Passavin fournit le moteur d'éligibilité, les extensions CMS, l'hébergement, les mises à jour et le support de niveau 2.

| Niveau | Licence | Mise en place | Par expédition | Inclus | Pour qui |
|---|---|---|---|---|---|
| Starter | 690 €/mois | 4 000 € | 0,60 € | WooCommerce, ≤ 50 domaines, support e-mail | Logisticien régional |
| **Business** | **1 490 €/mois** | **8 000 €** | **0,50 €** | WooCommerce + Shopify, ≤ 250 domaines, marque du logisticien, support 4 h | Logisticien national |
| Premium | 2 490 €/mois | 12 000 € | 0,40 € | 3 CMS, domaines illimités, SLA 99,9 %, API, interlocuteur dédié | Logisticien européen |

Engagement de 24 mois ; dégressivité de 0,10 € au-delà de 5 000 expéditions/mois.

**Pourquoi ces prix [HYP argumentée]**
1. **Coût d'un plugin développé en interne** par le logisticien : ≈ 35 k€ pour un CMS (60-80 jours à 500 €), + ≈ 25 k€ par CMS supplémentaire, + ≈ 25 %/an de maintenance → **≈ 69 k€ la première année pour 2 CMS, puis ≈ 15 k€/an**. La licence Business coûte **25,9 k€ la première année** (8 000 € + 12 × 1 490 €), puis 17,9 k€/an, **sans risque de développement** ni retard de mise à jour. L'exemple de Hillebrand Gori montre le risque d'un plugin maison : moins de 10 installations actives [FAIT, wordpress.org, oct. 2026].
2. **Repères de marché** [FAIT, DÉC, tarifs publics 2026] : Sendcloud Pro 639 €/mois + 0,07 €/étiquette ; Cargoson 199 à plus de 1 000 $/mois ; ShipStation jusqu'à 3 600 $/mois. Passavin Partner se situe au-dessus d'un outil d'étiquetage, car il inclut l'éligibilité alcool au checkout, plusieurs CMS et la marque du logisticien.
3. **0,50 € par expédition au lieu de 1,50 € en mode neutre** : en marque blanche, c'est le logisticien qui apporte ses clients ; en mode neutre, c'est Passavin qui lui apporte des expéditions (rôle d'apporteur d'affaires).

**Dans le BP central** : 4 licences (M15, M22, M28, M33 ; 3 Business et 1 Premium), 137 domaines activés à M36, **89,6 k€ de CA en an 3** (licences 64,1 k€, mise en place 16,0 k€, expéditions 9,5 k€). Sans cette offre, le point mort recule de **M38 à M42**.

**Risque de cohérence avec l'USP « neutre » [AVIS]** : une version mono-logisticien à la marque d'un logisticien peut brouiller le message de neutralité. Parades : deux marques distinctes (« Passavin » pour les domaines, technologie « Powered by Passavin » pour les logisticiens) ; aucune donnée partagée entre logisticiens ; **portabilité** (un domaine en marque blanche peut passer en Direct et ajouter d'autres logisticiens) ; mêmes règles et même tarif de licence pour tous les logisticiens, Planet Aura compris.

## 12.6 Concurrence : ce que la recherche Europe ajoute

| Acteur | Ce qu'il fait | Menace / opportunité | Source |
|---|---|---|---|
| **MBE Wine for Europe** (Mail Boxes Etc.) | Expédition de vin aux particuliers dans l'UE avec gestion des accises, **module pour boutique en ligne** (lancé en juin 2026) | **Nouveau concurrent direct** côté logisticien, mono-réseau → aussi un **logisticien revendeur potentiel** | Vinetur, juin 2026 (PR) ; mbe.it (DÉC) |
| **Tannico WinePlatform** (Italie) | E-shop en marque blanche + logistique, accises, export (accord ICE pour 400 caves en 2020) | Remplace la boutique du domaine (logique intégrée) ; pas un connecteur | ICE / Tannico (DÉC) |
| Hillebrand Gori eShipping (DHL) | Petits envois de vin DTC, droits au checkout, plugin WooCommerce (< 10 installations), présent en France, en Espagne et en Italie | Concurrent mono-logisticien ; pas d'app Shopify trouvée | hillebrandgori.com, wordpress.org (DÉC) |
| VinTrail | Plateforme de vente B2B et B2C ; logistique en France et en Italie | Remplace la boutique ; pas d'API publique trouvée | vintrail.com (DÉC) |
| London City Bond (Royaume-Uni), Fiege / Howasped (Allemagne) | Logistique DTC sous douane, logistique vin | Logisticiens revendeurs potentiels | Drinks Business 2026 ; Lebensmittelpraxis (PR) |
| Sendcloud, ShipStation, Cargoson | Multi-transporteurs génériques | Pas d'éligibilité alcool ; repères de prix | sites éditeurs (DÉC) |

Les acteurs non retrouvés lors de la recherche (Wine Logistix, Excellence Logistique, Wineflow…) ne sont **pas cités** dans le dossier.

## 12.7 Objectif « point mort dans les 36 mois » : résultat du test

| Scénario | Domaines Direct M36 | Domaines marque blanche | CA an 3 | EBITDA du mois 36 | Point mort mensuel |
|---|---|---|---|---|---|
| Pessimiste | 264 | 57 | 279 k€ | −26 k€ | non atteint |
| **Central** | **478** | **137** | **649 k€** | **−3 k€** | **M38** |
| Optimiste | 595 | 192 | 859 k€ | +16 k€ | M32 |
| Central sans marque blanche | 478 | 0 | 559 k€ | −11 k€ | M42 |
| Central sans frais logisticien | 478 | 137 | 587 k€ | −10 k€ | M42 |

**Verdict honnête** : avec des hypothèses que je juge réalistes, **le point mort n'est pas atteint à M36 en central : il l'est à M38**. L'écart est faible (−3 k€ au mois 36), mais je ne modifie pas les hypothèses pour le faire disparaître. Voici ce qu'il faudrait (chaque levier testé seul, sauf la combinaison) :

| Levier | Central | Requis pour un point mort à M36 |
|---|---|---|
| ARPA (part de l'offre Pro) | 94 € | 103 € |
| Productivité des 3 sales | ×1,00 | ×1,15 |
| Licences marque blanche à M36 | 4 | 6 |
| Résiliation mensuelle | 1,5 % | insuffisant seul (même à 1,0 %) |
| Report de 2 recrutements (M25 → M31) | — | insuffisant seul |
| **Combinaison réaliste** : Pro par défaut (ARPA 99 €) + 5ᵉ licence à M30 | 94 € / 4 licences | **M36** |

La combinaison est le **plan d'action prioritaire de l'an 3**, suivi dans le tableau de bord (ARPA, licences signées). **Le scénario pessimiste** est présenté avec la même seed pour mesurer l'écart. En réalité, avec 14 domaines à M12, les jalons « GO seed » (≥ 25 domaines) ne seraient pas atteints : la levée n'aurait pas lieu et le projet pivoterait vers la seule marque blanche, ou s'arrêterait.

## 12.8 Mes désaccords avec la commande V2 [AVIS]

1. **« Sales Italie et Espagne »** : d'accord pour l'Italie (SAM ≈ 950). En Espagne, le SAM est d'environ 410 domaines : un poste à temps plein ne se justifie qu'en ajoutant le Portugal et en le déclenchant tard (M20, à 90 domaines).
2. **« Allemagne et Portugal »** : pas de commercial dédié. L'Allemagne est un marché de destination et le Portugal un petit vivier : agences et logisticiens revendeurs suffisent.
3. **« PrestaShop en an 3 »** : oui, mais dès M25, pas en fin d'an 3. Les données montrent qu'il pèse plus que Shopify en France et en Espagne.
4. **« Point mort dans les 36 mois »** : non atteint en central (M38). Le dire est plus crédible que d'ajuster les hypothèses.
5. **Seed de 750 k€ à M12** : c'est 2,3 fois la V1. C'est défendable seulement si les jalons de traction sont atteints avant (≥ 25 domaines payants, 2 logisticiens intégrés, 1 lettre d'intention de licence). Sinon, on reste sur le plan V1 (France, WooCommerce, croissance autofinancée).
