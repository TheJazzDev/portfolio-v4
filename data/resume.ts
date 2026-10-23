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
  headline: 'Founder and Principal Engineer',
  contactLine: 'babsman4all@gmail.com · +2349032073321 · Lagos, Nigeria',
  links: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/taiwobabarinde/' },
    { label: 'GitHub', href: 'https://github.com/TheJazzDev' },
    { label: 'Portfolio', href: 'https://jazzdev.xyz' },
  ] satisfies SiteLink[],
  summary:
    'Software engineer with five years of experience building financial and multi-tenant systems end to end. Founder of Steadant, an audit-grade ERP that gives every customer its own database, records every change in a hash-chained audit trail and keeps its architecture in line with machine-enforced rules. Leads the frontend team behind Digit Tally, a cloud accounting platform for Nigerian businesses.',
  summaryPoints: [
    'Designed and built Steadant: 7 NestJS services, 3 Next.js apps, 264 data models and 1,389 API endpoints',
    'Builds with AI coding agents under 58 custom, tested ESLint rules and 476 written feature specs',
    'Leads 4 frontend engineers on Digit Tally, a micro-frontend platform of 7 independently deployed apps',
    'Mentored 3 interns through to junior developer roles',
  ],
  competencies: [
    {
      label: 'Backend and data',
      value: 'NestJS, Prisma, PostgreSQL, FastAPI, Zod, multi-tenant architecture, double-entry ledgers, audit trails',
    },
    {
      label: 'Cloud and infrastructure',
      value: 'AWS (ECS, ECR, RDS, Aurora), Terraform, GitHub Actions, Docker, Vercel',
    },
    {
      label: 'Frontend and mobile',
      value: 'Next.js, React, TypeScript, React Native, Expo, Flutter, TanStack Query, Redux Toolkit, Tailwind CSS',
    },
    {
      label: 'Architecture and quality',
      value: 'Micro-frontends, monorepos (Turborepo), custom ESLint rules, Playwright, k6 load testing, CI/CD',
    },
    {
      label: 'Payments and Web3',
      value: 'Stripe, Paystack, Solidity, viem, BNB Smart Chain',
    },
    {
      label: 'Leadership',
      value: 'Team leadership, mentorship, code review, technical specs and documentation',
    },
  ] satisfies LabelledLine[],
  experience: [
    {
      title: 'Founder and Principal Engineer',
      company: 'Steadant',
      period: 'May 2026 – Present',
      location: 'Lagos',
      about: 'Audit-grade, multi-tenant ERP with Budgeting & Planning, Procurement, Accounting and Reporting suites',
      points: [
        'Designed and built the platform: 7 NestJS services, 3 Next.js apps, 264 data models and 1,389 API endpoints, with Budgeting & Planning and Procurement live',
        'Gave every customer its own Postgres database, provisioned at sign-up, with migrations rolled across the whole fleet on deploy and sandbox copies for safe testing',
        'Built a tamper-evident audit log: every write is hash-chained inside the same transaction and anchored with RFC 3161 timestamps',
        'Defined the AWS infrastructure in Terraform: services on ECS, PostgreSQL on RDS and Aurora, separate staging and production environments, automated CI deploys',
        'Wrote 58 custom ESLint rules that enforce the architecture on every edit and commit, keeping a codebase built with AI coding agents consistent',
        'Wrote 2,393 test files and 476 feature specs',
      ],
      skills: 'NestJS, Next.js, TypeScript, Prisma, PostgreSQL, AWS, Terraform, Turborepo, Stripe, Paystack',
    },
    {
      title: 'Lead Frontend Engineer',
      company: 'Candour IT Services',
      period: 'Jan 2024 – Present',
      location: 'Remote',
      about: 'Builds Digit Tally, cloud accounting for Nigerian businesses',
      points: [
        'Leads 4 frontend engineers building Digit Tally: invoicing, payables, ledgers, tax, inventory and payroll across branches',
        'Designed the micro-frontend architecture: 7 independently deployed Next.js apps sharing one sign-in through parent-domain cookies and edge session checks',
        'Built a serverless PDF service rendering 10 document types, and CI with Playwright smoke tests and nightly API contract checks',
        'Published the team component library, utilities and developer CLI to npm, and authored 3,800+ commits across the product',
        'Mentored 3 interns through to junior developer roles',
      ],
      skills: 'Next.js, TypeScript, Turborepo, Redux Toolkit, TanStack Query, Playwright, Puppeteer',
    },
    {
      title: 'Founder and Lead Engineer',
      company: 'Blocnet',
      period: 'Dec 2024 – Present',
      location: 'Remote',
      about: 'Social platform for the crypto community, with a custodial wallet and an AI-ranked feed',
      points: [
        'Built a NestJS API with 390 endpoints and 97 data models, a Flutter app, an admin console and a Python AI scoring service',
        'Built a custodial multi-asset wallet on a double-entry ledger and wrote the BNT ERC-20 token in Solidity',
        'Cut the feed from 8 queries to 1, verified with a k6 load test of 1,000 concurrent readers',
      ],
      skills: 'NestJS, Prisma, PostgreSQL, Flutter, Python, FastAPI, Solidity, viem',
    },
    {
      title: 'Frontend Engineer',
      company: 'Asiko Foods',
      period: 'Jul 2026 – Present',
      location: 'Remote, UK client',
      about: 'Commerce for African and Caribbean groceries, retail and wholesale',
      points: [
        'Building four Next.js apps in a Turborepo monorepo: retail store, wholesale portal, field sales catalogue and admin',
        'Built a typed gateway client with retries, idempotency keys and Zod validation, and Stripe checkout keyed to the order for safe retries',
      ],
      skills: 'Next.js, TypeScript, TanStack Query, Zustand, Zod, Stripe',
    },
    {
      title: 'Full-Stack Engineer (Contract)',
      company: 'Food Junkee',
      period: 'Nov 2025 – Mar 2026',
      location: 'Remote, UK client',
      about: 'Online ordering for African and Caribbean food across the UK',
      points: [
        'Built the ordering platform and admin dashboard: 50 API routes and 57 pages on Next.js and Firebase',
        'Integrated Stripe with verified, de-duplicated webhooks and automatic DPD shipment creation with thermal label printing',
        'Extracted the DPD client into an open-source npm package, @jazzdev/dpd-local-sdk',
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
        'Built the platform for 3,600+ members across 36 states: 78 API routes, 64 pages and 6 admin roles, with an audit trail of admin actions and Paystack donations',
      ],
      skills: 'Next.js, TypeScript, Prisma, PostgreSQL, Paystack',
    },
    {
      title: 'Front-End Developer',
      company: 'VastFluid Finance',
      period: 'Mar 2023 – May 2023',
      location: 'Remote',
      about: 'Decentralized exchange (DEX) on the Arbitrum network',
      points: ['Built the responsive, mobile-first landing page and worked with the design team on the dApp frontend'],
    },
    {
      title: 'Front-End Developer (Freelance)',
      company: 'DEFT Trader',
      period: 'Jan 2023 – Feb 2023',
      location: 'Remote',
      about: 'Forex brand for traders and investors',
      points: ['Built a multi-page forex website with Firebase authentication, an admin panel and live Myfxbook data'],
    },
    {
      title: 'Strategy and Quality Assurance Manager',
      company: 'StableDoc',
      period: 'Oct 2021 – Dec 2022',
      about: 'Blockchain- and AI-powered telehealth platform',
      points: [
        'Led 2 designers and 6 developers through 5 product launches',
        'Ran code review across projects and wrote the documentation that made the codebase easier to work in',
      ],
      skills: 'Flutter, Code Review, Team Leadership, Product Development',
    },
  ] satisfies Job[],
  education: [
    'Harvard CS50X, Introduction to Computer Science, 2023',
    'React - The Complete Guide, Udemy, 2022',
    'The Complete 2022 Full-Stack Web Development Bootcamp, Udemy, 2022',
    'Responsive Web Design, freeCodeCamp, 2022',
  ],
  achievements: [
    'Founded Steadant and built its multi-tenant ERP platform: 1,389 API endpoints, 264 data models, 2,393 test files',
    'Wrote 58 tested ESLint rules that turn architecture decisions into checks a machine enforces',
    'Designed a micro-frontend architecture of 7 independently deployed apps for Digit Tally',
    'Published 4 npm packages and a VS Code theme',
    'Mentored 3 interns through to junior developer roles',
  ],
  additional: [
    {
      label: 'Open source',
      value: '@jazzdev/dpd-local-sdk, @candourorg/components, @candourorg/utils, @candourorg/cli, Dark Jazz VS Code theme',
    },
    { label: 'Languages', value: 'English (fluent), Yoruba (native)' },
    { label: 'Interests', value: 'Software architecture, AI-assisted engineering, financial systems, mentorship' },
  ] satisfies LabelledLine[],
};

export type ResumeJob = Job;
export type ResumeLine = LabelledLine;
