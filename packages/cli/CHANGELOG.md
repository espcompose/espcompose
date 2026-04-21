# @espcompose/cli

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
  - @espcompose/eslint@0.4.0

## 0.3.2

### Patch Changes

- [#32](https://github.com/espcompose/espcompose/pull/32) [`21b81bf`](https://github.com/espcompose/espcompose/commit/21b81bf6054892cfc1e1a8411f849a864f62ac8e) Thanks [@xmlguy74](https://github.com/xmlguy74)! - Implemented native ESPHome component for reactive runtime.

- [#30](https://github.com/espcompose/espcompose/pull/30) [`e38d4ad`](https://github.com/espcompose/espcompose/commit/e38d4ad5d6b82164b3626b86c97a4ca4562ce10b) Thanks [@xmlguy74](https://github.com/xmlguy74)! - Added initial POC support for canvas elements.

- Updated dependencies []:
  - @espcompose/eslint@0.3.2

## 0.3.1

### Patch Changes

- [#28](https://github.com/espcompose/espcompose/pull/28) [`3cd21da`](https://github.com/espcompose/espcompose/commit/3cd21daae1aa3d5bc4f367fd7b3f18450855e7eb) Thanks [@xmlguy74](https://github.com/xmlguy74)! - Resovled issues with simulator not performing page navigation correctly.

- Updated dependencies [[`3cd21da`](https://github.com/espcompose/espcompose/commit/3cd21daae1aa3d5bc4f367fd7b3f18450855e7eb)]:
  - @espcompose/eslint@0.3.1

## 0.2.2

### Patch Changes

- [`85fcfff`](https://github.com/espcompose/espcompose/commit/85fcfffd4fea8c1f99dae3e4d95bde9a3c0fe50c) Thanks [@xmlguy74](https://github.com/xmlguy74)! - Fixed issues with doc references, addded AI instructions, added new upgrade command.

- Updated dependencies [[`85fcfff`](https://github.com/espcompose/espcompose/commit/85fcfffd4fea8c1f99dae3e4d95bde9a3c0fe50c)]:
  - @espcompose/eslint@0.2.2

## 0.2.1

### Patch Changes

- [#23](https://github.com/espcompose/espcompose/pull/23) [`fd5cb47`](https://github.com/espcompose/espcompose/commit/fd5cb4703b9aaec5b6870e64b50766f63827d075) Thanks [@xmlguy74](https://github.com/xmlguy74)! - Resolved issues with simulator hot reload. Updated docs.

- Updated dependencies [[`fd5cb47`](https://github.com/espcompose/espcompose/commit/fd5cb4703b9aaec5b6870e64b50766f63827d075)]:
  - @espcompose/eslint@0.2.1

## 0.2.0

### Minor Changes

- [#21](https://github.com/espcompose/espcompose/pull/21) [`b3f40cc`](https://github.com/espcompose/espcompose/commit/b3f40cc0cfa48f8335ddc413d0ddacd4f01ed5de) Thanks [@xmlguy74](https://github.com/xmlguy74)! - Implemented working first pass of simulator with read HA bridge capability.

### Patch Changes

- Updated dependencies [[`b3f40cc`](https://github.com/espcompose/espcompose/commit/b3f40cc0cfa48f8335ddc413d0ddacd4f01ed5de)]:
  - @espcompose/eslint@0.2.0

## 0.1.1

### Patch Changes

- [#14](https://github.com/espcompose/espcompose/pull/14) [`e9cb67f`](https://github.com/espcompose/espcompose/commit/e9cb67f4dd52e95dc6d761af5e0c91b500d6cff2) Thanks [@xmlguy74](https://github.com/xmlguy74)! - Fixed dependency issues

- Updated dependencies [[`e9cb67f`](https://github.com/espcompose/espcompose/commit/e9cb67f4dd52e95dc6d761af5e0c91b500d6cff2)]:
  - @espcompose/eslint@0.1.1

## 0.1.0

### Minor Changes

- [#10](https://github.com/espcompose/espcompose/pull/10) [`f8e2819`](https://github.com/espcompose/espcompose/commit/f8e28194022680b7af86b8501a4a3682e3ed6a9b) Thanks [@xmlguy74](https://github.com/xmlguy74)! - Major refactor of the style, font and theme support.
  Implemented a first pass of the UI library of components.
  Updated the demo project to leverage UI components.
  Added boot screen demo.

### Patch Changes

- Updated dependencies [[`f8e2819`](https://github.com/espcompose/espcompose/commit/f8e28194022680b7af86b8501a4a3682e3ed6a9b)]:
  - @espcompose/core@0.1.0
  - @espcompose/eslint@0.1.0
  - @espcompose/esphome-target@0.1.0
  - @espcompose/simulator-target@0.1.0
