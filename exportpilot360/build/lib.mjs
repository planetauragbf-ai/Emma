// ExportPilot 360 — bibliothèque commune des decks : identité, mise en page, graphiques SVG.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
export const RES = JSON.parse(fs.readFileSync(path.join(HERE, "../finance/resultats.json"), "utf8"));
export const C = RES.central.synthese;
export const M = RES.central.mensuel;

// ------------------------------------------------------------------ formats
const nf0 = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 });
const nf1 = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 1, minimumFractionDigits: 1 });
export const n0 = (v) => nf0.format(Math.round(v)).replace(/ /g, " ");
export const eur = (v) => `${n0(v)} €`;
export const keur = (v) => `${nf0.format(Math.round(v / 1000))} k€`;
export const keur1 = (v) => `${nf1.format(v / 1000)} k€`.replace(/ /g, " ");
export const pct = (v, d = 0) => `${(v * 100).toFixed(d).replace(".", ",")} %`;
export const signed = (v) => (v < 0 ? "−" + n0(-v) : n0(v));
export const kfmt = (v) => {
  if (Math.abs(v) < 50) return "–";
  if (Math.abs(v) < 1000) return (v < 0 ? "−" : "") + (Math.abs(v) / 1000).toFixed(1).replace(".", ",");
  return signed(v / 1000);
};
export const ks = (v) => (v < 0 ? "−" : v > 0 ? "+" : "") + nf0.format(Math.abs(Math.round(v / 1000))) + " k€";

// ------------------------------------------------------------------ identité
export const COL = {
  ink: "#1E1A26", wine: "#6E1A37", s1: "#A3324F", s2: "#B07D22", s3: "#1F8A70", s4: "#5A6CC0",
  brass: "#C8A15A", brassLight: "#EFE3C8", chalk: "#F6F2EC", paper: "#FFFFFF", muted: "#6B6573",
  line: "#E4DDD3", grid: "#ECE6DD", rose: "#F3E6EA", sageLight: "#E1F0EB",
};

export const logoMark = (size = 40, light = false) => `
<svg width="${size}" height="${size}" viewBox="0 0 48 48" aria-hidden="true">
  <path d="M24 4a20 20 0 1 1-17.3 10" fill="none" stroke="${COL.brass}" stroke-width="3.2" stroke-linecap="round"/>
  <path d="M3.4 9.6l3.4 4.6 4.9-3" fill="none" stroke="${COL.brass}" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M24 13c4.6 6 7.3 10 7.3 13.6a7.3 7.3 0 0 1-14.6 0C16.7 23 19.4 19 24 13z" fill="${light ? "#fff" : COL.wine}"/>
</svg>`;

export const wordmark = (size = 22, light = false) =>
  `<span class="wm" style="font-size:${size}px;color:${light ? "#fff" : COL.ink}">ExportPilot<span style="color:${COL.brass}"> 360</span></span>`;

// ------------------------------------------------------------------ CSS
export const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&display=swap');
:root{--ink:${COL.ink};--wine:${COL.wine};--brass:${COL.brass};--chalk:${COL.chalk};--muted:${COL.muted};--line:${COL.line};}
*{box-sizing:border-box;margin:0;padding:0}
html,body{background:#888}
body{font-family:Inter,"Inter Display",system-ui,sans-serif;color:var(--ink);-webkit-font-smoothing:antialiased}
.slide{width:1280px;height:720px;position:relative;overflow:hidden;background:var(--chalk);page-break-after:always;break-after:page;padding:54px 64px 50px}
.slide.dark{background:${COL.ink};color:#fff}
.slide.wine{background:${COL.wine};color:#fff}
.wm{font-family:Fraunces,Georgia,serif;font-weight:700;letter-spacing:-.01em}
.kicker{font-size:13px;letter-spacing:.16em;text-transform:uppercase;color:${COL.s2};font-weight:600;margin-bottom:10px}
.dark .kicker,.wine .kicker{color:${COL.brass}}
h1{font-family:Fraunces,Georgia,serif;font-weight:600;font-size:36px;line-height:1.12;letter-spacing:-.01em;color:var(--ink);max-width:1080px}
.dark h1,.wine h1{color:#fff}
h1 em{font-style:normal;color:var(--wine)}
.dark h1 em,.wine h1 em{color:${COL.brass}}
h2{font-family:Fraunces,Georgia,serif;font-weight:600;font-size:22px;line-height:1.2;margin-bottom:8px}
h3{font-size:15px;font-weight:700;margin-bottom:6px;letter-spacing:.01em}
p,li{font-size:16px;line-height:1.45}
.lead{font-size:18px;line-height:1.45;color:#3a3442;max-width:980px;margin-top:12px}
.dark .lead,.wine .lead{color:#E8E2EC}
.muted{color:var(--muted)}
.small{font-size:14.5px;line-height:1.42}
.xs{font-size:12px;line-height:1.35;color:var(--muted)}
.foot{position:absolute;left:64px;right:64px;bottom:20px;display:flex;align-items:center;justify-content:space-between;font-size:11px;color:var(--muted)}
.dark .foot,.wine .foot{color:#bdb4c4}
.foot .brand{display:flex;align-items:center;gap:8px}
.grid{display:grid;gap:18px}
.g2{grid-template-columns:1fr 1fr}.g3{grid-template-columns:repeat(3,1fr)}.g4{grid-template-columns:repeat(4,1fr)}.g5{grid-template-columns:repeat(5,1fr)}
.card{background:#fff;border:1px solid var(--line);border-radius:14px;padding:20px 22px}
.dark .card{background:#2A2533;border-color:#3B3446}
.card.tint{background:${COL.rose};border-color:#ead3da}
.card.sage{background:${COL.sageLight};border-color:#cfe5dd}
.card.brass{background:${COL.brassLight};border-color:#e4d3ad}
.stat{font-family:Fraunces,Georgia,serif;font-weight:700;font-size:44px;line-height:1;color:var(--wine);letter-spacing:-.02em}
.dark .stat,.wine .stat{color:${COL.brass}}
.stat.s{font-size:32px}
.statlbl{font-size:14.5px;line-height:1.35;margin-top:8px;color:#3a3442}
.dark .statlbl,.wine .statlbl{color:#E8E2EC}
.src{font-size:10.5px;color:var(--muted);margin-top:6px}
.dark .src,.wine .src{color:#a99fb2}
.tag{display:inline-block;font-size:10.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:3px 8px;border-radius:20px;background:${COL.brassLight};color:#6b4c12}
.tag.wine{background:${COL.rose};color:${COL.wine}}
.tag.sage{background:${COL.sageLight};color:#0f5c49}
.tag.ink{background:${COL.ink};color:#fff}
.concept{position:absolute;top:14px;right:14px;font-size:10px;font-weight:800;letter-spacing:.14em;color:${COL.wine};background:#fff;border:1.5px dashed ${COL.wine};padding:3px 8px;border-radius:6px}
table.t{width:100%;border-collapse:collapse;font-size:13px}
table.t th{font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:var(--muted);font-weight:700;text-align:right;padding:6px 8px;border-bottom:1.5px solid var(--ink)}
table.t th:first-child,table.t td:first-child{text-align:left}
table.t td{padding:7px 8px;border-bottom:1px solid var(--line);text-align:right;font-variant-numeric:tabular-nums}
table.t tr.tot td{font-weight:700;background:${COL.rose};border-bottom:1px solid #e3c9d1}
table.t tr.sub td{font-weight:700}
table.t td.neg{color:${COL.wine}}
.pill{display:flex;align-items:center;gap:10px}
.dot{width:10px;height:10px;border-radius:50%;flex:none}
ul.clean{list-style:none}
ul.clean li{padding-left:18px;position:relative;margin:5px 0}
ul.clean li:before{content:"";position:absolute;left:2px;top:9px;width:7px;height:7px;border-radius:50%;background:${COL.brass}}
.num{font-family:Fraunces,Georgia,serif;font-weight:700;color:${COL.brass};font-size:28px;line-height:1}
.arrow{color:${COL.brass};font-weight:700}
.legend{display:flex;gap:16px;flex-wrap:wrap;font-size:12px;color:#3a3442}
.legend span{display:flex;align-items:center;gap:6px}
.legend i{width:12px;height:12px;border-radius:3px;display:inline-block}
.phone{width:200px;height:400px;border-radius:30px;background:#fff;border:8px solid ${COL.ink};position:relative;overflow:hidden;box-shadow:0 12px 30px rgba(30,26,38,.18)}
.phone .scr{position:absolute;inset:0;padding:22px 14px 14px;font-size:11px}
.slide.pitch{display:flex;flex-direction:column;justify-content:center;padding-bottom:72px}
.slide.pitch p,.slide.pitch li{font-size:19px}
.slide.pitch .small{font-size:16.5px}
.slide.pitch .lead{font-size:21px}
.slide.pitch .card{padding:24px 26px}
.slide.pitch .stat{font-size:52px}
.slide.pitch h2{font-size:24px}
.slide.pitch .statlbl{font-size:16px}
.badge{position:absolute;bottom:-6px;left:50%;transform:translateX(-50%)}
`;

// ------------------------------------------------------------------ squelette
export function page(body, { theme = "", n, total, note = "" } = {}) {
  const foot = n
    ? `<div class="foot"><div class="brand">${logoMark(18, theme === "dark" || theme === "wine")}<span>ExportPilot 360</span></div>
       <div>${note}</div><div>${n}${total ? " / " + total : ""}</div></div>` : "";
  return `<section class="slide ${theme}">${body}${foot}</section>`;
}
export function doc(title, slides) {
  return `<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>${title}</title><style>${CSS}</style></head><body>${slides.join("\n")}</body></html>`;
}

// ------------------------------------------------------------------ graphiques
// Barres empilées verticales (catégories × séries). Marques fines, coins arrondis en haut, gap 2 px.
export function stackedBars({ cats, series, w = 560, h = 300, fmt = keur, max }) {
  const pad = { l: 56, r: 16, t: 26, b: 34 };
  const iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
  const totals = cats.map((_, i) => series.reduce((a, s) => a + s.values[i], 0));
  const top = max || niceMax(Math.max(...totals));
  const y = (v) => pad.t + ih - (v / top) * ih;
  const bw = Math.min(70, (iw / cats.length) * 0.46);
  let g = "";
  for (let k = 0; k <= 4; k++) {
    const v = (top / 4) * k, yy = y(v);
    g += `<line x1="${pad.l}" x2="${w - pad.r}" y1="${yy}" y2="${yy}" stroke="${COL.grid}" stroke-width="1"/>
          <text x="${pad.l - 8}" y="${yy + 4}" text-anchor="end" font-size="11" fill="${COL.muted}">${fmt(v)}</text>`;
  }
  cats.forEach((c, i) => {
    const cx = pad.l + (iw / cats.length) * (i + 0.5);
    let acc = 0;
    series.forEach((s, si) => {
      const v = s.values[i]; if (v <= 0) return;
      const y0 = y(acc), y1 = y(acc + v);
      const hh = Math.max(0, y0 - y1 - 2);
      const isTop = si === series.length - 1 || series.slice(si + 1).every((t) => t.values[i] <= 0);
      g += rectRounded(cx - bw / 2, y1, bw, hh, isTop ? 4 : 0, s.color);
      acc += v;
    });
    g += `<text x="${cx}" y="${y(totals[i]) - 8}" text-anchor="middle" font-size="13" font-weight="700" fill="${COL.ink}">${fmt(totals[i])}</text>
          <text x="${cx}" y="${h - 12}" text-anchor="middle" font-size="12.5" fill="${COL.ink}">${c}</text>`;
  });
  g += `<line x1="${pad.l}" x2="${w - pad.r}" y1="${y(0)}" y2="${y(0)}" stroke="${COL.ink}" stroke-width="1"/>`;
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img">${g}</svg>`;
}
function rectRounded(x, y, w, h, r, fill) {
  if (h <= 0) return "";
  r = Math.min(r, h, w / 2);
  if (!r) return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}"/>`;
  return `<path d="M${x},${y + h}V${y + r}Q${x},${y} ${x + r},${y}H${x + w - r}Q${x + w},${y} ${x + w},${y + r}V${y + h}Z" fill="${fill}"/>`;
}
export function niceMax(v) {
  if (v <= 0) return 1;
  const p = Math.pow(10, Math.floor(Math.log10(v)));
  for (const m of [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10]) if (m * p >= v) return m * p;
  return 10 * p;
}
// Courbe (une série), axe zéro optionnel, annotations.
export function lineChart({ values, labels, w = 600, h = 280, color = COL.s1, fmt = keur, min, max, annotations = [], area = true, tickEvery = 6 }) {
  const pad = { l: 58, r: 18, t: 22, b: 34 };
  const iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
  const lo = min !== undefined ? min : Math.min(0, ...values);
  const hi = max !== undefined ? max : niceMax(Math.max(...values));
  const x = (i) => pad.l + (iw * i) / (values.length - 1);
  const y = (v) => pad.t + ih - ((v - lo) / (hi - lo)) * ih;
  let g = "";
  const steps = 4;
  for (let k = 0; k <= steps; k++) {
    const v = lo + ((hi - lo) / steps) * k, yy = y(v);
    g += `<line x1="${pad.l}" x2="${w - pad.r}" y1="${yy}" y2="${yy}" stroke="${COL.grid}"/>
          <text x="${pad.l - 8}" y="${yy + 4}" text-anchor="end" font-size="11" fill="${COL.muted}">${fmt(v)}</text>`;
  }
  if (lo < 0) g += `<line x1="${pad.l}" x2="${w - pad.r}" y1="${y(0)}" y2="${y(0)}" stroke="${COL.ink}" stroke-width="1"/>`;
  labels.forEach((l, i) => {
    if (i % tickEvery === 0 || (i === labels.length - 1 && i % tickEvery > tickEvery / 2))
      g += `<text x="${x(i)}" y="${h - 12}" text-anchor="middle" font-size="11" fill="${COL.muted}">${l}</text>`;
  });
  const pts = values.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
  if (area) g += `<polygon points="${x(0)},${y(Math.max(lo, 0))} ${pts} ${x(values.length - 1)},${y(Math.max(lo, 0))}" fill="${color}" opacity=".10"/>`;
  g += `<polyline points="${pts}" fill="none" stroke="${color}" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"/>`;
  annotations.forEach((a) => {
    const xx = x(a.i), yy = y(values[a.i]);
    g += `<circle cx="${xx}" cy="${yy}" r="5" fill="${color}" stroke="#fff" stroke-width="2"/>
          <text x="${xx + (a.dx || 0)}" y="${yy + (a.dy || -12)}" text-anchor="${a.anchor || "middle"}" font-size="12" font-weight="700" fill="${COL.ink}">${a.text}</text>`;
  });
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img">${g}</svg>`;
}
// Barres horizontales simples (une série) avec étiquettes directes.
export function hbars({ items, w = 520, rowH = 34, color = COL.s1, fmt = (v) => v, max }) {
  const lw = 190, h = items.length * rowH + 8;
  const top = max || Math.max(...items.map((i) => i.v));
  let g = "";
  items.forEach((it, k) => {
    const y = k * rowH + 4, bw = ((w - lw - 70) * it.v) / top;
    g += `<text x="0" y="${y + rowH / 2 + 4}" font-size="12.5" fill="${COL.ink}">${it.l}</text>
          ${rectRounded(lw, y + 7, Math.max(bw, 2), rowH - 14, 0, it.c || color)}
          <rect x="${lw + Math.max(bw, 2) - 4}" y="${y + 7}" width="4" height="${rowH - 14}" rx="2" fill="${it.c || color}"/>
          <text x="${lw + bw + 8}" y="${y + rowH / 2 + 4}" font-size="12.5" font-weight="700" fill="${COL.ink}">${fmt(it.v)}</text>`;
  });
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${g}</svg>`;
}
// Barre 100 % empilée horizontale (répartition).
export function shareBar({ parts, w = 1100, h = 46 }) {
  const tot = parts.reduce((a, p) => a + p.v, 0);
  let x = 0, g = "";
  parts.forEach((p, i) => {
    const pw = (w * p.v) / tot;
    g += `<rect x="${x}" y="0" width="${Math.max(pw - 2, 1)}" height="${h}" rx="${i === 0 || i === parts.length - 1 ? 6 : 0}" fill="${p.c}"/>
          <text x="${x + 12}" y="${h / 2 + 5}" font-size="14" font-weight="700" fill="#fff">${Math.round((p.v / tot) * 100)} %</text>`;
    x += pw;
  });
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${g}</svg>`;
}
export const monthLabels = (() => {
  const m = ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."];
  const out = [];
  for (let k = 1; k <= 38; k++) { const y = 2026 + Math.floor((k + 9) / 12); const mo = (k + 9) % 12; out.push(`${m[mo]} ${String(y).slice(2)}`); }
  return out;
})();
