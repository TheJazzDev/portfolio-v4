import type { Project } from '@/lib/types';

export const foodJunkee: Project = {
  id: 'food-junkee',
  title: 'Food Junkee',
  years: '2025–2026',
  role: 'Full-stack engineer, contract',
  tags: ['Web app', 'Admin panel'],
  description:
    'Online ordering for African and Caribbean food in the UK. Customers pay with Stripe and choose pickup or DPD delivery. Staff manage orders, the menu and shipping from an admin dashboard that updates as orders arrive.',
  metrics: [
    { value: '50', label: 'API routes' },
    { value: '57', label: 'pages' },
    { value: '6', label: 'transactional emails' },
  ],
  highlights: [
    'A checkout lock prevents duplicate orders, and Stripe webhooks are verified and de-duplicated per event.',
    'A paid order creates its DPD shipment automatically, and staff print thermal labels from the browser. I published the DPD client as an npm package, @jazzdev/dpd-local-sdk.',
    'Delivery prices and cut-off times follow London time, with free-delivery thresholds and weekend slots.',
  ],
  stack: ['Next.js', 'TypeScript', 'Firebase', 'Stripe', 'DPD API', 'Upstash Redis', 'Resend', 'Vercel'],
  links: [{ label: 'foodjunkee.co.uk', href: 'https://foodjunkee.co.uk' }],
};
