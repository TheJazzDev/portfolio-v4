import type { Project } from '@/lib/types';

export const olamideSax: Project = {
  id: 'olamide-sax',
  title: 'Olamide Sax',
  years: '2026',
  role: 'Frontend engineer',
  tags: ['Website'],
  description:
    'The official website of a UK-based Afro-fusion multi-instrumentalist, winner of Best Instrumentalist at the Eko Heritage Awards 2026, with music, videos, photos and press.',
  highlights: [
    'Rebuilt without a framework in HTML, CSS and JavaScript with GSAP. Every page still works with JavaScript off, if animation fails, or with reduced motion.',
    'A deploy build minifies and bundles everything with content-hashed file names, so assets are cached for a year and still update on release.',
    'YouTube embeds load only when played, from the privacy-enhanced player. Fonts are self-hosted and preloaded, and structured data links the artist to Wikidata.',
    'The first version was a Next.js app with a small CMS where the artist managed videos, photos and press coverage.',
  ],
  stack: ['HTML', 'CSS', 'JavaScript', 'GSAP', 'Bun', 'Next.js', 'Prisma'],
  links: [
    { label: 'olamidesax.co.uk', href: 'https://olamidesax.co.uk' },
    { label: 'first version', href: 'https://v1.olamidesax.co.uk' },
  ],
};
