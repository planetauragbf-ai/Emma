# Étape 4 — Plan de validation commerciale (« le marché est-il prêt à payer ? »)

> Tous les seuils ci-dessous sont des **objectifs proposés**, à fixer définitivement avant de commencer (pour ne pas les adapter aux résultats).

## 6.1 Phasage et budget

| Phase | Période (proposée) | Objectif | Livrable | Budget |
|---|---|---|---|---|
| 0. Sécurisation | Nov. 2026 | Contrat de travail relu, accord Planet Aura, dépôt de marque préparé | Note avocat | 1 500 € |
| 1. Découverte | Nov.-déc. 2026 | 25 entretiens domaines + 5 agences + 4 logisticiens | Synthèse problème, volumes, outils | 1 000 € (déplacements) |
| 2. Prototype & prix | Janv. 2027 | Maquette cliquable (Figma) + page d'attente + test de prix | 15 démos, liste d'attente | 1 500 € |
| 3. Pré-vente | Janv.-fév. 2027 | Lettres d'intention **avec acompte** (frais d'installation pilote 190 €) | ≥ 8 pré-ventes | 0 € |
| 4. Pilote technique | Mars-juin 2027 | MVP chez 5 domaines + 2 logisticiens | Mesures avant/après | MVP 30 k€ |
| 5. Pilote commercial | Mai-août 2027 | Conversion des pilotes en abonnements payants | ≥ 4 contrats payants | — |

## 6.2 Guide d'entretien domaine (45 min, ne jamais présenter la solution avant la fin)

1. Profil : surface, bouteilles/an, part de vente directe, part export particuliers, pays.
2. Canal : boutique en ligne ? CMS ? qui la gère ? depuis quand ?
3. **Volumes** : commandes en ligne/mois ; dont hors France ; panier moyen ; nb de bouteilles par colis.
4. **Processus** : « Racontez-moi la dernière commande étrangère, de A à Z. » Chronométrer chaque étape.
5. Outils : logisticien(s) utilisés, comment la commande lui est transmise, comment le suivi revient.
6. **Incidents** des 12 derniers mois : pays refusé, colis bloqué, casse, prix de livraison faux, annulation.
7. Coût actuel : temps passé (h/mois), qui le fait, coût de l'agence/du développeur.
8. Tentatives : avez-vous déjà cherché/payé une solution (plugin Hillebrand Gori eShipping, développement sur mesure, Sendcloud…) ? Laquelle ? Pourquoi abandonnée ?
9. **Disposition à payer** (Van Westendorp) : à quel prix mensuel trouveriez-vous cela trop cher / cher / bon marché / trop bon marché pour ne pas y croire ?
10. Engagement : « Si cela existait en mars, seriez-vous pilote avec un acompte de 190 € ? »

**Grille de mesure** (tableur) : temps par commande, commandes étrangères/mois, incidents/an, CMS, logisticien, prix acceptable, engagement (oui/non/acompte).

## 6.3 Entretiens côté logisticiens (le test le plus important)

- **Question préalable** : pourquoi le plugin WooCommerce de Hillebrand Gori n'a-t-il que < 10 installations ? (interroger 3 domaines clients Hillebrand et l'éditeur lui-même). Si la réponse est « les domaines n'en veulent pas », le projet doit pivoter.

- Combien coûte une intégration sur mesure (jours, €) ? Combien en font-ils par an ?
- Exposent-ils une API de cotation, de création d'expédition, de suivi, de règles destinations ?
- **Accepteraient-ils de payer 1-2 € par expédition apportée** (ou un forfait mensuel) ? À quelles conditions ?
- Exigences de non-exclusivité, de neutralité, de données.

## 6.4 Critères de décision (objectifs proposés)

| Indicateur | Seuil « GO MVP » (fin phase 3) | Zone « revoir » | Seuil « STOP » |
|---|---|---|---|
| Entretiens où la douleur est citée spontanément (top 3) | ≥ 40 % | 20-40 % | < 20 % |
| Domaines cibles avec ≥ 10 commandes étrangères/mois | ≥ 30 % des interviewés WooCommerce | 15-30 % | < 15 % |
| Temps de traitement mesuré par commande étrangère | ≥ 8 min | 4-8 min | < 4 min |
| Prix « acceptable » médian (Van Westendorp) | ≥ 49 €/mois | 25-49 € | < 25 € |
| Pré-ventes avec acompte | **≥ 8** | 4-7 | < 4 |
| Logisticiens prêts à signer un accord API | **≥ 2** (dont ≥ 1 hors Planet Aura) | 1 | 0 hors Planet Aura |
| Logisticiens prêts à payer un frais par expédition | ≥ 1 | 0 → modèle « sans logisticien » | — |

| Indicateur | Seuil « GO levée seed » (M12-M15) |
|---|---|
| Clients payants actifs | ≥ 20 |
| MRR | ≥ 1 800 € |
| Résiliation mensuelle | ≤ 2 % |
| Activation (1ʳᵉ commande transmise < 14 j après installation) | ≥ 80 % |
| Temps de traitement après installation | ≤ 2 min/commande |
| Logisticiens intégrés en production | ≥ 2 |
| NPS pilotes | ≥ 30 |

**Règle de décision** : GO si tous les seuils « GO » marqués en gras sont atteints et ≥ 4 des autres ; REVOIR (pivot : marque blanche pour logisticiens, ou cible agences) si 2 seuils sont en zone « revoir » ; STOP si un seuil « STOP » est franchi sur les pré-ventes ou les logisticiens.

**Pivot identifié à l'avance** : si les domaines ne paient pas mais que les logisticiens oui → vendre le connecteur **en marque blanche aux logisticiens** (B2B2B), qui l'offrent à leurs domaines. Moins de clients, panier plus élevé.
