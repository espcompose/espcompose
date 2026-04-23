import tseslint from 'typescript-eslint';

export default tseslint.config(
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      }],
      '@typescript-eslint/no-unused-expressions': ['error', {
        allowTaggedTemplates: true,
      }],
    },
  },
  {
    ignores: ['**/dist/**', '**/node_modules/**', '**/.espcompose/**', '**/generated/**'],
  },
);
