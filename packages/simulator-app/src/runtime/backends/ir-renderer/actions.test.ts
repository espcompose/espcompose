import { describe, it, expect } from 'vitest';
import { interpretActionSteps } from './actions';
import type { IRActionNode } from '@espcompose/core/internals';
import type { HAServiceActionStep } from '../../types';

describe('interpretActionSteps', () => {
  describe('ha_service actions', () => {
    it('resolves entity_id from IRLiteralParam', () => {
      const actions: IRActionNode[] = [
        {
          kind: 'ha_service',
          action: 'light.toggle',
          data: { entity_id: { kind: 'literal', value: 'light.office' } },
        },
      ];
      const steps = interpretActionSteps(actions);
      expect(steps).toHaveLength(1);
      expect(steps[0]).toMatchObject({
        type: 'ha_service',
        action: 'light.toggle',
        entityId: 'light.office',
      });
      expect((steps[0] as HAServiceActionStep).data).toMatchObject({ entity_id: 'light.office' });
    });

    it('resolves entity_id from plain string (legacy format)', () => {
      const actions: IRActionNode[] = [
        {
          kind: 'ha_service',
          action: 'switch.turn_on',
          data: { entity_id: 'switch.relay' as unknown },
        } as IRActionNode,
      ];
      const steps = interpretActionSteps(actions);
      expect(steps).toHaveLength(1);
      expect(steps[0]).toMatchObject({
        type: 'ha_service',
        action: 'switch.turn_on',
        entityId: 'switch.relay',
      });
    });

    it('resolves additional data params from IRLiteralParam', () => {
      const actions: IRActionNode[] = [
        {
          kind: 'ha_service',
          action: 'light.turn_on',
          data: {
            entity_id: { kind: 'literal', value: 'light.office' },
            brightness: { kind: 'literal', value: 200 },
          },
        },
      ];
      const steps = interpretActionSteps(actions);
      expect(steps).toHaveLength(1);
      expect((steps[0] as HAServiceActionStep).data).toMatchObject({
        entity_id: 'light.office',
        brightness: 200,
      });
    });

    it('handles homeassistant.toggle action (dynamic binding)', () => {
      const actions: IRActionNode[] = [
        {
          kind: 'ha_service',
          action: 'homeassistant.toggle',
          data: { entity_id: { kind: 'literal', value: 'light.gym' } },
        },
      ];
      const steps = interpretActionSteps(actions);
      expect(steps).toHaveLength(1);
      expect(steps[0]).toMatchObject({
        type: 'ha_service',
        action: 'homeassistant.toggle',
        entityId: 'light.gym',
      });
    });

    it('falls back to empty entityId for unresolved expression params', () => {
      const actions: IRActionNode[] = [
        {
          kind: 'ha_service',
          action: 'homeassistant.toggle',
          data: { entity_id: { kind: 'expression', jsExpression: 'props.binding.__entityId__' } },
        },
      ];
      const steps = interpretActionSteps(actions);
      expect(steps).toHaveLength(1);
      expect(steps[0]).toMatchObject({
        type: 'ha_service',
        action: 'homeassistant.toggle',
        entityId: '',
      });
    });

    it('handles missing data gracefully', () => {
      const actions: IRActionNode[] = [
        {
          kind: 'ha_service',
          action: 'light.toggle',
        },
      ];
      const steps = interpretActionSteps(actions);
      expect(steps).toHaveLength(1);
      expect(steps[0]).toMatchObject({
        type: 'ha_service',
        action: 'light.toggle',
        entityId: '',
      });
    });
  });

  describe('other action types', () => {
    it('interprets delay actions', () => {
      const actions: IRActionNode[] = [{ kind: 'delay', duration: '500ms' }];
      const steps = interpretActionSteps(actions);
      expect(steps).toHaveLength(1);
      expect(steps[0]).toMatchObject({ type: 'delay', duration: '500ms' });
    });

    it('interprets logger actions', () => {
      const actions: IRActionNode[] = [{ kind: 'logger', message: 'hello', level: 'INFO' }];
      const steps = interpretActionSteps(actions);
      expect(steps).toHaveLength(1);
      expect(steps[0]).toMatchObject({ type: 'log', message: 'hello', level: 'INFO' });
    });

    it('interprets theme_select actions', () => {
      const actions: IRActionNode[] = [{ kind: 'theme_select', themeName: 'dark' }];
      const steps = interpretActionSteps(actions);
      expect(steps).toHaveLength(1);
      expect(steps[0]).toMatchObject({ type: 'theme_select', themeName: 'dark' });
    });
  });
});
