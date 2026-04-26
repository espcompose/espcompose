// ────────────────────────────────────────────────────────────────────────────
// Reactive scope — mirrors useScope.ts (script scope) pattern
//
// Tracks two kinds of registrations during the render pass:
//
//   1. ReactiveBindings — Expression<T> instances found in element props
//      during serialization. Each binding records: target element ID,
//      target element type, target prop name, and the Expression.
//
//   2. HAEntityRegistrations — HA entities requested via useHAEntity().
//      Each registration records: entity_id, domain, sensor type, and
//      the auto-generated ESPHome component ID.
//
// The compiler wraps the render pass in withReactiveScope(), then uses
// the collected registrations to inject HA sensor imports and reactive
// trigger wiring into the final YAML config.
// ────────────────────────────────────────────────────────────────────────────

import { Context, createContext, useContext, withContext } from './useContext';
import type { IRReactiveNode } from '../reactive-node';

// ────────────────────────────────────────────────────────────────────────────
// Binding types
// ────────────────────────────────────────────────────────────────────────────

/**
 * Links an IRReactiveNode to a specific element prop.
 * The compiler uses this to generate reactive trigger wiring.
 */
export interface IRBinding {
  readonly kind: 'binding';
  /** ESPHome ID of the target element (auto-assigned if not present). */
  targetId: string;
  /** Element type for dispatch (e.g. `lvgl_button`, `sensor`, `light`). */
  targetType: string;
  /** Snake_case prop name on the target (e.g. `checked`, `text`, `text_color`). */
  targetProp: string;
  /** The IRReactiveNode instance that provides the reactive value. */
  expression: IRReactiveNode;
  /** LVGL part name (snake_case) if the binding targets a sub-part, e.g. `'indicator'`, `'knob'`. */
  part?: string;
  /** LVGL state name (snake_case) if the binding targets a state variant, e.g. `'pressed'`, `'disabled'`. */
  state?: string;
}

/**
 * A component definition (image, font, etc.) for injection into the YAML config.
 */
export interface IRComponent {
  readonly kind: 'component';
  /** ESPHome config section to inject into (e.g. `'image'`, `'font'`). */
  section: string;
  /** Auto-generated or user-supplied component ID. */
  id: string;
  /** Full snake_case config object for the component entry. */
  config: Record<string, unknown>;
}

/**
 * A Home Assistant entity that needs a sensor import in the YAML config.
 */
export interface IRHAEntity {
  readonly kind: 'ha_entity';
  /** Full HA entity ID (e.g. `light.kitchen_floods`). */
  entityId: string;
  /** HA domain extracted from entity ID prefix (e.g. `light`, `sensor`). */
  domain: string;
  /**
   * ESPHome sensor platform type used to import this entity's state.
   * Determined by domain:
   * - `light.*`, `switch.*`, `binary_sensor.*` → `binary_sensor`
   * - `sensor.*`, `number.*` → `sensor`
   * - `text_sensor.*`, `select.*` → `text_sensor`
   */
  sensorType: 'binary_sensor' | 'sensor' | 'text_sensor';
  /** Auto-generated ESPHome component ID (e.g. `ha_light_kitchen_floods`). */
  generatedId: string;
  /** Optional HA entity attribute name (e.g. `brightness`). When set, the sensor imports this attribute rather than the entity state. */
  attribute?: string;
}

// ────────────────────────────────────────────────────────────────────────────
// Scope frame
// ────────────────────────────────────────────────────────────────────────────

interface ReactiveScopeFrame {
  bindings: IRBinding[];
  entities: Map<string, IRHAEntity>;
  components: Map<string, IRComponent>;
  reactiveNodes: IRReactiveNode[];
}

const reactiveScopeContext: Context<ReactiveScopeFrame | null> =
  createContext<ReactiveScopeFrame | null>(null);

// ────────────────────────────────────────────────────────────────────────────
// Registration API — called during render
// ────────────────────────────────────────────────────────────────────────────

/**
 * Register a reactive binding discovered during element serialization.
 * No-op if called outside a reactive scope.
 */
export function registerReactiveBinding(binding: IRBinding): void {
  const frame = useContext(reactiveScopeContext);
  if (frame) {
    frame.bindings.push(binding);
  }
}

/**
 * Register a Home Assistant entity that needs an auto-generated sensor import.
 * Deduplicates by entityId — multiple calls with the same entity are safe.
 * No-op if called outside a reactive scope.
 */
export function registerHAEntity(entity: IRHAEntity): void {
  const frame = useContext(reactiveScopeContext);
  if (frame && !frame.entities.has(entity.generatedId)) {
    frame.entities.set(entity.generatedId, entity);
  }
}

/**
 * Register a component definition (image, font, etc.) for injection into the
 * final YAML config. Deduplicates by component ID.
 * No-op if called outside a reactive scope.
 */
export function registerComponent(reg: IRComponent): void {
  const frame = useContext(reactiveScopeContext);
  if (frame && !frame.components.has(reg.id)) {
    frame.components.set(reg.id, reg);
  }
}

/**
 * Register an IRReactiveNode (memo or effect) created during the render pass.
 * Returns the node's stable nodeId.
 *
 * Throws if called outside a reactive scope — this would result in an
 * unregistered node that is referenced in the config tree but never
 * declared in the C++ runtime, producing a downstream "memo not found"
 * compilation error. The render pass must be wrapped in withReactiveScope().
 */
export function registerReactiveNode(node: IRReactiveNode): string {
  const frame = useContext(reactiveScopeContext);
  if (!frame) {
    const depSummary = node.dependencies
      .map(d => `${d.sourceType ?? '?'}:${d.sourceId}`)
      .join(', ');
    throw new Error(
      `[espcompose] registerReactiveNode() called outside a reactive scope.\n` +
      `  node.nodeId=${node.nodeId}\n` +
      `  node.kind=${node.kind}\n` +
      `  node.exprType=${node.exprType ?? 'undefined'}\n` +
      `  node.exprIR.kind=${node.exprIR?.kind ?? 'undefined'}\n` +
      `  dependencies=[${depSummary}]\n` +
      `  This typically means a reactive value (useMemo / __espcompose.compiled) was\n` +
      `  created at module top level or after the render pass closed. All reactive\n` +
      `  node creation must happen inside a function component body, which the\n` +
      `  compiler wraps in withReactiveScope().`,
    );
  }
  frame.reactiveNodes.push(node);
  return node.nodeId;
}

// ────────────────────────────────────────────────────────────────────────────
// Scope lifecycle — wraps the render pass
// ────────────────────────────────────────────────────────────────────────────

export interface ReactiveScopeResult<T> {
  result: T;
  bindings: IRBinding[];
  entities: IRHAEntity[];
  components: IRComponent[];
  reactiveNodes: IRReactiveNode[];
}

/**
 * Establish a reactive scope frame before running `fn`.
 *
 * During `fn`, calls to `registerReactiveBinding()`, `registerHAEntity()`,
 * and `registerReactiveNode()` accumulate in this frame. After `fn` returns,
 * the collected registrations are returned alongside the function's result.
 *
 * Typically called by the compiler's execute phase to wrap the render pass.
 */
export function withReactiveScope<T>(fn: () => T): ReactiveScopeResult<T> {
  const frame: ReactiveScopeFrame = {
    bindings: [],
    entities: new Map(),
    components: new Map(),
    reactiveNodes: [],
  };

  const result = withContext(reactiveScopeContext, frame, fn);

  return {
    result,
    bindings: frame.bindings,
    entities: Array.from(frame.entities.values()),
    components: Array.from(frame.components.values()),
    reactiveNodes: frame.reactiveNodes,
  };
}
