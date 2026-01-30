import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Changed from '/Web_FationS/' for Vercel deployment
  server: {
    port: 3000,
    open: true,
    host: true // เปิดให้คอมเครื่องอื่นในเครือข่ายเข้าถึงได้
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
