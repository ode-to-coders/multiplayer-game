import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'ssr.tsx'),
      name: 'Client',
      formats: ['cjs'],
    },
    rollupOptions: {
      output: {
        dir: 'ssr-dist',
      },
    },
  },
  define: {
    __CLIENT_URL__: `'${process.env.CLIENT_URL}'`,
    __APP_PATH__: `'${process.env.APP_PATH}'`,
    __YANDEX_OAUTH_REDIRECT_PATH__:
      `'${process.env.YANDEX_OAUTH_REDIRECT_PATH}'`,
  },
  plugins: [react(), svgr()],
});
