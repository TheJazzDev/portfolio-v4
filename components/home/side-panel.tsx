import Image from 'next/image';
import { profile } from '@/data/profile';
import { pastVersions } from '@/data/past-versions';
import { InlineLinkList } from '@/components/ui/inline-link-list';

const pageLinks = [
  { label: 'Selected work', href: '#work' },
  { label: 'Earlier work', href: '#earlier' },
  { label: 'Tools and open source', href: '#tools' },
];

export function SidePanel() {
  return (
    <aside className='bg-panel px-4 py-10 sm:px-8 sm:py-14 lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-5/12 lg:shrink-0 lg:flex-col lg:justify-between lg:px-12 xl:w-4/12'>
      <div>
        <Image
          src='/headshot.jpg'
          alt={profile.name}
          width={250}
          height={250}
          unoptimized
          preload
          className='mb-4 size-16 rounded-full object-cover ring-1 ring-rule sm:mb-5 sm:size-20'
        />
        <h1 className='text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl'>
          {profile.name}
        </h1>
        <p className='mt-1 text-muted sm:text-lg'>
          {profile.title}, {profile.location}
        </p>
        <p className='mt-5 max-w-md leading-relaxed sm:mt-6'>{profile.intro}</p>
        <p className='mt-5 sm:mt-6'>
          <InlineLinkList links={profile.contacts} separator=' · ' />
        </p>

        <ul className='mt-10 hidden space-y-1 text-sm lg:block'>
          {pageLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className='text-muted underline-offset-4 hover:text-ink hover:underline'>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className='mt-10 text-xs text-muted sm:text-sm lg:mt-0'>
        <p>
          Previous versions of this site: <InlineLinkList links={pastVersions} />
        </p>
        <p className='mt-1'>
          © {new Date().getFullYear()} {profile.name}
        </p>
      </div>
    </aside>
  );
}
