// ────────────────────────────────────────────────────────────────────────────
// useHAEntity() — Home Assistant entity binding hook
//
// Creates a typed binding object for a HA entity. The binding provides:
//   - Expression<T> properties for reactive state reads
//   - Action methods (compile-time no-ops) for entity control
//
// The hook registers the HA entity in the reactive scope so the compiler
// can auto-generate the `platform: homeassistant` sensor import and
// reactive trigger wiring in the final YAML.
//
// Entity deduplication: multiple calls with the same entity_id in the
// same render pass return a cached binding and register only once.
// ────────────────────────────────────────────────────────────────────────────

import { Expression } from '../expression';
import { registerHAEntity } from './useReactiveScope';
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
// Expression factory helpers
// ────────────────────────────────────────────────────────────────────────────

function makeBinaryExpression(sourceId: string, sourceDomain: string): Expression<boolean> {
  return new Expression<boolean>({
    sourceId,
    property: '.state',
    triggerType: 'on_state',
    sourceDomain,
  });
}

function makeNumericExpression(
  sourceId: string,
  sourceDomain: string,
  property = '.state',
  triggerType = 'on_value',
): Expression<number> {
  return new Expression<number>({
    sourceId,
    property,
    triggerType,
    sourceDomain,
  });
}

function makeTextExpression(
  sourceId: string,
  sourceDomain: string,
  triggerType = 'on_value',
): Expression<string> {
  return new Expression<string>({
    sourceId,
    property: '.state',
    triggerType,
    sourceDomain,
    cppReturnType: 'std::string',
  });
}

// ────────────────────────────────────────────────────────────────────────────
// Domain-specific binding factories
// ────────────────────────────────────────────────────────────────────────────

function createLightBinding(sourceId: string, entityId: string): LightBinding {
  // A HA light entity is imported as a single binary_sensor.
  // All Expressions must target that binary_sensor with on_state trigger.
  const binding: LightBinding = {
    isOn: makeBinaryExpression(sourceId, 'binary_sensor'),
    brightness: makeNumericExpression(sourceId, 'binary_sensor', '.state', 'on_state'),
    stateText: makeTextExpression(sourceId, 'binary_sensor', 'on_state'),

    toggle() { /* no-op */ },
    turnOn() { /* no-op */ },
    turnOff() { /* no-op */ },
  };

  return createActionProxy(binding, entityId, 'light');
}

function createSensorBinding(sourceId: string): SensorBinding {
  // A HA sensor entity is imported as a single sensor.
  // All Expressions must target that sensor with on_value trigger.
  return {
    value: makeNumericExpression(sourceId, 'sensor'),
    stateText: makeTextExpression(sourceId, 'sensor', 'on_value'),
  };
}

function createBinarySensorBinding(sourceId: string): BinarySensorBinding {
  // A HA binary_sensor entity is imported as a single binary_sensor.
  return {
    isOn: makeBinaryExpression(sourceId, 'binary_sensor'),
    stateText: makeTextExpression(sourceId, 'binary_sensor', 'on_state'),
  };
}

function createSwitchBinding(sourceId: string, entityId: string): SwitchBinding {
  const binding: SwitchBinding = {
    isOn: makeBinaryExpression(sourceId, 'binary_sensor'),
    toggle() { /* no-op */ },
    turnOn() { /* no-op */ },
    turnOff() { /* no-op */ },
  };

  return createActionProxy(binding, entityId, 'switch');
}

function createFanBinding(sourceId: string, entityId: string): FanBinding {
  const binding: FanBinding = {
    isOn: makeBinaryExpression(sourceId, 'binary_sensor'),
    toggle() { /* no-op */ },
    turnOn() { /* no-op */ },
    turnOff() { /* no-op */ },
  };

  return createActionProxy(binding, entityId, 'fan');
}

function createCoverBinding(sourceId: string, entityId: string): CoverBinding {
  const binding: CoverBinding = {
    isOpen: makeBinaryExpression(sourceId, 'binary_sensor'),
    open() { /* no-op */ },
    close() { /* no-op */ },
    stop() { /* no-op */ },
  };

  return createActionProxy(binding, entityId, 'cover');
}

/**
 * Wraps a binding in a Proxy that intercepts action method calls.
 * The proxy stores metadata on the function objects so the compiler
 * transformer can identify them and emit the correct YAML actions.
 *
 * At runtime these are no-ops. The compiler replaces them at build time.
 */
function createActionProxy<T extends object>(binding: T, entityId: string, domain: string): T {
  return new Proxy(binding, {
    get(target, prop, receiver) {
      const val = Reflect.get(target, prop, receiver);
      if (typeof val === 'function') {
        // Attach metadata for the compiler's action converter.
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const marker = function actionMarker(..._args: unknown[]): void {
          // No-op at runtime. The compiler transformer rewrites these calls.
        };
        Object.defineProperty(marker, '__haEntityId', { value: entityId });
        Object.defineProperty(marker, '__haDomain', { value: domain });
        Object.defineProperty(marker, '__haMethodName', { value: prop });
        return marker;
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
export function useHAEntity(entityId: string): unknown;

export function useHAEntity(entityId: string): unknown {
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
