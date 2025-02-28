// backend/jest.config.ts
import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  roots: ['<rootDir>/src'],
  testMatch: ['**/*.test.ts'],
  moduleFileExtensions: ['ts', 'js'],
  transform: { '^.+\\.tsx?$': ['ts-jest'] },
}

export default config
