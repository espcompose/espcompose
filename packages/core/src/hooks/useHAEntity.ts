// ────────────────────────────────────────────────────────────────────────────
// useHAEntity() — Home Assistant entity hook
//
// Creates a typed binding object for a HA entity. The binding provides:
//   - IRReactiveNode<T> properties for reactive state reads
//   - Action methods (compile-time no-ops) for entity control
//
// Must be called inside a function component body (render pass).
// Registers the HA entity in the reactive scope so the compiler
// can auto-generate the `platform: homeassistant` sensor import and
// reactive trigger wiring in the final YAML.
//
// Entity deduplication: multiple calls with the same entity_id in the
// same render pass return a cached binding and register only once.
// ────────────────────────────────────────────────────────────────────────────

import { IRReactiveNode, isIRReactiveNode } from '../reactive';
import type { Signal, IRDependency } from '../reactive';
import type { ExprType } from '../ir/expr-types';
import { registerHAEntity } from './useReactiveScope';
import { isTracking, trackDependency } from '../reactive';
import { assertHookContext } from './useState';
import { throwCompileTimeOnly } from '../errors';
import type {
  LightBinding,
  SensorBinding,
  BinarySensorBinding,
  SwitchBinding,
  FanBinding,
  CoverBinding,
} from '../entity/bindings';
import type { HAEntityBindingMap } from '../entity/ha-bindings';
import { classifyHAEntity } from '../entity/ha-classifier';

/**
 * Extract the domain from a HA entity ID.
 *
 * `light.kitchen_floods` → `light`
 */
function extractDomain(entityId: string): string {
  const dotIndex = entityId.indexOf('.');
  return dotIndex >= 0 ? entityId.slice(0, dotIndex) : entityId;
}

// ────────────────────────────────────────────────────────────────────────────
// Binding cache — deduplication within a render pass
// ────────────────────────────────────────────────────────────────────────────

const bindingCache = new Map<string, unknown>();

/** Clear the binding cache. Called at the start of each render pass. */
export function clearHAEntityCache(): void {
  bindingCache.clear();
}

// ────────────────────────────────────────────────────────────────────────────
// Tracking proxy — intercept reactive property reads during memo/effect
// ────────────────────────────────────────────────────────────────────────────

/**
 * Wrap a binding object in a Proxy that intercepts reads of IRReactiveNode-valued
 * properties. When dependency tracking is active (inside useMemo/useEffect),
 * the proxy calls trackDependency() and recordAccess() so the dependency
 * graph and C++ codegen substitution table are populated automatically.
 */
function createTrackingProxy<T extends object>(binding: T): T {
  return new Proxy(binding, {
    get(target, prop, receiver) {
      const val = Reflect.get(target, prop, receiver);

      // Only intercept IRReactiveNode-valued properties when tracking
      if (isIRReactiveNode(val) && typeof prop === 'string' && isTracking()) {
        // Record dependency for the reactive graph
        for (const dep of val.dependencies) {
          trackDependency(dep);
        }
      }

      return val;
    },
  });
}

// ────────────────────────────────────────────────────────────────────────────
// Entity type inference
// ────────────────────────────────────────────────────────────────────────────

/** Derive ExprType from entity sourceDomain alone. */
function inferEntityExprType(sourceDomain: string): ExprType {
  if (sourceDomain === 'text_sensor') return 'string';
  if (sourceDomain === 'sensor') return 'float';
  if (sourceDomain === 'binary_sensor') return 'bool';
  return 'bool';
}

// ────────────────────────────────────────────────────────────────────────────
// IRReactiveNode factory
// ────────────────────────────────────────────────────────────────────────────

function makeExpressionNode<T>(
  sourceId: string,
  sourceDomain: string,
  property = 'state',
  exprTypeOverride?: ExprType,
  entityId?: string,
  semanticProp?: string,
): Signal<T> {
  const sourceExprType = inferEntityExprType(sourceDomain);
  const exprType = exprTypeOverride ?? sourceExprType;
  const dep: IRDependency = {
    kind: 'dependency',
    sourceType: 'ha_entity',
    sourceId,
    sourceDomain,
  };
  const node = new IRReactiveNode<T>({
    kind: 'expression',
    dependencies: [dep],
    exprType,
    sourceId,
    propertyKey: property,
    sourceDomain,
  });
  if (entityId && semanticProp) {
    node.exprIR = { kind: 'expr:entity_prop', entityId, propertyKey: semanticProp, type: exprType };
  }
  return node as unknown as Signal<T>;
}

// ────────────────────────────────────────────────────────────────────────────
// Domain-specific binding factories
// ────────────────────────────────────────────────────────────────────────────

function createLightBinding(sourceId: string, entityId: string): LightBinding {
  const brightnessVariant = { kind: 'attribute' as const, attribute: 'brightness', exprType: 'float' as const };
  const stateTextVariant = { kind: 'facet' as const, facet: 'stateText' as const, exprType: 'string' as const };

  const brightness = classifyHAEntity({ entityId, domain: 'light', variant: brightnessVariant });
  const stateText = classifyHAEntity({ entityId, domain: 'light', variant: stateTextVariant });

  // Register a separate sensor import for the brightness attribute
  registerHAEntity({
    kind: 'ha_entity',
    entityId,
    domain: 'light',
    semanticId: brightness.semanticId,
    variant: brightnessVariant,
  });

  // Register a text_sensor import for string state representation
  registerHAEntity({
    kind: 'ha_entity',
    entityId,
    domain: 'light',
    semanticId: stateText.semanticId,
    variant: stateTextVariant,
  });

  const binding: LightBinding = {
    isOn: makeExpressionNode<boolean>(sourceId, 'binary_sensor', 'state', undefined, entityId, 'isOn'),
    brightness: makeExpressionNode<number>(brightness.semanticId, 'sensor', 'state', undefined, entityId, 'brightness'),
    stateText: makeExpressionNode<string>(stateText.semanticId, 'text_sensor', 'state', 'string', entityId, 'stateText'),

    toggle() { /* no-op */ },
    turnOn() { /* no-op */ },
    turnOff() { /* no-op */ },
  };

  return createTrackingProxy(createActionProxy(binding, entityId, 'light'));
}

function createSensorBinding(sourceId: string, entityId: string): SensorBinding {
  const stateTextVariant = { kind: 'facet' as const, facet: 'stateText' as const, exprType: 'string' as const };
  const stateText = classifyHAEntity({ entityId, domain: 'sensor', variant: stateTextVariant });

  // Register a text_sensor import for string state representation
  registerHAEntity({
    kind: 'ha_entity',
    entityId,
    domain: 'sensor',
    semanticId: stateText.semanticId,
    variant: stateTextVariant,
  });

  return createTrackingProxy({
    value: makeExpressionNode<number>(sourceId, 'sensor', 'state', undefined, entityId, 'value'),
    stateText: makeExpressionNode<string>(stateText.semanticId, 'text_sensor', 'state', 'string', entityId, 'stateText'),
  });
}

function createBinarySensorBinding(sourceId: string, entityId: string): BinarySensorBinding {
  const stateTextVariant = { kind: 'facet' as const, facet: 'stateText' as const, exprType: 'string' as const };
  const stateText = classifyHAEntity({ entityId, domain: 'binary_sensor', variant: stateTextVariant });

  // Register a text_sensor import for string state representation
  registerHAEntity({
    kind: 'ha_entity',
    entityId,
    domain: 'binary_sensor',
    semanticId: stateText.semanticId,
    variant: stateTextVariant,
  });

  return createTrackingProxy({
    isOn: makeExpressionNode<boolean>(sourceId, 'binary_sensor', 'state', undefined, entityId, 'isOn'),
    stateText: makeExpressionNode<string>(stateText.semanticId, 'text_sensor', 'state', 'string', entityId, 'stateText'),
  });
}

function createSwitchBinding(sourceId: string, entityId: string): SwitchBinding {
  const binding: SwitchBinding = {
    isOn: makeExpressionNode<boolean>(sourceId, 'binary_sensor', 'state', undefined, entityId, 'isOn'),
    toggle() { /* no-op */ },
    turnOn() { /* no-op */ },
    turnOff() { /* no-op */ },
  };

  return createTrackingProxy(createActionProxy(binding, entityId, 'switch'));
}

function createFanBinding(sourceId: string, entityId: string): FanBinding {
  const binding: FanBinding = {
    isOn: makeExpressionNode<boolean>(sourceId, 'binary_sensor', 'state', undefined, entityId, 'isOn'),
    toggle() { /* no-op */ },
    turnOn() { /* no-op */ },
    turnOff() { /* no-op */ },
  };

  return createTrackingProxy(createActionProxy(binding, entityId, 'fan'));
}

function createCoverBinding(sourceId: string, entityId: string): CoverBinding {
  const binding: CoverBinding = {
    isOpen: makeExpressionNode<boolean>(sourceId, 'binary_sensor', 'state', undefined, entityId, 'isOpen'),
    open() { /* no-op */ },
    close() { /* no-op */ },
    stop() { /* no-op */ },
  };

  return createTrackingProxy(createActionProxy(binding, entityId, 'cover'));
}

/**
 * Wraps a binding in a Proxy that intercepts action method calls.
 *
 * The AST compiler handles HA entity action calls (entity.toggle(), etc.)
 * at build time. This proxy ensures the methods exist as callable no-ops
 * at runtime.
 */
function createActionProxy<T extends object>(binding: T, _entityId: string, _domain: string): T {
  return new Proxy(binding, {
    get(target, prop, receiver) {
      const val = Reflect.get(target, prop, receiver);
      if (typeof val === 'function' && typeof prop === 'string') {
        // No-op at runtime — the AST compiler handles HA entity actions.
        return function actionMethod() { throwCompileTimeOnly(`entity.${String(prop)}()`, 'HA entity actions'); };
      }
      return val;
    },
  });
}

// ────────────────────────────────────────────────────────────────────────────
// Public API — useHAEntity() with domain-typed overloads
// ────────────────────────────────────────────────────────────────────────────

export function useHAEntity(entityId: `light.${string}`): LightBinding;
export function useHAEntity(entityId: `sensor.${string}`): SensorBinding;
export function useHAEntity(entityId: `binary_sensor.${string}`): BinarySensorBinding;
export function useHAEntity(entityId: `switch.${string}`): SwitchBinding;
export function useHAEntity(entityId: `fan.${string}`): FanBinding;
export function useHAEntity(entityId: `cover.${string}`): CoverBinding;
export function useHAEntity<D extends keyof HAEntityBindingMap>(entityId: string, options: { domain: D }): HAEntityBindingMap[D];
export function useHAEntity(entityId: string): unknown;

export function useHAEntity(entityId: string, options?: { domain?: string }): unknown {
  assertHookContext('useHAEntity()');

  // Deduplication: return cached binding if already created.
  const cached = bindingCache.get(entityId);
  if (cached) return cached;

  const domain = options?.domain ?? extractDomain(entityId);
  const { semanticId } = classifyHAEntity({ entityId, domain, variant: { kind: 'state' } });

  // Register the entity for auto-import in the YAML output.
  registerHAEntity({
    kind: 'ha_entity',
    entityId,
    domain,
    semanticId,
    variant: { kind: 'state' },
  });

  // Create the domain-specific binding.
  let binding: unknown;

  switch (domain) {
    case 'light':
      binding = createLightBinding(semanticId, entityId);
      break;
    case 'sensor':
    case 'number':
      binding = createSensorBinding(semanticId, entityId);
      break;
    case 'binary_sensor':
      binding = createBinarySensorBinding(semanticId, entityId);
      break;
    case 'switch':
      binding = createSwitchBinding(semanticId, entityId);
      break;
    case 'fan':
      binding = createFanBinding(semanticId, entityId);
      break;
    case 'cover':
      binding = createCoverBinding(semanticId, entityId);
      break;
    default:
      // Fallback: treat as binary sensor binding.
      binding = createBinarySensorBinding(semanticId, entityId);
      break;
  }

  // Stamp entity metadata for runtime action resolution (non-enumerable)
  if (binding && typeof binding === 'object') {
    Object.defineProperties(binding, {
      __entityId__: { value: entityId, enumerable: false, configurable: false },
      __domain__: { value: domain, enumerable: false, configurable: false },
    });
  }

  bindingCache.set(entityId, binding);
  return binding;
}
