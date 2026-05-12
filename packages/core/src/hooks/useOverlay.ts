// ────────────────────────────────────────────────────────────────────────────
// useOverlay — shared overlay widget subtree with hook-path deduplication
//
// Each `useOverlay(config, factory)` call inside a function component:
//   1. Derives a `templateKey` from the current hook-path stack (component
//      identity). All callers of the same component share a templateKey.
//   2. Evaluates the factory once per component instance (to capture each
//      instance's unique closures: entity bindings, action handlers).
//   3. The first instance's rendered widget subtree is emitted into the
//      LVGL `top_layer` section once. Subsequent instances contribute only
//      their per-instance data to the overlay definition's instance table.
//
// The mux signal + table-driven codegen live in the ESPHome target and the
// compiler — this file is purely the registry + hook surface.
//
// Returns an `OverlayController` whose `show()` and `hide()` methods are
// compile-time markers (BINDING_BRAND-tagged) — the AST/action compiler
// recognises them and lowers them to muxed lambda actions.
//
// Z-ordering is handled by grouping overlays into tier containers in
// `top_layer`, sorted by the numeric `zOrder` config. Within a tier,
// `lv_obj_move_foreground()` in the show action gives last-shown-wins.
// ────────────────────────────────────────────────────────────────────────────

import { createContext, useContext, withContext } from './useContext';
import { assertHookContext, getCurrentHookPath, nextCallIndexAtHookPath, withHookPath } from './useState';
import { registerComponent } from './useReactiveScope';
import { throwCompileTimeOnly } from '../errors';
import type { BINDING_BRAND, OVERLAY_BRAND } from '../types';
import type { EspComposeElement } from '../types';
import type { IRBinding } from './useReactiveScope';
import type { IRReactiveNode } from '../reactive';
import { IRReactiveNode as IRReactiveNodeImpl } from '../reactive/node';
import type { IRDependency } from '../reactive';
import type { IRActionNode } from '../ir/action-types';
import { useLvgl } from './useLvgl';
import {
  globalScopeContext,
  irTypeToExprType,
  readOverlayPayloadMeta,
} from './global-shared';
import type { OverlayPayloadGlobalDecl, GlobalDefinition } from './global-shared';
import { irOverlayShow, irOverlayHide } from '../ir/action-types';
import { generateDeterministicId } from '../id';
import { RESOLVE_METHOD_CALL } from '../actions/resolve/symbols';
import type { OverlayTierHandle } from './useOverlayTier';
import { TIER_Z_ORDER, TIER_KEY } from './useOverlayTier';

// ── Overlay controller symbols ──────────────────────────────────────────────
// Symbol-keyed internal fields on OverlayController. Using symbols instead of
// string-prefixed properties keeps these truly invisible to consumers
// (Object.keys, JSON.stringify) and makes the duck-type guard collision-proof.

/** The sanitized hook-path key identifying the overlay template. */
export const OVERLAY_TEMPLATE_KEY: unique symbol = Symbol('overlay.templateKey');
/** Instance index within the template (0, 1, 2, ...). */
export const OVERLAY_INSTANCE_INDEX: unique symbol = Symbol('overlay.instanceIndex');
/** Numeric z-order tier for stacking in top_layer. */
export const OVERLAY_Z_ORDER: unique symbol = Symbol('overlay.zOrder');
/** Script ID for lifecycle-managed show/hide (e.g. toast auto-hide). */
export const OVERLAY_LIFECYCLE_SCRIPT_ID: unique symbol = Symbol('overlay.lifecycleScriptId');
/** Overlay payload declarations (OverlayPayloadGlobalDecl[]). Symbol-keyed so useVisibility can read them. */
export const OVERLAY_PAYLOAD_GLOBALS: unique symbol = Symbol('overlay.payloadGlobals');
/** Deterministic tier key for the overlay's tier. */
export const OVERLAY_TIER_KEY: unique symbol = Symbol('overlay.tierKey');

// ── Types ───────────────────────────────────────────────────────────────────

/**
 * Public controller returned by `useOverlay()` and passed into the factory.
 *
 * Both `show()` and `hide()` are BINDING_BRAND-tagged so they are valid
 * inside trigger handler bodies. They are compile-time markers — the action
 * compiler recognises calls and lowers them to muxed LVGL show/hide actions.
 *
 * - `show()` sets the overlay's mux index to this instance, unhides the
 *   shared widget subtree, and brings it to the front within its z-order tier.
 *   When parameterized (`P` is not void), requires a params object whose fields
 *   are written to backing globals before showing.
 * - `hide()` hides the shared widget subtree (not muxed — the same
 *   widgets across all instances).
 */
export interface OverlayController<P = void> {
  readonly [BINDING_BRAND]?: true;
  readonly [OVERLAY_BRAND]?: true;
  /** Show this instance's overlay. When parameterized, requires a params object. */
  show(...args: P extends void ? [] : [params: P]): void;
  /** Hide the overlay. Safe to call from any trigger handler in any instance. */
  hide(): void;
}

/**
 * Per-instance data captured during a single `useOverlay()` call.
 *
 * The factory is evaluated for every instance (so per-instance closures are
 * captured). The rendered tree is retained so the codegen pass can walk it
 * to extract per-instance reactive bindings and compiled action handlers.
 */
export interface OverlayInstance {
  /** Mux index, assigned in order of discovery (0, 1, 2, ...). */
  readonly index: number;
  /** Rendered factory output — JSX subtree this instance produced. */
  readonly rendered: EspComposeElement | EspComposeElement[] | null | undefined;
  /**
   * Reactive bindings captured when this instance's rendered tree was
   * serialized through the LVGL pipeline.  Populated by `buildLvglSection()`
   * during Phase 4.  Used by the codegen to zip bindings across instances
   * and build mux expressions for divergent values.
   */
  capturedBindings?: readonly IRBinding[];
  /**
   * Reactive nodes (memos, effects) captured when this instance's rendered
   * tree was serialized.  Needed so the codegen can resolve memo-backed
   * bindings across instances.
   */
  capturedReactiveNodes?: readonly IRReactiveNode[];
  /**
   * Compiled action trees captured from trigger handler props during widget
   * serialization.  Each entry is one trigger handler (e.g. on_press) found
   * depth-first in the overlay's widget tree.  Positional indexing across
   * instances is guaranteed by the structural identity assertion.
   */
  capturedActions?: readonly CapturedOverlayAction[];
}

/**
 * A single trigger handler's compiled action metadata, captured from a
 * function prop with `__compiledActions` during overlay widget serialization.
 */
export interface CapturedOverlayAction {
  /** Raw compiled action tree from the action compiler. */
  readonly rawActions: IRActionNode[];
  /** Ref bindings for resolving ref references in actions. */
  readonly refBindings?: Record<string, unknown>;
}

/**
 * Per-template overlay definition — accumulates instances across the render pass.
 *
 * Created by the first `useOverlay()` call with this `templateKey`. Subsequent
 * calls with the same key append to `instances`. Only `instances[0].rendered`
 * is emitted into the `top_layer` widget tree; the rest contribute their
 * per-instance bindings + actions to the mux tables.
 */
export interface OverlayDefinition {
  /** Dedup key derived from the hook-path stack at the call site. */
  readonly templateKey: string;
  /** Ref token of the owning `<lvgl>` element. Used to scope overlays per-tree. */
  readonly lvgl: string;
  /** Numeric z-order tier for stacking in top_layer. */
  readonly zOrder: number;
  /** Deterministic tier key from useOverlayTier(). */
  readonly tierKey: string;
  /** Per-instance records, accumulated across all callers. */
  readonly instances: OverlayInstance[];
}

/** Configuration for `useOverlay()`. */
export interface OverlayConfig {
  /**
   * Overlay tier handle from `useOverlayTier()`.
   *
   * Required. Declares which z-order tier this overlay belongs to.
   * The tier controls stacking, optional shared backdrop, and
   * child-level visibility toggling.
   */
  tier: OverlayTierHandle;
}

// ── Overlay payload global declarations ──────────────────────────────────────

// Re-export from canonical location for backward compatibility.
export type { OverlayPayloadGlobalDecl } from './global-shared';

// ── Scope frame ─────────────────────────────────────────────────────────────

interface OverlayScopeFrame {
  /** Map templateKey → OverlayDefinition. Insertion order is preserved. */
  readonly definitions: Map<string, OverlayDefinition>;
}

const overlayScopeContext = createContext<OverlayScopeFrame | null>(null);

// ── Scope lifecycle ─────────────────────────────────────────────────────────

export interface OverlayScopeResult<T> {
  result: T;
  overlays: OverlayDefinition[];
}

/**
 * Establish an overlay scope frame and run `fn` inside it.
 *
 * Called by the compiler's execute phase to wrap the render pass alongside
 * `withScriptScope` and `withReactiveScope`. After `fn` returns, the
 * collected overlay definitions are returned for downstream codegen.
 */
export function withOverlayScope<T>(fn: () => T): OverlayScopeResult<T> {
  const frame: OverlayScopeFrame = { definitions: new Map() };
  const result = withContext(overlayScopeContext, frame, fn);
  return {
    result,
    overlays: Array.from(frame.definitions.values()),
  };
}

/**
 * Read the overlay definitions registered in the currently-active scope.
 *
 * When `lvgl` is provided, only overlays belonging to that `<lvgl>`
 * tree are returned. When omitted, all definitions are returned (used by
 * the execute phase to collect the flat list for downstream codegen).
 */
export function peekOverlayDefinitions(lvgl?: string): OverlayDefinition[] {
  const frame = useContext(overlayScopeContext);
  if (!frame) return [];
  const all = Array.from(frame.definitions.values());
  if (lvgl == null) return all;
  return all.filter(d => d.lvgl === lvgl);
}

// ── Hook ────────────────────────────────────────────────────────────────────

/**
 * Factory invoked once per component instance to produce the overlay's content.
 *
 * Receives the `OverlayController` so user code can call `ctrl.hide()`
 * inside trigger handlers without forward-reference issues.
 *
 * When the overlay is parameterized (`P` is not void), a second argument
 * (`ctx`) is provided whose `payload` field exposes reactive proxies for
 * each field of `P`. These are backed by globals so `ctx.payload.fieldName`
 * compiles to `global_read`.
 */
export type OverlayFactory<P = void> = P extends void
  ? (ctrl: OverlayController<P>) => EspComposeElement | EspComposeElement[]
  : (ctrl: OverlayController<P>, ctx: { payload: P }) => EspComposeElement | EspComposeElement[];

// ── Hook call counter ───────────────────────────────────────────────────────
// Disambiguates multiple useOverlay() calls within the same component.
// Uses the shared per-hook-path call index from useState (the same
// mechanism that powers useStableValue / useRef): each call returns the
// next 0-based index for the current hook path, and pushHookPath()
// resets a path's counter on entry. So:
//   - Component instance A calling useOverlay() twice → indices 0, 1
//   - Component instance B calling useOverlay() twice → indices 0, 1
//     (same indices, so B's calls correctly append to A's definitions)

/**
 * Declare a shared overlay whose widget subtree is deduplicated across all
 * instances of the calling component.
 *
 * Must be called inside a function component body. The dedup key is derived
 * from the current hook-path stack (component identity) plus a per-component
 * call index so that multiple `useOverlay()` calls in the same component each
 * get their own unique overlay definition.
 *
 * When parameterized (`P` is not void), `useOverlay` reads compiler-injected
 * `__overlayPayloadGlobals` metadata from the factory, registers backing globals,
 * builds a reactive params proxy, and attaches the param declarations to the
 * controller so downstream hooks (e.g. `useVisibility`) can wire show scripts.
 *
 * @param config - Overlay configuration. `zOrder` controls stacking tier
 *   (default `0`). Higher values render above lower values.
 * @param factory - Factory producing the overlay's JSX widget subtree.
 */
export function useOverlay<P = void>(config: OverlayConfig, factory: OverlayFactory<P>): OverlayController<P> {
  assertHookContext('useOverlay()');

  const tier = config.tier;
  const zOrder = tier[TIER_Z_ORDER];
  const tierKey = tier[TIER_KEY];

  // Require an enclosing <lvgl> context — overlays are lvgl-scoped.
  const lvglId = String(useLvgl());

  const basePath = getCurrentHookPath();
  if (!basePath) {
    throw new Error(
      'useOverlay() could not derive a template key from the hook-path stack. ' +
      'This is an internal error — useOverlay() must be called inside a function component.',
    );
  }

  const frame = useContext(overlayScopeContext);
  if (!frame) {
    throw new Error(
      'useOverlay() requires an overlay scope frame. ' +
      'The render pass must be wrapped in withOverlayScope() (the compiler does this automatically).',
    );
  }

  // Per-hook-path call index, allocated from the shared call-site counter.
  // Sibling component instances see the same index sequence (their counter
  // resets on each pushHookPath into the same path string).
  const callIndex = nextCallIndexAtHookPath();

  // Build a unique template key: hook-path + call-site index.
  const templateKey = `${basePath}#${callIndex}`;

  // Derive a deterministic, sanitized ID from the hook-path key.
  // Uses FNV-1a hashing to produce a stable C++-safe identifier with the
  // 'ovrl_' prefix following the autogen ID convention (r_, rw_, scr_, etc.).
  const safeKey = generateDeterministicId('ovrl', templateKey);

  let def = frame.definitions.get(templateKey);
  if (!def) {
    def = { templateKey: safeKey, lvgl: lvglId, zOrder, tierKey, instances: [] };
    frame.definitions.set(templateKey, def);
  }

  // ── Overlay payload handling ──────────────────────────────────────────
  // Read compiler-injected __overlayPayloadGlobals metadata, register globals,
  // and build reactive proxies for the factory's params parameter.
  const payloadDecls = readOverlayPayloadMeta(factory);
  let paramsProxy: Record<string, unknown> | undefined;

  if (payloadDecls && payloadDecls.length > 0) {
    const scopeMap = useContext(globalScopeContext) as Map<string, GlobalDefinition> | undefined;
    if (scopeMap) {
      for (const p of payloadDecls) {
        if (!scopeMap.has(p.globalId)) {
          scopeMap.set(p.globalId, { id: p.globalId, irType: p.irType });
          registerComponent({
            kind: 'component',
            section: 'globals',
            id: p.globalId,
            config: { id: p.globalId, irType: p.irType },
          });
        }
      }
    }

    paramsProxy = {};
    for (const p of payloadDecls) {
      const dep: IRDependency = { kind: 'dependency', sourceId: p.globalId, sourceType: 'global' };
      paramsProxy[p.name] = new IRReactiveNodeImpl({
        kind: 'expression',
        dependencies: [dep],
        exprType: irTypeToExprType(p.irType),
        sourceId: p.globalId,
        propertyKey: 'value',
      });
    }
  }

  const instanceIndex = def.instances.length;
  const ctrl = createOverlayController<P>(safeKey, instanceIndex, zOrder, tierKey, payloadDecls);

  // Evaluate the factory under a synthetic hook-path frame keyed by the
  // overlay's templateKey. This gives memoized hooks (useRef, useStableValue)
  // inside the factory a per-template identity: all N instances of the same
  // overlay share values (only instance 0's widgets commit), while distinct
  // overlays (e.g. each toast slot) get distinct values. The factory itself
  // is evaluated for every instance to capture per-instance closures
  // (entity bindings, compiled action handlers, useMemo() expressions).
  const rendered = withHookPath(safeKey, () =>
    paramsProxy
      ? (factory as (ctrl: OverlayController<P>, ctx: { payload: unknown }) => EspComposeElement | EspComposeElement[])(ctrl, { payload: paramsProxy })
      : (factory as (ctrl: OverlayController<P>) => EspComposeElement | EspComposeElement[])(ctrl),
  );

  def.instances.push({ index: instanceIndex, rendered });

  return ctrl;
}


// ── Internal helpers ────────────────────────────────────────────────────────

/**
 * Build an OverlayController for one instance.
 *
 * `show()` and `hide()` throw `throwCompileTimeOnly` at runtime — they are
 * meant to be statically recognised by the action compiler in trigger handler
 * bodies. The symbol-keyed fields (`OVERLAY_TEMPLATE_KEY`, etc.) carry the
 * overlay identity so the deferred ref-binding resolver in `overlay-resolve.ts`
 * can recover the mux index without needing a separate symbol resolution pass.
 */
function createOverlayController<P>(
  templateKey: string,
  instanceIndex: number,
  zOrder: number,
  tierKey: string,
  payloadDecls?: OverlayPayloadGlobalDecl[],
): OverlayController<P> {
  return {
    show(): void {
      throwCompileTimeOnly('overlay.show()', 'Overlay actions');
    },
    hide(): void {
      throwCompileTimeOnly('overlay.hide()', 'Overlay actions');
    },
    [OVERLAY_TEMPLATE_KEY]: templateKey,
    [OVERLAY_INSTANCE_INDEX]: instanceIndex,
    [OVERLAY_Z_ORDER]: zOrder,
    [OVERLAY_TIER_KEY]: tierKey,
    [OVERLAY_PAYLOAD_GLOBALS]: payloadDecls,
    [RESOLVE_METHOD_CALL](methodName: string, controllerRef: string): IRActionNode[] {
      if (methodName === 'show') return [irOverlayShow('', -1, 0, '', controllerRef)];
      if (methodName === 'hide') return [irOverlayHide('', 0, '', controllerRef)];
      return [];
    },
  } as OverlayController<P>;
}
