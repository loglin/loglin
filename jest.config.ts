import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  testEnvironment: 'node',
  testMatch: ['<rootDir>/packages/**/__tests__/**/*.spec.ts'],
  preset: 'ts-jest'
}

export default config
