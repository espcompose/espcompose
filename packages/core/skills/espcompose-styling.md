# ESPCompose Styling & Theme Skill

Use when styling LVGL widgets, creating reusable style sheets, or
implementing theme switching with `@espcompose/core` and `@espcompose/ui`.
Covers `CssStyle` props, state/part nesting,
`createTheme`, `handle.use()`, and `handle.select()`.

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

## Theme System

### Define a Theme Scope

Use `createTheme()` to define a theme scope with named theme variants.
Returns a `ThemeHandle` with `.Provider`, `.select()`, `.use()`, `.extend()`.

```tsx
import { createTheme } from '@espcompose/core';

const MyTheme = createTheme('my:scope', {
  dark: {
    colors: { surface: '#1E1E1E', textPrimary: '#FFFFFF' },
    spacing: { sm: 4, md: 8, lg: 16 },
  },
  light: {
    colors: { surface: '#FFFFFF', textPrimary: '#1E1E1E' },
    spacing: { sm: 4, md: 8, lg: 16 },
  },
});
```

Or use the built-in `@espcompose/ui` theme:

```tsx
import { UITheme } from '@espcompose/ui';

<UITheme.Provider default="dark">
  {/* children */}
</UITheme.Provider>
```

### Access Theme Reactively

`handle.use()` returns a deep proxy. Leaf property access produces `IRReactiveNode`
values with auto-dependency tracking for `useMemo()`.

```tsx
const theme = MyTheme.use();
// theme.colors.surface → IRReactiveNode (reactive, auto-tracked)
```

### Switch Themes at Runtime

Call `handle.select(name)` inside trigger handlers or scripts.

```tsx
<lvgl-button onPress={() => { MyTheme.select('light'); }}>
  <lvgl-label text="Light Mode" />
</lvgl-button>
```

The compiler emits C++ theme value arrays and a `theme_index` signal.
`handle.select()` compiles to setting `theme_index` → all theme-bound
memos re-evaluate reactively.

### Extend a Theme Scope

Use `handle.extend()` to add or override themes in a library's scope
without knowing scope strings.

```tsx
const MyExtended = UITheme.extend({
  ocean: { colors: { ... }, spacing: { ... } },
});
```

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
- **All style properties accept `Reactive<T>`.** You can bind any style prop to a
  reactive value (ref property, memo, theme leaf).
