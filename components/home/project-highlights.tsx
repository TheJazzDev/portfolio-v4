export function ProjectHighlights({ highlights }: { highlights: string[] }) {
  return (
    <div className='mt-4 sm:mt-5'>
      <h4 className='text-xs font-medium tracking-wide text-muted uppercase'>How it is built</h4>
      <ul className='mt-2 space-y-1.5 sm:space-y-2'>
        {highlights.map((highlight) => (
          <li key={highlight} className='relative pl-4 leading-relaxed text-ink/80 before:absolute before:top-[0.7em] before:left-0 before:size-1.5 before:rounded-full before:bg-accent/40'>
            {highlight}
          </li>
        ))}
      </ul>
    </div>
  );
}
