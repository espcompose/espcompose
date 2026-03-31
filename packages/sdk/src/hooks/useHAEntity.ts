// ────────────────────────────────────────────────────────────────────────────
// importHAEntity() — Home Assistant entity import
//
// Creates a typed binding object for a HA entity. The binding provides:
//   - ReactiveNode<T> properties for reactive state reads
//   - Action methods (compile-time no-ops) for entity control
//
// Registers the HA entity in the reactive scope so the compiler
// can auto-generate the `platform: homeassistant` sensor import and
// reactive trigger wiring in the final YAML.
//
// Entity deduplication: multiple calls with the same entity_id in the
// same render pass return a cached binding and register only once.
// ────────────────────────────────────────────────────────────────────────────

import { ReactiveNode, isReactiveNode } from '../reactive-node';
import type { Signal } from '../reactive-node';
import { registerHAEntity } from './useReactiveScope';
import { isTracking, trackDependency } from '../reactive-node';
import type {
  LightBinding,
  SensorBinding,
  BinarySensorBinding,
  SwitchBinding,
  FanBinding,
  CoverBinding,
} from '../ha-bindings';

// ────────────────────────────────────────────────────────────────────────────
// Domain → sensor type mapping
// ────────────────────────────────────────────────────────────────────────────

/**
 * Determines the ESPHome sensor platform type to use for importing a HA entity.
 */
function sensorTypeForDomain(domain: string): 'binary_sensor' | 'sensor' | 'text_sensor' {
  switch (domain) {
    case 'light':
    case 'switch':
    case 'binary_sensor':
    case 'fan':
    case 'lock':
    case 'cover':
      return 'binary_sensor';
    case 'sensor':
    case 'number':
      return 'sensor';
    case 'text_sensor':
    case 'select':
      return 'text_sensor';
    default:
      return 'binary_sensor';
  }
}

/**
 * Generate a deterministic ESPHome component ID from an entity ID.
 *
 * `light.kitchen_floods` → `ha_light_kitchen_floods`
 */
function generateSensorId(entityId: string): string {
  return `ha_${entityId.replace('.', '_')}`;
}

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
 * Wrap a binding object in a Proxy that intercepts reads of ReactiveNode-valued
 * properties. When dependency tracking is active (inside bind.memo/effect),
 * the proxy calls trackDependency() and recordAccess() so the dependency
 * graph and C++ codegen substitution table are populated automatically.
 */
function createTrackingProxy<T extends object>(binding: T): T {
  return new Proxy(binding, {
    get(target, prop, receiver) {
      const val = Reflect.get(target, prop, receiver);

      // Only intercept ReactiveNode-valued properties when tracking
      if (isReactiveNode(val) && typeof prop === 'string' && isTracking()) {
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
// ReactiveNode factory
// ────────────────────────────────────────────────────────────────────────────

function makeExpressionNode<T>(
  sourceId: string,
  sourceDomain: string,
  cppType: string,
  triggerType = 'on_state',
  property = '.state',
): Signal<T> {
  return new ReactiveNode<T>({
    kind: 'expression',
    dependencies: [{
      sourceId,
      triggerType,
      sourceDomain,
      cppSignalName: `sig_${sourceId}`,
      cppType,
    }],
    cppExpression: property,
    ...(cppType === 'std::string' ? { cppReturnType: 'std::string' } : {}),
    sourceId,
    property,
    triggerType,
    sourceDomain,
    cppSignalName: `sig_${sourceId}`,
    cppType,
  }) as unknown as Signal<T>;
}

// ────────────────────────────────────────────────────────────────────────────
// Domain-specific binding factories
// ────────────────────────────────────────────────────────────────────────────

function createLightBinding(sourceId: string, entityId: string): LightBinding {
  const brightnessId = `${sourceId}_brightness`;

  // Register a separate sensor import for the brightness attribute
  registerHAEntity({
    entityId,
    domain: 'light',
    sensorType: 'sensor',
    generatedId: brightnessId,
    attribute: 'brightness',
  });

  const binding: LightBinding = {
    isOn: makeExpressionNode<boolean>(sourceId, 'binary_sensor', 'bool'),
    brightness: makeExpressionNode<number>(brightnessId, 'sensor', 'float', 'on_value'),
    stateText: makeExpressionNode<string>(sourceId, 'binary_sensor', 'std::string', 'on_state'),

    toggle() { /* no-op */ },
    turnOn() { /* no-op */ },
    turnOff() { /* no-op */ },
  };

  return createTrackingProxy(createActionProxy(binding, entityId, 'light'));
}

function createSensorBinding(sourceId: string): SensorBinding {
  return createTrackingProxy({
    value: makeExpressionNode<number>(sourceId, 'sensor', 'float', 'on_value'),
    stateText: makeExpressionNode<string>(sourceId, 'sensor', 'std::string', 'on_value'),
  });
}

function createBinarySensorBinding(sourceId: string): BinarySensorBinding {
  return createTrackingProxy({
    isOn: makeExpressionNode<boolean>(sourceId, 'binary_sensor', 'bool'),
    stateText: makeExpressionNode<string>(sourceId, 'binary_sensor', 'std::string', 'on_state'),
  });
}

function createSwitchBinding(sourceId: string, entityId: string): SwitchBinding {
  const binding: SwitchBinding = {
    isOn: makeExpressionNode<boolean>(sourceId, 'binary_sensor', 'bool'),
    toggle() { /* no-op */ },
    turnOn() { /* no-op */ },
    turnOff() { /* no-op */ },
  };

  return createTrackingProxy(createActionProxy(binding, entityId, 'switch'));
}

function createFanBinding(sourceId: string, entityId: string): FanBinding {
  const binding: FanBinding = {
    isOn: makeExpressionNode<boolean>(sourceId, 'binary_sensor', 'bool'),
    toggle() { /* no-op */ },
    turnOn() { /* no-op */ },
    turnOff() { /* no-op */ },
  };

  return createTrackingProxy(createActionProxy(binding, entityId, 'fan'));
}

function createCoverBinding(sourceId: string, entityId: string): CoverBinding {
  const binding: CoverBinding = {
    isOpen: makeExpressionNode<boolean>(sourceId, 'binary_sensor', 'bool'),
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
        return function actionMethod() {};
      }
      return val;
    },
  });
}

// ────────────────────────────────────────────────────────────────────────────
// Public API — importHAEntity() with domain-typed overloads
// ────────────────────────────────────────────────────────────────────────────

export function importHAEntity(entityId: `light.${string}`): LightBinding;
export function importHAEntity(entityId: `sensor.${string}`): SensorBinding;
export function importHAEntity(entityId: `binary_sensor.${string}`): BinarySensorBinding;
export function importHAEntity(entityId: `switch.${string}`): SwitchBinding;
export function importHAEntity(entityId: `fan.${string}`): FanBinding;
export function importHAEntity(entityId: `cover.${string}`): CoverBinding;
export function importHAEntity(entityId: string): unknown;

export function importHAEntity(entityId: string): unknown {
  // Deduplication: return cached binding if already created.
  const cached = bindingCache.get(entityId);
  if (cached) return cached;

  const domain = extractDomain(entityId);
  const sensorType = sensorTypeForDomain(domain);
  const generatedId = generateSensorId(entityId);

  // Register the entity for auto-import in the YAML output.
  registerHAEntity({
    entityId,
    domain,
    sensorType,
    generatedId,
  });

  // Create the domain-specific binding.
  let binding: unknown;

  switch (domain) {
    case 'light':
      binding = createLightBinding(generatedId, entityId);
      break;
    case 'sensor':
    case 'number':
      binding = createSensorBinding(generatedId);
      break;
    case 'binary_sensor':
      binding = createBinarySensorBinding(generatedId);
      break;
    case 'switch':
      binding = createSwitchBinding(generatedId, entityId);
      break;
    case 'fan':
      binding = createFanBinding(generatedId, entityId);
      break;
    case 'cover':
      binding = createCoverBinding(generatedId, entityId);
      break;
    default:
      // Fallback: treat as binary sensor binding.
      binding = createBinarySensorBinding(generatedId);
      break;
  }

  bindingCache.set(entityId, binding);
  return binding;
}
