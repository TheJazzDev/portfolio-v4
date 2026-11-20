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
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/taiwobabarinde/' },
    { label: 'GitHub', href: 'https://github.com/TheJazzDev' },
    { label: 'Portfolio', href: 'https://jazzdev.xyz' },
  ] satisfies SiteLink[],
  summary:
    'Full-stack software engineer with five years of experience, mostly on financial software: accounting, ERP, payments and wallets. I design the system and build all of it: PostgreSQL data models, NestJS APIs, AWS infrastructure in Terraform, and web and mobile apps in Next.js, React Native and Flutter. I have taken products from the first commit to production on my own, and I lead a team of four frontend engineers.',
  skills: [
    {
      label: 'Backend',
      value: 'Node.js, NestJS, Prisma, PostgreSQL, Python, FastAPI, Redis, multi-tenant databases, ledgers, audit logs',
    },
    {
      label: 'Cloud',
      value: 'AWS (ECS, ECR, RDS, Aurora), Terraform, Docker, GitHub Actions, Vercel',
    },
    {
      label: 'Frontend and mobile',
      value: 'TypeScript, React, Next.js, React Native, Expo, Flutter, TanStack Query, Redux Toolkit, Tailwind CSS',
    },
    {
      label: 'Testing and tooling',
      value: 'Playwright, k6 load testing, custom ESLint rules, Turborepo monorepos, micro-frontends, CI/CD',
    },
    {
      label: 'Payments and Web3',
      value: 'Stripe, Paystack, Solidity, viem, BNB Smart Chain',
    },
  ] satisfies LabelledLine[],
  experience: [
    {
      title: 'Lead Engineer',
      company: 'Settrium',
      period: 'May 2026 – Present',
      location: 'Lagos',
      about: 'ERP for organisations with more than one entity: budgeting, procurement, accounting and reporting',
      points: [
        'Designed and built the platform: 9 NestJS services, 3 Next.js apps, 321 data models and 1,680 API endpoints. Budgeting and procurement are live',
        'Gave every customer its own Postgres database, created at sign-up, with migrations run across all of them on deploy',
        'Built a hash-chained audit log written in the same transaction as each change, with RFC 3161 timestamps',
        'Wrote the AWS infrastructure in Terraform: ECS services, RDS and Aurora, separate staging and production, deploys from CI',
        'Wrote 107 custom ESLint rules, covered by tests, that check the architecture on every commit',
      ],
      skills: 'NestJS, Next.js, TypeScript, Prisma, PostgreSQL, AWS, Terraform, Turborepo, Stripe, Paystack',
    },
    {
      title: 'Lead Frontend Engineer',
      company: 'Candour IT Services',
      period: 'Jan 2024 – Present',
      location: 'Remote',
      about: 'Digit Tally, cloud accounting for Nigerian businesses',
      points: [
        'Lead 4 frontend engineers on Digit Tally: invoicing, purchases, journals, tax, inventory and payroll',
        'Designed the micro-frontend setup: 7 Next.js apps, deployed separately, sharing one sign-in',
        'Built a serverless PDF service for 10 document types, and CI with Playwright smoke tests and nightly API contract checks',
        'Published the team component library, utilities and developer CLI to npm',
        'Mentored 3 interns who became junior developers',
      ],
      skills: 'Next.js, TypeScript, Turborepo, Redux Toolkit, TanStack Query, Playwright, Puppeteer',
    },
    {
      title: 'Founder and Software Engineer',
      company: 'Blocnet',
      period: 'Dec 2024 – Present',
      location: 'Remote',
      about: 'Social app for crypto communities, with a custodial wallet and a ranked feed',
      points: [
        'Built a NestJS API (390 endpoints, 97 data models), a Flutter app, an admin console and a Python service that scores feed content',
        'Built a custodial wallet for BNT, BNB and USDT on a double-entry ledger, and wrote the BNT ERC-20 token in Solidity',
        'Cut the feed from 8 database queries to 1 and load-tested it in k6 with 1,000 concurrent readers',
      ],
      skills: 'NestJS, Prisma, PostgreSQL, Flutter, Python, FastAPI, Solidity, viem',
    },
    {
      title: 'Frontend Engineer',
      company: 'Asiko Foods',
      period: 'Jul 2026 – Present',
      location: 'Remote, UK client',
      about: 'Online grocery store for African and Caribbean food, retail and wholesale',
      points: [
        'Building 4 Next.js apps in a Turborepo monorepo: retail store, wholesale portal, field sales catalogue and admin',
        'Built a typed API client with retries, idempotency keys and Zod validation, and Stripe checkout that never charges twice on a retry',
      ],
      skills: 'Next.js, TypeScript, TanStack Query, Zustand, Zod, Stripe',
    },
    {
      title: 'Full-Stack Engineer (Contract)',
      company: 'Food Junkee',
      period: 'Nov 2025 – Mar 2026',
      location: 'Remote, UK client',
      about: 'Online ordering for African and Caribbean food in the UK',
      points: [
        'Built the ordering site and admin dashboard on Next.js and Firebase: 50 API routes and 57 pages',
        'Integrated Stripe with verified, de-duplicated webhooks, and DPD shipping with labels printed from the browser',
        'Published the DPD client as an npm package, @jazzdev/dpd-local-sdk',
      ],
      skills: 'Next.js, TypeScript, Firebase, Stripe, DPD API, Upstash Redis',
    },
    {
      title: 'Full-Stack Engineer',
      company: '67 Humanitarian Foundation',
      period: 'Nov 2025 – Aug 2026',
      location: 'Remote',
      about: 'Membership platform for the Nigerian Army 67 Intake',
      points: [
        'Built the platform for 3,600+ members in 36 states: 78 API routes, 64 pages, 6 admin roles, an audit log of admin actions and Paystack donations',
      ],
      skills: 'Next.js, TypeScript, Prisma, PostgreSQL, Paystack',
    },
    {
      title: 'Front-End Developer',
      company: 'VastFluid Finance',
      period: 'Mar 2023 – May 2023',
      location: 'Remote',
      about: 'Decentralised exchange on the Arbitrum network',
      points: ['Built the landing page and worked with the design team on the dApp frontend'],
    },
    {
      title: 'Front-End Developer (Freelance)',
      company: 'DEFT Trader',
      period: 'Jan 2023 – Feb 2023',
      location: 'Remote',
      about: 'Forex brand for traders and investors',
      points: ['Built a multi-page website with Firebase sign-in, an admin panel and live Myfxbook data'],
    },
    {
      title: 'Strategy and Quality Assurance Manager',
      company: 'StableDoc',
      period: 'Oct 2021 – Dec 2022',
      about: 'Telehealth platform',
      points: [
        'Led 2 designers and 6 developers through 5 product launches',
        'Reviewed code across projects and wrote the developer documentation',
      ],
      skills: 'Flutter, code review, team leadership',
    },
  ] satisfies Job[],
  education: [
    'Harvard CS50x, Introduction to Computer Science, 2023',
    'React - The Complete Guide, Udemy, 2022',
    'The Complete 2022 Full-Stack Web Development Bootcamp, Udemy, 2022',
    'Responsive Web Design, freeCodeCamp, 2022',
  ],
  additional: [
    {
      label: 'Open source',
      value: '@jazzdev/dpd-local-sdk, @candourorg/components, @candourorg/utils, @candourorg/cli, Dark Jazz VS Code theme',
    },
    { label: 'Languages', value: 'English (fluent), Yoruba (native)' },
  ] satisfies LabelledLine[],
};

export type ResumeJob = Job;
export type ResumeLine = LabelledLine;
