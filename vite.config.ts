import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    outDir: './',
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, './main.js'),
      name: 'pixel',
      // the proper extensions will be added
      fileName: 'jm',
    },
  },
})
