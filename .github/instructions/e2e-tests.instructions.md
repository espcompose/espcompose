---
description: "Use when working on E2E snapshot tests, adding new test projects, or debugging test failures. Covers tests/e2e/."
applyTo: "tests/e2e/**"
---
# E2E Snapshot Tests

## Structure

Each project in `tests/e2e/projects/<name>/` is a standalone espcompose device
project built by the full compiler pipeline. The generated YAML is snapshot-tested.

Run with: `pnpm --filter espcompose-e2e test`

## Adding a New Test Project

1. Create a directory under `tests/e2e/projects/<name>/`
2. Add a `src/index.tsx` entry point (or whatever the project's root is)
3. The test runner builds each project and compares YAML output against snapshots
4. Update snapshots with `pnpm --filter espcompose-e2e test -- -u`

## Key Test Projects by Feature Area

- **Basic**: `basic-device`, `sensor-device`, `function-component-device`
- **Scripts & Actions**: `script-device`, `action-tree-device`, `trigger-device`, `trigger-variable-device`
- **Reactive**: `reactive-device`, `auto-reactive-device`, `multi-source-reactive-device`
- **HA Integration**: `ha-binding-device`, `ha-dynamic-device`
- **Theme & UI**: `design-system-device`, `reactive-theme-device`, `style-device`, `boot-screen-device`
- **Assets**: `image-font-device`, `embed-device`
- **Libraries**: `library-contract-device`, `uncompiled-lib-device`
- **Complex**: `dashboard-device`, `fancy-light-cascade-device`
- **Other**: `project-device`, `device-script-device`, `secret-device`
