# Projet de création d'entreprise : une société indépendante au service de la filière viticole

*Document de travail, 25/10/2026. Il prolonge l'étude `Opportunites_Entrepreneuriales.md` et se concentre sur une entreprise **indépendante**, **liée au secteur viticole**, qui répond à une problématique de marché identifiée.*

Conventions : **[FAIT]** = source publique citée · **[PB]** = donnée du Sales Playbook (interne) · **[HYP]** = hypothèse à valider · **[À VÉRIFIER]** = point juridique ou administratif à confirmer par un professionnel.

---

## 1. La problématique de marché

**Le constat : la filière vend moins, et vend moins bien.**
- La consommation de vin en France a reculé de 3,2 % en 2025 et les exportations de 3 % [FAIT, OIV via Vinetur]. Les ventes au détail de rouges et rosés ont baissé de 8 % sur janvier-novembre 2025 par rapport à la moyenne des trois années précédentes [FAIT, Conseil de l'UE].
- Les exportations françaises de vins & spiritueux vers les États-Unis ont chuté de 21 % en 2025 [PB, d'après FEVS].
- L'État finance l'arrachage : environ 27 000 ha sont arrachés ou prévus en 2026, après une première mesure de 120 M€ en 2024-2025 [FAIT, ministère de l'Agriculture, Vinetur, Pleinchamp].

**Le levier qui reste : la vente directe, le canal le plus rémunérateur du vigneron.**
- Le prix moyen en vente directe est supérieur de près de 50 % à celui de la grande distribution [FAIT, source professionnelle des vignerons indépendants, à recouper].
- 12 millions d'œnotouristes ont visité les vignobles français en 2023, dont 5,4 millions d'étrangers [PB, d'après Atout France]. La France a accueilli 102 millions de touristes internationaux en 2025 [FAIT, Atout France].

**Le problème précis : la vente au caveau est un achat unique, qui ne se transforme pas en relation.**
- Le visiteur achète une fois, souvent peu (« 2 bouteilles au lieu de 12 » [PB]), puis disparaît. Le domaine n'a ni son contact ni ses préférences, et aucun moyen simple de lui revendre à distance, surtout s'il vit à l'étranger.
- Le Sales Playbook cite le « fichier clients export » et le « réachat à distance » comme simples **bénéfices secondaires**, sans outil pour les exploiter [PB, chap. 13 et 16].
- Aux États-Unis, le club de vin est un pilier de la vente directe : il pèserait 39 % des ventes DTC de vin [FAIT, chiffre attribué à SVB et Sovos ShipCompliant par une source secondaire, à vérifier]. En France, cette culture du club de domaine reste marginale. Les clubs existants sont surtout des clubs de vente par correspondance (Le Club Français du Vin) ou des coffrets d'abonnement [FAIT].
- Les outils disponibles ne couvrent pas le besoin :
  - les logiciels américains de club (Commerce7, WineDirect, VineSpring) sont anglophones et n'ont pas de lancement français confirmé [FAIT] ;
  - les caisses et ERP viticoles français (Vitisoft, Wino, Hiboutik) gèrent l'encaissement, la douane et des mailings basiques, pas l'abonnement récurrent ni le réachat international [FAIT, fiches éditeurs].

> **Problématique retenue :** *comment permettre à un domaine viticole de transformer chaque visiteur de son caveau, français ou étranger, en client récurrent, sans alourdir son travail ?*

---

## 2. Pourquoi cette entreprise plutôt qu'une autre

Six projets indépendants liés au vin ont été comparés. Chaque critère est noté sur 5 (5 = favorable : besoin en capital faible, concurrence faible).

| Projet | Problème traité | Capital nécessaire | Concurrence | Récurrence | Faisabilité pour un jeune entrepreneur | Total /20 |
|---|---|---|---|---|---|---|
| **Cuvéo : fidélisation, club et réachat des caveaux (SaaS)** | Le visiteur n'achète qu'une fois | 4 | 4 | 5 | 4 | **17** |
| Déstockage B2B (place de marché pour les surplus) | Stocks élevés | 4 | 2 (courtiers établis) | 3 | 3 | 12 |
| Plateforme de saisonniers pour vendanges et caveau | Manque de main-d'œuvre | 4 | 2 | 3 | 3 | 12 |
| Réemploi et consigne de bouteilles | Coût du verre, loi AGEC | 2 (station de lavage) | 3 | 4 | 2 | 11 |
| Transmission et reprise de domaines | Départs à la retraite | 4 | 2 (SAFER, agences) | 2 | 3 | 11 |
| Désalcoolisation à façon | Essor du sans-alcool | 1 (équipement lourd) | 3 | 4 | 1 | 9 |

**Cuvéo l'emporte** pour quatre raisons :
- il s'attaque au seul canal en croissance de valeur pour le producteur ;
- aucun acteur francophone n'occupe la place ;
- c'est un abonnement logiciel, donc des revenus récurrents ;
- il s'appuie directement sur la connaissance terrain des caveaux et de la clientèle étrangère décrite dans le playbook.

C'est une entreprise **indépendante** : elle ne transporte pas et ne vend pas de vin, et peut se brancher sur n'importe quel logisticien.

---

## 3. L'entreprise : Cuvéo

*Nom de travail. La disponibilité à l'INPI et celle du nom de domaine sont [À VÉRIFIER].*

### 3.1 Concept
> **Cuvéo est la plateforme de fidélisation des caveaux : chaque visiteur devient un client récurrent, où qu'il vive.**

Une solution SaaS en marque blanche, en quatre modules :

| Module | Ce qu'il fait | Bénéfice pour le domaine |
|---|---|---|
| **1. Capture au caveau** | QR code ou tablette au comptoir : le visiteur laisse son contact en 30 secondes, avec son consentement RGPD, sa langue, son pays et les vins dégustés | Un fichier clients qualifié, constitué sans effort |
| **2. Club & abonnements** | Formules de club (coffrets trimestriels, allocations, primeurs), prélèvement automatique par carte ou SEPA, gestion des membres, avantages (visites, événements) | Un revenu récurrent et prévisible, y compris hors saison |
| **3. Réachat à distance** | Relances automatiques multilingues (anniversaire de visite, nouveau millésime, Noël), mini-boutique personnalisée avec les vins déjà dégustés, frais de port affichés via l'API du logisticien choisi | Des ventes toute l'année, auprès de clients qui connaissent déjà le domaine |
| **4. Pilotage** | Tableau de bord : CA caveau / club / réachat, valeur par client, taux de rétention, nationalités | Savoir ce que rapporte réellement un visiteur |

**Principe d'indépendance.** Cuvéo ne fait ni transport ni vente de vin. Le domaine reste le vendeur. Les commandes sont transmises au logisticien de son choix : un commissionnaire spécialisé (via API), un transporteur, ou son propre envoi.

### 3.2 Proposition de valeur

| Pour qui | Promesse | Preuve à apporter |
|---|---|---|
| Propriétaire de domaine | « Votre caveau vend aussi quand il est fermé. » | Le CA hors caveau généré le premier hiver |
| Responsable caveau ou œnotourisme | « 30 secondes au comptoir, tout le reste est automatique. » | Démonstration au caveau sur tablette |
| Le visiteur (client final) | « Retrouvez les vins que vous avez aimés, livrés chez vous. » | Une mini-boutique dans sa langue |

**Pitch en 30 secondes :**
> « Chaque été, des centaines de visiteurs dégustent vos vins, achètent deux bouteilles et repartent. Vous ne les revoyez jamais. Cuvéo enregistre leur contact au comptoir en 30 secondes, leur propose votre club et leur rappelle vos vins au bon moment, dans leur langue, livrés chez eux. Vous créez un revenu récurrent hors saison, sans rien changer à votre organisation. »

---

## 4. Le marché

### 4.1 Taille du marché (à affiner)

| Niveau | Définition | Estimation | Statut |
|---|---|---|---|
| **TAM** | Exploitations vinifiant et vendant en bouteille en France | ~20 000 | [HYP] : chiffre national précis introuvable. 63 % des caves particulières pratiquent la vente directe [FAIT, source professionnelle] |
| **SAM** | Domaines avec un caveau accueillant du public et plus de 100 k€ de vente directe | ~6 000 | [HYP] |
| **SOM à 3 ans** | Domaines clients | 350 (≈ 6 % du SAM) | [HYP] |
| Extension à 5 ans | Italie, Espagne, Portugal | ×2 à ×3 | [HYP] |

**Action prioritaire :** fiabiliser le TAM à partir de la base Sirene (codes NAF 01.21Z et 11.02A), des données de FranceAgriMer, des adhérents des Vignerons Indépendants et des domaines labellisés Vignobles & Découvertes.

### 4.2 Cibles prioritaires (dans la logique de l'ICP du playbook)
1. **Domaines et châteaux avec caveau touristique** : Provence, Rhône Sud, Bordeaux, Bourgogne, Loire, Alsace. Plus de 20 visiteurs par semaine en saison, prix moyen de la bouteille supérieur à 12 €.
2. **Maisons de Champagne de vignerons**, avec une clientèle premium et internationale.
3. **Caves touristiques et cavistes à fort passage** (Paris, villes viticoles).

### 4.3 Concurrence

| Famille | Acteurs | Force | Limite = notre ouverture |
|---|---|---|---|
| Logiciels de club américains | Commerce7 (fondé en 2018, plus de 3 000 wineries revendiquées), WineDirect, VineSpring [FAIT] | Fonctionnalités club très abouties | Anglophones, pensés pour les règles américaines, pas de présence française confirmée |
| Caisses et ERP viticoles français | Vitisoft, Wino, Hiboutik [FAIT] | Encaissement conforme NF525, douane, présence installée | Ni club récurrent, ni réachat international. **Ce sont des partenaires d'intégration, pas des cibles à attaquer** |
| E-commerce générique | Shopify + applications d'abonnement | Flexible | Pas pensé pour le caveau, la capture au comptoir ni les contraintes de l'alcool |
| Clubs et coffrets B2C | Le Club Français du Vin, coffrets d'abonnement [FAIT] | Base de membres | Ils vendent **leur** sélection : ils captent le client à la place du domaine |
| Logistique pour touristes | myBottlesDelivered (Hillebrand) [FAIT], commissionnaires spécialisés | Transport, accises | Ils expédient un achat, ils ne construisent pas de relation récurrente. **Partenaires naturels** |

**Positionnement :** *le seul outil francophone pensé pour le caveau, qui transforme un visiteur en membre, sans dépendre d'un transporteur.*

---

## 5. Business model

### 5.1 Offres et prix [HYP, à tester en pilote]

| Offre | Prix | Contenu |
|---|---|---|
| **Essentiel** | 79 € HT par mois | Capture au caveau, fichier clients, relances automatiques, mini-boutique |
| **Pro** | 149 € HT par mois | + club et abonnements, multilingue (5 langues), tableau de bord |
| **Domaine+** | 249 € HT par mois | + multi-sites, API, intégration caisse ou ERP, accompagnement dédié |
| Commission | 1,5 % | Sur les ventes club et réachat passées par la plateforme |
| Mise en place | 300 € HT | Paramétrage, formation de l'équipe caveau (30 min), kit comptoir (chevalets QR) |

### 5.2 ROI pour un domaine type [HYP]
- 1 500 visiteurs par an au caveau, dont 30 % laissent leur contact : **450 contacts**.
- Club : 40 membres × 4 coffrets × 120 € = **19 200 €**.
- Réachat à distance : 5 % des contacts × 200 € = **4 500 €**.
- **Environ 23 700 € de CA additionnel par an**, au prix de la vente directe, pour un coût Cuvéo d'environ 2 150 € (offre Pro + commission).
- **ROI d'environ 11 fois le coût.** C'est cet argument qui doit être chiffré avec les vrais chiffres du prospect, comme le recommande la méthode du playbook.

### 5.3 Économie unitaire de Cuvéo [HYP]

| Indicateur | Valeur |
|---|---|
| Revenu moyen par domaine (ARPA) | ~1 800 € par an (abonnement moyen ~1 450 € + commission ~360 €) |
| Marge brute | ~85 % (hébergement, paiements, support) |
| Coût d'acquisition (CAC) | ~1 000 € (terrain, salons, démonstration) |
| Churn annuel | 12 % |
| Valeur vie client (LTV) | 1 800 × 0,85 / 0,12 ≈ **12 750 €** |
| LTV / CAC | ≈ **13** (cible supérieure à 3) |

---

## 6. Stratégie commerciale et marketing

### 6.1 Obtenir les 10 premiers clients
1. **Dix entretiens découverte** auprès de domaines touristiques (en basse saison, de novembre à mars, période identifiée comme idéale dans le playbook).
2. **Offre pionnier** : mise en place offerte et 3 mois gratuits pour les 10 premiers, en échange d'un témoignage chiffré et d'un accès aux données de performance.
3. **Argument calendrier** : « Lancez votre club avant la saison 2027 », sur le modèle du « soyez prêts pour juillet » du playbook.
4. **Démonstration au comptoir** sur tablette, avec les vrais vins du domaine. C'est l'équivalent du simulateur qui déclenche la vente.
5. **Co-prescription** : logisticiens spécialisés, éditeurs de caisses viticoles, offices de tourisme et destinations Vignobles & Découvertes.

### 6.2 Canaux
| Canal | Usage | Priorité |
|---|---|---|
| Terrain par appellation | Signature, démonstration au caveau | Très haute (années 1 et 2) |
| Salons professionnels (Wine Paris, salons des vignerons, Vinexpo) | Visibilité, rendez-vous | Haute |
| Partenariats d'intégration (caisses, ERP, logisticiens) | Distribution indirecte | Haute à partir de l'année 2 |
| Presse viticole (Réussir Vigne, Vitisphère) et LinkedIn | Crédibilité, études de cas | Moyenne |
| Webinaires « Créer son club de vin » | Génération de leads, éducation du marché | Moyenne |

### 6.3 Fidélisation
Rapport mensuel « ce que Cuvéo vous a rapporté », formation des saisonniers chaque printemps, communauté de domaines (bonnes pratiques de club), score de santé client (même logique que le health score du playbook).

---

## 7. Prévisionnel financier

### 7.1 Compte de résultat sur 3 ans [HYP]

| | Année 1 | Année 2 | Année 3 |
|---|---|---|---|
| Domaines clients en fin d'année | 40 | 150 | 350 |
| Domaines moyens sur l'année | 20 | 95 | 250 |
| CA récurrent (≈ 1 800 € par domaine) | 36 000 € | 171 000 € | 450 000 € |
| CA mise en place (300 €, offerte aux 10 premiers) | 9 000 € | 33 000 € | 60 000 € |
| **Chiffre d'affaires total** | **45 000 €** | **204 000 €** | **510 000 €** |
| Salaires et charges | 40 000 € | 170 000 € | 290 000 € |
| Tech (développement, hébergement, outils) | 25 000 € | 25 000 € | 35 000 € |
| Marketing, salons, déplacements | 25 000 € | 30 000 € | 50 000 € |
| Frais généraux (juridique, comptabilité, assurance) | 10 000 € | 25 000 € | 35 000 € |
| **Total charges** | **100 000 €** | **250 000 €** | **410 000 €** |
| **Résultat d'exploitation** | **−55 000 €** | **−46 000 €** | **+100 000 € (20 %)** |

**Hypothèses.**
- Année 1 : deux fondateurs (commercial et CTO) à rémunération réduite, avec un maintien des droits [À VÉRIFIER].
- Année 2 : 4 personnes (+1 commercial terrain, +1 développeur).
- Année 3 : 7 personnes (support, marketing, 2e commercial).
- 12 % de churn. Saisonnalité : 70 % des signatures entre novembre et avril.

**Vision à 5 ans [HYP] :** environ 700 domaines en année 4 et 1 100 en année 5, avec l'ouverture de l'Italie et de l'Espagne, soit 1,3 à 2 M€ de CA et 25 à 30 % de marge d'exploitation.

### 7.2 Besoin et plan de financement

Pertes cumulées sur 2 ans : environ 101 000 €. Avec une marge de sécurité, le **besoin est de 150 000 €**.

| Ressource | Montant | Statut |
|---|---|---|
| Apport des fondateurs (et love money) | 20 000 € | [HYP] |
| Prêts d'honneur (Initiative France, Réseau Entreprendre), un par fondateur | 60 000 € | [À VÉRIFIER : montants et éligibilité] |
| Bourse French Tech (Bpifrance) | 30 000 € | [À VÉRIFIER] |
| Prêt bancaire adossé aux prêts d'honneur | 40 000 € | [HYP] |
| **Total** | **150 000 €** | |

À étudier aussi : les aides régionales à l'innovation (Région Occitanie et autres), le statut JEI pour les dépenses de R&D [À VÉRIFIER], et des business angels issus de la filière vin.

---

## 8. Organisation et ressources

| Besoin | Solution |
|---|---|
| **Équipe fondatrice** | Un fondateur commercial issu de la filière (connaissance des caveaux, de l'œnotourisme et de la clientèle étrangère) + un CTO associé (web, paiements, intégrations) |
| **Statut juridique** | SAS (entrée d'associés et d'investisseurs facilitée) |
| **Tech** | Application web, intégrations de paiement récurrent via un prestataire agréé, connecteurs API vers les logisticiens et les caisses, hébergement dans l'UE |
| **Conseil** | Avocat (vente d'alcool à distance, loi Évin, RGPD), expert-comptable, mentor de la filière |
| **Outils** | CRM, outil d'emailing, Notion, Figma pour les maquettes |

### Points juridiques à sécuriser [À VÉRIFIER]
- **Le domaine reste le vendeur** : Cuvéo est un éditeur de logiciel, il ne vend pas d'alcool et n'a donc pas besoin de licence de vente.
- **Paiements** : utiliser un prestataire de paiement agréé, les fonds allant directement au domaine, pour ne pas devenir intermédiaire de paiement soumis à agrément.
- **Loi Évin** : encadrer le contenu des relances marketing (caractère informatif, mentions sanitaires).
- **Âge minimum** et contrôle de majorité à l'inscription.
- **RGPD** : consentement explicite au comptoir, contrat de sous-traitant avec chaque domaine.
- **Accises et transport** : à la charge du logisticien choisi par le domaine.

### Point d'éthique personnelle
Si le porteur de projet est salarié d'un commissionnaire de transport, il doit vérifier ses clauses de loyauté et de non-concurrence. Cuvéo ne fait pas concurrence au transport : il génère au contraire des envois. Le projet peut même être présenté à l'employeur comme un **partenariat logistique** (son API existe déjà [PB]), mais en toute transparence et avant tout démarchage.

---

## 9. Risques et parades

| Risque | Probabilité | Parade |
|---|---|---|
| Culture du club faible en France, adoption lente | Élevée | Commencer par le **réachat à distance** (bénéfice immédiat), le club venant ensuite. Cibler d'abord les domaines à clientèle étrangère, déjà habituée aux clubs |
| Les domaines n'aiment pas payer un abonnement logiciel | Élevée | ROI chiffré sur leurs propres chiffres, offre Essentiel à 79 €, une part du prix au succès (commission) |
| Forte saisonnalité de la vente | Moyenne | Vendre de novembre à avril, utiliser l'été pour l'accompagnement et les études de cas |
| Un éditeur américain arrive en France | Moyenne | Vitesse d'exécution, ancrage local, intégrations françaises (caisses NF525, logisticiens), service en français |
| Les ERP viticoles ajoutent un module club | Moyenne | Proposer un partenariat d'intégration plutôt qu'une concurrence frontale |
| Cadre juridique (Évin, alcool, paiements) | Moyenne | Conseil juridique dès le départ, modèle « le domaine est le vendeur » |
| Crise de la filière : les domaines réduisent leurs dépenses | Moyenne | Positionner Cuvéo comme un **outil anti-crise** (des ventes plus margées) plutôt que comme une dépense |

---

## 10. Feuille de route de lancement sur 90 jours

| Période | Objectifs | Livrables | Critère de passage |
|---|---|---|---|
| **J1-J20** | Valider le problème | 15 entretiens de domaines (ventes perdues, appétence pour un club, prix acceptable), TAM fiabilisé, nom vérifié à l'INPI | Au moins 10 domaines sur 15 confirment le besoin |
| **J21-J40** | Concevoir | Maquette cliquable (capture au comptoir, club, mini-boutique), revue juridique, choix du prestataire de paiement, accord de principe avec 1 logisticien | 5 lettres d'intention signées |
| **J41-J70** | Construire le MVP | Capture QR, fichier clients, relances automatiques, prélèvement club, export des commandes vers le logisticien | 3 domaines pilotes équipés |
| **J71-J90** | Prouver et vendre | Premiers membres de club et premières commandes à distance, 1 étude de cas chiffrée, dossiers de prêts d'honneur déposés, présence sur un salon | 10 domaines signés à J+150, premiers revenus récurrents |

### Indicateurs de pilotage
- **Activation** : part des domaines ayant capté au moins 50 contacts dans leur premier mois.
- **Valeur créée** : CA club + réachat généré pour le domaine (indicateur principal, l'équivalent de l'« argent récupéré »).
- **Rétention** : churn mensuel, taux de renouvellement annuel.
- **Commercial** : démonstrations, taux de signature, cycle de vente, CAC.
- **Pour le domaine** : taux de capture au comptoir, nombre de membres du club, rétention des membres.

---

## 11. Conclusion

Cuvéo répond à une problématique concrète et actuelle. La filière vend moins en volume et à l'export, alors que la vente directe reste son canal le plus rémunérateur, mais elle ne sait pas fidéliser les visiteurs qu'elle accueille. L'entreprise est **indépendante** (logiciel, sans transport ni vente de vin), **réaliste pour un jeune entrepreneur** (150 k€ de besoin de financement, MVP en 70 jours), **récurrente** (abonnement plus commission) et **différenciée** (pas d'acteur francophone, logique « caveau d'abord »).

**La décision se prend à J+40, sur une base claire :** au moins 5 domaines prêts à payer. Si ce seuil n'est pas atteint, on réoriente le produit vers le seul module « réachat à distance », plus simple à vendre.

---

## Sources

- Vinetur, arrachage 2026, consommation et exportations 2025 : [vinetur.com](https://www.vinetur.com/fr/20261008108580/france-will-remove-27000-hectares-of-vines-after-demand-for-wine-slumps.html)
- Pleinchamp, crise et arrachage : [pleinchamp.com](https://www.pleinchamp.com/actualite/viticulture-des-vignes-arrachees-face-a-une-crise-qui-s-enracine)
- Conseil de l'UE, situation du marché du vin : [data.consilium.europa.eu](https://data.consilium.europa.eu/doc/document/ST-7910-2026-INIT/fr/pdf)
- Ministère de l'Agriculture : [agriculture.gouv.fr](https://agriculture.gouv.fr/telecharger/154707)
- Reporterre, débat sur l'arrachage : [reporterre.net](https://reporterre.net/Crise-du-vin-l-arrachage-des-vignes-ne-sauvera-pas-la-filiere)
- Vente directe et circuits courts du vin : [DRAAF Nouvelle-Aquitaine](https://draaf.nouvelle-aquitaine.agriculture.gouv.fr/IMG/pdf/Regards_circuits_courts_vin_24_25_cle881546.pdf), [Vignerons indépendants, commerce intracommunautaire](https://www.vsnews.fr/images/Le_commerce_intracommunautaire_des_vins_a_destination_des_particuliers_-_Propositions_de_reforme.pdf), [Réussir Vigne](https://www.reussir.fr/vigne/vente-directe)
- Atout France, fréquentation 2025 : [atout-france.fr](https://www.atout-france.fr/fr/print/pdf/node/175)
- Clubs de vin en France : [Agra, Club Français du Vin](https://www.agra.fr/agra-innovation/le-club-francais-du-vin-cree-oenolia), [Spear's, Château Bellevue](https://spearswms.com/luxury/food-drink/domaine-de-bellevue-wine-club-offers-vineyard-ownership-perks-minus-dregs/)
- Clubs et DTC aux États-Unis : [SVB / First Citizens, DTC Report 2026](https://www.firstcitizens.com/content/dam/firstcitizens/pdfs/commercial/expertise/wine/dtc-report-2026.pdf), [Private Club Marketing](https://privateclubmarketing.com/wine-club-membership-growth-retention-strategy/), [Wine Industry Advisor](https://wineindustryadvisor.com/2026/04/21/the-wine-club-retention-crisis/)
- Logiciels de club : [Commerce7](https://commerce7.com/book-your-demo), [Wine Business International](https://www.wine-business-international.com/wine/interviews-wine/commerce7-connects-wine-lovers-and-wineries), [Capterra VineSpring](https://www.capterra.fr/software/131533/vinespring)
- Logiciels de caisse et de gestion viticole : [Appvizer, Vitisoft](https://www.appvizer.fr/operations/erp/vitisoft), [Wino](https://independant.io/avis/wino/), [Appvizer, logiciel caviste](https://www.appvizer.fr/magazine/loisirs/vignoble/logiciel-caviste)
- Hillebrand Gori eShipping et myBottlesDelivered : [hillebrandgori.com](https://www.hillebrandgori.com/faq/eshipping)
- Sales Playbook 2026 (document interne, pages 1 à 70) : données marquées [PB]
