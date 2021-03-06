module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'airbnb-base',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'no-console': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto'
      }
    ],
    'import/extensions': [
      'error',
      {
        ts: 'never'
      }
    ]
  },
  ignorePatterns: ['webpack.config.js', 'dist/**', 'tsconfig.json'],
  overrides: [
    {
      files: ['*.json'],
      rules: {
        'no-unused-expressions': 'off'
      }
    }
  ]
};
