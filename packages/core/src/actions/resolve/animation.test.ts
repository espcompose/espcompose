import { describe, it, expect } from 'vitest';
import { resolveAnimationControllerRefs, cleanAnimationControllerRefs } from './animation';
import type { IRActionNode } from '../../ir/action-types';
import { irAnimationStart, irAnimationStop } from '../../ir/action-types';
import { ANIMATION_ID } from './symbols';

describe('resolveAnimationControllerRefs', () => {
  it('resolves animation_start controllerRef to animationId', () => {
    const actions: IRActionNode[] = [
      irAnimationStart('', 'fadeIn'),
    ];
    const refBindings = {
      fadeIn: { [ANIMATION_ID]: 'anim_abc123' },
    };
    resolveAnimationControllerRefs(actions, refBindings);
    expect(actions[0]).toMatchObject({
      kind: 'action:animation_start',
      animationId: 'anim_abc123',
    });
    expect((actions[0] as { controllerRef?: string }).controllerRef).toBeUndefined();
  });

  it('resolves animation_stop controllerRef to animationId', () => {
    const actions: IRActionNode[] = [
      irAnimationStop('', 'fadeOut'),
    ];
    const refBindings = {
      fadeOut: { [ANIMATION_ID]: 'anim_xyz789' },
    };
    resolveAnimationControllerRefs(actions, refBindings);
    expect(actions[0]).toMatchObject({
      kind: 'action:animation_stop',
      animationId: 'anim_xyz789',
    });
  });

  it('resolves through nested if/while/repeat', () => {
    const actions: IRActionNode[] = [
      {
        kind: 'action:if',
        condition: { kind: 'lambda', code: 'true' },
        then: [irAnimationStart('', 'anim')],
        else: [irAnimationStop('', 'anim')],
      },
    ];
    const refBindings = {
      anim: { [ANIMATION_ID]: 'anim_nested' },
    };
    resolveAnimationControllerRefs(actions, refBindings);
    const ifAction = actions[0] as { then: IRActionNode[]; else: IRActionNode[] };
    expect(ifAction.then[0]).toMatchObject({ animationId: 'anim_nested' });
    expect(ifAction.else[0]).toMatchObject({ animationId: 'anim_nested' });
  });

  it('is a no-op when refBindings is undefined', () => {
    const actions: IRActionNode[] = [irAnimationStart('', 'fadeIn')];
    resolveAnimationControllerRefs(actions, undefined);
    expect((actions[0] as { controllerRef?: string }).controllerRef).toBe('fadeIn');
  });
});

describe('cleanAnimationControllerRefs', () => {
  it('removes animation controller objects from refBindings', () => {
    const refBindings: Record<string, unknown> = {
      fadeIn: { [ANIMATION_ID]: 'anim_abc' },
      widgetRef: 'r_widget_123',
    };
    cleanAnimationControllerRefs(refBindings);
    expect(refBindings).toEqual({ widgetRef: 'r_widget_123' });
  });

  it('preserves non-animation entries', () => {
    const refBindings: Record<string, unknown> = {
      someRef: 'r_abc',
      someObj: { kind: 'controller' },
    };
    cleanAnimationControllerRefs(refBindings);
    expect(Object.keys(refBindings)).toHaveLength(2);
  });
});
