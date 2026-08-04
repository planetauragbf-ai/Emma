# -*- coding: utf-8 -*-
"""Génère annexes/Modele_Financier_BP.xlsx — modèle 3 ans à formules.

Conventions couleur (standard modélisation) :
  bleu  = hypothèse modifiable · noir = formule · vert = lien inter-onglets.
Toutes les hypothèses vivent dans l'onglet « Hypothèses » ; le reste est calculé.
"""
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

ARIAL = "Arial"
BLUE = Font(name=ARIAL, size=10, color="0000FF")
BLACK = Font(name=ARIAL, size=10)
GREEN = Font(name=ARIAL, size=10, color="008000")
BOLD = Font(name=ARIAL, size=10, bold=True)
TITLE = Font(name=ARIAL, size=13, bold=True)
SECTION = Font(name=ARIAL, size=10, bold=True, color="FFFFFF")
NOTE = Font(name=ARIAL, size=9, italic=True, color="666666")
SEC_FILL = PatternFill("solid", fgColor="2F5B69")
HDR_FILL = PatternFill("solid", fgColor="DCE6EA")
KEY_FILL = PatternFill("solid", fgColor="FFF2CC")
EUR = '#,##0;(#,##0);"-"'
KEUR = '#,##0.0;(#,##0.0);"-"'
PCT = '0.0%'
NB = '#,##0'
DEC = '#,##0.00'
thin = Side(style="thin", color="B0B0B0")
BORDER = Border(left=thin, right=thin, top=thin, bottom=thin)

wb = Workbook()

# ---------------------------------------------------------------- helpers
def sec(ws, row, text, last_col="F"):
    ws.cell(row=row, column=1, value=text).font = SECTION
    for c in range(1, ws[f"A1:{last_col}1"][0].__len__() + 1):
        ws.cell(row=row, column=c).fill = SEC_FILL

def put(ws, coord, value, font=BLACK, fmt=None, fill=None, bold=False):
    c = ws[coord]
    c.value = value
    c.font = BOLD if bold else font
    if fmt:
        c.number_format = fmt
    if fill:
        c.fill = fill
    return c

# ================================================================ LISEZ-MOI
rm = wb.active
rm.title = "Lisez-moi"
rm.column_dimensions["A"].width = 110
put(rm, "A1", "MODÈLE FINANCIER — BUSINESS PLAN 3 ANS", TITLE)
lines = [
    "",
    "Structure : Hypothèses (toutes les entrées) → Trimestriel (moteur de calcul T1-T12) → Compte de résultat →",
    "Plan de financement → Seuil de rentabilité. Un chiffre modifié dans « Hypothèses » se propage partout.",
    "",
    "Code couleur : BLEU = hypothèse modifiable · NOIR = formule (ne pas écraser) · fond JAUNE = hypothèse clé.",
    "Unités : montants en € HT sauf mention « k€ » ; salaires en coûts chargés ; ETP = équivalents temps plein moyens.",
    "",
    "Statut des données : toutes les entrées sont des HYPOTHÈSES À VALIDER (colonne Justification), sauf mention",
    "[FAIT] avec source. Aucun chiffre d'illustration n'entre dans les calculs.",
    "",
    "Choix de modélisation (prudence assumée) :",
    "  · Le CA est reconnu sur les salariés couverts MOYENS du trimestre (mi-période) — pas d'effet d'annonce ARR.",
    "  · L'ARR affiché = salariés fin de période × prix moyen × 12 : c'est un run-rate, PAS le CA comptabilisé.",
    "  · Pilotes : tous les pilotes paient 4 €/salarié/mois pendant 3 mois ; pour les convertis, ces sommes sont",
    "    déduites du contrat — le modèle ne compte donc en CA pilote que les non-convertis (équivalent comptable).",
    "  · Trésorerie : facturation trimestrielle d'avance, pas d'hypothèse d'encaissement annuel upfront (prudent).",
    "  · L'adoption salariés (activation) n'impacte pas le CA facturé (l'employeur paie pour tout l'effectif) mais",
    "    conditionne le renouvellement : le churn logo (1 client an 2, 5 an 3) suppose le scénario central à ~22 %.",
    "  · IS : calculé an 3 après imputation des déficits reportables an 1-2, décaissé au T4 an 3 (prudent).",
    "",
    "Contrôles intégrés : lignes « Contrôle » (Trimestriel) et rapprochement trésorerie (Financement).",
]
for i, t in enumerate(lines, start=2):
    put(rm, f"A{i}", t, NOTE if t.startswith(" ") else BLACK)

# ================================================================ HYPOTHÈSES
hy = wb.create_sheet("Hypothèses")
for col, w in zip("ABCDEF", (52, 12, 12, 12, 12, 68)):
    hy.column_dimensions[col].width = w
put(hy, "A1", "HYPOTHÈSES — cellules bleues modifiables", TITLE)
put(hy, "F2", "Justification / statut", NOTE)

def hrow(r, label, vals, fmt=NB, key=False, note="", cols="BCD"):
    put(hy, f"A{r}", label)
    if not isinstance(vals, (list, tuple)):
        vals = [vals]
    for c, v in zip(cols, vals):
        cell = put(hy, f"{c}{r}", v, BLUE, fmt)
        if key:
            cell.fill = KEY_FILL
    if note:
        put(hy, f"F{r}", note, NOTE)

sec(hy, 3, "1 · Offre et prix")
hrow(4, "Prix Essentiel (€/salarié/mois)", 8, DEC, key=True,
     note="HYP n°1 à valider — test prix sur 20 DRH. Ancrage : Wellpass 1-20 €/sal/mois (seul benchmark public).")
hrow(5, "Prix Patrimoine (€/salarié/mois)", 15, DEC, key=True,
     note="HYP — haut de gamme QVT : se vend sur le ROI (coût d'un départ >> 15 €/mois).")
hrow(6, "Prix pilote (€/salarié/mois — 3 mois, déduit si signature)", 4, DEC,
     note="Décision d'offre. Corrige l'ancien « pilote gratuit » des documents Drive.")
hrow(7, "Taux de conversion pilote → contrat", 0.6, PCT, key=True,
     note="HYP — à mesurer dès les 5 premiers pilotes.")
put(hy, "B9", "An 1", BOLD); put(hy, "C9", "An 2", BOLD); put(hy, "D9", "An 3", BOLD)
hrow(10, "Part des salariés en offre Patrimoine", [0.20, 0.28, 0.35], PCT, key=True,
     note="HYP « land & expand » : montée en gamme progressive. L'ancien BP supposait ~45 % dès l'an 1 sans le dire.")
put(hy, "A11", "Prix moyen pondéré (€/salarié/mois)")
for c in "BCD":
    put(hy, f"{c}11", f"=$B$4*(1-{c}10)+$B$5*{c}10", BLACK, DEC)
put(hy, "F11", "Formule — 9,40 / 9,96 / 10,45 €.", NOTE)

sec(hy, 13, "2 · Commercial")
hrow(14, "Nouveaux clients ETI (bruts)", [15, 36, 75], NB, key=True,
     note="Objectif volontariste — voir entonnoir (§3) et Tableaux_De_Bord pour le pilotage.")
hrow(15, "Clients perdus (churn logo)", [0, 1, 5], NB,
     note="HYP — rétention logo > 90 %, conditionnée à l'activation (scénario central).")
put(hy, "A16", "Clients fin d'année (net)")
put(hy, "B16", "=B14-B15", BLACK, NB)
put(hy, "C16", "=B16+C14-C15", BLACK, NB)
put(hy, "D16", "=C16+D14-D15", BLACK, NB)
hrow(17, "Taille moyenne d'un client (salariés)", [400, 500, 583.33], NB,
     note="HYP — ETI 250-5 000 salariés ; la taille moyenne des comptes croît avec la maturité commerciale.")
put(hy, "A18", "Salariés couverts fin d'année")
for c in "BCD":
    put(hy, f"{c}18", f"={c}16*{c}17", BLACK, NB)
put(hy, "F18", "6 000 / 25 000 / 70 000 — objectifs du socle conservés.", NOTE)

sec(hy, 20, "3 · Entonnoir commercial (taux de passage)")
hrow(21, "Comptes travaillés → RDV obtenu", 0.25, PCT, note="HYP — outbound LinkedIn + prescripteurs.")
hrow(22, "RDV → démo qualifiée", 0.50, PCT)
hrow(23, "Démo → pilote", 0.40, PCT,
     note="An 1 : 15 contrats ⇒ 25 pilotes ⇒ 63 démos ⇒ 125 RDV ⇒ 500 comptes travaillés (formules au Seuil).")

sec(hy, 25, "4 · Adoption salariés (conditionne le renouvellement, pas le CA facturé)")
hrow(26, "Activation à 3 mois — scénario CENTRAL", 0.22, PCT, key=True,
     note="Benchmarks 04/08/2026 : RAND ~20 %, EAP digitaux 10-20 %, moyenne Moka.care ~20 % (04_BENCHMARKS.md).")
hrow(27, "Activation — scénario BAS (seuil d'alerte)", 0.12, PCT,
     note="Sous ce seuil : plan de relance (sponsoring interne, onboarding, relances managers).")
hrow(28, "Activation — scénario HAUT (conditionné)", 0.40, PCT,
     note="Niveau du meilleur client Moka.care. Exige sponsoring DG/managers + onboarding intégré. Ex-hypothèse unique du BP.")

sec(hy, 30, "5 · Packs payés par le salarié")
hrow(31, "Taux de souscription (% des salariés couverts, par an)", [0.03, 0.05, 0.06], PCT,
     note="HYP — packs : consultation 79 € · fiscalité+déclaration 99 € · retraite 149 € · immobilier 179 €.")
hrow(32, "Panier moyen (€)", 110, NB, note="HYP — mix des 4 packs.")
hrow(33, "Reversement expert agréé (% du prix)", 0.65, PCT,
     note="On facture un service, jamais une commission produit ; le CGP est payé à la consultation.")

sec(hy, 35, "6 · Coûts variables (COGS)")
hrow(36, "Infra, sécurité & coach IA (€/salarié/mois)", [0.90, 0.80, 0.70], DEC,
     note="HYP — hébergement UE + inférence IA ; économies d'échelle.")
hrow(37, "Support niveau 1 externalisé (€/salarié/mois)", 0.40, DEC)
hrow(38, "Coachs humains inclus (€/salarié Patrimoine/mois)", 1.90, DEC,
     note="HYP — consommation ~15 %/an d'une session incluse à ~150 € de coût expert.")
hrow(39, "Frais de facturation & paiement (% du CA)", 0.015, PCT)

sec(hy, 41, "7 · Équipe (ETP moyens sur l'année, coûts chargés)")
put(hy, "A42", "Rôle", BOLD); put(hy, "B42", "Coût chargé (k€/an)", BOLD)
put(hy, "C42", "ETP An 1", BOLD); put(hy, "D42", "ETP An 2", BOLD); put(hy, "E42", "ETP An 3", BOLD)
team = [
    ("Fondatrice (CEO — vente, pilotage)", 75, 1, 1, 1),
    ("VP Sales", 110, 0, 0.5, 1),
    ("Account executives", 80, 0.75, 2.5, 5),
    ("SDR (prospection)", 55, 0, 1, 2),
    ("Customer success (1 CSM / ~20 clients)", 58, 0.5, 3, 6),
    ("Produit (PM / UX)", 78, 0.83, 1.5, 2),
    ("Développeurs internes", 75, 0, 1, 4),
    ("Data / analytics", 70, 0, 0.5, 1.5),
    ("Contenu pédagogique", 60, 0.5, 1.5, 2.5),
    ("Conformité / DPO", 70, 0, 0.5, 1),
    ("Ops / RH / Finance", 55, 0, 1, 2.5),
]
r0 = 43
for i, (role, cost, f1, f2, f3) in enumerate(team):
    r = r0 + i
    put(hy, f"A{r}", role)
    put(hy, f"B{r}", cost, BLUE, NB)
    put(hy, f"C{r}", f1, BLUE, '0.00')
    put(hy, f"D{r}", f2, BLUE, '0.00')
    put(hy, f"E{r}", f3, BLUE, '0.00')
rT = r0 + len(team)  # 54
put(hy, f"A{rT}", "Masse salariale (k€/an)", BOLD)
for c in "CDE":
    put(hy, f"{c}{rT}", f"=SUMPRODUCT($B{r0}:$B{rT-1},{c}{r0}:{c}{rT-1})", BLACK, KEUR, bold=True)
put(hy, f"A{rT+1}", "ETP moyens", BOLD)
for c in "CDE":
    put(hy, f"{c}{rT+1}", f"=SUM({c}{r0}:{c}{rT-1})", BLACK, '0.0', bold=True)
put(hy, f"F{rT}", "≈ 259 / 966 / 1 962 k€ — salaires chargés marché 2026, grilles France hors Île-de-France mixtes.", NOTE)

sec(hy, 56, "8 · Autres charges fixes (k€/an)")
hrow(57, "Studio de développement externalisé", [300, 350, 150], NB, key=True,
     note="MVP an 1 en asset-light, internalisation progressive (4 devs an 3).")
hrow(58, "Marketing, événements, contenu de marque", [60, 300, 700], NB,
     note="Création de catégorie : ANDRH, salons RH, contenu DRH, RP.")
hrow(59, "Commissions prescripteurs (% du CA abonnements)", [0, 0.02, 0.0375], PCT,
     note="HYP — ~25 % du CA apporté par mutuelles/experts-comptables, commission ~15 %.")
hrow(60, "Juridique, comptable, conformité externe", [45, 55, 80], NB)
hrow(61, "Loyers, outils, assurances, G&A", [50, 110, 220], NB)
hrow(62, "Recrutement", [15, 40, 60], NB)
hrow(63, "Audit sécurité / pentest", [0, 25, 45], NB, note="Crédibilité données financières salariés.")

sec(hy, 65, "9 · Financement, capex, divers")
hrow(66, "Levée de fonds (encaissée T1 an 1, €)", 1500000, EUR, key=True,
     note="Justification au Seuil : besoin identifié ≈ 0,8 M€, scénario prudent ≈ 1,3 M€ → 1,5 M€.")
hrow(67, "Apport fondatrice (ante-création, €)", 30000, EUR)
hrow(68, "Prêt d'honneur (€)", 20000, EUR, note="Réseau Entreprendre / Initiative France — à candidater.")
hrow(69, "Subvention (Bourse French Tech — à confirmer, €)", 30000, EUR,
     note="HYP à confirmer — non comptée au compte de résultat (prudence), uniquement en trésorerie/financement.")
hrow(70, "Frais ante-création (étude, juridique, marque INPI, maquette, €)", 60000, EUR)
hrow(71, "Capex matériel (€/trimestre)", [5000, 6000, 8000], EUR)
hrow(72, "Amortissements (k€/an)", [10, 20, 30], NB)
hrow(73, "Taux d'IS", 0.25, PCT)
hrow(74, "Remboursement prêt d'honneur (an 3, €)", 20000, EUR)
hrow(75, "Variation de BFR (k€/an — prudent)", [20, 40, 60], NB,
     note="Facturation trimestrielle d'avance ⇒ BFR structurellement faible ; provision prudente.")

# ================================================================ TRIMESTRIEL
tq = wb.create_sheet("Trimestriel")
tq.column_dimensions["A"].width = 46
for i in range(2, 18):
    tq.column_dimensions[get_column_letter(i)].width = 11
put(tq, "A1", "MOTEUR TRIMESTRIEL (T1-T12)", TITLE)
QC = [get_column_letter(2 + i) for i in range(12)]           # B..M
YC = ["N", "O", "P"]                                          # totaux annuels
HYQ = ["B", "B", "B", "B", "C", "C", "C", "C", "D", "D", "D", "D"]  # col Hypothèses par trimestre
HYT = ["C", "C", "C", "C", "D", "D", "D", "D", "E", "E", "E", "E"]  # col équipe par trimestre
for i, c in enumerate(QC):
    put(tq, f"{c}2", f"T{i+1}", BOLD).fill = HDR_FILL
for j, c in enumerate(YC):
    put(tq, f"{c}2", f"An {j+1}", BOLD).fill = KEY_FILL
put(tq, "A2", "", BOLD)

ROWS = {}
def trow(r, label, per_q, fmt=EUR, font=BLACK, annual="sum", bold=False, fill=None):
    """per_q: fn(i, c) -> formula/valeur pour trimestre i (0-based), colonne c."""
    put(tq, f"A{r}", label, bold=bold)
    for i, c in enumerate(QC):
        cell = put(tq, f"{c}{r}", per_q(i, c), font, fmt, bold=bold)
        if fill:
            cell.fill = fill
    if annual == "sum":
        for j, yc in enumerate(YC):
            a, b = QC[4 * j], QC[4 * j + 3]
            put(tq, f"{yc}{r}", f"=SUM({a}{r}:{b}{r})", BLACK, fmt, bold=True)
    elif annual == "last":
        for j, yc in enumerate(YC):
            put(tq, f"{yc}{r}", f"={QC[4 * j + 3]}{r}", BLACK, fmt, bold=True)
    ROWS[label] = r
    return r

sec(tq, 3, "Clients et salariés couverts", last_col="P")
adds = [0, 2, 5, 8, 8, 9, 9, 10, 17, 18, 19, 21]
churn = [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2]
trow(4, "Nouveaux clients (bruts)", lambda i, c: adds[i], NB, BLUE)
trow(5, "Clients perdus", lambda i, c: churn[i], NB, BLUE)
trow(6, "Clients fin de trimestre",
     lambda i, c: f"={QC[i-1]}6+{c}4-{c}5" if i else f"={c}4-{c}5", NB, annual="last")
trow(7, "Taille moyenne (salariés/client)", lambda i, c: f"=Hypothèses!{HYQ[i]}$17", NB, GREEN, annual="last")
trow(8, "Salariés couverts (fin)", lambda i, c: f"={c}6*{c}7", NB, annual="last")
trow(9, "Salariés couverts (moyens)",
     lambda i, c: f"=({QC[i-1]}8+{c}8)/2" if i else f"={c}8/2", NB, annual="last")
put(tq, "A10", "Contrôle : nouveaux clients = Hypothèses (0 attendu)", NOTE)
put(tq, "N10", "=SUM(B4:E4)-Hypothèses!B14", BLACK, NB)
put(tq, "O10", "=SUM(F4:I4)-Hypothèses!C14", BLACK, NB)
put(tq, "P10", "=SUM(J4:M4)-Hypothèses!D14", BLACK, NB)

sec(tq, 11, "Revenus", last_col="P")
trow(12, "Prix moyen (€/salarié/mois)", lambda i, c: f"=Hypothèses!{HYQ[i]}$11", DEC, GREEN, annual="last")
trow(13, "CA abonnements", lambda i, c: f"={c}9*{c}12*3")
trow(14, "Pilotes menés (nb)", lambda i, c: f"={c}4/Hypothèses!$B$7", '0.0', annual="sum")
trow(15, "CA pilotes (non convertis)",
     lambda i, c: f"={c}14*(1-Hypothèses!$B$7)*{c}7*Hypothèses!$B$6*3")
trow(16, "CA packs salariés",
     lambda i, c: f"={c}9*Hypothèses!{HYQ[i]}$31/4*Hypothèses!$B$32")
trow(17, "Chiffre d'affaires total", lambda i, c: f"={c}13+{c}15+{c}16", bold=True, fill=HDR_FILL)

sec(tq, 18, "Coûts variables (COGS)", last_col="P")
trow(19, "Infra, sécurité & IA", lambda i, c: f"={c}9*Hypothèses!{HYQ[i]}$36*3")
trow(20, "Support niveau 1", lambda i, c: f"={c}9*Hypothèses!$B$37*3")
trow(21, "Coachs humains inclus (Patrimoine)",
     lambda i, c: f"={c}9*Hypothèses!{HYQ[i]}$10*Hypothèses!$B$38*3")
trow(22, "Facturation & paiement", lambda i, c: f"={c}17*Hypothèses!$B$39")
trow(23, "Reversement experts (packs)", lambda i, c: f"={c}16*Hypothèses!$B$33")
trow(24, "COGS total", lambda i, c: f"=SUM({c}19:{c}23)", bold=True)
trow(25, "Marge brute", lambda i, c: f"={c}17-{c}24", bold=True, fill=HDR_FILL)
put(tq, "A26", "Marge brute (%)")
for i, c in enumerate(QC):
    put(tq, f"{c}26", f'=IFERROR({c}25/{c}17,"")', BLACK, PCT)
for j, yc in enumerate(YC):
    put(tq, f"{yc}26", f"=IFERROR({yc}25/{yc}17,\"\")", BLACK, PCT, bold=True)

sec(tq, 27, "Charges fixes", last_col="P")
trow(28, "Masse salariale", lambda i, c: f"=Hypothèses!{HYT[i]}$54/4*1000")
trow(29, "Studio de développement", lambda i, c: f"=Hypothèses!{HYQ[i]}$57/4*1000")
trow(30, "Marketing & marque", lambda i, c: f"=Hypothèses!{HYQ[i]}$58/4*1000")
trow(31, "Commissions prescripteurs", lambda i, c: f"={c}13*Hypothèses!{HYQ[i]}$59")
trow(32, "Juridique & conformité", lambda i, c: f"=Hypothèses!{HYQ[i]}$60/4*1000")
trow(33, "G&A (loyers, outils, assurances)", lambda i, c: f"=Hypothèses!{HYQ[i]}$61/4*1000")
trow(34, "Recrutement + audit sécurité",
     lambda i, c: f"=(Hypothèses!{HYQ[i]}$62+Hypothèses!{HYQ[i]}$63)/4*1000")
trow(35, "Charges fixes totales", lambda i, c: f"=SUM({c}28:{c}34)", bold=True)
trow(36, "EBITDA", lambda i, c: f"={c}25-{c}35", bold=True, fill=KEY_FILL)

sec(tq, 37, "Trésorerie", last_col="P")
trow(38, "Capex", lambda i, c: f"=Hypothèses!{HYQ[i]}$71")
trow(39, "Variation de BFR", lambda i, c: f"=Hypothèses!{HYQ[i]}$75*1000/4")
trow(40, "IS décaissé + remboursement prêt",
     lambda i, c: "=-'Compte de résultat'!D20+Hypothèses!$B$74" if i == 11 else 0)
trow(41, "Flux de trésorerie d'exploitation",
     lambda i, c: f"={c}36-{c}38-{c}39-{c}40", bold=True)
trow(42, "Apports (levée + apports nets ante-création)",
     lambda i, c: ("=Hypothèses!$B$66+Hypothèses!$B$67+Hypothèses!$B$68"
                   "+Hypothèses!$B$69-Hypothèses!$B$70") if i == 0 else 0)
trow(43, "Trésorerie fin de trimestre",
     lambda i, c: f"={QC[i-1]}43+{c}41+{c}42" if i else f"={c}41+{c}42",
     bold=True, fill=HDR_FILL, annual="last")
put(tq, "A44", "Flux cumulé HORS levée (besoin de financement)", NOTE)
for i, c in enumerate(QC):
    prev = f"{QC[i-1]}44+" if i else ""
    put(tq, f"{c}44", f"={prev}{c}41", BLACK, EUR)
put(tq, "A45", "ARR fin de trimestre (run-rate)", NOTE)
for i, c in enumerate(QC):
    put(tq, f"{c}45", f"={c}8*{c}12*12", BLACK, EUR)
for j, yc in enumerate(YC):
    put(tq, f"{yc}45", f"={QC[4*j+3]}45", BLACK, EUR, bold=True)

# ================================================================ COMPTE DE RÉSULTAT
cr = wb.create_sheet("Compte de résultat")
cr.column_dimensions["A"].width = 52
for c in "BCD":
    cr.column_dimensions[c].width = 14
cr.column_dimensions["F"].width = 66
put(cr, "A1", "COMPTE DE RÉSULTAT PRÉVISIONNEL — 3 ANS (€, HT)", TITLE)
put(cr, "A2", "15 lignes — format imposé par la grille de soutenance (slide « compte de résultat »).", NOTE)
put(cr, "B3", "An 1", BOLD); put(cr, "C3", "An 2", BOLD); put(cr, "D3", "An 3", BOLD)
for c in "BCD":
    cr[f"{c}3"].fill = HDR_FILL
Y = {"B": "N", "C": "O", "D": "P"}
def cline(r, label, f, fmt=EUR, bold=False, fill=None, note=""):
    put(cr, f"A{r}", label, bold=bold)
    for c in "BCD":
        cell = put(cr, f"{c}{r}", f(c), BLACK, fmt, bold=bold)
        if fill:
            cell.fill = fill
    if note:
        put(cr, f"F{r}", note, NOTE)

cline(4, "CA abonnements (employeurs)", lambda c: f"=Trimestriel!{Y[c]}13")
cline(5, "CA pilotes", lambda c: f"=Trimestriel!{Y[c]}15")
cline(6, "CA packs (salariés)", lambda c: f"=Trimestriel!{Y[c]}16")
cline(7, "Chiffre d'affaires total", lambda c: f"=SUM({c}4:{c}6)", bold=True, fill=HDR_FILL)
cline(8, "Coûts variables (COGS)", lambda c: f"=-Trimestriel!{Y[c]}24")
cline(9, "Marge brute", lambda c: f"={c}7+{c}8", bold=True, fill=HDR_FILL,
      note="≈ 80 % — cohérent avec l'hypothèse « ~78-80 % » du socle.")
cline(10, "Masse salariale", lambda c: f"=-Trimestriel!{Y[c]}28")
cline(11, "Développement externalisé (studio)", lambda c: f"=-Trimestriel!{Y[c]}29")
cline(12, "Marketing & commissions prescripteurs", lambda c: f"=-Trimestriel!{Y[c]}30-Trimestriel!{Y[c]}31")
cline(13, "Frais généraux, juridique, conformité", lambda c: f"=-Trimestriel!{Y[c]}32-Trimestriel!{Y[c]}33-Trimestriel!{Y[c]}34")
cline(14, "EBITDA", lambda c: f"={c}9+SUM({c}10:{c}13)", bold=True, fill=KEY_FILL)
put(cr, "A15", "EBITDA (% du CA)")
for c in "BCD":
    put(cr, f"{c}15", f'=IFERROR({c}14/{c}7,"")', BLACK, PCT)
cline(16, "Amortissements", lambda c: f"=-Hypothèses!{c}72*1000")
cline(17, "Résultat d'exploitation", lambda c: f"={c}14+{c}16", bold=True)
put(cr, "A18", "Déficits reportables imputés (an 3)", NOTE)
put(cr, "B18", 0, BLACK, EUR); put(cr, "C18", 0, BLACK, EUR)
put(cr, "D18", "=MIN(0,B17)+MIN(0,C17)", BLACK, EUR)
put(cr, "A19", "Résultat imposable (après reports)", NOTE)
put(cr, "B19", "=MIN(0,B17)", BLACK, EUR); put(cr, "C19", "=MIN(0,C17)", BLACK, EUR)
put(cr, "D19", "=MAX(0,D17+D18)", BLACK, EUR)
cline(20, "Impôt sur les sociétés", lambda c: f"=-MAX(0,{c}19)*Hypothèses!$B$73")
cline(21, "Résultat net", lambda c: f"={c}17+{c}20", bold=True, fill=KEY_FILL)

sec(cr, 23, "Indicateurs clés (découlent du modèle)", last_col="F")
def kline(r, label, f, fmt=EUR, note=""):
    put(cr, f"A{r}", label)
    for c in "BCD":
        put(cr, f"{c}{r}", f(c), BLACK, fmt)
    if note:
        put(cr, f"F{r}", note, NOTE)
kline(24, "ARR fin d'année (run-rate)", lambda c: f"=Trimestriel!{Y[c]}45",
      note="0,68 / 3,0 / 8,8 M€ — remplace l'ancien « 0,8 / 3,5 / 9,5 » qui confondait ARR et CA.")
kline(25, "Clients fin d'année", lambda c: f"=Trimestriel!{Y[c]}6", NB)
kline(26, "Salariés couverts fin d'année", lambda c: f"=Trimestriel!{Y[c]}8", NB)
kline(27, "Marge brute %", lambda c: f"=Trimestriel!{Y[c]}26", PCT)
put(cr, "A28", "CAC (S&M / nouveaux clients, €)")
for c, hyc in zip("BCD", "CDE"):
    put(cr, f"{c}28",
        f"=(SUMPRODUCT(Hypothèses!$B$44:$B$46,Hypothèses!{hyc}44:{hyc}46)*1000"
        f"+Trimestriel!{Y[c]}30+Trimestriel!{Y[c]}31)/Hypothèses!{'BCD'['BCD'.index(c)]}14", BLACK, EUR)
put(cr, "F28", "S&M = VP Sales + AE + SDR + marketing + commissions. An 2 ≈ 18 k€/client.", NOTE)
put(cr, "A29", "ARR apporté par nouveau client (€)")
for c in "BCD":
    put(cr, f"{c}29", f"=Hypothèses!{c}17*Hypothèses!{c}11*12", BLACK, EUR)
put(cr, "A30", "Payback CAC (mois, sur marge brute)")
for c in "BCD":
    put(cr, f"{c}30", f'=IFERROR({c}28/({c}29*Trimestriel!{Y[c]}26/12),"")', BLACK, '0.0')
put(cr, "F30", "≈ 4-5 mois an 2 — excellent pour du SaaS B2B (référence : < 12 mois).", NOTE)

# ================================================================ FINANCEMENT
fi = wb.create_sheet("Financement")
fi.column_dimensions["A"].width = 52
for c in "BCDE":
    fi.column_dimensions[c].width = 14
fi.column_dimensions["G"].width = 60
put(fi, "A1", "PLAN DE FINANCEMENT — ANTE-CRÉATION + 3 ANS (€)", TITLE)
put(fi, "B3", "Ante-création", BOLD); put(fi, "C3", "An 1", BOLD)
put(fi, "D3", "An 2", BOLD); put(fi, "E3", "An 3", BOLD)
for c in "BCDE":
    fi[f"{c}3"].fill = HDR_FILL
sec(fi, 4, "Emplois (besoins)", last_col="G")
put(fi, "A5", "Frais d'établissement, marque, étude, maquette")
put(fi, "B5", "=Hypothèses!B70", GREEN, EUR)
put(fi, "A6", "Capex matériel")
for c, yc in zip("CDE", YC):
    put(fi, f"{c}6", f"=Trimestriel!{yc}38", GREEN, EUR)
put(fi, "A7", "Variation de BFR")
for c, yc in zip("CDE", YC):
    put(fi, f"{c}7", f"=Trimestriel!{yc}39", GREEN, EUR)
put(fi, "A8", "Insuffisance d'autofinancement (pertes − amortissements)")
put(fi, "C8", "=MAX(0,-('Compte de résultat'!B21+Hypothèses!B72*1000))", BLACK, EUR)
put(fi, "D8", "=MAX(0,-('Compte de résultat'!C21+Hypothèses!C72*1000))", BLACK, EUR)
put(fi, "E8", 0, BLACK, EUR)
put(fi, "A9", "Remboursement prêt d'honneur")
put(fi, "E9", "=Hypothèses!B74", GREEN, EUR)
put(fi, "A10", "Total emplois", BOLD)
for c in "BCDE":
    put(fi, f"{c}10", f"=SUM({c}5:{c}9)", BLACK, EUR, bold=True)
sec(fi, 11, "Ressources", last_col="G")
put(fi, "A12", "Apport fondatrice"); put(fi, "B12", "=Hypothèses!B67", GREEN, EUR)
put(fi, "A13", "Prêt d'honneur"); put(fi, "B13", "=Hypothèses!B68", GREEN, EUR)
put(fi, "A14", "Subvention (à confirmer)"); put(fi, "B14", "=Hypothèses!B69", GREEN, EUR)
put(fi, "A15", "Levée de fonds (seed)"); put(fi, "C15", "=Hypothèses!B66", GREEN, EUR)
put(fi, "G15", "Encaissée au T1 an 1 — le tour se signe À LA CRÉATION, pas « à 18 mois » (incohérence corrigée).", NOTE)
put(fi, "A16", "Capacité d'autofinancement (RN + amortissements)")
put(fi, "C16", 0, BLACK, EUR); put(fi, "D16", 0, BLACK, EUR)
put(fi, "E16", "=MAX(0,'Compte de résultat'!D21+Hypothèses!D72*1000)", BLACK, EUR)
put(fi, "A17", "Total ressources", BOLD)
for c in "BCDE":
    put(fi, f"{c}17", f"=SUM({c}12:{c}16)", BLACK, EUR, bold=True)
put(fi, "A19", "Solde annuel", BOLD)
for c in "BCDE":
    put(fi, f"{c}19", f"={c}17-{c}10", BLACK, EUR, bold=True)
put(fi, "A20", "Trésorerie cumulée", BOLD)
put(fi, "B20", "=B19", BLACK, EUR, bold=True)
for c, p in zip("CDE", "BCD"):
    put(fi, f"{c}20", f"={p}20+{c}19", BLACK, EUR, bold=True)
    fi[f"{c}20"].fill = KEY_FILL
put(fi, "A22", "Contrôle : trésorerie cumulée an 3 − trésorerie Trimestriel T12 (écart d'arrondi attendu ≈ 0)", NOTE)
put(fi, "B22", "=E20-Trimestriel!M43", BLACK, EUR)

# ================================================================ SEUIL
se = wb.create_sheet("Seuil de rentabilité")
se.column_dimensions["A"].width = 58
for c in "BCD":
    se.column_dimensions[c].width = 15
se.column_dimensions["F"].width = 62
put(se, "A1", "SEUIL DE RENTABILITÉ, POINT MORT, BESOIN DE FINANCEMENT", TITLE)
sec(se, 3, "Point mort — traduit en quantités (exigence de la grille)", last_col="F")
put(se, "B4", "Structure an 2", BOLD); put(se, "C4", "Structure an 3", BOLD)
put(se, "A5", "Charges fixes trimestrielles (€)")
put(se, "B5", "=Trimestriel!O35/4", BLACK, EUR); put(se, "C5", "=Trimestriel!P35/4", BLACK, EUR)
put(se, "A6", "Marge brute par salarié couvert et par trimestre (€)")
put(se, "B6", "=Hypothèses!C11*3*Trimestriel!O26", BLACK, DEC)
put(se, "C6", "=Hypothèses!D11*3*Trimestriel!P26", BLACK, DEC)
put(se, "A7", "SEUIL : salariés couverts nécessaires", BOLD)
put(se, "B7", "=B5/B6", BLACK, NB, bold=True); put(se, "C7", "=C5/C6", BLACK, NB, bold=True)
se["B7"].fill = KEY_FILL; se["C7"].fill = KEY_FILL
put(se, "A8", "SEUIL : en nombre de clients ETI moyens", BOLD)
put(se, "B8", "=B7/Hypothèses!C17", BLACK, NB, bold=True)
put(se, "C8", "=C7/Hypothèses!D17", BLACK, NB, bold=True)
put(se, "F7", "≈ 20 000 salariés (structure an 2) / ≈ 36 000 (structure an 3, coûts pleins).", NOTE)
put(se, "A9", "Franchissement effectif (lecture du Trimestriel)", NOTE)
put(se, "B9", "EBITDA trimestriel positif à partir du T7 (an 2) ; EBITDA annuel positif an 3.", NOTE)

sec(se, 11, "Entonnoir commercial an 1 — d'où viennent les 15 clients", last_col="F")
put(se, "A12", "Contrats visés an 1"); put(se, "B12", "=Hypothèses!B14", GREEN, NB)
put(se, "A13", "Pilotes nécessaires"); put(se, "B13", "=B12/Hypothèses!B7", BLACK, '0')
put(se, "A14", "Démos nécessaires"); put(se, "B14", "=B13/Hypothèses!B23", BLACK, '0')
put(se, "A15", "RDV nécessaires"); put(se, "B15", "=B14/Hypothèses!B22", BLACK, '0')
put(se, "A16", "Comptes à travailler (sur 7 442 ETI)"); put(se, "B16", "=B15/Hypothèses!B21", BLACK, '0')
put(se, "F16", "≈ 500 comptes ⇒ intenable pour une personne seule ⇒ l'AE recruté dès M4 est indispensable.", NOTE)

sec(se, 18, "Sensibilité — EBITDA an 3 (approximations documentées)", last_col="F")
put(se, "A19", "Scénario central"); put(se, "B19", "='Compte de résultat'!D14", BLACK, EUR)
put(se, "A20", "Ventes −30 % (marge brute ×0,7, charges fixes constantes)")
put(se, "B20", "='Compte de résultat'!D9*0.7+SUM('Compte de résultat'!D10:D13)", BLACK, EUR)
put(se, "A21", "Prix −20 % (CA ×0,8, COGS constants)")
put(se, "B21", "='Compte de résultat'!D7*0.8+'Compte de résultat'!D8+SUM('Compte de résultat'!D10:D13)", BLACK, EUR)
put(se, "A22", "Mix Patrimoine gelé à 20 % (prix moyen 9,40 €)")
put(se, "B22", "='Compte de résultat'!D7*(9.4/Hypothèses!D11)*0.8+SUM('Compte de résultat'!D10:D13)", BLACK, EUR)
put(se, "F20", "Le projet reste bénéficiaire an 3 même à −30 % de ventes : c'est l'argument de robustesse.", NOTE)

sec(se, 24, "Besoin de financement — justification de la levée", last_col="F")
put(se, "A25", "Besoin cumulé maximal hors levée (scénario central)")
put(se, "B25", "=-MIN(Trimestriel!B44:M44)", BLACK, EUR)
put(se, "A26", "Besoin en scénario prudent (−30 % de marge brute an 2)")
put(se, "B26", "=B25+0.3*Trimestriel!O25", BLACK, EUR)
put(se, "F26", "Approximation : le retard de marge an 2 s'ajoute au besoin central.", NOTE)
put(se, "A27", "Levée sollicitée", BOLD); put(se, "B27", "=Hypothèses!B66", GREEN, EUR, bold=True)
se["B27"].fill = KEY_FILL
put(se, "A28", "Marge de sécurité sur le scénario prudent")
put(se, "B28", "=IFERROR(B27/B26-1,\"\")", BLACK, PCT)
put(se, "A29", "Trésorerie minimale sur 3 ans (avec levée)")
put(se, "B29", "=MIN(Trimestriel!B43:M43)", BLACK, EUR)

wb.save("/home/user/Emma/annexes/Modele_Financier_BP.xlsx")
print("OK — annexes/Modele_Financier_BP.xlsx")
