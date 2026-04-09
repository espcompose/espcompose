import { describe, it, expect, beforeEach } from 'vitest';
import { Scheduler, MockProvider, lowerToSimulator } from '@espcompose/simulator-app/runtime';
import { IRReactiveNode } from '@espcompose/core';
import type { SemanticIR, IRValue } from '@espcompose/core/internals';

beforeEach(() => {
  Scheduler.reset();
});

// ── IR helpers ───────────────────────────────────────────────────────────────

function irScalar(value: string | number | boolean): IRValue {
  return { kind: 'scalar', value };
}

function irObject(entries: Array<{ key: string; value: IRValue }>): IRValue {
  return { kind: 'object', entries: entries.map(e => ({ kind: 'entry' as const, ...e })) };
}

function irArray(items: IRValue[]): IRValue {
  return { kind: 'array', items };
}

function makeEmptyIR(sections: Array<{ key: string; value: IRValue }>): SemanticIR {
  return {
    kind: 'semantic_ir',
    esphome: { kind: 'esphome_data', sections: sections.map(s => ({ kind: 'section' as const, ...s })), haEntities: [], components: [], scripts: [] },
    espcompose: { kind: 'espcompose_data', reactive: { kind: 'reactive_data', bindings: [], memos: [], effects: [] } },
  };
}

// ── IR-based simulator renderer tests ────────────────────────────────────────

describe('IR-based simulator renderer', () => {
  it('renders a simple LVGL page with label from IR', () => {
    const ir = makeEmptyIR([
      {
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
                          { key: 'text', value: irScalar('Hello') },
                          { key: 'x', value: irScalar(10) },
                          { key: 'y', value: irScalar(20) },
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
    ]);

    const provider = new MockProvider();
    const { nodes } = lowerToSimulator(ir, provider);

    expect(nodes).toHaveLength(1);
    expect(nodes[0].type).toBe('page');
    expect(nodes[0].children).toHaveLength(1);
    expect(nodes[0].children[0].type).toBe('label');

    const textProp = nodes[0].children[0].props.text;
    expect(textProp).toBeDefined();
    expect(textProp.kind).toBe('static');
    if (textProp.kind === 'static') {
      expect(textProp.value).toBe('Hello');
    }
  });

  it('renders nested widgets from IR', () => {
    const ir = makeEmptyIR([
      {
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
                        key: 'button',
                        value: irObject([
                          { key: 'x', value: irScalar(10) },
                          { key: 'width', value: irScalar(120) },
                          {
                            key: 'widgets',
                            value: irArray([
                              irObject([
                                {
                                  key: 'label',
                                  value: irObject([
                                    { key: 'text', value: irScalar('Click me') },
                                    { key: 'align', value: irScalar('CENTER') },
                                  ]),
                                },
                              ]),
                            ]),
                          },
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
    ]);

    const provider = new MockProvider();
    const { nodes } = lowerToSimulator(ir, provider);

    expect(nodes).toHaveLength(1);
    expect(nodes[0].children).toHaveLength(1);
    expect(nodes[0].children[0].type).toBe('button');
    expect(nodes[0].children[0].children).toHaveLength(1);
    expect(nodes[0].children[0].children[0].type).toBe('label');
  });

  it('classifies IRReactive as reactive prop', () => {
    const reactiveNode = new IRReactiveNode({
      kind: 'expression',
      dependencies: [{
        kind: 'dependency',
        sourceId: 'ha_light_kitchen',
        triggerType: 'on_state',
        sourceDomain: 'binary_sensor',
      }],
      exprType: 'bool',
      sourceId: 'ha_light_kitchen',
    });

    const ir = makeEmptyIR([
      {
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
                          {
                            key: 'text',
                            value: { kind: 'reactive', node: reactiveNode } as IRValue,
                          },
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
    ]);

    const provider = new MockProvider();
    const { nodes } = lowerToSimulator(ir, provider);

    const label = nodes[0].children[0];
    expect(label.id).toBe('lbl_1');
    expect(label.props.text.kind).toBe('reactive');
    if (label.props.text.kind === 'reactive') {
      expect(label.props.text.dependencies).toHaveLength(1);
      expect(label.props.text.dependencies[0].sourceId).toBe('ha_light_kitchen');
      expect(label.props.text.dependencies[0].sourceType).toBe('ha_entity');
    }
  });

  it('classifies IRAction as action prop', () => {
    const rawActions = [{
      kind: 'ha_service',
      action: 'light.toggle',
      data: {
        entity_id: { kind: 'literal', value: 'light.kitchen' },
      },
    }];

    const ir = makeEmptyIR([
      {
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
                        key: 'button',
                        value: irObject([
                          {
                            key: 'on_press',
                            value: { kind: 'action', actions: rawActions } as IRValue,
                          },
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
    ]);

    const provider = new MockProvider();
    const { nodes } = lowerToSimulator(ir, provider);

    const button = nodes[0].children[0];
    expect(button.props.on_press.kind).toBe('action');
    if (button.props.on_press.kind === 'action') {
      expect(button.props.on_press.meta).toHaveLength(1);
      expect(button.props.on_press.meta![0].type).toBe('ha_service');
    }
  });

  it('classifies IRRef as ref prop', () => {
    const ir = makeEmptyIR([
      {
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
                          {
                            key: 'display',
                            value: { kind: 'ref', token: 'r_abc123', ref: {} } as IRValue,
                          },
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
    ]);

    const provider = new MockProvider();
    const { nodes } = lowerToSimulator(ir, provider);

    const label = nodes[0].children[0];
    expect(label.props.display.kind).toBe('ref');
    if (label.props.display.kind === 'ref') {
      expect(label.props.display.refId).toBe('r_abc123');
    }
  });

  it('returns empty array when no LVGL section', () => {
    const ir = makeEmptyIR([
      { key: 'esphome', value: irObject([{ key: 'name', value: irScalar('test') }]) },
    ]);

    const provider = new MockProvider();
    const { nodes } = lowerToSimulator(ir, provider);
    expect(nodes).toHaveLength(0);
  });

  it('registers entities from IR', () => {
    const ir: SemanticIR = {
      kind: 'semantic_ir',
      esphome: {
        kind: 'esphome_data',
        sections: [
          {
            kind: 'section',
            key: 'lvgl',
            value: irObject([
              { key: 'pages', value: irArray([irObject([{ key: 'widgets', value: irArray([]) }])]) },
            ]),
          },
        ],
        haEntities: [
          { kind: 'ha_entity', entityId: 'light.kitchen', domain: 'light', sensorType: 'binary_sensor', generatedId: 'ha_light_kitchen' },
        ],
        components: [],
        scripts: [],
      },
      espcompose: { kind: 'espcompose_data', reactive: { kind: 'reactive_data', bindings: [], memos: [], effects: [] } },
    };

    const provider = new MockProvider();
    lowerToSimulator(ir, provider);

    // Entity should be registered with default state
    const state = provider.getEntityState('light.kitchen');
    expect(state.state).toBe('off');
    expect(state.domain).toBe('light');
  });
});

// ────────────────────────────────────────────────────────────────────────────
// Theme integration tests
// ────────────────────────────────────────────────────────────────────────────

function makeThemedIR(
  themeNames: string[],
  defaultIndex: number,
  leafData: Map<string, { values: unknown[]; valueType: string }>,
  /** Widget entries containing reactive theme_read props. */
  widgetEntries: Array<{ key: string; value: IRValue }>,
): SemanticIR {
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
                          value: irObject(widgetEntries),
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
        themeNames,
        defaultIndex,
        leafData,
      },
    },
  };
}

describe('Theme integration', () => {
  it('resolves theme_read reactive props from IR theme data', () => {
    const leafData = new Map([
      ['colors_background', { values: [0x1a1a2e, 0xffffff], valueType: 'color' }],
    ]);

    const reactiveNode = new IRReactiveNode({
      kind: 'expression',
      dependencies: [{ kind: 'dependency', sourceId: '__theme__', triggerType: 'colors_background', sourceDomain: 'theme', sourceType: 'theme' }],
      exprType: 'color',
      sourceId: '__theme__',
    });
    reactiveNode.exprIR = { kind: 'theme_read', path: 'colors_background', type: 'color' };

    const ir = makeThemedIR(
      ['dark', 'light'],
      0,
      leafData,
      [
        { key: 'id', value: irScalar('lbl_themed') },
        { key: 'bg_color', value: { kind: 'reactive', node: reactiveNode } as IRValue },
      ],
    );

    const provider = new MockProvider();
    const { nodes } = lowerToSimulator(ir, provider);

    const label = nodes[0].children[0];
    expect(label.id).toBe('lbl_themed');
    expect(label.props.bg_color.kind).toBe('reactive');
    if (label.props.bg_color.kind === 'reactive') {
      // Default theme index = 0 → dark theme → 0x1a1a2e
      expect(label.props.bg_color.current).toBe(0x1a1a2e);
      expect(label.props.bg_color.evaluate()).toBe(0x1a1a2e);
    }
  });

  it('uses the default theme index for initial value', () => {
    const leafData = new Map([
      ['colors_primary_bg', { values: [0x000000, 0xffffff], valueType: 'color' }],
    ]);

    const reactiveNode = new IRReactiveNode({
      kind: 'expression',
      dependencies: [{ kind: 'dependency', sourceId: '__theme__', triggerType: 'colors_primary_bg', sourceDomain: 'theme', sourceType: 'theme' }],
      exprType: 'color',
      sourceId: '__theme__',
    });
    reactiveNode.exprIR = { kind: 'theme_read', path: 'colors_primary_bg', type: 'color' };

    // default index = 1 → light theme
    const ir = makeThemedIR(
      ['dark', 'light'],
      1,
      leafData,
      [
        { key: 'bg_color', value: { kind: 'reactive', node: reactiveNode } as IRValue },
      ],
    );

    const provider = new MockProvider();
    const { nodes } = lowerToSimulator(ir, provider);

    const label = nodes[0].children[0];
    if (label.props.bg_color.kind === 'reactive') {
      expect(label.props.bg_color.current).toBe(0xffffff);
    }
  });

  it('does not crash when theme data is undefined', () => {
    // A project with no themes should still render without errors.
    const ir = makeEmptyIR([
      {
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
                        value: irObject([{ key: 'text', value: irScalar('no theme') }]),
                      },
                    ]),
                  ]),
                },
              ]),
            ]),
          },
        ]),
      },
    ]);

    const provider = new MockProvider();
    const { nodes } = lowerToSimulator(ir, provider);
    expect(nodes).toHaveLength(1);
    expect(nodes[0].children[0].type).toBe('label');
  });
});
