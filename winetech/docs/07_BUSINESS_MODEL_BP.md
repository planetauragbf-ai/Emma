# Étape 5 — Business model, tarification et business plan 3 ans

> Modèle reproductible : `outils/bp_model.py` → `annexes/BP_3ans.xlsx` (hypothèses, mensuel par scénario, synthèse, financement). Toutes les valeurs sont des **hypothèses [HYP]** tant que la phase de validation (06) n'est pas terminée.

## 7.1 Sources de revenus comparées

| Option | Avantages | Risques | Décision |
|---|---|---|---|
| Frais d'installation | Encaissement immédiat, filtre les clients non motivés, paie l'onboarding | Frein à l'achat | **Oui** : 490 € liste, 190 € pilotes, 0 € via agence |
| Abonnement SaaS | Récurrent, valorisable, prévisible | Panier faible sur une niche | **Oui, cœur du modèle** |
| Facturation à la commande | Aligné sur la valeur, indolore à faible volume | Revenu volatil et saisonnier (Noël) | **Dépassement de quota uniquement** (0,90 €/expédition) |
| Frais de plateforme payés par le logisticien | Double face, aligné sur l'apport d'affaires | Conflit de neutralité, **non validé** | **À tester** ; présenté en scénario séparé |
| Création de boutiques | Cash rapide | Non scalable, concurrence les agences | **Non** (confié aux agences partenaires) |
| Maintenance | Récurrent | Glisse vers le sur-mesure | Incluse dans l'abonnement |
| Développements complémentaires | Marge sur TJM | **Piège du sur-mesure** | Plafonnés à **15 % du CA** ; uniquement si réutilisables dans le produit |
| Distribution agences | Accès à des portefeuilles de domaines | Commission 20 % | **Oui à partir de l'an 2** |

## 7.2 Grille tarifaire proposée (HT)

| Offre | Prix mensuel | Annuel (2 mois offerts) | Inclus |
|---|---|---|---|
| **Essentiel** | 49 € | 490 € | 1 logisticien, 30 expéditions/mois, suivi auto, support e-mail |
| **Pro** | 99 € | 990 € | 3 logisticiens, 150 expéditions/mois, file d'anomalies, statistiques |
| **Expert** | 199 € | 1 990 € | Logisticiens illimités, expéditions illimitées, multi-boutiques, support prioritaire |
| Dépassement | 0,90 €/expédition | — | Au-delà du quota |
| Installation accompagnée | 490 € (pilote 190 €) | — | Paramétrage, complétude catalogue, test, formation 1 h |

**Argument prix** [HYP à valider] : à 20 commandes étrangères/mois et ~12 min de ressaisie par commande, le domaine récupère ~4 h/mois (~140 € de temps) — l'offre Essentiel est remboursée par le seul gain de temps, hors ventes sauvées. Mix supposé : 50 % Essentiel / 35 % Pro / 15 % Expert → **ARPA ≈ 89 €/mois**.

## 7.3 Économie unitaire (scénario central)

| Indicateur | Valeur | Formule |
|---|---|---|
| ARPA abonnement | 89 €/mois | mix des offres |
| Frais logisticien (à valider) | +30 €/mois/client | 20 expéditions × 1,50 € |
| Coût de service | ≈ 18 €/mois/client | hébergement 3 € + paiement 1,5 % + support 0,5 h × 30 € |
| Marge brute | 82-92 % | (CA − coûts variables) / CA |
| Contribution par client | **114 €/mois** (84 € sans logisticien) | à M36 |
| CAC | 545 € (an 1, dirigeant non rémunéré) → 1 271 € (an 3) | (marketing + salaires commerciaux + 30 % dirigeant) / nouveaux clients |
| Durée de vie moyenne | ≈ 67 mois | 1 / churn (1,5 %/mois) |
| LTV | ≈ 7 600 € (5 600 € sans logisticien) | contribution / churn |
| LTV / CAC (an 3) | ≈ 6 (4,4 sans logisticien) | > 3 = sain |
| Récupération du CAC | ≈ 11 mois | CAC / contribution |

## 7.4 Hypothèses clés et lien avec les objectifs commerciaux

| Hypothèse | Valeur centrale | D'où vient-elle | Ressource qui la produit |
|---|---|---|---|
| Nouveaux clients an 1 | 22 (à partir de M5) | 8 pré-ventes converties + 14 via salons/prospection directe | Dirigeant (100 % commercial) |
| Nouveaux clients an 2 | 6/mois (72) | Dirigeant 4/mois + alternant·e 1/mois + agences 20 % | Dirigeant + alternant·e + 3 agences |
| Nouveaux clients an 3 | 9/mois (108) | + business developer (dès M25) + agences 35 % | + 1 business developer, 8 agences |
| Résiliation | 1,5 %/mois | Benchmarks SaaS PME (à confirmer en pilote) | Support + onboarding |
| Productivité commerciale | ≈ 4 signatures/mois par commercial à temps plein | 20 démos/mois × 20 % de conversion [HYP] | — |

## 7.5 Compte de résultat prévisionnel — scénario central

| € HT | An 1 (2027) | An 2 (2028) | An 3 (2029) |
|---|---|---|---|
| Nouveaux clients | 22 | 72 | 108 |
| Clients actifs fin d'année | 21 | 84 | 170 |
| ARR fin d'année | 22 559 | 89 676 | 181 090 |
| CA abonnements | 7 087 | 59 921 | 140 563 |
| CA installation | 8 580 | 22 464 | 27 378 |
| CA services | 4 000 | 12 000 | 15 000 |
| CA frais logisticiens [à valider] | 2 269 | 20 198 | 47 381 |
| **CA total** | **21 937** | **114 582** | **230 322** |
| Coûts variables | 1 762 | 16 234 | 41 723 |
| Marge brute | 20 174 | 98 348 | 188 599 |
| Taux de marge brute | 92 % | 86 % | 82 % |
| Développement (MVP + freelance) | 50 000 | 12 000 | 12 000 |
| Salaires chargés | 0 | 124 200 | 203 640 |
| Autres charges (marketing, juridique, outils…) | 28 660 | 49 860 | 70 660 |
| **EBITDA** | **−58 486** | **−87 712** | **−97 701** |
| Trésorerie fin d'année (avant levée seed) | 55 921 | −48 976 | −163 863 |

*Le MVP est passé en charges (prudence) ; activé en immobilisation, il améliorerait le résultat comptable de l'an 1 sans changer la trésorerie.*

## 7.6 Trois scénarios

| | Pessimiste | **Central** | Central sans revenu logisticien | Optimiste |
|---|---|---|---|---|
| Clients fin an 3 | 81 | **170** | 170 | 273 |
| ARR fin an 3 | 73 k€ | **181 k€** | 181 k€ | 325 k€ |
| CA an 3 | 87 k€ | **230 k€** | 183 k€ | 399 k€ |
| EBITDA an 3 | −156 k€ | **−98 k€** | −144 k€ | +44 k€ |
| Point mort mensuel | non atteint | **≈ M40-M42** (210 clients) | ≈ 284 clients | M28 |
| Besoin de trésorerie au-delà des 120 k€ initiaux | 295 k€ → **projet à arrêter ou pivoter** | **≈ 180 k€** | ≈ 250 k€ | ≈ 22 k€ |

Pessimiste = moitié moins d'acquisitions, churn 2,5 %, ARPA 75 €, recrutements commerciaux gelés. Optimiste = +40 % d'acquisitions, churn 1 %, ARPA 99 €.

## 7.7 Seuil de rentabilité et conditions de rentabilité

**Charges fixes à M36 (central)** ≈ 23 900 €/mois (dirigeant, développeur·se, alternant·e, business developer, outils, marketing, juridique).
**Seuil** = 23 900 / 114 € ≈ **210 clients actifs** (≈ 284 sans revenu logisticien).

Conditions nécessaires (toutes) :
1. **≥ 2 logisticiens** intégrés et **≥ 1 qui paie** un frais par expédition (sinon il faut +35 % de clients).
2. **Churn ≤ 1,5 %/mois** → onboarding et complétude catalogue irréprochables.
3. **ARPA ≥ 85 €** → pousser l'offre Pro (multi-logisticiens) ; ne pas brader l'Essentiel.
4. **≥ 30 % des nouveaux clients via agences** à partir de l'an 3 (CAC plus faible).
5. **Recrutements déclenchés par jalons**, jamais par calendrier (business developer seulement si MRR ≥ 7 k€ et ≥ 80 clients).
6. Services sur mesure ≤ 15 % du CA.

**Lecture honnête** : sur 3 ans, le projet **n'est pas rentable** dans le scénario central ; il devient une PME SaaS rentable vers la 4ᵉ année avec ~210-250 clients. L'extension Shopify (an 2-3) et les pays producteurs voisins (Italie, Espagne) sont les leviers pour dépasser ce plafond.

## 7.8 Besoin de financement et affectation

| Source | Montant | Moment | Statut |
|---|---|---|---|
| Apport du fondateur | 10 000 € | M0 | À confirmer |
| Prêt d'honneur (Initiative France / Réseau Entreprendre) | 30 000 € | M0-M2 | HYP — dossier à déposer |
| Bourse French Tech BPI | 30 000 € | M2-M4 | HYP — éligibilité « innovation » non garantie |
| Prêt bancaire | 50 000 € | M2 | HYP, adossé au prêt d'honneur |
| **Tranche 1 (non dilutive / dette)** | **120 000 €** | | Finance validation + MVP + an 1 |
| Business angels / seed | 200 000 € | M15-M18 | **Conditionnée aux jalons « GO levée seed »** (06 §6.4) |
| **Total sur 3 ans** | **320 000 €** | | |

**Affectation (320 k€)** : produit & développement 40 % · équipe commerciale & partenaires 30 % · marketing & salons 15 % · juridique, marque, conformité 5 % · réserve de sécurité 10 %.
