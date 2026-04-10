import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    // During standalone dev, proxy WS to a running simulate server
    proxy: {
      '/ws': {
        target: 'ws://localhost:5420',
        ws: true,
      },
    },
  },
});
