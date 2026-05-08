// ────────────────────────────────────────────────────────────────────────────
// useScript — declares named ESPHome scripts
//
// Accepts an async arrow function whose body is compiled by the action tree
// compiler into ESPHome actions. Returns a ScriptHandle for calling the
// script from trigger handlers.
//
// Must be called inside a function component body (render pass).
//
// Usage:
//   const myScript = useScript(async () => {
//     await delay(1000);
//     lightRef.toggle();
//   });
//
//   <button onPress={async () => { await myScript(); }} />       // execute + wait
//   <button onPress={() => { myScript.execute(); }} />           // fire-and-forget
//   <button onPress={() => { myScript.stop(); }} />              // stop running
// ────────────────────────────────────────────────────────────────────────────

import { createContext, useContext, withContext } from './useContext';
import { setCurrentHookPath, assertHookContext } from './useState';
import { findInScope, registerInScope } from './useScope';
import type { ScopeFrame } from './useScope';
import { resolveRefBindingsInActions } from '../serialize';
import type { IRActionNode, IRScriptParamRef } from '../ir/action-types';
import type { ScriptMode, IRScriptParamDecl, IRType, IRScalar, ClosureShape, ClosureField, ClosureInstance } from '../ir/types';
import { irScalar } from '../ir/types';
import type { BINDING_BRAND } from '../types';
import { isRef } from '../types';
import { generateId } from '../id';
import { throwCompileTimeOnly } from '../errors';
import { findClosureDescriptor } from '../actions';
import type { OverlayControllerInternal } from '../actions';
import { CLOSURE_INDEX } from '../actions';
import {
  OVERLAY_TEMPLATE_KEY,
  OVERLAY_INSTANCE_INDEX,
  OVERLAY_Z_ORDER,
} from './useOverlay';

// ── Script-scope types & context ───────────────────────────────────────────

interface ScriptDefinition {
  id: string;
  mode?: ScriptMode;
  maxRuns?: number;
  userParams?: IRScriptParamDecl[];
  /** Per-script binding name → literal ESPHome ID token. */
  refBindings?: Record<string, string>;
  /** Canonical closure shape (template-level field layout). */
  closureShape?: ClosureShape;
  /** Per-instance closure-table rows; one per useScript call site. */
  closureTable?: ClosureInstance[];
  then: IRActionNode[];
}

const scriptScopeContext = createContext<ScopeFrame<ScriptDefinition>>({ value: {} });

/**
 * Establishes a script scope frame and runs `fn` inside it.
 * Returns the function's result together with all ScriptDefinitions that were
 * registered via useScript() during the call.
 *
 * Called by the compiler's execute phase to wrap bundle evaluation.
 */
export function withScriptScope<T>(fn: () => T): { result: T; scripts: ScriptDefinition[] } {
  const prev = useContext(scriptScopeContext);
  const scopeFrame: ScopeFrame<ScriptDefinition> = { next: prev, value: {} };

  setCurrentHookPath('espcompose_script_render');
  try {
    const result = withContext(scriptScopeContext, scopeFrame, fn);
    const scripts = Object.values(scopeFrame.value).map((e) => e.def);
    return { result, scripts };
  } finally {
    setCurrentHookPath(null);
  }
}

/**
 * Handle returned by useScript() for interacting with a named ESPHome script.
 *
 * Callable as a function: `await myScript()` = script.execute + script.wait
 */
export interface ScriptHandle<A extends ScriptParamScalar[] = ScriptParamScalar[]> {
  readonly [BINDING_BRAND]?: true;
  /** Call as a function: `await myScript()` = script.execute + script.wait */
  (...args: A): Promise<void>;
  /** The script ID */
  readonly id: string;
  /** Fire-and-forget execution: `script.execute` */
  execute(...args: A): void;
  /** Stop the script if running: `script.stop` */
  stop(): void;
  /** Whether the script is currently running (compile-time only) */
  readonly isRunning: boolean;
}

/** Compiled metadata injected by the AST transformer */
interface CompiledScriptMeta {
  id: string;
  userParams?: Array<{ name: string; irType: IRType }>;
  then: unknown[];
  /**
   * Deterministic FNV-1a body hash computed by the script
   * transformer over the compiled action tree + binding-name set.
   * Used as part of the dedup key.
   */
  bodyHash?: string;
  /**
   * Scalar captures detected by the action compiler.
   *
   * Maps captured variable name → IRType (inferred from the TS type at
   * AST transform time). At render time `useScript` reads the runtime value
   * from `__refBindings[name]` and creates a scalar `ClosureField` +
   * `IRScalar` for the closure table.
   */
  scalarCaptures?: Record<string, IRType>;
}

/** Scalar types allowed as useScript user-defined parameters. */
export type ScriptParamScalar = number | string | boolean;

/**
 * Declare a named ESPHome script.
 *
 * The async arrow function body is compiled at build time by the action
 * tree compiler. The compiled actions are injected as metadata by the
 * transformer via Object.assign(__compiledScript, __refBindings).
 *
 * Must be called inside a function component body (render pass).
 */
/** Options for `useScript()`. */
export interface ScriptOptions {
  /** Execution mode. Controls behavior when script is re-triggered while already running. */
  mode?: ScriptMode;
  /**
   * Maximum concurrent/queued runs. Only meaningful when `mode` is
   * `'queued'` or `'parallel'`. Omit to use the ESPHome default (0 = unlimited).
   */
  maxRuns?: number;
}

export function useScript<A extends ScriptParamScalar[]>(
  fn: (...args: A) => Promise<void>,
  opts?: ScriptOptions,
): ScriptHandle<A> {
  assertHookContext('useScript()');

  const body = fn as ((...args: unknown[]) => unknown) & { __compiledScript?: CompiledScriptMeta; __refBindings?: Record<string, unknown> };
  if (body.__compiledScript) {
    const varScriptId = body.__compiledScript.id;
    const bodyHash = body.__compiledScript.bodyHash;
    const refBindings = body.__refBindings ?? {};
    const userParams = body.__compiledScript.userParams?.map(p => ({
      kind: 'script_param_decl' as const,
      name: p.name,
      irType: p.irType,
    }));
    const scalarCaptures = body.__compiledScript.scalarCaptures;

    // Classify bindings to determine the closure shape for this script.
    const closureShape = classifyBindings(refBindings, scalarCaptures);

    // Build a dedup key from bodyHash + closure-shape signature.
    // Without a bodyHash (e.g. uncompiled tests), fall back to var-name dedup.
    const dedupKey = bodyHash
      ? `canonical:${bodyHash}|${closureShapeSignature(closureShape)}`
      : varScriptId;

    // Check for dedup
    const existing = findInScope(scriptScopeContext, dedupKey);
    if (existing) {
      // Dedup hit: append a new closure-table row, return handle with closureIndex.
      if (existing.def.closureShape && existing.def.closureTable) {
        const row = buildClosureRow(refBindings, existing.def.closureShape);
        existing.def.closureTable.push(row);
        const closureIndex = existing.def.closureTable.length - 1;
        return createScriptHandle<A>(existing.def.id, closureIndex);
      }
      // No closure shape → single-use script, return handle without closureIndex.
      return createScriptHandle<A>(existing.def.id);
    }

    // First registration: build closureShape + first closureTable row.
    const { actions, refBindings: scriptRefBindings } =
      resolveScriptActionsCanonical(body.__compiledScript.then, refBindings);
    const scriptDef: ScriptDefinition = {
      id: varScriptId,
      mode: opts?.mode,
      maxRuns: opts?.maxRuns,
      userParams: userParams && userParams.length > 0 ? userParams : undefined,
      refBindings: Object.keys(scriptRefBindings).length > 0 ? scriptRefBindings : undefined,
      closureShape: closureShape.fields.length > 0 ? closureShape : undefined,
      closureTable: closureShape.fields.length > 0 ? [buildClosureRow(refBindings, closureShape)] : undefined,
      then: actions,
    };
    registerInScope(scriptScopeContext, dedupKey, { def: scriptDef });
    return createScriptHandle<A>(varScriptId, closureShape.fields.length > 0 ? 0 : undefined);
  }

  // Fallback for bodies without compiled metadata (dev mode / uncompiled)
  const id = generateId('scr');
  const scriptDef: ScriptDefinition = { id, mode: opts?.mode, maxRuns: opts?.maxRuns, then: [] };
  if (!findInScope(scriptScopeContext, id)) {
    registerInScope(scriptScopeContext, id, { def: scriptDef });
  }
  return createScriptHandle<A>(id);
}

function createScriptHandle<A extends ScriptParamScalar[]>(
  id: string,
  closureIndex?: number,
): ScriptHandle<A> {
  const handle = {
    id,
    execute() {
      throwCompileTimeOnly('script.execute()', 'Script actions');
    },
    stop() {
      throwCompileTimeOnly('script.stop()', 'Script actions');
    },
    get isRunning(): never {
      return throwCompileTimeOnly('script.isRunning', 'Script state accessors');
    },
  };

  // Make the handle callable for `await myScript()` syntax.
  // At the AST level, the compiler sees `myScript()` and emits
  // script.execute (+ script.wait if awaited). This function is
  // never actually invoked.
  const callable = function scriptCall(): never {
    throwCompileTimeOnly('script()', 'Script calls');
  } as unknown as ScriptHandle<A> & ((...args: A) => Promise<void>);

  Object.defineProperties(callable, {
    id: { value: id, enumerable: true },
    execute: { value: handle.execute, enumerable: true },
    stop: { value: handle.stop, enumerable: true },
    isRunning: { get: (): never => throwCompileTimeOnly('script.isRunning', 'Script state accessors'), enumerable: true },
    [CLOSURE_INDEX]: { value: closureIndex, enumerable: false },
  });

  return callable as ScriptHandle<A>;
}

// ── Synthetic script registration (internal) ─────────────────────────────

/**
 * Internal helper for core hooks (`useVisibility`, `useTransientOverlay`)
 * to register a script whose action body is built directly in IR rather
 * than compiled from a TS arrow function source.
 *
 * `@espcompose/core` is built with tsup (not the ESPCompose CLI script
 * transformer), so its own `useScript()` calls cannot be processed by the
 * AST transformer. This helper synthesizes the same `__compiledScript` /
 * `__refBindings` metadata shape the transformer would produce, then routes
 * through the normal `useScript()` registration path so closure-table dedup,
 * scope registration, and handle creation all behave identically.
 *
 * Not part of the public API. 3rd-party hooks should use natural
 * `useScript(async (...) => …)` and let the CLI transformer process them.
 *
 * @internal
 */
export function defineSyntheticScript(args: {
  id: string;
  actions: IRActionNode[];
  refBindings?: Record<string, unknown>;
  userParams?: Array<{ name: string; irType: IRType }>;
  opts?: ScriptOptions;
}): ScriptHandle {
  const { id, actions, refBindings, userParams, opts } = args;
  const fn = Object.assign(
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
  return useScript(fn as never, opts);
}

// ── Closure-shape classification ─────────────────────────────────────────

/**
 * Build a ClosureShape from the refBindings map.
 *
 * Each binding's descriptor may contribute a closure field (scalar or id_ref).
 * Fields are ordered alphabetically by binding name.
 */
/** @internal exported for tests */
export function classifyBindings(
  refBindings: Record<string, unknown>,
  scalarCaptures?: Record<string, IRType>,
): ClosureShape {
  const fields: ClosureField[] = [];
  const names = Object.keys(refBindings).sort();
  for (const name of names) {
    const value = refBindings[name];

    // Scalar captures from the compiler take priority — they're plain JS
    // values (number, string, boolean) that have no closure descriptor.
    if (scalarCaptures && name in scalarCaptures) {
      fields.push({ kind: 'closure_field', name, irType: scalarCaptures[name] });
      continue;
    }

    const desc = findClosureDescriptor(value);
    if (!desc?.toClosureField) continue;
    const field = desc.toClosureField(name, value);
    if (field) fields.push(field);
  }
  return { kind: 'closure_shape', fields };
}

/** @internal exported for tests. Stable signature string for a `ClosureShape`. */
export function closureShapeSignature(shape: ClosureShape): string {
  return shape.fields.map((f) => `${f.name}:${irTypeKey(f.irType)}`).join(',');
}

/** Stable string key for an `IRType` — used in dedup signatures. */
function irTypeKey(vt: IRType): string {
  let s = vt.type as string;
  if (vt.format) s += `:${vt.format}`;
  if (vt.isArray) s += '[]';
  return s;
}

/**
 * Build a single closure-table row from the current binding values, matching
 * the field order of the (already-locked) closure shape.
 *
 * @internal exported for tests.
 */
export function buildClosureRow(
  refBindings: Record<string, unknown>,
  shape: ClosureShape,
): ClosureInstance {
  const values: Record<string, IRScalar> = {};
  // Walk binding names in alphabetical order (matches classifyBindings ordering).
  const names = Object.keys(refBindings).sort();
  for (const name of names) {
    const value = refBindings[name];

    // Check if this field is a scalar capture (plain JS value, no descriptor).
    // Scalar captures have no `format` qualifier (plain int/float/bool/string).
    const shapeFieldDirect = shape.fields.find(
      (f) => f.name === name && !f.irType.format,
    );
    if (shapeFieldDirect) {
      const cell = scalarValueToClosureValue(value, shapeFieldDirect.irType);
      if (cell) values[shapeFieldDirect.name] = cell;
      continue;
    }

    const desc = findClosureDescriptor(value);
    if (!desc?.toClosureValue || !desc.toClosureField) continue;
    const field = desc.toClosureField(name, value);
    if (!field) continue;
    const cell = desc.toClosureValue(value);
    if (!cell) continue;
    // Find the field in the shape so we use the canonical name (in case the
    // descriptor's per-instance field name differs).
    const shapeField = shape.fields.find((f) => f.name === field.name);
    if (shapeField) {
      values[shapeField.name] = cell;
    }
  }
  return { kind: 'closure_instance', values };
}

/** Convert a plain JS value to an IRScalar using the declared value type. */
function scalarValueToClosureValue(
  value: unknown,
  irType: IRType,
): IRScalar | null {
  switch (irType.type) {
    case 'int':
      return typeof value === 'number' ? irScalar(Math.trunc(value)) : null;
    case 'float':
      return typeof value === 'number' ? irScalar(value) : null;
    case 'bool':
      return typeof value === 'boolean' ? irScalar(value) : null;
    case 'string':
      return typeof value === 'string' ? irScalar(value) : null;
  }
}

// ── Closure-aware action resolution ─────────────────────────────────────────
//
// Controller shape types are imported from `../closure` so descriptors and
// resolvers stay in sync. Treat fields as optional here — the resolver runs
// over IR captured before structural validation.

type OverlayControllerInternalShape = Partial<OverlayControllerInternal>;

/**
 * Canonical closure-aware action resolver.
 *
 * Uses `closure.<field>` references so the lowerer emits closure-row
 * dereferences. Per-instance values are stored in the closure-table
 * (one row per call site, indexed via the `closure_index` script param).
 * The lambda preamble `auto& closure = ...` injected by lower-yaml makes
 * `closure.<field>` resolvable in every lambda body.
 */
function resolveScriptActionsCanonical(
  rawActions: unknown[],
  refBindings: Record<string, unknown>,
): {
  actions: IRActionNode[];
  refBindings: Record<string, string>;
} {
  // Build paramRefMap mapping each binding's field → IRScriptParamRef whose
  // `name` is `closure.<bindingName>_<field>` so the lowerer emits the
  // closure-row dereference verbatim.
  const paramRefMap = new Map<string, Map<string, IRScriptParamRef>>();
  for (const [name, value] of Object.entries(refBindings)) {
    const desc = findClosureDescriptor(value);
    if (!desc?.toClosureField || !desc.toClosureValue) continue;
    const field = desc.toClosureField(name, value);
    if (!field) continue;
    // Strip the binding-name prefix from the field name to get the
    // per-descriptor field suffix (e.g. 'instance_index' from
    // 'myCtrl_instance_index'). This suffix is the key in the
    // per-binding paramRef map that resolveControllerRefsParameterized
    // looks up.
    const fieldKey = field.name.startsWith(`${name}_`)
      ? field.name.slice(name.length + 1)
      : field.name;
    const fieldRefs = new Map<string, IRScriptParamRef>();
    fieldRefs.set(fieldKey, { kind: 'script_param', name: `closure.${field.name}` });
    paramRefMap.set(name, fieldRefs);
  }

  let actions = structuredClone(rawActions) as IRActionNode[];
  resolveControllerRefsParameterized(actions, refBindings, paramRefMap);

  // Rewrite IRScriptParamRef names in delay (and other) actions to use
  // the closure-row dereference prefix (e.g. `durationMs` → `closure.durationMs`).
  rewriteScalarParamRefs(actions);

  // Strip controller and script-handle bindings before computing
  // scriptRefBindings. Both have toString() values that would corrupt
  // lambda string-substitution if left in place.
  // Also strip scalar captures — they are plain JS values (number, string, bool)
  // that have no ref semantics.
  const cleanBindings = { ...refBindings };
  const scalarCaptureNames = new Set<string>();
  for (const key of Object.keys(cleanBindings)) {
    const val = cleanBindings[key];
    if (val != null && typeof val === 'object') {
      if (OVERLAY_TEMPLATE_KEY in (val as object)) {
        delete cleanBindings[key];
      }
    } else if (typeof val === 'function' && 'id' in (val as object) && 'execute' in (val as object)) {
      // ScriptHandle: handled separately by resolveScriptHandleClosureIndex.
      delete cleanBindings[key];
    } else if (typeof val === 'number' || typeof val === 'boolean' || (typeof val === 'string' && !isRef(val))) {
      // Scalar capture: plain primitive, not a branded ref.
      scalarCaptureNames.add(key);
      delete cleanBindings[key];
    }
  }

  const scriptRefBindings: Record<string, string> = {};
  for (const [key, val] of Object.entries(cleanBindings)) {
    if (isRef(val)) {
      scriptRefBindings[key] = (val as { toString(): string }).toString();
    }
  }
  // Resolve any remaining ref-binding-name strings in non-slot fields
  // (e.g. native action configs). Slot.name is preserved in the lowerer
  // via scriptRefBindings.
  actions = resolveRefBindingsInActions(actions as unknown[], cleanBindings) as IRActionNode[];

  return { actions, refBindings: scriptRefBindings };
}

/**
 * Walk the action tree and resolve overlay/visibility controller refs.
 *
 * For parameterized bindings (those in paramRefMap), divergent fields are
 * replaced with IRScriptParamRef instead of literal values. Shared fields
 * (templateKey, zOrder) are resolved from the controller as constants.
 *
 * For non-parameterized controllers, resolution is identical to the existing
 * resolveOverlayControllerRefs / resolveControllerMethodCalls.
 */
function resolveControllerRefsParameterized(
  actions: IRActionNode[],
  refBindings: Record<string, unknown>,
  paramRefMap: Map<string, Map<string, IRScriptParamRef>>,
): void {
  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];

    if (action.kind === 'action:overlay_show' && action.controllerRef) {
      const ctrl = refBindings[action.controllerRef] as OverlayControllerInternalShape | undefined;
      if (ctrl) {
        const paramRefs = paramRefMap.get(action.controllerRef);
        action.templateKey = ctrl[OVERLAY_TEMPLATE_KEY] ?? action.templateKey;
        action.zOrder = ctrl[OVERLAY_Z_ORDER] ?? action.zOrder;
        action.instanceIndex = paramRefs?.get('instance_index') ?? ctrl[OVERLAY_INSTANCE_INDEX] ?? action.instanceIndex;
        delete action.controllerRef;
      }
    } else if (action.kind === 'action:overlay_hide' && action.controllerRef) {
      const ctrl = refBindings[action.controllerRef] as OverlayControllerInternalShape | undefined;
      if (ctrl) {
        action.templateKey = ctrl[OVERLAY_TEMPLATE_KEY] ?? action.templateKey;
        action.zOrder = ctrl[OVERLAY_Z_ORDER] ?? action.zOrder;
        delete action.controllerRef;
      }
    } else if (action.kind === 'action:if') {
      resolveControllerRefsParameterized(action.then, refBindings, paramRefMap);
      if (action.else) resolveControllerRefsParameterized(action.else, refBindings, paramRefMap);
    } else if (action.kind === 'action:while' || action.kind === 'action:repeat') {
      resolveControllerRefsParameterized(action.then, refBindings, paramRefMap);
    }
  }
}

/**
 * Walk the action tree and rewrite any `IRScriptParamRef` `name` fields
 * to use the `closure.<name>` prefix so the lowerer emits the correct
 * closure-row dereference.
 */
function rewriteScalarParamRefs(actions: IRActionNode[]): void {
  for (const action of actions) {
    if (action.kind === 'action:delay') {
      const dur = action.duration;
      if (typeof dur === 'object' && dur.kind === 'script_param' && !dur.name.startsWith('closure.')) {
        dur.name = `closure.${dur.name}`;
      }
    } else if (action.kind === 'action:if') {
      rewriteScalarParamRefs(action.then);
      if (action.else) rewriteScalarParamRefs(action.else);
    } else if (action.kind === 'action:while' || action.kind === 'action:repeat') {
      rewriteScalarParamRefs(action.then);
    }
  }
}


