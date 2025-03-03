// <rootDir>/jest.config.ts
import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  verbose: true,
  forceExit: true,

  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,

  projects: ['<rootDir>/backend/generic-backend-service', '<rootDir>/backend/auth-service'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/frontend/', // Exclude the frontend directory
  ],

  // roots: ['<rootDir>/src'],
  // moduleFileExtensions: ['ts', 'js'],
  // transform: { '^.+\\.tsx?$': ['ts-jest'] },
}

export default config
