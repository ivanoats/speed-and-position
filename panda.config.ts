import { defineConfig } from '@pandacss/dev'

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Use base preset
  presets: ['@pandacss/preset-base'],

  // Where to look for your css declarations
  include: [
    './src/**/*.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}'
  ],

  // Files to exclude
  exclude: [],

  // Mobile-first breakpoints
  theme: {
    extend: {
      breakpoints: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      tokens: {
        fonts: {
          body: { value: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' },
        },
        colors: {
          blue: {
            50: { value: '#eff6ff' },
            100: { value: '#dbeafe' },
            200: { value: '#bfdbfe' },
            300: { value: '#93c5fd' },
            400: { value: '#60a5fa' },
            500: { value: '#3b82f6' },
            600: { value: '#2563eb' },
            700: { value: '#1d4ed8' },
            800: { value: '#1e40af' },
            900: { value: '#1e3a8a' },
          },
          gray: {
            50: { value: '#f9fafb' },
            100: { value: '#f3f4f6' },
            200: { value: '#e5e7eb' },
            300: { value: '#d1d5db' },
            400: { value: '#9ca3af' },
            500: { value: '#6b7280' },
            600: { value: '#4b5563' },
            700: { value: '#374151' },
            800: { value: '#1f2937' },
            900: { value: '#111827' },
          },
          red: {
            100: { value: '#fee2e2' },
            500: { value: '#ef4444' },
            800: { value: '#991b1b' },
          },
        },
      },
    },
  },

  // The output directory for your css system
  outdir: 'styled-system',

  // Enable JSX support
  jsxFramework: 'react',
})
