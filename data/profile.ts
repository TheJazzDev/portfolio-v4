import type { SiteLink } from '@/lib/types';

const summary =
  'I design and build web and mobile products end to end, from the database and API to the interface people use. I lead frontend teams and set the architecture for multi-app platforms.';

export const profile = {
  name: 'Taiwo Babarinde',
  title: 'Senior Software Engineer',
  location: 'Lagos, Nigeria',
  summary,
  intro: `${summary} Below is a selection of that work.`,
  contacts: [
    { label: 'Email', href: 'mailto:babsman4all@gmail.com' },
    { label: 'GitHub', href: 'https://github.com/TheJazzDev' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/taiwo-babarinde/' },
    { label: 'Resume', href: '/resume' },
  ] satisfies SiteLink[],
};
