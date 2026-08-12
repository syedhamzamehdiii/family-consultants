import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import os from 'node:os'
import path from 'node:path'

export default defineConfig({
  plugins: [react()],
  // Keep Vite cache off Desktop/iCloud — huge startup win
  cacheDir: path.join(os.tmpdir(), 'family-consultant-vite'),
  server: {
    host: '127.0.0.1',
    port: 5173,
    strictPort: true,
    watch: {
      ignored: ['**/_archive/**', '**/dist/**', '**/.netlify/**'],
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-dom/client', 'react-router-dom'],
  },
  build: {
    target: 'esnext',
  },
})
