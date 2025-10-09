# SparkScript - AI Prompt Generator

SparkScript is a modern web application designed to help developers generate detailed, structured prompts for AI development tools. It turns a simple app idea into a comprehensive software blueprint using the Google Gemini API.

## Technology Stack

- **Frontend:** React, TypeScript, Vite, Tailwind CSS, React Router
- **AI Integration:** Google Gemini API (`@google/genai`)

---

## Project Setup

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd sparkscript
    ```

2.  **Install dependencies:**
    This project uses `npm` for package management.
    ```bash
    npm install
    ```

3.  **Set up your API Key:**
    This project requires a Google Gemini API key. It is accessed via `process.env.API_KEY`. For local development, you can create a `.env.local` file in the root of the project and add your key:
    ```
    REACT_API_KEY=your_gemini_api_key_here
    ```
    The Vite configuration (`vite.config.ts`) is set up to read this variable. For production, you will need to set the `REACT_API_KEY` environment variable in your deployment environment.

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:3000`.

---

## Building for Production

To create a production build of the app, run:
```bash
npm run build
```
This command bundles the app, compiles the TypeScript, and optimizes the Tailwind CSS, creating a `dist` folder with the static assets for your application.

---

## Deployment

You can deploy the contents of the `dist` folder to any static site hosting service (e.g., Vercel, Netlify, GitHub Pages, or a traditional web server).

### Simplified Routing for Easy Deployment

This application uses `react-router-dom` with `HashRouter` for client-side navigation. This approach uses the URL hash (`#`) to manage routes (e.g., `https://sparkscript.tech/#/about`), which has a key advantage for deployment: **it requires no special server configuration.**

You can deploy the `dist` folder to any static hosting provider, and routing will work out-of-the-box without needing to set up server-side rewrites. This makes the deployment process simple and reliable.