---
"@espcompose/core": minor
"@espcompose/cli": minor
"@espcompose/ui": minor
---

### Overlay system (replaces Popup)

- Renamed `usePopup` to `useOverlay` with new `OverlayController`, `OverlayFactory`, and `OverlayConfig` types
- Added `OVERLAY_BRAND` replacing `POPUP_BRAND` in the type branding system
- New overlay resolution system (`actions/resolve/overlay.ts`) and overlay fingerprinting
- Refactored overlay mux (`codegen/overlay-mux.ts`) for ESPHome target
- Added `Toast` component and `useToast` hook in `@espcompose/ui` with auto-dismiss support
- Added nested overlay E2E test (`popup-nested-toast`)

### New hooks

- `useController` — typed controller hook with `CONTROLLER_BRAND` and `ControllerScriptMap`
- `useLvglVisibility` — LVGL widget visibility management with `LvglVisibilityController` type
- `useScript` enhancements — script parameter support (`ScriptOptions`, `ScriptMode`), closure support, and `script-handle` resolution

### Module reorganization

- Restructured `@espcompose/core` into domain subfolders: `actions/`, `entity/`, `intents/`, `lvgl/`, `reactive/`, `serialize/`
- Restructured `@espcompose/esphome-target` into: `actions/`, `codegen/`, `lowering/`, `lvgl/`
- Moved theme system under `lvgl/theme/`, style system under `lvgl/style/`, canvas under `lvgl/canvas/`
- Moved reactive internals (`__espcompose`, reactive-node, reactive-utils) into `reactive/`
- Moved serialization code (capture, markers, ref-registry, secret) into `serialize/`

### Removed library compilation pipeline

- Removed `library.ts`, `bundle-library.ts`, `emit-dts.ts`, and all library templates
- Removed library-contract test fixtures and E2E tests

### IR & compiler improvements

- Added typed IR nodes with `kind` discriminants and widget types (`widget-types.ts`)
- Added IR JSON serialization (`serialize-json.ts`) and semantic HTML viewer
- New compiler resolver module (`compiler/resolver/`) with diagnostic path support
- Added script-args action call compiler (`action/calls/script-args.ts`)
- Added controller action call compiler (`action/calls/controller.ts`)

### ESPHome target improvements

- New action lowering system with dedicated `cpp-emitters.ts` and modular lowering
- Added closure table (`codegen/closure-table.ts`) for closure-based action codegen
- New HA entity classifier (`ha-entity-classifier.ts`) and entity property C++ lowering
- Added LVGL selector flags, style value translation, and YAML emitter modules
- New source trigger lowering and value type C++ helpers
- Generated component access and sensor platform tables from metadata
