# SparkScript - AI Prompt Generator

SparkScript is a modern web application designed to help developers generate detailed, structured prompts for AI development tools. It turns a simple app idea into a comprehensive software blueprint using the Google Gemini API.

This project follows a secure, modern architecture where the React frontend communicates with a serverless backend function, ensuring that the Google Gemini API key is never exposed to the client's browser.

## Technology Stack

- **Frontend:** React, TypeScript, Vite, Tailwind CSS, React Router
- **Backend:** Serverless Function (e.g., Vercel Edge Function)
- **AI Integration:** Google Gemini API (`@google/genai`) on the backend

---

## Project Setup

To run this project locally in a way that mimics a production environment, it is highly recommended to use the [Vercel CLI](https://vercel.com/docs/cli).

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

3.  **Install the Vercel CLI:**
    ```bash
    npm install -g vercel
    ```

4.  **Set up your Secret API Key:**
    The Google Gemini API key is a secret and must only be used on the server. The Vercel CLI can read local environment variables for development.
    
    Create a file named `.env.local` in the root of the project and add your key:
    ```
    API_KEY=your_gemini_api_key_here
    ```
    **Important:** This file is for local development only and should be listed in your `.gitignore` file.

5.  **Run the development server:**
    Use the `vercel dev` command to run the application. This command will start the Vite dev server for the frontend and simultaneously run the serverless function in the `/api` directory, creating a complete development environment.
    ```bash
    vercel dev
    ```
    The application will be available at `http://localhost:3000`.

---

## Building for Production

To create a production build of the app, run:
```bash
npm run build
```
This command bundles the frontend application and prepares the serverless function for deployment.

---

## Deployment

You can deploy this project to any hosting service that supports a Vite frontend and Node.js serverless functions (e.g., Vercel, Netlify).

### 1. Configure the Environment Variable
In your hosting provider's dashboard, you must set the `API_KEY` as a secret environment variable. This will make it securely available to your serverless function in production.

### 2. Configure the Build
- **Build Command:** `npm run build`
- **Output Directory:** `dist`

### 3. Server Configuration for Routing
This application uses `react-router-dom` with `BrowserRouter` for clean URLs. Your hosting service must be configured to handle client-side routing by redirecting all non-asset requests to `/index.html`. Most modern Jamstack hosts (like Vercel and Netlify) do this automatically for Vite projects.
