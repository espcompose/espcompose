// ────────────────────────────────────────────────────────────────────────────
// Reactive Injector
//
// Post-render pass that takes the collected reactive bindings and HA entity
// registrations from the reactive scope and merges them into the rendered
// YAML config object.
//
// Two responsibilities:
//
// 1. Inject HA sensor imports: for each registered HA entity, generate a
//    `binary_sensor`/`sensor`/`text_sensor` with `platform: homeassistant`
//    and merge it into the config's existing sections.
//
// 2. Inject reactive triggers: for each binding, generate an `on_state:`
//    or `on_value:` trigger on the source sensor that calls the appropriate
//    `lvgl.<widget>.update` action to push state into the target widget.
// ────────────────────────────────────────────────────────────────────────────

import type { ReactiveBinding, HAEntityRegistration } from '@esphome/compose';
import { getTriggerSignature, createLambdaScalar } from '@esphome/compose';
import { lvglWidgetUpdate } from '@esphome/compose';

/**
 * Inject reactive bindings and HA entity imports into the rendered config.
 *
 * @param config   - The rendered YAML config object (from `render()`).
 * @param bindings - Reactive bindings collected during the render pass.
 * @param entities - HA entity registrations collected during the render pass.
 * @returns A new config object with injected sensors and triggers.
 */
export function injectReactiveBindings(
  config: Record<string, unknown>,
  bindings: ReactiveBinding[],
  entities: HAEntityRegistration[],
): Record<string, unknown> {
  if (bindings.length === 0 && entities.length === 0) {
    return config;
  }

  const result = { ...config };

  // ── Step 1: Inject HA sensor imports ─────────────────────────────────────
  for (const entity of entities) {
    // Skip if the user already manually declared a sensor with the same entity_id
    if (hasSensorForEntity(result, entity)) continue;

    const sensorConfig = buildHASensorConfig(entity);
    appendToSection(result, entity.sensorType, sensorConfig);
  }

  // ── Step 2: Inject reactive triggers ─────────────────────────────────────
  //
  // Group bindings by their source (sourceId + triggerType).
  // For each source, generate an on_state/on_value trigger with all the
  // lvgl widget update actions for that source's bindings.
  const bindingsBySource = groupBindingsBySource(bindings);

  for (const [, sourceBindings] of bindingsBySource) {
    const { sourceId, triggerType, sourceDomain } = sourceBindings[0].expression;

    // Build the trigger actions — one lvgl.widget.update per binding
    const triggerActions: Record<string, unknown>[] = [];
    const sig = getTriggerSignature(sourceDomain, triggerType);

    for (const binding of sourceBindings) {
      const lambdaBody = binding.expression.toLambdaTrigger(sig);

      triggerActions.push(
        lvglWidgetUpdate(binding.targetType, binding.targetId, {
          [binding.targetProp]: createLambdaScalar(lambdaBody),
        }),
      );
    }

    // Find the sensor section containing the source component and inject
    // the trigger. The source could be in binary_sensor, sensor, or text_sensor.
    injectTriggerOnSource(result, sourceId, triggerType, triggerActions);
  }

  return result;
}

// ────────────────────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────────────────────

/**
 * Check if the config already has a sensor with the given entity_id.
 */
function hasSensorForEntity(
  config: Record<string, unknown>,
  entity: HAEntityRegistration,
): boolean {
  const section = config[entity.sensorType];
  if (!section) return false;

  const entries = Array.isArray(section) ? section : [section];
  for (const entry of entries) {
    if (entry && typeof entry === 'object' && !Array.isArray(entry)) {
      const obj = entry as Record<string, unknown>;
      if (obj.entity_id === entity.entityId) return true;
    }
  }
  return false;
}

/**
 * Build the ESPHome sensor config for a HA entity import.
 */
function buildHASensorConfig(entity: HAEntityRegistration): Record<string, unknown> {
  return {
    platform: 'homeassistant',
    id: entity.generatedId,
    entity_id: entity.entityId,
    ...(entity.sensorType === 'binary_sensor' ? { trigger_on_initial_state: true } : {}),
  };
}

/**
 * Append a config entry to a top-level section, handling array semantics.
 *
 * If the section doesn't exist, creates it as a single object.
 * If the section exists as a single object, wraps it in an array and appends.
 * If the section exists as an array, appends.
 */
function appendToSection(
  config: Record<string, unknown>,
  sectionKey: string,
  entry: Record<string, unknown>,
): void {
  const existing = config[sectionKey];
  if (existing === undefined || existing === null) {
    config[sectionKey] = entry;
  } else if (Array.isArray(existing)) {
    existing.push(entry);
  } else {
    config[sectionKey] = [existing, entry];
  }
}

/**
 * Group reactive bindings by their source (sourceId + triggerType).
 */
function groupBindingsBySource(
  bindings: ReactiveBinding[],
): Map<string, ReactiveBinding[]> {
  const groups = new Map<string, ReactiveBinding[]>();
  for (const binding of bindings) {
    const key = `${binding.expression.sourceId}:${binding.expression.triggerType}`;
    let group = groups.get(key);
    if (!group) {
      group = [];
      groups.set(key, group);
    }
    group.push(binding);
  }
  return groups;
}

/**
 * Find a sensor/component in the config by its ID and inject a trigger.
 *
 * Searches through all top-level sections that contain array or object entries
 * with `id` fields. This covers both HA sensor imports (binary_sensor, sensor,
 * text_sensor) and local component refs (light, switch, fan, cover, etc.).
 */
function injectTriggerOnSource(
  config: Record<string, unknown>,
  sourceId: string,
  triggerType: string,
  actions: Record<string, unknown>[],
): void {
  for (const sectionKey of Object.keys(config)) {
    const section = config[sectionKey];
    if (!section || typeof section !== 'object') continue;

    const entries = Array.isArray(section) ? section : [section];
    for (const entry of entries) {
      if (entry && typeof entry === 'object' && !Array.isArray(entry)) {
        const obj = entry as Record<string, unknown>;
        if (obj.id === sourceId) {
          // Inject the trigger
          const existingTrigger = obj[triggerType];
          if (existingTrigger) {
            // Append to existing trigger actions
            if (Array.isArray(existingTrigger)) {
              existingTrigger.push(...actions);
            } else {
              obj[triggerType] = [existingTrigger, ...actions];
            }
          } else {
            obj[triggerType] = actions.length === 1 ? actions[0] : actions;
          }
          return;
        }
      }
    }
  }
}
