---
"@espcompose/eslint": minor
"@espcompose/core": minor
"@espcompose/cli": minor
"@espcompose/ui": minor
---

Replace theme registration and access APIs with a unified `createTheme()` factory

**Breaking changes:**

- Removed `registerTheme`, `theme.select()`, `useTheme`, `themeLeaf`, `ThemeProvider`, `createStyles`, and `mergeStyles` from `@espcompose/core`
- Removed `UI_THEME_SCOPE` from `@espcompose/ui`; use `UITheme` handle instead

**New API:**

`createTheme(scope, themes)` returns a `ThemeHandle` with:
- `.Provider` — component that registers themes and renders children
- `.select(name)` — switches the active theme inside trigger handlers
- `.use()` — returns the reactive theme proxy for component styling
- `.extend(themes)` — adds user-defined theme variants

**Compiler:**

- Added `THEME_BRAND` phantom brand and `hasThemeBrand` / `extractThemeScopeFromType` utilities for detecting `handle.select()` calls
- Renamed `isCoreHookCall` to `isCoreExportCall`; added `isCorePropertyCall` helper
- Removed `action-compiler.ts` (logic consolidated elsewhere)

**ESLint:**

- Updated `no-unsupported-trigger-body` rule to recognize handle-based `.select()` calls
