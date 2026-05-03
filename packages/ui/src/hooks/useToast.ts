/**
 * useToast — Toast overlay with optional auto-hide lifecycle.
 *
 * Toasts are rendered above popups but below system-critical overlays
 * (z-order tier 100). When `autoHide` is set (default: `'3s'`), the
 * hook generates an internal ESPHome script (`mode: restart`) that
 * sequences show → delay → hide. Re-triggering the same toast resets
 * the timer.
 *
 * The user focuses on content; the library manages lifecycle.
 */

import { useOverlay, useLvglVisibility } from '@espcompose/core';
import type { LvglVisibilityController, EspComposeElement } from '@espcompose/core';

export type ToastFactory = (ctrl: ToastController) => EspComposeElement | EspComposeElement[];

/**
 * Options for `useToast()`.
 */
export interface ToastOptions {
  /**
   * Duration before the toast auto-hides.
   *
   * - `string` — ESPHome duration literal (e.g. `'3s'`, `'500ms'`, `'1min'`)
   * - `number` — milliseconds (converted to `'{n}ms'`)
   * - `false` — disable auto-hide (manual `show()`/`hide()` only)
   *
   * @default '3s'
   */
  autoHide?: string | number | false;
}

/**
 * Controller returned by `useToast()`.
 *
 * Provides `show()` and `hide()` methods. When `autoHide` is active,
 * `show()` triggers the lifecycle script (show → delay → hide) and
 * `hide()` stops the script and hides the overlay immediately.
 */
export type ToastController = LvglVisibilityController;

/** Default auto-hide duration. */
const DEFAULT_AUTO_HIDE = '3s';

/**
 * Create a toast overlay (z-order 100) with optional auto-hide.
 *
 * @param factory  Render callback `(ctrl) => <Toast>…</Toast>`
 * @param opts     Toast options. `autoHide` defaults to `'3s'`.
 * @returns        A `ToastController` with `.show()` / `.hide()`.
 *
 * @example
 * // Auto-hides after 3s (default)
 * const toast = useToast(() => (
 *   <Toast><Text text="Saved!" /></Toast>
 * ));
 *
 * @example
 * // Custom timeout
 * const toast = useToast(() => (
 *   <Toast><Text text="Error!" /></Toast>
 * ), { autoHide: '5s' });
 *
 * @example
 * // Manual hide only
 * const toast = useToast(() => (
 *   <Toast><Text text="Loading..." /></Toast>
 * ), { autoHide: false });
 */
export function useToast(factory: ToastFactory, opts?: ToastOptions): ToastController {
  const ctrl = useOverlay({ zOrder: 100 }, factory);
  const autoHide = opts?.autoHide ?? DEFAULT_AUTO_HIDE;

  return useLvglVisibility(ctrl, {
    autoHide,
  });
}
