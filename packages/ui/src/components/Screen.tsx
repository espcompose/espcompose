/**
 * Screen component — top-level page wrapper.
 *
 * Compiles to <lvgl-page> with background from the `ds-bg` style definition.
 */

import type { WidgetPropsWithChildren } from '@espcompose/core';
import { createLvglContainerWidget } from '@espcompose/core';
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
export const Screen = createLvglContainerWidget(
  (props: ScreenProps) => {
    const padding = props.padding != null ? useSpacing(props.padding) : undefined;
    const theme = UITheme.use();
    const bgColor = props.style?.backgroundColor ?? theme?.colors?.background;

    return (
      <lvgl-page
        skip={props.skip}
        style={{
          ...props.style,
          backgroundColor: bgColor,
          backgroundOpacity: props.style?.backgroundOpacity ?? 'opaque',
          borderWidth: props.style?.borderWidth ?? 0,
          ...(padding != null ? { padding: padding } : {}),
          scrollbarMode: props.style?.scrollbarMode ?? 'off',
        }}
      >
        {props.children}
      </lvgl-page>
    );
  }
);
