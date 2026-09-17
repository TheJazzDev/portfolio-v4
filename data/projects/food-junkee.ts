import type { Project } from '@/lib/types';

export const foodJunkee: Project = {
  id: 'food-junkee',
  title: 'Food Junkee',
  years: '2025–2026',
  role: 'Full-stack engineer, contract',
  tags: ['Web app', 'Admin panel'],
  description:
    'Online ordering for African and Caribbean food across the UK. Customers browse the menu, check out with Stripe, choose pickup or nationwide DPD delivery with next-day and weekend options, and track their parcel. Staff run orders, dishes, users and shipping from an admin dashboard that updates live as orders arrive.',
  metrics: [
    { value: '50', label: 'API routes' },
    { value: '57', label: 'pages' },
    { value: '6', label: 'transactional emails' },
  ],
  highlights: [
    'Payment integrity: a transactional checkout lock stops duplicate orders, and Stripe webhooks are verified and de-duplicated per event, with safe retry of shipment creation.',
    'A paid order creates its DPD shipment automatically, and managers print thermal labels straight from the browser. I extracted the DPD client into an open-source package, @jazzdev/dpd-local-sdk.',
    'Delivery pricing and cut-off rules on London time, with free delivery thresholds and weekend availability.',
    'Scheduled jobs for DPD token refresh and draft-order cleanup, Redis caching with an in-memory fallback, and a dashboard with revenue analytics, roles and activity logs.',
  ],
  stack: ['Next.js', 'TypeScript', 'Firebase', 'Stripe', 'DPD API', 'Upstash Redis', 'Resend', 'Vercel'],
  links: [{ label: 'foodjunkee.co.uk', href: 'https://foodjunkee.co.uk' }],
};
