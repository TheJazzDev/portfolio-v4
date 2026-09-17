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
