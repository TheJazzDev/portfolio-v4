import { resume } from '@/data/resume';
import { InlineLinkList } from '@/components/ui/inline-link-list';

export function ResumeHeader() {
  return (
    <header className='border-b border-rule pb-5'>
      <h1 className='text-xl font-semibold sm:text-2xl'>{resume.name}</h1>
      <p className='mt-1 text-muted'>{resume.headline}</p>
      <p className='mt-3 text-xs text-muted sm:text-sm'>{resume.contactLine}</p>
      <p className='mt-1 text-xs sm:text-sm'>
        <InlineLinkList links={resume.links} separator=' · ' />
      </p>
    </header>
  );
}
