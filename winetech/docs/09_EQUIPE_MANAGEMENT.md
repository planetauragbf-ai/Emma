# Management de l'équipe et du réseau commercial (V2 — cœur du Bloc 3)

> Aucune compétence, aucun diplôme, aucun associé n'est inventé. Le seul profil connu est le **porteur du projet** (`[Nom Prénom]`, `[Promotion]`), commercial dans le transport de vin pour les particuliers à l'international. Tous les autres postes sont **à recruter**.
> Les objectifs chiffrés sont ceux du scénario central de `outils/bp_model.py` (voir `13_BP_V2_RESULTATS.md`) : un objectif qui change dans le modèle change ici.

## 9.1 Vue d'ensemble : qui produit le chiffre d'affaires ?

| Ressource | Type | Arrivée (central) | Nouveaux domaines an 1 / an 2 / an 3 | Ligne de CA produite |
|---|---|---|---|---|
| Dirigeant·e (porteur) | Interne | M0 | 22 / 22 / 10 | Abonnements FR ; 1ʳᵉ licence marque blanche (M15) |
| Sales France (chasse) | Interne | M10 | 6 / 51 / 80 | Abonnements + installations FR |
| Sales Italie | Interne (salarié·e en Italie via Employer of Record) | M17 | 0 / 30 / 64 | Abonnements + installations IT |
| Sales Espagne & Portugal | Interne (salarié·e en Espagne via EOR) | M20 | 0 / 11 / 50 | Abonnements + installations ES, PT |
| Partner manager | Interne | M13 | — (pilote le réseau) | Licences marque blanche ; réseau agences et apporteurs |
| Customer success ×2 | Interne | M16, M26 | — (protège le chiffre) | Rétention (résiliation ≤ 1,5 %), montée en gamme Pro |
| Alternant·e SDR & marketing | Interne | M13 | — (prend les rendez-vous) | Alimente les sales |
| Agences Silver | Réseau externe | M10 → 21 à M36 | 2 / 19 / 59 | Abonnements (sans installation facturée par Passavin) |
| Agences Gold | Réseau externe | M16 → 6 à M36 | 0 / 13 / 41 | Abonnements |
| Apporteurs d'affaires | Réseau externe | M8 → 20 à M36 | 4 / 23 / 45 | Abonnements + installations |
| Logisticiens revendeurs | Réseau externe (clients de l'offre Partner) | M15, M22, M28, M33 | 0 / 27 / 137 domaines activés (stock) | Licences, mise en place, frais par expédition |
| **Total domaines Direct signés** | | | **33 / 170 / 348** | |

**Règle de pilotage** : chaque ressource a une productivité, une rampe et un seuil d'embauche dans le modèle. Le CA n'existe que si la ressource existe : si un recrutement est reporté, sa ligne de CA l'est aussi.

## 9.2 L'équipe commerciale interne

### Dirigeant·e — vente, partenariats stratégiques, management

| Élément | Contenu |
|---|---|
| Rôle | An 1 : seul commercial (pilotes, réseau terrain hors fichiers de l'employeur actuel). An 2-3 : manager de l'équipe, comptes stratégiques, licences marque blanche, levée de fonds |
| Objectifs SMART | 22 domaines signés entre M5 et M12 ; 2 logisticiens intégrés et 1 lettre d'intention de licence avant M12 ; seed bouclée à M12 ; 1ʳᵉ licence signée à M15 ; 22 domaines en an 2 et 10 en an 3 |
| Rémunération | 0 € en an 1 (allocations chômage ou ARCE à confirmer) ; 2 500 € brut/mois en an 2 ; 3 500 € en an 3 ; pas de variable (actionnaire) |
| Formation | Gestion financière d'une SAS, management d'une première équipe, droit des contrats SaaS et RGPD (≈ 2 000 €, finançable en partie par le CPF) |

### Sales France — chasse, puis gestion des comptes jusqu'à l'arrivée du customer success

| Élément | Contenu |
|---|---|
| Rôle | Prospecter les domaines français (boutique sur un CMS couvert, ventes à l'étranger), faire les démonstrations, signer, installer les domaines non apportés par une agence ; suivre ses comptes pendant les 90 premiers jours |
| Objectifs SMART | **An 2 : 51 domaines signés** ; **an 3 : 80** (≈ 6 à 7 par mois) ; ≥ 30 démos par mois ; conversion démo → client ≥ 25 % ; ≥ 45 % des signatures en offre Pro ou Expert ; résiliation de son portefeuille à 90 jours ≤ 5 % |
| Productivité modélisée | 8 signatures/mois si 100 % du vivier est couvert. Couverture réelle : 47 % avec WooCommerce seul, 65 % avec Shopify (M18), 100 % avec PrestaShop (M25). S'y ajoutent une rampe de 3 mois et une baisse quand le SAM se remplit |
| Rémunération | Fixe 32 k€ brut + variable de **15 % de la première année d'abonnement signée** (≈ 170 € par domaine), versé chaque trimestre ; récupéré si le client résilie avant 3 mois ; plafonné à 200 % de l'objectif. Au quota de l'an 3, la rémunération cible (fixe + variable) est d'environ 45 k€ |
| Profil | 2-5 ans de vente B2B SaaS aux TPE-PME ou au monde du vin ; anglais courant ; mobilité salons |

### Sales Italie et Sales Espagne & Portugal — ouverture des marchés

| Élément | Sales Italie | Sales Espagne & Portugal |
|---|---|---|
| Rôle | Ouvrir le marché italien : prospection directe, salons (Vinitaly), recrutement des premières agences italiennes avec le partner manager, retours produit (traductions, usages locaux) | Même rôle en Espagne (Fenavin, Barcelona Wine Week), puis au Portugal (portugais ou espagnol + anglais) |
| Déclenchement | Prévu à M16, si ≥ 60 domaines actifs → **M17** en central | Prévu à M19, si ≥ 90 domaines actifs → **M20** en central |
| Objectifs SMART | **30 domaines** de M17 à M24 ; **64 en an 3** (≈ 5 par mois) ; 3 agences italiennes actives à M28, 5 à M34 | **11 domaines** de M20 à M24 ; **50 en an 3** (≈ 4 par mois) ; 3 agences espagnoles actives à M30 ; 1 agence portugaise à M31 |
| Productivité nominale | 6/mois à couverture complète, rampe de 4 mois | 5/mois, rampe de 4 mois (vivier plus petit) |
| Rémunération | Même mécanisme que la France : fixe 32 k€ brut + 15 % de la 1ʳᵉ année signée ; employé·e localement via un Employer of Record (≈ 450 €/mois, inclus dans le BP) | Idem |
| Profil | Italien·ne natif·ve ou bilingue, réseau dans les consorzi ou chez les logisticiens | Espagnol·e natif·ve ou bilingue, portugais apprécié |

### Partner manager — agences, apporteurs, logisticiens revendeurs

| Élément | Contenu |
|---|---|
| Rôle | Recruter, former et animer le réseau externe ; co-vendre les licences marque blanche avec le dirigeant ; tenir le portail partenaires du CRM |
| Objectifs SMART | **Agences actives** : 9 à M24, 27 à M36 (France 14 dont 4 Gold, Italie 5, Espagne 5, Allemagne 2, Portugal 1) ; **apporteurs actifs** : 13 à M24, 20 à M36 ; **domaines apportés par les agences** : 32 en an 2, 100 en an 3 ; **par les apporteurs** : 23 puis 45 ; **licences** : 2 à M24, 4 à M36 |
| Rémunération | Fixe 38 k€ brut + 1 500 € par licence signée + 50 € par domaine apporté par une agence (≈ 8 k€ de variable en an 3) |
| Profil | Animation de réseau de revendeurs ou de partenaires SaaS ; connaissance des agences WordPress/Shopify ou de la logistique |

### Customer success (×2) et alternant·e SDR

| Élément | Customer success FR/EN (M16) puis IT/ES (M26) | Alternant·e SDR & marketing (M13) |
|---|---|---|
| Rôle | Installation, activation, support, renouvellement, montée en gamme ; reprend les comptes des sales après 90 jours | Qualifier les prospects et prendre des rendez-vous pour les sales ; contenus (guides, webinaires) |
| Objectifs SMART | Résiliation ≤ 1,5 %/mois ; activation à 14 jours ≥ 80 % ; ARPA ≥ 94 € ; NPS ≥ 40 ; 1ʳᵉ réponse ≤ 4 h ouvrées | 25 démos qualifiées/mois réservées pour les sales ; 2 contenus/mois ; 1 webinaire/trimestre |
| Rémunération | Enveloppe 32 k€ brut (fixe 30 k€ + prime annuelle de rétention ≤ 2 k€) | Coût net ≈ 1 000 €/mois après aide |

## 9.3 Le réseau commercial externe

### Agences web partenaires — programme Silver et Gold

| Élément | **Silver** | **Gold** |
|---|---|---|
| Accès | Agence WordPress/WooCommerce, Shopify ou PrestaShop, ≥ 10 clients dans le vin ; certification réussie | ≥ 12 domaines actifs apportés sur 12 mois **ou** ≥ 1 nouveau domaine par mois sur 2 trimestres |
| Objectif SMART | ≥ 1 domaine signé par trimestre (modèle : 0,4/mois) | ≥ 1,2 domaine signé par mois |
| Rémunération | **20 % de l'abonnement, chaque mois, pendant toute la vie du client** ; l'agence facture elle-même l'installation | **25 %** récurrent + budget de co-marketing (500 €/an) + leads redirigés dans sa zone |
| Avantages | Kit, compte démo, annuaire partenaires, support partenaire | + accès bêta, comité consultatif produit, présence sur le stand Passavin |
| Recrutement | Annuaires Shopify Partners et PrestaShop Partners ; agences repérées sur les sites de domaines (mention « réalisé par ») ; WordCamp, Vinexpo, Vinitaly | Promotion des meilleures Silver |
| Intégration et formation | Certification de 2 h en e-learning (FR/IT/ES) + 1ʳᵉ installation accompagnée par le customer success | + formation avancée (multi-logisticiens, marque blanche) |
| Animation | Newsletter mensuelle ; webinaire trimestriel « nouveautés » ; enregistrement des affaires dans le CRM (protection 90 jours) ; challenge annuel « Partenaire de l'année » | + revue trimestrielle individuelle avec le partner manager |
| Indicateurs | Domaines signés par trimestre ; activation à 14 jours ; résiliation de leur portefeuille ; délai d'installation | Idem + NPS de leurs clients |
| Sous-performance | 0 domaine en 6 mois → plan de relance de 90 jours (co-prospection, webinaire commun) ; sans résultat → agence « inactive » (retrait de l'annuaire, **commissions maintenues** sur les clients existants) | Sous le seuil 2 trimestres de suite → retour en Silver |

### Apporteurs d'affaires (consultants vin, œnologues, syndicats d'appellation)

| Élément | Contenu |
|---|---|
| Rôle | Recommander Passavin aux domaines qu'ils conseillent ; organiser un atelier de 20 minutes (syndicats) |
| Objectifs SMART | 3 domaines signés par an et par apporteur (modèle : 0,25/mois) ; 20 apporteurs actifs à M36 (France 12, Italie 4, Espagne 4) |
| Rémunération | **250 € par domaine signé et toujours actif après 3 mois** ; bonus de 500 € au 6ᵉ domaine de l'année. Syndicats et associations : pas de commission individuelle, mais un **tarif adhérent (−10 %)** et un atelier offert, pour éviter tout conflit d'intérêts |
| Recrutement | Réseau du dirigeant ; interventions aux assemblées générales des syndicats ; annuaires d'œnologues-conseils |
| Intégration et formation | Contrat d'apporteur non exclusif ; kit (fiche, vidéo de 3 min, calculateur de gain) ; formation de 45 minutes |
| Animation | Réunion semestrielle ; lien de recommandation suivi dans le CRM ; information à chaque signature |
| Indicateurs | Recommandations transmises, taux de conversion, domaines actifs |
| Sous-performance | Aucune recommandation en 6 mois → contrat mis en sommeil (pas de coût fixe) |

### Logisticiens revendeurs (offre Passavin Partner)

| Élément | Contenu |
|---|---|
| Rôle | Proposer le connecteur, à leur marque, à leurs domaines clients ; former leurs commerciaux ; assurer le support de niveau 1 |
| Objectifs SMART (contrat) | Mise en service 2 mois après la signature ; 2 domaines activés par mois pendant 3 mois, puis 4 par mois ; ≥ 40 domaines activés la première année du contrat |
| Rémunération et incitation | Ils **paient** une licence (690 à 2 490 €/mois) ; incitation par la dégressivité des frais par expédition et le co-marketing |
| Recrutement | Dirigeant + partner manager : liste de 15 logisticiens vin européens (dont des acteurs qui ont déjà un module maison peu adopté) ; preuve par les domaines Direct déjà connectés |
| Intégration et formation | Atelier de lancement ; adaptateur API en 6-8 semaines ; 2 sessions de formation de leurs commerciaux ; kit à leur marque |
| Animation | Comité de pilotage trimestriel (activation, incidents, feuille de route API) ; tableau de bord partagé |
| Indicateurs | Domaines activés, expéditions/mois, taux d'erreur, NPS de leurs domaines |
| Sous-performance | < 50 % de l'objectif d'activation à 6 mois → plan conjoint (webinaire co-animé, campagne vers leur base) ; la licence minimale reste due (contrat de 24 mois) |

**Neutralité** : mêmes conditions pour tous les logisticiens, Planet Aura compris ; aucun logisticien ne voit les données d'un autre.

## 9.4 Recrutement, intégration et formation de l'équipe interne

| Étape | Pratique |
|---|---|
| Déclenchement | Le poste n'est ouvert que si le jalon est atteint (domaines actifs) **et** si la trésorerie couvre ≥ 6 mois du burn (règle codée dans le modèle) |
| Fiche de poste | Missions, objectifs SMART de l'année, rémunération fixe + variable écrite, rampe de quota |
| Canaux | Welcome to the Jungle, LinkedIn, APEC, écoles (dont Euridis) ; Italie : LinkedIn, InfoJobs Italia, réseau Vinitaly ; Espagne : InfoJobs, Tecnovino ; cooptation (prime de 1 000 €) |
| Sélection | 4 temps : appel de 30 min ; entretien structuré (compétences, motivation) ; **jeu de rôle** : démo de Passavin à un vigneron sceptique ; prise de références |
| Intégration (30-60-90 jours) | Semaine 1 : immersion chez un domaine client et chez un logisticien partenaire, formation produit et réglementation (accises, pays exclus dont les États-Unis). J+30 : démo certifiée, accompagnement en binôme. J+60 : portefeuille propre, quota à 33 puis 66 %. J+90 : quota plein (rampe de 3 à 4 mois dans le modèle) |
| Formation continue | Playbook commercial (Notion) ; coaching sur enregistrements d'appels ; 1 000 €/an/salarié ; mise à jour réglementaire semestrielle par un logisticien partenaire |
| Saisonnalité du métier | Vendanges (sept.-oct.) : peu de prospection directe, priorité aux agences et au contenu ; salons (janv.-mars) : pic de rendez-vous ; Noël (nov.-déc.) : pic d'expéditions, priorité au support |

## 9.5 Animation : rituels, outils, challenges

| Rituel | Fréquence | Participants | Objet |
|---|---|---|---|
| Revue de pipeline | Hebdomadaire, 45 min (lundi) | Dirigeant + sales + alternant·e | Affaires de la semaine, prévision du mois, blocages |
| Point individuel (1:1) | Hebdomadaire (sales), bimensuel (autres) | Manager + collaborateur·rice | Activité, coaching, moral |
| Revue d'activité mensuelle | Mensuelle | Toute l'équipe | Tableau de bord : objectifs vs réalisé, décisions |
| OKR trimestriels | Trimestrielle | Toute l'équipe | Bilan et nouveaux objectifs |
| Revue partenaires | Trimestrielle | Partner manager + agences Gold + logisticiens | Activation, feuille de route |
| Séminaire | Semestriel (1 fois par an dans un domaine client) | Toute l'équipe | Stratégie, cohésion |

**Outils** : CRM HubSpot (pipelines par pays et par canal, portail partenaires avec enregistrement des affaires, attribution de chaque domaine à une ressource) ; tableau de bord Metabase relié à la base produit et à Stripe ; Notion (playbook, base de connaissances) ; Slack ; téléphonie Aircall ; séquences e-mail.

**Challenges** (budget programme partenaires) : « Pro d'abord » (meilleure part d'offres Pro au trimestre) ; challenge collectif de fin d'année (prime d'équipe si le revenu récurrent annuel est atteint) ; « Partenaire de l'année » (voyage sur un salon) ; tableau d'honneur mensuel des agences.

## 9.6 Style de management

**Management situationnel (Hersey et Blanchard), adapté à l'autonomie de chacun·e** :

| Style | Pour qui, quand | Exemple concret |
|---|---|---|
| S1 — Directif | Alternant·e ; tout·e sales pendant sa rampe (0-3 mois) | Script de démo imposé, objectifs d'activité quotidiens, 1:1 hebdomadaire |
| S2 — Persuasif | Sales Italie et Espagne pendant les 6 premiers mois (nouveaux marchés, peu de références) | On explique le pourquoi du ciblage, on co-construit le plan de compte, accompagnement en binôme à Vinitaly |
| S3 — Participatif | Customer success, développeurs | Décisions sur la feuille de route prises ensemble à partir des données de résiliation |
| S4 — Délégatif | Sales France après 12 mois ; partner manager sur le réseau | Objectifs et budget fixés, méthode libre, revue mensuelle |

**Fixation des objectifs par OKR** (trimestriels, publics, ≤ 3 par personne) reliés aux objectifs du BP. Exemple pour le T1 2029 :
- **Objectif entreprise** : « Ouvrir l'Europe du Sud. » Résultats clés : 36 domaines signés en Italie et en Espagne ; 2 agences actives hors de France ; module PrestaShop en production à M25.
- **Sales Italie** : « Devenir la référence Passavin en Vénétie. » Résultats clés : 17 domaines ; 50 démos ; 1 agence vénitienne recrutée.

**Pourquoi ce style** : une équipe petite, multi-pays et à distance a besoin d'objectifs clairs (OKR) et d'un accompagnement adapté au niveau de chacun (situationnel). Un style uniquement directif ne fonctionne pas à distance ; un style uniquement délégatif échoue sur des marchés nouveaux.

**Limite assumée** : à M36, le dirigeant a 7 personnes en direct (lead dev, 3 sales, partner manager, customer success, alternant·e). Au-delà de 4 sales, je recommande de nommer un·e responsable des ventes (an 4).

## 9.7 Motivation et fidélisation

| Levier | Équipe interne | Réseau externe |
|---|---|---|
| Rémunération juste | Variable simple, payé chaque trimestre, adossé à des clients qui restent (récupéré si le client part avant 3 mois) | Commission agences **récurrente à vie** : l'agence gagne tant que le client reste |
| Capital | **BSPCE** : réserve de 10 % ; 0,5 à 1,5 % par salarié·e des premiers recrutements (acquisition sur 4 ans, 1 an minimum avant tout droit) | — |
| Évolution | Sales → sales senior → responsable pays ; customer success → responsable expérience client | Silver → Gold ; comité consultatif produit |
| Reconnaissance | Tableau d'honneur, réussites partagées en revue mensuelle | « Partenaire de l'année », mise en avant dans l'annuaire |
| Conditions | Télétravail partiel, 1 000 € de formation par an, séminaire dans un domaine | Support prioritaire, accès bêta |
| Mesure | Rotation du personnel < 15 %/an ; enquête interne semestrielle | Taux d'agences actives ≥ 70 % des agences certifiées |

## 9.8 Gestion des sous-performances

Démarche identique pour tous, documentée et équitable :
1. **Diagnostic** (dès 2 mois sous 70 % de l'objectif) : manque d'activité (démos), manque de conversion (qualité), ou cause externe (rampe, territoire, CMS non couvert, saisonnalité) ? On ne sanctionne pas un écart dû au plan (exemple : 47 % du vivier couvert avant Shopify).
2. **Plan de progrès de 60 jours** : 2 ou 3 objectifs SMART, coaching (écoute d'appels, démos en binôme), point hebdomadaire.
3. **Bilan** : objectif atteint → retour au suivi normal ; progrès partiel → prolongation de 30 jours ; échec → changement de poste (par exemple customer success) ou séparation, dans le respect du droit du travail : des objectifs réalistes, connus à l'avance et des faits objectifs (le seul fait de ne pas atteindre un quota ne suffit pas).
4. **Réseau externe** : désactivation sans coût pour les agences et les apporteurs (voir §9.3) ; plan conjoint, puis clause contractuelle de minimum pour les logisticiens.

## 9.9 Organigramme sur 3 ans

```
FIN AN 1 (déc. 2027) — 3 personnes          FIN AN 2 (déc. 2028) — 9 personnes                 FIN AN 3 (déc. 2029) — 11 personnes
Dirigeant·e                                 Dirigeant·e                                         Dirigeant·e
 ├─ Lead dév. / CTO (M10)                    ├─ PRODUIT : Lead dév. ─ Dév. Shopify/Presta (M13)  ├─ PRODUIT : Lead dév. ─ Dév. Shopify/Presta ─ Dév. marque blanche (M26)
 ├─ Sales France (M10)                       ├─ VENTES : Sales FR · Sales IT (M17)               ├─ VENTES : Sales FR · Sales IT · Sales ES-PT
 └─ Réseau : 2 agences, 3 apporteurs         │           Sales ES-PT (M20) · Alternant·e (M13)   │           Alternant·e
    2 logisticiens intégrés (Planet Aura     ├─ RÉSEAU : Partner manager (M13)                   ├─ RÉSEAU : Partner manager
    + 1 autre), freelance, avocat, comptable │    9 agences · 13 apporteurs · 2 licences         │    27 agences (6 Gold) · 20 apporteurs · 4 licences
                                             └─ CLIENTS : Customer success FR/EN (M16)           └─ CLIENTS : Customer success FR/EN · IT/ES (M26)
```

## 9.10 Plan de recrutement relié au business plan

| Poste | Prévu | Jalon (domaines Direct actifs) | Arrivée centrale / pessimiste / optimiste | Coût employeur mensuel | Ligne du BP produite ou protégée |
|---|---|---|---|---|---|
| Lead développeur·se / CTO | M10 | 12 | M10 / M13 / M10 | 6 400 € | Produit, qualité (sortie du freelance) |
| Sales France | M10 | 12 | M10 / M13 / M10 | 3 790 € + variable | 136 domaines sur 3 ans |
| Alternant·e SDR & marketing | M13 | 15 | M13 / M14 / M13 | 1 000 € | Rendez-vous des sales |
| Partner manager | M13 | 25 | M13 / M17 / M13 | 4 500 € + variable | 134 domaines via agences + 72 via apporteurs ; 4 licences |
| Développeur·se Shopify puis PrestaShop | M13 | 20 | M13 / M15 / M13 | 5 800 € | Shopify M18, PrestaShop M25 |
| Customer success FR/EN | M16 | 40 | M16 / M19 / M16 | 3 790 € | Résiliation ≤ 1,5 % |
| Sales Italie | M16 | 60 | M17 / M22 / M16 | 3 790 € + 450 € (EOR) + variable | 93 domaines |
| Sales Espagne & Portugal | M19 | 90 | M20 / M26 / M19 | 3 790 € + 450 € (EOR) + variable | 61 domaines |
| Customer success IT/ES | M25 | 200 | M26 / non recruté / M25 | 3 790 € | Rétention IT/ES |
| Développeur·se marque blanche | M25 | 200 | M26 / non recruté / M25 | 5 800 € | Licences 3 et 4, adaptateurs |

Dans le scénario pessimiste, la règle de trésorerie bloque deux recrutements : l'effectif s'arrête à 9 personnes au lieu de 11.

## 9.11 Tableau de bord de l'équipe et du réseau (extrait, détail dans 10)

| KPI | Responsable | An 1 | An 2 | An 3 |
|---|---|---|---|---|
| Domaines signés par le dirigeant | Dirigeant | 22 | 22 | 10 |
| Domaines signés Sales France | Sales FR | 6 | 51 | 80 |
| Domaines signés Sales Italie | Sales IT | — | 30 | 64 |
| Domaines signés Sales Espagne & Portugal | Sales ES | — | 11 | 50 |
| Domaines apportés par les agences (Silver + Gold) | Partner manager | 2 | 32 | 100 |
| Domaines apportés par les apporteurs | Partner manager | 4 | 23 | 45 |
| Agences actives fin d'année | Partner manager | 2 | 9 | 27 |
| Licences marque blanche | Dirigeant + partner manager | 0 | 2 | 4 |
| Résiliation mensuelle | Customer success | ≤ 1,5 % | ≤ 1,5 % | ≤ 1,5 % |
| Atteinte des OKR individuels | Dirigeant | ≥ 70 % | ≥ 70 % | ≥ 70 % |
