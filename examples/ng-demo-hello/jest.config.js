// For a detailed explanation regarding each configuration property, visit:
// * https://jestjs.io/docs/en/configuration.html
// * https://kulshekhar.github.io/ts-jest/user/config/
// * https://github.com/thymikee/jest-preset-angular

module.exports = {
    preset: 'jest-preset-angular',
    setupTestFrameworkScriptFile: 'jest-preset-angular/setupJest.js',
    roots: ['src'],
    globals: {
        'ts-jest': {
            tsConfig: '<rootDir>/tsconfig-test.json'
        }
    }
};
