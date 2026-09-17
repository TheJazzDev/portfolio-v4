import type { ResumeJob } from '@/data/resume';

export function ExperienceItem({ job }: { job: ResumeJob }) {
  const meta = [job.company, job.period, job.location].filter(Boolean).join(' · ');

  return (
    <div className='mb-5 last:mb-0'>
      <h3 className='font-medium'>{job.title}</h3>
      <p className='text-xs text-muted sm:text-sm'>{meta}</p>
      <p className='mt-1 text-xs text-muted sm:text-sm'>{job.about}</p>
      <ul className='mt-2 list-disc space-y-1 pl-5'>
        {job.points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
      {job.skills && <p className='mt-2 text-xs text-muted sm:text-sm'>{job.skills}</p>}
    </div>
  );
}
