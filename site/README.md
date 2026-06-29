# Chelsea Kwan — Portfolio

A standalone, dependency-free port of the `Chelsea KwanWebsite v3` design prototype
(which was authored in a proprietary `dc-runtime`/React format). This version is plain
HTML/CSS/JS and deploys anywhere — GitHub Pages, Netlify, Vercel, or any static host.

## Structure

```
site/
├── index.html          # entire site (HTML + CSS + JS, self-contained)
└── assets/
    ├── resume.pdf
    └── fonts/          # AstonScript, Dotfont, SuperCowboy (Google Fonts loaded via CDN)
```

## Run locally

```bash
cd site
python3 -m http.server 8000
# open http://localhost:8000
```

(Must be served over HTTP, not opened as a `file://` URL, so the local fonts and PDF load.)

## Interactions (ported faithfully from the prototype)

- **Animated name** — on load, the "Chelsea Kwan" wordmark spins through 9 typefaces
  (4 full cycles) and settles on the Courier New / cream default.
- **Click the name** — advance one typeface; the whole page recolors to that font's theme.
- **Double-click the name** — shuffle to a random typeface.
- **Replay** — re-runs the intro spin.
- Each typeface has its own paired color theme (navy, terminal green, saddle brown, etc.).
- Respects `prefers-reduced-motion`: skips the spin and jumps straight to the settled state.

## Deploy

It's static — push the contents of `site/` to any static host. For GitHub Pages, set the
Pages source to this folder (or move the files to the repo root / `docs/`).
