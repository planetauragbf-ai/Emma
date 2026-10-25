# Business model, tarification et business plan sur 3 ans (V2)

> Modèle reproductible : `outils/bp_model.py` → `annexes/BP_3ans.xlsx` (onglets Hypothèses, Production_ressources, Mensuel ×3, Synthèse_annuelle, Pays_CMS, Marque_blanche, Financement, Plan_recrutement, Tableaux_de_bord, Leviers_point_mort). Les résultats complets, régénérés automatiquement, sont dans `13_BP_V2_RESULTATS.md`.
> Toutes les valeurs sont des **[HYP]** tant que la validation (`06_VALIDATION.md`) n'est pas faite. M1 = janvier 2027.

## 7.1 Deux offres, sept lignes de revenus

| Offre | Ligne de revenus | Qui paie | Ressource qui la produit | Statut |
|---|---|---|---|---|
| **Passavin Direct** | Abonnement mensuel (49 / 99 / 199 €) | Domaine | Dirigeant, 3 sales, agences, apporteurs | Cœur du modèle |
| | Installation accompagnée (490 €, 190 € pour les pilotes, 0 € si une agence installe) | Domaine | Sales, customer success | Filtre les clients peu motivés |
| | Frais de plateforme 1,50 €/expédition (mode neutre) | Logisticien choisi par le domaine | Indirect (volume des domaines) | **À valider** ; scénario « sans » chiffré |
| | Services sur mesure (≤ 15 % du CA) | Domaine | Customer success | Plafonnés pour ne pas devenir une agence |
| **Passavin Partner** (marque blanche) | Licence mensuelle (690 / 1 490 / 2 490 €) | Logisticien revendeur | Dirigeant + partner manager | Nouveau en V2 |
| | Mise en place (4 000 à 12 000 €) | Logisticien revendeur | Dirigeant + partner manager | Paie l'adaptateur et la marque |
| | Frais par expédition (0,40 à 0,60 €) | Logisticien revendeur | Logisticien (il active ses domaines) | Indexé sur l'usage |

Abandonnés : création de boutiques (confiée aux agences, devenues un canal), développements non réutilisables.

## 7.2 Grilles tarifaires (HT)

**Passavin Direct (domaines)** — identique à la V1, avec l'offre Pro mise en avant par défaut :

| Offre | Mensuel | Annuel (2 mois offerts) | Inclus |
|---|---|---|---|
| Essentiel | 49 € | 490 € | 1 logisticien, 30 expéditions/mois, suivi automatique, support e-mail |
| **Pro** | **99 €** | 990 € | 3 logisticiens, 150 expéditions/mois, file d'anomalies, statistiques |
| Expert | 199 € | 1 990 € | Logisticiens et expéditions illimités, multi-boutiques, support prioritaire |
| Dépassement | 0,90 €/expédition | — | Au-delà du quota |

Mix supposé : 40 % Essentiel, 45 % Pro, 15 % Expert → **ARPA = 94 €/mois** (89 € en V1 ; Pro par défaut dans la démo). Argument prix : 20 commandes étrangères par mois × 12 min de ressaisie ≈ 4 h, soit ≈ 140 € de temps par mois [HYP à mesurer].

**Passavin Partner (logisticiens)** : Starter 690 €/mois + 4 000 € + 0,60 €/expédition ; **Business 1 490 € + 8 000 € + 0,50 €** ; Premium 2 490 € + 12 000 € + 0,40 €. Argumentaire complet (coût d'un plugin maison ≈ 69 k€ la 1ʳᵉ année pour 2 CMS, repères Sendcloud, Cargoson, ShipStation) : `12_V2_EUROPE.md` §12.5.

## 7.3 Économie unitaire d'un domaine Direct (central, M36)

| Indicateur | Valeur | Formule |
|---|---|---|
| ARPA | 94 €/mois | mix des offres |
| Frais logisticien moyen | 15 €/mois | 20 expéditions × 1,50 € × 50 % des domaines routés vers un logisticien qui a signé ce frais |
| Contribution | **99 €/mois** | (abonnement + frais) − hébergement 3 € − paiement 1,5 % − commissions agences |
| Durée de vie | 67 mois | 1 / résiliation (1,5 %/mois) |
| LTV | **≈ 6 600 €** | contribution / résiliation |
| CAC | 812 € (an 1) · 1 537 € (an 2) · **1 079 € (an 3)** | (marketing + programme partenaires + coûts sales, partner manager et alternant·e + commissions apporteurs + 30 % du coût du dirigeant) / nouveaux domaines |
| LTV / CAC | **≈ 6** | > 3 = sain |
| Récupération du CAC | ≈ 11 mois | CAC / contribution |
| Marge brute | 88 % (an 1) → 92 % (an 3) | support assuré par des salariés (charges fixes) |

Le CAC monte en an 2 (recrutements en rampe, ouverture de deux pays) puis baisse en an 3 quand les sales et le réseau sont à pleine productivité.

## 7.4 Des objectifs commerciaux au chiffre d'affaires (démonstration n°1)

**Formule** : nouveaux domaines (ressource, pays, mois) = productivité nominale × rampe × part du vivier couverte par les CMS lancés × (1 − pénétration du SAM / 60 %).

| Ressource | Productivité [HYP] | Justification | An 1 | An 2 | An 3 |
|---|---|---|---|---|---|
| Dirigeant | 22 en an 1 (pilotes + réseau), 2/mois en an 2, 1/mois en an 3 | Le temps de management augmente | 22 | 22 | 10 |
| Sales France | 8/mois à couverture complète ; rampe 3 mois | 30 démos/mois × 25 % (contre 4/mois en V1 pour un dirigeant qui fait tout) | 6 | 51 | 80 |
| Sales Italie | 6/mois ; rampe 4 mois | Marché nouveau, sans références | — | 30 | 64 |
| Sales Espagne & Portugal | 5/mois ; rampe 4 mois | Vivier plus petit | — | 11 | 50 |
| Agences Silver | 0,4/mois/agence | ≈ 1 domaine par trimestre | 2 | 19 | 59 |
| Agences Gold | 1,2/mois/agence | Critère d'accès au niveau Gold | — | 13 | 41 |
| Apporteurs | 0,25/mois/apporteur | 3 domaines par an | 4 | 23 | 45 |
| **Total domaines Direct signés** | | | **33** | **170** | **348** |
| Logisticiens revendeurs (licences) | 1 en an 2 puis 1 tous les 6 mois | Cycle de vente long (6-9 mois) | 0 | 2 | 4 |
| Domaines activés en marque blanche (stock fin d'année) | 2/mois puis 4/mois par logisticien | Contrat : ≥ 40 domaines la 1ʳᵉ année | 0 | 27 | 137 |

## 7.5 Compte de résultat prévisionnel — scénario central

| € HT | An 1 (2027) | An 2 (2028) | An 3 (2029) |
|---|---|---|---|
| Domaines Direct actifs fin d'année | 32 | 187 | 478 |
| Domaines en marque blanche fin d'année | 0 | 27 | 137 |
| Revenu récurrent annualisé fin d'année | 42 k€ | 284 k€ | **725 k€** |
| CA abonnements | 9 777 | 112 074 | 385 863 |
| CA installation | 12 116 | 53 922 | 96 702 |
| CA services | 4 000 | 12 000 | 15 000 |
| CA frais logisticiens (mode neutre, à valider) | 1 500 | 17 884 | 61 574 |
| CA marque blanche (licences + mise en place + expéditions) | 0 | 36 389 | 89 582 |
| **CA total** | **27 394** | **232 270** | **648 721** |
| Coûts variables | 3 298 | 18 314 | 52 727 |
| **Marge brute** | 24 095 (88 %) | 213 956 (92 %) | 595 993 (92 %) |
| Développement externe (MVP + freelance) | 42 500 | 0 | 0 |
| Salaires chargés (dont variable) | 31 907 | 418 448 | 628 016 |
| Autres charges (marketing, réseau, déplacements, localisation, juridique, outils, locaux, recrutement, formation) | 40 660 | 127 833 | 164 033 |
| **EBITDA** | **−90 972** | **−332 325** | **−196 056** |
| Trésorerie fin d'année (après financement) | 792 317 | 438 568 | 181 089 |
| Effectif fin d'année | 3 | 9 | 11 |

*Le MVP est passé en charges (prudence).*

## 7.6 Scénarios et point mort

| | Pessimiste | **Central** | Optimiste | Central sans marque blanche | Central sans frais logisticien |
|---|---|---|---|---|---|
| Domaines Direct fin an 3 | 264 | **478** | 595 | 478 | 478 |
| Revenu récurrent annualisé fin an 3 | 328 k€ | **725 k€** | 972 k€ | 625 k€ | 639 k€ |
| CA an 3 | 279 k€ | **649 k€** | 859 k€ | 559 k€ | 587 k€ |
| EBITDA an 3 | −401 k€ | **−196 k€** | −20 k€ | −279 k€ | −257 k€ |
| EBITDA du mois 36 | −26 k€ | **−3 k€** | +16 k€ | −11 k€ | −10 k€ |
| Point mort mensuel | non atteint | **M38** | **M32** | M42 | M42 |
| Trésorerie fin an 3 | −38 k€ | 181 k€ | 433 k€ | 67 k€ | 101 k€ |

**Pessimiste** : productivité des sales −35 %, agences et apporteurs −35 à −40 %, résiliation 2,2 %, ARPA 85 €, Shopify à M21, PrestaShop à M31, 2 licences seulement. **Optimiste** : productivité +20 %, résiliation 1,1 %, ARPA 99 €, 5 licences, Shopify M16, PrestaShop M23.

**L'objectif « point mort dans les 36 mois » n'est pas atteint en central** (M38 ; −3 k€ au mois 36). Il le serait avec l'un des leviers suivants : ARPA de 103 €, productivité des sales +15 %, 6 licences, ou la combinaison réaliste « Pro par défaut (99 €) + une 5ᵉ licence à M30 » (`12_V2_EUROPE.md` §12.7). La résiliation seule ne suffit pas, même à 1 %.

**Charges fixes à M36** ≈ 66 k€/mois : équipe de 11 personnes ≈ 52 k€, autres charges ≈ 13 k€.

## 7.7 Besoin de financement et affectation

| Source | Montant | Moment | Statut |
|---|---|---|---|
| Apport du fondateur | 10 000 € | M0 | À confirmer |
| Prêt d'honneur (Initiative France / Réseau Entreprendre) | 40 000 € | M0-M2 | HYP |
| Bourse French Tech BPI | 30 000 € | M2-M4 | HYP, éligibilité non garantie |
| Prêt bancaire | 60 000 € | M2 | HYP, adossé au prêt d'honneur |
| **Pré-amorçage** | **140 000 €** | | Finance validation, MVP, pilotes, 2 premiers salariés |
| Seed : business angels + fonds d'amorçage (fonds propres) | 550 000 € | **M12** | **Conditionnée aux jalons GO seed** (`06_VALIDATION.md`) |
| Seed : prêt d'amorçage BPI | 200 000 € | M12 | HYP, adossé à la levée |
| **Total sur 3 ans** | **890 000 €** | | |

**Dimensionnement** : la seed couvre le point bas de trésorerie sans levée, plus 6 mois de burn de sécurité (calcul automatique dans `bp_model.py`). Point bas avant seed : **51 k€ à M11**. C'est tendu : la levée doit être engagée dès M8 et un prêt relais BPI identifié.

**Valorisation et dilution [HYP]** : valorisation avant levée de 2,0 à 2,5 M€ (≈ 32 domaines, 42 k€ de revenu récurrent annualisé, 2 logisticiens intégrés) → **dilution de 18 à 22 %**.

**Affectation de la seed (750 k€)** : équipe commerciale et réseau 45 % (≈ 338 k€) · produit 30 % (≈ 225 k€) · marketing Europe 10 % (≈ 75 k€) · customer success 5 % · juridique, localisation et marques UE 3 % · réserve 7 %.

**Pérennité** : en central, la trésorerie reste positive sur 36 mois (181 k€ à M36) et l'entreprise devient rentable à M38 sans nouvelle levée. Une série A n'est utile que pour accélérer (Allemagne, spiritueux, nouveaux CMS), pas pour survivre.
