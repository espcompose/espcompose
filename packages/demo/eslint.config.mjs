import composeESLint from '@espcompose/compose-eslint';

export default [
  { ignores: ['.espcompose-sim/**'] },
  ...composeESLint.recommended,
];
