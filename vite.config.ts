import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // The 'define' block for 'process.env.API_KEY' has been removed.
  // The API key is now exclusively used on the server-side and is no longer exposed to the client.
  server: {
    // Port for the Vite dev server
    port: 3000,
  },
});
