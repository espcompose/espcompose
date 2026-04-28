## Plan: Pure Core — Eliminate C++ Knowledge from `@espcompose/core`

Replace every C++ string/type in src with a target-agnostic, structured `IRValueType` value (`{ type, format?, isArray? }`). Move all C++ mapping functions to `@espcompose/esphome-target`. Replace literal C++ member-access expressions in entity metadata with semantic property keys; the target owns the C++ resolution. Preserve user ergonomics by keeping `number` in user-facing APIs — only the IR layer changes. **Zero C++ leakage tolerated** — any case where the lowering can't determine the C++ representation from `IRValueType` + semantic key is a blocker that must be raised, not worked around.

### Naming Convention (NEW STANDARD)
```ts
// packages/core/src/ir/types.ts
export type IRScalarType   = 'int' | 'float' | 'bool' | 'string';
export type IRScalarFormat = 'id_ref' | 'entity';

export interface IRValueType {
  readonly type: IRScalarType;       // base scalar — always present
  readonly format?: IRScalarFormat;  // semantic qualifier
  readonly isArray?: boolean;        // collection flag
}
```
- Field name on parent: **`valueType`** (e.g. `IRScriptParam.valueType`, `ClosureField.valueType`, `GlobalDefinition.valueType`, `TriggerVariable.valueType`).
- Examples:
  - `{ type: 'int' }` → C++ `int`
  - `{ type: 'string' }` → C++ `std::string`
  - `{ type: 'string', format: 'id_ref' }` → C++ `const char*`
  - `{ type: 'float', isArray: true }` → C++ `std::vector<float>`
  - `{ type: 'int', format: 'id_ref' }` → index into id-ref lookup table

### Architectural Invariant (NEW)
Files in `packages/core/src/**` MUST NOT contain: `cpp` in identifiers, `std::`, `int*_t`/`uint*_t`, `const char*`, C++ mapping functions, or literal C++ member-access expressions. Verified by repo-wide grep.

### Phases

**A. Add `IRValueType` (additive)** — Introduce `IRScalarType`, `IRScalarFormat`, `IRValueType` alongside existing types. *Blocks B, D.*

**B. Rename IR fields: `cppType → valueType: IRValueType`** — `IRScriptParam`, `ClosureField`, all 3 closure descriptors, `useScript` hook. **Delete `ClosureField.kind`** (subsumed by `valueType.format`). Drop `'const char*'` (encoded as `{ type: 'string', format: 'id_ref' }`). Update CLI compiler + target. *Blocks C. Parallel with D, E.*

**C. Move C++ mapping to esphome-target** — Delete `globalTypeToCpp`, `retainedTypeToCpp`, `cppTypeToExprType` from core. NEW `value-type-cpp.ts` in target with `valueTypeToCpp` (handles `format` and `isArray`). Replace `GlobalDefinition.cppType: string` with `valueType: IRValueType` (no separate `isArray` sibling — it's in `valueType.isArray`). Add token-only `valueTypeToExprType` helper in core. *Blocks F.*

**D. Trigger registry: `cppType → valueType`** — Update `TriggerVariable`, hand-written entries, entity-domains.json, schema, generators. Regenerate. Target consumes `valueType`. *Blocks F. Parallel with B, E.*

**E. Entity property `cppPath` → semantic key + `EntityDomainDescriptor.valueType`** — Replace `.state`, `.current_values.get_brightness()`, `.position` with `'state'`, `'brightness'`, `'position'`. Add `resolveCppPath(domain, propertyKey)` in target. Rename `IRReactiveNode.property → propertyKey`. Rename `EntityDomainDescriptor.cppType → valueType`. *Blocks F. Parallel with B, D.*

**F. Documentation + repo memory** — Update `ir-types.instructions.md`, `targets.instructions.md`, add invariant to repo memory.

### Key Decisions
- **`isArray` lives inside `IRValueType`** — `std::vector<int>` is one type, not "an int with array flag". Naming `IRValueType` (not `IRScalar`) reflects that arrays are first-class.
- **`format` qualifier replaces `ClosureField.kind`** — kind values map: `'scalar'` → format undefined; `'id_ref'` → `format: 'id_ref'`; `'entity'` → `format: 'entity'`. Future qualifiers extend the union without restructuring.
- **No `Float` branded type** — TS arithmetic widens brands to `number`, would force `as Float` after every operation across the entire generated API. User-facing types stay `number`; only IR speaks `IRValueType`.
- **`'const char*'` removed** — encoded via `format: 'id_ref' | 'entity'`. Closure descriptors storing *indexes* use `{ type: 'int', format: 'id_ref' }` — `int` is the storage, `format` is the semantic.
- **Generated user-facing types stay `number`** — int/float distinction preserved in metadata only.

### Concerns to Raise (DO NOT silently work around)
1. Any caller of `cppTypeToExprType` passing values not derivable from `IRValueType` — fix caller, don't preserve the C++ path.
2. `(domain, propertyKey)` resolver collisions — surface immediately.
3. Any target code reaching back into core for a C++ string — make target own it.
4. Generated files that can't be made C++-free without codegen pipeline changes — surface required change.
5. Any user-facing scenario forcing C++ types into core — should not exist; raise immediately.
6. Closure-descriptor consumers that treat `kind` as something other than what `format` carries — raise; do not preserve `kind`.

### Verification
- `pnpm build:full` after each phase
- E2E snapshot diff empty for Phases B/D/E (rename only — emitted YAML/C++ identical)
- Final grep: `grep -rE "cpp[A-Z]|std::|int[0-9]+_t|uint[0-9]+_t|const char\*" packages/core/src/` → zero hits
- Suggested as a CI / pre-PR check