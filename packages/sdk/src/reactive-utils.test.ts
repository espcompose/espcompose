import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { setCurrentHookPath } from './hooks/useState';
import { resolveBindProp } from './reactive-utils';
import { ReactiveNode, isReactiveNode } from './reactive-node';

describe('reactive-utils', () => {
  beforeEach(() => {
    setCurrentHookPath('test');
  });

  afterEach(() => {
    setCurrentHookPath(null);
  });

  describe('resolveBindProp()', () => {
    it('evaluates function props', () => {
      const result = resolveBindProp(() => 'hello');
      expect(result).toBe('hello');
    });

    it('passes through static values', () => {
      const result = resolveBindProp(42);
      expect(result).toBe(42);
    });

    it('passes through ReactiveNode instances', () => {
      const node = new ReactiveNode({
        kind: 'expression',
        dependencies: [{ sourceId: 'test', triggerType: 'on_state', sourceDomain: 'sensor' }],
      });
      const result = resolveBindProp(node);
      expect(isReactiveNode(result)).toBe(true);
    });
  });
});
