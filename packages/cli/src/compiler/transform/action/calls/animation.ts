import ts from 'typescript';
import type { IRActionNode } from '@espcompose/core/internals';
import { irAnimationStart, irAnimationStop } from '@espcompose/core/internals';
import { hasAnimationBrand } from '../../type-brands.js';
import type { ActionCompilerContext } from '../context.js';
import { emitError } from '../context.js';

// ────────────────────────────────────────────────────────────────────────────
// Animation controller action compilation
// ────────────────────────────────────────────────────────────────────────────

/**
 * Check if a type + method name represents an animation controller action.
 *
 * Animation controllers created by `useAnimation()` are branded with
 * `ANIMATION_BRAND`. Only `start()` and `stop()` are valid methods.
 */
export function isAnimationActionCall(
  objType: ts.Type,
  methodName: string,
): methodName is 'start' | 'stop' {
  return hasAnimationBrand(objType) && (methodName === 'start' || methodName === 'stop');
}

/**
 * Compile `animCtrl.start()` or `animCtrl.stop()` to animation IR actions.
 *
 * Resolution is deferred: the controller's source-text identifier is captured
 * as a `controllerRef` placeholder. At serialization time the resolve pass
 * reads `ANIMATION_ID` from the controller in `__refBindings` and patches
 * the action with the concrete animation ID.
 */
export function compileAnimationAction(
  call: ts.CallExpression,
  objExpr: ts.Expression,
  _objType: ts.Type,
  methodName: 'start' | 'stop',
  ctx: ActionCompilerContext,
): IRActionNode[] | null {
  const controllerRef = objExpr.getText().trim();
  if (!controllerRef) {
    return emitError(call, ctx,
      'Could not resolve AnimationController identity: the controller expression has no source text. ' +
      'Assign the animation controller to a named variable before calling methods on it.');
  }

  ctx.animationControllerRefs.add(controllerRef);

  switch (methodName) {
    case 'start':
      return [irAnimationStart('', controllerRef)];
    case 'stop':
      return [irAnimationStop('', controllerRef)];
  }
}
