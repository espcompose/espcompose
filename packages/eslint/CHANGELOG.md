# @espcompose/eslint

## 0.6.1

### Patch Changes

- Updated dependencies [[`e3ac80c`](https://github.com/espcompose/espcompose/commit/e3ac80c3360cd4ff0d3877933cb2864a813c1501)]:
  - @espcompose/core@0.6.1

## 0.6.0

### Minor Changes

- [#39](https://github.com/espcompose/espcompose/pull/39) [`0b94d38`](https://github.com/espcompose/espcompose/commit/0b94d38d35c6e3482f784abd17a5b50e1846151a) Thanks [@xmlguy74](https://github.com/xmlguy74)! - Replace theme registration and access APIs with a unified `createTheme()` factory

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

### Patch Changes

- Updated dependencies [[`0b94d38`](https://github.com/espcompose/espcompose/commit/0b94d38d35c6e3482f784abd17a5b50e1846151a), [`0b94d38`](https://github.com/espcompose/espcompose/commit/0b94d38d35c6e3482f784abd17a5b50e1846151a)]:
  - @espcompose/core@0.6.0

## 0.5.0

### Patch Changes

- [#36](https://github.com/espcompose/espcompose/pull/36) [`9248ec8`](https://github.com/espcompose/espcompose/commit/9248ec832b017c2d1d56911540fbb750757ddd15) Thanks [@xmlguy74](https://github.com/xmlguy74)! - ## `useGlobal` hook support

  Added support for the `useGlobal` hook, which binds a reactive signal to an ESPHome `globals` component. A new `'global'` source type is recognised in `IRDependency`, and the compiler emits the corresponding `IRGlobalSet` action. The C++ reactive runtime (`espcompose_reactive.h`), bindings codegen, action lowering, and reactive config have all been updated to support global variables. An E2E test project (`globals-device`) is included.

  ## Lint worker thread

  The lint compiler phase now runs in a dedicated worker thread (`lint-worker.ts`), reducing blocking time on the main thread and improving overall CLI build performance.

  ## CLI metrics

  A lightweight `metrics` utility has been added to the CLI, recording per-phase timing information that can be used for performance analysis and reporting.

  ## Removed `WidgetHost`

  The internal `WidgetHost` component has been removed from `@espcompose/core`. All UI components (Button, Card, Dropdown, Grid, Image, Row, Slider, Space, Spinner, Switch, Text) have been updated accordingly. A missing `transparent` style on the EC canvas target has also been fixed.

  ## Dead code removal and hook detection improvements

  Removed unused semantic-analysis code. Improved hook detection logic in the compiler to more accurately identify reactive hooks in component trees.

- Updated dependencies [[`7cf28c5`](https://github.com/espcompose/espcompose/commit/7cf28c582f219f6c493bd14886ed0fdcbe187781), [`9248ec8`](https://github.com/espcompose/espcompose/commit/9248ec832b017c2d1d56911540fbb750757ddd15)]:
  - @espcompose/core@0.5.0

## 0.4.0

### Minor Changes

- [#34](https://github.com/espcompose/espcompose/pull/34) [`3392097`](https://github.com/espcompose/espcompose/commit/3392097f5a5ed4761d7e5fa03e2edf02f2bc6f41) Thanks [@xmlguy74](https://github.com/xmlguy74)! - ## Simulator overhaul, theme system in core, and LVGL improvements

  ### @espcompose/cli

  - Removed the old browser-based `simulate` command and all associated simulator infrastructure (`simulator-app`, `simulator-bridge`, `simulator-target` packages)
  - Added host-based simulation using the native host platform + SDL2, replacing the previous WebSocket bridge architecture
  - Added a new semantic analysis compiler phase (`semantic-analysis.ts`, `semantic-registry.ts`) with a direct pass-through for unrecognized constructs
  - Added source file tracking through the compiler pipeline
  - Added layout line support in the `run` command

  ### @espcompose/core

  - Moved the theme system into `@espcompose/core` (previously external). Includes `ThemeProvider`, `createStyles`, font resolution, scoped theme hashing, and reactive theme proxies
  - Added `HexColor` branded type for compile-time safe color values
  - Added support for multiple named themes in a single project via `theme-registry`
  - Added `component-aliases.ts` for mapping component identifiers to their generated types
  - Added `createEspHomeComponent` helper and cleaned up internal usage
  - Added `WidgetHost` and `wireframe` utilities for host-based rendering
  - Added `trigger-registry` for LVGL widget trigger management
  - Updated IR: new LVGL action kinds and component ref types in `action-types` and `expr-types`
  - Refactored intent system (`intents`, `intent-registry`) with new widget creation helpers

  ### @espcompose/ui

  - Added `WidgetHost` component for host-based simulation layout
  - Added layout line support across all core components
  - Updated `Button`, `Card`, `Dropdown`, `Grid`, `Image`, `Row`, `Slider`, `Space`, `Spinner`, `Switch`, and `Text` components
  - Updated dark/light theme definitions to match new theme type structure

  ### @espcompose/eslint

  - Updated `jsx-children-intents` rule and `intent-resolver` utility to match the refactored intent system in `@espcompose/core`

### Patch Changes

- Updated dependencies [[`3392097`](https://github.com/espcompose/espcompose/commit/3392097f5a5ed4761d7e5fa03e2edf02f2bc6f41)]:
  - @espcompose/core@0.4.0

## 0.3.2

### Patch Changes

- Updated dependencies [[`e38d4ad`](https://github.com/espcompose/espcompose/commit/e38d4ad5d6b82164b3626b86c97a4ca4562ce10b)]:
  - @espcompose/core@0.3.2

## 0.3.1

### Patch Changes

- [#28](https://github.com/espcompose/espcompose/pull/28) [`3cd21da`](https://github.com/espcompose/espcompose/commit/3cd21daae1aa3d5bc4f367fd7b3f18450855e7eb) Thanks [@xmlguy74](https://github.com/xmlguy74)! - Resovled issues with simulator not performing page navigation correctly.

- Updated dependencies [[`3cd21da`](https://github.com/espcompose/espcompose/commit/3cd21daae1aa3d5bc4f367fd7b3f18450855e7eb)]:
  - @espcompose/core@0.3.1

## 0.2.2

### Patch Changes

- [`85fcfff`](https://github.com/espcompose/espcompose/commit/85fcfffd4fea8c1f99dae3e4d95bde9a3c0fe50c) Thanks [@xmlguy74](https://github.com/xmlguy74)! - Fixed issues with doc references, addded AI instructions, added new upgrade command.

- Updated dependencies [[`85fcfff`](https://github.com/espcompose/espcompose/commit/85fcfffd4fea8c1f99dae3e4d95bde9a3c0fe50c)]:
  - @espcompose/core@0.2.2

## 0.2.1

### Patch Changes

- [#23](https://github.com/espcompose/espcompose/pull/23) [`fd5cb47`](https://github.com/espcompose/espcompose/commit/fd5cb4703b9aaec5b6870e64b50766f63827d075) Thanks [@xmlguy74](https://github.com/xmlguy74)! - Resolved issues with simulator hot reload. Updated docs.

- Updated dependencies [[`fd5cb47`](https://github.com/espcompose/espcompose/commit/fd5cb4703b9aaec5b6870e64b50766f63827d075)]:
  - @espcompose/core@0.2.1

## 0.2.0

### Minor Changes

- [#21](https://github.com/espcompose/espcompose/pull/21) [`b3f40cc`](https://github.com/espcompose/espcompose/commit/b3f40cc0cfa48f8335ddc413d0ddacd4f01ed5de) Thanks [@xmlguy74](https://github.com/xmlguy74)! - Implemented working first pass of simulator with read HA bridge capability.

### Patch Changes

- Updated dependencies [[`b3f40cc`](https://github.com/espcompose/espcompose/commit/b3f40cc0cfa48f8335ddc413d0ddacd4f01ed5de)]:
  - @espcompose/core@0.2.0

## 0.1.1

### Patch Changes

- [#14](https://github.com/espcompose/espcompose/pull/14) [`e9cb67f`](https://github.com/espcompose/espcompose/commit/e9cb67f4dd52e95dc6d761af5e0c91b500d6cff2) Thanks [@xmlguy74](https://github.com/xmlguy74)! - Fixed dependency issues

## 0.1.0

### Minor Changes

- [#10](https://github.com/espcompose/espcompose/pull/10) [`f8e2819`](https://github.com/espcompose/espcompose/commit/f8e28194022680b7af86b8501a4a3682e3ed6a9b) Thanks [@xmlguy74](https://github.com/xmlguy74)! - Major refactor of the style, font and theme support.
  Implemented a first pass of the UI library of components.
  Updated the demo project to leverage UI components.
  Added boot screen demo.

### Patch Changes

- Updated dependencies [[`f8e2819`](https://github.com/espcompose/espcompose/commit/f8e28194022680b7af86b8501a4a3682e3ed6a9b)]:
  - @espcompose/core@0.1.0
