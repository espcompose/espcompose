---
sidebar_label: lambda
sidebar_position: 13
---

# lambda

Emits a raw C++ block inline within a trigger handler or script. The compiler recognises the `lambda` tagged template literal at the AST level and lowers it to an ESPHome `!lambda` action in the generated YAML. 

## Signature

```typescript
import { lambda } from '@espcompose/core';

lambda`<C++ statement(s)>`;
```

`lambda` is a tagged template literal — use it as a statement, not a function call.

## Basic usage

```tsx
import { lambda } from '@espcompose/core';

<binary_sensor
  platform="gpio" pin={4} name="Button"
  onPress={async () => {
    lambda`ESP_LOGD("app", "Button pressed!");`;
  }}
/>
```

Generated YAML:

```yaml
on_press:
  - lambda: !lambda 'ESP_LOGD("app", "Button pressed!");'
```

## Interpolations

Template interpolations are classified at compile time and lowered to the appropriate C++ expression.

### Component refs

Ref interpolations expand to just the bare component ID string — **no `id()` wrapper is injected**. Write `id(...)` yourself in the template literal:

```tsx
const lightRef = useRef<LightOutputRef>();

<binary_sensor
  platform="gpio" pin={12} name="Button B"
  onPress={async () => {
    lambda`id(${lightRef}).turn_on().set_brightness(0.75).perform();`;
  }}
  onRelease={async () => {
    lambda`id(${lightRef}).turn_off().perform();`;
  }}
/>
```

Generated YAML:

```yaml
on_press:
  - lambda: !lambda 'id(r_light0).turn_on().set_brightness(0.75).perform();'
on_release:
  - lambda: !lambda 'id(r_light0).turn_off().perform();'
```

### Globals

Global handle interpolations also expand to the bare global ID — **no `id()` wrapper is injected**. Write `id(...)` yourself:

```tsx
const counter = useGlobal('integer', { initialValue: 0 });

<binary_sensor
  platform="gpio" pin={4} name="Button"
  onPress={async () => {
    lambda`id(${counter})++;`;
  }}
/>
```

### Trigger variables

Use `args.<name>` to access trigger-provided variables (e.g. `args.x`, `args.value`):

```tsx
<rotary_encoder
  platform="..." pinA={18} pinB={19} name="Encoder"
  onValue={async (args) => {
    lambda`ESP_LOGI("app", "Encoder value: %d", ${args.x});`;
  }}
/>
```

### Literals

Numeric, string, and boolean literals are inlined directly:

```tsx
onPress={async () => {
  lambda`ESP_LOGI("app", "Value is %d", ${42});`;
}}
```

Generated: `ESP_LOGI("app", "Value is %d", 42);`

## Supported interpolation types

| Interpolation | C++ output |
|---------------|-----------|
| Component ref (`${myRef}`) | `componentId` (bare ID — write `id(${myRef})` in the template) |
| Global handle (`${myGlobal}`) | `globalId` (bare ID — write `id(${myGlobal})` in the template) |
| Trigger variable (`${args.x}`) | `x` (variable name) |
| Number literal (`${42}`) | `42` |
| String literal (`${"hello"}`) | `"hello"` |
| Boolean literal (`${true}`) | `true` |

Anything else (non-literal expressions, computed values) is a compile error.

## LVGL trigger variables

Standard LVGL trigger variables (`event`, `obj`, `x`, `y`, etc.) are already in scope in the generated C++ lambda — they do not need to be interpolated:

```tsx
onClicked={async () => {
  // 'obj' is the clicked widget — available by name, no interpolation needed
  lambda`lv_obj_set_pos(obj, 100, 200);`;
}}
```

## Using lambda inside scripts

`lambda` works inside `useScript` bodies the same way as in inline handlers:

```tsx
const flashLog = useScript(async () => {
  lambda`ESP_LOGD("app", "Script running");`;
  await delay(500);
  lambda`ESP_LOGD("app", "Script done");`;
});
```

## ESLint

The ESPCompose ESLint preset enables `allowTaggedTemplates` for the `no-unused-expressions` rule so that `` lambda`...` `` statements are not flagged as unused expressions.

## VS Code syntax highlighting

Install the [**ESPCompose Language Support**](https://marketplace.visualstudio.com/items?itemName=ESPCompose.espcompose-vscode) VS Code extension to get C++ syntax highlighting inside `` lambda`...` `` tagged template literals. ESPHome APIs (`id()`, `ESP_LOG*`), LVGL functions, C++ keywords, types, operators, strings, and comments are all highlighted. Template substitutions (`${...}`) are highlighted as TypeScript.

The extension injects a TextMate grammar into `.ts` and `.tsx` files — no configuration needed after install.

## Restrictions

- `lambda` can only be called inside trigger handler bodies or `useScript` bodies.
- Only literal, ref, global, and trigger-variable interpolations are allowed. Arbitrary expressions are rejected at compile time.
- `lambda` is a no-op at runtime — do not rely on it for any JavaScript logic.
