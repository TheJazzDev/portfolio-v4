import type { ResumeLine } from '@/data/resume';

export function LabelledLines({ lines }: { lines: ResumeLine[] }) {
  return (
    <dl className='space-y-1'>
      {lines.map((line) => (
        <div key={line.label}>
          <dt className='inline font-medium'>{line.label}: </dt>
          <dd className='inline'>{line.value}</dd>
        </div>
      ))}
    </dl>
  );
}
