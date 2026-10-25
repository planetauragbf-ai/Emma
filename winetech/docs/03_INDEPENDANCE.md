# Étape 2 bis — Indépendance vis-à-vis de Planet Aura

> **V2** : le volet « conflit avec l'employeur » est réduit à une ligne de risque et une phrase de réponse (§3.2), le projet étant scolaire.

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

## 3.2 La situation du porteur (allégée en V2)

Le projet est **uniquement scolaire** : il n'y a pas de lancement réel. Le sujet est donc réduit à :
- **une ligne de risque** : R17 dans `10_RISQUES_TABLEAUX_DE_BORD.md` (probabilité 1, impact 3) ;
- **une phrase de réponse si le jury pose la question** : « C'est un projet d'école ; s'il devenait réel, je le développerais hors de mon temps de travail, sans aucune donnée ni ligne de code de mon employeur, après avoir fait relire mon contrat et obtenu son accord écrit — et Planet Aura serait un logisticien partenaire parmi d'autres, aux mêmes conditions. »

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

**Neutralité** : Planet Aura bénéficie exactement des mêmes conditions que les autres logisticiens (mode neutre et offre Partner) ; ses intégrations existantes ne sont jamais présentées comme des clients de Passavin.
