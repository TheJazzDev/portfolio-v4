import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowUpRightIcon } from './arrow-up-right-icon';

type TextLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

export function TextLink({ href, children, className = '' }: TextLinkProps) {
  const classes = `text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent ${className}`;

  if (href.startsWith('/')) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  if (!href.startsWith('http')) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <a href={href} className={classes} target='_blank' rel='noopener noreferrer'>
      {children}
      <ArrowUpRightIcon className='ml-0.5 inline-block size-3 align-baseline print:hidden' />
    </a>
  );
}
