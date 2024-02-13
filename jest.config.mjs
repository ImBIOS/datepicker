// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
  cacheDirectory: '.jest-cache',
  // coverageReporters: ['html', 'json', 'text'],
  coverageThreshold: {
    global: {
      statements: 89, // TODO: Increase this to 95
      branches: 67, // TODO: Increase this to 95
      functions: 73, // TODO: Increase this to 95
      lines: 90, // TODO: Increase this to 95
    },
  },

  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: ['dist/'],
  collectCoverage: false,
  collectCoverageFrom: ['src/**/*.(ts|tsx)', '!src/**/*.stories.(ts|tsx)'],
  setupFilesAfterEnv: ['<rootDir>/.jest/setup.ts'],
  snapshotSerializers: ['@emotion/jest/serializer'],
  moduleNameMapper: {
    renderer: '<rootDir>/.jest/with-theme.tsx',
  },
}

export default config
