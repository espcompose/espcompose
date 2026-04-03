import { describe, it, expect } from 'vitest';
import { serializeIR, writeIRDebugFiles } from './ir-debug';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import type { SemanticIR, ReactiveBinding } from '@esphome/compose/internals';
import { ReactiveNode } from '@esphome/compose';

function makeMinimalIR(overrides?: {
  esphome?: Partial<SemanticIR['esphome']>;
  espcompose?: Partial<SemanticIR['espcompose']>;
}): SemanticIR {
  return {
    esphome: {
      sections: [],
      haEntities: [],
      components: [],
      scripts: [],
      ...overrides?.esphome,
    },
    espcompose: {
      reactive: { bindings: [], memos: [], effects: [] },
      ...overrides?.espcompose,
    },
  };
}

describe('serializeIR', () => {
  it('handles an empty IR', () => {
    const ir = makeMinimalIR();
    const result = serializeIR(ir);
    const esphome = result.esphome as Record<string, unknown>;
    const espcompose = result.espcompose as { reactive: Record<string, unknown[]>; themes?: unknown };
    expect(esphome.sections).toEqual([]);
    expect(espcompose.reactive.bindings).toEqual([]);
    expect(espcompose.reactive.memos).toEqual([]);
    expect(espcompose.reactive.effects).toEqual([]);
    expect(espcompose.themes).toBeUndefined();

    // Should be JSON-stringifiable without error
    expect(() => JSON.stringify(result)).not.toThrow();
  });

  it('preserves scalar, object, array, and null IR nodes in sections', () => {
    const ir = makeMinimalIR({
      esphome: {
        sections: [
          {
            key: 'esphome',
            value: {
              kind: 'object',
              entries: [
                { key: 'name', value: { kind: 'scalar', value: 'my-device' } },
                { key: 'items', value: { kind: 'array', items: [{ kind: 'scalar', value: 42 }, { kind: 'null' }] } },
              ],
            },
          },
        ],
      },
    });
    const result = serializeIR(ir);
    const esphome = result.esphome as Record<string, unknown>;
    expect((esphome.sections as unknown[]).length).toBe(1);
    const section = (esphome.sections as Array<{ key: string; value: unknown }>)[0];
    expect(section.key).toBe('esphome');
    expect(JSON.stringify(result)).toContain('"my-device"');
    expect(JSON.stringify(result)).toContain('42');
  });

  it('serializes ReactiveNode fields correctly', () => {
    const node = new ReactiveNode({
      kind: 'memo',
      dependencies: [{ sourceId: 'ha_light', triggerType: 'on_state', sourceDomain: 'binary_sensor' }],
      exprType: 'string',
    });

    const ir = makeMinimalIR({ espcompose: { reactive: { bindings: [], memos: [node], effects: [] } } });
    const result = serializeIR(ir);
    const espcompose = result.espcompose as { reactive: { memos: Record<string, unknown>[] } };
    const serializedNode = espcompose.reactive.memos[0];

    expect(serializedNode.kind).toBe('memo');
    expect(serializedNode.dependencies).toEqual(node.dependencies);
    expect(serializedNode.exprType).toBe('string');
    // Class brand field should be stripped (it's an own enumerable property)
    expect(Object.prototype.hasOwnProperty.call(serializedNode, '__reactive_node__')).toBe(false);

    expect(() => JSON.stringify(result)).not.toThrow();
  });

  it('sanitizes ReactiveNode in bindings', () => {
    const node = new ReactiveNode({
      kind: 'expression',
      dependencies: [],
      exprType: 'bool',
    });

    const binding: ReactiveBinding = {
      targetId: 'lbl_1',
      targetType: 'lvgl_label',
      targetProp: 'text',
      expression: node,
    };

    const ir = makeMinimalIR({
      espcompose: { reactive: { bindings: [binding], memos: [node], effects: [] } },
    });
    const result = serializeIR(ir);
    const espcompose = result.espcompose as { reactive: { bindings: Record<string, unknown>[] } };
    const serializedBinding = espcompose.reactive.bindings[0];
    const expr = serializedBinding.expression as Record<string, unknown>;
    expect(expr.kind).toBe('expression');
    expect(expr).not.toHaveProperty('__reactive_node__');

    expect(() => JSON.stringify(result)).not.toThrow();
  });

  it('converts theme leafData from Map to object', () => {
    const leafData = new Map<string, { values: unknown[]; valueType: string }>();
    leafData.set('colors_primary_bg', { values: ['#1E88E5', '#FF5722'], valueType: 'color' });
    leafData.set('spacing_md', { values: [8, 12], valueType: 'int' });

    const ir = makeMinimalIR({
      espcompose: {
        themes: {
          themeNames: ['default', 'dark'],
          defaultIndex: 0,
          leafData,
        },
      },
    });
    const result = serializeIR(ir);
    const espcompose = result.espcompose as { themes?: Record<string, unknown> };
    expect(espcompose.themes).toBeDefined();
    const themes = espcompose.themes as Record<string, unknown>;
    expect(themes.themeNames).toEqual(['default', 'dark']);
    expect(themes.defaultIndex).toBe(0);

    const ld = themes.leafData as Record<string, unknown>;
    expect(ld['colors_primary_bg']).toEqual({ values: ['#1E88E5', '#FF5722'], valueType: 'color' });
    expect(ld['spacing_md']).toEqual({ values: [8, 12], valueType: 'int' });

    expect(() => JSON.stringify(result)).not.toThrow();
  });

  it('handles ReactiveNode with exprIR (ExprNode AST)', () => {
    const node = new ReactiveNode({
      kind: 'memo',
      dependencies: [],
      exprType: 'string',
    });
    node.exprIR = {
      kind: 'ternary',
      test: { kind: 'entity_prop', entityId: 'light.office', property: 'isOn', type: 'bool' },
      consequent: { kind: 'literal', value: 'On', type: 'string' },
      alternate: { kind: 'literal', value: 'Off', type: 'string' },
    };

    const ir = makeMinimalIR({ espcompose: { reactive: { bindings: [], memos: [node], effects: [] } } });
    const result = serializeIR(ir);
    const espcompose2 = result.espcompose as { reactive: { memos: Record<string, unknown>[] } };
    const serializedNode = espcompose2.reactive.memos[0];
    expect(serializedNode.exprIR).toBeDefined();
    expect((serializedNode.exprIR as Record<string, unknown>).kind).toBe('ternary');

    expect(() => JSON.stringify(result)).not.toThrow();
  });

  it('preserves entities and components as-is', () => {
    const ir = makeMinimalIR({
      esphome: {
        haEntities: [
          { entityId: 'light.office', domain: 'light', sensorType: 'binary_sensor' as const, generatedId: 'ha_light_office' },
        ],
        components: [
          { section: 'image', id: 'img_logo', config: { file: 'logo.png', resize: '64x64' } },
        ],
      },
    });
    const result = serializeIR(ir);
    const esphome = result.esphome as { haEntities: unknown[]; components: unknown[] };
    expect(esphome.haEntities).toHaveLength(1);
    expect(esphome.components).toHaveLength(1);
    expect(() => JSON.stringify(result)).not.toThrow();
  });
});

describe('writeIRDebugFiles', () => {
  it('writes JSON and HTML files to the build directory', () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'ir-debug-test-'));
    try {
      const ir = makeMinimalIR({
        esphome: {
          sections: [
            { key: 'esphome', value: { kind: 'object', entries: [{ key: 'name', value: { kind: 'scalar', value: 'test' } }] } },
          ],
        },
      });

      const htmlPath = writeIRDebugFiles(ir, tmpDir);

      // JSON file
      const jsonPath = path.join(tmpDir, 'ir-debug.json');
      expect(fs.existsSync(jsonPath)).toBe(true);
      const json = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
      const jsonEsphome = json.esphome as { sections: Array<{ key: string }> };
      expect(jsonEsphome.sections).toHaveLength(1);
      expect(jsonEsphome.sections[0].key).toBe('esphome');

      // HTML file
      expect(fs.existsSync(htmlPath)).toBe(true);
      expect(htmlPath).toBe(path.join(tmpDir, 'ir-debug.html'));
      const html = fs.readFileSync(htmlPath, 'utf8');
      expect(html).toContain('<!DOCTYPE html>');
      expect(html).toContain('ESPCompose');
      expect(html).toContain('IR_DATA');
      expect(html).toContain('"test"');
    } finally {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }
  });
});
