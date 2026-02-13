import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { loadEnv } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables from .env file
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    define: {
      // This makes the environment variable available to the client-side code.
      // It reads REACT_APP_API_KEY from the .env file and assigns it to process.env.API_KEY.
      'process.env.API_KEY': JSON.stringify(env.REACT_APP_API_KEY),
    },
    server: {
      // Port for the Vite dev server
      port: 3000,
    },
    build: {
      // Increase chunk size warning limit to account for large syntax highlighter
      // The markdown-vendor chunk contains react-syntax-highlighter with all language support
      // This is reasonable for a dev tool that specializes in prompt generation
      chunkSizeWarningLimit: 1000,

      // Enable CSS code splitting
      cssCodeSplit: true,

      // Enable minification with esbuild (faster and built-in)
      minify: 'esbuild',

      // Optimize source maps for production
      sourcemap: false, // Disable source maps in production for smaller bundle

      // Optimize rollup output with manual chunks
      rollupOptions: {
        output: {
          manualChunks: {
            // Core React dependencies
            'react-vendor': [
              'react',
              'react-dom',
              'react-router-dom',
            ],
            // Markdown and syntax highlighting (largest, but necessary)
            'markdown-vendor': [
              'react-markdown',
              'remark-gfm',
              'react-syntax-highlighter',
            ],
            // UI and animation libraries
            'ui-vendor': [
              'framer-motion',
              'react-icons',
            ],
            // Google AI SDK
            'google-ai': [
              '@google/genai',
            ],
          },
          // Optimize chunk names for better caching
          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash][extname]',
        },
      },
    },
  };
});