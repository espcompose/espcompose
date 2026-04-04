import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { setCurrentHookPath } from './hooks/useState';
import { __espcompose } from './__espcompose';
import { ReactiveNode, isReactiveNode } from './reactive-node';
import { withReactiveScope } from './hooks/useReactiveScope';

describe('__espcompose', () => {
  beforeEach(() => {
    setCurrentHookPath('test');
  });

  afterEach(() => {
    setCurrentHookPath(null);
  });

  describe('__espcompose.compiled()', () => {
    it('creates ReactiveNode from pre-computed metadata', () => {
      withReactiveScope(() => {
        const result = __espcompose.compiled<string>({
          type: 'string',
          deps: [{
            sourceId: 'ha_light_office',
            triggerType: 'on_state',
            sourceDomain: 'binary_sensor',
          }],
          expr: { kind: 'literal', value: 'On', type: 'string' },
        });

        expect(isReactiveNode(result)).toBe(true);
        expect(result.kind).toBe('memo');
        expect(result.dependencies).toHaveLength(1);
        expect(result.dependencies[0].sourceId).toBe('ha_light_office');
        expect(result.exprType).toBe('string');
        expect(result.exprIR).toEqual({ kind: 'literal', value: 'On', type: 'string' });
      });
    });

    it('creates ReactiveNode with multiple dependencies', () => {
      withReactiveScope(() => {
        const result = __espcompose.compiled<string>({
          type: 'string',
          deps: [
            { sourceId: 'ha_light_office', triggerType: 'on_state', sourceDomain: 'binary_sensor' },
            { sourceId: 'ha_sensor_temp', triggerType: 'on_value', sourceDomain: 'sensor' },
          ],
          expr: { kind: 'literal', value: 'Comfortable', type: 'string' },
        });

        expect(result.dependencies).toHaveLength(2);
        expect(result.exprIR).toBeDefined();
      });
    });
  });

  describe('__espcompose.slotted()', () => {
    it('resolves slots from signal arguments', () => {
      withReactiveScope(() => {
        const signal = new ReactiveNode({
          kind: 'expression',
          dependencies: [{ sourceId: 'ha_temp', triggerType: 'on_value', sourceDomain: 'sensor' }],
          exprType: 'float',
        });
        signal.exprIR = { kind: 'signal_read', signalIndex: 0 };

        const result = __espcompose.slotted<number>(
          { type: 'float', slots: 1, expr: { kind: 'slot', slotIndex: 0 } },
          signal,
        );

        expect(isReactiveNode(result)).toBe(true);
        expect(result.exprType).toBe('float');
        expect(result.dependencies).toHaveLength(1);
      });
    });

    it('resolves multiple slot placeholders', () => {
      withReactiveScope(() => {
        const sigA = new ReactiveNode({
          kind: 'expression',
          dependencies: [{ sourceId: 'ha_a', triggerType: 'on_value', sourceDomain: 'sensor' }],
          exprType: 'float',
        });
        sigA.exprIR = { kind: 'signal_read', signalIndex: 0 };

        const sigB = new ReactiveNode({
          kind: 'expression',
          dependencies: [{ sourceId: 'ha_b', triggerType: 'on_state', sourceDomain: 'binary_sensor' }],
          exprType: 'bool',
        });
        sigB.exprIR = { kind: 'signal_read', signalIndex: 1 };

        const result = __espcompose.slotted<string>(
          {
            type: 'string',
            slots: 2,
            expr: { kind: 'ternary', test: { kind: 'slot', slotIndex: 1 }, consequent: { kind: 'literal', value: 'on', type: 'string' }, alternate: { kind: 'literal', value: 'off', type: 'string' } },
          },
          sigA, sigB,
        );

        expect(result.dependencies).toHaveLength(2);
      });
    });

    it('collects dependencies from all signal arguments', () => {
      withReactiveScope(() => {
        const sig1 = new ReactiveNode({
          kind: 'expression',
          dependencies: [
            { sourceId: 's1', triggerType: 'on_value', sourceDomain: 'sensor' },
          ],
          exprType: 'float',
        });
        sig1.exprIR = { kind: 'signal_read', signalIndex: 0 };

        const sig2 = new ReactiveNode({
          kind: 'expression',
          dependencies: [
            { sourceId: 's2', triggerType: 'on_state', sourceDomain: 'binary_sensor' },
            { sourceId: 's3', triggerType: 'on_value', sourceDomain: 'sensor' },
          ],
          exprType: 'bool',
        });
        sig2.exprIR = { kind: 'signal_read', signalIndex: 1 };

        const result = __espcompose.slotted<number>(
          { type: 'float', slots: 2, expr: { kind: 'binary', op: '+', left: { kind: 'slot', slotIndex: 0 }, right: { kind: 'slot', slotIndex: 1 } } },
          sig1, sig2,
        );

        expect(result.dependencies).toHaveLength(3);
      });
    });
  });

  describe('__espcompose.derivedMemo()', () => {
    it('creates derived memo with explicit expression IR', () => {
      withReactiveScope(() => {
        const result = __espcompose.derivedMemo<string>({
          exprType: 'font_ptr',
          dependencies: [
            { sourceId: '__theme__', triggerType: '__theme__', sourceDomain: '__theme__', sourceType: 'theme' },
          ],
          exprIR: { kind: 'literal', value: 'montserrat_28', type: 'string' },
        });

        expect(isReactiveNode(result)).toBe(true);
        expect(result.kind).toBe('memo');
        expect(result.exprType).toBe('font_ptr');
        expect(result.exprIR).toEqual({ kind: 'literal', value: 'montserrat_28', type: 'string' });
      });
    });
  });
});
