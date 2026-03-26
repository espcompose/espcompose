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
import type { Expression } from '../expression';

// ────────────────────────────────────────────────────────────────────────────
// Binding types
// ────────────────────────────────────────────────────────────────────────────

/**
 * Records that an Expression<T> was used in a specific element prop.
 * The reactive injector uses this to generate trigger-based update wiring.
 */
export interface ReactiveBinding {
  /** ESPHome ID of the target element (auto-assigned if not present). */
  targetId: string;
  /** Element type for dispatch (e.g. `lvgl_button`, `sensor`, `light`). */
  targetType: string;
  /** Snake_case prop name on the target (e.g. `checked`, `text`, `text_color`). */
  targetProp: string;
  /** The Expression instance that provides the reactive value. */
  expression: Expression;
}

/**
 * Records a Home Assistant entity that needs a sensor import in the YAML config.
 */
export interface HAEntityRegistration {
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
}

// ────────────────────────────────────────────────────────────────────────────
// Scope frame
// ────────────────────────────────────────────────────────────────────────────

interface ReactiveScopeFrame {
  bindings: ReactiveBinding[];
  entities: Map<string, HAEntityRegistration>;
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
export function registerReactiveBinding(binding: ReactiveBinding): void {
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
export function registerHAEntity(entity: HAEntityRegistration): void {
  const frame = useContext(reactiveScopeContext);
  if (frame && !frame.entities.has(entity.entityId)) {
    frame.entities.set(entity.entityId, entity);
  }
}

// ────────────────────────────────────────────────────────────────────────────
// Scope lifecycle — wraps the render pass
// ────────────────────────────────────────────────────────────────────────────

export interface ReactiveScopeResult<T> {
  result: T;
  bindings: ReactiveBinding[];
  entities: HAEntityRegistration[];
}

/**
 * Establish a reactive scope frame before running `fn`.
 *
 * During `fn`, calls to `registerReactiveBinding()` and `registerHAEntity()`
 * accumulate in this frame. After `fn` returns, the collected registrations
 * are returned alongside the function's result.
 *
 * Typically called by the compiler's execute phase to wrap the render pass.
 */
export function withReactiveScope<T>(fn: () => T): ReactiveScopeResult<T> {
  const frame: ReactiveScopeFrame = {
    bindings: [],
    entities: new Map(),
  };

  const result = withContext(reactiveScopeContext, frame, fn);

  return {
    result,
    bindings: frame.bindings,
    entities: Array.from(frame.entities.values()),
  };
}
