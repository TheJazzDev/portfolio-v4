import type { SiteLink } from '@/lib/types';

const summary =
  'I build complex products end to end, from multi-tenant infrastructure and financial ledgers to the web and mobile apps people use every day.';

export const profile = {
  name: 'Taiwo Babarinde',
  title: 'Senior Software Engineer',
  location: 'Lagos, Nigeria',
  summary,
  intro: `${summary} Right now that means an audit-grade ERP that gives every customer its own database, and a crypto platform with a custodial wallet and an AI engine. I also lead a frontend team shipping seven accounting apps.`,
  contacts: [
    { label: 'Email', href: 'mailto:babsman4all@gmail.com' },
    { label: 'GitHub', href: 'https://github.com/TheJazzDev' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/taiwobabarinde/' },
    { label: 'Resume', href: '/resume' },
  ] satisfies SiteLink[],
};
