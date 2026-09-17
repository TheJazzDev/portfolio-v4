export type SiteLink = {
  label: string;
  href: string;
};

export type ProjectTag = 'Web app' | 'Mobile app' | 'Admin panel' | 'Landing page' | 'Website' | 'ERP';

export type ProjectMetric = {
  value: string;
  label: string;
};

export type Project = {
  id: string;
  title: string;
  years: string;
  role: string;
  tags: ProjectTag[];
  /** What the product is and what it does for the people who use it. */
  description: string;
  /** Headline numbers counted from the codebase. */
  metrics?: ProjectMetric[];
  /** How it is built: architecture and the engineering worth pointing at. */
  highlights: string[];
  stack: string[];
  links: SiteLink[];
};
