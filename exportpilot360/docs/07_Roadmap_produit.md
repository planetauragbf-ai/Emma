# 07 — Feuille de route produit (3 phases)

Principe : **on ne construit une fonctionnalité que lorsque la précédente a prouvé sa valeur.** Chaque phase a des critères de passage chiffrés. Si une phase échoue, on corrige avant d'engager la suivante.

## Phase 1 — MVP « de la dégustation au réachat » (décembre 2026 → juin 2027)

| | |
|---|---|
| **Objectif** | Prouver que des visiteurs laissent leur contact et que certains recommandent depuis l'étranger |
| **Fonctionnalités** | QR code de dégustation et carnet (page web progressive, sans application à installer) · collecte de contacts avec consentement et déclaration de majorité · fiche client domaine · 3 relances automatiques en FR, EN et DE · page de réachat avec prix rendu fourni par **1 à 2 logisticiens** (API, ou grille importée à défaut) · transmission de la commande au partenaire · statut de suivi · tableau de bord simple |
| **Volontairement exclu** | Club, recommandations, intégrations e-shop et caisse, application mobile, IA générative au-delà de la traduction |
| **Compétences** | CTO cofondateur (architecture, back-end), développeur freelance (front, page web progressive), CEO (parcours, contenus, conformité, pilotes) |
| **Investissement** | ≈ 25 k€ de freelance + le temps des fondateurs + ≈ 3 k€ d'outils et d'hébergement (modèle : décembre 2026 → avril 2027) |
| **Délai** | Maquette cliquable en décembre 2026, version pilote fin février 2027, ouverture des pilotes en mars 2027 |
| **Risques** | Une API logisticien indisponible (repli : grille tarifaire importée et transmission de la commande par e-mail structuré) · un taux de capture faible au comptoir · une dérive du périmètre |
| **Objectifs mesurables** | 10 domaines pilotes équipés · ≥ 25 % des visiteurs exposés au QR laissent leur contact · ≥ 3 % des contacts recommandent sous 6 mois · au moins 1 commande internationale de bout en bout par domaine actif |
| **Passage à la phase 2** | ≥ 5 pilotes deviennent payants au 4e mois · NPS des domaines ≥ 30 · 2 logisticiens connectés · avis juridique favorable |

## Phase 2 — Développement « fidéliser et intégrer » (juillet 2027 → décembre 2028)

| | |
|---|---|
| **Objectif** | Rendre l'outil indispensable toute l'année et réduire le coût de mise en service |
| **Fonctionnalités** | Club et abonnements (coffrets, prélèvement) · scénarios d'hiver (Noël, millésime, primeurs) · 6 langues · rédaction assistée des campagnes avec garde-fous loi Évin · recommandations simples par règles · connecteurs WooCommerce, Shopify et PrestaShop · 1er connecteur de caisse viticole (partenariat) · 2e logisticien par destination · fiches destinations versionnées et validées par les partenaires · facturation et prélèvements automatisés de l'abonnement |
| **Compétences** | Développeur full-stack salarié (janvier 2028), CTO, BizDev ×2, alternant marketing |
| **Investissement** | Salaire du développeur (≈ 58 k€ chargés par an) + ≈ 5 k€ par an d'outils |
| **Risques** | Intégrations plus longues que prévu, demandes spécifiques de chaque domaine (dérive « sur mesure »), concurrence d'un éditeur de caisse qui ajoute un module CRM |
| **Objectifs mesurables** | 150 domaines actifs fin 2028 · churn ≤ 1,5 % par mois · ≥ 40 % des domaines actifs utilisent au moins un scénario d'hiver · temps de mise en service ≤ 2 h |
| **Passage à la phase 3** | ARR ≥ 200 k€ · LTV/CAC ≥ 3 mesuré (et non modélisé) · au moins 1 partenariat de distribution signé (interprofession, éditeur de caisse ou logisticien) |

## Phase 3 — Croissance « automatiser et étendre » (2029)

| | |
|---|---|
| **Objectif** | Densifier la France et préparer un premier pays européen |
| **Fonctionnalités** | Recommandations par modèle (données de 2 saisons) · réponse automatique au client final sur le statut de commande · module « Attirer » (connexion aux plateformes de réservation œnotouristique, page domaine multilingue) · API publique pour les partenaires · tableau de bord régional pour les prescripteurs (interprofessions, offices de tourisme) · version italienne et espagnole de l'interface |
| **Compétences** | Customer success (janvier 2029), un 2e développeur ou du freelance selon la trésorerie, un partenaire local en Italie ou en Espagne (agent commercial) |
| **Investissement** | Autofinancé par le récurrent dans le scénario central. Levée seed à envisager seulement si l'international est validé |
| **Risques** | Ouverture internationale trop précoce, dilution de l'équipe, réglementation des accises propre à chaque pays |
| **Objectifs mesurables** | 300 domaines actifs fin 2029 · EBE positif au 2nd semestre · 10 domaines pilotes dans un 2e pays · ≥ 30 % des nouveaux clients apportés par des prescripteurs |
| **Passage à l'échelle** | Rentabilité mensuelle durable · rétention nette ≥ 100 % · un pays pilote rentable par domaine acquis |

## Ce qui ne sera jamais construit (sauf changement de stratégie)
- Un moteur de calcul de taxes et de droits propre (c'est la responsabilité des partenaires).
- L'émission de documents douaniers ou d'accises.
- Une activité de transport ou de stockage.
- Une marketplace B2C qui vendrait le vin des domaines sous la marque ExportPilot.
