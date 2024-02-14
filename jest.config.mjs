// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
  cacheDirectory: '.jest-cache',
  // coverageReporters: ['html', 'json', 'text'],
  coverageThreshold: {
    global: {
      statements: 76, // TODO: Increase this to 95
      branches: 50, // TODO: Increase this to 95
      functions: 65, // TODO: Increase this to 95
      lines: 78, // TODO: Increase this to 95
    },
  },

  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: ['dist/'],
  collectCoverage: false,
  collectCoverageFrom: ['src/**/*.(ts|tsx)', '!src/**/*.stories.(ts|tsx)'],
  setupFilesAfterEnv: ['<rootDir>/.jest/setup.ts'],
  globalSetup: '<rootDir>/.jest/global-setup.ts',
  snapshotSerializers: ['@emotion/jest/serializer'],
  moduleNameMapper: {
    renderer: '<rootDir>/.jest/with-theme.tsx',
  },
  transform: {
    '^.+\\.(t|j)sx?$': [
      '@swc/jest',
      {
        jsc: {
          transform: {
            react: {
              runtime: 'automatic',
            },
          },
        },
      },
    ],
  },
}

export default config
