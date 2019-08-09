// For a detailed explanation regarding each configuration property, visit:
// * https://jestjs.io/docs/en/configuration.html
// * https://kulshekhar.github.io/ts-jest/user/config/

module.exports = {
  preset: 'ts-jest/presets/default',
  coverageDirectory: 'build/coverage',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testMatch: ['**/src/**/*.{test,spec}.(ts|tsx|js|jsx)'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsConfig: {
        allowJs: true,
        module: 'commonjs',
      },
    },
  },
};
