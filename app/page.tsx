import { Intro } from '@/components/home/intro';
import { Section } from '@/components/home/section';
import { WorkColumns } from '@/components/home/work-columns';
import { ProjectEntry } from '@/components/home/project-entry';
import { SiteFooter } from '@/components/home/site-footer';
import { InlineLinkList } from '@/components/ui/inline-link-list';
import { selectedWork } from '@/data/selected-work';
import { earlierWork } from '@/data/earlier-work';
import { tools } from '@/data/tools';

export default function HomePage() {
  return (
    <main className='mx-auto w-full max-w-7xl space-y-12 px-4 py-10 sm:space-y-16 sm:px-8 sm:py-14 lg:px-12'>
      <Intro />

      <Section title='Selected work' aside={`${selectedWork.length} projects`}>
        <WorkColumns />
        {selectedWork.map((project) => (
          <ProjectEntry key={project.id} project={project} />
        ))}
      </Section>

      <div className='grid gap-12 sm:gap-16 md:grid-cols-2 md:gap-8 lg:gap-16'>
        <Section title='Earlier work'>
          <p className='leading-relaxed'>
            <InlineLinkList links={earlierWork} />
          </p>
        </Section>

        <Section title='Tools and open source'>
          <p className='leading-relaxed'>
            <InlineLinkList links={tools} />
          </p>
        </Section>
      </div>

      <SiteFooter />
    </main>
  );
}
