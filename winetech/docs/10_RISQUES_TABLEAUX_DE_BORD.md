# Risques et tableaux de bord (démonstrations n°2 et n°3 de la soutenance)

## 10.1 Matrice des risques

Probabilité (P) et impact (I) notés de 1 à 4 ; criticité = P × I. Seuil d'action immédiate : ≥ 9.

| # | Catégorie | Risque | P | I | Crit. | Prévention | Plan B | Indicateur d'alerte |
|---|---|---|---|---|---|---|---|---|
| R1 | Commercial | Les domaines ne paient pas (douleur trop faible) | 3 | 4 | **12** | Validation avant MVP, pré-ventes avec acompte (06) | Pivot marque blanche pour logisticiens | < 4 pré-ventes |
| R2 | Concurrentiel | Logisticien (Hillebrand Gori) ou agrégateur couvre le besoin gratuitement | 3 | 3 | **9** | Neutralité multi-logisticiens, vitesse, relation agences | Devenir le fournisseur technique de ces acteurs | Nouvelle offre concurrente |
| R3 | Contractuel | Retrait ou modification d'une API logisticien | 2 | 4 | **8** | Contrats avec préavis 6 mois ; ≥ 2 logisticiens dès M6, ≥ 3 à M24 | Mode dégradé (export CSV/PDF) | Part d'expéditions sur un logisticien > 60 % |
| R4 | Organisationnel / juridique | Conflit avec l'employeur actuel (loyauté, PI, non-concurrence) | 2 | 4 | **8** | Avocat, accord écrit, code repris de zéro | Différer la création ; congé création d'entreprise | Pas d'accord écrit à M0 |
| R5 | Organisationnel | Pas d'associé·e technique, dépendance au freelance | 3 | 3 | **9** | Recherche active d'un·e CTO (equity), code documenté, dépôt privé au nom de la société | CTO à temps partagé | Pas de CTO à M6 |
| R6 | Financier | Trésorerie négative avant la levée seed (≈ M17 en central) | 3 | 4 | **12** | Levée préparée dès M12 ; recrutements conditionnés aux jalons | Gel des embauches, prêt BPI, report du business developer | Trésorerie < 6 mois de charges |
| R7 | Financier | Revenu logisticien non obtenu | 3 | 3 | **9** | Tester en phase 1 ; scénario « sans logisticien » chiffré | Hausse de l'ARPA (Pro par défaut) | 0 accord à M9 |
| R8 | Réglementaire | Commande transmise vers un pays non conforme (ex. particulier américain) | 2 | 4 | **8** | Règles fournies **et garanties** par le logisticien ; CGU claires ; États-Unis exclus | Blocage manuel, assurance RC pro | Toute commande refusée par un logisticien |
| R9 | Réglementaire | RGPD (adresses des acheteurs) | 2 | 3 | 6 | DPA, hébergement UE, minimisation, registre | Audit externe | Demande d'un domaine / incident |
| R10 | Technique | Mise à jour WooCommerce qui casse l'extension | 3 | 2 | 6 | Tests automatisés sur versions bêta, compatibilité HPOS | Correctif < 24 h | Taux d'erreur API > 2 % |
| R11 | Technique | Sécurité (clés API logisticiens) | 2 | 4 | **8** | Chiffrement, rotation, audit sécurité avant v1 | Révocation immédiate | Tentative d'accès anormale |
| R12 | Commercial | Saisonnalité (pic Noël, creux été) | 4 | 2 | **8** | Abonnement annuel (2 mois offerts) | Campagnes hors saison | MRR stagnant 2 mois |
| R13 | Organisationnel | Dépendance au sur-mesure (glissement vers une agence) | 3 | 3 | **9** | Plafond de 15 % du CA en services ; seuls les développements réutilisables sont acceptés | Refus / renvoi vers agences partenaires | Services > 15 % du CA |
| R14 | Marché | Baisse des exportations (−8 % en 2025) et budgets serrés des domaines | 3 | 2 | 6 | Prix d'entrée bas, ROI démontré en démo | Focus UE + Royaume-Uni + Suisse | Allongement du cycle de vente |

**Lecture** : les trois risques critiques (R1, R6, R2) sont **commerciaux et financiers, pas techniques** — d'où un plan qui teste la demande avant de coder et conditionne chaque dépense à un jalon.

## 10.2 Tableau de bord — objectifs et KPI

| Famille | KPI | Formule | Source | Fréquence | Responsable | Objectif A1 / A2 / A3 | Décision corrective si écart |
|---|---|---|---|---|---|---|---|
| Acquisition | Nouveaux clients | Nb de clients signés sur la période | CRM / Stripe | Hebdo | CEO | 22 / 72 / 108 | Revoir canaux ; + démos ; activer agences |
| Acquisition | Taux de conversion démo → client | Clients / démos | CRM | Mensuel | CEO | ≥ 20 % | Retravailler démo, prix, ICP |
| Acquisition | CAC | (Marketing + salaires commerciaux + 30 % dirigeant) / nouveaux clients | Compta + CRM | Trimestriel | CEO | ≤ 600 / 800 / 1 300 € | Couper le canal le plus cher |
| Acquisition | Part via agences | Clients agences / nouveaux clients | CRM | Trimestriel | Business developer | 0 / 20 / 35 % | Animation, commission Gold |
| Activation | Taux d'activation | Clients ayant transmis ≥ 1 commande dans les 14 j / nouveaux clients | Base Passavin | Mensuel | Dév. / support | ≥ 80 % | Onboarding guidé, appel J+3 |
| Activation | Temps d'installation | Moyenne installation → 1ʳᵉ commande | Base Passavin | Mensuel | Support | ≤ 7 j | Assistant de complétude catalogue |
| Usage | Commandes transmises / client / mois | Σ commandes / clients actifs | Base Passavin | Mensuel | CEO | ≥ 20 | Cibler des domaines à plus fort volume |
| Revenus | MRR | Σ abonnements mensuels actifs | Stripe | Mensuel | CEO | 1,9 / 7,5 / 15,1 k€ (fin d'année) | Upsell Pro, revoir prix |
| Revenus | ARR | MRR × 12 | Stripe | Mensuel | CEO | 23 / 90 / 181 k€ | — |
| Revenus | ARPA | MRR / clients actifs | Stripe | Mensuel | CEO | ≥ 85 € | Mix d'offres, quota Essentiel |
| Revenus | Revenu logisticien | Σ frais de plateforme | Facturation | Mensuel | CEO | 2 / 20 / 47 k€ (an) | Renégocier ou scénario sans |
| Résiliation | Churn clients | Clients perdus / clients en début de mois | Stripe | Mensuel | Support | ≤ 1,5 %/mois | Entretien de départ, plan d'action |
| Résiliation | Net Revenue Retention | (MRR début + expansion − contraction − churn) / MRR début (12 mois) | Stripe | Trimestriel | CEO | ≥ 100 % | Upsell multi-logisticiens |
| Rentabilité | Marge brute | (CA − coûts variables) / CA | Compta | Mensuel | CEO | ≥ 80 % | Optimiser hébergement, support |
| Rentabilité | LTV / CAC | (contribution / churn) / CAC | Calcul | Trimestriel | CEO | ≥ 3 | Réduire CAC ou churn |
| Rentabilité | EBITDA mensuel | CA − charges | Compta | Mensuel | CEO + comptable | −1 / −5 / −5 k€ (mois de décembre) | Gel des recrutements |
| Rentabilité | Services / CA | CA services / CA total | Compta | Trimestriel | CEO | ≤ 15 % | Refus de projets non réutilisables |
| Satisfaction | NPS | % promoteurs − % détracteurs | Enquête | Trimestriel | Support | ≥ 30 / 40 / 45 | Analyse verbatims, feuille de route |
| Satisfaction | Délai de première réponse support | Moyenne (heures ouvrées) | Helpdesk | Hebdo | Support | ≤ 4 h | Base de connaissances, renfort |
| Qualité | Taux d'erreur de transmission | Commandes en échec / commandes | Logs | Quotidien | Dév. | ≤ 1 % | Correctif, alerte logisticien |
| Qualité | Disponibilité | Temps de service / temps total | Monitoring | Quotidien | Dév. | ≥ 99,5 % | Post-mortem |
| Trésorerie | Trésorerie disponible | Solde bancaire | Banque | Hebdo | CEO | > 3 mois de charges | Déclencher levée / prêt |
| Trésorerie | Runway | Trésorerie / burn mensuel | Calcul | Mensuel | CEO | ≥ 6 mois | Plan d'économies |
| Réseau | Agences actives | Agences ayant apporté ≥ 1 client sur 6 mois | CRM | Trimestriel | Business developer | 0 / 3 / 8 | Recrutement d'agences |
| Réseau | Logisticiens intégrés | Adaptateurs en production | Base Passavin | Trimestriel | CEO / dév. | 2 / 2-3 / ≥ 3 | Prioriser la feuille de route |
| Équipe | Atteinte des objectifs individuels | Objectifs atteints / fixés | 1-to-1 | Trimestriel | CEO | ≥ 80 % | Formation, coaching, réaffectation |

## 10.3 Démonstration « le tableau de bord correspond aux objectifs »

Chaque objectif commercial de `08_STRATEGIE_COMMERCIALE.md` §8.10 a **un KPI, une cible annuelle identique au BP, un responsable et une décision corrective** :

| Objectif commercial | Ligne du BP | KPI du tableau de bord |
|---|---|---|
| 108 nouveaux clients en an 3 | Nouveaux clients | Nouveaux clients (hebdo) |
| 170 clients actifs fin an 3 | Clients actifs = clients − churn | Churn ≤ 1,5 % |
| 181 k€ d'ARR | MRR × 12 | MRR, ARPA |
| 35 % via agences | Part agences, commission 20 % | Part via agences, agences actives |
| Point mort ~210 clients | Charges fixes / contribution | EBITDA mensuel, LTV/CAC, runway |
