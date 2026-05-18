// ────────────────────────────────────────────────────────────────────────────
// DurationValue — type-safe duration strings for time spans
//
// Accepts bare numbers (interpreted as milliseconds) or template literal
// strings with explicit unit suffixes: '500ms', '2s', '1min', '1h'.
// Follows the SizeValue pattern of unioning with `number`.
//
// For strict validation at system boundaries, use `isDurationValue()`.
// For conversion to milliseconds, use `parseDurationToMs()`.
// ────────────────────────────────────────────────────────────────────────────

/**
 * A duration value — either a bare number (milliseconds) or a string with
 * an explicit unit suffix.
 *
 * Examples: `500`, `'500ms'`, `'2s'`, `'1.5min'`, `'1h'`
 */
export type DurationValue =
  | number
  | `${number}ms`
  | `${number}s`
  | `${number}min`
  | `${number}h`;

/** Matches a number followed by a duration unit suffix. */
const DURATION_STRING_RE = /^\d+(?:\.\d+)?(ms|s|min|h)$/;

/** Type guard: is the value a valid `DurationValue`? */
export function isDurationValue(value: unknown): value is DurationValue {
  if (typeof value === 'number') return Number.isFinite(value);
  return typeof value === 'string' && DURATION_STRING_RE.test(value);
}

/** Multipliers from each unit to milliseconds. */
const UNIT_TO_MS: Record<string, number> = {
  ms: 1,
  s: 1_000,
  min: 60_000,
  h: 3_600_000,
};

/**
 * Convert a `DurationValue` to milliseconds.
 *
 * - Bare numbers are returned as-is (already ms).
 * - String values are parsed and converted (e.g. `'2s'` → `2000`).
 *
 * Throws if the string format is unrecognised.
 */
export function parseDurationToMs(value: DurationValue): number {
  if (typeof value === 'number') return value;
  const m = /^(\d+(?:\.\d+)?)(ms|s|min|h)$/.exec(value);
  if (!m) {
    throw new Error(`[espcompose] Invalid duration value: '${value}'. Expected a number or a string like '500ms', '2s', '1min', '1h'.`);
  }
  return Number(m[1]) * UNIT_TO_MS[m[2]];
}
