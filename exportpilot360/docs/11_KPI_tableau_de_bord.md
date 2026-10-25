# 11 — Tableaux de bord et KPI

Les objectifs sont ceux du scénario central (`../finance/Modele_Financier_ExportPilot360.xlsx`, onglet Synthèse). Fréquences : H = hebdomadaire, M = mensuelle, T = trimestrielle.

## 1. KPI de pilotage de l'entreprise

| KPI | Formule | Fréq. | Objectif (2027 → 2029) | Responsable | Décision si écart |
|---|---|---|---|---|---|
| Prospects qualifiés | Domaines contactés qui correspondent à l'ICP (flux étranger, caveau, prix ≥ 12 €) | H | 40 par mois par BizDev en haute saison de vente | BizDev | Revoir les sources de leads, activer les prescripteurs |
| Taux de conversion démonstration → signature | Signatures ÷ démonstrations réalisées | M | ≥ 30 % | CEO | Retravailler la démonstration et le ROI, ajuster l'offre d'entrée |
| Nouveaux domaines signés | Nombre de signatures | M | 45 → 125 → 200 par an | CEO | < 80 % de l'objectif sur un trimestre : revue du plan, plan de gel si le jalon de juin 2028 est manqué |
| CAC | (Salaires commerciaux + 50 % CEO + marketing + salons + primes d'apport) ÷ nouveaux domaines | T | ≤ 1 200 € | CEO | > 1 500 € : réduire les salons, privilégier les prescripteurs |
| MRR | Domaines actifs × prix moyen (hors mois offerts) | M | 5,1 k€ → 17,8 k€ → 36,6 k€ (décembre) | CEO | Écart > 15 % : analyser le mix d'offres et le churn |
| ARR | MRR × 12 | M | 61 k€ → 214 k€ → 439 k€ | CEO | Idem MRR |
| ARPA récurrent | (CA abonnements + commissions) ÷ domaines actifs moyens | T | ≈ 1 450 à 1 500 € par an | CEO | Pousser l'offre Export, vérifier les remises |
| Churn | Résiliations du mois ÷ actifs en début de mois | M | ≤ 1,5 % | Customer success (CEO jusqu'en 2029) | > 2 % : appel de chaque domaine à risque, scénarios d'hiver, revue de l'onboarding |
| LTV | ARPA × marge brute ÷ churn annuel | T | ≥ 7 000 € | CEO | Agir sur le churn avant d'investir en acquisition |
| LTV / CAC | LTV ÷ CAC | T | ≥ 3 (modèle : 6 à 8) | CEO | < 3 : geler l'acquisition payante |
| Délai de récupération du CAC | CAC ÷ (ARPA × marge brute ÷ 12) | T | ≤ 12 mois | CEO | > 18 mois : revoir le prix ou le canal |
| Marge brute | (CA − coûts directs) ÷ CA | M | ≥ 85 % | CTO | Optimiser l'hébergement et les API, renégocier les freelances |
| Trésorerie | Solde bancaire de fin de mois | M | Toujours ≥ 25 k€ | CEO | < 3 mois de charges : déclencher le plan de gel ou la levée |
| Autonomie financière | Trésorerie ÷ consommation mensuelle moyenne des 3 derniers mois | M | ≥ 6 mois tant que l'EBE est négatif | CEO | < 6 mois : préparer le financement 6 mois à l'avance |
| Utilisation de la plateforme | Domaines ayant capté au moins 10 contacts dans le mois ÷ domaines actifs | M | ≥ 70 % en saison, ≥ 40 % l'hiver | Customer success | Domaine inactif 30 jours : appel et re-formation |
| Satisfaction (NPS domaines) | % de promoteurs − % de détracteurs | T | ≥ 30 | CEO | < 20 : entretiens qualitatifs, priorisation produit |

## 2. KPI de valeur pour le domaine (affichés dans son tableau de bord)

| KPI | Formule | Repère (hypothèse à mesurer en pilote) |
|---|---|---|
| Taux de capture | Contacts collectés ÷ visiteurs exposés au QR | ≥ 25 % |
| Taux de réachat à 6 mois | Contacts ayant commandé ÷ contacts collectés | ≥ 3 % |
| CA généré | Somme des réachats passés par la plateforme | Couvre au moins 5 fois l'abonnement annuel |
| Part internationale | Réachats hors France ÷ total | Selon le profil du domaine |

## 3. Tableau de bord mensuel (modèle de restitution)

| Bloc | Indicateurs | Visualisation |
|---|---|---|
| Croissance | Signatures, domaines actifs, MRR, ARR | Courbe sur 12 mois + écart à l'objectif |
| Économie unitaire | CAC, ARPA, LTV/CAC, délai de récupération | Tuiles chiffrées avec flèche de tendance |
| Rétention | Churn mensuel, utilisation, NPS | Courbe + liste des domaines à risque |
| Finance | CA, EBE, trésorerie, autonomie | Barres mensuelles + jauge d'autonomie |
| Partenaires | Commandes transmises par partenaire, incidents | Barres empilées |

Le modèle Excel fournit la version « budget » de chaque indicateur (onglets Mensuel et Synthèse). Le réel est saisi chaque mois à côté du budget, et l'écart déclenche la décision prévue ci-dessus.
