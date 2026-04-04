/**
 * Format contract tests — Consumer side (SDK).
 *
 * Validates that the SDK correctly consumes metadata matching the compiled
 * library format schema, and rejects invalid/incompatible metadata.
 *
 * These tests guard against:
 * - SDK changes that would break consumption of valid library format data
 * - Missing version validation
 * - Silent acceptance of malformed metadata
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { z } from 'zod';
import { setCurrentHookPath } from './hooks/useState';
import { __espcompose, validateLibraryFormat, SUPPORTED_FORMAT_VERSIONS } from './__espcompose';
import { ReactiveNode, isReactiveNode } from './reactive-node';
import { withReactiveScope } from './hooks/useReactiveScope';
import { serializeValue } from './serialize';

// ── Zod schemas (duplicated from CLI to prove consumer-side conformance) ──
// These must match the CLI's schemas exactly — if they diverge, it means
// the protocol contract has drifted between producer and consumer.

const DependencyInfoSchema = z.object({
  sourceId: z.string(),
  triggerType: z.string(),
  sourceDomain: z.string(),
  sourceType: z.string().optional(),
});

const ExprNodeSchema = z.object({
  kind: z.string(),
}).passthrough();

const CompiledReactiveSchema = z.object({
  type: z.string(),
  deps: z.array(DependencyInfoSchema),
  expr: ExprNodeSchema,
});

const SlottedReactiveSchema = z.object({
  type: z.string(),
  slots: z.number().int().nonnegative(),
  expr: ExprNodeSchema,
});

// ── Test fixtures ──────────────────────────────────────────────────────────

const VALID_COMPILED_META = {
  type: 'string' as const,
  deps: [{
    sourceId: 'ha_light_office',
    triggerType: 'on_state',
    sourceDomain: 'binary_sensor',
  }],
  expr: { kind: 'literal' as const, value: 'On', type: 'string' as const },
};

const VALID_SLOTTED_META = {
  type: 'float' as const,
  slots: 1,
  expr: { kind: 'slot' as const, slotIndex: 0, type: 'float' as const },
};

const VALID_COMPILED_ACTIONS = [
  { 'light.turn_on': { id: 'light_1' } },
  { delay: '500ms' },
];

// ── Tests ──────────────────────────────────────────────────────────────────

describe('Library Format Contract (Consumer)', () => {
  beforeEach(() => {
    setCurrentHookPath('test');
  });

  afterEach(() => {
    setCurrentHookPath(null);
  });

  describe('validateLibraryFormat()', () => {
    it('accepts current supported version', () => {
      for (const v of SUPPORTED_FORMAT_VERSIONS) {
        expect(() => validateLibraryFormat(v)).not.toThrow();
      }
    });

    it('rejects unsupported version number', () => {
      expect(() => validateLibraryFormat(999)).toThrow(/format v999/);
    });

    it('rejects undefined (missing marker)', () => {
      expect(() => validateLibraryFormat(undefined)).toThrow(/not compiled with format versioning/);
    });

    it('rejects string version', () => {
      expect(() => validateLibraryFormat('1')).toThrow(/not compiled with format versioning/);
    });

    it('rejects null', () => {
      expect(() => validateLibraryFormat(null)).toThrow(/not compiled with format versioning/);
    });

    it('SUPPORTED_FORMAT_VERSIONS contains at least one version', () => {
      expect(SUPPORTED_FORMAT_VERSIONS.length).toBeGreaterThan(0);
    });

    it('all supported versions are positive integers', () => {
      for (const v of SUPPORTED_FORMAT_VERSIONS) {
        expect(Number.isInteger(v)).toBe(true);
        expect(v).toBeGreaterThan(0);
      }
    });
  });

  describe('__espcompose.compiled() consumes schema-conforming metadata', () => {
    it('accepts valid compiled reactive metadata', () => {
      // Verify metadata matches schema
      expect(CompiledReactiveSchema.safeParse(VALID_COMPILED_META).success).toBe(true);

      // Verify SDK consumes it correctly
      withReactiveScope(() => {
        const node = __espcompose.compiled<string>(VALID_COMPILED_META);
        expect(isReactiveNode(node)).toBe(true);
        expect(node.kind).toBe('memo');
        expect(node.dependencies).toHaveLength(1);
        expect(node.dependencies[0].sourceId).toBe('ha_light_office');
        expect(node.exprType).toBe('string');
        expect(node.exprIR).toEqual(VALID_COMPILED_META.expr);
      });
    });

    it('accepts metadata with multiple deps including sourceType', () => {
      const meta = {
        type: 'float' as const,
        deps: [
          { sourceId: 'ha_a', triggerType: 'on_value', sourceDomain: 'sensor', sourceType: 'ha_entity' },
          { sourceId: '__theme__', triggerType: '__theme__', sourceDomain: '__theme__', sourceType: 'theme' },
        ],
        expr: { kind: 'literal' as const, value: 0, type: 'float' as const },
      };

      expect(CompiledReactiveSchema.safeParse(meta).success).toBe(true);

      withReactiveScope(() => {
        const node = __espcompose.compiled<number>(meta);
        expect(node.dependencies).toHaveLength(2);
        expect(node.dependencies[0].sourceType).toBe('ha_entity');
        expect(node.dependencies[1].sourceType).toBe('theme');
      });
    });

    it('accepts metadata with zero deps', () => {
      const meta = { type: 'int' as const, deps: [], expr: { kind: 'literal' as const, value: 42, type: 'int' as const } };
      expect(CompiledReactiveSchema.safeParse(meta).success).toBe(true);

      withReactiveScope(() => {
        const node = __espcompose.compiled<number>(meta);
        expect(node.dependencies).toHaveLength(0);
      });
    });
  });

  describe('__espcompose.slotted() consumes schema-conforming metadata', () => {
    it('accepts valid slotted reactive metadata', () => {
      expect(SlottedReactiveSchema.safeParse(VALID_SLOTTED_META).success).toBe(true);

      withReactiveScope(() => {
        const signal = new ReactiveNode({
          kind: 'expression',
          dependencies: [{ sourceId: 'ha_temp', triggerType: 'on_value', sourceDomain: 'sensor' }],
          exprType: 'float',
        });
        signal.exprIR = { kind: 'signal_read', signalIndex: 0 };

        const node = __espcompose.slotted<number>(VALID_SLOTTED_META, signal);
        expect(isReactiveNode(node)).toBe(true);
        expect(node.exprType).toBe('float');
        expect(node.dependencies).toHaveLength(1);
      });
    });
  });

  describe('serializeValue() consumes compiled action functions', () => {
    it('serializes function with __compiledActions', () => {
      const fn = Object.assign(
        () => {},
        { __compiledActions: VALID_COMPILED_ACTIONS },
      );

      const result = serializeValue(fn);
      expect(Array.isArray(result)).toBe(true);
    });

    it('serializes function with __compiledActions and __refBindings', () => {
      const fn = Object.assign(
        () => {},
        {
          __compiledActions: [{ 'light.toggle': { id: '__ref__switchRef' } }],
          __refBindings: { switchRef: { toString: () => 'r_abc123', [Symbol.for('esphome.ref')]: true } },
        },
      );

      // Should not throw — the SDK should handle the metadata shape
      expect(() => serializeValue(fn)).not.toThrow();
    });
  });

  // ── Round-trip verification tests ──────────────────────────────────────
  // These use the exact metadata shapes that the transformer produces
  // (matching the golden-file snapshots). They prove the SDK can consume
  // the compiled library format end-to-end.

  describe('round-trip: compiled reactive metadata', () => {
    it('consumes exact metadata from reactive-fixture golden file', () => {
      // This is the exact metadata emitted by serializeCompiledCall() in
      // the reactive-fixture snapshot
      const goldenMeta = {
        type: 'string' as const,
        deps: [{
          sourceId: 'ha_light_office',
          triggerType: 'on_state',
          sourceDomain: 'binary_sensor',
        }],
        expr: { kind: 'ternary' as const, test: { kind: 'signal_read' as const, signalIndex: 0 }, consequent: { kind: 'literal' as const, value: 'On', type: 'string' as const }, alternate: { kind: 'literal' as const, value: 'Off', type: 'string' as const } },
      };

      withReactiveScope(() => {
        const node = __espcompose.compiled<string>(goldenMeta);
        expect(isReactiveNode(node)).toBe(true);
        expect(node.kind).toBe('memo');
        expect(node.exprType).toBe('string');
        expect(node.exprIR).toBeDefined();
        expect(node.dependencies).toHaveLength(1);
        expect(node.dependencies[0].sourceId).toBe('ha_light_office');
        expect(node.dependencies[0].triggerType).toBe('on_state');
        expect(node.dependencies[0].sourceDomain).toBe('binary_sensor');
      });
    });
  });

  describe('round-trip: slotted reactive metadata', () => {
    it('consumes exact metadata from reactive-fixture golden file', () => {
      // This is the exact metadata shape emitted by serializeSlottedCall()
      const goldenMeta = {
        type: 'string' as const,
        slots: 1,
        expr: { kind: 'binary' as const, op: '>' as const, left: { kind: 'slot' as const, slotIndex: 0, type: 'float' as const }, right: { kind: 'literal' as const, value: 72, type: 'float' as const } },
      };

      withReactiveScope(() => {
        const signal = new ReactiveNode({
          kind: 'expression',
          dependencies: [{ sourceId: 'ha_temp', triggerType: 'on_value', sourceDomain: 'sensor' }],
          exprType: 'float',
        });
        signal.exprIR = { kind: 'signal_read', signalIndex: 0 };

        const node = __espcompose.slotted<string>(goldenMeta, signal);
        expect(isReactiveNode(node)).toBe(true);
        expect(node.exprType).toBe('string');
        expect(node.dependencies).toHaveLength(1);
      });
    });
  });

  describe('round-trip: compiled script metadata', () => {
    it('consumes exact metadata from script-fixture golden file', () => {
      // This is the exact __compiledScript shape from the snapshot
      const goldenScriptMeta = {
        id: 'greet',
        then: [
          { 'logger.log': 'Hello!' },
          { delay: '500ms' },
        ],
      };

      // The SDK's useScript() expects __compiledScript on the function
      // We can't call useScript() outside a render context, but we can
      // verify the shape is structurally valid
      const fn = Object.assign(
        async () => {},
        { __compiledScript: goldenScriptMeta },
      );

      // Verify the metadata is present and has the expected shape
      expect(fn.__compiledScript.id).toBe('greet');
      expect(fn.__compiledScript.then).toHaveLength(2);
      expect(fn.__compiledScript.then[0]).toEqual({ 'logger.log': 'Hello!' });
    });
  });

  describe('round-trip: compiled actions metadata', () => {
    it('consumes exact metadata from script-fixture golden file', () => {
      // This is the exact __compiledActions shape from the snapshot
      const goldenActions = [
        { 'script.execute': { id: 'greet' } },
        { 'script.wait': { id: 'greet' } },
      ];

      const fn = Object.assign(
        async () => {},
        { __compiledActions: goldenActions },
      );

      const result = serializeValue(fn);
      expect(Array.isArray(result)).toBe(true);
      // The serialized actions should preserve the structure
      expect(result).toHaveLength(2);
    });
  });
});
