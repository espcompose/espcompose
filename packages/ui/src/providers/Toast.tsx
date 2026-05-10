/**
 * Toast.Provider + useToast() — Context-based toast notification system.
 *
 * The Provider component owns the overlay machinery (via useTransientOverlay)
 * and exposes a `ToastController` through context. Consumer components call
 * `useToast()` to access the controller and trigger toasts with
 * `toast.show({ msg: 'Saved!' })`.
 *
 * The compiler processes this file in source-mode and automatically injects
 * `__scriptParamGlobals` metadata on the factory callback passed to
 * `useTransientOverlay`.
 */

import type { EspComposeElement, VisibilityController } from '@espcompose/core';
import { createElement, useTransientOverlay, createContext, useContext, createLvglContextProvider, useThemeSettings, useRef, useAnimation } from '@espcompose/core';
import { BottomToast as ToastWidget } from '../components/BottomToast';
import { TopRightToast } from '../components/TopRightToast';
import { Text } from '../components/Text';

// ────────────────────────────────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────────────────────────────────

/** Controller returned by `useToast()`. */
export type ToastController = VisibilityController<{ msg: string }>;

type ToastPayload = { msg: string };

export interface ToastProviderProps {
  /**
   * Duration before the toast auto-hides.
   *
   * - `string` — ESPHome duration literal (e.g. `'3s'`, `'500ms'`)
   * - `number` — milliseconds
   * - `false` — disable auto-hide (manual show/hide only)
   *
   * @default '3s'
   */
  autoHide?: string | number | false;

  /**
   * Maximum number of toasts visible simultaneously.
   * When `> 1`, active toasts compact downward with no gaps.
   *
   * @default 1
   */
  maxVisible?: number;

  /**
   * Behavior when `show()` is called while capacity is reached.
   * @default 'replace'
   */
  overflow?: 'replace' | 'queue' | 'drop';

  /**
   * Maximum number of queued show requests (only used with `overflow: 'queue'`).
   * @default 1
   */
  queueLength?: number;

  /**
   * Per-slot vertical offset in pixels used when `maxVisible > 1`.
   * Each active toast at slot rank `r` is shifted up by `r * slotHeight`
   * so multiple toasts stack from the bottom of the screen.
   *
   * @default 64
   */
  slotHeight?: number;

  /**
   * Toast layout variant.
   *
   * - `'bottom'` — full-width banner anchored to the bottom of the screen.
   *   Best for compact/medium displays.
   * - `'topRight'` — fixed-width card anchored to the top-right corner.
   *   Best for large/panel displays (Windows-notification style).
   *
   * When omitted, auto-selected based on display class from the nearest
   * `UITheme.Provider`'s settings: `large`/`panel` → `'topRight'`,
   * everything else → `'bottom'`.
   */
  variant?: 'bottom' | 'topRight';

  /** Child elements that can access `useToast()`. */
  children?: EspComposeElement | EspComposeElement[];
}

// ────────────────────────────────────────────────────────────────────────────
// Context
// ────────────────────────────────────────────────────────────────────────────

const ToastCtx = createContext<ToastController | null>(null);

// ────────────────────────────────────────────────────────────────────────────
// Provider
// ────────────────────────────────────────────────────────────────────────────

/**
 * Toast.Provider — declares a toast overlay region and exposes `useToast()`
 * to descendant components.
 *
 * @example
 * <Toast.Provider autoHide="3s" maxVisible={2}>
 *   <MyPage />
 * </Toast.Provider>
 */
export function ToastProvider(props: ToastProviderProps): EspComposeElement {
  const {
    autoHide = '3s',
    maxVisible = 1,
    overflow,
    queueLength,
    slotHeight = 64,
    variant: variantProp,
    children,
  } = props;

  // Resolve variant from display class when not explicitly provided.
  // useThemeSettings() returns the resolved settings from the nearest
  // UITheme.Provider — already computed, no resolution needed here.
  const settings = useThemeSettings();
  const variant: 'bottom' | 'topRight' = variantProp
    ?? (settings?.class === 'large' || settings?.class === 'panel' ? 'topRight' : 'bottom');

  const ctrl = useTransientOverlay<ToastPayload>(
    { zOrder: 100, maxVisible, autoHide, overflow, queueLength },
    (_ctrl, ctx) => {
      const cardRef = useRef();

      if (variant === 'topRight') {
        const slideIn = useAnimation(cardRef, {
          property: 'translateX',
          from: 300,
          to: 0,
          duration: '300ms',
          easing: 'ease-out',
        });
        const slideOut = useAnimation(cardRef, {
          property: 'translateX',
          from: 0,
          to: 300,
          duration: '300ms',
          easing: 'ease-in',
        });
        ctx.registerTransition({ enter: slideIn, exit: slideOut, exitDurationMs: 300 });

        return (
          <TopRightToast topOffset={ctx.slotRank * slotHeight} cardRef={cardRef}>
            <Text text={ctx.payload.msg} />
          </TopRightToast>
        );
      }

      const slideUp = useAnimation(cardRef, {
        property: 'translateY',
        from: 80,
        to: 0,
        duration: '300ms',
        easing: 'ease-out',
      });
      const slideDown = useAnimation(cardRef, {
        property: 'translateY',
        from: 0,
        to: 80,
        duration: '300ms',
        easing: 'ease-in',
      });
      ctx.registerTransition({ enter: slideUp, exit: slideDown, exitDurationMs: 300 });

      return (
        <ToastWidget bottomOffset={ctx.slotRank * slotHeight} cardRef={cardRef}>
          <Text text={ctx.payload.msg} />
        </ToastWidget>
      );
    },
  ) as unknown as ToastController;

  return createElement('context', { context: ToastCtx, value: ctrl }, children);
}

// ────────────────────────────────────────────────────────────────────────────
// Consumer hook
// ────────────────────────────────────────────────────────────────────────────

/**
 * Access the nearest `Toast.Provider`'s controller.
 *
 * @returns A `ToastController` with `.show({ msg })` and `.hide()`.
 * @throws If called outside a `<Toast.Provider>`.
 *
 * @example
 * const toast = useToast();
 * // In a trigger handler:
 * toast.show({ msg: 'Settings saved!' });
 */
export function useToast(): ToastController {
  const ctrl = useContext(ToastCtx);
  if (!ctrl) {
    throw new Error('useToast() must be used within a <Toast.Provider>.');
  }
  return ctrl;
}

// ────────────────────────────────────────────────────────────────────────────
// Namespace export
// ────────────────────────────────────────────────────────────────────────────

/**
 * Toast namespace — provides `Toast.Provider` for use in JSX.
 *
 * @example
 * <Toast.Provider autoHide="3s" maxVisible={2}>
 *   <MyPage />
 * </Toast.Provider>
 */
export const Toast = {
  Provider: createLvglContextProvider(ToastProvider),
};
