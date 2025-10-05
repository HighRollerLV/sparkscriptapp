import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Port for the Vite dev server
    port: 3000,
    // The proxy has been removed as we no longer run a local backend server.
    // API calls in production are handled by a Cloudflare Worker.
  },
});
