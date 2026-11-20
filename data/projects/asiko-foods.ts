import type { Project } from '@/lib/types';

export const asikoFoods: Project = {
  id: 'asiko-foods',
  title: 'Asiko Foods',
  years: '2026–now',
  role: 'Frontend engineer',
  tags: ['Web app', 'Admin panel'],
  description:
    'An online grocery store for African and Caribbean food, for retail shoppers and wholesale buyers. There are four apps: the retail store, a wholesale portal, a catalogue for field sales and an admin.',
  metrics: [
    { value: '4', label: 'Next.js apps' },
    { value: '99', label: 'pages' },
    { value: '182', label: 'API route handlers' },
  ],
  highlights: [
    'Each app has a backend-for-frontend layer that keeps auth tokens in httpOnly cookies and refreshes them.',
    'A typed API client handles timeouts, retries with backoff and idempotency keys, and validates responses with Zod.',
    'Stripe checkout is keyed to the order, so a retry never charges twice.',
    'All four apps share one design system in a Turborepo monorepo.',
  ],
  stack: ['Next.js', 'TypeScript', 'TanStack Query', 'Zustand', 'Zod', 'Stripe', 'Tailwind CSS', 'Turborepo'],
  links: [],
};
