import type { Project } from '@/lib/types';
import { InlineLinkList } from '@/components/ui/inline-link-list';

export function ProjectEntry({ project }: { project: Project }) {
  return (
    <article className='border-t border-rule py-6 first-of-type:border-t-0 first-of-type:pt-0 sm:py-8'>
      <div className='flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6'>
        <h3 className='text-lg font-medium sm:text-xl'>{project.title}</h3>
        <p className='shrink-0 text-xs text-muted tabular-nums sm:text-sm'>{project.years}</p>
      </div>

      <p className='mt-1 text-xs text-muted sm:text-sm'>
        {project.role}
        {project.links.length > 0 && (
          <>
            {' · '}
            <InlineLinkList links={project.links} />
          </>
        )}
      </p>

      <p className='mt-4 leading-relaxed'>{project.description}</p>
      {project.notes && <p className='mt-2 leading-relaxed text-muted'>{project.notes}</p>}

      <ul className='mt-4 flex flex-wrap gap-1.5'>
        {project.stack.map((tech) => (
          <li key={tech} className='rounded-md bg-panel px-2 py-0.5 text-xs text-muted'>
            {tech}
          </li>
        ))}
      </ul>
    </article>
  );
}
