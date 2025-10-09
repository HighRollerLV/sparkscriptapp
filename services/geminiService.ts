import type { PromptData, Language } from '../types';

// This service now communicates with our OWN secure backend endpoint,
// not directly with the Google Gemini API.

export async function* generateAppPromptStream(data: PromptData, language: Language): AsyncGenerator<string> {
    try {
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ promptData: data, language }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            let errorMessage = `[API Error] ${response.status}: `;
            try {
                // Try to parse the error as JSON, which is what our server sends
                const errorData = JSON.parse(errorText);
                errorMessage += errorData.error || response.statusText;
            } catch {
                // If it's not JSON, just use the raw text
                errorMessage += errorText || response.statusText;
            }
            throw new Error(errorMessage);
        }

        if (!response.body) {
            throw new Error('Response body is empty.');
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
            const { done, value } = await reader.read();
            if (done) {
                break;
            }
            yield decoder.decode(value, { stream: true });
        }

    } catch (error) {
        console.error("Error fetching from backend API:", error);
        if (error instanceof Error) {
            throw error; // Re-throw the enriched error message
        }
        throw new Error("An unknown error occurred while communicating with the server.");
    }
}
