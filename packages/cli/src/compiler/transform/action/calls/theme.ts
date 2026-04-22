import ts from 'typescript';
import type { IRActionNode } from '@espcompose/core/internals';
import { irThemeSelect, scopeHash } from '@espcompose/core/internals';
import { hasThemeBrand, extractThemeScopeFromType } from '../../type-brands.js';
import type { ActionCompilerContext } from '../context.js';
import { emitError } from '../context.js';

// ────────────────────────────────────────────────────────────────────────────
// Theme action compilation
// ────────────────────────────────────────────────────────────────────────────

/**
 * Compile `handle.select('themeName')` — type-based theme handle detection.
 *
 * Reads the scope string from the handle's literal `scope` property type,
 * then emits `irThemeSelect(scope, scopeId, themeName)`.
 */
export function compileThemeSelect(
  call: ts.CallExpression,
  handleType: ts.Type,
  ctx: ActionCompilerContext,
): IRActionNode[] | null {
  if (call.arguments.length < 1) {
    return emitError(call, ctx, 'ThemeHandle.select() requires a theme name argument.');
  }

  const nameArg = call.arguments[0];
  if (!ts.isStringLiteral(nameArg)) {
    return emitError(nameArg, ctx,
      'ThemeHandle.select() theme name argument must be a string literal.');
  }

  const scope = extractThemeScopeFromType(handleType, ctx.checker);
  if (!scope) {
    return emitError(call, ctx,
      'Could not extract scope string from theme handle type. ' +
      'Ensure the handle was created with createTheme() using a string literal scope.');
  }

  const scopeId = scopeHash(scope);
  const themeName = nameArg.text;
  return [irThemeSelect(scope, scopeId, themeName)];
}

/** Check if a type + method name represents a theme select call. */
export function isThemeSelectCall(objType: ts.Type, methodName: string): boolean {
  return hasThemeBrand(objType) && methodName === 'select';
}
