export type ProjectMainCategory = 'My Projects' | 'External Projects';
export type ProjectSubCategory = 'Frontend' | 'Backend';

export interface Project {
  id: string;
  title: string;
  description: string;
  mainCategory: ProjectMainCategory;
  subCategory: ProjectSubCategory;
  technologies: string[];
  demo?: string;
  github?: string;
  githubPlaceholder?: string;
  discord?: string;
  discordName?: string;
  details: {
    overview: string;
    features: string[];
    challenges: string[];
    solutions: string[];
  };
} 