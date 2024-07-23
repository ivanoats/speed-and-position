import globals from "globals";
import prettier from "prettier";

export default [
  {
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
    globals: {
        ...globals.browser, geolocator: 'readonly'
    },
    },
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    }
  }
]
