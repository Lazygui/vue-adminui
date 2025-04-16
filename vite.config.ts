import vue from '@vitejs/plugin-vue'
import path from 'path'
import autoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'
import AutoImportOptions from './src/vite-plugin/options/unplugin-auto-import'
export default defineConfig({
  plugins: [
    vue(),
    autoImport(AutoImportOptions),
  ],
  server: {
    port: 8080,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
