import js from '@eslint/js'
import eslintPluginJest from 'eslint-plugin-jest'
import eslintPluginPrettier from 'eslint-plugin-prettier'
import typescriptParser from '@typescript-eslint/parser'
import typescriptPlugin from '@typescript-eslint/eslint-plugin'
import globals from 'globals'
import prettierConfig from './prettier.config.mjs'

function createConfig() {
  return [
    { ignores: ['dist', 'node_modules'] },
    {
      files: ['**/*.{js,jsx,ts,tsx}'],
      languageOptions: {
        ecmaVersion: 2022,
        parser: typescriptParser,
        parserOptions: {
          projectService: true,
          tsconfigRootDir: import.meta.dirname,
          // project: './tsconfig.json', // Adjust the path if necessary
          // sourceType: 'module',
        },
        globals: {
          ...globals.node, // Add Node.js globals
          ...globals.es2021, // Add ES2022 globals // NEEDED?
          ...globals.jest,
          ...eslintPluginJest.environments.globals.globals,
        },
      },
      plugins: {
        '@typescript-eslint': typescriptPlugin,
        prettier: eslintPluginPrettier,
        jest: eslintPluginJest,
      },
      rules: {
        ...js.configs.recommended.rules,
        ...typescriptPlugin.configs['recommended-type-checked'].rules,
        'prettier/prettier': [
          'error',
          prettierConfig,
          { usePrettierrc: false },
        ],
        '@typescript-eslint/consistent-type-imports': 'warn',
        '@typescript-eslint/no-unused-vars': [
          'warn',
          { argsIgnorePattern: '^_' },
        ],
        '@typescript-eslint/no-unused-expressions': 'warn',
        '@typescript-eslint/switch-exhaustiveness-check': 'warn',
        'object-shorthand': 'error',
        '@typescript-eslint/method-signature-style': 'error',
        '@typescript-eslint/no-floating-promises': 'error',
        '@typescript-eslint/no-misused-promises': [
          'error',
          {
            checksVoidReturn: {
              arguments: false,
            },
          },
        ],
        'jest/no-disabled-tests': 'warn',
        'jest/no-focused-tests': 'error',
        'jest/no-identical-title': 'error',
        'jest/prefer-to-have-length': 'warn',
        'jest/valid-expect': 'error',
      },
      settings: {},
    },
  ]
}

export default createConfig()
