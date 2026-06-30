
# Personal Portfolio Website

*Product Requirements Document*

| **Author** | Chelsea Kwan |
| --- | --- |
| **Document Status** | Draft v1.0 |
| **Last Updated** | June 30, 2026 |
| **Tech Stack** | Next.js (React, JavaScript), file-based routing |
| **Design Source** | Provided HTML/CSS design package ("Hero — Chelsea Kwan") |

---

## 1. Overview

This document defines the requirements for a personal portfolio website for Chelsea Kwan, built with Next.js and React. The site serves as a personal brand and general presence — a single, polished destination that represents Chelsea across academic, professional, and personal contexts. It is not optimized solely for job applications or freelance lead generation; it is meant to read as an editorial, distinctive personal site that someone would bookmark, share, or revisit out of genuine interest.

The visual and interaction design is based on a provided design package: a cream-and-ink, typewriter/editorial aesthetic centered on a signature animated hero treatment. That design is the binding baseline for this build — the PRD translates its HTML/CSS/vanilla-JS prototype into a production Next.js application without softening its distinctive mechanics.

### 1.1 Design & Development Workflow

Frontend iterations for this site originate as Claude-generated designs and are synced into the project's repository, rather than being hand-coded once and left static. The component and content boundaries defined in this PRD (see Section 7) are written with that in mind: content (résumé data, experience, projects, skills) is kept separate from layout/component code specifically so repeated design regeneration passes don't risk overwriting real content, and so the signature hero behavior in Section 4 isn't silently simplified or dropped during a re-generation.

### 1.2 Goals

- Establish a memorable, distinctive personal brand presence online, reflecting Chelsea's background in math, finance, and data.

- Faithfully reproduce the provided design system's editorial aesthetic, typography, and signature hero animation in React/Next.js.

- Present education, work experience, projects, technical skills, personal interests, and contact information clearly and navigably.

- Provide a downloadable, up-to-date résumé (PDF).

- Ship a fast, accessible, mobile-responsive site deployable to a standard host (e.g., Vercel).

- Structure the repo so that content (bio copy, job bullets, project entries, skills) is easy to find and edit directly in code, without a CMS or backend — clear file organization, predictable naming, and content kept separate from layout/component code (Section 7).

### 1.3 Non-Goals

- No CMS, hosted or self-hosted — content is edited directly in the repo's data files by the owner, not through a form UI or admin panel.

- No blog in this version (explicitly out of scope per stakeholder input).

- No backend database, user accounts, or authentication.

- No e-commerce, testimonials module, or third-party analytics dashboard in v1.

- No multi-language/localization support in v1.

### 1.4 Target Audience

- Recruiters and hiring managers (quant finance, fintech, data roles).

- Professional network contacts and collaborators (LinkedIn referrals, alumni, co-op/internship contacts).

- Personal acquaintances and anyone seeking a holistic view of Chelsea — professional and personal.

## 2. Site Structure & Navigation

The site is split into separate Next.js routes (per stakeholder decision), rather than a single scrolling page with anchor links. Each primary section becomes its own page, with a persistent global navigation bar that mimics the design package's fixed top nav.

### 2.1 Route Map

| **Route** | **Nav Label** | **Purpose** |
| --- | --- | --- |
| / | (Home / Hero) | Landing page with animated name treatment, tagline, and entry points to other sections. |
| /about | About | Bio, education, technical skills, and personal/"Beyond Work" section. |
| /work | Work | Work experience timeline and featured projects. |
| /contact | Contact | Email, LinkedIn, and location, presented as link rows. |
| /resume | Résumé | Résumé summary with PDF download. |

*Note: in the original single-page prototype, "About," "Work," "Contact," and "Résumé" were anchor-scrolled sections numbered 01–04 within one page. With the move to separate routes, each page keeps its section index label (e.g., "01 — About") as a page eyebrow/kicker for visual continuity, but it no longer implies scroll position — it now reads as a page identifier within the site's overall sequence.*

### 2.2 Global Navigation

- Fixed top navigation bar, 62px tall, full width, cream background, bottom border using the design's hairline rule color, persists across all routes.

- Left: wordmark/initials ("CK.") in monospace, bold, wide letter-spacing — links to Home (/).

- Right: nav links for About, Work, Contact, Résumé, each separated by vertical hairline dividers.

- Hover interaction: a solid ink-colored panel slides up from the bottom of the nav item (vertical translate, ~0.46s cubic-bezier ease) revealing an inverted (cream-on-ink) label as the original label slides out the top — reproduced as a CSS/Framer Motion transform animation, not a JS-timed hack.

- Active route should be visually indicated (e.g., persistent subtle underline or permanently inverted state) — this is an enhancement beyond the original static prototype, needed because routing (vs. anchor scroll) removes the implicit scroll-position feedback users had before.

- Nav must collapse to a mobile-friendly pattern (hamburger or stacked links) below ~640px viewport width; the original design has no defined mobile nav, so this is a new requirement called out explicitly in section 6.

## 3. Design System (from provided baseline)

All values below are extracted directly from the provided HTML/CSS design package and are binding unless explicitly marked as a deviation.

### 3.1 Color Tokens

| **Token** | **Default Value** | **Usage** |
| --- | --- | --- |
| **--bg** | #F1EAD8 | Primary background (warm cream/paper) |
| **--fg** | #161310 | Primary text/foreground (near-black ink) |
| **--line** | rgba(22,19,16,.16) | Hairline dividers/borders, derived from --fg at 16% opacity |

The Résumé page section uses an inverted color scheme (ink background, cream foreground) as a deliberate visual punctuation point marking the end of the page sequence.

### 3.2 Typography

| **Role** | **Font** | **Notes** |
| --- | --- | --- |
| **Display / H1–H2** | Rozha One (serif) | Section titles (e.g., "Math, markets & data."), job titles, project titles. Sizes scale via clamp(), e.g., clamp(40px, 6vw, 82px) for page H2s. |
| **Body / Labels / Nav** | Courier New (monospace) | All body copy, nav labels, kickers/eyebrows, metadata. Eyebrow text uses 12px, bold, .32em letter-spacing, uppercase, 50% opacity. |
| **Hero Name** | 9-font rotation | See Section 4 — Aston, Dotfont, SuperCowboy, Permanent Marker, Bangers, Bagel Fat One, Rye, Rozha One, Courier New. |

- Body copy line-height ~1.65; tight display line-height (~0.98–1.15) for serif headings.

- All-caps, wide-tracked monospace labels (kickers) precede every major heading, formatted as "01 — About", "02 — Experience", etc.

- Self-hosted font files (Aston Script, Dotfont, GROSTE/Groste, Super Cowboy) plus Google Fonts (Bagel Fat One, Bangers, Pacifico, Permanent Marker, Rozha One, Rubik Bubbles, Rye) must be licensed for web embedding and loaded via next/font (local for self-hosted .ttf/.otf, Google Fonts module for the rest) for performance and FOIT/FOUT control.

### 3.3 Layout & Spacing

- Max content width: 1060px, centered, with 7vw horizontal page padding on outer sections.

- Section vertical padding: ~120px top / 110px bottom on desktop, scaling down responsively.

- Recurring two-column grid pattern (290px label column + flexible content column, 48px gap) for Education, Skills, Beyond Work, and each Experience entry — reproduced as a reusable layout component.

- Hairline top borders (var(--line)) separate stacked rows within a section (experience entries, contact rows, skill groups).

- Smooth scroll behavior and a consistent 0.45s ease transition on background/color/border-color changes site-wide (supports the theme-swap behavior in Section 4).

## 4. Signature Feature: Animated Hero Name & Theme Cycling

**This is the must-have, non-negotiable centerpiece of the design, to be rebuilt exactly as specified in the provided prototype. It must not be simplified, removed, or replaced with a static alternative.**

### 4.1 Behavior Specification

- On initial load of the home page, the name "Chelsea Kwan" automatically cycles through a fixed sequence of 9 fonts, advancing one font roughly every 77ms, completing 4 full loop cycles before settling on the final font in the sequence (Courier New, index 8).

- Each font in the rotation has a paired full-page color theme (background + foreground) that is applied site-wide on the home page once the cycle settles — not just on the name itself.

- Single-click on the name: advances the font/theme by exactly one step forward (cancels any in-progress animation) and applies the new theme immediately. A debounce/delay (~220ms) distinguishes a single click from the first half of a double-click.

- Double-click on the name: triggers a new random short animation cycle (2 loops landing on a randomly chosen font), replicating a re-shuffle.

- A "Replay" button below the hero re-triggers the full entrance animation (4 cycles, landing on the default index). The Replay button is disabled while an animation is actively running.

- Theme/color changes apply only once an animation cycle has fully settled — never mid-flip — to avoid jarring color strobing during rapid font transitions.

- All background/foreground/border-color transitions use a 0.45s ease transition for a smooth cross-fade rather than an instant cut.

### 4.2 Font & Theme Pairings

| **Font** | **Background** | **Foreground** | **Theme Mood** |
| --- | --- | --- | --- |
| **Aston** | #141B33 | #EDE3CE | Ink navy / warm cream |
| **Dotfont** | #0C120D | #86F08A | Terminal green on black |
| **SuperCowboy** | #3A1E10 | #F2D199 | Saddle brown / tan |
| **Permanent Marker** | #FBFBF7 | #15151A | Marker on paper |
| **Bangers** | #FFD400 | #1A1A1A | Comic pop yellow/black |
| **Bagel Fat One** | #FFDCEB | #7A2E63 | Bubblegum pink |
| **Rye** | #241309 | #E4BE82 | Dark wood / gold |
| **Rozha One** | #10271F | #F0E7D6 | Deep editorial green |
| **Courier New** | #F1EAD8 | #161310 | DEFAULT — cream / black typewriter |

### 4.3 Technical Implementation Notes (React/Next.js)

- Implement as a client component ("use client") since it depends on interval timers, click state, and DOM-level CSS variable manipulation.

- Use React state (useState/useReducer) to track current step index, running/animating flag, and hovered nav tab — no external animation library required, though Framer Motion is acceptable for the nav hover transition if preferred by engineering.

- Apply the active theme via CSS custom properties on a root wrapper (or document root) rather than inline style props per element, to keep the 0.45s global transition working consistently.

- Respect prefers-reduced-motion: provide a reduced-motion fallback that skips the multi-cycle animation and renders directly in the default theme/font, while still allowing manual click-to-change interaction.

- Load all 9 typefaces ahead of the animation start (or use next/font's preloading) to avoid layout shift or missing-glyph flashes mid-cycle.

- Ensure the click/double-click disambiguation logic is implemented with proper cleanup (clearTimeout/clearInterval) on unmount to avoid memory leaks or stray state updates, since this is the one part of the original prototype most prone to bugs if ported carelessly.

### 4.4 Accessibility Considerations for the Hero

- The name element must remain in the accessibility tree as readable text ("Chelsea Kwan"), not purely decorative — use aria-label if the visual rendering (per-letter spans) risks being read incorrectly by screen readers.

- The Replay button needs a clear accessible name (e.g., "Replay name animation") and a visible focus state, since it currently only defines a hover/disabled style.

- Click-to-change-font and double-click-to-shuffle interactions are an easter egg, not the primary way to reach content — they must not be required to access any information or navigation, and must not interfere with keyboard or screen-reader users moving to the "Learn more" / nav links.

## 5. Page-by-Page Requirements

### 5.1 Home (/)

- Full-viewport hero section, vertically centered content starting ~34vh from top.

- Animated name treatment (Section 4) as the centerpiece.

- Tagline beneath the name: "Math and Business @ Northeastern University" — monospace, uppercase, wide letter-spacing.

- Two CTAs fixed near the bottom of the viewport: "Replay" (re-triggers animation; disabled while running) and "Learn more" (navigates to /about).

- Global nav bar overlays the hero (fixed position, see Section 2.2).

### 5.2 About (/about)

- Page kicker: "01 — About". Page H1/H2: "Math, markets & data."

- Intro paragraph: current bio copy describing Chelsea's academic focus (Mathematics & Business Administration, Northeastern, Fintech concentration).

- Education block (two-column row): Northeastern University, D'Amore-McKim School of Business, degree/expected graduation, concentration/minor/GPA, awards & activities, relevant coursework.

- Technical Skills block (two-column row): grouped into Programming & Query, Frameworks & Libraries, Tools, and Databases, each with a small uppercase sub-label.

- Beyond Work block (two-column row): Interests and Languages, in the same sub-labeled format as Technical Skills — this is the "personal section" requested by the stakeholder.

- All rows are separated by hairline top borders consistent with the design system's two-column pattern.

### 5.3 Work (/work)

- Page kicker: "02 — Experience". Page H1/H2: "Where I've worked."

- Experience entries, most recent first, each as a two-column row: left column = company name (serif), role title, location/date range; right column = bulleted list of accomplishments (em-dash bullet style, not standard round bullets).

- Entries to include at launch: Pericles Capital (Incoming Quantitative Analyst), Klaviyo Inc. (Strategic Finance Analyst Co-op), Cortex (Data Engineer), Disrupt FinTech Consulting (Director of Consulting & Strategy Lead) — content sourced from the provided résumé data.

- Projects sub-section below experience entries: uppercase "PROJECTS" label, then a responsive 2-column grid of project cards (1 column on mobile), each with a thick top border accent, serif project title, monospace tools/date metadata line, and em-dash bulleted highlights.

- Launch projects: "Markowitz & SIM Stock Analysis" and "Abalone Predictive Modeling," per the provided content — structured as data so additional projects can be added without code changes (see Section 7.1).

### 5.4 Contact (/contact)

- Page kicker: "03 — Contact". Page H1/H2: "Let's talk."

- Three stacked link/info rows, each full-width with hairline borders, large serif left-aligned text and a small monospace right-aligned label: Email (mailto: link), LinkedIn (external link, opens in new tab), Location (static text, not a link).

- Hover state on clickable rows: reduce opacity (~60%) per the original design's style-hover behavior.

- Email address and LinkedIn URL should be pulled from a single content/config source so they're easy to update without touching layout code.

### 5.5 Résumé (/resume)

- Page kicker: "04 — Résumé". Page H1/H2: "The full resume." Inverted color scheme (ink background, cream text/button) per Section 3.1.

- Short supporting copy: "One page. Education, experience, projects, and skills — download the PDF."

- Primary CTA: "Download PDF" button, inverted colors relative to the section (cream button on ink background), opens/downloads the résumé PDF with a descriptive filename (e.g., "Chelsea Kwan Resume.pdf").

- The résumé updates frequently, so the file must be trivially swappable without touching layout/component code — see Section 7.4 for the specific mechanism and update workflow.

## 6. Responsive Design & Accessibility

### 6.1 Responsive Behavior

- The provided design uses fluid clamp()-based type scales and vw-based spacing, which should be preserved as the basis for responsiveness rather than fixed breakpoint overrides wherever possible.

- Two-column layout rows (290px label + content) must collapse to a single stacked column below ~720px viewport width, with the label rendering above its content.

- The Projects grid collapses from 2 columns to 1 column below ~720px.

- Global nav must collapse to a mobile pattern (Section 2.2) below ~640px — this is new scope not covered by the original desktop-oriented prototype and should be flagged for design review before engineering finalizes it.

- Hero name font size and tagline letter-spacing should degrade gracefully on small screens — verify no horizontal overflow/clipping occurs with the longest font (e.g., Bangers, SuperCowboy) at narrow widths.

### 6.2 Accessibility (WCAG 2.1 AA target)

- Maintain sufficient contrast for all 9 theme pairings — most pass AA comfortably (e.g., cream/ink, terminal green/black), but lighter combinations (e.g., Bagel Fat One pink-on-pink) should be checked and adjusted if they fail contrast minimums for body text sizes.

- All interactive elements (nav links, buttons, contact rows) must have visible focus indicators — the current prototype defines hover states but not focus states, and this gap must be closed.

- Semantic HTML: use real heading hierarchy (h1/h2), nav landmark for the nav bar, and button vs. a tags used correctly per their function (buttons for actions like Replay/Download, links for navigation).

- Respect prefers-reduced-motion for the hero animation and nav hover transitions (Section 4.4).

- Alt text/aria-labels for any iconographic elements (e.g., the replay icon, download icon).

## 7. Content Management & Data Architecture

There is no CMS or backend in this site. Content (bio, experience, projects, skills, contact info) is edited directly in the repo's data files. Because of that, the repo's organization carries real weight: file naming, folder structure, and the separation of content from layout need to make it obvious where to find and change any given piece of text without reading component code first.

### 7.1 Structured Content

Content lives in structured data files (JSON or JS modules under a single /content directory) so that updating a job entry, project, or skill is a matter of editing one small, clearly-named file rather than hunting through component/layout code. Recommended data shapes:

- experience.js — array of {company, role, location, dateRange, bullets[]}

- projects.js — array of {title, tools, date, bullets[]}

- education.js — single object {school, department, location, degree, concentration, minor, gpa, awards, courses}

- skills.js — grouped object {programming[], frameworks[], tools[], databases[]}

- personal.js — {interests[], languages[]}

- contact.js — {email, linkedin, location}

### 7.2 Repo Structure & Navigability

The repo should be organized so the owner (or a future contributor) can find any piece of content or any page's code within seconds, without prior context. Recommended top-level structure:

- /content — all structured data files from Section 7.1, grouped by topic, never mixed with components.

- /app (or /pages, depending on Next.js routing style) — one folder per route (about/, work/, contact/, resume/), each containing only that page's top-level component.

- /components — shared, reusable UI pieces (nav bar, two-column row layout, project card, contact row), named after what they render, not where they're used.

- /components/hero — the animated name/theme-cycling feature isolated in its own folder (Section 4), since it's the most complex and most failure-prone piece, and benefits from being easy to locate and reason about independently.

- /public — static assets: résumé PDF, self-hosted fonts, any images.

- A root-level README documenting: where to edit each type of content (pointing to the relevant /content file), how to update the résumé (Section 7.4), and how to run the project locally — so future edits don't require re-deriving the structure from scratch.

- Consistent naming conventions across files and folders (e.g., always singular-topic filenames like experience.js, never mixed conventions like experienceData.js alongside skills-list.js) so the pattern is predictable after seeing two or three files.

- Avoid deeply nested folders for content — flat and shallow is easier to navigate than technically "organized" but deep hierarchies, given the relatively small amount of total content on this site.

### 7.3 Assets

- Résumé PDF stored as a static public asset (e.g., /public/resume.pdf), referenced from a single config value.

- Self-hosted font files (Aston, Dotfont, GROSTE, Super Cowboy) stored under /public/fonts or loaded via next/font/local; confirm licensing permits web embedding/distribution before launch.

- No CMS-managed images in v1 (no project screenshots/photos called for in the current design), but the data structures above should not block adding an optional image field per project later.

### 7.4 Résumé Update Mechanism

The résumé is expected to change frequently (new roles, updated bullets, refreshed dates), more often than other site content. Updating it must not require touching any component code, layout, or the build configuration.

#### Recommended approach: fixed filename, drop-in replacement

- The résumé PDF lives at a single, fixed path — e.g., /public/resume.pdf — referenced from the one config value defined in contact.js or a dedicated resume.js (Section 7.1), never hardcoded inline in a component.

- To publish a new résumé: replace the file at that exact path with the new PDF (same filename), commit, and redeploy. No code changes, no new config, no rebuild logic required beyond the standard deploy.

- The download attribute on the CTA can independently set a friendly downloaded filename (e.g., "Chelsea Kwan Resume.pdf") regardless of the underlying static filename, so the source file itself can stay name-stable even as content changes.

- Optional enhancement: store a single "last updated" date string alongside the path in resume.js and surface it on the /resume page (e.g., "Last updated June 2026") so visitors can gauge freshness — this is a one-line content edit alongside the file swap, not a code change.

#### Why not an in-browser upload tool

An admin/upload page would require authentication, persistent file storage, and a write path into what is otherwise a fully static site (Section 8.4) — meaningful added surface area and a new security consideration, for a task (replacing one file) that a file-drop-and-redeploy workflow already solves in under a minute.

## 8. Non-Functional Requirements

### 8.1 Performance

- Target Lighthouse Performance score ≥ 90 on mobile for all routes.

- Use next/font for all typefaces to avoid render-blocking external font requests and to enable automatic font-display: swap behavior with proper fallback metrics.

- Lazy-load or defer any non-critical JS (the hero animation logic should only load on the home route, not bundled into every page).

- Static generation (SSG) for all routes, since content does not change per-request — this also benefits SEO.

### 8.2 SEO & Sharing

- Each route needs distinct <title> and meta description tags reflecting its content (e.g., /work → "Work & Projects — Chelsea Kwan").

- Open Graph / Twitter Card meta tags for link-preview sharing (LinkedIn, iMessage, etc.), including a static OG image — the animated hero cannot be captured in a static preview, so a designed fallback image is needed.

- Semantic, crawlable HTML content for all bio/experience/project text (avoid rendering critical content only via client-side JS without SSR/SSG).

### 8.3 Browser & Device Support

- Latest two versions of Chrome, Safari, Firefox, Edge on desktop; latest iOS Safari and Android Chrome on mobile.

- Graceful font fallback chain (e.g., "Arial Black", sans-serif / serif) already present in the original design and must be preserved for any environment where a custom font fails to load.

### 8.4 Deployment

- Deployable to Vercel (or equivalent Next.js-compatible host) with no required server-side database.

- Environment-agnostic build — no required environment variables beyond optional analytics keys, if added later.

## 9. Out of Scope for v1 / Future Considerations

- Blog (explicitly excluded per stakeholder decision; data architecture in Section 7 leaves room for adding one later via MDX).

- Testimonials section.

- CMS (git-based, headless, or custom database-backed admin panel) for content editing — only worth revisiting if browser-only (no repo access) editing becomes a requirement, or if a non-technical, non-owner collaborator needs to edit content. For v1, direct repo editing plus the navigable structure in Section 7.2 is sufficient.

- Analytics dashboard or visitor tracking beyond a lightweight, privacy-respecting tool (e.g., Vercel Analytics) if desired post-launch.

- Internationalization/localization.

- Dark/light mode toggle independent of the hero's theme-cycling mechanic (the 9 themes already provide strong visual variety; a separate manual dark-mode toggle is not planned for v1).

- Authenticated in-browser résumé upload tool (vs. the v1 file-drop approach in Section 7.4) — worth revisiting only if update frequency or contributor access needs outgrow direct repo access.

## 10. Open Questions / Risks

- Font licensing: confirm that Aston Script, Dotfont, GROSTE, and Super Cowboy (self-hosted) are licensed for web embedding on a public site, not just for prototyping.

- Mobile nav pattern: the original design has no defined mobile nav treatment — needs a design decision (hamburger vs. stacked links vs. bottom bar) before implementation.

- Contrast on lighter theme pairings (e.g., Bagel Fat One pink/pink): confirm whether minor color adjustments are acceptable to meet AA contrast, or whether brand fidelity should override strict AA compliance for this decorative, secondary state.

- Static OG/share image: needs a one-time design asset since the animated hero can't be represented in a link preview.

- Confirm whether route-based navigation should update the kicker numbering (01–04) to remain, or whether it should be removed now that it no longer reflects literal scroll position.

