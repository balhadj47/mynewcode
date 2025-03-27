import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://asdar.net:8443',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/webhook/571a7163-772a-4090-bf39-5d172e441ebe'),
        secure: false
      }
    }
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  }
})
