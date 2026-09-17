import type { Project } from '@/lib/types';

export const settrium: Project = {
  id: 'settrium',
  title: 'Settrium',
  years: '2026–now',
  role: 'Founder and lead engineer',
  tags: ['ERP', 'Web app', 'Admin panel', 'Landing page'],
  description:
    'An audit-grade, multi-tenant ERP, multi-entity from day one. Budget & Planning and Procurement are live: dimensional multi-year budgets with cross-subsidiary consolidation, and the full procure-to-pay chain from requisition, RFQ and comparative bid analysis through contracts, purchase orders, goods receipt, 3-way invoice matching and payment. Approved invoices and payments post to the general ledger automatically. Inventory, Finance, Order-to-Cash, HR, Projects, CRM and Assets follow as independent suites on the same platform.',
  metrics: [
    { value: '7', label: 'NestJS services' },
    { value: '142', label: 'data models' },
    { value: '600+', label: 'API endpoints' },
    { value: '900', label: 'test files' },
  ],
  highlights: [
    'Database per tenant: every organisation is provisioned its own Postgres database as a Neon branch at sign-up, with encrypted connection strings, a routing pool and migrations rolled across the whole fleet on deploy.',
    'Tamper-evident audit trail: every write lands in a hash-chained audit log inside the same transaction, anchored with RFC 3161 timestamps, with evidence packs auditors can open by link.',
    'Balances are never stored. Committed, consumed and remaining budget are computed from the ledger at read time, so figures always reconcile.',
    'One approval engine for every document type, with signing matrices, per-currency ceilings, delegation and separation of duties. Process strictness is policy per organisation, so an NGO and a small business run the same code.',
    'Architecture rules enforced in CI by 31 custom ESLint rules, each tested: no cross-suite imports, audit writes inside transactions, permission decorators on every endpoint.',
    'Suite entitlements checked on every request, roughly 120 role-based permissions, subdomain-only sign-in, 77 transactional email templates, signed PDF rendering, live notifications over SSE, and Stripe plus Paystack billing.',
  ],
  stack: ['Next.js', 'NestJS', 'TypeScript', 'Prisma', 'PostgreSQL', 'Neon', 'Zod', 'Turborepo', 'Railway', 'Vercel', 'Sentry'],
  links: [{ label: 'settrium.com', href: 'https://settrium.com' }],
};
