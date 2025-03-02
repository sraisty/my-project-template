import baseConfig from '../eslint.config.base.mjs'
import { includeIgnoreFile } from '@eslint/compat'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// ignore everything in the ../.gitignore file
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const gitignorePath = path.resolve(__dirname, '../.gitignore')

const migrationIgnores = {
  ignores: ['**/auth-service/migrations/*', '**/jest.config.ts'],
}

export default [...baseConfig, includeIgnoreFile(gitignorePath), migrationIgnores]
