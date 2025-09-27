import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,ts,astro}'],
    ignores: ['dist/**', '.astro/**', 'node_modules/**'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        globals: {
          window: 'readonly',
          document: 'readonly',
          console: 'readonly',
          process: 'readonly',
          fetch: 'readonly',
          URL: 'readonly',
          URLSearchParams: 'readonly',
          crypto: 'readonly',
          TextEncoder: 'readonly',
          TextDecoder: 'readonly',
          Response: 'readonly',
          FormData: 'readonly',
          HTMLElement: 'readonly',
          Node: 'readonly',
          customElements: 'readonly',
          performance: 'readonly',
          setTimeout: 'readonly',
          clearTimeout: 'readonly',
          setImmediate: 'readonly',
          queueMicrotask: 'readonly',
          matchMedia: 'readonly',
          AbortController: 'readonly',
          MessageChannel: 'readonly',
          reportError: 'readonly',
          __REACT_DEVTOOLS_GLOBAL_HOOK__: 'readonly',
        },
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
  {
    files: ['**/*.astro'],
    rules: {
      'no-unused-vars': 'off', // Astro components can have unused props
    },
  },
];
