/**
 * Lambda tagged-template compiler.
 *
 * Compiles `lambda\`...\`` tagged template expressions into IRLambdaAction
 * nodes. Each template interpolation is classified as a ref, global,
 * trigger variable, or literal slot.
 */

import ts from 'typescript';
import type { IRActionNode, IRLambdaSlot } from '@espcompose/core/internals';
import { irLambdaAction } from '@espcompose/core/internals';
import { hasRefBrand } from '../../type-brands.js';
import type { ActionCompilerContext } from '../context.js';
import { lookupBySymbol, emitError } from '../context.js';

// ────────────────────────────────────────────────────────────────────────────
// Public API
// ────────────────────────────────────────────────────────────────────────────

/**
 * Compile a `lambda\`...\`` tagged template expression into an IRLambdaAction.
 */
export function compileLambdaTaggedTemplate(
  node: ts.TaggedTemplateExpression,
  ctx: ActionCompilerContext,
): IRActionNode[] | null {
  const template = node.template;

  // No-substitution template: lambda`some_c_code();`
  if (ts.isNoSubstitutionTemplateLiteral(template)) {
    return [irLambdaAction([template.text], [])];
  }

  // Template with interpolations: lambda`id(${ref}) = ${val};`
  if (!ts.isTemplateExpression(template)) {
    return emitError(node, ctx, 'lambda tagged template has an unexpected template form.');
  }

  const fragments: string[] = [template.head.text];
  const slots: IRLambdaSlot[] = [];

  for (const span of template.templateSpans) {
    const slot = classifyInterpolation(span.expression, ctx);
    if (slot === null) return null; // diagnostic already emitted
    slots.push(slot);
    fragments.push(span.literal.text);
  }

  return [irLambdaAction(fragments, slots)];
}

// ────────────────────────────────────────────────────────────────────────────
// Interpolation Classification
// ────────────────────────────────────────────────────────────────────────────

/**
 * Classify a single interpolation expression inside a lambda tagged template.
 *
 * Resolution order:
 *   1. Component ref (branded Ref<T>) → `{ kind: 'ref', name }`
 *   2. Global handle (useGlobal) → `{ kind: 'global', id }`
 *   3. Trigger variable (args.x) → `{ kind: 'trigger_var', varName }`
 *   4. Numeric / string / boolean literal → `{ kind: 'literal', value }`
 *   5. Anything else → compile error
 */
function classifyInterpolation(
  expr: ts.Expression,
  ctx: ActionCompilerContext,
): IRLambdaSlot | null {
  // ── Trigger variable: args.x ──────────────────────────────────────────
  if (ts.isPropertyAccessExpression(expr) &&
      ts.isIdentifier(expr.expression) &&
      expr.expression.text === ctx.triggerParamName) {
    const varName = expr.name.text;
    ctx.triggerVars.add(varName);
    return { kind: 'trigger_var', varName };
  }

  // ── Identifier-based classification ───────────────────────────────────
  if (ts.isIdentifier(expr)) {
    // Component ref
    const type = ctx.checker.getTypeAtLocation(expr);
    if (hasRefBrand(type)) {
      const name = expr.text;
      return { kind: 'ref', name };
    }

    // Global handle
    const globalDef = lookupBySymbol(ctx.globalHandles, expr, ctx.checker);
    if (globalDef) {
      return { kind: 'global', id: globalDef.id };
    }
  }

  // ── Property-access ref: props.myRef ──────────────────────────────────
  if (ts.isPropertyAccessExpression(expr)) {
    const type = ctx.checker.getTypeAtLocation(expr);
    if (hasRefBrand(type)) {
      const name = expr.getText();
      ctx.refExpressions.add(name);
      return { kind: 'ref', name };
    }
  }

  // ── Literals ──────────────────────────────────────────────────────────
  if (ts.isNumericLiteral(expr)) {
    return { kind: 'literal', value: Number(expr.text) };
  }
  if (ts.isStringLiteral(expr)) {
    return { kind: 'literal', value: expr.text };
  }
  if (expr.kind === ts.SyntaxKind.TrueKeyword) {
    return { kind: 'literal', value: true };
  }
  if (expr.kind === ts.SyntaxKind.FalseKeyword) {
    return { kind: 'literal', value: false };
  }

  return emitError(expr, ctx,
    'lambda() interpolation must be a component ref, global handle, ' +
    'trigger variable (args.x), or a literal value.');
}
