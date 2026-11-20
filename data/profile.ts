import type { SiteLink } from '@/lib/types';

export const profile = {
  name: 'Taiwo Babarinde',
  title: 'Software Engineer',
  location: 'Lagos, Nigeria',
  openTo: 'Open to frontend, lead and AI engineering roles, and to backend roles on teams that build with AI.',
  /** One line for search results and link previews. */
  summary:
    'Full-stack software engineer in Lagos, Nigeria. I design and build financial software: databases, APIs, AWS infrastructure, and web and mobile apps.',
  intro:
    "I'm a full-stack engineer with five years of experience, mostly on financial software: accounting, ERP, payments and wallets. I design the system and build all of it, from the database and APIs to the AWS infrastructure and the web and mobile apps. I've taken products from the first commit to production on my own, and I lead a team of four frontend engineers.",
  contacts: [
    { label: 'Email', href: 'mailto:babsman4all@gmail.com' },
    { label: 'GitHub', href: 'https://github.com/TheJazzDev' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/taiwobabarinde/' },
    { label: 'X', href: 'https://x.com/jazz__dev' },
  ] satisfies SiteLink[],
  cv: {
    view: '/resume',
    download: '/resume?download=1',
  },
};
