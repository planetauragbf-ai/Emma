# Stratégie commerciale et marketing (V2)

> Objectifs = entrées du business plan central (`outils/bp_model.py`, résultats dans `13_BP_V2_RESULTATS.md`). Organisation et management des équipes : `09_EQUIPE_MANAGEMENT.md`.

## 8.1 Segments prioritaires

| Priorité | Segment | SAM [HYP] | Quand | Pourquoi |
|---|---|---|---|---|
| **1** | Domaines français sur WooCommerce, ventes à l'étranger | ≈ 960 | M5 | Terrain du fondateur, douleur la plus forte, décision rapide |
| **2** | Domaines français sur Shopify puis PrestaShop | +1 080 | M18 / M25 | Même cible, CMS différent |
| **3** | Domaines italiens (Woo → Shopify → PrestaShop) | ≈ 945 | M17 | 2ᵉ exportateur européen (7,8 Md€), dense en petits producteurs |
| **4** | Bodegas espagnoles et caves portugaises | ≈ 410 + 150 | M20 | 3 925 bodegas, WooCommerce et PrestaShop dominants |
| **5** | Logisticiens vin européens (offre Partner) | 15-30 [HYP] | M15 | Panier élevé ; activation de domaines sans coût d'acquisition |
| 6 | Allemagne (domaines) | ≈ 185 | M30, via agences et logisticiens seulement | Surtout un pays de destination |
| Exclu | Domaines sans boutique ; caves coopératives (B2B) ; envois directs à des particuliers aux États-Unis | — | — | Pas le problème ou interdit |

## 8.2 ICP et personas (illustratifs)

**ICP Direct** : domaine indépendant de 10 à 60 ha, 50 000 à 400 000 bouteilles/an, boutique WooCommerce, Shopify ou PrestaShop active depuis au moins 1 an, 10 à 80 commandes/mois dont au moins 20 % hors du pays, déjà client d'au moins un logisticien vin.
**ICP Partner** : logisticien spécialisé vin qui expédie à des particuliers dans au moins 5 pays, compte au moins 100 domaines clients vendant en ligne, et n'a pas de plugin (ou un plugin peu adopté).

| Persona (fictif) | Qui | Frustration | Message clé | Objection → réponse |
|---|---|---|---|---|
| **Claire, 42 ans, vigneronne-gérante** (Loire) | 2ᵉ génération, gère le commerce et l'export | Ressaisies le soir, « où est mon colis ? » | « Vos commandes étrangères partent sans ressaisie. » | « Mon logisticien le fait par mail » → démo chronométrée : 12 min contre 1 min |
| **Marco, 38 ans, responsable commercial** d'une cave de Valpolicella | Boutique WooCommerce, clients allemands et suisses | Pays non livrables proposés, accises mal estimées | « Plus aucun pays impossible au panier. » | « Un outil français ? » → interface et support en italien, logisticiens italiens intégrés |
| **Sophie, 38 ans, dirigeante d'agence web** | 25 domaines clients sur WordPress ou Shopify | Intégrations logistiques refaites à chaque client | « Une intégration maintenue, 20 à 25 % de commission récurrente. » | « Mes clients sont petits » → offre Essentiel à 49 € |
| **Marc, directeur commercial d'un logisticien** | 300 domaines clients | Coût d'un plugin maison, peu adopté | « Votre connecteur à votre marque en 8 semaines, sans équipe de développement. » | « On le fera nous-mêmes » → 69 k€ la 1ʳᵉ année pour 2 CMS contre 25,9 k€ ; l'exemple d'un plugin à moins de 10 installations |

*À remplacer par des personas issus des entretiens de validation (25 en France, 10 en Italie, 8 en Espagne).*

## 8.3 Étapes clés (déclinaison de la vision)

| Période | Étape | Jalon mesurable |
|---|---|---|
| Nov. 2026 - fév. 2027 | Validation France | 25 entretiens, 8 pré-ventes avec acompte, 2 logisticiens prêts à signer |
| M1-M4 (janv.-avr. 2027) | MVP WooCommerce | 2 adaptateurs logisticiens en production |
| M5-M12 | Pilotes puis commercialisation en France | 32 domaines actifs ; 1 lettre d'intention de licence ; **seed à M12** |
| M13-M18 | Structuration : partner manager, sales Italie, Shopify | 1ʳᵉ licence marque blanche (M15) ; Shopify à M18 ; 83 domaines |
| M19-M24 | Espagne et Portugal | 187 domaines ; 2 licences ; 9 agences |
| M25-M30 | PrestaShop ; customer success IT/ES | 330 domaines ; 18 agences |
| M31-M36 | Allemagne et Portugal via le réseau ; 4ᵉ licence | 478 domaines + 137 en marque blanche ; 725 k€ de revenu récurrent annualisé |

## 8.4 Canaux par pays et par ressource

| Canal | France | Italie | Espagne / Portugal | Allemagne |
|---|---|---|---|---|
| Vente directe | Dirigeant (an 1) puis Sales France | Sales Italie (M17) | Sales ES-PT (M20) | — |
| Agences | 2 → 14 (dont 4 Gold) | 1 → 5 | 1 → 5 (dont 1 au Portugal) | 2 |
| Apporteurs | 3 → 12 | 2 → 4 | 2 → 4 | — |
| Logisticiens revendeurs | Licences multi-pays : 4 à M36 (cibles : logisticiens français, italiens, espagnols et un acteur européen) | | | |
| Inbound | Fiche wordpress.org (version « suivi seul » gratuite), App Store Shopify, guide sur la vente à distance de vin dans l'UE (accises depuis 2023), webinaires avec des logisticiens | Contenus traduits | Contenus traduits | Contenus EN/DE |

## 8.5 Cycle de vente (domaine)

| Étape | Délai | Taux de passage [HYP] | Responsable | Outil |
|---|---|---|---|---|
| Prospect identifié → contact établi | J0-J7 | 30 % | Alternant·e SDR | CRM, séquences |
| Contact → démo | J7-J21 | 50 % | Sales | Visio |
| Démo → essai ou pilote | J21-J35 | 50 % | Sales | Boutique de démo |
| Essai → client payant | J35-J60 | 50 % | Sales puis customer success | Stripe |
| **Global** | **6-8 semaines** | **100 prospects → ≈ 3,75 clients** | | |

Un·e sales à pleine productivité (≈ 6-8 signatures/mois) fait ≈ 30 démos/mois, soit ≈ 200 prospects contactés/mois : d'où l'alternant·e SDR. **Logisticien** : cycle de 6-9 mois, du premier rendez-vous à la signature (comité de direction, essai technique).

## 8.6 Marketing : budget et événements

| Poste (k€) | An 1 | An 2 | An 3 |
|---|---|---|---|
| Marketing (salons, contenus, outils, publicité test) | 12 | 40 | 60 |
| Programme partenaires (certification, challenges, co-marketing) | 1,5 | 8 | 15 |
| Déplacements commerciaux | 3 | 10 | 18 |
| Localisation (IT, ES, DE, PT : interface, CGV, DPA) | 0 | 12 | 8 |
| **Total** | **16,5** | **70** | **101** |

| Événement | Lieu | Usage | Statut des dates |
|---|---|---|---|
| Vinitech-Sifel (déc. 2026) | Bordeaux | Entretiens, agences, logisticiens | À reconfirmer |
| Wine Paris & Vinexpo Paris (févr.) | Paris | Démos, pré-ventes, logisticiens | À reconfirmer |
| ProWein (mars) | Düsseldorf | Logisticiens européens, agences allemandes | À reconfirmer |
| **Vinitaly (avril 2028)** | Vérone | Lancement Italie (visiteurs, rendez-vous pris d'avance) | À reconfirmer |
| Fenavin / Barcelona Wine Week (biennaux) | Ciudad Real / Barcelone | Lancement Espagne | Années à reconfirmer |
| Assemblées des syndicats d'appellation | Toute l'année | Ateliers de 20 min (apporteurs) | — |

Pas de stand payant avant l'an 3 : la valeur est dans les rendez-vous préparés.

## 8.7 Pourquoi maintenant

1. **Les exportations baissent** : vins et spiritueux français −8 % en 2025, Italie −3,7 %, Espagne −5 % [FAIT, FEVS, ISTAT, AEAT]. Les droits américains de 15 % depuis août 2025 poussent les domaines vers la **vente directe en Europe**, où l'expédition aux particuliers est autorisée mais complexe.
2. **La vente à distance intra-UE** impose depuis 2023 les accises du pays de destination (directive (UE) 2020/262) : il faut un logisticien spécialisé, donc un connecteur.
3. **Les logisticiens se lancent seuls** : MBE Wine for Europe (juin 2026), plugin Hillebrand Gori. Le créneau neutre et multi-logisticiens est encore libre, mais pas pour longtemps.
4. **Les boutiques existent** : 79 % des viticulteurs français ont un site, 21 % vendent en ligne (Afnic 2025) ; en Allemagne, 46 % du CA des domaines vient de la vente directe (DWI/Geisenheim 2024).

## 8.8 Objectifs commerciaux sur 3 ans (central)

| Objectif | An 1 (2027) | An 2 (2028) | An 3 (2029) |
|---|---|---|---|
| Nouveaux domaines Direct | 33 | 170 | 348 |
| Domaines Direct actifs fin d'année | 32 | 187 | 478 |
| dont France / Italie / Espagne / Allemagne / Portugal | 32 / 0 / 0 / 0 / 0 | 143 / 32 / 12 / 0 / 0 | 289 / 108 / 75 / 4 / 2 |
| Licences marque blanche / domaines activés | 0 / 0 | 2 / 27 | 4 / 137 |
| Revenu récurrent annualisé fin d'année | 42 k€ | 284 k€ | 725 k€ |
| CA | 27 k€ | 232 k€ | 649 k€ |
| Agences actives / apporteurs actifs | 2 / 3 | 9 / 13 | 27 / 20 |
| CMS | WooCommerce | + Shopify (M18) | + PrestaShop (M25) |
| Effectif | 3 | 9 | 11 |

Chaque objectif est l'entrée directe du BP : aucune ligne de chiffre d'affaires sans ressource qui la produit (`07_BUSINESS_MODEL_BP.md` §7.4).
