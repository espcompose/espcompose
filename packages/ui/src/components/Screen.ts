/**
 * Screen component — top-level page wrapper.
 *
 * Compiles to <lvgl-page> with background from the `ds-bg` style definition.
 */

import type { EspComposeElement } from '@esphome/compose';
import { createIntentComponent, LVGL_INTENTS } from '@esphome/compose';
import { resolveSpacing } from '../theme/resolvers';
import type { SpacingToken } from '../theme/types';
import { STYLE_BG } from '../theme/style-ids';

interface ScreenProps {
  children?: EspComposeElement | EspComposeElement[];
  /** Padding around the page content. Token name or pixel value. */
  padding?: SpacingToken | number;
  /** Skip this page in the page list. */
  skip?: boolean;
  /** Background color override (hex). If set, overrides the style definition. */
  bgColor?: string;
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

    return {
      type: 'lvgl-page',
      props: {
        styles: STYLE_BG,
        ...(props.bgColor != null ? { bgColor: props.bgColor } : {}),
        borderWidth: props.borderWidth ?? 0,
        ...(props.borderColor != null ? { borderColor: props.borderColor } : {}),
        ...(padding != null ? { padAll: padding } : {}),
        ...(props.skip != null ? { skip: props.skip } : {}),
        'x:custom': { scrollbar_mode: 'OFF' },
        ...(props.children
          ? { children: Array.isArray(props.children) ? props.children : [props.children] }
          : {}),
      },
    };
  },
  {
    intents: [LVGL_INTENTS.WIDGET] as const,
    allowedChildIntents: [LVGL_INTENTS.WIDGET] as const,
  },
);
