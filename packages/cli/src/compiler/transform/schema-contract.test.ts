/**
 * Schema contract tests — Producer side.
 *
 * Validates that the CLI's AST transformers emit metadata matching the
 * defined Zod schemas. These tests guard the compiled library format
 * against accidental protocol drift.
 *
 * The tests work by:
 * 1. Calling the serialization functions indirectly (via the transform pipeline)
 *    or by reproducing their output format directly
 * 2. Extracting the JSON metadata from the emitted code strings
 * 3. Validating the extracted metadata against the Zod schemas
 */

import { describe, it, expect } from 'vitest';
import {
  DependencyInfoSchema,
  CompiledReactiveSchema,
  SlottedReactiveSchema,
  CompiledActionsMetaSchema,
  CompiledScriptMetaSchema,
  LibraryFormatHeaderSchema,
} from './schemas.js';
import { LIBRARY_FORMAT_VERSION } from './format-version.js';

// ── Helpers ────────────────────────────────────────────────────────────────

/**
 * Extract the metadata JSON object from a `_reactive.compiled({...})` string.
 * The serializer emits unquoted object keys, so we need to add quotes for JSON.parse.
 */
function extractCompiledMeta(code: string): unknown {
  const match = code.match(/_reactive\.compiled\((\{.+\})\)/s);
  if (!match) throw new Error(`No _reactive.compiled() found in: ${code}`);
  // The serializer emits JS object literal syntax (unquoted keys).
  // Convert to valid JSON by quoting bare keys.
  const jsObj = match[1];
  const json = jsObj.replace(/([{,])(\w+):/g, '$1"$2":');
  return JSON.parse(json);
}

/**
 * Extract the metadata object from a `_reactive.slotted({...}, ...)` string.
 */
function extractSlottedMeta(code: string): unknown {
  const match = code.match(/_reactive\.slotted\((\{.+?\}),/s);
  if (!match) throw new Error(`No _reactive.slotted() found in: ${code}`);
  const jsObj = match[1];
  const json = jsObj.replace(/([{,])(\w+):/g, '$1"$2":');
  return JSON.parse(json);
}

// ── Reproduce serialization output ─────────────────────────────────────────
// These mirror the private serializeCompiledCall / serializeSlottedCall
// functions. The tests validate that this exact format conforms to the schema.

function buildCompiledCallString(exprType: string, deps: Array<{
  sourceId: string; triggerType: string;
  sourceDomain: string; sourceType?: string;
}>, expr: unknown = { kind: 'literal', value: 0, type: 'float' }): string {
  const depsJson = deps.map(d => {
    const parts = [
      `sourceId:${JSON.stringify(d.sourceId)}`,
      `triggerType:${JSON.stringify(d.triggerType)}`,
      `sourceDomain:${JSON.stringify(d.sourceDomain)}`,
    ];
    if (d.sourceType) {
      parts.push(`sourceType:${JSON.stringify(d.sourceType)}`);
    }
    return `{${parts.join(',')}}`;
  });
  return `_reactive.compiled({type:${JSON.stringify(exprType)},deps:[${depsJson.join(',')}],expr:${JSON.stringify(expr)}})`;
}

function buildSlottedCallString(exprType: string, slotCount: number, expr: unknown = { kind: 'slot', slotIndex: 0 }): string {
  return `_reactive.slotted({type:${JSON.stringify(exprType)},slots:${slotCount},expr:${JSON.stringify(expr)}}, signal0) as any`;
}

// ── Tests ──────────────────────────────────────────────────────────────────

describe('Library Format Schema Contract (Producer)', () => {
  describe('CompiledReactive metadata', () => {
    it('single dependency matches schema', () => {
      const code = buildCompiledCallString(
        'string',
        [{
          sourceId: 'ha_light_office',
          triggerType: 'on_state',
          sourceDomain: 'binary_sensor',
        }],
        { kind: 'ternary', test: { kind: 'entity_prop', entityId: 'light.office', property: 'isOn', type: 'bool' }, consequent: { kind: 'literal', value: 'On', type: 'string' }, alternate: { kind: 'literal', value: 'Off', type: 'string' } },
      );

      const meta = extractCompiledMeta(code);
      const result = CompiledReactiveSchema.safeParse(meta);
      expect(result.success).toBe(true);
    });

    it('multiple dependencies with sourceType matches schema', () => {
      const code = buildCompiledCallString(
        'float',
        [
          { sourceId: 'ha_a', triggerType: 'on_value', sourceDomain: 'sensor', sourceType: 'ha_entity' },
          { sourceId: '__theme__', triggerType: '__theme__', sourceDomain: '__theme__', sourceType: 'theme' },
        ],
      );

      const meta = extractCompiledMeta(code);
      const result = CompiledReactiveSchema.safeParse(meta);
      expect(result.success).toBe(true);

      // Also validate individual deps
      if (result.success) {
        for (const dep of result.data.deps) {
          expect(DependencyInfoSchema.safeParse(dep).success).toBe(true);
        }
      }
    });

    it('zero dependencies matches schema', () => {
      const code = buildCompiledCallString('int', []);
      const meta = extractCompiledMeta(code);
      expect(CompiledReactiveSchema.safeParse(meta).success).toBe(true);
    });

    it('rejects metadata missing required fields', () => {
      const bad = { type: 'int' }; // missing deps and expr
      expect(CompiledReactiveSchema.safeParse(bad).success).toBe(false);
    });

    it('rejects dependency missing required fields', () => {
      const bad = {
        type: 'int',
        deps: [{ sourceId: 'id' }], // missing triggerType, sourceDomain
        expr: { kind: 'literal', value: 0, type: 'int' },
      };
      expect(CompiledReactiveSchema.safeParse(bad).success).toBe(false);
    });
  });

  describe('SlottedReactive metadata', () => {
    it('matches schema', () => {
      const code = buildSlottedCallString('float', 1);

      const meta = extractSlottedMeta(code);
      const result = SlottedReactiveSchema.safeParse(meta);
      expect(result.success).toBe(true);
    });

    it('rejects metadata missing slots', () => {
      const bad = { type: 'int', expr: { kind: 'literal', value: 0, type: 'int' } }; // missing slots
      expect(SlottedReactiveSchema.safeParse(bad).success).toBe(false);
    });
  });

  describe('CompiledActions metadata', () => {
    it('basic compiled actions match schema', () => {
      const meta = {
        __compiledActions: [
          { 'light.turn_on': { id: 'light_1' } },
          { delay: '500ms' },
        ],
      };
      expect(CompiledActionsMetaSchema.safeParse(meta).success).toBe(true);
    });

    it('compiled actions with refBindings match schema', () => {
      const meta = {
        __compiledActions: [{ 'light.toggle': { id: '__ref__switchRef' } }],
        __refBindings: { switchRef: 'r_abc123' },
      };
      expect(CompiledActionsMetaSchema.safeParse(meta).success).toBe(true);
    });

    it('compiled actions with haBindings match schema', () => {
      const meta = {
        __compiledActions: [{ 'homeassistant.service': { service: 'light.turn_on' } }],
        __haBindings: { entity: 'light.office' },
      };
      expect(CompiledActionsMetaSchema.safeParse(meta).success).toBe(true);
    });

    it('rejects metadata missing __compiledActions', () => {
      const bad = { __refBindings: {} };
      expect(CompiledActionsMetaSchema.safeParse(bad).success).toBe(false);
    });
  });

  describe('CompiledScript metadata', () => {
    it('basic compiled script matches schema', () => {
      const meta = {
        __compiledScript: {
          id: 'toggle_light',
          then: [{ 'light.toggle': { id: 'light_1' } }],
        },
      };
      expect(CompiledScriptMetaSchema.safeParse(meta).success).toBe(true);
    });

    it('compiled script with refBindings matches schema', () => {
      const meta = {
        __compiledScript: {
          id: 'my_script',
          then: [{ delay: '1s' }],
        },
        __refBindings: { myRef: 'r_xyz' },
      };
      expect(CompiledScriptMetaSchema.safeParse(meta).success).toBe(true);
    });

    it('rejects metadata missing __compiledScript', () => {
      const bad = { __refBindings: {} };
      expect(CompiledScriptMetaSchema.safeParse(bad).success).toBe(false);
    });

    it('rejects __compiledScript missing id', () => {
      const bad = {
        __compiledScript: { then: [] },
      };
      expect(CompiledScriptMetaSchema.safeParse(bad).success).toBe(false);
    });
  });

  describe('Library format version', () => {
    it('valid version matches schema', () => {
      const header = { __espcompose_format__: LIBRARY_FORMAT_VERSION };
      expect(LibraryFormatHeaderSchema.safeParse(header).success).toBe(true);
    });

    it('rejects non-integer version', () => {
      expect(LibraryFormatHeaderSchema.safeParse({ __espcompose_format__: 1.5 }).success).toBe(false);
    });

    it('rejects zero version', () => {
      expect(LibraryFormatHeaderSchema.safeParse({ __espcompose_format__: 0 }).success).toBe(false);
    });

    it('rejects string version', () => {
      expect(LibraryFormatHeaderSchema.safeParse({ __espcompose_format__: '1' }).success).toBe(false);
    });

    it('rejects missing version', () => {
      expect(LibraryFormatHeaderSchema.safeParse({}).success).toBe(false);
    });

    it('current LIBRARY_FORMAT_VERSION is a positive integer', () => {
      expect(Number.isInteger(LIBRARY_FORMAT_VERSION)).toBe(true);
      expect(LIBRARY_FORMAT_VERSION).toBeGreaterThan(0);
    });
  });
});
