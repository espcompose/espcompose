// ────────────────────────────────────────────────────────────────────────────
// SDK-native serialize markers
//
// Replace yaml.Scalar usage in the SDK with lightweight marker objects.
// These carry the same duck-type shape {value, tag?, type?} that the IR
// builder detects, so build.ts works unchanged without importing yaml.
//
// Targets that need real yaml.Scalar instances (esphome-target) create
// them in their own lowering layer.
// ────────────────────────────────────────────────────────────────────────────

/**
 * A lambda code body (e.g. C++ lambda for ESPHome).
 *
 * Duck-type shape: `{ value: string; tag: '!lambda'; type: 'QUOTE_DOUBLE' }`
 */
export class LambdaMarker {
  readonly tag = '!lambda' as const;
  readonly type = 'QUOTE_DOUBLE' as const;
  constructor(public readonly value: string) {}
}

/**
 * A secret reference (e.g. !secret wifi_password in YAML).
 *
 * Duck-type shape: `{ value: string; tag: '!secret' }`
 */
export class SecretMarker {
  readonly tag = '!secret' as const;
  constructor(public readonly value: string) {}
}

/**
 * A string that must be quoted to avoid serialization ambiguity.
 * Used for YAML 1.1 boolean-like strings (on, off, yes, no, etc.).
 *
 * Duck-type shape: `{ value: string; type: 'QUOTE_SINGLE' }`
 */
export class QuotedMarker {
  readonly type = 'QUOTE_SINGLE' as const;
  constructor(public readonly value: string) {}
}

/** Type guard for any SDK serialize marker.
 *
 * Uses duck-typing (not `instanceof`) so the check works across module
 * instances — the CLI loads `@espcompose/core` as CJS while the target
 * package loads it as ESM, producing two distinct `LambdaMarker` classes
 * that would fail `instanceof` checks even for structurally-identical
 * objects.
 */
export function isSerializeMarker(v: unknown): v is LambdaMarker | SecretMarker | QuotedMarker {
  if (v === null || typeof v !== 'object') return false;
  if (v instanceof LambdaMarker || v instanceof SecretMarker || v instanceof QuotedMarker) {
    return true;
  }
  const o = v as { value?: unknown; tag?: unknown; type?: unknown };
  if (typeof o.value !== 'string') return false;
  if (o.tag === '!lambda' && o.type === 'QUOTE_DOUBLE') return true;
  if (o.tag === '!secret' && o.type === undefined) return true;
  if (o.tag === undefined && o.type === 'QUOTE_SINGLE') return true;
  return false;
}
