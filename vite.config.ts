import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // This makes the environment variable available to the client-side code.
    // It reads REACT_APP_API_KEY from the build environment and assigns it to process.env.API_KEY.
    'process.env.API_KEY': JSON.stringify(process.env.REACT_APP_API_KEY),
  },
  server: {
    // Port for the Vite dev server
    port: 3000,
  },
});