// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
  cacheDirectory: '.jest-cache',
  // coverageReporters: ['html', 'json', 'text'],
  coverageThreshold: {
    global: {
      statements: 95,
      branches: 95,
      functions: 95,
      lines: 95,
    },
  },

  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: ['dist/'],
  collectCoverage: false,
  collectCoverageFrom: ['src/**/*.ts(x)', '!src/**/*.stories.ts(x)'],
  setupFilesAfterEnv: ['<rootDir>/.jest/setup.ts'],
  snapshotSerializers: ['@emotion/jest/serializer'],
  moduleNameMapper: {
    renderer: '<rootDir>/.jest/with-theme.tsx',
  },
}

export default config
