# Étape 4 — Étude de marché et concurrence

> Recherche documentaire réalisée en octobre 2026. Fiabilité : **OFF** = source officielle · **ÉP** = étude privée · **DÉC** = déclaratif d'entreprise · **PR** = presse · **NV** = non vérifié.

## 4.1 Secteur viticole français

| Indicateur | Valeur | Source (année) | Fiab. |
|---|---|---|---|
| Exploitations viticoles (métropole) | **59 032** (−23 % vs 2010) | INSEE / Agreste, recensement agricole 2020 — insee.fr/fr/statistiques/7728861 | OFF |
| Exploitations produisant du vin chaque année | ≈ **43 000** | FranceAgriMer, fiche filière vin 2026 | OFF |
| Caves coopératives / négociants | 560 coopératives (> 46 % des volumes) / 700 négociants | FranceAgriMer 2026 (données 2024) | OFF |
| Valeur de la production viticole | 10,9 Md€ | FranceAgriMer d'après INSEE (2024) | OFF |
| Poids de la filière (direct + indirect) | ≈ 92 Md€, 440 000 ETP | Vin & Société / Deloitte (2024) | ÉP |
| Exportations vins & spiritueux | 15,6 Md€ (2024) → **14,3 Md€ (2025, −8 %)** ; vins 10,5 Md€ (−4 %) | FEVS via LSA / Pleinchamp (2026) | PR (chiffres FEVS) |
| Premiers marchés du vin (valeur 2024) | États-Unis 20 %, Royaume-Uni 13 %, Allemagne 7 %, Belgique 6 %, Japon 5 % | FranceAgriMer 2026 | OFF |
| Exploitations vendant en direct | **27 %** des exploitations qui commercialisent du vin ; 30 % des viticulteurs spécialisés en circuit court (62 % en bio) | Agreste Primeur n°5, 2023 (RA 2020) | OFF |
| Contexte | Droits de douane américains de 15 % sur les vins UE depuis août 2025 | Pleinchamp (2025) — statut oct. 2026 NV | PR |

**Lecture** : une filière puissante mais **sous pression à l'export** (−8 % en 2025, États-Unis −21 %). Les domaines cherchent à **diversifier vers la vente directe et les marchés européens/asiatiques** — argument « pourquoi maintenant », à manier avec prudence (la contrainte budgétaire des domaines augmente aussi).

## 4.2 E-commerce du vin et digitalisation des producteurs

| Indicateur | Valeur | Source (année) | Fiab. |
|---|---|---|---|
| Vin en ligne en France | ≈ 750 M€ en 2021 (< 10 % du vin B2C) ; « normalisation » depuis | Xerfi (2021 ; blog juil. 2026) | ÉP |
| Consommateurs ayant acheté du vin en ligne | 34 % (2024) | Sowine via Xerfi | ÉP |
| **Viticulteurs ayant un site web** | **79 %** | Afnic, déc. 2025 (panel 1 002 TPE/PME agricoles, sous-échantillon vigne non précisé) | ÉP déclaratif |
| **Viticulteurs vendant en ligne via leur site** | **21 %** (6 % pour l'ensemble des agriculteurs) | Afnic, déc. 2025 | ÉP déclaratif |
| Exploitations (toutes filières) vendant via leur propre site | 8 691 | Agreste RA 2020 | OFF |
| CMS utilisés par les domaines | **Aucune statistique trouvée** → à mesurer (scan Wappalyzer de 300 sites de domaines, phase 1) | — | NV |

## 4.3 Contraintes logistiques et réglementaires (pourquoi le vin n'est pas un colis ordinaire)

- **Vente à distance intra-UE** : accises et TVA dues dans le pays de destination, par l'expéditeur, avec représentant fiscal si l'État l'exige (directive (UE) 2020/262, art. 44, applicable depuis le 13/02/2023 ; CGI art. 302 U). → 27 régimes d'accises. *(Commission européenne, OFF)*
- **EMCS / GAMMA 2** : DAE/DSA électroniques ; la FAQ douane précise que le B2C n'est pas géré dans GAMMA 2 → c'est le logisticien/représentant fiscal qui porte la complexité. *(douane.gouv.fr, OFF ; document exact pour le B2C intra-UE : NV)*
- **Transporteurs** : UPS exige un contrat alcool et une signature adulte ; **FedEx refuse l'alcool international aux particuliers** ; La Poste liste des pays interdits. *(sites transporteurs, OFF/DÉC)*
- **États-Unis** : système three-tier ; **un vendeur français ne peut pas expédier directement à un particulier américain** (importateur obligatoire). *(La Poste Pro, DÉC)* → le produit **ne doit pas promettre les États-Unis**.
- **Chine** : droits 14 % + taxe de consommation 10 % + TVA 13 % ; plafonds e-commerce transfrontalier. *(China Briefing 2026, ÉP)*
- **Royaume-Uni** : accise britannique exigible sur l'import commercial (régime APPA depuis 02/2025). *(gov.uk, OFF)* ; **Suisse** : règles des envois commerciaux à particuliers NV.

**Conséquence produit** : l'éligibilité d'une destination dépend **du logisticien** (licences, représentation fiscale, partenaires locaux). Passavin ne calcule pas la conformité : il **applique les règles déclarées par chaque logisticien** et les affiche au checkout.

## 4.4 Taille de marché (TAM / SAM / SOM)

| Niveau | Définition | Calcul | Comptes | Valeur annuelle* |
|---|---|---|---|---|
| **TAM France** | Domaines vendant en ligne via leur propre site | 43 000 producteurs × 21 % (Afnic) ≈ 9 000 ; fourchette basse 5 000 | **5 000 – 9 000** | 7 – 13 M€ |
| **SAM an 1-2** | … sur WooCommerce [HYP 35 %] **et** expédiant à des particuliers hors France [HYP 30 %] | 9 000 × 35 % × 30 % | **≈ 500 – 950** | 0,7 – 1,4 M€ |
| **SAM an 3** | + Shopify et PrestaShop [HYP : ×2,5] | | **≈ 1 300 – 2 400** | 1,9 – 3,4 M€ |
| **SOM fin an 3 (central)** | Clients actifs du BP | | **170** | 0,23 M€ |

\* ARPA annuel ≈ 1 428 € (abonnement 89 €/mois + 30 €/mois de frais logisticien).

**Signal d'alerte (à dire au jury)** : le seuil de rentabilité (~210 clients) représente **20-40 % du SAM WooCommerce**. Le projet n'est viable **que** si (1) le multi-CMS arrive en année 2-3, (2) les agences et logisticiens deviennent des canaux, (3) l'extension aux producteurs italiens et espagnols est préparée (TAM européen beaucoup plus large, non chiffré ici). Les deux hypothèses de pourcentage (35 % WooCommerce, 30 % export particuliers) sont les **premières à mesurer** en phase 1.

## 4.5 Concurrence

### Concurrent direct n°1 : la solution existe déjà, en partie

**Hillebrand Gori eShipping** (ex-VignoblExport, groupe DHL) : expédition B2C/B2B dès 1 bouteille, devis en temps réel, représentation fiscale UE, **plugins WooCommerce et PrestaShop + API**. Le plugin WooCommerce est public sur wordpress.org : **< 10 installations actives**, réservé aux clients Hillebrand Gori, non testé sur les dernières versions de WordPress *(wordpress.org, DÉC, oct. 2026)*.

→ **L'idée « plugin WooCommerce ↔ logisticien vin » n'est pas nouvelle.** Ce qui manque : un connecteur **neutre et multi-logisticiens**, avec moteur d'éligibilité et support Shopify. La faible adoption du plugin Hillebrand est à la fois un **avertissement** (la demande est peut-être faible, ou le produit mal distribué) et une **opportunité** (personne n'a « gagné » ce créneau). **À investiguer en entretiens : pourquoi si peu d'installations ?**

### Cartographie

| Acteur | Type | Offre | Prix public | WooCommerce / Shopify | Limite vis-à-vis de notre cible |
|---|---|---|---|---|---|
| Hillebrand Gori eShipping | Direct (logisticien + plugin) | Expédition vin B2C dès 1 bouteille | Paiement à l'envoi | Woo ✔ / Shopify ✘ | Mono-logisticien, adoption faible |
| Planet Aura | Logisticien partenaire potentiel | Stockage, export, suivi Planet'Connect, API | Non public | API, pas de plugin trouvé | — (partenaire, pas concurrent… sauf s'il fait son plugin) |
| VinTrail | Direct (logiciel + logistique) | E-boutique, marketplace, POS, porte-à-porte droits inclus, 44 pays | Commission | « Intégration e-commerce » NV | Modèle intégré propriétaire, commission |
| Baqio | Indirect (gestion commerciale vin) | ERP + e-commerce, interconnexions logistiques | Sur devis | Module propre | Remplace la boutique, ne s'y branche pas |
| Wineriz | Indirect | E-shop + transport | Dès 129 €/mois/fonction (Capterra, ÉP) | Plateforme propre | Idem |
| Sendcloud | Substitut générique | Multi-transporteurs, étiquettes | 0 à 599 €/mois | ✔ / ✔ | Pas de gestion accises / éligibilité alcool |
| Boxtal | Substitut générique (FR) | Comparateur transporteurs | Par envoi | ✔ / ✔ | Idem |
| Packlink PRO | Substitut générique | Multi-transporteurs | Dès 6,66 € HT (6 bouteilles, France) | ✔ | **Vin interdit hors UE** |
| Shippingbo | Substitut (OMS/WMS) | Gestion de commandes | Dès 19 € HT/mois | ✔ | Généraliste |
| Commerce7 / WineDirect / Vinoshipper / Sovos ShipCompliant | Référence US | DTC + conformité État par État | 59-1 249 $/mois ; % des ventes | Shopify (Sovos) | Marché domestique US, pas l'export depuis l'UE |
| Vivino, Wine-Searcher, Les Grappes, Plugwine, iDealwine | Substitut (marketplaces) | Vente + parfois logistique | Commission (ex. 20 % Plugwine) | — | Le domaine perd la relation client |
| Agences web vin (Fancy Cellar, Big Youth, Optimize360, Axome…) | Substitut / **canal** | Boutiques, intégrations sur mesure | Boutique 6-25 k€ (repère faible) | ✔ | Sur-mesure non maintenu |
| Plugins de restriction par pays (Country Based Restrictions, ShipRestrict) | Substitut partiel | Masquer des pays | 30-80 €/an | ✔ | Aucune logique alcool, pas de transmission |

### Matrice de positionnement

```
                    Spécialisé vin / alcool
                             ▲
     Hillebrand eShipping    │     ★ Passavin (cible)
     (mono-logisticien)      │     neutre, multi-logisticiens,
     VinTrail, Wineriz,      │     se branche sur la boutique existante
     Baqio (remplacent       │
     la boutique)            │
  Fermé / propriétaire ◄─────┼─────► Ouvert / se branche sur l'existant
                             │
     Marketplaces            │     Sendcloud, Boxtal, Packlink,
     (Vivino, Plugwine)      │     Shippingbo (génériques, alcool
                             │     international mal ou pas couvert)
                             ▼
                        Généraliste
```

## 4.6 Positionnement et USP révisés après vérification

- ❌ « Le seul plugin WooCommerce pour expédier du vin » → **faux** (Hillebrand Gori).
- ✔ **USP retenue** : *« Le connecteur neutre qui branche votre boutique à plusieurs logisticiens vin : vos clients étrangers ne voient que des destinations réellement livrables, au bon prix, et la commande part toute seule. »*
- Avantages défendables à construire : (1) **réseau de logisticiens** intégrés (effet de réseau faible mais réel), (2) **base de règles d'éligibilité** maintenue, (3) **canal agences**, (4) neutralité contractuelle.
- Barrière faible au départ : la vitesse d'exécution et la relation terrain du fondateur sont les seuls avantages au jour 0. À dire franchement.

## 4.7 Sources principales

INSEE/Agreste RA 2020 · Agreste Primeur n°5 (2023) · Agreste GraphAgri 2024 · FranceAgriMer fiche filière vin 2026 · Vin & Société/Deloitte 2024 · FEVS via LSA et Pleinchamp (2025-2026) · Xerfi (2021, 2026) · Afnic (déc. 2025) · Commission européenne (vente à distance accises) · douane.gouv.fr (GAMMA 2, 2024-2026) · UPS International Alcohol Shipping Guide · FedEx alcohol · La Poste Pro · gov.uk (import alcohol) · China Briefing 2026 · wordpress.org (plugin Hillebrand Gori eShipping) · hillebrandgori.com · sendcloud.com/fr/tarifs · packlink.com · apps.shopify.com/boxtal · commerce7.com/pricing · vinoshipper.com/pricing · vintrail.com.

**Non vérifié, à creuser** : nombre de caves particulières ; part de la vente directe dans le CA ; marché du vin en ligne 2024-2025 ; répartition des CMS ; politiques alcool de Sendcloud/Boxtal/Easyship ; règles B2C Suisse et Royaume-Uni ; tarifs d'expédition internationale 6 bouteilles.
