import composeESLint from '@espcompose/eslint';

export default [
  { ignores: ['.espcompose-sim/**'] },
  ...composeESLint.recommended,
];
