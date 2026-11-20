export function DownloadIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox='0 0 16 16'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-hidden='true'
      className={className}>
      <path d='M8 2v8M4.5 7 8 10.5 11.5 7M3 13.5h10' />
    </svg>
  );
}
