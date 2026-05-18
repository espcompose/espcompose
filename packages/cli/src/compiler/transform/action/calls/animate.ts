import ts from 'typescript';
import type { IRActionNode } from '@espcompose/core/internals';
import { irAnimateAction } from '@espcompose/core/internals';
import { CSS_TO_LVGL_MAP } from '@espcompose/core/internals';
import { camelToSnake } from '@espcompose/esphome-target';
import { hasRefBrand } from '../../type-brands.js';
import type { ActionCompilerContext } from '../context.js';
import { emitError } from '../context.js';
import { extractDurationArg } from '../util.js';

// ── Helpers ────────────────────────────────────────────────────────────────

/**
 * Extract a numeric value from an expression, supporting:
 * - Positive literals: `100`
 * - Negative literals: `-100` (PrefixUnaryExpression with MinusToken)
 */
function extractNumericValue(expr: ts.Expression): number | undefined {
  if (ts.isNumericLiteral(expr)) {
    return Number(expr.text);
  }
  if (
    ts.isPrefixUnaryExpression(expr) &&
    expr.operator === ts.SyntaxKind.MinusToken &&
    ts.isNumericLiteral(expr.operand)
  ) {
    return -Number(expr.operand.text);
  }
  return undefined;
}

// ── Easing alias map ───────────────────────────────────────────────────────

const EASING_TO_SNAKE: Record<string, string> = {
  'linear': 'linear',
  'ease-in': 'ease_in',
  'ease-out': 'ease_out',
  'ease-in-out': 'ease_in_out',
  'overshoot': 'overshoot',
  'bounce': 'bounce',
  'step': 'step',
};

// ────────────────────────────────────────────────────────────────────────────
// animate() call compilation
// ────────────────────────────────────────────────────────────────────────────

/**
 * Compile `await animate(ref, config)` to an IRAnimateAction node.
 *
 * - First arg: must be a ref symbol (useRef result)
 * - Second arg: object literal with property, from, to, duration, etc.
 */
export function compileAnimateCall(
  call: ts.CallExpression,
  ctx: ActionCompilerContext,
): IRActionNode[] | null {
  if (call.arguments.length < 2) {
    return emitError(call, ctx, 'animate() requires two arguments: animate(ref, config).');
  }

  // ── Resolve ref argument ────────────────────────────────────────────
  const refArg = call.arguments[0];
  if (!ts.isIdentifier(refArg)) {
    return emitError(refArg, ctx,
      'animate() first argument must be a ref identifier (from useRef()).');
  }

  const refType = ctx.checker.getTypeAtLocation(refArg);
  if (!hasRefBrand(refType)) {
    return emitError(refArg, ctx,
      'animate() first argument must be a useRef() ref. ' +
      `Got '${refArg.text}' which is not ref-branded.`);
  }

  const targetRef = refArg.text;

  // ── Parse config object literal ─────────────────────────────────────
  const configArg = call.arguments[1];
  if (!ts.isObjectLiteralExpression(configArg)) {
    return emitError(configArg, ctx,
      'animate() config must be an object literal.');
  }

  const props = new Map<string, ts.Expression>();
  for (const prop of configArg.properties) {
    if (ts.isPropertyAssignment(prop) && ts.isIdentifier(prop.name)) {
      props.set(prop.name.text, prop.initializer);
    }
  }

  // Required: property
  const propertyExpr = props.get('property');
  if (!propertyExpr || !ts.isStringLiteral(propertyExpr)) {
    return emitError(configArg, ctx, "animate() config.property must be a string literal.");
  }

  // Required: from
  const fromExpr = props.get('from');
  const fromValue = fromExpr ? extractNumericValue(fromExpr) : undefined;
  if (fromValue === undefined) {
    return emitError(configArg, ctx, "animate() config.from must be a numeric literal.");
  }

  // Required: to
  const toExpr = props.get('to');
  const toValue = toExpr ? extractNumericValue(toExpr) : undefined;
  if (toValue === undefined) {
    return emitError(configArg, ctx, "animate() config.to must be a numeric literal.");
  }

  // Required: duration
  const durationExpr = props.get('duration');
  if (!durationExpr) {
    return emitError(configArg, ctx, "animate() config.duration is required.");
  }
  const duration = extractDurationArg(durationExpr);
  if (!duration) {
    return emitError(durationExpr, ctx,
      "animate() config.duration must be a numeric literal (ms) or string duration (e.g. '300ms').");
  }

  // ── Resolve CSS property to LVGL snake_case ─────────────────────────
  const cssProperty = propertyExpr.text;
  const mapping = CSS_TO_LVGL_MAP[cssProperty];
  let lvglCamelProp: string;
  if (mapping && 'lvglProp' in mapping) {
    lvglCamelProp = mapping.lvglProp;
  } else {
    // Treat as direct LVGL camelCase prop name
    lvglCamelProp = cssProperty;
  }
  const styleProp = camelToSnake(lvglCamelProp);

  // ── Optional: easing ────────────────────────────────────────────────
  let easing = 'linear';
  const easingExpr = props.get('easing');
  if (easingExpr) {
    if (!ts.isStringLiteral(easingExpr)) {
      return emitError(easingExpr, ctx, "animate() config.easing must be a string literal.");
    }
    const resolved = EASING_TO_SNAKE[easingExpr.text];
    if (!resolved) {
      return emitError(easingExpr, ctx,
        `Unknown easing '${easingExpr.text}'. Valid values: ${Object.keys(EASING_TO_SNAKE).join(', ')}.`);
    }
    easing = resolved;
  }

  // ── Optional: delay ─────────────────────────────────────────────────
  let delayMs: number | undefined;
  const delayExpr = props.get('delay');
  if (delayExpr) {
    const delayDuration = extractDurationArg(delayExpr);
    if (!delayDuration) {
      return emitError(delayExpr, ctx,
        "animate() config.delay must be a numeric literal (ms) or string duration.");
    }
    // Convert to ms
    const unitMs: Record<string, number> = { ms: 1, s: 1000, min: 60000, h: 3600000 };
    delayMs = delayDuration.value * (unitMs[delayDuration.unit] ?? 1);
  }

  // ── Optional: part, state ────────────────────────────────────────────
  let part: string | undefined;
  let state: string | undefined;
  const partExpr = props.get('part');
  const stateExpr = props.get('state');
  if (partExpr) {
    if (!ts.isStringLiteral(partExpr)) {
      return emitError(partExpr, ctx, "animate() config.part must be a string literal.");
    }
    if (partExpr.text !== 'main') part = partExpr.text;
  }
  if (stateExpr) {
    if (!ts.isStringLiteral(stateExpr)) {
      return emitError(stateExpr, ctx, "animate() config.state must be a string literal.");
    }
    if (stateExpr.text !== 'default') state = stateExpr.text;
  }

  // ── Convert duration to ms ──────────────────────────────────────────
  const unitMs: Record<string, number> = { ms: 1, s: 1000, min: 60000, h: 3600000 };
  const durationMs = duration.value * (unitMs[duration.unit] ?? 1);

  return [irAnimateAction(
    targetRef,
    styleProp,
    fromValue,
    toValue,
    durationMs,
    easing,
    part,
    state,
    delayMs,
  )];
}
