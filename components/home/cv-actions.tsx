import Link from 'next/link';
import { profile } from '@/data/profile';
import { DownloadIcon } from '@/components/ui/download-icon';

const base =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors';

export function CvActions() {
  return (
    <div className='mt-5 flex flex-wrap gap-2 sm:mt-6 sm:gap-3'>
      <Link
        href={profile.cv.download}
        className={`${base} border-ink bg-ink text-page hover:border-accent hover:bg-accent`}>
        <DownloadIcon className='size-4 shrink-0' />
        Download CV
      </Link>
      <Link href={profile.cv.view} className={`${base} border-ink/25 hover:border-ink`}>
        View CV
      </Link>
    </div>
  );
}
