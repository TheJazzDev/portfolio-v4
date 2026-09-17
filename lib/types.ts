export type SiteLink = {
  label: string;
  href: string;
};

export type ProjectTag = 'Web app' | 'Mobile app' | 'Admin panel' | 'Landing page' | 'Website' | 'ERP';

export type Project = {
  id: string;
  title: string;
  years: string;
  role: string;
  tags: ProjectTag[];
  description: string;
  notes?: string;
  stack: string[];
  links: SiteLink[];
};
