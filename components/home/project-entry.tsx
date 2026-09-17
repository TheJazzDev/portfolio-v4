import type { Project } from '@/lib/types';
import { InlineLinkList } from '@/components/ui/inline-link-list';

export function ProjectEntry({ project }: { project: Project }) {
  return (
    <article className='border-t border-rule py-5 first:border-t-0 sm:py-6'>
      <div className='flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4'>
        <h3 className='font-medium'>{project.title}</h3>
        <p className='shrink-0 text-xs text-muted tabular-nums sm:text-sm'>{project.years}</p>
      </div>
      <p className='mt-0.5 text-xs text-muted sm:text-sm'>{project.role}</p>
      <p className='mt-3 leading-relaxed'>{project.description}</p>
      {project.notes && <p className='mt-2 leading-relaxed'>{project.notes}</p>}
      <p className='mt-3 text-xs text-muted sm:text-sm'>{project.stack.join(', ')}</p>
      {project.links.length > 0 && (
        <p className='mt-1 text-xs sm:text-sm'>
          <InlineLinkList links={project.links} />
        </p>
      )}
    </article>
  );
}
