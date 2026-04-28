## Plan: Phase G — Decouple ESPHome Specifics from Core IR

The IR layer in `@espcompose/core` currently encodes ESPHome YAML schema vocabulary, ESPHome trigger names, ESPHome platform names, ESPHome action paths, and ESPHome serialization shape directly into IR records. Phase G replaces these with a target-neutral IR vocabulary, and moves all ESPHome-shape lowering into `@espcompose/esphome-target`. Core becomes a true semantic layer; the target owns presentation. **No silent fallbacks** — every translation table throws on unknown semantic input.

### Inventory of leaks (high-severity)

| Symbol | File | Leak |
|---|---|---|
| `IRBinding.targetType / targetProp / targetId / part / state` | hooks/useReactiveScope.ts | YAML widget key, snake_case prop, ESPHome `id:`, snake_case selectors |
| `IRDependency.triggerType / sourceDomain` | reactive-node.ts | `'on_state'`/`'on_value'`, ESPHome platform names |
| `IRHAEntity.sensorType / generatedId` | useReactiveScope.ts | ESPHome platform classification, ESPHome id |
| `IRComponent.section` | useReactiveScope.ts | YAML section key |
| `IRNativeAction.actionKey` | ir/action-types.ts | `'light.toggle'` action paths |
| `IRDelayAction.duration` | ir/action-types.ts | `'500ms'` ESPHome duration syntax |
| `lvglWidgetToPlain` / `buildLvglSection` | lvgl.ts | Emits ESPHome YAML shape (`{widgetKey:{...,widgets:[...]}}`, `top_layer`, `state:{}` wrapper, overlay `obj` containers, snake_case keys) |
| `camelToSnake / keysToSnakeCase / toYamlKey / stripUndefined` | serialize.ts | YAML utilities |
| Style value maps (`OPACITY_VALUES` etc.) | style-mapping.ts | LVGL C macro spellings |

### Phases

**G1 — Style value-map extraction** *(low risk, quick win)*  
Mirror the `LVGL_PART_FLAGS` fix at scale. Lift every C-macro spelling out of style-mapping.ts's `valueMap` entries into a target-side translation table with load-time invariant. Move `transformGridTrackValue` (FR/CONTENT) and `auto-layout.type` injection to target.

**G2 — Replace `triggerType` enum with semantic value-kind**  
Drop `'on_state'`/`'on_value'` from `IRDependency` and `IRReactiveNode`. The target derives the trigger choice from `IRValueType` (bool → on_state, numeric → on_value).

**G3 — Move LVGL widget serialization shape to esphome-target** *(largest step)*  
Introduce a target-neutral `IRWidget`/`IRWidgetTree`. lvgl.ts returns IR; new `lvgl-yaml-emitter.ts` in esphome-target owns ESPHome shape (`top_layer`, `state:{}` wrapper, overlay containers, snake_case, auto-id). serialize.ts splits — case utilities move to target. E2E snapshots are the regression gate (must stay byte-identical).

**G4 — Move ESPHome action key strings out of `IRNativeAction`**  
Replace `actionKey: 'light.toggle'` with `{ domain: 'light', operation: 'toggle' }`. Replace `IRDelayAction.duration: '500ms'` with `{ ms: number } | IRScriptParamRef`. Target formats both.

**G5 — Move ESPHome platform classification out of `useHAEntity`**  
HA-domain → ESPHome `sensorType` mapping (`light`→`binary_sensor`, etc.) moves to esphome-target. `IRHAEntity` slims down to `entityId / domain / attribute`. Target mints `generatedId`.

**G6 — Final guard & residuals**  
CI grep guard for the full leak inventory. Audit `IRComponent.section` (needs `kind→section` mapping). Replace `ExprType`'s `'color'`/`'font_ptr'` with `IRValueType` (the unfinished Phase E2). Audit markers.ts LambdaCode comment.

### Cross-phase concerns

- **E2E snapshot stability is the regression gate** — especially for G3. Snapshot churn = lowering bug, not acceptance signal.
- **No silent fallbacks** — every target table throws on unknown semantic input (continues no-cpp strict-error mandate).
- **No public API changes** — internal IR only. JSX, hooks, action builders all keep current shapes.
- Build hygiene: `pnpm build` from root after each phase; `pnpm test` must stay EXIT=0.

### Decisions to confirm before execution

1. **G3 `IRWidget` shape**: open `{ kind: string, props: Record<string, unknown> }` (extensible) vs discriminated union (compile-time safe but closed). **Recommendation: open shape**, with `LVGL_UPDATABLE_WIDGETS` providing soft validation.
2. **G4 action key split**: `{ domain, operation }` vs opaque enum vs keep dotted string as semantic key. **Recommendation: `{ domain, operation }`**.
3. **Phase ordering**: G1 → G2 → G3 → G4 → G5 → G6. Alternative: bundle G2+G5 (both touch HA wiring). **Recommendation: listed order** — G1/G2 are warm-ups before the G3 risk surface.
4. **Subsume Phase E2 (`schema-action-extractor.ts` IRValueType threading) and the `ExprType` cleanup into G6**? **Recommendation: yes** — same concern.

### Out of scope

- Adding a second target (web simulator, Tasmota) — this plan creates the seam, doesn't fill it.
- User-facing JSX/hook API changes.
- C++ runtime changes.
- LVGL widget trigger vocabulary refactor (`on_press`, `on_click`) — same family but separate work item.
