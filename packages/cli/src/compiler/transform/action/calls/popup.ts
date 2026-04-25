import ts from 'typescript';
import type { IRActionNode } from '@espcompose/core/internals';
import { irPopupShow, irPopupDismiss } from '@espcompose/core/internals';
import { hasPopupBrand } from '../../type-brands.js';
import type { ActionCompilerContext } from '../context.js';
import { emitError } from '../context.js';

// ────────────────────────────────────────────────────────────────────────────
// Popup action compilation
// ────────────────────────────────────────────────────────────────────────────

/**
 * Check if a type + method name represents a popup action call.
 *
 * PopupController has `show()` and `dismiss()` methods, both branded with
 * `POPUP_BRAND`.
 */
export function isPopupActionCall(
  objType: ts.Type,
  methodName: string,
): methodName is 'show' | 'dismiss' {
  return hasPopupBrand(objType) && (methodName === 'show' || methodName === 'dismiss');
}

/**
 * Compile `controller.show()` or `controller.dismiss()` to popup IR actions.
 *
 * Resolution is always deferred: the controller's source-text identifier is
 * captured as a `controllerRef` placeholder. At serialization time the LVGL
 * serializer resolves it from `__refBindings` (the ref-slot pattern) to
 * recover the runtime `templateKey` and `instanceIndex`.
 *
 * Caller (`router.ts`) guarantees `methodName` is `'show'` or `'dismiss'` via
 * `isPopupActionCall`.
 */
export function compilePopupAction(
  call: ts.CallExpression,
  objExpr: ts.Expression,
  _objType: ts.Type,
  methodName: 'show' | 'dismiss',
  ctx: ActionCompilerContext,
): IRActionNode[] | null {
  const controllerRef = objExpr.getText().trim();
  if (!controllerRef) {
    return emitError(call, ctx,
      'Could not resolve PopupController identity: the controller expression has no source text. ' +
      'Assign the controller to a named variable before calling .show()/.dismiss().');
  }

  ctx.popupControllerRefs.add(controllerRef);

  switch (methodName) {
    case 'show':
      return [irPopupShow('', -1, controllerRef)];
    case 'dismiss':
      return [irPopupDismiss('', controllerRef)];
  }
}
