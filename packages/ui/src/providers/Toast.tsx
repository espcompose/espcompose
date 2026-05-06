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

import type { EspComposeElement, VisibilityController, Signal } from '@espcompose/core';
import { createElement, useTransientOverlay, createContext, useContext, createLvglWidget } from '@espcompose/core';
import type { TransientOverlayContext } from '@espcompose/core';
import { Toast as ToastWidget } from '../components/Toast';
import { Text } from '../components/Text';

// ────────────────────────────────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────────────────────────────────

/** Controller returned by `useToast()`. */
export type ToastController = VisibilityController<{ msg: string }>;

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
    children,
  } = props;

  const ctrl = useTransientOverlay(
    { zOrder: 100, maxVisible, autoHide, overflow, queueLength },
    (overlayCtrl: unknown, ctx: TransientOverlayContext & { msg: Signal<string> }) => {
      return (
        <ToastWidget bottomOffset={ctx.slotRank * slotHeight}>
          <Text text={ctx.msg} />
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
  Provider: createLvglWidget(ToastProvider, {
    allowedChildIntents: undefined,
    contextTransparent: true as const,
  }),
};
