import { Fragment } from 'react';
import type { SiteLink } from '@/lib/types';
import { TextLink } from './text-link';

type InlineLinkListProps = {
  links: SiteLink[];
  separator?: string;
  className?: string;
};

export function InlineLinkList({ links, separator = ', ', className }: InlineLinkListProps) {
  return (
    <span className={className}>
      {links.map((link, index) => (
        <Fragment key={link.href}>
          {index > 0 && separator}
          <TextLink href={link.href}>{link.label}</TextLink>
        </Fragment>
      ))}
    </span>
  );
}
