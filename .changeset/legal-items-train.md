---
"@espcompose/eslint": patch
"@espcompose/core": patch
"@espcompose/cli": patch
"@espcompose/ui": patch
---

## `useGlobal` hook support

Added support for the `useGlobal` hook, which binds a reactive signal to an ESPHome `globals` component. A new `'global'` source type is recognised in `IRDependency`, and the compiler emits the corresponding `IRGlobalSet` action. The C++ reactive runtime (`espcompose_reactive.h`), bindings codegen, action lowering, and reactive config have all been updated to support global variables. An E2E test project (`globals-device`) is included.

## Lint worker thread

The lint compiler phase now runs in a dedicated worker thread (`lint-worker.ts`), reducing blocking time on the main thread and improving overall CLI build performance.

## CLI metrics

A lightweight `metrics` utility has been added to the CLI, recording per-phase timing information that can be used for performance analysis and reporting.

## Removed `WidgetHost`

The internal `WidgetHost` component has been removed from `@espcompose/core`. All UI components (Button, Card, Dropdown, Grid, Image, Row, Slider, Space, Spinner, Switch, Text) have been updated accordingly. A missing `transparent` style on the EC canvas target has also been fixed.

## Dead code removal and hook detection improvements

Removed unused semantic-analysis code. Improved hook detection logic in the compiler to more accurately identify reactive hooks in component trees.
