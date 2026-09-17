import type { Project } from '@/lib/types';

export const selectedWork: Project[] = [
  {
    id: 'settrium',
    title: 'Settrium',
    years: '2026–now',
    role: 'Lead engineer',
    tags: ['ERP', 'Web app'],
    description:
      'A multi-tenant ERP platform, starting with procurement: budgets, requisitions, purchase orders, vendors, contracts and goods receipt. Each customer organisation runs on its own isolated PostgreSQL database.',
    notes:
      'I own the architecture end to end. Budget positions such as committed and remaining spend are calculated from the transaction ledger when they are read, so reports always reconcile with the underlying records. The platform is a modular monolith: each business suite sits behind enforced module boundaries, so it ships as one product today and any suite can become its own service later. Each organisation signs in on its own subdomain.',
    stack: ['Next.js', 'NestJS', 'Prisma', 'PostgreSQL', 'Redis', 'BullMQ', 'Cloudflare R2', 'Turborepo'],
    links: [{ label: 'settrium.com', href: 'https://settrium.com' }],
  },
  {
    id: 'blocnet',
    title: 'Blocnet',
    years: '2024–now',
    role: 'Founder and lead engineer',
    tags: ['Mobile app', 'Admin panel', 'Landing page'],
    description:
      'A social platform for the crypto community. Users discover projects, follow their updates, earn rewards through mining and quests, and tip each other from a built-in wallet.',
    notes:
      'I designed and built the whole platform: a NestJS API of around 40 modules serving a Flutter mobile app, a Next.js admin console for moderation, and the landing page. A separate Python service moderates and tags content with LLMs and fails over to another provider when one is unavailable. The BNT token contract is written in Solidity.',
    stack: ['NestJS', 'Prisma', 'PostgreSQL', 'Flutter', 'Next.js', 'Python', 'Solidity'],
    links: [{ label: 'blocnet.app', href: 'https://blocnet.app' }],
  },
  {
    id: 'digit-tally',
    title: 'Digit Tally',
    years: '2024–now',
    role: 'Lead frontend engineer, Candour IT Services',
    tags: ['Web app'],
    description:
      'Cloud accounting software used by 50+ businesses. Sales, suppliers, inventory, accounting, payroll and three other areas are separate micro-frontends that deploy independently.',
    notes:
      'I lead a team of four frontend engineers and own the frontend architecture. We integrated 300+ API endpoints and published our shared component library, utilities and an authentication CLI to npm. Invoices and payslips are generated as PDFs on the server with Playwright.',
    stack: ['Next.js', 'TypeScript', 'TanStack Query', 'Redux', 'Turborepo', 'Playwright'],
    links: [{ label: 'digit-tally.io', href: 'https://digit-tally.io' }],
  },
  {
    id: 'food-junkee',
    title: 'Food Junkee',
    years: '2025–2026',
    role: 'Full-stack engineer, contract',
    tags: ['Web app'],
    description:
      'An online ordering platform for African and Caribbean food in the UK, alongside a mobile catering service that serves 40+ workplaces.',
    notes:
      'I built the storefront and the admin dashboard. Payments run through Stripe with webhook confirmation, and orders ship through DPD with labels printed straight to a thermal printer. The dashboard covers role-based access, activity logs, promo codes and sales analytics. I extracted the DPD integration into an open-source package, @jazzdev/dpd-local-sdk.',
    stack: ['Next.js', 'Firebase', 'Stripe', 'Zustand', 'React Query', 'Upstash Redis', 'Resend'],
    links: [{ label: 'foodjunkee.co.uk', href: 'https://foodjunkee.co.uk' }],
  },
  {
    id: '67-humanitarian-foundation',
    title: '67 Humanitarian Foundation',
    years: '2025–2026',
    role: 'Full-stack engineer',
    tags: ['Web app', 'Admin panel'],
    description:
      'A membership and donations platform for the Nigerian Army 67 Intake, managing records for 3,600+ members across all 36 states.',
    notes:
      'Four admin roles with an audit trail of every change, bulk CSV member import, Stripe donations, news publishing and memorial pages honouring fallen members.',
    stack: ['Next.js', 'Prisma', 'PostgreSQL', 'NextAuth', 'Stripe', 'Cloudinary'],
    links: [{ label: '67hf.vercel.app', href: 'https://67hf.vercel.app' }],
  },
  {
    id: 'valley-of-mercy',
    title: 'Valley of Mercy Church',
    years: '2025',
    role: 'Lead engineer',
    tags: ['Mobile app', 'Admin panel'],
    description:
      'A mobile app for church members with a web admin for staff. Members get sermons, prayer requests, programmes and announcements in one place, and staff manage members and content.',
    notes:
      'The app is offline-first: actions taken without a connection are queued and synced when the phone reconnects. Push notifications keep members informed, and points, badges and streaks encourage regular engagement.',
    stack: ['React Native', 'Expo', 'Next.js', 'Firebase', 'Redux Toolkit', 'NativeWind'],
    links: [],
  },
  {
    id: 'asiko-foods',
    title: 'Asiko Foods',
    years: '2026–now',
    role: 'Full-stack engineer',
    tags: ['Web app', 'Admin panel'],
    description:
      'A food commerce platform for retail shoppers and wholesale trade buyers. Retail, wholesale, catalogue and admin are separate Next.js apps built on one shared design system.',
    notes:
      'The wholesale app has its own authentication, catalogue and ordering flow. Shared UI, the API client, configuration and utilities live in internal packages in a Turborepo monorepo.',
    stack: ['Next.js', 'React', 'Zustand', 'Zod', 'Tailwind CSS', 'Turborepo'],
    links: [],
  },
  {
    id: 'olamide-sax',
    title: 'Olamide Sax',
    years: '2026',
    role: 'Frontend engineer',
    tags: ['Website'],
    description:
      'The official website for a UK-based Afro-fusion multi-instrumentalist, winner of Best Instrumentalist at the Eko Heritage Awards 2026.',
    notes:
      'The current site uses plain HTML, CSS and JavaScript with GSAP animation. It has no framework and no build step, and every page works with JavaScript turned off. The first version was a Next.js app with a lightweight CMS the artist used to manage videos, photos and press coverage.',
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
    role: 'Full-stack engineer',
    tags: ['Website', 'Admin panel'],
    description:
      'The website for OHC FC, a UK football club. Published lineups appear on a pitch graphic with player photos and shirt numbers.',
    notes:
      'Club staff build lineups by choosing a formation and assigning a player to each position. Players without a photo get an illustrated avatar.',
    stack: ['Next.js', 'Prisma', 'PostgreSQL', 'NextAuth', 'Vercel Blob'],
    links: [{ label: 'ohc-fc.vercel.app', href: 'https://ohc-fc.vercel.app' }],
  },
];
