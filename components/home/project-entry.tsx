import type { Project } from '@/lib/types';
import { InlineLinkList } from '@/components/ui/inline-link-list';
import { ArrowUpRightIcon } from '@/components/ui/arrow-up-right-icon';
import { ProjectTags } from './project-tags';

function ProjectTitle({ project }: { project: Project }) {
  const primaryLink = project.links[0];

  if (!primaryLink) {
    return <h3 className='text-lg font-medium sm:text-xl'>{project.title}</h3>;
  }

  return (
    <h3 className='text-lg font-medium sm:text-xl'>
      <a
        href={primaryLink.href}
        target='_blank'
        rel='noopener noreferrer'
        className='group inline-flex items-baseline gap-1 underline-offset-4 hover:text-accent hover:underline'>
        {project.title}
        <ArrowUpRightIcon className='size-4 shrink-0 self-center text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent' />
      </a>
    </h3>
  );
}

export function ProjectEntry({ project }: { project: Project }) {
  return (
    <article className='border-t border-rule py-6 first-of-type:border-t-0 first-of-type:pt-0 sm:py-8'>
      <div className='flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6'>
        <ProjectTitle project={project} />
        <p className='shrink-0 text-xs text-muted tabular-nums sm:text-sm'>{project.years}</p>
      </div>

      <ProjectTags tags={project.tags} />

      <p className='mt-2 text-xs text-muted sm:text-sm'>
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

      <ul className='mt-4 flex flex-wrap gap-1.5' aria-label='Tech stack'>
        {project.stack.map((tech) => (
          <li key={tech} className='rounded-md bg-panel px-2 py-0.5 text-xs text-muted'>
            {tech}
          </li>
        ))}
      </ul>
    </article>
  );
}
