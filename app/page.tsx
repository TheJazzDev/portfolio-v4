import { Intro } from '@/components/home/intro';
import { Section } from '@/components/home/section';
import { ProjectEntry } from '@/components/home/project-entry';
import { SiteFooter } from '@/components/home/site-footer';
import { InlineLinkList } from '@/components/ui/inline-link-list';
import { selectedWork } from '@/data/selected-work';
import { earlierWork } from '@/data/earlier-work';
import { tools } from '@/data/tools';

export default function HomePage() {
  return (
    <main className='mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-16'>
      <Intro />

      <Section title='Selected work'>
        <div className='mt-1'>
          {selectedWork.map((project) => (
            <ProjectEntry key={project.id} project={project} />
          ))}
        </div>
      </Section>

      <Section title='Earlier work'>
        <p className='mt-3 leading-relaxed'>
          <InlineLinkList links={earlierWork} />
        </p>
      </Section>

      <Section title='Tools and open source'>
        <p className='mt-3 leading-relaxed'>
          <InlineLinkList links={tools} />
        </p>
      </Section>

      <SiteFooter />
    </main>
  );
}
