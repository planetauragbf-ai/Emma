# 09 — Business plan financier sur 3 ans

**Source unique des chiffres :** `../finance/Modele_Financier_ExportPilot360.xlsx`. Le modèle est intégralement en formules, piloté par l'onglet Hypothèses et recalculé par LibreOffice via `recalc.py`. Tous les montants sont en € HT. Les chiffres sont des **projections** construites sur des hypothèses explicites : aucune vente ni aucun client n'existe à ce jour.

**Calendrier :** ante-création en novembre-décembre 2026 (immatriculation en novembre), puis trois exercices civils 2027, 2028 et 2029. La colonne « Ante-création » est présentée à part, comme l'exige la grille Euridis. Fiscalement, elle est rattachée au premier exercice.

---

## 1. Hypothèses clés et leur justification

| Hypothèse | Valeur (central) | Justification | Statut |
|---|---|---|---|
| Prix | 59 / 129 / 249 € par mois | Ancrage ROI (une commande de réachat par mois rembourse l'offre Export), positionné entre les CRM génériques et les logiciels de club américains | [HYP] à tester sur les pilotes |
| Mix de clients | 40 % / 45 % / 15 % | L'offre Export est construite comme le choix naturel | [HYP] |
| Signatures | 45 en 2027, 125 en 2028, 200 en 2029 | 2027 : 1 fondatrice puis 1 BizDev à partir de septembre (≈ 6 signatures par mois en haute saison de vente). 2028 : 2 BizDev. 2029 : 2 BizDev rodés + prescripteurs | [HYP] cohérent avec un cycle de vente terrain de 2 à 6 semaines |
| Saisonnalité | 70 % des signatures entre novembre et avril | Les domaines ont du temps hors saison touristique | [HYP] à confirmer |
| Churn | 1,5 % par mois (≈ 17 % par an) | Engagement 12 mois. Bas de la fourchette prudente de 1,5-3 % par mois retenue pour des TPE agricoles (repères secondaires, voir fact base §10) | [HYP] |
| Mise en service | 390 € | Une demi-journée de paramétrage et de formation | [HYP] |
| Packs | 30 % des nouveaux clients, 750 €, coût de 60 % | Réalisés par des freelances, marge d'intermédiation | [HYP] |
| Commission | 2 % × 250 € × 8 à 18 réachats par an et par domaine éligible | Hypothèse prudente sur les volumes de réachat | [HYP] priorité de mesure sur les pilotes |
| Équipe | 2 fondateurs + 1 BizDev (septembre 2027) + 1 alternant, puis 1 développeur (2028), 1 BizDev (septembre 2028), 1 customer success (2029) | Recrutement conditionné à des jalons (voir 08) | [HYP] |
| Fondateurs | 2 300 € puis 3 600 € puis 4 600 € de coût employeur mensuel | Rémunération volontairement modeste au départ | [HYP] |

## 2. Compte de résultat (central)

| € HT | Ante-création | 2027 | 2028 | 2029 |
|---|---:|---:|---:|---:|
| CA abonnements | 0 | 20 488 | 154 670 | 353 168 |
| CA mises en service | 0 | 13 650 | 48 750 | 78 000 |
| CA packs DomaineDigital | 0 | 10 125 | 28 125 | 45 000 |
| CA commissions | 0 | 404 | 4 549 | 13 355 |
| **Chiffre d'affaires** | **0** | **44 667** | **236 094** | **489 523** |
| Coûts directs | 0 | −7 086 | −23 374 | −41 839 |
| **Marge brute** (taux) | 0 | 37 581 (84 %) | 212 720 (90 %) | 447 684 (91 %) |
| Salaires et charges | 0 | −74 600 | −219 400 | −321 600 |
| Tech (MVP sous-traité + hébergement) | −5 000 | −29 400 | −4 800 | −7 200 |
| Marketing, salons, déplacements | 0 | −18 350 | −45 150 | −75 400 |
| Frais généraux | −8 000 | −9 000 | −17 600 | −26 500 |
| **EBE** | **−13 000** | **−93 769** | **−74 230** | **+16 984** |
| Amortissements et charges financières | −106 | −3 867 | −4 838 | −4 986 |
| Subvention Bourse French Tech | 0 | +21 000 | +9 000 | 0 |
| **Résultat net** | **−13 106** | **−76 635** | **−70 068** | **+11 998** |

L'IS est nul sur la période : les déficits reportés (≈ 160 k€ fin 2028) absorbent le bénéfice de 2029.

## 3. MRR, ARR, chiffre d'affaires, trésorerie : quatre notions distinctes

| | 2027 | 2028 | 2029 |
|---|---:|---:|---:|
| Domaines actifs au 31/12 | 43 | 150 | 308 |
| MRR de décembre (abonnements) | 5 070 € | 17 816 € | 36 601 € |
| ARR (MRR × 12) | 61 k€ | 214 k€ | 439 k€ |
| CA de l'exercice (récurrent + ponctuel) | 45 k€ | 236 k€ | 490 k€ |
| Résultat net | −77 k€ | −70 k€ | +12 k€ |
| Trésorerie au 31/12 | 125 k€ | 44 k€ | 46 k€ |

**Pourquoi ces chiffres diffèrent :**
- Le CA 2027 est inférieur à l'ARR, car les clients arrivent en cours d'année et les pilotes ont 3 mois offerts.
- La trésorerie diffère du résultat, car elle intègre les apports et emprunts et exclut les amortissements.

## 4. Seuil de rentabilité et point mort

| | 2027 | 2028 | 2029 |
|---|---:|---:|---:|
| Charges fixes de l'année (net de la subvention) | 114 k€ | 283 k€ | 436 k€ |
| Contribution annuelle d'un domaine actif | 1 392 € | 1 410 € | 1 422 € |
| **Seuil : domaines actifs nécessaires** | **82** | **201** | **306** |
| Seuil exprimé en MRR | 9,8 k€ | 23,9 k€ | 36,5 k€ |

- **Unité retenue : le domaine abonné actif.** Le seuil ignore volontairement les mises en service et les packs, pour mesurer la rentabilité du seul récurrent.
- Les charges fixes augmentent avec les recrutements, donc le seuil se déplace chaque année.
- **Point mort (EBE glissant sur 3 mois durablement positif) : mois 35, soit septembre 2029, avec environ 300 domaines actifs.**

## 5. Plan de financement (ante-création + 3 ans)

| € | Ante-création | 2027 | 2028 | 2029 |
|---|---:|---:|---:|---:|
| Capacité d'autofinancement | −13 000 | −75 057 | −67 246 | +15 493 |
| Apport en capital des fondateurs | 10 000 | | | |
| Prêts d'honneur (comptes courants des fondateurs) | 40 000 | | | |
| **Levée business angels (montant sollicité)** | | **120 000** | | |
| Emprunt bancaire | | 60 000 | | |
| Investissements matériels | −3 800 | −2 800 | −2 800 | −1 400 |
| Remboursement d'emprunt | | −10 016 | −11 407 | −11 931 |
| **Variation de trésorerie** | **+33 200** | **+92 127** | **−81 453** | **+2 161** |
| **Trésorerie de fin de période** | **33 200** | **125 327** | **43 874** | **46 036** |
| Trésorerie mensuelle minimale | 4 500 | 65 881 | 43 874 | 23 574 |

*(La subvention Bourse French Tech est incluse dans la capacité d'autofinancement : 21 k€ en 2027, 9 k€ en 2028.)*

## 6. Besoin de financement et montant sollicité
- **Besoin brut :** sans aucune ressource externe, la trésorerie atteindrait un point bas de **−208 k€** (décembre 2029, juste avant que les flux deviennent positifs). Avec une réserve de sécurité d'environ 25 à 50 k€ (l'œnotourisme rend l'activité saisonnière), le **besoin total est arrondi à 260 k€**.
- **Plan de couverture :**

| Ressource | Montant | Part | Statut |
|---|---:|---:|---|
| Apport des fondateurs | 10 k€ | 4 % | Engagement personnel |
| Prêts d'honneur (2 × 20 k€) | 40 k€ | 15 % | Réseau Entreprendre (15 à 50 k€, environ 30 k€ en moyenne par lauréat) ou Initiative France (montant moyen 8,7 k€), à solliciter |
| Bourse French Tech | 30 k€ | 12 % | Subvention Bpifrance jusqu'à 30 k€, au plus 70 % des dépenses éligibles, à confirmer |
| Prêt bancaire | 60 k€ | 23 % | Effet de levier des prêts d'honneur, à négocier |
| **Business angels** | **120 k€** | **46 %** | **Montant sollicité** |
| **Total** | **260 k€** | 100 % | |

- **Forme proposée aux business angels :** BSA-AIR de 120 k€ avec un plafond de valorisation de 600 k€ pré-monnaie (≈ 17 % de dilution au plafond). C'est une proposition de négociation, pas une valorisation démontrée.
- **Utilisation des 18 premiers mois :**
  - équipe produit (CTO + MVP sous-traité) : environ 40 % ;
  - équipe commerciale (CEO, BizDev, alternant) : environ 35 % ;
  - marketing, salons et terrain : environ 15 % ;
  - frais généraux et juridique : environ 10 %.

## 7. Scénarios

| | Pessimiste | Central | Optimiste | Pessimiste + plan de gel |
|---|---:|---:|---:|---:|
| Signatures 2027 / 2028 / 2029 | 25 / 80 / 130 | 45 / 125 / 200 | 65 / 180 / 290 | 25 / 80 / 130 |
| Churn mensuel | 2,5 % | 1,5 % | 1,0 % | 2,5 % |
| Domaines actifs fin 2029 | 175 | 308 | 472 | 175 |
| ARR fin 2029 | 250 k€ | 439 k€ | 675 k€ | 250 k€ |
| CA 2029 | 291 k€ | 490 k€ | 735 k€ | 291 k€ |
| EBE 2029 | −163 k€ | +17 k€ | +240 k€ | −13 k€ |
| Trésorerie minimale 2027-2029 | −239 k€ | +24 k€ | +66 k€ | −16 k€ |
| Point mort | non atteint en 2029 | septembre 2029 | avril 2028 | non atteint (EBE de −1 à −2 k€ par mois fin 2029) |

**Le plan de gel** : si, au 30 juin 2028, moins de 70 domaines sont actifs (trajectoire pessimiste), on ne recrute ni le 2e BizDev, ni le customer success, et le développeur est remplacé par de la maintenance freelance. L'entreprise s'approche alors de l'équilibre fin 2029, avec un besoin résiduel d'environ 20 k€. Il est couvert par une facilité de caisse, un report de salons ou un apport complémentaire des business angels (clause prévue dans le pacte). Sans plan de gel, il faudrait environ 260 k€ de plus : on ne laisse donc jamais dériver le pessimiste.

## 8. Contrôles de cohérence effectués
- **Trésorerie :** la variation annuelle (CAF + ressources − emplois) est égale à l'écart de trésorerie entre deux clôtures, chaque année.
- **Clients :** les domaines actifs de fin d'année sont égaux à ceux de début d'année, plus les signatures, moins les résiliations (calcul mensuel).
- **Seuil :** il est cohérent avec le point mort (306 domaines nécessaires en 2029, contre 308 actifs en décembre 2029).
- **IS :** il est calculé après report des déficits, au taux réduit PME puis au taux normal.
- **Simplifications assumées :**
  - TVA neutre (montants HT) ;
  - encaissement immédiat des abonnements par prélèvement SEPA ;
  - pas de BFR client significatif ;
  - développement logiciel passé en charges (pas d'immobilisation, ce qui est prudent).
