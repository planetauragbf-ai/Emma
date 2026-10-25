"""Modèle financier V2 sur 36 mois — Passavin (connecteur boutique de domaine ↔ logisticiens vin).

Moteur UNIQUE des chiffres : docs, Excel (build_annexes.py), dossier et pitch (build_decks.py) lisent bp_out.json.
Toutes les valeurs sont des HYPOTHÈSES [HYP] non validées par le marché, sauf les données de marché sourcées
(MARCHE, voir docs/04_MARCHE_CONCURRENCE.md et docs/12_V2_EUROPE.md).

Principe V2 : aucune ligne de chiffre d'affaires sans ressource commerciale identifiée.
  - Domaines « Passavin Direct » : signés par le dirigeant, un·e sales France, un·e sales Italie, un·e sales Espagne,
    des agences web partenaires (Silver / Gold) et des apporteurs d'affaires.
  - « Passavin Partner » (marque blanche) : licences signées par le dirigeant puis le/la partner manager auprès de
    logisticiens revendeurs, qui activent eux-mêmes leurs domaines clients.
  - La productivité d'un·e commercial·e dépend de la part de son vivier couverte par les CMS déjà disponibles
    (WooCommerce M5, Shopify M18, PrestaShop M30).
  - Les recrutements sont déclenchés par des jalons (clients actifs), pas par le calendrier.
Usage : python3 bp_model.py → bp_out.json, puis build_annexes.py et build_decks.py.
"""
import json, os
from copy import deepcopy

HERE = os.path.dirname(os.path.abspath(__file__))
COUNTRIES = ["FR", "IT", "ES", "DE", "PT"]
CMS = ["woo", "shopify", "presta"]

# ---------------------------------------------------------------- Marché (sourcé + hypothèses de filtrage)
# producteurs = caves qui vinifient/embouteillent et vendent sous leur marque (ordre de grandeur sourcé, voir 12_V2_EUROPE.md)
# online = part qui vend en ligne via son propre site ; export = part qui expédie à des particuliers hors de son pays
# cms = part des boutiques sur chaque CMS (proxy : parts de marché e-commerce nationales, faute de données propres au vin)
MARCHE = {
    "FR": dict(producteurs=43000, online=0.21, export=0.30, cms=dict(woo=0.355, shopify=0.132, presta=0.266)),
    "IT": dict(producteurs=17000, online=0.25, export=0.30, cms=dict(woo=0.529, shopify=0.104, presta=0.108)),
    "ES": dict(producteurs=3925, online=0.50, export=0.25, cms=dict(woo=0.572, shopify=0.058, presta=0.203)),
    "DE": dict(producteurs=15151, online=0.25, export=0.10, cms=dict(woo=0.325, shopify=0.134, presta=0.03)),
    "PT": dict(producteurs=3000, online=0.25, export=0.30, cms=dict(woo=0.492, shopify=0.093, presta=0.098)),
}

BASE = dict(
    # ---------------- Offre Direct (domaines)
    arpa=94.0,                 # €/mois : mix 40 % Essentiel 49 € / 45 % Pro 99 € / 15 % Expert 199 €
    setup_fee=390.0,           # installation moyenne encaissée (liste 490 €, pilotes 190 €) ; 0 si installée par une agence
    churn_m=0.015,             # résiliation mensuelle des domaines Direct
    services=[6000, 12000, 15000],
    # Frais de plateforme payés par les logisticiens partenaires du mode neutre [À VALIDER]
    ship_per_client=20, ship_fee=1.5, ship_fee_start=7, ship_fee_share=0.5,  # 50 % des domaines routés vers un logisticien qui a signé ce frais
    # ---------------- CMS : mois de disponibilité
    cms_launch=dict(woo=5, shopify=18, presta=25),
    # ---------------- Ressources commerciales internes (productivité nominale = signatures/mois à couverture CMS complète)
    ceo_y1=[0, 0, 0, 0, 1, 2, 2, 3, 3, 3, 4, 4],    # pilotes convertis + réseau du dirigeant (France, WooCommerce)
    ceo_y2=2.0, ceo_y3=1.0,
    sales=[  # nom, pays, mois prévu, seuil de déclenchement (clients Direct actifs), productivité nominale, rampe (mois)
        dict(key="sales_fr", label="Sales France (chasse)", country="FR", month=10, trigger=12, prod=8.0, ramp=3),
        dict(key="sales_it", label="Sales Italie", country="IT", month=16, trigger=60, prod=6.0, ramp=4, eor=450),
        dict(key="sales_es", label="Sales Espagne & Portugal", country="ES", month=19, trigger=90, prod=5.0, ramp=4, eor=450),
    ],
    # ---------------- Réseau externe
    # Agences actives par pays : liste de (mois, nb Silver, nb Gold) — paliers cumulés
    agencies={
        "FR": [(10, 2, 0), (16, 4, 1), (22, 6, 2), (28, 8, 3), (34, 10, 4)],
        "IT": [(22, 1, 0), (28, 3, 0), (34, 4, 1)],
        "ES": [(25, 1, 0), (30, 3, 0), (34, 4, 1)],
        "DE": [(30, 1, 0), (34, 2, 0)],
        "PT": [(31, 1, 0)],
    },
    agency_prod=dict(silver=0.4, gold=1.2),          # clients signés / mois / agence active
    agency_commission=dict(silver=0.20, gold=0.25),  # commission récurrente sur l'abonnement des clients apportés
    # Apporteurs d'affaires actifs (consultants vin, œnologues, syndicats d'appellation) : (mois, nb) par pays
    referrers={"FR": [(8, 3), (14, 6), (20, 9), (28, 12)], "IT": [(20, 2), (28, 4)], "ES": [(22, 2), (30, 4)]},
    referrer_prod=0.25, referrer_fee=250.0,          # signatures/mois/apporteur ; commission unique par client signé
    # ---------------- Offre Partner (marque blanche pour logisticiens revendeurs)
    wl_contracts=[15, 22, 28, 33],                   # mois de signature des licences
    wl_license=[1490, 1490, 2490, 1490],             # €/mois selon niveau (Business / Business / Premium / Business)
    wl_setup=8000.0,                                 # mise en place (marque, adaptateur, formation) — encaissée à la signature
    wl_domains_per_month=[2, 2, 2, 4],               # domaines activés/mois par logisticien (mois 1-3 après go-live, puis 4)
    wl_golive=2,                                     # mois entre signature et mise en service
    wl_ship_per_domain=20, wl_ship_fee=0.50, wl_churn_domains=0.01,
    # ---------------- Coûts variables
    hosting_per_domain=3.0, payment_fee=0.015, support_h_per_client=0.5, support_cost_h=30.0,
    sales_commission_rate=0.15,                      # variable commercial : 15 % de la 1re année d'abonnement signée (× charges)
    pm_bonus_wl=1500.0, pm_bonus_agency=50.0,        # variable partner manager : par licence signée / par client apporté par une agence
    charges=1.42,                                    # coefficient brut → coût employeur
    # ---------------- Coûts fixes : équipe (coût employeur mensuel)
    founder=[0, 3550, 4970],                         # dirigeant : 0 € an 1 (ARE/ARCE à confirmer), 2 500 € puis 3 500 € brut
    mvp_cost=30000, mvp_months=4, freelance_y1=2500,
    hires=[  # clé, intitulé, mois prévu, seuil de clients Direct actifs, coût employeur mensuel fixe, famille
        dict(key="lead_dev", label="Lead développeur·se / CTO", month=10, trigger=12, cost=6400, fam="produit"),
        dict(key="alt", label="Alternant·e SDR & marketing", month=13, trigger=15, cost=1000, fam="commercial"),
        dict(key="pm", label="Partner manager (agences, apporteurs, logisticiens)", month=13, trigger=25, cost=4500, fam="reseau"),
        dict(key="dev2", label="Développeur·se Shopify puis PrestaShop", month=13, trigger=20, cost=5800, fam="produit"),
        dict(key="csm1", label="Customer success FR/EN", month=16, trigger=40, cost=3790, fam="cs"),
        dict(key="csm2", label="Customer success IT/ES", month=25, trigger=200, cost=3790, fam="cs"),
        dict(key="dev3", label="Développeur·se marque blanche & intégrations", month=25, trigger=200, cost=5800, fam="produit"),
    ],
    sales_fixed=3790,                                # fixe des sales pays : 32 k€ brut × 1,42 / 12
    # ---------------- Autres charges annuelles
    marketing=[12000, 40000, 60000], partner_program=[1500, 8000, 15000], travel=[3000, 10000, 18000],
    localisation=[0, 12000, 8000],                   # traductions IT/ES/DE/PT, CGV et DPA localisés
    tools_m=[200, 900, 1500], office_m=[0, 600, 1200], admin_m=[355, 500, 650],
    legal=[10000, 8000, 6000], recruiting_per_hire=3000, training_per_head=1000,
    # ---------------- Financement
    equity_founder=10000, honor_loan=40000, bpi_grant=30000, bank_loan=60000,
    bank_rate=0.045, bank_years=5, honor_years=5,
    seed_equity=0, seed_bpi_loan=0, seed_month=12,   # fixés par size_seed()
    safety_months=6,
    pen_max=0.6,                                     # pénétration du SAM (3 CMS) à laquelle le vivier serait épuisé
)


def scen(name):
    p = deepcopy(BASE)
    if name == "pessimiste":
        p["ceo_y1"] = [0, 0, 0, 0, 0, 1, 1, 1, 2, 2, 2, 2]; p["ceo_y2"] = 1.5; p["ceo_y3"] = 1.0
        for s in p["sales"]: s["prod"] *= 0.65
        p["agency_prod"] = dict(silver=0.25, gold=0.8); p["referrer_prod"] = 0.15
        p["churn_m"] = 0.022; p["arpa"] = 85.0; p["setup_fee"] = 290.0
        p["ship_fee"] = 1.0; p["ship_fee_share"] = 0.25; p["services"] = [4000, 8000, 10000]
        p["cms_launch"] = dict(woo=5, shopify=21, presta=31)
        p["wl_contracts"] = [20, 32]; p["wl_license"] = [1490, 1490]
        p["pen_max"] = 0.5
    if name == "central_sans_marque_blanche":
        p["wl_contracts"] = []; p["wl_license"] = []
    if name == "central_sans_frais_logisticien":
        p["ship_fee"] = 0.0
    if name == "optimiste":
        p["ceo_y1"] = [0, 0, 0, 0, 2, 3, 3, 4, 4, 5, 5, 5]
        for s in p["sales"]: s["prod"] *= 1.2
        p["agency_prod"] = dict(silver=0.5, gold=1.5); p["referrer_prod"] = 0.3
        p["churn_m"] = 0.011; p["arpa"] = 99.0; p["ship_fee_share"] = 0.6
        p["cms_launch"] = dict(woo=5, shopify=16, presta=23)
        p["wl_contracts"] = [13, 19, 24, 28, 32]; p["wl_license"] = [1490, 2490, 1490, 2490, 1490]
    return p


def step(sched, m, default=0):
    """Valeur d'un palier cumulé [(mois, ...)] au mois m."""
    val = default
    for row in sched:
        if m >= row[0]: val = row[1:] if len(row) > 2 else row[1]
    return val


def coverage(p, c, m):
    sh = MARCHE[c]["cms"]
    return sum(sh[k] for k in CMS if m >= p["cms_launch"][k]) / sum(sh.values())


def run(p, horizon=36):
    rows = []
    direct = {c: 0.0 for c in COUNTRIES}                     # domaines Direct actifs par pays
    by_cms = {k: 0.0 for k in CMS}
    by_src = {}                                              # stock par source (pour commissions agences)
    wl_dom = [0.0] * len(p["wl_contracts"])
    hired = {}; sales_hired = {}
    loan_m = p["bank_loan"] * (p["bank_rate"] / 12) / (1 - (1 + p["bank_rate"] / 12) ** (-12 * p["bank_years"]))
    cash = p["equity_founder"] + p["honor_loan"] + p["bpi_grant"] + p["bank_loan"]
    bank_out = p["bank_loan"]; seed_loan_out = 0.0
    for m in range(1, horizon + 1):
        y = min((m - 1) // 12, 2)            # au-delà de M36 : paramètres de l'an 3 prolongés (calcul du point mort)
        tot_direct_prev = sum(direct.values())
        # --- recrutements déclenchés par jalons
        for h in p["hires"] + p["sales"]:
            # règle de gestion : pas d'embauche si la trésorerie couvre moins de 6 mois du burn du mois précédent
            burn_prev = max(0.0, -rows[-1]["ebitda"]) if rows else 0.0
            cash_ok = (not p.get("cash_guard", True)) or cash >= 6 * burn_prev
            if h["key"] not in hired and m >= h["month"] and tot_direct_prev >= h["trigger"] and cash_ok:
                hired[h["key"]] = m
        # --- production commerciale du mois (nouveaux domaines Direct par source et pays)
        prod = {}
        prod[("ceo", "FR")] = p["ceo_y1"][m - 1] if y == 0 else (p["ceo_y2"] if y == 1 else p["ceo_y3"])
        for s in p["sales"]:
            if s["key"] in hired:
                k_ = m - hired[s["key"]] + 1
                ramp = min(1.0, k_ / (s["ramp"] + 1))
                prod[(s["key"], s["country"])] = s["prod"] * ramp * coverage(p, s["country"], m)
        n_ag = {"silver": 0, "gold": 0}
        for c, sched in p["agencies"].items():
            v = step(sched, m, (0, 0)); v = v if isinstance(v, tuple) else (v, 0)
            n_ag["silver"] += v[0]; n_ag["gold"] += v[1]
            prod[("agence_silver", c)] = v[0] * p["agency_prod"]["silver"]
            prod[("agence_gold", c)] = v[1] * p["agency_prod"]["gold"]
        n_ref = 0
        for c, sched in p["referrers"].items():
            v = step(sched, m, 0); n_ref += v
            prod[("apporteur", c)] = v * p["referrer_prod"]
        # saturation : plus la part du SAM déjà équipée est grande, plus le vivier restant est petit
        for key in list(prod):
            c = key[1]; pen = direct[c] / sam(c)["sam_3cms"]
            prod[key] *= max(0.0, 1 - pen / p["pen_max"])
        new = sum(prod.values())
        # --- stock de domaines Direct
        churned = 0.0
        for c in COUNTRIES:
            ch = direct[c] * p["churn_m"]; churned += ch
            direct[c] += sum(v for (src, cc), v in prod.items() if cc == c) - ch
        for src in set(s for s, _ in prod):
            by_src[src] = by_src.get(src, 0.0) * (1 - p["churn_m"]) + sum(v for (s, _), v in prod.items() if s == src)
        # répartition par CMS des nouveaux clients (au prorata des CMS disponibles dans le pays)
        for k in CMS: by_cms[k] *= 1 - p["churn_m"]
        for (src, c), v in prod.items():
            sh = MARCHE[c]["cms"]; av = [k for k in CMS if m >= p["cms_launch"][k]]
            for k in av: by_cms[k] += v * sh[k] / sum(sh[a] for a in av)
        clients = sum(direct.values())
        # --- marque blanche
        n_wl = 0; wl_lic = 0.0; wl_setup = 0.0; wl_new_dom = 0.0
        for i, sm in enumerate(p["wl_contracts"]):
            if m == sm: wl_setup += p["wl_setup"]
            if m >= sm:
                n_wl += 1; wl_lic += p["wl_license"][i]
                age = m - sm - p["wl_golive"]
                add = 0 if age < 0 else (p["wl_domains_per_month"][min(age, 3)])
                wl_dom[i] = wl_dom[i] * (1 - p["wl_churn_domains"]) + add; wl_new_dom += add
        wl_domains = sum(wl_dom)
        wl_ship = wl_domains * p["wl_ship_per_domain"] * p["wl_ship_fee"]
        # --- chiffre d'affaires
        mrr = clients * p["arpa"]
        agency_new = sum(v for (s, _), v in prod.items() if s.startswith("agence"))
        setup = (new - agency_new) * p["setup_fee"]
        services = p["services"][y] / 12 if m >= 5 else 0
        shipfees = clients * p["ship_per_client"] * p["ship_fee"] * p["ship_fee_share"] if m >= p["ship_fee_start"] else 0
        revenue_direct = mrr + setup + services + shipfees
        revenue_wl = wl_lic + wl_setup + wl_ship
        revenue = revenue_direct + revenue_wl
        # --- coûts variables
        ag_comm = (by_src.get("agence_silver", 0) * p["agency_commission"]["silver"] + by_src.get("agence_gold", 0) * p["agency_commission"]["gold"]) * p["arpa"]
        ref_comm = sum(v for (s, _), v in prod.items() if s == "apporteur") * p["referrer_fee"]
        hosting = (clients + wl_domains) * p["hosting_per_domain"]; hosting_direct = clients * p["hosting_per_domain"]
        payfee = revenue_direct * p["payment_fee"]
        support = clients * p["support_h_per_client"] * p["support_cost_h"] if "csm1" not in hired else 0
        cogs = ag_comm + ref_comm + hosting + payfee + support
        # --- coûts fixes
        dev = p["mvp_cost"] / p["mvp_months"] if m <= p["mvp_months"] else (p["freelance_y1"] if "lead_dev" not in hired else 0)
        staff = p["founder"][y]; heads = 1
        staff_by = {"dirigeant": p["founder"][y]}
        for h in p["hires"]:
            if h["key"] in hired:
                staff += h["cost"]; heads += 1; staff_by[h["key"]] = h["cost"]
        sales_var = 0.0
        for s in p["sales"]:
            if s["key"] in hired:
                v = prod.get((s["key"], s["country"]), 0) * p["arpa"] * 12 * p["sales_commission_rate"] * p["charges"]
                fx = p["sales_fixed"] + s.get("eor", 0)   # eor : frais d'Employer of Record pour un·e salarié·e hors de France
                staff += fx + v; heads += 1; staff_by[s["key"]] = fx + v; sales_var += v
        if "pm" in hired:
            v = (p["pm_bonus_wl"] * (1 if m in p["wl_contracts"] else 0) + p["pm_bonus_agency"] * agency_new) * p["charges"]
            staff += v; staff_by["pm"] = staff_by.get("pm", 0) + v; sales_var += v
        n_hires_this_month = sum(1 for k_, mm in hired.items() if mm == m)
        opex = (p["marketing"][y] + p["partner_program"][y] + p["travel"][y] + p["localisation"][y] + p["legal"][y]) / 12 \
            + p["tools_m"][y] + p["office_m"][y] + p["admin_m"][y] + n_hires_this_month * p["recruiting_per_hire"] \
            + heads * p["training_per_head"] / 12
        ebitda = revenue - cogs - dev - staff - opex
        # --- financement
        debt = 0.0
        if m > 6:
            interest = bank_out * p["bank_rate"] / 12; principal = loan_m - interest
            bank_out -= principal; debt += loan_m
        if m > 12: debt += p["honor_loan"] / (12 * p["honor_years"])
        inflow = 0.0
        if m == p["seed_month"]: inflow = p["seed_equity"] + p["seed_bpi_loan"]; seed_loan_out = p["seed_bpi_loan"]
        if p["seed_bpi_loan"] and m > p["seed_month"] + 12:   # prêt d'amorçage BPI : différé 12 mois puis 5 ans
            debt += p["seed_bpi_loan"] / 60
        cash += ebitda - debt + inflow
        rows.append(dict(m=m, y=y + 1, new=new, churned=churned, clients=clients, wl_partners=n_wl, wl_domains=wl_domains,
                         wl_new_domains=wl_new_dom, domains_total=clients + wl_domains,
                         mrr=mrr, setup=setup, services=services, shipfees=shipfees, wl_license=wl_lic, wl_setup=wl_setup,
                         wl_ship=wl_ship, revenue_direct=revenue_direct, revenue_wl=revenue_wl, revenue=revenue,
                         ag_comm=ag_comm, ref_comm=ref_comm, hosting_direct=hosting_direct, cogs=cogs, dev=dev, staff=staff, opex=opex, ebitda=ebitda,
                         debt=debt, inflow=inflow, cash=cash, heads=heads, sales_var=sales_var,
                         n_agencies=n_ag["silver"] + n_ag["gold"], n_silver=n_ag["silver"], n_gold=n_ag["gold"], n_referrers=n_ref,
                         mkt=(p["marketing"][y] + p["partner_program"][y]) / 12,
                         prod={f"{s}|{c}": v for (s, c), v in prod.items()},
                         by_country=dict(direct), by_cms=dict(by_cms),
                         cov={c: coverage(p, c, m) for c in COUNTRIES},
                         staff_by=staff_by, recurring=mrr + shipfees + wl_lic + wl_ship))
    return rows, hired


SRC_LABEL = {"ceo": "Dirigeant", "sales_fr": "Sales France", "sales_it": "Sales Italie", "sales_es": "Sales Espagne & Portugal",
             "agence_silver": "Agences Silver", "agence_gold": "Agences Gold", "apporteur": "Apporteurs d'affaires"}


def yearly(rows, p):
    out = []
    for y in (1, 2, 3):
        r = [x for x in rows if x["y"] == y]
        s = lambda k: sum(x[k] for x in r)
        new = s("new"); rev = s("revenue"); cogs = s("cogs")
        sales_cost = sum(x["staff_by"].get(k_, 0) for x in r for k_ in ("sales_fr", "sales_it", "sales_es", "pm", "alt"))
        acq = s("mkt") + sales_cost + s("ag_comm") * 0 + s("ref_comm") + 0.3 * p["founder"][y - 1] * 12
        src = {}
        for x in r:
            for key, v in x["prod"].items():
                sname = key.split("|")[0]; src[sname] = src.get(sname, 0) + v
        out.append(dict(
            annee=y, nouveaux=new, clients_fin=r[-1]["clients"], wl_partenaires=r[-1]["wl_partners"], wl_domaines=r[-1]["wl_domains"],
            domaines_total=r[-1]["domains_total"], mrr_fin=r[-1]["recurring"], arr_fin=r[-1]["recurring"] * 12,
            ca_abonnements=s("mrr"), ca_installation=s("setup"), ca_services=s("services"), ca_logisticiens=s("shipfees"),
            ca_wl_licences=s("wl_license"), ca_wl_setup=s("wl_setup"), ca_wl_expeditions=s("wl_ship"),
            ca_direct=s("revenue_direct"), ca_wl=s("revenue_wl"), ca_total=rev,
            couts_variables=cogs, marge_brute=rev - cogs, taux_marge_brute=(rev - cogs) / rev if rev else 0,
            developpement=s("dev"), salaires=s("staff"), autres_charges=s("opex"),
            ebitda=s("ebitda"), tresorerie_fin=r[-1]["cash"], effectif_fin=r[-1]["heads"],
            agences_fin=r[-1]["n_agencies"], apporteurs_fin=r[-1]["n_referrers"],
            cac=acq / new if new else 0, sources=src,
            pays_fin=r[-1]["by_country"], cms_fin=r[-1]["by_cms"],
        ))
    return out


def breakeven(rows):
    """Premier mois à partir duquel l'EBITDA mensuel reste positif (calculé sur 48 mois, an 3 prolongé)."""
    for x in rows:
        if x["ebitda"] > 0 and all(z["ebitda"] > 0 for z in rows if z["m"] >= x["m"]):
            return x["m"]
    return None


def size_seed(p):
    """Seed = besoin pour garder ≥ safety_months de charges en trésorerie au point bas, arrondi à 50 k€ ; 30 % en prêt d'amorçage BPI."""
    q = deepcopy(p); q["seed_equity"] = 0; q["seed_bpi_loan"] = 0; q["cash_guard"] = False
    rows, _ = run(q)
    low = min(r["cash"] for r in rows)
    burn = sum(r["revenue"] - r["ebitda"] for r in rows[-6:]) / 6
    need = max(0.0, -low + p["safety_months"] * 0.5 * burn)   # au point bas : ≥ 3 mois de charges (6 mois de burn net)
    need = 50000 * round((need + 49999) // 50000)
    p["seed_bpi_loan"] = 0 if need == 0 else min(300000, 50000 * round(need * 0.3 / 50000))
    p["seed_equity"] = need - p["seed_bpi_loan"]
    return p


def sam(c):
    mk = MARCHE[c]
    online = mk["producteurs"] * mk["online"]
    return dict(tam=online, sam_3cms=online * sum(mk["cms"].values()) * mk["export"], sam_woo=online * mk["cms"]["woo"] * mk["export"])


if __name__ == "__main__":
    res = {}
    central_seed = None
    for name in ("central", "pessimiste", "optimiste", "central_sans_marque_blanche", "central_sans_frais_logisticien"):
        p = scen(name)
        if name == "central":
            p = size_seed(p); central_seed = (p["seed_equity"], p["seed_bpi_loan"])
        else:
            p["seed_equity"], p["seed_bpi_loan"] = central_seed   # mêmes fonds que le central → effet isolé de l'hypothèse
        rows, hired = run(p)
        res[name] = dict(p=p, rows=rows, hired=hired, years=yearly(rows, p), be=breakeven(run(p, 48)[0]),
                         cash_min=min(r["cash"] for r in rows), cash_min_m=min(rows, key=lambda r: r["cash"])["m"])
    for n, r in res.items():
        last = r["rows"][-1]
        fixed = last["dev"] + last["staff"] + last["opex"]
        r["fixed_m36"] = fixed; r["ebitda_m36"] = last["ebitda"]; r["margin_m36"] = last["revenue"] - last["cogs"]
        print(f"[{n}] seed {r['p']['seed_equity']:,.0f} + BPI {r['p']['seed_bpi_loan']:,.0f} · point mort M{r['be']} · "
              f"EBITDA M36 {last['ebitda']:,.0f} · charges fixes {fixed:,.0f} · tréso min {r['cash_min']:,.0f} (M{r['cash_min_m']}) · embauches {r['hired']}")
        for y in r["years"]:
            print("   ", {k: (round(v) if isinstance(v, float) else v) for k, v in y.items() if k not in ("sources", "pays_fin", "cms_fin")})
            print("    sources", {k: round(v, 1) for k, v in y["sources"].items()})
        print("    pays M36", {k: round(v) for k, v in last["by_country"].items()}, "cms", {k: round(v) for k, v in last["by_cms"].items()})
    # ---- « Ce qu'il faudrait » : levier unique qui ferait passer le point mort à M36 au plus tard (scénario central)
    def be_with(mod):
        q = deepcopy(res["central"]["p"]); mod(q); return breakeven(run(q, 48)[0])
    frn = lambda f: f
    levers = []
    for label, fn, vals, fmt in [
        ("Résiliation mensuelle", lambda q, v: q.__setitem__("churn_m", v), [0.014, 0.013, 0.012, 0.011, 0.010], "{:.1%}"),
        ("ARPA (€/mois)", lambda q, v: q.__setitem__("arpa", v), [97, 100, 103, 106, 110], "{:.0f} €"),
        ("Productivité des 3 sales (×)", lambda q, v: [s_.__setitem__("prod", s_["prod"] * v) for s_ in q["sales"]], [1.05, 1.1, 1.15, 1.2, 1.3], "×{:.2f}"),
        ("Logisticiens en marque blanche à M36", lambda q, v: (q.__setitem__("wl_contracts", [15, 22, 28, 33, 30, 34][:v]), q.__setitem__("wl_license", [1490, 1490, 2490, 1490, 1490, 1490][:v])), [5, 6], "{}"),
        ("Charges fixes M25+ (report dev3 + csm2)", lambda q, v: [h.__setitem__("month", v) for h in q["hires"] if h["key"] in ("dev3", "csm2")], [31, 37], "M{}"),
    ]:
        found = None
        for v in vals:
            b = be_with(lambda q: fn(q, v))
            if b and b <= 36: found = (fmt.format(v), b); break
        levers.append(dict(levier=label, central={"Résiliation mensuelle": "1,5 %", "ARPA (€/mois)": "94 €", "Productivité des 3 sales (×)": "×1,00",
                                                  "Logisticiens en marque blanche à M36": "4", "Charges fixes M25+ (report dev3 + csm2)": "M25"}[label],
                           requis=found[0].replace(".", ",").replace("%", " %") if found else "insuffisant seul", point_mort=f"M{found[1]}" if found else "—"))
    def combo(q):
        q["arpa"] = 99.0; q["wl_contracts"] = [15, 22, 28, 30, 33]; q["wl_license"] = [1490, 1490, 2490, 1490, 1490]
    b = be_with(combo)
    levers.append(dict(levier="Combinaison : Pro par défaut (ARPA 99 €) + 5e licence marque blanche (M30)", central="94 € / 4 licences", requis="99 € / 5 licences", point_mort=f"M{b}" if b else "—"))
    for l in levers: print("levier", l)
    # ---- Économie unitaire (central, M36)
    last = res["central"]["rows"][-1]; pc = res["central"]["p"]
    var_direct = last["ag_comm"] + last["hosting_direct"] + last["revenue_direct"] * pc["payment_fee"]
    contrib = (last["mrr"] + last["shipfees"] - var_direct) / last["clients"]
    cac3 = res["central"]["years"][2]["cac"]
    unit = dict(arpa=pc["arpa"], frais_logisticien=last["shipfees"] / last["clients"], contribution=contrib,
                duree_vie=1 / pc["churn_m"], ltv=contrib / pc["churn_m"], cac_a3=cac3, ltv_cac=contrib / pc["churn_m"] / cac3, payback=cac3 / contrib)
    print("unit", {k: round(v, 1) for k, v in unit.items()})
    market = {c: sam(c) for c in COUNTRIES}
    for c, v in market.items(): print(c, {k: round(x) for k, x in v.items()})
    json.dump(dict(scenarios={n: dict(years=r["years"], be=r["be"], cash_min=r["cash_min"], cash_min_m=r["cash_min_m"], hired=r["hired"],
                                      fixed_m36=r["fixed_m36"], ebitda_m36=r["ebitda_m36"], margin_m36=r["margin_m36"], p=r["p"], rows=r["rows"])
                              for n, r in res.items()},
                   market=market, marche=MARCHE, src_label=SRC_LABEL, levers=levers, unit=unit),
              open(os.path.join(HERE, "bp_out.json"), "w"), indent=1, default=float)
