import { describe, it, expect } from 'vitest';
import { IRReactiveNode } from '@espcompose/core';
import type { SemanticIR, IRValue } from '@espcompose/core/internals';
import {
  encodeServerMessage,
  parseMessage,
  isServerMessage,
  type ServerMessage,
} from '@espcompose/simulator-app/runtime';

// ── IR helpers (mirrors integration.test.ts) ─────────────────────────────────

function irScalar(value: string | number | boolean): IRValue {
  return { kind: 'scalar', value };
}

function irObject(entries: Array<{ key: string; value: IRValue }>): IRValue {
  return { kind: 'object', entries: entries.map(e => ({ kind: 'entry' as const, ...e })) };
}

function irArray(items: IRValue[]): IRValue {
  return { kind: 'array', items };
}

function makeThemedIR(
  leafData: Map<string, { values: unknown[]; valueType: string }>,
): SemanticIR {
  const reactiveNode = new IRReactiveNode({
    kind: 'expression',
    dependencies: [{
      kind: 'dependency',
      sourceId: '__theme__',
      triggerType: 'colors_bg',
      sourceDomain: 'theme',
      sourceType: 'theme',
    }],
    exprType: 'color',
    sourceId: '__theme__',
  });
  reactiveNode.exprIR = { kind: 'theme_read', path: 'colors_bg', type: 'color' };

  return {
    kind: 'semantic_ir',
    esphome: {
      kind: 'esphome_data',
      sections: [
        {
          kind: 'section',
          key: 'lvgl',
          value: irObject([
            {
              key: 'pages',
              value: irArray([
                irObject([
                  {
                    key: 'widgets',
                    value: irArray([
                      irObject([
                        {
                          key: 'label',
                          value: irObject([
                            { key: 'id', value: irScalar('lbl_1') },
                            { key: 'text', value: irScalar('Hello') },
                            { key: 'bg_color', value: { kind: 'reactive', node: reactiveNode } as IRValue },
                          ]),
                        },
                      ]),
                    ]),
                  },
                ]),
              ]),
            },
          ]),
        },
      ],
      haEntities: [],
      components: [],
      scripts: [],
    },
    espcompose: {
      kind: 'espcompose_data',
      reactive: { kind: 'reactive_data', bindings: [], memos: [], effects: [] },
      themes: {
        kind: 'theme_data',
        themeNames: ['dark', 'light'],
        defaultIndex: 0,
        leafData,
      },
    },
  };
}

// ── Tests ────────────────────────────────────────────────────────────────────

describe('ws-protocol IR serialization roundtrip', () => {
  it('preserves IRThemeData.leafData as a Map after encode → parse', () => {
    const leafData = new Map([
      ['colors_bg', { values: [0x1a1a2e, 0xffffff], valueType: 'color' }],
      ['spacing_md', { values: [8, 12], valueType: 'int' }],
    ]);

    const ir = makeThemedIR(leafData);

    const msg: ServerMessage = { type: 'ir_update', payload: { ir } };
    const encoded = encodeServerMessage(msg);
    const decoded = parseMessage(encoded);

    expect(isServerMessage(decoded)).toBe(true);
    const parsed = decoded as ServerMessage;
    expect(parsed.type).toBe('ir_update');

    if (parsed.type !== 'ir_update') throw new Error('unexpected');

    const themes = parsed.payload.ir.espcompose.themes;
    expect(themes).toBeDefined();

    // The critical assertion: leafData must be a Map, not a plain object
    expect(themes!.leafData).toBeInstanceOf(Map);
    expect(themes!.leafData.size).toBe(2);
    expect(themes!.leafData.get('colors_bg')).toEqual({
      values: [0x1a1a2e, 0xffffff],
      valueType: 'color',
    });
    expect(themes!.leafData.get('spacing_md')).toEqual({
      values: [8, 12],
      valueType: 'int',
    });
  });

  it('preserves scalar fields through the roundtrip', () => {
    const leafData = new Map([
      ['colors_bg', { values: [0x000000], valueType: 'color' }],
    ]);

    const ir = makeThemedIR(leafData);
    const msg: ServerMessage = { type: 'ir_update', payload: { ir } };
    const decoded = parseMessage(encodeServerMessage(msg)) as ServerMessage;

    if (decoded.type !== 'ir_update') throw new Error('unexpected');

    expect(decoded.payload.ir.kind).toBe('semantic_ir');
    expect(decoded.payload.ir.espcompose.themes!.themeNames).toEqual(['dark', 'light']);
    expect(decoded.payload.ir.espcompose.themes!.defaultIndex).toBe(0);
  });

  it('handles IR with no themes (themes undefined)', () => {
    const ir: SemanticIR = {
      kind: 'semantic_ir',
      esphome: { kind: 'esphome_data', sections: [], haEntities: [], components: [], scripts: [] },
      espcompose: {
        kind: 'espcompose_data',
        reactive: { kind: 'reactive_data', bindings: [], memos: [], effects: [] },
      },
    };

    const msg: ServerMessage = { type: 'ir_update', payload: { ir } };
    const decoded = parseMessage(encodeServerMessage(msg)) as ServerMessage;

    if (decoded.type !== 'ir_update') throw new Error('unexpected');
    expect(decoded.payload.ir.espcompose.themes).toBeUndefined();
  });

  it('handles empty leafData Map', () => {
    const leafData = new Map<string, { values: unknown[]; valueType: string }>();
    const ir = makeThemedIR(leafData);

    const msg: ServerMessage = { type: 'ir_update', payload: { ir } };
    const decoded = parseMessage(encodeServerMessage(msg)) as ServerMessage;

    if (decoded.type !== 'ir_update') throw new Error('unexpected');

    expect(decoded.payload.ir.espcompose.themes!.leafData).toBeInstanceOf(Map);
    expect(decoded.payload.ir.espcompose.themes!.leafData.size).toBe(0);
  });
});
