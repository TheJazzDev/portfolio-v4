import type { Project } from '@/lib/types';

export const sixtySevenHf: Project = {
  id: '67-humanitarian-foundation',
  title: '67 Humanitarian Foundation',
  years: '2025–2026',
  role: 'Full-stack engineer',
  tags: ['Web app', 'Admin panel'],
  description:
    'Membership platform for the Nigerian Army 67 Intake, with 3,600+ members in all 36 states. It has a member portal and directory, a public site that takes donations, and an admin for staff.',
  metrics: [
    { value: '78', label: 'API routes' },
    { value: '64', label: 'pages' },
    { value: '6', label: 'admin roles' },
  ],
  highlights: [
    'Every admin action is logged with the actor, IP address and device.',
    'Admin sessions are tracked per device and can be revoked remotely.',
    'Member records are imported from a Google Sheets form.',
    'A donation is saved before the donor is sent to Paystack, so abandoned payments stay visible.',
  ],
  stack: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'NextAuth', 'Paystack', 'Cloudinary', 'Resend'],
  links: [{ label: '67hf.vercel.app', href: 'https://67hf.vercel.app' }],
};
