export interface SiteConfig {
  name: string;
  title: string;
  tagline: string;
  email: string;
  resumeUrl: string;
  whatsappNumber: string;
  social: {
    linkedin: string;
    github: string;
    leetcode: string;
  };
}

export interface Experience {
  id: string;
  company: string;
  companyLogo: string;
  location: string;
  role: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
  impactPoints: string[];
  techStack: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  logo: string;
  credentialUrl: string | null;
  pdfUrl: string | null;
  issueDate: string;
  expiryDate: string | null;
}

export interface Project {
  id: string;
  name: string;
  summary: string;
  description?: string;
  thumbnail?: string;
  techStack: string[];
  githubUrl: string | null;
  demoUrl: string | null;
  featured: boolean;
  order: number;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readTimeMinutes: number;
  tags: string[];
}

export interface Education {
  id: string;
  company: string;
  companyLogo: string;
  location: string;
  'degree:': string;
  degree?: string;
  major: string;
  minor?: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  honors?: string;
  impactPoints: string[];
  'Relevant Courses'?: string[];
  relevantCoursework?: string[];
  websiteUrl?: string;
}


