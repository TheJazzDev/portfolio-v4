'use client';

import { DownloadIcon } from '@/components/ui/download-icon';

export function PrintButton() {
  return (
    <button
      type='button'
      onClick={() => window.print()}
      className='inline-flex min-h-11 items-center gap-2 rounded-lg border border-ink bg-ink px-4 py-2 text-sm font-medium text-page transition-colors hover:border-accent hover:bg-accent print:hidden'>
      <DownloadIcon className='size-4 shrink-0' />
      Download PDF
    </button>
  );
}
