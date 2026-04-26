import ts from 'typescript';
import type { IRActionNode } from '@espcompose/core/internals';
import { irOverlayShow, irOverlayDismiss } from '@espcompose/core/internals';
import { hasOverlayBrand } from '../../type-brands.js';
import type { ActionCompilerContext } from '../context.js';
import { emitError } from '../context.js';

// ────────────────────────────────────────────────────────────────────────────
// Overlay action compilation
// ────────────────────────────────────────────────────────────────────────────

/**
 * Check if a type + method name represents an overlay action call.
 *
 * OverlayController has `show()` and `dismiss()` methods, both branded with
 * `OVERLAY_BRAND`.
 */
export function isOverlayActionCall(
  objType: ts.Type,
  methodName: string,
): methodName is 'show' | 'dismiss' {
  return hasOverlayBrand(objType) && (methodName === 'show' || methodName === 'dismiss');
}

/**
 * Compile `controller.show()` or `controller.dismiss()` to overlay IR actions.
 *
 * Resolution is always deferred: the controller's source-text identifier is
 * captured as a `controllerRef` placeholder. At serialization time the LVGL
 * serializer resolves it from `__refBindings` (the ref-slot pattern) to
 * recover the runtime `templateKey`, `instanceIndex`, and `zOrder`.
 *
 * Caller (`router.ts`) guarantees `methodName` is `'show'` or `'dismiss'` via
 * `isOverlayActionCall`.
 */
export function compileOverlayAction(
  call: ts.CallExpression,
  objExpr: ts.Expression,
  _objType: ts.Type,
  methodName: 'show' | 'dismiss',
  ctx: ActionCompilerContext,
): IRActionNode[] | null {
  const controllerRef = objExpr.getText().trim();
  if (!controllerRef) {
    return emitError(call, ctx,
      'Could not resolve OverlayController identity: the controller expression has no source text. ' +
      'Assign the controller to a named variable before calling .show()/.dismiss().');
  }

  ctx.overlayControllerRefs.add(controllerRef);

  switch (methodName) {
    case 'show':
      return [irOverlayShow('', -1, 0, controllerRef)];
    case 'dismiss':
      return [irOverlayDismiss('', 0, controllerRef)];
  }
}
