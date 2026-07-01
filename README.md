# Chelsea Kwan — Portfolio

Personal portfolio website. Built with **Next.js** (App Router, JavaScript) —
a cream-and-ink, typewriter/editorial aesthetic centered on a signature
animated hero. Statically generated and deployable to Vercel. Currently hosted on [chelseakwan.com](chelseakwan.com) - feel free to take a look!

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (static)
npm start        # serve the production build
```

## Where to edit content

All copy lives in plain data files under [`content/`](content) — no component
code to touch. Edit the relevant file and the site updates everywhere it's used.

| To change…                              | Edit                          |
| --------------------------------------- | ----------------------------- |
| Name, tagline, About heading + intro    | `content/profile.js`          |
| Education block                         | `content/education.js`        |
| Technical skills                        | `content/skills.js`           |
| Interests & languages ("Beyond Work")   | `content/personal.js`         |
| Work experience entries                 | `content/experience.js`       |
| Featured projects                       | `content/projects.js`         |
| Email, LinkedIn, location               | `content/contact.js`          |
| Résumé download (path, name, date)      | `content/resume.js`           |
| Site name, URL, nav links               | `lib/site.js`                 |
| Hero fonts & per-font color themes      | `components/hero/themes.js`   |

Add a job or project by prepending an object to the array in
`content/experience.js` or `content/projects.js` — no other changes needed.

## Updating the résumé

The résumé PDF lives at a single fixed path: [`public/resume.pdf`](public).

1. Replace `public/resume.pdf` with the new file (keep the same filename).
2. Update `lastUpdated` in `content/resume.js` (e.g. `"June 2026"`).
3. Commit and redeploy.

No component, layout, or build-config changes are required. The friendly
downloaded filename (`Chelsea Kwan Resume.pdf`) is set independently in
`content/resume.js`, so the stored file can stay name-stable.

## Project structure

```
app/                 # routes (file-based): / about/ work/ contact/ resume/
  layout.js          #   root layout — fonts, metadata, global nav
  page.js            #   home (renders the hero)
  globals.css        #   design system (color/type/spacing tokens, components)
  opengraph-image.js #   generated static OG/link-preview image
components/          # shared UI: Nav, Row, Bullets, ProjectCard, ContactRow, PageHeader
  hero/              #   the animated name + theme-cycling feature (isolated)
content/             # all editable content (see table above)
lib/                 # fonts.js (next/font setup), site.js (site constants)
public/              # resume.pdf, fonts/
```

## The hero (signature feature)

The home page wordmark cycles through 9 typefaces, each paired with a full-page
color theme. It runs an entrance animation on load, then responds to:

- **single click** on the name — advance one font/theme,
- **double click** — random shuffle,
- **Replay** — re-run the entrance animation.

It respects `prefers-reduced-motion` (skips the animation, renders the default
theme, still allows manual changes). Lives entirely in
[`components/hero/`](components/hero). Fonts and themes are defined in
`components/hero/themes.js`.

## Tech notes

- All routes are statically generated (SSG) with distinct titles, descriptions,
  and Open Graph tags.
- Fonts are loaded via `next/font` (self-hosted `.ttf`/`.otf` + Google Fonts)
  for `font-display: swap` and preloading.
- The hero client bundle ships only with the home route.

## Design source

The original design prototype lives in `Chelsea KwanWebsite v3/` (a
`dc-runtime` HTML/JS package) and is the binding visual/content baseline. It is
not directly deployable; this Next.js app is the production implementation.
