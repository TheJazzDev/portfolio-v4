import type { SiteLink } from '@/lib/types';

const summary =
  'I build web and mobile products for clients, usually the whole thing: the database, the API and the screens people use.';

export const profile = {
  name: 'Taiwo Babarinde',
  title: 'Software Engineer',
  location: 'Lagos, Nigeria',
  summary,
  intro: `${summary} I spend my time on that work, so this page is just a list of it.`,
  contacts: [
    { label: 'Email', href: 'mailto:babsman4all@gmail.com' },
    { label: 'GitHub', href: 'https://github.com/TheJazzDev' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/taiwo-babarinde/' },
    { label: 'Resume', href: '/resume' },
  ] satisfies SiteLink[],
};
