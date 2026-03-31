# Implementation Plan: espcompose Phase-Separated Architecture

## Executive Summary

Redesign espcompose from a single-pass JSX→YAML transpiler into a phase-separated compilation system with explicit build/embed/device boundaries, a proper IR, and a SolidJS-inspired C++ reactive runtime. The user's project remains one TypeScript codebase, but code is annotated by phase via `build`, `embed`, `bind`, and `device` namespace APIs. The compiler enforces boundaries via types, ESLint rules, and runtime phase tracking.

## Decisions (from alignment)

- **Phase enforcement**: Types + lint + runtime checks (all three layers)
- **Script authoring**: Explicit API (`device.script(fn)`)
- **Reactive model**: New IR node abstraction with Expression<T> as one backend; thin C++ reactive runtime (Signal/Memo/Effect) injected via ESPHome includes: when needed
- **Import style**: Named exports (`import { build, embed, bind } from '@esphome/compose'`)
- **Namespace name**: `bind` (not `ui`) — describes the action (binding data sources to targets), not just visual work
- **C++ codegen**: !lambda strings in YAML + ESPHome `includes:` for reactive runtime and escape hatches. No native C++ backend. Leverage ESPHome's LVGL component system.

---

## 1. Mental Model

```
User TSX Project
    │
    ├── build.run(() => { ... })          ← Phase 1: Build (Node.js, arbitrary)
    │       │
    │       └── returns BuildValues
    │
    ├── embed.string(val), embed.secret()  ← Phase 2: Embed (build→device crossing)
    │
    ├── bind.haEntity(), bind.expr(), bind.memo() ← Phase 3: Device-reactive (restricted)
    │       └── () => expr  (reactive fns)
    │
    └── device.script(), device.include()   ← Phase 4: Device-imperative (escape hatch)

    Compiler Pipeline:
    ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌────────────┐    ┌──────────┐
    │TypeCheck  │───▶│  Lint    │───▶│ Bundle   │───▶│  Execute   │───▶│  Emit    │
    │(ts.Prog) │    │(ESLint)  │    │(esbuild) │    │(Node eval) │    │(YAML+C++)│
    └──────────┘    └──────────┘    └──────────┘    └────────────┘    └──────────┘
                                                         │
                                                    ┌────┴────┐
                                                    │ IR Tree │
                                                    └────┬────┘
                                                    ┌────┴────┐
                                                    │ Lowering│
                                                    └────┬────┘
                                              ┌─────┴─────┐
                                              │YAML + C++ │
                                              └───────────┘
```

## 2. Authoring Model

### API Surface

```ts
import { build, embed, bind, device, defineProject } from '@esphome/compose';

// --- Phase 1: Build ---
const env = build.run(() => {
  require('dotenv').config();
  return { name: 'kitchen-panel', wifiSsid: process.env.WIFI_SSID ?? '' };
});
// env is typed as BuildValue<{ name: string; wifiSsid: string }>

// --- Phase 2: Embed ---
// embed.string(val) — embed a string literal into YAML
// embed.secret(val) — embed as ESPHome !secret reference
// embed.number(val) — embed a number
// embed.json(val) — embed a JSON-serializable object

// --- Phase 3: Device-reactive ---
function App() {
  const light = bind.haEntity('light.kitchen');
  const temp = bind.haEntity('sensor.temperature');
  const status = bind.memo(() => light.isOn() && temp.value > 72 ? 'OK' : 'Adjust');

  return (
    <screen>
      <label text={status} />
      <label text={() => light.isOn() ? 'ON' : 'OFF'} />
    </screen>
  );
}

// --- Phase 4: Device-imperative ---
const toggleScript = device.script(() => {
  light.toggle();
  delay(500);
});
// device.include('my_component.h') — include C++ header via ESPHome includes:
// device.lambda('return id(sensor).state;') — raw lambda string

// --- Project definition ---
export default defineProject({
  device: (
    <esphome name={embed.string(env.name)}>
      <esp32 board="esp32dev" framework={{ type: 'esp-idf' }} />
      <wifi ssid={embed.secret(env.wifiSsid)} />
      <api /><ota platform="esphome" /><logger level="DEBUG" />
      <App />
    </esphome>
  ),
});
```

### Phase Rules

| Phase | Execution context | Allowed APIs | Forbidden |
|-------|------------------|--------------|-----------|
| Build | Node.js at compile time | `build.run()`, all Node/npm | `bind.*`, `device.*`, JSX |
| Embed | Crossing point | `embed.string()`, `embed.secret()`, `embed.number()`, `embed.json()` | Side effects |
| Device-reactive | Conceptual device runtime | `bind.haEntity()`, `bind.expr()`, `bind.memo()`, `bind.effect()`, reactive fns `() => expr` | Node APIs, npm, `build.run()` |
| Device-imperative | ESPHome C++/automation | `device.script()`, `device.include()`, `device.lambda()` | Direct Node access |

## 3. Compiler Architecture

### Pipeline Changes

**Current pipeline**: TypeCheck → Transform(AST) → Bundle(esbuild) → Execute(require+render) → WriteYAML

**New pipeline**: TypeCheck → Lint → Bundle → Execute → IR Construction → Lowering → Emit

Key change: **remove the pre-bundle AST transform phase**. Instead:
- `build.run()` executes during the bundle-execute phase naturally (it's just a function call)
- `embed.*()` returns typed wrapper objects (`EmbedValue<T>`) that serialize during IR construction
- `device.script()` returns script metadata objects (no AST rewriting needed)
- Reactive functions `() => expr` are captured as closures and analyzed during IR construction

### Phase 1: TypeCheck
- Same as today: `ts.createProgram()`, collect diagnostics
- New: validate phase-boundary types (branded `BuildValue<T>`, `EmbedValue<T>`)

### Phase 2: Lint
- Same as today: ESLint flat config
- New ESLint rules:
  - `no-build-in-component` — `build.run()` inside function components
  - `no-node-in-reactive` — Node APIs (process, fs, require) in reactive contexts
  - `no-embed-outside-jsx` — `embed.*()` not in JSX prop position

### Phase 3: Bundle
- Same as today: esbuild CJS bundle
- `@esphome/compose` remains external

### Phase 4: Execute
- Load bundle via CJS require (same mechanism)
- **Phase tracking**: SDK has `setCurrentPhase(phase)` / `getCurrentPhase()`
  - Before `require(bundle)`: phase = 'module' (build.run allowed)
  - During render: phase = 'render' (bind.* allowed, build.run forbidden)
  - `build.run()` checks phase === 'module', throws otherwise
  - `bind.haEntity()` checks phase === 'render', throws otherwise
- `defineProject()` returns a project descriptor, not raw JSX
- Execute evaluates project descriptor → IR tree

### Phase 5: IR Construction (NEW)
- Walk the JSX element tree
- Expand function components (same as today's toPlainObject)
- Resolve `EmbedValue<T>` → literal YAML values
- Detect reactive nodes (`ReactiveNode`) → register bindings
- Detect `DeviceScript` nodes → register scripts
- Collect `device.include()` paths
- Result: `IRTree` — a platform-independent representation

### Phase 6: Lowering (NEW)
- IR → ESPHome-specific config object
- **Reactive strategy decision**: analyze IR dependency graph
  - All bindings single-source, no memo/effect → ESPHome-native triggers (no runtime)
  - Any multi-source, memo, or effect → inject C++ reactive runtime
- Apply reactive binding injection (evolved reactive-injector.ts)
- Apply HA sensor auto-imports
- Apply script section generation
- Apply includes section
- Apply secrets handling
- If runtime needed: generate `espcompose_bindings.h` with Signal/Memo/Effect declarations

### Phase 7: Emit
- Config object → YAML (same as today's toYAML)
- Secrets → separate secrets.yaml entries
- Includes → copy/generate C++ files to output dir
- If runtime needed: copy `espcompose_reactive.h` to output dir, reference in `esphome.includes:`
- Add `on_boot:` lambda calling `espcompose_setup()` if runtime present

## 4. IR Design

### IR Node Types

```ts
// Core IR nodes
type IRNode =
  | IRComponent       // intrinsic ESPHome component
  | IRReactiveBinding // reactive prop binding
  | IRScript          // device script
  | IREmbed           // embedded build-time value
  | IRLambda          // raw C++ lambda
  | IRInclude         // C++ include file
  | IRSection         // top-level YAML section

interface IRComponent {
  kind: 'component';
  type: string;           // e.g. 'wifi', 'sensor', 'lvgl-button'
  props: Map<string, IRValue>;
  children: IRNode[];
  id?: string;            // ref token
  meta: { sourceFile: string; line: number };  // for error messages
}

type IRValue =
  | IRLiteral           // string, number, boolean
  | IREmbed             // build-time computed value
  | IRReactiveExpr      // reactive expression
  | IRLambdaExpr        // raw lambda
  | IRRef               // component reference
  | IRObject            // nested object
  | IRArray             // array

interface IRReactiveExpr {
  kind: 'reactive-expr';
  sourceId: string;
  sourceDomain: string;
  property: string;
  triggerType: string;
  initLambda: string;      // C++ for initial value
  updateLambda: string;    // C++ for trigger update
  dependencies: IRRef[];   // what this expression reads from
}

interface IRScript {
  kind: 'script';
  id: string;
  parameters?: Array<{ name: string; cppType: string }>;
  actions: IRAction[];
}

type IRAction =
  | IRDelayAction
  | IRLogAction
  | IRScriptCallAction
  | IRComponentAction    // ref.method() or haEntity.method()
  | IRConditionalAction  // if/while/repeat
  | IRHomeAssistantAction
  | IRRawAction;         // escape hatch
```

### IR Construction from JSX

The JSX element tree produced by `createElement()` is walked to build IR:

1. `EspComposeElement` with string type → `IRComponent`
2. `EspComposeElement` with function type → call function, recurse on result
3. `EmbedValue<T>` in props → `IREmbed`
4. `ReactiveNode` in props → `IRReactiveExpr`
5. `DeviceScript` → `IRScript`
6. `Expression<T>` (legacy) → `IRReactiveExpr` (backward compat adapter)

### Lowering IR → YAML Config

The lowering phase converts IRNode tree → plain object (same shape as today's rendered config):

1. `IRComponent` → `{ [yamlKey]: { ...props, id? } }` with camelCase→snake_case
2. `IRReactiveExpr` → `!lambda` scalar + registered binding for trigger injection
3. `IREmbed` → literal value (string/number/boolean)
4. `IRScript` → entry in `script:` section with `then:` action list
5. `IRInclude` → entry in `esphome.includes:` list
6. Reactive binding injection (same algorithm as today's reactive-injector.ts)
7. HA sensor auto-import (same algorithm)

## 5. Reactive Model

### Device-Side Reactive Runtime

A thin C++ reactive runtime (~300 lines) injected via `esphome.includes:` provides SolidJS-style fine-grained reactivity on the device.

**C++ primitives** (`espcompose_reactive.h`, shipped with SDK):
- `Signal<T>` — observable value, notifies subscribers on change
- `Memo<T>` — lazy-evaluated derived value, invalidated when deps change
- `Effect` — callback re-run when dependency signals change
- `Scheduler` — batches invalidations, runs effects once per tick

**ESPHome integration**:
- ESPHome `on_state:`/`on_value:` triggers → `signal.set(x)` via `!lambda`
- Effects update LVGL widgets via ESPHome component `id()` pointers
- `on_boot:` calls `espcompose_setup()` to initialize the graph
- Initial widget values use `!lambda "return signal.get();"` or `"return memo.get();"`

**Hybrid strategy** (compiler decides per-project):
- Simple 1:1 bindings (1 source, 1 target) → ESPHome-native triggers, no runtime
- Multi-source derivations, memos, effects → runtime injected
- When ANY binding needs runtime, the header + generated bindings file are included

**Generated per-project** (`espcompose_bindings.h`, auto-generated):
- Signal declarations for each HA entity / local sensor
- Memo declarations for each `bind.memo()`
- Effect declarations for each widget binding and `bind.effect()`
- `espcompose_setup()` function wiring the graph

### New Reactive Node System

Replace direct `Expression<T>` creation with `ReactiveNode` — an IR-level abstraction:

**ReactiveNode** is the compile-time marker (replaces Expression as the primary user-facing type):
- Tracks dependencies (possibly multiple sources — unlike Expression which is single-source)
- Backend-agnostic: lowering chooses ESPHome-native triggers OR C++ runtime
- `Expression<T>` becomes a lowering target for simple single-source cases

```ts
class ReactiveNode<T> {
  readonly dependencies: ReactiveDependency[];  // can be 1 or many
  readonly cppExpression: string;               // C++ expression body
  readonly cppReturnType: string;
}

interface ReactiveDependency {
  signalId: string;      // C++ signal variable name
  sourceId: string;      // ESPHome component ID
  triggerType: string;   // on_state, on_value
  sourceDomain: string;  // binary_sensor, sensor, etc.
}
```

**Lowering decision** (in IR lowering phase):
- 1 dependency + no memo/effect usage → lower to `Expression<T>` → ESPHome-native trigger
- 2+ dependencies OR memo/effect present → lower to C++ runtime (Signal/Memo/Effect)

### Reactive Function Analysis

When `() => light.isOn() ? 'ON' : 'OFF'` appears as a prop value:

1. **At render time**: The function is called once, Proxy interception tracks which signals are read
2. **Dependency collection**: All `signal.get()` calls recorded → `ReactiveDependency[]`
3. **C++ body generation**: The reactive function body is captured as a C++ expression string
4. **IR node created**: `ReactiveNode` with dependencies + C++ expression body

**Key change from current system**: Today, Expression tracks ONE source. ReactiveNode tracks N sources, enabling multi-source derived values.

### bind.* API

```ts
const bind = {
  haEntity,        // HA entity → Signal source + domain-typed binding (evolved from useHAEntity)
  memo<T>(fn),     // Memoized derived value from multiple signals → Memo node
  effect(fn),      // Side-effect when signals change → Effect node
  expr(prop),      // Normalize BindProp<T> (literal, ReactiveNode, or () => T) → resolved value
  prop<T>,         // Type alias: T | ReactiveNode<T> | (() => T)
  // state<T>(v),  // V2: Local mutable signal (needs ESPHome globals:)
};
```

`bind.haEntity()` returns same domain-typed bindings (LightBinding, SensorBinding, etc.) with ReactiveNode instances for reactive properties and Proxy-intercepted action methods.

`bind.memo(fn)` creates a named Memo node. During render, fn is called once to capture dependencies. During lowering, generates a `Memo<T>` in C++.

`bind.effect(fn)` creates a side-effect Effect node. The fn body is analyzed by the action converter (same as device.script) for action dispatch.

`bind.expr(propValue)` normalizes:
- `ReactiveNode` → pass through
- `() => expr` → evaluate + capture dependencies → `ReactiveNode`
- Literal value → literal (no reactivity)

`bind.prop<T>` is a type alias for component authors: `T | ReactiveNode<T> | (() => T)`

## 6. Intrinsic Elements Strategy

### Current State (keep and evolve)

- Codegen pipeline: ESPHome JSON schemas → TypeScript props interfaces → JSX.IntrinsicElements augmentation
- 200+ components generated with full type coverage
- Registry maps tag names to `{ yamlKey }` metadata

### Changes Needed

1. **EmbedValue-aware prop types**: Generated prop interfaces accept `EmbedValue<T>` alongside `T` for props that can receive build-time values. Codegen adds union types:
   ```ts
   interface WifiProps {
     ssid: string | EmbedValue<string>;
     password: string | EmbedValue<string>;
     // ...
   }
   ```

2. **Reactive-aware prop types for LVGL**: LVGL widget props that support reactive binding (already tracked in `LVGL_UPDATABLE_WIDGETS`) get `BindProp<T>` types:
   ```ts
   interface LvglLabelProps {
     text: string | BindProp<string>;
     // ...
   }
   ```

3. **TriggerHandler evolution**: Trigger props (`on*`) accept the new `DeviceScript` type alongside current `TriggerHandler`:
   ```ts
   onPress: TriggerHandler | DeviceScript;
   ```

4. **Registry extension**: Add metadata for which props are embed-capable and which are reactive-capable. This metadata drives the codegen prop union generation.

### Codegen Impact

Files to modify in `scripts/codegen/`:
- `type-mapper.ts` — Add `EmbedValue<T>` and `BindProp<T>` union generation for applicable props
- `ast-helpers.ts` — New AST helper for `embedPropType()` and `reactivePropType()`
- `generate.ts` — Thread prop capability metadata through generation
- `lvgl-codegen.ts` — LVGL props get reactive union types based on LVGL_UPDATABLE_WIDGETS

**Migration**: These are additive type changes. Existing projects continue to work — `string` is still accepted where `string | EmbedValue<string>` is the new type.

## 7. Custom Components

### Function Components (largely unchanged)

```tsx
function LightButton(props: {
  light: bind.HAEntityBinding<'light'>;
  text: BindProp<string>;
}) {
  const text = bind.expr(props.text);  // normalize reactive prop
  return (
    <button bgColor={() => props.light.isOn() ? '#FF0000' : '#0000FF'}>
      <label text={text} />
    </button>
  );
}
```

Custom components are still plain functions that return JSX elements. The IR construction phase calls them and recurses, same as today's `toPlainObject()`.

### Design System Components (evolve from @esphome/compose-ui)

The `@esphome/compose-ui` package continues as is. Components use `createIntentComponent()` for branding. Theme system via context.

**New**: DS components can use `bind.prop<T>` types for props that should accept reactive values.

## 8. Mixed-Phase Handling (Critical)

### Phase Tracking Runtime

```ts
// packages/sdk/src/phase.ts (NEW)
type Phase = 'module' | 'render' | 'idle';
let currentPhase: Phase = 'idle';

export function setPhase(p: Phase) { currentPhase = p; }
export function getPhase(): Phase { return currentPhase; }

export function assertPhase(expected: Phase | Phase[], api: string): void {
  const allowed = Array.isArray(expected) ? expected : [expected];
  if (!allowed.includes(currentPhase)) {
    throw new PhaseError(
      `${api} can only be called during ${allowed.join('/')} phase, ` +
      `but was called during '${currentPhase}' phase.`
    );
  }
}
```

### Phase Transitions in Compiler

```ts
// In execute():
setPhase('module');
const projectDef = require(bundlePath);  // build.run() executes here
setPhase('render');
const irTree = buildIR(projectDef.default);  // bind.* executes here
setPhase('idle');
```

### build.run() Implementation

```ts
export const build = {
  run<T>(fn: () => T): BuildValue<T> {
    assertPhase('module', 'build.run()');
    const value = fn();  // executes immediately at module load
    return new BuildValue(value);
  },
};
```

`BuildValue<T>` is an opaque wrapper. Properties are accessed via `env.name`, `env.wifiSsid`, etc. — the Proxy extracts values and wraps them as `EmbedReady<T>` that can be passed to `embed.*()`.

### embed.*() Implementation

```ts
export const embed = {
  string(value: BuildValue<string> | string): EmbedValue<string> {
    assertPhase(['module', 'render'], 'embed.string()');
    const resolved = value instanceof BuildValue ? value.unwrap() : value;
    return new EmbedValue('string', resolved);
  },
  secret(value: BuildValue<string> | string): EmbedValue<string> {
    assertPhase(['module', 'render'], 'embed.secret()');
    const resolved = value instanceof BuildValue ? value.unwrap() : value;
    return new EmbedValue('secret', resolved);
  },
  number(value: BuildValue<number> | number): EmbedValue<number> { ... },
  json<T>(value: BuildValue<T> | T): EmbedValue<T> { ... },
};
```

### Secrets Handling

`embed.secret(val)` stores the value in a secrets registry. During emit:
- The YAML prop gets `!secret secret_key_name`
- A separate `secrets.yaml` is generated (or appended to existing) with actual values
- The secret key is derived: `embed.secret(env.wifiSsid)` used in `<wifi ssid=...>` → key is `wifi_ssid`

## 9. device.* API (Imperative Escape Hatch)

### device.script()

```ts
const toggleAll = device.script(() => {
  light.toggle();
  delay(500);
  logger.log('toggled');
});

// Usage in JSX:
<binary_sensor onPress={toggleAll} />
```

Returns a `DeviceScript` object that:
- During IR construction: becomes an `IRScript` node
- The function body is analyzed by `convertStatements()` (reused from current action-converter)
- No AST transform needed — the function is called at render time, and action markers (`delay()`, `logger.log()`) return metadata objects that are collected

**Key change**: Instead of rewriting function bodies at the AST level, `delay()` and `logger.log()` return action descriptor objects during execution. The `device.script()` wrapper collects these via a scope mechanism.

### device.include()

```ts
device.include('my_custom_component.h');
// → generates: esphome: { includes: ['my_custom_component.h'] }
```

### device.lambda()

```ts
const reading = device.lambda<number>('return id(my_sensor).state;');
// → generates: !lambda "return id(my_sensor).state;"
```

Raw escape hatch for hand-written C++ lambda strings.

## 10. LVGL / Design System Layer

### Architecture: Same approach, evolve types

- LVGL intrinsic elements (`<lvgl-button>`, `<lvgl-label>`, etc.) remain schema-generated
- Design system components (`<Screen>`, `<Button>`, `<Card>`, etc.) remain in `@esphome/compose-ui`
- Theme system via context remains unchanged

### Changes

1. **Reactive-aware LVGL props**: Generated LVGL prop types accept `BindProp<T>` for updatable properties
2. **Trigger props on LVGL widgets**: Generate typed `on*` trigger props directly on LVGL widgets (remove need for `x:custom` workaround)
3. **bind.haEntity() replaces useHAEntity()**: Same behavior, new namespace

### No C++ LVGL Backend in V1

Per decision: leverage ESPHome's LVGL component system. All LVGL output is ESPHome YAML with `!lambda` for dynamic values. The existing `cpp-emitter.ts` / `theme-codegen.ts` can remain for future use but are not part of the V1 pipeline.

## 11. Existing Codebase Impact

### Safe Refactors (low risk, backward compatible)

| Change | Files | Reason |
|--------|-------|--------|
| Add `phase.ts` to SDK | New file in `packages/sdk/src/` | Phase tracking runtime |
| Add `build.ts`, `embed.ts` to SDK | New files | New API namespaces |
| Evolve `useHAEntity` → `bind.haEntity` | `packages/sdk/src/hooks/useHAEntity.ts` | Re-export under new name, keep old as deprecated alias |
| Add `defineProject()` | New file in SDK | Project descriptor API |
| Evolve `expression.ts` → `reactive-node.ts` | `packages/sdk/src/` | New abstraction layer, Expression becomes lowering target |
| Add IR types | New file `packages/sdk/src/ir.ts` or `packages/cli/src/compiler/ir/` | IR node definitions |
| Extend codegen for `EmbedValue` union types | `scripts/codegen/type-mapper.ts`, `ast-helpers.ts` | Additive type changes |

### Breaking Changes (requires migration)

| Change | Files | Impact | Migration |
|--------|-------|--------|-----------|
| `defineProject()` wrapper required | All user projects | `export default <esphome>...` → `export default defineProject({ device: <esphome>... })` | Mechanical: wrap existing default export |
| `useHAEntity()` → `bind.haEntity()` | User code using HA bindings | Import path change | Codemod or deprecation alias |
| `function` as script → `device.script()` | User code with scripts | Fundamental authoring change | Manual migration; old pattern can be supported via lint warning |
| `useScript()` internal hook removed | `packages/sdk/src/hooks/useScript.ts` + compiler transform | No longer needed with explicit scripts | Remove after migration |
| Script transformer simplified | `packages/cli/src/compiler/transform/` | `script-transformer.ts` loses script detection/rewriting | Keep action-converter, remove script-specific AST transforms |
| Execute phase restructured | `packages/cli/src/compiler/compiler.ts` | Adds IR construction + lowering between execute and emit | Phase tracking + IR construction added |

### High-Risk Changes

| Change | Risk | Mitigation |
|--------|------|------------|
| Removing AST transform for scripts | Current E2E tests rely on script-device, trigger-device patterns | Run old and new paths in parallel during migration; keep old E2E tests as regression |
| ReactiveNode replacing Expression as primary API | All reactive E2E tests | Expression remains as lowering target; ReactiveNode wraps it |
| Phase tracking runtime | Could break execution if phases not set correctly | Extensive E2E coverage; fail-open in development mode |
| IR construction phase | New code path between execute and emit | Start with pass-through IR that mirrors current config objects, then evolve |

### Codegen Impact

| File | Change | Risk |
|------|--------|------|
| `scripts/codegen/type-mapper.ts` | Add `EmbedValue<T>` union for applicable props | Low — additive |
| `scripts/codegen/ast-helpers.ts` | Add `embedPropType()`, `reactivePropType()` helpers | Low — new helpers |
| `scripts/codegen/generate.ts` | Thread prop metadata for embed/reactive capability | Medium — core codegen orchestrator |
| `scripts/codegen/lvgl-codegen.ts` | LVGL props get `BindProp<T>` types, trigger prop generation | Medium — schema interpretation |
| `scripts/codegen/action-codegen.ts` | No changes — actions system is orthogonal | None |
| `scripts/codegen/schema-action-extractor.ts` | No changes | None |

## 12. V1 Scope

### In Scope

- `build.run()` + `embed.*()` APIs with phase tracking
- `bind.haEntity()`, `bind.expr()`, `bind.memo()`, `bind.effect()` — full reactive API with ReactiveNode
- C++ reactive runtime (`espcompose_reactive.h`) — Signal/Memo/Effect/Scheduler
- Per-project generated bindings (`espcompose_bindings.h`) when runtime needed
- Hybrid lowering: ESPHome-native triggers for simple cases, runtime for complex
- `device.script()` replacing function-as-script pattern
- `device.include()` and `device.lambda()` escape hatches
- `defineProject()` wrapper
- IR node types (initially thin wrapper over current config objects)
- Phase enforcement: types + lint rules + runtime assertions
- Evolved codegen for `EmbedValue` and `BindProp` types
- All existing E2E tests passing after migration
- Secrets handling via `embed.secret()`

### Out of Scope (V2+)

- Full IR optimization passes
- Multiple device targets from one project
- Native C++ LVGL backend
- Hot-reload / incremental compilation
- Remote device flashing
- Visual UI editor integration
- Plugin/extension system for custom phases

## 13. Risks

1. **Migration burden**: Existing users must update to `defineProject()` and explicit script APIs. Mitigate with codemods and deprecation warnings.
2. **IR complexity creep**: IR could become over-engineered if not disciplined. Mitigate: V1 IR is intentionally thin — just typed wrappers around what current system produces.
3. **Phase tracking edge cases**: Dynamic imports, lazy evaluation, or async patterns could confuse phase tracking. Mitigate: runtime assertions catch violations; lint rules catch common cases statically.
4. **Reactive function analysis**: Capturing `() => expr` as C++ lambdas relies on the expressions being simple enough. Current `expression-to-cpp.ts` handles basic operators — complex expressions will hit limits. Mitigate: clear error messages for unsupported patterns.
5. **Codegen regression**: Modifying type-mapper.ts and generate.ts could break existing 200+ component types. Mitigate: snapshot tests on generated output.
6. **C++ reactive runtime correctness**: Custom Signal/Memo/Effect on embedded targets must handle memory constraints, no-exception environments, and ESPHome's main loop threading model. Mitigate: keep runtime minimal (~300 lines), no dynamic allocation in hot path, extensive on-device testing.
7. **ESPHome internal API coupling**: The C++ runtime accesses ESPHome's `id()` macro and LVGL `lv_obj_t*` pointers. ESPHome internal APIs can change between versions. Mitigate: pin ESPHome version; wrap ESPHome access in thin abstraction layer within the runtime header.
8. **Hybrid lowering decision boundary**: The compiler must correctly classify which projects need the runtime vs ESPHome-native. A misclassification could produce incorrect output silently. Mitigate: when in doubt, use the runtime (safe fallback); add diagnostic output showing which path was chosen.

## 14. Step-by-Step Roadmap

### Phase A: Foundation (SDK core + phase tracking)

**Milestone**: New APIs exist and are callable, old APIs still work

1. Add `packages/sdk/src/phase.ts` — phase tracking runtime
2. Add `packages/sdk/src/build.ts` — `build.run()` API
3. Add `packages/sdk/src/embed.ts` — `embed.*()` API with `EmbedValue<T>` wrapper
4. Add `packages/sdk/src/project.ts` — `defineProject()` API
5. Evolve `packages/sdk/src/index.ts` — export new namespaces alongside existing
6. Add runtime phase assertions to `build.run()`, `embed.*()`, and existing `useHAEntity()`
7. *Parallel with step 2-4*: Add `bind` namespace re-exporting `haEntity`, `expr`, `memo`, `effect`, `prop`
8. *Parallel with step 2-4*: Add `device` namespace with `script()`, `include()`, `lambda()`
9. Write unit tests for all new APIs
10. **Deliverable**: SDK exports `{ build, embed, bind, device, defineProject }` alongside existing API. No compiler changes yet.

### Phase B: IR Layer

**Milestone**: IR types defined, thin construction pass produces IR from rendered JSX

1. Define IR node types in `packages/cli/src/compiler/ir/types.ts`
2. Implement `buildIR()` — walks `EspComposeElement` tree → `IRNode` tree (*depends on A*)
3. Implement `lowerIR()` — converts `IRNode` tree → YAML config object (initially 1:1 with current `toPlainObject` output)
4. Wire IR into compiler pipeline: execute → buildIR → lowerIR → emit (*depends on 2-3*)
5. Verify all existing E2E tests pass through IR path
6. **Deliverable**: Compiler produces identical YAML output via IR intermediary. Tests green.

### Phase C: Phase Enforcement

**Milestone**: Phase boundaries enforced at all three layers

1. Add ESLint rules: `no-build-in-component`, `no-node-in-reactive` (*parallel with B*)
2. Wire phase transitions in compiler `execute()` function (*depends on B.4*)
3. Add TypeScript branded types preventing cross-phase value passing without `embed.*()`
4. Add E2E tests for phase violation error messages
5. **Deliverable**: Incorrect phase usage caught by types, lint, and runtime.

### Phase D: Script Migration

**Milestone**: `device.script()` works, old function-as-script still supported but deprecated

1. Implement `device.script()` — returns `DeviceScript` object with action collection scope
2. Modify action primitives (`delay()`, `logger.log()`) to return action descriptors when called inside `device.script()` scope
3. Add IR handling for `DeviceScript` → `IRScript`
4. Add lowering for `IRScript` → `script:` YAML section
5. Add E2E test: `explicit-script-device` project using `device.script()`
6. Add deprecation warning to old function-as-script detection
7. **Deliverable**: Both old and new script patterns work. New pattern is documented and preferred.

### Phase E: Reactive Evolution

**Milestone**: ReactiveNode + C++ reactive runtime with Signal/Memo/Effect

1. Add `ReactiveNode<T>` class in `packages/sdk/src/reactive-node.ts` — supports multi-source dependencies
2. Modify `bind.haEntity()` to return bindings with `ReactiveNode` internally
3. Implement `bind.expr()` — normalizes `BindProp<T>` → `ReactiveNode`, captures deps via Proxy
4. Implement `bind.memo(fn)` — creates named Memo node, captures multi-source deps
5. Implement `bind.effect(fn)` — creates Effect node for side-effects
6. Add IR handling for `ReactiveNode` → `IRReactiveExpr` (with dependency array)
7. Implement **hybrid lowering** decision logic:
   - Analyze all IRReactiveExpr nodes in the project
   - If all are single-source with no memo/effect → ESPHome-native triggers (Expression path)
   - Otherwise → C++ reactive runtime path
8. **ESPHome-native path**: Lower `IRReactiveExpr` → `Expression` → `!lambda` + trigger injection (current reactive-injector algorithm)
9. **C++ runtime path**:
   a. Write `espcompose_reactive.h` — Signal<T>, Memo<T>, Effect, Scheduler (~300 lines C++)
   b. Implement C++ codegen: IRReactiveExpr → Signal/Memo/Effect declarations in `espcompose_bindings.h`
   c. Generate YAML wiring: `on_state:` → `signal.set(x)` lambdas, `on_boot:` → `espcompose_setup()`
   d. Generate `esphome.includes:` entries for both files
10. Verify ha-binding-device and reactive-device E2E tests pass (both paths)
11. Add E2E test: `multi-source-reactive-device` with `bind.memo()` exercising C++ runtime
12. **Deliverable**: Full reactive system — simple cases zero-overhead, complex cases use injected runtime.

### Phase F: Codegen Evolution

**Milestone**: Generated types support `EmbedValue` and `BindProp` unions

1. Modify `scripts/codegen/ast-helpers.ts` — add `embedPropType()`, `reactivePropType()` (*parallel with E*)
2. Modify `scripts/codegen/type-mapper.ts` — generate union types for applicable props
3. Modify `scripts/codegen/lvgl-codegen.ts` — LVGL updatable props get `BindProp<T>`
4. Add snapshot tests for generated type output
5. Run full codegen + verify no regressions
6. **Deliverable**: Generated intrinsic element types accept new API types.

### Phase G: Integration + Migration

**Milestone**: Demo project and all E2E tests use new authoring model

1. Migrate `packages/demo/` to new authoring model
2. Add new E2E projects demonstrating new patterns (build.run, embed, memo, effect)
3. Update `AGENT.md` and `docs/getting-started.md`
4. Remove deprecated paths (old script transform, useHAEntity direct import)
5. Final E2E + lint + type-check pass
6. **Deliverable**: V1 release candidate.

### Proof-of-Concept Checkpoints

| After Phase | PoC Verification |
|-------------|-----------------|
| A | `build.run()` + `embed.string()` produce correct values in test |
| B | Existing E2E snapshots match through IR path |
| D | `device.script()` produces identical YAML to function-as-script for same logic |
| E.8 | Simple reactive binding works through ESPHome-native path |
| E.11 | `bind.memo()` with multi-source deps compiles and ESPHome validates the YAML+C++ output |
| G | Full demo project compiles with new authoring model |

## Relevant Files

### SDK (packages/sdk/src/)
- `index.ts` — add new namespace exports
- `runtime.ts` — modify render pipeline to produce IR
- `expression.ts` — becomes lowering target for ReactiveNode (ESPHome-native path)
- `serialize.ts` — add EmbedValue and ReactiveNode serialization
- `types.ts` — add EmbedValue, BuildValue, BindProp, DeviceScript types
- `hooks/useHAEntity.ts` — evolve to produce ReactiveNode
- `hooks/useReactiveScope.ts` — evolve for IR-based binding collection
- `hooks/useScript.ts` — deprecate, replace with device.script()
- `hooks/useScope.ts` — evolve for device.script() collection
- NEW: `phase.ts`, `build.ts`, `embed.ts`, `project.ts`, `reactive-node.ts`, `device.ts`, `bind.ts`

### CLI (packages/cli/src/)
- `compiler/compiler.ts` — add IR construction + lowering phases, phase transitions
- `compiler/reactive-injector.ts` — evolve for IR-based bindings (ESPHome-native path)
- `compiler/transform/script-transformer.ts` — simplify (remove script detection, keep action conversion)
- `compiler/transform/action-converter.ts` — reuse as-is for device.script()
- NEW: `compiler/ir/types.ts`, `compiler/ir/build-ir.ts`, `compiler/ir/lower-ir.ts`
- NEW: `compiler/reactive-runtime/` — C++ codegen for Signal/Memo/Effect bindings
- NEW: `compiler/reactive-runtime/espcompose_reactive.h` — shipped C++ header
- NEW: `compiler/reactive-runtime/codegen.ts` — generates per-project `espcompose_bindings.h`

### Codegen (scripts/codegen/)
- `type-mapper.ts` — add EmbedValue/BindProp union generation
- `ast-helpers.ts` — add helper functions
- `generate.ts` — thread capability metadata
- `lvgl-codegen.ts` — reactive prop types

### ESLint (packages/eslint/)
- NEW: `src/rules/no-build-in-component.ts`
- NEW: `src/rules/no-node-in-reactive.ts`
