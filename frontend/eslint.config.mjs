// frontend/eslint.config.mjs
// import js from '@eslint/js'
// import typescriptParser from '@typescript-eslint/parser'
// import typescriptPlugin from '@typescript-eslint/eslint-plugin'
import globals from 'globals'
import baseConfig from '../eslint.config.base.mjs'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import reactRefreshPlugin from 'eslint-plugin-react-refresh'

function createConfig() {
  return [
    {
      // ...baseConfig,
      languageOptions: {
        ...baseConfig.languageOptions,
        parserOptions: {
          // *****************  BELOW THIS IS DIFFERENT
          sourceType: 'module',
          ecmaFeatures: {
            jsx: true,
          },
          project: './tsconfig.eslint.json',
          // ***************** ABOVE THIS IS DIFFERENT
        },
        globals: {
          ...globals.browser,
          ...globals.es2022, // Add ES2022 globals // NEEDED?
        },
      },
      plugins: {
        ...baseConfig.plugins,
        react: reactPlugin,
        'react-hooks': reactHooksPlugin,
        'react-refresh': reactRefreshPlugin,
      },
      rules: {
        ...baseConfig.rules,
        ...reactPlugin.configs.recommended.rules,
        ...reactHooksPlugin.configs.recommended.rules, // Expand react-hooks/recommended
        ...reactRefreshPlugin.configs.recommended.rules,
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off', // If using TypeScript, you don't need prop-types
        'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
        'react-refresh/only-export-components': 'warn',
      },
      settings: {
        ...baseConfig.settings,
        react: {
          version: 'detect', // Automatically detect React version
        },
      },
    },

    // // Test file overrides (Vitest specific):
    // {
    //   files: ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', '**/*.spec.tsx'],
    //   languageOptions: {
    //     globals: {
    //       vi: 'readonly',
    //       describe: 'readonly',
    //       it: 'readonly',
    //       expect: 'readonly',
    //     },
    //   },
    // },

    // // Vite config file:
    // {
    //   files: ['vite.config.ts'],
    //   languageOptions: {
    //     globals: globals.node,
    //     // parser: typescriptParser,
    //     parserOptions: {
    //       project: './tsconfig.node.json',
    //       sourceType: 'module',
    //     },
    //   },
    //   plugins: { ...baseConfig.plugins },
    //   rules: { ...baseConfig.rules },
    // },
  ]
}

export default createConfig()
