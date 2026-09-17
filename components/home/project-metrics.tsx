import type { ProjectMetric } from '@/lib/types';

const columnClasses: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-2 sm:grid-cols-4',
};

export function ProjectMetrics({ metrics }: { metrics: ProjectMetric[] }) {
  return (
    <dl className={`mt-4 grid ${columnClasses[metrics.length] ?? columnClasses[4]} gap-px overflow-hidden rounded-lg border border-rule bg-rule sm:mt-5`}>
      {metrics.map((metric) => (
        <div key={metric.label} className='bg-page px-3 py-2.5 sm:px-4 sm:py-3'>
          <dt className='sr-only'>{metric.label}</dt>
          <dd className='text-base font-semibold tracking-tight tabular-nums sm:text-lg'>{metric.value}</dd>
          <dd className='text-[11px] leading-snug text-muted sm:text-xs'>{metric.label}</dd>
        </div>
      ))}
    </dl>
  );
}
