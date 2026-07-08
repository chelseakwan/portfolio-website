# Chelsea Kwan — Portfolio

## Repo layout: two zones, one direction of flow

```
Website Designs/     ← design specs (source of truth for look & branding). Reference, not runnable.
app/ components/ …   ← the deployable Next.js site. This is what ships.
```

Design flows **one way**: specs in `Website Designs/` → applied into the Next.js app.
Never edit a spec to match the site; the spec is the brief, the site is the output.

### `Website Designs/` — versioned specs

Each folder is a self-contained snapshot of a look (copy, fonts, screenshots, notes).
Folders are versioned (`Chelsea KwanWebsite v3`, `Chelsea Kwan — Design Spec - v4`, …);
the highest version is the latest intent. `Chelsea KwanWebsite v3` is the original
`dc-runtime` HTML/JS prototype and the binding visual/content baseline; later spec
folders refine it.

A spec typically contains:
- `README.txt` — concept, color palette, interactions
- `copy.txt` — all site text, section by section
- `fonts/` — display fonts
- `screenshots/` — rendered reference frames

When asked to "apply the vN spec," **build forward on the 1–2 latest specs — don't rewrite
from scratch.** Newer specs refine older ones rather than replace them wholesale.

### The deployable site — Next.js (App Router, JavaScript)

Statically generated, deployed to Vercel. Content is separated from components so copy
edits never touch component code.

```
app/                 # routes (file-based): / about/ work/ contact/ resume/
  layout.js          #   root layout — fonts, metadata, global nav
  page.js            #   home (renders the hero)
  globals.css        #   design system (color/type/spacing tokens, components)
  opengraph-image.js #   generated static OG/link-preview image
components/          # shared UI: Nav, Row, Bullets, ProjectCard, ContactRow, PageHeader
  hero/              #   the animated name + theme-cycling feature (isolated)
content/             # all editable copy/data — edit here, not in components
lib/                 # fonts.js (next/font setup), site.js, theme.js
public/              # resume.pdf, fonts/
```

**Where to edit content** (see `README.md` for the full table): copy lives in
`content/*.js`; hero fonts & per-font themes in `components/hero/themes.js`; site name /
URL / nav in `lib/site.js`; résumé at the fixed path `public/resume.pdf` (update
`lastUpdated` in `content/resume.js`).

## Commands (run from repo root)

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # production build (static)
npm start         # serve the production build
```

## Signature interaction (keep it faithful when restyling)

The home page "Chelsea Kwan" wordmark cycles through a deck of display fonts like a
flip-book. Each font carries its own paired color theme, so the whole page recolors
wherever the flip lands. Single click = next font, double-click = random shuffle,
Replay = re-run the intro spin. Respects `prefers-reduced-motion` (skips the animation,
renders the default theme, still allows manual changes). Lives entirely in
`components/hero/`; fonts and themes are defined in `components/hero/themes.js`.
Default resting palette is warm cream (`#F1EAD8`) on near-black ink (`#161310`).

## Typical workflow

> "Apply the v5 spec in `Website Designs/` to the site."

Read the spec (screenshots for layout, `copy.txt` for text, `fonts/` for type,
`README.txt` for intent), carry forward the latest spec(s), and make the changes in the
Next.js app — copy into `content/`, type/themes into `components/hero/`, structural or
styling changes into the relevant `app/`/`components/` files and `app/globals.css`.
