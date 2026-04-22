/**
 * Screen component — top-level page wrapper.
 *
 * Compiles to <lvgl-page> with background from the `ds-bg` style definition.
 */

import type { WidgetPropsWithChildren } from '@espcompose/core';
import { createLvglWidget, LVGL_INTENTS } from '@espcompose/core';
import { useSpacing } from '../hooks';
import type { SpacingToken } from '../theme/types';
import { UITheme } from '../theme/theme';

type ScreenProps = WidgetPropsWithChildren<{
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
export const Screen = createLvglWidget(
  (props: ScreenProps) => {
    const padding = props.padding != null ? useSpacing(props.padding) : undefined;
    const theme = UITheme.use();
    const bgColor = props.style?.backgroundColor ?? theme?.colors?.background;

    return (
      <lvgl-page
        skip={props.skip}
        style={{
          backgroundColor: bgColor,
          backgroundOpacity: 'opaque',
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
