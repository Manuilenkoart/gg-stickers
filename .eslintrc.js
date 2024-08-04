module.exports = {
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'next/core-web-vitals',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
      },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['**/*.spec.ts', '**/*.spec.tsx', 'vitest.config.ts'],
      },
    ],
  },
};
