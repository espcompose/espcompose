/**
 * PageNav — a horizontal row of navigation buttons for switching between pages.
 *
 * Tracks the active page via LVGL page `onLoad` lifecycle triggers and
 * applies theme-driven active/inactive styling to each button.
 *
 * Uses `useAttachedTrigger` to listen for page load events on each referenced
 * page, updating a global active-index variable. The closure capture mechanism
 * (`expr:closure_read`) enables per-iteration index values in the handlers.
 *
 * @example
 * const home = useRef();
 * const settings = useRef();
 *
 * <PageNav items={[
 *   { id: 'home', label: 'Home', page: home },
 *   { id: 'settings', label: 'Settings', page: settings },
 * ]} />
 */

import type { Ref, WidgetProps, Reactive } from '@espcompose/core';
import type { HexColor } from '@espcompose/core';
import { createLvglWidget, useGlobal, useAttachedTrigger, useMemo, useLvgl } from '@espcompose/core';
import { useSpacing } from '../hooks';
import { UITheme } from '../theme/theme';
import type { SpacingToken } from '../theme/types';

// ────────────────────────────────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────────────────────────────────

export interface PageNavItem {
  /** Unique identifier for this nav item. */
  id: string;
  /** Display label for the button. */
  label: string;
  /** Ref to the LVGL page this item navigates to. */
  page: Ref;
}

export type PageNavProps = WidgetProps<{
  /** Navigation items — one button per item. */
  items: PageNavItem[];
  /** Index of the initially active page (0-based). Default: 0. */
  initialIndex?: number;
  /** Gap between nav buttons. Default: 'sm'. */
  gap?: SpacingToken;
}, 'items' | 'initialIndex'>;

// ────────────────────────────────────────────────────────────────────────────
// Internal button component
// ────────────────────────────────────────────────────────────────────────────

interface NavButtonProps {
  page: Ref;
  label: string;
  bgColor: Reactive<HexColor>;
  textColor: Reactive<HexColor>;
  pressedBg: Reactive<HexColor>;
}

const NavButton = createLvglWidget<NavButtonProps>(
  (props) => {
    const lvgl = useLvgl();
    return (
      <lvgl-button
        style={{
          backgroundColor: props.bgColor,
          backgroundOpacity: 'opaque',
          height: 36,
          borderRadius: 4,
          flexGrow: 1,
          pressed: {
            backgroundOpacity: 'opaque',
            backgroundColor: props.pressedBg,
          },
        }}
        onPress={() => {
          lvgl.pageShow({ id: props.page });
        }}
      >
        <lvgl-label
          text={props.label}
          style={{
            color: props.textColor,
            textAlign: 'center',
            placeSelf: 'center',
          }}
        />
      </lvgl-button>
    );
  },
  { allowedChildIntents: undefined },
);

// ────────────────────────────────────────────────────────────────────────────
// Component
// ────────────────────────────────────────────────────────────────────────────

export const PageNav = createLvglWidget<PageNavProps>(
  (props) => {
    const theme = UITheme.use();
    const gap = useSpacing(props.gap ?? 'sm');
    const activeIndex = useGlobal('integer', { initialValue: props.initialIndex ?? 0 });

    // Attach onLoad triggers to each page to track the active index.
    // The loop index `i` is captured via expr:closure_read and resolved
    // to a literal at contribution registration time.
    for (let i = 0; i < props.items.length; i++) {
      const item = props.items[i];
      useAttachedTrigger(item.page, 'onLoad', () => {
        activeIndex.set(i);
      });
    }

    // Build button elements
    const buttons = props.items.map((item, i) => {
      const isActive = useMemo(() => activeIndex.value === i);

      const bgColor = useMemo(() =>
        isActive ? theme?.colors?.primary?.bg : theme?.colors?.surface,
      );
      const textColor = useMemo(() =>
        isActive ? theme?.colors?.primary?.text : theme?.colors?.textPrimary,
      );

      return (
        <NavButton
          page={item.page}
          label={item.label}
          bgColor={bgColor}
          textColor={textColor}
          pressedBg={theme?.colors?.primary?.bgPressed}
        />
      );
    });

    return (
      <lvgl-obj
        style={{
          width: props.style?.width ?? '100%',
          height: props.style?.height ?? 'fit-content',
          flexDirection: 'row',
          columnGap: gap,
          padding: 4,
          backgroundOpacity: props.style?.backgroundOpacity ?? 'transparent',
          borderWidth: props.style?.borderWidth ?? 0,
          ...props.style
        }}
      >
        {buttons}
      </lvgl-obj>
    );
  },
  { allowedChildIntents: undefined },
);
