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
    REACT_APP_API_KEY=your_gemini_api_key_here
    ```
    The Vite configuration (`vite.config.ts`) is set up to read this variable. For production, you will need to set the `REACT_APP_API_KEY` environment variable in your deployment environment.

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

You can deploy the contents of the `dist` folder to any static site hosting service (e.g., Vercel, Netlify, GitHub Pages, Coolify, or a traditional web server).

### Important: Server Configuration for Routing

This application uses `react-router-dom` with `BrowserRouter` for clean, user-friendly URLs (e.g., `/prompt-builder`). For this to work correctly, **your hosting server must be configured to handle client-side routing.**

This means that any request to a path that isn't a static file (like `/prompt-builder` or `/about`) should be redirected to serve the `index.html` file. This allows the React application to take over and render the correct page.

Most modern hosting providers have a simple way to configure this. Look for "rewrite rules" or "single-page application (SPA)" settings. A common configuration is to rewrite all requests that would otherwise result in a 404 error to `/index.html`.