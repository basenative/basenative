const baseConfig = require('../../eslint.base.config.mjs');

module.exports = [
  ...baseConfig.default,
  {
    files: ['apps/greenput-api/**/*.ts', 'apps/greenput-api/**/*.js'],
    rules: {},
  },
  {
    files: ['apps/greenput-api/src/index.ts'],
    rules: {
      // Worker-specific rules if needed
    },
  },
];
