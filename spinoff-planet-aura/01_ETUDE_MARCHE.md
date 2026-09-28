# Spin-off Planet Aura : étude de projet et étude de marché

*Version 1, 28/09/2026. Projet de travail : une plateforme « tout-inclus » pour les domaines viticoles, avec boutique en ligne et marketplace, et export B2C assuré par Planet Aura.*

Étiquetage des chiffres : **[FAIT]** (source et année), **[HYP]** (hypothèse de travail), **[ILL]** (illustration).

---

## 0. Verdict en une page

**GO conditionnel, en deux phases.** Le besoin existe, mais le marché est en crise et le concept « e-shop + marketplace + logistique » est déjà partiellement occupé. Le projet ne tient que s'il se différencie sur ce que Planet Aura sait déjà faire et que les autres font mal.

1. **Afficher au panier le prix rendu client final**, droits, accises et TVA compris, en temps réel via l'API Planet Aura, dès 1 bouteille et au-delà de l'UE.
2. **Couvrir les États-Unis**, destination la plus difficile, où Planet Aura a déjà une filière avec un importateur et un livreur local.
3. **Transformer les visiteurs du domaine en clients export** : un module au caveau pour que le visiteur étranger commande et se fasse livrer chez lui.

| | Constat |
|---|---|
| ✅ Besoin | 94 % des Vignerons Indépendants vendent en direct, mais seuls 46 % ont une boutique en ligne en propre. 41,5 % des non-exportateurs veulent exporter. 5,4 M d'œnotouristes étrangers par an. [FAIT VIF 2024, Atout France 2025] |
| ✅ Actif de départ | Planet Aura revendique plus de 500 adhérents, plus de 130 destinations, plus de 200 000 bouteilles expédiées en 2024, 4,8/5 sur Google, et une API existante (tarif en temps réel, création d'envoi, suivi). |
| ⚠️ Marché | Exports de vins et spiritueux à −7,9 % en 2025, États-Unis à −21 %, vente en ligne d'alcool stagnante (IWSR). Plus de 45 % des Vignerons Indépendants sont en difficulté, donc peu prêts à payer un abonnement. |
| ⚠️ Concurrence | VinTrail, Les Grappes Services, e-BOISSONS et Hillebrand Gori eShipping (DHL) proposent déjà une partie du « tout-inclus ». |
| ❌ Piège | Une marketplace B2C grand public coûte très cher en acquisition de clients : Drinks&Co a fermé en 2023. **Ne pas commencer par la marketplace.** |

**Recommandation.** Phase 1 (0 à 12 mois) : SaaS « boutique export » avec module caveau, vendu d'abord aux adhérents Planet Aura. Phase 2 (12 à 30 mois) : marketplace internationale alimentée par les domaines de la phase 1 et leurs clients étrangers.

---

## 1. Le projet

### 1.1 Proposition de valeur
Pour un domaine : **« Vendez à vos clients du monde entier comme à un client français. Le prix affiché est le prix payé, et nous nous occupons du reste. »**

| Brique | Rôle | Qui opère |
|---|---|---|
| Boutique en ligne en marque blanche | Site de vente du domaine (ou connecteur vers Shopify, WooCommerce, PrestaShop) | Spin-off |
| Panier « rendu client final » | Prix transport, droits, accises et TVA du pays calculés en direct | Spin-off, avec l'API Planet Aura |
| Module caveau | Tablette ou QR code : le visiteur étranger achète au domaine et reçoit sa commande chez lui | Spin-off |
| Paiement, conformité, vérification d'âge | Paiement conforme alcool, représentation fiscale UE, déclarations | Spin-off et partenaires |
| Logistique export | Enlèvement, emballage certifié, douane, transport, assurance, suivi | **Planet Aura** |
| Marketplace (phase 2) | Vitrine multilingue des domaines, pour l'acquisition de clients internationaux | Spin-off |

### 1.2 Planet Aura, l'actif de départ

Données publiques [FAIT, Pappers et planet-aura.com] :
- SARL, SIREN 850 624 636, créée en 2019 à Castres, 6 à 9 salariés (2023) ; comptes confidentiels.
- **Modèle déjà B2B2C** : les conditions générales réservent le service aux professionnels. Le domaine est le client, le particulier est le destinataire (90 % des envois vers les États-Unis).
- Outils :
  - **Planet'Connect** : création d'envois, paiement possible par le client final, simulateur de coûts ;
  - **API** : tarif en temps réel, création d'envoi, suivi, liste des destinations. La documentation est privée.
- **Manques publics** :
  - aucun connecteur e-shop (Shopify, WooCommerce, PrestaShop) ;
  - aucun tarif public ;
  - aucun délai garanti ; un avis client cite environ 5 semaines vers les États-Unis.

➡️ Les briques techniques du panier « rendu client final » existent déjà. Il manque la couche commerce (boutique, panier, caveau, marketplace) : c'est précisément le périmètre de la spin-off.

---

## 2. Le marché

### 2.1 La cible : les domaines viticoles français

| Indicateur | Valeur | Source |
|---|---|---|
| Exploitations viticoles spécialisées | 58 100 | [FAIT Agreste/FranceAgriMer 2022] |
| Caves coopératives | 570 (>37 % des volumes) | [FAIT FranceAgriMer 2025] |
| Adhérents Vignerons Indépendants | ~7 000 | [FAIT Réussir Vigne 2024-25] |
| VI pratiquant la vente directe | 94 % | [FAIT Observatoire VIF 2024] |
| VI avec site / avec e-shop en propre | 82 % / 46 % | [FAIT Observatoire VIF 2024] |
| VI exportateurs / part du CA export | 64 % / 22 % | [FAIT Observatoire VIF 2023] |
| Non-exportateurs qui veulent exporter | 41,5 % | [FAIT Observatoire VIF 2024] |
| Principales destinations des VI | Belgique 77 %, Allemagne 62 %, États-Unis 54 %, Pays-Bas 47 %, Royaume-Uni 42 % | [FAIT Observatoire VIF 2024] |
| VI en difficulté financière | >45 % (18 % quatre ans plus tôt) | [FAIT Réussir Vigne 2024] |

### 2.2 La demande : clients finaux à l'étranger

| Indicateur | Valeur | Source |
|---|---|---|
| Œnotouristes par an / dont étrangers | 12 M / 5,4 M (45 %) | [FAIT Atout France 2025, données 2023] |
| Premières clientèles étrangères | Britanniques, Belges, Américains | [FAIT Atout France 2025] |
| Caves ouvertes à la visite | 10 000 | [FAIT Atout France 2025] |
| Dépense moyenne au domaine | 24,40 €/visiteur | [FAIT Agrex Consulting] |
| Vin en ligne en France | 675 M€ (6,7 % des ventes, −8 %) | [FAIT Xerfi/FranceAgriMer 2023] |
| Alcool en ligne dans le monde | 3,5 % de la valeur, −1 % en 2024, vin stable | [FAIT IWSR 2025] |
| Vente directe des domaines aux États-Unis | −15 % en volume en 2025, prix moyen +11 % | [FAIT Sovos ShipCompliant 2026] |

Aucune statistique publique ne mesure la part d'œnotouristes qui se font expédier leur vin. **C'est la principale donnée à produire nous-mêmes** (voir § 7).

### 2.3 Contexte export (FEVS, bilan 2025)
- Vins et spiritueux : 14,3 Md€ (−7,9 %) ; vins seuls : 10,5 Md€ (−4,1 %) ; −17 % en valeur depuis 2022.
- États-Unis : 3,0 Md€ (−21 %), avec **15 % de droits sur les vins de l'UE** depuis août 2025.
- En hausse : Canada +3 %, Suisse +5 %, Hong Kong +8 %, Australie +20 %, Suède +7 %.
- Janvier à juillet 2026 (indicatif, AWM via Vitisphere) : vins −2 % ; Hong Kong +18 %, Royaume-Uni +4 % ; États-Unis −10 %, Allemagne −11 %.
- En France : consommation de 40 L par habitant (−60 % depuis 1960) ; 25 500 ha arrachés en 2025, environ 28 000 ha demandés en 2026.

**Lecture.** La crise pousse les domaines à chercher de la marge en vente directe et de nouveaux débouchés hors grande distribution. C'est un argument commercial fort. Mais les budgets sont serrés : le modèle doit être **à l'usage (commission) plutôt qu'à l'abonnement lourd**.

### 2.4 Dimensionnement [HYP / ILL]

| Niveau | Définition | Ordre de grandeur |
|---|---|---|
| Marché total | Exploitations qui vinifient et vendent en bouteille | ~20 000 à 25 000 domaines [HYP] (pas de chiffre officiel récent ; le Sénat en comptait ~38 000 en 2002) |
| Marché adressable | Domaines en vente directe, avec une clientèle étrangère ou une volonté d'exporter | ~8 000 à 12 000 [HYP] (Vignerons Indépendants + domaines œnotouristiques) |
| Marché atteignable à 3 ans | Adhérents Planet Aura + conquête | **300 à 600 domaines** [HYP] |

Illustration du potentiel à 3 ans [ILL], avec 400 domaines actifs :
- abonnement moyen de 39 €/mois : ~190 k€/an ;
- ventes de 25 k€/an par domaine via la plateforme, soit 10 M€ au total, avec une commission de 5 % : ~500 k€/an ;
- marge logistique générée chez Planet Aura : **non comptée ici**.

→ **Environ 0,7 M€ de revenus pour la spin-off.** Le projet reste modeste en solo ; **son vrai intérêt est groupe** : fidéliser les domaines et augmenter les volumes Planet Aura.

---

## 3. La concurrence

| Acteur | Offre | Prix | Export B2C | Menace |
|---|---|---|---|---|
| **VinTrail** (FR/IT) | E-shop, marketplace, club, B2B ; 44 pays « taxes, douane et assurance incluses » | Inscription gratuite, commission sur le prix HT | Oui, surtout UE | 🔴 **Concurrent le plus direct** |
| **Les Grappes Services** (ex-Plugwine) | E-shop, CRM, œnotourisme, entrepôt à Mâcon, marketplace Les Grappes | Dès 49 €/mois ; marketplace 20 % | UE ; reste du monde sur devis | 🔴 |
| **e-BOISSONS** | E-shop, plus de 15 marketplaces, expédition dans le monde, plus de 300 domaines | Non public | Oui, accises non détaillées | 🟠 |
| **Hillebrand Gori eShipping** (DHL) | Petits colis DDP dans le monde, représentation fiscale UE | 0,40 €/btl d'administratif UE + transport | Oui, avec plugins e-shop | 🟠 Pourrait ajouter une vitrine |
| **MBE / Direct From Italy**, **ShipWineEU** | Accises UE « dès la 1re bouteille », API | ShipWineEU : 360 €/an + 1 €/btl | UE surtout | 🟠 Partenaires possibles |
| **Twil, Vivino, iDealwine, Vinatis** | Marketplaces | Commission de 15 à 20 % (estimations) | Limité, souvent accises hors prix | 🟡 |
| **Wineriz, Le Site du Vigneron, Isavigne, Baqio** | Sites, e-shops, gestion commerciale | Petits abonnements | Non | 🟢 **Partenaires ou connecteurs** |
| **Vinoshipper, Commerce7** (US) | Modèle proche du nôtre | Vinoshipper 1,85 % + 0,75 $/btl | États-Unis seulement | Modèle de référence |

Les modèles cités sont confirmés. En revanche, les commissions des marketplaces viennent d'estimations tierces (XO Crus 2026).

### Espaces libres
1. **Prix rendu client final au panier, hors UE, dès 1 bouteille** : Royaume-Uni, Suisse, Hong Kong, Japon, Singapour, Australie, États-Unis. Les acteurs français s'arrêtent à l'UE ou passent par un devis.
2. **Les États-Unis**, avec la filière importateur existante de Planet Aura. Aucun concurrent français ne le propose en libre-service au panier.
3. **Le module caveau** : Hillebrand Gori note le besoin, personne ne l'outille vraiment.
4. **Pas de stock déporté** : enlèvement au domaine, contrairement au modèle entrepôt des Grappes.
5. **Connecteurs vers l'existant** (Shopify, WooCommerce, Baqio, Isavigne) plutôt que d'imposer un nouveau site.

---

## 4. Contraintes réglementaires et conséquences

### 4.1 Matrice des destinations

| Pays | Faisabilité B2C | Contrainte principale | Solution |
|---|---|---|---|
| Allemagne | 🟢 Facile | TVA locale ; accise sur les mousseux | Représentation fiscale, TVA (OSS à confirmer) |
| Belgique, Pays-Bas | 🟢 Facile | Accise (~0,5–0,7 €/btl), représentant fiscal | Réseau de représentants fiscaux |
| Danemark, Irlande | 🟠 Moyenne | Accise (Irlande ~3,19 €/btl) | Représentant fiscal, prix rendu client final |
| Suède | 🟠 Moyenne | Monopole ; **transporteur indépendant du vendeur** exigé | Enregistrement Skatteverket, transporteur tiers |
| Finlande | 🟠 Moyenne, à partir de 2027 | Livreur finlandais licencié, âge vérifié | Partenaire local |
| Royaume-Uni | 🟠 Moyenne | ~2,99 £ de droit par btl + TVA 20 % | DDP via Planet Aura |
| Suisse | 🟠 Moyenne | Droits au kg, TVA 8,1 % | DDP |
| Hong Kong | 🟢 Facile | 0 droit sur le vin | Express DDP |
| Japon, Singapour, Australie | 🟠 Moyenne | Taxes locales | Express DDP (pas Colissimo) |
| Chine | 🔴 Difficile | Étiquetage, taxes | Plateformes transfrontalières (Tmall Global) |
| **États-Unis** | 🔴 Très difficile | Système des trois niveaux, lois des États, 15 % de droits | **Filière importateur de Planet Aura** : son cadre légal précis est à auditer |
| Canada | 🔴 Très difficile | Monopoles provinciaux | Hors périmètre au départ |

### 4.2 Conséquences pour le modèle
- **Le domaine reste vendeur** (boutique en marque blanche et marketplace en mandataire transparent). La spin-off ne devient pas négociant : pas de licence à emporter, pas d'immatriculation accises dans chaque pays, pas de stock. C'est plus léger et cohérent avec les conditions générales de Planet Aura (le domaine est le client).
- **La marketplace doit faire les déclarations DAC7.** La règle du fournisseur présumé en TVA ne s'applique pas à des vendeurs établis dans l'UE.
- **Paiement** : l'alcool est une activité restreinte chez Stripe (validation préalable, et chaque vendeur est examiné en Stripe Connect). À sécuriser dès le départ, avec une alternative (Mollie, Adyen, Lemonway).
- **Vérification d'âge** : déclaration au paiement, et contrôle à la livraison là où la loi l'impose.
- **Suède** : si Planet Aura et la spin-off sont liées, l'exigence d'un transporteur indépendant du vendeur doit être vérifiée juridiquement.
- **À faire valider par un fiscaliste ou avocat** :
  - la TVA des ventes à distance d'alcool via l'OSS ;
  - l'exemption de licence pour le vigneron qui vend sa propre récolte ;
  - la conformité de la filière États-Unis ;
  - la durée des 15 % de droits américains.

---

## 5. Modèle économique proposé [HYP]

| Flux | Proposition | Repère concurrentiel |
|---|---|---|
| Abonnement boutique export | **0 € (Starter) / 39 € / 89 € par mois** | Les Grappes dès 49 € ; Commerce7 59 $ |
| Commission sur les ventes de la boutique | **3 à 5 %** (paiement et conformité inclus) | Vinoshipper 1,85 % + 0,75 $/btl |
| Commission marketplace (phase 2) | **12 à 15 %** | Les Grappes 20 %, Twil 18 % |
| Module caveau | Inclus à partir de 39 €/mois | — |
| Logistique | Facturée par Planet Aura au tarif groupe, avec une rétrocession éventuelle à la spin-off | — |

Principe : **le domaine paie quand il vend.** C'est adapté à une filière en difficulté et cela aligne les intérêts avec les volumes de Planet Aura.

### Relation avec Planet Aura
- Société distincte : SAS, avec une participation de Planet Aura ou de GBF Développement à décider.
- **Contrat de services API** : tarifs, délais, engagement de niveau de service (SLA), responsabilité en cas de casse, et exclusivité de la spin-off sur la couche commerce, réciproque ou non.
- Point d'attention : **engagements de délais**. Il n'y a pas aujourd'hui de délai garanti, et environ 5 semaines vers les États-Unis selon un avis client. Un panier grand public a besoin de délais affichés et tenus.

---

## 6. Analyse SWOT

| Forces | Faiblesses |
|---|---|
| API Planet Aura déjà opérationnelle (tarif en temps réel, création d'envoi) | Pas de connecteur e-shop à ce jour |
| Filière États-Unis et plus de 130 destinations | Délais longs ou non garantis |
| Base de plus de 500 domaines adhérents à convertir | Petite structure (6 à 9 salariés) : capacité à absorber la croissance |
| Réputation 4,8/5, emballage certifié, assurance jusqu'à 20 000 € | Aucune notoriété grand public pour la marketplace |

| Opportunités | Menaces |
|---|---|
| 54 % des domaines non équipés d'une boutique en ligne | VinTrail et Les Grappes déjà positionnés |
| 5,4 M d'œnotouristes étrangers par an | Hillebrand Gori (DHL) ou MBE peuvent ajouter une vitrine |
| Crise : recherche de marge en vente directe | Droits américains et marché américain en recul |
| Fermeture de WineDirect Classic : clients en migration (surtout aux États-Unis) | Budgets des domaines en baisse ; alcool en ligne stagnant |
| Finlande qui s'ouvre (2027), Hong Kong et Royaume-Uni en croissance | Complexité réglementaire (accises, Stripe, États-Unis) |

---

## 7. Feuille de route et validation

**Étape 0, validation terrain (6 à 8 semaines, budget faible) :**
1. **Enquêter auprès de 50 adhérents Planet Aura** :
   - part des envois qui viennent de visiteurs du domaine ;
   - volonté de payer (abonnement ou commission) ;
   - outil e-shop actuel.
2. **Extraire les données Planet'Connect** : pays, taille des colis, valeur, saisonnalité, et part des paiements par le client final. C'est le meilleur indicateur de la demande.
3. **Audit juridique** : filière États-Unis, OSS, licences, Stripe.
4. **Test du module caveau** chez 5 domaines pendant la saison (QR code vers une page de paiement Planet'Connect) : mesurer le taux de conversion des visiteurs étrangers.

**Phase 1 (M3 à M12) :**
- plugin Shopify et WooCommerce, et boutique en marque blanche simple, avec panier au prix rendu client final ;
- module caveau ;
- objectif de 100 domaines actifs [HYP].

**Phase 2 (M12 à M30) :**
- marketplace multilingue (anglais, allemand, néerlandais, japonais), alimentée par les domaines de la phase 1 ;
- acquisition de clients via les œnotouristes déjà clients ;
- connecteurs Baqio et Isavigne.

**Indicateurs de décision (go / no-go de la phase 2)** :
- au moins 100 domaines actifs ;
- au moins 1,5 M€ de ventes par an via la plateforme [HYP] ;
- au moins 15 % des commandes hors UE ;
- taux de casse inférieur à 0,5 % ;
- délai moyen dans l'UE inférieur à 7 jours.

---

## 8. Sources principales
- Planet Aura : https://planet-aura.com (Qui sommes-nous, Services, FAQ, Intégration API, Conditions générales) ; https://www.pappers.fr/entreprise/planet-aura-850624636
- FranceAgriMer, Chiffres-clés 2024 et Fiche filière Vin 2025 ; étude e-commerce Xerfi/FranceAgriMer 2024
- Observatoire des Vignerons Indépendants 2024 : https://vicvl.fr/files/Fiche_d_identite_du_reseau_Vignerons_Independants_de_France.pdf
- Atout France, Fréquentation œnotouristique 2025
- FEVS, Bilan export 2025 (février 2026) ; Vitisphere 11/09/2026 (AWM)
- IWSR (décembre 2025) ; Sovos ShipCompliant, rapport DTC 2026
- Concurrents : vintrail.com, services.lesgrappes.com, e-boissons.com, eshipping.hillebrandgori.com, shipwine.eu, directfromitaly.it, vinoshipper, commerce7.com ; XO Crus, comparatif des marketplaces (janvier 2026)
- Réglementation :
  - Commission européenne, vente à distance de produits soumis à accise ;
  - douane.gouv.fr (vente à distance) ;
  - Skatteverket ; vero.fi ; gov.uk (alcohol duty 2026) ;
  - TTB et CBP (États-Unis) ;
  - La Poste (restrictions alcool) ; Stripe (activités restreintes).
