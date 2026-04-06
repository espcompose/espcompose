import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { setCurrentHookPath } from './hooks/useState';
import { useReactive } from './reactive-utils';
import { IRReactiveNode, isIRReactiveNode } from './reactive-node';

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
        dependencies: [{ kind: 'dependency', sourceId: 'test', triggerType: 'on_state', sourceDomain: 'sensor' }],
      });
      const result = useReactive(node);
      expect(isIRReactiveNode(result)).toBe(true);
    });
  });
});
