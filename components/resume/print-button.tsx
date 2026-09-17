'use client';

export function PrintButton() {
  return (
    <button
      type='button'
      onClick={() => window.print()}
      className='min-h-[44px] text-accent underline-offset-4 hover:underline print:hidden'>
      Download PDF
    </button>
  );
}
