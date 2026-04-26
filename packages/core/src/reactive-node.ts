// ────────────────────────────────────────────────────────────────────────────
// IRReactiveNode<T> — unified reactive value abstraction
//
// IRReactiveNode is the single reactive value type in espcompose.
// It supports both single-source and multi-source reactive values.
//
// All reactive bindings — even single-source HA entity properties — route
// through the C++ reactive runtime (Signal/Memo/Effect). There is no
// separate native-trigger path.
//
// Kinds:
//   - 'expression': single-source binding (e.g. officeLight.isOn)
//   - 'memo':       derived value from one or more sources (useMemo())
//   - 'effect':     side-effect callback (useEffect())
// ────────────────────────────────────────────────────────────────────────────

import type { IRExprNode, ExprType } from './ir/expr-types';

// ────────────────────────────────────────────────────────────────────────────
// Dependency types
// ────────────────────────────────────────────────────────────────────────────

/**
 * Tracks which source component and trigger a reactive node depends on.
 */
export interface IRDependency {
  readonly kind: 'dependency';
  /** ESPHome component ID that provides the value. */
  sourceId: string;
  /** The trigger on the source component (e.g. `on_state`, `on_value`). */
  triggerType: string;
  /** The component domain for trigger registry lookup (e.g. `binary_sensor`, `sensor`). */
  sourceDomain: string;
  /**
   * Distinguishes HA entity signals from theme signals and global signals.
   * - 'ha_entity' (default): signal is fed by a Home Assistant sensor trigger
   * - 'theme': signal is a theme memo reading from a theme value array
   * - 'global': signal is backed by an ESPHome globals component (BoundSignal<T>)
   */
  sourceType?: 'ha_entity' | 'theme' | 'global' | 'popup_mux';
}

declare const REACTIVE_NODE_BRAND: unique symbol;

// ────────────────────────────────────────────────────────────────────────────
// Signal<T> — phantom branded type for user-facing reactive values
//
// At the type level, Signal<T> = T & { [SIGNAL]: true }. TypeScript treats
// it as assignable to T, so expressions like `signal ? "A" : "B"` type-check
// naturally. At runtime, the value is still a IRReactiveNode instance — the
// brand is erased. The compiler detects Signal-typed sub-expressions in JSX
// attributes and auto-wraps them in useMemo().
// ────────────────────────────────────────────────────────────────────────────

declare const SIGNAL_BRAND: unique symbol;

/**
 * A reactive value that the compiler can detect and auto-transform.
 *
 * At the type level this is `T & { [SIGNAL_BRAND]: true }`, so TypeScript
 * treats it as a `T` — operators, ternaries, and comparisons all work
 * naturally. At runtime the value is a `IRReactiveNode<T>` instance.
 */
export type Signal<T> = T & { readonly [SIGNAL_BRAND]: true };

export type IRReactiveNodeKind = 'expression' | 'memo' | 'effect';

/**
 * Configuration for creating an IRReactiveNode instance.
 */
export interface IRReactiveNodeConfig {
  kind: IRReactiveNodeKind;
  dependencies: IRDependency[];
  /** Target-agnostic return type for this reactive value. */
  exprType?: ExprType;
  /** ESPHome component ID of the source (set for kind='expression'). */
  sourceId?: string;
  /** Semantic property name on the source entity (e.g. 'isOn', 'brightness'). */
  property?: string;
  /** Which trigger to subscribe to (set for kind='expression'). */
  triggerType?: string;
  /** Component domain for trigger registry lookup (set for kind='expression'). */
  sourceDomain?: string;
}

/**
 * A compile-time marker representing a reactive value that may depend
 * on one or more ESPHome component states.
 *
 * IRReactiveNode is the unified reactive type — it handles both single-source
 * bindings (kind='expression') and multi-source derived values (kind='memo').
 */
export class IRReactiveNode<T = unknown> {
  declare readonly [REACTIVE_NODE_BRAND]?: T;
  readonly __reactive_node__ = true;

  readonly kind: IRReactiveNodeKind;
  readonly dependencies: IRDependency[];
  /** Target-agnostic return type for this reactive value. */
  readonly exprType?: ExprType;

  // ── Single-source metadata (set for kind='expression') ─────────────────
  readonly sourceId?: string;
  readonly property?: string;
  readonly triggerType?: string;
  readonly sourceDomain?: string;

  /**
   * Stable identity for this reactive node, assigned at construction time.
   * Combines the node kind with a random suffix (e.g. `memo_f18b3i5jb`).
   * Used as the lookup key in backend maps and for IR debug output.
   */
  readonly nodeId: string;

  /**
   * Target-agnostic expression AST for this reactive node.
   *
   * Set by the AST compiler (__espcompose.compiled) when the expression is
   * statically analyzed. Backends lower this to target code (C++ or JS).
   */
  exprIR?: IRExprNode;

  constructor(config: IRReactiveNodeConfig) {
    this.kind = config.kind;
    this.dependencies = config.dependencies;
    this.exprType = config.exprType;
    this.sourceId = config.sourceId;
    this.property = config.property;
    this.triggerType = config.triggerType;
    this.sourceDomain = config.sourceDomain;
    this.nodeId = `${config.kind}_${Math.random().toString(36).slice(2, 11)}`;
  }

  /** Whether this node has a single dependency. */
  get isSingleSource(): boolean {
    return this.dependencies.length === 1;
  }

  /**
   * Allow IRReactiveNodes to participate in JS value coercions (comparisons,
   * arithmetic, ternary conditions). Returns a type-appropriate default:
   *   - boolean → true  (so `expr && ...` proceeds to the rhs)
   *   - number  → NaN   (so numeric comparisons are false)
   *   - string  → ""    (empty string)
   *
   * This enables memo function bodies to evaluate without crashing.
   */
  valueOf(): T {
    switch (this.exprType) {
      case 'bool':
        return true as T;
      case 'float':
      case 'int':
        return NaN as T;
      case 'string':
        return '' as T;
      default:
        return 0 as T;
    }
  }

  /**
   * String coercion for template literals and string concatenation.
   *
   * Without this override, `${reactiveNode}` produces "[object Object]".
   * Delegates to valueOf() so the result matches the type-appropriate default.
   */
  toString(): string {
    return String(this.valueOf());
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

}

/**
 * Type guard for IRReactiveNode instances.
 */
export function isIRReactiveNode(val: unknown): val is IRReactiveNode {
  return val instanceof IRReactiveNode;
}

// ── Dependency tracking ────────────────────────────────────────────────────

/** Module-level stack for tracking reactive dependencies during render. */
const trackingStack: IRDependency[][] = [];

/** Start tracking reactive dependencies. */
export function startTracking(): void {
  trackingStack.push([]);
}

/** Stop tracking and return the collected dependencies. */
export function stopTracking(): IRDependency[] {
  return trackingStack.pop() ?? [];
}

/** Record a dependency during tracking. */
export function trackDependency(dep: IRDependency): void {
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
