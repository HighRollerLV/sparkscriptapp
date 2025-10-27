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

export interface ScriptTemplate {
  id: string;
  data: Omit<PromptData, 'appName' | 'styling' | 'promptType'>;
}
