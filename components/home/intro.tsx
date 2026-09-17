import { profile } from '@/data/profile';
import { InlineLinkList } from '@/components/ui/inline-link-list';

export function Intro() {
  return (
    <header>
      <h1 className='text-xl font-semibold sm:text-2xl'>{profile.name}</h1>
      <p className='mt-1 text-muted'>
        {profile.title}, {profile.location}
      </p>
      <p className='mt-5 leading-relaxed'>{profile.intro}</p>
      <p className='mt-4'>
        <InlineLinkList links={profile.contacts} separator=' · ' />
      </p>
    </header>
  );
}
