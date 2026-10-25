# Étape 2 bis — Indépendance vis-à-vis de Planet Aura

> Ce document n'est pas un avis juridique. Les points marqués ⚖️ doivent être validés par un avocat (droit du travail + propriété intellectuelle) **avant** l'immatriculation.

## 3.1 Séparer ce qui appartient à qui

| Élément | Appartient à | Utilisable dans le dossier ? |
|---|---|---|
| 10 intégrations réalisées, 5 en cours, 3 pistes | **Planet Aura** | Oui, **uniquement** comme « signal de marché observé dans l'écosystème d'un logisticien », jamais comme clients, références ou réalisations de Passavin |
| API logistiques Planet Aura, documentation, tarifs | Planet Aura | Non (confidentiel) — sauf documentation publique ou accord écrit |
| Sales Playbook Planet Aura | Planet Aura | **Non** : document non fourni dans ce dossier et confidentiel ; aucune donnée n'en est reprise |
| Fichier clients / prospects Planet Aura | Planet Aura | **Non** : interdiction de prospecter ces contacts avec ces données (RGPD + loyauté + concurrence déloyale) |
| Connaissance générale du métier, du marché, des contraintes du vin | Le porteur (savoir-faire personnel) | Oui |
| Code, marque, données, contrats de Passavin | Passavin | Oui |

**Règle de rédaction appliquée à tous les livrables** : toute donnée issue de l'écosystème Planet Aura est signalée « Source : écosystème Planet Aura — non attribuable à Passavin ».

## 3.2 Le point le plus sensible : la situation du porteur ⚖️

Le porteur est aujourd'hui **commercial dans le transport de vin**. Trois risques doivent être levés avant toute création :

| Risque | Base | Action |
|---|---|---|
| **Obligation de loyauté** pendant le contrat de travail | Code du travail, art. L1222-1 (exécution de bonne foi) | Relire le contrat ; informer l'employeur ; ne pas travailler sur le projet pendant le temps de travail ni avec ses moyens |
| **Clause de non-concurrence / exclusivité** | Contrat de travail | Vérifier l'existence et la portée ; une clause d'exclusivité ne peut s'opposer à une création d'entreprise pendant 1 an dans certains cas (art. L1222-5) ⚖️ |
| **Propriété du code** si développé dans le cadre des fonctions | CPI art. L113-9 : les logiciels créés par un salarié dans l'exercice de ses fonctions appartiennent à l'employeur | Aucune ligne de code ni spécification produite pour Planet Aura ne doit être réutilisée ; repartir d'une page blanche documentée (dépôt horodaté) |
| **Congé ou temps partiel pour création** | Code du travail, art. L3142-105 et s. | Option pour sécuriser la transition |

**Recommandation** : présenter le projet à la direction de Planet Aura comme **un futur partenaire neutre** qui lui apportera des expéditions et réduira ses coûts d'intégration — et obtenir un **accord écrit** (non-opposition + absence de revendication de PI).

## 3.3 Dépendance aux API logisticiens

| Risque | Probabilité | Impact | Mesure |
|---|---|---|---|
| Accès API retiré ou modifié unilatéralement | Moyenne | Critique si un seul logisticien | Contrat de partenariat technique (préavis 6 mois, versionnage d'API) ; **≥ 2 logisticiens avant la levée seed, ≥ 3 à M24** |
| Logisticien qui développe son propre plugin gratuit | Élevée | Élevé | Valeur multi-logisticiens (comparaison, bascule), règles d'éligibilité, support ; proposer au logisticien de **devenir notre client** (marque blanche) plutôt qu'un concurrent |
| Tarifs/cotations non exposés par API | Moyenne | Moyen | Mode dégradé : demande de cotation transmise + réponse manuelle intégrée |
| Données clients finaux (adresses) | Certaine | Élevé (RGPD) | Passavin = sous-traitant du domaine (art. 28 RGPD) ; DPA signé ; transmission au logisticien choisi par le domaine uniquement |

## 3.4 Architecture d'indépendance technique

- **Connecteur « adaptateur » par logisticien** : un cœur neutre (commande normalisée) + un module par API. Ajouter un logisticien = écrire un adaptateur, pas modifier le produit.
- **Aucun identifiant Planet Aura dans le code cœur**, aucune préférence de classement codée en dur.
- Code, nom de domaine, comptes cloud, marque : au nom de la société Passavin dès sa création.

## 3.5 Modèle de partenariat proposé (non exclusif, équilibré)

| Clause | Proposition |
|---|---|
| Objet | Passavin intègre l'API du logisticien dans son connecteur et lui transmet les commandes des domaines qui le choisissent |
| Exclusivité | **Aucune**, dans les deux sens |
| Neutralité | Le domaine choisit son logisticien ; aucun classement payant ; critères d'affichage publics (prix, délai, destinations) |
| Rémunération | Frais de plateforme par expédition acceptée (hyp. 1,50 €), identiques pour tous les logisticiens, affichés au domaine (transparence) |
| Données | Le logisticien reçoit les données nécessaires à l'expédition, rien de plus ; pas d'accès aux données des autres logisticiens |
| Propriété | Chacun reste propriétaire de son API / son code |
| Préavis | 6 mois en cas de retrait d'API ; maintien des commandes en cours |
| Marque | Usage du nom du partenaire uniquement « compatible avec », jamais « filiale de » |

**Conflit d'intérêts à déclarer** : tant que le porteur est salarié de Planet Aura, le contrat de partenariat Planet Aura doit être négocié par un tiers (associé, conseil) et le lien déclaré aux autres logisticiens.
