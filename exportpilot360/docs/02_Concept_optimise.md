# 02 — ExportPilot 360 : la version optimisée

> **Vision (Start with Why).** Un vigneron ne devrait jamais perdre un client parce qu'il habite à 8 000 km.
> **Mission.** Donner à chaque petit domaine le service export, marketing et logistique qu'il ne peut pas s'offrir, sous la forme d'un seul outil et d'un réseau de partenaires.
> **Signature.** *Vendez au monde entier depuis votre caveau.*

---

## 1. Le produit en une phrase
**ExportPilot 360 transforme chaque visiteur de caveau en client international récurrent.**
- La dégustation devient un fichier client.
- Le fichier client devient des réachats.
- Les réachats sont expédiés par des logisticiens spécialisés, sans que le domaine touche à la douane.

## 2. Qui paie, qui utilise, qui prescrit

| Rôle | Qui | Ce qu'il attend |
|---|---|---|
| **Payeur et décideur** | Propriétaire ou gérant du domaine | Du CA en plus, sans charge supplémentaire, un retour sur investissement visible |
| **Utilisateur quotidien** | Responsable caveau ou œnotourisme, saisonniers | Moins de 30 secondes par visiteur, un outil simple sur tablette ou téléphone |
| **Bénéficiaire final** (ne paie pas l'abonnement) | Visiteur étranger devenu client | Retrouver ses vins, un prix rendu clair, une livraison sans surprise |
| **Prescripteurs** | Logisticiens spécialisés, interprofessions, offices de tourisme, réseaux de vignerons, éditeurs de caisses | Plus de flux pour leurs adhérents ou clients, un service à valeur ajoutée |
| **Partenaires d'exécution** | Commissionnaires de transport, représentants fiscaux, assureurs, freelances | Des commandes qualifiées et des données propres |

## 3. Les trois briques, recentrées

### 3.1 WinePass, le cœur (acquisition et fidélisation)
| Fonction | Détail | Lancement (MVP) |
|---|---|---|
| QR code de dégustation | Un QR code par table, chevalet ou carte de dégustation (**jamais l'e-label réglementaire**, qui ne peut pas collecter de données). Le visiteur ouvre une page web (sans application à installer) dans sa langue | ✔ |
| Carnet de dégustation | Le visiteur coche les vins goûtés et ses favoris, et peut noter et commenter | ✔ |
| Collecte de contacts | E-mail, pays, langue, consentement RGPD explicite, déclaration de majorité | ✔ |
| Fiche client domaine | Historique des visites, vins préférés, nationalité, achats | ✔ |
| Relances automatiques | Trois scénarios prêts à l'emploi (J+3 « vos vins », nouveau millésime, Noël), multilingues, au contenu conforme à la loi Évin | ✔ (3 langues) |
| Réachat international | Une page personnelle « vos vins » affiche un prix rendu chez le client, fourni par un logisticien partenaire, puis la commande est transmise | ✔ (1 à 2 partenaires) |
| Recommandations | Suggestions de vins selon les dégustations et les achats | Phase 2 |
| Club et abonnements | Coffrets récurrents, prélèvement automatique | Phase 2 |

### 3.2 ExportPilot, la couche de connexion export (et non une plateforme logistique)
| Fonction | Ce qu'ExportPilot fait | Ce qu'il **ne fait pas** |
|---|---|---|
| Estimation du prix rendu | Interroge l'API ou la grille du partenaire et affiche « estimation fournie par [partenaire] » | Il ne calcule pas lui-même les taxes et ne s'engage pas sur leur montant |
| Fiche destination | Pays ou État ouvert ou fermé, quotas, délai indicatif, documents à prévoir. Contenu fourni et validé par les partenaires, daté. Pour les États-Unis, seuls les circuits conformes (importateur licencié) proposés par un partenaire sont affichés | Pas de conseil douanier ou fiscal personnalisé, pas de promesse d'expédition directe aux États-Unis |
| Commande centralisée | Une vue unique des commandes internationales, quel que soit le partenaire | Il ne conclut pas le contrat de transport en son nom |
| Documents commerciaux | Pré-remplissage de la facture et de la fiche commande à partir des données saisies | Il n'émet aucun document douanier ou d'accises (c'est le rôle du partenaire ou de l'entrepositaire agréé) |
| Suivi | Statuts remontés par le partenaire, notification au client | Il ne gère pas les sinistres (c'est le partenaire qui les gère, ExportPilot oriente) |

### 3.3 DomaineDigital, l'activation et les packs (et non une agence)
- **Mise en service** (390 € HT) : paramétrage, import du catalogue, traduction des fiches, formation de 1 h pour l'équipe caveau, kit QR imprimé.
- **Packs ponctuels**, réalisés par un réseau de freelances sélectionnés : campagne saisonnière, photos des cuvées, traduction professionnelle, connexion à l'e-shop. Marge d'intermédiation d'environ 40 % [HYP].
- **Pas de création de site e-commerce sur mesure ni de référencement au long cours** : ces demandes sont orientées vers des agences partenaires, contre une prime d'apport.

## 4. Le parcours, de bout en bout (concept)

```
 AVANT              PENDANT LA VISITE            APRÈS (chez lui, à l'étranger)
 ──────             ─────────────────            ─────────────────────────────
 Le visiteur        Il scanne le QR → coche      J+3 : « Vos vins préférés »   →  Commande sur sa page
 réserve sa         ses vins → laisse son        Nouveau millésime / Noël      →  Prix rendu par un
 dégustation        contact (consentement)       (dans sa langue)                  partenaire logisticien
                    Achat au caveau, avec        Fiche destination claire      →  Expédition, douane et
                    prix rendu si expédition                                       suivi par le partenaire
        ▼                      ▼                              ▼                              ▼
   (phase 3)           WinePass (MVP)              Relances (MVP)                 ExportPilot (MVP)
```

## 5. Ce qu'on construit, ce qu'on intègre, avec qui

| On **construit** (le savoir-faire propre) | On **intègre** (on ne réinvente pas) | On **s'associe** (exécution et distribution) |
|---|---|---|
| Parcours WinePass (page web progressive, multilingue, hors ligne partiel) | Prestataire d'e-mail et de SMS transactionnels (API) | Commissionnaires spécialisés vins et spiritueux (au moins 2 par grande destination) |
| CRM centré sur le domaine (visites, vins, nationalités) | Traduction automatique par API, relue par un humain pour les fiches | Représentants fiscaux pour les accises UE |
| Page de réachat avec prix rendu | Prestataire de paiement agréé, compatible avec la vente d'alcool [À VÉRIFIER] | Assureurs ad valorem (via les partenaires) |
| Connecteur normalisé « logisticiens » (adaptateurs API ou fichiers) | Connecteurs e-shop (WooCommerce, Shopify, PrestaShop) | Interprofessions, offices de tourisme, destinations Vignobles & Découvertes |
| Bibliothèque de fiches destinations (contenu partenaire, daté, versionné) | Hébergement en Europe, authentification, analytique | Éditeurs de caisses et d'ERP viticoles (intégration) |
| Tableaux de bord domaine (contacts, taux de capture, réachats) | Outils internes (CRM commercial, facturation) | Réseau de freelances (traduction, photos, campagnes) |

## 6. En quoi ce n'est pas Planet'Connect (ni un outil de logisticien)

| | Plateforme d'un commissionnaire (type Planet'Connect, d'après sa présentation publique) | ExportPilot 360 |
|---|---|---|
| Métier | Organiser et exécuter le transport, avec obligation de résultat | Créer et fidéliser la demande internationale du domaine |
| Moment couvert | L'expédition d'un achat déjà conclu | Avant, pendant et surtout **après** la visite |
| Partenaires logistiques | Un seul : lui-même | Plusieurs, au choix du domaine (neutralité) |
| Données | Expéditions | Visiteurs, préférences, consentements, réachats |
| Revenu | Prestation de transport | Abonnement logiciel + mise en service + packs |

**Face à myBottlesDelivered (Hillebrand Gori / DHL).** Ce service gratuit de commande au caveau par QR code est **complémentaire, pas concurrent frontal** :
- il traite le visiteur **qui achète sur place** ;
- ExportPilot 360 traite **tous les autres**, ceux qui repartent avec deux bouteilles ou sans rien, et les relance pendant des mois.

myBottlesDelivered peut d'ailleurs être branché comme l'un des partenaires d'expédition.

**Règle d'indépendance.**
- ExportPilot 360 n'utilise aucune donnée, aucun client, aucun code ni aucune grille interne de Planet Aura.
- Planet Aura est un **partenaire logistique potentiel parmi d'autres**, sollicité aux mêmes conditions que les autres commissionnaires (Hillebrand Gori eShipping, Viticolis, Vinotrans, etc.).
- Si la fondatrice est encore salariée de Planet Aura au moment de la création, ses clauses contractuelles (loyauté, non-concurrence, propriété intellectuelle) sont vérifiées et la direction est informée avant tout démarchage [À VÉRIFIER].

## 7. Avantages concurrentiels durables (et leurs limites)

| Avantage | Pourquoi il dure | Limite honnête |
|---|---|---|
| **Données de préférence par visiteur** | Chaque saison enrichit le fichier du domaine. Changer d'outil, c'est perdre son historique (coût de changement) | Ces données appartiennent au domaine (RGPD) et doivent rester exportables |
| **Réseau de partenaires connectés** | Chaque connexion de logisticien est coûteuse à reproduire. La neutralité multi-partenaires est difficile à copier pour un logisticien | Les logisticiens peuvent refuser ou freiner |
| **Ancrage terrain dans la filière** | Une connaissance du caveau, de la clientèle étrangère et de la logistique vin, avec des prescripteurs locaux | C'est un avantage humain, pas technologique : il faut le transformer en réseau et en marque |
| **Densité régionale** | Les domaines se recommandent entre eux (effet de voisinage) et les offices de tourisme prescrivent | Lent à construire, une région à la fois |
| **Conformité intégrée** | Relances conformes à la loi Évin, consentement RGPD, fiches destinations datées | Copiable, mais coûteux à maintenir pour un généraliste |

## 8. L'intelligence artificielle : utile ici, inutile là

| Usage | Valeur réelle | Décision |
|---|---|---|
| Traduction des fiches vins et des relances (4 à 6 langues) | **Forte** : c'est le premier frein à l'international pour un petit domaine | MVP, avec relecture humaine des fiches |
| Rédaction assistée des campagnes, avec garde-fous loi Évin | Moyenne : gain de temps, mais risque de conformité | Phase 2, avec validation humaine obligatoire |
| Recommandations de vins par visiteur | Moyenne : demande assez de données | Phase 2 (simples règles), puis phase 3 (modèle) |
| Réponse automatique au client final (« où est ma commande ? ») | Moyenne | Phase 3, à partir des statuts des partenaires |
| Conseil réglementaire ou douanier automatisé | **Négative** : risque juridique, et c'est le métier des partenaires | **Exclu** |
| Score de « visiteur à fort potentiel » | Faible au départ | Phase 3 éventuellement |

**Règle :** l'IA sert à faire gagner du temps sur la langue et le contenu. Elle ne décide de rien de réglementaire.

## 9. Trois offres, pas plus

| | **Caveau** | **Export** (recommandée) | **Signature** |
|---|---|---|---|
| Prix | **59 € HT par mois** | **129 € HT par mois** | **249 € HT par mois** |
| Engagement | 12 mois | 12 mois | 12 mois |
| Pour qui | Domaine qui veut d'abord constituer son fichier | Domaine avec une clientèle étrangère régulière | Domaine structuré, multi-sites ou avec e-shop |
| Contenu | QR WinePass, carnet de dégustation, contacts, 3 relances en français et en anglais, tableau de bord | + réachat international avec prix rendu des partenaires, 4 langues, fiches destinations, suivi des commandes | + multi-sites ou multi-marques, connexion e-shop ou caisse, club (phase 2), point trimestriel |
| Mise en service | 390 € HT | 390 € HT | 390 € HT (connexion e-shop sur devis) |
| Commission | — | 2 % du montant vin des réachats passés par la plateforme | 2 % |

**Prix argumentés (hypothèses à tester en pilote) :**
- **L'ancrage ROI.** Une commande de 12 bouteilles à 25 € (300 €), avec une marge de vente directe de l'ordre de 50 à 60 % [HYP], rapporte environ 150 à 180 € de marge. **L'offre Export est remboursée par une seule commande par mois.**
- **L'ancrage marché.** Les CRM génériques pour PME coûtent de 15 à 100 € par mois, mais sans parcours caveau ni logistique. Les logiciels de club américains se facturent plusieurs centaines de dollars par mois [FAIT, grilles publiques, voir `04_Concurrence.md`]. ExportPilot 360 se place entre les deux.
- **La psychologie du prix.** Le prix d'entrée de 59 € évite le « non » réflexe. L'offre Export est construite pour être le choix naturel : le réachat international est la raison d'être du produit.
