import type { Metadata } from 'next';
import { resume } from '@/data/resume';
import { ResumeHeader } from '@/components/resume/resume-header';
import { ResumeSection } from '@/components/resume/resume-section';
import { ExperienceItem } from '@/components/resume/experience-item';
import { LabelledLines } from '@/components/resume/labelled-lines';
import { PrintButton } from '@/components/resume/print-button';
import { TextLink } from '@/components/ui/text-link';

const title = `Resume, ${resume.name}`;

export const metadata: Metadata = {
  title,
  openGraph: { title },
};

export default function ResumePage() {
  return (
    <main className='mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12 print:max-w-none print:p-0'>
      <div className='mb-6 flex items-center justify-between print:hidden'>
        <TextLink href='/'>Back to work</TextLink>
        <PrintButton />
      </div>

      <ResumeHeader />

      <ResumeSection title='Summary'>
        <p className='leading-relaxed'>{resume.summary}</p>
        <ul className='mt-3 list-disc space-y-1 pl-5'>
          {resume.summaryPoints.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </ResumeSection>

      <ResumeSection title='Core competencies'>
        <LabelledLines lines={resume.competencies} />
      </ResumeSection>

      <ResumeSection title='Experience'>
        {resume.experience.map((job) => (
          <ExperienceItem key={`${job.company}-${job.period}`} job={job} />
        ))}
      </ResumeSection>

      <ResumeSection title='Education and certifications'>
        <ul className='space-y-1'>
          {resume.education.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </ResumeSection>

      <ResumeSection title='Key achievements'>
        <ul className='list-disc space-y-1 pl-5'>
          {resume.achievements.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </ResumeSection>

      <ResumeSection title='Additional information'>
        <LabelledLines lines={resume.additional} />
      </ResumeSection>
    </main>
  );
}
