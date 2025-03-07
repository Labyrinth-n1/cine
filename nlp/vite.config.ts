import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://g2-sentiment-analysis-844747804346.us-central1.run.app',
        changeOrigin: true,
        secure: false, // Ignore les erreurs SSL auto-signées (utile pour certains serveurs)
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
