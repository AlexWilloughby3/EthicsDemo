import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Relative asset paths so the build works under GitHub Pages' /EthicsDemo/ subpath
  // (and any other static host). Routing uses HashRouter, so no server rewrites are needed.
  base: './',
})
