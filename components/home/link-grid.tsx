import type { SiteLink } from '@/lib/types';
import { ArrowUpRightIcon } from '@/components/ui/arrow-up-right-icon';

export function LinkGrid({ links }: { links: SiteLink[] }) {
  return (
    <ul className='grid grid-cols-1 sm:grid-cols-2 sm:gap-x-6 xl:grid-cols-3'>
      {links.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            target='_blank'
            rel='noopener noreferrer'
            className='group flex min-h-11 items-center justify-between gap-3 border-b border-rule py-2 transition-colors hover:border-accent sm:py-2.5'>
            <span className='truncate group-hover:text-accent'>{link.label}</span>
            <ArrowUpRightIcon className='size-4 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent' />
          </a>
        </li>
      ))}
    </ul>
  );
}
