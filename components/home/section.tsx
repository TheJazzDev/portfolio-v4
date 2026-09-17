import type { ReactNode } from 'react';

type SectionProps = {
  id?: string;
  title: string;
  aside?: string;
  children: ReactNode;
};

export function Section({ id, title, aside, children }: SectionProps) {
  return (
    <section id={id} className='scroll-mt-10'>
      <div className='mb-6 flex items-baseline justify-between gap-4 border-b border-ink pb-3 sm:mb-8'>
        <h2 className='text-base font-medium sm:text-lg'>{title}</h2>
        {aside && <p className='text-xs text-muted sm:text-sm'>{aside}</p>}
      </div>
      {children}
    </section>
  );
}
