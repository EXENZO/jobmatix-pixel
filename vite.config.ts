import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    outDir: './tracker',
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, './main.js'),
      name: 'jobmatix-pixel',
      // the proper extensions will be added
      fileName: 'script',
    },
  },
})
