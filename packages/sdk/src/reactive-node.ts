// ────────────────────────────────────────────────────────────────────────────
// ReactiveNode<T> — unified reactive value abstraction
//
// ReactiveNode is the single reactive value type in espcompose. It replaces
// the former Expression<T> class and supports both single-source and
// multi-source reactive values.
//
// All reactive bindings — even single-source HA entity properties — route
// through the C++ reactive runtime (Signal/Memo/Effect). There is no
// separate native-trigger path.
//
// Kinds:
//   - 'expression': single-source binding (e.g. officeLight.isOn)
//   - 'memo':       derived value from one or more sources (bind.memo())
//   - 'effect':     side-effect callback (bind.effect())
// ────────────────────────────────────────────────────────────────────────────

import { getTriggerSignature } from './trigger-registry';

// ────────────────────────────────────────────────────────────────────────────
// Dependency types
// ────────────────────────────────────────────────────────────────────────────

/**
 * Tracks which source component and trigger a reactive node depends on.
 */
export interface ExpressionDependency {
  /** ESPHome component ID that provides the value. */
  sourceId: string;
  /** The trigger on the source component (e.g. `on_state`, `on_value`). */
  triggerType: string;
  /** The component domain for trigger registry lookup (e.g. `binary_sensor`, `sensor`). */
  sourceDomain: string;
  /** C++ Signal variable name in espcompose_bindings.h (e.g. `sig_ha_light_kitchen_floods`). */
  cppSignalName?: string;
  /** C++ value type (e.g. `bool`, `float`, `std::string`). */
  cppType?: string;
  /**
   * Distinguishes HA entity signals from theme signals.
   * - 'ha_entity' (default): signal is fed by a Home Assistant sensor trigger
   * - 'theme': signal is a theme memo reading from a theme value array
   */
  sourceType?: 'ha_entity' | 'theme';
}

declare const REACTIVE_NODE_BRAND: unique symbol;

// ────────────────────────────────────────────────────────────────────────────
// Signal<T> — phantom branded type for user-facing reactive values
//
// At the type level, Signal<T> = T & { [SIGNAL]: true }. TypeScript treats
// it as assignable to T, so expressions like `signal ? "A" : "B"` type-check
// naturally. At runtime, the value is still a ReactiveNode instance — the
// brand is erased. The compiler detects Signal-typed sub-expressions in JSX
// attributes and auto-wraps them in bind.memo().
// ────────────────────────────────────────────────────────────────────────────

declare const SIGNAL_BRAND: unique symbol;

/**
 * A reactive value that the compiler can detect and auto-transform.
 *
 * At the type level this is `T & { [SIGNAL_BRAND]: true }`, so TypeScript
 * treats it as a `T` — operators, ternaries, and comparisons all work
 * naturally. At runtime the value is a `ReactiveNode<T>` instance.
 */
export type Signal<T> = T & { readonly [SIGNAL_BRAND]: true };

export type ReactiveNodeKind = 'expression' | 'memo' | 'effect';

/**
 * Configuration for creating a ReactiveNode instance.
 */
export interface ReactiveNodeConfig {
  kind: ReactiveNodeKind;
  dependencies: ExpressionDependency[];
  cppExpression: string;
  cppReturnType?: string;
  /** ESPHome component ID of the source (set for kind='expression'). */
  sourceId?: string;
  /** C++ property access path on the source component (set for kind='expression'). */
  property?: string;
  /** Which trigger to subscribe to (set for kind='expression'). */
  triggerType?: string;
  /** Component domain for trigger registry lookup (set for kind='expression'). */
  sourceDomain?: string;
  /** C++ Signal variable name for the reactive runtime. */
  cppSignalName?: string;
  /** C++ value type of the source signal. */
  cppType?: string;
}

/**
 * A compile-time marker representing a reactive value that may depend
 * on one or more ESPHome component states.
 *
 * ReactiveNode is the unified reactive type — it handles both single-source
 * bindings (kind='expression') and multi-source derived values (kind='memo').
 */
export class ReactiveNode<T = unknown> {
  declare readonly [REACTIVE_NODE_BRAND]?: T;
  readonly __reactive_node__ = true;

  readonly kind: ReactiveNodeKind;
  readonly dependencies: ExpressionDependency[];
  readonly cppExpression: string;
  readonly cppReturnType?: string;

  // ── Single-source metadata (set for kind='expression') ─────────────────
  readonly sourceId?: string;
  readonly property?: string;
  readonly triggerType?: string;
  readonly sourceDomain?: string;
  readonly cppSignalName?: string;
  readonly cppType?: string;

  /**
   * Optional C++ wrapper function for the YAML lambda value.
   * When set, toLambdaInit() wraps the get() call:
   *   `return wrapper(espcompose::memo_N.get());`
   * Used for font memos where the YAML expects lv_font_t*.
   */
  yamlLambdaWrapper?: string;

  /**
   * Index assigned by registerReactiveNode() during the render pass.
   * Used for C++ variable naming (memo_0, effect_0, etc.) and by the
   * serializer for generating initial value lambdas.
   * -1 means not yet registered.
   */
  _index = -1;

  constructor(config: ReactiveNodeConfig) {
    this.kind = config.kind;
    this.dependencies = config.dependencies;
    this.cppExpression = config.cppExpression;
    this.cppReturnType = config.cppReturnType;
    this.sourceId = config.sourceId;
    this.property = config.property;
    this.triggerType = config.triggerType;
    this.sourceDomain = config.sourceDomain;
    this.cppSignalName = config.cppSignalName;
    this.cppType = config.cppType;
  }

  /** Whether this node has a single dependency. */
  get isSingleSource(): boolean {
    return this.dependencies.length === 1;
  }

  /**
   * Allow ReactiveNodes to participate in JS value coercions (comparisons,
   * arithmetic, ternary conditions). Returns a type-appropriate default:
   *   - boolean → true  (so `expr && ...` proceeds to the rhs)
   *   - number  → NaN   (so numeric comparisons are false)
   *   - string  → ""    (empty string)
   *
   * This enables memo function bodies to evaluate without crashing.
   */
  valueOf(): T {
    switch (this.cppType) {
      case 'bool':
        return true as T;
      case 'float':
        return NaN as T;
      case 'std::string':
        return '' as T;
      default:
        return 0 as T;
    }
  }

  /**
   * Extract the reactive value for use in memo/effect function bodies.
   *
   * Returns `T` at the TypeScript type level, enabling natural operators:
   *   `tempSensor.value.get() > 72`    // TS sees number > number ✓
   *   `kitchenLight.isOn.get() && ...`  // TS sees boolean && ... ✓
   *
   * At runtime, returns a representative default value (via valueOf()).
   * The actual computation happens in C++ — the JS value is only used
   * for type inference.
   */
  get(): T {
    return this.valueOf();
  }

  /**
   * Generate the C++ lambda body for the initial value of a prop.
   *
   * For kind='expression' (HA):    `"return id(source).property;"`
   * For kind='expression' (theme): `"return espcompose::thm_X.get();"`
   * For kind='memo':               `"return espcompose::memo_N.get();"`
   */
  toLambdaInit(): string {
    if (this.kind === 'expression') {
      // Theme-sourced expression — read from the generated theme memo
      if (this.dependencies[0]?.sourceType === 'theme') {
        const sigName = this.cppSignalName ?? this.dependencies[0].cppSignalName ?? '';
        return `return espcompose::${sigName}.get();`;
      }

      // HA entity expression (existing logic)
      if (this.sourceId && this.property) {
        const raw = `id(${this.sourceId})${this.property}`;
        if (this.cppReturnType) {
          const sig = this.sourceDomain && this.triggerType
            ? getTriggerSignature(this.sourceDomain, this.triggerType)
            : undefined;
          const sourceType = sig?.variables[0]?.cppType;
          if (sourceType && sourceType !== this.cppReturnType) {
            return `return ${wrapConversion(raw, sourceType, this.cppReturnType)};`;
          }
        }
        return `return ${raw};`;
      }
    }

    // Memo: read from runtime memo variable
    const idx = this._index >= 0 ? this._index : 0;
    if (this.yamlLambdaWrapper) {
      return `return ${this.yamlLambdaWrapper}(espcompose::memo_${idx}.get());`;
    }
    const retType = this.cppReturnType ?? 'std::string';
    if (retType === 'std::string') {
      return `return espcompose::memo_${idx}.get().c_str();`;
    }
    return `return espcompose::memo_${idx}.get();`;
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
 * Type guard for ReactiveNode instances.
 */
export function isReactiveNode(val: unknown): val is ReactiveNode {
  return val instanceof ReactiveNode;
}

// ── Dependency tracking ────────────────────────────────────────────────────

/** Module-level stack for tracking reactive dependencies during render. */
const trackingStack: ExpressionDependency[][] = [];

/** Start tracking reactive dependencies. */
export function startTracking(): void {
  trackingStack.push([]);
}

/** Stop tracking and return the collected dependencies. */
export function stopTracking(): ExpressionDependency[] {
  return trackingStack.pop() ?? [];
}

/** Record a dependency during tracking. */
export function trackDependency(dep: ExpressionDependency): void {
  if (trackingStack.length === 0) return;
  const frame = trackingStack[trackingStack.length - 1];
  // Deduplicate by sourceId + property
  if (!frame.some(d => d.sourceId === dep.sourceId && d.triggerType === dep.triggerType)) {
    frame.push(dep);
  }
}

/** Whether dependency tracking is active. */
export function isTracking(): boolean {
  return trackingStack.length > 0;
}
