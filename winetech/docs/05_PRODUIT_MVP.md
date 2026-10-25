# Étape 3 — Concept optimisé : produit, parcours, MVP

## 5.1 Proposition de valeur (une phrase)

> **Passavin branche votre boutique WooCommerce aux logisticiens spécialisés vin : au checkout, vos clients étrangers ne voient que des destinations réellement livrables, au bon prix ; après l'achat, la commande part chez le logisticien et le suivi revient tout seul.**

Trois bénéfices mesurables (à valider en pilote) :
1. **Moins de ventes perdues ou à perte** : pas de pays non livrable proposé, pas de forfait de livraison sous-évalué.
2. **Zéro ressaisie** : la commande est transmise automatiquement (objectif : < 1 min de contrôle humain par commande contre ~12 min [HYP]).
3. **Liberté** : plusieurs logisticiens comparables, bascule sans redévelopper.

**Ce que le produit ne promet pas** : une conformité réglementaire automatique universelle. Les règles d'éligibilité sont **fournies et garanties par chaque logisticien** (il sait où il livre et à quelles conditions) ; Passavin les applique et les affiche. Les obligations fiscales (accises, TVA, représentant fiscal) restent celles du domaine et de son logisticien.

## 5.2 Parcours utilisateur complet

| # | Étape | Action client (domaine / acheteur) | Action du logiciel | API / données | Contrôles | Humain ? | Risques & traitement |
|---|---|---|---|---|---|---|---|
| 0 | Installation | Le domaine installe l'extension, connecte son compte logisticien | Assistant : import catalogue (degré, couleur, appellation, contenance, poids, nb de bouteilles par colis) | API REST WooCommerce ; clé API logisticien | Champs obligatoires produit complets | Oui : session d'onboarding 1 h | Fiches produits incomplètes → tableau de complétude bloquant |
| 1 | Panier / checkout | L'acheteur saisit son adresse (pays, code postal) | Interroge les règles d'éligibilité des logisticiens actifs ; masque les destinations non livrables ; affiche le tarif (et droits/taxes estimés si fournis) | `woocommerce_shipping` (méthode d'expédition) → API cotation logisticien | Pays/état éligible ; nb bouteilles ≤ plafond ; âge (mention + case à cocher) | Non | API lente → cache des grilles tarifaires (TTL 24 h) + tarif de repli défini par le domaine ; destination non couverte → message clair + formulaire « demande de devis » |
| 2 | Paiement | L'acheteur paie | Rien (paiement géré par la passerelle du domaine) | Webhook `order.created` | — | Non | — |
| 3 | Pré-contrôle | — | Normalise la commande (adresse, téléphone, contenu, valeur, codes produit) | Données internes | Téléphone présent ; adresse valide (format) ; valeur déclarée ; cohérence colis (6/12 bouteilles) | **Oui si anomalie** : file « à vérifier » | Erreur → la commande n'est pas transmise, alerte mail au domaine |
| 4 | Transmission | Le domaine valide (option : validation automatique) | Crée l'ordre d'expédition chez le logisticien choisi | API création d'expédition ; retour n° d'ordre | Accusé de réception API | Option | Échec API → 3 nouvelles tentatives, puis alerte + export PDF/CSV de secours |
| 5 | Préparation / enlèvement | Le domaine prépare le colis (ou stock chez le logisticien) | Récupère étiquette / documents si fournis | API documents | Documents présents | Oui (physique) | Documents manquants → statut bloqué visible |
| 6 | Suivi | L'acheteur reçoit le lien de suivi | Récupère les statuts (webhook ou interrogation toutes les 4 h), met à jour la commande, envoie le mail WooCommerce | API tracking | Statut cohérent | Non | Statut figé > 5 jours → alerte domaine |
| 7 | Clôture / incident | Le domaine voit le tableau de bord | Statistiques : délais, coûts, incidents, pays | Base Passavin | — | — | Casse / perte : lien vers procédure du logisticien (pas d'assurance portée par Passavin) |

**Données personnelles échangées** : nom, adresse, téléphone, e-mail de l'acheteur, contenu de commande → transmises au seul logisticien choisi. Passavin = sous-traitant RGPD du domaine ; hébergement UE.

## 5.3 Les 4 stratégies de lancement comparées

| Critère | 1. Extension WooCommerce | 2. SaaS indépendant multi-CMS | 3. Création de boutiques | 4. Modèle combiné |
|---|---|---|---|---|
| Coût MVP | **25-35 k€** | 80-120 k€ | ~0 (temps) | 60 k€ + |
| Délai MVP | **3-4 mois** | 8-12 mois | Immédiat | 6-9 mois |
| Complexité | Moyenne | Élevée | Faible | Élevée |
| Revenus récurrents | Oui | Oui | Faibles (maintenance) | Mixtes |
| Scalabilité | Bonne (un CMS) | Très bonne | **Nulle** (temps homme) | Moyenne |
| Vitesse de vente | Bonne (installation simple) | Moyenne | Bonne | Faible (offre floue) |
| Valeur pour un investisseur | Bonne | Bonne mais trop tôt | Faible | Faible (dispersion) |
| Conflit avec agences | Non (elles deviennent canal) | Non | **Oui** | Oui |

**Choix : 1. Extension WooCommerce**, avec un **back-office cloud léger** (moteur de règles + adaptateurs logisticiens) dès le départ, de façon à ajouter Shopify en année 2 sans tout réécrire. WooCommerce est cité avec PrestaShop et Shopify comme référence par les guides de la filière (aucune statistique de répartition trouvée : à mesurer en phase 1) et ses extensions s'installent sans validation d'une marketplace.

**Pourquoi pas un « no-code » d'abord ?** Un test avec Zapier/Make + formulaire est possible pour la **validation** (phase 0, voir 06), pas pour le produit : les règles au checkout imposent une vraie méthode d'expédition WooCommerce.

## 5.4 MVP (périmètre strict)

| Dans le MVP (v1, M4) | Hors MVP (v2+) |
|---|---|
| Méthode d'expédition WooCommerce avec éligibilité + tarif par logisticien | Shopify, PrestaShop (an 2) |
| 2 adaptateurs logisticiens (Planet Aura + 1 autre à signer) | Calcul de droits & taxes temps réel (si non fourni par le logisticien) |
| Transmission automatique ou validée des commandes | Gestion des stocks déportés multi-entrepôts |
| Suivi automatique + mails | Marque blanche pour logisticiens |
| File d'anomalies + alertes | Tableau de bord avancé, comparateur |
| Tableau de bord simple (commandes, statuts) | Application mobile |
| Facturation abonnement (Stripe) | Marketplace d'extensions |

**Ressources MVP** : 60 jours de développement freelance (≈ 30 k€ à 500 €/j [HYP]) + porteur en product owner. **Prérequis** : documentation API et accès bac à sable de 2 logisticiens, signés.

## 5.5 Différenciation et USP (après vérification de l'existant, voir 04)

- **Ce qui n'est pas innovant** : un plugin d'expédition WooCommerce (des dizaines existent), le suivi de colis, la synchronisation de commandes.
- **Ce qui est différenciant** : (1) la spécialisation **alcool à l'international vers des particuliers** que les agrégateurs généralistes refusent ou limitent ; (2) l'agrégation **de logisticiens vin** (et non de transporteurs) ; (3) des règles d'éligibilité maintenues avec les logisticiens ; (4) un modèle **neutre** non captif.
- **USP** : « Le connecteur **neutre** qui branche votre boutique à **plusieurs** logisticiens vin : vos clients étrangers ne voient que des destinations réellement livrables, au bon prix, et la commande part toute seule. » *(« le seul » est exclu : Hillebrand Gori propose déjà un plugin mono-logisticien.)*
- **Ne jamais promettre les États-Unis** : l'expédition directe d'un domaine français vers un particulier américain est interdite (three-tier, importateur obligatoire).
