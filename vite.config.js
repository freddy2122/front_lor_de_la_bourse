import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // Importez le module 'path' de Node.js


// https://vite.dev/config/
export default defineConfig({
  plugins: [react( )],
  resolve: {
    alias: {
      // Crée un alias '@' qui pointe directement vers le dossier 'src'
      '@': path.resolve(__dirname, './src'),
    },
  },
})
