// ────────────────────────────────────────────────────────────────────────────
// usePopup — shared popup widget subtree with hook-path deduplication
//
// Each `usePopup(factory)` call inside a function component:
//   1. Derives a `templateKey` from the current hook-path stack (component
//      identity). All callers of the same component share a templateKey.
//   2. Evaluates the factory once per component instance (to capture each
//      instance's unique closures: entity bindings, action handlers).
//   3. The first instance's rendered widget subtree is emitted into the
//      LVGL `top_layer` section once. Subsequent instances contribute only
//      their per-instance data to the popup definition's instance table.
//
// The mux signal + table-driven codegen live in the ESPHome target and the
// compiler — this file is purely the registry + hook surface.
//
// Returns a `PopupController` whose `show()` and `dismiss()` methods are
// compile-time markers (BINDING_BRAND-tagged) — the AST/action compiler
// recognises them and lowers them to muxed lambda actions.
// ────────────────────────────────────────────────────────────────────────────

import { createContext, useContext, withContext } from './useContext';
import { assertHookContext, getCurrentHookPath } from './useState';
import { throwCompileTimeOnly } from '../errors';
import type { BINDING_BRAND, POPUP_BRAND } from '../types';
import type { EspComposeElement } from '../types';
import type { IRBinding } from './useReactiveScope';
import type { IRReactiveNode } from '../reactive-node';
import type { IRActionNode } from '../ir/action-types';

/**
 * Sanitize a hook-path string for use in C++ identifiers and LVGL widget IDs.
 * Replaces any character that is not alphanumeric or underscore with '_'.
 */
function sanitizeIdentifier(key: string): string {
  return key.replace(/[^a-zA-Z0-9_]/g, '_');
}

// ── Types ───────────────────────────────────────────────────────────────────

/**
 * Public controller returned by `usePopup()` and passed into the factory.
 *
 * Both `show()` and `dismiss()` are BINDING_BRAND-tagged so they are valid
 * inside trigger handler bodies. They are compile-time markers — the action
 * compiler recognises calls and lowers them to muxed LVGL show/hide actions.
 *
 * - `show()` sets the popup's mux index to this instance and unhides the
 *   shared backdrop + container.
 * - `dismiss()` hides the shared backdrop + container (not muxed — the same
 *   widgets across all instances).
 */
export interface PopupController {
  readonly [BINDING_BRAND]?: true;
  readonly [POPUP_BRAND]?: true;
  /** Show this instance's popup. */
  show(): void;
  /** Hide the popup. Safe to call from any trigger handler in any instance. */
  dismiss(): void;
}

/**
 * Per-instance data captured during a single `usePopup()` call.
 *
 * The factory is evaluated for every instance (so per-instance closures are
 * captured). The rendered tree is retained so the codegen pass can walk it
 * to extract per-instance reactive bindings and compiled action handlers.
 */
export interface PopupInstance {
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
   * depth-first in the popup's widget tree.  Positional indexing across
   * instances is guaranteed by the structural identity assertion.
   */
  capturedActions?: readonly CapturedPopupAction[];
}

/**
 * A single trigger handler's compiled action metadata, captured from a
 * function prop with `__compiledActions` during popup widget serialization.
 */
export interface CapturedPopupAction {
  /** Raw compiled action tree from the action compiler. */
  readonly rawActions: IRActionNode[];
  /** Ref bindings for resolving ref references in actions. */
  readonly refBindings?: Record<string, unknown>;
}

/**
 * Per-template popup definition — accumulates instances across the render pass.
 *
 * Created by the first `usePopup()` call with this `templateKey`. Subsequent
 * calls with the same key append to `instances`. Only `instances[0].rendered`
 * is emitted into the `top_layer` widget tree; the rest contribute their
 * per-instance bindings + actions to the mux tables.
 */
export interface PopupDefinition {
  /** Dedup key derived from the hook-path stack at the call site. */
  readonly templateKey: string;
  /** Per-instance records, accumulated across all callers. */
  readonly instances: PopupInstance[];
}

// ── Scope frame ─────────────────────────────────────────────────────────────

interface PopupScopeFrame {
  /** Map templateKey → PopupDefinition. Insertion order is preserved. */
  readonly definitions: Map<string, PopupDefinition>;
}

const popupScopeContext = createContext<PopupScopeFrame | null>(null);

// ── Scope lifecycle ─────────────────────────────────────────────────────────

export interface PopupScopeResult<T> {
  result: T;
  popups: PopupDefinition[];
}

/**
 * Establish a popup scope frame and run `fn` inside it.
 *
 * Called by the compiler's execute phase to wrap the render pass alongside
 * `withScriptScope` and `withReactiveScope`. After `fn` returns, the
 * collected popup definitions are returned for downstream codegen.
 */
export function withPopupScope<T>(fn: () => T): PopupScopeResult<T> {
  const frame: PopupScopeFrame = { definitions: new Map() };
  const result = withContext(popupScopeContext, frame, fn);
  return {
    result,
    popups: Array.from(frame.definitions.values()),
  };
}

/**
 * Read the popup definitions registered in the currently-active scope.
 *
 * Used by the LVGL serializer (`buildLvglSection`) to emit the popup widget
 * subtree into `top_layer` after children resolution completes. Returns an
 * empty array if no popup scope is active.
 */
export function peekPopupDefinitions(): PopupDefinition[] {
  const frame = useContext(popupScopeContext);
  if (!frame) return [];
  return Array.from(frame.definitions.values());
}

// ── Hook ────────────────────────────────────────────────────────────────────

/**
 * Factory invoked once per component instance to produce the popup's content.
 *
 * Receives the `PopupController` so user code can call `ctrl.dismiss()`
 * inside trigger handlers without forward-reference issues.
 */
export type PopupFactory = (ctrl: PopupController) => EspComposeElement | EspComposeElement[];

/**
 * Declare a shared popup whose widget subtree is deduplicated across all
 * instances of the calling component.
 *
 * Must be called inside a function component body. The dedup key is derived
 * from the current hook-path stack (component identity).
 */
export function usePopup(factory: PopupFactory): PopupController {
  assertHookContext('usePopup()');

  const templateKey = getCurrentHookPath();
  if (!templateKey) {
    throw new Error(
      'usePopup() could not derive a template key from the hook-path stack. ' +
      'This is an internal error — usePopup() must be called inside a function component.',
    );
  }

  // Sanitize for use in C++ identifiers and LVGL widget IDs.
  // The raw hook path may contain '/', '(', ')' etc.
  const safeKey = sanitizeIdentifier(templateKey);

  const frame = useContext(popupScopeContext);
  if (!frame) {
    throw new Error(
      'usePopup() requires a popup scope frame. ' +
      'The render pass must be wrapped in withPopupScope() (the compiler does this automatically).',
    );
  }

  let def = frame.definitions.get(templateKey);
  if (!def) {
    def = { templateKey: safeKey, instances: [] };
    frame.definitions.set(templateKey, def);
  }

  const instanceIndex = def.instances.length;
  const ctrl: PopupController = createPopupController(safeKey, instanceIndex);

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
 * Build a PopupController for one instance.
 *
 * `show()` and `dismiss()` throw `throwCompileTimeOnly` at runtime — they are
 * meant to be statically recognised by the action compiler in trigger handler
 * bodies. The `__templateKey` and `__instanceIndex` fields are set on the
 * runtime object (but hidden from the public TS interface) so the deferred
 * ref-binding resolver in `popup-resolve.ts` can recover the popup identity
 * and mux index without needing a separate symbol resolution pass.
 */
function createPopupController(templateKey: string, instanceIndex: number): PopupController {
  return {
    show(): void {
      throwCompileTimeOnly('popup.show()', 'Popup actions');
    },
    dismiss(): void {
      throwCompileTimeOnly('popup.dismiss()', 'Popup actions');
    },
    __templateKey: templateKey,
    __instanceIndex: instanceIndex,
  } as PopupController;
}
