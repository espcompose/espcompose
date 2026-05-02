import { describe, it, expect } from 'vitest';
import { lowerActionTree, type ActionLoweringContext } from './lowering';
import type { IRActionNode } from '@espcompose/core/internals';

function emptyCtx(): ActionLoweringContext {
  return {
    reactiveGlobalIds: new Set(),
    signalNames: new Map(),
  };
}

describe('compiled-expression param in ha_service', () => {
  it('routes a non-literal expression through variables + data_template', () => {
    const ctx = emptyCtx();
    ctx.signalNames.set(0, 'sig_popup_mux');
    const action: IRActionNode = {
      kind: 'action:ha_service',
      action: 'light.toggle',
      data: {
        entity_id: {
          kind: 'expr:table_lookup',
          index: { kind: 'expr:signal_read', signalIndex: 0 },
          table: 'tbl_popup_abc_entity_ids',
          elementType: 'string',
        },
      },
    };
    const result = lowerActionTree([action], ctx);
    expect(result).toHaveLength(1);
    const lowered = result[0] as Record<string, Record<string, unknown>>;
    const serviceConfig = lowered['homeassistant.action'];
    expect(serviceConfig).toBeDefined();
    // Should use data_template with a template variable
    expect(serviceConfig.data_template).toEqual({ entity_id: '{{ entity_id_expr }}' });
    // Should have variables with a lambda
    const vars = serviceConfig.variables as Record<string, { __lambda__: string }>;
    expect(vars.entity_id_expr).toBeDefined();
    expect(vars.entity_id_expr.__lambda__).toContain('tbl_popup_abc_entity_ids');
    expect(vars.entity_id_expr.__lambda__).toContain('sig_popup_mux.get()');
    // Should NOT have static data for entity_id
    expect(serviceConfig.data).toBeUndefined();
  });

  it('handles mix of literal + compiled-expression params', () => {
    const ctx = emptyCtx();
    ctx.signalNames.set(0, 'sig_popup_mux');
    const action: IRActionNode = {
      kind: 'action:ha_service',
      action: 'light.turn_on',
      data: {
        entity_id: {
          kind: 'expr:table_lookup',
          index: { kind: 'expr:signal_read', signalIndex: 0 },
          table: 'tbl_entity_ids',
          elementType: 'string',
        },
        transition: { kind: 'expr:literal', value: 1, type: 'int' },
      },
    };
    const result = lowerActionTree([action], ctx);
    const serviceConfig = (result[0] as Record<string, Record<string, unknown>>)['homeassistant.action'];
    // transition should be in static data
    expect(serviceConfig.data).toEqual({ transition: 1 });
    // entity_id should be in data_template
    expect(serviceConfig.data_template).toEqual({ entity_id: '{{ entity_id_expr }}' });
    // variables should have entity_id_expr
    const vars = serviceConfig.variables as Record<string, { __lambda__: string }>;
    expect(vars.entity_id_expr).toBeDefined();
  });
});
