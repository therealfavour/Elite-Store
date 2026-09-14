import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev
export default defineConfig({
  plugins: [react()],
  base: 'Elite-Store', // 👈 ADD THIS LINE HERE
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});

