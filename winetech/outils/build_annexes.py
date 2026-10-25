"""Construit annexes/BP_3ans.xlsx et les graphiques (charts/*.png) à partir de bp_out.json."""
import json, os
import matplotlib; matplotlib.use("Agg")
import matplotlib.pyplot as plt
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment
from openpyxl.utils import get_column_letter

HERE = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.dirname(HERE)
D = json.load(open(os.path.join(HERE, "bp_out.json")))
os.makedirs(os.path.join(HERE, "charts"), exist_ok=True)
INK, WINE, TEAL, SAND, GREY = "#14233A", "#8C2F39", "#2A7F87", "#E9DFCF", "#6B7380"
HDR = PatternFill("solid", fgColor="14233A"); HF = Font(color="FFFFFF", bold=True)

wb = Workbook()
# --- Hypothèses
ws = wb.active; ws.title = "Hypothèses"
ws.append(["Paramètre", "Pessimiste", "Central", "Optimiste", "Statut"])
keys = [("arpa", "Revenu moyen abonnement €/mois/client"), ("setup_fee", "Frais d'installation moyens encaissés €"),
        ("churn_m", "Résiliation mensuelle"), ("new_y2_per_month", "Nouveaux clients/mois an 2"),
        ("new_y3_per_month", "Nouveaux clients/mois an 3"), ("ship_per_client", "Expéditions routées/client/mois"),
        ("ship_fee", "Frais plateforme logisticien €/expédition"), ("agency_commission", "Commission agences (récurrent)"),
        ("mvp_cost", "MVP (freelance) €"), ("dev_hire_month", "Mois d'embauche développeur·se"),
        ("bizdev_month", "Mois d'embauche business developer"), ("csm_month", "Mois d'embauche support/CSM"),
        ("equity_founder", "Apport fondateur €"), ("honor_loan", "Prêt d'honneur €"), ("bpi_grant", "Subvention BPI (BFT) €"),
        ("bank_loan", "Prêt bancaire €")]
for k, label in keys:
    ws.append([label] + [D[s]["p"][k] for s in ("pessimiste", "central", "optimiste")] + ["HYPOTHÈSE non validée"])
ws.append(["Nouveaux clients an 1 (mensuel)"] + [", ".join(str(x) for x in D[s]["p"]["new_y1"]) for s in ("pessimiste", "central", "optimiste")] + ["HYPOTHÈSE"])
# --- Mensuel central
cols = [("m", "Mois"), ("new", "Nouveaux"), ("churned", "Résiliés"), ("clients", "Clients actifs"), ("mrr", "MRR €"),
        ("setup", "Installation €"), ("services", "Services €"), ("shipfees", "Frais logisticiens €"), ("revenue", "CA €"),
        ("cogs", "Coûts variables €"), ("dev", "Développement €"), ("staff", "Salaires chargés €"), ("opex", "Autres charges €"),
        ("ebitda", "EBITDA €"), ("debt", "Remboursements €"), ("cash", "Trésorerie fin de mois €")]
for scen in ("central", "pessimiste", "optimiste"):
    w = wb.create_sheet(f"Mensuel_{scen}")
    w.append([c[1] for c in cols])
    for r in D[scen]["rows"]:
        w.append([round(r[c[0]], 1) if isinstance(r[c[0]], float) else r[c[0]] for c in cols])
# --- Synthèse
w = wb.create_sheet("Synthèse_annuelle")
labels = [("nouveaux", "Nouveaux clients"), ("clients_fin", "Clients actifs fin d'année"), ("arr_fin", "ARR fin d'année €"),
          ("ca_abonnements", "CA abonnements €"), ("ca_installation", "CA installation €"), ("ca_services", "CA services €"),
          ("ca_logisticiens", "CA frais logisticiens €"), ("ca_total", "CA total €"), ("couts_variables", "Coûts variables €"),
          ("marge_brute", "Marge brute €"), ("taux_marge_brute", "Taux de marge brute"), ("developpement", "Développement €"),
          ("salaires", "Salaires chargés €"), ("autres_charges", "Autres charges €"), ("ebitda", "EBITDA €"),
          ("tresorerie_fin", "Trésorerie fin d'année (après 120 k€ de financement initial) €"), ("cac", "CAC (coût d'acquisition/nouveau client) €")]
w.append(["Indicateur"] + [f"{s} A{y}" for s in ("pessimiste", "central", "central_sans_logisticien", "optimiste") for y in (1, 2, 3)])
for k, lab in labels:
    w.append([lab] + [round(D[s]["years"][y][k], 3 if k == "taux_marge_brute" else 0) for s in ("pessimiste", "central", "central_sans_logisticien", "optimiste") for y in range(3)])
w.append([]); w.append(["Formules"]);
for f in ["Clients(m) = Clients(m-1) × (1 − churn) + Nouveaux(m)", "MRR = Clients × ARPA",
          "CA = MRR + Nouveaux × (1 − part agences) × frais d'installation + services/12 + Clients × expéditions × frais logisticien",
          "Coûts variables = hébergement 3 €/client + frais de paiement 1,5 % du CA + support 0,5 h × 30 €/client (tant que pas de CSM) + commission agences 20 % × MRR × part agences",
          "EBITDA = CA − coûts variables − développement − salaires − autres charges",
          "CAC = (marketing + salaires commerciaux + 30 % du coût dirigeant) / nouveaux clients",
          "Seuil de rentabilité (clients) = charges fixes mensuelles / contribution mensuelle par client"]:
    w.append([f])
# --- Financement
w = wb.create_sheet("Financement")
c = D["central"]
w.append(["Source", "Montant €", "Moment", "Statut"])
for row in [("Apport fondateur", 10000, "M0", "À confirmer par le fondateur"), ("Prêt d'honneur (Initiative France / Réseau Entreprendre)", 30000, "M0-M2", "HYP — dossier à déposer"),
            ("Bourse French Tech BPI (subvention)", 30000, "M2-M4", "HYP — éligibilité innovation non garantie"), ("Prêt bancaire (adossé au prêt d'honneur)", 50000, "M2", "HYP"),
            ("Levée business angels / seed (tranche conditionnée)", 200000, "M15-M18", "Conditionnée aux jalons de validation")]:
    w.append(list(row))
w.append(["Total", 320000]); w.append([])
w.append(["Trésorerie minimale du scénario central avant levée", round(c["cash_min"]), f"M{c['cash_min_m']}"])
w.append(["Clients nécessaires au point mort (structure M36 central)", round(c["clients_be"])])
for ws_ in wb.worksheets:
    for cell in ws_[1]: cell.fill = HDR; cell.font = HF
    for i in range(1, ws_.max_column + 1): ws_.column_dimensions[get_column_letter(i)].width = 18
    ws_.column_dimensions["A"].width = 52
wb.save(os.path.join(ROOT, "annexes", "BP_3ans.xlsx"))

# --- Graphiques
plt.rcParams.update({"font.family": "DejaVu Sans", "font.size": 11, "axes.spines.top": False, "axes.spines.right": False})
def save(fig, name): fig.savefig(os.path.join(HERE, "charts", name), dpi=200, bbox_inches="tight", transparent=False, facecolor="white"); plt.close(fig)

fig, ax = plt.subplots(figsize=(8, 4))
for s, col, ls in (("pessimiste", GREY, "--"), ("central", WINE, "-"), ("optimiste", TEAL, "--")):
    ax.plot([r["m"] for r in D[s]["rows"]], [r["clients"] for r in D[s]["rows"]], color=col, ls=ls, lw=2.4, label=s)
ax.set_xlabel("Mois (M1 = janv. 2027)"); ax.set_ylabel("Clients payants actifs"); ax.legend(frameon=False); ax.grid(axis="y", alpha=.25)
save(fig, "clients.png")

fig, ax = plt.subplots(figsize=(8, 4))
for s, col, ls in (("pessimiste", GREY, "--"), ("central", WINE, "-"), ("central_sans_logisticien", INK, ":"), ("optimiste", TEAL, "--")):
    ax.plot([r["m"] for r in D[s]["rows"]], [r["cash"] / 1000 for r in D[s]["rows"]], color=col, ls=ls, lw=2.2, label=s.replace("_", " "))
ax.axhline(0, color="black", lw=.8); ax.set_xlabel("Mois"); ax.set_ylabel("Trésorerie (k€) avant levée seed"); ax.legend(frameon=False, fontsize=9); ax.grid(axis="y", alpha=.25)
save(fig, "tresorerie.png")

fig, ax = plt.subplots(figsize=(8, 4))
yrs = ["An 1 (2027)", "An 2 (2028)", "An 3 (2029)"]; Y = D["central"]["years"]
bottom = [0, 0, 0]
for k, lab, col in (("ca_abonnements", "Abonnements", WINE), ("ca_logisticiens", "Frais logisticiens (à valider)", TEAL), ("ca_installation", "Installation", "#C9A66B"), ("ca_services", "Services", GREY)):
    vals = [y[k] / 1000 for y in Y]; ax.bar(yrs, vals, bottom=bottom, color=col, label=lab, width=.55); bottom = [b + v for b, v in zip(bottom, vals)]
ax.plot(yrs, [y["ebitda"] / 1000 for y in Y], color=INK, marker="o", lw=2, label="EBITDA")
ax.axhline(0, color="black", lw=.8); ax.set_ylabel("k€"); ax.legend(frameon=False, fontsize=9, loc="upper left"); ax.grid(axis="y", alpha=.25)
save(fig, "ca_ebitda.png")
print("ok")
