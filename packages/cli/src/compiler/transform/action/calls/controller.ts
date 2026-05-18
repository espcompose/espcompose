import ts from 'typescript';
import type { IRActionNode, IRExpression } from '@espcompose/core/internals';
import { irControllerMethodCall } from '@espcompose/core/internals';
import { hasControllerBrand } from '../../type-brands.js';
import type { ActionCompilerContext } from '../context.js';
import { emitError } from '../context.js';
import { compileArgExpression } from './script-args.js';

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
 * Compile `controller.method()` or `controller.method({ key: val })` to a
 * controller method call IR action.
 *
 * Resolution is deferred: the controller's source-text identifier is captured
 * as a `controllerRef` placeholder. At serialization time the resolve pass
 * looks up `CONTROLLER_SCRIPTS[methodName]` on the controller in `__refBindings` and
 * replaces with `irScriptExecute`.
 *
 * When the call has an object-literal argument (parameterized show), its
 * properties are compiled into named `args` on the IR action.
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

  // Compile object-literal argument if present (parameterized controller calls).
  const args = compileControllerCallArgs(call, ctx);

  return [irControllerMethodCall(controllerRef, methodName, args ?? undefined)];
}

// ────────────────────────────────────────────────────────────────────────────
// Object-form argument compilation
// ────────────────────────────────────────────────────────────────────────────

/**
 * Compile an object-literal first argument into named args.
 *
 * Used for parameterized controller methods like:
 *   `ctrl.show({ message: "Hello", count: 5 })`
 *
 * Returns null if no arguments or argument is not an object literal.
 */
function compileControllerCallArgs(
  call: ts.CallExpression,
  ctx: ActionCompilerContext,
): Record<string, IRExpression> | null {
  if (call.arguments.length === 0) return null;

  const firstArg = call.arguments[0];
  if (!ts.isObjectLiteralExpression(firstArg)) return null;

  const args: Record<string, IRExpression> = {};
  for (const prop of firstArg.properties) {
    if (!ts.isPropertyAssignment(prop)) continue;
    const name = ts.isIdentifier(prop.name)
      ? prop.name.text
      : ts.isStringLiteral(prop.name) ? prop.name.text : null;
    if (!name) continue;

    const compiled = compileArgExpression(prop.initializer, ctx);
    if (compiled) {
      args[name] = compiled;
    } else {
      emitError(prop.initializer, ctx,
        `Controller method argument '${name}' must be a literal value, trigger variable, or script parameter.`);
      return null;
    }
  }

  return Object.keys(args).length > 0 ? args : null;
}
