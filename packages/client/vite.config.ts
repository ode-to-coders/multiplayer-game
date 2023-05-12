import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import { resolve } from 'node:path';
import svgr from 'vite-plugin-svgr';

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  preview: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  define: {
    __CLIENT_URL__: `'${process.env.CLIENT_URL}'`,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      app: resolve(__dirname, 'src/app/'),
      entities: resolve(__dirname, 'src/entities/'),
      features: resolve(__dirname, 'src/features/'),
      pages: resolve(__dirname, 'src/pages/'),
      components: resolve(__dirname, 'src/components/'),
      shared: resolve(__dirname, 'src/shared/'),
      widgets: resolve(__dirname, 'src/widgets/'),
    },
  },
  plugins: [react(), svgr()],
});
