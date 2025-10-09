# SparkScript - AI Prompt Generator

SparkScript is a modern web application designed to help developers generate detailed, structured prompts for AI development tools. It turns a simple app idea into a comprehensive software blueprint using the Google Gemini API.

This project uses a secure, standard client-server architecture. The React frontend (built with Vite) communicates with a dedicated Node.js (Express) backend server, ensuring that the Google Gemini API key is never exposed to the client's browser.

## Technology Stack

- **Frontend:** React, TypeScript, Vite, Tailwind CSS, React Router
- **Backend:** Node.js, Express.js
- **AI Integration:** Google Gemini API (`@google/genai`) on the backend

---

## Deployment on Coolify (or any Node.js Host)

This application is built as a standard Node.js app, which is perfect for platforms like Coolify.

1.  **Push to a Git Repository:**
    Make sure your project is on GitHub, GitLab, or Bitbucket.

2.  **Create a New Application in Coolify:**
    - In your Coolify dashboard, create a new resource and point it to your Git repository.
    - Coolify should detect it's a Node.js application and suggest a **Nixpacks** build. This is the correct choice.

3.  **Configure the Build & Start Commands:**
    Coolify will automatically use the scripts from your `package.json`.
    - **Install Command:** It will use `npm install`.
    - **Build Command:** It will use `npm run build`.
    - **Start Command:** It will use `npm run start`.
    This requires no changes from you.

4.  **Add Your Secure Environment Variable:**
    This is the most important step for connecting to the Gemini API.
    
    - In your Coolify application's dashboard, go to the **Environment Variables** section.
    - Add a **new, secret** variable:
        - **Name:** `REACT_APP_API_KEY`
        - **Value:** `your_gemini_api_key_here`
    - Click **Save**.

5.  **Deploy:**
    - Trigger a new deployment in Coolify.
    - Coolify will build your React app, start your Node.js server, and make your application available at the provided domain. The server will automatically serve the frontend and handle API calls securely.

---

## Local Development

The development environment has been streamlined to use a single command.

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd sparkscript
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up your Local API Key:**
    The backend server needs access to your API key for local development.
    
    Create a file named `.env` at the **root** of your project:
    ```
    # This file is for local development only.
    # The server is configured to read this variable name locally.
    API_KEY=your_gemini_api_key_here
    ```

4.  **Run the Application:**
    - Open your terminal and run the single `dev` command:
      ```bash
      npm run dev
      ```
      This will start both the backend Node.js server (`http://localhost:3001`) and the frontend Vite server (`http://localhost:3000`) at the same time in one terminal.

    Now, open `http://localhost:3000` in your browser to use the application.