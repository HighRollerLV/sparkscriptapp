export type Language = 'en' | 'ru' | 'lv';
export type PromptCategory = 'website' | 'image' | 'music' | 'video';

export interface PromptData {
  category: PromptCategory;
  // Common
  appName: string;
  corePurpose: string;
  features: string[];
  styling: string;
  promptType: 'simple' | 'medium' | 'detailed';

  // Website specific
  targetAudience: string;
  techStack: string;

  // Image specific
  aspectRatio: string;
  lighting: string;
  colorPalette: string;
  artStyle: string;

  // Music specific
  genre: string;
  mood: string;
  tempo: string;
  lyricalTheme: string;

  // Video specific
  motion: string;
  cameraMovement: string;
  frameRate: string;
}

export interface ScriptTemplate {
  id: string;
  titleKey: string;
  descriptionKey: string;
  data: Partial<PromptData>;
}