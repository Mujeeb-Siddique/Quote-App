import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/Quote-App/', // This ensures the app works properly when deployed to a subdirectory
});
