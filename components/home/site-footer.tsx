import { profile } from '@/data/profile';
import { pastVersions } from '@/data/past-versions';
import { InlineLinkList } from '@/components/ui/inline-link-list';

export function SiteFooter() {
  return (
    <footer className='mt-12 border-t border-rule pt-6 text-xs text-muted sm:mt-16 sm:text-sm'>
      <p>
        Previous versions of this site: <InlineLinkList links={pastVersions} />.
      </p>
      <p className='mt-1'>
        © {new Date().getFullYear()} {profile.name}
      </p>
    </footer>
  );
}
