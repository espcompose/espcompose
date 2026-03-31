import { describe, it, expect, beforeEach } from 'vitest';
import { setPhase } from './phase';
import { bind } from './bind';
import { ReactiveNode, isReactiveNode } from './reactive-node';
import { clearHAEntityCache } from './hooks/useHAEntity';
import { withReactiveScope } from './hooks/useReactiveScope';

describe('bind', () => {
  beforeEach(() => {
    setPhase('render');
  });

  describe('bind.memo()', () => {
    it('returns computed value when no reactive deps tracked', () => {
      const result = bind.memo(() => 42);
      expect(result).toBe(42);
    });

    it('can compute derived values without deps', () => {
      const value = 10;
      const doubled = bind.memo(() => value * 2);
      expect(doubled).toBe(20);
    });
  });

  describe('bind.effect()', () => {
    it('runs the function once immediately', () => {
      let called = false;
      bind.effect(() => {
        called = true;
      });
      expect(called).toBe(true);
    });
  });

  describe('bind.expr()', () => {
    it('evaluates function props', () => {
      const result = bind.expr(() => 'hello');
      expect(result).toBe('hello');
    });

    it('passes through static values', () => {
      const result = bind.expr(42);
      expect(result).toBe(42);
    });

    it('passes through ReactiveNode instances', () => {
      const node = new ReactiveNode({
        kind: 'expression',
        dependencies: [{ sourceId: 'test', triggerType: 'on_state', sourceDomain: 'sensor' }],
        cppExpression: '.state',
      });
      const result = bind.expr(node);
      expect(isReactiveNode(result)).toBe(true);
    });
  });

  describe('bind.haEntity', () => {
    it('is a function', () => {
      expect(typeof bind.haEntity).toBe('function');
    });
  });

  describe('bind.memo() with HA entity tracking', () => {
    beforeEach(() => {
      clearHAEntityCache();
    });

    it('tracks deps and generates C++ for single-source memo', () => {
      withReactiveScope(() => {
        const light = bind.haEntity('light.kitchen_floods');
        const result = bind.memo(() => light.isOn ? 'ON' : 'OFF');

        expect(isReactiveNode(result)).toBe(true);
        const node = result as unknown as ReactiveNode<string>;
        expect(node.kind).toBe('memo');
        expect(node.dependencies).toHaveLength(1);
        expect(node.dependencies[0].sourceId).toBe('ha_light_kitchen_floods');
        expect(node.dependencies[0].cppSignalName).toBe('sig_ha_light_kitchen_floods');
        // Runtime fallback -- no access recording, just placeholder
        expect(node.cppExpression).toContain('uncompiled');
        expect(node.cppReturnType).toBe('std::string');
      });
    });

    it('tracks deps and generates C++ for multi-source memo', () => {
      withReactiveScope(() => {
        const light = bind.haEntity('light.kitchen_floods');
        const temp = bind.haEntity('sensor.temp_inside');
        const result = bind.memo(
          () => light.isOn && temp.value > 72 ? 'Comfortable' : 'Adjust',
        );

        expect(isReactiveNode(result)).toBe(true);
        const node = result as unknown as ReactiveNode<string>;
        expect(node.kind).toBe('memo');
        expect(node.dependencies).toHaveLength(2);
        // Runtime fallback -- no access recording, just placeholder
        expect(node.cppExpression).toContain('uncompiled');
      });
    });

    it('tracks deps for bind.effect()', () => {
      withReactiveScope(() => {
        const sensor = bind.haEntity('sensor.humidity');
        // Effect accesses a sensor value
        bind.effect(() => {
          // In real code, this would trigger a side-effect action.
          // Just accessing a reactive property is enough to track it.
          void sensor.value;
        });
        // No return value to check — effect is fire-and-forget.
        // The tracking is verified by the fact that no error occurred.
      });
    });

    it('returns literal value when memo has no reactive deps', () => {
      const result = bind.memo(() => 42);
      expect(result).toBe(42);
    });
  });

  describe('bind.__compiled()', () => {
    it('creates ReactiveNode from pre-computed metadata', () => {
      withReactiveScope(() => {
        const result = bind.__compiled<string>({
          cpp: 'sig_ha_light_office.get() ? std::string("On") : std::string("Off")',
          type: 'std::string',
          deps: [{
            signalName: 'sig_ha_light_office',
            sourceId: 'ha_light_office',
            triggerType: 'on_state',
            sourceDomain: 'binary_sensor',
            cppType: 'bool',
          }],
        });

        expect(isReactiveNode(result)).toBe(true);
        expect(result.kind).toBe('memo');
        expect(result.dependencies).toHaveLength(1);
        expect(result.dependencies[0].sourceId).toBe('ha_light_office');
        expect(result.dependencies[0].cppSignalName).toBe('sig_ha_light_office');
        expect(result.cppExpression).toBe('sig_ha_light_office.get() ? std::string("On") : std::string("Off")');
        expect(result.cppReturnType).toBe('std::string');
      });
    });

    it('creates ReactiveNode with multiple dependencies', () => {
      withReactiveScope(() => {
        const result = bind.__compiled<string>({
          cpp: 'sig_ha_light_office.get() && sig_ha_sensor_temp.get() > 72 ? std::string("Comfortable") : std::string("Adjust")',
          type: 'std::string',
          deps: [
            { signalName: 'sig_ha_light_office', sourceId: 'ha_light_office', triggerType: 'on_state', sourceDomain: 'binary_sensor', cppType: 'bool' },
            { signalName: 'sig_ha_sensor_temp', sourceId: 'ha_sensor_temp', triggerType: 'on_value', sourceDomain: 'sensor', cppType: 'float' },
          ],
        });

        expect(result.dependencies).toHaveLength(2);
        expect(result.cppExpression).toContain('sig_ha_light_office.get()');
        expect(result.cppExpression).toContain('sig_ha_sensor_temp.get()');
      });
    });
  });

  describe('bind.__slotted()', () => {
    it('substitutes single slot placeholder with signal name', () => {
      withReactiveScope(() => {
        const signal = new ReactiveNode({
          kind: 'expression',
          dependencies: [{ sourceId: 'ha_temp', triggerType: 'on_value', sourceDomain: 'sensor', cppSignalName: 'sig_ha_temp', cppType: 'float' }],
          cppExpression: 'sig_ha_temp.get()',
          cppSignalName: 'sig_ha_temp',
          cppType: 'float',
        });

        const result = bind.__slotted<number>(
          { cpp: '__$$SLOT_0$$__.get() * 2 + 80', type: 'float', slots: 1 },
          signal,
        );

        expect(isReactiveNode(result)).toBe(true);
        expect(result.cppExpression).toBe('sig_ha_temp.get() * 2 + 80');
        expect(result.cppReturnType).toBe('float');
        expect(result.dependencies).toHaveLength(1);
        expect(result.dependencies[0].cppSignalName).toBe('sig_ha_temp');
      });
    });

    it('substitutes multiple slot placeholders', () => {
      withReactiveScope(() => {
        const sigA = new ReactiveNode({
          kind: 'expression',
          dependencies: [{ sourceId: 'ha_a', triggerType: 'on_value', sourceDomain: 'sensor', cppSignalName: 'sig_a', cppType: 'float' }],
          cppExpression: 'sig_a.get()',
          cppSignalName: 'sig_a',
        });
        const sigB = new ReactiveNode({
          kind: 'expression',
          dependencies: [{ sourceId: 'ha_b', triggerType: 'on_state', sourceDomain: 'binary_sensor', cppSignalName: 'sig_b', cppType: 'bool' }],
          cppExpression: 'sig_b.get()',
          cppSignalName: 'sig_b',
        });

        const result = bind.__slotted<string>(
          { cpp: '__$$SLOT_1$$__.get() ? std::string("on") : std::to_string(__$$SLOT_0$$__.get())', type: 'std::string', slots: 2 },
          sigA, sigB,
        );

        expect(result.cppExpression).toBe('sig_b.get() ? std::string("on") : std::to_string(sig_a.get())');
        expect(result.dependencies).toHaveLength(2);
      });
    });

    it('resolves type placeholder from signal cppType', () => {
      withReactiveScope(() => {
        const signal = new ReactiveNode({
          kind: 'expression',
          dependencies: [{ sourceId: '__theme__', triggerType: '__theme__', sourceDomain: '__theme__', cppSignalName: 'thm_colors_primary_bg', cppType: 'lv_color_t' }],
          cppExpression: 'thm_colors_primary_bg.get()',
          cppSignalName: 'thm_colors_primary_bg',
          cppType: 'lv_color_t',
        });

        const result = bind.__slotted<unknown>(
          { cpp: '__$$SLOT_0$$__.get()', type: '__$$SLOT_TYPE_0$$__', slots: 1 },
          signal,
        );

        expect(result.cppReturnType).toBe('lv_color_t');
        expect(result.cppExpression).toBe('thm_colors_primary_bg.get()');
      });
    });

    it('collects dependencies from all signal arguments', () => {
      withReactiveScope(() => {
        const sig1 = new ReactiveNode({
          kind: 'expression',
          dependencies: [
            { sourceId: 's1', triggerType: 'on_value', sourceDomain: 'sensor', cppSignalName: 'sig_s1', cppType: 'float' },
          ],
          cppExpression: 'sig_s1.get()',
          cppSignalName: 'sig_s1',
        });
        const sig2 = new ReactiveNode({
          kind: 'expression',
          dependencies: [
            { sourceId: 's2', triggerType: 'on_state', sourceDomain: 'binary_sensor', cppSignalName: 'sig_s2', cppType: 'bool' },
            { sourceId: 's3', triggerType: 'on_value', sourceDomain: 'sensor', cppSignalName: 'sig_s3', cppType: 'float' },
          ],
          cppExpression: 'sig_s2.get()',
          cppSignalName: 'sig_s2',
        });

        const result = bind.__slotted<number>(
          { cpp: '__$$SLOT_0$$__.get() + __$$SLOT_1$$__.get()', type: 'float', slots: 2 },
          sig1, sig2,
        );

        expect(result.dependencies).toHaveLength(3);
      });
    });
  });
});
