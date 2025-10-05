export interface PromptData {
  appName: string;
  corePurpose: string;
  features: string[];
  targetAudience: string;
  techStack: string;
  styling: string;
  promptType: 'minimal' | 'detailed';
}

export type Language = 'en' | 'ru' | 'lv';

export type Page = 'generator' | 'about' | 'terms' | 'privacy';
