import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'url';
// import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'happy-dom',
    clearMocks: true,
    restoreMocks: true,
    mockReset: true,
    watch: true,
    isolate: true,
    transformMode: {
      web: [/\.([cm]?[jt]sx?|json|vue)$/],
    },
  },
});
