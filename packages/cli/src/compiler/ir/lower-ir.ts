// ────────────────────────────────────────────────────────────────────────────
// lowerIR — Convert IR tree back to config objects
//
// Takes an IR tree and produces the same plain config object structure
// that the compiler expects for YAML serialization and reactive injection.
//
// Phase B: identity transform (round-trip through IR produces equivalent config).
// Later phases add IR transforms between buildIR and lowerIR.
// ────────────────────────────────────────────────────────────────────────────

import { Scalar } from 'yaml';
import { createLambdaScalar } from '@esphome/compose';
import type { IRRoot, IRValue, IRObject, IRArray } from './types.js';

/**
 * Convert an IR value node back to a plain config value.
 */
export function irValueToConfig(node: IRValue): unknown {
  switch (node.kind) {
    case 'null':
      return null;

    case 'scalar':
      if (node.quoted && typeof node.value === 'string') {
        const s = new Scalar(node.value);
        s.type = Scalar.QUOTE_SINGLE;
        return s;
      }
      return node.value;

    case 'lambda':
      return createLambdaScalar(node.code);

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
 * Lower an IR tree back to a plain config object.
 *
 * The result has the same shape as the original rendered config,
 * suitable for YAML serialization via toYAML().
 */
export function lowerIR(ir: IRRoot): Record<string, unknown> {
  const config: Record<string, unknown> = {};
  for (const section of ir.sections) {
    config[section.key] = irValueToConfig(section.value);
  }
  return config;
}
