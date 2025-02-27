//eslint.config.mjs
import js from '@eslint/js'
import eslintPluginPrettier from 'eslint-plugin-prettier'
import prettier from 'prettier'
import globals from 'globals'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import reactRefreshPlugin from 'eslint-plugin-react-refresh'
import typescriptParser from '@typescript-eslint/parser'
import typescriptPlugin from '@typescript-eslint/eslint-plugin'

async function createConfig() {
  const prettierConfig =
    (await prettier.resolveConfig('prettier.config.mjs')) ||
    (await prettier.resolveConfig('./prettier.config.mjs')) ||
    (await prettier.resolveConfig('./package.json')) ||
    {}

  return [
    { ignores: ['dist', 'node_modules'] },
    {
      files: ['**/*.{js,jsx,ts,tsx}'],
      languageOptions: {
        ecmaVersion: 2020,
        globals: {
          ...globals.browser,
          ...globals.jest,
        },
        parser: typescriptParser,
        parserOptions: {
          ecmaFeatures: {
            jsx: true, // Enable JSX parsing
          },
          project: './tsconfig.eslint.json', // Adjust path if needed
          sourceType: 'module',
        },
      },
      plugins: {
        '@typescript-eslint': typescriptPlugin,
        react: reactPlugin,
        'react-hooks': reactHooksPlugin,
        'react-refresh': reactRefreshPlugin,
        prettier: eslintPluginPrettier,
      },
      rules: {
        ...js.configs.recommended.rules,
        ...reactPlugin.configs.recommended.rules,
        ...reactHooksPlugin.configs.recommended.rules, // Expand react-hooks/recommended
        ...reactRefreshPlugin.configs.recommended.rules,
        ...typescriptPlugin.configs.recommended.rules, // Expand @typescript-eslint/recommended
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off', // If using TypeScript, you don't need prop-types
        'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
        '@typescript-eslint/consistent-type-imports': 'warn',
        '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      },
      settings: {
        react: {
          version: 'detect', // Automatically detect React version
        },
      },
    },
  ]
}

export default createConfig()
