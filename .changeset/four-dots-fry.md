---
"@espcompose/eslint": minor
"@espcompose/core": minor
"@espcompose/cli": minor
"@espcompose/ui": minor
---

## Simulator overhaul, theme system in core, and LVGL improvements

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
