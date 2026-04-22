import { describe, it, expect } from 'vitest';
import { serializeIR, writeIRDebugFiles } from './ir-debug';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import type { SemanticIR, IRBinding } from '@espcompose/core/internals';
import { IRReactiveNode } from '@espcompose/core';

function makeMinimalIR(overrides?: {
  esphome?: Partial<SemanticIR['esphome']>;
  espcompose?: Partial<SemanticIR['espcompose']>;
}): SemanticIR {
  return {
    kind: 'semantic_ir',
    esphome: {
      kind: 'esphome_data',
      sections: [],
      haEntities: [],
      components: [],
      scripts: [],
      ...overrides?.esphome,
    },
    espcompose: {
      kind: 'espcompose_data',
      reactive: { kind: 'reactive_data', bindings: [], memos: [], effects: [] },
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
            kind: 'section',
            key: 'esphome',
            value: {
              kind: 'object',
              entries: [
                { kind: 'entry', key: 'name', value: { kind: 'scalar', value: 'my-device' } },
                { kind: 'entry', key: 'items', value: { kind: 'array', items: [{ kind: 'scalar', value: 42 }, { kind: 'null' }] } },
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

  it('serializes IRReactiveNode fields correctly', () => {
    const node = new IRReactiveNode({
      kind: 'memo',
      dependencies: [{ kind: 'dependency', sourceId: 'ha_light', triggerType: 'on_state', sourceDomain: 'binary_sensor' }],
      exprType: 'string',
    });

    const ir = makeMinimalIR({ espcompose: { reactive: { kind: 'reactive_data', bindings: [], memos: [node], effects: [] } } });
    const result = serializeIR(ir);
    const espcompose = result.espcompose as { reactive: { memos: Record<string, unknown>[] } };
    const serializedNode = espcompose.reactive.memos[0];

    expect(serializedNode.kind).toBe('memo');
    expect(serializedNode.dependencies).toEqual(node.dependencies);
    expect(serializedNode.exprType).toBe('string');
    // Class brand field is preserved in JSON; viewer hides it at render time
    expect(Object.prototype.hasOwnProperty.call(serializedNode, '__reactive_node__')).toBe(true);

    expect(() => JSON.stringify(result)).not.toThrow();
  });

  it('sanitizes IRReactiveNode in bindings', () => {
    const node = new IRReactiveNode({
      kind: 'expression',
      dependencies: [],
      exprType: 'bool',
    });

    const binding: IRBinding = {
      kind: 'binding',
      targetId: 'lbl_1',
      targetType: 'lvgl_label',
      targetProp: 'text',
      expression: node,
    };

    const ir = makeMinimalIR({
      espcompose: { reactive: { kind: 'reactive_data', bindings: [binding], memos: [node], effects: [] } },
    });
    const result = serializeIR(ir);
    const espcompose = result.espcompose as { reactive: { bindings: Record<string, unknown>[] } };
    const serializedBinding = espcompose.reactive.bindings[0];
    const expr = serializedBinding.expression as Record<string, unknown>;
    expect(expr.kind).toBe('expression');
    expect(expr).toHaveProperty('__reactive_node__', true);

    expect(() => JSON.stringify(result)).not.toThrow();
  });

  it('converts theme leafData from Map to object', () => {
    const leafData = new Map<string, { values: unknown[]; valueType: string }>();
    leafData.set('colors_primary_bg', { values: ['#1E88E5', '#FF5722'], valueType: 'color' });
    leafData.set('spacing_md', { values: [8, 12], valueType: 'int' });

    const ir = makeMinimalIR({
      espcompose: {
        themes: [{
          kind: 'theme_data',
          scope: 'test',
          scopeId: 'abcd1234',
          themeNames: ['default', 'dark'],
          defaultIndex: 0,
          leafData,
        }],
      },
    });
    const result = serializeIR(ir);
    const espcompose = result.espcompose as { themes?: Array<Record<string, unknown>> };
    expect(espcompose.themes).toBeDefined();
    expect(espcompose.themes!.length).toBe(1);
    const scope = espcompose.themes![0];
    expect(scope.themeNames).toEqual(['default', 'dark']);
    expect(scope.defaultIndex).toBe(0);
    expect(scope.scope).toBe('test');
    expect(scope.scopeId).toBe('abcd1234');

    const ld = scope.leafData as Record<string, unknown>;
    expect(ld['colors_primary_bg']).toEqual({ values: ['#1E88E5', '#FF5722'], valueType: 'color' });
    expect(ld['spacing_md']).toEqual({ values: [8, 12], valueType: 'int' });

    expect(() => JSON.stringify(result)).not.toThrow();
  });

  it('handles IRReactiveNode with exprIR (IRExprNode AST)', () => {
    const node = new IRReactiveNode({
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

    const ir = makeMinimalIR({ espcompose: { reactive: { kind: 'reactive_data', bindings: [], memos: [node], effects: [] } } });
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
          { kind: 'ha_entity', entityId: 'light.office', domain: 'light', sensorType: 'binary_sensor' as const, generatedId: 'ha_light_office' },
        ],
        components: [
          { kind: 'component', section: 'image', id: 'img_logo', config: { file: 'logo.png', resize: '64x64' } },
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
  it('writes ir-debug.json and a self-contained ir-debug.html', () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'ir-debug-test-'));
    try {
      const ir = makeMinimalIR({
        esphome: {
          sections: [
            { kind: 'section', key: 'esphome', value: { kind: 'object', entries: [{ kind: 'entry', key: 'name', value: { kind: 'scalar', value: 'test' } }] } },
          ],
        },
      });

      const htmlPath = writeIRDebugFiles(ir, tmpDir);

      // Returned path is ir-debug.html directly in buildDir (not a subdirectory)
      expect(htmlPath).toBe(path.join(tmpDir, 'ir-debug.html'));

      // JSON is written alongside for external tooling
      const jsonPath = path.join(tmpDir, 'ir-debug.json');
      expect(fs.existsSync(jsonPath)).toBe(true);
      const json = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
      const jsonEsphome = json.esphome as { sections: Array<{ key: string }> };
      expect(jsonEsphome.sections).toHaveLength(1);
      expect(jsonEsphome.sections[0].key).toBe('esphome');

      // HTML is a single self-contained file
      expect(fs.existsSync(htmlPath)).toBe(true);
      const html = fs.readFileSync(htmlPath, 'utf8');
      expect(html).toContain('<!DOCTYPE html>');
      // IR data is injected inline — no fetch() needed
      expect(html).toContain('window.__IR_DATA');
      expect(html).toContain('"test"');
      // No external asset references (fully self-contained)
      expect(html).not.toContain('src="./assets/');
    } finally {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }
  });
});
