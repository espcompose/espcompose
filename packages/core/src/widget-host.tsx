/**
 * WidgetHost — sizing wrapper for design-system widgets.
 *
 * Wraps children in an `<lvgl-obj>` with configurable width, height, and
 * padding. Wireframe outlines are handled automatically by the factory
 * wrappers (`createLvglWidget`, `createLvglContainerWidget`, etc.) —
 * WidgetHost itself has no wireframe logic.
 *
 * Exported from `@espcompose/core` so that both first-party and third-party
 * UI libraries can use it.
 */

import type { WidgetPropsWithChildren } from './types';
import { createLvglContainerWidget } from './intents';

export const WidgetHost = createLvglContainerWidget(
  (props: WidgetPropsWithChildren) => {
    return (
      <lvgl-obj style={props.style}>
        {props.children}
      </lvgl-obj>
    );
  },
);
