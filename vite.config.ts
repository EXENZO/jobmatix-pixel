import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    sourcemap: false,
    outDir: './public/tracking',
    rollupOptions: {
      input: './main.js',
      output: {
        entryFileNames: 'jobmatix.js',
      },
    },
  },
})
