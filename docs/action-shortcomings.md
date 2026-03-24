# Schema-Driven Action System — Shortcomings

This document tracks actions and behaviors that the schema-driven action system
cannot capture from `.cache/schemas/*.json`. These items need manual handling
or a future enhancement.

## Not in Schema

### `component.update` / `component.suspend` / `component.resume`
Meta-actions available on **all** ESPHome components. Not defined in any
component's JSON schema — they are built into the ESPHome core C++ framework.
The old manual registry included these under the `component` domain.

### LVGL Widget Update Actions (19 actions)
Actions like `button.lvgl.update`, `label.lvgl.update`, `slider.lvgl.update`, etc.
These are sub-domain actions under `<widget>.lvgl` with no `id` / `use_id_type`
field. Widget identity is resolved through LVGL component registration, not via
a schema-level ID reference. They contain complex LVGL style property schemas.
**Deferred** — not part of the initial schema-driven extraction.

### `lvgl::LvglComponent` Not in Markers
The C++ class `lvgl::LvglComponent` exists as a `use_id_type` on `lvgl.pause`,
`lvgl.resume`, and `lvgl.update` actions, but there is no marker interface for
it in `markers.ts` because the `<lvgl>` element's `CONFIG_SCHEMA` doesn't
declare an `id_type`. Actions targeting this class are extracted, but
`InferActions<T>` can't resolve them without a corresponding marker brand.

## Semantic Mismatches

### `homeassistant.service` / `homeassistant.action`
These target `api::APIServer` (a singleton infrastructure component) but the
"action" is semantically a **Home Assistant service call**, not an ESPHome
component action. The real target is a HA entity identified by the `service`
string field. Including these in the schema extraction is technically correct
but may cause confusion if `api::APIServer` inherits unexpected actions.

### `homeassistant.event` / `homeassistant.tag_scanned`
Same singleton pattern. Fire HA events rather than controlling ESPHome components.

## Infrastructure/Global Actions

### `mqtt.publish` / `mqtt.publish_json`
Target `mqtt::MQTTClientComponent` singleton. Not ref-able in the typical sense.

### `http_request.get` / `http_request.post` / `http_request.send`
Target `http_request::HttpRequestComponent` singleton.

## Lost Mechanisms

### `ACTION_OVERRIDES` Map
The old manual registry supported runtime overrides via `ACTION_OVERRIDES.set()`.
The new schema-driven system doesn't have this escape hatch. If schemas are
incomplete, a static overlay mechanism may be needed.

## Future Enhancements

### `templatable` Parameters
Schema marks some parameters as `templatable: true` (can accept ESPHome C++
lambda expressions). Currently mapped to plain TypeScript types (`number`,
`string`). Future: could generate overloaded method signatures accepting
both literal values and template expressions.

### Actions Without `use_id_type`
~5-8 actions across all schemas have no `id` field or `use_id_type`. These
include:
- Core automation primitives (`delay`, `if`, `while`, `repeat`, `wait_until`)
- Some infrastructure actions without explicit ID targeting

These are skipped during extraction and logged as shortcomings in codegen output.
