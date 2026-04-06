## Reactive Theme & Component Reactivity System

Unified reactive architecture where theme tokens and component props flow as
reactive signals through the C++ Signal/Memo/Effect runtime. Theme switching
sets a theme index signal; component prop cascading works by passing
ReactiveNodes through render functions.

---

### Design Decisions

- **Full token switching** — colors, spacing, radii, fonts, sizes all runtime-switchable
- **No style\_definitions** — everything flows through per-widget reactive bindings (see `style-system-next-steps.md` §1 for rationale)
- **Preregistered themes** — registered at compile time, switched by name via `theme.select('dark')`
- **Reactive token props** — `status`, `size`, etc. can be `BindProp<T>` (static or reactive)

### Architecture

**Theme as indexed signal arrays.** Each theme leaf (~70-80 values like `colors.primary.bg`, `spacing.md`) becomes a C++ `Memo<T>` reading from a theme value array indexed by a `theme_index` signal. Switching themes = `theme_index.set(1); flush();` → all downstream memos/effects recalculate.

**Reactive propagation through components.** When a component receives a ReactiveNode prop, resolvers detect it and return derived ReactiveNodes (memos). These flow to leaf LVGL widget props where `lvglWidgetToPlain()` already detects and registers them. The compiler generates the full C++ reactive graph.

---

### Phase 1: Theme Signal Infrastructure (SDK) — ✅ COMPLETE

*Foundation: flatten Theme into signals, create reactive proxy, register themes.*

1. ✅ **Theme flattener** — `flattenTheme(theme)` in `theme-signals.ts`: walks `Theme` object, produces flat map of leaf paths to `{ value, cppType }`. C++ type inference: hex colors → `lv_color_t`, integers → `int32_t`, floats → `float`, strings → `const char*`
2. ✅ **Theme registry** — `theme-registry.ts`: `ThemeRegistryStore` class with `register(name, theme)`, manages flattened theme data for compiler. Module singleton + clearable between compilations
3. ✅ **Reactive theme proxy** — `reactive-theme.ts`: `createReactiveThemeProxy()` returns deeply-nested Proxy where leaf access (e.g., `proxy.colors.primary.bg`) returns a cached `ReactiveNode`. Integrates with `trackDependency()` for `useMemo()` tracking
4. ✅ **`useReactiveTheme()` hook** — replaces `useTheme()`. Returns the proxy from SDK, re-exported by `packages/ui/src/theme/context.ts`
5. ✅ **Extended `ExpressionDependency`** — `sourceType?: 'ha_entity' | 'theme'` on `reactive-node.ts` distinguishes theme signals from HA signals
6. ✅ **`theme.select()` action** — when called inside action scope, pushes C++ lambda: `espcompose::theme_index.set(N); Scheduler::flush();`
7. ✅ **`<ThemeProvider>` JSX component** — `packages/ui/src/theme/ThemeProvider.ts`: `<ThemeProvider themes={{ dark: darkTheme, light: lightTheme }} default="dark">` registers themes during render via SDK's `registerTheme()` and `getThemeRegistry()`

---

### Phase 2: Reactive Resolver & Lift Utilities (SDK + UI) — ✅ COMPLETE

*Resolvers handle both static and ReactiveNode inputs.*

1. ✅ **`resolveBindProp()` / `BindProp<T>`** — in `reactive-utils.ts`: normalizes static or reactive inputs. `BindProp<T>` type union enables props to accept either
2. ✅ **Reactive-aware resolvers** — `resolvers.ts` rewritten: `resolveSpacing('md')` returns `ReactiveNode<number>` (theme value behind `'md'` can change). Same for `resolveStatus()`, `resolveSize()`, `resolveRadius()`, `resolveTypography()`, `fontDefToLvgl()`
3. ✅ **ExprNode-based codegen** — All reactive expressions compile to `ExprNode` trees (target-agnostic IR), lowered per-backend: `exprToCpp()` for ESPHome, `exprToJs()` for simulator. Theme reads use `theme_read` ExprNode kind
4. ✅ **Reactive return types** — `ReactiveStatusColors`, etc. with `ReactiveNode<T>` fields

---

### Phase 3: Component Rewrite (UI) — ✅ COMPLETE

*All design system components updated.*

1. ✅ **Button** (reference implementation) — props accept `BindProp<StatusToken>`, `BindProp<SizeToken>`, etc. Colors, padding, font applied as direct reactive props on `lvgl-button` and `lvgl-label`. Old style-id references removed
2. ✅ **Screen** — `bgColor` from `theme.colors.background` (reactive), padding from reactive resolver
3. ✅ **Card** — `bgColor` from `theme.colors.surfaceAlt`, padding/radius from reactive resolvers
4. ✅ **Text** — `textColor` + `textFont` from reactive resolvers
5. ✅ **Space / VStack / HStack** — gap from reactive resolver
6. ✅ **Slider, Switch, Dropdown** — label textColor + widget part colors from theme
7. ✅ **Row/Col, Grid/GridItem** — gap from reactive resolver

---

### Phase 4: Compiler Extensions (CLI + target-esphome) — ✅ COMPLETE

*Theme signal C++ code generation and theme-sourced dependency handling.*

1. ✅ **Theme signal collection** — `reactive-config.ts`: `buildRuntimeConfig()` receives theme registry, creates `SignalDecl` for `theme_index` + `MemoDecl` for each theme leaf signal
2. ✅ **Theme C++ generation** — `bindings-codegen.ts`: theme value arrays (indexed by theme), `theme_index` signal, per-leaf memos reading `theme_values_X[theme_index.get()]`, wired in `setup()`
3. ✅ **Theme initialization** — `setup()` sets `theme_index` to default (0), first flush evaluates all memos
4. ✅ **`theme.select()` codegen** — recognised in action scope, generates `theme_index.set(N); flush();`
5. ✅ **Expanded widget update codegen** — C++ updaters for: `bg_color`, `text_color`, `text_font`, `pad_all`, `width`, `height`, `radius`, `border_width`, `border_color`, `pad_row`, `pad_column`, `text`, `checked`, `value`, `hidden`
6. ✅ **Color literal conversion** — `toCppLiteral()`: `"#1E88E5"` → `lv_color_hex(0x1E88E5)`, `16` → `16`, `"montserrat_16"` → pointer to LVGL font
7. ✅ **style\_definitions removed** — `<lvgl>` no longer receives `styleDefinitions` or `theme` props

---

### Phase 5: Cleanup (UI) — ✅ COMPLETE

1. ✅ **Deleted `bridge.ts`, `style-ids.ts`, `json.ts`** — removed obsolete files from `packages/ui/src/theme/`. No consumers imported them
2. ✅ **`context.ts` rewritten** — exports `useReactiveTheme()` re-exported from SDK; old `ThemeProvider`/`ThemeContext`/`useTheme()` removed
3. ✅ **`index.ts` updated** — exports `useReactiveTheme`, `ThemeProvider`, `darkTheme`, `lightTheme`, reactive resolvers, all component exports

---

### Phase 6: E2E Tests — ✅ COMPLETE

1. ✅ **`reactive-theme-device`** — two themes (dark + light), two buttons switching between them via `theme.select()`. Screen, Text, Card, Slider, Button. Validates: theme signal declarations, value arrays, memo wiring, widget bindings for bg\_color/text\_color/padding/font, `theme.select()` → `theme_index.set()` actions
2. ✅ **`fancy-light-cascade-device`** — sensor-derived memo chain + 3-layer component cascade: `FancyLightButton` → `LightButton` → `Button` → `lvgl-button` + `lvgl-label`. Validates: ReactiveNode flows through component layers, memo chain (sensor → status text, light entity → label), correct C++ dependency graph with both HA entity signals and theme signals
3. ✅ **`design-system-device` updated** — uses `<ThemeProvider themes={{ dark: darkTheme }}>` pattern (new reactive API)
4. ✅ **Both projects wired into `build.test.ts`** — snapshot + ESPHome config validation

---

### Current API

```tsx
import { ThemeProvider, darkTheme, lightTheme, Screen, Button, Text } from '@espcompose/ui';
import { useReactiveTheme, theme } from '@espcompose/core';

function App() {
  return (
    <ThemeProvider themes={{ dark: darkTheme, light: lightTheme }} default="dark">
      <Screen>
        <Button
          label="Switch Theme"
          status="primary"
          onPress={async () => { theme.select('light'); }}
        />
      </Screen>
    </ThemeProvider>
  );
}
```

Inside components, theme values are accessed via:
```tsx
const thm = useReactiveTheme();
const bgColor = thm.colors.primary.bg;  // → ReactiveNode<lv_color_t>
```

---

### Key Files

**SDK:** `theme-signals.ts`, `theme-registry.ts`, `reactive-theme.ts`
**SDK (modified):** `reactive-node.ts`, `reactive-utils.ts`, `hooks/useReactiveScope.ts`, `index.ts`
**UI:** `theme/ThemeProvider.ts`, `theme/resolvers.ts`, `theme/types.ts`, `theme/context.ts`, `theme/dark.ts`, `theme/light.ts`
**UI (all components updated):** `Button.tsx`, `Screen.tsx`, `Card.tsx`, `Text.tsx`, `Space.tsx`, `Row.tsx`, `Grid.tsx`, `Slider.tsx`, `Switch.tsx`, `Dropdown.tsx`
**UI (obsolete, awaiting deletion):** `theme/bridge.ts`, `theme/style-ids.ts`, `theme/json.ts`
**target-esphome (modified):** `reactive-config.ts`, `bindings-codegen.ts`, `codegen-cpp.ts`, `lower-yaml.ts`

---

### Scope Boundaries

**Included:** full-spectrum runtime theme switching, reactive token props, component cascade at arbitrary depth, all components rewritten

**Excluded:** animated theme transitions (addable later via `lv_anim_set_exec_cb`), dynamic runtime theme creation, theme values from Home Assistant, partial theme overrides / inheritance, new components beyond existing set
