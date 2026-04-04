// ────────────────────────────────────────────────────────────────────────────
// buildIR — Convert rendered config to IR tree
//
// Takes the plain config object produced by render() and wraps it into a
// typed IR tree. This is the Phase B "thin wrapper" approach — the config
// is already fully rendered (function components expanded, props serialized),
// and we structure it into IR nodes for downstream analysis and lowering.
//
// Later phases evolve buildIR to intercept earlier in the pipeline,
// walking JSX elements directly to capture IRReactiveNode, etc.
// ────────────────────────────────────────────────────────────────────────────

import {
  type IRRoot,
  type IRValue,
  irRoot,
  irSection,
  irScalar,
  irObject,
  irArray,
  irLambda,
  irNull,
  irEntry,
} from './types.js';

/**
 * Detect a YAML `!lambda` tagged scalar.
 * The render pass produces `yaml.Scalar` instances with `tag === '!lambda'`.
 * We detect them by duck-typing to avoid importing the `yaml` package.
 */
function isLambdaScalar(val: unknown): val is { value: string; tag: string } {
  return (
    val != null &&
    typeof val === 'object' &&
    'tag' in val &&
    (val as Record<string, unknown>).tag === '!lambda' &&
    'value' in val
  );
}

/**
 * Detect a YAML quoted scalar (used for YAML 1.1 boolean-like strings).
 */
function isQuotedScalar(val: unknown): val is { value: string; type: string } {
  return (
    val != null &&
    typeof val === 'object' &&
    'type' in val &&
    'value' in val &&
    typeof (val as Record<string, unknown>).value === 'string' &&
    !('tag' in val && (val as Record<string, unknown>).tag === '!lambda')
  );
}

/**
 * Convert an arbitrary config value to an IR value node.
 */
export function configValueToIR(val: unknown): IRValue {
  if (val == null) return irNull();

  // Lambda scalar: !lambda "code"
  if (isLambdaScalar(val)) {
    return irLambda(String(val.value));
  }

  // Quoted scalar (YAML 1.1 boolean-like strings)
  if (isQuotedScalar(val)) {
    return irScalar(String(val.value), true);
  }

  // Primitives
  if (typeof val === 'string') return irScalar(val);
  if (typeof val === 'number') return irScalar(val);
  if (typeof val === 'boolean') return irScalar(val);

  // Arrays
  if (Array.isArray(val)) {
    return irArray(val.map(configValueToIR));
  }

  // Objects
  if (typeof val === 'object') {
    const obj = val as Record<string, unknown>;
    const entries = Object.entries(obj).map(([k, v]) => irEntry(k, configValueToIR(v)));
    return irObject(entries);
  }

  // Fallback: stringify unknown values
  return irScalar(String(val));
}

/**
 * Build an IR tree from a rendered config object.
 *
 * The config is the output of `render()` + script merging — a plain
 * object where top-level keys are YAML sections.
 */
export function buildIR(config: Record<string, unknown>): IRRoot {
  const sections = Object.entries(config).map(([key, value]) =>
    irSection(key, configValueToIR(value)),
  );
  return irRoot(sections);
}
