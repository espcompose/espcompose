/**
 * Screen component — top-level page wrapper.
 *
 * Compiles to <lvgl-page> with background from the `ds-bg` style definition.
 */

import type { EspComposeElement, WidgetProps } from '@espcompose/core';
import { createWidgetComponent, LVGL_INTENTS, useReactiveTheme } from '@espcompose/core';
import { useSpacing } from '../theme/resolvers';
import type { SpacingToken } from '../theme/types';

type ScreenProps = WidgetProps<{
  children?: EspComposeElement | EspComposeElement[];
  /** Padding around the page content. Token name. */
  padding?: SpacingToken;
  /** Skip this page in the page list. */
  skip?: boolean;
}, 'skip'>;

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
export const Screen = createWidgetComponent(
  (props: ScreenProps): EspComposeElement => {
    const padding = props.padding != null ? useSpacing(props.padding) : undefined;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const theme = useReactiveTheme() as any;
    const bgColor = props.style?.backgroundColor ?? theme?.colors?.background;

    return (
      <lvgl-page
        skip={props.skip}
        style={{
          backgroundColor: bgColor,
          borderWidth: props.style?.borderWidth ?? 0,
          ...(props.style?.borderColor != null ? { borderColor: props.style.borderColor } : {}),
          ...(padding != null ? { padding: padding } : {}),
          scrollbarMode: 'off',
        }}
      >
        {props.children}
      </lvgl-page>
    );
  },
  { allowedChildIntents: [LVGL_INTENTS.WIDGET] as const },
);
