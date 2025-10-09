import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // This makes the environment variable available to the client-side code.
    // Vite performs a direct string replacement, so we need to stringify the value.
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY),
  },
  server: {
    // Port for the Vite dev server
    port: 3000,
  },
});
