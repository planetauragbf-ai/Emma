"""Génère livrables/Passavin_Dossier_Investisseur.pptx (≤ 30 pages) et livrables/Passavin_Pitch_Soutenance.pptx (≤ 20 slides).
Chiffres lus dans bp_out.json (scénarios du business plan) : relancer bp_model.py puis ce script après toute modification.
"""
import json, os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR

HERE = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.dirname(HERE)
D = json.load(open(os.path.join(HERE, "bp_out.json")))
C = D["central"]; Y = C["years"]
CH = lambda n: os.path.join(HERE, "charts", n)

INK, WINE, TEAL, SAND, GREY, WHITE, GOLD = (RGBColor(0x14, 0x23, 0x3A), RGBColor(0x8C, 0x2F, 0x39), RGBColor(0x2A, 0x7F, 0x87),
                                            RGBColor(0xF4, 0xEF, 0xE6), RGBColor(0x5E, 0x66, 0x73), RGBColor(0xFF, 0xFF, 0xFF), RGBColor(0xC9, 0xA6, 0x6B))
LIGHT = RGBColor(0xE9, 0xDF, 0xCF)
FONT = "Calibri"

def k(v): return f"{v/1000:,.0f} k€".replace(",", " ")
def n(v): return f"{v:,.0f}".replace(",", " ")


class Deck:
    def __init__(self, label):
        self.p = Presentation(); self.p.slide_width = Inches(13.333); self.p.slide_height = Inches(7.5)
        self.label = label; self.i = 0

    def _bg(self, s, color):
        f = s.background.fill; f.solid(); f.fore_color.rgb = color

    def text(self, s, x, y, w, h, txt, size=16, color=INK, bold=False, align=PP_ALIGN.LEFT, anchor=MSO_ANCHOR.TOP, italic=False):
        tb = s.shapes.add_textbox(Inches(x), Inches(y), Inches(w), Inches(h)); tf = tb.text_frame; tf.word_wrap = True
        tf.vertical_anchor = anchor; tf.margin_left = tf.margin_right = Inches(0.05)
        lines = txt if isinstance(txt, list) else [txt]
        for j, line in enumerate(lines):
            par = tf.paragraphs[0] if j == 0 else tf.add_paragraph(); par.alignment = align
            r = par.add_run(); r.text = line; r.font.size = Pt(size); r.font.color.rgb = color; r.font.bold = bold
            r.font.italic = italic; r.font.name = FONT
        return tb

    def box(self, s, x, y, w, h, fill=WHITE, line=None, shape=MSO_SHAPE.ROUNDED_RECTANGLE):
        b = s.shapes.add_shape(shape, Inches(x), Inches(y), Inches(w), Inches(h))
        b.fill.solid(); b.fill.fore_color.rgb = fill
        if line: b.line.color.rgb = line; b.line.width = Pt(1)
        else: b.line.fill.background()
        if shape == MSO_SHAPE.ROUNDED_RECTANGLE: b.adjustments[0] = 0.08
        b.shadow.inherit = False
        return b

    def slide(self, title, kicker=None, dark=False):
        self.i += 1
        s = self.p.slides.add_slide(self.p.slide_layouts[6]); self._bg(s, INK if dark else SAND)
        if not dark:
            self.box(s, 0, 0, 0.12, 7.5, WINE, shape=MSO_SHAPE.RECTANGLE)
            if kicker: self.text(s, 0.6, 0.35, 10, 0.35, kicker.upper(), 11, TEAL, True)
            self.text(s, 0.6, 0.65, 12.2, 0.9, title, 28, INK, True)
            self.text(s, 0.6, 7.0, 9, 0.3, f"PASSAVIN · nom de travail provisoire · {self.label} · [Nom Prénom]", 9, GREY)
            self.text(s, 12.0, 7.0, 0.8, 0.3, f"{self.i:02d}", 9, GREY, align=PP_ALIGN.RIGHT)
        return s

    def bullets(self, s, x, y, w, h, items, size=15, color=INK, gap=6):
        tb = s.shapes.add_textbox(Inches(x), Inches(y), Inches(w), Inches(h)); tf = tb.text_frame; tf.word_wrap = True
        for j, it in enumerate(items):
            par = tf.paragraphs[0] if j == 0 else tf.add_paragraph(); par.space_after = Pt(gap)
            bold = it.startswith("**"); it = it.strip("*")
            r = par.add_run(); r.text = ("" if it.startswith(("—", "✔", "✘", "→", "①", "②", "③", "④", "⑤")) else "• ") + it
            r.font.size = Pt(size); r.font.color.rgb = color; r.font.name = FONT; r.font.bold = bold

    def table(self, s, x, y, w, rows, widths=None, size=11, h_row=0.36, header_fill=INK, zebra=True, bold_first_col=False):
        nr, nc = len(rows), len(rows[0])
        t = s.shapes.add_table(nr, nc, Inches(x), Inches(y), Inches(w), Inches(h_row * nr)).table
        widths = widths or [w / nc] * nc
        for j, cw in enumerate(widths): t.columns[j].width = Inches(cw)
        for r_, row in enumerate(rows):
            t.rows[r_].height = Inches(h_row)
            for c_, val in enumerate(row):
                cell = t.cell(r_, c_); cell.margin_left = cell.margin_right = Inches(0.06)
                cell.margin_top = cell.margin_bottom = Inches(0.03); cell.vertical_anchor = MSO_ANCHOR.MIDDLE
                cell.fill.solid()
                cell.fill.fore_color.rgb = header_fill if r_ == 0 else (WHITE if (r_ % 2 or not zebra) else RGBColor(0xFA, 0xF7, 0xF1))
                tf = cell.text_frame; tf.word_wrap = True; par = tf.paragraphs[0]
                txt = str(val); b = txt.startswith("**"); txt = txt.strip("*")
                r = par.add_run(); r.text = txt; r.font.size = Pt(size); r.font.name = FONT
                r.font.color.rgb = WHITE if r_ == 0 else INK; r.font.bold = r_ == 0 or b or (bold_first_col and c_ == 0)
        return t

    def kpis(self, s, x, y, items, w=2.9, h=1.55, gap=0.25, big=30, dark_first=True):
        for j, (val, lab) in enumerate(items):
            dark = dark_first and j == 0
            self.box(s, x + j * (w + gap), y, w, h, INK if dark else WHITE)
            self.text(s, x + j * (w + gap) + 0.2, y + 0.12, w - 0.4, 0.75, val, big, WHITE if dark else WINE, True)
            self.text(s, x + j * (w + gap) + 0.2, y + 0.85, w - 0.4, h - 0.9, lab, 12, LIGHT if dark else GREY)

    def callout(self, s, x, y, w, h, txt, size=15, fill=INK, color=WHITE):
        self.box(s, x, y, w, h, fill)
        self.text(s, x + 0.25, y, w - 0.5, h, txt, size, color, True, anchor=MSO_ANCHOR.MIDDLE)

    def image(self, s, path, x, y, w=None, h=None):
        s.shapes.add_picture(path, Inches(x), Inches(y), Inches(w) if w else None, Inches(h) if h else None)

    def flow(self, s, x, y, steps, w=1.72, h=1.55, gap=0.12, size=11):
        """Frise : titres dans des chevrons (hauteur 0,7"), descriptions en dessous."""
        ch = 0.7
        for j, (t1, t2) in enumerate(steps):
            sh = self.box(s, x + j * (w + gap), y, w, ch, INK if j % 2 == 0 else TEAL, shape=MSO_SHAPE.CHEVRON if j else MSO_SHAPE.PENTAGON)
            sh.adjustments[0] = 0.35
            self.text(s, x + j * (w + gap) + (0.3 if j else 0.12), y, w - 0.5, ch, t1, size + 1, WHITE, True, anchor=MSO_ANCHOR.MIDDLE)
            self.text(s, x + j * (w + gap), y + ch + 0.08, w, h - ch, t2, size, INK)

    def cover(self, title, subtitle, foot):
        self.i += 1
        s = self.p.slides.add_slide(self.p.slide_layouts[6]); self._bg(s, INK)
        c = s.shapes.add_shape(MSO_SHAPE.OVAL, Inches(9.2), Inches(-1.5), Inches(6), Inches(6)); c.fill.solid(); c.fill.fore_color.rgb = RGBColor(0x1E, 0x33, 0x52); c.line.fill.background()
        c = s.shapes.add_shape(MSO_SHAPE.OVAL, Inches(10.6), Inches(3.9), Inches(2.6), Inches(2.6)); c.fill.solid(); c.fill.fore_color.rgb = WINE; c.line.fill.background()
        self.text(s, 0.9, 2.0, 9, 1.2, "PASSAVIN", 60, WHITE, True)
        self.box(s, 0.95, 3.25, 1.2, 0.09, WINE, shape=MSO_SHAPE.RECTANGLE)
        self.text(s, 0.9, 3.55, 9.5, 1.0, title, 24, WHITE)
        self.text(s, 0.9, 4.45, 9.5, 0.8, subtitle, 16, LIGHT)
        self.text(s, 0.9, 6.5, 11, 0.5, foot, 11, LIGHT)
        return s

    def save(self, name):
        path = os.path.join(ROOT, "livrables", name); self.p.save(path); return path


def common_blocks(d, pitch=False):
    """Slides partagées entre dossier et pitch, renvoyées comme fonctions."""
    pass


# ============================== DOSSIER INVESTISSEUR (30 pages) ==============================
d = Deck("Dossier Bloc 3")
d.cover("Le connecteur neutre entre la boutique en ligne des domaines et les logisticiens vin",
        "Dossier de présentation investisseurs — Bloc 3 Euridis · Mastère Marketing & Digital Business",
        "[Nom Prénom] · [Promotion] · Octobre 2026 · Nom de travail provisoire, sous réserve des vérifications INPI/EUIPO")

s = d.slide("Résumé investisseur", "En une page")
d.kpis(s, 0.6, 1.6, [("≈ 9 000", "domaines vendent déjà en ligne via leur site (21 % des producteurs, Afnic 2025)"),
                     ("1", "seul plugin vin trouvé sur WooCommerce : mono-logisticien, < 10 installations"),
                     (k(Y[2]["arr_fin"]), "ARR visé fin 2029 (scénario central, 170 clients)"),
                     ("320 k€", "besoin total sur 3 ans, en 2 tranches conditionnées à des jalons")], w=2.85)
d.table(s, 0.6, 3.5, 12.1, [
    ["Problème", "Solution", "Modèle", "Statut honnête"],
    ["Ressaisie des commandes étrangères, pays non livrables proposés au panier, frais de port faux",
     "Extension WooCommerce + moteur cloud : éligibilité au checkout, transmission automatique, suivi, multi-logisticiens",
     "Abonnement 49-199 €/mois + installation + frais de plateforme logisticien (à valider)",
     "Aucun client payant. Verdict : modifier puis tester avant d'investir (≈ 3 mois, < 8 k€)"]],
    widths=[3, 3.4, 2.9, 2.8], size=12, h_row=1.1)
d.callout(s, 0.6, 5.95, 12.1, 0.8, "Nous demandons : 120 k€ (prêt d'honneur, BPI, banque) pour valider et livrer le MVP — puis 200 k€ seed à M15-M18, seulement si les jalons sont atteints.", 15)

s = d.slide("Start with why : aucun vin ne devrait rester à quai", "Vision & motivation")
d.text(s, 0.6, 1.6, 6.3, 3.5, ["Au XIXᵉ siècle, aucun vin ne circulait sans « passavant », le laissez-passer des douanes.",
                               "", "Aujourd'hui, un domaine qui vend en ligne à un client suisse, belge ou singapourien perd encore du temps — et parfois la vente — entre sa boutique et son logisticien.",
                               "", "Passavin veut que chaque bouteille vendue en ligne puisse partir, sans ressaisie, vers toutes les destinations réellement livrables."], 16)
d.box(s, 7.3, 1.6, 5.4, 4.9, WHITE)
d.text(s, 7.6, 1.75, 5, 0.4, "SOURCES DE MOTIVATION", 12, TEAL, True)
d.bullets(s, 7.6, 2.2, 4.9, 4.2, ["Expérience terrain du porteur : commercial dans le transport de vin pour particuliers à l'international",
                                  "Constat répété d'intégrations refaites « une par une » dans l'écosystème d'un logisticien (signal observé chez Planet Aura — pas des clients de Passavin)",
                                  "Volonté de bâtir une entreprise indépendante, neutre entre logisticiens",
                                  "Approche pragmatique : un seul produit, un seul CMS, tester avant de coder"], 14)

s = d.slide("Un environnement sous pression, qui pousse vers la vente directe", "Environnement")
d.kpis(s, 0.6, 1.6, [("59 032", "exploitations viticoles (Agreste, RA 2020)"), ("14,3 Md€", "exportations vins & spiritueux 2025, −8 % (FEVS)"),
                     ("27 %", "des exploitations qui commercialisent du vin vendent en direct (Agreste 2023)"), ("+15 %", "droits de douane américains sur les vins UE depuis août 2025")], w=2.85)
d.bullets(s, 0.6, 3.5, 12, 3.2, ["**Les domaines diversifient leurs débouchés : vente directe, Europe, Asie — là où l'expédition aux particuliers est possible mais complexe.",
                                 "Depuis le 13/02/2023, la vente à distance intra-UE impose accises et TVA du pays de destination, souvent avec représentant fiscal (directive UE 2020/262) : 27 régimes à gérer.",
                                 "Les transporteurs filtrent l'alcool : FedEx refuse l'international aux particuliers, Packlink exclut le vin hors UE, UPS exige un contrat alcool.",
                                 "Conséquence : le domaine dépend de logisticiens spécialisés vin — dont les outils ne sont pas branchés sur sa boutique."], 15)

s = d.slide("Pourquoi maintenant ?", "Situation actuelle")
d.table(s, 0.6, 1.6, 12.1, [["Tendance", "Donnée", "Effet pour Passavin"],
                            ["Digitalisation des vignerons", "79 % ont un site, 21 % vendent en ligne (Afnic, déc. 2025)", "Base installée de boutiques à connecter"],
                            ["Achat de vin en ligne", "34 % des consommateurs en 2024 (Sowine via Xerfi)", "Marché mûr, croissance « normalisée »"],
                            ["Export en baisse vers les États-Unis", "−21 % en 2025 (FEVS)", "Report vers UE, Royaume-Uni, Suisse, Asie : nos destinations"],
                            ["Réglementation intra-UE 2023", "Accises du pays de destination", "Besoin de logisticiens spécialisés → besoin de connecteurs"],
                            ["Logisticiens qui ouvrent des API", "Hillebrand Gori, Planet Aura (API déclarées)", "Rend le connecteur techniquement possible"]],
        widths=[3.2, 4.6, 4.3], size=13, h_row=0.62)
d.callout(s, 0.6, 5.75, 12.1, 0.85, "Point d'attention : la contrainte budgétaire des domaines augmente aussi. Le prix d'entrée doit être bas et le gain démontré en démo.", 14, WINE)

s = d.slide("Le problème : trois frictions entre « vendre » et « livrer »", "Problème")
for j, (t, b) in enumerate([("01 · Avant la vente", "La boutique propose des pays où aucun logisticien ne livre le vin, avec un forfait de port approximatif → commande annulée ou vendue à perte."),
                            ("02 · Après la vente", "La commande est ressaisie à la main dans le portail ou le fichier du logisticien : ≈ 12 min par commande étrangère [hypothèse à mesurer]."),
                            ("03 · Après l'expédition", "Le numéro de suivi est recopié à la main ; le client inquiet écrit ; les incidents se gèrent par mail.")]):
    d.box(s, 0.6 + j * 4.1, 1.7, 3.85, 3.4, WHITE)
    d.text(s, 0.85 + j * 4.1, 1.9, 3.4, 0.5, t, 18, WINE, True)
    d.text(s, 0.85 + j * 4.1, 2.5, 3.4, 2.5, b, 15)
d.callout(s, 0.6, 5.45, 12.1, 1.15, "Qui souffre le plus ? Le domaine (temps, ventes perdues) — mais aussi le logisticien, qui paie chaque intégration sur mesure. D'où un modèle à deux faces, à valider.", 15)

s = d.slide("Le problème est réel, son ampleur n'est pas encore prouvée", "Problème — ce qui est validé / ce qui ne l'est pas")
d.table(s, 0.6, 1.6, 12.1, [["Affirmation", "Statut", "Comment le prouver"],
                            ["Les intégrations logistiques sont faites au cas par cas", "Observé (écosystème Planet Aura : 10 réalisées)", "Entretiens 4 logisticiens"],
                            ["Les génériques gèrent mal l'alcool international", "Vérifié (Packlink, FedEx, ShipStation)", "—"],
                            ["Un plugin vin existe mais n'est pas adopté", "Vérifié (Hillebrand Gori : < 10 installations)", "Comprendre pourquoi (3 entretiens)"],
                            ["≈ 12 min de ressaisie par commande étrangère", "**Hypothèse**", "Chronométrage chez 25 domaines"],
                            ["≥ 30 % des domaines WooCommerce font ≥ 10 commandes étrangères/mois", "**Hypothèse**", "Entretiens + scan de sites"],
                            ["Les domaines paieront ≥ 49 €/mois", "**Hypothèse**", "Van Westendorp + 8 pré-ventes avec acompte"]],
        widths=[5.2, 3.6, 3.3], size=13, h_row=0.62)

s = d.slide("La solution : votre boutique, branchée à vos logisticiens vin", "Solution")
d.callout(s, 0.6, 1.55, 12.1, 1.0, "« Au panier, vos clients étrangers ne voient que les destinations réellement livrables, au bon prix. Après l'achat, la commande part chez le logisticien et le suivi revient tout seul. »", 16)
for j, (t, b) in enumerate([("Moins de ventes perdues", "Pays non livrables masqués, tarifs réels des logisticiens"),
                            ("Zéro ressaisie", "Transmission automatique ou validée en un clic ; objectif < 1 min/commande"),
                            ("Liberté", "Plusieurs logisticiens, bascule sans redévelopper ; neutralité contractuelle")]):
    d.box(s, 0.6 + j * 4.1, 2.85, 3.85, 1.9, WHITE)
    d.text(s, 0.85 + j * 4.1, 3.0, 3.4, 0.5, t, 18, TEAL, True)
    d.text(s, 0.85 + j * 4.1, 3.5, 3.4, 1.2, b, 14)
d.bullets(s, 0.6, 5.0, 12.1, 1.8, ["**Ce que Passavin ne promet pas : une conformité réglementaire automatique. Les règles d'éligibilité sont fournies et garanties par chaque logisticien ; Passavin les applique.",
                                   "Pas d'envoi direct à des particuliers aux États-Unis (interdit : système three-tier)."], 14)

s = d.slide("Le parcours, étape par étape", "Produit")
d.flow(s, 0.6, 1.6, [("Installation", "Connexion du logisticien, contrôle des fiches produits"), ("Checkout", "Éligibilité pays + tarif via API logisticiens"),
                     ("Paiement", "Passerelle du domaine (aucun flux financier chez nous)"), ("Pré-contrôle", "Adresse, téléphone, colis, valeur ; anomalies en file"),
                     ("Transmission", "Ordre d'expédition créé chez le logisticien choisi"), ("Suivi", "Statuts récupérés, mail client envoyé"), ("Pilotage", "Délais, coûts, incidents par pays")], w=1.68)
d.table(s, 0.6, 3.45, 12.1, [["Risque d'erreur", "Traitement prévu"],
                             ["API logisticien lente ou indisponible", "Cache des grilles 24 h + tarif de repli ; 3 nouvelles tentatives puis alerte et export PDF/CSV"],
                             ["Fiche produit incomplète (degré, contenance, appellation)", "Tableau de complétude bloquant à l'installation"],
                             ["Destination non couverte", "Message clair au client + formulaire de demande de devis"],
                             ["Statut figé > 5 jours", "Alerte au domaine ; procédure casse/perte du logisticien"],
                             ["Données personnelles", "Passavin sous-traitant RGPD du domaine, DPA, hébergement UE, transmission au seul logisticien choisi"]],
        widths=[4.4, 7.7], size=12, h_row=0.52)

s = d.slide("MVP : une extension WooCommerce, pas quatre produits", "Produit — stratégie de lancement")
d.table(s, 0.6, 1.6, 7.4, [["Option", "Coût", "Délai", "Scalable", "Choix"],
                           ["Extension WooCommerce + moteur cloud", "25-35 k€", "3-4 mois", "Oui", "**✔ Retenu**"],
                           ["SaaS multi-CMS d'emblée", "80-120 k€", "8-12 mois", "Oui", "Trop tôt"],
                           ["Création de boutiques (ex-Planet'Shop)", "Temps", "Immédiat", "Non", "✘ Abandonné"],
                           ["Modèle combiné", "60 k€ +", "6-9 mois", "Moyen", "✘ Dispersion"]],
        widths=[2.9, 1.1, 1.2, 1.1, 1.1], size=12, h_row=0.6)
d.box(s, 8.3, 1.6, 4.4, 4.9, WHITE)
d.text(s, 8.55, 1.75, 4, 0.4, "PÉRIMÈTRE MVP (M4)", 12, TEAL, True)
d.bullets(s, 8.55, 2.15, 4, 2.4, ["Méthode d'expédition avec éligibilité", "2 adaptateurs logisticiens", "Transmission + suivi automatiques", "File d'anomalies, tableau de bord simple", "Facturation Stripe"], 13, gap=3)
d.text(s, 8.55, 4.4, 4, 0.4, "PLUS TARD", 12, TEAL, True)
d.bullets(s, 8.55, 4.8, 4, 1.6, ["Shopify (an 2-3), PrestaShop", "Droits & taxes en temps réel", "Marque blanche logisticiens"], 13, gap=3)
d.callout(s, 0.6, 4.9, 7.4, 1.6, "Ressources : 60 jours de développement freelance (≈ 30 k€) + porteur en product owner. Prérequis : accès bac à sable de 2 logisticiens, signés.", 14, TEAL)

s = d.slide("Un marché de niche : il faut le dire", "Marché")
levels = [("TAM France", "5 000 – 9 000 domaines", "vendent en ligne via leur site · 7-13 M€/an"),
          ("SAM an 3", "≈ 1 300 – 2 400", "+ Shopify et PrestaShop [hyp. ×2,5]"),
          ("SAM an 1-2", "≈ 500 – 950", "WooCommerce × export particuliers [hyp. 35 % × 30 %]"),
          ("SOM fin 2029", "170 clients", "scénario central · 0,23 M€ récurrent")]
for j, (lab, val, sub) in enumerate(levels):
    bx, by, bw, bh = 0.6 + j * 0.35, 1.6 + j * 1.15, 7.0 - j * 0.7, 4.85 - j * 1.15
    d.box(s, bx, by, bw, bh, [LIGHT, WHITE, RGBColor(0xEE, 0xE6, 0xD8), INK][j])
    col = WHITE if j == 3 else INK
    d.text(s, bx + 0.2, by + 0.08, bw - 0.4, 0.35, f"{lab} — {val}", 14, WHITE if j == 3 else WINE, True)
    d.text(s, bx + 0.2, by + 0.45, bw - 0.4, 0.4, sub, 11, LIGHT if j == 3 else GREY)
d.table(s, 8.0, 1.6, 4.7, [["Niveau", "Comptes", "Base"], ["TAM", "5-9 k", "43 000 producteurs × 21 %"], ["SAM 1-2", "500-950", "× WooCommerce × export"],
                           ["SAM 3", "1,3-2,4 k", "+ Shopify, PrestaShop"], ["SOM", "170", "BP central"]], widths=[1.2, 1.2, 2.3], size=12, h_row=0.55)
d.callout(s, 8.0, 4.6, 4.7, 1.9, "Alerte : le point mort (~210 clients) = 20-40 % du SAM WooCommerce. Viable seulement avec multi-CMS, canaux agences/logisticiens et extension Italie-Espagne.", 13, WINE)
d.text(s, 0.6, 6.55, 7, 0.35, "Sources : Agreste, FranceAgriMer 2026, Afnic 2025. Les % WooCommerce et export sont des hypothèses à mesurer en phase 1.", 10, GREY, italic=True)

s = d.slide("Cible : ICP et personas", "Clientèle")
d.callout(s, 0.6, 1.55, 12.1, 0.95, "ICP : domaine indépendant de 10-60 ha, boutique WooCommerce active, 10-80 commandes/mois dont ≥ 20 % hors France, un logisticien vin déjà utilisé, 2-15 salariés.", 14, TEAL)
d.table(s, 0.6, 2.75, 12.1, [["Persona (illustratif)", "Objectif", "Frustration", "Message"],
                             ["Claire, 42 ans, vigneronne-gérante", "Vendre plus en direct à l'étranger", "Ressaisies le soir, « où est mon colis ? »", "Vos commandes étrangères partent sans ressaisie"],
                             ["Julien, 31 ans, resp. e-commerce", "Conversion, abandons de panier", "Pays impossibles proposés, ports faux", "Plus aucun pays impossible au panier"],
                             ["Sophie, 38 ans, dirigeante d'agence", "Revenus récurrents, moins de SAV", "Intégrations refaites à chaque client", "Une intégration maintenue + 20 % récurrent"],
                             ["Marc, dir. commercial logisticien", "Plus d'expéditions", "Coût des intégrations sur mesure", "Vos API dans des centaines de boutiques"]],
        widths=[3.0, 2.8, 3.2, 3.1], size=12, h_row=0.68)
d.text(s, 0.6, 6.25, 12, 0.4, "Personas construits à partir d'hypothèses ; ils seront remplacés par des personas issus des 25 entretiens de la phase 1.", 11, GREY, italic=True)

s = d.slide("Concurrence : l'idée existe déjà… en partie", "Analyse de la concurrence")
d.table(s, 0.6, 1.5, 12.1, [["Acteur", "Type", "Ce qu'il fait", "Prix public", "Limite pour notre cible"],
                            ["Hillebrand Gori eShipping (DHL)", "Direct", "Expédition vin B2C dès 1 bouteille, plugin Woo/PrestaShop, API", "À l'envoi", "Mono-logisticien, < 10 installations"],
                            ["VinTrail", "Direct", "E-boutique + logistique droits inclus, 44 pays", "Commission", "Plateforme propriétaire"],
                            ["Baqio, Wineriz", "Indirect", "Gestion commerciale / e-shop vin + transport", "Devis ; dès 129 €/mois", "Remplacent la boutique"],
                            ["Sendcloud, Boxtal, Packlink", "Substitut", "Multi-transporteurs, étiquettes", "0-599 €/mois ; par envoi", "Alcool international mal ou pas couvert"],
                            ["Commerce7, Vinoshipper, Sovos", "Référence US", "DTC + conformité État par État", "59-1 249 $/mois", "Marché domestique américain"],
                            ["Vivino, Plugwine, Les Grappes", "Substitut", "Marketplaces", "Commission (ex. 20 %)", "Le domaine perd la relation client"],
                            ["Agences web vin", "Substitut / canal", "Intégrations sur mesure", "Boutique 6-25 k€", "Sur-mesure non maintenu"]],
        widths=[2.6, 1.3, 3.6, 1.9, 2.7], size=11, h_row=0.58)
d.text(s, 0.6, 6.35, 12, 0.4, "Sources : sites et grilles publiques des acteurs, wordpress.org (oct. 2026). Prix et périmètres déclaratifs.", 10, GREY, italic=True)

s = d.slide("Positionnement et proposition de valeur (USP)", "Avantages concurrentiels")
d.box(s, 0.6, 1.6, 6.2, 4.9, WHITE)
d.box(s, 3.68, 1.75, 0.03, 4.6, GREY, shape=MSO_SHAPE.RECTANGLE); d.box(s, 0.75, 4.03, 5.9, 0.03, GREY, shape=MSO_SHAPE.RECTANGLE)
d.text(s, 2.4, 1.65, 2.6, 0.3, "Spécialisé vin", 10, GREY, align=PP_ALIGN.CENTER); d.text(s, 2.4, 6.15, 2.6, 0.3, "Généraliste", 10, GREY, align=PP_ALIGN.CENTER)
d.text(s, 0.7, 4.1, 1.6, 0.3, "Fermé", 10, GREY); d.text(s, 5.3, 4.1, 1.4, 0.3, "Ouvert", 10, GREY, align=PP_ALIGN.RIGHT)
for (x, y, t, col) in [(0.9, 2.2, "Hillebrand eShipping", GREY), (0.9, 2.8, "VinTrail · Baqio · Wineriz", GREY), (4.0, 4.7, "Sendcloud · Boxtal", GREY),
                       (4.0, 5.2, "Packlink · Shippingbo", GREY), (0.9, 4.9, "Marketplaces", GREY)]:
    d.text(s, x, y, 2.7, 0.35, t, 12, col)
d.box(s, 4.0, 2.2, 2.6, 0.9, WINE); d.text(s, 4.05, 2.2, 2.5, 0.9, "★ Passavin\nneutre, multi-logisticiens", 12, WHITE, True, PP_ALIGN.CENTER, MSO_ANCHOR.MIDDLE)
d.callout(s, 7.1, 1.6, 5.6, 1.9, "USP : le connecteur neutre qui branche votre boutique à plusieurs logisticiens vin — seules les destinations réellement livrables, au bon prix, et la commande part toute seule.", 14, INK)
d.bullets(s, 7.1, 3.75, 5.6, 2.8, ["Barrière faible au jour 0 : vitesse et terrain du fondateur", "À construire : réseau de logisticiens intégrés, base de règles d'éligibilité, canal agences, neutralité contractuelle",
                                   "✘ Exclu du discours : « le seul plugin vin » (faux)"], 14)

s = d.slide("Business model : abonnement + installation + deux faces", "Business model")
d.table(s, 0.6, 1.6, 12.1, [["Source", "Qui paie", "Logique", "Part du CA an 3 (central)", "Décision"],
                            ["Abonnement SaaS", "Domaine", "Récurrent, cœur de la valorisation", f"{Y[2]['ca_abonnements']/Y[2]['ca_total']*100:.0f} %", "✔ Cœur"],
                            ["Frais de plateforme / expédition", "Logisticien", "1,50 € par expédition acceptée, identique pour tous", f"{Y[2]['ca_logisticiens']/Y[2]['ca_total']*100:.0f} %", "À valider"],
                            ["Installation accompagnée", "Domaine", "490 € (190 € pilotes, 0 € via agence)", f"{Y[2]['ca_installation']/Y[2]['ca_total']*100:.0f} %", "✔"],
                            ["Services sur mesure", "Domaine / agence", "Plafond 15 % du CA, réutilisables uniquement", f"{Y[2]['ca_services']/Y[2]['ca_total']*100:.0f} %", "Encadré"],
                            ["Distribution agences", "— (coût)", "20 % récurrent reversé", "—", "✔ dès l'an 2"],
                            ["Création de boutiques", "—", "Non scalable, concurrence les agences", "0 %", "✘"]],
        widths=[2.8, 1.8, 3.8, 2.0, 1.7], size=12, h_row=0.6)
d.callout(s, 0.6, 6.0, 12.1, 0.75, "Le revenu logisticien est présenté séparément : sans lui, il faut 284 clients au lieu de 210 pour atteindre le point mort.", 14, WINE)

s = d.slide("Prix et économie unitaire", "Business model — tarification")
d.table(s, 0.6, 1.6, 6.4, [["Offre", "€ HT/mois", "Inclus"], ["Essentiel", "49 €", "1 logisticien, 30 expéditions"], ["Pro", "99 €", "3 logisticiens, 150 expéditions, statistiques"],
                           ["Expert", "199 €", "Illimité, multi-boutiques, support prioritaire"], ["Dépassement", "0,90 €", "par expédition au-delà du quota"], ["Installation", "490 €", "paramétrage + formation 1 h"]],
        widths=[1.5, 1.3, 3.6], size=12, h_row=0.56)
d.text(s, 0.6, 5.15, 6.4, 1.4, "Annuel : 2 mois offerts. Mix supposé 50/35/15 → ARPA ≈ 89 €/mois. Argument : 20 commandes × 12 min ≈ 4 h/mois récupérées (~140 €).", 13, GREY)
d.table(s, 7.3, 1.6, 5.4, [["Indicateur (central)", "Valeur"], ["Contribution / client / mois", f"{C['contrib_client']:.0f} € (84 € sans logisticien)"],
                           ["Marge brute", "82-92 %"], ["CAC an 1 → an 3", f"{n(Y[0]['cac'])} → {n(Y[2]['cac'])} €"], ["Churn", "1,5 %/mois"],
                           ["LTV", "≈ 7 600 €"], ["LTV / CAC (an 3)", "≈ 6"], ["Récupération du CAC", "≈ 11 mois"]], widths=[3.0, 2.4], size=12, h_row=0.52)

s = d.slide("Stratégie : les étapes clés", "Stratégie — déclinaison de la vision")
d.flow(s, 0.6, 1.6, [("Sécuriser", "Nov. 2026 · avocat, accord employeur, CPI marque"), ("Découvrir", "Nov.-déc. 2026 · 25 domaines, 5 agences, 4 logisticiens"),
                     ("Pré-vendre", "Janv.-fév. 2027 · maquette, ≥ 8 acomptes"), ("Construire", "Mars-juin 2027 · MVP, 5 pilotes, 2 logisticiens"),
                     ("Vendre", "2027 · 22 clients ; levée seed M15-M18"), ("Industrialiser", "2028 · 84 clients, 3 agences, dév. salarié"),
                     ("Étendre", "2029 · 170 clients, Shopify, 8 agences")], w=1.68)
d.table(s, 0.6, 3.5, 12.1, [["Jalon", "Critère GO", "Sinon"],
                            ["Fin phase pré-vente (fév. 2027)", "≥ 8 pré-ventes avec acompte ET ≥ 2 logisticiens (dont ≥ 1 hors Planet Aura)", "Pivot marque blanche logisticiens ou arrêt"],
                            ["Levée seed (M12-M15)", "≥ 20 clients, MRR ≥ 1,8 k€, churn ≤ 2 %, activation ≥ 80 %", "Gel des recrutements, financement BPI"],
                            ["Business developer (M25)", "MRR ≥ 7 k€ ET ≥ 80 clients", "Report"]], widths=[3.3, 5.6, 3.2], size=12, h_row=0.6)
d.text(s, 0.6, 6.1, 12, 0.5, "Pourquoi maintenant : base de boutiques installée, logisticiens qui ouvrent leurs API, plugin existant non adopté = créneau non encore gagné.", 13, TEAL, True)

s = d.slide("Stratégie commerciale : segments, canaux, cycle de vente", "Stratégie commerciale")
d.table(s, 0.6, 1.6, 6.3, [["Priorité", "Segment"], ["1", "Domaines WooCommerce ≥ 10 commandes étrangères/mois"], ["2", "Agences WordPress (≥ 10 domaines clients)"],
                           ["3", "Logisticiens vin (API + payeurs potentiels)"], ["4 (an 2-3)", "Shopify / PrestaShop ; Italie, Espagne"], ["Exclu", "Sans boutique ; coopératives ; particuliers US"]],
        widths=[1.3, 5.0], size=12, h_row=0.55)
d.table(s, 7.2, 1.6, 5.5, [["Étape du cycle", "Délai", "Passage"], ["Prospect → contact", "J0-J7", "30 %"], ["Contact → démo", "J7-J21", "50 %"],
                           ["Démo → pilote", "J21-J35", "40 %"], ["Pilote → client", "J35-J60", "60 %"], ["**100 prospects**", "6-8 sem.", "**3,6 clients**"]],
        widths=[2.6, 1.4, 1.5], size=12, h_row=0.55)
d.bullets(s, 0.6, 5.1, 12.1, 1.7, ["Canaux an 1 : réseau terrain du fondateur (hors fichiers Planet Aura), salons, syndicats d'appellation, prospection ciblée (scan technique des sites), contenu « expédier du vin en Europe depuis 2023 ».",
                                   "Démo de 25 min : chronométrer l'« avant » avec le prospect, montrer l'« après », calculer le gain personnalisé."], 13)

s = d.slide("Marketing et événements", "Stratégie marketing")
d.table(s, 0.6, 1.6, 7.0, [["Événement", "Dates", "Usage"], ["Vinitech-Sifel, Bordeaux", "1-3 déc. 2026", "Entretiens, agences, logisticiens"],
                           ["Vignerons Indépendants, Paris", "10-13 déc. 2026", "Entretiens domaines"], ["Millésime Bio, Montpellier", "25-27 janv. 2027", "Domaines bio (62 % en circuit court)"],
                           ["Wine Paris & Vinexpo", "15-17 févr. 2027*", "Démos maquette, pré-ventes"], ["ProWein, Düsseldorf", "7-9 mars 2027", "Logisticiens européens (an 2)"]],
        widths=[2.6, 1.7, 2.7], size=12, h_row=0.55)
d.table(s, 7.9, 1.6, 4.8, [["Budget", "An 1", "An 2", "An 3"], ["Salons & déplacements", "5 k€", "12 k€", "15 k€"], ["Contenus, webinaires", "3 k€", "6 k€", "8 k€"],
                           ["Outils commerciaux", "1,5 k€", "4 k€", "6 k€"], ["Publicité test", "1 k€", "4 k€", "8 k€"], ["Partenaires", "1,5 k€", "4 k€", "8 k€"], ["**Total**", "**12 k€**", "**30 k€**", "**45 k€**"]],
        widths=[2.0, 0.9, 0.95, 0.95], size=12, h_row=0.5)
d.text(s, 0.6, 5.2, 7, 0.4, "* dates à reconfirmer sur les sites officiels. Pas de stand payant en an 1 : la valeur est dans les rendez-vous.", 11, GREY, italic=True)
d.callout(s, 0.6, 5.75, 12.1, 0.85, "Signature : « Vos vins passent les frontières. Vos commandes passent toutes seules. »", 16, WINE)

s = d.slide("Réseau de partenaires et indépendance vis-à-vis de Planet Aura", "Réseau commercial")
d.table(s, 0.6, 1.6, 6.4, [["", "Agences web", "Logisticiens"], ["Rôle", "Recommandent, installent", "API + règles d'éligibilité"], ["Gain", "20 % récurrent", "Expéditions sans intégration"],
                           ["Animation", "Kit, certification 2 h, réunion trimestrielle", "Comité technique trimestriel"], ["Objectif an 3", "8 agences, 35 % des ventes", "≥ 3 intégrés"]],
        widths=[1.4, 2.5, 2.5], size=12, h_row=0.62)
d.box(s, 7.3, 1.6, 5.4, 4.95, WHITE)
d.text(s, 7.55, 1.75, 5, 0.4, "INDÉPENDANCE — RÈGLES", 12, TEAL, True)
d.bullets(s, 7.55, 2.15, 4.9, 4.4, ["Société, code, marque et données détenus par Passavin", "Partenariat non exclusif, neutralité d'affichage, préavis API 6 mois",
                                    "Les 10 intégrations Planet Aura ne sont ni des clients ni des réalisations de Passavin", "Aucun fichier client ni document confidentiel de Planet Aura utilisé",
                                    "Contrat de travail du porteur relu par un avocat (loyauté, PI L113-9, non-concurrence) avant création"], 13, gap=4)
d.callout(s, 0.6, 5.0, 6.4, 1.55, "Planet Aura : partenaire logistique possible, jamais le seul. ≥ 2 logisticiens avant la levée seed.", 14, INK)

s = d.slide("L'équipe : un fondateur commercial, un·e CTO à trouver", "Équipe")
d.box(s, 0.6, 1.6, 4.0, 4.9, WHITE)
d.text(s, 0.85, 1.75, 3.6, 0.4, "FONDATEUR", 12, TEAL, True)
d.text(s, 0.85, 2.15, 3.6, 0.5, "[Nom Prénom], CEO", 18, INK, True)
d.bullets(s, 0.85, 2.75, 3.5, 3.6, ["Commercial dans le transport de vin pour particuliers à l'international", "Rôle : vente, partenariats, produit", "À acquérir : finance de SAS, product management, contrats SaaS & RGPD"], 13)
d.table(s, 4.9, 1.6, 7.8, [["Profil", "Statut", "Solution"], ["CTO / associé·e technique", "**MANQUANT — priorité n°1**", "10-30 % du capital, vesting 4 ans"],
                           ["Développement MVP", "À contractualiser", "Freelance 60 j, références WooCommerce"], ["Développeur·se full-stack", "Recrutement M13", "≈ 70 k€ chargé"],
                           ["Alternant·e marketing-sales", "Recrutement M13", "≈ 12 k€ net d'aides"], ["Business developer", "M25 si MRR ≥ 7 k€", "≈ 62 k€ chargé"],
                           ["Avocat, comptable, CPI", "Prestataires", "≈ 10 k€ an 1"]], widths=[2.6, 2.6, 2.6], size=12, h_row=0.55)
d.callout(s, 4.9, 5.7, 7.8, 0.8, "Aucun associé, diplôme ou compétence n'a été inventé : les profils manquants sont affichés comme tels.", 13, WINE)

s = d.slide("Organisation et management", "Équipe — organigramme évolutif")
for j, (yr, items) in enumerate([("AN 1 · 2027", ["CEO", "Freelance MVP", "[CTO associé·e ?]", "Avocat · comptable"]),
                                 ("AN 2 · 2028", ["CEO", "Développeur·se", "Alternant·e", "3 agences · 2-3 logisticiens"]),
                                 ("AN 3 · 2029", ["CEO", "CTO / dév. senior", "Business developer", "Support (ex-alternant·e)", "8 agences · ≥ 3 logisticiens"])]):
    d.text(s, 0.6 + j * 4.1, 1.55, 3.8, 0.4, yr, 13, TEAL, True)
    for i_, it in enumerate(items):
        d.box(s, 0.6 + j * 4.1, 1.95 + i_ * 0.5, 3.8, 0.42, INK if i_ == 0 else WHITE)
        d.text(s, 0.7 + j * 4.1, 1.95 + i_ * 0.5, 3.6, 0.42, it, 12, WHITE if i_ == 0 else INK, i_ == 0, anchor=MSO_ANCHOR.MIDDLE)
d.table(s, 0.6, 4.6, 12.1, [["Méthode", "Rythme", "Objectif"], ["Point d'équipe + revue pipeline", "Hebdomadaire", "Alignement, prévision des signatures"],
                            ["Sprint produit / revue KPI", "2 semaines / mensuelle", "Livrer par incréments, décider sur indicateurs"],
                            ["1-to-1, OKR trimestriels, management situationnel", "Mensuel", "Motivation : variable sur MRR net, BSPCE 10 %, formation 1 k€/an"]],
        widths=[4.6, 2.6, 4.9], size=12, h_row=0.5)

s = d.slide("Business plan : chaque client vient d'une ressource", "Business plan — démonstration n°1")
d.table(s, 0.6, 1.6, 6.6, [["", "An 1", "An 2", "An 3"], ["Nouveaux clients", n(Y[0]["nouveaux"]), n(Y[1]["nouveaux"]), n(Y[2]["nouveaux"])],
                           ["Produits par", "CEO + pré-ventes", "CEO + alternant·e + 3 agences", "+ business developer + 8 agences"],
                           ["Clients actifs", n(Y[0]["clients_fin"]), n(Y[1]["clients_fin"]), n(Y[2]["clients_fin"])], ["ARR fin d'année", k(Y[0]["arr_fin"]), k(Y[1]["arr_fin"]), k(Y[2]["arr_fin"])],
                           ["Marketing", "12 k€", "30 k€", "45 k€"]], widths=[1.8, 1.4, 1.7, 1.7], size=12, h_row=0.62)
d.image(s, CH("clients.png"), 7.4, 1.55, w=5.4)
d.text(s, 0.6, 5.6, 12, 1.0, "Formule : Clients(m) = Clients(m−1) × (1 − 1,5 %) + Nouveaux(m). Productivité : ≈ 4 signatures/mois par commercial à temps plein (20 démos × 20 %). Hypothèses : annexes/BP_3ans.xlsx.", 12, GREY)

s = d.slide("Compte de résultat prévisionnel — scénario central", "Business plan")
d.table(s, 0.6, 1.5, 6.6, [["€ HT", "2027", "2028", "2029"], ["CA total", k(Y[0]["ca_total"]), k(Y[1]["ca_total"]), k(Y[2]["ca_total"])],
                           ["dont abonnements", k(Y[0]["ca_abonnements"]), k(Y[1]["ca_abonnements"]), k(Y[2]["ca_abonnements"])],
                           ["dont frais logisticiens", k(Y[0]["ca_logisticiens"]), k(Y[1]["ca_logisticiens"]), k(Y[2]["ca_logisticiens"])],
                           ["Marge brute", k(Y[0]["marge_brute"]), k(Y[1]["marge_brute"]), k(Y[2]["marge_brute"])],
                           ["Développement", k(Y[0]["developpement"]), k(Y[1]["developpement"]), k(Y[2]["developpement"])],
                           ["Salaires chargés", k(Y[0]["salaires"]), k(Y[1]["salaires"]), k(Y[2]["salaires"])],
                           ["Autres charges", k(Y[0]["autres_charges"]), k(Y[1]["autres_charges"]), k(Y[2]["autres_charges"])],
                           ["**EBITDA**", k(Y[0]["ebitda"]), k(Y[1]["ebitda"]), k(Y[2]["ebitda"])]], widths=[2.4, 1.4, 1.4, 1.4], size=12, h_row=0.5)
d.image(s, CH("ca_ebitda.png"), 7.4, 1.5, w=5.4)
d.callout(s, 0.6, 6.0, 12.1, 0.75, "Lecture honnête : pas de rentabilité sur 3 ans en central. Point mort mensuel vers M40-M42 avec ~210 clients actifs.", 14, WINE)

s = d.slide("Scénarios, seuil de rentabilité, trésorerie", "Business plan — viabilité")
P_, O_, S_ = D["pessimiste"], D["optimiste"], D["central_sans_logisticien"]
d.table(s, 0.6, 1.5, 6.6, [["Fin 2029", "Pessimiste", "Central", "Optimiste"], ["Clients actifs", n(P_["years"][2]["clients_fin"]), n(Y[2]["clients_fin"]), n(O_["years"][2]["clients_fin"])],
                           ["ARR", k(P_["years"][2]["arr_fin"]), k(Y[2]["arr_fin"]), k(O_["years"][2]["arr_fin"])], ["EBITDA an 3", k(P_["years"][2]["ebitda"]), k(Y[2]["ebitda"]), k(O_["years"][2]["ebitda"])],
                           ["Point mort", "non atteint", "≈ M40-42", f"M{O_['be']}"], ["Clients au point mort", f"≈ {P_['clients_be']:.0f}", f"≈ {C['clients_be']:.0f}", f"≈ {O_['clients_be']:.0f}"]],
        widths=[2.1, 1.5, 1.5, 1.5], size=12, h_row=0.55)
d.image(s, CH("tresorerie.png"), 7.4, 1.5, w=5.4)
d.bullets(s, 0.6, 4.95, 12.1, 1.9, ["Seuil = charges fixes M36 (≈ 23,9 k€/mois) / contribution par client (114 €) ≈ 210 clients ; 284 sans revenu logisticien.",
                                    "Conditions : ≥ 1 logisticien payant · churn ≤ 1,5 % · ARPA ≥ 85 € · ≥ 30 % des ventes via agences · recrutements par jalons · services ≤ 15 %.",
                                    "En pessimiste, le besoin dépasse 295 k€ sans perspective de point mort : on arrête ou on pivote (décision prise à l'avance)."], 13, gap=4)

s = d.slide("Besoin de financement et affectation", "Business plan — besoin financier")
d.table(s, 0.6, 1.6, 7.2, [["Source", "Montant", "Moment", "Statut"], ["Apport fondateur", "10 k€", "M0", "À confirmer"], ["Prêt d'honneur", "30 k€", "M0-M2", "Hypothèse"],
                           ["Bourse French Tech BPI", "30 k€", "M2-M4", "Éligibilité non garantie"], ["Prêt bancaire", "50 k€", "M2", "Hypothèse"],
                           ["**Tranche 1**", "**120 k€**", "", "Validation + MVP + an 1"], ["Business angels / seed", "200 k€", "M15-M18", "Si jalons atteints"], ["**Total 3 ans**", "**320 k€**", "", ""]],
        widths=[2.6, 1.3, 1.3, 2.0], size=12, h_row=0.52)
for j, (pct, lab, col) in enumerate([(40, "Produit & développement", WINE), (30, "Équipe commerciale & partenaires", TEAL), (15, "Marketing & salons", GOLD), (5, "Juridique, marque", GREY), (10, "Réserve", INK)]):
    d.box(s, 8.2, 1.6 + j * 0.85, 4.5 * pct / 40, 0.6, col, shape=MSO_SHAPE.RECTANGLE)
    d.text(s, 8.2, 2.2 + j * 0.85 - 0.05, 4.5, 0.3, f"{pct} % · {lab}", 11, INK)
d.callout(s, 0.6, 6.0, 12.1, 0.7, f"Trésorerie minimale central sans levée : {k(C['cash_min'])} (M{C['cash_min_m']}) → la seed de 200 k€ couvre le creux jusqu'au point mort, avec ~20 k€ de marge.", 13, INK)

s = d.slide("Risques évalués et justifiés", "Risques — démonstration n°2")
d.table(s, 0.6, 1.5, 12.1, [["Risque", "P", "I", "Crit.", "Prévention", "Plan B"],
                            ["Les domaines ne paient pas", "3", "4", "**12**", "Pré-ventes avec acompte avant MVP", "Marque blanche logisticiens"],
                            ["Trésorerie négative avant la seed (≈ M17)", "3", "4", "**12**", "Levée préparée dès M12, embauches par jalons", "Gel embauches, prêt BPI"],
                            ["Concurrent gratuit (logisticien, agrégateur)", "3", "3", "**9**", "Neutralité, multi-logisticiens, agences", "Devenir leur fournisseur technique"],
                            ["Pas de CTO", "3", "3", "**9**", "Recherche active, code documenté", "CTO à temps partagé"],
                            ["Revenu logisticien non obtenu", "3", "3", "**9**", "Test phase 1, scénario chiffré sans", "ARPA Pro par défaut"],
                            ["Dérive vers le sur-mesure", "3", "3", "**9**", "Plafond 15 % du CA", "Renvoi vers agences"],
                            ["Retrait d'une API logisticien", "2", "4", "8", "Préavis 6 mois, ≥ 2 puis 3 logisticiens", "Mode dégradé CSV/PDF"],
                            ["Conflit avec l'employeur actuel", "2", "4", "8", "Avocat, accord écrit, code repris de zéro", "Différer la création"],
                            ["Commande vers pays non conforme", "2", "4", "8", "Règles garanties par logisticien, US exclus", "Blocage manuel, RC pro"]],
        widths=[3.4, 0.5, 0.5, 0.7, 3.8, 3.2], size=11, h_row=0.47)
d.text(s, 0.6, 6.35, 12, 0.4, "P = probabilité, I = impact (1-4). Les risques critiques sont commerciaux et financiers, pas techniques : on teste la demande avant de coder.", 11, GREY, italic=True)

s = d.slide("Tableau de bord : un KPI par objectif", "Tableaux de bord — démonstration n°3")
d.table(s, 0.6, 1.5, 12.1, [["KPI", "Formule", "Cible 2027 / 28 / 29", "Fréquence · resp.", "Si écart"],
                            ["Nouveaux clients", "Signatures sur la période", "22 / 72 / 108", "Hebdo · CEO", "Canaux, démos, agences"],
                            ["MRR", "Σ abonnements actifs", "1,9 / 7,5 / 15,1 k€", "Mensuel · CEO", "Upsell Pro, prix"],
                            ["Churn", "Perdus / clients début de mois", "≤ 1,5 %", "Mensuel · support", "Entretien de départ"],
                            ["Activation", "1ʳᵉ commande < 14 j / nouveaux", "≥ 80 %", "Mensuel · support", "Onboarding J+3"],
                            ["CAC", "Coûts d'acquisition / nouveaux", "≤ 0,6 / 0,8 / 1,3 k€", "Trimestriel · CEO", "Couper le canal cher"],
                            ["Part via agences", "Clients agences / nouveaux", "0 / 20 / 35 %", "Trimestriel · biz dev", "Commission Gold"],
                            ["Marge brute", "(CA − variables) / CA", "≥ 80 %", "Mensuel · CEO", "Hébergement, support"],
                            ["NPS", "% promoteurs − % détracteurs", "≥ 30 / 40 / 45", "Trimestriel · support", "Feuille de route"],
                            ["Runway", "Trésorerie / burn", "≥ 6 mois", "Mensuel · CEO", "Levée / économies"]],
        widths=[2.0, 3.3, 2.4, 2.2, 2.2], size=11, h_row=0.47)
d.text(s, 0.6, 6.35, 12, 0.4, "Cibles identiques au business plan (scénario central). Tableau complet (26 KPI) : annexes.", 11, GREY, italic=True)

s = d.slide("Validation : les seuils sont fixés avant de commencer", "Plan de validation commerciale")
d.table(s, 0.6, 1.5, 12.1, [["Indicateur (objectif proposé)", "GO", "Revoir", "STOP"], ["Douleur citée spontanément (top 3)", "≥ 40 %", "20-40 %", "< 20 %"],
                            ["Domaines WooCommerce ≥ 10 commandes étrangères/mois", "≥ 30 %", "15-30 %", "< 15 %"], ["Temps mesuré par commande étrangère", "≥ 8 min", "4-8 min", "< 4 min"],
                            ["Prix acceptable médian", "≥ 49 €", "25-49 €", "< 25 €"], ["**Pré-ventes avec acompte**", "**≥ 8**", "4-7", "< 4"],
                            ["**Logisticiens prêts à signer (≥ 1 hors Planet Aura)**", "**≥ 2**", "1", "0"]], widths=[6.1, 2.0, 2.0, 2.0], size=12, h_row=0.52)
d.callout(s, 0.6, 5.35, 12.1, 1.3, "Coût du test : ≈ 3 mois, < 8 k€ (25 entretiens domaines, 5 agences, 4 logisticiens, maquette cliquable, test de prix). Question n°1 : pourquoi le plugin Hillebrand Gori n'est-il pas adopté ?", 14, TEAL)

s = d.slide("Sources, hypothèses non validées et annexes", "Annexes")
d.bullets(s, 0.6, 1.5, 6.2, 5.3, ["**Sources", "INSEE/Agreste RA 2020 ; Agreste Primeur 2023 ; FranceAgriMer fiche vin 2026", "FEVS via LSA/Pleinchamp (2025-2026) ; Xerfi 2021-2026 ; Afnic déc. 2025",
                                  "Commission européenne ; douane.gouv.fr ; gov.uk ; UPS, FedEx, La Poste", "wordpress.org, sites et grilles des concurrents (oct. 2026)", "TMview / RDAP / API recherche-entreprises (nom)"], 12, gap=3)
d.bullets(s, 7.0, 1.5, 5.7, 5.3, ["**Non validé à ce jour", "Aucun client, aucun pré-contrat, aucun accord logisticien", "Part WooCommerce et export particuliers", "Temps de ressaisie, prix acceptable, churn",
                                  "Revenu logisticien (1,50 €/expédition)", "Disponibilité juridique du nom Passavin (recherche CPI à faire)", "**Annexes fournies", "BP_3ans.xlsx (hypothèses, mensuel × 3 scénarios)", "Étude complète (docs/01 à 11)"], 12, gap=3)
d.save("Passavin_Dossier_Investisseur.pptx")
print("dossier", d.i)

# ============================== PITCH SOUTENANCE (20 slides) ==============================
p = Deck("Soutenance Bloc 3")
p.cover("Vos vins passent les frontières. Vos commandes passent toutes seules.", "Pitch investisseurs — 20 minutes", "[Nom Prénom] · [Promotion] · Nom de travail provisoire")
s = p.slide("Aucun vin ne circulait sans passavant", "Pourquoi"); p.text(s, 0.6, 1.8, 12, 3, ["Au XIXᵉ siècle, le passavant était le laissez-passer des vins.", "", "En 2026, une commande de vin vendue en ligne à l'étranger attend encore… une ressaisie."], 26, INK, True)
p.kpis(s, 0.6, 4.6, [("≈ 12 min", "par commande étrangère ressaisie [hypothèse à mesurer]"), ("21 %", "des vignerons vendent en ligne (Afnic 2025)"), ("−8 %", "export vins & spiritueux 2025 (FEVS)")], w=3.9)
s = p.slide("3 frictions entre vendre et livrer", "Problème")
for j, (t, b) in enumerate([("Pays impossibles", "proposés au panier, ports faux"), ("Ressaisie", "de chaque commande chez le logisticien"), ("Suivi manuel", "copié-collé, clients inquiets")]):
    p.box(s, 0.6 + j * 4.1, 1.8, 3.85, 2.6, WHITE); p.text(s, 0.85 + j * 4.1, 2.0, 3.4, 0.6, t, 24, WINE, True); p.text(s, 0.85 + j * 4.1, 2.8, 3.4, 1.4, b, 18)
p.callout(s, 0.6, 4.9, 12.1, 1.2, "Les génériques (Packlink, FedEx…) excluent l'alcool international. Les logisticiens vin intègrent au cas par cas.", 17)
s = p.slide("Passavin : la boutique branchée aux logisticiens vin", "Solution")
p.flow(s, 0.6, 1.9, [("Checkout", "Destinations livrables, tarif réel"), ("Contrôle", "Anomalies détectées"), ("Transmission", "Commande envoyée au logisticien"), ("Suivi", "Statuts + mail client"), ("Pilotage", "Délais, coûts, incidents")], w=2.35, h=1.8, size=14)
p.callout(s, 0.6, 4.3, 12.1, 1.1, "Extension WooCommerce + moteur cloud · multi-logisticiens · neutre · installée en 1 heure", 18, TEAL)
p.text(s, 0.6, 5.7, 12, 0.6, "Ne promet pas la conformité automatique : règles garanties par chaque logisticien. Pas d'envoi direct aux particuliers américains.", 13, GREY, italic=True)
s = p.slide("Démonstration : une commande vers la Suisse", "Produit"); p.table(s, 0.6, 1.6, 12.1, [["Étape", "Avant", "Avec Passavin"], ["Panier", "Forfait « Europe » approximatif", "Tarif du logisticien, pays non livrables masqués"],
                                                                                                   ["Commande", "Ressaisie dans le portail", "Transmise automatiquement"], ["Suivi", "Copié à la main", "Remonte seul, mail client"], ["Temps", "≈ 12 min [hyp.]", "< 1 min (objectif)"]], widths=[2.4, 4.6, 5.1], size=16, h_row=0.8)
p.text(s, 0.6, 5.9, 12, 0.5, "Maquette cliquable présentée en direct (à produire en phase 2).", 13, GREY, italic=True)
s = p.slide("Un marché de niche, assumé", "Marché"); p.kpis(s, 0.6, 1.7, [("5-9 k", "TAM : domaines vendant en ligne"), ("500-950", "SAM WooCommerce + export"), ("1,3-2,4 k", "SAM avec Shopify/PrestaShop"), ("170", "SOM fin 2029")], w=2.85, big=32)
p.callout(s, 0.6, 3.9, 12.1, 1.3, "Point mort ≈ 210 clients = 20-40 % du SAM WooCommerce → multi-CMS en an 2-3, agences et logisticiens comme canaux, Italie-Espagne ensuite.", 16, WINE)
s = p.slide("L'idée existe… et n'a pas gagné", "Concurrence"); p.table(s, 0.6, 1.6, 12.1, [["Acteur", "Force", "Limite"], ["Hillebrand Gori eShipping", "Plugin Woo + API, groupe DHL", "Mono-logisticien, < 10 installations"],
                                                                                         ["Sendcloud, Boxtal, Packlink", "Matures, pas chers", "Alcool international mal couvert"], ["VinTrail, Baqio, Wineriz", "Tout-en-un vin", "Remplacent la boutique"], ["Agences", "Relation", "Sur-mesure non maintenu"]], widths=[3.6, 4.0, 4.5], size=15, h_row=0.75)
p.callout(s, 0.6, 5.6, 12.1, 0.9, "USP : le seul positionnement neutre et multi-logisticiens — pas « le seul plugin vin ».", 16)
s = p.slide("Un modèle à deux faces", "Business model"); p.kpis(s, 0.6, 1.7, [("49-199 €", "abonnement mensuel domaine"), ("490 €", "installation accompagnée"), ("1,50 €", "par expédition, payé par le logisticien (à valider)"), ("≈ 6", "LTV / CAC en an 3")], w=2.85, big=30)
p.table(s, 0.6, 3.8, 12.1, [["Contribution / client", "Marge brute", "CAC an 3", "Churn"], [f"{C['contrib_client']:.0f} €/mois", "82-92 %", f"{n(Y[2]['cac'])} €", "1,5 %/mois"]], size=16, h_row=0.7)
s = p.slide("Aller chercher les 170 premiers clients", "Stratégie commerciale"); p.table(s, 0.6, 1.6, 12.1, [["", "2027", "2028", "2029"], ["Nouveaux clients", "22", "72", "108"], ["Canal principal", "CEO + pilotes + salons", "+ alternant·e + 3 agences", "+ business developer + 8 agences"],
                                                                                                     ["Logisticiens", "2", "2-3", "≥ 3"], ["Marketing", "12 k€", "30 k€", "45 k€"]], widths=[2.6, 3.0, 3.2, 3.3], size=15, h_row=0.72)
p.text(s, 0.6, 5.6, 12, 0.6, "Cycle 6-8 semaines · 100 prospects → 3,6 clients · démo chronométrée « avant / après »", 15, TEAL, True)
s = p.slide("Équipe et organisation", "Équipe"); p.table(s, 0.6, 1.6, 12.1, [["Rôle", "Qui", "Quand"], ["CEO — vente, partenariats, produit", "[Nom Prénom], commercial transport de vin", "M0"], ["CTO / associé·e technique", "**À trouver — priorité n°1**", "≤ M6"],
                                                                                        ["Développeur·se full-stack", "Recrutement", "M13"], ["Alternant·e marketing-sales", "Recrutement", "M13"], ["Business developer", "Si MRR ≥ 7 k€ et ≥ 80 clients", "M25"]], widths=[4.2, 5.4, 2.5], size=15, h_row=0.68)
p.text(s, 0.6, 5.9, 12, 0.6, "Management : hebdo pipeline · sprints 2 sem. · OKR trimestriels · variable sur MRR net · BSPCE 10 %", 14, GREY)
s = p.slide("Démonstration 1 : le BP découle des objectifs commerciaux", "Business plan"); p.image(s, CH("clients.png"), 0.6, 1.5, w=6.3)
p.bullets(s, 7.2, 1.7, 5.5, 4.5, ["Chaque client du BP a une ressource qui le produit", "≈ 4 signatures/mois par commercial (20 démos × 20 %)", "Clients(m) = Clients(m−1) × 98,5 % + Nouveaux(m)", "Recrutements déclenchés par jalons, pas par calendrier"], 16)
s = p.slide("Compte de résultat — central", "Business plan"); p.image(s, CH("ca_ebitda.png"), 0.6, 1.5, w=6.3)
p.table(s, 7.2, 1.6, 5.5, [["k€", "2027", "2028", "2029"], ["CA", k(Y[0]["ca_total"]), k(Y[1]["ca_total"]), k(Y[2]["ca_total"])], ["Marge brute", k(Y[0]["marge_brute"]), k(Y[1]["marge_brute"]), k(Y[2]["marge_brute"])],
                           ["EBITDA", k(Y[0]["ebitda"]), k(Y[1]["ebitda"]), k(Y[2]["ebitda"])], ["ARR fin", k(Y[0]["arr_fin"]), k(Y[1]["arr_fin"]), k(Y[2]["arr_fin"])]], widths=[1.6, 1.3, 1.3, 1.3], size=14, h_row=0.65)
p.callout(s, 7.2, 5.2, 5.5, 1.2, "Pas rentable sur 3 ans. Point mort ≈ M40-42, ~210 clients.", 15, WINE)
s = p.slide("Scénarios et seuil de rentabilité", "Business plan"); p.image(s, CH("tresorerie.png"), 0.6, 1.5, w=6.3)
p.bullets(s, 7.2, 1.7, 5.5, 4.8, [f"Pessimiste : {n(P_['years'][2]['clients_fin'])} clients, pas de point mort → arrêt / pivot", f"Central : {n(Y[2]['clients_fin'])} clients, point mort ≈ M40-42", f"Optimiste : {n(O_['years'][2]['clients_fin'])} clients, point mort M{O_['be']}",
                                  "Sans revenu logisticien : 284 clients nécessaires"], 16)
s = p.slide("320 k€ en deux tranches conditionnées", "Besoin financier"); p.kpis(s, 0.6, 1.7, [("120 k€", "tranche 1 : apport, prêt d'honneur, BPI, banque — validation + MVP"), ("200 k€", "seed M15-M18 si ≥ 20 clients, MRR ≥ 1,8 k€, churn ≤ 2 %"), ("40 %", "produit · 30 % commercial · 15 % marketing · 15 % juridique & réserve")], w=3.9, big=34)
s = p.slide("Démonstration 2 : risques évalués et justifiés", "Risques"); p.table(s, 0.6, 1.5, 12.1, [["Risque", "Crit.", "Parade"], ["Les domaines ne paient pas", "12", "Pré-ventes avec acompte avant de coder"], ["Trésorerie avant la seed", "12", "Levée dès M12, embauches par jalons"],
                                                                                                 ["Concurrent gratuit", "9", "Neutralité multi-logisticiens, agences"], ["Pas de CTO", "9", "Equity, CTO temps partagé"], ["Retrait API", "8", "Préavis 6 mois, ≥ 3 logisticiens"], ["Conflit employeur", "8", "Avocat, accord écrit"]], widths=[4.5, 1.2, 6.4], size=15, h_row=0.66)
s = p.slide("Démonstration 3 : tableau de bord = objectifs", "Tableaux de bord"); p.table(s, 0.6, 1.5, 12.1, [["Objectif", "KPI", "Cible 2029", "Si écart"], ["108 nouveaux clients", "Nouveaux clients (hebdo)", "9/mois", "Canaux, agences"], ["170 clients actifs", "Churn (mensuel)", "≤ 1,5 %", "Entretien de départ"],
                                                                                                            ["181 k€ ARR", "MRR, ARPA", "15,1 k€ · ≥ 85 €", "Upsell Pro"], ["35 % via agences", "Part agences", "35 %", "Commission Gold"], ["Point mort", "EBITDA, runway", "≥ 6 mois", "Gel / levée"]], widths=[3.0, 3.4, 2.6, 3.1], size=15, h_row=0.68)
s = p.slide("Les seuils sont fixés avant les résultats", "Validation"); p.table(s, 0.6, 1.6, 12.1, [["Indicateur", "GO", "STOP"], ["Pré-ventes avec acompte", "≥ 8", "< 4"], ["Logisticiens prêts à signer", "≥ 2 (dont 1 hors Planet Aura)", "0 hors Planet Aura"], ["Prix acceptable médian", "≥ 49 €/mois", "< 25 €"], ["Temps par commande", "≥ 8 min", "< 4 min"]], widths=[5.0, 4.0, 3.1], size=16, h_row=0.75)
p.callout(s, 0.6, 5.6, 12.1, 0.9, "3 mois · < 8 k€ · 25 domaines, 5 agences, 4 logisticiens", 17, TEAL)
s = p.slide("Indépendant de Planet Aura, partenaire possible", "Indépendance"); p.bullets(s, 0.6, 1.7, 12, 4.5, ["Société, code, marque et données détenus par Passavin", "Partenariat non exclusif, neutralité d'affichage, préavis 6 mois",
                                                                                                                  "Les intégrations Planet Aura ne sont pas nos clients", "Contrat de travail du porteur relu par un avocat avant création", "≥ 2 logisticiens avant la seed"], 20, gap=10)
s = p.slide("Feuille de route", "Étapes clés"); p.flow(s, 0.6, 2.0, [("Nov. 26", "Sécuriser"), ("Déc. 26", "25 entretiens"), ("Fév. 27", "8 pré-ventes"), ("Juin 27", "MVP + 5 pilotes"), ("2028", "84 clients"), ("2029", "170 clients, Shopify")], w=2.0, h=1.6, size=15)
s = p.slide("En résumé", "Synthèse", dark=False); p.bullets(s, 0.6, 1.6, 12, 3.4, ["Un vrai irritant, sur une niche : ~500-950 domaines WooCommerce exportateurs", "Un produit simple : un connecteur neutre multi-logisticiens", "Une PME SaaS rentable vers l'an 4 avec ~210 clients — pas une licorne",
                                                                                     "Aucune demande validée : nous testons avant d'investir"], 19, gap=10)
p.callout(s, 0.6, 5.2, 12.1, 1.2, "Nous demandons 120 k€ pour prouver en 6 mois que les domaines et les logisticiens paient. Vos vins passent les frontières.", 18, WINE)
p.save("Passavin_Pitch_Soutenance.pptx")
print("pitch", p.i)
