# SparkScript - AI Prompt Generator

SparkScript is a modern web application designed to help developers generate detailed, structured prompts for AI development tools. It turns a simple app idea into a comprehensive software blueprint.

## Technology Stack

- **Frontend:** React, TypeScript, Vite, Tailwind CSS, React Router
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

Your API key **never** leaves the secure server environment. 

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
    - Copy the entire content of `cloudflare-worker.js` from this repository into the worker editor. 
    - Click **Save and Deploy**.

2.  **Add Your API Key as a Secret:**
    - In your Worker's settings, go to the **Settings** -> **Variables** tab.
    - Under **Environment Variable Bindings**, click **Add variable**.
    - Set the **Variable name** to `API_KEY`.
    - Paste your Google Gemini API key into the **Value** field and click **Encrypt**.
    - Click **Save**.

3.  **Note the Worker URL:** You will get a URL like `https://your-worker-name.your-account.workers.dev`. You'll need this for the Coolify setup.

### 2. Frontend Deployment (Coolify)

The frontend is a static site built with Vite. Follow these steps precisely to ensure a successful deployment.

1.  **Create a New Resource in Coolify:**
    - Add a new resource from your Git repository (`HighRollerLV/sparkscriptapp`).
    - **Build Pack:** Choose **`Nixpacks`**.

2.  **Configure General Settings:**
    - **`Static Image`**: 🚨 **CRITICAL STEP #1** 🚨 -> This field **MUST BE EMPTY**. You have selected the `Nixpacks` build pack, which automatically provides the correct web server. Filling in `nginx:alpine` here will override the Nixpacks configuration and **cause your deployment to fail**. Leave it blank.
    - **`Publish Directory`**: 🚨 **CRITICAL STEP #2** 🚨 -> This field **MUST BE EMPTY**. Nixpacks automatically finds the correct `dist` folder. Filling this in can lead to 404 errors if there's a typo or misconfiguration.

3.  **Configure Build Settings:**
    - **`Install Command`**: Leave **EMPTY**.
    - **`Build Command`**: Leave **EMPTY**.

4.  **Configure Networking (Domains & Proxy):**
    - **FQDN (Domains):** Add your custom domain (e.g., `www.sparkscript.tech`).
    - **`Ports Exposes`**: 🚨 **CRITICAL STEP #3** 🚨 -> This field **MUST BE EMPTY**. A static site served by Nixpacks does not "expose" a port from the application itself. Filling this field will cause the deployment to fail or be unreachable.
    
5.  **Configure the API Proxy:**
    - Scroll down to the **"Proxy"** section.
    - **Path:** `/api/generate`  (This must be exact.)
    - **Target:** Your full Cloudflare Worker URL from the backend setup (e.g., `https://your-worker-name.your-account.workers.dev`).

6.  **Configure for a Single-Page Application (SPA):**
    - Ensure the **`Is it a SPA (Single Page Application)?`** checkbox is **CHECKED**. This tells Nixpacks to generate the correct server configuration to handle client-side routing, preventing 404 errors when you refresh the page on a sub-route like `/generator`.

7.  **Deploy:**
    - Save all your settings and click **Deploy**.
    
By following these steps—especially leaving the `Static Image`, `Publish Directory`, and `Ports Exposes` fields empty—you are allowing Nixpacks to correctly build, serve, and configure your SPA.