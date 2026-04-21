/**
 * Dropdown — a single LVGL dropdown widget.
 *
 * Compiles to `<lvgl-dropdown>`. This component is intentionally a bare
 * control: it renders only the dropdown itself. Compose it with layout
 * primitives (HStack/VStack) and a Text label if you need a labelled
 * field.
 */

import type { TriggerHandler, WidgetProps } from '@espcompose/core';
import { createLvglWidget } from '@espcompose/core';

export type DropdownProps = WidgetProps<{
  /** Newline-separated option values (ESPHome LVGL format). */
  options: string;
  /** Bound selection index. */
  value?: unknown;
  /** Change handler (ESPHome action). */
  onChange?: TriggerHandler<{ x: number }>;
}>;

/**
 * Dropdown — a themed LVGL dropdown.
 *
 * @example
 * <Dropdown options={"Auto\nCool\nHeat"} value={mode} onChange={({ x }) => …} />
 *
 * @example // labelled field
 * <VStack gap="xs">
 *   <Text>Mode</Text>
 *   <Dropdown options={"Auto\nCool\nHeat"} />
 * </VStack>
 */
export const Dropdown = createLvglWidget<DropdownProps>(
  (props) => {
    return (
        <lvgl-dropdown
          options={props.options}
          x:custom={{
            ...(props.value != null ? { selected: props.value } : {}),
            ...(props.onChange != null ? { on_change: props.onChange } : {}),
          }}
          style={{
            width: 'fit-content',
            height: 'fit-content',
            ...props.style,
          }}
        />
    );
  },
);
