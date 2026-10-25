# 10 — Analyse des risques

Échelle : probabilité (P) et impact (I) notés de 1 à 5. Criticité = P × I.

## 1. Distinguer l'assistance logicielle des responsabilités juridiques

| Acte | Qui en porte la responsabilité | Rôle d'ExportPilot 360 |
|---|---|---|
| Vente du vin au client final (prix, facture, TVA, majorité, droit de rétractation) | **Le domaine**, vendeur | Il fournit l'outil de commande et rappelle les mentions obligatoires |
| Transport, dédouanement, DDP, assurance, sinistres | **Le commissionnaire de transport** partenaire (obligation de résultat) | Il transmet la commande, affiche les statuts et oriente le client |
| Accises de destination dans l'UE (vente à distance) | **Le représentant fiscal** ou le partenaire logistique | Il affiche l'information fournie par le partenaire |
| Documents d'accompagnement d'accises (DAE/DSA), DRM | **L'entrepositaire agréé** (le domaine) ou son partenaire | Rien : hors périmètre |
| Estimation des taxes et du prix rendu | **Le partenaire** qui la fournit | Il l'affiche avec la mention « estimation fournie par [partenaire], non contractuelle » |
| Données personnelles des visiteurs | **Le domaine** (responsable de traitement) | **Sous-traitant RGPD** : contrat, hébergement UE, sécurité |
| Contenu des relances (loi Évin) | **Le domaine** (annonceur) | Il fournit des modèles conformes, des garde-fous et une validation obligatoire |

*Ce schéma est à faire valider par un avocat (droit des transports, droit de l'alcool, RGPD) **avant le lancement** : budget de 5 500 € prévu en ante-création.*

## 2. Matrice des risques

| # | Risque | P | I | Crit. | Mesures de réduction | Signal d'alerte |
|---|---|---|---|---|---|---|
| R1 | **Adoption insuffisante** (les domaines ne paient pas, ou l'équipe du caveau n'utilise pas le QR) | 4 | 5 | **20** | Pilotes gratuits mesurés avant toute levée · parcours en moins de 30 s · formation de l'équipe incluse · variable des BizDev sur l'activation et non sur la signature | Taux de capture < 15 %, < 5 pilotes payants |
| R2 | **Rentabilité trop tardive** (le point mort glisse au-delà de 2029) | 3 | 5 | **15** | Plan de gel des recrutements (jalon au 30 juin 2028) · coûts majoritairement variables la première année · seed seulement si la traction est prouvée | Moins de 70 domaines actifs au 30 juin 2028 |
| R3 | **Dépendance aux logisticiens** (refus de connexion, conditions dégradées) | 3 | 4 | 12 | Au moins 2 partenaires par destination · repli par grille importée et e-mail structuré · proposition de valeur pour eux (commandes apportées sans coût d'acquisition) | Un seul partenaire actif à 6 mois |
| R4 | **Concurrence** (un éditeur de caisse ou d'ERP, un logiciel américain de club ou un logisticien ajoute un module CRM) | 3 | 4 | 12 | Vitesse, neutralité multi-partenaires, intégration plutôt qu'affrontement, densité régionale | Annonce d'un module concurrent |
| R5 | **Saisonnalité** (résiliation l'hiver, trésorerie irrégulière) | 4 | 3 | 12 | Engagement 12 mois · scénarios d'hiver · bilan de saison en octobre · 70 % des ventes entre novembre et avril | Churn > 2 % sur un trimestre |
| R6 | **Difficultés de financement** (BA ou banque non obtenus) | 3 | 4 | 12 | Plan de financement diversifié (prêts d'honneur, subvention, banque, BA) · version « bootstrap » : MVP en no-code et lancement dans une seule région | Moins de 150 k€ sécurisés à mars 2027 |
| R7 | **Coût de développement trop élevé** (dérive du MVP) | 3 | 3 | 9 | Périmètre MVP figé (voir 07) · freelance au forfait · revue hebdomadaire du périmètre | Dépassement > 20 % du budget MVP |
| R8 | **Complexité des intégrations** (API hétérogènes ou absentes) | 4 | 2 | 8 | Couche de connecteurs normalisée · repli par fichiers · priorisation des 2 partenaires les plus demandés | > 2 semaines par connecteur |
| R9 | **Contraintes de vente d'alcool** (loi Évin, majorité, paiement de l'alcool chez certains prestataires) | 3 | 3 | 9 | Avis d'avocat · modèles de contenus conformes · déclaration de majorité · choix d'un prestataire de paiement acceptant les boissons alcoolisées [À VÉRIFIER] | Refus d'un prestataire de paiement |
| R10 | **Fiscalité et formalités d'exportation** (erreur d'estimation, colis bloqué) | 2 | 4 | 8 | Estimations toujours fournies par les partenaires · mention non contractuelle · aucun conseil fiscal · fiches destinations datées et validées | Réclamation client liée à une taxe |
| R11 | **Protection des données** (fuite, non-conformité RGPD) | 2 | 4 | 8 | Hébergement UE, chiffrement, contrat de sous-traitance, registre des traitements, consentement explicite, export des données à la demande | Incident de sécurité |
| R12 | **Dépendance aux fondateurs** (CTO absent ou départ) | 3 | 4 | 12 | Recrutement d'un CTO associé avec vesting · documentation du code · freelance de secours | Pas de CTO en mars 2027 |
| R13 | **Conflit d'intérêts avec l'ancien employeur** | 2 | 3 | 6 | Aucune donnée ni aucun client repris · vérification des clauses · information de la direction · partenariat aux mêmes conditions que les autres logisticiens | — |

## 3. Les trois risques qui décident de tout
1. **R1, l'adoption.** C'est l'hypothèse fondatrice. On la teste en premier, à faible coût (10 pilotes).
2. **R2, la rentabilité tardive.** Le plan de gel ramène le besoin du scénario pessimiste d'environ −240 k€ à environ −16 k€ de trésorerie minimale.
3. **R3, la dépendance aux partenaires.** La neutralité multi-partenaires et le repli par fichiers rendent le produit utilisable même sans API.
