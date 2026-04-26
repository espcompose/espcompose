/**
 * useToast — Toast overlay with optional auto-dismiss lifecycle.
 *
 * Toasts are rendered above popups but below system-critical overlays
 * (z-order tier 100). When `autoDismiss` is set (default: `'3s'`), the
 * hook generates an internal ESPHome script (`mode: restart`) that
 * sequences show → delay → dismiss. Re-triggering the same toast resets
 * the timer.
 *
 * The user focuses on content; the library manages lifecycle.
 */

import { useOverlay } from '@espcompose/core';
import type { OverlayController, OverlayFactory } from '@espcompose/core';
import {
  registerScript,
  irOverlayShow, irOverlayDismiss, irDelayAction,
} from '@espcompose/core/internals';
import type { IRActionNode } from '@espcompose/core/internals';

/** Factory function that receives a ToastController and returns JSX. */
export type ToastFactory = OverlayFactory;

/**
 * Options for `useToast()`.
 */
export interface ToastOptions {
  /**
   * Duration before the toast auto-dismisses.
   *
   * - `string` — ESPHome duration literal (e.g. `'3s'`, `'500ms'`, `'1min'`)
   * - `number` — milliseconds (converted to `'{n}ms'`)
   * - `false` — disable auto-dismiss (manual `show()`/`dismiss()` only)
   *
   * @default '3s'
   */
  autoDismiss?: string | number | false;
}

/**
 * Controller returned by `useToast()`.
 *
 * Identical to `OverlayController` from the user's perspective.
 * When `autoDismiss` is active, `show()` triggers the lifecycle script
 * (show → delay → dismiss) and `dismiss()` stops the script and hides
 * the overlay immediately.
 */
export type ToastController = OverlayController;

/** Default auto-dismiss duration. */
const DEFAULT_AUTO_DISMISS = '3s';

/**
 * Normalize a duration value to an ESPHome duration string.
 */
function normalizeDuration(value: string | number): string {
  if (typeof value === 'number') {
    return `${value}ms`;
  }
  return value;
}

/**
 * Create a toast overlay (z-order 100) with optional auto-dismiss.
 *
 * @param factory  Render callback `(ctrl) => <Toast>…</Toast>`
 * @param opts     Toast options. `autoDismiss` defaults to `'3s'`.
 * @returns        A `ToastController` with `.show()` / `.dismiss()`.
 *
 * @example
 * // Auto-dismisses after 3s (default)
 * const toast = useToast(() => (
 *   <Toast><Text text="Saved!" /></Toast>
 * ));
 *
 * @example
 * // Custom timeout
 * const toast = useToast(() => (
 *   <Toast><Text text="Error!" /></Toast>
 * ), { autoDismiss: '5s' });
 *
 * @example
 * // Manual dismiss only
 * const toast = useToast(() => (
 *   <Toast><Text text="Loading..." /></Toast>
 * ), { autoDismiss: false });
 */
export function useToast(factory: ToastFactory, opts?: ToastOptions): ToastController {
  const ctrl = useOverlay({ zOrder: 100 }, factory);

  const autoDismiss = opts?.autoDismiss ?? DEFAULT_AUTO_DISMISS;

  if (autoDismiss === false) {
    // No lifecycle script — behaves like the old useToast()
    return ctrl;
  }

  // Read overlay identity from the controller's internal fields.
  const { __templateKey, __instanceIndex, __zOrder } = ctrl as unknown as {
    __templateKey: string;
    __instanceIndex: number;
    __zOrder: number;
  };

  const duration = normalizeDuration(autoDismiss);
  const scriptId = `toast_lifecycle_${__templateKey}_${__instanceIndex}`;

  // Build the lifecycle action sequence: show → delay → dismiss
  const actions: IRActionNode[] = [
    irOverlayShow(__templateKey, __instanceIndex, __zOrder),
    irDelayAction(duration),
    irOverlayDismiss(__templateKey, __zOrder),
  ];

  // Register the script directly — this is framework-generated IR,
  // not user-authored TypeScript, so we bypass useScript().
  registerScript({
    id: scriptId,
    mode: 'restart',
    then: actions,
  });

  // Tag the controller so the ref resolver can route show() → script.execute
  // and dismiss() → [script.stop, overlay.dismiss].
  (ctrl as unknown as Record<string, unknown>).__lifecycleScriptId = scriptId;

  return ctrl;
}
