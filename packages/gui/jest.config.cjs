/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transform: { '^.+\\.(js|jsx|mjs)$': 'babel-jest' },
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!lodash-es)'],
}
