---
sidebar_label: Components
sidebar_position: 2
---

# Component Catalog

All components are imported from `@espcompose/ui`. They accept theme-driven design tokens and compile to LVGL widget trees.

## Layout Components

### Screen

Top-level page wrapper. Each `<Screen>` compiles to an `<lvgl-page>`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `padding` | `SpacingToken` | — | Inner padding |
| `skip` | `boolean` | `false` | Exclude from LVGL page cycling (useful for boot screens) |

```tsx
<Screen padding="lg">
  {/* Page content */}
</Screen>
```

### Space / VStack / HStack

Flexible layout container that arranges children with direction and gap. `VStack` and `HStack` are convenience wrappers.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `direction` | `'horizontal' \| 'vertical'` | `'vertical'` | Layout direction |
| `gap` | `SpacingToken` | — | Gap between children |
| `padding` | `SpacingToken` | — | Inner padding |
| `align` | `FlexAlign` | — | Main-axis alignment (`'start'`, `'center'`, `'end'`, `'spaceBetween'`, `'spaceAround'`, `'spaceEvenly'`) |
| `crossAlign` | `CrossAlign` | — | Cross-axis alignment (`'start'`, `'center'`, `'end'`, `'stretch'`) |
| `wrap` | `boolean` | — | Allow wrapping |

```tsx
<VStack gap="md" align="center">
  <Text text="Item 1" />
  <Text text="Item 2" />
</VStack>

<HStack align="spaceBetween" crossAlign="center">
  <Text text="Label" />
  <Switch />
</HStack>
```

### Row / Col

Grid-like horizontal layout inspired by Ant Design. `Row` wraps by default; `Col` uses proportional width via `flexGrow`.

| Row Props | Type | Default | Description |
|-----------|------|---------|-------------|
| `gutter` | `SpacingToken \| [SpacingToken, SpacingToken]` | — | Gap between columns (single or [horizontal, vertical]) |
| `justify` | `FlexAlign` | `'start'` | Horizontal alignment |
| `align` | `CrossAlign` | `'start'` | Vertical alignment |
| `wrap` | `boolean` | `true` | Allow wrapping |

| Col Props | Type | Default | Description |
|-----------|------|---------|-------------|
| `span` | `number` | `1` | Proportional width (flexGrow) |

```tsx
<Row gutter="md">
  <Col span={1}>
    <Text text="Left" />
  </Col>
  <Col span={2}>
    <Text text="Right (wider)" />
  </Col>
</Row>
```

### Grid / GridItem

Native CSS Grid layout with explicit columns and rows.

| Grid Props | Type | Default | Description |
|------------|------|---------|-------------|
| `columns` | `TrackSize[]` | *required* | Column definitions: `'fr(n)'`, `'content'`, or pixel number |
| `rows` | `TrackSize[]` | *required* | Row definitions |
| `columnGap` | `SpacingToken` | — | Gap between columns |
| `rowGap` | `SpacingToken` | — | Gap between rows |
| `gap` | `SpacingToken` | — | Shorthand for both gaps |

| GridItem Props | Type | Default | Description |
|----------------|------|---------|-------------|
| `col` | `number` | *required* | Column position (0-based) |
| `row` | `number` | *required* | Row position (0-based) |
| `colSpan` | `number` | `1` | Number of columns to span |
| `rowSpan` | `number` | `1` | Number of rows to span |

```tsx
<Grid columns={['fr(1)', 'fr(1)']} rows={['content', 'content']} gap="sm">
  <GridItem col={0} row={0}><Text text="Top Left" /></GridItem>
  <GridItem col={1} row={0}><Text text="Top Right" /></GridItem>
  <GridItem col={0} row={1} colSpan={2}><Text text="Full Width" /></GridItem>
</Grid>
```

### Card

Styled container with rounded corners and themed background.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `padding` | `SpacingToken` | `'md'` | Inner padding |
| `radius` | `RadiusToken` | `'md'` | Border radius |
| `gap` | `SpacingToken` | — | Gap between children |

```tsx
<Card padding="lg" radius="lg">
  <Text variant="subtitle" text="Settings" />
  <Slider min={0} max={100} />
</Card>
```

---

## Control Components

### Button

Interactive button with optional label. Supports solid and outline variants with semantic status colors.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | — | Button label text |
| `status` | `StatusToken` | `'primary'` | Color scheme: `'primary'`, `'secondary'`, `'success'`, `'warning'`, `'danger'` |
| `size` | `SizeToken` | `'md'` | Size preset: `'xs'`, `'sm'`, `'md'`, `'lg'`, `'xl'` |
| `variant` | `'solid' \| 'outline'` | `'solid'` | Visual style |
| `onPress` | `TriggerHandler` | — | Press event handler |

```tsx
<Button text="Save" status="success" size="lg" onPress={() => { /* save */ }} />
<Button text="Delete" status="danger" variant="outline" onPress={() => { /* delete */ }} />
```

### Slider

Horizontal slider control with themed track, indicator, and knob.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | — | Current value (reactive) |
| `min` | `number` | `0` | Minimum value |
| `max` | `number` | `100` | Maximum value |
| `onChange` | `TriggerHandler<{ x: number }>` | — | Value change handler |

```tsx
<Slider min={0} max={255} onChange={({ x }) => { brightness.set(x); }} />
```

### Switch

Toggle switch control with themed rail and knob.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `boolean` | — | Current state (reactive) |
| `onChange` | `TriggerHandler<{ x: boolean }>` | — | State change handler |

```tsx
<HStack align="spaceBetween" crossAlign="center">
  <Text text="Night Mode" />
  <Switch value={nightMode.value} onChange={({ x }) => { nightMode.set(x); }} />
</HStack>
```

### Dropdown

Dropdown selection control.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `string` | *required* | Newline-separated list of options |
| `value` | `unknown` | — | Selected value (reactive) |
| `onChange` | `TriggerHandler<{ x: number }>` | — | Selection change handler (index) |

```tsx
<Dropdown
  options={"Option A\nOption B\nOption C"}
  onChange={({ x }) => { selection.set(x); }}
/>
```

---

## Display Components

### Text

Semantic text display with theme-driven typography.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | — | Text content (reactive) |
| `variant` | `TextVariant` | `'body'` | Typography scale: `'title'`, `'subtitle'`, `'body'`, `'caption'` |
| `align` | `'left' \| 'center' \| 'right' \| 'auto'` | — | Text alignment |
| `color` | `StatusToken` | — | Override text color with a status color |
| `longMode` | `'WRAP' \| 'DOT' \| 'SCROLL' \| 'SCROLL_CIRCULAR' \| 'CLIP'` | — | Long text behavior |

```tsx
<Text variant="title" text="Dashboard" />
<Text variant="caption" text="Last updated: 5m ago" color="secondary" />
```

### SensorText

Text display automatically driven by a Home Assistant entity binding's `stateText`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `binding` | `SensorBinding \| BinarySensorBinding \| LightBinding` | *required* | Entity binding from `useHAEntity()` |
| `text` | `string` | — | Optional static prefix/label |
| `variant` | `TextVariant` | — | Typography scale |
| `color` | `StatusToken` | — | Override text color |

```tsx
const temp = useHAEntity('sensor.temperature');
<SensorText binding={temp} variant="title" />
```

### Image

Image display widget with size presets and optional border radius.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `Ref<ImageRef>` | *required* | Image ref from `useImage()` |
| `size` | `SizeToken` | — | Size preset |
| `radius` | `RadiusToken` | — | Border radius |
| `angle` | `number` | — | Rotation angle in degrees |
| `zoom` | `number` | — | Zoom factor |
| `antialias` | `boolean` | — | Enable anti-aliasing |

```tsx
const logo = useImage({ file: './assets/logo.png', type: 'RGB' });
<Image src={logo} size="lg" radius="md" />
```

### Spinner

Loading spinner with theme-driven colors.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `status` | `StatusToken` | `'primary'` | Color scheme |
| `size` | `SizeToken` | `'md'` | Size preset |
| `arcLength` | `number` | `60` | Arc length in degrees |
| `duration` | `number` | `1000` | Animation duration in milliseconds |

```tsx
<Spinner status="primary" size="lg" />
```

---

## Design Token Types

These token types are shared across all components:

| Token | Values |
|-------|--------|
| `SpacingToken` | `'none'`, `'xs'`, `'sm'`, `'md'`, `'lg'`, `'xl'` |
| `SizeToken` | `'xs'`, `'sm'`, `'md'`, `'lg'`, `'xl'` |
| `RadiusToken` | `'none'`, `'sm'`, `'md'`, `'lg'`, `'full'` |
| `StatusToken` | `'primary'`, `'secondary'`, `'success'`, `'warning'`, `'danger'` |
| `TextVariant` | `'title'`, `'subtitle'`, `'body'`, `'caption'` |

See [Theming](./theming.md) for how these tokens map to actual pixel values and colors.
