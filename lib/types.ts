export type SiteLink = {
  label: string;
  href: string;
};

export type Project = {
  id: string;
  title: string;
  years: string;
  role: string;
  description: string;
  notes?: string;
  stack: string[];
  links: SiteLink[];
};
