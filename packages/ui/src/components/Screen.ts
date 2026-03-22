/**
 * Screen component — top-level page wrapper.
 *
 * Compiles to <lvgl-page> with theme background color and optional padding.
 */

import type { EspComposeElement } from '@esphome/compose';
import { createIntentComponent, LVGL_INTENTS } from '@esphome/compose';
import { resolveSpacing } from '../theme/resolvers';
import type { SpacingToken } from '../theme/types';
import { useTheme } from '../theme/context';

interface ScreenProps {
  children?: EspComposeElement | EspComposeElement[];
  /** Padding around the page content. Token name or pixel value. */
  padding?: SpacingToken | number;
  /** Skip this page in the page list. */
  skip?: boolean;
  /** Background color override (hex). If omitted, uses theme background. */
  bgColor?: string;
  /** Border width in pixels. Default: 0. */
  borderWidth?: number;
  /** Border color (hex). */
  borderColor?: string;
}

/**
 * Screen — a top-level LVGL page container.
 *
 * Applies the active theme's background color by default.
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
    const theme = useTheme();
    const bgColor = props.bgColor ?? theme.colors.background;

    return {
      type: 'lvgl-page',
      props: {
        bgColor,
        borderWidth: props.borderWidth ?? 0,
        ...(props.borderColor != null ? { borderColor: props.borderColor } : {}),
        ...(padding != null ? { padAll: padding } : {}),
        ...(props.skip != null ? { skip: props.skip } : {}),
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
