import type { Project } from '@/lib/types';

export const steadant: Project = {
  id: 'steadant',
  title: 'Steadant',
  years: '2026–now',
  role: 'Founder and principal engineer',
  tags: ['ERP', 'Web app', 'Admin panel', 'Landing page'],
  description:
    'An audit-grade, multi-tenant ERP, multi-entity from day one. Budgeting & Planning and Procurement are live: dimensional multi-year budgets with cross-subsidiary consolidation, and the full procure-to-pay chain from requisition, RFQ and comparative bid analysis through contracts, purchase orders, goods receipt, 3-way invoice matching and payment. Approved invoices and payments post to a double-entry general ledger automatically, and Accounting and Reporting are being built on the same platform: period close, budget vs actual, the financial statements and AP and AR ageing.',
  metrics: [
    { value: '1,389', label: 'API endpoints' },
    { value: '264', label: 'data models' },
    { value: '2,393', label: 'test files' },
    { value: '58', label: 'custom lint rules' },
  ],
  highlights: [
    'Database per tenant: every organisation is provisioned its own Postgres database at sign-up, with encrypted connection strings, a routing pool and migrations rolled across the whole fleet on deploy. Each organisation can also spin up sandbox copies of its production data to test changes safely.',
    'Tamper-evident audit trail: every write lands in a hash-chained audit log inside the same transaction, anchored with RFC 3161 timestamps, with evidence packs auditors can open by link.',
    'Balances are never stored. Committed, consumed and remaining budget are computed from the ledger at read time, so figures always reconcile.',
    'One approval engine for every document type, with signing matrices, per-currency ceilings, delegation and separation of duties. Process strictness is policy per organisation, so an NGO and a small business run the same code.',
    'Built with AI coding agents under machine-enforced architecture: 58 custom ESLint rules, each tested, run on every edit and commit (no cross-suite data access, audit writes inside transactions, a permission on every endpoint), backed by 476 written feature specs.',
    'Seven NestJS services and three Next.js apps. Suite entitlements are checked on every request, with about 180 role-based permissions, subdomain-only sign-in, signed PDF rendering, live notifications and Stripe plus Paystack billing.',
  ],
  stack: ['Next.js', 'NestJS', 'TypeScript', 'Prisma', 'PostgreSQL', 'Neon', 'Zod', 'Turborepo', 'Railway', 'Vercel', 'Sentry'],
  links: [
    { label: 'steadant.com', href: 'https://steadant.com' },
    { label: 'github.com/Steadant', href: 'https://github.com/Steadant' },
  ],
};
