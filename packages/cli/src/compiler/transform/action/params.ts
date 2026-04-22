import ts from 'typescript';
import type {
  IRActionParam,
  IRActionConfig,
  IRActionConfigDict,
  IRActionConfigValue,
} from '@espcompose/core/internals';
import { camelToSnake } from '@espcompose/core/internals';
import { hasRefBrand } from '../type-brands.js';
import type { ActionCompilerContext } from './context.js';
import { emitError } from './context.js';

// ────────────────────────────────────────────────────────────────────────────
// Action parameter compilation
// ────────────────────────────────────────────────────────────────────────────

/**
 * Compile an expression used as an action parameter value.
 *
 * Supported:
 * - Literal values (numbers, strings, booleans) → IRLiteralParam
 * - Trigger variable references (args.x) → IRTriggerVarParam
 *
 * Unsupported expressions produce compile errors.
 */
export function compileActionParam(
  expr: ts.Expression,
  ctx: ActionCompilerContext,
): IRActionParam | null {
  // Numeric literal
  if (ts.isNumericLiteral(expr)) {
    return { kind: 'literal', value: parseFloat(expr.text) };
  }

  // String literal
  if (ts.isStringLiteral(expr) || ts.isNoSubstitutionTemplateLiteral(expr)) {
    return { kind: 'literal', value: expr.text };
  }

  // Boolean literal
  if (expr.kind === ts.SyntaxKind.TrueKeyword) {
    return { kind: 'literal', value: true };
  }
  if (expr.kind === ts.SyntaxKind.FalseKeyword) {
    return { kind: 'literal', value: false };
  }

  // Trigger variable: args.x
  if (ts.isPropertyAccessExpression(expr) &&
      ts.isIdentifier(expr.expression) &&
      expr.expression.text === ctx.triggerParamName) {
    const varName = expr.name.text;
    ctx.triggerVars.add(varName);
    return { kind: 'trigger_var', varName };
  }

  emitError(expr, ctx,
    'Action parameters must be literal values or trigger variables (args.x). ' +
    'Computed expressions are not supported.');
  return null;
}

/**
 * Compile an object-literal action config value.
 *
 * In addition to normal action params, this accepts:
 *   - ref identifiers (resolved later via IRAction.refBindings)
 *   - nested object literals (for actions whose params include sub-dicts,
 *     e.g. `lvgl.widget.update`'s `knob: { padding: 8 }`)
 */
export function compileActionConfigValue(
  expr: ts.Expression,
  ctx: ActionCompilerContext,
): IRActionConfigValue | null {
  if (ts.isIdentifier(expr)) {
    const symbol = ctx.checker.getSymbolAtLocation(expr);
    if (symbol && ctx.refSymbols.has(symbol)) {
      return expr.text;
    }
  }

  // Property access on ref-typed prop (e.g. props.mainScreen)
  if (ts.isPropertyAccessExpression(expr)) {
    const propType = ctx.checker.getTypeAtLocation(expr);
    if (hasRefBrand(propType)) {
      const bindingKey = expr.getText();
      ctx.refExpressions.add(bindingKey);
      return bindingKey;
    }
  }

  // Nested object literal — recursively compile each property.
  if (ts.isObjectLiteralExpression(expr)) {
    const entries: Record<string, IRActionConfigValue> = {};
    for (const prop of expr.properties) {
      if (ts.isPropertyAssignment(prop) && ts.isIdentifier(prop.name)) {
        const value = compileActionConfigValue(prop.initializer, ctx);
        if (value !== null) {
          entries[camelToSnake(prop.name.text)] = value;
        }
      }
    }
    const dict: IRActionConfigDict = { kind: 'config_dict', entries };
    return dict;
  }

  return compileActionParam(expr, ctx);
}

// ────────────────────────────────────────────────────────────────────────────
// Ref action config builders
// ────────────────────────────────────────────────────────────────────────────

/** Set of LVGL page action keys that use auto-resolved lvgl_id. */
export const LVGL_PAGE_ACTIONS = new Set<string>([
  'lvgl.page.next',
  'lvgl.page.previous',
  'lvgl.page.show',
]);

/**
 * Build action config for LVGL page actions.
 * These actions do NOT include the caller ref as `id` — ESPHome auto-resolves
 * the `lvgl_id`. Only explicit params from the call are included.
 */
export function buildLvglPageActionConfig(
  call: ts.CallExpression,
  ctx: ActionCompilerContext,
): IRActionConfig {
  if (call.arguments.length === 0) {
    return {};
  }

  const arg = call.arguments[0];
  if (!ts.isObjectLiteralExpression(arg)) {
    return {};
  }

  const config: Record<string, IRActionConfigValue> = {};
  for (const prop of arg.properties) {
    if (ts.isPropertyAssignment(prop) && ts.isIdentifier(prop.name)) {
      const paramValue = compileActionConfigValue(prop.initializer, ctx);
      if (paramValue !== null) {
        config[camelToSnake(prop.name.text)] = paramValue;
      }
    }
  }
  return config;
}

export function buildRefActionConfig(
  call: ts.CallExpression,
  refName: string,
  ctx: ActionCompilerContext,
): IRActionConfig {
  if (call.arguments.length === 0) {
    // Simple action: just the ref ID
    return refName;
  }

  const arg = call.arguments[0];
  if (!ts.isObjectLiteralExpression(arg)) {
    return refName;
  }

  // Action with params
  const config: Record<string, IRActionConfigValue> = { id: refName };
  for (const prop of arg.properties) {
    if (ts.isPropertyAssignment(prop) && ts.isIdentifier(prop.name)) {
      const paramValue = compileActionConfigValue(prop.initializer, ctx);
      if (paramValue !== null) {
        config[camelToSnake(prop.name.text)] = paramValue;
      }
    }
  }
  return config;
}
