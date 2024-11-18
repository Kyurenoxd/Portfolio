export type SkillCategory = 'Frontend' | 'Backend' | 'Other';

export interface Skill {
  id: string;
  name: string;
  icon: string;
  category: SkillCategory;
  isActive: boolean;
  description: string;
}

export interface SkillGroup {
  title: string;
  skills: Skill[];
} 