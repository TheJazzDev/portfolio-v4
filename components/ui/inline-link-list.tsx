import { Fragment } from 'react';
import type { SiteLink } from '@/lib/types';
import { TextLink } from './text-link';

type InlineLinkListProps = {
  links: SiteLink[];
  separator?: string;
};

export function InlineLinkList({ links, separator = ', ' }: InlineLinkListProps) {
  return (
    <span>
      {links.map((link, index) => (
        <Fragment key={link.href}>
          {index > 0 && separator}
          <TextLink href={link.href} className='whitespace-nowrap'>
            {link.label}
          </TextLink>
        </Fragment>
      ))}
    </span>
  );
}
