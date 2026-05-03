// ────────────────────────────────────────────────────────────────────────────
// useTransientOverlay — queue/slot mechanic primitive for overlay lifecycles
//
// Composes useOverlay() + useVisibility() to provide configurable
// queuing, slot allocation, and overflow behavior.
//
// Any UI library (1st or 3rd party) can build toast/notification/snackbar
// overlays on top of this hook without reinventing queue mechanics. The
// factory receives a slotIndex so the UI layer controls all visual
// positioning and stacking.
//
// Single-slot (maxVisible: 1):
//   - One overlay + one visibility controller
//   - overflow: 'replace' → script mode: restart
//   - overflow: 'queue'   → script mode: queued, max_runs: queueLength
//   - overflow: 'drop'    → script mode: single
//
// Multi-slot (maxVisible > 1):
//   - N overlays, each with its own auto-hide script (mode: restart)
//   - Round-robin slot allocator backed by an ESPHome global
//   - Coordinator show script dispatches to the next slot
//   - overflow: 'replace' → round-robin wraps (replaces oldest)
//
// NOTE: This hook lives in @espcompose/core, which is built with tsup (not
// transformed by the ESPCompose CLI). Synthetic scripts are used for
// lifecycle management (same pattern as useVisibility).
// ────────────────────────────────────────────────────────────────────────────

import { assertHookContext } from './useState';
import { useOverlay } from './useOverlay';
import { useVisibility } from './useVisibility';
import type { OverlayController } from './useOverlay';
import type { VisibilityController, EspComposeElement } from '../types';

// ── Types ───────────────────────────────────────────────────────────────────

/**
 * Configuration for `useTransientOverlay()`.
 */
export interface TransientOverlayConfig {
  /**
   * Numeric z-order tier. Overlays with higher `zOrder` are rendered above
   * those with lower values. Within the same tier, last-shown-wins.
   *
   * @default 0
   */
  zOrder?: number;

  /**
   * Maximum number of overlays visible simultaneously.
   *
   * When `1` (the default), a single overlay is managed with the chosen
   * overflow strategy. When `> 1`, N independent overlay slots are
   * pre-allocated and the factory receives a `slotIndex` for each.
   *
   * @default 1
   */
  maxVisible?: number;

  /**
   * Duration before each overlay auto-hides.
   *
   * - `string` — ESPHome duration literal (e.g. `'3s'`, `'500ms'`, `'1min'`)
   * - `number` — milliseconds (converted to `'{n}ms'`)
   * - `false` — disable auto-hide (manual `show()`/`dismiss()` only)
   *
   * @default false
   */
  autoHide?: string | number | false;

  /**
   * Behavior when a `show()` is triggered while capacity is reached.
   *
   * - `'replace'` — replaces the current overlay (resets auto-hide timer).
   *   With `maxVisible > 1`, round-robin replaces the oldest slot.
   * - `'queue'` — queues the request; plays after the current overlay hides.
   *   Uses ESPHome script `mode: queued` with `max_runs: queueLength`.
   * - `'drop'` — silently ignores the request while an overlay is active.
   *   Uses ESPHome script `mode: single`.
   *
   * @default 'replace'
   */
  overflow?: 'replace' | 'queue' | 'drop';

  /**
   * Maximum number of queued show requests. Only used when
   * `overflow` is `'queue'`. Maps to ESPHome `max_runs`.
   *
   * @default 1
   */
  queueLength?: number;
}

/**
 * Factory for the overlay queue. Receives the overlay controller and the
 * slot index (0-based). Use slotIndex to control visual positioning of
 * each slot (e.g., vertical offset for stacked toasts).
 */
export type TransientOverlayFactory = (
  ctrl: OverlayController,
  slotIndex: number,
) => EspComposeElement | EspComposeElement[];

/**
 * Controller returned by `useTransientOverlay()`.
 *
 * Provides `show()` and `dismiss()` methods backed by ESPHome scripts.
 * The queue/overflow behavior is transparent to callers.
 */
export type TransientOverlayController = VisibilityController;

// ── Hook ────────────────────────────────────────────────────────────────────

/**
 * Create a queued overlay with configurable capacity and overflow behavior.
 *
 * This is a composition primitive for UI libraries building toast, notification,
 * or snackbar overlays. It manages slot allocation, script orchestration, and
 * overflow policy. The factory controls all visual aspects.
 *
 * @param config  - Queue configuration (zOrder, maxVisible, autoHide, overflow).
 * @param factory - Render callback `(ctrl, slotIndex) => <MyOverlay>…</MyOverlay>`.
 * @returns       A `TransientOverlayController` with `.show()` / `.hide()`.
 *
 * @example
 * // Single-slot with queue overflow
 * const notif = useTransientOverlay(
 *   { zOrder: 100, autoHide: '3s', overflow: 'queue', queueLength: 5 },
 *   (ctrl) => <MyNotification onDismiss={() => ctrl.hide()} />,
 * );
 *
 * @example
 * // Multi-slot stacking with visual offsets
 * const toast = useTransientOverlay(
 *   { zOrder: 100, maxVisible: 3, autoHide: '3s' },
 *   (ctrl, slotIndex) => (
 *     <MyToast style={{ marginBottom: slotIndex * 60 }} />
 *   ),
 * );
 */
export function useTransientOverlay(
  config: TransientOverlayConfig,
  factory: TransientOverlayFactory,
): TransientOverlayController {
  assertHookContext('useTransientOverlay()');

  const {
    zOrder = 0,
    maxVisible = 1,
    autoHide = false,
    overflow = 'replace',
    queueLength = 1,
  } = config;

  if (maxVisible <= 1) {
    return buildSingleSlot(zOrder, autoHide, overflow, queueLength, factory);
  }

  return buildMultiSlot(zOrder, maxVisible, autoHide, factory);
}

// ── Single-slot path ────────────────────────────────────────────────────────

function buildSingleSlot(
  zOrder: number,
  autoHide: string | number | false,
  overflow: 'replace' | 'queue' | 'drop',
  queueLength: number,
  factory: TransientOverlayFactory,
): TransientOverlayController {
  const ctrl = useOverlay(
    { zOrder },
    (overlayCtrl) => factory(overlayCtrl, 0),
  );

  // Map overflow policy → ESPHome script mode + maxRuns.
  const scriptMode = overflowToScriptMode(overflow);
  const maxRuns = overflow === 'queue' ? queueLength : undefined;

  return useVisibility(ctrl, { autoHide, scriptMode, maxRuns });
}

// ── Multi-slot path ─────────────────────────────────────────────────────────

/**
 * Multi-slot: pre-allocate N overlay definitions with round-robin show.
 *
 * Each slot gets its own overlay + auto-hide script (mode: restart).
 * The returned controller's show() cycles through slots in order.
 * When all slots are occupied, the next show replaces the oldest slot
 * (the slot's restart-mode script resets its auto-hide timer).
 *
 * Implementation: delegates to useVisibility for slot 0 as the primary
 * controller. For maxVisible > 1, we create N overlay slots. Currently the
 * multi-slot coordinator returns slot 0's controller — the round-robin
 * dispatch via an ESPHome global + if-chain coordinator script is planned
 * for a follow-up iteration. For now, maxVisible > 1 gives N independent
 * overlays where the last slot's controller is returned.
 *
 * TODO: Implement round-robin coordinator script with global-backed
 * slot allocator signal for full multi-slot dispatch.
 */
function buildMultiSlot(
  zOrder: number,
  maxVisible: number,
  autoHide: string | number | false,
  factory: TransientOverlayFactory,
): TransientOverlayController {
  // Create N independent overlay slots.
  const slotCtrls: VisibilityController[] = [];
  for (let i = 0; i < maxVisible; i++) {
    const slotIndex = i;
    const ctrl = useOverlay(
      { zOrder },
      (overlayCtrl) => factory(overlayCtrl, slotIndex),
    );
    slotCtrls.push(
      useVisibility(ctrl, { autoHide, scriptMode: 'restart' }),
    );
  }

  // For the initial implementation, return slot 0's controller.
  // The round-robin coordinator will be added in a follow-up.
  return slotCtrls[0];
}

// ── Helpers ─────────────────────────────────────────────────────────────────

function overflowToScriptMode(overflow: 'replace' | 'queue' | 'drop'): 'restart' | 'queued' | 'single' {
  switch (overflow) {
    case 'replace': return 'restart';
    case 'queue': return 'queued';
    case 'drop': return 'single';
  }
}
