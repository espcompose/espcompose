## Plan: Reactive Theme & Component Reactivity System

Replace the current split theme system (compile-time context + style\_definitions + bridge layer) with a **unified reactive architecture** where theme tokens and component props flow as reactive signals through the C++ Signal/Memo/Effect runtime. Theme switching sets a theme index signal; component prop cascading (`FancyLightButton → Button → lvgl-button`) works by passing ReactiveNodes through render functions. Clean break — no backward compatibility.

---

### Design Decisions

- **Full token switching** — colors, spacing, radii, fonts, sizes all runtime-switchable
- **No style\_definitions** — everything flows through per-widget reactive bindings
- **Preregistered themes** — registered at compile time, switched by name via `theme.select('dark')`
- **Reactive token props** — `status`, `size`, etc. can be `BindProp<T>` (static or reactive)
- **Clean break** — old theme system removed entirely

### Architecture

**Theme as indexed signal arrays.** Each theme leaf (~70-80 values like `colors.primary.bg`, `spacing.md`) becomes a C++ `Memo<T>` reading from a theme value array indexed by a `theme_index` signal. Switching themes = `theme_index.set(1); flush();` → all downstream memos/effects recalculate.

**Reactive propagation through components.** When a component receives a ReactiveNode prop, resolvers detect it and return derived ReactiveNodes (memos). These flow to leaf LVGL widget props where `lvglWidgetToPlain()` already detects and registers them. The compiler generates the full C++ reactive graph.

---

### Phase 1: Theme Signal Infrastructure (SDK)

*Foundation: flatten Theme into signals, create reactive proxy, register themes.*

1. **Theme flattener** — `flattenTheme(theme)` in new `theme-signals.ts`: walks `Theme` object, produces flat map of `~80` leaf paths to `{ value, cppType }`. E.g., `"colors_primary_bg"` → `{ value: "#1E88E5", cppType: "uint32_t" }`
2. **Theme registry** — new `theme-registry.ts`: `ThemeRegistry` class with `register(name, theme)`, `getThemes()`, `getSignalPaths()`. Module singleton + `clearThemeRegistry()` for compile-run cleanup
3. **Reactive theme proxy** — new `reactive-theme.ts`: `createReactiveThemeProxy()` returns deeply-nested Proxy where leaf access (e.g., `proxy.colors.primary.bg`) returns a cached `ReactiveNode` with `cppSignalName: 'sig_theme_colors_primary_bg'`. Integrates with `trackDependency()` for `bind.memo()` tracking
4. **`useReactiveTheme()` hook** — replaces `useTheme()`. Returns the proxy, registers theme signals in reactive scope on first access
5. **Extend `ExpressionDependency`** — add `sourceType?: 'ha_entity' | 'theme'` to `reactive-node.ts` so compiler distinguishes theme signals from HA signals
6. **`theme.select()` action** — when called inside action scope (`device.inline()`), pushes C++ lambda: `espcompose::theme_index.set(N); Scheduler::flush();` where N is the compile-time index
7. **`<ThemeRegistry>` JSX component** — `<ThemeRegistry themes={{ dark: darkTheme, light: lightTheme }} default="dark">` registers themes during render, sets up reactive proxy

---

### Phase 2: Reactive Resolver & Lift Utilities (SDK + UI)

*Make resolvers handle both static and ReactiveNode inputs.*

1. **`bind.lift()` utility** — in `bind.ts`: if input is reactive, wraps function in `bind.memo()`; if static, calls directly. Multi-arg variant `bind.lift2()` for two inputs
2. **Reactive-aware resolvers** — rewrite `resolvers.ts`: `resolveSpacing('md')` returns `ReactiveNode<number>` (theme value behind `'md'` can change). `resolveStatus(reactiveStatus)` returns `ReactiveStatusColors` with per-field memos. Same for `resolveSize()`, `resolveRadius()`, `resolveTypography()`, `fontDefToLvgl()`
3. **Dynamic token lookup codegen** — extend `memo-codegen.ts`: when memo body accesses `theme.colors[dynamicVar].bg`, generate C++ ternary chain over known token values (e.g., `s == "primary" ? sig_theme_colors_primary_bg.get() : s == "danger" ? ...`)
4. **Reactive return types** — add to `types.ts`: `ReactiveStatusColors`, `ReactiveSizeDimensions` with `ReactiveNode<T>` fields

---

### Phase 3: Component Rewrite (UI)

*All design system components updated. Button is the reference implementation.*

1. **Button** (*reference, do first*) — props become `BindProp<StatusToken>`, `BindProp<SizeToken>`, etc. Uses `bind.expr()` to normalize, reactive resolvers for colors/sizing, `bind.memo()` for derived width. Remove all `statusStyleId()` / style reference usage. Colors, padding, font applied as direct reactive props on `lvgl-button` and `lvgl-label`
2. **Screen** — `bgColor` from `theme.colors.background` (reactive), padding from reactive resolver
3. **Card** — `bgColor` from `theme.colors.surfaceAlt`, padding/radius from reactive resolvers
4. **Text** — `textColor` + `textFont` from reactive resolvers
5. **Space / VStack / HStack** — gap from reactive resolver
6. **SliderField, SwitchField, DropdownField** — label textColor + widget part colors from theme
7. **Row/Col, Grid/GridItem** — gap from reactive resolver

*Steps 2-7 are parallel with each other after Step 1 validates the pattern.*

---

### Phase 4: Compiler Extensions (CLI)

*Generate theme signal C++ code and handle theme-sourced dependencies.*

1. **Theme signal collection** — extend `reactive-config.ts`: `buildRuntimeConfig()` receives theme registry, creates `SignalDecl` for `theme_index` + `MemoDecl` for each theme leaf signal
2. **Theme C++ generation** — extend `codegen.ts`: generate theme value arrays (indexed by theme), `theme_index` signal, per-leaf memos reading `theme_values_X[theme_index.get()]`, wire all to `theme_index` in `setup()`
3. **Theme initialization** — `setup()` sets `theme_index` to default (0), first flush evaluates all memos
4. **`theme.select()` codegen** — compiler recognizes in action scope, generates `theme_index.set(N); flush();`
5. **Expanded widget update codegen** — add C++ updaters for: `bg_color`, `text_color`, `text_font`, `pad_all`, `width`, `height`, `radius`, `pad_row`, `pad_column` (currently only `text`, `checked`, `value`, `hidden`, `bg_color` are handled)
6. **Color literal conversion** — `toCppLiteral()` helper: `"#1E88E5"` → `lv_color_hex(0x1E88E5)`, `16` → `16`, `"montserrat_16"` → pointer to LVGL font
7. **Remove style\_definitions emission** — `<lvgl>` no longer receives `styleDefinitions` or `theme` props

---

### Phase 5: Cleanup (UI)

1. **Delete** `bridge.ts`, `style-ids.ts`, `json.ts`
2. **Rewrite** `context.ts` — export `useReactiveTheme()`, remove `ThemeProvider`, `ThemeContext`, `useTheme()`
3. **Update** `index.ts` — remove all deleted exports, add `useReactiveTheme`, `ThemeRegistry`, `theme.select`

---

### Phase 6: E2E Tests

1. **`reactive-theme-device`** — two themes (dark + light), two buttons switching between them via `theme.select()`. Screen with Text, Card, SliderField, Button. Validates: theme signal declarations, value arrays, memo wiring, widget bindings for bg\_color/text\_color/padding/font, `theme.select()` → `theme_index.set()` actions
2. **`fancy-light-cascade-device`** — sensor-derived `mode` → `FancyLightButton` → `LightButton` → `Button` → `lvgl-button` + `lvgl-label`. Validates: ReactiveNode flows through 3 component layers, memo chain (sensor → mode → status → labelText → widget), correct C++ dependency graph
3. **Update `design-system-device`** — replace `createLvglThemeProps()` + `<ThemeProvider>` with `<ThemeRegistry>`
4. **Add both to** `build.test.ts` — snapshot + ESPHome config validation

---

### Relevant Files

**SDK (new):** `theme-signals.ts`, `theme-registry.ts`, `reactive-theme.ts`
**SDK (modify):** `reactive-node.ts`, `bind.ts`, `memo-codegen.ts`, `hooks/useReactiveScope.ts`, `index.ts`
**UI (modify):** `theme/resolvers.ts`, `theme/types.ts`, `theme/context.ts`, all 10 component files, `index.ts`
**UI (delete):** `theme/bridge.ts`, `theme/style-ids.ts`, `theme/json.ts`
**UI (new):** `theme/ThemeRegistry.ts`
**CLI (modify):** `reactive-config.ts`, `reactive-runtime/codegen.ts`, `compiler.ts`
**E2E (new):** `projects/reactive-theme-device/`, `projects/fancy-light-cascade-device/`

---

### Verification

1. `cd packages/sdk && pnpm test` — flattenTheme, reactive proxy, bind.lift, resolver logic, codegen extensions
2. `cd packages/ui && pnpm test` — Button static/reactive paths, ThemeRegistry
3. `cd packages/e2e && pnpm test` — all 16 e2e tests (14 existing + 2 new)
4. `pnpm build` from root — topological build succeeds
5. `pnpm lint` — clean
6. Manual: inspect generated `espcompose_bindings.h` and `esphome.yaml` for both new e2e projects

---

### Scope Boundaries

**Included:** full-spectrum runtime theme switching, reactive token props, component cascade at arbitrary depth, 2 new e2e tests, all components rewritten

**Excluded:** animated theme transitions (addable later via `lv_anim_set_exec_cb`), dynamic runtime theme creation, theme values from Home Assistant, partial theme overrides / inheritance, new components beyond existing set
