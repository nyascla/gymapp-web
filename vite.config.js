import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],  
  base: './',
  build: {
    assetsDir: 'static',
    brotliSize: false, // not supported in StackBlitz
  }, 
  server: {
    host: true, // Permite la conexión desde otras máquinas en la red local
    port: 5173, // O el puerto que prefieras
    proxy: {
      '/api': {
          target: 'http://127.0.0.1:8000',
          // target: "https://gym.nyascla.pro",
          changeOrigin: true,
          secure: false,
  
      },
    }
  }

})

          // target: 'http://127.0.0.1:8001',
