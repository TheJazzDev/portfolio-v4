import Link from 'next/link';
import type { ReactNode } from 'react';

type TextLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

export function TextLink({ href, children, className = '' }: TextLinkProps) {
  const classes = `text-accent underline-offset-4 hover:underline ${className}`;

  if (href.startsWith('/')) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  const opensNewTab = href.startsWith('http');

  return (
    <a
      href={href}
      className={classes}
      {...(opensNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {children}
    </a>
  );
}
