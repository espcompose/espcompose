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
import { useVisibility, buildOverlayScriptPair } from './useVisibility';
import type { OverlayScriptPair } from './useVisibility';
import { useScript } from './useScript';
import { useController } from './useController';
import { useContext } from './useContext';
import { registerComponent } from './useReactiveScope';
import { generateDeterministicId } from '../id';
import { CLOSURE_INDEX } from '../actions';
import {
  globalScopeContext,
} from './global-shared';
import type { GlobalDefinition } from './global-shared';
import {
  OVERLAY_TEMPLATE_KEY,
  OVERLAY_Z_ORDER,
} from './useOverlay';
import {
  irIfAction,
  irGlobalSet,
  irScriptExecute,
  irScriptStop,
  irScriptWait,
  irOverlayHide,
  irLambdaCondition,
} from '../ir/action-types';
import type { IRActionNode } from '../ir/action-types';
import { irBinary, irLiteralExpression, irGroup } from '../ir/expr-builders';
import type { IRGlobalReadExpression } from '../ir/expr-types';
import { IR_INT } from '../ir/types';
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

  return buildMultiSlot(zOrder, maxVisible, autoHide, overflow, queueLength, factory);
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
 * Multi-slot: pre-allocate N overlay slots with a round-robin coordinator.
 *
 * Each slot gets its own overlay + auto-hide script pair (always mode: restart).
 * A coordinator script dispatches `show()` calls to the next slot in round-robin
 * order, backed by an ESPHome global integer counter.
 *
 * Overflow behavior governs the coordinator script's ESPHome mode:
 * - replace (restart): immediate round-robin dispatch, no waiting.
 * - queue (queued, max_runs): `script.wait` blocks until the target slot is
 *   free. Fills all N slots rapidly, then serializes behind blocking wait.
 * - drop (single): `script.wait` blocks on next slot. While blocked,
 *   mode: single drops additional calls.
 *
 * The coordinator's hide() stops all slot scripts, hides all overlays, and
 * resets the global counter to 0.
 */
function buildMultiSlot(
  zOrder: number,
  maxVisible: number,
  autoHide: string | number | false,
  overflow: 'replace' | 'queue' | 'drop',
  queueLength: number,
  factory: TransientOverlayFactory,
): TransientOverlayController {
  // ── 1. Create N overlay slots with per-slot script pairs ──────────────

  const slotOverlayCtrls: OverlayController[] = [];
  const slotScriptPairs: OverlayScriptPair[] = [];

  for (let i = 0; i < maxVisible; i++) {
    const ctrl = useOverlay(
      { zOrder },
      (overlayCtrl) => factory(overlayCtrl, i),
    );
    slotOverlayCtrls.push(ctrl);
    slotScriptPairs.push(buildOverlayScriptPair(ctrl, autoHide));
  }

  // ── 2. Register round-robin counter global ────────────────────────────

  // Derive a stable global ID from the first slot's overlay template key.
  const firstCtrl = slotOverlayCtrls[0] as unknown as { [k: symbol]: unknown };
  const firstTemplateKey = firstCtrl[OVERLAY_TEMPLATE_KEY as symbol] as string;
  const globalId = generateDeterministicId('g', `transient_rr_${firstTemplateKey}`);

  // Register in the reactive scope for YAML generation.
  registerComponent({
    kind: 'component',
    section: 'globals',
    id: globalId,
    config: { id: globalId, irType: IR_INT, initial_value: '0' },
  });

  // Register in the global scope context for action compiler symbol lookup.
  const scopeMap = useContext(globalScopeContext) as Map<string, GlobalDefinition> | undefined;
  if (scopeMap && !scopeMap.has(globalId)) {
    scopeMap.set(globalId, { id: globalId, irType: IR_INT });
  }

  // ── 3. Build coordinator show script ──────────────────────────────────

  const globalRead: IRGlobalReadExpression = {
    kind: 'expr:global_read',
    globalId,
    type: 'int',
  };

  const needsWait = overflow === 'queue' || overflow === 'drop';

  // Build if-chain: if counter==0 then [wait?, execute slot 0], else if ...
  const ifChain = buildDispatchIfChain(
    globalRead,
    slotScriptPairs,
    needsWait,
    maxVisible,
  );

  // Increment counter: (counter + 1) % maxVisible
  const incrementAction = irGlobalSet(
    globalId,
    IR_INT,
    irBinary(
      '%',
      irGroup(irBinary('+', globalRead, irLiteralExpression(1))),
      irLiteralExpression(maxVisible),
    ),
  );

  const coordinatorShowActions: IRActionNode[] = [ifChain, incrementAction];

  const coordinatorShowMode = overflowToScriptMode(overflow);
  const coordinatorShowOpts: { mode: 'restart' | 'queued' | 'single'; maxRuns?: number } = {
    mode: coordinatorShowMode,
  };
  if (coordinatorShowMode === 'queued' && queueLength > 0) {
    coordinatorShowOpts.maxRuns = queueLength;
  }

  const coordinatorShowScript = useScript(
    makeSyntheticScript(
      generateDeterministicId('scr', `transient_coord_show_${firstTemplateKey}`),
      coordinatorShowActions,
    ),
    coordinatorShowOpts,
  );

  // ── 4. Build coordinator hide script ──────────────────────────────────

  const hideActions: IRActionNode[] = [];
  for (let i = 0; i < maxVisible; i++) {
    // Stop the slot's show script (cancels auto-hide timer).
    hideActions.push(irScriptStop(slotScriptPairs[i].show.id));
    // Hide the overlay.
    const slotCtrl = slotOverlayCtrls[i] as unknown as { [k: symbol]: unknown };
    const templateKey = slotCtrl[OVERLAY_TEMPLATE_KEY as symbol] as string;
    const slotZOrder = slotCtrl[OVERLAY_Z_ORDER as symbol] as number;
    hideActions.push(irOverlayHide(templateKey, slotZOrder));
  }
  // Reset counter to 0.
  hideActions.push(irGlobalSet(globalId, IR_INT, irLiteralExpression(0)));

  const coordinatorHideScript = useScript(
    makeSyntheticScript(
      generateDeterministicId('scr', `transient_coord_hide_${firstTemplateKey}`),
      hideActions,
    ),
  );

  // ── 5. Return coordinator controller ──────────────────────────────────

  return useController<VisibilityController>({
    show: coordinatorShowScript,
    hide: coordinatorHideScript,
  });
}

// ── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Build a nested if/else chain that dispatches to the correct slot based
 * on the global counter value.
 *
 * Produces: if(counter==0) [actions] else if(counter==1) [actions] ... else [actions]
 */
function buildDispatchIfChain(
  globalRead: IRGlobalReadExpression,
  slotScriptPairs: OverlayScriptPair[],
  needsWait: boolean,
  maxVisible: number,
): IRActionNode {
  // Build from the last slot backward to nest else-chains.
  function buildBranch(slotIndex: number): IRActionNode[] {
    const actions: IRActionNode[] = [];
    const showHandle = slotScriptPairs[slotIndex].show;
    if (needsWait) {
      actions.push(irScriptWait(showHandle.id));
    }
    const closureIndex = (showHandle as unknown as { [CLOSURE_INDEX]?: number })[CLOSURE_INDEX];
    actions.push(irScriptExecute(showHandle.id, closureIndex !== undefined ? { closureIndex } : undefined));
    return actions;
  }

  // Base case: the last slot is the final else branch.
  let result: IRActionNode = irIfAction(
    irLambdaCondition(
      irBinary('==', globalRead, irLiteralExpression(maxVisible - 2)),
    ),
    buildBranch(maxVisible - 2),
    buildBranch(maxVisible - 1),
  );

  // Build remaining branches from second-to-last back to 0.
  for (let i = maxVisible - 3; i >= 0; i--) {
    result = irIfAction(
      irLambdaCondition(
        irBinary('==', globalRead, irLiteralExpression(i)),
      ),
      buildBranch(i),
      [result],
    );
  }

  return result;
}

/**
 * Create a synthetic script function with pre-injected `__compiledScript`
 * metadata — same pattern as useVisibility's `makeSyntheticScript`.
 */
function makeSyntheticScript(
  id: string,
  actions: IRActionNode[],
  refBindings?: Record<string, unknown>,
) {
  return Object.assign(
    () => Promise.resolve(),
    {
      __compiledScript: { id, then: actions },
      ...(refBindings ? { __refBindings: refBindings } : {}),
    },
  );
}

function overflowToScriptMode(overflow: 'replace' | 'queue' | 'drop'): 'restart' | 'queued' | 'single' {
  switch (overflow) {
    case 'replace': return 'restart';
    case 'queue': return 'queued';
    case 'drop': return 'single';
  }
}
