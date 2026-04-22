---
sidebar_label: "createLvgl* Helpers"
sidebar_position: 10
---

# LVGL Widget Factories

ESPCompose provides three factory functions for creating LVGL widget components. These factories ensure the compiler can validate parent-child relationships at build time.

## createLvglWidget

Creates a leaf LVGL widget — a component that renders an LVGL element and does not accept children by default.

```typescript
import { createLvglWidget } from '@espcompose/core';
import type { WidgetProps } from '@espcompose/core';

type MyWidgetProps = WidgetProps<{
  value?: boolean;
  size?: 'sm' | 'md' | 'lg';
}>;

const MyWidget = createLvglWidget<MyWidgetProps>((props) => {
  return <lvgl-switch checked={props.value} />;
});
```

### With overrides

Pass an optional second argument to customize child acceptance and context behavior:

```typescript
import { createLvglWidget } from '@espcompose/core';

const CustomWidget = createLvglWidget(
  (props: MyProps) => <lvgl-obj>{props.children}</lvgl-obj>,
  {
    allowChildren: true,         // Accept child widgets
    contextTransparent: true,    // Pass context through to descendants
  },
);
```

## createLvglContainerWidget

Creates a container widget that accepts child widgets and is context-transparent. Use this for layout wrappers, cards, panels, etc.

```typescript
import { createLvglContainerWidget } from '@espcompose/core';
import type { WidgetPropsWithChildren } from '@espcompose/core';

type CardProps = WidgetPropsWithChildren<{
  padding?: 'sm' | 'md' | 'lg';
}>;

const Card = createLvglContainerWidget((props: CardProps) => {
  return (
    <lvgl-obj style={{ padding: props.padding === 'lg' ? 24 : 16 }}>
      {props.children}
    </lvgl-obj>
  );
});
```

Fixed behavior (not overridable):
- Accepts LVGL widget children
- Context-transparent (passes context through to descendants)

## createLvglLayoutWidget

Creates a paired layout parent + child, returned as a tuple. The parent only accepts children with the specified slot intent, and the child declares that slot intent.

```typescript
import { createLvglLayoutWidget } from '@espcompose/core';

const [Row, Col] = createLvglLayoutWidget(
  'my-ui:col',                              // Slot identifier
  (props: RowProps) => { /* parent */ },     // Parent component
  (props: ColProps) => { /* child */ },      // Child component
);

// Usage:
<Row>
  <Col span={1}>Left</Col>
  <Col span={2}>Right</Col>
</Row>
```

The parent only accepts `Col` children, and `Col` can only be placed inside a `Row`. The compiler enforces these constraints at build time.

## WidgetProps vs WidgetPropsWithChildren

### WidgetProps\<T\>

For leaf widgets (no children). Auto-wraps each prop in `Reactive<T>` so props can accept both static values and reactive signals:

```typescript
type SliderProps = WidgetProps<{
  value?: number;    // Accepts number | IRReactiveNode<number>
  min?: number;
  max?: number;
}>;
```

All `WidgetProps` also include `style?: CssStyleProps` for visual overrides.

### WidgetPropsWithChildren\<T\>

Extends `WidgetProps` with a `children` prop:

```typescript
type PanelProps = WidgetPropsWithChildren<{
  title?: string;
}>;
// Includes: children?: EspComposeElement | EspComposeElement[]
```

### Skip reactive wrapping

Use the second type parameter to exclude specific props from `Reactive<T>` wrapping:

```typescript
// 'angle' and 'zoom' stay as plain numbers (not wrapped in Reactive)
type ImageProps = WidgetProps<{
  src: Ref<ImageRef>;
  angle?: number;
  zoom?: number;
}, 'angle' | 'zoom'>;
```

## Summary

| Factory | Children | Context Transparent | Use case |
|---------|----------|--------------------|----|
| `createLvglWidget` | No (by default) | No | Leaf controls: buttons, labels, sliders |
| `createLvglContainerWidget` | Yes (WIDGET) | Yes | Containers: cards, panels, groups |
| `createLvglLayoutWidget` | Slot-restricted | Yes | Paired layouts: Row/Col, Grid/GridItem |
