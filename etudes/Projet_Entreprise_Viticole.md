# Cuvéo, le service export des domaines qui n'en ont pas

*Projet de création d'entreprise indépendante, liée au secteur viticole. Document de travail v2, 25/10/2026. Il prolonge l'étude `Opportunites_Entrepreneuriales.md`.*

Conventions : **[FAIT]** = source publique citée · **[PB]** = donnée du Sales Playbook (document interne) · **[HYP]** = hypothèse à valider · **[À VÉRIFIER]** = point juridique ou administratif à confirmer par un professionnel.

---

## 0. En une page

> **Problématique :** *comment permettre aux petits et moyens domaines viticoles français de développer leurs ventes directes à l'international, sans disposer d'un service export, marketing et logistique dédié ?*

> **Promesse :** *un seul outil pour attirer, convertir, fidéliser et accompagner les commandes internationales, avec l'aide de partenaires spécialisés.*

| | |
|---|---|
| **L'entreprise** | Cuvéo (nom de travail, disponibilité INPI à vérifier), une plateforme SaaS adossée à un réseau de partenaires spécialisés (logistique, fiscalité, assurance, traduction, œnotourisme) |
| **Pour qui** | Domaines de 5 à 80 ha, avec caveau ou e-shop, qui reçoivent des clients étrangers mais n'ont personne pour l'export |
| **Ce qu'elle fait** | Elle joue le rôle du service export que le domaine ne peut pas embaucher : la technologie fait le travail répétitif, les partenaires exécutent ce qui demande un savoir-faire réglementé |
| **Indépendance** | Cuvéo ne vend pas de vin et ne transporte rien. Elle est neutre et multi-partenaires : le domaine garde son client, sa marge et choisit ses prestataires |
| **Modèle économique** | Abonnement (49 à 299 € par mois), commission de 2 % sur les commandes internationales, rémunération d'apport versée par les partenaires (transparente), services à la carte |
| **Chiffres (hypothèses)** | CA : 59 k€ en année 1, 309 k€ en année 2, 884 k€ en année 3 · rentable en année 3 (~22 %) · besoin de financement : 180 k€ |
| **Décision** | Go/no-go à J+60 sur 3 critères : 5 domaines payants, 2 partenaires logistiques signés, 1 commande internationale réussie de bout en bout |

---

## 1. La problématique

### 1.1 Le contexte : le marché français ne suffit plus
- **Le marché intérieur recule.** La consommation de vin en France a baissé de 3,2 % en 2025 [FAIT, OIV via Vinetur]. Les ventes au détail de rouges et rosés ont reculé de 8 % sur janvier-novembre 2025 par rapport à la moyenne des trois années précédentes [FAIT, Conseil de l'UE].
- **La filière se contracte.** Environ 27 000 ha de vignes sont arrachés ou prévus en 2026, après une première mesure de 120 M€ en 2024-2025 [FAIT, ministère de l'Agriculture, Vinetur].
- **L'export classique se durcit.** Les exportations de vins & spiritueux vers les USA, premier marché, ont chuté de 21 % en 2025 [PB, d'après FEVS].
- **La vente directe reste le canal le plus rémunérateur.** Le prix moyen y est près de 50 % supérieur à celui de la grande distribution [FAIT, source professionnelle des vignerons indépendants, à recouper].
- **La demande internationale vient jusqu'au domaine.** 5,4 millions d'œnotouristes étrangers ont été accueillis en 2023 [PB, d'après Atout France], et la France a reçu 102 millions de touristes internationaux en 2025 [FAIT, Atout France].

### 1.2 Pourquoi les petits et moyens domaines n'y arrivent pas
Vendre en direct à un client étranger, c'est enchaîner quatre métiers. Un domaine de 3 à 15 personnes n'en maîtrise aucun :

| Étape | Ce qu'il faudrait savoir faire | Ce qui se passe en réalité |
|---|---|---|
| **Attirer** | Se rendre visible des étrangers avant et pendant leur voyage : site multilingue, plateformes de réservation, réseaux de guides | Un site en français, des avis Google, le hasard des passages |
| **Convertir** | Donner un prix rendu chez le client (transport + taxes), encaisser, rassurer sur la casse et la douane | « Je ne peux pas vous l'envoyer » : 2 bouteilles au lieu de 12 [PB] |
| **Fidéliser** | Garder le contact, relancer dans la bonne langue, proposer un club, faire racheter à distance | Aucun fichier client exploitable. Le réachat est cité comme simple « bénéfice secondaire » même chez un logisticien spécialisé [PB] |
| **Accompagner** | Choisir le bon transporteur par pays, gérer les accises (UE), le DDP (USA), les certificats, l'assurance, le SAV en anglais | Des règles par pays et par État, une accise de destination intra-UE jugée « pratiquement prohibitive » par les vignerons indépendants européens [FAIT, CEVI], la fin du *de minimis* américain depuis le 29/08/2025 [FAIT] |

### 1.3 Ce que le marché propose aujourd'hui : des briques isolées
- **Logisticiens spécialisés** (commissionnaires vins, Hillebrand Gori eShipping avec représentation fiscale UE à partir de 0,40 € HT par bouteille [FAIT]). Ils excellent sur l'*accompagnement*, mais ne s'occupent ni d'attirer ni de fidéliser.
- **Logiciels de caisse et ERP viticoles** (Vitisoft, Wino) : encaissement, douane, mailings basiques [FAIT]. Rien pour l'international en direct.
- **Logiciels de club américains** (Commerce7, WineDirect) : anglophones et pensés pour les règles américaines [FAIT].
- **Marketplaces et clubs B2C** : ils vendent le vin du domaine, mais **captent le client** et une partie de la marge.
- **Consultants et agences export** : orientés vers la recherche d'importateurs (B2B), et trop chers pour un petit domaine [HYP].

**Le manque : personne ne relie les quatre étapes pour un petit domaine.** C'est ce manque que Cuvéo comble.

---

## 2. La solution : Cuvéo

### 2.1 Le principe
> **Cuvéo est le service export des domaines qui n'en ont pas : une plateforme qui fait le travail répétitif et un réseau de partenaires qui exécute le travail spécialisé.**

Le parcours du client étranger, de la découverte du domaine au réachat :
1. Avant le voyage, une **vitrine multilingue** et les réseaux de guides font découvrir le domaine *(Attirer)*.
2. Au caveau ou en ligne, un **prix rendu chez lui**, un paiement et une commande en 2 minutes *(Convertir)*.
3. Cuvéo **oriente la commande** vers le meilleur partenaire pour sa destination, qui expédie, dédouane, assure et livre *(Accompagner)*.
4. De retour chez lui, le client reçoit des **relances dans sa langue**, se voit proposer le club et peut racheter à distance *(Fidéliser)*.

### 2.2 Les quatre piliers de la promesse

| Pilier | Modules Cuvéo (technologie) | Partenaires spécialisés (exécution) | Résultat pour le domaine |
|---|---|---|---|
| **ATTIRER** | Vitrine multilingue générée par IA et relue (5 langues), fiche « We ship worldwide », kit comptoir, campagnes ciblées par nationalité vers les contacts existants | Plateformes de réservation œnotouristique, agences de wine tours, conciergeries, offices de tourisme, traducteurs professionnels | Plus de visiteurs étrangers qualifiés, et des visiteurs qui savent avant même d'arriver qu'ils pourront se faire livrer |
| **CONVERTIR** | Simulateur de prix rendu (transport + taxes + assurance) par pays via les API des partenaires, prise de commande au comptoir sur tablette, boutique internationale avec prix rendus, paiement multidevise | Prestataire de paiement agréé, logisticiens (tarifs et règles par pays) | Une vente de 12 bouteilles au lieu de 2, payée par le client final, sans avance de trésorerie |
| **FIDÉLISER** | Capture des contacts au comptoir (RGPD), CRM par nationalité, relances automatiques multilingues (nouveau millésime, Noël, anniversaire de visite), club et abonnements, mini-boutique « vos vins dégustés » | Traducteurs, éventuellement des agences de contenu | Un CA à distance toute l'année, y compris hors saison |
| **ACCOMPAGNER** | Routage de la commande vers le partenaire adapté (destination, volume, délai), suivi unifié, alertes, conformité intégrée (pays et États ouverts, quotas, documents), SAV de premier niveau multilingue assisté par IA | Commissionnaires spécialisés (USA en DDP, pays tiers), représentants fiscaux pour les accises UE, assureurs ad valorem, SAV de niveau 2 chez le partenaire | Zéro douane et zéro paperasse pour le domaine, un seul écran de suivi |

### 2.3 Le rôle des partenaires : la clé du modèle
- **Un principe : Cuvéo orchestre, les partenaires exécutent.** Le transport, le dédouanement, les accises et l'assurance sont des métiers réglementés et à responsabilité. Cuvéo ne les porte pas, mais choisit et coordonne ceux qui les portent.
- **Au moins deux partenaires par grande destination** (USA, UE, UK et Suisse, Asie) pour rester neutre et garantir la continuité de service.
- **Une charte partenaire** :
  - un SLA (délais de réponse, taux d'incident) ;
  - des tarifs publics identiques à ceux pratiqués en direct ;
  - un partage des données de suivi via API ;
  - une rémunération d'apport **affichée au domaine**.
- **Un intérêt partagé** : le partenaire logistique gagne des volumes qu'il n'aurait pas eus, puisque Cuvéo crée de la demande (attirer, fidéliser). Le domaine gagne un parcours complet. Cuvéo devient le canal d'acquisition des partenaires, pas leur concurrent.

### 2.4 Proposition de valeur par interlocuteur

| Interlocuteur | Ce qu'on lui dit | La preuve |
|---|---|---|
| Vigneron-propriétaire | « Vous vendez à l'étranger comme si vous aviez un service export, pour le prix d'un abonnement. » | Le CA international généré, visible sur le tableau de bord |
| Responsable caveau | « Un prix rendu en 20 secondes, la commande en 2 minutes, le reste est géré. » | Démonstration au comptoir avec ses vins |
| Client étranger | « Your favourite wines, delivered home, taxes included. » | Une boutique dans sa langue, un suivi en temps réel |
| Partenaire logistique | « Des commandes qualifiées, des données propres, zéro coût d'acquisition. » | Un volume apporté par trimestre |

**Pitch en 30 secondes :**
> « Les petits domaines reçoivent des clients du monde entier, mais n'ont ni service export, ni marketing, ni logistique. Résultat : ils vendent deux bouteilles et perdent le client. Cuvéo est leur service export clés en main. Il fait connaître le domaine aux étrangers, donne un prix rendu au comptoir, fait expédier la commande par des partenaires spécialisés et relance le client chez lui pour qu'il rachète. Un seul outil, et le domaine garde son client et sa marge. »

---

## 3. Le marché

### 3.1 Taille

| Niveau | Définition | Estimation | Statut |
|---|---|---|---|
| **TAM** | Exploitations viticoles françaises | 53 000 (2023) | [PB, d'après MASA/Agreste] |
| **SAM** | Domaines vendant en bouteille, avec caveau ou e-shop, recevant une clientèle étrangère, sans service export | ~8 000 | [HYP] : 63 % des caves particulières pratiquent la vente directe [FAIT, source professionnelle]. À fiabiliser via Sirene (NAF 01.21Z et 11.02A), FranceAgriMer, Vignobles & Découvertes |
| **SOM à 3 ans** | Domaines clients | 400 (5 % du SAM) | [HYP] |
| Flux d'affaires apporté aux partenaires | Commandes internationales orientées par Cuvéo en année 3 | ~11 M€ de vin, ~2,5 M€ de prestations logistiques | [HYP] : 280 domaines × 40 k€ de ventes internationales |

### 3.2 Cibles et priorités
1. **Cœur de cible :** domaines de 5 à 80 ha avec caveau touristique (Provence, Rhône, Bordeaux, Bourgogne, Loire, Alsace, Champagne de vignerons), prix moyen supérieur à 12 € par bouteille, au moins 10 visiteurs étrangers par semaine en saison, un e-shop existant ou envisagé.
2. **Deuxième cercle :** caves touristiques, petites distilleries et maisons de spiritueux artisanales.
3. **À exclure au départ :** les négociants B2B purs, les grands groupes déjà dotés d'un service export, les vins à moins de 8 € (transport trop lourd par rapport au prix [PB]).

### 3.3 Personas
| Persona | Situation | Ce qui le bloque | Ce qui le décide |
|---|---|---|---|
| **Le vigneron seul** (5-20 ha) | Fait tout, du chai au caveau | Le temps, la peur de la douane | Zéro travail en plus, rentable dès les premières commandes |
| **La responsable œnotourisme** (domaine de 20 à 80 ha) | Gère visites, boutique et saisonniers | Des visiteurs perdus, pas d'outil | Un parcours simple pour son équipe, des chiffres à présenter à sa direction |
| **Le domaine connecté** (e-shop existant) | Vend en ligne en France | Pas d'option internationale au checkout | Une boutique internationale aux prix rendus, branchée sur sa boutique |

### 3.4 Concurrence et positionnement

| Acteur | Attirer | Convertir | Fidéliser | Accompagner | Limite |
|---|---|---|---|---|---|
| Commissionnaires vins spécialisés (avec plateforme) | — | ✔ (simulateur) | ~ | ✔✔ | Un seul prestataire, pas de marketing ni de CRM |
| Hillebrand Gori eShipping / myBottlesDelivered [FAIT] | — | ~ | — | ✔✔ | Logistique et fiscalité uniquement |
| Logiciels de caisse et ERP viticoles [FAIT] | — | ~ (France) | ~ (mailing) | ~ (douane France) | Pas d'international en direct |
| Commerce7 / WineDirect [FAIT] | ~ | ✔ | ✔✔ | — | Anglophones, règles américaines |
| Marketplaces de vin | ✔✔ | ✔ | — | ✔ | Elles captent le client et la marge |
| Consultants et agences export | ✔ | — | — | ~ | B2B (importateurs), coûteux |
| **Cuvéo** | ✔ | ✔ | ✔✔ | ✔ (via partenaires) | **Seul acteur sur les 4 étapes, neutre, francophone** |

**Positionnement :** *le seul outil francophone qui couvre tout le parcours de vente directe internationale d'un petit domaine, en orchestrant des partenaires spécialisés plutôt qu'en les remplaçant.*

---

## 4. Business model

### 4.1 Sources de revenus [HYP, à tester en pilote]

| Source | Mécanique | Part estimée du CA en année 3 |
|---|---|---|
| **Abonnement** | **Départ** 49 € par mois (vitrine, capture des contacts, simulateur, commandes) · **Export** 149 € par mois (+ boutique internationale, relances multilingues, club) · **Export+** 299 € par mois (+ multi-sites, intégration caisse ou e-shop, campagnes, accompagnement dédié) | ~50 % |
| **Commission** | 2 % des commandes internationales passées par Cuvéo | ~25 % |
| **Rémunération d'apport des partenaires** | Pourcentage sur les prestations apportées (logistique, assurance), **affiché au domaine** | ~10 % |
| **Mise en place et services à la carte** | Mise en place 400 € · traduction professionnelle, shooting, campagne saisonnière | ~15 % |

### 4.2 ROI pour un domaine type (offre Export) [HYP]
- **Ventes au caveau converties à l'international** : 75 commandes × 300 € = 22 500 € (ordre de grandeur du modèle du playbook [PB]).
- **Réachat à distance et club** : 450 contacts captés, 40 membres du club × 4 coffrets × 120 €, plus 5 % des contacts × 200 €, soit environ 23 700 €.
- **Total : environ 46 000 € de ventes internationales directes par an.**
- **Coût Cuvéo** : 1 788 € d'abonnement + 920 € de commission = environ 2 700 € par an. Le transport est payé par le client final.
- **ROI : environ 17 fois le coût**, avec une marge de vente directe.

### 4.3 Économie unitaire de Cuvéo [HYP]

| Indicateur | Valeur |
|---|---|
| ARPA (revenu moyen par domaine et par an) | ~2 460 € (abonnement ~1 560 € + commission ~600 € + apport ~300 €) |
| Marge brute | ~80 % (hébergement, IA, paiements, SAV de premier niveau) |
| CAC | ~1 200 € (terrain, salons, démonstration) |
| Churn annuel | 12 % |
| LTV | 2 460 × 0,80 / 0,12 ≈ **16 400 €** |
| LTV / CAC | ≈ **14** |

---

## 5. Produit : une construction par étapes

La promesse couvre quatre étapes, mais tout ne se construit pas le premier jour. On commence là où la douleur est la plus forte et où personne n'apporte de réponse : **l'après-visite** (convertir à distance, accompagner, fidéliser).

| Version | Délai | Contenu | Pourquoi dans cet ordre |
|---|---|---|---|
| **V1 – MVP** | J+90 | Capture des contacts au comptoir, simulateur de prix rendu via l'API d'1 ou 2 partenaires, boutique internationale simple, routage des commandes, suivi unifié, relances automatiques en 3 langues | Prouver le cœur de la valeur : une commande internationale de bout en bout, sans effort pour le domaine |
| **V2** | 6-9 mois | Club et abonnements, 5 langues, intégration aux caisses et e-shops, 2e partenaire par destination, SAV multilingue assisté par IA | Récurrence et fidélisation, l'abonnement devient indispensable |
| **V3** | 12-18 mois | Pilier Attirer : vitrine multilingue, connexion aux plateformes œnotouristiques et aux agences de wine tours, campagnes par nationalité, tableau de bord de pilotage export | Le réseau de partenaires et la base clients rendent ce pilier crédible |

---

## 6. Stratégie de partenariats

| Type de partenaire | Rôle | Critères de sélection | Ce qu'il gagne |
|---|---|---|---|
| Commissionnaires spécialisés vins et spiritueux | Transport, douane, DDP USA, pays tiers, SAV logistique | Obligation de résultat, API disponible, filiale ou réseau aux USA, taux d'incident | Des volumes apportés, des données de commande propres |
| Représentants fiscaux UE | Accises de destination pour la vente à distance intra-UE | Agrément, couverture pays, prix par bouteille | Des flux UE mutualisés |
| Assureurs et courtiers | Assurance ad valorem casse et perte | Prix, procédure de sinistre | Des primes |
| Prestataire de paiement agréé | Encaissement multidevise, fonds versés directement au domaine | Agrément, compatibilité avec la vente d'alcool | Des transactions |
| Plateformes et agences œnotouristiques | Apport de visiteurs étrangers (pilier Attirer) | Audience internationale | Un argument de vente : « livraison à domicile possible » |
| Éditeurs de caisses et d'e-shops viticoles | Intégration et distribution | Base installée chez les domaines | Une fonctionnalité internationale sans la développer |

**Premier partenaire logistique :** un commissionnaire spécialisé doté d'une API et d'une présence aux USA (le playbook décrit précisément ce type d'acteur et son API gratuite [PB]). Pour rester neutre, un deuxième partenaire est signé avant la fin de la V2.

---

## 7. Stratégie commerciale et marketing

### 7.1 Obtenir les 10 premiers clients
1. **Quinze entretiens découverte** dans deux régions à forte clientèle étrangère (Provence et Bourgogne, par exemple), de novembre à mars, avant la saison.
2. **Offre « Pionniers Saison 2027 »** : mise en place offerte et 3 mois gratuits pour les 10 premiers, en échange d'un témoignage chiffré.
3. **Co-prospection avec le premier partenaire logistique** : il présente Cuvéo à ses domaines clients qui veulent aller plus loin (fidéliser, réachat). Cuvéo lui apporte de nouveaux domaines.
4. **Démonstration au comptoir** avec les vrais vins du domaine et la destination du dernier client étranger, la technique qui fonctionne le mieux d'après le playbook [PB].
5. **Calcul du ROI à voix haute** avec les chiffres du domaine (visiteurs, panier, nationalités).

### 7.2 Canaux
| Canal | Usage | Priorité |
|---|---|---|
| Terrain par appellation (basse saison) | Démonstration et signature | Très haute |
| Partenaires (logisticiens, éditeurs de caisses, offices de tourisme) | Prescription et co-vente | Très haute |
| Salons (Wine Paris, salons des vignerons) | Rendez-vous et visibilité | Haute |
| Webinaires « Vendre en direct à l'international sans service export » | Éducation et génération de leads | Moyenne |
| Presse viticole et LinkedIn (études de cas chiffrées) | Crédibilité | Moyenne |

### 7.3 Fidélisation des domaines
Rapport mensuel « vos ventes internationales », formation des saisonniers chaque printemps, score de santé client, communauté de domaines (bonnes pratiques export et club), bilan annuel chiffré au renouvellement.

---

## 8. Prévisionnel financier

### 8.1 Compte de résultat sur 3 ans [HYP]

| | Année 1 | Année 2 | Année 3 |
|---|---|---|---|
| Domaines clients en fin d'année | 35 | 160 | 400 |
| Domaines moyens sur l'année | 18 | 95 | 280 |
| CA récurrent (ARPA ≈ 2 460 € en années 1-2, 2 600 € en année 3) | 44 000 € | 234 000 € | 728 000 € |
| Mise en place (400 €, offerte aux 10 premiers) | 10 000 € | 50 000 € | 96 000 € |
| Services à la carte | 5 000 € | 25 000 € | 60 000 € |
| **Chiffre d'affaires total** | **59 000 €** | **309 000 €** | **884 000 €** |
| Salaires et charges | 50 000 € | 220 000 € | 450 000 € |
| Tech (développement, IA, hébergement, intégrations partenaires) | 40 000 € | 45 000 € | 70 000 € |
| Marketing, salons, déplacements | 25 000 € | 45 000 € | 100 000 € |
| Frais généraux (juridique, comptabilité, assurance) | 15 000 € | 30 000 € | 70 000 € |
| **Total charges** | **130 000 €** | **340 000 €** | **690 000 €** |
| **Résultat d'exploitation** | **−71 000 €** | **−31 000 €** | **+194 000 € (22 %)** |

**Hypothèses.**
- Année 1 : 2 fondateurs (commercial et CTO) à rémunération réduite, avec maintien des droits [À VÉRIFIER], plus un développeur freelance pour les intégrations.
- Année 2 : 5 personnes (+2 commerciaux terrain, +1 support et partenariats).
- Année 3 : 10 personnes.
- 12 % de churn, 70 % des signatures entre novembre et avril.

**Vision à 5 ans [HYP] :** de 800 à 1 200 domaines, avec l'ouverture de l'Italie et de l'Espagne (mêmes problématiques, mêmes partenaires logistiques), soit 2 à 3 M€ de CA et 25 à 30 % de marge.

### 8.2 Plan de financement

Pertes cumulées sur 2 ans : environ 102 000 €. Avec une marge de sécurité, le **besoin est de 180 000 €**.

| Ressource | Montant | Statut |
|---|---|---|
| Apport des fondateurs | 20 000 € | [HYP] |
| Prêts d'honneur (Initiative France, Réseau Entreprendre), un par fondateur | 60 000 € | [À VÉRIFIER] |
| Bourse French Tech (Bpifrance) | 30 000 € | [À VÉRIFIER] |
| Prêt bancaire adossé aux prêts d'honneur | 50 000 € | [HYP] |
| Business angels de la filière vin ou love money | 20 000 € | [HYP] |
| **Total** | **180 000 €** | |

---

## 9. Organisation, cadre juridique et ressources

### 9.1 Équipe et moyens
| Besoin | Solution |
|---|---|
| Fondateurs | Un profil commercial de la filière (caveaux, clientèle étrangère, logistique vin) + un CTO (web, API, paiements, IA) |
| Statut | SAS |
| Tech | Application web et tablette, API des partenaires, prestataire de paiement, LLM pour la traduction et le SAV de premier niveau, hébergement UE |
| Conseil | Avocat (droit des transports, vente d'alcool à distance, loi Évin, RGPD), expert-comptable, mentors de la filière |

### 9.2 Le cadre juridique de l'indépendance [À VÉRIFIER avec un avocat]
- **Le domaine est le vendeur.** Cuvéo est un éditeur de logiciel et un apporteur d'affaires. Il n'a besoin d'aucune licence de vente d'alcool.
- **Le partenaire logistique est le commissionnaire.** Le contrat de transport est conclu entre le domaine et le partenaire via la plateforme (conditions générales tripartites). Cuvéo ne doit pas organiser le transport en son nom propre, sous peine d'être requalifié en commissionnaire de transport, une activité réglementée.
- **Paiements** : un prestataire agréé, avec des fonds versés directement au domaine. Cuvéo ne doit pas encaisser pour le compte de tiers.
- **Transparence de l'apport** : la rémunération reçue des partenaires est affichée au domaine, et les tarifs ne doivent pas être plus élevés qu'en direct.
- **Loi Évin** (contenu des relances), **contrôle de majorité**, **RGPD** (consentement au comptoir, contrat de sous-traitance avec chaque domaine).
- **Règles par pays** (pays et États ouverts, quotas, accises) : appliquées par le partenaire, affichées et bloquées en amont par la plateforme.

### 9.3 Point d'éthique personnelle
Si le porteur de projet est salarié d'un commissionnaire de transport vins, il doit vérifier ses clauses de loyauté et de non-concurrence. Cuvéo ne transporte pas : il apporte des commandes aux logisticiens. Le présenter à l'employeur comme un **partenariat** est cohérent, mais doit se faire en toute transparence et avant tout démarchage.

---

## 10. Risques et parades

| Risque | Probabilité | Parade |
|---|---|---|
| **Promesse trop large** pour une jeune équipe | Élevée | Construction par étapes (V1 centrée sur l'après-visite), les partenaires exécutant ce qui est réglementé |
| Les domaines paient peu pour du logiciel | Élevée | ROI chiffré sur leurs chiffres, offre d'entrée à 49 €, une part du revenu au succès (commission) |
| Les logisticiens voient Cuvéo comme un concurrent de leur plateforme | Moyenne | Être leur canal d'acquisition : apport de commandes, données propres, pas de prestation logistique en propre |
| Dépendance à un seul partenaire | Moyenne | Deux partenaires par destination dès la V2 |
| Incident de livraison qui nuit à la marque Cuvéo | Moyenne | SLA dans la charte partenaire, suivi proactif, procédure de sinistre portée par le partenaire et expliquée en amont |
| Requalification juridique (commissionnaire, intermédiaire de paiement) | Faible à moyenne | Architecture contractuelle validée par un avocat avant le lancement |
| Arrivée d'un acteur américain ou d'un ERP viticole sur le créneau | Moyenne | Vitesse, ancrage local, réseau de partenaires français, intégrations plutôt que concurrence frontale |
| Politique commerciale (droits US, accises UE) | Moyenne | Multi-destinations. Une simplification réglementaire (guichet unique des accises) rendrait d'ailleurs la vente intra-UE plus facile pour les domaines |

---

## 11. Feuille de route sur 90 jours

| Période | Objectifs | Livrables | Critère de passage |
|---|---|---|---|
| **J1-J20** | Valider le problème | 15 entretiens de domaines, 3 entretiens de logisticiens, TAM et SAM fiabilisés, nom vérifié à l'INPI | Au moins 10 domaines sur 15 confirment le besoin sur au moins 2 piliers |
| **J21-J40** | Structurer | Maquette cliquable du parcours complet, architecture juridique validée, choix du prestataire de paiement, accord de partenariat avec 1 commissionnaire (API) | 5 lettres d'intention de domaines, 1 partenaire signé |
| **J41-J60** | Construire le MVP | Capture des contacts, simulateur via l'API du partenaire, boutique internationale, routage des commandes, suivi, relances en 3 langues | **Go/no-go : 5 domaines prêts à payer, 2 partenaires logistiques engagés, 1 commande internationale réussie de bout en bout** |
| **J61-J90** | Prouver et vendre | 3 domaines pilotes actifs, 1 étude de cas chiffrée, dossiers de prêts d'honneur déposés, présence sur un salon | 10 domaines signés à J+150 |

### Indicateurs de pilotage
- **Indicateur principal** : CA international généré pour les domaines.
- **Attirer** : contacts captés par domaine, part des visiteurs étrangers.
- **Convertir** : taux de commande après simulation, panier moyen international.
- **Fidéliser** : membres du club, taux de réachat à 12 mois.
- **Accompagner** : taux d'incident, délai de livraison réel par rapport à l'estimation, satisfaction du client final.
- **Cuvéo** : MRR, churn, CAC, LTV/CAC, volume apporté par partenaire.

---

## 12. Conclusion

La problématique est réelle et actuelle. Le marché intérieur recule et l'export classique se durcit, alors que la clientèle internationale vient jusqu'aux caveaux. Pourtant, les petits et moyens domaines n'ont ni service export, ni marketing, ni logistique pour la transformer en ventes durables.

**Cuvéo tient la promesse en combinant deux choses que le marché propose séparément :**
- une **plateforme** qui relie les quatre étapes (attirer, convertir, fidéliser, accompagner) ;
- un **réseau de partenaires spécialisés** qui portent les métiers réglementés.

L'entreprise reste indépendante, légère en capital (180 k€) et récurrente. Sa crédibilité se joue sur une preuve simple, à obtenir dès J+60 : **une première commande internationale réussie de bout en bout, sans que le domaine ait touché à la douane.**

---

## Sources

- Vinetur, arrachage 2026, consommation et exportations 2025 : [vinetur.com](https://www.vinetur.com/fr/20261008108580/france-will-remove-27000-hectares-of-vines-after-demand-for-wine-slumps.html)
- Conseil de l'UE, situation du marché du vin : [data.consilium.europa.eu](https://data.consilium.europa.eu/doc/document/ST-7910-2026-INIT/fr/pdf)
- Ministère de l'Agriculture : [agriculture.gouv.fr](https://agriculture.gouv.fr/telecharger/154707)
- Pleinchamp : [pleinchamp.com](https://www.pleinchamp.com/actualite/viticulture-des-vignes-arrachees-face-a-une-crise-qui-s-enracine)
- Vente directe : [DRAAF Nouvelle-Aquitaine](https://draaf.nouvelle-aquitaine.agriculture.gouv.fr/IMG/pdf/Regards_circuits_courts_vin_24_25_cle881546.pdf), [Vignerons indépendants (vsnews)](https://www.vsnews.fr/images/Le_commerce_intracommunautaire_des_vins_a_destination_des_particuliers_-_Propositions_de_reforme.pdf)
- Atout France, fréquentation 2025 : [atout-france.fr](https://www.atout-france.fr/fr/print/pdf/node/175)
- CEVI, accises et vente à distance : [cevi-eciw.eu](https://www.cevi-eciw.eu/policy-focus/selling-wine-in-europe-the-excise-duty-challenge) · Commission européenne : [taxation-customs.ec.europa.eu](https://taxation-customs.ec.europa.eu/taxation/excise-duties/common-excise-duty-provisions/distance-selling-excise-goods_en)
- Fin du *de minimis* américain : [FedEx Regulatory News](https://www.fedex.com/en-ar/regulatory-news.html), [Blog du Modérateur](https://www.blogdumoderateur.com/la-poste-suspend-envoi-colis-etats-unis/)
- Hillebrand Gori eShipping : [hillebrandgori.com](https://www.hillebrandgori.com/faq/eshipping)
- Logiciels de club et DTC : [Commerce7](https://commerce7.com/book-your-demo), [SVB / First Citizens, DTC Report 2026](https://www.firstcitizens.com/content/dam/firstcitizens/pdfs/commercial/expertise/wine/dtc-report-2026.pdf)
- Logiciels de caisse et ERP viticoles : [Appvizer, Vitisoft](https://www.appvizer.fr/operations/erp/vitisoft), [Wino](https://independant.io/avis/wino/)
- Clubs de vin en France : [Agra, Club Français du Vin](https://www.agra.fr/agra-innovation/le-club-francais-du-vin-cree-oenolia)
- Sales Playbook 2026 (document interne, pages 1 à 70) : données marquées [PB]
