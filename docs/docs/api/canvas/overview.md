---
sidebar_label: Overview
sidebar_position: 1
---

# EC Canvas

`<ec-canvas>` is a composited rendering host that combines pixel-level paint primitives with standard LVGL widgets. It compiles to a native LVGL `canvas` widget, letting you draw backgrounds, separators, and overlays around interactive content — all in JSX.

## When to use

Use `<ec-canvas>` when you need rendering that goes beyond what LVGL widget styling provides:

- Custom-painted backgrounds (gradients, rounded cards, decorative shapes)
- Separator lines, grid lines, or visual indicators
- Overlays drawn on top of interactive widgets
- Status indicators (circles, badges) with pixel-precise control

For standard UI layout and controls, prefer regular LVGL widgets or the [UI Library](../../ui/overview.md) components.

## Architecture

An `<ec-canvas>` has three ordered rendering layers:

```
┌─────────────────────────────────┐
│  ec-canvas-overlay              │  ← Paint primitives drawn last
│  ┌───────────────────────────┐  │
│  │  ec-canvas-content        │  │  ← LVGL widgets (flexbox layout)
│  └───────────────────────────┘  │
│  ec-canvas-background           │  ← Paint primitives drawn first
└─────────────────────────────────┘
```

| Zone | Accepts | Purpose |
|------|---------|---------|
| `<ec-canvas-background>` | Paint primitives | Decorative underlay drawn before widgets |
| `<ec-canvas-content>` | LVGL widgets | Interactive content, laid out by LVGL flexbox/grid |
| `<ec-canvas-overlay>` | Paint primitives | Decorative overlay drawn after widgets |

All zones are optional. A canvas with only `<ec-canvas-background>` is valid for pure decorative elements.

## Basic usage

```tsx
<ec-canvas style={{ width: 280, height: 120, display: 'flex', flexDirection: 'column', padding: 12 }}>
  <ec-canvas-background>
    <ec-rect x={0} y={0} width={280} height={120} fill="#1a1a2e" radius={12} />
    <ec-line x1={16} y1={80} x2={264} y2={80} stroke="#333366" strokeWidth={1} />
  </ec-canvas-background>

  <ec-canvas-content>
    <lvgl-label text="Canvas Card" />
  </ec-canvas-content>
</ec-canvas>
```

This renders a rounded dark card with a horizontal separator line, containing an LVGL label.

## Styling

`<ec-canvas>` supports the same `style` prop as regular LVGL widgets. Use it for layout (flexbox), sizing, padding, and positioning:

```tsx
<ec-canvas style={{
  width: 200,
  height: 100,
  display: 'flex',
  flexDirection: 'row',
  padding: 8,
}}>
  {/* ... */}
</ec-canvas>
```

## Event handlers

`<ec-canvas>` supports touch event triggers:

| Prop | Description |
|------|-------------|
| `onPress` | Fires when the canvas is pressed |
| `onRelease` | Fires when the canvas is released |
| `onClick` | Fires when the canvas is clicked |
| `onLongPress` | Fires when the canvas is long-pressed |

## Nesting

`<ec-canvas>` carries the `lvgl:widget` intent, so it can be placed anywhere a regular LVGL widget is accepted — inside `<lvgl-page>`, `<lvgl-obj>`, or any container widget:

```tsx
<lvgl-obj style={{ display: 'flex', flexDirection: 'row' }}>
  <ec-canvas style={{ width: 100, height: 60 }}>
    <ec-canvas-background>
      <ec-rect x={0} y={0} width={100} height={60} fill="#e53935" radius={8} />
    </ec-canvas-background>
    <ec-canvas-content>
      <lvgl-label text="Red" />
    </ec-canvas-content>
  </ec-canvas>

  <ec-canvas style={{ width: 100, height: 60 }}>
    <ec-canvas-background>
      <ec-rect x={0} y={0} width={100} height={60} fill="#1e88e5" radius={8} />
    </ec-canvas-background>
    <ec-canvas-content>
      <lvgl-label text="Blue" />
    </ec-canvas-content>
  </ec-canvas>
</lvgl-obj>
```

## Compilation

At build time, `<ec-canvas>` is lowered to a native ESPHome LVGL `canvas` widget:

- Paint primitives become `lvgl.canvas.draw_rectangle` and `lvgl.canvas.draw_line` actions
- The canvas buffer is allocated as ARGB8888 with transparent background
- Widget children are emitted as standard LVGL widget entries
- Reactive paint props generate C++ bindings that redraw on state changes
