import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/tests/setup.js',
    include: ['src/tests/**/*.test.{js,jsx}'],
    coverage: {
      reporter: ['text', 'html'],
      include: ['src/services/**', 'src/utils/**', 'src/constants/**'],
    },
  },
})
