import { SidePanel } from '@/components/home/side-panel';
import { Section } from '@/components/home/section';
import { ProjectEntry } from '@/components/home/project-entry';
import { LinkGrid } from '@/components/home/link-grid';
import { selectedWork } from '@/data/selected-work';
import { earlierWork } from '@/data/earlier-work';
import { tools } from '@/data/tools';

export default function HomePage() {
  return (
    <div className='lg:flex'>
      <SidePanel />

      <main className='min-w-0 space-y-12 px-4 py-10 sm:space-y-16 sm:px-8 sm:py-14 lg:flex-1 lg:px-12 xl:grid xl:grid-cols-[minmax(0,1fr)_15rem] xl:items-start xl:gap-x-12 xl:space-y-0 2xl:gap-x-16 2xl:px-16'>
        <Section id='work' title='Selected work' aside={`${selectedWork.length} projects`}>
          {selectedWork.map((project) => (
            <ProjectEntry key={project.id} project={project} />
          ))}
        </Section>

        <div className='space-y-12 sm:space-y-16 xl:sticky xl:top-14 xl:space-y-10'>
          <Section id='earlier' title='Earlier work'>
            <LinkGrid links={earlierWork} />
          </Section>

          <Section id='tools' title='Tools and open source'>
            <LinkGrid links={tools} />
          </Section>
        </div>
      </main>
    </div>
  );
}
