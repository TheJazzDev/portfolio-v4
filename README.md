# Portfolio v4

Cinematic personal portfolio for **Taiwo Babarinde** — built with **HTML5, CSS3,
vanilla JavaScript (ES modules), and GSAP**. No framework, no runtime dependencies,
no SSR. Fully static and deployable to any static host.

This is the successor to `portfolio-v3` (a Next.js + Prisma app, "v3.4"). v4 drops
the framework so GSAP can drive a bold, high-energy, cinematic single-scroll
experience.

## Status

**Prep / scaffolding.** The skeleton is standing — structure, design tokens, ported
content, and an animation pipeline proven by the hero reveal. Per-section cinematic
build-out comes next. See [`docs/specs/2026-07-15-portfolio-v4-design.md`](docs/specs/2026-07-15-portfolio-v4-design.md).

## Run locally

```bash
python3 -m http.server 8000   # then open http://localhost:8000
# or: bun run dev
```

A static server is required (ES module imports don't work over `file://`).

## Build

```bash
bun install       # first time (dev minifiers)
bun run build     # minified static site -> dist/
```

## Structure

```
index.html            single long-scroll page
css/                  reset · tokens · base · layout · components ·
                      sections · motion · responsive
js/                   main (entry) · data (ported content) ·
                      hero · about · work · experience · contact ·
                      marquee · reveal · scroll · cursor · splitText · utils
assets/
  vendor/gsap/        vendored GSAP ESM (gsap + ScrollTrigger)
  fonts/  images/
build.js              bun minify -> dist/
docs/specs/           design spec
```

## Content

Ported from `portfolio-v3` (`data/profile.ts` + `data/projects.ts`) into
`js/data.js` as plain JS objects: profile, projects, skills, and experience.

## Motion & accessibility

Motion is progressive enhancement. With JavaScript off, GSAP failed to load, or
`prefers-reduced-motion` on, **all content stays visible** — animations only run
once `js/main.js` confirms GSAP loaded (it then adds `.js-ready` to `<html>`).

## Sections (single scroll)

Hero → About (+ skills marquee) → Selected Work → Experience → Contact.
