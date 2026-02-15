import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: true,
    coverage: {
      exclude: [
        'styled-system/**',
        '**/node_modules/**',
        '**/dist/**',
        '**/*.test.{ts,tsx}',
        '**/*.spec.{ts,tsx}',
        '**/index.ts',
      ],
    },
  },
  resolve: {
    alias: {
      'styled-system': path.resolve(__dirname, './styled-system'),
    },
  },
  define: {
    'import.meta.vitest': 'undefined',
  },
})
