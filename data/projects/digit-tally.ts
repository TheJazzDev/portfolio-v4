import type { Project } from '@/lib/types';

export const digitTally: Project = {
  id: 'digit-tally',
  title: 'Digit Tally',
  years: '2024–now',
  role: 'Lead frontend engineer, Candour IT Services',
  tags: ['Web app'],
  description:
    'Cloud accounting for Nigerian businesses. Invoices, quotes and credit notes; purchase orders and payables; a chart of accounts and journals; VAT, withholding tax, PAYE and company income tax; inventory with stock takes and goods received; and payroll with leave and payslips, across multiple branches with roles, permissions and two-factor sign-in.',
  metrics: [
    { value: '7', label: 'independently deployed apps' },
    { value: '180+', label: 'screens' },
    { value: '3', label: 'npm packages published' },
    { value: '3,800+', label: 'commits authored' },
  ],
  highlights: [
    'I lead a team of four frontend engineers and own the micro-frontend architecture: seven Next.js apps on their own subdomains, sharing one sign-in through parent-domain cookies and edge session checks.',
    'A request router sends each call to the right backend service in each of four environments, and a per-app adapter layer keeps UI code independent of API shapes.',
    'A serverless PDF service renders 10 document types, including invoices, purchase orders and payslips, in headless Chromium with embedded fonts.',
    'CI runs lint, type checks, unit tests and Playwright smoke tests on every pull request, plus nightly API contract drift checks. Deploys skip apps whose code did not change.',
    'Published our component library, utilities and developer CLI to npm. The CLI signs developers in with Ed25519 key pairs.',
  ],
  stack: ['Next.js', 'TypeScript', 'Turborepo', 'Redux Toolkit', 'TanStack Query', 'Tailwind CSS', 'Puppeteer', 'Playwright', 'Vercel'],
  links: [{ label: 'digit-tally.io', href: 'https://digit-tally.io' }],
};
