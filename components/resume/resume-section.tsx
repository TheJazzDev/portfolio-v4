import type { ReactNode } from 'react';

type ResumeSectionProps = {
  title: string;
  children: ReactNode;
};

export function ResumeSection({ title, children }: ResumeSectionProps) {
  return (
    <section className='mt-6 sm:mt-8'>
      <h2 className='border-b border-rule pb-1 text-base font-medium sm:text-lg'>{title}</h2>
      <div className='mt-3'>{children}</div>
    </section>
  );
}
