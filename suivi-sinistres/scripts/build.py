#!/usr/bin/env python3
"""Fabrique public/index.html à partir de l'export HTML de l'artifact claude.ai.

Usage :  python3 scripts/build.py chemin/vers/Suivi_des_sinistres.html

- retire l'enveloppe ajoutée par claude.ai (double <!doctype>) ;
- vide les données d'exemple embarquées (const SEED=[...]) : elles contiennent des
  données clients et seraient lisibles par n'importe qui, sans connexion. Elles se
  réimportent dans la base via admin.html ;
- branche Firebase (SDK + firebase-config.js + runtime.js) avant le script de l'app.
Le fichier d'origine ne doit pas être versionné (voir .gitignore).
"""
import json, re, sys, pathlib

FIREBASE = "10.14.1"
INJECT = "\n".join([
    *[f'<script src="https://www.gstatic.com/firebasejs/{FIREBASE}/firebase-{m}-compat.js"></script>'
      for m in ("app", "auth", "firestore", "storage")],
    '<script src="firebase-config.js"></script>',
    '<script src="runtime.js"></script>',
    "",
])

def build(src: str) -> str:
    # 1. enveloppe claude.ai : on garde le document interne
    low = src.lower()
    first = low.find("<!doctype html>")
    second = low.find("<!doctype html>", first + 1)
    if first != -1 and second != -1 and second < 3000:
        src = src[second:]
    src = re.sub(r"(</body></html>\s*)+$", "</body></html>\n", src.rstrip() + "\n")

    # 2. SEED -> []
    key = "const SEED="
    i = src.find(key)
    if i == -1:
        sys.exit("SEED introuvable : le format du fichier a changé.")
    j = i + len(key)
    _, end = json.JSONDecoder().raw_decode(src[j:])
    src = src[:j] + "[]" + src[j + end:]

    # 3. injection juste avant le <script> qui contient l'application
    k = src.rfind("<script>", 0, i)
    if k == -1:
        sys.exit("Balise <script> de l'application introuvable.")
    src = src[:k] + INJECT + src[k:]

    # favicon + interdiction d'indexation
    src = src.replace("<title>", '<meta name="robots" content="noindex,nofollow"><link rel="icon" href="favicon.svg"><title>', 1)
    return src

if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    root = pathlib.Path(__file__).resolve().parent.parent
    out = root / "public" / "index.html"
    html = build(pathlib.Path(sys.argv[1]).read_text(encoding="utf-8"))
    out.write_text(html, encoding="utf-8")
    print(f"OK -> {out} ({len(html)//1024} Ko)")
