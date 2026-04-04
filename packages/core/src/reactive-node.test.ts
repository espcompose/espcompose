import { describe, it, expect } from 'vitest';
import {
  IRReactiveNode,
  isIRReactiveNode,
  startTracking,
  stopTracking,
  trackDependency,
  isTracking,
} from './reactive-node';

describe('IRReactiveNode', () => {
  describe('construction', () => {
    it('creates a node with dependencies', () => {
      const node = new IRReactiveNode({
        kind: 'memo',
        dependencies: [
          { kind: 'dependency', sourceId: 'sensor_1', triggerType: 'on_value', sourceDomain: 'sensor' },
          { kind: 'dependency', sourceId: 'sensor_2', triggerType: 'on_state', sourceDomain: 'binary_sensor' },
        ],
        exprType: 'float',
      });
      expect(node.kind).toBe('memo');
      expect(node.dependencies).toHaveLength(2);
      expect(node.__reactive_node__).toBe(true);
    });

    it('creates a single-source expression node', () => {
      const node = new IRReactiveNode({
        kind: 'expression',
        dependencies: [{ kind: 'dependency', sourceId: 'ha_light_x', triggerType: 'on_state', sourceDomain: 'binary_sensor' }],
        exprType: 'bool',
        sourceId: 'ha_light_x',
        property: '.state',
        triggerType: 'on_state',
        sourceDomain: 'binary_sensor',
      });
      expect(node.kind).toBe('expression');
      expect(node.sourceId).toBe('ha_light_x');
      expect(node.property).toBe('.state');
      expect(node.exprType).toBe('bool');
    });

    it('isSingleSource = true for one dependency', () => {
      const node = new IRReactiveNode({
        kind: 'expression',
        dependencies: [{ kind: 'dependency', sourceId: 'x', triggerType: 'on_state', sourceDomain: 'sensor' }],
      });
      expect(node.isSingleSource).toBe(true);
    });

    it('isSingleSource = false for multiple dependencies', () => {
      const node = new IRReactiveNode({
        kind: 'memo',
        dependencies: [
          { kind: 'dependency', sourceId: 'a', triggerType: 'on_state', sourceDomain: 'sensor' },
          { kind: 'dependency', sourceId: 'b', triggerType: 'on_state', sourceDomain: 'sensor' },
        ],
        exprType: 'float',
      });
      expect(node.isSingleSource).toBe(false);
    });
  });

  describe('valueOf() / get()', () => {
    it('returns true for bool type', () => {
      const node = new IRReactiveNode({
        kind: 'expression',
        dependencies: [],
        exprType: 'bool',
      });
      expect(node.valueOf()).toBe(true);
      expect(node.get()).toBe(true);
    });

    it('returns NaN for float type', () => {
      const node = new IRReactiveNode({
        kind: 'expression',
        dependencies: [],
        exprType: 'float',
      });
      expect(node.valueOf()).toBeNaN();
      expect(node.get()).toBeNaN();
    });

    it('returns empty string for string type', () => {
      const node = new IRReactiveNode({
        kind: 'expression',
        dependencies: [],
        exprType: 'string',
      });
      expect(node.valueOf()).toBe('');
      expect(node.get()).toBe('');
    });

    it('returns 0 for unknown type', () => {
      const node = new IRReactiveNode({
        kind: 'expression',
        dependencies: [],
      });
      expect(node.valueOf()).toBe(0);
    });
  });

  describe('isIRReactiveNode()', () => {
    it('returns true for IRReactiveNode', () => {
      const node = new IRReactiveNode({
        kind: 'expression',
        dependencies: [],
      });
      expect(isIRReactiveNode(node)).toBe(true);
    });

    it('returns false for other values', () => {
      expect(isIRReactiveNode(null)).toBe(false);
      expect(isIRReactiveNode({})).toBe(false);
      expect(isIRReactiveNode('string')).toBe(false);
    });
  });

  describe('dependency tracking', () => {
    it('tracks dependencies between start/stop', () => {
      startTracking();
      trackDependency({ kind: 'dependency', sourceId: 'a', triggerType: 'on_state', sourceDomain: 'sensor' });
      trackDependency({ kind: 'dependency', sourceId: 'b', triggerType: 'on_value', sourceDomain: 'sensor' });
      const deps = stopTracking();
      expect(deps).toHaveLength(2);
    });

    it('deduplicates by sourceId + triggerType', () => {
      startTracking();
      trackDependency({ kind: 'dependency', sourceId: 'a', triggerType: 'on_state', sourceDomain: 'sensor' });
      trackDependency({ kind: 'dependency', sourceId: 'a', triggerType: 'on_state', sourceDomain: 'sensor' });
      const deps = stopTracking();
      expect(deps).toHaveLength(1);
    });

    it('isTracking() reflects state', () => {
      expect(isTracking()).toBe(false);
      startTracking();
      expect(isTracking()).toBe(true);
      stopTracking();
      expect(isTracking()).toBe(false);
    });

    it('supports nested tracking', () => {
      startTracking();
      trackDependency({ kind: 'dependency', sourceId: 'outer', triggerType: 'on_state', sourceDomain: 'sensor' });

      startTracking();
      trackDependency({ kind: 'dependency', sourceId: 'inner', triggerType: 'on_state', sourceDomain: 'sensor' });
      const inner = stopTracking();

      const outer = stopTracking();

      expect(inner).toHaveLength(1);
      expect(inner[0].sourceId).toBe('inner');
      expect(outer).toHaveLength(1);
      expect(outer[0].sourceId).toBe('outer');
    });
  });
});
