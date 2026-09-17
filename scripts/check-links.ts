import { profile } from '@/data/profile';
import { selectedWork } from '@/data/selected-work';
import { earlierWork } from '@/data/earlier-work';
import { tools } from '@/data/tools';
import { pastVersions } from '@/data/past-versions';
import { resume } from '@/data/resume';

// npm and LinkedIn block scripted requests, so a 403/999 from them is not a broken link.
const BOT_BLOCKING_HOSTS = ['www.npmjs.com', 'www.linkedin.com'];

const hrefs = [
  ...profile.contacts,
  ...selectedWork.flatMap((project) => project.links),
  ...earlierWork,
  ...tools,
  ...pastVersions,
  ...resume.links,
]
  .map((link) => link.href)
  .filter((href) => href.startsWith('https://'));

const unique = [...new Set(hrefs)];

const results = await Promise.all(
  unique.map(async (href) => {
    try {
      const response = await fetch(href, { redirect: 'follow', signal: AbortSignal.timeout(15000) });
      return { href, status: response.status };
    } catch {
      return { href, status: 0 };
    }
  }),
);

const broken = results.filter(({ href, status }) => {
  if (status >= 200 && status < 400) return false;
  return !BOT_BLOCKING_HOSTS.includes(new URL(href).hostname);
});

for (const { href, status } of results) console.log(status, href);

if (broken.length > 0) {
  console.error(`\n${broken.length} broken link(s)`);
  process.exit(1);
}
