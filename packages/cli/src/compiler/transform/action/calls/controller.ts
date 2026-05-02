import ts from 'typescript';
import type { IRActionNode } from '@espcompose/core/internals';
import { irControllerMethodCall } from '@espcompose/core/internals';
import { hasControllerBrand } from '../../type-brands.js';
import type { ActionCompilerContext } from '../context.js';
import { emitError } from '../context.js';

// ────────────────────────────────────────────────────────────────────────────
// Controller method call compilation
// ────────────────────────────────────────────────────────────────────────────

/**
 * Check if a type + method name represents a controller method call.
 *
 * Controllers created by `useController()` are branded with `CONTROLLER_BRAND`.
 * Any method call on a controller-branded type is compiled as a controller
 * method call — resolved to `script_execute` at serialization time.
 */
export function isControllerMethodCall(
  objType: ts.Type,
  _methodName: string,
): boolean {
  return hasControllerBrand(objType);
}

/**
 * Compile `controller.method()` to a controller method call IR action.
 *
 * Resolution is deferred: the controller's source-text identifier is captured
 * as a `controllerRef` placeholder. At serialization time the resolve pass
 * looks up `__scripts[methodName]` on the controller in `__refBindings` and
 * replaces with `irScriptExecute`.
 */
export function compileControllerMethodCall(
  call: ts.CallExpression,
  objExpr: ts.Expression,
  _objType: ts.Type,
  methodName: string,
  ctx: ActionCompilerContext,
): IRActionNode[] | null {
  const controllerRef = objExpr.getText().trim();
  if (!controllerRef) {
    return emitError(call, ctx,
      'Could not resolve controller identity: the controller expression has no source text. ' +
      'Assign the controller to a named variable before calling methods on it.');
  }

  ctx.controllerRefs.add(controllerRef);

  return [irControllerMethodCall(controllerRef, methodName)];
}
