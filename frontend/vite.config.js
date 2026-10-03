import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite Configuration
// Vite runs on default port 5173
// Proxy forwards /api requests to Express Backend on port 5000
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
});
