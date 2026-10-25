// Génère les decks HTML puis les PDF (et les PNG de la soutenance pour le PPTX).
// Usage : node build/build_decks.mjs [deck|pitch|annexes|all] [--png]
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { doc } from "./lib.mjs";
import { deckSlides } from "./deck.mjs";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, "../decks");
const which = process.argv[2] || "all";
const wantPng = process.argv.includes("--png");

async function render(name, title, slides, png) {
  const html = doc(title, slides);
  const htmlPath = path.join(HERE, `${name}.html`);
  fs.writeFileSync(htmlPath, html);
  const browser = await chromium.launch();
  const pg = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  await pg.goto("file://" + htmlPath, { waitUntil: "networkidle" });
  await pg.evaluate(() => document.fonts.ready);
  await pg.pdf({ path: path.join(OUT, `${name}.pdf`), width: "1280px", height: "720px", printBackground: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
  if (png) {
    const dir = path.join(HERE, `png_${name}`);
    fs.mkdirSync(dir, { recursive: true });
    const els = await pg.$$("section.slide");
    for (let i = 0; i < els.length; i++) await els[i].screenshot({ path: path.join(dir, `${String(i + 1).padStart(2, "0")}.png`) });
  }
  await browser.close();
  console.log(`${name}: ${slides.length} pages`);
}

fs.mkdirSync(OUT, { recursive: true });
if (which === "deck" || which === "all")
  await render("ExportPilot360_Dossier_Investissement", "ExportPilot 360 — Dossier d'investissement", deckSlides(), wantPng);
if (which === "pitch" || which === "all") {
  const { pitchSlides } = await import("./pitch.mjs");
  await render("ExportPilot360_Soutenance", "ExportPilot 360 — Soutenance", pitchSlides(), true);
}
if (which === "annexes" || which === "all") {
  const { annexSlides } = await import("./annexes.mjs");
  await render("ExportPilot360_Annexes", "ExportPilot 360 — Annexes", annexSlides(), wantPng);
}
