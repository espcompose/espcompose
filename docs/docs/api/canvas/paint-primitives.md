---
sidebar_label: Paint Primitives
sidebar_position: 2
---

# Paint Primitives

Paint primitives are leaf elements placed inside `<ec-canvas-background>` or `<ec-canvas-overlay>` zones. They compile to native LVGL canvas draw actions.

All numeric props accept reactive values — when the underlying state changes, the canvas redraws automatically.

## ec-rect

Draws a filled and/or stroked rectangle.

```tsx
<ec-rect
  x={0}
  y={0}
  width={200}
  height={100}
  fill="#1a1a2e"
  stroke="#333366"
  strokeWidth={2}
  radius={12}
  opacity={255}
/>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `x` | `Reactive<number>` | `0` | Horizontal position in pixels |
| `y` | `Reactive<number>` | `0` | Vertical position in pixels |
| `width` | `Reactive<number>` | `0` | Width in pixels |
| `height` | `Reactive<number>` | `0` | Height in pixels |
| `radius` | `Reactive<number>` | `0` | Corner radius in pixels |
| `fill` | `Reactive<string>` | — | Fill color as hex string (e.g. `"#4caf50"`) |
| `stroke` | `Reactive<string>` | — | Stroke (border) color as hex string |
| `strokeWidth` | `Reactive<number>` | `1` | Stroke width in pixels |
| `opacity` | `Reactive<number>` | — | Opacity: 0–255 integer or 0.0–1.0 float |

Compiles to `lvgl.canvas.draw_rectangle`.

## ec-line

Draws a line between two points.

```tsx
<ec-line
  x1={16}
  y1={80}
  x2={264}
  y2={80}
  stroke="#333366"
  strokeWidth={1}
/>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `x1` | `Reactive<number>` | `0` | Start X position in pixels |
| `y1` | `Reactive<number>` | `0` | Start Y position in pixels |
| `x2` | `Reactive<number>` | `0` | End X position in pixels |
| `y2` | `Reactive<number>` | `0` | End Y position in pixels |
| `stroke` | `Reactive<string>` | — | Line color as hex string |
| `strokeWidth` | `Reactive<number>` | `1` | Line width in pixels |
| `opacity` | `Reactive<number>` | — | Opacity: 0–255 integer or 0.0–1.0 float |

Compiles to `lvgl.canvas.draw_line`.

## ec-arc

Draws a circular arc or ring segment. Useful for gauges, progress rings, and circular indicators.

```tsx
<ec-arc
  cx={60}
  cy={60}
  radius={50}
  startAngle={135}
  endAngle={315}
  stroke="#00e676"
  strokeWidth={6}
  rounded
/>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `cx` | `Reactive<number>` | `0` | Center X position in pixels |
| `cy` | `Reactive<number>` | `0` | Center Y position in pixels |
| `radius` | `Reactive<number>` | `0` | Arc radius in pixels |
| `startAngle` | `Reactive<number>` | `0` | Start angle in degrees (0 = 3 o'clock, clockwise) |
| `endAngle` | `Reactive<number>` | `360` | End angle in degrees (0–360) |
| `stroke` | `Reactive<string>` | — | Arc color as hex string |
| `strokeWidth` | `Reactive<number>` | `1` | Arc line width in pixels |
| `rounded` | `Reactive<boolean>` | — | Round the arc endpoints |
| `opacity` | `Reactive<number>` | — | Opacity: 0–255 integer or 0.0–1.0 float |

Compiles to `lvgl.canvas.draw_arc`.

### Example: gauge ring

```tsx
<ec-canvas style={{ width: 120, height: 120 }}>
  <ec-canvas-background>
    {/* Background track */}
    <ec-arc cx={60} cy={60} radius={50} startAngle={135} endAngle={315} stroke="#555577" strokeWidth={6} />
    {/* Active fill */}
    <ec-arc cx={60} cy={60} radius={50} startAngle={135} endAngle={270} stroke="#00e676" strokeWidth={6} rounded />
  </ec-canvas-background>
</ec-canvas>
```

## ec-polygon

Draws a filled polygon with an arbitrary number of vertices.

```tsx
<ec-polygon
  points={[{ x: 40, y: 5 }, { x: 75, y: 70 }, { x: 5, y: 70 }]}
  fill="#ff9800"
  stroke="#ffffff"
  strokeWidth={2}
/>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `points` | `Array<{ x: number; y: number }>` | — | Ordered list of polygon vertices |
| `fill` | `Reactive<string>` | — | Fill color as hex string |
| `stroke` | `Reactive<string>` | — | Border color as hex string |
| `strokeWidth` | `Reactive<number>` | `1` | Border width in pixels |
| `radius` | `Reactive<number>` | `0` | Corner radius in pixels |
| `opacity` | `Reactive<number>` | — | Opacity: 0–255 integer or 0.0–1.0 float |

Compiles to `lvgl.canvas.draw_polygon`.

### Example: triangle indicator

```tsx
<ec-canvas style={{ width: 80, height: 80 }}>
  <ec-canvas-background>
    <ec-polygon
      points={[{ x: 40, y: 5 }, { x: 75, y: 70 }, { x: 5, y: 70 }]}
      fill="#ff9800"
      stroke="#ffffff"
      strokeWidth={2}
    />
  </ec-canvas-background>
</ec-canvas>
```

## ec-text

Draws pixel-positioned text on the canvas. Use this for text that needs precise placement outside normal LVGL widget flow — labels at specific coordinates, annotations, or HUD-style overlays.

```tsx
<ec-text
  x={4}
  y={4}
  text="Pixel text"
  fill="#e0e0e0"
  maxWidth={192}
  textAlign="center"
/>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `x` | `Reactive<number>` | `0` | Horizontal position in pixels |
| `y` | `Reactive<number>` | `0` | Vertical position in pixels |
| `text` | `Reactive<string>` | — | Text content |
| `font` | `Reactive<string>` | — | Font reference (e.g. from `useFont()`) |
| `fill` | `Reactive<string>` | — | Text color as hex string |
| `maxWidth` | `Reactive<number>` | `0` | Maximum text width before wrapping (px) |
| `textAlign` | `Reactive<string>` | — | Text alignment: `"left"`, `"center"`, or `"right"` |
| `letterSpacing` | `Reactive<number>` | — | Letter spacing in pixels |
| `lineSpacing` | `Reactive<number>` | — | Line spacing in pixels |
| `opacity` | `Reactive<number>` | — | Opacity: 0–255 integer or 0.0–1.0 float |

Compiles to `lvgl.canvas.draw_text`.

:::tip
For interactive or styled text, prefer `<lvgl-label>` inside `<ec-canvas-content>`. Use `<ec-text>` only when you need pixel-precise placement that bypasses LVGL layout.
:::

## ec-image

Draws an image on the canvas with optional transforms (rotation, scale, skew).

```tsx
const icon = useImage({ file: './assets/icon.png', type: 'RGBA', resize: '32x32' });

<ec-image
  x={10}
  y={10}
  src={icon}
  rotation={900}
  scale={512}
/>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `x` | `Reactive<number>` | `0` | Horizontal position in pixels |
| `y` | `Reactive<number>` | `0` | Vertical position in pixels |
| `src` | `Reactive<string>` | — | Image source (e.g. from `useImage()`) |
| `rotation` | `Reactive<number>` | — | Rotation angle (degrees × 10, e.g. 900 = 90°) |
| `scale` | `Reactive<number>` | — | Uniform scale factor (256 = 1×) |
| `scaleX` | `Reactive<number>` | — | Horizontal scale factor (256 = 1×) |
| `scaleY` | `Reactive<number>` | — | Vertical scale factor (256 = 1×) |
| `skewX` | `Reactive<number>` | — | Horizontal skew (degrees × 10) |
| `skewY` | `Reactive<number>` | — | Vertical skew (degrees × 10) |
| `pivotX` | `Reactive<number>` | `0` | Transform origin X in pixels |
| `pivotY` | `Reactive<number>` | `0` | Transform origin Y in pixels |
| `opacity` | `Reactive<number>` | — | Opacity: 0–255 integer or 0.0–1.0 float |

Compiles to `lvgl.canvas.draw_image`.

## Reactive paint props

Any numeric or color prop can accept a reactive value. When the bound state changes, the compiler generates C++ code to redraw the affected primitive:

```tsx
const temperature = useHAEntity('sensor.temperature');

<ec-canvas style={{ width: 48, height: 48 }}>
  <ec-canvas-background>
    <ec-rect
      x={0} y={0} width={48} height={48}
      fill={temperature.state}
      radius={24}
    />
  </ec-canvas-background>
</ec-canvas>
```
