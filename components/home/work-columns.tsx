import { workGrid } from './work-grid';

export function WorkColumns() {
  return (
    <div className={`hidden pb-3 text-sm text-muted lg:grid ${workGrid}`} aria-hidden='true'>
      <p className='col-span-2'>Year</p>
      <p className='col-span-3'>Project</p>
      <p className='col-span-5'>About</p>
      <p className='col-span-2'>Stack</p>
    </div>
  );
}
