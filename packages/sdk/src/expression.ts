// ────────────────────────────────────────────────────────────────────────────
// Expression<T> — compile-time reactive value marker
//
// An Expression represents a value that comes from an ESPHome component's
// state at runtime. At compile time, Expressions are inert markers — the
// compiler pipeline detects them in the rendered element tree and:
//
//   1. Serializes them as `!lambda "return id(source).property;"` for initial
//      values (via serializeValue in serialize.ts).
//
//   2. Generates reactive trigger wiring (on_state: / on_value: triggers
//      that call lvgl.widget.update or similar) so the UI stays in sync
//      when the source component's state changes.
//
// Expression<T> is NOT LVGL-specific — any prop typed as `T | Expression<T>`
// will serialize to a lambda. The reactive trigger wiring depends on the
// context (LVGL widgets get lvgl.widget.update; other components may get
// different treatments in future phases).
// ────────────────────────────────────────────────────────────────────────────

import type { TriggerSignature } from './trigger-registry';
import { getTriggerSignature } from './trigger-registry';

declare const EXPRESSION_BRAND: unique symbol;

/**
 * Tracks which source component and trigger an expression depends on.
 */
export interface ExpressionDependency {
  /** ESPHome component ID that provides the value. */
  sourceId: string;
  /** The trigger on the source component (e.g. `on_state`, `on_value`). */
  triggerType: string;
  /** The component domain for trigger registry lookup (e.g. `binary_sensor`, `sensor`). */
  sourceDomain: string;
}

/**
 * Configuration for creating an Expression instance.
 */
export interface ExpressionConfig {
  /** ESPHome component ID of the source (e.g. `ha_light_kitchen_floods` or a ref token). */
  sourceId: string;
  /** C++ property access path on the source component (e.g. `.state`, `.current_values.is_on()`). */
  property: string;
  /** Which trigger to subscribe to on the source (e.g. `on_state`, `on_value`). */
  triggerType: string;
  /** Component domain for trigger registry lookup (e.g. `binary_sensor`, `sensor`, `light`). */
  sourceDomain: string;
  /** Expected C++ return type (e.g. `std::string`, `bool`, `float`). When set, lambdas apply type conversions if the source provides a different type. */
  cppReturnType?: string;
}

/**
 * A compile-time marker representing a runtime value from an ESPHome component.
 *
 * Expression instances are detected by the serializer and compiler to produce:
 * - `!lambda` YAML values for initial prop values
 * - Reactive trigger subscriptions that push state updates to bound widgets
 *
 * @typeParam T - The TypeScript type of the runtime value (e.g. `boolean`, `number`, `string`).
 */
export class Expression<T = unknown> {
  declare readonly [EXPRESSION_BRAND]?: T;

  /** ESPHome component ID of the source. */
  readonly sourceId: string;

  /** C++ property access path (e.g. `.state`, `.current_values.is_on()`). */
  readonly property: string;

  /** Trigger name on the source (e.g. `on_state`, `on_value`). */
  readonly triggerType: string;

  /** Component domain for trigger registry lookup. */
  readonly sourceDomain: string;

  /** Expected C++ return type for lambda generation. */
  readonly cppReturnType?: string;

  constructor(config: ExpressionConfig) {
    this.sourceId = config.sourceId;
    this.property = config.property;
    this.triggerType = config.triggerType;
    this.sourceDomain = config.sourceDomain;
    this.cppReturnType = config.cppReturnType;
  }

  /**
   * The dependencies this expression subscribes to — used by the reactive
   * injector to generate trigger wiring.
   */
  get dependencies(): ExpressionDependency[] {
    return [{
      sourceId: this.sourceId,
      triggerType: this.triggerType,
      sourceDomain: this.sourceDomain,
    }];
  }

  /**
   * Generate the C++ lambda body for the initial value of a prop.
   *
   * Example output: `"return id(ha_light_kitchen).state;"`
   */
  toLambdaInit(): string {
    const raw = `id(${this.sourceId})${this.property}`;
    if (this.cppReturnType) {
      const sig = getTriggerSignature(this.sourceDomain, this.triggerType);
      const sourceType = sig?.variables[0]?.cppType;
      if (sourceType && sourceType !== this.cppReturnType) {
        return `return ${wrapConversion(raw, sourceType, this.cppReturnType)};`;
      }
    }
    return `return ${raw};`;
  }

  /**
   * Generate the C++ lambda body for use inside a trigger callback.
   *
   * Consults the trigger signature to determine whether a trigger variable
   * (e.g. `x`) is available:
   * - If the trigger provides a variable, uses it directly: `"return x;"`
   * - If no variables are available, falls back to full component lookup:
   *   `"return id(source).property;"`
   *
   * @param sig - The trigger signature from the trigger registry.
   *              If undefined, falls back to full component lookup.
   */
  toLambdaTrigger(sig?: TriggerSignature): string {
    if (sig && sig.variables.length > 0) {
      const varName = sig.variables[0].name;
      const sourceType = sig.variables[0].cppType;
      if (this.cppReturnType && sourceType !== this.cppReturnType) {
        return `return ${wrapConversion(varName, sourceType, this.cppReturnType)};`;
      }
      return `return ${varName};`;
    }
    // No trigger variable available — full component lookup.
    return this.toLambdaInit();
  }
}

/**
 * Wrap a C++ expression with a type conversion when source and target types differ.
 */
function wrapConversion(expr: string, fromType: string, toType: string): string {
  if (toType === 'std::string') {
    if (fromType === 'bool') return `std::string(${expr} ? "on" : "off")`;
    if (fromType === 'float') return `to_string(${expr})`;
  }
  return expr;
}

/**
 * Type guard for Expression instances.
 */
export function isExpression(val: unknown): val is Expression {
  return val instanceof Expression;
}
