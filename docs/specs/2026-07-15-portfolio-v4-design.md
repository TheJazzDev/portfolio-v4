# Portfolio v4 — Design Spec

**Date:** 2026-07-15
**Status:** Prep / scaffolding phase
**Owner:** Taiwo Babarinde (TheJazzDev)

## Purpose

v4 is a cinematic rewrite of the personal portfolio (currently `portfolio-v3`, a
Next.js + Prisma + admin-CMS app referred to as v3.4). v4 drops the framework in
favour of plain **HTML5 + CSS3 + vanilla JavaScript (ES modules) + GSAP**, so GSAP
can be used to its fullest for a bold, high-energy, cinematic experience. No
framework, no runtime dependencies, no SSR — a fully static site.

## Aesthetic direction

**Bold / high-energy developer showcase.**

- Dark base (near-black `#0a0a0a`, consistent with v3) with one or two vivid
  signature accent colours.
- Big, bold **sans** display type; monospace for labels, tags, and code-like detail.
- Kinetic, confident motion: split-text reveals, horizontal marquees,
  scroll-pinned sections, magnetic custom cursor, fast decisive transitions.
- Cinematic but unmistakably an engineer's site (subtle tech / glitch touches).
- Motion is progressive enhancement: with JS off or `prefers-reduced-motion`, all
  content stays visible and legible — nothing is hidden behind animation.

## Tech & architecture

- **HTML5 + CSS3 + vanilla JS ES modules + GSAP** (ScrollTrigger, SplitText, etc.),
  self-hosted / vendored — no CDN, no npm runtime deps.
- **Single long immersive scroll** — one `index.html`.
- Fresh, portfolio-tailored structure (NOT a copy of the Olamide Sax v2 artist
  site, but the same proven layering idea: modular CSS layers, ES-module JS split
  by concern, vendored GSAP, a `build.js` minifier).
- **Build:** small `build.js` (bun) minifies HTML/CSS/JS into `dist/` for deploy.

### Directory structure

```
portfolio-v4/
  index.html
  css/
    reset.css        base reset
    tokens.css       colour, type scale, spacing, motion vars (dark + accent)
    base.css         typography + global elements
    layout.css       grid, container, section scaffolding
    components.css   buttons, cards, nav, marquee, cursor
    sections.css     per-section styles (hero, work, about, experience, contact)
    motion.css       animation support / reduced-motion
    responsive.css   mobile-first breakpoints
  js/
    main.js          entry: init modules, register GSAP plugins
    data.js          ported profile / projects / skills / experience
    cursor.js        magnetic custom cursor
    splitText.js     text-reveal helper
    scroll.js        smooth scroll + ScrollTrigger setup
    hero.js work.js about.js experience.js contact.js
    marquee.js reveal.js utils.js
  assets/  fonts/ (self-hosted woff2) · images/ · vendor/ (GSAP)
  build.js           bun minify -> dist/
  README.md
```

## Section lineup (single scroll)

1. **Hero** — name + role, kinetic split-text headline, animated intro, magnetic CTA.
2. **About / Intro** — short bio + a scrolling skills marquee.
3. **Selected Work** — projects as scroll-pinned cinematic cards (Settrium, Asiko,
   Olamide Sax, Food Junkee lead). Click → detail overlay. Data ported from v3.
4. **Experience / Evolution** — timeline of roles, scroll-revealed.
5. **Contact** — bold call-to-action, email + socials, closing marquee.

## Content

Content is **reused from v3** (`portfolio-v3/data/profile.ts` + `projects.ts`) but
the section lineup is rethought for the cinematic format. All profile, project,
skills, and experience data is ported into `js/data.js` as plain JS objects.

## Prep scope (this pass)

Get the skeleton standing — NOT the full cinematic build:

1. Create `portfolio-v4/` sibling dir + `git init`. ✅
2. Scaffold folder structure + stub files.
3. `index.html` with semantic section shells.
4. `tokens.css` (dark theme + accent + type scale) and `reset.css`.
5. Port v3 content -> `js/data.js`.
6. Vendor GSAP, wire `main.js` to register plugins + a hero reveal to prove the
   pipeline end to end.
7. `build.js` + `README.md`.

Then iterate section-by-section in later passes.

## Out of scope (for now)

- Full per-section cinematic animation build-out.
- Real project imagery / video assets.
- Deployment config.
- Any change to `portfolio-v3` (v3.4 stays as-is until v4 is ready to replace it).
