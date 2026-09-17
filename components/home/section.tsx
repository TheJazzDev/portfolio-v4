import type { ReactNode } from 'react';

type SectionProps = {
  title: string;
  aside?: string;
  children: ReactNode;
};

export function Section({ title, aside, children }: SectionProps) {
  return (
    <section>
      <div className='mb-4 flex items-baseline justify-between gap-4 border-b border-ink pb-3 sm:mb-6'>
        <h2 className='text-base font-medium sm:text-lg'>{title}</h2>
        {aside && <p className='text-xs text-muted sm:text-sm'>{aside}</p>}
      </div>
      {children}
    </section>
  );
}
