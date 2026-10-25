# Équipe, management et organisation (exigence Bloc 3)

> Aucune compétence, aucun diplôme, aucun associé n'est inventé. Le seul profil connu est le **porteur du projet** : commercial dans le transport de vin pour particuliers à l'international. Les champs `[Nom Prénom]`, `[Formation]` sont à compléter par le porteur.

## 9.1 Fondateur et profils manquants

| Rôle | Titulaire | Compétences détenues (déclarées) | Compétences à acquérir / à recruter |
|---|---|---|---|
| CEO — commercial, partenariats, produit | **[Nom Prénom]**, porteur | Vente, connaissance des domaines et de la logistique vin à l'international | Gestion d'une SAS, finance, product management (formation), droit des contrats |
| **CTO / associé·e technique** | **MANQUANT — priorité n°1** | — | Architecture SaaS, WooCommerce/PHP, API REST, sécurité, RGPD |
| Développement MVP | Freelance (60 j) | — | Choisi sur références WooCommerce |
| Support / onboarding | Dirigeant puis alternant·e | — | — |
| Juridique & comptable | Prestataires | — | Avocat (travail, PI, contrats SaaS), expert-comptable |

**Recommandation** : chercher un·e associé·e technique (10-30 % du capital selon apport, *vesting* 4 ans avec *cliff* 1 an) dans les 6 mois. Un projet SaaS sans compétence technique interne est le premier motif de refus d'un business angel. À défaut : freelance + **CTO à temps partagé** (2 j/mois).

## 9.2 Organigramme évolutif

```
AN 1 (2027)                    AN 2 (2028)                          AN 3 (2029)
CEO (porteur)                  CEO                                  CEO
 ├─ Dév. freelance (MVP)        ├─ Développeur·se full-stack (M13)   ├─ CTO associé·e / Dév. senior
 ├─ [CTO associé·e ?]           ├─ Alternant·e marketing-sales (M13) ├─ Développeur·se (optimiste)
 └─ Prestataires :              ├─ Réseau : 3 agences partenaires    ├─ Business developer / partner manager (M25)
    avocat, comptable           └─ 2-3 logisticiens partenaires      ├─ Alternant·e → support / customer success
                                                                     └─ Réseau : 8 agences, ≥ 3 logisticiens
Effectif : 1 (+ freelance)     Effectif : 3                         Effectif : 4 (5 en optimiste)
```

## 9.3 Recrutements, coûts et déclencheurs

| Poste | Mois | Brut annuel | Coût employeur (×1,42) | Déclencheur (jalon) | Canal de recrutement |
|---|---|---|---|---|---|
| Développeur·se full-stack PHP/JS | M13 | 49 k€ | ≈ 70 k€ | MVP en production + levée/financement confirmé | Welcome to the Jungle, communautés WordPress/WooCommerce, cooptation |
| Alternant·e marketing & sales | M13 | — | ≈ 12 k€ net d'aides | ≥ 15 clients | Écoles de commerce (dont Euridis) |
| Business developer / partner manager | M25 | 36 k€ fixe + 8 k€ variable | ≈ 62 k€ | **MRR ≥ 7 k€ et ≥ 80 clients** | Profils vin & spiritueux / SaaS PME |
| Customer success | M31 (optimiste) | 32 k€ | ≈ 45 k€ | ≥ 200 clients | — |

Coût de recrutement : 3 k€/an (annonces, jobboards). Pas de cabinet.

## 9.4 Management de l'équipe

| Pratique | Fréquence | Outil | But |
|---|---|---|---|
| Point d'équipe (objectifs, blocages) | Hebdomadaire, 30 min | Notion / Linear | Alignement |
| Sprint produit | 2 semaines | Linear / GitHub | Livrer par petits incréments |
| Revue pipeline commercial | Hebdomadaire | CRM (HubSpot gratuit) | Prévision de signatures |
| Revue KPI (tableau de bord) | Mensuelle | Tableur / Metabase | Décisions correctives (voir 10) |
| Entretien individuel | Mensuel (1-to-1) puis annuel formalisé | — | Motivation, développement |
| Séminaire stratégie | Semestriel | — | Révision du plan et des jalons |

**Style de management** : situationnel (Hersey-Blanchard) — directif pour l'alternant·e au démarrage, participatif avec le/la développeur·se, délégatif avec le business developer sur ses comptes. Objectifs **SMART** par fonction, fixés trimestriellement (OKR légers).

## 9.5 Objectifs par fonction (an 2 → an 3)

| Fonction | Objectifs chiffrés (proposés) |
|---|---|
| CEO | 72 → 108 nouveaux clients/an (avec l'équipe) ; 3 → 8 agences actives ; 2 → 3 logisticiens ; levée seed bouclée à M18 |
| Développeur·se | Disponibilité ≥ 99,5 % ; incidents critiques résolus < 24 h ; Shopify en bêta à M30 |
| Alternant·e | 40 démos qualifiées/trimestre ; 2 contenus/mois ; taux de réponse support < 4 h ouvrées |
| Business developer | 4 signatures/mois en direct + 1 nouvelle agence/trimestre ; churn de son portefeuille ≤ 1,5 %/mois |

## 9.6 Motivation et rémunération

- Fixe + **variable** commercial (≈ 20 % de l'OTE, sur MRR signé net des résiliations à 3 mois — pour ne pas récompenser les mauvais clients).
- **BSPCE** pour les premiers salariés (pool de 10 %).
- Prime collective si l'objectif ARR annuel est atteint.
- Télétravail partiel, formation annuelle (budget 1 000 €/salarié), autonomie sur la feuille de route.

## 9.7 Réseau commercial : agences partenaires et logisticiens

| Élément | Agences web partenaires | Logisticiens partenaires |
|---|---|---|
| Rôle | Recommandent et installent Passavin chez leurs domaines | Fournissent API et règles d'éligibilité ; reçoivent les commandes |
| Sélection | Agences WordPress/WooCommerce avec ≥ 10 domaines clients | Spécialisés vin, API disponible, assurance casse |
| Rémunération | 20 % récurrent sur l'abonnement + installation facturée par l'agence | Aucune ; ils paient un frais de plateforme (à valider) |
| Animation | Kit partenaire, formation certifiante 2 h, compte démo, réunion trimestrielle, annuaire partenaires | Comité technique trimestriel, feuille de route API partagée |
| Indicateurs | Clients apportés/trimestre, churn de leurs clients, délai d'installation | Taux d'acceptation des commandes, délai de réponse API, incidents |
| Formation | Module e-learning + certification « Partenaire Passavin » | Documentation d'intégration |

## 9.8 Besoins de formation du fondateur

Gestion financière d'une SAS (BGE / CCI), product management SaaS, droit des contrats SaaS & RGPD, management d'une première équipe. Budget : 2 000 € an 1 (partiellement finançable via CPF).
