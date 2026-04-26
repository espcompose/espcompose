import { describe, it, expect } from 'vitest';
import { withScriptScope } from './hooks/useScript';
import { withOverlayScope, useOverlay } from './hooks/useOverlay';
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

describe('useOverlay', () => {
  function callInsideComponent<T>(componentName: string, fn: () => T): T {
    pushHookPath(componentName);
    try {
      return fn();
    } finally {
      popHookPath();
    }
  }

  it('throws when called outside a hook context', () => {
    expect(() => useOverlay({}, () => null as never)).toThrow(/inside a function component/);
  });

  it('throws when called outside an overlay scope', () => {
    expect(() =>
      withScriptScope(() => {
        callInsideComponent('Foo', () => useOverlay({}, () => ({ type: 'div', props: {}, __source: undefined as never })));
      }),
    ).toThrow(/overlay scope frame/);
  });

  it('deduplicates by hook path: 4 instances of one component → 1 definition with 4 instances', () => {
    let evaluations = 0;
    const { result: { overlays } } = withScriptScope(() => withOverlayScope(() => {
      const stub = { type: 'div', props: {}, __source: undefined as never };
      for (let i = 0; i < 4; i++) {
        callInsideComponent('LightButton', () => {
          useOverlay({}, () => {
            evaluations++;
            return stub;
          });
        });
      }
    }));
    // The factory is evaluated once per instance — captures per-instance closures.
    expect(evaluations).toBe(4);
    expect(overlays).toHaveLength(1);
    expect(overlays[0].templateKey).toContain('LightButton');
    expect(overlays[0].instances).toHaveLength(4);
    expect(overlays[0].instances.map(i => i.index)).toEqual([0, 1, 2, 3]);
  });

  it('separates definitions for different component identities', () => {
    const { result: { overlays } } = withScriptScope(() => withOverlayScope(() => {
      const stub = { type: 'div', props: {}, __source: undefined as never };
      callInsideComponent('LightButton', () => { useOverlay({}, () => stub); });
      callInsideComponent('SwitchButton', () => { useOverlay({}, () => stub); });
      callInsideComponent('LightButton', () => { useOverlay({}, () => stub); });
    }));
    expect(overlays).toHaveLength(2);
    const lightDef = overlays.find(p => p.templateKey.includes('LightButton'));
    const switchDef = overlays.find(p => p.templateKey.includes('SwitchButton'));
    expect(lightDef?.instances).toHaveLength(2);
    expect(switchDef?.instances).toHaveLength(1);
  });

  it('returns a controller with templateKey and instanceIndex per call', () => {
    const controllers: Array<{ key: string; idx: number }> = [];
    withScriptScope(() => withOverlayScope(() => {
      const stub = { type: 'div', props: {}, __source: undefined as never };
      for (let i = 0; i < 3; i++) {
        callInsideComponent('Card', () => {
          const ctrl = useOverlay({}, () => stub);
          const internal = ctrl as unknown as { __templateKey: string; __instanceIndex: number };
          controllers.push({ key: internal.__templateKey, idx: internal.__instanceIndex });
        });
      }
    }));
    expect(controllers.map(c => c.idx)).toEqual([0, 1, 2]);
    // All instances share the same templateKey
    expect(new Set(controllers.map(c => c.key)).size).toBe(1);
  });

  it('controller.show()/hide() throw at runtime (compile-time markers)', () => {
    let savedCtrl: { show: () => void; hide: () => void } | undefined;
    withScriptScope(() => withOverlayScope(() => {
      callInsideComponent('Foo', () => {
        savedCtrl = useOverlay({}, () => ({ type: 'div', props: {}, __source: undefined as never }));
      });
    }));
    expect(() => savedCtrl!.show()).toThrow(/compile-time/);
    expect(() => savedCtrl!.hide()).toThrow(/compile-time/);
  });

  it('two useOverlay() calls in the same component produce two definitions', () => {
    const { result: { overlays } } = withScriptScope(() => withOverlayScope(() => {
      const stub = { type: 'div', props: {}, __source: undefined as never };
      // Instance A: two useOverlay calls
      callInsideComponent('LightSwitch', () => {
        useOverlay({}, () => stub);
        useOverlay({}, () => stub);
      });
      // Instance B: two useOverlay calls
      callInsideComponent('LightSwitch', () => {
        useOverlay({}, () => stub);
        useOverlay({}, () => stub);
      });
    }));
    // Two definitions (one per call site), each with 2 instances
    expect(overlays).toHaveLength(2);
    expect(overlays[0].instances).toHaveLength(2);
    expect(overlays[1].instances).toHaveLength(2);
    // Different template keys
    expect(overlays[0].templateKey).not.toBe(overlays[1].templateKey);
    // Both contain the component name
    expect(overlays[0].templateKey).toContain('LightSwitch');
    expect(overlays[1].templateKey).toContain('LightSwitch');
  });

  it('stores zOrder on definitions from config', () => {
    const { result: { overlays } } = withScriptScope(() => withOverlayScope(() => {
      const stub = { type: 'div', props: {}, __source: undefined as never };
      callInsideComponent('PopupWidget', () => { useOverlay({ zOrder: 0 }, () => stub); });
      callInsideComponent('ToastWidget', () => { useOverlay({ zOrder: 100 }, () => stub); });
    }));
    expect(overlays).toHaveLength(2);
    const popupDef = overlays.find(p => p.templateKey.includes('PopupWidget'));
    const toastDef = overlays.find(p => p.templateKey.includes('ToastWidget'));
    expect(popupDef?.zOrder).toBe(0);
    expect(toastDef?.zOrder).toBe(100);
  });
});
