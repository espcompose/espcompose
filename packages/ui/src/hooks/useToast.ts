/**
 * useToast — Toast overlay with configurable auto-hide, queue, and stacking.
 *
 * Toasts are rendered above popups but below system-critical overlays
 * (z-order tier 100). Delegates queue mechanics to `useTransientOverlay()`
 * from core — this hook owns only the toast-specific defaults.
 *
 * The factory receives `(ctrl, slotIndex)` so the UI layer controls all
 * visual positioning. Third-party UI libraries should use
 * `useTransientOverlay()` directly if they need different defaults.
 */

import { useTransientOverlay } from '@espcompose/core';
import type { OverlayController, VisibilityController, EspComposeElement } from '@espcompose/core';

/**
 * Factory for toast content. Receives the overlay controller and a slot
 * index (0-based) for multi-slot stacking. Use slotIndex to control
 * vertical offset or other per-slot visual positioning.
 */
export type ToastFactory = (
  ctrl: OverlayController,
  slotIndex: number,
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
   * When `> 1`, the factory is called once per slot with a unique
   * `slotIndex`, allowing the UI to position each slot independently
   * (e.g., vertical offset for stacked toasts).
   *
   * @default 1
   */
  maxVisible?: number;

  /**
   * Behavior when `show()` is called while toast capacity is reached.
   *
   * - `'replace'` — replaces the current toast (resets auto-hide timer).
   *   With `maxVisible > 1`, round-robin replaces the oldest slot.
   * - `'queue'` — queues the request; plays after the current toast hides.
   *   Backed by ESPHome script `mode: queued` with `max_runs: queueLength`.
   * - `'drop'` — silently ignores the request while a toast is active.
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

/**
 * Create a toast overlay (z-order 100) with optional auto-hide and queue.
 *
 * Delegates to `useTransientOverlay()` from core for queue mechanics. The
 * UI library controls all visual concerns via the factory callback.
 *
 * @param factory  Render callback `(ctrl, slotIndex) => <Toast>…</Toast>`
 * @param opts     Toast options. `autoHide` defaults to `'3s'`.
 * @returns        A `ToastController` with `.show()` / `.hide()`.
 *
 * @example
 * // Auto-hides after 3s (default), replace on re-trigger
 * const toast = useToast(() => (
 *   <Toast><Text text="Saved!" /></Toast>
 * ));
 *
 * @example
 * // Queue up to 5 toasts (single-slot, one at a time)
 * const toast = useToast(() => (
 *   <Toast><Text text="Queued!" /></Toast>
 * ), { overflow: 'queue', queueLength: 5 });
 *
 * @example
 * // 3 simultaneous toast slots with vertical stacking
 * // Each slot offsets upward using bottomOffset
 * const toast = useToast((_ctrl, slotIndex) => (
 *   <Toast bottomOffset={slotIndex * 60}>
 *     <Text text="Stacked!" />
 *   </Toast>
 * ), { maxVisible: 3 });
 *
 * @example
 * // 3 slots + queue overflow: fills all slots, then queues
 * // additional calls until a slot frees up
 * const toast = useToast((_ctrl, slotIndex) => (
 *   <Toast bottomOffset={slotIndex * 60}>
 *     <Text text="Queued stack!" />
 *   </Toast>
 * ), { maxVisible: 3, overflow: 'queue', queueLength: 10 });
 */
export function useToast(factory: ToastFactory, opts?: ToastOptions): ToastController {
  return useTransientOverlay(
    {
      zOrder: 100,
      maxVisible: opts?.maxVisible,
      autoHide: opts?.autoHide ?? DEFAULT_AUTO_HIDE,
      overflow: opts?.overflow,
      queueLength: opts?.queueLength,
    },
    factory,
  );
}
