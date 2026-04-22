import ts from 'typescript';
import type { IRActionNode, IRActionParam } from '@espcompose/core/internals';
import { irHAServiceAction, camelToSnake, ENTITY_DOMAINS } from '@espcompose/core/internals';
import { hasBindingBrand, hasRefBrand } from '../../type-brands.js';
import type { ActionCompilerContext } from '../context.js';
import { emitError } from '../context.js';
import type { HAEntityInfo } from '../../expr-compiler.js';
import { compileActionConfigValue } from '../params.js';

// ────────────────────────────────────────────────────────────────────────────
// HA entity action compilation
// ────────────────────────────────────────────────────────────────────────────

export function compileHAAction(
  call: ts.CallExpression,
  entity: HAEntityInfo,
  methodName: string,
  ctx: ActionCompilerContext,
): IRActionNode[] | null {
  const snakeMethod = camelToSnake(methodName);

  // entity_id: static literal for known entities, runtime expression for dynamic
  const data: Record<string, IRActionParam> = {};

  let action: string;
  if (entity.isDynamic && entity.entityIdExpr) {
    // Dynamic entity: resolve entity_id at runtime from the binding's __entityId__ property.
    // Use domain-agnostic homeassistant.* actions so toggle/turn_on/turn_off work
    // regardless of the actual entity domain (light, switch, fan, etc.).
    const varName = ts.isPropertyAccessExpression(call.expression) && ts.isIdentifier(call.expression.expression)
      ? call.expression.expression.text
      : entity.entityIdExpr;
    data.entity_id = { kind: 'expression', jsExpression: `${varName}.__entityId__` };
    const GENERIC_METHODS = new Set(['toggle', 'turn_on', 'turn_off']);
    action = GENERIC_METHODS.has(snakeMethod)
      ? `homeassistant.${snakeMethod}`
      : `${entity.domain}.${snakeMethod}`;
  } else {
    // Static entity: use domain-specific action (e.g. light.toggle)
    action = `${entity.domain}.${snakeMethod}`;
    data.entity_id = { kind: 'literal', value: entity.entityId };
  }

  // Extract additional data from optional object argument
  if (call.arguments.length > 0) {
    const arg = call.arguments[0];
    if (ts.isObjectLiteralExpression(arg)) {
      for (const prop of arg.properties) {
        if (ts.isPropertyAssignment(prop) && ts.isIdentifier(prop.name)) {
          const paramValue = compileActionConfigValue(prop.initializer, ctx);
          if (paramValue === null) return null;
          // HA service data is a flat key→param map; reject nested config dicts
          // (those only apply to native ESPHome actions like lvgl.widget.update).
          if (typeof paramValue === 'object' && paramValue !== null && paramValue.kind === 'config_dict') {
            return emitError(prop.initializer, ctx,
              'Nested object parameters are not supported for Home Assistant service calls.');
          }
          data[camelToSnake(prop.name.text)] =
            typeof paramValue === 'object' && paramValue !== null
              ? paramValue as IRActionParam
              : { kind: 'literal', value: paramValue };
        }
      }
    }
  }

  return [irHAServiceAction(action, data)];
}

// ────────────────────────────────────────────────────────────────────────────
// HA entity domain inference
// ────────────────────────────────────────────────────────────────────────────

/**
 * Infer HA entity domain from the TypeScript type structure.
 *
 * Distinguishes between binding types by checking for domain-specific methods
 * and properties:
 *   - LightBinding: has 'brightness' property → 'light'
 *   - SwitchBinding: has 'toggle' + 'isOn', no 'brightness'/'isOpen' → 'switch'
 *   - FanBinding: identical shape to SwitchBinding, so we also check for 'isOpen'
 *   - CoverBinding: has 'isOpen' property → 'cover'
 *   - SensorBinding: has 'value' property, no action methods → 'sensor'
 *   - BinarySensorBinding: has 'isOn' property, no action methods → 'binary_sensor'
 */
export function inferHAEntityDomainFromType(type: ts.Type): string | undefined {
  if (!hasBindingBrand(type)) return undefined;
  // Exclude refs — they also have BINDING_BRAND but use REF_BRAND
  if (hasRefBrand(type)) return undefined;

  const propNames = new Set(type.getProperties().map(p => p.name));

  // Score each domain by how many of its declared properties + actions match.
  // The domain with the most unique matches wins. Ties use 'homeassistant'
  // — the generic HA domain — since the actual domain is resolved at runtime
  // from the entity's __entityId__ stamp.
  let bestDomain: string | undefined;
  let bestScore = 0;
  let tied = false;

  for (const [domain, desc] of Object.entries(ENTITY_DOMAINS)) {
    const candidates = [
      ...desc.properties.map(p => p.name),
      ...desc.actions.map(a => a.name),
    ];
    const score = candidates.filter(n => propNames.has(n)).length;
    if (score > bestScore) {
      bestScore = score;
      bestDomain = domain;
      tied = false;
    } else if (score === bestScore && score > 0) {
      tied = true;
    }
  }

  return tied ? 'homeassistant' : bestDomain;
}
