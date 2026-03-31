// ────────────────────────────────────────────────────────────────────────────
// embed — build→device value crossing
//
// embed.*() functions transfer values computed at build time (via build.run()
// or literal constants) into the generated firmware config. Each function
// wraps the value into an EmbedValue<T> that the serializer recognizes and
// emits as the appropriate YAML construct.
//
// Usage:
//   <wifi ssid={embed.string(env.wifiSsid)} password={embed.secret(env.wifiPassword)} />
// ────────────────────────────────────────────────────────────────────────────

import { assertPhase } from './phase';
import { BuildValue, isBuildValue } from './build';

declare const EMBED_VALUE_BRAND: unique symbol;

/** The kind of embedding, which affects YAML serialization. */
export type EmbedKind = 'string' | 'number' | 'secret' | 'json';

/**
 * A value that has been explicitly marked for embedding into firmware config.
 *
 * The serializer detects `EmbedValue` instances and handles them:
 * - `'string'` / `'number'` → literal YAML value
 * - `'secret'` → `!secret <key>` reference + entry in secrets.yaml
 * - `'json'` → inline YAML object/array
 */
export class EmbedValue<T = unknown> {
  declare readonly [EMBED_VALUE_BRAND]: T;

  readonly kind: EmbedKind;
  readonly value: T;

  constructor(kind: EmbedKind, value: T) {
    this.kind = kind;
    this.value = value;
  }
}

/**
 * Type guard for EmbedValue instances.
 */
export function isEmbedValue(val: unknown): val is EmbedValue {
  return val instanceof EmbedValue;
}

// ── Secrets registry ───────────────────────────────────────────────────────
// Secrets are collected during rendering and emitted to a separate file.

const secretsRegistry = new Map<string, string>();

/** @internal — used by the compiler emit phase. */
export function getSecrets(): ReadonlyMap<string, string> {
  return secretsRegistry;
}

/** @internal — clear between compile runs. */
export function clearSecrets(): void {
  secretsRegistry.clear();
}

function registerSecret(value: string): string {
  // Generate a deterministic key from the value's position in the registry
  const key = `secret_${secretsRegistry.size}`;
  secretsRegistry.set(key, value);
  return key;
}

// ── Helper to unwrap BuildValue or pass through raw values ─────────────────

function resolve<T>(value: BuildValue<T> | T): T {
  return isBuildValue(value) ? value.unwrap() : value;
}

/**
 * Embed-phase API namespace.
 */
export const embed = {
  /**
   * Embed a string value into the YAML config.
   * Accepts a raw string or a BuildValue<string> from build.run().
   */
  string(value: BuildValue<string> | string): EmbedValue<string> {
    assertPhase(['module', 'render'], 'embed.string()');
    return new EmbedValue('string', resolve(value));
  },

  /**
   * Embed a number value into the YAML config.
   * Accepts a raw number or a BuildValue<number> from build.run().
   */
  number(value: BuildValue<number> | number): EmbedValue<number> {
    assertPhase(['module', 'render'], 'embed.number()');
    return new EmbedValue('number', resolve(value));
  },

  /**
   * Embed a string as an ESPHome `!secret` reference.
   * The actual value is written to a separate secrets.yaml file.
   */
  secret(value: BuildValue<string> | string): EmbedValue<string> {
    assertPhase(['module', 'render'], 'embed.secret()');
    const resolved = resolve(value);
    const key = registerSecret(resolved);
    // Store the key, not the value — the serializer emits `!secret <key>`
    const embedVal = new EmbedValue<string>('secret', resolved);
    // Attach the key as a non-enumerable property for the serializer
    Object.defineProperty(embedVal, '_secretKey', { value: key, enumerable: false });
    return embedVal;
  },

  /**
   * Embed a JSON-serializable value into the YAML config.
   * Accepts any value that can be serialized to YAML (objects, arrays, primitives).
   */
  json<T>(value: BuildValue<T> | T): EmbedValue<T> {
    assertPhase(['module', 'render'], 'embed.json()');
    return new EmbedValue('json', resolve(value));
  },
};
