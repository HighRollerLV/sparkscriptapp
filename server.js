const express = require('express');
const path = require('path');
const { GoogleGenAI } = require('@google/genai');
const { Readable } = require('stream');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware to parse JSON bodies
app.use(express.json());

// Securely get API key from environment variables
const apiKey = process.env.REACT_API_KEY || process.env.API_KEY;
if (!apiKey) {
    console.error("API key is missing. Please set REACT_API_KEY or API_KEY environment variable.");
}

// Initialize the Google AI client
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

// --- API Routes ---

// Health check endpoint for debugging deployments
app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'ok',
        timestamp: new Date(),
        apiInitialized: !!ai
    });
});


// API endpoint to handle prompt generation
app.post('/api/generate', async (req, res) => {
    console.log('Received POST request for /api/generate');

    if (!ai) {
        console.error('API key not configured, returning 500.');
        return res.status(500).json({ error: "Server is not configured with an API key." });
    }

    try {
        const { promptData, language } = req.body;

        if (!promptData || !language) {
            console.error('Invalid request body, returning 400.');
            return res.status(400).json({ error: 'Invalid request body. Missing promptData or language.' });
        }

        const userPrompt = constructPrompt(promptData, language);

        const model = 'gemini-2.5-flash';
        const streamResult = await ai.models.generateContentStream({
            model: model,
            contents: userPrompt,
        });

        // Set headers for streaming
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');

        // Use Node.js streams for a more robust piping mechanism
        const readable = Readable.from((async function*() {
            for await (const chunk of streamResult) {
                if (chunk && chunk.text) {
                    yield chunk.text;
                }
            }
        })());

        readable.pipe(res);

    } catch (error) {
        console.error('Error in /api/generate handler:', error);
        // Ensure we don't try to send headers twice if the stream has started
        if (!res.headersSent) {
            res.status(500).json({ error: 'Failed to generate content from AI model.' });
        } else {
            // If headers are already sent, we just end the connection.
            res.end();
        }
    }
});


// --- Static File Serving ---

// Serve static files from the React app build directory
const buildPath = path.join(__dirname, 'dist');
app.use(express.static(buildPath));

// The "catchall" handler: for any request that doesn't match one above,
// send back React's index.html file to support client-side routing.
app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});


// --- Helper Functions ---

// Helper function to construct the prompt
function constructPrompt(data, lang) {
    const translations = {
        en: {
            title: "Software Development Blueprint for",
            purpose: "Core Purpose",
            features: "Key Features",
            audience: "Target Audience",
            tech: "Preferred Tech Stack",
            styling: "Styling & Theme",
            generateFor: "Generate a detailed software development prompt for an application with the following specifications.",
            generateMinimal: "Generate a minimal, high-level summary prompt for an application with the following specifications.",
            noPreference: "No preference specified. Suggest a suitable modern stack.",
        },
        ru: {
            title: "Проект разработки программного обеспечения для",
            purpose: "Основная цель",
            features: "Ключевые функции",
            audience: "Целевая аудитория",
            tech: "Предпочитаемый стек технологий",
            styling: "Стиль и тема",
            generateFor: "Создайте подробный запрос на разработку программного обеспечения для приложения со следующими характеристиками.",
            generateMinimal: "Создайте минимальный, высокоуровневый итоговый запрос для приложения со следующими характеристиками.",
            noPreference: "Предпочтения не указаны. Предложите подходящий современный стек.",
        },
        lv: {
            title: "Programmatūras izstrādes projekts priekš",
            purpose: "Galvenais mērķis",
            features: "Galvenās funkcijas",
            audience: "Mērķauditorija",
            tech: "Vēlamais tehnoloģiju kopums",
            styling: "Stils un tēma",
            generateFor: "Izveidojiet detalizētu programmatūras izstrādes uzdevumu lietojumprogrammai ar šādām specifikācijām.",
            generateMinimal: "Izveidojiet minimālu, augsta līmeņa kopsavilkuma uzdevumu lietojumprogrammai ar šādām specifikācijām.",
            noPreference: "Nav norādīta preference. Iesakiet piemērotu modernu tehnoloģiju kopumu.",
        }
    };

    const t = translations[lang] || translations.en;

    const baseInstruction = data.promptType === 'detailed'
        ? t.generateFor
        : t.generateMinimal;

    let prompt = `# ${t.title} "${data.appName || 'Untitled App'}"\n\n`;
    prompt += `${baseInstruction}\n\n`;
    prompt += `## ${t.purpose}\n${data.corePurpose}\n\n`;
    prompt += `## ${t.features}\n- ${data.features.filter(f => f.trim()).join('\n- ')}\n\n`;
    prompt += `## ${t.audience}\n${data.targetAudience}\n\n`;
    prompt += `## ${t.styling}\n${data.styling}\n\n`;
    prompt += `## ${t.tech}\n${data.techStack || t.noPreference}\n`;

    return prompt;
}