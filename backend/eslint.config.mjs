// eslint.config.mjs
import js from '@eslint/js'
import eslintPluginPrettier from 'eslint-plugin-prettier'
import prettier from 'prettier'
import typescriptParser from '@typescript-eslint/parser'
import typescriptPlugin from '@typescript-eslint/eslint-plugin'
import globals from 'globals'

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
        parser: typescriptParser,
        parserOptions: {
          project: './tsconfig.json', // Adjust the path if necessary
          sourceType: 'module',
        },
        globals: {
          ...globals.node, // Add Node.js globals
          ...globals.es2022, // Add ES2022 globals
          ...globals.jest,
        },
      },
      plugins: {
        '@typescript-eslint': typescriptPlugin,
        prettier: eslintPluginPrettier,
      },
      rules: {
        ...js.configs.recommended.rules,
        ...typescriptPlugin.configs['recommended-type-checked'].rules,
        'prettier/prettier': ['error', prettierConfig, { usePrettierrc: false }],
        '@typescript-eslint/consistent-type-imports': 'warn',
        '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      },
      settings: {
        'import/parsers': {
          '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import/resolver': {
          typescript: {
            alwaysTryTypes: true,
            project: './tsconfig.json', // Adjust the path if necessary
          },
        },
        react: {
          version: 'detect',
        },
      },
    },
  ]
}

export default createConfig()
