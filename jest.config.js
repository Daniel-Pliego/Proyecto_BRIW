/** @type {import('jest').Config} */
const config = {
  moduleNameMapper: {
    '^@script/(.*)$': '<rootDir>/public/script/$1',
  },
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { configFile: './babel.config.js' }],
  },
};

module.exports = config;
