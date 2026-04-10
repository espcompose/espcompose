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
      // Nested objects (e.g. style sub-objects) — flatten to plain for now
      return { kind: 'static', value: irObjectToPlain(value as IRObject) };

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
