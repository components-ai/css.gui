/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest/presets/default-esm', // or other ESM presets
  // preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  // extensionsToTreatAsEsm: ['.ts', '.tsx'],
}
