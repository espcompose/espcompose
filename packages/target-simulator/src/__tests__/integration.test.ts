import { describe, it, expect, beforeEach } from 'vitest';
import { Scheduler } from '../runtime/signals';
import { MockProvider } from '../providers/mock-provider';
import {
  setSimulatorProvider,
  enterHookScope,
  exitHookScope,
  resetSignalRegistry,
  useHAEntity,
  useMemo,
  useRef,
} from '../runtime/hooks';
import { simulatorRender, resetNodeCounter } from '../runtime/render';

beforeEach(() => {
  Scheduler.reset();
  resetSignalRegistry();
  resetNodeCounter();
});

describe('Simulator hooks integration', () => {
  it('useHAEntity returns a binding with reactive isOn', () => {
    const provider = new MockProvider();
    setSimulatorProvider(provider);
    enterHookScope();

    try {
      const binding = useHAEntity('light.kitchen') as { isOn: boolean; toggle: () => void };
      expect(binding.isOn).toBe(false);

      // Toggle via provider
      provider.callService('light', 'toggle', 'light.kitchen');
      Scheduler.instance().flush();

      expect(binding.isOn).toBe(true);
    } finally {
      exitHookScope();
    }
  });

  it('useHAEntity toggle action updates state', () => {
    const provider = new MockProvider();
    setSimulatorProvider(provider);
    enterHookScope();

    try {
      const binding = useHAEntity('light.kitchen') as { isOn: boolean; toggle: () => void };
      expect(binding.isOn).toBe(false);

      // Call action method
      binding.toggle();
      Scheduler.instance().flush();

      expect(binding.isOn).toBe(true);
    } finally {
      exitHookScope();
    }
  });

  it('useMemo with HA entity creates reactive derived value', () => {
    const provider = new MockProvider();
    setSimulatorProvider(provider);
    enterHookScope();

    try {
      const binding = useHAEntity('light.kitchen') as { stateText: string };
      const text = useMemo(() => `Light is: ${binding.stateText}`);
      expect(text).toBe('Light is: off');
    } finally {
      exitHookScope();
    }
  });

  it('useRef creates a ref with a token', () => {
    const provider = new MockProvider();
    setSimulatorProvider(provider);
    enterHookScope();

    try {
      const ref = useRef();
      expect(ref.toString()).toMatch(/^sim_ref_/);
    } finally {
      exitHookScope();
    }
  });
});

describe('Simulator render function', () => {
  it('renders a simple LVGL page with label', () => {
    const provider = new MockProvider();
    setSimulatorProvider(provider);

    // Minimal element tree matching what the SDK JSX runtime produces
    const element = {
      type: 'esphome',
      props: {
        name: 'test',
        children: [
          {
            type: 'lvgl',
            props: {
              children: [
                {
                  type: 'lvgl-page',
                  props: {
                    children: [
                      {
                        type: 'lvgl-label',
                        props: { text: 'Hello', x: 10, y: 20 },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    };

    const nodes = simulatorRender(element as never);

    expect(nodes).toHaveLength(1); // One page
    expect(nodes[0].type).toBe('page');
    expect(nodes[0].children).toHaveLength(1); // One label
    expect(nodes[0].children[0].type).toBe('label');

    const textProp = nodes[0].children[0].props.text;
    expect(textProp).toBeDefined();
    expect(textProp.kind).toBe('static');
    if (textProp.kind === 'static') {
      expect(textProp.value).toBe('Hello');
    }
  });

  it('renders nested widgets', () => {
    const provider = new MockProvider();
    setSimulatorProvider(provider);

    const element = {
      type: 'esphome',
      props: {
        name: 'test',
        children: [
          {
            type: 'lvgl',
            props: {
              children: [
                {
                  type: 'lvgl-page',
                  props: {
                    children: [
                      {
                        type: 'lvgl-button',
                        props: {
                          x: 10, y: 40, width: 120, height: 50,
                          children: [
                            {
                              type: 'lvgl-label',
                              props: { text: 'Click me', align: 'CENTER' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    };

    const nodes = simulatorRender(element as never);

    expect(nodes).toHaveLength(1); // page
    expect(nodes[0].children).toHaveLength(1); // button
    expect(nodes[0].children[0].type).toBe('button');
    expect(nodes[0].children[0].children).toHaveLength(1); // label inside button
    expect(nodes[0].children[0].children[0].type).toBe('label');
  });

  it('resolves function components', () => {
    const provider = new MockProvider();
    setSimulatorProvider(provider);

    // Function component that wraps a label
    function MyLabel(props: { text: string }) {
      return {
        type: 'lvgl-label',
        props: { text: props.text },
      };
    }

    const element = {
      type: 'esphome',
      props: {
        name: 'test',
        children: [
          {
            type: 'lvgl',
            props: {
              children: [
                {
                  type: 'lvgl-page',
                  props: {
                    children: [
                      { type: MyLabel, props: { text: 'From component' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    };

    const nodes = simulatorRender(element as never);

    expect(nodes).toHaveLength(1);
    expect(nodes[0].children).toHaveLength(1);
    expect(nodes[0].children[0].type).toBe('label');
    if (nodes[0].children[0].props.text?.kind === 'static') {
      expect(nodes[0].children[0].props.text.value).toBe('From component');
    }
  });

  it('skips non-LVGL elements', () => {
    const provider = new MockProvider();
    setSimulatorProvider(provider);

    const element = {
      type: 'esphome',
      props: {
        name: 'test',
        children: [
          { type: 'wifi', props: { ssid: 'test' } },
          { type: 'api', props: {} },
          {
            type: 'lvgl',
            props: {
              children: [
                {
                  type: 'lvgl-page',
                  props: {
                    children: [
                      { type: 'lvgl-label', props: { text: 'Only widget' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    };

    const nodes = simulatorRender(element as never);

    // Should only get the LVGL content
    expect(nodes).toHaveLength(1);
    expect(nodes[0].type).toBe('page');
    expect(nodes[0].children).toHaveLength(1);
  });
});

// ────────────────────────────────────────────────────────────────────────────
// IR-based simulator renderer tests
// ────────────────────────────────────────────────────────────────────────────

import { lowerToSimulator } from '../backends/ir-renderer';
import { ReactiveNode } from '@esphome/compose';
import type { SemanticIR, IRSection, IRValue } from '@esphome/compose/internals';

function irScalar(value: string | number | boolean): IRValue {
  return { kind: 'scalar', value };
}

function irObject(entries: Array<{ key: string; value: IRValue }>): IRValue {
  return { kind: 'object', entries };
}

function irArray(items: IRValue[]): IRValue {
  return { kind: 'array', items };
}

function makeEmptyIR(sections: IRSection[]): SemanticIR {
  return {
    esphome: { sections, haEntities: [], components: [], scripts: [] },
    espcompose: { reactive: { bindings: [], memos: [], effects: [] } },
  };
}

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
    const nodes = lowerToSimulator(ir, provider);

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
    const nodes = lowerToSimulator(ir, provider);

    expect(nodes).toHaveLength(1);
    expect(nodes[0].children).toHaveLength(1);
    expect(nodes[0].children[0].type).toBe('button');
    expect(nodes[0].children[0].children).toHaveLength(1);
    expect(nodes[0].children[0].children[0].type).toBe('label');
  });

  it('classifies IRReactive as reactive prop', () => {
    const reactiveNode = new ReactiveNode({
      kind: 'expression',
      dependencies: [{
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
    const nodes = lowerToSimulator(ir, provider);

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
    const nodes = lowerToSimulator(ir, provider);

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
    const nodes = lowerToSimulator(ir, provider);

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
    const nodes = lowerToSimulator(ir, provider);
    expect(nodes).toHaveLength(0);
  });

  it('registers entities from IR', () => {
    const ir: SemanticIR = {
      esphome: {
        sections: [
          {
            key: 'lvgl',
            value: irObject([
              { key: 'pages', value: irArray([irObject([{ key: 'widgets', value: irArray([]) }])]) },
            ]),
          },
        ],
        haEntities: [
          { entityId: 'light.kitchen', domain: 'light', sensorType: 'binary_sensor', generatedId: 'ha_light_kitchen' },
        ],
        components: [],
        scripts: [],
      },
      espcompose: { reactive: { bindings: [], memos: [], effects: [] } },
    };

    const provider = new MockProvider();
    lowerToSimulator(ir, provider);

    // Entity should be registered with default state
    const state = provider.getEntityState('light.kitchen');
    expect(state.state).toBe('off');
    expect(state.domain).toBe('light');
  });
});
