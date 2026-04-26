import ts from 'typescript';
import type { IRActionNode } from '@espcompose/core/internals';
import { irLvglVisibilityShow, irLvglVisibilityHide } from '@espcompose/core/internals';
import { hasLvglVisibilityBrand } from '../../type-brands.js';
import type { ActionCompilerContext } from '../context.js';
import { emitError } from '../context.js';

// ────────────────────────────────────────────────────────────────────────────
// LVGL visibility action compilation
// ────────────────────────────────────────────────────────────────────────────

/**
 * Check if a type + method name represents an LVGL visibility action call.
 *
 * LvglVisibilityController has `show()` and `hide()` methods, branded with
 * `LVGL_VISIBILITY_BRAND`.
 */
export function isLvglVisibilityActionCall(
  objType: ts.Type,
  methodName: string,
): methodName is 'show' | 'hide' {
  return hasLvglVisibilityBrand(objType) && (methodName === 'show' || methodName === 'hide');
}

/**
 * Compile `controller.show()` or `controller.hide()` to LVGL visibility IR actions.
 *
 * Resolution is deferred: the controller's source-text identifier is captured as
 * a `controllerRef` placeholder. At serialization time the resolve pass replaces
 * these with concrete overlay/widget actions from `__refBindings`.
 */
export function compileLvglVisibilityAction(
  call: ts.CallExpression,
  objExpr: ts.Expression,
  _objType: ts.Type,
  methodName: 'show' | 'hide',
  ctx: ActionCompilerContext,
): IRActionNode[] | null {
  const controllerRef = objExpr.getText().trim();
  if (!controllerRef) {
    return emitError(call, ctx,
      'Could not resolve LvglVisibilityController identity: the controller expression has no source text. ' +
      'Assign the controller to a named variable before calling .show()/.hide().');
  }

  ctx.lvglVisibilityControllerRefs.add(controllerRef);

  switch (methodName) {
    case 'show':
      return [irLvglVisibilityShow(controllerRef)];
    case 'hide':
      return [irLvglVisibilityHide(controllerRef)];
  }
}
