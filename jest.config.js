module.exports = {
  preset: 'ts-jest',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['html', 'lcov', 'text'],
  collectCoverageFrom: ['packages/*/src/**/*.ts'],
  watchPathIgnorePatterns: ['/node_modules/', '/dist/', '/.git/'],
  moduleFileExtensions: ['ts', 'js'],
  moduleNameMapper: {
    '^@loglin/(.*?)$': '<rootDir>/packages/$1/src',
    loglin: '<rootDir>/packages/loglin/src',
  },
  rootDir: __dirname,
  testMatch: ['<rootDir>/packages/**/__tests__/**/*spec.ts'],
  testPathIgnorePatterns: ['/node_modules/'],
}
