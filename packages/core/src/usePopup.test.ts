import { describe, it, expect } from 'vitest';
import { withScriptScope } from './hooks/useScript';
import { withPopupScope, usePopup } from './hooks/usePopup';
import { pushHookPath, popHookPath, getCurrentHookPath } from './hooks/useState';

describe('hook path stack', () => {
  it('joins pushed names with /', () => {
    withScriptScope(() => {
      // root: 'espcompose_script_render'
      pushHookPath('Outer');
      pushHookPath('Inner');
      expect(getCurrentHookPath()).toBe('espcompose_script_render/Outer/Inner');
      popHookPath();
      popHookPath();
      expect(getCurrentHookPath()).toBe('espcompose_script_render');
    });
  });

  it('clears the stack on setCurrentHookPath(null)', () => {
    withScriptScope(() => {
      pushHookPath('X');
      expect(getCurrentHookPath()).not.toBe('');
    });
    expect(getCurrentHookPath()).toBe('');
  });
});

describe('usePopup', () => {
  function callInsideComponent<T>(componentName: string, fn: () => T): T {
    pushHookPath(componentName);
    try {
      return fn();
    } finally {
      popHookPath();
    }
  }

  it('throws when called outside a hook context', () => {
    expect(() => usePopup(() => null as never)).toThrow(/inside a function component/);
  });

  it('throws when called outside a popup scope', () => {
    expect(() =>
      withScriptScope(() => {
        callInsideComponent('Foo', () => usePopup(() => ({ type: 'div', props: {}, __source: undefined as never })));
      }),
    ).toThrow(/popup scope frame/);
  });

  it('deduplicates by hook path: 4 instances of one component → 1 definition with 4 instances', () => {
    let evaluations = 0;
    const { result: { popups } } = withScriptScope(() => withPopupScope(() => {
      const stub = { type: 'div', props: {}, __source: undefined as never };
      for (let i = 0; i < 4; i++) {
        callInsideComponent('LightButton', () => {
          usePopup(() => {
            evaluations++;
            return stub;
          });
        });
      }
    }));
    // The factory is evaluated once per instance — captures per-instance closures.
    expect(evaluations).toBe(4);
    expect(popups).toHaveLength(1);
    expect(popups[0].templateKey).toContain('LightButton');
    expect(popups[0].instances).toHaveLength(4);
    expect(popups[0].instances.map(i => i.index)).toEqual([0, 1, 2, 3]);
  });

  it('separates definitions for different component identities', () => {
    const { result: { popups } } = withScriptScope(() => withPopupScope(() => {
      const stub = { type: 'div', props: {}, __source: undefined as never };
      callInsideComponent('LightButton', () => { usePopup(() => stub); });
      callInsideComponent('SwitchButton', () => { usePopup(() => stub); });
      callInsideComponent('LightButton', () => { usePopup(() => stub); });
    }));
    expect(popups).toHaveLength(2);
    const lightDef = popups.find(p => p.templateKey.includes('LightButton'));
    const switchDef = popups.find(p => p.templateKey.includes('SwitchButton'));
    expect(lightDef?.instances).toHaveLength(2);
    expect(switchDef?.instances).toHaveLength(1);
  });

  it('returns a controller with templateKey and instanceIndex per call', () => {
    const controllers: Array<{ key: string; idx: number }> = [];
    withScriptScope(() => withPopupScope(() => {
      const stub = { type: 'div', props: {}, __source: undefined as never };
      for (let i = 0; i < 3; i++) {
        callInsideComponent('Card', () => {
          const ctrl = usePopup(() => stub);
          const internal = ctrl as unknown as { __templateKey: string; __instanceIndex: number };
          controllers.push({ key: internal.__templateKey, idx: internal.__instanceIndex });
        });
      }
    }));
    expect(controllers.map(c => c.idx)).toEqual([0, 1, 2]);
    // All instances share the same templateKey
    expect(new Set(controllers.map(c => c.key)).size).toBe(1);
  });

  it('controller.show()/dismiss() throw at runtime (compile-time markers)', () => {
    let savedCtrl: { show: () => void; dismiss: () => void } | undefined;
    withScriptScope(() => withPopupScope(() => {
      callInsideComponent('Foo', () => {
        savedCtrl = usePopup(() => ({ type: 'div', props: {}, __source: undefined as never }));
      });
    }));
    expect(() => savedCtrl!.show()).toThrow(/compile-time/);
    expect(() => savedCtrl!.dismiss()).toThrow(/compile-time/);
  });

  it('two usePopup() calls in the same component produce two definitions', () => {
    const { result: { popups } } = withScriptScope(() => withPopupScope(() => {
      const stub = { type: 'div', props: {}, __source: undefined as never };
      // Instance A: two usePopup calls
      callInsideComponent('LightSwitch', () => {
        usePopup(() => stub);
        usePopup(() => stub);
      });
      // Instance B: two usePopup calls
      callInsideComponent('LightSwitch', () => {
        usePopup(() => stub);
        usePopup(() => stub);
      });
    }));
    // Two definitions (one per call site), each with 2 instances
    expect(popups).toHaveLength(2);
    expect(popups[0].instances).toHaveLength(2);
    expect(popups[1].instances).toHaveLength(2);
    // Different template keys
    expect(popups[0].templateKey).not.toBe(popups[1].templateKey);
    // Both contain the component name
    expect(popups[0].templateKey).toContain('LightSwitch');
    expect(popups[1].templateKey).toContain('LightSwitch');
  });
});
