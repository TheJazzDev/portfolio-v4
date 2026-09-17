import type { Project } from '@/lib/types';

export const sixtySevenHf: Project = {
  id: '67-humanitarian-foundation',
  title: '67 Humanitarian Foundation',
  years: '2025–2026',
  role: 'Full-stack engineer',
  tags: ['Web app', 'Admin panel'],
  description:
    'The membership platform for the Nigerian Army 67 Intake and its 3,600+ members across all 36 states. Members get a portal with their profile, a directory and news; the public site covers donations, volunteering, a gallery and a hall of fame honouring fallen members; staff run members, content, family support and condolence letters from a secure admin.',
  metrics: [
    { value: '78', label: 'API routes' },
    { value: '64', label: 'pages' },
    { value: '6', label: 'admin roles' },
  ],
  highlights: [
    'Every admin action is written to an audit trail with the actor, IP address and device.',
    'Admin sessions are tracked per device and can be revoked remotely.',
    'Member records import from a Google Sheets form, mapping 22 columns to structured data.',
    'Donations are recorded before the donor leaves for Paystack, so abandoned payments stay visible. System endpoints handle health checks, maintenance and account housekeeping.',
  ],
  stack: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'NextAuth', 'Paystack', 'Cloudinary', 'Resend'],
  links: [{ label: '67hf.vercel.app', href: 'https://67hf.vercel.app' }],
};
