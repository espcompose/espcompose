// ────────────────────────────────────────────────────────────────────────────
// action-cpp-emitters.ts — IR action key → C++ method invocation catalog
//
// Maps ESPHome action keys (e.g. `light.toggle`) to the C++ method invocation
// patterns needed to express the same action as a lambda. Used by the
// native→lambda rewrite path (action-lowering.ts) when a native ref action's
// `id:` slot is bound through a closure-table column and therefore cannot
// be expressed in YAML directly (YAML native actions require a static id).
//
// Catalog completeness is **required**: when an action key is not catalogued,
// the build fails with a diagnostic. Per project policy, missing emitters are
// NEVER silently degraded to N-separate-scripts emission. Catalog growth is
// driven by user-encountered action kinds.
// ────────────────────────────────────────────────────────────────────────────

/**
 * Describes how to render an ESPHome action as a C++ method call expression.
 *
 * Given a typed pointer `<accessor>` (e.g. `id(kitchen_light)` or
 * `ec_blink_lights[closure.light_idx]`), the rendered C++ is:
 *
 *   - Zero-arg fluent (e.g. `light.toggle`):
 *       `<accessor>->toggle().perform();`
 *   - Multi-param fluent (e.g. `light.turn_on` with brightness):
 *       `<accessor>->turn_on().set_brightness(0.5f).perform();`
 *   - Non-fluent void (e.g. `output.set_level`):
 *       `<accessor>->set_level(0.5f);`
 *   - Non-fluent with no args (e.g. `switch.toggle`):
 *       `<accessor>->toggle();`
 */
export interface ActionCppEmitter {
  /** C++ method name to invoke (no parens). */
  method: string;
  /**
   * If true, the method returns a builder (e.g. `LightCall*`) and per-param
   * `set_<name>(value)` calls chain off it; the chain is terminated by
   * `.perform();`. If false, params (if any) are passed positionally to the
   * method and the call ends with `;`.
   */
  fluent: boolean;
  /** Non-id config params accepted by this action. */
  params: ActionCppParam[];
}

/** A single non-id config parameter for an action. */
export interface ActionCppParam {
  /** YAML/IR config key (snake_case, matches `IRActionConfig` keys). */
  name: string;
  /**
   * For fluent emitters, the C++ setter method name (without parens).
   * Defaults to `set_${name}`.
   */
  cppSetter?: string;
  /**
   * C++ type of the value as it should appear in the rendered call.
   * Used to format literals correctly (e.g. floats need `f` suffix).
   */
  cppType: 'int' | 'float' | 'bool' | 'uint32_t' | 'std::string' | 'const char*';
  /**
   * For non-fluent emitters, indicates the param is passed positionally to
   * the method. Multiple positional params are emitted in the order declared.
   */
  positional?: boolean;
}

// ────────────────────────────────────────────────────────────────────────────
// Catalog — hand-authored top-N actions
//
// Add entries as new action kinds are encountered in the wild. Until an
// action is catalogued, scripts using it will cause a hard build failure.
// ────────────────────────────────────────────────────────────────────────────

export const ACTION_CPP_EMITTERS: Readonly<Record<string, ActionCppEmitter>> = Object.freeze({
  // ── light ──
  'light.toggle': {
    method: 'toggle',
    fluent: true,
    params: [
      { name: 'transition_length', cppType: 'uint32_t' },
    ],
  },
  'light.turn_on': {
    method: 'turn_on',
    fluent: true,
    params: [
      { name: 'brightness', cppType: 'float' },
      { name: 'transition_length', cppType: 'uint32_t' },
      { name: 'red', cppType: 'float' },
      { name: 'green', cppType: 'float' },
      { name: 'blue', cppType: 'float' },
      { name: 'white', cppType: 'float' },
      { name: 'color_temperature', cppType: 'float' },
      { name: 'flash_length', cppType: 'uint32_t' },
    ],
  },
  'light.turn_off': {
    method: 'turn_off',
    fluent: true,
    params: [
      { name: 'transition_length', cppType: 'uint32_t' },
    ],
  },
  'light.dim_relative': {
    method: 'dim_relative',
    fluent: true,
    params: [
      { name: 'relative_brightness', cppType: 'float' },
      { name: 'transition_length', cppType: 'uint32_t' },
    ],
  },

  // ── switch ──
  'switch.toggle':   { method: 'toggle',   fluent: false, params: [] },
  'switch.turn_on':  { method: 'turn_on',  fluent: false, params: [] },
  'switch.turn_off': { method: 'turn_off', fluent: false, params: [] },

  // ── output ──
  'output.turn_on':  { method: 'turn_on',  fluent: false, params: [] },
  'output.turn_off': { method: 'turn_off', fluent: false, params: [] },
  'output.set_level': {
    method: 'set_level',
    fluent: false,
    params: [
      { name: 'level', cppType: 'float', positional: true },
    ],
  },

  // ── cover ──
  'cover.open':   { method: 'open',   fluent: false, params: [] },
  'cover.close':  { method: 'close',  fluent: false, params: [] },
  'cover.stop':   { method: 'stop',   fluent: false, params: [] },
  'cover.toggle': { method: 'toggle', fluent: false, params: [] },

  // ── fan ──
  'fan.toggle':   { method: 'toggle',   fluent: true, params: [] },
  'fan.turn_on':  {
    method: 'turn_on',
    fluent: true,
    params: [
      { name: 'speed', cppType: 'int' },
      { name: 'oscillating', cppType: 'bool' },
    ],
  },
  'fan.turn_off': { method: 'turn_off', fluent: true, params: [] },
});

/**
 * Look up an emitter for a given action key.
 * Returns `undefined` for uncatalogued actions; callers must treat this as a
 * hard build failure (no fallback to legacy emission).
 */
export function lookupActionEmitter(actionKey: string): ActionCppEmitter | undefined {
  return ACTION_CPP_EMITTERS[actionKey];
}

/**
 * Format a literal config value as a C++ literal of the declared cppType.
 * Used by the native→lambda rewrite to inline param values into the
 * generated method chain.
 */
export function formatCppLiteral(value: unknown, cppType: ActionCppParam['cppType']): string {
  if (typeof value === 'boolean') return value ? 'true' : 'false';
  if (typeof value === 'number') {
    if (cppType === 'float') {
      const s = Number.isInteger(value) ? `${value}.0` : String(value);
      return `${s}f`;
    }
    if (cppType === 'uint32_t' || cppType === 'int') return String(Math.trunc(value));
    return String(value);
  }
  if (typeof value === 'string') {
    // Duration-like strings (e.g. '500ms', '1s', '2min') for numeric param
    // types must be parsed to milliseconds — they cannot be passed as
    // C-strings to a numeric setter.
    if (cppType === 'uint32_t' || cppType === 'int' || cppType === 'float') {
      const ms = parseDurationToMs(value);
      if (ms === null) {
        throw new Error(
          `[espcompose] Cannot format string value '${value}' as C++ ${cppType}. ` +
          `Expected a duration literal (e.g. '500ms', '1s', '2min') for numeric ` +
          `parameter, but value did not parse.`,
        );
      }
      if (cppType === 'float') return `${ms}.0f`;
      return String(ms);
    }
    const escaped = value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    if (cppType === 'std::string') return `std::string("${escaped}")`;
    return `"${escaped}"`;
  }
  // Fallback — should not occur in practice.
  return String(value);
}

/**
 * Parse an ESPHome duration literal (e.g. `500ms`, `1s`, `2min`, `1h`) to
 * milliseconds. Returns `null` if the input is not a recognised duration.
 */
function parseDurationToMs(value: string): number | null {
  const match = /^\s*(\d+(?:\.\d+)?)\s*(ms|s|min|h|d)?\s*$/i.exec(value);
  if (!match) return null;
  const n = Number(match[1]);
  if (!Number.isFinite(n)) return null;
  const unit = (match[2] ?? 'ms').toLowerCase();
  switch (unit) {
    case 'ms':  return Math.round(n);
    case 's':   return Math.round(n * 1000);
    case 'min': return Math.round(n * 60_000);
    case 'h':   return Math.round(n * 3_600_000);
    case 'd':   return Math.round(n * 86_400_000);
    default:    return null;
  }
}
