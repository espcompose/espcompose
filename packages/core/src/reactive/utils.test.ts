import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { setCurrentHookPath, withReactiveScope } from '../hooks';
import { useReactive, useReactiveMap } from './utils';
import { IRReactiveNode, isIRReactiveNode } from './node';

describe('reactive-utils', () => {
  beforeEach(() => {
    setCurrentHookPath('test');
  });

  afterEach(() => {
    setCurrentHookPath(null);
  });

  describe('useReactive()', () => {
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

  describe('useReactiveMap()', () => {
    it('maps static values through fn', () => {
      const result = useReactiveMap('primary', (v) => `color_${v}`);
      expect(result).toBe('color_primary');
    });

    it('throws for reactive input without $compilerMetadata', () => {
      const node = new IRReactiveNode({
        kind: 'memo',
        dependencies: [{ kind: 'dependency', sourceType: 'ha_entity', sourceId: 'light.test' }],
        exprType: 'string',
      });
      node.exprIR = { kind: 'expr:literal', value: 'primary', type: 'string' };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(() => useReactiveMap(node as any, (v) => v)).toThrow(
        /useReactiveMap\(\) received a reactive \(Signal\) input/,
      );
    });

    it('expands reactive input with $compilerMetadata into derivedMemo', () => {
      withReactiveScope(() => {
        const inputNode = new IRReactiveNode({
          kind: 'memo',
          dependencies: [{ kind: 'dependency', sourceType: 'ha_entity', sourceId: 'light.test' }],
          exprType: 'string',
        });
        inputNode.exprIR = { kind: 'expr:entity_prop', entityId: 'light.test', propertyKey: 'isOn', type: 'bool' };

        // Simulate mapper fn that returns IRReactiveNodes (like themeLeaf does)
        const makeThemeNode = (path: string) => {
          const n = new IRReactiveNode({
            kind: 'expression',
            dependencies: [{ kind: 'dependency', sourceType: 'theme', sourceId: `__theme_ui__`, themePath: `colors_${path}_bg` }],
            exprType: 'color',
          });
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          n.exprIR = { kind: 'expr:theme_read', scope: 'ui', scopeId: 'ui', path: `colors_${path}_bg`, type: 'color' } as any;
          return n;
        };

        const result = useReactiveMap(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          inputNode as any,
          (v: string) => makeThemeNode(v),
          { unionMembers: ['primary', 'secondary'] } as never,
        );

        // Result should be a derivedMemo IRReactiveNode
        expect(isIRReactiveNode(result)).toBe(true);
        const resultNode = result as unknown as IRReactiveNode;
        expect(resultNode.kind).toBe('memo');
        expect(resultNode.exprType).toBe('color');

        // Should have dependencies from input + both theme branches
        expect(resultNode.dependencies.length).toBe(3);
        expect(resultNode.dependencies[0].sourceId).toBe('light.test');
        expect(resultNode.dependencies[1].themePath).toBe('colors_primary_bg');
        expect(resultNode.dependencies[2].themePath).toBe('colors_secondary_bg');

        // ExprIR should be a ternary
        expect(resultNode.exprIR).toBeDefined();
        expect(resultNode.exprIR!.kind).toBe('expr:op');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const op = resultNode.exprIR as any;
        expect(op.op.tag).toBe('ternary');
      });
    });

    it('handles mapper returning plain primitives', () => {
      withReactiveScope(() => {
        const inputNode = new IRReactiveNode({
          kind: 'memo',
          dependencies: [{ kind: 'dependency', sourceType: 'ha_entity', sourceId: 'light.test' }],
          exprType: 'string',
        });
        inputNode.exprIR = { kind: 'expr:literal', value: 'a', type: 'string' };

        const result = useReactiveMap(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          inputNode as any,
          (v: string) => v === 'a' ? 10 : 20,
          { unionMembers: ['a', 'b'] } as never,
        );

        expect(isIRReactiveNode(result)).toBe(true);
        const resultNode = result as unknown as IRReactiveNode;
        expect(resultNode.exprType).toBe('int');
      });
    });

    it('builds correct ternary chain for 3+ members', () => {
      withReactiveScope(() => {
        const inputNode = new IRReactiveNode({
          kind: 'memo',
          dependencies: [{ kind: 'dependency', sourceType: 'ha_entity', sourceId: 'light.test' }],
          exprType: 'string',
        });
        inputNode.exprIR = { kind: 'expr:literal', value: 'a', type: 'string' };

        const result = useReactiveMap(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          inputNode as any,
          (v: string) => `mapped_${v}`,
          { unionMembers: ['a', 'b', 'c'] } as never,
        );

        const resultNode = result as unknown as IRReactiveNode;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const ir = resultNode.exprIR as any;

        // Top level: ternary (a == 'a' ? 'mapped_a' : <nested>)
        expect(ir.op.tag).toBe('ternary');
        // Consequent: literal 'mapped_a'
        expect(ir.children[1].value).toBe('mapped_a');
        // Alternate: another ternary (a == 'b' ? 'mapped_b' : 'mapped_c')
        expect(ir.children[2].op.tag).toBe('ternary');
        expect(ir.children[2].children[1].value).toBe('mapped_b');
        // Final fallback: literal 'mapped_c'
        expect(ir.children[2].children[2].value).toBe('mapped_c');
      });
    });
  });
});
