export type PageRoute = '/' | '/about' | '/projects' | '/certificates' | '/contact';

export interface EducationItem {
  id: string;
  institution: string;
  stage: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
  status: 'Foundation' | 'Senior Secondary' | 'Ongoing Degree';
}

export interface InterestVector {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  tags: string[];
  gradient: string;
}

export type ProjectCategory = 'all' | 'web' | 'ai' | 'hackathon' | 'experiments';

export interface ProjectItem {
  id: string;
  title: string;
  category: 'web' | 'ai' | 'hackathon' | 'experiments';
  categoryLabel: string;
  status: 'In Progress' | 'Completed' | 'Research Prototype';
  shortDescription: string;
  fullCaseStudy?: {
    problem: string;
    approach: string;
    architecture: string[];
    outcome: string;
  };
  technologies: string[];
  previewType?: string;
  githubUrl?: string;
  liveUrl?: string;
  isFeatured?: boolean;
}

export type CertificateCategory = 'all' | 'technical' | 'aiml' | 'mobile';

export interface CertificateItem {
  id: string;
  title: string;
  issuingOrganization: string;
  programType: string;
  dateOrYear: string;
  category: CertificateCategory;
  categoryLabel: string;
  description: string;
  imageUrl: string;
  badgeLabel: string;
  verified: boolean;
  skillsAcquired: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
}
