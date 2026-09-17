import type { Project } from '@/lib/types';

export const asikoFoods: Project = {
  id: 'asiko-foods',
  title: 'Asiko Foods',
  years: '2026–now',
  role: 'Frontend engineer',
  tags: ['Web app', 'Admin panel'],
  description:
    'Commerce for African and Caribbean groceries, serving retail shoppers and wholesale trade buyers. Four apps: a retail store with rewards, referrals and gift cards; a wholesale portal with trade applications and invoices; a catalogue tool for field sales; and an admin for products, campaigns, discounts and delivery zones.',
  metrics: [
    { value: '4', label: 'Next.js apps' },
    { value: '99', label: 'pages' },
    { value: '182', label: 'API route handlers' },
  ],
  highlights: [
    'A backend-for-frontend layer in each app keeps auth tokens in httpOnly cookies and refreshes them transparently.',
    'A typed gateway client with timeouts, exponential backoff with jitter and idempotency keys, validated with Zod.',
    'Stripe Payment Element checkout keyed to the order for safe retries.',
    'One design system and shared packages across all four apps in a Turborepo monorepo, with a tracked log of backend defects re-tested before each is closed.',
  ],
  stack: ['Next.js', 'TypeScript', 'TanStack Query', 'Zustand', 'Zod', 'Stripe', 'Tailwind CSS', 'Turborepo'],
  links: [],
};
