import { GoogleGenAI } from '@google/genai';
import type { PromptData, Language } from '../types';

// This is a serverless function that acts as a secure backend.
// It will be deployed to a cloud environment (e.g., Vercel, Netlify)
// and the API_KEY will be set as a secret environment variable there.

const getLanguageName = (langCode: Language): string => {
    switch (langCode) {
        case 'ru': return 'Russian';
        case 'lv': return 'Latvian';
        case 'en':
        default: return 'English';
    }
}

const buildMetaPrompt = (data: PromptData, language: Language): string => {
  const featuresList = data.features.filter(f => f.trim() !== '').map(f => `- ${f}`).join('\n');
  const languageInstruction = `\n\n**Crucial Language Instruction:** Your entire output must be in ${getLanguageName(language)}.`;

  if (data.promptType === 'minimal') {
    return `
      You are an expert prompt writer. Your task is to distill a user's app idea into a concise, high-level prompt that focuses on its core values. This prompt should be more than a single paragraph but much less detailed than a full technical specification. It's designed to give an AI developer a clear, actionable starting point without overwhelming it with minor details.

      The user has provided the following details:
      - **App Name:** ${data.appName || 'Not specified'}
      - **Core Purpose:** ${data.corePurpose || 'Not specified'}
      - **Key Features:**
      ${featuresList || '- Not specified'}
      - **Target Audience:** ${data.targetAudience || 'Not specified'}
      - **Preferred Tech Stack:** ${data.techStack || 'React with TypeScript and Tailwind CSS'}
      - **Desired Styling / Theme:** ${data.styling || 'Modern and minimalist'}

      Generate a prompt structured with the following three sections. Use simple Markdown for clarity (bold headings and bullet points).

      **1. Primary Goal:**
      Start with a single, clear sentence explaining the application's main objective and for whom it is built.

      **2. Core Features:**
      List the 3-5 most critical features as a bulleted list. Each feature should be a brief, descriptive phrase.

      **3. Key Technologies & Style:**
      Briefly mention the desired tech stack and the visual theme in one sentence.

      The final output should be a short, easy-to-read block of text that captures the essence of the application. It should be direct, to the point, and ready for an AI developer.
    ` + languageInstruction;
  }

  // Default to the detailed prompt
  return `
    You are an expert prompt engineer creating a detailed development plan for an AI developer. Your task is to translate a user's app idea into a comprehensive, structured prompt that outlines the entire application. The output should be a high-level architectural guide, not a low-level implementation plan.

    The user has provided the following details:
    - **App Name:** ${data.appName || 'Not specified'}
    - **Core Purpose:** ${data.corePurpose || 'Not specified'}
    - **Key Features:**
    ${featuresList || '- Not specified'}
    - **Target Audience:** ${data.targetAudience || 'Not specified'}
    - **Preferred Tech Stack:** ${data.techStack || 'React with TypeScript and Tailwind CSS'}
    - **Desired Styling / Theme:** ${data.styling || 'Modern and minimalist'}

    Generate a prompt using simple Markdown. The prompt must be structured with the following sections. Start directly with the first heading.

    # Project Overview
    Provide a concise summary of the application's purpose and its target audience.

    # Core User Flows
    Describe the primary ways a user will interact with the application. Frame these as user stories. For each key feature, explain the step-by-step process from the user's perspective.
    *Example: For a to-do app, a flow would be: "1. User opens the app and sees a list of their tasks. 2. User clicks an 'Add Task' button. 3. A form appears to enter the task details. 4. User saves the task, and it appears in the list."*

    # Key Pages / Components
    List and briefly describe the main screens or reusable components required for the application. Think in terms of UI structure, not code components.
    *Example: "Dashboard Page", "Task Creation Modal", "Settings Page".*

    # Data Model
    Describe the main data entities the application will manage. For each entity, list its key properties in plain English.
    *Example: "Task: Should include a unique ID, a title (text), a description (text), a due date (date), and a completion status (boolean)."*

    # Styling and UX Guidelines
    Elaborate on the desired look, feel, and user experience. Mention the theme, color palette, and any important interaction principles.

    **Crucial Final Instruction:** Your entire output is a high-level prompt for an AI developer. Do NOT write any code, suggest file names, or define specific function signatures. Focus on describing the application's requirements, structure, and user experience in plain English.
  ` + languageInstruction;
};


// Edge runtime is recommended for streaming responses
export const config = {
    runtime: 'edge',
};

// This is the main serverless function handler
export default async function handler(req: Request) {
    if (req.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
            status: 405,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        const { promptData, language } = await req.json();

        // The API key is now securely accessed on the server-side.
        // It checks for the production variable `REACT_API_KEY` first, then falls back to `API_KEY` for local dev.
        const apiKey = process.env.REACT_API_KEY || process.env.API_KEY;
        if (!apiKey) {
            throw new Error("API Key is not configured on the server. Ensure REACT_API_KEY or API_KEY is set.");
        }

        const ai = new GoogleGenAI({ apiKey });
        const metaPrompt = buildMetaPrompt(promptData, language);
        
        const geminiStream = await ai.models.generateContentStream({
            model: "gemini-2.5-flash",
            contents: metaPrompt,
        });

        // Create a streaming response back to the client
        const readableStream = new ReadableStream({
            async start(controller) {
                for await (const chunk of geminiStream) {
                    const text = chunk.text;
                    if (text) {
                        controller.enqueue(new TextEncoder().encode(text));
                    }
                }
                controller.close();
            },
        });
        
        return new Response(readableStream, {
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
                'X-Content-Type-Options': 'nosniff',
            },
        });

    } catch (error) {
        console.error("Error in generate function:", error);
        const errorMessage = error instanceof Error ? error.message : "An unknown server error occurred.";
        return new Response(JSON.stringify({ error: errorMessage }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}