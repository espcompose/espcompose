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
import { assertHookContext, getCurrentHookPath, getHookPathGeneration } from './useState';
import { throwCompileTimeOnly } from '../errors';
import type { BINDING_BRAND, OVERLAY_BRAND } from '../types';
import type { EspComposeElement } from '../types';
import type { IRBinding } from './useReactiveScope';
import type { IRReactiveNode } from '../reactive';
import type { IRActionNode } from '../ir/action-types';
import { irOverlayShow, irOverlayHide } from '../ir/action-types';
import { generateDeterministicId } from '../id';
import { RESOLVE_METHOD_CALL } from '../actions/resolve/symbols';

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
 * - `hide()` hides the shared widget subtree (not muxed — the same
 *   widgets across all instances).
 */
export interface OverlayController {
  readonly [BINDING_BRAND]?: true;
  readonly [OVERLAY_BRAND]?: true;
  /** Show this instance's overlay. */
  show(): void;
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
  /** Numeric z-order tier for stacking in top_layer. */
  readonly zOrder: number;
  /** Per-instance records, accumulated across all callers. */
  readonly instances: OverlayInstance[];
}

/** Configuration for `useOverlay()`. */
export interface OverlayConfig {
  /**
   * Numeric z-order tier. Overlays with higher `zOrder` are rendered above
   * those with lower values. Within the same tier, last-shown-wins.
   *
   * @default 0
   */
  zOrder?: number;
}

// ── Scope frame ─────────────────────────────────────────────────────────────

interface OverlayScopeFrame {
  /** Map templateKey → OverlayDefinition. Insertion order is preserved. */
  readonly definitions: Map<string, OverlayDefinition>;
  /** Hook-path generation seen at the last useOverlay() call, for reset detection. */
  _lastGeneration?: number;
  /** Per-component-invocation call counter for useOverlay(). */
  _hookCallIndex?: number;
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
 * Used by the LVGL serializer (`buildLvglSection`) to emit the overlay widget
 * subtrees into `top_layer` after children resolution completes. Returns an
 * empty array if no overlay scope is active.
 */
export function peekOverlayDefinitions(): OverlayDefinition[] {
  const frame = useContext(overlayScopeContext);
  if (!frame) return [];
  return Array.from(frame.definitions.values());
}

// ── Hook ────────────────────────────────────────────────────────────────────

/**
 * Factory invoked once per component instance to produce the overlay's content.
 *
 * Receives the `OverlayController` so user code can call `ctrl.hide()`
 * inside trigger handlers without forward-reference issues.
 */
export type OverlayFactory = (ctrl: OverlayController) => EspComposeElement | EspComposeElement[];

// ── Hook call counter ───────────────────────────────────────────────────────
// Disambiguates multiple useOverlay() calls within the same component.
// Uses a Map<hookPath, callIndex> on the overlay scope frame to track how many
// useOverlay() calls have occurred for each distinct hook path. The map is
// cleared when the hook path changes (which means a different component
// invocation started). This ensures:
//   - Component instance A calling useOverlay() twice → keys path#0, path#1
//   - Component instance B calling useOverlay() twice → keys path#0, path#1
//     (same keys as A, so B's calls correctly append to A's definitions)

/**
 * Declare a shared overlay whose widget subtree is deduplicated across all
 * instances of the calling component.
 *
 * Must be called inside a function component body. The dedup key is derived
 * from the current hook-path stack (component identity) plus a per-component
 * call index so that multiple `useOverlay()` calls in the same component each
 * get their own unique overlay definition.
 *
 * @param config - Overlay configuration. `zOrder` controls stacking tier
 *   (default `0`). Higher values render above lower values.
 * @param factory - Factory producing the overlay's JSX widget subtree.
 */
export function useOverlay(config: OverlayConfig, factory: OverlayFactory): OverlayController {
  assertHookContext('useOverlay()');

  const zOrder = config.zOrder ?? 0;

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

  // Per-hook-path call counter.  Resets at the start of each component
  // invocation.  We detect invocation boundaries via the hook-path
  // generation counter — it increments on every pushHookPath/popHookPath,
  // so even two sibling instances with the same path string will see
  // different generations after the pop+push cycle between them.
  const gen = getHookPathGeneration();
  if (gen !== frame._lastGeneration) {
    frame._lastGeneration = gen;
    frame._hookCallIndex = 0;
  }
  const callIndex = frame._hookCallIndex!++;

  // Build a unique template key: hook-path + call-site index.
  const templateKey = `${basePath}#${callIndex}`;

  // Derive a deterministic, sanitized ID from the hook-path key.
  // Uses FNV-1a hashing to produce a stable C++-safe identifier with the
  // 'ovrl_' prefix following the autogen ID convention (r_, rw_, scr_, etc.).
  const safeKey = generateDeterministicId('ovrl', templateKey);

  let def = frame.definitions.get(templateKey);
  if (!def) {
    def = { templateKey: safeKey, zOrder, instances: [] };
    frame.definitions.set(templateKey, def);
  }

  const instanceIndex = def.instances.length;
  const ctrl: OverlayController = createOverlayController(safeKey, instanceIndex, zOrder);

  // Evaluate the factory — captures this instance's unique closures
  // (entity bindings, compiled action handlers, useMemo() expressions).
  // Even though only instance #0's widget subtree is emitted, every
  // instance must evaluate so the compiler captures its data.
  const rendered = factory(ctrl);

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
function createOverlayController(templateKey: string, instanceIndex: number, zOrder: number): OverlayController {
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
    [RESOLVE_METHOD_CALL](methodName: string, controllerRef: string): IRActionNode[] {
      if (methodName === 'show') return [irOverlayShow('', -1, 0, controllerRef)];
      if (methodName === 'hide') return [irOverlayHide('', 0, controllerRef)];
      return [];
    },
  } as OverlayController;
}
