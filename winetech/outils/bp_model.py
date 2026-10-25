"""Modèle financier 36 mois — connecteur e-commerce ↔ logistique vin.
Toutes les valeurs sont des HYPOTHÈSES [HYP] non validées par le marché.
Usage : python3 bp_model.py  → annexes/BP_3ans.xlsx + docs/bp_resultats.md + charts PNG
"""
import json, math, os
from copy import deepcopy

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)

BASE = dict(
    # Acquisition : nouveaux clients payants par mois (M1 = janvier 2027)
    new_y1=[0, 0, 0, 0, 1, 2, 2, 3, 3, 3, 4, 4],          # 22 sur l'année (dont pilotes convertis)
    new_y2_per_month=6, new_y3_per_month=9,
    churn_m=0.015,                     # résiliation mensuelle (≈ 17 %/an)
    arpa=89.0,                         # € HT/mois : mix 50 % Essentiel 49 / 35 % Pro 99 / 15 % Expert 199
    setup_fee=390.0,                   # frais d'installation moyens encaissés (liste 490 €, remises pilotes)
    agency_share=[0.0, 0.20, 0.35],    # part des nouveaux clients apportés par agences (an 1/2/3)
    agency_commission=0.20,            # reversement récurrent aux agences
    services=[6000, 12000, 15000],     # prestations sur mesure / an (plafonnées à 15 % du CA)
    # Revenu côté logisticien : frais de plateforme par expédition transmise et acceptée [HYP À VALIDER]
    ship_per_client=20, ship_fee=1.5, ship_fee_start=7,
    # Coûts variables
    hosting_per_client=3.0, payment_fee=0.015, support_h_per_client=0.5, support_cost_h=30.0,
    # Ressources (coût employeur mensuel chargé ; brut × 1,42)
    mvp_cost=30000, mvp_months=4,      # MVP freelance : 60 j × 500 €
    freelance_y1=2500,                 # maintenance/évolutions M5-M12
    freelance_y2plus=1000,
    founder=[0, 3550, 4970],           # dirigeant : 0 € an 1 (hyp. ARE/ARCE), 2 500 € brut an 2, 3 500 € an 3
    dev_hire_month=13, dev_cost=5800,  # développeur·se full-stack 49 k€ brut
    alt_month=13, alt_cost=1000,       # alternant·e marketing/sales (coût net après aide)
    bizdev_month=25, bizdev_cost=5200, # business developer / partner manager 36 k€ + variable — déclenché si MRR ≥ 7 k€ ET ≥ 80 clients à M24
    csm_month=99, csm_cost=3800,       # support / customer success 32 k€ — scénario optimiste seulement (M31)
    tools=[200, 500, 900], office=[0, 300, 300],
    fixed_admin=355,                   # compta 200 + assurance RC pro 125 + banque 30
    legal=[10000, 3000, 4000],         # création, CGV/DPA, dépôts INPI+EUIPO, revue réglementaire
    marketing=[12000, 30000, 45000], recruiting=[0, 3000, 3000],
    # Financement
    equity_founder=10000, honor_loan=30000, bpi_grant=30000, bank_loan=50000,
    bank_rate=0.045, bank_years=5, honor_years=5,
)

def scen(name):
    p = deepcopy(BASE)
    if name == "pessimiste":
        p["new_y1"] = [0, 0, 0, 0, 0, 1, 1, 1, 2, 2, 2, 2]
        p["new_y2_per_month"] = 3; p["new_y3_per_month"] = 5
        p["churn_m"] = 0.025; p["arpa"] = 75.0; p["setup_fee"] = 290.0
        p["services"] = [4000, 8000, 10000]
        p["bizdev_month"] = 99; p["csm_month"] = 99       # recrutements gelés si jalons non atteints
        p["ship_per_client"] = 12; p["ship_fee"] = 1.0
    if name == "central_sans_logisticien":
        p["ship_fee"] = 0.0
    if name == "optimiste":
        p["new_y1"] = [0, 0, 0, 0, 2, 3, 3, 4, 4, 5, 5, 5]
        p["new_y2_per_month"] = 9; p["new_y3_per_month"] = 14
        p["churn_m"] = 0.01; p["arpa"] = 99.0; p["ship_per_client"] = 25
        p["bizdev_month"] = 19; p["csm_month"] = 31
    return p

def run(p):
    rows = []; clients = 0.0
    loan_m = p["bank_loan"] * (p["bank_rate"] / 12) / (1 - (1 + p["bank_rate"] / 12) ** (-12 * p["bank_years"]))
    cash = p["equity_founder"] + p["honor_loan"] + p["bpi_grant"] + p["bank_loan"]
    bank_out = p["bank_loan"]
    for m in range(1, 37):
        y = (m - 1) // 12
        new = p["new_y1"][m - 1] if y == 0 else (p["new_y2_per_month"] if y == 1 else p["new_y3_per_month"])
        churned = clients * p["churn_m"]
        clients = clients + new - churned
        ag = p["agency_share"][y]
        mrr = clients * p["arpa"]
        setup = new * (1 - ag) * p["setup_fee"]
        services = p["services"][y] / 12 if m >= 5 else 0
        shipfees = clients * p["ship_per_client"] * p["ship_fee"] if m >= p["ship_fee_start"] else 0
        revenue = mrr + setup + services + shipfees
        # coûts variables
        agency = mrr * ag * p["agency_commission"] if y > 0 else 0   # approx : part de la base issue des agences
        hosting = clients * p["hosting_per_client"]
        payfee = revenue * p["payment_fee"]
        support = clients * p["support_h_per_client"] * p["support_cost_h"] if m < p["csm_month"] else 0
        cogs = agency + hosting + payfee + support
        # coûts fixes
        dev = (p["mvp_cost"] / p["mvp_months"] if m <= p["mvp_months"] else 0)
        dev += p["freelance_y1"] if (y == 0 and m > p["mvp_months"]) else (p["freelance_y2plus"] if y > 0 else 0)
        staff = p["founder"][y]
        staff += p["dev_cost"] if m >= p["dev_hire_month"] else 0
        staff += p["alt_cost"] if m >= p["alt_month"] else 0
        staff += p["bizdev_cost"] if m >= p["bizdev_month"] else 0
        staff += p["csm_cost"] if m >= p["csm_month"] else 0
        opex = p["tools"][y] + p["office"][y] + p["fixed_admin"] + (p["legal"][y] + p["marketing"][y] + p["recruiting"][y]) / 12
        ebitda = revenue - cogs - dev - staff - opex
        # financement : remboursement banque (différé 6 mois), prêt d'honneur (différé 12 mois)
        debt = 0
        if m > 6:
            interest = bank_out * p["bank_rate"] / 12
            principal = loan_m - interest if bank_out > 0 else 0
            bank_out -= principal; debt += loan_m
        if m > 12:
            debt += p["honor_loan"] / (12 * p["honor_years"])
        cash += ebitda - debt
        rows.append(dict(m=m, y=y + 1, new=new, churned=churned, clients=clients, mrr=mrr, setup=setup,
                         services=services, shipfees=shipfees, revenue=revenue, cogs=cogs, dev=dev, staff=staff, opex=opex,
                         ebitda=ebitda, debt=debt, cash=cash,
                         mkt=p["marketing"][y] / 12, sales_staff=(p["bizdev_cost"] if m >= p["bizdev_month"] else 0) + (p["alt_cost"] if m >= p["alt_month"] else 0)))
    return rows

def yearly(rows, p):
    out = []
    for y in (1, 2, 3):
        r = [x for x in rows if x["y"] == y]
        s = lambda k: sum(x[k] for x in r)
        new = s("new"); rev = s("revenue"); cogs = s("cogs")
        acq_cost = s("mkt") + s("sales_staff") + 0.3 * sum(p["founder"][y - 1] for _ in r)  # 30 % du temps dirigeant
        out.append(dict(
            annee=y, nouveaux=new, clients_fin=r[-1]["clients"], mrr_fin=r[-1]["mrr"], arr_fin=r[-1]["mrr"] * 12,
            ca_abonnements=s("mrr"), ca_installation=s("setup"), ca_services=s("services"), ca_logisticiens=s("shipfees"), ca_total=rev,
            couts_variables=cogs, marge_brute=rev - cogs, taux_marge_brute=(rev - cogs) / rev if rev else 0,
            developpement=s("dev"), salaires=s("staff"), autres_charges=s("opex"),
            ebitda=s("ebitda"), tresorerie_fin=r[-1]["cash"], tresorerie_min=min(x["cash"] for x in rows if x["m"] <= y * 12),
            cac=acq_cost / new if new else 0,
        ))
    return out

def breakeven(rows):
    for x in rows:
        if x["ebitda"] > 0 and all(z["ebitda"] > 0 for z in rows if z["m"] >= x["m"]):
            return x["m"]
    return None

if __name__ == "__main__":
    res = {}
    for name in ("pessimiste", "central", "central_sans_logisticien", "optimiste"):
        p = scen(name); rows = run(p)
        res[name] = dict(p=p, rows=rows, years=yearly(rows, p), be=breakeven(rows),
                         cash_min=min(r["cash"] for r in rows), cash_min_m=min(rows, key=lambda r: r["cash"])["m"])
    for n, r in res.items():
        p = r["p"]; last = r["rows"][-1]
        fixed = last["dev"] + last["staff"] + last["opex"]
        contrib = (last["revenue"] - last["cogs"]) / last["clients"]
        r["fixed_m36"] = fixed; r["contrib_client"] = contrib; r["clients_be"] = fixed / contrib
        r["ebitda_m36"] = last["ebitda"]
        print(f"[{n}] M36 : EBITDA mensuel {last['ebitda']:,.0f} € · charges fixes {fixed:,.0f} €/mois · contribution {contrib:,.0f} €/client/mois · clients nécessaires ≈ {fixed/contrib:,.0f}")
    for n, r in res.items():
        print(f"\n== {n} == point mort EBITDA mensuel : M{r['be']} · tréso min {r['cash_min']:,.0f} € (M{r['cash_min_m']})")
        for y in r["years"]:
            print({k: (round(v) if isinstance(v, float) and abs(v) > 2 else round(v, 3) if isinstance(v, float) else v) for k, v in y.items()})
    json.dump({n: dict(years=r["years"], be=r["be"], cash_min=r["cash_min"], cash_min_m=r["cash_min_m"],
                       fixed_m36=r["fixed_m36"], contrib_client=r["contrib_client"], clients_be=r["clients_be"], ebitda_m36=r["ebitda_m36"], p=r["p"],
                       rows=r["rows"]) for n, r in res.items()},
              open(os.path.join(HERE, "bp_out.json"), "w"), indent=1, default=float)
