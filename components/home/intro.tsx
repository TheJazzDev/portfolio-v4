import { profile } from '@/data/profile';
import { InlineLinkList } from '@/components/ui/inline-link-list';

export function Intro() {
  return (
    <header className='flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-16'>
      <div className='max-w-2xl'>
        <h1 className='text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl'>
          {profile.name}
        </h1>
        <p className='mt-1 text-muted sm:text-lg'>
          {profile.title}, {profile.location}
        </p>
        <p className='mt-5 leading-relaxed sm:mt-6'>{profile.intro}</p>
      </div>
      <p className='shrink-0 lg:pt-2'>
        <InlineLinkList links={profile.contacts} separator=' · ' />
      </p>
    </header>
  );
}
