import type { ReactNode } from 'react';

type SectionProps = {
  title: string;
  children: ReactNode;
};

export function Section({ title, children }: SectionProps) {
  return (
    <section className='mt-10 sm:mt-14'>
      <h2 className='text-base font-medium sm:text-lg'>{title}</h2>
      {children}
    </section>
  );
}
