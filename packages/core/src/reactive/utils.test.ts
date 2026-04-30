import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { setCurrentHookPath } from '../hooks';
import { useReactive } from './utils';
import { IRReactiveNode, isIRReactiveNode } from './node';

describe('reactive-utils', () => {
  beforeEach(() => {
    setCurrentHookPath('test');
  });

  afterEach(() => {
    setCurrentHookPath(null);
  });

  describe('useReactive()', () => {
    it('evaluates function props', () => {
      const result = useReactive(() => 'hello');
      expect(result).toBe('hello');
    });

    it('passes through static values', () => {
      const result = useReactive(42);
      expect(result).toBe(42);
    });

    it('passes through IRReactiveNode instances', () => {
      const node = new IRReactiveNode({
        kind: 'expression',
        dependencies: [{ kind: 'dependency', sourceType: 'ha_entity', sourceId: 'test', sourceDomain: 'sensor' }],
      });
      const result = useReactive(node);
      expect(isIRReactiveNode(result)).toBe(true);
    });
  });
});
