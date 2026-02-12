import { GoogleGenAI } from '@google/genai';
import type { PromptData, Language } from '../types';

const getLanguageName = (langCode: Language): string => {
  switch (langCode) {
    case 'ru': return 'Russian';
    case 'lv': return 'Latvian';
    case 'en':
    default: return 'English';
  }
};

const buildMetaPrompt = (data: PromptData, language: Language): string => {
  const featuresList = data.features.filter(f => f.trim() !== '').map(f => `- ${f}`).join('\n');
  const featuresInline = data.features.filter(f => f.trim() !== '').join(', ');
  const languageInstruction = `\n\n**Crucial Language Instruction:** Your entire output must be in ${getLanguageName(language)}.`;
  const promptType = data.promptType;

  if (data.category === 'image') {
    if (promptType === 'simple') {
      return `Create a concise AI image prompt:
        ${data.corePurpose}. Style: ${data.artStyle}. Elements: ${featuresList}` + languageInstruction;
    }
    if (promptType === 'medium') {
      return `You are a prompt engineer for AI image generation. Create a detailed but focused prompt:
        - Concept: ${data.corePurpose}
        - Style: ${data.artStyle}
        - Lighting: ${data.lighting}
        - Elements: ${featuresList}
        Keep it clear and structured without excessive detail.` + languageInstruction;
    }
    return `You are a world-class prompt engineer specializing in AI image generation. Create a professional, descriptive, and technical prompt based on:
      - Concept: ${data.corePurpose}
      - Elements: ${featuresList}
      - Style: ${data.artStyle}
      - Aspect Ratio: ${data.aspectRatio}
      - Lighting: ${data.lighting}
      - Palette: ${data.colorPalette}
      - Overall Theme: ${data.styling}
      Output a structured prompt starting with a "Summary Prompt" and a "Technical Breakdown".` + languageInstruction;
  }

  if (data.category === 'music') {
    if (promptType === 'simple') {
      return `Output only a single line in this format:
Style / Prompt Field (copy-paste this):
${data.genre}, ${data.mood}, ${data.tempo}, ${data.styling}${featuresInline ? `, ${featuresInline}` : ''}
Keep it a quick description for Suno. Do not include lyrics.` + languageInstruction;
    }
    if (promptType === 'medium') {
      return `Output only a single line in this format:
Style / Prompt Field (copy-paste this):
${data.genre}, ${data.mood}, ${data.tempo}, ${data.styling}${featuresInline ? `, ${featuresInline}` : ''}, ${data.lyricalTheme}
Make it more refined and descriptive than simple. Do not include lyrics.` + languageInstruction;
    }
    return `Create a professional Suno-ready output matching this exact structure and headings:
Style / Prompt Field (copy-paste this):
<one line of styles>
Lyrics Field (custom lyrics with structure tags):
<lyrics with tags and section notes>
Rules:
- Use the style line to combine: ${data.genre}, ${data.mood}, ${data.tempo}, ${data.styling}${featuresInline ? `, ${featuresInline}` : ''}.
- Write original lyrics based on: ${data.lyricalTheme}.
- Use tags like [Intro], [Verse 1], [Pre-Chorus], [Chorus], [Verse 2], [Pre-Chorus], [Chorus], [Bridge], [Guitar Solo / Build], [Final Chorus], [Outro].
- Add short parenthetical performance notes where helpful (e.g., (soft, breathy)).
- Keep it similar in length and style to the provided example.
- Output only the two sections, no extra commentary.` + languageInstruction;
  }

  if (data.category === 'video') {
    if (promptType === 'simple') {
      return `Create a concise video generation prompt:
        ${data.corePurpose}. Motion: ${data.motion}. Elements: ${featuresList}` + languageInstruction;
    }
    if (promptType === 'medium') {
      return `You are a video director. Create a focused prompt for AI video generation:
        - Scene: ${data.corePurpose}
        - Motion: ${data.motion}
        - Camera: ${data.cameraMovement}
        - Elements: ${featuresList}
        Keep it visual and actionable.` + languageInstruction;
    }
    return `You are an expert cinematographer and AI video director. Create a prompt for modern AI video models based on:
      - Core Action: ${data.corePurpose}
      - Elements in frame: ${featuresList}
      - Motion: ${data.motion}
      - Camera: ${data.cameraMovement}
      - Frame Rate: ${data.frameRate}
      - Aesthetic: ${data.styling}
      Output a "Director's Script" and a "Technical Command".` + languageInstruction;
  }

  // Website category
  if (promptType === 'simple') {
    return `Create a quick web design brief:
      ${data.appName}: ${data.corePurpose}. Features: ${featuresList}. Style: ${data.styling}` + languageInstruction;
  }
  if (promptType === 'medium') {
    return `You are a web designer. Create a balanced design specification for web builders (Lovable, Bolt.new, etc.):
      - App Name: ${data.appName}
      - Purpose: ${data.corePurpose}
      - Target Audience: ${data.targetAudience}
      - Key features: ${featuresList}
      - Visual Style: ${data.styling}
      Focus on visual design and layout. Be concise but complete.` + languageInstruction;
  }
  return `You are an expert web designer and UI/UX specialist. Create a professional design and layout specification for web builders (Lovable, Bolt.new, etc.):
    - App Name: ${data.appName}
    - Purpose: ${data.corePurpose}
    - Key Features to Display: ${featuresList}
    - Target Audience: ${data.targetAudience}
    - Visual Style/Theme: ${data.styling}
    Focus on the visual design, layout structure, color scheme, typography, component styling, and user experience. Do NOT include coding instructions or technical implementation details. Describe what the website should look like, how it should feel, and how users should interact with it visually.` + languageInstruction;
};

export async function* generateAppPromptStream(data: PromptData, language: Language): AsyncGenerator<string> {
  // Validate API key is available
  if (!process.env.API_KEY) {
    throw new Error("API Key is not configured. Please set the REACT_APP_API_KEY in your .env file.");
  }

  // Create instance right before use to ensure the latest API key is used
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const metaPrompt = buildMetaPrompt(data, language);
  
  try {
    const response = await ai.models.generateContentStream({
      model: "gemini-2.5-flash",
      contents: metaPrompt,
    });

    for await (const chunk of response) {
      if (chunk.text) {
        yield chunk.text;
      }
    }
  } catch (error) {
    console.error("Gemini API Error:", error);

    // Check for specific error types
    if (error instanceof Error) {
      if (error.message.includes("401") || error.message.includes("authentication") || error.message.includes("unauthorized")) {
        throw new Error("API Key authentication failed. Please verify your Google Gemini API key is valid and has the necessary permissions.");
      }
      if (error.message.includes("404") || error.message.includes("not found")) {
        throw new Error("Gemini API model not found. Please verify your API has access to gemini-2.0-flash.");
      }
      if (error.message.includes("429") || error.message.includes("rate limit")) {
        throw new Error("Rate limit exceeded. Please wait a moment and try again.");
      }
    }

    throw new Error("An error occurred while generating your prompt. Please ensure your API key is active and valid.");
  }
}