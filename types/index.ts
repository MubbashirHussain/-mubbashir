export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  description?: string;
}

export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'ai';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface ResumeData {
  name: string;
  title: string;
  location: string;
  summary: string;
  contact: {
    phone: string;
    email: string;
    linkedin: string;
    portfolio: string;
  };
  experience: ExperienceItem[];
  skills: Skill[];
}

export interface TheoryResponse {
  title: string;
  scaleType?: string;
  chordType?: string;
  keysToHighlight: string[];
  description: string;
}

export type ImageSize = '1K' | '2K' | '4K';

// AI Studio Global Types
declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }

  interface Window {
    aistudio?: AIStudio;
  }
}