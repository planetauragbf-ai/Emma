# Risques et tableaux de bord (V2 — démonstrations n°2 et n°3 de la soutenance)

## 10.1 Matrice des risques

Probabilité (P) et impact (I) notés de 1 à 4 ; criticité = P × I. **Seuil d'action immédiate : ≥ 9.** Chaque risque a un indicateur d'alerte suivi dans le tableau de bord (§10.2).

| # | Catégorie | Risque | P | I | Crit. | Justification de la note | Prévention | Plan B | Indicateur d'alerte |
|---|---|---|---|---|---|---|---|---|---|
| R1 | Commercial | Les domaines ne paient pas (douleur trop faible) | 3 | 4 | **12** | Aucune pré-vente à ce jour ; plugin concurrent à moins de 10 installations | Validation avant le MVP, 8 pré-ventes avec acompte | Pivot vers la seule offre Partner | < 4 pré-ventes |
| R2 | Financier | Seed non obtenue à M12 (point bas de trésorerie 51 k€ à M11) | 3 | 4 | **12** | Marché du capital-risque sélectif ; la seed fait 2,3 fois celle de la V1 | Levée engagée dès M8 ; jalons GO seed publics ; prêt relais BPI identifié | Rester sur le plan V1 (France, WooCommerce, 3 personnes) | Pas de lettre d'intention d'investisseur à M10 |
| R3 | Exécution | Ouverture de l'Italie et de l'Espagne plus lente (recrutement, langue, références) | 3 | 3 | **9** | Deux marchés ouverts en 4 mois par une équipe de 9 personnes | Recrutements déclenchés par jalons ; rampe de 4 mois prévue ; Vinitaly préparé ; agences locales | Reporter l'Espagne et garder l'Italie | Sales IT < 50 % du quota à M22 |
| R4 | Marché | Hypothèses de marché IT/ES non mesurées (vente en ligne, export) ; vivier espagnol saturé (18 % du SAM à M36) | 3 | 3 | **9** | Aucune donnée sur les CMS des caves ; part « vend en ligne » en hypothèse | 10 entretiens en Italie et 8 en Espagne avant le recrutement ; scan des sites de caves | Le sales Espagne couvre aussi le Portugal ; objectifs revus à la baisse | Taux de prospects qualifiés < 30 % |
| R5 | Concurrentiel | Un logisticien (MBE Wine, Hillebrand Gori) ou un agrégateur couvre le besoin gratuitement | 3 | 3 | **9** | MBE Wine for Europe lancé en juin 2026 | Neutralité multi-logisticiens ; vitesse ; agences | Les convertir en clients Partner | Nouvelle offre concurrente gratuite |
| R6 | Contractuel | Retrait ou modification d'une API logisticien | 2 | 4 | 8 | Accès API non garanti contractuellement à ce jour | Contrats avec préavis de 6 mois ; ≥ 2 logisticiens dès M6, ≥ 3 à M24 | Mode dégradé (export CSV/PDF) | > 60 % des expéditions sur un seul logisticien |
| R7 | Stratégique | Conflit entre marque blanche et neutralité (perte de confiance des domaines) | 2 | 3 | 6 | Une version à la marque d'un logisticien peut paraître non neutre | Deux marques ; aucune donnée partagée ; portabilité vers Direct ; mêmes conditions pour tous | Limiter les licences au niveau Business | Résiliations motivées par la neutralité |
| R8 | Réseau | Agences peu actives (moins de 0,4 domaine par mois) | 3 | 3 | **9** | Les programmes partenaires sont souvent sous-utilisés | Certification, commission récurrente, Gold, revue trimestrielle | Renforcer la vente directe (2ᵉ sales France) | < 70 % d'agences actives |
| R9 | Financier | Frais de plateforme logisticien refusés (mode neutre) | 3 | 2 | 6 | Non validé ; point mort M42 sans ce frais | Test en phase 1 | Pro par défaut ; marque blanche | 0 accord à M9 |
| R10 | Organisationnel | Pas d'associé·e technique, dépendance au freelance avant M10 | 3 | 3 | **9** | Profil CTO manquant | Lead dev recruté·e à M10 (BSPCE) ; code documenté au nom de la société | CTO à temps partagé | Pas de lead dev à M12 |
| R11 | Humain | Turnover des sales (rémunération, isolement des sales pays) | 2 | 3 | 6 | Sales pays seuls dans leur pays | Variable juste, BSPCE, séminaires, 1:1 hebdomadaire | Recrutement par cooptation, rampe documentée | Rotation > 15 %/an |
| R12 | Réglementaire | Commande vers un pays non conforme (ex. particulier américain) | 2 | 4 | 8 | Responsabilité des règles d'éligibilité | Règles fournies et garanties par le logisticien ; CGU ; États-Unis exclus | Blocage manuel, assurance RC pro | Toute commande refusée par un logisticien |
| R13 | Réglementaire | RGPD (adresses des acheteurs, 5 pays) | 2 | 3 | 6 | Données personnelles transmises | Contrat de sous-traitance, hébergement UE, minimisation | Audit externe | Incident ou demande d'un domaine |
| R14 | Technique | Mise à jour d'un CMS qui casse l'extension (3 CMS à maintenir) | 3 | 2 | 6 | 3 CMS en an 3 | Tests automatiques, versions bêta | Correctif < 24 h | Taux d'erreur > 2 % |
| R15 | Plateforme | Changement de politique de Shopify (alcool, paiements) | 2 | 2 | 4 | Alcool autorisé sous conditions | Veille, contact partenaire | Distribution directe | Notification Shopify |
| R16 | Commercial | Saisonnalité (vendanges, Noël) | 4 | 2 | 8 | Métier saisonnier | Prospection de janvier à juin ; abonnement annuel | Campagnes agences en septembre-octobre | Revenu récurrent stable 2 mois |
| R17 | Organisationnel | Situation du porteur vis-à-vis de son employeur actuel | 1 | 3 | 3 | Projet scolaire, sans lancement réel | Projet développé hors temps de travail ; aucune donnée ni aucun code de l'employeur | — | — |

**Lecture** : les cinq risques critiques (R1, R2, R3, R4, R5) sont **commerciaux, financiers et d'exécution**, pas techniques. D'où un plan qui teste la demande avant de coder, déclenche chaque recrutement par un jalon et refuse d'embaucher si la trésorerie couvre moins de 6 mois de burn.

## 10.2 Tableau de bord — objectifs du BP central et KPI

| Famille | KPI | Formule | Fréquence | Responsable | Cible A1 | Cible A2 | Cible A3 | Décision si écart |
|---|---|---|---|---|---|---|---|---|
| Acquisition | Nouveaux domaines Direct | Σ signatures | Hebdo | Dirigeant | 33 | 170 | 348 | Revue canal par canal |
| Acquisition | Signatures Sales France | Signatures attribuées dans le CRM | Hebdo | Sales FR | 6 | 51 | 80 | Plan de progrès 60 j |
| Acquisition | Signatures Sales Italie | idem | Hebdo | Sales IT | — | 30 | 64 | Revue du ciblage, coaching |
| Acquisition | Signatures Sales Espagne & Portugal | idem | Hebdo | Sales ES | — | 11 | 50 | idem |
| Acquisition | Démos réalisées par sales | Σ démos | Hebdo | Sales | — | ≥ 30/mois | ≥ 30/mois | Renfort SDR |
| Acquisition | Conversion démo → client | Clients / démos | Mensuel | Sales | ≥ 25 % | ≥ 25 % | ≥ 25 % | Revoir la démo, le prix, l'ICP |
| Réseau | Domaines via agences | Σ signatures agences | Mensuel | Partner manager | 2 | 32 | 100 | Animation, passage Gold |
| Réseau | Agences actives (fin d'année) | ≥ 1 domaine en 6 mois | Trimestriel | Partner manager | 2 | 9 | 27 | Recruter, désactiver |
| Réseau | Domaines via apporteurs | Σ signatures apporteurs | Mensuel | Partner manager | 4 | 23 | 45 | Kit, relance |
| Réseau | Licences marque blanche | Logisticiens sous licence | Trimestriel | Dirigeant + PM | 0 | 2 | 4 | Revoir l'offre Partner |
| Réseau | Domaines activés en marque blanche | Stock | Mensuel | Partner manager | 0 | 27 | 137 | Plan d'activation conjoint |
| Produit | CMS disponibles | Extensions en production | Trimestriel | Lead dev | Woo | + Shopify (M18) | + PrestaShop (M25) | Re-prioriser la feuille de route |
| Revenus | Revenu récurrent annualisé (fin d'année) | 12 × revenus récurrents du mois | Mensuel | Dirigeant | 42 k€ | 284 k€ | 725 k€ | Upsell Pro, prix |
| Revenus | ARPA | Abonnements / domaines | Mensuel | Customer success | 94 € | 94 € | ≥ 94 € (objectif 99 €) | Pro par défaut |
| Revenus | CA | Σ lignes | Mensuel | Dirigeant | 27 k€ | 232 k€ | 649 k€ | Gel des recrutements non déclenchés |
| Rétention | Résiliation mensuelle | Résiliés / actifs début de mois | Mensuel | Customer success | ≤ 1,5 % | ≤ 1,5 % | ≤ 1,5 % | Entretien de départ, plan d'action |
| Activation | Activation à 14 jours | 1ʳᵉ commande transmise / nouveaux | Mensuel | Customer success | ≥ 80 % | ≥ 80 % | ≥ 85 % | Onboarding guidé, appel J+3 |
| Satisfaction | NPS | Promoteurs − détracteurs | Trimestriel | Customer success | ≥ 30 | ≥ 40 | ≥ 45 | Analyse des verbatims |
| Rentabilité | Marge brute | (CA − coûts variables) / CA | Mensuel | Dirigeant | ≥ 85 % | ≥ 90 % | ≥ 90 % | Hébergement, commissions |
| Rentabilité | CAC | Coûts d'acquisition / nouveaux | Trimestriel | Dirigeant | ≤ 850 € | ≤ 1 550 € | ≤ 1 100 € | Couper le canal le plus cher |
| Rentabilité | LTV / CAC | (contribution / résiliation) / CAC | Trimestriel | Dirigeant | — | ≥ 3 | ≥ 5 | Réduire CAC ou résiliation |
| Rentabilité | EBITDA (année) | CA − charges | Mensuel | Dirigeant + comptable | −91 k€ | −332 k€ | −196 k€ | Plan d'économies |
| Rentabilité | EBITDA du mois | idem | Mensuel | Dirigeant | — | — | ≥ 0 à M38 (M36 visé) | Leviers du §12.7 |
| Trésorerie | Runway | Trésorerie / burn | Mensuel | Dirigeant | ≥ 6 mois | ≥ 12 mois | ≥ 6 mois | Gel des embauches (règle automatique) |
| Équipe | Atteinte des OKR individuels | Résultats clés atteints / fixés | Trimestriel | Dirigeant | ≥ 70 % | ≥ 70 % | ≥ 70 % | Plan de progrès |
| Équipe | Rotation du personnel | Départs / effectif moyen | Annuel | Dirigeant | — | < 15 % | < 15 % | Entretiens, rémunération |

Le tableau de bord est aussi dans `annexes/BP_3ans.xlsx`, onglet `Tableaux_de_bord`, avec les cibles lues directement dans le modèle.

## 10.3 Démonstration « le tableau de bord correspond aux objectifs »

| Objectif commercial (BP central) | Ligne du BP | KPI qui le pilote | Responsable |
|---|---|---|---|
| 348 nouveaux domaines en an 3 | Σ production des ressources | Signatures par sales + par canal (hebdo) | Chaque sales, partner manager |
| 478 domaines actifs fin an 3 | Stock × (1 − résiliation) | Résiliation ≤ 1,5 %, activation ≥ 80 % | Customer success |
| 725 k€ de revenu récurrent annualisé | Domaines × ARPA + frais + licences | Revenu récurrent, ARPA, licences | Dirigeant |
| 27 agences, 20 apporteurs | Paliers du réseau | Agences actives, domaines via agences et apporteurs | Partner manager |
| 4 licences, 137 domaines en marque blanche | Ligne Partner | Licences, domaines activés | Dirigeant + partner manager |
| Recrutements à M10-M26 | Seuils de domaines actifs | Domaines actifs vs seuil ; runway ≥ 6 mois | Dirigeant |
| Point mort M38 (M36 visé) | Charges fixes vs contribution | EBITDA mensuel, ARPA (objectif 99 €), 5ᵉ licence | Dirigeant |

**Jalons intermédiaires** (revue mensuelle) : M12 → 32 domaines, seed bouclée ; M18 → 83 domaines, Shopify en ligne ; M24 → 187 domaines, 2 licences, 9 agences ; M30 → 330 domaines, 18 agences ; M36 → 478 domaines, 4 licences, 27 agences.
