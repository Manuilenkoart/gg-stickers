module.exports = {
  plugins: ['perfectionist', '@typescript-eslint', 'prettier'],
  extends: ['next/core-web-vitals', 'prettier', 'plugin:prettier/recommended', 'plugin:@typescript-eslint/recommended'],
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
    'jsx-a11y/alt-text': [
      'error',
      {
        elements: ['img', 'input[type="image"]'],
      },
    ],
    // perfectionist
    // https://eslint-plugin-perfectionist.azat.io/
    'perfectionist/sort-named-imports': [
      1,
      {
        order: 'asc',
        type: 'line-length',
      },
    ],
    'perfectionist/sort-named-exports': [
      1,
      {
        order: 'asc',
        type: 'line-length',
      },
    ],
    'perfectionist/sort-exports': [
      1,
      {
        order: 'asc',
        type: 'line-length',
      },
    ],
    'perfectionist/sort-imports': [
      1,
      {
        type: 'alphabetical',
        order: 'asc',
        ignoreCase: true,
        internalPattern: ['~/**'],
        newlinesBetween: 'always',
        maxLineLength: undefined,
        groups: [
          'type',
          ['builtin', 'external'],
          'internal-type',
          'internal',
          ['parent-type', 'sibling-type', 'index-type'],
          ['parent', 'sibling', 'index'],
          'object',
          'unknown',
        ],
        customGroups: { type: {}, value: {} },
        environment: 'node',
      },
    ],
  },
};
