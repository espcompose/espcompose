import { describe, it, expect } from 'vitest';
import { IRReactiveNode } from '../reactive-node';
import { RefHandle } from '../types';
import type { IRBinding, IRHAEntity, IRComponent } from '../hooks/useReactiveScope';
import type { SerializationCaptures } from '../serialize';
import type { IRActionNode } from './action-types';
import { buildSemanticIR } from './build';
import { collectFromIR } from './traverse';

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

function makeMemoNode(index: number): IRReactiveNode {
  const node = new IRReactiveNode({
    kind: 'memo',
    dependencies: [
      { kind: 'dependency', sourceId: 'ha_light_x', triggerType: 'on_state', sourceDomain: 'binary_sensor' },
    ],
    exprType: 'float',
  });
  node.exprIR = { kind: 'ternary', test: { kind: 'signal_read', signalIndex: 0 }, consequent: { kind: 'literal', value: 1.0, type: 'float' }, alternate: { kind: 'literal', value: 0.0, type: 'float' } };
  void index; // index no longer needed; nodeId is assigned at construction
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

    expect(ir.esphome.sections).toHaveLength(2);
    expect(ir.esphome.sections[0].key).toBe('esphome');
    expect(ir.esphome.sections[1].key).toBe('wifi');
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

    const esphome = ir.esphome.sections[0].value;
    expect(esphome.kind).toBe('object');
    if (esphome.kind === 'object') {
      expect(esphome.entries.find(e => e.key === 'name')?.value).toEqual({ kind: 'scalar', value: 'test' });
      expect(esphome.entries.find(e => e.key === 'port')?.value).toEqual({ kind: 'scalar', value: 6053 });
      expect(esphome.entries.find(e => e.key === 'enabled')?.value).toEqual({ kind: 'scalar', value: true });
    }
  });

  it('captures IRReactiveNode from serialized Scalar via captures map', () => {
    const node = makeMemoNode(0);
    const scalar = lambdaScalar('return espcompose::memo_0.get();');

    const captures = emptyCaptures();
    captures.reactives.set(scalar, node);

    const binding: IRBinding = {
      kind: 'binding',
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
      reactiveNodes: [],
    });

    // Walk to the label text value
    const lvgl = ir.esphome.sections[0].value;
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

    const sensor = ir.esphome.sections[0].value;
    if (sensor.kind !== 'object') return;
    const i2cVal = sensor.entries.find(e => e.key === 'i2c_id')?.value;

    expect(i2cVal?.kind).toBe('ref');
    if (i2cVal?.kind !== 'ref') return;
    expect(i2cVal.token).toBe(token);
  });

  it('captures compiled action metadata', () => {
    const rawActions: IRActionNode[] = [{ kind: 'ha_service', action: 'light.toggle', data: { entity_id: { kind: 'literal', value: 'light.kitchen' } } }];
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

    const lvgl = ir.esphome.sections[0].value;
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

    const wifi = ir.esphome.sections[0].value;
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

    const sensor = ir.esphome.sections[0].value;
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

    const esphome = ir.esphome.sections[0].value;
    if (esphome.kind !== 'object') return;
    const entry = esphome.entries.find(e => e.key === 'enabled');
    expect(entry?.value).toEqual({ kind: 'scalar', value: 'on', quoted: true });
  });

  it('preserves side-channel data', () => {
    const entity: IRHAEntity = {
      kind: 'ha_entity',
      entityId: 'light.kitchen',
      domain: 'light',
      sensorType: 'binary_sensor',
      generatedId: 'ha_light_kitchen',
    };

    const component: IRComponent = {
      kind: 'component',
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
      scripts: [{ id: 'script_1', then: [{ kind: 'delay', duration: '500ms' } satisfies IRActionNode] }],
      reactiveNodes: [],
      themes: {
        kind: 'theme_data',
        themeNames: ['light', 'dark'],
        defaultIndex: 0,
        leafData: new Map([['colors_primary', { values: [0xFF0000, 0x0000FF], valueType: 'int' }]]),
      },
    });

    expect(ir.esphome.haEntities).toEqual([entity]);
    expect(ir.esphome.components).toEqual([component]);
    expect(ir.esphome.scripts).toHaveLength(1);
    expect(ir.espcompose.themes?.themeNames).toEqual(['light', 'dark']);
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
    const rawActions: IRActionNode[] = [{ kind: 'ha_service', action: 'light.toggle' }];
    const actionArr = [{ 'homeassistant.service': { service: 'light.toggle' } }];

    const captures = emptyCaptures();
    captures.reactives.set(reactiveScalar, node);
    captures.secrets.set(secretVal, 'wifi_password');
    captures.triggerVars.set(triggerVal, { name: 'x' });
    captures.refs.set(token, ref);
    captures.actions.set(actionArr, { rawActions });

    const binding: IRBinding = {
      kind: 'binding',
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
      reactiveNodes: [],
    });

    const collected = collectFromIR(ir);
    expect(collected.reactives).toHaveLength(1);
    expect(collected.reactives[0].node).toBe(node);
    expect(collected.refs).toHaveLength(1);
    expect(collected.refs[0].token).toBe(token);
    expect(collected.actions).toHaveLength(1);
    expect(collected.secrets).toHaveLength(1);
    expect(collected.secrets[0].key).toBe('wifi_password');
    expect(collected.triggerVars).toHaveLength(1);
    expect(collected.triggerVars[0].name).toBe('x');
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
