import { describe, expect, test } from 'bun:test';
import { profile } from '@/data/profile';
import { selectedWork } from '@/data/selected-work';
import { earlierWork } from '@/data/earlier-work';
import { tools } from '@/data/tools';
import { pastVersions } from '@/data/past-versions';
import { resume } from '@/data/resume';
import type { SiteLink } from '@/lib/types';

const homeContent = { profile, selectedWork, earlierWork, tools, pastVersions };

function collectStrings(value: unknown): string[] {
  if (typeof value === 'string') return [value];
  if (Array.isArray(value)) return value.flatMap(collectStrings);
  if (value && typeof value === 'object') {
    return Object.values(value).flatMap(collectStrings);
  }
  return [];
}

const allLinks: SiteLink[] = [
  ...profile.contacts,
  ...selectedWork.flatMap((project) => project.links),
  ...earlierWork,
  ...tools,
  ...pastVersions,
  ...resume.links,
];

describe('home content', () => {
  test('lists the nine selected projects in order', () => {
    expect(selectedWork.map((project) => project.id)).toEqual([
      'settrium',
      'blocnet',
      'digit-tally',
      'food-junkee',
      '67-humanitarian-foundation',
      'valley-of-mercy',
      'asiko-foods',
      'olamide-sax',
      'ohc-fc',
    ]);
  });

  test('project ids are unique', () => {
    const ids = selectedWork.map((project) => project.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  test('every link is https, mailto or an internal path', () => {
    for (const link of allLinks) {
      expect(link.href).toMatch(/^(https:\/\/|mailto:|\/)/);
    }
  });

  test('does not link the offline 67hf.org site', () => {
    expect(allLinks.some((link) => link.href.includes('67hf.org'))).toBe(false);
  });

  test('copy avoids em dashes and stock phrases', () => {
    const banned = [/—/, /passionate/i, /crafting/i, /seamless/i, /robust/i, /leverage/i, /↗|→/];
    for (const text of collectStrings(homeContent)) {
      for (const pattern of banned) {
        expect({ text, match: pattern.test(text) }).toEqual({ text, match: false });
      }
    }
  });
});

describe('resume content', () => {
  test('uses the new headline and portfolio link', () => {
    expect(resume.headline).toBe('Software Engineer');
    expect(resume.links.map((link) => link.href)).toContain('https://jazzdev.vercel.app');
  });

  test('has no emojis and no "lunch" typo', () => {
    const text = collectStrings(resume).join(' ');
    expect(/\p{Extended_Pictographic}/u.test(text)).toBe(false);
    expect(text).not.toContain('lunch');
  });

  test('keeps all five roles from v3', () => {
    expect(resume.experience.map((job) => job.company)).toEqual([
      'Food Junkee',
      'Candour IT Services',
      'VastFluid Finance',
      'DEFT Trader',
      'StableDoc',
    ]);
  });

  test('resume copy avoids stock phrases', () => {
    const banned = [/—/, /passionate/i, /crafting/i, /seamless/i, /robust/i, /leverage/i, /results-driven/i, /pixel-perfect/i, /successfully/i, /comprehensive/i];
    for (const text of collectStrings(resume)) {
      for (const pattern of banned) {
        expect({ text, match: pattern.test(text) }).toEqual({ text, match: false });
      }
    }
  });
});
