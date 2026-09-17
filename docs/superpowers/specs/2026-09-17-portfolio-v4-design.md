# Portfolio v4 Design Spec

Date: 2026-09-17
Status: Approved in chat, pending spec review

## Purpose

A deliberately plain, one-page portfolio. The page itself makes the point: the
owner spends time on client work, not on decorating a portfolio. The work list
carries all the weight.

Title: **Software Engineer** (moving away from "Frontend Engineer").

It must not read as AI-generated. That rules out:

- uppercase mono section labels, eyebrow text, "01 / 02" numbering
- Geist or other template-default fonts, gradients, cards, glows, shadows
- icons and arrow glyphs (↗, →) on links; bullet-dot lists
- copy tells: em dashes, "not X, but Y", forced groups of three,
  "passionate", "crafting", "seamless", "robust", "leverage"

## Replacing the old v4

`portfolio-v4` currently holds the abandoned cinematic GSAP build (local git
repo, no remote). Keep the repo and its history. In one commit, delete all old
files (`index.html`, `css/`, `js/`, `assets/`, `build.js`, `dist/`,
`node_modules/`, `docs/specs/`, old `README.md`, including its uncommitted edit),
then scaffold the new app in the following commits.

## Stack

- Next.js (App Router), static export (`output: 'export'`), React, TypeScript
- Tailwind CSS v4
- bun
- No UI libraries, no icon library, no animation library, no web fonts

## Deployment

- v4 takes `jazzdev.vercel.app`.
- v3 moves to `jazzdev-v3.vercel.app` (done by the owner in Vercel).
- Previous portfolio links: v1 `https://jazzdev-v1.vercel.app`,
  v2 `https://jazzdev-v2.vercel.app`, v3 `https://jazzdev-v3.vercel.app`.

## Pages

### `/` (the portfolio)

A single column, `max-w-2xl`, 16px side gutter on mobile. In order:

1. **Intro**: name (the largest text on the page, `text-xl sm:text-2xl`),
   "Software Engineer, Lagos, Nigeria", two short sentences, then plain text
   links: Email, GitHub, LinkedIn, Resume.
2. **Selected work**: heading in normal sentence case, then 9 entries.
3. **Earlier work**: a single wrapped line of linked names separated by commas.
4. **Tools and open source**: the same format.
5. **Footer**: "Previous versions of this site: v1, v2, v3." plus the year.

Entry layout:

```
Settrium                                         2026–now
Lead engineer
<description paragraph>
<notes paragraph>
Next.js, NestJS, Prisma, PostgreSQL, Redis, Turborepo
settrium.com
```

- Title on the left, years on the right (`tabular-nums`, muted), stacking on
  very narrow screens.
- Role, stack and links are muted, smaller text (`text-xs sm:text-sm`).
- Links use the domain as their text (e.g. `settrium.com`), underlined on hover.
- Entries are separated by space and a thin rule. Everything is visible, with no
  expand/collapse.

### `/resume` (ported from v3)

- Content copied from `portfolio-v3/app/resume/page.tsx` as-is, except:
  headline becomes "Software Engineer", the portfolio link points to
  `jazzdev.vercel.app`, emojis are removed, and section headings become normal
  sentence-case headings instead of black uppercase bars.
- Same visual language as `/`. A "Download PDF" text button calls
  `window.print()` (the only client component). Print CSS carries over from v3.
- Refreshing the resume content (adding Settrium, Blocnet) is a separate task.

## Visual style

- Font: Tailwind's default `font-sans` system stack. Nothing to load.
- Colour: tokens in `globals.css` via `@theme`: background, text, muted text,
  rule, and one link colour. Light by default, dark via
  `prefers-color-scheme`. No toggle.
- Sizes follow the mobile-first rules: body `text-sm sm:text-base`, section
  headings `text-base sm:text-lg` with medium weight, entry padding
  `py-5 sm:py-6`, page padding `py-10 sm:py-16`.
- No motion apart from the link hover underline.

## Code structure

```
app/
  layout.tsx          metadata, Open Graph, html/body
  page.tsx            composes the home sections
  resume/page.tsx     composes the resume sections
  globals.css         tailwind import, tokens, print rules
components/
  home/intro.tsx
  home/section.tsx            heading + children
  home/project-entry.tsx
  home/inline-link-list.tsx   earlier work and tools lines
  home/site-footer.tsx
  resume/resume-header.tsx
  resume/resume-section.tsx
  resume/experience-item.tsx
  resume/print-button.tsx     'use client'
  ui/text-link.tsx            shared external/internal link
data/
  profile.ts        name, title, location, intro, contact links
  selected-work.ts  the 9 entries
  earlier-work.ts
  tools.ts
  past-versions.ts
  resume.ts         resume content as data
lib/
  types.ts
```

Types:

```ts
type Link = { label: string; href: string };

type Project = {
  id: string;
  title: string;
  years: string;          // "2024–now"
  role: string;
  description: string;
  notes?: string;
  stack: string[];
  links: Link[];          // empty means no links row
};
```

Adding a project means adding one object to `data/selected-work.ts`, in
display order.

## Content

### Intro

> Taiwo Babarinde
> Software Engineer, Lagos, Nigeria
>
> I build web and mobile products for clients, usually the whole thing: the
> database, the API and the screens people use. I spend my time on that work,
> so this page is just a list of it.

Email `babsman4all@gmail.com`, GitHub `github.com/TheJazzDev`,
LinkedIn `linkedin.com/in/taiwo-babarinde`, Resume `/resume`.

### Selected work (in order)

**1. Settrium** · 2026–now · Lead engineer
An ERP platform, starting with procurement: budgets, purchasing, vendors,
contracts and goods receipt. Every customer organisation gets its own Postgres
database, and figures like committed or remaining budget are worked out from
transactions when they are read, never stored.
Notes: One deployable app with lint-enforced boundaries between business
suites, so any suite can be split out later. Sign-in happens on each
organisation's own subdomain; there is no shared login page.
Stack: Next.js, NestJS, Prisma, PostgreSQL, Redis, BullMQ, Cloudflare R2, Turborepo
Links: settrium.com

**2. Blocnet** · 2024–now · Founder
A social network for crypto projects. People find projects, follow their
updates, earn through mining and quests, and tip each other from an in-app
wallet.
Notes: A NestJS API of about 40 modules sits behind a Flutter app and a
Next.js console for moderation. A separate Python service reviews and tags
content with LLMs and switches provider when one fails. The BNT token contract
is written in Solidity.
Stack: NestJS, Prisma, PostgreSQL, Flutter, Next.js, Python, Solidity
Links: blocnet.app

**3. Digit Tally** · 2024–now · Lead frontend engineer, Candour IT Services
Accounting software with 50+ business users, split into eight apps (sales,
suppliers, inventory, accounting, payroll and others) that deploy on their own.
Notes: I led four frontend developers and connected 300+ API endpoints. We
published our shared components, utilities and a login CLI to npm. Invoices
and payslips are rendered to PDF on the server with Playwright.
Stack: Next.js, TypeScript, TanStack Query, Redux, Turborepo, Playwright
Links: digit-tally.io

**4. Food Junkee** · 2025–2026 · Full-stack developer, contract
Online ordering for African and Caribbean food in the UK, plus a van service
that visits 40+ workplaces.
Notes: Stripe checkout confirmed by webhook, and DPD shipping that prints
labels straight to a thermal printer. The admin side has roles, activity logs,
promo codes and sales charts. I wrote the DPD client and published it as
@jazzdev/dpd-local-sdk.
Stack: Next.js, Firebase, Stripe, Zustand, React Query, Upstash Redis, Resend
Links: foodjunkee.co.uk

**5. 67 Humanitarian Foundation** · 2025–2026 · Full-stack developer
Member and donation platform for the Nigerian Army 67 Intake, holding records
for 3,600+ members across all 36 states.
Notes: Four admin roles, with an audit log of every change. Bulk CSV import,
Stripe donations, news posts and memorial pages for fallen members.
Stack: Next.js, Prisma, PostgreSQL, NextAuth, Stripe, Cloudinary
Links: 67hf.org (currently returns 404; omit until it is back)

**6. Valley of Mercy church app** · 2025 · Lead engineer
A mobile app for church members and a web admin for staff. Members get
sermons, prayer requests, programmes and announcements. Staff manage people
and content.
Notes: The app works offline and queues actions until the phone reconnects.
Push notifications, plus points, badges and streaks for engagement.
Stack: React Native, Expo, Next.js, Firebase, Redux Toolkit, NativeWind
Links: none

**7. Asiko Foods** · 2026–now · Full-stack developer
Food commerce for retail shoppers and wholesale trade buyers. Retail,
wholesale, catalogue and admin are separate Next.js apps sharing one design
system.
Notes: The wholesale app has its own sign-in, catalogue and ordering flow.
Shared UI, API client, config and helpers live in internal packages.
Stack: Next.js, React, Zustand, Zod, Tailwind CSS, Turborepo
Links: none

**8. Olamide Sax** · 2026 · Frontend developer
Website for a UK-based Afro-fusion multi-instrumentalist, winner of Best
Instrumentalist at the Eko Heritage Awards 2026. Built twice.
Notes: The current site is plain HTML, CSS and JavaScript with GSAP, with no
framework and no build step, and every page still works with JavaScript off.
The first version was Next.js with a small CMS so the artist could upload
videos, photos and press coverage.
Stack: HTML, CSS, JavaScript, GSAP, Next.js, Prisma
Links: olamidesax.co.uk, first version (v1.olamidesax.co.uk)

**9. OHC FC** · 2026, in progress · Full-stack developer
Website for OHC FC, a UK football club. When the club publishes a lineup, the
site shows it on a pitch with player photos and shirt numbers.
Notes: Staff build lineups by picking a formation and filling its positions.
Players without a photo get an illustrated avatar.
Stack: Next.js, Prisma, PostgreSQL, NextAuth, Vercel Blob
Links: none yet

### Earlier work

VastFluid DEX (landing-page-tan-nine-56.vercel.app), TypeGuru
(typeguru-jazzdev.vercel.app), Homely (app-homely.netlify.app), Candour IT
Services (candour-website.vercel.app), Larry Wind (larrywind.vercel.app),
MM Plumbing (mm-plumbing.vercel.app), Gebu Works (gebuworks.vercel.app),
Mr Oshodi (mr-oshodi.vercel.app), Crappo (app-ldiev-crappo.netlify.app).

Deft Trader is left out because defttrader.com no longer responds.

### Tools and open source

@candourorg/components, @candourorg/utils, @candourorg/cli (npm links from
v3 data), @jazzdev/dpd-local-sdk (npm), Dark Jazz VS Code theme (marketplace
link from v3 data).

## Metadata

- Title: "Taiwo Babarinde, Software Engineer"
- Description: the first intro sentence
- Open Graph: title and description only (no generated image)
- Favicons copied from `portfolio-v3/public`

## Verification

- `bun run build` produces the static export with no errors; `bun run lint`
  is clean.
- Every external link returns 2xx/3xx (a small script under `scripts/`;
  npm 403s to bots are accepted).
- Checked in the browser at 375px and 1280px, in light and dark mode.
- `/resume` prints to a clean PDF.
- Copy review against the "not AI-ish" list above.

## Out of scope

Animations, theme toggle, contact form, analytics, project detail pages,
filters, images, CMS, resume content refresh.
