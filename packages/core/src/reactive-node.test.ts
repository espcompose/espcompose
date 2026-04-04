import { describe, it, expect } from 'vitest';
import {
  ReactiveNode,
  isReactiveNode,
  startTracking,
  stopTracking,
  trackDependency,
  isTracking,
} from './reactive-node';

describe('ReactiveNode', () => {
  describe('construction', () => {
    it('creates a node with dependencies', () => {
      const node = new ReactiveNode({
        kind: 'memo',
        dependencies: [
          { sourceId: 'sensor_1', triggerType: 'on_value', sourceDomain: 'sensor' },
          { sourceId: 'sensor_2', triggerType: 'on_state', sourceDomain: 'binary_sensor' },
        ],
        exprType: 'float',
      });
      expect(node.kind).toBe('memo');
      expect(node.dependencies).toHaveLength(2);
      expect(node.__reactive_node__).toBe(true);
    });

    it('creates a single-source expression node', () => {
      const node = new ReactiveNode({
        kind: 'expression',
        dependencies: [{ sourceId: 'ha_light_x', triggerType: 'on_state', sourceDomain: 'binary_sensor' }],
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
      const node = new ReactiveNode({
        kind: 'expression',
        dependencies: [{ sourceId: 'x', triggerType: 'on_state', sourceDomain: 'sensor' }],
      });
      expect(node.isSingleSource).toBe(true);
    });

    it('isSingleSource = false for multiple dependencies', () => {
      const node = new ReactiveNode({
        kind: 'memo',
        dependencies: [
          { sourceId: 'a', triggerType: 'on_state', sourceDomain: 'sensor' },
          { sourceId: 'b', triggerType: 'on_state', sourceDomain: 'sensor' },
        ],
        exprType: 'float',
      });
      expect(node.isSingleSource).toBe(false);
    });
  });

  describe('valueOf() / get()', () => {
    it('returns true for bool type', () => {
      const node = new ReactiveNode({
        kind: 'expression',
        dependencies: [],
        exprType: 'bool',
      });
      expect(node.valueOf()).toBe(true);
      expect(node.get()).toBe(true);
    });

    it('returns NaN for float type', () => {
      const node = new ReactiveNode({
        kind: 'expression',
        dependencies: [],
        exprType: 'float',
      });
      expect(node.valueOf()).toBeNaN();
      expect(node.get()).toBeNaN();
    });

    it('returns empty string for string type', () => {
      const node = new ReactiveNode({
        kind: 'expression',
        dependencies: [],
        exprType: 'string',
      });
      expect(node.valueOf()).toBe('');
      expect(node.get()).toBe('');
    });

    it('returns 0 for unknown type', () => {
      const node = new ReactiveNode({
        kind: 'expression',
        dependencies: [],
      });
      expect(node.valueOf()).toBe(0);
    });
  });

  describe('isReactiveNode()', () => {
    it('returns true for ReactiveNode', () => {
      const node = new ReactiveNode({
        kind: 'expression',
        dependencies: [],
      });
      expect(isReactiveNode(node)).toBe(true);
    });

    it('returns false for other values', () => {
      expect(isReactiveNode(null)).toBe(false);
      expect(isReactiveNode({})).toBe(false);
      expect(isReactiveNode('string')).toBe(false);
    });
  });

  describe('dependency tracking', () => {
    it('tracks dependencies between start/stop', () => {
      startTracking();
      trackDependency({ sourceId: 'a', triggerType: 'on_state', sourceDomain: 'sensor' });
      trackDependency({ sourceId: 'b', triggerType: 'on_value', sourceDomain: 'sensor' });
      const deps = stopTracking();
      expect(deps).toHaveLength(2);
    });

    it('deduplicates by sourceId + triggerType', () => {
      startTracking();
      trackDependency({ sourceId: 'a', triggerType: 'on_state', sourceDomain: 'sensor' });
      trackDependency({ sourceId: 'a', triggerType: 'on_state', sourceDomain: 'sensor' });
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
      trackDependency({ sourceId: 'outer', triggerType: 'on_state', sourceDomain: 'sensor' });

      startTracking();
      trackDependency({ sourceId: 'inner', triggerType: 'on_state', sourceDomain: 'sensor' });
      const inner = stopTracking();

      const outer = stopTracking();

      expect(inner).toHaveLength(1);
      expect(inner[0].sourceId).toBe('inner');
      expect(outer).toHaveLength(1);
      expect(outer[0].sourceId).toBe('outer');
    });
  });
});
