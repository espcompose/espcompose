---
description: "Use when working on base-level UI design system components (Label, Button, Slider, Switch, Checkbox, etc.) or theme styling for UI components."
applyTo:
  - "packages/ui/src/components/**"
  - "packages/ui/src/theme/**"
---

# ESPCompose UI Design System — Component Principles

These components are built on top of LVGL widgets, but they are **not** intended to be literal 1:1 prop mirrors of LVGL. They are **opinionated, theme-aware, semantic wrappers** that provide a simpler and more consistent API for UI authors.

## Core principle

ESPCompose design-system components should preserve the **behavioral truth** of the underlying LVGL widget while exposing a **smaller, opinionated, theme-driven API**.

Do not treat these components as raw LVGL bindings.

## What to preserve

Even though the public API is simplified, the implementation must still respect the important native widget semantics, including:

- sizing behavior
- orientation behavior
- state behavior
- structural parts/subregions where relevant
- interaction behavior
- layout-related behavior

A design-system wrapper may simplify configuration, but it must not misrepresent how the underlying widget actually behaves.

## What to simplify

The public component API should expose design-system concepts, not every low-level LVGL style/property.

Prefer exposing:
- semantic variants
- theme roles
- size categories
- orientation
- stateful behavior
- common high-value options

Avoid exposing:
- arbitrary raw LVGL style properties
- per-part low-level visual controls by default
- direct one-to-one mappings for every native property
- APIs that force application authors to think in LVGL internals

For example, a Slider component may expose semantic theme-driven concepts like:
- variant
- tone
- size
- disabled
- orientation
- value range

But should usually not expose raw controls like:
- knob background color
- indicator border width
- part padding overrides
- raw part radius properties

Those details should generally be controlled by the theme and internal component implementation.

## Theme-driven styling

The design system should own visual decisions through theme tokens and semantic roles.

Theme values should map internally to the correct LVGL widget parts and states.

For example:
- slider track styling may map to the LVGL main part
- slider active fill styling may map to the indicator part
- slider handle styling may map to the knob part

However, these LVGL internals do not need to be surfaced directly as public component props unless there is a deliberate advanced escape hatch.

## Source of truth

The component should present a clean, semantic, opinionated design-system interface while behaving like the underlying LVGL widget in the ways that matter.

## Component creation factories

All UI design system components — including internal helpers — **must** use the widget factory functions from `@espcompose/core`. Never use plain function components.

- **Leaf widgets** (no children): use `createLvglWidget<P>(fn)` with `WidgetProps<T>`
- **Container widgets** (accept children): use `createLvglContainerWidget(fn)` with `WidgetPropsWithChildren<T>`

`createLvglContainerWidget` automatically sets `allowedChildIntents: [WIDGET]` and `contextTransparent: true`.

### Props types

- `WidgetProps<T>` auto-wraps each design-system prop in `Reactive<T>` and adds `style?: CssStyleProps`.
- `WidgetPropsWithChildren<T>` extends `WidgetProps` with `children?: EspComposeElement | EspComposeElement[]`.
- Use the 2nd type param `Skip` on either type to exclude passthrough props from `Reactive` wrapping (e.g. native LVGL attrs like `angle`, `zoom`).

### Example

```tsx
// Leaf widget (no children)
type SliderProps = WidgetProps<{ value?: number; min?: number; max?: number }>;
export const Slider = createLvglWidget<SliderProps>((props) => {
  return <lvgl-slider … />;
});

// Container widget (accepts children)
type CardProps = WidgetPropsWithChildren<{ padding?: SpacingToken }>;
export const Card = createLvglContainerWidget((props: CardProps) => {
  return <lvgl-obj …>{props.children}</lvgl-obj>;
});
```

Do not confuse these.

It is acceptable for the public props to differ significantly from raw LVGL props.
It is not acceptable for the component's behavior to diverge from real LVGL semantics without explicit documentation.

## Practical implementation guidance

When building a base-level design-system component:

1. Identify the underlying LVGL widget.
2. Understand its real behavior:
   - sizing
   - parts
   - states
   - interaction model
3. Decide which concepts belong in the public design-system API.
4. Keep low-level styling details theme-owned unless there is a strong reason to expose them.
5. Internally map theme semantics to the correct LVGL parts/states.
6. Avoid exposing raw LVGL complexity unless needed for a deliberate advanced API.

## API design rule

Public props should answer:
- what does the application author mean?

Internal implementation should answer:
- how does this map truthfully onto LVGL?

Do not force app authors to think in LVGL style internals unless absolutely necessary.

## Final rule

Base-level ESPCompose components are:
- semantically curated
- theme-driven
- behaviorally faithful
- not raw LVGL prop mirrors

Hide LVGL complexity in the public API where appropriate.
Do not hide LVGL truth in the implementation.
