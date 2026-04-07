## CSS-Inspired Style System — Next Steps

The MVP style system is complete. All visual properties are accessed exclusively
via the `style` prop on LVGL widgets, with CSS-like aliases, shorthand expansion,
per-widget part/state typing, `createStyles()`, and `mergeStyles()`.

This document captures the deferred items and future enhancements.

---

### ~~1. Style Deduplication & `style_definitions`~~ — Superseded

Superseded by the reactive theme system. The reactive architecture uses per-leaf
C++ `Memo<T>` nodes (one per theme token) with `Effect`s that call
`lv_obj_set_style_*()` directly on each widget. This subsumes what
`style_definitions` would have provided:

- **Shared values** — N widgets subscribing to the same `thm_spacing_md` Memo
  share a single source of truth, equivalent to a shared `lv_style_t`.
- **Runtime theme switching** — `theme_index.set(N); flush();` propagates
  through the full reactive graph. `style_definitions` cannot do this natively.
- **Full part+state support** — reactive bindings support any LVGL selector.
  ESPHome `style_definitions` only support base state.
- **Tree-shaking** — unreferenced theme memos are pruned at compile time.

Memory cost is comparable (~2-4KB reactive graph vs ~2-3KB shared style structs
for a typical 40-widget UI). See `reactive-theme-plan.md` for the full design.

---

### 2. ESLint Rule for Invalid Style Properties

**Priority:** Low — runtime detection already catches these at build time.

`expandCssProps()` throws on unknown properties with helpful suggestions (e.g.
`"fontSize" is not supported — use "textFont"`). An ESLint rule would surface
these errors in the editor before running a build.

**Steps:**
- Add a rule in `packages/eslint/` that statically analyzes `style={{ }}` objects
- Check property names against `CSS_TO_LVGL_MAP` keys + `LVGL_STYLE_PROP_KEYS`
- Report unknown properties with fix suggestions from `CSS_SUGGESTION_MAP`

**Consideration:** Style objects can be dynamic (spread, computed keys, theme
values), so static analysis will only catch literal property names. The runtime
check remains the authoritative validator.

---

### 3. Variants API (`cva`-style)

**Priority:** Low — convenience layer for component libraries.

A variants system (like Stitches/CVA) would let component authors define
size/color/state variants declaratively on top of `createStyles()`.

**Sketch:**
```ts
const button = createVariants(theme => ({
  base: {
    borderRadius: theme.radii.md,
    padding: theme.spacing.sm,
  },
  variants: {
    size: {
      sm: { padding: theme.spacing.xs, height: 32 },
      md: { padding: theme.spacing.sm, height: 40 },
      lg: { padding: theme.spacing.md, height: 48 },
    },
    intent: {
      primary: { backgroundColor: theme.colors.primary.bg },
      danger:  { backgroundColor: theme.colors.danger.bg },
    },
  },
}));

// Usage: button({ size: 'lg', intent: 'primary' }) → merged CssStyle
```

**Depends on:** The existing `createStyles()` + `mergeStyles()` foundation.

---

### ~~4. `radius` Schema Type~~ ✅ Done

Resolved — `borderRadius` in `CssAliasProps` accepts `number | string | 'circle'`
and transforms `'circle'` → `'CIRCLE'` via the mapping table. No runtime casts needed.

---

### 5. Layout Props Formalization

**Priority:** Medium — needed when adding more layout components.

Layout-related LVGL properties (`align`, flex/grid config) are currently excluded
from the `style` definition by design and injected via `x:custom`. As the UI
library grows (Flex, Grid, Absolute positioning), a formal layout prop system
could provide type-safe APIs for these without polluting the style namespace.

**Options:**
- Keep `x:custom` as the escape hatch (current approach)
- Add a dedicated `layout` prop on `lvgl-obj` with typed flex/grid config
- Layout components (Row, Grid, Space) continue to abstract this away

---

### ~~6. Remove Transform Value Passthrough~~ ✅ Done

Resolved — tightened all `kind: 'transform'` prop types using TypeScript template
literal types (`\`${number}%\``, `\`${number}\``) and strict enum unions. The loose
`string` type that absorbed literal unions is eliminated. TypeScript now catches
invalid values like `'COVER'`, `'TRANSP'`, `'SIZE_CONTENT'` at compile time. The
runtime transform branch throws on unmapped non-numeric strings as a safety net.
