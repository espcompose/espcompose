import { describe, it, expect } from 'vitest';
import { buildRuntimeConfig } from './reactive-config.js';

describe('buildRuntimeConfig', () => {
  it('throws when reactiveNodes contain uncompiled markers (no exprIR)', () => {
    const uncompiledNode = {
      kind: 'memo',
      exprType: 'float',
      dependencies: [{ sourceId: 'ha_light_office', triggerType: 'on_state', sourceDomain: 'binary_sensor' }],
      // No exprIR — this is the uncompiled marker
    };

    expect(() =>
      buildRuntimeConfig([uncompiledNode], [], []),
    ).toThrow('reactive expression(s) that were not compiled');
  });

  it('does not throw for effect nodes without exprIR', () => {
    // Effects don't require exprIR — they're side-effect nodes
    const effectNode = {
      kind: 'effect',
      dependencies: [{ sourceId: 'ha_sensor_temp', triggerType: 'on_value', sourceDomain: 'sensor' }],
    };

    expect(() =>
      buildRuntimeConfig([effectNode], [], []),
    ).not.toThrow();
  });

  it('does not throw for properly compiled nodes with exprIR', () => {
    const compiledNode = {
      kind: 'memo',
      exprType: 'bool',
      exprIR: { kind: 'entity_prop', entityId: 'light.office', property: 'isOn', type: 'bool' },
      dependencies: [
        { sourceId: 'ha_light_office', triggerType: 'on_state', sourceDomain: 'binary_sensor' },
      ],
    };

    const entities = [{ entityId: 'light.office', generatedId: 'ha_light_office', sensorType: 'binary_sensor' }];

    expect(() =>
      buildRuntimeConfig([compiledNode], [], entities),
    ).not.toThrow();
  });
});
