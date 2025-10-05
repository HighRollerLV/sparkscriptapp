# SparkScript - AI Prompt Generator

SparkScript is a modern web application designed to help developers generate detailed, structured prompts for AI development tools. It turns a simple app idea into a comprehensive software blueprint.

## Technology Stack

- **Frontend:** React, TypeScript, Vite, Tailwind CSS
- **AI Integration:** Google Gemini API
- **Backend Proxy:** Cloudflare Workers
- **Hosting:** Coolify (for the frontend static site)

---

## Architecture: Why Use a Cloudflare Worker?

This project intentionally separates the frontend (user interface) from the backend (API key handling). This is a critical security practice.

- **The Problem:** Your Google Gemini API key is a secret. If you include it directly in your frontend JavaScript code, it will be visible to anyone visiting your website. This would allow them to use your key, potentially costing you money.

- **The Solution:** The Cloudflare Worker acts as a secure, private backend.
    1. Your frontend application on Coolify sends the user's prompt to the worker (via a proxy).
    2. The worker, running securely on Cloudflare's servers, receives the prompt and adds your secret API key.
    3. The worker then calls the Google Gemini API and streams the result back to the user.

Your API key **never** leaves the secure server environment. Using Coolify's environment variables for a **static site deployment** is not a secure alternative, as those variables would have to be embedded into the public JavaScript files during the build process.

---

## Deployment Guide

This project consists of two main parts that are deployed separately:
1.  A secure backend proxy running on **Cloudflare Workers**.
2.  A static frontend application hosted on **Coolify**.

### 1. Backend Deployment (Cloudflare Worker)

The worker acts as a secure proxy to protect your Google Gemini API key.

1.  **Create a Cloudflare Worker:**
    - Log in to your Cloudflare dashboard.
    - Go to **Workers & Pages** and create a new Worker.
    - Copy the entire content of `cloudflare-worker.js` from this repository into the worker editor. The correct code uses Server-Sent Events (SSE) for reliable streaming.
    - Click **Save and Deploy**.

2.  **Add Your API Key as a Secret:**
    - In your Worker's settings, go to the **Settings** -> **Variables** tab.
    - Under **Environment Variable Bindings**, click **Add variable**.
    - Set the **Variable name** to `API_KEY`.
    - Paste your Google Gemini API key into the **Value** field and click **Encrypt**.
    - Click **Save**.

3.  **Note the Worker URL:** You will get a URL like `https://your-worker-name.your-account.workers.dev`. You'll need this for the Coolify setup.

### 2. Frontend Deployment (Coolify)

The frontend is a static site built with Vite. Follow these steps carefully.

1.  **Create a New Resource in Coolify:**
    - Add a new resource from your Git repository (`HighRollerLV/sparkscript`).
    - Choose the **`nixpacks`** build pack option. This provides the best automatic configuration for modern web apps.

2.  **Configure the Build Settings:**
    - **Branch:** `master` (or `main` if that is your primary branch).
    - **`Install Command`**: Leave this field **EMPTY**. Nixpacks will handle it.
    - **`Build Command`**: Leave this field **EMPTY**. Nixpacks will handle it.
    - **`Publish Directory`**: Leave this field **EMPTY**. Nixpacks automatically finds the correct `dist` folder.

3.  **Configure Networking (Domains & Proxy):**
    - **FQDN (Domains):** Add your custom domain (e.g., `www.sparkscript.tech`).
    - **`Ports Exposes`**: **CRITICAL STEP** - This field **MUST** be **EMPTY**. A static site does not expose a port; it is served by a web server. Filling this in (e.g., with `3000`) is the most common reason for a failed deployment.
    - **Proxy:**
        - **Path:** `/api/generate`  **(Important: Use this exact, specific path!)**
        - **Target:** Your full Cloudflare Worker URL from the backend setup (e.g., `https://your-worker-name.your-account.workers.dev`).

4.  **Deploy:**
    - Save all your settings and click **Deploy**. Coolify will now build your project and serve it correctly.
