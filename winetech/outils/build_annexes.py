"""Construit annexes/BP_3ans.xlsx (V2), les graphiques charts/*.png et docs/13_BP_V2_RESULTATS.md à partir de bp_out.json.
Relancer après toute modification de bp_model.py."""
import json, os
import matplotlib; matplotlib.use("Agg")
import matplotlib.pyplot as plt
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment
from openpyxl.utils import get_column_letter

HERE = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.dirname(HERE)
J = json.load(open(os.path.join(HERE, "bp_out.json")))
D = J["scenarios"]; C = D["central"]; P = C["p"]
LBL = J["src_label"]
os.makedirs(os.path.join(HERE, "charts"), exist_ok=True)
INK, WINE, TEAL, SAND, GREY, GOLD = "#14233A", "#8C2F39", "#2A7F87", "#E9DFCF", "#6B7380", "#C9A66B"
HDR = PatternFill("solid", fgColor="14233A"); HF = Font(color="FFFFFF", bold=True)
SC = ("pessimiste", "central", "optimiste")
SRC = ["ceo", "sales_fr", "sales_it", "sales_es", "agence_silver", "agence_gold", "apporteur"]
fr = lambda v: f"{v:,.0f}".replace(",", " ")

wb = Workbook()
# ------------------------------------------------------------------ Hypothèses
ws = wb.active; ws.title = "Hypothèses"
ws.append(["Paramètre", "Pessimiste", "Central", "Optimiste", "Statut / justification"])
rows = [
    ("Revenu moyen abonnement (ARPA) €/mois", lambda p: p["arpa"], "HYP — mix 40 % Essentiel 49 € / 45 % Pro 99 € / 15 % Expert 199 €"),
    ("Installation moyenne encaissée €", lambda p: p["setup_fee"], "HYP — liste 490 €, pilotes 190 €, 0 € si installée par une agence"),
    ("Résiliation mensuelle domaines", lambda p: p["churn_m"], "HYP — benchmark SaaS PME, à mesurer en pilote"),
    ("Frais plateforme logisticien €/expédition (mode neutre)", lambda p: p["ship_fee"], "HYP À VALIDER — payé par le logisticien choisi"),
    ("Part des domaines routés vers un logisticien payant ce frais", lambda p: p["ship_fee_share"], "HYP"),
    ("Lancement Shopify (mois)", lambda p: p["cms_launch"]["shopify"], "Plan produit"),
    ("Lancement PrestaShop (mois)", lambda p: p["cms_launch"]["presta"], "Plan produit (99 = hors horizon)"),
    ("Productivité nominale Sales France (signatures/mois, couverture CMS 100 %)", lambda p: p["sales"][0]["prod"], "HYP — 30 démos/mois × 25 % ; × part du vivier couverte par les CMS"),
    ("Productivité nominale Sales Italie", lambda p: p["sales"][1]["prod"], "HYP — marché nouveau, sans références"),
    ("Productivité nominale Sales Espagne & Portugal", lambda p: p["sales"][2]["prod"], "HYP — vivier plus petit"),
    ("Agence Silver : clients/mois", lambda p: p["agency_prod"]["silver"], "HYP — ≈ 1 client par trimestre"),
    ("Agence Gold : clients/mois", lambda p: p["agency_prod"]["gold"], "HYP — ≥ 1 client par mois"),
    ("Apporteur d'affaires : clients/mois", lambda p: p["referrer_prod"], "HYP — 3 clients par an"),
    ("Pénétration max. du SAM (saturation du vivier)", lambda p: p["pen_max"], "HYP — la productivité baisse quand le SAM se remplit"),
    ("Licences marque blanche signées (mois)", lambda p: ", ".join(f"M{x}" for x in p["wl_contracts"]), "HYP — signées par le dirigeant puis le partner manager"),
    ("Mise en place marque blanche €", lambda p: p["wl_setup"], "Grille Partner"),
    ("Frais par expédition marque blanche €", lambda p: p["wl_ship_fee"], "Grille Partner"),
    ("Domaines activés/mois par logisticien (régime)", lambda p: p["wl_domains_per_month"][-1], "HYP"),
    ("Apport fondateur €", lambda p: p["equity_founder"], "À confirmer"),
    ("Prêt d'honneur €", lambda p: p["honor_loan"], "HYP — Initiative France / Réseau Entreprendre"),
    ("Bourse French Tech (BPI) €", lambda p: p["bpi_grant"], "HYP — éligibilité non garantie"),
    ("Prêt bancaire €", lambda p: p["bank_loan"], "HYP"),
    ("Seed — fonds propres €", lambda p: p["seed_equity"], "Calculé : point bas + 6 mois de burn de sécurité"),
    ("Seed — prêt d'amorçage BPI €", lambda p: p["seed_bpi_loan"], "HYP — adossé à la levée"),
]
for lab, f, st in rows:
    ws.append([lab] + [f(D[s]["p"]) for s in SC] + [st])
ws.append([]); ws.append(["Marché (central)", "Producteurs", "Vendent en ligne", "Export particuliers", "Woo / Shopify / Presta"])
for c, mk in J["marche"].items():
    ws.append([c, mk["producteurs"], mk["online"], mk["export"], " / ".join(f"{mk['cms'][k]:.0%}" for k in ("woo", "shopify", "presta"))])

# ------------------------------------------------------------------ Production par ressource (central)
w = wb.create_sheet("Production_ressources")
w.append(["Mois"] + [LBL[s] for s in SRC] + ["Total nouveaux domaines Direct", "Licences marque blanche actives", "Domaines activés par les logisticiens"])
for r in C["rows"]:
    agg = {s: sum(v for k, v in r["prod"].items() if k.split("|")[0] == s) for s in SRC}
    w.append([r["m"]] + [round(agg[s], 2) for s in SRC] + [round(r["new"], 2), r["wl_partners"], round(r["wl_new_domains"], 1)])
w.append([]); w.append(["Totaux annuels"] + [LBL[s] for s in SRC])
for y in C["years"]:
    w.append([f"An {y['annee']}"] + [round(y["sources"].get(s, 0), 1) for s in SRC])

# ------------------------------------------------------------------ Mensuel par scénario
cols = [("m", "Mois"), ("new", "Nouveaux domaines Direct"), ("churned", "Résiliés"), ("clients", "Domaines Direct actifs"),
        ("wl_partners", "Logisticiens marque blanche"), ("wl_domains", "Domaines marque blanche"), ("mrr", "Abonnements €"),
        ("setup", "Installation €"), ("services", "Services €"), ("shipfees", "Frais logisticiens (neutre) €"),
        ("wl_license", "Licences MB €"), ("wl_setup", "Mise en place MB €"), ("wl_ship", "Expéditions MB €"), ("revenue", "CA €"),
        ("cogs", "Coûts variables €"), ("dev", "Développement externe €"), ("staff", "Salaires chargés €"), ("opex", "Autres charges €"),
        ("ebitda", "EBITDA €"), ("debt", "Remboursements €"), ("inflow", "Levée €"), ("cash", "Trésorerie fin de mois €"), ("heads", "Effectif")]
for scen in SC:
    w = wb.create_sheet(f"Mensuel_{scen}")
    w.append([c[1] for c in cols])
    for r in D[scen]["rows"]:
        w.append([round(r[c[0]], 1) if isinstance(r[c[0]], float) else r[c[0]] for c in cols])

# ------------------------------------------------------------------ Synthèse
w = wb.create_sheet("Synthèse_annuelle")
labels = [("nouveaux", "Nouveaux domaines Direct"), ("clients_fin", "Domaines Direct actifs fin d'année"), ("wl_partenaires", "Logisticiens en marque blanche"),
          ("wl_domaines", "Domaines activés en marque blanche"), ("arr_fin", "Revenu récurrent annualisé fin d'année €"),
          ("ca_abonnements", "CA abonnements €"), ("ca_installation", "CA installation €"), ("ca_services", "CA services €"),
          ("ca_logisticiens", "CA frais logisticiens (neutre) €"), ("ca_wl_licences", "CA licences marque blanche €"),
          ("ca_wl_setup", "CA mise en place marque blanche €"), ("ca_wl_expeditions", "CA expéditions marque blanche €"), ("ca_total", "CA total €"),
          ("couts_variables", "Coûts variables €"), ("marge_brute", "Marge brute €"), ("taux_marge_brute", "Taux de marge brute"),
          ("developpement", "Développement externe €"), ("salaires", "Salaires chargés €"), ("autres_charges", "Autres charges €"),
          ("ebitda", "EBITDA €"), ("tresorerie_fin", "Trésorerie fin d'année €"), ("effectif_fin", "Effectif fin d'année"), ("cac", "CAC €")]
names = ("pessimiste", "central", "optimiste", "central_sans_marque_blanche", "central_sans_frais_logisticien")
w.append(["Indicateur"] + [f"{s} A{y}" for s in names for y in (1, 2, 3)])
for k, lab in labels:
    w.append([lab] + [round(D[s]["years"][y][k], 3 if k == "taux_marge_brute" else 0) for s in names for y in range(3)])
w.append(["Point mort mensuel (EBITDA durablement > 0)"] + [f"M{D[s]['be']}" if D[s]["be"] else "non atteint à M48" for s in names for _ in range(3)])
w.append([]); w.append(["Formules"])
for f in ["Nouveaux(source, pays, m) = productivité nominale × rampe × part du vivier couverte par les CMS lancés × (1 − pénétration / pénétration max.)",
          "Domaines(pays, m) = Domaines(m−1) × (1 − résiliation) + Σ nouveaux", "Abonnements = Domaines Direct × ARPA",
          "Installation = (nouveaux − nouveaux via agences) × installation moyenne",
          "Frais logisticiens (neutre) = Domaines × 20 expéditions × frais × part routée vers un logisticien payant",
          "Marque blanche = Σ licences actives + 8 000 € à la signature + domaines activés × 20 expéditions × 0,50 €",
          "Coûts variables = hébergement 3 €/domaine + paiement 1,5 % du CA Direct + commissions agences (20 % Silver / 25 % Gold, récurrentes) + 250 €/client apporteur + support 0,5 h × 30 € (avant le 1er CSM)",
          "Variable des sales = 15 % de la 1re année d'abonnement signée × 1,42 ; partner manager : 1 500 € par licence + 50 € par client agence",
          "Recrutement déclenché au mois prévu SI le nombre de domaines Direct actifs dépasse le seuil ; sinon reporté",
          "EBITDA = CA − coûts variables − développement externe − salaires − autres charges",
          "CAC = (marketing + programme partenaires + coûts sales/partner manager/alternant + commissions apporteurs + 30 % du coût dirigeant) / nouveaux domaines"]:
    w.append([f])

# ------------------------------------------------------------------ Pays & CMS
w = wb.create_sheet("Pays_CMS")
w.append(["Pays", "TAM (domaines vendant en ligne)", "SAM 3 CMS × export", "SAM WooCommerce seul", "Domaines Direct M36 (central)", "Pénétration SAM M36"])
for c, mk in J["market"].items():
    n_ = C["rows"][-1]["by_country"][c]
    w.append([c, round(mk["tam"]), round(mk["sam_3cms"]), round(mk["sam_woo"]), round(n_), round(n_ / mk["sam_3cms"], 3)])
w.append([]); w.append(["Mois", "FR", "IT", "ES", "DE", "PT", "WooCommerce", "Shopify", "PrestaShop", "Couverture CMS FR", "IT", "ES"])
for r in C["rows"]:
    w.append([r["m"]] + [round(r["by_country"][c], 1) for c in ("FR", "IT", "ES", "DE", "PT")] + [round(r["by_cms"][k], 1) for k in ("woo", "shopify", "presta")]
             + [round(r["cov"][c], 2) for c in ("FR", "IT", "ES")])

# ------------------------------------------------------------------ Marque blanche
w = wb.create_sheet("Marque_blanche")
w.append(["Niveau", "Licence €/mois", "Mise en place €", "€/expédition", "Inclus", "Pour qui"])
for row in [("Starter", 690, 4000, 0.60, "1 CMS (WooCommerce), jusqu'à 50 domaines, support e-mail", "Logisticien régional, < 100 domaines e-commerce"),
            ("Business", 1490, 8000, 0.50, "WooCommerce + Shopify, jusqu'à 250 domaines, marque du logisticien, support 4 h", "Logisticien national"),
            ("Premium", 2490, 12000, 0.40, "3 CMS, domaines illimités, SLA 99,9 %, API, gestionnaire dédié", "Logisticien européen / multi-pays")]:
    w.append(list(row))
w.append([]); w.append(["Comparaison : coût d'un plugin développé en interne par le logisticien (HYP)", "An 1", "Années suivantes"])
w.append(["Développement 1 CMS (≈ 60-80 j × 500 €)", 35000, 0]); w.append(["Maintenance, mises à jour CMS, support (≈ 25 %/an)", 9000, 9000])
w.append(["Chaque CMS supplémentaire", 25000, 6000]); w.append(["Total 2 CMS", 69000, 15000])
w.append(["Licence Business Passavin (2 CMS) + mise en place", 1490 * 12 + 8000, 1490 * 12])
w.append([]); w.append(["Mois", "Logisticiens actifs", "Domaines activés", "Licences €", "Mise en place €", "Expéditions €"])
for r in C["rows"]:
    w.append([r["m"], r["wl_partners"], round(r["wl_domains"], 1), r["wl_license"], r["wl_setup"], round(r["wl_ship"], 1)])

# ------------------------------------------------------------------ Financement
w = wb.create_sheet("Financement")
w.append(["Source", "Montant €", "Moment", "Statut"])
fund = [("Apport fondateur", P["equity_founder"], "M0", "À confirmer"),
        ("Prêt d'honneur (Initiative France / Réseau Entreprendre)", P["honor_loan"], "M0-M2", "HYP — dossier à déposer"),
        ("Bourse French Tech BPI (subvention)", P["bpi_grant"], "M2-M4", "HYP — éligibilité non garantie"),
        ("Prêt bancaire (adossé au prêt d'honneur)", P["bank_loan"], "M2", "HYP"),
        ("Seed — business angels + fonds d'amorçage (fonds propres)", P["seed_equity"], f"M{P['seed_month']}", "Conditionné aux jalons GO seed"),
        ("Seed — prêt d'amorçage BPI", P["seed_bpi_loan"], f"M{P['seed_month']}", "HYP — adossé à la levée")]
for row in fund: w.append(list(row))
tot = sum(r[1] for r in fund); w.append(["Total sur 3 ans", tot]); w.append([])
w.append(["Affectation de la seed", "Part", "Montant €"])
seed = P["seed_equity"] + P["seed_bpi_loan"]
AFF = [("Équipe commerciale & réseau (3 sales, partner manager, alternant·e, programme partenaires)", 0.45),
       ("Produit (lead dev, Shopify, PrestaShop, marque blanche)", 0.30), ("Marketing Europe (salons Vinitaly, ProWein, Fenavin ; contenus localisés)", 0.10),
       ("Customer success (2 postes)", 0.05), ("Juridique, localisation, marques UE", 0.03), ("Réserve de sécurité", 0.07)]
for lab, sh in AFF: w.append([lab, sh, round(seed * sh, -3)])
w.append([]); w.append(["Point bas de trésorerie (central)", round(C["cash_min"]), f"M{C['cash_min_m']}"])
w.append(["Trésorerie fin M36 (central)", round(C["rows"][-1]["cash"])])
w.append(["Point mort mensuel (central)", f"M{C['be']}" if C["be"] else "non atteint"])

# ------------------------------------------------------------------ Plan de recrutement
w = wb.create_sheet("Plan_recrutement")
w.append(["Poste", "Mois prévu", "Seuil de déclenchement (domaines Direct actifs)", "Mois réel — central", "Mois réel — pessimiste", "Mois réel — optimiste",
          "Coût employeur mensuel fixe €", "Variable", "Ligne du BP produite / protégée"])
var = {"sales_fr": "15 % de la 1re année signée", "sales_it": "15 % de la 1re année signée", "sales_es": "15 % de la 1re année signée",
       "pm": "1 500 €/licence + 50 €/client agence"}
role = {"lead_dev": "Produit (MVP → v2), qualité", "alt": "Rendez-vous pour les sales (SDR), contenus", "pm": "Agences, apporteurs, licences marque blanche",
        "dev2": "Shopify (M18) puis PrestaShop (M25)", "csm1": "Résiliation ≤ 1,5 %, activation", "csm2": "Résiliation IT/ES, onboarding localisé",
        "dev3": "Marque blanche, nouveaux adaptateurs logisticiens", "sales_fr": "Domaines FR", "sales_it": "Domaines IT", "sales_es": "Domaines ES (+ PT)"}
for h in P["hires"] + P["sales"]:
    cost = h.get("cost", P["sales_fixed"])
    w.append([h["label"], h["month"], h["trigger"]] + [D[s]["hired"].get(h["key"], "non recruté") for s in ("central", "pessimiste", "optimiste")]
             + [cost, var.get(h["key"], "—"), role.get(h["key"], "")])

# ------------------------------------------------------------------ Tableaux de bord
w = wb.create_sheet("Tableaux_de_bord")
w.append(["Famille", "KPI", "Formule", "Fréquence", "Responsable", "Cible A1", "Cible A2", "Cible A3", "Décision si écart"])
Yc = C["years"]
def tgt(k, f=fr): return [f(y[k]) for y in Yc]
sx = lambda key: [fr(y["sources"].get(key, 0)) for y in Yc]
ag3 = [fr(y["sources"].get("agence_silver", 0) + y["sources"].get("agence_gold", 0)) for y in Yc]
dash = [  # 26 KPI — même liste que docs/10_RISQUES_TABLEAUX_DE_BORD.md §10.2
    ("Acquisition", "Nouveaux domaines Direct", "Σ signatures", "Hebdo", "Dirigeant", *tgt("nouveaux"), "Revue canal par canal"),
    ("Acquisition", "Signatures Sales France", "Signatures attribuées dans le CRM", "Hebdo", "Sales FR", *sx("sales_fr"), "Plan de progrès 60 j"),
    ("Acquisition", "Signatures Sales Italie", "idem", "Hebdo", "Sales IT", *sx("sales_it"), "Revue du ciblage, coaching"),
    ("Acquisition", "Signatures Sales Espagne & Portugal", "idem", "Hebdo", "Sales ES", *sx("sales_es"), "Revue du ciblage, coaching"),
    ("Acquisition", "Démos réalisées par sales", "Σ démos", "Hebdo", "Sales", "—", "≥ 30/mois", "≥ 30/mois", "Renfort SDR"),
    ("Acquisition", "Conversion démo → client", "Clients / démos", "Mensuel", "Sales", "≥ 25 %", "≥ 25 %", "≥ 25 %", "Revoir démo, prix, ICP"),
    ("Réseau", "Domaines via agences", "Σ signatures agences", "Mensuel", "Partner manager", *ag3, "Animation, passage Gold"),
    ("Réseau", "Agences actives (fin d'année)", "≥ 1 domaine en 6 mois", "Trimestriel", "Partner manager", *tgt("agences_fin"), "Recruter, désactiver"),
    ("Réseau", "Domaines via apporteurs", "Σ signatures apporteurs", "Mensuel", "Partner manager", *sx("apporteur"), "Kit, relance"),
    ("Réseau", "Licences marque blanche", "Logisticiens sous licence", "Trimestriel", "Dirigeant + PM", *tgt("wl_partenaires"), "Revoir l'offre Partner"),
    ("Réseau", "Domaines activés en marque blanche", "Stock", "Mensuel", "Partner manager", *tgt("wl_domaines"), "Plan d'activation conjoint"),
    ("Produit", "CMS disponibles", "Extensions en production", "Trimestriel", "Lead dev", "WooCommerce", f"+ Shopify (M{P['cms_launch']['shopify']})", f"+ PrestaShop (M{P['cms_launch']['presta']})", "Re-prioriser la feuille de route"),
    ("Revenus", "Revenu récurrent annualisé (fin d'année)", "12 × revenus récurrents du mois", "Mensuel", "Dirigeant", *[f"{y['arr_fin']/1000:,.0f} k€" for y in Yc], "Upsell Pro, prix"),
    ("Revenus", "ARPA", "Abonnements / domaines", "Mensuel", "Customer success", f"{P['arpa']:.0f} €", f"{P['arpa']:.0f} €", f"≥ {P['arpa']:.0f} € (objectif 99 €)", "Pro par défaut"),
    ("Revenus", "CA", "Σ lignes", "Mensuel", "Dirigeant", *[f"{y['ca_total']/1000:,.0f} k€" for y in Yc], "Gel des recrutements non déclenchés"),
    ("Rétention", "Résiliation mensuelle", "Résiliés / actifs début de mois", "Mensuel", "Customer success", *[f"≤ {P['churn_m']:.1%}".replace(".", ",")] * 3, "Entretien de départ, plan d'action"),
    ("Activation", "Activation à 14 jours", "1re commande transmise / nouveaux", "Mensuel", "Customer success", "≥ 80 %", "≥ 80 %", "≥ 85 %", "Onboarding guidé, appel J+3"),
    ("Satisfaction", "NPS", "Promoteurs − détracteurs", "Trimestriel", "Customer success", "≥ 30", "≥ 40", "≥ 45", "Analyse des verbatims"),
    ("Rentabilité", "Marge brute", "(CA − coûts variables) / CA", "Mensuel", "Dirigeant", "≥ 85 %", "≥ 90 %", "≥ 90 %", "Hébergement, commissions"),
    ("Rentabilité", "CAC", "Coûts d'acquisition / nouveaux", "Trimestriel", "Dirigeant", *[f"{y['cac']:,.0f} €" for y in Yc], "Couper le canal le plus cher"),
    ("Rentabilité", "LTV / CAC", "(contribution / résiliation) / CAC", "Trimestriel", "Dirigeant", "—", "≥ 3", "≥ 5", "Réduire CAC ou résiliation"),
    ("Rentabilité", "EBITDA (année)", "CA − charges", "Mensuel", "Dirigeant + comptable", *[f"{y['ebitda']/1000:,.0f} k€" for y in Yc], "Plan d'économies"),
    ("Rentabilité", "EBITDA du mois", "idem", "Mensuel", "Dirigeant", "—", "—", f"≥ 0 à M{C['be']} (M36 visé)", "Leviers de l'onglet Leviers_point_mort"),
    ("Trésorerie", "Runway", "Trésorerie / burn", "Mensuel", "Dirigeant", "≥ 6 mois", "≥ 12 mois", "≥ 6 mois", "Gel des embauches (règle automatique)"),
    ("Équipe", "Atteinte des OKR individuels", "Résultats clés atteints / fixés", "Trimestriel", "Dirigeant", "≥ 70 %", "≥ 70 %", "≥ 70 %", "Plan de progrès"),
    ("Équipe", "Rotation du personnel", "Départs / effectif moyen", "Annuel", "Dirigeant", "—", "< 15 %", "< 15 %", "Entretiens, rémunération"),
]
for row in dash: w.append(list(row))

# ------------------------------------------------------------------ Leviers
w = wb.create_sheet("Leviers_point_mort")
w.append(["Levier (testé seul sur le scénario central)", "Valeur centrale", "Valeur requise pour le point mort ≤ M36", "Point mort obtenu"])
for l in J["levers"]: w.append([l["levier"], l["central"], l["requis"], l["point_mort"]])

for ws_ in wb.worksheets:
    for cell in ws_[1]: cell.fill = HDR; cell.font = HF; cell.alignment = Alignment(wrap_text=True, vertical="center")
    for i in range(1, ws_.max_column + 1): ws_.column_dimensions[get_column_letter(i)].width = 17
    ws_.column_dimensions["A"].width = 58
    ws_.freeze_panes = "B2"
wb.save(os.path.join(ROOT, "annexes", "BP_3ans.xlsx"))

# ------------------------------------------------------------------ Graphiques
plt.rcParams.update({"font.family": "DejaVu Sans", "font.size": 11, "axes.spines.top": False, "axes.spines.right": False})
def save(fig, name): fig.savefig(os.path.join(HERE, "charts", name), dpi=200, bbox_inches="tight", facecolor="white"); plt.close(fig)
M = [r["m"] for r in C["rows"]]

# 1. Domaines actifs par scénario (Direct + marque blanche)
fig, ax = plt.subplots(figsize=(8, 4))
for s, col, ls in (("pessimiste", GREY, "--"), ("central", WINE, "-"), ("optimiste", TEAL, "--")):
    ax.plot(M, [r["domains_total"] for r in D[s]["rows"]], color=col, ls=ls, lw=2.4, label=s)
ax.set_xlabel("Mois (M1 = janv. 2027)"); ax.set_ylabel("Domaines connectés (Direct + marque blanche)"); ax.legend(frameon=False); ax.grid(axis="y", alpha=.25)
save(fig, "clients.png")

# 2. Nouveaux domaines par ressource (central, empilé, annuel)
fig, ax = plt.subplots(figsize=(8, 4.2))
yrs = ["An 1 (2027)", "An 2 (2028)", "An 3 (2029)"]; bottom = [0, 0, 0]
cols_ = [INK, WINE, TEAL, "#5B8E7D", GOLD, "#A0522D", GREY]
for s, col in zip(SRC, cols_):
    vals = [y["sources"].get(s, 0) for y in Yc]
    ax.bar(yrs, vals, bottom=bottom, color=col, label=LBL[s], width=.55); bottom = [b + v for b, v in zip(bottom, vals)]
for i, b in enumerate(bottom): ax.text(i, b + 6, f"{b:.0f}", ha="center", fontweight="bold")
ax.set_ylabel("Nouveaux domaines Direct signés"); ax.legend(frameon=False, fontsize=9, loc="upper left"); ax.grid(axis="y", alpha=.25)
save(fig, "sources.png")

# 3. CA par ligne + EBITDA (central)
fig, ax = plt.subplots(figsize=(8, 4.2)); bottom = [0, 0, 0]
for k, lab, col in (("ca_abonnements", "Abonnements domaines", WINE), ("ca_installation", "Installation", GOLD), ("ca_logisticiens", "Frais logisticiens (à valider)", TEAL),
                    ("ca_wl_licences", "Licences marque blanche", INK), ("ca_wl_setup", "Mise en place MB", "#5B8E7D"), ("ca_wl_expeditions", "Expéditions MB", "#A0522D"), ("ca_services", "Services", GREY)):
    vals = [y[k] / 1000 for y in Yc]; ax.bar(yrs, vals, bottom=bottom, color=col, label=lab, width=.55); bottom = [b + v for b, v in zip(bottom, vals)]
ax.plot(yrs, [y["ebitda"] / 1000 for y in Yc], color="black", marker="o", lw=2, label="EBITDA")
ax.axhline(0, color="black", lw=.8); ax.set_ylabel("k€"); ax.legend(frameon=False, fontsize=8.5, loc="upper left"); ax.grid(axis="y", alpha=.25)
save(fig, "ca_ebitda.png")

# 4. EBITDA mensuel + trésorerie (scénarios)
fig, ax = plt.subplots(figsize=(8, 4))
for s, col, ls in (("pessimiste", GREY, "--"), ("central", WINE, "-"), ("optimiste", TEAL, "--")):
    ax.plot(M, [r["cash"] / 1000 for r in D[s]["rows"]], color=col, ls=ls, lw=2.2, label=s)
ax.axhline(0, color="black", lw=.8); ax.set_xlabel("Mois"); ax.set_ylabel("Trésorerie fin de mois (k€)"); ax.legend(frameon=False, fontsize=9); ax.grid(axis="y", alpha=.25)
ax.annotate(f"seed M{P['seed_month']}", xy=(P["seed_month"], D["central"]["rows"][P["seed_month"] - 1]["cash"] / 1000), xytext=(16, 900), arrowprops=dict(arrowstyle="->", color=GREY), color=GREY)
save(fig, "tresorerie.png")

fig, ax = plt.subplots(figsize=(8, 4))
for s, col, ls in (("pessimiste", GREY, "--"), ("central", WINE, "-"), ("optimiste", TEAL, "--")):
    ax.plot(M, [r["ebitda"] / 1000 for r in D[s]["rows"]], color=col, ls=ls, lw=2.2, label=s)
ax.axhline(0, color="black", lw=.8); ax.set_xlabel("Mois"); ax.set_ylabel("EBITDA mensuel (k€)"); ax.legend(frameon=False, fontsize=9); ax.grid(axis="y", alpha=.25)
save(fig, "ebitda_mensuel.png")

# 5. Domaines par pays (central)
fig, ax = plt.subplots(figsize=(8, 4))
ax.stackplot(M, *[[r["by_country"][c] for r in C["rows"]] for c in ("FR", "IT", "ES", "DE", "PT")], labels=["France", "Italie", "Espagne", "Allemagne", "Portugal"],
             colors=[INK, WINE, GOLD, TEAL, GREY], alpha=.9)
ax.plot(M, [r["wl_domains"] for r in C["rows"]], color="black", ls=":", lw=2, label="Domaines en marque blanche (tous pays)")
for x, lab in ((P["cms_launch"]["shopify"], "Shopify"), (P["cms_launch"]["presta"], "PrestaShop")):
    ax.axvline(x, color=GREY, lw=.8, ls="--"); ax.text(x + .3, ax.get_ylim()[1] * .92, lab, color=GREY, fontsize=9)
ax.set_xlabel("Mois"); ax.set_ylabel("Domaines Direct actifs"); ax.legend(frameon=False, fontsize=8.5, loc="upper left"); ax.grid(axis="y", alpha=.25)
save(fig, "pays.png")

# ------------------------------------------------------------------ Markdown des résultats (pour les docs)
L = ["# Résultats chiffrés du BP V2 (généré par `outils/build_annexes.py` — ne pas modifier à la main)", "",
     "Toutes les valeurs sont des **[HYP]** issues de `outils/bp_model.py`.", "",
     "## Synthèse par scénario", "", "| | " + " | ".join(names) + " |", "|---|" + "---|" * len(names)]
for k, lab in [("clients_fin", "Domaines Direct fin an 3"), ("wl_domaines", "Domaines marque blanche fin an 3"), ("arr_fin", "Revenu récurrent annualisé fin an 3 €"),
               ("ca_total", "CA an 3 €"), ("ebitda", "EBITDA an 3 €"), ("tresorerie_fin", "Trésorerie fin an 3 €")]:
    L.append(f"| {lab} | " + " | ".join(fr(D[s]["years"][2][k]) for s in names) + " |")
L.append("| Point mort mensuel | " + " | ".join(f"M{D[s]['be']}" if D[s]["be"] else "non atteint" for s in names) + " |")
L.append("| EBITDA du mois 36 € | " + " | ".join(fr(D[s]["ebitda_m36"]) for s in names) + " |")
L += ["", "## Compte de résultat — central", "", "| € | An 1 | An 2 | An 3 |", "|---|---|---|---|"]
for k, lab in labels:
    L.append(f"| {lab} | " + " | ".join((f"{y[k]:.0%}" if k == "taux_marge_brute" else fr(y[k])) for y in Yc) + " |")
L += ["", "## Nouveaux domaines par ressource — central", "", "| Ressource | An 1 | An 2 | An 3 | Total |", "|---|---|---|---|---|"]
for s in SRC:
    v = [y["sources"].get(s, 0) for y in Yc]; L.append(f"| {LBL[s]} | " + " | ".join(fr(x) for x in v) + f" | {fr(sum(v))} |")
L += ["", "## Plan de recrutement (mois réel selon les jalons)", "", "| Poste | Prévu | Seuil | Central | Pessimiste | Optimiste |", "|---|---|---|---|---|---|"]
for h in P["hires"] + P["sales"]:
    L.append(f"| {h['label']} | M{h['month']} | {h['trigger']} domaines | " + " | ".join(f"M{D[s]['hired'][h['key']]}" if h["key"] in D[s]["hired"] else "—" for s in ("central", "pessimiste", "optimiste")) + " |")
L += ["", "## Leviers pour atteindre le point mort à M36", "", "| Levier | Central | Requis | Point mort |", "|---|---|---|---|"]
for l in J["levers"]: L.append(f"| {l['levier']} | {l['central']} | {l['requis']} | {l['point_mort']} |")
L += ["", "## Marché par pays (TAM / SAM)", "", "| Pays | TAM | SAM 3 CMS | SAM Woo | Domaines M36 | Pénétration |", "|---|---|---|---|---|---|"]
for c, mk in J["market"].items():
    n_ = C["rows"][-1]["by_country"][c]
    L.append(f"| {c} | {fr(mk['tam'])} | {fr(mk['sam_3cms'])} | {fr(mk['sam_woo'])} | {fr(n_)} | {n_ / mk['sam_3cms']:.0%} |")
U = J["unit"]
L += ["", "## Économie unitaire d'un domaine Direct (central, M36)", "", "| Indicateur | Valeur |", "|---|---|",
      f"| ARPA abonnement | {U['arpa']:.0f} €/mois |", f"| Frais logisticien moyen (mode neutre) | {U['frais_logisticien']:.0f} €/mois |",
      f"| Contribution après coûts variables | {U['contribution']:.0f} €/mois |", f"| Durée de vie moyenne | {U['duree_vie']:.0f} mois |",
      f"| LTV | {fr(U['ltv'])} € |", f"| CAC an 3 | {fr(U['cac_a3'])} € |", f"| LTV / CAC | {U['ltv_cac']:.1f} |".replace(".", ","),
      f"| Récupération du CAC | {U['payback']:.0f} mois |"]
L += ["", f"Financement : {fr(tot)} € au total, dont seed {fr(P['seed_equity'])} € de fonds propres + {fr(P['seed_bpi_loan'])} € de prêt d'amorçage BPI à M{P['seed_month']}. "
      f"Point bas de trésorerie : {fr(C['cash_min'])} € (M{C['cash_min_m']})."]
open(os.path.join(ROOT, "docs", "13_BP_V2_RESULTATS.md"), "w").write("\n".join(L) + "\n")
print("ok")
