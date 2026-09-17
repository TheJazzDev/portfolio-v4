import type { Project } from '@/lib/types';
import { InlineLinkList } from '@/components/ui/inline-link-list';
import { workGrid } from './work-grid';

export function ProjectEntry({ project }: { project: Project }) {
  return (
    <article
      className={`border-t border-rule py-5 max-lg:first-of-type:border-t-0 max-lg:first-of-type:pt-0 sm:py-6 ${workGrid}`}>
      <p className='text-xs text-muted tabular-nums sm:text-sm lg:col-span-2 lg:pt-0.5'>
        {project.years}
      </p>

      <div className='mt-1 lg:col-span-3 lg:mt-0'>
        <h3 className='font-medium'>{project.title}</h3>
        <p className='text-xs text-muted sm:text-sm'>{project.role}</p>
        {project.links.length > 0 && (
          <p className='mt-1 text-xs sm:text-sm'>
            <InlineLinkList links={project.links} />
          </p>
        )}
      </div>

      <div className='mt-3 lg:col-span-5 lg:mt-0'>
        <p className='leading-relaxed'>{project.description}</p>
        {project.notes && <p className='mt-2 leading-relaxed text-muted'>{project.notes}</p>}
      </div>

      <p className='mt-3 text-xs leading-relaxed text-muted sm:text-sm lg:col-span-2 lg:mt-0'>
        {project.stack.join(', ')}
      </p>
    </article>
  );
}
