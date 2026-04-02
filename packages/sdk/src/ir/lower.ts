// ────────────────────────────────────────────────────────────────────────────
// lowerSemanticIR — Convert SemanticIR config tree back to plain objects
//
// Proves that the semantic IR preserves enough information for round-trip:
//   rendered config → captures → buildSemanticIR → lowerSemanticIR → equivalent config
//
// Each semantic IR type is lowered to its serialized form:
//   IRReactive   → !lambda Scalar (placeholder; real lowering is in target-esphome)
//   IRRef        → token string
//   IRAction     → resolved action array with lambda markers restored
//   IRSecret     → !secret Scalar
//   IRTriggerVar → !lambda Scalar (via "return name;")
//   IRScalar     → primitive or quoted Scalar
//   IRObject     → plain object
//   IRArray      → plain array
//   IRNull       → null
//
// This is the foundation for Phase 2's YAML backend.
// ────────────────────────────────────────────────────────────────────────────

import type { SemanticIR, IRValue, IRObject, IRArray } from './types';
import { LambdaMarker, SecretMarker, QuotedMarker } from '../markers';

// ── Lambda marker types for action lowering ────────────────────────────────

function isActionLambdaMarker(v: unknown): v is { __lambda__: string } {
  return v !== null && typeof v === 'object' && '__lambda__' in v &&
    typeof (v as Record<string, unknown>).__lambda__ === 'string';
}

function restoreLambdaMarkers(value: unknown): unknown {
  if (isActionLambdaMarker(value)) return new LambdaMarker(value.__lambda__);
  if (Array.isArray(value)) return value.map(restoreLambdaMarkers);
  if (value !== null && typeof value === 'object') {
    const obj: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      obj[k] = restoreLambdaMarkers(v);
    }
    return obj;
  }
  return value;
}

function resolveRefBindingsInValue(
  value: unknown,
  refBindings: Record<string, unknown>,
): unknown {
  if (value === null || value === undefined) return value;
  if (typeof value === 'string') {
    const bound = refBindings[value];
    if (bound !== undefined && typeof bound === 'object' && bound !== null && 'toString' in bound) {
      return bound.toString();
    }
    return value;
  }
  if (Array.isArray(value)) {
    return value.map(item => resolveRefBindingsInValue(item, refBindings));
  }
  if (typeof value === 'object') {
    const obj: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      obj[k] = resolveRefBindingsInValue(v, refBindings);
    }
    return obj;
  }
  return value;
}

/**
 * Convert a semantic IR value node back to a plain config value.
 */
export function irValueToConfig(node: IRValue): unknown {
  switch (node.kind) {
    case 'null':
      return null;

    case 'scalar':
      if (node.quoted && typeof node.value === 'string') {
        return new QuotedMarker(node.value);
      }
      return node.value;

    case 'reactive': {
      // Actual lambda generation happens in target-esphome's lower-yaml.ts.
      // This SDK-level lowering produces a placeholder for testing.
      const rNode = node.node;
      if (rNode.kind === 'expression' && rNode.sourceId && rNode.property) {
        return new LambdaMarker(`return id(${rNode.sourceId})${rNode.property};`);
      }
      const idx = rNode._index >= 0 ? rNode._index : 0;
      return new LambdaMarker(`return espcompose::memo_${idx}.get();`);
    }

    case 'ref':
      return node.token;

    case 'action': {
      let actions: unknown[] = node.actions;
      if (node.refBindings) {
        actions = actions.map(a => resolveRefBindingsInValue(a, node.refBindings!));
      }
      return restoreLambdaMarkers(actions);
    }

    case 'secret':
      return new SecretMarker(node.key);

    case 'trigger_var':
      return new LambdaMarker(`return ${node.name};`);

    case 'array':
      return (node as IRArray).items.map(irValueToConfig);

    case 'object': {
      const obj: Record<string, unknown> = {};
      for (const entry of (node as IRObject).entries) {
        obj[entry.key] = irValueToConfig(entry.value);
      }
      return obj;
    }

    default:
      return null;
  }
}

/**
 * Lower a SemanticIR's config tree back to a plain config object.
 *
 * The result has the same structure as the original rendered config,
 * suitable for comparison in round-trip tests.
 */
export function lowerSemanticIR(ir: SemanticIR): Record<string, unknown> {
  const config: Record<string, unknown> = {};
  for (const section of ir.sections) {
    config[section.key] = irValueToConfig(section.value);
  }
  return config;
}
