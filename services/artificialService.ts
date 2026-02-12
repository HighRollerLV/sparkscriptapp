import Groq from 'groq-sdk';
import type { PromptData, Language } from '../types';

const getLanguageName = (langCode: Language): string => {
  const languageMap: Record<Language, string> = {
    'ru': 'Russian',
    'lv': 'Latvian',
    'en': 'English',
  };
  return languageMap[langCode] || 'English';
};

const formatFeatures = (features: string[]): { list: string; inline: string } => {
  const filtered = features.filter(f => f.trim() !== '');
  return {
    list: filtered.map(f => `- ${f}`).join('\n'),
    inline: filtered.join(', '),
  };
};

const getLanguageInstruction = (language: Language): string => {
  return `\n\n**Crucial Language Instruction:** Your entire output must be in ${getLanguageName(language)}.`;
};

// DRY: Image prompt templates
const imagePrompts = {
  simple: (purpose: string, style: string, features: string): string =>
    `Create a concise AI image prompt: ${purpose}. Style: ${style}. Elements: ${features}`,
  medium: (purpose: string, style: string, lighting: string, features: string): string =>
    `You are a prompt engineer for AI image generation. Create a detailed but focused prompt:
- Concept: ${purpose}
- Style: ${style}
- Lighting: ${lighting}
- Elements: ${features}
Keep it clear and structured without excessive detail.`,
  professional: (purpose: string, style: string, ratio: string, lighting: string, palette: string, styling: string, features: string): string =>
    `You are a world-class prompt engineer specializing in AI image generation. Create a professional, descriptive, and technical prompt based on:
- Concept: ${purpose}
- Elements: ${features}
- Style: ${style}
- Aspect Ratio: ${ratio}
- Lighting: ${lighting}
- Palette: ${palette}
- Overall Theme: ${styling}
Output a structured prompt starting with a "Summary Prompt" and a "Technical Breakdown".`,
};

// DRY: Music prompt templates
const musicPrompts = {
  simple: (genre: string, mood: string, tempo: string, styling: string, features: string): string =>
    `Output only a single line in this format:
Style / Prompt Field (copy-paste this):
${genre}, ${mood}, ${tempo}, ${styling}${features ? `, ${features}` : ''}
Keep it a quick description for Suno. Do not include lyrics.`,
  medium: (genre: string, mood: string, tempo: string, styling: string, features: string, theme: string): string =>
    `Output only a single line in this format:
Style / Prompt Field (copy-paste this):
${genre}, ${mood}, ${tempo}, ${styling}${features ? `, ${features}` : ''}, ${theme}
Make it more refined and descriptive than simple. Do not include lyrics.`,
  professional: (genre: string, mood: string, tempo: string, styling: string, features: string, theme: string): string =>
    `Create a professional Suno-ready output matching this exact structure and headings:
Style / Prompt Field (copy-paste this):
<one line of styles>
Lyrics Field (custom lyrics with structure tags):
<lyrics with tags and section notes>
Rules:
- Use the style line to combine: ${genre}, ${mood}, ${tempo}, ${styling}${features ? `, ${features}` : ''}.
- Write original lyrics based on: ${theme}.
- Use tags like [Intro], [Verse 1], [Pre-Chorus], [Chorus], [Verse 2], [Pre-Chorus], [Chorus], [Bridge], [Guitar Solo / Build], [Final Chorus], [Outro].
- Add short parenthetical performance notes where helpful (e.g., (soft, breathy)).
- Keep it similar in length and style to the provided example.
- Output only the two sections, no extra commentary.`,
};

// DRY: Video prompt templates
const videoPrompts = {
  simple: (purpose: string, motion: string, features: string): string =>
    `Create a concise video generation prompt: ${purpose}. Motion: ${motion}. Elements: ${features}`,
  medium: (purpose: string, motion: string, camera: string, features: string): string =>
    `You are a video director. Create a focused prompt for AI video generation:
- Scene: ${purpose}
- Motion: ${motion}
- Camera: ${camera}
- Elements: ${features}
Keep it visual and actionable.`,
  professional: (purpose: string, features: string, motion: string, camera: string, frameRate: string, styling: string): string =>
    `You are an expert cinematographer and AI video director. Create a prompt for modern AI video models based on:
- Core Action: ${purpose}
- Elements in frame: ${features}
- Motion: ${motion}
- Camera: ${camera}
- Frame Rate: ${frameRate}
- Aesthetic: ${styling}
Output a "Director's Script" and a "Technical Command".`,
};

// DRY: Website prompt templates
const websitePrompts = {
  simple: (appName: string, purpose: string, features: string, styling: string): string =>
    `Create a quick web design brief: ${appName}: ${purpose}. Features: ${features}. Style: ${styling}`,
  medium: (appName: string, purpose: string, audience: string, features: string, styling: string): string =>
    `You are a web designer. Create a balanced design specification for web builders (Lovable, Bolt.new, etc.):
- App Name: ${appName}
- Purpose: ${purpose}
- Target Audience: ${audience}
- Key features: ${features}
- Visual Style: ${styling}
Focus on visual design and layout. Be concise but complete.`,
  professional: (appName: string, purpose: string, features: string, audience: string, styling: string): string =>
    `You are an expert web designer and UI/UX specialist. Create a professional design and layout specification for web builders (Lovable, Bolt.new, etc.):
- App Name: ${appName}
- Purpose: ${purpose}
- Key Features to Display: ${features}
- Target Audience: ${audience}
- Visual Style/Theme: ${styling}
Focus on the visual design, layout structure, color scheme, typography, component styling, and user experience. Do NOT include coding instructions or technical implementation details. Describe what the website should look like, how it should feel, and how users should interact with it visually.`,
};

const buildMetaPrompt = (data: PromptData, language: Language): string => {
  const { list: featuresList, inline: featuresInline } = formatFeatures(data.features);
  const languageInstruction = getLanguageInstruction(language);
  const promptType = data.promptType as 'simple' | 'medium' | 'professional';

  switch (data.category) {
    case 'image':
      if (promptType === 'simple') {
        return imagePrompts.simple(data.corePurpose, data.artStyle, featuresList) + languageInstruction;
      }
      if (promptType === 'medium') {
        return imagePrompts.medium(data.corePurpose, data.artStyle, data.lighting, featuresList) + languageInstruction;
      }
      return imagePrompts.professional(data.corePurpose, data.artStyle, data.aspectRatio, data.lighting, data.colorPalette, data.styling, featuresList) + languageInstruction;

    case 'music':
      if (promptType === 'simple') {
        return musicPrompts.simple(data.genre, data.mood, data.tempo, data.styling, featuresInline) + languageInstruction;
      }
      if (promptType === 'medium') {
        return musicPrompts.medium(data.genre, data.mood, data.tempo, data.styling, featuresInline, data.lyricalTheme) + languageInstruction;
      }
      return musicPrompts.professional(data.genre, data.mood, data.tempo, data.styling, featuresInline, data.lyricalTheme) + languageInstruction;

    case 'video':
      if (promptType === 'simple') {
        return videoPrompts.simple(data.corePurpose, data.motion, featuresList) + languageInstruction;
      }
      if (promptType === 'medium') {
        return videoPrompts.medium(data.corePurpose, data.motion, data.cameraMovement, featuresList) + languageInstruction;
      }
      return videoPrompts.professional(data.corePurpose, featuresList, data.motion, data.cameraMovement, data.frameRate, data.styling) + languageInstruction;

    case 'website':
    default:
      if (promptType === 'simple') {
        return websitePrompts.simple(data.appName, data.corePurpose, featuresList, data.styling) + languageInstruction;
      }
      if (promptType === 'medium') {
        return websitePrompts.medium(data.appName, data.corePurpose, data.targetAudience, featuresList, data.styling) + languageInstruction;
      }
      return websitePrompts.professional(data.appName, data.corePurpose, featuresList, data.targetAudience, data.styling) + languageInstruction;
  }
};

export async function* generateAppPromptStream(data: PromptData, language: Language): AsyncGenerator<string> {
  // Get API key from Coolify environment variables
  if (!process.env.REACT_APP_API_KEY) {
    throw new Error("API Key is not configured. Please set REACT_APP_API_KEY in your Coolify environment variables.");
  }

  // Initialize AI provider
  // Coolify securely injects the API key at runtime, so it's safe on the server
  const provider = new Groq({
    apiKey: process.env.REACT_APP_API_KEY,
    dangerouslyAllowBrowser: true, // Required for client-side usage with Coolify
  });

  const metaPrompt = buildMetaPrompt(data, language);

  try {
    // Stream completion from AI provider
    const stream = await provider.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: metaPrompt }],
      stream: true,
      temperature: 0.7,
      max_tokens: 2048,
    });

    // Yield chunks as they arrive
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) {
        yield content;
      }
    }
  } catch (error) {
    console.error("AI Provider Error:", error);
    throw handleProviderError(error);
  }
}

// Centralized error handling
function handleProviderError(error: unknown): Error {
  if (!(error instanceof Error)) {
    return new Error("An unknown error occurred while generating your prompt. Please try again.");
  }

  const message = error.message.toLowerCase();

  if (message.includes("401") || message.includes("authentication") || message.includes("unauthorized")) {
    return new Error("API Key authentication failed. Please verify your REACT_APP_API_KEY is set correctly in Coolify.");
  }

  if (message.includes("429") || message.includes("rate limit")) {
    return new Error("Rate limit exceeded. Please wait a moment and try again.");
  }

  if (message.includes("model")) {
    return new Error("Model not found. Please ensure the model is available in your AI provider account.");
  }

  return new Error("An error occurred while generating your prompt. Please check your API key is active and valid.");
}

