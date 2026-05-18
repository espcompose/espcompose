// ────────────────────────────────────────────────────────────────────────────
// useVisibilityStack — nested overlay stacking with shared backup pool
//
// Provides `withVisibilityStack(config, children)` and `useVisibilityStack()`
// for enabling popups (or any overlay) to stack N-deep. When a popup shows
// on top of another, the current state is saved; dismissing restores the
// previous popup.
//
// The UI layer (`@espcompose/ui`) wraps this as `<Popup.Provider maxDepth={N}>`
// and integrates with `usePopup()`.
//
// Design invariants:
//   - No mid-stack dismiss (hide() only pops if caller is top of stack)
//   - Overflow → ESP_LOGW + no-op
//   - Zero cost when no parameterized popups (no backup pool globals)
//   - Shared backup pool per scalar type, lazily allocated
//
// Core is built with tsup (not CLI), so we use `defineSyntheticScript`
// for all script bodies (same pattern as useVisibility.ts).
// ────────────────────────────────────────────────────────────────────────────

import { createContext, useContext } from './useContext';
import { assertHookContext, getCurrentHookPath } from './useState';
import { registerComponent } from './useReactiveScope';
import { generateDeterministicId } from '../id';
import { defineSyntheticScript } from './useScript';
import { useController } from './useController';
import {
  irIfAction,
  irGlobalSet,
  irArraySet,
  irLoggerAction,
  irOverlayShow,
  irOverlayHide,
  irScriptExecute,
  irLambdaCondition,
  irScriptWait,
} from '../ir/action-types';
import type { IRActionNode } from '../ir/action-types';
import {
  irGlobalRead,
  irLiteralExpression,
  irBinary,
  irArrayIndex,
} from '../ir/expr-builders';
import type { IRType } from '../ir/types';
import {
  IR_INT,
  IR_INT_ARRAY,
  IR_FLOAT_ARRAY,
  IR_BOOL_ARRAY,
  IR_STRING_ARRAY,
} from '../ir/types';
import { globalScopeContext, irTypeToExprType } from './global-shared';
import type { GlobalDefinition, OverlayPayloadGlobalDecl } from './global-shared';
import type { ScriptHandle } from './useScript';
import type { OverlayController } from './useOverlay';
import { readOverlayControllerInternal } from './overlay-lifecycle';
import { CLOSURE_INDEX } from '../actions';
import type { VisibilityController } from '../types';
import type { EspComposeElement } from '../types';
import { createElement } from '../runtime';

// ── Internal types ──────────────────────────────────────────────────────────

interface FieldMapping {
  name: string;
  scalarType: string;
  poolOffset: number;
  globalId: string;
  irType: IRType;
}

interface TemplateEntry {
  templateIndex: number;
  templateKey: string;
  fields: FieldMapping[];
  /** Per-template re-show script ID (takes `inst` param for dynamic instance index). */
  reshowScriptId: string;
  /** Script handle to execute+await after overlay_show (entrance animation). */
  afterShowScript?: ScriptHandle;
  /** Script handle to execute+await before overlay_hide (exit animation). */
  beforeHideScript?: ScriptHandle;
}

interface PoolState {
  globalId: string;
  width: number;
  config: Record<string, unknown>;
  irArrayType: IRType;
}

interface VisibilityStackState {
  maxDepth: number;
  zOrder: number;
  providerKey: string;

  depthGlobalId: string;
  templateArrayId: string;
  instanceArrayId: string;

  templateCounter: number;
  templates: Map<string, TemplateEntry>;

  pools: Map<string, PoolState>;

  /** Shared restore coordinator script — action array grown per-registration. */
  restoreActions: IRActionNode[];
  restoreScriptId: string;
}

// ── Public types ────────────────────────────────────────────────────────────

export interface VisibilityStackConfig {
  maxDepth: number;
  zOrder: number;
}

export interface VisibilityStackHandle {
  register(ctrl: OverlayController<unknown>, opts?: { afterShow?: ScriptHandle; beforeHide?: ScriptHandle }): VisibilityController;
}

// ── Context ─────────────────────────────────────────────────────────────────

const VisibilityStackCtx = createContext<VisibilityStackHandle | null>(null);

// ── Helpers ─────────────────────────────────────────────────────────────────

const SCALAR_TO_ARRAY_TYPE: Record<string, IRType> = {
  int: IR_INT_ARRAY,
  float: IR_FLOAT_ARRAY,
  bool: IR_BOOL_ARRAY,
  string: IR_STRING_ARRAY,
};

function registerGlobal(
  id: string,
  irType: IRType,
  initialValue: string,
  scopeMap: Map<string, GlobalDefinition> | undefined,
): Record<string, unknown> {
  const config: Record<string, unknown> = {
    id,
    irType,
    initial_value: initialValue,
  };
  registerComponent({ kind: 'component', section: 'globals', id, config });
  if (scopeMap && !scopeMap.has(id)) {
    scopeMap.set(id, { id, irType });
  }
  return config;
}

function zeros(n: number): string {
  return `{${Array(n).fill(0).join(',')}}`;
}

// ── ExprType shorthand helpers ──────────────────────────────────────────────

function depthRead(state: VisibilityStackState) {
  return irGlobalRead(state.depthGlobalId, 'int');
}

function tmplArrayRead(state: VisibilityStackState) {
  return irGlobalRead(state.templateArrayId, 'int_array');
}

function instArrayRead(state: VisibilityStackState) {
  return irGlobalRead(state.instanceArrayId, 'int_array');
}

function int(v: number) {
  return irLiteralExpression(v, 'int');
}

// ── Pool management ─────────────────────────────────────────────────────────

function ensurePool(
  state: VisibilityStackState,
  scalarType: string,
  fieldCount: number,
  scopeMap: Map<string, GlobalDefinition> | undefined,
): void {
  const existing = state.pools.get(scalarType);
  const backupSlots = state.maxDepth - 1;

  if (!existing) {
    const arrayType = SCALAR_TO_ARRAY_TYPE[scalarType];
    if (!arrayType) return;
    const poolId = generateDeterministicId('g', `vstack_pool_${scalarType}_${state.providerKey}`);
    const totalSize = fieldCount * backupSlots;
    const config = registerGlobal(poolId, arrayType, zeros(totalSize), scopeMap);
    state.pools.set(scalarType, {
      globalId: poolId,
      width: fieldCount,
      config,
      irArrayType: arrayType,
    });
  } else if (fieldCount > existing.width) {
    existing.width = fieldCount;
    const totalSize = fieldCount * backupSlots;
    existing.config.initial_value = zeros(totalSize);
  }
}

function assignFieldMappings(
  payloadDecls: readonly OverlayPayloadGlobalDecl[],
  state: VisibilityStackState,
  scopeMap: Map<string, GlobalDefinition> | undefined,
): FieldMapping[] {
  // Group by scalar type and count
  const typeCounts = new Map<string, number>();
  for (const decl of payloadDecls) {
    const t = decl.irType.type;
    typeCounts.set(t, (typeCounts.get(t) ?? 0) + 1);
  }

  // Ensure pools exist / grow
  for (const [scalarType, count] of typeCounts) {
    ensurePool(state, scalarType, count, scopeMap);
  }

  // Assign offsets
  const typeOffsets = new Map<string, number>();
  const fields: FieldMapping[] = [];
  for (const decl of payloadDecls) {
    const t = decl.irType.type;
    const offset = typeOffsets.get(t) ?? 0;
    typeOffsets.set(t, offset + 1);
    fields.push({
      name: decl.name,
      scalarType: t,
      poolOffset: offset,
      globalId: decl.globalId,
      irType: decl.irType,
    });
  }
  return fields;
}

// ── Script builders ─────────────────────────────────────────────────────────

function buildShowScript(
  state: VisibilityStackState,
  entry: TemplateEntry,
  ctrl: OverlayController<unknown>,
): IRActionNode[] {
  const actions: IRActionNode[] = [];
  const depth = depthRead(state);
  const myIndex = int(entry.templateIndex);

  // 1. Overflow guard
  actions.push(
    irIfAction(
      irLambdaCondition(irBinary('>=', depth, int(state.maxDepth))),
      [irLoggerAction(
        `Popup stack overflow (max=${state.maxDepth}) — show() ignored`,
        'WARN',
      )],
      // else: proceed with show
      buildShowBody(state, entry, ctrl, myIndex),
    ),
  );

  return actions;
}

function buildShowBody(
  state: VisibilityStackState,
  entry: TemplateEntry,
  ctrl: OverlayController<unknown>,
  myIndex: ReturnType<typeof int>,
): IRActionNode[] {
  const actions: IRActionNode[] = [];
  const depth = depthRead(state);
  const internal = readOverlayControllerInternal(ctrl);

  // 2. Save displaced popup's payload if same template is on top
  if (entry.fields.length > 0) {
    actions.push(
      irIfAction(
        irLambdaCondition(
          irBinary('&&',
            irBinary('>', depth, int(0)),
            irBinary('==',
              irArrayIndex(tmplArrayRead(state), irBinary('-', depth, int(1)), 'int'),
              myIndex,
            ),
          ),
        ),
        buildSavePayloadActions(state, entry, irBinary('-', depth, int(1))),
      ),
    );
  }

  // 3. Push onto stack
  actions.push(
    irArraySet(state.templateArrayId, IR_INT_ARRAY, depth, myIndex),
    irArraySet(state.instanceArrayId, IR_INT_ARRAY, depth, int(internal.instanceIndex)),
    irGlobalSet(state.depthGlobalId, IR_INT, irBinary('+', depth, int(1))),
  );

  // 4. Show overlay (payload globals are set by the overlay's own show mechanism)
  actions.push(
    irOverlayShow(internal.templateKey, internal.instanceIndex, internal.zOrder, internal.tierKey),
  );

  // 5. afterShow hook: execute + await entrance animation
  if (entry.afterShowScript) {
    const closureIndex = (entry.afterShowScript as unknown as { [CLOSURE_INDEX]?: number })[CLOSURE_INDEX];
    actions.push(closureIndex !== undefined
      ? irScriptExecute(entry.afterShowScript.id, { closureIndex })
      : irScriptExecute(entry.afterShowScript.id));
    actions.push(irScriptWait(entry.afterShowScript.id));
  }

  return actions;
}

function buildSavePayloadActions(
  state: VisibilityStackState,
  entry: TemplateEntry,
  depthExpr: ReturnType<typeof irBinary>,
): IRActionNode[] {
  const actions: IRActionNode[] = [];
  for (const field of entry.fields) {
    const pool = state.pools.get(field.scalarType)!;
    const poolIndex = irBinary('+',
      irBinary('*', depthExpr, int(pool.width)),
      int(field.poolOffset),
    );
    const elemType = irTypeToExprType(field.irType);
    actions.push(
      irArraySet(
        pool.globalId,
        pool.irArrayType,
        poolIndex,
        irGlobalRead(field.globalId, elemType),
      ),
    );
  }
  return actions;
}

function buildRestorePayloadActions(
  state: VisibilityStackState,
  entry: TemplateEntry,
  depthExpr: ReturnType<typeof irBinary> | ReturnType<typeof irGlobalRead>,
): IRActionNode[] {
  const actions: IRActionNode[] = [];
  for (const field of entry.fields) {
    const pool = state.pools.get(field.scalarType)!;
    const poolIndex = irBinary('+',
      irBinary('*', depthExpr, int(pool.width)),
      int(field.poolOffset),
    );
    const elemType = irTypeToExprType(field.irType);
    const arrayExprType = irTypeToExprType(pool.irArrayType);
    actions.push(
      irGlobalSet(
        field.globalId,
        field.irType,
        irArrayIndex(irGlobalRead(pool.globalId, arrayExprType), poolIndex, elemType),
      ),
    );
  }
  return actions;
}

function buildHideScript(
  state: VisibilityStackState,
  entry: TemplateEntry,
  ctrl: OverlayController<unknown>,
  restoreScriptId: string,
): IRActionNode[] {
  const internal = readOverlayControllerInternal(ctrl);
  const depth = depthRead(state);
  const myIndex = int(entry.templateIndex);

  // Guard: am I on top?
  return [
    irIfAction(
      irLambdaCondition(
        irBinary('&&',
          irBinary('>', depth, int(0)),
          irBinary('==',
            irArrayIndex(tmplArrayRead(state), irBinary('-', depth, int(1)), 'int'),
            myIndex,
          ),
        ),
      ),
      buildHideBody(state, entry, internal, restoreScriptId),
    ),
  ];
}

function buildHideBody(
  state: VisibilityStackState,
  entry: TemplateEntry,
  internal: ReturnType<typeof readOverlayControllerInternal>,
  restoreScriptId: string,
): IRActionNode[] {
  const actions: IRActionNode[] = [];
  const depth = depthRead(state);

  // Pop stack
  const newDepth = irBinary('-', depth, int(1));
  actions.push(irGlobalSet(state.depthGlobalId, IR_INT, newDepth));

  // beforeHide hook: execute + await exit animation
  if (entry.beforeHideScript) {
    const closureIndex = (entry.beforeHideScript as unknown as { [CLOSURE_INDEX]?: number })[CLOSURE_INDEX];
    actions.push(closureIndex !== undefined
      ? irScriptExecute(entry.beforeHideScript.id, { closureIndex })
      : irScriptExecute(entry.beforeHideScript.id));
    actions.push(irScriptWait(entry.beforeHideScript.id));
  }

  // Hide my widget
  actions.push(irOverlayHide(internal.templateKey, internal.zOrder, internal.tierKey));

  // Restore previous entry (if any)
  // Re-read depth after decrement
  const currentDepth = depthRead(state);

  actions.push(
    irIfAction(
      irLambdaCondition(irBinary('>', currentDepth, int(0))),
      buildRestoreDispatch(state, entry, restoreScriptId),
    ),
  );

  return actions;
}

function buildRestoreDispatch(
  state: VisibilityStackState,
  entry: TemplateEntry,
  restoreScriptId: string,
): IRActionNode[] {
  const actions: IRActionNode[] = [];
  const currentDepth = depthRead(state);
  const prevDepth = irBinary('-', currentDepth, int(1));
  const prevTmpl = irArrayIndex(tmplArrayRead(state), prevDepth, 'int');
  const prevInst = irArrayIndex(instArrayRead(state), prevDepth, 'int');
  const myIndex = int(entry.templateIndex);

  // If previous was same template: restore payload + re-show via parameterized script
  const sameTemplateActions: IRActionNode[] = [];
  if (entry.fields.length > 0) {
    sameTemplateActions.push(...buildRestorePayloadActions(state, entry, prevDepth));
  }
  sameTemplateActions.push(
    irScriptExecute(entry.reshowScriptId, { userArgs: { inst: prevInst } }),
  );

  // If previous was different template: delegate to shared restore coordinator
  const diffTemplateActions: IRActionNode[] = [
    irScriptExecute(restoreScriptId),
  ];

  actions.push(
    irIfAction(
      irLambdaCondition(irBinary('==', prevTmpl, myIndex)),
      sameTemplateActions,
      diffTemplateActions,
    ),
  );

  return actions;
}

function appendRestoreCoordinatorBranch(
  state: VisibilityStackState,
  entry: TemplateEntry,
): void {
  const currentDepth = depthRead(state);
  const prevDepth = irBinary('-', currentDepth, int(1));
  const prevTmpl = irArrayIndex(tmplArrayRead(state), prevDepth, 'int');
  const prevInst = irArrayIndex(instArrayRead(state), prevDepth, 'int');

  const branchActions: IRActionNode[] = [];
  if (entry.fields.length > 0) {
    branchActions.push(...buildRestorePayloadActions(state, entry, prevDepth));
  }
  branchActions.push(
    irScriptExecute(entry.reshowScriptId, { userArgs: { inst: prevInst } }),
  );

  state.restoreActions.push(
    irIfAction(
      irLambdaCondition(irBinary('==', prevTmpl, int(entry.templateIndex))),
      branchActions,
    ),
  );
}

// ── register() ──────────────────────────────────────────────────────────────

function registerOverlay(
  state: VisibilityStackState,
  ctrl: OverlayController<unknown>,
  opts?: { afterShow?: ScriptHandle; beforeHide?: ScriptHandle },
): VisibilityController {
  assertHookContext('useVisibilityStack().register()');

  const internal = readOverlayControllerInternal(ctrl);
  const { templateKey } = internal;
  const scopeMap = useContext(globalScopeContext) as Map<string, GlobalDefinition> | undefined;

  // Assign template index (idempotent for same templateKey)
  let entry = state.templates.get(templateKey);
  if (!entry) {
    const templateIndex = state.templateCounter++;
    const fields = internal.payloadDecls
      ? assignFieldMappings(internal.payloadDecls, state, scopeMap)
      : [];

    // Create per-template re-show script (parameterized with `inst`)
    // This allows dynamic instance indices from the stack arrays.
    const reshowScriptId = generateDeterministicId('scr', `vstack_reshow_${templateKey}`);
    defineSyntheticScript({
      id: reshowScriptId,
      actions: [
        irOverlayShow(
          internal.templateKey,
          { kind: 'script_param', name: 'inst' },
          internal.zOrder,
          internal.tierKey,
        ),
      ],
      userParams: [{ name: 'inst', irType: IR_INT }],
    });

    entry = { templateIndex, templateKey, fields, reshowScriptId };

    if (opts?.afterShow) {
      entry.afterShowScript = opts.afterShow;
    }
    if (opts?.beforeHide) {
      entry.beforeHideScript = opts.beforeHide;
    }

    state.templates.set(templateKey, entry);

    // Append branch to shared restore coordinator
    appendRestoreCoordinatorBranch(state, entry);
  }

  // Build stacked show/hide scripts
  const showActions = buildShowScript(state, entry, ctrl);
  const hideActions = buildHideScript(state, entry, ctrl, state.restoreScriptId);

  const showScript = defineSyntheticScript({
    id: generateDeterministicId('scr', `vstack_show_${templateKey}_${internal.instanceIndex}`),
    actions: showActions,
  });
  const hideScript = defineSyntheticScript({
    id: generateDeterministicId('scr', `vstack_hide_${templateKey}`),
    actions: hideActions,
  });

  return useController<VisibilityController>({ show: showScript, hide: hideScript });
}

// ── withVisibilityStack ─────────────────────────────────────────────────────

/**
 * Establishes a visibility stack scope. Overlays registered via
 * `useVisibilityStack().register(ctrl)` within this scope share a
 * depth counter and backup pool.
 *
 * Typically wrapped by `<Popup.Provider maxDepth={N}>` in the UI layer.
 */
export function withVisibilityStack(
  config: VisibilityStackConfig,
  children?: EspComposeElement | EspComposeElement[],
): EspComposeElement {
  assertHookContext('withVisibilityStack()');

  const hookPath = getCurrentHookPath();
  const providerKey = generateDeterministicId('vstack', hookPath);
  const scopeMap = useContext(globalScopeContext) as Map<string, GlobalDefinition> | undefined;

  // Allocate shared stack globals
  const depthGlobalId = generateDeterministicId('g', `vstack_depth_${providerKey}`);
  const templateArrayId = generateDeterministicId('g', `vstack_tmpl_${providerKey}`);
  const instanceArrayId = generateDeterministicId('g', `vstack_inst_${providerKey}`);

  registerGlobal(depthGlobalId, IR_INT, '0', scopeMap);
  registerGlobal(templateArrayId, IR_INT_ARRAY, zeros(config.maxDepth), scopeMap);
  registerGlobal(instanceArrayId, IR_INT_ARRAY, zeros(config.maxDepth), scopeMap);

  // Allocate shared restore coordinator script with mutable actions array
  const restoreActions: IRActionNode[] = [];
  const restoreScriptId = generateDeterministicId('scr', `vstack_restore_${providerKey}`);

  const state: VisibilityStackState = {
    maxDepth: config.maxDepth,
    zOrder: config.zOrder,
    providerKey,
    depthGlobalId,
    templateArrayId,
    instanceArrayId,
    templateCounter: 0,
    templates: new Map(),
    pools: new Map(),
    restoreActions,
    restoreScriptId,
  };

  const handle: VisibilityStackHandle = {
    register: (ctrl, opts) => registerOverlay(state, ctrl, opts),
  };

  // Register the restore coordinator script. Its action array is grown
  // by register() calls, and defineSyntheticScript stores the array by
  // reference, so codegen sees the final version.
  defineSyntheticScript({
    id: restoreScriptId,
    actions: restoreActions,
  });

  return createElement('context', { context: VisibilityStackCtx, value: handle }, children);
}

// ── useVisibilityStack ──────────────────────────────────────────────────────

/**
 * Access the nearest visibility stack, if any.
 *
 * Returns the stack handle when inside a `withVisibilityStack` scope
 * (e.g. `<Popup.Provider>`), or `null` when no provider is present.
 */
export function useVisibilityStack(): VisibilityStackHandle | null {
  return useContext(VisibilityStackCtx);
}
