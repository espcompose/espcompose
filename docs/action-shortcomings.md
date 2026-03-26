# Schema-Driven Action System — Shortcomings

This document tracks actions and behaviors that the schema-driven action system
cannot capture from `.cache/schemas/*.json`. These items need manual handling
or a future enhancement.

---

## Resolved

Items that were previously tracked as shortcomings but are now fully handled by
the schema-driven codegen pipeline.

### ~~`component.update` / `component.suspend` / `component.resume`~~ ✅
Now extracted from schema and generated on `PollingComponent` in
`packages/sdk/src/generated/actions.ts`. The `PollingComponentActions`
interface exposes `update()`, `suspend()`, and `resume()` methods.
`InferActions<T>` resolves them for any component whose marker extends
`PollingComponent`.

### ~~`lvgl::LvglComponent` Not in Markers~~ ✅
A generated marker brand (`__brand_lvgl_LvglComponent`) now exists in
`packages/sdk/src/generated/markers.ts`. The `LvglComponentActions` interface
covers `update`, `pause`, `resume`, `next`, `previous`, and `show`.
`InferActions<T>` resolves these correctly for LVGL component refs.

### ~~`homeassistant.service` / `homeassistant.action`~~ ✅
### ~~`homeassistant.event` / `homeassistant.tag_scanned`~~ ✅
All four actions are schema-extracted onto `api::APIServer` and exposed through
`APIServerActions` (including `respond`, `service`, `action`, `event`,
`tagScanned`). They are technically correct — `api::APIServer` is the
infrastructure class that handles Home Assistant communication. The semantic
mismatch (HA service call vs. ESPHome component action) has not caused practical
issues.

### ~~`mqtt.publish` / `mqtt.publish_json`~~ ✅
Fully generated on `mqtt::MQTTClientComponent` via `MQTTClientComponentActions`.
Actions: `publish(params?)`, `publishJson(params?)`.

### ~~`http_request.get` / `http_request.post` / `http_request.send`~~ ✅
Fully generated on `http_request::HttpRequestComponent` via
`HttpRequestComponentActions`. Actions: `send(params?)`, `post(params?)`,
`get(params?)`. An additional `OtaHttpRequestComponentActions` interface with
`flash(params?)` is also generated.

---

## Still Open

### LVGL Widget Update Actions
Actions like `button.lvgl.update`, `label.lvgl.update`, `slider.lvgl.update`,
etc. These are sub-domain actions under `<widget>.lvgl` with no
`id` / `use_id_type` field — widget identity is resolved through LVGL
component registration, not via a schema-level ID reference. They contain
complex LVGL style property schemas and are skipped by the schema extractor's
`use_id_type` requirement.

### Actions Without `use_id_type`
The schema extractor skips any action that lacks a `use_id_type` field.
These include:
- **Core automation primitives** — `delay`, `if`, `while`, `repeat`,
  `wait_until`. These are not component-targeted actions but flow-control
  constructs. `delay` is manually provided as a compile-time marker in
  `packages/sdk/src/actions.ts`; the rest are handled by the compiler
  transformer directly.
- **~70 other actions** across various domains that have no explicit ID
  targeting. These are logged as shortcomings during codegen.

### `templatable` Parameters
Schema marks some parameters as `templatable: true` (can accept ESPHome C++
lambda expressions). Currently mapped to plain TypeScript types (`number`,
`string`). A future enhancement could generate union types accepting both
literal values and template/lambda expressions.

### No Runtime Override Mechanism
The old manual registry supported runtime overrides via
`ACTION_OVERRIDES.set()`. The schema-driven system has no equivalent escape
hatch. Field-level overrides exist in `scripts/codegen/overrides.ts`
(`OPTIONAL_FIELD_OVERRIDES`, `TYPE_OVERRIDES`), but there is no action-level
overlay. Schema gaps can only be fixed by updating the codegen pipeline or
upstream ESPHome schemas.
