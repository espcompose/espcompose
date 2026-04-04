// ────────────────────────────────────────────────────────────────────────────
// secret — ESPHome !secret value marker
//
// secret() marks a string for emission as an ESPHome `!secret` reference.
// The actual value is collected and written to a separate secrets.yaml file.
//
// Usage:
//   <wifi ssid="MyNetwork" password={secret('my-wifi-password')} />
// ────────────────────────────────────────────────────────────────────────────

const SECRET_VALUE_BRAND = Symbol.for('espcompose.SecretValue');

/**
 * A value marked for emission as an ESPHome `!secret` reference.
 *
 * The serializer detects `SecretValue` instances and emits `!secret <key>`.
 */
export class SecretValue {
  readonly [SECRET_VALUE_BRAND] = true;
  readonly value: string;
  readonly key: string;

  constructor(value: string, key: string) {
    this.value = value;
    this.key = key;
  }
}

/**
 * Type guard for SecretValue instances.
 */
export function isSecretValue(val: unknown): val is SecretValue {
  return val instanceof SecretValue;
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
  const key = `secret_${secretsRegistry.size}`;
  secretsRegistry.set(key, value);
  return key;
}

/**
 * Mark a string for emission as an ESPHome `!secret` reference.
 *
 * The actual value is written to a separate secrets.yaml file. The YAML
 * output will contain `!secret <key>` instead of the raw value.
 *
 * @example
 * <wifi ssid="MyNetwork" password={secret('my-wifi-password')} />
 * <api encryption={{ key: secret(process.env.API_KEY!) }} />
 */
export function secret(value: string): SecretValue {
  const key = registerSecret(value);
  return new SecretValue(value, key);
}
