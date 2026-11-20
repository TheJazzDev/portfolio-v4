import type { Project } from '@/lib/types';

export const settrium: Project = {
  id: 'settrium',
  title: 'Settrium',
  years: '2026–now',
  role: 'Lead engineer',
  tags: ['ERP', 'Web app', 'Admin panel', 'Landing page'],
  description:
    'ERP for organisations that run more than one entity. Budgeting and procurement are live: multi-year budgets consolidated across subsidiaries, and purchasing from requisition and RFQ through purchase order, goods receipt, 3-way invoice matching and payment. Approved invoices and payments post to the general ledger automatically.',
  metrics: [
    { value: '1,680', label: 'API endpoints' },
    { value: '321', label: 'data models' },
    { value: '4,087', label: 'test files' },
    { value: '107', label: 'custom lint rules' },
  ],
  highlights: [
    'Every customer gets its own Postgres database, created at sign-up. A deploy runs migrations across all of them, and a customer can copy production into a sandbox to test a change.',
    'Every write adds a row to a hash-chained audit log in the same transaction, with RFC 3161 timestamps, so an edited record can be detected.',
    'Budget balances are not stored. Committed, consumed and remaining amounts are calculated from posted transactions when read, so they cannot drift.',
    'One approval engine handles every document type, with signing limits per currency, delegation and separation of duties, all configured per organisation.',
    '107 custom ESLint rules, covered by tests, check the architecture on every commit, including code written by AI agents. Two examples: no data access across suites, and a permission on every endpoint.',
    'Nine NestJS services and three Next.js apps run on AWS (ECS, RDS, Aurora). The infrastructure is in Terraform, with separate staging and production and deploys from CI.',
  ],
  stack: ['Next.js', 'NestJS', 'TypeScript', 'Prisma', 'PostgreSQL', 'AWS', 'Terraform', 'Zod', 'Turborepo', 'Vercel', 'Sentry'],
  links: [],
};
