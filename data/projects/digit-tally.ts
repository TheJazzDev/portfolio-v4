import type { Project } from '@/lib/types';

export const digitTally: Project = {
  id: 'digit-tally',
  title: 'Digit Tally',
  years: '2024–now',
  role: 'Lead frontend engineer, Candour IT Services',
  tags: ['Web app'],
  description:
    'Cloud accounting for Nigerian businesses. It covers invoicing, purchases, journals, tax (VAT, WHT, PAYE and CIT), inventory and payroll, across multiple branches.',
  metrics: [
    { value: '7', label: 'independently deployed apps' },
    { value: '180+', label: 'screens' },
    { value: '3', label: 'npm packages published' },
    { value: '3,800+', label: 'commits authored' },
  ],
  highlights: [
    'I lead four frontend engineers and designed the micro-frontend setup: seven Next.js apps on separate subdomains that share one sign-in.',
    'Each app reaches the backend through an adapter layer, so a change in an API does not reach UI code.',
    'A serverless PDF service renders 10 document types, including invoices and payslips, in headless Chromium.',
    'Every pull request runs lint, type checks, unit tests and Playwright smoke tests. A deploy skips the apps that did not change.',
    'We publish our component library, utilities and developer CLI to npm.',
  ],
  stack: ['Next.js', 'TypeScript', 'Turborepo', 'Redux Toolkit', 'TanStack Query', 'Tailwind CSS', 'Puppeteer', 'Playwright', 'Vercel'],
  links: [{ label: 'digit-tally.io', href: 'https://digit-tally.io' }],
};
