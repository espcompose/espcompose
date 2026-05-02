# Code Review — `overlay` branch (Phase E useScript closure refactor)

## Overall

The closure protocol refactor is well-architected: `useScript` now does compile-time dedup via FNV-1a body-hash + closure-shape signature, with a per-script closure-table emitted as a C++ struct + array, and an `ACTION_CPP_EMITTERS` catalog for native→lambda rewrite. Build and tests pass (per `pnpm build:full` exit 0). Snapshots in useScript-mixed-bindings-device.test.ts.snap cleanly demonstrate the canonical pathway.

## Issues found

### 1. Type erosion on `ScriptHandle` call signature (UX regression)
In useScript.ts:
```ts
(...args: unknown[]): Promise<void>;
execute(...args: unknown[]): void;
```
The `useScript<A>` generic captures arg types, but `ScriptHandle` itself is `unknown[]`. Users calling `toggle.execute('not-an-int')` get no type checking. Recommend parameterizing `ScriptHandle<A>` so call sites preserve the inferred tuple, or at minimum constrain to `ScriptParamScalar[]`.

### 2. Repeated `ScriptHandleLike` shape definitions
Defined three times: in closure.ts (`scriptHandleDescriptor`), in script-handle-resolve.ts, and the controller shapes are duplicated in both closure.ts and useScript.ts (`OverlayControllerInternalShape`, `LvglVisControllerInternalShape`). The descriptor pattern was meant to centralize per-type knowledge — `resolveControllerRefsParameterized` still hard-codes `__templateKey` / `__visibilityTarget` / `__targetRef` access. Consider adding a `descriptor.resolveAction?` hook so the switch in `resolveControllerRefsParameterized` can be replaced with descriptor dispatch.

### 3. `cleanBindings` may still contain ScriptHandles during ref-string resolution
In useScript.ts `resolveScriptActionsCanonical` strips overlay/visibility controllers from `cleanBindings` but not script handles before calling `resolveRefBindingsInActions(actions, cleanBindings)`. A ScriptHandle bound by name and used inside a lambda template literal would stringify as `function callable() {...}`. Since `cleanScriptHandleRefs` only runs in `serialize.ts`, this path can corrupt lambda strings. Mirror the `__visibilityTarget`/`__templateKey` filter to also drop callables that look like ScriptHandles.

### 4. Missing tests called out in session memory
[memory: phase-e-useScript-closure-plan.md (E5)](memory:/memories/repo/phase-e-useScript-closure-plan.md) records: drop identity tests and add coverage for `classifyBindings`, `closureShapeSignature`, `buildClosureRow`. closure.test.ts still only tests descriptors. These three pure functions are the core of dedup correctness — they should be unit-tested.

### 5. `identityDescriptor` exported but flagged for removal
closure.ts exports `identityDescriptor` and `findClosureDescriptor` falls back to it. Per the E5 plan, `findClosureDescriptor` should throw on no-match. Today an unrecognized binding silently produces no closure field rather than an error.

### 6. `formatCppLiteral` has acknowledged duration gap
action-cpp-emitters.ts line ~165 notes `transition_length`-style duration strings (`'500ms'`) get emitted as quoted C strings. `light.turn_on` in the catalog declares `transition_length: uint32_t`, so a closure-bound `light.turn_on({ id: x, transition_length: '500ms' })` would compile to `set_transition_length("500ms")` — a type error in the generated C++. Either add duration parsing to `formatCppLiteral` or reject string durations with a build error in the emitter catalog.

### 7. `extractScriptUserParams` runs twice
In script-transformer.ts, `extractScriptUserParams` is called once in `scanForScriptHandles` (stored in `ScriptHandleInfo`) and again at the top of `compileAndInjectUseScript`. Pull from the existing `scriptHandles` map by symbol for the second site to avoid recomputation (and potential drift if the inference logic changes).

### 8. `lvgl_visibility_show` rewritten to literal — closure pathway lost
useScript.ts `resolveControllerRefsParameterized` for `lvgl_visibility_show` with `__visibilityTarget === 'ref'` rewrites to:
```ts
{ kind: 'native', actionKey: 'lvgl.widget.update', config: { id: ctrl.__targetRef ?? '', hidden: false } }
```
without `refSlots`. So a script using `<LvglVis ref-target>` directly (vs. the synthetic path in `useLvglVisibility`) won't trigger the native→lambda rewrite. Path may not be reachable today, but it's an inconsistency worth a comment or assertion.

### 9. `script-handle-resolve.ts` lookup map closure
In script-handle-resolve.ts, the `byId` Map is rebuilt at each recursion level (the `let byId = null` is re-declared per call). Performance is negligible at script sizes, but the comment `Build a one-shot scriptId → handle index for cheap lookup` overstates it. Either move the Map outside the recursion (build once, pass down) or remove the misleading comment.

### 10. Minor: `IRRefSlot.configPath: '_'` magic value
action-types.ts uses sentinel `'_'` to mean "config is the bare string". A discriminated union (`{ kind: 'bare' } | { kind: 'object'; key: string }`) would be more self-documenting and remove the special case in `extractConfigParam`.

## Things that look good

- FNV-1a body-hash dedup via global-shared.ts `hashFnv1a` — correct algorithm, deterministic, sorted-key inputs.
- Hard-error policy in `synthesizeNativeAsLambda` (action-lowering.ts) — no silent fallback to legacy emission, matching the documented project policy.
- Typed-pointer trick `decltype(id(X))*` in closure-table.ts elegantly avoids needing a per-component cppType registry.
- Snapshot diffs are minimal and only reflect intended IR changes (e.g. `closure_index: 0|1`).
- New e2e fixtures cover scalar params, multi-ref dedup, and mixed-binding closures — good coverage of the intended pathways.

## Recommended priority

High: #3 (correctness risk), #6 (potential bad C++ emission), #1 (lost type safety).
Medium: #2 (cohesion), #4 (test debt), #5 (silent-error gap).
Low: #7, #8, #9, #10.