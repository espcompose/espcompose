/**
 * Screen component — top-level page wrapper.
 *
 * Compiles to <lvgl-page> with background from the `ds-bg` style definition.
 */

import type { EspComposeElement } from '@espcompose/core';
import { createIntentComponent, LVGL_INTENTS, useReactiveTheme } from '@espcompose/core';
import { resolveSpacing } from '../theme/resolvers';
import type { SpacingToken } from '../theme/types';

interface ScreenProps {
  children?: EspComposeElement | EspComposeElement[];
  /** Padding around the page content. Token name or pixel value. */
  padding?: SpacingToken | number;
  /** Skip this page in the page list. */
  skip?: boolean;
  /** Background color override (hex). If set, overrides the style definition. */
  backgroundColor?: string;
  /** Border width in pixels. Default: 0. */
  borderWidth?: number;
  /** Border color (hex). */
  borderColor?: string;
}

/**
 * Screen — a top-level LVGL page container.
 *
 * Applies the active theme's background color by default via style reference.
 *
 * @example
 * <Screen padding="lg">
 *   <VStack gap="md">
 *     <Text variant="title">Home</Text>
 *     <Button text="Toggle" />
 *   </VStack>
 * </Screen>
 */
export const Screen = createIntentComponent(
  (props: ScreenProps): EspComposeElement => {
    const padding = props.padding != null ? resolveSpacing(props.padding) : undefined;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const theme = useReactiveTheme() as any;
    const bgColor = props.backgroundColor ?? theme?.colors?.background;

    return (
      <lvgl-page
        skip={props.skip}
        style={{
          backgroundColor: bgColor,
          borderWidth: props.borderWidth ?? 0,
          ...(props.borderColor != null ? { borderColor: props.borderColor } : {}),
          ...(padding != null ? { padding: padding } : {}),
        }}
        x:custom={{ scrollbar_mode: 'OFF' }}
      >
        {props.children}
      </lvgl-page>
    );
  },
  {
    intents: [LVGL_INTENTS.WIDGET] as const,
    allowedChildIntents: [LVGL_INTENTS.WIDGET] as const,
  },
);
