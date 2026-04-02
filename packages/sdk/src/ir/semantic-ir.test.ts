import { describe, it, expect } from 'vitest';
import { ReactiveNode } from '../reactive-node';
import { RefHandle } from '../types';
import type { ReactiveBinding, HAEntityRegistration, ComponentRegistration } from '../hooks/useReactiveScope';
import type { SerializationCaptures } from '../serialize';
import { buildSemanticIR } from './build';
import { lowerSemanticIR } from './lower';
import { collectFromIR, collectBindings, collectReactiveNodes } from './traverse';

// ── Helpers ────────────────────────────────────────────────────────────────

/** Create a mock !lambda Scalar (duck-typed to match yaml.Scalar). */
function lambdaScalar(code: string) {
  return { value: code, tag: '!lambda', type: 'QUOTE_DOUBLE' };
}

/** Create a mock !secret Scalar. */
function secretScalar(key: string) {
  return { value: key, tag: '!secret' };
}

/** Create a mock quoted Scalar (YAML 1.1 booleans). */
function quotedScalar(value: string) {
  return { value, type: 'QUOTE_SINGLE' };
}

/** Create an empty captures object. */
function emptyCaptures(): SerializationCaptures {
  return {
    reactives: new WeakMap(),
    refs: new Map(),
    actions: new WeakMap(),
    secrets: new WeakMap(),
    triggerVars: new WeakMap(),
  };
}

function makeMemoNode(index: number): ReactiveNode {
  const node = new ReactiveNode({
    kind: 'memo',
    dependencies: [
      { sourceId: 'ha_light_x', triggerType: 'on_state', sourceDomain: 'binary_sensor' },
    ],
    exprType: 'float',
  });
  node.exprIR = { kind: 'ternary', test: { kind: 'signal_read', signalIndex: 0 }, consequent: { kind: 'literal', value: 1.0, type: 'float' }, alternate: { kind: 'literal', value: 0.0, type: 'float' } };
  node._index = index;
  return node;
}

// ────────────────────────────────────────────────────────────────────────────
// buildSemanticIR tests
// ────────────────────────────────────────────────────────────────────────────

describe('buildSemanticIR', () => {
  it('builds IR from a simple config with no reactive content', () => {
    const config = {
      esphome: { name: 'my-device', platform: 'ESP32' },
      wifi: { ssid: 'MyWiFi', password: 'secret' },
    };

    const ir = buildSemanticIR({
      config,
      captures: emptyCaptures(),
      bindings: [],
      entities: [],
      components: [],
      scripts: [],
      reactiveNodes: [],
    });

    expect(ir.sections).toHaveLength(2);
    expect(ir.sections[0].key).toBe('esphome');
    expect(ir.sections[1].key).toBe('wifi');
    expect(ir.bindings).toHaveLength(0);
  });

  it('preserves scalar types correctly', () => {
    const config = {
      esphome: { name: 'test', port: 6053, enabled: true },
    };

    const ir = buildSemanticIR({
      config,
      captures: emptyCaptures(),
      bindings: [],
      entities: [],
      components: [],
      scripts: [],
      reactiveNodes: [],
    });

    const esphome = ir.sections[0].value;
    expect(esphome.kind).toBe('object');
    if (esphome.kind === 'object') {
      expect(esphome.entries.find(e => e.key === 'name')?.value).toEqual({ kind: 'scalar', value: 'test' });
      expect(esphome.entries.find(e => e.key === 'port')?.value).toEqual({ kind: 'scalar', value: 6053 });
      expect(esphome.entries.find(e => e.key === 'enabled')?.value).toEqual({ kind: 'scalar', value: true });
    }
  });

  it('captures ReactiveNode from serialized Scalar via captures map', () => {
    const node = makeMemoNode(0);
    const scalar = lambdaScalar('return espcompose::memo_0.get();');

    const captures = emptyCaptures();
    captures.reactives.set(scalar, node);

    const binding: ReactiveBinding = {
      targetId: 'rw_abc',
      targetType: 'label',
      targetProp: 'text',
      expression: node,
    };

    const config = {
      lvgl: {
        pages: [{
          widgets: [{
            label: { id: 'rw_abc', text: scalar },
          }],
        }],
      },
    };

    const ir = buildSemanticIR({
      config,
      captures,
      bindings: [binding],
      entities: [],
      components: [],
      scripts: [],
      reactiveNodes: [node],
    });

    // Walk to the label text value
    const lvgl = ir.sections[0].value;
    expect(lvgl.kind).toBe('object');
    if (lvgl.kind !== 'object') return;
    const pages = lvgl.entries.find(e => e.key === 'pages')?.value;
    if (pages?.kind !== 'array') return;
    const page0 = pages.items[0];
    if (page0.kind !== 'object') return;
    const widgets = page0.entries.find(e => e.key === 'widgets')?.value;
    if (widgets?.kind !== 'array') return;
    const widget0 = widgets.items[0];
    if (widget0.kind !== 'object') return;
    const labelObj = widget0.entries.find(e => e.key === 'label')?.value;
    if (labelObj?.kind !== 'object') return;
    const textVal = labelObj.entries.find(e => e.key === 'text')?.value;

    // Should be IRReactive, not IRLambda
    expect(textVal?.kind).toBe('reactive');
    if (textVal?.kind !== 'reactive') return;
    expect(textVal.node).toBe(node);
    expect(textVal.binding).toBe(binding);
  });

  it('captures Ref from serialized token string', () => {
    const ref = new RefHandle();
    const token = ref.toString();

    const captures = emptyCaptures();
    captures.refs.set(token, ref);

    const config = {
      sensor: { i2c_id: token },
    };

    const ir = buildSemanticIR({
      config,
      captures,
      bindings: [],
      entities: [],
      components: [],
      scripts: [],
      reactiveNodes: [],
    });

    const sensor = ir.sections[0].value;
    if (sensor.kind !== 'object') return;
    const i2cVal = sensor.entries.find(e => e.key === 'i2c_id')?.value;

    expect(i2cVal?.kind).toBe('ref');
    if (i2cVal?.kind !== 'ref') return;
    expect(i2cVal.token).toBe(token);
    expect(i2cVal.ref).toBe(ref);
  });

  it('captures compiled action metadata', () => {
    const rawActions = [{ 'homeassistant.service': { service: 'light.toggle', entity_id: 'light.kitchen' } }];
    const serializedResult = [{ 'homeassistant.service': { service: 'light.toggle', entity_id: 'light.kitchen' } }];

    const captures = emptyCaptures();
    captures.actions.set(serializedResult, { rawActions, refBindings: undefined });

    const config = {
      lvgl: {
        widgets: [{
          button: { text: 'Toggle', on_press: serializedResult },
        }],
      },
    };

    const ir = buildSemanticIR({
      config,
      captures,
      bindings: [],
      entities: [],
      components: [],
      scripts: [],
      reactiveNodes: [],
    });

    const lvgl = ir.sections[0].value;
    if (lvgl.kind !== 'object') return;
    const widgets = lvgl.entries.find(e => e.key === 'widgets')?.value;
    if (widgets?.kind !== 'array') return;
    const widget0 = widgets.items[0];
    if (widget0.kind !== 'object') return;
    const buttonObj = widget0.entries.find(e => e.key === 'button')?.value;
    if (buttonObj?.kind !== 'object') return;
    const onPressVal = buttonObj.entries.find(e => e.key === 'on_press')?.value;

    expect(onPressVal?.kind).toBe('action');
    if (onPressVal?.kind !== 'action') return;
    expect(onPressVal.actions).toBe(rawActions);
  });

  it('captures secret values', () => {
    const scalar = secretScalar('wifi_password');

    const captures = emptyCaptures();
    captures.secrets.set(scalar, 'wifi_password');

    const config = {
      wifi: { password: scalar },
    };

    const ir = buildSemanticIR({
      config,
      captures,
      bindings: [],
      entities: [],
      components: [],
      scripts: [],
      reactiveNodes: [],
    });

    const wifi = ir.sections[0].value;
    if (wifi.kind !== 'object') return;
    const pwdVal = wifi.entries.find(e => e.key === 'password')?.value;

    expect(pwdVal?.kind).toBe('secret');
    if (pwdVal?.kind !== 'secret') return;
    expect(pwdVal.key).toBe('wifi_password');
  });

  it('captures trigger variable markers', () => {
    const scalar = lambdaScalar('return x;');

    const captures = emptyCaptures();
    captures.triggerVars.set(scalar, { name: 'x' });

    const config = {
      sensor: { value: scalar },
    };

    const ir = buildSemanticIR({
      config,
      captures,
      bindings: [],
      entities: [],
      components: [],
      scripts: [],
      reactiveNodes: [],
    });

    const sensor = ir.sections[0].value;
    if (sensor.kind !== 'object') return;
    const val = sensor.entries.find(e => e.key === 'value')?.value;

    expect(val?.kind).toBe('trigger_var');
    if (val?.kind !== 'trigger_var') return;
    expect(val.name).toBe('x');
  });

  it('handles quoted scalars (YAML 1.1 booleans)', () => {
    const config = {
      esphome: { enabled: quotedScalar('on') },
    };

    const ir = buildSemanticIR({
      config,
      captures: emptyCaptures(),
      bindings: [],
      entities: [],
      components: [],
      scripts: [],
      reactiveNodes: [],
    });

    const esphome = ir.sections[0].value;
    if (esphome.kind !== 'object') return;
    const entry = esphome.entries.find(e => e.key === 'enabled');
    expect(entry?.value).toEqual({ kind: 'scalar', value: 'on', quoted: true });
  });

  it('preserves side-channel data', () => {
    const entity: HAEntityRegistration = {
      entityId: 'light.kitchen',
      domain: 'light',
      sensorType: 'binary_sensor',
      generatedId: 'ha_light_kitchen',
    };

    const component: ComponentRegistration = {
      section: 'image',
      id: 'img_1',
      config: { id: 'img_1', file: './bg.png', type: 'RGB565' },
    };

    const ir = buildSemanticIR({
      config: { esphome: { name: 'test' } },
      captures: emptyCaptures(),
      bindings: [],
      entities: [entity],
      components: [component],
      scripts: [{ id: 'script_1', then: [{ delay: '500ms' }] }],
      reactiveNodes: [],
      themes: {
        themeNames: ['light', 'dark'],
        defaultIndex: 0,
        leafData: new Map([['colors_primary', { values: [0xFF0000, 0x0000FF], cppType: 'int32_t' }]]),
      },
    });

    expect(ir.entities).toEqual([entity]);
    expect(ir.components).toEqual([component]);
    expect(ir.scripts).toHaveLength(1);
    expect(ir.themes?.themeNames).toEqual(['light', 'dark']);
  });
});

// ────────────────────────────────────────────────────────────────────────────
// lowerSemanticIR round-trip tests
// ────────────────────────────────────────────────────────────────────────────

describe('lowerSemanticIR (round-trip)', () => {
  it('round-trips a simple config', () => {
    const config = {
      esphome: { name: 'my-device', platform: 'ESP32' },
      wifi: { ssid: 'MyWiFi', password: 'secret' },
    };

    const ir = buildSemanticIR({
      config,
      captures: emptyCaptures(),
      bindings: [],
      entities: [],
      components: [],
      scripts: [],
      reactiveNodes: [],
    });

    expect(lowerSemanticIR(ir)).toEqual(config);
  });

  it('round-trips ReactiveNode as !lambda', () => {
    const node = makeMemoNode(0);
    const scalar = lambdaScalar('return espcompose::memo_0.get();');

    const captures = emptyCaptures();
    captures.reactives.set(scalar, node);

    const config = {
      lvgl: { label: { text: scalar } },
    };

    const ir = buildSemanticIR({
      config,
      captures,
      bindings: [],
      entities: [],
      components: [],
      scripts: [],
      reactiveNodes: [node],
    });

    const lowered = lowerSemanticIR(ir);
    const text = (lowered.lvgl as Record<string, Record<string, Record<string, string>>>).label.text;
    // lowerSemanticIR generates lambda for float memo at index 0: "return espcompose::memo_0.get();"
    expect(text.tag).toBe('!lambda');
    expect(text.value).toBe('return espcompose::memo_0.get();');
  });

  it('round-trips Ref as token string', () => {
    const ref = new RefHandle();
    const token = ref.toString();

    const captures = emptyCaptures();
    captures.refs.set(token, ref);

    const config = {
      sensor: { i2c_id: token },
    };

    const ir = buildSemanticIR({
      config,
      captures,
      bindings: [],
      entities: [],
      components: [],
      scripts: [],
      reactiveNodes: [],
    });

    const lowered = lowerSemanticIR(ir);
    expect((lowered.sensor as Record<string, string>).i2c_id).toBe(token);
  });

  it('round-trips secret as !secret', () => {
    const scalar = secretScalar('my_pass');

    const captures = emptyCaptures();
    captures.secrets.set(scalar, 'my_pass');

    const config = { wifi: { password: scalar } };

    const ir = buildSemanticIR({
      config,
      captures,
      bindings: [],
      entities: [],
      components: [],
      scripts: [],
      reactiveNodes: [],
    });

    const lowered = lowerSemanticIR(ir);
    const pwd = (lowered.wifi as Record<string, Record<string, string>>).password;
    expect(pwd.tag).toBe('!secret');
    expect(pwd.value).toBe('my_pass');
  });

  it('round-trips trigger var as !lambda', () => {
    const scalar = lambdaScalar('return x;');

    const captures = emptyCaptures();
    captures.triggerVars.set(scalar, { name: 'x' });

    const config = { sensor: { value: scalar } };

    const ir = buildSemanticIR({
      config,
      captures,
      bindings: [],
      entities: [],
      components: [],
      scripts: [],
      reactiveNodes: [],
    });

    const lowered = lowerSemanticIR(ir);
    const val = (lowered.sensor as Record<string, Record<string, string>>).value;
    expect(val.tag).toBe('!lambda');
    expect(val.value).toBe('return x;');
  });

  it('round-trips nested objects and arrays', () => {
    const config = {
      wifi: {
        ssid: 'Test',
        ap: { ssid: 'Fallback', password: 'pass123' },
      },
      sensor: [
        { platform: 'homeassistant', id: 'ha_1' },
        { platform: 'homeassistant', id: 'ha_2' },
      ],
      api: null,
    };

    const ir = buildSemanticIR({
      config,
      captures: emptyCaptures(),
      bindings: [],
      entities: [],
      components: [],
      scripts: [],
      reactiveNodes: [],
    });

    expect(lowerSemanticIR(ir)).toEqual(config);
  });

  it('round-trips action with ref bindings', () => {
    const ref = new RefHandle();
    const rawActions = [{ 'homeassistant.service': { service: 'light.toggle', target: 'lightRef' } }];
    // Simulates the serialized form after ref resolution
    const serialized = [{ 'homeassistant.service': { service: 'light.toggle', target: ref.toString() } }];

    const captures = emptyCaptures();
    captures.actions.set(serialized, { rawActions, refBindings: { lightRef: ref } });

    const config = {
      button: { on_press: serialized },
    };

    const ir = buildSemanticIR({
      config,
      captures,
      bindings: [],
      entities: [],
      components: [],
      scripts: [],
      reactiveNodes: [],
    });

    // Verify it captured as IRAction
    const button = ir.sections[0].value;
    if (button.kind !== 'object') return;
    const onPress = button.entries.find(e => e.key === 'on_press')?.value;
    expect(onPress?.kind).toBe('action');

    // Round-trip should resolve refs and produce equivalent output
    const lowered = lowerSemanticIR(ir);
    const loweredActions = (lowered.button as Record<string, unknown[]>).on_press;
    expect(loweredActions).toHaveLength(1);
    const action = loweredActions[0] as Record<string, Record<string, string>>;
    expect(action['homeassistant.service'].target).toBe(ref.toString());
  });
});

// ────────────────────────────────────────────────────────────────────────────
// collectFromIR tree-walk tests
// ────────────────────────────────────────────────────────────────────────────

describe('collectFromIR', () => {
  it('collects all semantic node types from a mixed config', () => {
    const node = makeMemoNode(0);
    const reactiveScalar = lambdaScalar('return espcompose::memo_0.get();');
    const secretVal = secretScalar('wifi_password');
    const triggerVal = lambdaScalar('return x;');
    const ref = new RefHandle();
    const token = ref.toString();
    const rawActions = [{ 'homeassistant.service': { service: 'light.toggle' } }];
    const actionArr = [{ 'homeassistant.service': { service: 'light.toggle' } }];

    const captures = emptyCaptures();
    captures.reactives.set(reactiveScalar, node);
    captures.secrets.set(secretVal, 'wifi_password');
    captures.triggerVars.set(triggerVal, { name: 'x' });
    captures.refs.set(token, ref);
    captures.actions.set(actionArr, { rawActions });

    const binding: ReactiveBinding = {
      targetId: 'lbl_1',
      targetType: 'label',
      targetProp: 'text',
      expression: node,
    };

    const config = {
      lvgl: {
        widgets: [{
          label: { id: 'lbl_1', text: reactiveScalar },
          button: { on_press: actionArr },
        }],
      },
      wifi: { password: secretVal },
      sensor: { i2c_id: token, value: triggerVal },
    };

    const ir = buildSemanticIR({
      config,
      captures,
      bindings: [binding],
      entities: [],
      components: [],
      scripts: [],
      reactiveNodes: [node],
    });

    const collected = collectFromIR(ir);
    expect(collected.reactives).toHaveLength(1);
    expect(collected.reactives[0].node).toBe(node);
    expect(collected.reactives[0].binding).toBe(binding);
    expect(collected.refs).toHaveLength(1);
    expect(collected.refs[0].token).toBe(token);
    expect(collected.actions).toHaveLength(1);
    expect(collected.secrets).toHaveLength(1);
    expect(collected.secrets[0].key).toBe('wifi_password');
    expect(collected.triggerVars).toHaveLength(1);
    expect(collected.triggerVars[0].name).toBe('x');
  });

  it('collectReactiveNodes returns the same nodes as ir.reactiveNodes', () => {
    const node = makeMemoNode(0);
    const scalar = lambdaScalar('return espcompose::memo_0.get();');

    const captures = emptyCaptures();
    captures.reactives.set(scalar, node);

    const config = {
      lvgl: { label: { id: 'w1', text: scalar } },
    };

    const ir = buildSemanticIR({
      config,
      captures,
      bindings: [],
      entities: [],
      components: [],
      scripts: [],
      reactiveNodes: [node],
    });

    const treeNodes = collectReactiveNodes(ir);
    expect(treeNodes).toHaveLength(1);
    expect(treeNodes[0]).toBe(node);
  });

  it('collectBindings matches ir.bindings for bound reactives', () => {
    const node = makeMemoNode(0);
    const scalar = lambdaScalar('return espcompose::memo_0.get();');

    const captures = emptyCaptures();
    captures.reactives.set(scalar, node);

    const binding: ReactiveBinding = {
      targetId: 'lbl_1',
      targetType: 'label',
      targetProp: 'text',
      expression: node,
    };

    const config = {
      lvgl: { label: { id: 'lbl_1', text: scalar } },
    };

    const ir = buildSemanticIR({
      config,
      captures,
      bindings: [binding],
      entities: [],
      components: [],
      scripts: [],
      reactiveNodes: [node],
    });

    const treeBindings = collectBindings(ir);
    expect(treeBindings).toHaveLength(1);
    expect(treeBindings[0]).toBe(binding);
  });

  it('returns empty collections for a plain config', () => {
    const config = {
      esphome: { name: 'test', platform: 'ESP32' },
    };

    const ir = buildSemanticIR({
      config,
      captures: emptyCaptures(),
      bindings: [],
      entities: [],
      components: [],
      scripts: [],
      reactiveNodes: [],
    });

    const collected = collectFromIR(ir);
    expect(collected.reactives).toHaveLength(0);
    expect(collected.refs).toHaveLength(0);
    expect(collected.actions).toHaveLength(0);
    expect(collected.secrets).toHaveLength(0);
    expect(collected.triggerVars).toHaveLength(0);
  });
});
