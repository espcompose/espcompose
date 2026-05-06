import ts from 'typescript';
import type { IRActionNode, IRType } from '@espcompose/core/internals';
import {
  irOverlayShow,
  irOverlayHide,
  irGlobalSet,
  irLiteralExpression,
  irTriggerVarExpression,
  generateDeterministicId,
  IR_INT,
  IR_FLOAT,
  IR_STRING,
  IR_BOOL,
} from '@espcompose/core/internals';
import { hasOverlayBrand } from '../../type-brands.js';
import { translateScriptExprIR } from '../../expr-compiler.js';
import type { ActionCompilerContext } from '../context.js';
import { emitError } from '../context.js';
import { buildScriptCtxWithGlobals } from '../control-flow.js';

// ────────────────────────────────────────────────────────────────────────────
// Overlay action compilation
// ────────────────────────────────────────────────────────────────────────────

/**
 * Check if a type + method name represents an overlay action call.
 *
 * OverlayController has `show()` and `hide()` methods, both branded with
 * `OVERLAY_BRAND`.
 */
export function isOverlayActionCall(
  objType: ts.Type,
  methodName: string,
): methodName is 'show' | 'hide' {
  return hasOverlayBrand(objType) && (methodName === 'show' || methodName === 'hide');
}

/**
 * Compile `controller.show()` or `controller.hide()` to overlay IR actions.
 *
 * Resolution is always deferred: the controller's source-text identifier is
 * captured as a `controllerRef` placeholder. At serialization time the LVGL
 * serializer resolves it from `__refBindings` (the ref-slot pattern) to
 * recover the runtime `templateKey`, `instanceIndex`, and `zOrder`.
 *
 * When the overlay is parameterized and `show(params)` is called with an
 * object literal, emits `irGlobalSet` for each field before the show action.
 *
 * Caller (`router.ts`) guarantees `methodName` is `'show'` or `'hide'` via
 * `isOverlayActionCall`.
 */
export function compileOverlayAction(
  call: ts.CallExpression,
  objExpr: ts.Expression,
  _objType: ts.Type,
  methodName: 'show' | 'hide',
  ctx: ActionCompilerContext,
): IRActionNode[] | null {
  const controllerRef = objExpr.getText().trim();
  if (!controllerRef) {
    return emitError(call, ctx,
      'Could not resolve OverlayController identity: the controller expression has no source text. ' +
      'Assign the controller to a named variable before calling .show()/.hide().');
  }

  ctx.overlayControllerRefs.add(controllerRef);

  switch (methodName) {
    case 'show': {
      const globalSetActions = compileOverlayShowParams(call, controllerRef, _objType, ctx);
      return [...globalSetActions, irOverlayShow('', -1, 0, controllerRef)];
    }
    case 'hide':
      return [irOverlayHide('', 0, controllerRef)];
  }
}

/**
 * Compile params from `ctrl.show({ field: value })` to irGlobalSet actions.
 *
 * Extracts the generic type param `P` from `OverlayController<P>`, iterates
 * the object literal's properties, and emits a global-set per field using the
 * same deterministic ID convention as the expr-compiler's param extraction.
 */
function compileOverlayShowParams(
  call: ts.CallExpression,
  controllerRef: string,
  objType: ts.Type,
  ctx: ActionCompilerContext,
): IRActionNode[] {
  if (call.arguments.length === 0) return [];
  const arg = call.arguments[0];
  if (!ts.isObjectLiteralExpression(arg)) return [];

  // Extract the type parameter P from OverlayController<P>.
  // The type alias resolution gives us the generic type arguments.
  const typeArgs = (objType as ts.TypeReference).typeArguments;
  if (!typeArgs || typeArgs.length === 0) return [];
  const paramsType = typeArgs[0];

  // Void or undefined means non-parameterized.
  if (paramsType.flags & (ts.TypeFlags.Void | ts.TypeFlags.Undefined)) return [];

  const actions: IRActionNode[] = [];

  for (const prop of arg.properties) {
    if (!ts.isPropertyAssignment(prop)) continue;
    const propName = ts.isIdentifier(prop.name) ? prop.name.text :
                     ts.isStringLiteral(prop.name) ? prop.name.text : null;
    if (!propName) continue;

    // Derive globalId using same algorithm as extractControllerParamFields.
    const globalId = generateDeterministicId('g', `${controllerRef}_${propName}`);

    // Infer IRType from the P type's property.
    const propSymbol = paramsType.getProperty(propName);
    const irType = propSymbol
      ? inferIRTypeFromSymbol(propSymbol, prop, ctx.checker)
      : inferIRTypeFromExpression(prop.initializer, ctx.checker);
    if (!irType) continue;

    // Compile the value expression.
    const valueNode = prop.initializer;

    // Try literal first.
    if (ts.isNumericLiteral(valueNode)) {
      actions.push(irGlobalSet(globalId, irType, irLiteralExpression(Number(valueNode.text))));
      continue;
    }
    if (ts.isStringLiteral(valueNode) || ts.isNoSubstitutionTemplateLiteral(valueNode)) {
      actions.push(irGlobalSet(globalId, irType, irLiteralExpression(valueNode.text)));
      continue;
    }
    if (valueNode.kind === ts.SyntaxKind.TrueKeyword) {
      actions.push(irGlobalSet(globalId, irType, irLiteralExpression(true)));
      continue;
    }
    if (valueNode.kind === ts.SyntaxKind.FalseKeyword) {
      actions.push(irGlobalSet(globalId, irType, irLiteralExpression(false)));
      continue;
    }

    // Try trigger variable: args.field
    if (ts.isPropertyAccessExpression(valueNode) && ts.isIdentifier(valueNode.expression) &&
        valueNode.expression.text === ctx.triggerParamName) {
      const varName = valueNode.name.text;
      ctx.triggerVars.add(varName);
      actions.push(irGlobalSet(globalId, irType, irTriggerVarExpression(varName)));
      continue;
    }

    // Try compiling as a reactive expression.
    const scriptCtx = buildScriptCtxWithGlobals(ctx);
    const exprIR = translateScriptExprIR(valueNode, scriptCtx);
    if (exprIR !== null) {
      actions.push(irGlobalSet(globalId, irType, exprIR));
    }
  }

  return actions;
}

function inferIRTypeFromSymbol(sym: ts.Symbol, location: ts.Node, checker: ts.TypeChecker): IRType | null {
  const type = checker.getTypeOfSymbolAtLocation(sym, location);
  return inferIRTypeFromTsType(type, checker);
}

function inferIRTypeFromExpression(expr: ts.Expression, checker: ts.TypeChecker): IRType | null {
  const type = checker.getTypeAtLocation(expr);
  return inferIRTypeFromTsType(type, checker);
}

function inferIRTypeFromTsType(type: ts.Type, checker: ts.TypeChecker): IRType | null {
  if (type.isIntersection()) {
    const hasNumber = type.types.some(t => t.flags & ts.TypeFlags.Number);
    if (hasNumber) {
      const hasIntBrand = type.types.some(t => t.getProperty('__espcompose_int__') != null);
      if (hasIntBrand) return IR_INT;
    }
    for (const t of type.types) {
      if (t.flags & ts.TypeFlags.Number) return IR_FLOAT;
      if (t.flags & ts.TypeFlags.String) return IR_STRING;
      if (t.flags & ts.TypeFlags.Boolean) return IR_BOOL;
    }
  }
  if (type.aliasSymbol?.name === 'Int') return IR_INT;
  if (type.flags & ts.TypeFlags.Number || type.flags & ts.TypeFlags.NumberLiteral) return IR_FLOAT;
  if (type.flags & ts.TypeFlags.String || type.flags & ts.TypeFlags.StringLiteral) return IR_STRING;
  if (type.flags & ts.TypeFlags.Boolean || type.flags & ts.TypeFlags.BooleanLiteral) return IR_BOOL;

  const baseConstraint = checker.getBaseConstraintOfType(type);
  if (baseConstraint && baseConstraint !== type) return inferIRTypeFromTsType(baseConstraint, checker);
  return null;
}
