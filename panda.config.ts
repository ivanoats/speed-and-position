import { defineConfig } from '@pandacss/dev'
import { createPreset } from '@park-ui/panda-preset'
import blue from '@park-ui/panda-preset/colors/blue'
import slate from '@park-ui/panda-preset/colors/slate'

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Use ParkUI preset for polished design system
  presets: [
    createPreset({
      accentColor: blue,
      grayColor: slate,
      radius: 'md',
    }),
  ],

  // Where to look for your css declarations
  include: [
    './src/**/*.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
    './node_modules/@park-ui/panda-preset/dist/**/*.js',
  ],

  // Files to exclude
  exclude: [],

  // Mobile-first breakpoints
  theme: {
    extend: {
      tokens: {
        fonts: {
          body: { value: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' },
        },
      },
    },
  },

  // The output directory for your css system
  outdir: 'styled-system',

  // Enable JSX support
  jsxFramework: 'react',
})
