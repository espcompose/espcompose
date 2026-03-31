import { describe, it, expect } from 'vitest';
import { buildRuntimeConfig } from './reactive-config.js';

describe('buildRuntimeConfig', () => {
  it('throws when reactiveNodes contain uncompiled markers', () => {
    const uncompiledNode = {
      kind: 'memo',
      cppExpression: '0 /* uncompiled – AST compiler should have handled this */',
      cppReturnType: 'float',
      dependencies: [{ cppSignalName: 'sig_ha_light_office', sourceDomain: 'light' }],
    };

    expect(() =>
      buildRuntimeConfig([uncompiledNode], [], []),
    ).toThrow('reactive expression(s) that were not compiled');
  });

  it('throws for uncompiled effect nodes', () => {
    const uncompiledEffect = {
      kind: 'effect',
      cppExpression: '0 /* uncompiled – AST compiler should have handled this */',
      dependencies: [{ cppSignalName: 'sig_ha_sensor_temp' }],
    };

    expect(() =>
      buildRuntimeConfig([uncompiledEffect], [], []),
    ).toThrow('transform-lib');
  });

  it('does not throw for properly compiled nodes', () => {
    const compiledNode = {
      kind: 'memo',
      cppExpression: 'sig_ha_light_office.get() ? true : false',
      cppReturnType: 'bool',
      dependencies: [
        { cppSignalName: 'sig_ha_light_office', sourceId: 'light.office', triggerType: 'ha_entity', sourceDomain: 'light', cppType: 'bool', sourceType: 'ha_entity' },
      ],
    };

    expect(() =>
      buildRuntimeConfig([compiledNode], [], []),
    ).not.toThrow();
  });
});
