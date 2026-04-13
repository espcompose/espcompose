import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/cli.ts', 'src/index.ts'],
  format: 'esm',
  dts: true,
  shims: true,
  banner: {
    // Provide a real require() for bundled CJS dependencies (e.g. yaml,
    // commander) that call require() on Node builtins like 'process',
    // 'events', 'buffer', etc.  Without this, tsup's __require shim
    // throws "Dynamic require of <module> is not supported".
    js: "import { createRequire as __createRequire } from 'module'; const require = __createRequire(import.meta.url);",
  },
  external: [
    'eslint',
    '@espcompose/eslint',
    'esbuild',
    'typescript',
    'typescript-eslint',
  ],
});
