import type { IRValue, IRObject, IRReactive, IRRef, IRAction, IRSecret, IRTriggerVar } from '@espcompose/core/internals';
import type { RuntimeProp, RuntimeDependency } from '../../types';
import { exprToJs } from '../expr-to-js.js';
import { buildJsLoweringContext, reactiveDefaultValue } from './lowering-context.js';
import type { IRRenderContext } from './lowering-context.js';
import { irActionToRuntimeProp } from './actions.js';

export function irValueToRuntimeProp(
  key: string,
  value: IRValue,
  ctx: IRRenderContext,
): RuntimeProp {
  switch (value.kind) {
    case 'reactive':
      return irReactiveToRuntimeProp(value, ctx);

    case 'ref':
      return { kind: 'ref', refId: (value as IRRef).token };

    case 'action':
      return irActionToRuntimeProp(value as IRAction, ctx);

    case 'secret':
      return { kind: 'static', value: `***${(value as IRSecret).key}***` };

    case 'trigger_var':
      return { kind: 'static', value: `\${${(value as IRTriggerVar).name}}` };

    case 'scalar':
      return { kind: 'static', value: value.value };

    case 'null':
      return { kind: 'static', value: null };

    case 'array':
      // Arrays as prop values — flatten to their static representation
      return { kind: 'static', value: value.items.map(item => irValueToPlain(item)) };

    case 'object':
      return irObjectToRuntimeProp(value as IRObject, ctx);

    default:
      return { kind: 'static', value: null };
  }
}

export function irValueToPlain(value: IRValue): unknown {
  switch (value.kind) {
    case 'scalar': return value.value;
    case 'null': return null;
    case 'array': return value.items.map(irValueToPlain);
    case 'object': return irObjectToPlain(value);
    case 'reactive': return reactiveDefaultValue(value);
    case 'ref': return (value as IRRef).token;
    case 'secret': return `***${(value as IRSecret).key}***`;
    case 'trigger_var': return `\${${(value as IRTriggerVar).name}}`;
    default: return null;
  }
}

function irObjectToPlain(obj: IRObject): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const entry of obj.entries) {
    result[entry.key] = irValueToPlain(entry.value);
  }
  return result;
}

/**
 * Convert an IRObject to a RuntimeProp.  When any entry contains a reactive
 * value the whole prop becomes reactive so that its evaluate() re-resolves
 * every entry (including reactive ones like theme-derived colors).
 */
function irObjectToRuntimeProp(obj: IRObject, ctx: IRRenderContext): RuntimeProp {
  // Check if any entry (recursively) contains a reactive value
  const hasReactive = obj.entries.some(e => irValueContainsReactive(e.value));

  if (!hasReactive) {
    return { kind: 'static', value: irObjectToPlain(obj) };
  }

  // Build per-entry evaluators for reactive entries; static entries use a
  // plain getter so that evaluate() always returns a fully-resolved object.
  const entryEvaluators: Array<{ key: string; resolve: () => unknown }> = [];
  const allDeps: RuntimeDependency[] = [];

  for (const entry of obj.entries) {
    if (entry.value.kind === 'reactive') {
      const prop = irReactiveToRuntimeProp(entry.value, ctx);
      if (prop.kind === 'reactive') {
        entryEvaluators.push({ key: entry.key, resolve: prop.evaluate });
        allDeps.push(...prop.dependencies);
      } else {
        const v = prop.kind === 'static' ? prop.value : null;
        entryEvaluators.push({ key: entry.key, resolve: () => v });
      }
    } else if (entry.value.kind === 'object') {
      // Recursively handle nested objects that may contain reactives
      const nested = irObjectToRuntimeProp(entry.value as IRObject, ctx);
      if (nested.kind === 'reactive') {
        entryEvaluators.push({ key: entry.key, resolve: nested.evaluate });
        allDeps.push(...nested.dependencies);
      } else {
        const v = nested.kind === 'static' ? nested.value : null;
        entryEvaluators.push({ key: entry.key, resolve: () => v });
      }
    } else {
      const v = irValueToPlain(entry.value);
      entryEvaluators.push({ key: entry.key, resolve: () => v });
    }
  }

  const evaluate = (): Record<string, unknown> => {
    const result: Record<string, unknown> = {};
    for (const { key, resolve } of entryEvaluators) {
      result[key] = resolve();
    }
    return result;
  };

  let current: unknown;
  try { current = evaluate(); } catch { current = irObjectToPlain(obj); }

  return {
    kind: 'reactive',
    current,
    evaluate,
    dependencies: allDeps,
  };
}

/** Check whether an IRValue tree contains any reactive nodes. */
function irValueContainsReactive(value: IRValue): boolean {
  if (value.kind === 'reactive') return true;
  if (value.kind === 'object') {
    return (value as IRObject).entries.some(e => irValueContainsReactive(e.value));
  }
  if (value.kind === 'array') {
    return value.items.some(irValueContainsReactive);
  }
  return false;
}

// ── Reactive prop handling ───────────────────────────────────────────────────

function irReactiveToRuntimeProp(
  reactive: IRReactive,
  ctx: IRRenderContext,
): RuntimeProp {
  const node = reactive.node;
  const deps: RuntimeDependency[] = [];

  // Extract dependency info and wire JS signals
  for (const dep of node.dependencies) {
    deps.push({
      sourceId: dep.sourceId,
      sourceType: dep.sourceType === 'theme' ? 'theme' : 'ha_entity',
      property: node.property ?? dep.triggerType ?? 'state',
    });

    // Ensure entity signals exist for HA dependencies
    if (dep.sourceType !== 'theme') {
      const entityId = dep.sourceId;
      if (entityId) {
        ctx.entityRegistry.getOrCreate(entityId);
      }
    }
  }

  // Use ExprIR for evaluation if available, otherwise fall back to type-based defaults.
  let evaluate: () => unknown;
  let current: unknown;

  if (node.exprIR) {
    const jsCtx = buildJsLoweringContext(node.exprIR, ctx);
    const evaluator = exprToJs(node.exprIR, jsCtx);
    try { current = evaluator(); } catch { current = reactiveDefaultValue(reactive); }
    evaluate = evaluator;
  } else {
    current = reactiveDefaultValue(reactive);
    evaluate = () => reactiveDefaultValue(reactive);
  }

  return {
    kind: 'reactive',
    current,
    evaluate,
    dependencies: deps,
  };
}
