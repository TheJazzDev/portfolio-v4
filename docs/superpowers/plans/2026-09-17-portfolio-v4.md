# Portfolio v4 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the old cinematic v4 with a plain, one-page Next.js portfolio plus a ported `/resume` page.

**Architecture:** Next.js App Router with static export. All copy lives in typed data files under `data/`; small presentational components under `components/` render it. A `bun test` suite guards the content rules (link formats, banned AI-ish copy), and a script checks external links.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, bun 1.2.

**Spec:** `docs/superpowers/specs/2026-09-17-portfolio-v4-design.md`

## Global Constraints

- Repo: `/Users/jazzdev/Documents/Programming/portfolio-v4` (local git, no remote, branch `main`). Keep its history.
- Package manager: bun (`bunx`, never `npx`).
- No UI, icon, animation or font libraries. Font is Tailwind's default `font-sans`.
- Tailwind v4 class names only (`shrink-0`, `bg-linear-to-r`, etc.). Mobile-first: body `text-sm sm:text-base`; never unprefixed large sizes.
- Home page copy must not contain: em dash `—`, "passionate", "crafting", "seamless", "robust", "leverage". No uppercase labels, no arrow glyphs (`↗`, `→`), no icons.
- `/resume` content is copied from v3 as-is except: headline "Software Engineer", portfolio link `https://jazzdev.vercel.app`, no emojis, sentence-case headings, typo "lunch" fixed to "launch".
- Only client component: `components/resume/print-button.tsx`.
- Do not link `67hf.org` (currently 404).
- Every commit message ends with:
  `Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>`

## File Map

```
app/layout.tsx                    html/body, metadata, icons
app/page.tsx                      home page composition
app/resume/page.tsx               resume composition
app/globals.css                   tailwind import, colour tokens, print rules
components/ui/text-link.tsx       internal/external/mailto link
components/ui/inline-link-list.tsx  links joined by a separator
components/home/intro.tsx
components/home/section.tsx
components/home/project-entry.tsx
components/home/site-footer.tsx
components/resume/resume-header.tsx
components/resume/resume-section.tsx
components/resume/experience-item.tsx
components/resume/print-button.tsx
data/profile.ts
data/selected-work.ts
data/earlier-work.ts
data/tools.ts
data/past-versions.ts
data/resume.ts
lib/types.ts
tests/content.test.ts
scripts/check-links.ts
public/  favicons copied from portfolio-v3/public
```

---

### Task 1: Remove the old build and scaffold Next.js

**Files:**
- Delete: `index.html`, `css/`, `js/`, `assets/`, `build.js`, `bun.lock`, `package.json`, `docs/specs/`, `README.md`, `dist/`, `node_modules/`
- Create: Next.js scaffold (`package.json`, `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `postcss.config.mjs`, `app/*`, `.gitignore`)
- Create: `README.md`

**Interfaces:**
- Produces: a building Next.js app with the `@/*` import alias mapped to the repo root.

- [ ] **Step 1: Delete the old build in one commit**

```bash
cd /Users/jazzdev/Documents/Programming/portfolio-v4
git rm -rf -q index.html css js assets build.js bun.lock package.json docs/specs README.md
rm -rf dist node_modules .DS_Store
git commit -q -m "Remove cinematic v4 build

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>"
ls -A
```
Expected: only `.git`, `.gitignore`, `docs` remain.

- [ ] **Step 2: Scaffold into a temp dir and copy in**

`create-next-app` refuses non-empty directories, so scaffold elsewhere.

```bash
TMP=$(mktemp -d)
cd "$TMP" && bunx create-next-app@16 site --ts --tailwind --eslint --app --no-src-dir --import-alias "@/*" --use-bun --turbopack --yes
cd site && rm -rf node_modules .git README.md public/*.svg
cp -R . /Users/jazzdev/Documents/Programming/portfolio-v4/
cd /Users/jazzdev/Documents/Programming/portfolio-v4 && bun install
```

If the flags are rejected by this version, run `bunx create-next-app@16 --help` and use the equivalent flags. Result must be: TypeScript, Tailwind, ESLint, App Router, no `src/`, alias `@/*`.

- [ ] **Step 3: Set static export**

Replace `next.config.ts` with:

```ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
};

export default nextConfig;
```

- [ ] **Step 4: Add scripts**

In `package.json` `scripts`, make sure these exist (keep `dev`, `build`, `start`, `lint` from the scaffold):

```json
"test": "bun test",
"check-links": "bun scripts/check-links.ts"
```

- [ ] **Step 5: Write README**

`README.md`:

```md
# portfolio-v4

A plain one-page portfolio. Content lives in `data/`.

- `bun dev` to run locally
- `bun run build` for the static export (`out/`)
- `bun test` checks the content rules
- `bun run check-links` checks every external link

To add a project, add an object to `data/selected-work.ts`. Entries render in array order.
```

- [ ] **Step 6: Verify and commit**

Run: `bun run build`
Expected: build succeeds and creates `out/index.html`.

Make sure `.gitignore` contains `out/` and `node_modules/` (the scaffold's file does; merge in `.DS_Store` and `.history/` from the old one if missing).

```bash
git add -A
git commit -q -m "Scaffold Next.js app with static export

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>"
```

---

### Task 2: Types, content data and content tests

**Files:**
- Create: `lib/types.ts`, `data/profile.ts`, `data/selected-work.ts`, `data/earlier-work.ts`, `data/tools.ts`, `data/past-versions.ts`
- Test: `tests/content.test.ts`

**Interfaces:**
- Produces:
  - `SiteLink = { label: string; href: string }`
  - `Project = { id; title; years; role; description; notes?; stack: string[]; links: SiteLink[] }`
  - `profile: { name; title; location; summary; intro; contacts: SiteLink[] }`
  - `selectedWork: Project[]`, `earlierWork: SiteLink[]`, `tools: SiteLink[]`, `pastVersions: SiteLink[]`

- [ ] **Step 1: Write the types**

`lib/types.ts`:

```ts
export type SiteLink = {
  label: string;
  href: string;
};

export type Project = {
  id: string;
  title: string;
  years: string;
  role: string;
  description: string;
  notes?: string;
  stack: string[];
  links: SiteLink[];
};
```

- [ ] **Step 2: Write the failing test**

`tests/content.test.ts`:

```ts
import { describe, expect, test } from 'bun:test';
import { profile } from '@/data/profile';
import { selectedWork } from '@/data/selected-work';
import { earlierWork } from '@/data/earlier-work';
import { tools } from '@/data/tools';
import { pastVersions } from '@/data/past-versions';
import type { SiteLink } from '@/lib/types';

const homeContent = { profile, selectedWork, earlierWork, tools, pastVersions };

function collectStrings(value: unknown): string[] {
  if (typeof value === 'string') return [value];
  if (Array.isArray(value)) return value.flatMap(collectStrings);
  if (value && typeof value === 'object') {
    return Object.values(value).flatMap(collectStrings);
  }
  return [];
}

const allLinks: SiteLink[] = [
  ...profile.contacts,
  ...selectedWork.flatMap((project) => project.links),
  ...earlierWork,
  ...tools,
  ...pastVersions,
];

describe('home content', () => {
  test('lists the nine selected projects in order', () => {
    expect(selectedWork.map((project) => project.id)).toEqual([
      'settrium',
      'blocnet',
      'digit-tally',
      'food-junkee',
      '67-humanitarian-foundation',
      'valley-of-mercy',
      'asiko-foods',
      'olamide-sax',
      'ohc-fc',
    ]);
  });

  test('project ids are unique', () => {
    const ids = selectedWork.map((project) => project.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  test('every link is https, mailto or an internal path', () => {
    for (const link of allLinks) {
      expect(link.href).toMatch(/^(https:\/\/|mailto:|\/)/);
    }
  });

  test('does not link the offline 67hf.org site', () => {
    expect(allLinks.some((link) => link.href.includes('67hf.org'))).toBe(false);
  });

  test('copy avoids em dashes and stock phrases', () => {
    const banned = [/—/, /passionate/i, /crafting/i, /seamless/i, /robust/i, /leverage/i, /↗|→/];
    for (const text of collectStrings(homeContent)) {
      for (const pattern of banned) {
        expect({ text, match: pattern.test(text) }).toEqual({ text, match: false });
      }
    }
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `bun test`
Expected: FAIL, cannot resolve `@/data/profile`.

- [ ] **Step 4: Write the data files**

`data/profile.ts`:

```ts
import type { SiteLink } from '@/lib/types';

const summary =
  'I build web and mobile products for clients, usually the whole thing: the database, the API and the screens people use.';

export const profile = {
  name: 'Taiwo Babarinde',
  title: 'Software Engineer',
  location: 'Lagos, Nigeria',
  summary,
  intro: `${summary} I spend my time on that work, so this page is just a list of it.`,
  contacts: [
    { label: 'Email', href: 'mailto:babsman4all@gmail.com' },
    { label: 'GitHub', href: 'https://github.com/TheJazzDev' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/taiwo-babarinde/' },
    { label: 'Resume', href: '/resume' },
  ] satisfies SiteLink[],
};
```

`data/selected-work.ts`:

```ts
import type { Project } from '@/lib/types';

export const selectedWork: Project[] = [
  {
    id: 'settrium',
    title: 'Settrium',
    years: '2026–now',
    role: 'Lead engineer',
    description:
      'An ERP platform, starting with procurement: budgets, purchasing, vendors, contracts and goods receipt. Every customer organisation gets its own Postgres database, and figures like committed or remaining budget are worked out from transactions when they are read, never stored.',
    notes:
      "One deployable app with lint-enforced boundaries between business suites, so any suite can be split out later. Sign-in happens on each organisation's own subdomain; there is no shared login page.",
    stack: ['Next.js', 'NestJS', 'Prisma', 'PostgreSQL', 'Redis', 'BullMQ', 'Cloudflare R2', 'Turborepo'],
    links: [{ label: 'settrium.com', href: 'https://settrium.com' }],
  },
  {
    id: 'blocnet',
    title: 'Blocnet',
    years: '2024–now',
    role: 'Founder',
    description:
      'A social network for crypto projects. People find projects, follow their updates, earn through mining and quests, and tip each other from an in-app wallet.',
    notes:
      'A NestJS API of about 40 modules sits behind a Flutter app and a Next.js console for moderation. A separate Python service reviews and tags content with LLMs and switches provider when one fails. The BNT token contract is written in Solidity.',
    stack: ['NestJS', 'Prisma', 'PostgreSQL', 'Flutter', 'Next.js', 'Python', 'Solidity'],
    links: [{ label: 'blocnet.app', href: 'https://blocnet.app' }],
  },
  {
    id: 'digit-tally',
    title: 'Digit Tally',
    years: '2024–now',
    role: 'Lead frontend engineer, Candour IT Services',
    description:
      'Accounting software with 50+ business users, split into eight apps (sales, suppliers, inventory, accounting, payroll and others) that deploy on their own.',
    notes:
      'I led four frontend developers and connected 300+ API endpoints. We published our shared components, utilities and a login CLI to npm. Invoices and payslips are rendered to PDF on the server with Playwright.',
    stack: ['Next.js', 'TypeScript', 'TanStack Query', 'Redux', 'Turborepo', 'Playwright'],
    links: [{ label: 'digit-tally.io', href: 'https://digit-tally.io' }],
  },
  {
    id: 'food-junkee',
    title: 'Food Junkee',
    years: '2025–2026',
    role: 'Full-stack developer, contract',
    description:
      'Online ordering for African and Caribbean food in the UK, plus a van service that visits 40+ workplaces.',
    notes:
      'Stripe checkout confirmed by webhook, and DPD shipping that prints labels straight to a thermal printer. The admin side has roles, activity logs, promo codes and sales charts. I wrote the DPD client and published it as @jazzdev/dpd-local-sdk.',
    stack: ['Next.js', 'Firebase', 'Stripe', 'Zustand', 'React Query', 'Upstash Redis', 'Resend'],
    links: [{ label: 'foodjunkee.co.uk', href: 'https://foodjunkee.co.uk' }],
  },
  {
    id: '67-humanitarian-foundation',
    title: '67 Humanitarian Foundation',
    years: '2025–2026',
    role: 'Full-stack developer',
    description:
      'Member and donation platform for the Nigerian Army 67 Intake, holding records for 3,600+ members across all 36 states.',
    notes:
      'Four admin roles, with an audit log of every change. Bulk CSV import, Stripe donations, news posts and memorial pages for fallen members.',
    stack: ['Next.js', 'Prisma', 'PostgreSQL', 'NextAuth', 'Stripe', 'Cloudinary'],
    links: [],
  },
  {
    id: 'valley-of-mercy',
    title: 'Valley of Mercy church app',
    years: '2025',
    role: 'Lead engineer',
    description:
      'A mobile app for church members and a web admin for staff. Members get sermons, prayer requests, programmes and announcements. Staff manage people and content.',
    notes:
      'The app works offline and queues actions until the phone reconnects. Push notifications, plus points, badges and streaks for engagement.',
    stack: ['React Native', 'Expo', 'Next.js', 'Firebase', 'Redux Toolkit', 'NativeWind'],
    links: [],
  },
  {
    id: 'asiko-foods',
    title: 'Asiko Foods',
    years: '2026–now',
    role: 'Full-stack developer',
    description:
      'Food commerce for retail shoppers and wholesale trade buyers. Retail, wholesale, catalogue and admin are separate Next.js apps sharing one design system.',
    notes:
      'The wholesale app has its own sign-in, catalogue and ordering flow. Shared UI, API client, config and helpers live in internal packages.',
    stack: ['Next.js', 'React', 'Zustand', 'Zod', 'Tailwind CSS', 'Turborepo'],
    links: [],
  },
  {
    id: 'olamide-sax',
    title: 'Olamide Sax',
    years: '2026',
    role: 'Frontend developer',
    description:
      'Website for a UK-based Afro-fusion multi-instrumentalist, winner of Best Instrumentalist at the Eko Heritage Awards 2026. Built twice.',
    notes:
      'The current site is plain HTML, CSS and JavaScript with GSAP, with no framework and no build step, and every page still works with JavaScript off. The first version was Next.js with a small CMS so the artist could upload videos, photos and press coverage.',
    stack: ['HTML', 'CSS', 'JavaScript', 'GSAP', 'Next.js', 'Prisma'],
    links: [
      { label: 'olamidesax.co.uk', href: 'https://olamidesax.co.uk' },
      { label: 'first version', href: 'https://v1.olamidesax.co.uk' },
    ],
  },
  {
    id: 'ohc-fc',
    title: 'OHC FC',
    years: '2026, in progress',
    role: 'Full-stack developer',
    description:
      'Website for OHC FC, a UK football club. When the club publishes a lineup, the site shows it on a pitch with player photos and shirt numbers.',
    notes:
      'Staff build lineups by picking a formation and filling its positions. Players without a photo get an illustrated avatar.',
    stack: ['Next.js', 'Prisma', 'PostgreSQL', 'NextAuth', 'Vercel Blob'],
    links: [],
  },
];
```

`data/earlier-work.ts`:

```ts
import type { SiteLink } from '@/lib/types';

export const earlierWork: SiteLink[] = [
  { label: 'VastFluid DEX', href: 'https://landing-page-tan-nine-56.vercel.app/' },
  { label: 'TypeGuru', href: 'https://typeguru-jazzdev.vercel.app/' },
  { label: 'Homely', href: 'https://app-homely.netlify.app/' },
  { label: 'Candour IT Services', href: 'https://candour-website.vercel.app/' },
  { label: 'Larry Wind', href: 'https://larrywind.vercel.app/' },
  { label: 'MM Plumbing', href: 'https://mm-plumbing.vercel.app/' },
  { label: 'Gebu Works', href: 'https://gebuworks.vercel.app/' },
  { label: 'Mr Oshodi', href: 'https://mr-oshodi.vercel.app/' },
  { label: 'Crappo', href: 'https://app-ldiev-crappo.netlify.app/' },
];
```

`data/tools.ts`:

```ts
import type { SiteLink } from '@/lib/types';

export const tools: SiteLink[] = [
  { label: '@candourorg/components', href: 'https://www.npmjs.com/package/@candourorg/components' },
  { label: '@candourorg/utils', href: 'https://www.npmjs.com/package/@candourorg/utils' },
  { label: '@candourorg/cli', href: 'https://www.npmjs.com/package/@candourorg/cli' },
  { label: '@jazzdev/dpd-local-sdk', href: 'https://www.npmjs.com/package/@jazzdev/dpd-local-sdk' },
  {
    label: 'Dark Jazz VS Code theme',
    href: 'https://marketplace.visualstudio.com/items?itemName=TaiwoJazz.dark-jazz',
  },
];
```

`data/past-versions.ts`:

```ts
import type { SiteLink } from '@/lib/types';

export const pastVersions: SiteLink[] = [
  { label: 'v1', href: 'https://jazzdev-v1.vercel.app' },
  { label: 'v2', href: 'https://jazzdev-v2.vercel.app' },
  { label: 'v3', href: 'https://jazzdev-v3.vercel.app' },
];
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `bun test`
Expected: 5 pass, 0 fail.

- [ ] **Step 6: Commit**

```bash
git add lib data tests
git commit -q -m "Add portfolio content data and content rule tests

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>"
```

---

### Task 3: Home page

**Files:**
- Create: `components/ui/text-link.tsx`, `components/ui/inline-link-list.tsx`, `components/home/intro.tsx`, `components/home/section.tsx`, `components/home/project-entry.tsx`, `components/home/site-footer.tsx`
- Modify (replace): `app/globals.css`, `app/layout.tsx`, `app/page.tsx`
- Create: `public/` favicons

**Interfaces:**
- Consumes: everything produced by Task 2.
- Produces: `TextLink({ href, children, className? })`, `InlineLinkList({ links, separator?, className? })` (renders a `<span>`), `Section({ title, children })`, used again by Task 4.

- [ ] **Step 1: Colour tokens and base styles**

`app/globals.css`:

```css
@import 'tailwindcss';

@theme {
  --color-page: #fbfbfa;
  --color-ink: #1c1c1a;
  --color-muted: #6b6b66;
  --color-rule: #e4e4e0;
  --color-accent: #1f4fbf;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-page: #121211;
    --color-ink: #e8e8e4;
    --color-muted: #9a9a94;
    --color-rule: #2a2a28;
    --color-accent: #8fb0ff;
  }
}

@media print {
  :root {
    --color-page: #ffffff;
    --color-ink: #000000;
    --color-muted: #444444;
    --color-rule: #cccccc;
    --color-accent: #000000;
  }

  @page {
    margin: 12mm;
  }

  a {
    text-decoration: none;
  }

  h2,
  h3 {
    break-after: avoid;
  }

  li {
    break-inside: avoid;
  }
}
```

- [ ] **Step 2: Shared link components**

`components/ui/text-link.tsx`:

```tsx
import Link from 'next/link';
import type { ReactNode } from 'react';

type TextLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

export function TextLink({ href, children, className = '' }: TextLinkProps) {
  const classes = `text-accent underline-offset-4 hover:underline ${className}`;

  if (href.startsWith('/')) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  const opensNewTab = href.startsWith('http');

  return (
    <a
      href={href}
      className={classes}
      {...(opensNewTab && { target: '_blank', rel: 'noopener noreferrer' })}>
      {children}
    </a>
  );
}
```

`components/ui/inline-link-list.tsx`:

```tsx
import { Fragment } from 'react';
import type { SiteLink } from '@/lib/types';
import { TextLink } from './text-link';

type InlineLinkListProps = {
  links: SiteLink[];
  separator?: string;
  className?: string;
};

export function InlineLinkList({ links, separator = ', ', className }: InlineLinkListProps) {
  return (
    <span className={className}>
      {links.map((link, index) => (
        <Fragment key={link.href}>
          {index > 0 && separator}
          <TextLink href={link.href}>{link.label}</TextLink>
        </Fragment>
      ))}
    </span>
  );
}
```

- [ ] **Step 3: Home components**

`components/home/intro.tsx`:

```tsx
import { profile } from '@/data/profile';
import { InlineLinkList } from '@/components/ui/inline-link-list';

export function Intro() {
  return (
    <header>
      <h1 className='text-xl font-semibold sm:text-2xl'>{profile.name}</h1>
      <p className='mt-1 text-muted'>
        {profile.title}, {profile.location}
      </p>
      <p className='mt-5 leading-relaxed'>{profile.intro}</p>
      <p className='mt-4'>
        <InlineLinkList links={profile.contacts} separator=' · ' />
      </p>
    </header>
  );
}
```

`components/home/section.tsx`:

```tsx
import type { ReactNode } from 'react';

type SectionProps = {
  title: string;
  children: ReactNode;
};

export function Section({ title, children }: SectionProps) {
  return (
    <section className='mt-10 sm:mt-14'>
      <h2 className='text-base font-medium sm:text-lg'>{title}</h2>
      {children}
    </section>
  );
}
```

`components/home/project-entry.tsx`:

```tsx
import type { Project } from '@/lib/types';
import { InlineLinkList } from '@/components/ui/inline-link-list';

export function ProjectEntry({ project }: { project: Project }) {
  return (
    <article className='border-t border-rule py-5 first:border-t-0 sm:py-6'>
      <div className='flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4'>
        <h3 className='font-medium'>{project.title}</h3>
        <p className='shrink-0 text-xs text-muted tabular-nums sm:text-sm'>{project.years}</p>
      </div>
      <p className='mt-0.5 text-xs text-muted sm:text-sm'>{project.role}</p>
      <p className='mt-3 leading-relaxed'>{project.description}</p>
      {project.notes && <p className='mt-2 leading-relaxed'>{project.notes}</p>}
      <p className='mt-3 text-xs text-muted sm:text-sm'>{project.stack.join(', ')}</p>
      {project.links.length > 0 && (
        <p className='mt-1 text-xs sm:text-sm'>
          <InlineLinkList links={project.links} />
        </p>
      )}
    </article>
  );
}
```

`components/home/site-footer.tsx`:

```tsx
import { profile } from '@/data/profile';
import { pastVersions } from '@/data/past-versions';
import { InlineLinkList } from '@/components/ui/inline-link-list';

export function SiteFooter() {
  return (
    <footer className='mt-12 border-t border-rule pt-6 text-xs text-muted sm:mt-16 sm:text-sm'>
      <p>
        Previous versions of this site: <InlineLinkList links={pastVersions} />.
      </p>
      <p className='mt-1'>
        © {new Date().getFullYear()} {profile.name}
      </p>
    </footer>
  );
}
```

- [ ] **Step 4: Layout and page**

`app/layout.tsx`:

```tsx
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { profile } from '@/data/profile';
import './globals.css';

const title = `${profile.name}, ${profile.title}`;

export const metadata: Metadata = {
  metadataBase: new URL('https://jazzdev.vercel.app'),
  title,
  description: profile.summary,
  openGraph: { title, description: profile.summary, type: 'website' },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <body className='bg-page font-sans text-sm text-ink antialiased sm:text-base'>
        {children}
      </body>
    </html>
  );
}
```

`app/page.tsx`:

```tsx
import { Intro } from '@/components/home/intro';
import { Section } from '@/components/home/section';
import { ProjectEntry } from '@/components/home/project-entry';
import { SiteFooter } from '@/components/home/site-footer';
import { InlineLinkList } from '@/components/ui/inline-link-list';
import { selectedWork } from '@/data/selected-work';
import { earlierWork } from '@/data/earlier-work';
import { tools } from '@/data/tools';

export default function HomePage() {
  return (
    <main className='mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-16'>
      <Intro />

      <Section title='Selected work'>
        <div className='mt-1'>
          {selectedWork.map((project) => (
            <ProjectEntry key={project.id} project={project} />
          ))}
        </div>
      </Section>

      <Section title='Earlier work'>
        <p className='mt-3 leading-relaxed'>
          <InlineLinkList links={earlierWork} />
        </p>
      </Section>

      <Section title='Tools and open source'>
        <p className='mt-3 leading-relaxed'>
          <InlineLinkList links={tools} />
        </p>
      </Section>

      <SiteFooter />
    </main>
  );
}
```

Delete `app/favicon.ico` from the scaffold if present (it conflicts with `public/favicon.ico`).

- [ ] **Step 5: Copy favicons**

```bash
rm -f app/favicon.ico
cp ../portfolio-v3/public/{favicon.ico,favicon-16x16.png,favicon-32x32.png,apple-touch-icon.png} public/
```

- [ ] **Step 6: Verify**

Run: `bun test && bun run lint && bun run build`
Expected: tests pass, lint clean, `out/index.html` exists.

Run: `grep -c 'Settrium' out/index.html`
Expected: at least 1.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -q -m "Build the one-page portfolio

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>"
```

---

### Task 4: Resume page

**Files:**
- Create: `data/resume.ts`, `components/resume/resume-header.tsx`, `components/resume/resume-section.tsx`, `components/resume/experience-item.tsx`, `components/resume/print-button.tsx`, `app/resume/page.tsx`
- Modify: `tests/content.test.ts` (add resume tests)

**Interfaces:**
- Consumes: `TextLink`, `InlineLinkList`, `SiteLink` from earlier tasks.
- Produces: `resume` object (shape below) and the `/resume` route.

- [ ] **Step 1: Write the failing test**

Append to `tests/content.test.ts`:

```ts
import { resume } from '@/data/resume';

describe('resume content', () => {
  test('uses the new headline and portfolio link', () => {
    expect(resume.headline).toBe('Software Engineer');
    expect(resume.links.map((link) => link.href)).toContain('https://jazzdev.vercel.app');
  });

  test('has no emojis and no "lunch" typo', () => {
    const text = collectStrings(resume).join(' ');
    expect(/\p{Extended_Pictographic}/u.test(text)).toBe(false);
    expect(text).not.toContain('lunch');
  });

  test('keeps all five roles from v3', () => {
    expect(resume.experience.map((job) => job.company)).toEqual([
      'Food Junkee',
      'Candour IT Services',
      'VastFluid Finance',
      'DEFT Trader',
      'StableDoc',
    ]);
  });
});
```

Move the `import { resume }` line up to the other imports at the top of the file.

- [ ] **Step 2: Run test to verify it fails**

Run: `bun test`
Expected: FAIL, cannot resolve `@/data/resume`.

- [ ] **Step 3: Write resume data**

`data/resume.ts` (text copied from `portfolio-v3/app/resume/page.tsx`):

```ts
import type { SiteLink } from '@/lib/types';

type Job = {
  title: string;
  company: string;
  period: string;
  location?: string;
  about: string;
  points: string[];
  skills?: string;
};

type LabelledLine = { label: string; value: string };

export const resume = {
  name: 'Taiwo Adewale Babarinde',
  headline: 'Software Engineer',
  contactLine: 'babsman4all@gmail.com · +2349032073321 · Lagos, Nigeria',
  links: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/taiwo-babarinde/' },
    { label: 'GitHub', href: 'https://github.com/TheJazzDev' },
    { label: 'Portfolio', href: 'https://jazzdev.vercel.app' },
  ] satisfies SiteLink[],
  summary:
    'Results-driven Lead Frontend Engineer with 4+ years of hands-on experience architecting and scaling web applications across fintech, Web3, food delivery, and healthcare sectors. Proven expertise in React.js, Next.js, and TypeScript with a demonstrated ability to lead high-performing teams, mentor junior developers, and deliver pixel-perfect, performance-optimized applications serving thousands of users.',
  summaryPoints: [
    'Led a team of 4 frontend developers building scalable accounting software with micro-frontend architecture',
    'Mentored 3 interns through to junior developer positions, establishing team best practices',
    'Evaluated 20,000+ lines of code, improving product optimization by 20% and developer productivity',
    'Successfully shipped 7+ responsive web applications and multiple blockchain dApps',
  ],
  competencies: [
    {
      label: 'Frontend Development',
      value: 'React.js, Next.js, TypeScript, JavaScript (ES6+), React Native, Flutter, TailwindCSS, GSAP, Shadcn UI',
    },
    {
      label: 'Architecture & Performance',
      value: 'Micro Frontend Architecture, Component Design Systems, Performance Optimization, API Integration, Code Splitting',
    },
    {
      label: 'Leadership',
      value: 'Team Leadership, Mentorship, Code Review, Technical Documentation, Agile (Scrum/Kanban)',
    },
    {
      label: 'Developer Tools',
      value: 'Git, Docker, Firebase, Webpack, Redux, Jira, Slack',
    },
  ] satisfies LabelledLine[],
  experience: [
    {
      title: 'Front-End Developer (Freelance)',
      company: 'Food Junkee',
      period: 'Nov 2025 – Present',
      location: 'Remote',
      about: 'Full-stack food delivery platform specializing in African and Caribbean cuisine',
      points: [
        'Built production-ready food delivery web application using Next.js 16, React 19, and TypeScript with Firebase backend serving real customers',
        'Integrated Stripe payment processing with webhook handling and DPD Local UK shipping API for automated order fulfillment and thermal label printing',
        'Developed comprehensive admin dashboard with role-based access control, order management, real-time analytics, and inventory tracking',
        'Implemented 30+ RESTful API endpoints with authentication, activity logging, and automated cleanup jobs deployed on Vercel with cron scheduling',
        'Designed complex checkout flow with cart persistence, delivery validation, and multi-service integration (Firebase, Resend email, QZ Tray printing)',
      ],
      skills: 'Next.js, React.js, TypeScript, Firebase, Stripe API, DPD API, Zustand, API Development',
    },
    {
      title: 'Lead Frontend Engineer',
      company: 'Candour IT Services',
      period: 'Jan 2024 – Present',
      location: 'Remote',
      about: 'IT solutions company providing innovative tech solutions to businesses worldwide',
      points: [
        'Leading a high-performing team of 4 frontend developers building scalable accounting software using micro-frontend architecture and 300+ integrated API endpoints',
        'Architected and implemented micro-frontend architecture enabling independent team workflows and seamless integration across services',
        'Designed, developed, and maintained 7+ responsive web applications using React.js and Angular, serving thousands of users',
        'Mentored 3 interns from onboarding to junior developer positions, establishing coding standards and best practices',
        'Optimized applications for performance, identifying bottlenecks and reducing load times through profiling and code analysis',
      ],
      skills: 'React.js, Next.js, TypeScript, Micro Frontend Architecture, API Integration, Team Leadership',
    },
    {
      title: 'Front-End Developer',
      company: 'VastFluid Finance',
      period: 'Mar 2023 – May 2023',
      location: 'Remote',
      about: 'Next-generation decentralized exchange (DEX) built on the Arbitrum network (Web3)',
      points: [
        'Collaborated with design team to create intuitive, user-friendly frontend for blockchain DApp',
        'Developed fully responsive landing page with mobile-first approach; reduced bounce rates by 15%',
        'Optimized web architecture for scalability resulting in improved page load speed',
      ],
    },
    {
      title: 'Front-End Developer (Freelance)',
      company: 'DEFT Trader',
      period: 'Jan 2023 – Feb 2023',
      location: 'Remote',
      about: 'Forex brand helping traders and investors achieve profitability in forex markets',
      points: [
        'Designed and developed fully responsive multi-page Forex website with seamless UX',
        'Implemented authentication system, admin panel, and database using Firebase',
        'Integrated REST APIs with Myfxbook to fetch real-time financial data',
      ],
    },
    {
      title: 'Strategy and Quality Assurance Manager',
      company: 'StableDoc',
      period: 'Oct 2021 – Dec 2022',
      about: 'Blockchain- and AI-powered telehealth platform providing global cross-boundary healthcare',
      points: [
        'Led cross-functional team of 2 designers and 6 developers to successfully launch 5 products',
        'Evaluated 20,000+ lines of code across multiple projects, ensuring adherence to industry best practices',
        'Made codebase 100% developer-friendly through comprehensive code reviews and documentation',
        'Provided mentorship and technical guidance to junior developers, improving team efficiency',
      ],
      skills: 'Flutter, Code Review, Performance Optimization, Team Leadership, Product Development',
    },
  ] satisfies Job[],
  education: [
    'Harvard CS50X, Introduction to Computer Science, 2023',
    'React - The Complete Guide, Udemy, 2022',
    'The Complete 2022 Full-Stack Web Development Bootcamp, Udemy, 2022',
    'Responsive Web Design, freeCodeCamp, 2022',
  ],
  achievements: [
    'Mentored and hired 3 interns to junior developer positions, establishing industry best practices',
    'Evaluated 20,000+ lines of code, improving product optimization by 20%',
    'Shipped 5+ production applications across web, mobile, and blockchain platforms',
    'Designed micro-frontend architecture enabling scalable workflows and 300+ API integrations',
    'Successfully led cross-functional teams of 8+ people to deliver products on time',
  ],
  additional: [
    { label: 'Work authorization', value: 'Nigerian citizen, open to visa sponsorship for international opportunities' },
    { label: 'Availability', value: 'Available for immediate start on remote or relocation opportunities' },
    { label: 'Languages', value: 'English (fluent), Yoruba (native)' },
    { label: 'Interests', value: 'Software architecture, team leadership and mentorship, Web3 and blockchain development' },
  ] satisfies LabelledLine[],
};

export type ResumeJob = Job;
export type ResumeLine = LabelledLine;
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `bun test`
Expected: 8 pass, 0 fail.

- [ ] **Step 5: Resume components**

`components/resume/print-button.tsx`:

```tsx
'use client';

export function PrintButton() {
  return (
    <button
      type='button'
      onClick={() => window.print()}
      className='min-h-[44px] text-accent underline-offset-4 hover:underline print:hidden'>
      Download PDF
    </button>
  );
}
```

`components/resume/resume-header.tsx`:

```tsx
import { resume } from '@/data/resume';
import { InlineLinkList } from '@/components/ui/inline-link-list';

export function ResumeHeader() {
  return (
    <header className='border-b border-rule pb-5'>
      <h1 className='text-xl font-semibold sm:text-2xl'>{resume.name}</h1>
      <p className='mt-1 text-muted'>{resume.headline}</p>
      <p className='mt-3 text-xs text-muted sm:text-sm'>{resume.contactLine}</p>
      <p className='mt-1 text-xs sm:text-sm'>
        <InlineLinkList links={resume.links} separator=' · ' />
      </p>
    </header>
  );
}
```

`components/resume/resume-section.tsx`:

```tsx
import type { ReactNode } from 'react';

type ResumeSectionProps = {
  title: string;
  children: ReactNode;
};

export function ResumeSection({ title, children }: ResumeSectionProps) {
  return (
    <section className='mt-6 sm:mt-8'>
      <h2 className='border-b border-rule pb-1 text-base font-medium sm:text-lg'>{title}</h2>
      <div className='mt-3'>{children}</div>
    </section>
  );
}
```

`components/resume/experience-item.tsx`:

```tsx
import type { ResumeJob } from '@/data/resume';

export function ExperienceItem({ job }: { job: ResumeJob }) {
  const meta = [job.company, job.period, job.location].filter(Boolean).join(' · ');

  return (
    <div className='mb-5 last:mb-0'>
      <h3 className='font-medium'>{job.title}</h3>
      <p className='text-xs text-muted sm:text-sm'>{meta}</p>
      <p className='mt-1 text-xs text-muted sm:text-sm'>{job.about}</p>
      <ul className='mt-2 list-disc space-y-1 pl-5'>
        {job.points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
      {job.skills && <p className='mt-2 text-xs text-muted sm:text-sm'>{job.skills}</p>}
    </div>
  );
}
```

- [ ] **Step 6: Resume page**

`app/resume/page.tsx`:

```tsx
import type { Metadata } from 'next';
import { resume } from '@/data/resume';
import { ResumeHeader } from '@/components/resume/resume-header';
import { ResumeSection } from '@/components/resume/resume-section';
import { ExperienceItem } from '@/components/resume/experience-item';
import { PrintButton } from '@/components/resume/print-button';
import { TextLink } from '@/components/ui/text-link';

export const metadata: Metadata = {
  title: `Resume, ${resume.name}`,
};

export default function ResumePage() {
  return (
    <main className='mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12 print:max-w-none print:p-0'>
      <div className='mb-6 flex items-center justify-between print:hidden'>
        <TextLink href='/'>Back to work</TextLink>
        <PrintButton />
      </div>

      <ResumeHeader />

      <ResumeSection title='Summary'>
        <p className='leading-relaxed'>{resume.summary}</p>
        <ul className='mt-3 list-disc space-y-1 pl-5'>
          {resume.summaryPoints.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </ResumeSection>

      <ResumeSection title='Core competencies'>
        <dl className='space-y-1'>
          {resume.competencies.map((line) => (
            <div key={line.label}>
              <dt className='inline font-medium'>{line.label}: </dt>
              <dd className='inline'>{line.value}</dd>
            </div>
          ))}
        </dl>
      </ResumeSection>

      <ResumeSection title='Experience'>
        {resume.experience.map((job) => (
          <ExperienceItem key={`${job.company}-${job.period}`} job={job} />
        ))}
      </ResumeSection>

      <ResumeSection title='Education and certifications'>
        <ul className='space-y-1'>
          {resume.education.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </ResumeSection>

      <ResumeSection title='Key achievements'>
        <ul className='list-disc space-y-1 pl-5'>
          {resume.achievements.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </ResumeSection>

      <ResumeSection title='Additional information'>
        <dl className='space-y-1'>
          {resume.additional.map((line) => (
            <div key={line.label}>
              <dt className='inline font-medium'>{line.label}: </dt>
              <dd className='inline'>{line.value}</dd>
            </div>
          ))}
        </dl>
      </ResumeSection>
    </main>
  );
}
```

The two `<dl>` blocks are identical; if lint or review flags the duplication, extract `components/resume/labelled-lines.tsx` taking `lines: ResumeLine[]`.

- [ ] **Step 7: Verify and commit**

Run: `bun test && bun run lint && bun run build`
Expected: all pass; `out/resume.html` exists.

```bash
git add -A
git commit -q -m "Port resume page from v3

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>"
```

---

### Task 5: Link check and final verification

**Files:**
- Create: `scripts/check-links.ts`

**Interfaces:**
- Consumes: all data modules.

- [ ] **Step 1: Link check script**

`scripts/check-links.ts`:

```ts
import { profile } from '@/data/profile';
import { selectedWork } from '@/data/selected-work';
import { earlierWork } from '@/data/earlier-work';
import { tools } from '@/data/tools';
import { pastVersions } from '@/data/past-versions';
import { resume } from '@/data/resume';

// npm and LinkedIn block scripted requests, so a 403/999 from them is not a broken link.
const BOT_BLOCKING_HOSTS = ['www.npmjs.com', 'www.linkedin.com'];

const hrefs = [
  ...profile.contacts,
  ...selectedWork.flatMap((project) => project.links),
  ...earlierWork,
  ...tools,
  ...pastVersions,
  ...resume.links,
]
  .map((link) => link.href)
  .filter((href) => href.startsWith('https://'));

const unique = [...new Set(hrefs)];

const results = await Promise.all(
  unique.map(async (href) => {
    try {
      const response = await fetch(href, { redirect: 'follow', signal: AbortSignal.timeout(15000) });
      return { href, status: response.status };
    } catch {
      return { href, status: 0 };
    }
  }),
);

const broken = results.filter(({ href, status }) => {
  if (status >= 200 && status < 400) return false;
  return !BOT_BLOCKING_HOSTS.includes(new URL(href).hostname);
});

for (const { href, status } of results) console.log(status, href);

if (broken.length > 0) {
  console.error(`\n${broken.length} broken link(s)`);
  process.exit(1);
}
```

- [ ] **Step 2: Run it**

Run: `bun run check-links`
Expected: exits 0. `https://jazzdev-v3.vercel.app` will fail until the owner deploys v3 there; that single failure is expected and must be reported, not hidden.

- [ ] **Step 3: Visual check in the browser**

Run `bun dev`, then check `/` and `/resume` at 375px and 1280px wide, in light and dark mode:
- no horizontal scroll at 375px
- years stack under the title on mobile, sit on the right on desktop
- print preview of `/resume` hides the buttons and prints black on white

- [ ] **Step 4: Commit**

```bash
git add scripts package.json
git commit -q -m "Add external link check script

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>"
```
