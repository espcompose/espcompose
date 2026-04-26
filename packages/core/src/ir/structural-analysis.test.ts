import { describe, it, expect } from 'vitest';
import { analyzeExprStructure, analyzeActionStructure } from './structural-analysis';
import type { IRExprNode } from './expr-types';
import type { IRActionNode } from './action-types';
import { irBinary, irConcat, irTernary } from './expr-builders.js';

// ── Expression Structural Analysis ───────────────────────────────────────────

describe('analyzeExprStructure', () => {
  it('returns identical for a single expression', () => {
    const expr: IRExprNode = { kind: 'literal', value: 42, type: 'int' };
    expect(analyzeExprStructure([expr])).toEqual({ kind: 'identical' });
  });

  it('returns identical for empty array', () => {
    expect(analyzeExprStructure([])).toEqual({ kind: 'identical' });
  });

  it('returns identical when all expressions are value-identical', () => {
    const a: IRExprNode = { kind: 'literal', value: 'hello', type: 'string' };
    const b: IRExprNode = { kind: 'literal', value: 'hello', type: 'string' };
    expect(analyzeExprStructure([a, b])).toEqual({ kind: 'identical' });
  });

  it('detects a literal hole when values differ', () => {
    const a: IRExprNode = { kind: 'literal', value: 'kitchen', type: 'string' };
    const b: IRExprNode = { kind: 'literal', value: 'bedroom', type: 'string' };
    const c: IRExprNode = { kind: 'literal', value: 'office', type: 'string' };
    const result = analyzeExprStructure([a, b, c]);
    expect(result.kind).toBe('optimizable');
    if (result.kind !== 'optimizable') return;
    expect(result.holes).toHaveLength(1);
    const hole = result.holes[0];
    expect(hole.holeKind).toBe('literal');
    if (hole.holeKind !== 'literal') return;
    expect(hole.values).toEqual(['kitchen', 'bedroom', 'office']);
    expect(result.template.kind).toBe('slot');
  });

  it('detects a signal_read hole when signal indices differ', () => {
    const a: IRExprNode = { kind: 'signal_read', signalIndex: 5 };
    const b: IRExprNode = { kind: 'signal_read', signalIndex: 8 };
    const c: IRExprNode = { kind: 'signal_read', signalIndex: 12 };
    const result = analyzeExprStructure([a, b, c]);
    expect(result.kind).toBe('optimizable');
    if (result.kind !== 'optimizable') return;
    expect(result.holes).toHaveLength(1);
    expect(result.holes[0].holeKind).toBe('signal_read');
    if (result.holes[0].holeKind !== 'signal_read') return;
    expect(result.holes[0].signalIndices).toEqual([5, 8, 12]);
  });

  it('detects identical signal_reads (no hole)', () => {
    const a: IRExprNode = { kind: 'signal_read', signalIndex: 5 };
    const b: IRExprNode = { kind: 'signal_read', signalIndex: 5 };
    expect(analyzeExprStructure([a, b])).toEqual({ kind: 'identical' });
  });

  it('returns divergent for different node kinds', () => {
    const a: IRExprNode = { kind: 'literal', value: 42, type: 'int' };
    const b: IRExprNode = { kind: 'signal_read', signalIndex: 0 };
    expect(analyzeExprStructure([a, b])).toEqual({ kind: 'divergent' });
  });

  it('handles nested structure with one literal hole', () => {
    // concat("Kitchen: ", signal_read(5)) vs concat("Bedroom: ", signal_read(5))
    const a: IRExprNode = irConcat([
      { kind: 'literal', value: 'Kitchen: ', type: 'string' },
      { kind: 'signal_read', signalIndex: 5 },
    ]);
    const b: IRExprNode = irConcat([
      { kind: 'literal', value: 'Bedroom: ', type: 'string' },
      { kind: 'signal_read', signalIndex: 5 },
    ]);
    const result = analyzeExprStructure([a, b]);
    expect(result.kind).toBe('optimizable');
    if (result.kind !== 'optimizable') return;
    expect(result.holes).toHaveLength(1);
    const hole = result.holes[0];
    expect(hole.holeKind).toBe('literal');
    if (hole.holeKind !== 'literal') return;
    expect(hole.values).toEqual(['Kitchen: ', 'Bedroom: ']);
    // Template should be concat(slot(0), signal_read(5))
    expect(result.template.kind).toBe('op');
  });

  it('handles mixed literal + signal_read holes', () => {
    // concat(literal("Kitchen"), ternary(signal_read(5), ...))
    // concat(literal("Bedroom"), ternary(signal_read(8), ...))
    const mkExpr = (label: string, sigIdx: number): IRExprNode => irConcat([
      { kind: 'literal', value: label, type: 'string' },
      irTernary(
        { kind: 'signal_read', signalIndex: sigIdx },
        { kind: 'literal', value: 'on', type: 'string' },
        { kind: 'literal', value: 'off', type: 'string' },
      ),
    ]);
    const result = analyzeExprStructure([
      mkExpr('Kitchen', 5),
      mkExpr('Bedroom', 8),
      mkExpr('Office', 12),
    ]);
    expect(result.kind).toBe('optimizable');
    if (result.kind !== 'optimizable') return;
    expect(result.holes).toHaveLength(2);
    // First hole: the literal label
    const literalHole = result.holes.find(h => h.holeKind === 'literal');
    expect(literalHole).toBeDefined();
    expect(literalHole!.values).toEqual(['Kitchen', 'Bedroom', 'Office']);
    // Second hole: the signal_read in the ternary test
    const signalHole = result.holes.find(h => h.holeKind === 'signal_read');
    expect(signalHole).toBeDefined();
    if (signalHole?.holeKind === 'signal_read') {
      expect(signalHole.signalIndices).toEqual([5, 8, 12]);
    }
  });

  it('returns divergent for different binary operators', () => {
    const a: IRExprNode = irBinary('+',
      { kind: 'literal', value: 1, type: 'int' },
      { kind: 'literal', value: 2, type: 'int' },
    );
    const b: IRExprNode = irBinary('-',
      { kind: 'literal', value: 1, type: 'int' },
      { kind: 'literal', value: 2, type: 'int' },
    );
    expect(analyzeExprStructure([a, b])).toEqual({ kind: 'divergent' });
  });

  it('returns divergent for different concat lengths', () => {
    const a: IRExprNode = irConcat([{ kind: 'literal', value: 'a', type: 'string' }]);
    const b: IRExprNode = irConcat([
      { kind: 'literal', value: 'a', type: 'string' },
      { kind: 'literal', value: 'b', type: 'string' },
    ]);
    expect(analyzeExprStructure([a, b])).toEqual({ kind: 'divergent' });
  });
});

// ── Action Structural Analysis ───────────────────────────────────────────────

describe('analyzeActionStructure', () => {
  it('returns identical for single-instance array', () => {
    const actions: IRActionNode[] = [{ kind: 'ha_service', action: 'light.toggle', data: { entity_id: { kind: 'literal', value: 'light.kitchen' } } }];
    expect(analyzeActionStructure([actions])).toEqual({ kind: 'identical' });
  });

  it('returns identical when all instances are the same', () => {
    const mk = (): IRActionNode[] => [{ kind: 'ha_service', action: 'light.toggle', data: { entity_id: { kind: 'literal', value: 'light.kitchen' } } }];
    expect(analyzeActionStructure([mk(), mk()])).toEqual({ kind: 'identical' });
  });

  it('detects optimizable ha_service with differing entity_id', () => {
    const mk = (entityId: string): IRActionNode[] => [
      { kind: 'ha_service', action: 'light.toggle', data: { entity_id: { kind: 'literal', value: entityId } } },
    ];
    const result = analyzeActionStructure([mk('light.kitchen'), mk('light.bedroom'), mk('light.office')]);
    expect(result.kind).toBe('optimizable');
    if (result.kind !== 'optimizable') return;
    expect(result.varyingParams).toHaveLength(1);
    expect(result.varyingParams[0].paramPath).toBe('data.entity_id');
    expect(result.varyingParams[0].values).toEqual(['light.kitchen', 'light.bedroom', 'light.office']);
  });

  it('returns divergent for different action kinds', () => {
    const a: IRActionNode[] = [{ kind: 'ha_service', action: 'light.toggle' }];
    const b: IRActionNode[] = [{ kind: 'logger', message: 'hello' }];
    expect(analyzeActionStructure([a, b])).toEqual({ kind: 'divergent' });
  });

  it('returns divergent for different action counts', () => {
    const a: IRActionNode[] = [{ kind: 'ha_service', action: 'light.toggle' }];
    const b: IRActionNode[] = [
      { kind: 'ha_service', action: 'light.toggle' },
      { kind: 'logger', message: 'hello' },
    ];
    expect(analyzeActionStructure([a, b])).toEqual({ kind: 'divergent' });
  });

  it('returns divergent for different ha_service actions', () => {
    const a: IRActionNode[] = [{ kind: 'ha_service', action: 'light.toggle' }];
    const b: IRActionNode[] = [{ kind: 'ha_service', action: 'light.turn_on' }];
    expect(analyzeActionStructure([a, b])).toEqual({ kind: 'divergent' });
  });

  it('handles ha_service with multiple varying params', () => {
    const mk = (entity: string, brightness: number): IRActionNode[] => [
      {
        kind: 'ha_service',
        action: 'light.turn_on',
        data: {
          entity_id: { kind: 'literal', value: entity },
          brightness: { kind: 'literal', value: brightness },
        },
      },
    ];
    const result = analyzeActionStructure([
      mk('light.kitchen', 200),
      mk('light.bedroom', 150),
    ]);
    expect(result.kind).toBe('optimizable');
    if (result.kind !== 'optimizable') return;
    expect(result.varyingParams).toHaveLength(2);
  });

  it('handles mix of identical and varying params', () => {
    const mk = (entityId: string): IRActionNode[] => [
      {
        kind: 'ha_service',
        action: 'light.turn_on',
        data: {
          entity_id: { kind: 'literal', value: entityId },
          transition: { kind: 'literal', value: 1 },
        },
      },
    ];
    const result = analyzeActionStructure([mk('light.kitchen'), mk('light.bedroom')]);
    expect(result.kind).toBe('optimizable');
    if (result.kind !== 'optimizable') return;
    expect(result.varyingParams).toHaveLength(1);
    expect(result.varyingParams[0].paramPath).toBe('data.entity_id');
  });

  it('detects optimizable bare string data params (runtime-resolved expressions)', () => {
    // After serializeWithExpressions, expression params are resolved to bare
    // primitives at bundle runtime (e.g. entity.__entityId__ → "light.bedroom").
    const mk = (entityId: string): IRActionNode[] => [
      { kind: 'ha_service', action: 'homeassistant.toggle', data: { entity_id: entityId } } as unknown as IRActionNode,
    ];
    const result = analyzeActionStructure([mk('light.bedroom'), mk('light.kitchen'), mk('light.office')]);
    expect(result.kind).toBe('optimizable');
    if (result.kind !== 'optimizable') return;
    expect(result.varyingParams).toHaveLength(1);
    expect(result.varyingParams[0].paramPath).toBe('data.entity_id');
    expect(result.varyingParams[0].values).toEqual(['light.bedroom', 'light.kitchen', 'light.office']);
    expect(result.varyingParams[0].type).toBe('string');
    // Template should contain normalised literal param
    const tmpl = result.templateActions[0] as { kind: string; data?: Record<string, unknown> };
    expect(tmpl.data?.entity_id).toEqual({ kind: 'literal', value: 'light.bedroom' });
  });

  it('returns identical for bare string data params when all the same', () => {
    const mk = (): IRActionNode[] => [
      { kind: 'ha_service', action: 'homeassistant.toggle', data: { entity_id: 'light.bedroom' } } as unknown as IRActionNode,
    ];
    expect(analyzeActionStructure([mk(), mk()])).toEqual({ kind: 'identical' });
  });
});
