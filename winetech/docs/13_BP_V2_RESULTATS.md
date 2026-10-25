# Résultats chiffrés du BP V2 (généré par `outils/build_annexes.py` — ne pas modifier à la main)

Toutes les valeurs sont des **[HYP]** issues de `outils/bp_model.py`.

## Synthèse par scénario

| | pessimiste | central | optimiste | central_sans_marque_blanche | central_sans_frais_logisticien |
|---|---|---|---|---|---|
| Domaines Direct fin an 3 | 264 | 478 | 595 | 478 | 478 |
| Domaines marque blanche fin an 3 | 57 | 137 | 192 | 0 | 137 |
| Revenu récurrent annualisé fin an 3 € | 328 174 | 724 918 | 972 491 | 624 970 | 638 913 |
| CA an 3 € | 278 779 | 648 721 | 859 183 | 559 138 | 587 147 |
| EBITDA an 3 € | -400 606 | -196 056 | -19 942 | -278 543 | -256 706 |
| Trésorerie fin an 3 € | -38 224 | 181 089 | 432 790 | 66 779 | 101 345 |
| Point mort mensuel | non atteint | M38 | M32 | M42 | M42 |
| EBITDA du mois 36 € | -25 933 | -2 925 | 16 115 | -10 843 | -9 984 |

## Compte de résultat — central

| € | An 1 | An 2 | An 3 |
|---|---|---|---|
| Nouveaux domaines Direct | 33 | 170 | 348 |
| Domaines Direct actifs fin d'année | 32 | 187 | 478 |
| Logisticiens en marque blanche | 0 | 2 | 4 |
| Domaines activés en marque blanche | 0 | 27 | 137 |
| Revenu récurrent annualisé fin d'année € | 42 322 | 283 975 | 724 918 |
| CA abonnements € | 9 777 | 112 074 | 385 863 |
| CA installation € | 12 116 | 53 922 | 96 702 |
| CA services € | 4 000 | 12 000 | 15 000 |
| CA frais logisticiens (neutre) € | 1 500 | 17 884 | 61 574 |
| CA licences marque blanche € | 0 | 19 370 | 64 130 |
| CA mise en place marque blanche € | 0 | 16 000 | 16 000 |
| CA expéditions marque blanche € | 0 | 1 019 | 9 452 |
| CA total € | 27 394 | 232 270 | 648 721 |
| Coûts variables € | 3 298 | 18 314 | 52 727 |
| Marge brute € | 24 095 | 213 956 | 595 993 |
| Taux de marge brute | 88% | 92% | 92% |
| Développement externe € | 42 500 | 0 | 0 |
| Salaires chargés € | 31 907 | 418 448 | 628 016 |
| Autres charges € | 40 660 | 127 833 | 164 033 |
| EBITDA € | -90 972 | -332 325 | -196 056 |
| Trésorerie fin d'année € | 792 317 | 438 568 | 181 089 |
| Effectif fin d'année | 3 | 9 | 11 |
| CAC € | 812 | 1 537 | 1 079 |

## Nouveaux domaines par ressource — central

| Ressource | An 1 | An 2 | An 3 | Total |
|---|---|---|---|---|
| Dirigeant | 22 | 22 | 10 | 54 |
| Sales France | 6 | 51 | 80 | 136 |
| Sales Italie | 0 | 30 | 64 | 93 |
| Sales Espagne & Portugal | 0 | 11 | 50 | 61 |
| Agences Silver | 2 | 19 | 59 | 80 |
| Agences Gold | 0 | 13 | 41 | 54 |
| Apporteurs d'affaires | 4 | 23 | 45 | 72 |

## Plan de recrutement (mois réel selon les jalons)

| Poste | Prévu | Seuil | Central | Pessimiste | Optimiste |
|---|---|---|---|---|---|
| Lead développeur·se / CTO | M10 | 12 domaines | M10 | M13 | M10 |
| Alternant·e SDR & marketing | M13 | 15 domaines | M13 | M14 | M13 |
| Partner manager (agences, apporteurs, logisticiens) | M13 | 25 domaines | M13 | M17 | M13 |
| Développeur·se Shopify puis PrestaShop | M13 | 20 domaines | M13 | M15 | M13 |
| Customer success FR/EN | M16 | 40 domaines | M16 | M19 | M16 |
| Customer success IT/ES | M25 | 200 domaines | M26 | — | M25 |
| Développeur·se marque blanche & intégrations | M25 | 200 domaines | M26 | — | M25 |
| Sales France (chasse) | M10 | 12 domaines | M10 | M13 | M10 |
| Sales Italie | M16 | 60 domaines | M17 | M22 | M16 |
| Sales Espagne & Portugal | M19 | 90 domaines | M20 | M26 | M19 |

## Leviers pour atteindre le point mort à M36

| Levier | Central | Requis | Point mort |
|---|---|---|---|
| Résiliation mensuelle | 1,5 % | insuffisant seul | — |
| ARPA (€/mois) | 94 € | 103 € | M36 |
| Productivité des 3 sales (×) | ×1,00 | ×1,15 | M36 |
| Logisticiens en marque blanche à M36 | 4 | 6 | M36 |
| Charges fixes M25+ (report dev3 + csm2) | M25 | insuffisant seul | — |
| Combinaison : Pro par défaut (ARPA 99 €) + 5e licence marque blanche (M30) | 94 € / 4 licences | 99 € / 5 licences | M36 |

## Marché par pays (TAM / SAM)

| Pays | TAM | SAM 3 CMS | SAM Woo | Domaines M36 | Pénétration |
|---|---|---|---|---|---|
| FR | 9 030 | 2 040 | 962 | 289 | 14% |
| IT | 4 250 | 945 | 674 | 108 | 11% |
| ES | 1 962 | 409 | 281 | 75 | 18% |
| DE | 3 788 | 185 | 123 | 4 | 2% |
| PT | 750 | 154 | 111 | 2 | 1% |

## Économie unitaire d'un domaine Direct (central, M36)

| Indicateur | Valeur |
|---|---|
| ARPA abonnement | 94 €/mois |
| Frais logisticien moyen (mode neutre) | 15 €/mois |
| Contribution après coûts variables | 99 €/mois |
| Durée de vie moyenne | 67 mois |
| LTV | 6 591 € |
| CAC an 3 | 1 079 € |
| LTV / CAC | 6,1 |
| Récupération du CAC | 11 mois |

Financement : 890 000 € au total, dont seed 550 000 € de fonds propres + 200 000 € de prêt d'amorçage BPI à M12. Point bas de trésorerie : 51 295 € (M11).
