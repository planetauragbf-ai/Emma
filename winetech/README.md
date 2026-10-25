# Passavin — étude de faisabilité et dossier Bloc 3 (projet WineTech) — V2

**Passavin** est un nom de travail provisoire, sous réserve d'une recherche d'antériorité par un conseil en propriété industrielle. Il vient du « passavant », l'ancien laissez-passer douanier des vins. Projet **uniquement scolaire** (Bloc 3 Euridis, « Management d'une équipe et d'un réseau commercial »).

**Le projet** : un connecteur SaaS neutre et multi-logisticiens. Il relie la boutique en ligne d'un domaine viticole à plusieurs logisticiens spécialisés vin. Au checkout, il ne propose que les destinations réellement livrables, au tarif réel. Il transmet ensuite la commande au logisticien et récupère le suivi.

**V2 en une phrase** : Europe (France → Italie → Espagne-Portugal → Allemagne via le réseau), 3 CMS (WooCommerce → Shopify M18 → PrestaShop M25), une 2ᵉ offre en marque blanche pour les logisticiens, et une équipe commerciale et un réseau qui produisent chaque ligne du chiffre d'affaires. Résultat honnête : **point mort mensuel à M38 en central** (l'objectif M36 n'est pas atteint ; M32 en optimiste). Le détail est dans `docs/12_V2_EUROPE.md`.

## Contenu

| Fichier | Contenu |
|---|---|
| `docs/01_DIAGNOSTIC.md` | Diagnostic V1 de Planet Nova (notes V2 en tête) |
| `docs/02_NOM.md` | 15 noms, vérifications, recommandation Passavin |
| `docs/03_INDEPENDANCE.md` | Indépendance vis-à-vis de Planet Aura ; volet employeur allégé en V2 |
| `docs/04_MARCHE_CONCURRENCE.md` | Marché France et concurrence (V1, conservés pour la traçabilité) |
| `docs/05_PRODUIT_MVP.md` | Parcours, stratégies de lancement, MVP |
| `docs/06_VALIDATION.md` | Plan de validation, seuils GO / STOP (seuils de la seed relevés en V2) |
| `docs/07_BUSINESS_MODEL_BP.md` | **V2** : deux offres, grilles, économie unitaire, BP, scénarios, financement |
| `docs/08_STRATEGIE_COMMERCIALE.md` | **V2** : segments par pays, personas, étapes clés, canaux, marketing, objectifs |
| `docs/09_EQUIPE_MANAGEMENT.md` | **V2** : équipe commerciale et réseau (rôles, objectifs SMART, rémunération, recrutement, animation, sous-performance), style de management, organigramme, plan de recrutement |
| `docs/10_RISQUES_TABLEAUX_DE_BORD.md` | **V2** : 17 risques justifiés, 26 KPI reliés au BP |
| `docs/11_EURIDIS_SOUTENANCE.md` | **V2** : grille, trame minutée, texte des 3 démonstrations, 15 questions du jury, autoévaluation |
| `docs/12_V2_EUROPE.md` | **V2** : ce qui change et pourquoi, recherche Europe sourcée, TAM/SAM/SOM par pays, Shopify et PrestaShop, offre marque blanche, test du point mort, désaccords avec la commande |
| `docs/13_BP_V2_RESULTATS.md` | Résultats du modèle, **générés automatiquement** (ne pas modifier à la main) |
| `livrables/Passavin_Dossier_Investisseur.pptx` / `.pdf` | Dossier écrit de 30 pages |
| `livrables/Passavin_Pitch_Soutenance.pptx` / `.pdf` | Pitch de 20 slides |
| `annexes/BP_3ans.xlsx` | 12 onglets : hypothèses, production par ressource, mensuel × 3 scénarios, synthèse, pays et CMS, marque blanche, financement, plan de recrutement, tableaux de bord, leviers du point mort |
| `outils/` | `bp_model.py` (moteur unique des chiffres) → `build_annexes.py` → `build_decks.py` |
| `PROMPT_V2.md` | Cahier des charges de la V2 |

## Régénérer

```bash
cd winetech/outils
pip install matplotlib python-pptx openpyxl   # si nécessaire
python3 bp_model.py && python3 build_annexes.py && python3 build_decks.py
cd ../livrables && soffice --headless --convert-to pdf *.pptx
```

Un chiffre modifié dans `bp_model.py` se propage à l'Excel, à `docs/13_BP_V2_RESULTATS.md`, au dossier et au pitch. Les docs rédigés à la main (07 à 12) citent les résultats du scénario central : à relire si une hypothèse change.

## Règles appliquées

- Chaque chiffre est étiqueté : FAIT (source, année, fiabilité), HYP (hypothèse) ou AVIS (jugement).
- Aucun client, résultat, associé ou diplôme n'a été inventé. Les personas sont illustratifs.
- Planet Aura est un logisticien partenaire parmi d'autres ; ses intégrations ne sont jamais présentées comme des clients de Passavin.
- À compléter par le porteur : `[Nom Prénom]`, `[Promotion]`, parcours, apport réel.
- Liste des données non vérifiées : `docs/12_V2_EUROPE.md` (étiquettes NV) et page 30 du dossier.
