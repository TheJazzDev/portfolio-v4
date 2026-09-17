import type { ProjectTag } from '@/lib/types';

export function ProjectTags({ tags }: { tags: ProjectTag[] }) {
  return (
    <ul className='mt-2 flex flex-wrap gap-1.5' aria-label='Project type'>
      {tags.map((tag) => (
        <li
          key={tag}
          className='rounded-full border border-accent/25 bg-accent/5 px-2 py-0.5 text-[11px] font-medium text-accent sm:text-xs'>
          {tag}
        </li>
      ))}
    </ul>
  );
}
