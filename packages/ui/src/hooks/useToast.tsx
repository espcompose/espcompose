/**
 * useToast — Toast overlay with configurable auto-hide, queue, and compacted stacking.
 *
 * Toasts are rendered above popups but below system-critical overlays
 * (z-order tier 100). Delegates queue mechanics to `useTransientOverlay()`
 * from core — this hook owns toast-specific defaults and visual wrapping.
 *
 * Users provide content only; the `<Toast>` wrapper with compacted
 * positioning is handled internally. For multi-slot toasts, active slots
 * compact downward so there are no visual gaps when a middle slot hides.
 *
 * Third-party UI libraries that need different visuals should use
 * `useTransientOverlay()` directly with their own container component.
 */

import { useTransientOverlay } from '@espcompose/core';
import type { OverlayController, VisibilityController, EspComposeElement } from '@espcompose/core';
import { Toast } from '../components/Toast';

/**
 * Factory for toast content. Receives the overlay controller for
 * manual show/hide from within the toast content if needed.
 *
 * Users provide only the content — the `<Toast>` container wrapper
 * is added internally by `useToast()`.
 */
export type ToastFactory = (
  ctrl: OverlayController,
) => EspComposeElement | EspComposeElement[];

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

  /**
   * Maximum number of toasts visible simultaneously.
   *
   * When `> 1`, active toasts are compacted downward so there are no
   * visual gaps when intermediate slots dismiss.
   *
   * @default 1
   */
  maxVisible?: number;

  /**
   * Behavior when `show()` is called while toast capacity is reached.
   *
   * - `'replace'` — replaces the current toast (resets auto-hide timer).
   *   With `maxVisible > 1`, dispatches to the first inactive slot.
   * - `'queue'` — queues the request; plays after a slot frees up.
   *   Backed by ESPHome script `mode: queued` with `max_runs: queueLength`.
   * - `'drop'` — silently ignores the request while all slots are active.
   *
   * @default 'replace'
   */
  overflow?: 'replace' | 'queue' | 'drop';

  /**
   * Maximum number of queued show requests. Only used when `overflow`
   * is `'queue'`. Maps to ESPHome `max_runs`.
   *
   * @default 1
   */
  queueLength?: number;
}

/**
 * Controller returned by `useToast()`.
 *
 * Provides `show()` and `hide()` methods. When `autoHide` is active,
 * `show()` triggers the lifecycle script (show → delay → hide) and
 * `hide()` stops the script and hides the overlay immediately.
 */
export type ToastController = VisibilityController;

/** Default auto-hide duration. */
const DEFAULT_AUTO_HIDE = '3s';

/** Vertical height per toast slot in pixels. */
const SLOT_HEIGHT = 60;

/**
 * Create a toast overlay (z-order 100) with optional auto-hide and queue.
 *
 * Content is automatically wrapped in a themed `<Toast>` container.
 * For multi-slot toasts, active slots compact downward with no gaps.
 *
 * @param factory  Render callback `(ctrl) => <Text text="..." />`
 * @param opts     Toast options. `autoHide` defaults to `'3s'`.
 * @returns        A `ToastController` with `.show()` / `.hide()`.
 *
 * @example
 * // Auto-hides after 3s (default), replace on re-trigger
 * const toast = useToast(() => <Text text="Saved!" />);
 *
 * @example
 * // Queue up to 5 toasts (single-slot, one at a time)
 * const toast = useToast(() => <Text text="Queued!" />, {
 *   overflow: 'queue',
 *   queueLength: 5,
 * });
 *
 * @example
 * // 3 simultaneous toast slots — compacted automatically
 * const toast = useToast(() => <Text text="Stacked!" />, { maxVisible: 3 });
 *
 * @example
 * // 3 slots + queue overflow
 * const toast = useToast(() => <Text text="Queued stack!" />, {
 *   maxVisible: 3,
 *   overflow: 'queue',
 *   queueLength: 10,
 * });
 */
export function useToast(factory: ToastFactory, opts?: ToastOptions): ToastController {
  const maxVisible = opts?.maxVisible ?? 1;

  return useTransientOverlay(
    {
      zOrder: 100,
      maxVisible,
      autoHide: opts?.autoHide ?? DEFAULT_AUTO_HIDE,
      overflow: opts?.overflow,
      queueLength: opts?.queueLength,
    },
    (ctrl, ctx) => {
      const content = factory(ctrl);

      if (maxVisible <= 1) {
        return <Toast>{content}</Toast>;
      }

      return <Toast bottomOffset={ctx.slotRank * SLOT_HEIGHT}>{content}</Toast>;
    },
  );
}
