import { describe, it, expect, beforeEach } from 'vitest';
import { MockProvider } from '@espcompose/simulator-app/runtime';

let provider: MockProvider;

beforeEach(() => {
  provider = new MockProvider();
});

describe('MockProvider', () => {
  it('auto-creates entity with default state for domain', () => {
    const state = provider.getEntityState('light.kitchen');
    expect(state.state).toBe('off');
    expect(state.domain).toBe('light');
  });

  it('updates entity state', () => {
    provider.setEntityState('light.kitchen', { state: 'on', attributes: { brightness: 200 } });
    const state = provider.getEntityState('light.kitchen');
    expect(state.state).toBe('on');
    expect(state.attributes.brightness).toBe(200);
  });

  it('notifies listeners on change', () => {
    const log: string[] = [];
    provider.onEntityChange('light.kitchen', (s) => log.push(s.state));
    provider.setEntityState('light.kitchen', { state: 'on' });
    expect(log).toEqual(['on']);
  });

  it('unsubscribes listener', () => {
    const log: string[] = [];
    const unsub = provider.onEntityChange('light.kitchen', (s) => log.push(s.state));
    provider.setEntityState('light.kitchen', { state: 'on' });
    unsub();
    provider.setEntityState('light.kitchen', { state: 'off' });
    expect(log).toEqual(['on']);
  });

  it('handles light.toggle service call', () => {
    provider.ensureEntity('light.kitchen');
    expect(provider.getEntityState('light.kitchen').state).toBe('off');
    provider.callService('light', 'toggle', 'light.kitchen');
    expect(provider.getEntityState('light.kitchen').state).toBe('on');
    provider.callService('light', 'toggle', 'light.kitchen');
    expect(provider.getEntityState('light.kitchen').state).toBe('off');
  });

  it('handles switch.turn_on and turn_off', () => {
    provider.ensureEntity('switch.heater');
    provider.callService('switch', 'turn_on', 'switch.heater');
    expect(provider.getEntityState('switch.heater').state).toBe('on');
    provider.callService('switch', 'turn_off', 'switch.heater');
    expect(provider.getEntityState('switch.heater').state).toBe('off');
  });

  it('handles sensor domain with numeric default', () => {
    const state = provider.getEntityState('sensor.temperature');
    expect(state.state).toBe('0');
    expect(state.domain).toBe('sensor');
  });

  it('reset restores defaults', () => {
    provider.setEntityState('light.kitchen', { state: 'on' });
    provider.reset();
    expect(provider.getEntityState('light.kitchen').state).toBe('off');
  });

  it('lists all entity ids', () => {
    provider.ensureEntity('light.a');
    provider.ensureEntity('sensor.b');
    expect(provider.getEntityIds().sort()).toEqual(['light.a', 'sensor.b']);
  });
});
