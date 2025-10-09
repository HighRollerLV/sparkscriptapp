import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Prevent Vite from clearing the terminal screen.
  // This is useful when running multiple servers concurrently.
  clearScreen: false,
  server: {
    // Port for the Vite dev server
    port: 3000,
    // Proxy API requests to the backend server during development
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
});