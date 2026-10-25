# Passavin — étude de faisabilité et dossier Bloc 3 (projet WineTech)

**Passavin** est un nom de travail provisoire, sous réserve d'une recherche d'antériorité par un conseil en propriété industrielle. Il remplace « Planet Nova » et n'a aucun lien avec Planet Aura.

**Le projet** : un connecteur neutre, d'abord sous forme d'extension WooCommerce, qui relie la boutique en ligne d'un domaine viticole à plusieurs logisticiens spécialisés dans le vin. Il couvre l'éligibilité des destinations au moment du paiement, la transmission des commandes et le suivi des expéditions.

**Verdict de l'étude** : **modifier le projet, puis le tester avant d'investir.** Aucune demande n'est validée à ce jour.

## Contenu

| Fichier | Contenu |
|---|---|
| `docs/01_DIAGNOSTIC.md` | Étape 1 : analyse critique de Planet Nova, notation et verdict |
| `docs/02_NOM.md` | Étape 2 : 15 noms, vérifications (RDAP, TMview, API entreprises), top 5 et recommandation |
| `docs/03_INDEPENDANCE.md` | Indépendance vis-à-vis de Planet Aura : propriété intellectuelle, contrat de travail, API, partenariat non exclusif |
| `docs/04_MARCHE_CONCURRENCE.md` | Marché sourcé, TAM/SAM/SOM, concurrence (dont Hillebrand Gori eShipping), USP |
| `docs/05_PRODUIT_MVP.md` | Parcours détaillé, comparaison des 4 stratégies, MVP |
| `docs/06_VALIDATION.md` | Plan de validation, guide d'entretien, seuils GO / revoir / STOP |
| `docs/07_BUSINESS_MODEL_BP.md` | Tarifs, économie unitaire, BP sur 3 ans, scénarios, seuil de rentabilité, financement |
| `docs/08_STRATEGIE_COMMERCIALE.md` | Segments, ICP, personas, canaux, salons, cycle de vente, budget, objectifs |
| `docs/09_EQUIPE_MANAGEMENT.md` | Organisation, recrutements, management, réseau de partenaires |
| `docs/10_RISQUES_TABLEAUX_DE_BORD.md` | Matrice de 14 risques et 26 indicateurs (KPI) |
| `docs/11_EURIDIS_SOUTENANCE.md` | Correspondance avec la grille, trame minutée, questions du jury, autoévaluation |
| `livrables/Passavin_Dossier_Investisseur.pptx` / `.pdf` | Dossier écrit de 30 pages |
| `livrables/Passavin_Pitch_Soutenance.pptx` / `.pdf` | Pitch de 20 slides |
| `annexes/BP_3ans.xlsx` | Hypothèses, détail mensuel pour 3 scénarios, synthèse, financement |
| `outils/` | `bp_model.py` → `build_annexes.py` → `build_decks.py` (régénération complète) |

## Régénérer

```bash
cd winetech/outils
python3 bp_model.py && python3 build_annexes.py && python3 build_decks.py
cd ../livrables && soffice --headless --convert-to pdf *.pptx
```

## Règles appliquées

- Chaque chiffre est étiqueté selon sa nature : FAIT (avec sa source), HYP (hypothèse) ou AVIS (jugement).
- Aucun client, résultat, associé ou diplôme n'a été inventé.
- Les données de l'écosystème Planet Aura ne sont jamais présentées comme des réalisations de Passavin. Le Sales Playbook Planet Aura n'a pas été fourni ni utilisé.
- À compléter par le porteur : `[Nom Prénom]`, `[Promotion]`, parcours, apport réel.
