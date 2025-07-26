const js = require('@eslint/js');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const prettier = require('eslint-plugin-prettier');

module.exports = [
  js.configs.recommended,
  {
    files: ['src/**/*.ts'],
    ignores: ['dist/', 'example/'],
    languageOptions: {
      parser: tsParser,
      globals: {
        process: 'readonly',
        console: 'readonly',
        __dirname: 'readonly',
        require: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      prettier: prettier,
    },
    rules: {
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'linebreak-style': ['error', 'unix'],
      eqeqeq: ['error', 'always'],
      'max-len': ['error', { code: 100 }],
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          semi: true,
          tabWidth: 2,
        },
      ],
    },
  },
  {
    files: ['src/**/*abstract.*.ts'],
    rules: {
      'no-unused-vars': 'off',
    },
  },
];
