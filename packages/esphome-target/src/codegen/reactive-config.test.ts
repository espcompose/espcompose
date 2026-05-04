import { describe, it, expect } from 'vitest';
import { buildRuntimeConfig } from './reactive-config.js';

describe('buildRuntimeConfig', () => {
  it('does not throw for effect nodes without exprIR', () => {
    // Effects don't require exprIR — they're side-effect nodes
    const effectNode = {
      kind: 'effect',
      dependencies: [{ sourceId: 'ha_sensor_temp', sourceDomain: 'sensor', sourceType: 'ha_entity' }],
    };

    expect(() =>
      buildRuntimeConfig([effectNode], [], []),
    ).not.toThrow();
  });

  it('does not throw for properly compiled nodes with exprIR', () => {
    const compiledNode = {
      kind: 'memo',
      exprType: 'bool',
      exprIR: { kind: 'expr:entity_prop', entityId: 'light.office', propertyKey: 'isOn', type: 'bool' },
      dependencies: [
        { sourceId: 'ha_light_office', sourceDomain: 'binary_sensor', sourceType: 'ha_entity' },
      ],
    };

    const entities = [{ entityId: 'light.office', targetId: 'ha_light_office', platform: 'binary_sensor' }];

    expect(() =>
      buildRuntimeConfig([compiledNode], [], entities),
    ).not.toThrow();
  });
});
