---
description: "Use when working on code generation from ESPHome schemas, type mapping, component type generation, action codegen, or LVGL codegen. Covers packages/esphome-codegen/ and packages/core/src/generated/."
applyTo:
  - "packages/esphome-codegen/**"
  - "packages/core/src/generated/**"
---
# ESPHome Schema Codegen

## Overview

ESPHome publishes JSON schemas at schema.esphome.io. The codegen pipeline
fetches the schema for the target ESPHome version (from root `package.json`
`esphome.version`) and generates TypeScript types into `packages/core/src/generated/`.

Run with: `pnpm --filter @espcompose/core codegen`

## What Gets Generated

- `components/*.ts` — `JSX.IntrinsicElements` interfaces and prop types per ESPHome component
- `actions.ts` — Action target types (ref actions like `lightRef.toggle()`)
- `bases.ts` — Base interfaces shared across components
- `markers.ts` — Marker classes for YAML serialization
- `registry.ts` — Component registry mapping element names to intents
- `entity-domains.ts` — HA entity domain types
- `entity-domains-triggers.ts` — Entity trigger types

## Key Codegen Scripts (in `packages/esphome-codegen/src/`)

- `type-mapper.ts` — Maps ESPHome validator types → TypeScript types
- `lvgl-codegen.ts` — LVGL widget type generation
- `action-codegen.ts` — Action target class generation (resolved by C++ class hierarchy)
- `overrides.ts` — Manual overrides for schema quirks
- `generate.ts` — Main orchestrator

## Conventions

- Snake_case property names from ESPHome are converted to camelCase
- Generated types are committed to the repo
- Regenerate when ESPHome releases new versions or when overrides change
- **Never edit generated files directly** — modify codegen scripts and regenerate
