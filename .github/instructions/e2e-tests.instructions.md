---
description: "Use when working on E2E snapshot tests, adding new test projects, or debugging test failures. Covers tests/e2e/."
applyTo: "tests/e2e/**"
---
# E2E Snapshot Tests

## Structure

Each project in `tests/e2e/projects/<name>/` is a standalone espcompose device
project built by the full compiler pipeline. The generated YAML is snapshot-tested.

Run with: `pnpm --filter espcompose-e2e test`

Update snapshots with: `pnpm --filter espcompose-e2e test:update-snapshots`

> **Do not** use `pnpm --filter espcompose-e2e test -- -u` — the `--reporter=tap`
> flag in the `test` script causes vitest to treat `-u` as a test name filter
> instead of an update flag.

## Adding a New Test Project

1. Create a directory under `tests/e2e/projects/<name>/`
2. Add a `src/index.tsx` entry point (or whatever the project's root is)
3. The test runner builds each project and compares YAML output against snapshots
4. Update snapshots with `pnpm --filter espcompose-e2e test:update-snapshots`

## Key Test Projects by Feature Area

- **Basic**: `sensor-device` (consolidated: covers infrastructure, DHT/GPIO/ADC sensors, variable embedding, API encryption)
- **Scripts & Actions**: `device-script-device`, `action-tree-device`, `trigger-device`, `trigger-variable-device`, `script-params-device`, `lambda-action-device`, `useScript-mixed-bindings-device`, `useScript-multi-ref-device`
- **Reactive**: `reactive-device`, `auto-reactive-device`, `multi-source-reactive-device`
- **HA Integration**: `ha-binding-device`, `ha-dynamic-device`
- **Theme & UI**: `design-system-device`, `reactive-theme-device`, `style-device`, `boot-screen-device`
- **LVGL**: `lvgl-device`, `lvgl-widget-ref-device`, `widget-ref-device`, `use-lvgl-hook-device`, `canvas-device`
- **Overlays (Popups & Toasts)**: `popup-device`, `popup-multi-device`, `popup-multi-type-device`, `popup-nested-toast`, `toast-across-pages`, `toast-auto-dismiss`, `toast-params`, `toast-queue`
- **Refs & Actions**: `prop-ref-action-device`
- **Globals**: `globals-device`, `globals-array-device`
- **Assets**: `image-font-device`
- **Complex**: `dashboard-device`, `fancy-light-cascade-device`
- **Other**: `project-device`, `secret-device`
