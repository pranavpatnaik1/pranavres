import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: {
    alias: {
      '@supabase/supabase-js': '@supabase/supabase-js/dist/module'
    }
  },
  optimizeDeps: {
    include: ['@supabase/supabase-js']
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true
    }
  }
})
