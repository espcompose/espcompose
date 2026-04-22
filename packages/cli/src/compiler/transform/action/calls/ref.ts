import ts from 'typescript';
import type { IRActionNode, IRActionConfig } from '@espcompose/core/internals';
import { irNativeAction } from '@espcompose/core/internals';
import type { ActionCompilerContext } from '../context.js';
import { emitError } from '../context.js';
import { LVGL_PAGE_ACTIONS, buildLvglPageActionConfig, buildRefActionConfig } from '../params.js';

// ────────────────────────────────────────────────────────────────────────────
// Component ref action compilation
// ────────────────────────────────────────────────────────────────────────────

export function compileRefAction(
  call: ts.CallExpression,
  refName: string,
  methodName: string,
  ctx: ActionCompilerContext,
): IRActionNode[] | null {
  // Resolve the YAML action key from the @actionKey JSDoc tag on the method declaration.
  // This is the source of truth — embedded by the codegen from ESPHome schema data.
  const actionKey = resolveActionKeyFromJSDoc(call, ctx.checker);
  if (!actionKey) {
    return emitError(call, ctx,
      `Unable to resolve action key for '${methodName}'. ` +
      'The method declaration is missing an @actionKey JSDoc tag.');
  }

  // LVGL page actions use auto-resolved lvgl_id, so we must NOT inject
  // the caller ref as `id`. Build config from params only.
  if (LVGL_PAGE_ACTIONS.has(actionKey)) {
    const config = buildLvglPageActionConfig(call, ctx);
    return [irNativeAction(actionKey, config)];
  }

  // Build action config — always include the ref ID
  const config: IRActionConfig = buildRefActionConfig(call, refName, ctx);

  return [irNativeAction(actionKey, config)];
}

/**
 * Resolve the YAML action key from the `@actionKey` JSDoc tag on a method's
 * declaration. The codegen emits this tag on every action interface method,
 * making it the single source of truth for action key resolution.
 */
function resolveActionKeyFromJSDoc(
  call: ts.CallExpression,
  checker: ts.TypeChecker,
): string | undefined {
  if (!ts.isPropertyAccessExpression(call.expression)) return undefined;
  const methodSymbol = checker.getSymbolAtLocation(call.expression.name);
  if (!methodSymbol) return undefined;

  const declarations = methodSymbol.getDeclarations();
  if (!declarations || declarations.length === 0) return undefined;

  for (const decl of declarations) {
    const jsdocTags = ts.getJSDocTags(decl);
    for (const tag of jsdocTags) {
      if (tag.tagName.text === 'actionKey' && typeof tag.comment === 'string') {
        return tag.comment.trim();
      }
    }
  }
  return undefined;
}
