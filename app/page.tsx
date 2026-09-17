import { SidePanel } from '@/components/home/side-panel';
import { Section } from '@/components/home/section';
import { ProjectEntry } from '@/components/home/project-entry';
import { InlineLinkList } from '@/components/ui/inline-link-list';
import { selectedWork } from '@/data/selected-work';
import { earlierWork } from '@/data/earlier-work';
import { tools } from '@/data/tools';

export default function HomePage() {
  return (
    <div className='lg:flex'>
      <SidePanel />

      <main className='space-y-12 px-4 py-10 sm:space-y-16 sm:px-8 sm:py-14 lg:flex-1 lg:px-12 xl:px-16'>
        <Section id='work' title='Selected work' aside={`${selectedWork.length} projects`}>
          {selectedWork.map((project) => (
            <ProjectEntry key={project.id} project={project} />
          ))}
        </Section>

        <Section id='earlier' title='Earlier work'>
          <p className='leading-relaxed'>
            <InlineLinkList links={earlierWork} />
          </p>
        </Section>

        <Section id='tools' title='Tools and open source'>
          <p className='leading-relaxed'>
            <InlineLinkList links={tools} />
          </p>
        </Section>
      </main>
    </div>
  );
}
