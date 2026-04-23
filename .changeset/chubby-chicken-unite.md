---
"@espcompose/eslint": patch
"@espcompose/core": patch
"@espcompose/cli": patch
---

Added support for `lambda` tagged template actions inside trigger handlers.

Use `lambda\`...\`` to emit raw C++ inline within any trigger callback. Interpolations are classified at compile time — component refs (`${myRef}`), globals (`${myGlobal}`), trigger variables (`${args.x}`), and literals are all supported and lowered to the appropriate `id(...)` or value expressions in the generated ESPHome YAML `!lambda` block.

The ESLint preset now allows tagged template expressions as statements so that `lambda\`...\`` lines don't trigger `no-unused-expressions` errors.

Added documentation for the `lambda` action to the docsite (`docs/docs/api/helpers/lambda.md`).
