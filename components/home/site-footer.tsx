import { profile } from '@/data/profile';
import { pastVersions } from '@/data/past-versions';
import { InlineLinkList } from '@/components/ui/inline-link-list';

export function SiteFooter() {
  return (
    <footer className='flex flex-col gap-1 border-t border-rule pt-6 text-xs text-muted sm:flex-row sm:justify-between sm:text-sm'>
      <p>
        Previous versions of this site: <InlineLinkList links={pastVersions} />
      </p>
      <p>
        © {new Date().getFullYear()} {profile.name}
      </p>
    </footer>
  );
}
