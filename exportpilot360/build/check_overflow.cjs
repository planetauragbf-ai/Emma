const { chromium } = require("playwright");
(async () => {
  const f = process.argv[2];
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1280, height: 720 } });
  await p.goto("file://" + f, { waitUntil: "networkidle" }); await p.evaluate(() => document.fonts.ready);
  const res = await p.evaluate(() => [...document.querySelectorAll("section.slide")].map((s, i) => {
    const top = s.getBoundingClientRect().top; let worst = 0, who = "";
    s.querySelectorAll("*").forEach((e) => {
      if (e.closest(".foot") || getComputedStyle(e).position === "absolute" && !e.closest(".phone")) return;
      if (e.closest("[style*='position:absolute']")) return;
      const r = e.getBoundingClientRect(); const bot = r.bottom - top;
      if (bot > worst) { worst = bot; who = e.tagName + "." + e.className + " " + (e.textContent || "").slice(0, 40); }
    });
    return [i + 1, Math.round(worst), who];
  }));
  res.filter((r) => r[1] > 688).forEach((r) => console.log("OVERFLOW", r.join(" | ")));
  console.log("max bottoms:", res.map((r) => r[0] + ":" + r[1]).join(" "));
  await b.close();
})();
