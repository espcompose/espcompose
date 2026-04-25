import ts from 'typescript';
import type { IRActionNode } from '@espcompose/core/internals';
import {
  irLoggerAction,
  irDelayAction,
  irScriptExecute,
  irScriptStop,
  irArrayClear,
} from '@espcompose/core/internals';
import { hasRefBrand, isCoreExportCall, isCorePropertyCall } from '../../type-brands.js';
import type { ActionCompilerContext } from '../context.js';
import { lookupBySymbol, emitError } from '../context.js';
import type { HAEntityInfo } from '../../expr-compiler.js';
import { getCallName, extractDurationArg } from '../util.js';
import { compileHAAction, inferHAEntityDomainFromType } from './ha.js';
import { compileRefAction } from './ref.js';
import { compileGlobalSet, compileArraySet, compileArrayPush } from './global.js';
import { compileThemeSelect, isThemeSelectCall } from './theme.js';
import { compilePopupAction, isPopupActionCall } from './popup.js';

// ────────────────────────────────────────────────────────────────────────────
// Action call classification and routing
// ────────────────────────────────────────────────────────────────────────────

export function compileActionCall(
  call: ts.CallExpression,
  ctx: ActionCompilerContext,
): IRActionNode[] | null {
  // logger.log(msg) / logger.log(msg, level)
  if (isCorePropertyCall(call, 'logger', 'log', ctx.checker)) {
    return compileLoggerCall(call, ctx);
  }

  // ref.method(args) — component action
  if (ts.isPropertyAccessExpression(call.expression)) {
    const methodName = call.expression.name.text;

    // ── Symbol-based resolution (direct identifier access) ──────────
    if (ts.isIdentifier(call.expression.expression)) {
      const objNode = call.expression.expression;

      // scriptHandle.execute() / scriptHandle.stop()
      const scriptId = lookupBySymbol(ctx.scriptHandles, objNode, ctx.checker);
      if (scriptId) {
        if (methodName === 'execute') return [irScriptExecute(scriptId)];
        if (methodName === 'stop') return [irScriptStop(scriptId)];
        return emitError(call, ctx,
          `Script handle only supports .execute() and .stop(). '${methodName}' is not a valid script operation.`);
      }

      // globalHandle.set(value) / array methods
      const globalDef = lookupBySymbol(ctx.globalHandles, objNode, ctx.checker);
      if (globalDef) {
        if (methodName === 'set') {
          // Overloaded: 1 arg = scalar set, 2 args = array index set
          if (call.arguments.length === 2) {
            return compileArraySet(call, globalDef, ctx);
          }
          return compileGlobalSet(call, globalDef, ctx);
        }
        if (methodName === 'push') return compileArrayPush(call, globalDef, ctx);
        if (methodName === 'clear') return [irArrayClear(globalDef.id, globalDef.cppType)];
        return emitError(call, ctx,
          `Global handle does not support .${methodName}(). ` +
          'Supported: .set(), .push(), .clear() (arrays) or .set() (scalars).');
      }

      // HA entity action (symbol-based)
      const haEntity = lookupBySymbol(ctx.haEntities, objNode, ctx.checker);
      if (haEntity) {
        return compileHAAction(call, haEntity, methodName, ctx);
      }
    }

    // ── Type-based resolution (works for any expression depth) ──────
    // Handles: props.entity.toggle(), this.light.turnOn(), etc.
    const objExpr = call.expression.expression;
    const objType = ctx.checker.getTypeAtLocation(objExpr);

    // Popup controller — controller.show() / controller.dismiss()
    if (isPopupActionCall(objType, methodName)) {
      return compilePopupAction(call, objExpr, objType, methodName, ctx);
    }

    // HA entity action (type-based)
    const inferredDomain = inferHAEntityDomainFromType(objType);
    if (inferredDomain) {
      const dynamicEntity: HAEntityInfo = {
        entityId: '__dynamic__',
        domain: inferredDomain,
        isDynamic: true,
        entityIdExpr: objExpr.getText(),
      };
      return compileHAAction(call, dynamicEntity, methodName, ctx);
    }

    // Theme handle — handle.select(name)
    if (isThemeSelectCall(objType, methodName)) {
      return compileThemeSelect(call, objType, ctx);
    }

    // Component ref action (type-based)
    if (hasRefBrand(objType)) {
      const objName = ts.isIdentifier(objExpr) ? objExpr.text : objExpr.getText();
      if (!ts.isIdentifier(objExpr)) {
        ctx.refExpressions.add(objName);
      }
      return compileRefAction(call, objName, methodName, ctx);
    }
  }

  // delay() without await — still valid as fire-and-forget
  if (isCoreExportCall(call, 'delay', ctx.checker)) {
    if (call.arguments.length < 1) {
      return emitError(call, ctx, 'delay() requires a duration argument.');
    }
    const duration = extractDurationArg(call.arguments[0]);
    if (duration === null) {
      return emitError(call.arguments[0], ctx,
        'delay() argument must be a numeric literal (milliseconds) or a string duration.');
    }
    return [irDelayAction(duration)];
  }

  // scriptHandle() without await — fire and forget
  if (ts.isIdentifier(call.expression)) {
    const scriptId = lookupBySymbol(ctx.scriptHandles, call.expression, ctx.checker);
    if (scriptId) {
      return [irScriptExecute(scriptId)];
    }
  }

  return emitError(call, ctx,
    `'${getCallName(call)}()' is not a recognized ESPHome action. ` +
    'Only component actions (ref.method()), HA entity actions, logger.log(), ' +
    'delay(), and script operations are supported.');
}

// ────────────────────────────────────────────────────────────────────────────
// Logger
// ────────────────────────────────────────────────────────────────────────────

function compileLoggerCall(
  call: ts.CallExpression,
  ctx: ActionCompilerContext,
): IRActionNode[] | null {
  if (call.arguments.length < 1) {
    return emitError(call, ctx, 'logger.log() requires a message argument.');
  }

  const msgArg = call.arguments[0];
  if (!ts.isStringLiteral(msgArg) && !ts.isNoSubstitutionTemplateLiteral(msgArg)) {
    return emitError(msgArg, ctx,
      'logger.log() message must be a string literal.');
  }
  const message = msgArg.text;

  let level: string | undefined;
  if (call.arguments.length >= 2) {
    const levelArg = call.arguments[1];
    if (ts.isStringLiteral(levelArg)) {
      level = levelArg.text;
    }
  }

  return [irLoggerAction(message, level)];
}
