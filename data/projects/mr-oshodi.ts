import type { Project } from '@/lib/types';

export const mrOshodi: Project = {
  id: 'mr-oshodi',
  title: 'Mr Oshodi',
  years: '2023',
  role: 'Frontend engineer',
  tags: ['Website'],
  description:
    'A personal brand website for Ismail Oshodi, an entrepreneur, logistics operator and speaker connecting the UK and Nigeria. It presents his services, from distribution and deal brokering to speaking and mentorship, with testimonials and a contact form.',
  highlights: [
    'A React single-page app with routes loaded on demand.',
    'Scroll-driven GSAP animation throughout.',
    'The contact form sends email without a backend.',
  ],
  stack: ['React', 'Vite', 'React Router', 'GSAP', 'Tailwind CSS', 'EmailJS'],
  links: [{ label: 'mr-oshodi.vercel.app', href: 'https://mr-oshodi.vercel.app' }],
};
