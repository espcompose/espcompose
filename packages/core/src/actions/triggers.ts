// ────────────────────────────────────────────────────────────────────────────
// TriggerArgs — proxy for typed trigger variable access in action bodies
//
// ESPHome triggers provide lambda variables (e.g. `x` for sensor on_value).
// In a trigger handler body with typed args, `args.x` must produce a reference
// that serializes to C++ lambda variable access in the YAML output.
//
// The TriggerArgs proxy intercepts property access and returns TriggerVar
// marker objects that the serializer can recognize and emit as lambda refs.
// ────────────────────────────────────────────────────────────────────────────

declare const TRIGGER_VAR_BRAND: unique symbol;

/**
 * A marker representing a trigger lambda variable reference.
 * When used in an action descriptor, serializes to a `!lambda` expression.
 */
export class TriggerVar<T = unknown> {
  declare readonly [TRIGGER_VAR_BRAND]: T;

  /** The C++ variable name (e.g. 'x'). */
  readonly name: string;

  constructor(name: string) {
    this.name = name;
  }

  /** Convert to a C++ lambda return expression. */
  toLambda(): string {
    return `return ${this.name};`;
  }

  toString(): string {
    return this.name;
  }
}

export function isTriggerVar(val: unknown): val is TriggerVar {
  return val instanceof TriggerVar;
}


