# ESPCompose Language Support

Syntax highlighting for inline C++ inside ESPCompose `lambda` tagged template literals.

## Features

- C++ syntax highlighting inside `` lambda`...` `` tagged templates in `.ts` and `.tsx` files
- Proper handling of `${...}` template substitutions (highlighted as TypeScript)
- Recognition of ESPHome APIs (`id()`, `ESP_LOG*`), LVGL functions, C++ keywords, types, operators, strings, comments, and numeric literals

## Usage

Install the extension and open any ESPCompose project. Inline C++ in `lambda` tagged templates is highlighted automatically:

```tsx
import { lambda, useRef } from '@espcompose/core';

<binary_sensor
  platform="gpio" pin={4} name="Button"
  onPress={async () => {
    lambda`id(${lightRef}).turn_on().set_brightness(0.75).perform();`;
  }}
/>
```

## Requirements

- VS Code 1.75+
- Works alongside any TypeScript/TSX language support

## License

MIT — see the [ESPCompose repository](https://github.com/espcompose/espcompose) for details.
