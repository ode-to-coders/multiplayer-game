module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  ignorePatterns: ['**/dist/*', '/node_modules'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
  },
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/ban-ts-comment': 0,
    quotes: [2, 'single', { avoidEscape: true }],
  },
};
