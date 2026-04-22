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
