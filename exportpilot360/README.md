# ExportPilot 360 — projet de création d'entreprise (Bloc 3 Euridis)

| Dossier | Contenu |
|---|---|
| `docs/01` à `docs/14` | Livrables d'analyse : analyse critique, concept, marché, concurrence, business model, stratégie, roadmap, organisation, BP, risques, KPI, questions du jury, grille de conformité |
| `recherche/fact_base.md` | Base de faits sourcée et datée (source unique des chiffres de marché) |
| `finance/` | Modèle financier à formules (`Modele_Financier_ExportPilot360.xlsx`), générateur (`build_model.py`), recalcul LibreOffice et scénarios (`recalc.py` → `resultats.json`) |
| `decks/` | Dossier d'investissement (PDF) et soutenance (PDF + PPTX avec notes) |
| `build/` | Générateurs des decks |

Règles :
- Aucun chiffre sans statut ([FAIT] sourcé / [HYP] / [TERRAIN] / [ILL]).
- Aucune donnée interne de Planet Aura.
- Pour régénérer : `python3 finance/recalc.py` puis `node build/build_decks.mjs`.
