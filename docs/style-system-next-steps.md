## CSS-Inspired Style System — Next Steps

The MVP style system is complete. All visual properties are accessed exclusively
via the `style` prop on LVGL widgets, with CSS-like aliases, shorthand expansion,
per-widget part/state typing, `createStyles()`, and `mergeStyles()`.

This document captures the deferred items and future enhancements.

---

### 1. Style Deduplication & `style_definitions`

**Priority:** Medium — optimization for large UIs with repeated styles.

When many widgets share the same expanded style (e.g. via `createStyles()`),
the current system inlines every property on each widget in the YAML output.
ESPHome supports `style_definitions` — shared named style blocks that widgets
can reference by ID.

**Steps:**
- Define `StyleAstNode` — a normalized IR with `base`, `states`, `parts` structure
- Implement `normalizeCssToAst(style: CssStyle): StyleAstNode`
- Collect all resolved styles during render into a registry
- Content-hash identical `StyleAstNode` trees for deduplication
- Emit shared entries in the `style_definitions` YAML section
- Replace inline styles with `styles: [id]` references where beneficial

**Tradeoff:** Adds compilation complexity. Only worthwhile when repeated styles
produce measurably large YAML or when ESPHome's style_definitions offer runtime
memory benefits on the ESP32.

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

### 6. Remove Transform Value Passthrough

**Priority:** Low — correctness hardening.

**Problem:** The `kind: 'transform'` branch in `expandCssProps()` uses a fallback
pattern: `mapped !== undefined ? mapped : value`. This means that unrecognized
string values pass through silently to LVGL. For example, if someone writes
`opacity: 'COVER'` (the old LVGL CAPS value) instead of `opacity: 'opaque'`, it
would pass through without error because `'COVER'` isn't in the `valueMap` — so it
falls back to the raw value, which happens to be a valid LVGL enum.

This was intentional during migration to allow non-string values (reactive nodes,
percentage strings like `'50%'`, raw numbers) to pass through without being in the
value map. But it also provides an accidental escape hatch for CAPS values.

**Plan:**
1. Change the transform branch to check `typeof value === 'string'` before
   looking up the value map:
   ```ts
   if (typeof value === 'string') {
     const mapped = mapping.valueMap[value];
     if (mapped !== undefined) {
       result[mapping.lvglProp] = mapped;
     } else {
       // String not in the map — accept raw strings that look like
       // percentages/numbers, reject CAPS enum values
       if (/^-?\d/.test(value)) {
         result[mapping.lvglProp] = value; // e.g. '50%', '100px'
       } else {
         throw new Error(
           `Invalid value "${value}" for "${key}". ` +
           `Expected one of: ${Object.keys(mapping.valueMap).join(', ')}`,
         );
       }
     }
   } else {
     // Non-string (number, reactive node, etc.) — pass through
     result[mapping.lvglProp] = value;
   }
   ```
2. This would immediately catch old CAPS values (`'TRANSP'`, `'COVER'`,
   `'SIZE_CONTENT'`, etc.) with a clear error message showing the correct
   lowercase alternative.
3. Percentage strings like `'50%'` and numeric strings like `'100'` continue
   to pass through via the regex check.
4. Reactive nodes and other non-string values pass through via the `typeof`
   check.

**Prerequisites:**
- All CAPS values in `packages/ui/` and `packages/demo/` are already migrated
  to lowercase (done).
- E2E snapshot tests updated to reflect the new lowercase input values (done —
  the style system still emits LVGL CAPS in the output YAML, which is correct).

**Risk:** Low. The only breakage would be if external consumers of the library
are still using CAPS values directly in `style={{}}`. Those would get a clear
error message with the correct alternative.
