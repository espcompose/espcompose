# ESPCompose Styling & Theme Skill

Use when styling LVGL widgets, creating reusable style sheets, or
implementing theme switching with `@espcompose/core` and `@espcompose/ui`.
Covers `CssStyle` props, state/part nesting, `createStyles`, `mergeStyles`,
`registerTheme`, `useTheme`, and `theme.select()`.

For device config, hooks, refs, scripts, triggers, and action primitives,
see the **espcompose** skill instead.

---

## CSS-like Style Props

All LVGL widgets accept a `style` prop using CSS-like property names.
Properties are mapped to LVGL equivalents at compile time via `expandCssStyle()`.

```tsx
<lvgl-obj style={{
  width: 200,
  height: 50,
  backgroundColor: '#333333',
  color: '#FFFFFF',
  borderRadius: 8,
  padding: 12,
}} />
```

### Property Reference

| CSS Name | LVGL Name | Values |
|----------|-----------|--------|
| `width`, `height` | `width`, `height` | `number`, `'fit-content'`, `'50%'` |
| `minWidth`, `maxWidth`, `minHeight`, `maxHeight` | same | `number`, `'50%'` |
| `left`, `top` | `x`, `y` | `number` |
| `backgroundColor` | `bgColor` | hex string |
| `color` | `textColor` | hex string |
| `borderRadius` | `radius` | `number`, `'circle'` |
| `borderColor`, `borderWidth` | same | standard |
| `padding` | `padAll` | `number` |
| `paddingTop/Bottom/Left/Right` | `padTop/Bottom/Left/Right` | `number` |
| `paddingHorizontal` | `padLeft` + `padRight` | `number` |
| `paddingVertical` | `padTop` + `padBottom` | `number` |
| `gap` | `padRow` + `padColumn` | `number` |
| `rowGap`, `columnGap` | `padRow`, `padColumn` | `number` |
| `opacity` | `opa` | `'transparent'`, `'opaque'`, `'50%'`, `number` |
| `backgroundOpacity` | `bgOpa` | same as opacity |
| `font` | `textFont` | `RefProp<FontRef>` |
| `textAlign` | `textAlign` | `'left'`, `'center'`, `'right'`, `'auto'` |
| `letterSpacing` | `textLetterSpace` | `number` |
| `lineHeight` | `textLineSpace` | `number` |
| `textDecoration` | `textDecor` | `'none'`, `'underline'`, `'strikethrough'` |
| `backgroundImage` | `bgImageSrc` | `RefProp<ImageRef>` |
| `shadowColor`, `shadowWidth`, `shadowSpread` | same | standard |
| `shadowOffsetX`, `shadowOffsetY` | `shadowOfsX`, `shadowOfsY` | `number` |
| `animationDuration` | `animTime` | `number` or `string` |
| `overflow` | `clipCorner` | `'hidden'`, `'visible'` |
| `scrollbarMode` | `scrollbarMode` | `'off'`, `'on'`, `'active'`, `'auto'` |

### Flex Layout

```tsx
<lvgl-obj style={{
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 8,
}} />
```

| CSS Name | Maps To | Values |
|----------|---------|--------|
| `display` | layout type | `'flex'`, `'grid'` |
| `flexDirection` | `flexFlow` | `'row'`, `'column'`, `'row-wrap'`, `'column-wrap'` |
| `justifyContent` | `flexAlignMain` | `'start'`, `'center'`, `'end'`, `'spaceBetween'`, `'spaceAround'`, `'spaceEvenly'` |
| `alignItems` | `flexAlignCross` | `'start'`, `'center'`, `'end'`, `'stretch'` |
| `flexGrow` | flat widget prop | `number` |

### Grid Layout

```tsx
<lvgl-obj style={{
  display: 'grid',
  gridTemplateColumns: ['fr(1)', 'fr(2)', 200],
  gridTemplateRows: ['fr(1)', 100],
  gap: 4,
}}>
  <lvgl-label style={{ gridColumn: 0, gridRow: 0 }} text="Cell" />
</lvgl-obj>
```

| CSS Name | Maps To | Values |
|----------|---------|--------|
| `gridTemplateColumns` | grid column defs | `(number \| string)[]` |
| `gridTemplateRows` | grid row defs | `(number \| string)[]` |
| `gridColumn`, `gridRow` | flat widget prop | `number` (0-based) |
| `gridColumnSpan`, `gridRowSpan` | flat widget prop | `number` |
| `justifyItems` | `gridColumnAlign` | alignment values |
| `alignContent` | `gridRowAlign` | alignment values |

### Widget Placement (non-layout)

```tsx
<lvgl-label style={{ placeSelf: 'center' }} text="Centered" />
```

Values: `'center'`, `'topLeft'`, `'topCenter'`, `'topRight'`, `'bottomLeft'`,
`'bottomCenter'`, `'bottomRight'`, `'leftCenter'`, `'rightCenter'`

---

## State-Specific Styling

Nest state keys inside `style` to override properties for widget states.

```tsx
<lvgl-button style={{
  backgroundColor: '#333',
  pressed: { backgroundColor: '#111' },
  focused: { borderColor: '#0F0', borderWidth: 2 },
  disabled: { opacity: '50%' },
}} />
```

Available states: `checked`, `focused`, `focusKey`, `edited`, `hovered`,
`pressed`, `scrolled`, `disabled`, `user1`–`user4`.

---

## Part-Specific Styling

Nest part keys to style LVGL sub-parts. Parts can contain state overrides.

```tsx
<lvgl-slider style={{
  backgroundColor: '#222',
  indicator: {
    backgroundColor: '#1E88E5',
    pressed: { backgroundColor: '#0C5CAD' },
  },
  knob: {
    borderRadius: 'circle',
    backgroundColor: '#FFF',
  },
}} />
```

Available parts: `indicator`, `knob`, `scrollbar`, `selected`, `items`,
`ticks`, `cursor`, `textareaPlaceholder`.

---

## `createStyles(factory)`

Create reusable style sheets from a factory that receives the reactive theme proxy.
Theme property access inside the factory produces `IRReactiveNode` values for
reactive theme binding.

```tsx
import { createStyles } from '@espcompose/core';

const s = createStyles(theme => ({
  card: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.radii.md,
  },
  title: {
    color: theme.colors.textPrimary,
  },
}));

// Usage
<lvgl-obj style={s.card}>
  <lvgl-label style={s.title} text="Hello" />
</lvgl-obj>
```

---

## `mergeStyles(...styles)`

Combine multiple `CssStyle` objects. Last-wins for direct properties.
State and part sub-objects are deep-merged. `undefined`/`false`/`null`
entries are skipped (safe for conditionals).

```tsx
import { mergeStyles } from '@espcompose/core';

<lvgl-button style={mergeStyles(
  s.button,
  isActive && s.buttonActive,
  { padding: 12 },
)} />
```

---

## Theme System

### Register Themes

Register named themes via `registerTheme()` or `<ThemeProvider>` from `@espcompose/core`.
The first registered theme is the default.

```tsx
import { registerTheme } from '@espcompose/core';

registerTheme('dark', {
  colors: { surface: '#1E1E1E', textPrimary: '#FFFFFF' },
  spacing: { sm: 4, md: 8, lg: 16 },
});
registerTheme('light', {
  colors: { surface: '#FFFFFF', textPrimary: '#1E1E1E' },
  spacing: { sm: 4, md: 8, lg: 16 },
});
```

Or with `@espcompose/ui`:

```tsx
import { ThemeProvider } from '@espcompose/core';
import { darkTheme, lightTheme } from '@espcompose/ui';

<ThemeProvider themes={{ dark: darkTheme, light: lightTheme }} default="dark">
  {/* children */}
</ThemeProvider>
```

### Access Theme Reactively

`useTheme()` returns a deep proxy. Leaf property access produces `IRReactiveNode`
values with auto-dependency tracking for `useMemo()` and `createStyles()`.

```tsx
import { useTheme } from '@espcompose/core';

const theme = useTheme();
// theme.colors.surface → IRReactiveNode (reactive, auto-tracked)
```

### Switch Themes at Runtime

Call `theme.select(name)` inside trigger handlers or scripts.

```tsx
import { theme } from '@espcompose/core';

<lvgl-button onPress={() => { theme.select('light'); }}>
  <lvgl-label text="Light Mode" />
</lvgl-button>
```

The compiler emits C++ theme value arrays and a `theme_index` signal.
`theme.select()` compiles to setting `theme_index` → all theme-bound
memos re-evaluate reactively.

---

## Gotchas

- **Use CSS names, not LVGL names.** Write `backgroundColor`, not `bgColor`.
  `expandCssStyle()` handles the mapping at compile time.
- **State/part nesting is structural.** States go inside parts, not the other way
  around: `indicator: { pressed: { ... } }` — not `pressed: { indicator: { ... } }`.
- **Theme proxy is lazy.** `useTheme()` returns a proxy — only leaf access creates
  reactive nodes. Intermediate paths (e.g. `theme.colors`) return nested proxies.
- **`createStyles` must be called in render pass.** It calls `useTheme()` internally,
  so it follows the same hook rules.
- **`mergeStyles` deep-merges parts/states.** Direct props are last-wins, but nested
  state and part objects are merged recursively.
- **All style properties accept `Reactive<T>`.** You can bind any style prop to a
  reactive value (ref property, memo, theme leaf).
