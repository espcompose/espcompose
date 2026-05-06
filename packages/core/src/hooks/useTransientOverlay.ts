// ────────────────────────────────────────────────────────────────────────────
// useTransientOverlay — queue/slot mechanic primitive for overlay lifecycles
//
// Composes useOverlay() to provide configurable queuing, slot allocation,
// and overflow behavior.
//
// Any UI library (1st or 3rd party) can build toast/notification/snackbar
// overlays on top of this hook without reinventing queue mechanics. The
// factory receives a slotRank so the UI layer controls all visual
// positioning and stacking.
//
// Architecture: pre-allocates N overlay slots (default N=1). Each slot gets
// its own show/hide script pair. A coordinator script dispatches `show()`
// calls to the first inactive slot using a first-free dispatch chain.
//
// Slot state globals:
//   - `g_slot_active_<key>`: integer[] — per-slot active flag (0/1)
//   - `g_slot_seq_<key>`: integer[] — per-slot sequence number
//   - `g_seq_counter_<key>`: integer — monotonic counter
//
// Overflow behavior governs the coordinator script's ESPHome mode:
//   - overflow: 'replace' → script mode: restart
//   - overflow: 'queue'   → script mode: queued, max_runs: queueLength
//   - overflow: 'drop'    → script mode: single
//
// NOTE: This hook lives in @espcompose/core, which is built with tsup (not
// transformed by the ESPCompose CLI). Synthetic scripts are used for
// lifecycle management (same pattern as useVisibility).
// ────────────────────────────────────────────────────────────────────────────

import { assertHookContext } from './useState';
import { useOverlay } from './useOverlay';
import type { OverlayScriptPair } from './useVisibility';
import { useScript } from './useScript';
import { useController } from './useController';
import { useContext } from './useContext';
import { registerComponent } from './useReactiveScope';
import { generateDeterministicId } from '../id';
import { CLOSURE_INDEX } from '../actions';
import {
  globalScopeContext,
  normalizeDuration,
  readControllerParamMeta,
  forwardControllerParamMeta,
} from './global-shared';
import type { GlobalDefinition, TransientOverlayContext } from './global-shared';
import {
  OVERLAY_TEMPLATE_KEY,
  OVERLAY_INSTANCE_INDEX,
  OVERLAY_Z_ORDER,
} from './useOverlay';
import type { OverlayFactory } from './useOverlay';
import {
  irIfAction,
  irGlobalSet,
  irArraySet,
  irScriptExecute,
  irScriptStop,
  irScriptWait,
  irOverlayShow,
  irOverlayHide,
  irDelayAction,
  irLambdaCondition,
} from '../ir/action-types';
import type { IRActionNode } from '../ir/action-types';
import { irBinary, irLiteralExpression, irArrayIndex, irTernary, irTriggerVarExpression } from '../ir/expr-builders';
import type { IRExpression, IRGlobalReadExpression } from '../ir/expr-types';
import { IR_INT, IR_INT_ARRAY } from '../ir/types';
import type { OverlayController } from './useOverlay';
import type { VisibilityController, EspComposeElement } from '../types';
import { __espcompose } from '../reactive/compiler-plumbing';

import type { IRDependency, Signal } from '../reactive';

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
 * Factory for the overlay queue. Receives the overlay controller and a
 * TransientOverlayContext containing slot state for reactive compaction.
 */
export type TransientOverlayFactory<P extends Record<string, unknown> = Record<string, never>> = (
  ctrl: OverlayController,
  context: TransientOverlayContext & P,
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
export function useTransientOverlay<P extends Record<string, unknown> = Record<string, never>>(
  config: TransientOverlayConfig,
  factory: TransientOverlayFactory<P>,
): TransientOverlayController {
  assertHookContext('useTransientOverlay()');

  const {
    zOrder = 0,
    maxVisible = 1,
    autoHide = false,
    overflow = 'replace',
    queueLength = 1,
  } = config;

  return buildSlotOverlay(zOrder, maxVisible, autoHide, overflow, queueLength, factory as TransientOverlayFactory<Record<string, unknown>>);
}

// ── Slot allocation & coordination ──────────────────────────────────────────

/**
 * Pre-allocate N overlay slots with first-free allocation.
 *
 * Each slot gets its own overlay + show/hide script pair (always mode: restart).
 * A coordinator script dispatches `show()` calls to the first inactive slot,
 * backed by per-slot active/seq array globals and a monotonic counter.
 *
 * The per-slot show script sets active[i]=1, seq[i]=counter++, then shows.
 * The per-slot hide script sets active[i]=0, then hides.
 *
 * Coordinator dispatches to the first slot where active[i]==0.
 * If all slots are full, falls back to the last slot (replace behavior).
 *
 * Overflow behavior governs the coordinator script's ESPHome mode:
 * - replace (restart): immediate first-free dispatch.
 * - queue (queued, max_runs): coordinator queues behind capacity.
 * - drop (single): coordinator drops while all slots active.
 *
 * The coordinator's hide() stops all slot scripts, hides all overlays, and
 * resets the array globals.
 */
function buildSlotOverlay(
  zOrder: number,
  maxVisible: number,
  autoHide: string | number | false,
  overflow: 'replace' | 'queue' | 'drop',
  queueLength: number,
  factory: TransientOverlayFactory<Record<string, unknown>>,
): TransientOverlayController {
  // Read controller param declarations — needed for building per-slot show
  // script userParamDecls/globalSetActions. Global registration and proxy
  // building is handled by useOverlay via forwarded metadata.
  const controllerParams = readControllerParamMeta(factory);

  // Build userParams and global-set prefix actions for per-slot show scripts.
  const userParamDecls: Array<{ name: string; irType: unknown }> = [];
  const globalSetActions: IRActionNode[] = [];
  if (controllerParams && controllerParams.length > 0) {
    for (const p of controllerParams) {
      userParamDecls.push({ name: p.name, irType: p.irType });
      globalSetActions.push(irGlobalSet(p.globalId, p.irType, irTriggerVarExpression(p.name)));
    }
  }
  const hasParams = userParamDecls.length > 0;

  // ── 1. Create N overlay slots ─────────────────────────────────────────

  const slotOverlayCtrls: OverlayController<Record<string, unknown>>[] = [];

  // We need the template key before creating overlays to generate globals.
  let slotStateGlobals: ReturnType<typeof createSlotStateGlobals> | undefined;

  for (let i = 0; i < maxVisible; i++) {
    const slotIndex = i;
    // Forward meta so useOverlay handles global registration + proxy building.
    const wrapperFactory = (overlayCtrl: OverlayController, paramsProxy?: Record<string, unknown>) => {
      // On first slot, create shared slot state globals.
      if (!slotStateGlobals) {
        const templateKey = (overlayCtrl as unknown as { [k: symbol]: unknown })[OVERLAY_TEMPLATE_KEY as symbol] as string;
        slotStateGlobals = createSlotStateGlobals(templateKey, maxVisible);
      }
      const slotRank = buildSlotRankMemo(slotIndex, maxVisible, slotStateGlobals!.activeGlobalId, slotStateGlobals!.seqGlobalId);
      return factory(overlayCtrl, { slotRank, paramsProxy });
    };
    forwardControllerParamMeta(factory, wrapperFactory);

    const ctrl = useOverlay(
      { zOrder },
      wrapperFactory as OverlayFactory<Record<string, unknown>>,
    );
    slotOverlayCtrls.push(ctrl);
  }

  const { activeGlobalId, seqGlobalId, seqCounterGlobalId } = slotStateGlobals!;

  // ── 2. Build per-slot show/hide scripts with slot state actions ────────

  type ScriptHandleRef = ReturnType<typeof useScript>;
  const slotShowScripts: ScriptHandleRef[] = [];
  const slotHideScripts: ScriptHandleRef[] = [];

  const seqCounterRead: IRGlobalReadExpression = {
    kind: 'expr:global_read',
    globalId: seqCounterGlobalId,
    type: 'int',
  };

  for (let i = 0; i < maxVisible; i++) {
    const internal = slotOverlayCtrls[i] as unknown as { [k: symbol]: unknown };
    const templateKey = internal[OVERLAY_TEMPLATE_KEY as symbol] as string;
    const instanceIndex = internal[OVERLAY_INSTANCE_INDEX as symbol] as number;
    const slotZOrder = internal[OVERLAY_Z_ORDER as symbol] as number;
    const ctrlBindingKey = '__ctrl';

    // Show script: set active[i]=1, seq[i]=counter, counter++, overlay_show, [delay, overlay_hide]
    const showActions: IRActionNode[] = [
      ...globalSetActions,
      irArraySet(activeGlobalId, IR_INT_ARRAY, irLiteralExpression(i), irLiteralExpression(1)),
      irArraySet(seqGlobalId, IR_INT_ARRAY, irLiteralExpression(i), seqCounterRead),
      irGlobalSet(seqCounterGlobalId, IR_INT, irBinary('+', seqCounterRead, irLiteralExpression(1))),
      irOverlayShow(templateKey, instanceIndex, slotZOrder, ctrlBindingKey),
    ];

    if (autoHide !== false) {
      const duration = normalizeDuration(autoHide);
      showActions.push(irDelayAction(duration));
      showActions.push(
        irArraySet(activeGlobalId, IR_INT_ARRAY, irLiteralExpression(i), irLiteralExpression(0)),
      );
      showActions.push(irOverlayHide(templateKey, slotZOrder, ctrlBindingKey));
      showActions.push(buildAllIdleResetAction(activeGlobalId, seqCounterGlobalId, maxVisible));
    }

    const showScript = useScript(
      makeSyntheticScript(
        generateDeterministicId('scr', `transient_slot_show_${templateKey}`),
        showActions,
        { [ctrlBindingKey]: slotOverlayCtrls[i] },
        hasParams ? userParamDecls : undefined,
      ),
      { mode: 'restart' },
    );
    slotShowScripts.push(showScript);

    // Hide script: stop show, active[i]=0, overlay_hide, reset counter if all idle
    const hideActions: IRActionNode[] = [
      irScriptStop(showScript.id),
      irArraySet(activeGlobalId, IR_INT_ARRAY, irLiteralExpression(i), irLiteralExpression(0)),
      irOverlayHide(templateKey, slotZOrder, ctrlBindingKey),
      buildAllIdleResetAction(activeGlobalId, seqCounterGlobalId, maxVisible),
    ];

    const hideScript = useScript(
      makeSyntheticScript(
        generateDeterministicId('scr', `transient_slot_hide_${templateKey}`),
        hideActions,
        { [ctrlBindingKey]: slotOverlayCtrls[i] },
      ),
    );
    slotHideScripts.push(hideScript);
  }

  // ── 3. Build coordinator show script ──────────────────────────────────

  const needsWait = overflow === 'queue' || overflow === 'drop';

  // Build first-free dispatch: check active[i]==0 for each slot
  const slotScriptPairs: OverlayScriptPair[] = slotShowScripts.map((show, i) => ({
    show,
    hide: slotHideScripts[i],
  }));

  const ifChain = buildFirstFreeDispatchChain(
    activeGlobalId,
    slotScriptPairs,
    needsWait,
    maxVisible,
    hasParams ? userParamDecls : undefined,
  );

  const coordinatorShowActions: IRActionNode[] = [ifChain];

  const coordinatorShowMode = overflowToScriptMode(overflow);
  const coordinatorShowOpts: { mode: 'restart' | 'queued' | 'single'; maxRuns?: number } = {
    mode: coordinatorShowMode,
  };
  if (coordinatorShowMode === 'queued' && queueLength > 0) {
    coordinatorShowOpts.maxRuns = queueLength;
  }

  const firstCtrl = slotOverlayCtrls[0] as unknown as { [k: symbol]: unknown };
  const firstTemplateKey = firstCtrl[OVERLAY_TEMPLATE_KEY as symbol] as string;

  const coordinatorShowScript = useScript(
    makeSyntheticScript(
      generateDeterministicId('scr', `transient_coord_show_${firstTemplateKey}`),
      coordinatorShowActions,
      undefined,
      hasParams ? userParamDecls : undefined,
    ),
    coordinatorShowOpts,
  );

  // ── 4. Build coordinator hide script ──────────────────────────────────

  const hideActions: IRActionNode[] = [];
  for (let i = 0; i < maxVisible; i++) {
    // Stop the slot's show script (cancels auto-hide timer).
    hideActions.push(irScriptStop(slotShowScripts[i].id));
    // Deactivate the slot.
    hideActions.push(irArraySet(activeGlobalId, IR_INT_ARRAY, irLiteralExpression(i), irLiteralExpression(0)));
    // Hide the overlay.
    const slotCtrl = slotOverlayCtrls[i] as unknown as { [k: symbol]: unknown };
    const templateKey = slotCtrl[OVERLAY_TEMPLATE_KEY as symbol] as string;
    const slotZOrder = slotCtrl[OVERLAY_Z_ORDER as symbol] as number;
    hideActions.push(irOverlayHide(templateKey, slotZOrder));
  }
  // Reset counter to 0.
  hideActions.push(irGlobalSet(seqCounterGlobalId, IR_INT, irLiteralExpression(0)));

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
 * Create shared slot state globals (active array, seq array, seq counter).
 *
 * Registers the globals in both the reactive scope (YAML generation) and
 * the global scope context (action compiler symbol lookup).
 */
function createSlotStateGlobals(templateKey: string, slotCount: number) {
  const activeGlobalId = generateDeterministicId('g', `slot_active_${templateKey}`);
  const seqGlobalId = generateDeterministicId('g', `slot_seq_${templateKey}`);
  const seqCounterGlobalId = generateDeterministicId('g', `seq_counter_${templateKey}`);

  // Initial values: arrays of zeros, counter at 0.
  const zeros = Array(slotCount).fill(0).join(',');

  // Register array globals for YAML generation.
  registerComponent({
    kind: 'component',
    section: 'globals',
    id: activeGlobalId,
    config: { id: activeGlobalId, irType: IR_INT_ARRAY, initial_value: `{${zeros}}` },
  });
  registerComponent({
    kind: 'component',
    section: 'globals',
    id: seqGlobalId,
    config: { id: seqGlobalId, irType: IR_INT_ARRAY, initial_value: `{${zeros}}` },
  });
  registerComponent({
    kind: 'component',
    section: 'globals',
    id: seqCounterGlobalId,
    config: { id: seqCounterGlobalId, irType: IR_INT, initial_value: '0' },
  });

  // Register in the global scope context for action compiler symbol lookup.
  const scopeMap = useContext(globalScopeContext) as Map<string, GlobalDefinition> | undefined;
  if (scopeMap) {
    if (!scopeMap.has(activeGlobalId)) {
      scopeMap.set(activeGlobalId, { id: activeGlobalId, irType: IR_INT_ARRAY });
    }
    if (!scopeMap.has(seqGlobalId)) {
      scopeMap.set(seqGlobalId, { id: seqGlobalId, irType: IR_INT_ARRAY });
    }
    if (!scopeMap.has(seqCounterGlobalId)) {
      scopeMap.set(seqCounterGlobalId, { id: seqCounterGlobalId, irType: IR_INT });
    }
  }

  return { activeGlobalId, seqGlobalId, seqCounterGlobalId };
}

/**
 * Build a reactive memo that computes a slot's rank among active peers.
 *
 * Rank = count of active slots whose sequence number is lower (shown earlier).
 * Self-exclusion is natural: `seq[k] < seq[k]` is always false.
 */
function buildSlotRankMemo(
  slotIndex: number,
  slotCount: number,
  activeGlobalId: string,
  seqGlobalId: string,
): Signal<number> {
  const activeRead: IRGlobalReadExpression = {
    kind: 'expr:global_read',
    globalId: activeGlobalId,
    type: 'int_array',
  };
  const seqRead: IRGlobalReadExpression = {
    kind: 'expr:global_read',
    globalId: seqGlobalId,
    type: 'int_array',
  };

  // seq[mySlot] — the sequence number of this slot
  const mySeq = irArrayIndex(seqRead, irLiteralExpression(slotIndex), 'int');

  // Build: sum of (active[i]!=0 && seq[i]<mySeq ? 1 : 0) for each i
  let sum: IRExpression = irLiteralExpression(0);
  for (let i = 0; i < slotCount; i++) {
    const activeI = irArrayIndex(activeRead, irLiteralExpression(i), 'int');
    const seqI = irArrayIndex(seqRead, irLiteralExpression(i), 'int');
    const cond = irBinary('&&',
      irBinary('!=', activeI, irLiteralExpression(0)),
      irBinary('<', seqI, mySeq),
    );
    sum = irBinary('+', sum, irTernary(cond, irLiteralExpression(1), irLiteralExpression(0)));
  }

  const deps: IRDependency[] = [
    { kind: 'dependency', sourceId: activeGlobalId, sourceType: 'global' },
    { kind: 'dependency', sourceId: seqGlobalId, sourceType: 'global' },
  ];

  return __espcompose.derivedMemo<number>({
    exprType: 'int',
    dependencies: deps,
    exprIR: sum,
  }) as unknown as Signal<number>;
}

/**
 * Build a nested if/else chain that dispatches to the first inactive slot.
 *
 * Checks `active[0]==0`, then `active[1]==0`, etc. The final else branch
 * dispatches to the last slot (fallback for "all full" case).
 */
function buildFirstFreeDispatchChain(
  activeGlobalId: string,
  slotScriptPairs: OverlayScriptPair[],
  needsWait: boolean,
  maxVisible: number,
  userParamDecls?: Array<{ name: string; irType: unknown }>,
): IRActionNode {
  // Build forwarded userArgs for script.execute calls (pass-through from coordinator params).
  const forwardedArgs = userParamDecls && userParamDecls.length > 0
    ? Object.fromEntries(userParamDecls.map(p => [p.name, irTriggerVarExpression(p.name)]))
    : undefined;

  function buildBranch(slotIndex: number): IRActionNode[] {
    const actions: IRActionNode[] = [];
    const showHandle = slotScriptPairs[slotIndex].show;
    if (needsWait) {
      actions.push(irScriptWait(showHandle.id));
    }
    const closureIndex = (showHandle as unknown as { [CLOSURE_INDEX]?: number })[CLOSURE_INDEX];
    actions.push(irScriptExecute(showHandle.id, {
      ...(closureIndex !== undefined ? { closureIndex } : {}),
      ...(forwardedArgs ? { userArgs: forwardedArgs } : {}),
    }));
    return actions;
  }

  // Read active[i] — global_read of the array, then array_index op.
  const activeGlobalRead: IRGlobalReadExpression = {
    kind: 'expr:global_read',
    globalId: activeGlobalId,
    type: 'int_array',
  };

  function activeAtIndex(index: number) {
    return irArrayIndex(activeGlobalRead, irLiteralExpression(index), 'int');
  }

  // Base case: 1 slot → unconditionally dispatch to slot 0
  if (maxVisible === 1) {
    const actions = buildBranch(0);
    // Wrap in a trivially-true if to satisfy the single IRActionNode return.
    // The ESPHome serializer optimizes this away.
    return irIfAction(
      irLambdaCondition(irLiteralExpression(true)),
      actions,
    );
  }

  // Base case: 2 slots → if active[0]==0 then slot 0, else slot 1
  if (maxVisible === 2) {
    return irIfAction(
      irLambdaCondition(
        irBinary('==', activeAtIndex(0), irLiteralExpression(0)),
      ),
      buildBranch(0),
      buildBranch(1),
    );
  }

  // Build from second-to-last backward.
  // Final else branch: unconditionally dispatch to last slot.
  let result: IRActionNode = irIfAction(
    irLambdaCondition(
      irBinary('==', activeAtIndex(maxVisible - 2), irLiteralExpression(0)),
    ),
    buildBranch(maxVisible - 2),
    buildBranch(maxVisible - 1),
  );

  for (let i = maxVisible - 3; i >= 0; i--) {
    result = irIfAction(
      irLambdaCondition(
        irBinary('==', activeAtIndex(i), irLiteralExpression(0)),
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
  userParams?: Array<{ name: string; irType: unknown }>,
) {
  return Object.assign(
    () => Promise.resolve(),
    {
      __compiledScript: {
        id,
        then: actions,
        ...(userParams && userParams.length > 0 ? { userParams } : {}),
      },
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

/**
 * Build an IR action that resets `seq_counter` to 0 when all slots are idle.
 *
 * Prevents unbounded counter growth on long-running devices where overlays
 * are shown/dismissed individually via auto-hide or per-slot hide scripts.
 */
function buildAllIdleResetAction(
  activeGlobalId: string,
  seqCounterGlobalId: string,
  slotCount: number,
): IRActionNode {
  const activeGlobalRead: IRGlobalReadExpression = {
    kind: 'expr:global_read',
    globalId: activeGlobalId,
    type: 'int_array',
  };

  // Build: active[0]==0 && active[1]==0 && ... && active[N-1]==0
  let allIdle: IRExpression = irBinary(
    '==',
    irArrayIndex(activeGlobalRead, irLiteralExpression(0), 'int'),
    irLiteralExpression(0),
  );
  for (let i = 1; i < slotCount; i++) {
    allIdle = irBinary(
      '&&',
      allIdle,
      irBinary(
        '==',
        irArrayIndex(activeGlobalRead, irLiteralExpression(i), 'int'),
        irLiteralExpression(0),
      ),
    );
  }

  return irIfAction(
    irLambdaCondition(allIdle),
    [irGlobalSet(seqCounterGlobalId, IR_INT, irLiteralExpression(0))],
  );
}


