---
sidebar_label: Component Intents
sidebar_position: 1
---

# Component Intents

ESPCompose uses an **intent system** to validate the composition of components at build time. Every component declares what it *is* and what children it *accepts*. The compiler and ESLint enforce these constraints so invalid nesting is caught before code reaches the device.

## How it works

Each component carries two pieces of metadata:

| Metadata | Purpose |
|----------|---------|
| **Intents** | What the component *is* — determines where it can be placed |
| **Allowed child intents** | What children the component *accepts* |

A child is valid inside a parent when the child's intents overlap with the parent's allowed child intents.

### Built-in intent hierarchy

```
<esphome>                  accepts → esphome:component
  ├─ <wifi>, <api>, ...    is → esphome:component
  ├─ <lvgl>                is → esphome:component, accepts → lvgl:page, lvgl:widget
  │   ├─ <lvgl-page>       is → lvgl:page, accepts → lvgl:widget
  │   │   ├─ <lvgl-label>  is → lvgl:widget (leaf — no children)
  │   │   ├─ <lvgl-obj>    is → lvgl:widget, accepts → lvgl:widget
  │   │   └─ ...
```

### Validation example

```tsx
// ✅ Valid — <wifi> has intent 'esphome:component', <esphome> accepts it
<esphome>
  <wifi ssid="MyWifi" password="secret" />
</esphome>

// ✅ Valid — <lvgl-label> has intent 'lvgl:widget', <lvgl-page> accepts it
<lvgl-page>
  <lvgl-label text="Hello" />
</lvgl-page>

// ❌ Compile error — <lvgl-label> is 'lvgl:widget', <esphome> only accepts 'esphome:component'
<esphome>
  <lvgl-label text="Misplaced" />
</esphome>
```

## Factory functions handle intents for you

You never need to set intents manually. The factory functions assign the correct metadata automatically:

| Factory | Component intents | Accepted children |
|---------|------------------|-------------------|
| `createEspHomeComponent` | `esphome:component` | `esphome:component` |
| `createLvglWidget` | `lvgl:widget` | None (leaf) |
| `createLvglContainerWidget` | `lvgl:widget` | `lvgl:widget` |
| `createLvglLayoutWidget` | Custom slot pair | Slot-restricted |

See the [Helpers reference](../api/helpers/createLvglWidget.md) for usage details.

## Slot intents for layout pairs

`createLvglLayoutWidget` creates a custom slot intent that ties a parent and child together. For example, a `Row`/`Col` pair:

```tsx
import { createLvglLayoutWidget } from '@espcompose/core';

const [Row, Col] = createLvglLayoutWidget(
  'my-ui:col',
  (props: RowProps) => { /* parent renderer */ },
  (props: ColProps) => { /* child renderer */ },
);
```

- `Row` only accepts children with the `my-ui:col` slot
- `Col` only satisfies the `my-ui:col` slot
- Placing a `Col` outside a `Row`, or a non-`Col` widget inside `Row`, produces a compile error

## Context intents

Some components declare a **context** that propagates to all descendants. Children within that context must include the context intent. This is used for specialized rendering trees like the canvas system (`ec:canvas` context).

Components marked as **context-transparent** pass context through without consuming it — container and layout widgets use this so their children inherit the surrounding context.

## When you interact with intents

In typical usage, **you don't**. The system is entirely automatic:

1. Use `createEspHomeComponent`, `createLvglWidget`, `createLvglContainerWidget`, or `createLvglLayoutWidget` to create components
2. The ESLint rule `@espcompose/eslint/jsx-children-intents` flags invalid nesting in your editor
3. The compiler rejects invalid composition at build time

The intent system has no runtime cost — all validation happens at compile time and lint time.
