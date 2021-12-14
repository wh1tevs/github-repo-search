import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  resolve: {
    alias: {
      '/@': resolve(__dirname, 'src'),
      '/~': resolve(__dirname, 'src/assets'),
      '/@@': resolve(__dirname, 'src/components'),
      '/@use': resolve(__dirname, 'src/use'),
    }
  },
  plugins: [
    vue(),
  ]
})
