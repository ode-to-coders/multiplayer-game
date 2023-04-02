import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import { resolve } from 'node:path';

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT,
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
  plugins: [react()],
});
