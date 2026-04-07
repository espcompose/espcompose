/**
 * Test: switch state:{checked} reactive binding detection
 *
 * Verify that when a <lvgl-switch> element has x:custom={{ state: { checked: <reactive> } }},
 * the reactive node is detected by collectReactiveProps and registered as a binding.
 */
import { describe, it, expect } from 'vitest';
import { IRReactiveNode, isIRReactiveNode } from './reactive-node';
import { withReactiveScope } from './hooks/useReactiveScope';
import { jsx } from './jsx-runtime';
import { lvglWidgetToPlain } from './lvgl';

describe('lvgl-switch state:checked reactive binding', () => {
  it('registers a checked binding for reactive node inside state wrapper', () => {
    const { bindings } = withReactiveScope(() => {
      // Create a reactive node mimicking a HA entity signal
      const reactiveNode = new IRReactiveNode({
        kind: 'expression',
        dependencies: [{
          kind: 'dependency',
          sourceId: 'ha_light_office',
          triggerType: 'on_state',
          sourceDomain: 'binary_sensor',
        }],
        exprType: 'bool',
      });

      // Create a <lvgl-switch> element with x:custom state wrapper
      const switchEl = jsx('lvgl-switch', {
        'x:custom': {
          state: { checked: reactiveNode },
          on_change: [{ 'homeassistant.action': { action: 'homeassistant.toggle', data: { entity_id: 'light.office' } } }],
        },
      });

      // Process the element through lvglWidgetToPlain
      const result = lvglWidgetToPlain(switchEl);

      return result;
    });

    // Verify a binding was registered for the checked prop
    expect(bindings.length).toBeGreaterThan(0);
    const checkedBinding = bindings.find(b => b.targetProp === 'checked');
    expect(checkedBinding).toBeDefined();
    expect(checkedBinding!.targetType).toBe('switch');
    expect(isIRReactiveNode(checkedBinding!.expression)).toBe(true);
    expect(checkedBinding!.targetId).toBeDefined();
    expect(checkedBinding!.targetId).toMatch(/^rw_/); // auto-assigned ID
  });

  it('registers binding for direct reactive node on switch (no state wrapper)', () => {
    const { bindings } = withReactiveScope(() => {
      const reactiveNode = new IRReactiveNode({
        kind: 'expression',
        dependencies: [{
          kind: 'dependency',
          sourceId: 'ha_light_office',
          triggerType: 'on_state',
          sourceDomain: 'binary_sensor',
        }],
        exprType: 'bool',
      });

      // Directly on the element (not inside state wrapper)
      const labelEl = jsx('lvgl-label', {
        text: reactiveNode,
      });

      return lvglWidgetToPlain(labelEl);
    });

    const textBinding = bindings.find(b => b.targetProp === 'text');
    expect(textBinding).toBeDefined();
    expect(textBinding!.targetType).toBe('label');
  });
});
