# -*- coding: utf-8 -*-
"""Génère les 4 graphiques du dossier (HTML -> PNG via chromium), identité Lucéane."""
import os, subprocess

INK, GREEN, SHELL, GOLD, BLUE = "#1B2A41", "#2E9E6B", "#FAF7F2", "#E0B84C", "#A8C6DC"
CSS = f"""
* {{ margin:0; padding:0; box-sizing:border-box; }}
body {{ font-family: Arial, Helvetica, sans-serif; background:#fff; width:820px; padding:18px 22px; color:{INK}; }}
h3 {{ font-size:17px; margin-bottom:2px; }}
.sub {{ font-size:11.5px; color:#55606e; margin-bottom:14px; }}
.serif {{ font-family: Georgia, serif; }}
"""

def render(name, body, h):
    html = f"<!DOCTYPE html><html><head><meta charset='utf-8'><style>{CSS}</style></head><body>{body}</body></html>"
    open(f"{name}.html", "w", encoding="utf-8").write(html)
    subprocess.run(["/opt/pw-browsers/chromium", "--headless", "--disable-gpu", "--no-sandbox",
                    f"--screenshot={name}.png", f"--window-size=820,{h}", "--hide-scrollbars",
                    f"file://{os.getcwd()}/{name}.html"], check=True, capture_output=True)
    print(name, "ok")

# 1 — ARR + EBITDA
bars = ""
for label, arr, hpx, ebitda, col in [("An 1", "0,7", 22, "EBITDA −0,53 M€", BLUE),
                                     ("An 2", "3,0", 92, "EBITDA −0,17 M€", BLUE),
                                     ("An 3", "8,8", 270, "EBITDA +1,95 M€", GREEN)]:
    bars += f"""<div style='flex:1; text-align:center'>
      <div style='font-size:22px; font-weight:700' class='serif'>{arr} M€</div>
      <div style='margin:6px auto 0; width:110px; height:{hpx}px; background:{col}; border-radius:5px 5px 0 0'></div>
      <div style='border-top:2px solid {INK}; margin-top:0; padding-top:6px; font-size:13px; font-weight:700'>{label}</div>
      <div style='font-size:11.5px; color:{"#2E9E6B" if "+" in ebitda else "#8a8378"}; font-weight:700'>{ebitda}</div></div>"""
render("chart_arr", f"""<h3>Revenus récurrents annuels (ARR, fin d'année) et rentabilité</h3>
<div class='sub'>Modèle financier v1.0 — annexe A. Premier trimestre d'EBITDA positif : T7 (milieu de l'année 2).</div>
<div style='display:flex; gap:26px; align-items:flex-end; height:400px'>{bars}</div>""", 580)

# 2 — TAM SAM SOM
rows = ""
for label, val, w, col, desc in [
    ("TAM", "≈ 500 M€", 100, INK, "3,5 M de salariés d'ETI × ~11,5 € × 12 mois — marché total des ETI françaises"),
    ("SAM", "≈ 200 M€", 62, "#3d5570", "ETI adressables : épargne salariale en place, DRH structurée (~40 %)"),
    ("SOM", "≈ 10 M€", 24, GREEN, "Objectif à 3 ans : 120 ETI, 70 000 salariés couverts (ARR 8,8 M€ + packs)")]:
    rows += f"""<div style='display:flex; align-items:center; gap:14px; margin-bottom:16px'>
      <div style='width:52px; font-weight:700; font-size:15px'>{label}</div>
      <div style='flex:1'><div style='width:{w}%; background:{col}; color:#fff; border-radius:6px; padding:9px 14px; font-weight:700; font-size:15px' class='serif'>{val}</div>
      <div style='font-size:11.5px; color:#55606e; margin-top:4px'>{desc}</div></div></div>"""
render("chart_marche", f"""<h3>Taille de marché — approche bottom-up</h3>
<div class='sub'>Base : 7 442 ETI, ≈ 3,5 M de salariés (INSEE). Détail des hypothèses : annexe A.</div>{rows}""", 340)

# 3 — Trajectoire clients / salariés
cells = ""
for an, cl, sal, arpu in [("Fin an 1", "15", "6 000", "400"), ("Fin an 2", "50", "25 000", "500"), ("Fin an 3", "120", "70 000", "583")]:
    cells += f"""<div style='flex:1; background:{SHELL}; border-radius:10px; padding:16px 18px; text-align:center'>
      <div style='font-size:12px; font-weight:700; color:#8a8378; text-transform:uppercase; letter-spacing:.06em'>{an}</div>
      <div class='serif' style='font-size:30px; font-weight:700; margin-top:6px'>{cl} <span style='font-size:14px'>ETI</span></div>
      <div style='font-size:13px; color:#55606e; margin-top:4px'><b style='color:{GREEN}'>{sal}</b> salariés couverts</div>
      <div style='font-size:11px; color:#8a8378; margin-top:2px'>taille moyenne {arpu} salariés/client</div></div>"""
render("chart_traction", f"""<h3>Trajectoire commerciale sur 3 ans</h3>
<div class='sub'>Entonnoir an 1 : 500 comptes travaillés → 125 RDV → 63 démos → 25 pilotes → 15 contrats (conversion pilote 60 %).</div>
<div style='display:flex; gap:16px'>{cells}</div>""", 250)

# 4 — Trésorerie
pts = [1328,1151,1016,950,715,605,602,713,756,1097,1696,2257]
maxv = 2400.0
poly = " ".join(f"{30+i*62},{190-(v/maxv)*170:.0f}" for i, v in enumerate(pts))
labels = "".join(f"<text x='{30+i*62}' y='208' font-size='9' fill='#8a8378' text-anchor='middle'>T{i+1}</text>" for i in range(12))
render("chart_treso", f"""<h3>Trésorerie de fin de trimestre (k€) — levée de 1,5 M€ encaissée au T1</h3>
<div class='sub'>Point bas : 602 k€ (T7). Besoin cumulé max hors levée : 0,92 M€ (central) · 1,43 M€ (scénario prudent, ventes −30 %).</div>
<svg width='776' height='215'>
  <line x1='30' y1='190' x2='746' y2='190' stroke='#ccc' stroke-width='1'/>
  <polyline points='{poly}' fill='none' stroke='{GREEN}' stroke-width='3'/>
  {"".join(f"<circle cx='{30+i*62}' cy='{190-(v/maxv)*170:.0f}' r='3.5' fill='{INK}'/>" for i, v in enumerate(pts))}
  <text x='{30+6*62}' y='{190-(602/maxv)*170-10:.0f}' font-size='10' fill='{INK}' text-anchor='middle' font-weight='bold'>point bas 602 k€</text>
  <text x='{30+11*62-8}' y='{190-(2257/maxv)*170-10:.0f}' font-size='10' fill='{GREEN}' text-anchor='middle' font-weight='bold'>2 257 k€</text>
  {labels}
</svg>""", 340)
