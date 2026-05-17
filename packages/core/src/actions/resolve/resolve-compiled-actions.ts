// ────────────────────────────────────────────────────────────────────────────
// resolveCompiledActions — one-shot resolution of deferred IR references
//
// Consolidates the repeated resolve + clean pattern used by trigger capture
// sites (useAttachedTrigger, LVGL serialize, capture.ts). Resolves controller
// method calls, overlay controller refs, and script handle closure indices,
// then strips the resolved objects from refBindings so they don't corrupt
// lambda string-substitution downstream.
// ────────────────────────────────────────────────────────────────────────────

import type { IRActionNode } from '../../ir/action-types';
import { resolveControllerMethodCalls, cleanControllerRefs } from './controller';
import { resolveOverlayControllerRefs, cleanOverlayControllerRefs } from './overlay';
import { resolveScriptHandleClosureIndex, cleanScriptHandleRefs } from './script-handle';

/**
 * Resolve all deferred IR references in a compiled action tree, then clean
 * the corresponding entries from `refBindings`.
 *
 * This is the standard resolution sequence for trigger handlers that were
 * compiled by the Script Transformer. Call sites that need additional steps
 * (e.g. parameterized controllers in `useScript`) should use the individual
 * resolve functions directly.
 */
export function resolveCompiledActions(
  actions: IRActionNode[],
  refBindings: Record<string, unknown> | undefined,
): void {
  resolveControllerMethodCalls(actions, refBindings);
  resolveOverlayControllerRefs(actions, refBindings);
  resolveScriptHandleClosureIndex(actions, refBindings);
  if (refBindings) {
    cleanControllerRefs(refBindings);
    cleanOverlayControllerRefs(refBindings);
    cleanScriptHandleRefs(refBindings);
  }
}
