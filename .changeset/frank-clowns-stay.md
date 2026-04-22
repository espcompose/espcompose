---
"@espcompose/core": patch
"@espcompose/ui": patch
---

Rename `Theme` interface to `ThemeDefinition` to clarify that it describes the shape/contract rather than a concrete theme instance.

- **@espcompose/ui**: Renamed `Theme` → `ThemeDefinition` in theme types, dark theme, and light theme. Removed unnecessary `as Theme` casts from `Card`, `Screen`, `Slider`, `Switch`, and `Text` components. Moved `UITheme` from `theme/scope` to `theme/theme`.
- **@espcompose/core**: Removed unused `ThemeProvider` component. Exported `ImageProps` and `FontProps` types. Fixed `createEspHomeComponent` to use `allowedChildIntents: ['esphome:component']` instead of `undefined`. Fixed cache key defaults in `useFont` and `useImage` to use `false` instead of empty string for boolean fields.
- **docs**: Added sidebar categories for Concepts, API Reference, UI Library, and Examples.
