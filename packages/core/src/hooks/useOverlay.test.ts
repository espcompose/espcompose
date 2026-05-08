import { describe, it, expect } from 'vitest';
import { withScriptScope } from './useScript';
import {
  withOverlayScope,
  useOverlay,
  OVERLAY_TEMPLATE_KEY,
  OVERLAY_INSTANCE_INDEX,
} from './useOverlay';
import { pushHookPath, popHookPath, getCurrentHookPath } from './useState';
import { LvglContext } from './useLvgl';
import { withContext } from './useContext';

/** Push a fake LvglContext so useOverlay()'s lvgl-tree guard is satisfied. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- test mock
const mockLvglRef = { toString: () => 'r_test_lvgl' } as any;
function withLvgl<T>(fn: () => T): T {
  return withContext(LvglContext, mockLvglRef, fn);
}

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

  it('throws when called outside an lvgl tree', () => {
    expect(() =>
      withScriptScope(() => withOverlayScope(() => {
        callInsideComponent('Foo', () => useOverlay({}, () => ({ type: 'div', props: {}, __source: undefined as never })));
      })),
    ).toThrow(/inside an <lvgl> tree/);
  });

  it('throws when called outside an overlay scope', () => {
    expect(() =>
      withScriptScope(() => withLvgl(() => {
        callInsideComponent('Foo', () => useOverlay({}, () => ({ type: 'div', props: {}, __source: undefined as never })));
      })),
    ).toThrow(/overlay scope frame/);
  });

  it('deduplicates by hook path: 4 instances of one component → 1 definition with 4 instances', () => {
    let evaluations = 0;
    const { result: { overlays } } = withScriptScope(() => withLvgl(() => withOverlayScope(() => {
      const stub = { type: 'div', props: {}, __source: undefined as never };
      for (let i = 0; i < 4; i++) {
        callInsideComponent('LightButton', () => {
          useOverlay({}, () => {
            evaluations++;
            return stub;
          });
        });
      }
    })));
    // The factory is evaluated once per instance — captures per-instance closures.
    expect(evaluations).toBe(4);
    expect(overlays).toHaveLength(1);
    expect(overlays[0].templateKey).toMatch(/^ovrl_/);
    expect(overlays[0].instances).toHaveLength(4);
    expect(overlays[0].instances.map(i => i.index)).toEqual([0, 1, 2, 3]);
  });

  it('separates definitions for different component identities', () => {
    const { result: { overlays } } = withScriptScope(() => withLvgl(() => withOverlayScope(() => {
      const stub = { type: 'div', props: {}, __source: undefined as never };
      callInsideComponent('LightButton', () => { useOverlay({}, () => stub); });
      callInsideComponent('SwitchButton', () => { useOverlay({}, () => stub); });
      callInsideComponent('LightButton', () => { useOverlay({}, () => stub); });
    })));
    expect(overlays).toHaveLength(2);
    // Two distinct definitions — order follows insertion order (LightButton first)
    expect(overlays[0].instances).toHaveLength(2);
    expect(overlays[1].instances).toHaveLength(1);
  });

  it('returns a controller with templateKey and instanceIndex per call', () => {
    const controllers: Array<{ key: string; idx: number }> = [];
    withScriptScope(() => withLvgl(() => withOverlayScope(() => {
      const stub = { type: 'div', props: {}, __source: undefined as never };
      for (let i = 0; i < 3; i++) {
        callInsideComponent('Card', () => {
          const ctrl = useOverlay({}, () => stub);
          const internal = ctrl as unknown as { [OVERLAY_TEMPLATE_KEY]: string; [OVERLAY_INSTANCE_INDEX]: number };
          controllers.push({ key: internal[OVERLAY_TEMPLATE_KEY], idx: internal[OVERLAY_INSTANCE_INDEX] });
        });
      }
    })));
    expect(controllers.map(c => c.idx)).toEqual([0, 1, 2]);
    // All instances share the same templateKey
    expect(new Set(controllers.map(c => c.key)).size).toBe(1);
  });

  it('controller.show()/hide() throw at runtime (compile-time markers)', () => {
    let savedCtrl: { show: () => void; hide: () => void } | undefined;
    withScriptScope(() => withLvgl(() => withOverlayScope(() => {
      callInsideComponent('Foo', () => {
        savedCtrl = useOverlay({}, () => ({ type: 'div', props: {}, __source: undefined as never }));
      });
    })));
    expect(() => savedCtrl!.show()).toThrow(/compile-time/);
    expect(() => savedCtrl!.hide()).toThrow(/compile-time/);
  });

  it('two useOverlay() calls in the same component produce two definitions', () => {
    const { result: { overlays } } = withScriptScope(() => withLvgl(() => withOverlayScope(() => {
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
    })));
    // Two definitions (one per call site), each with 2 instances
    expect(overlays).toHaveLength(2);
    expect(overlays[0].instances).toHaveLength(2);
    expect(overlays[1].instances).toHaveLength(2);
    // Different template keys
    expect(overlays[0].templateKey).not.toBe(overlays[1].templateKey);
    // Both start with the ovrl_ prefix
    expect(overlays[0].templateKey).toMatch(/^ovrl_/);
    expect(overlays[1].templateKey).toMatch(/^ovrl_/);
  });

  it('stores zOrder on definitions from config', () => {
    const { result: { overlays } } = withScriptScope(() => withLvgl(() => withOverlayScope(() => {
      const stub = { type: 'div', props: {}, __source: undefined as never };
      callInsideComponent('PopupWidget', () => { useOverlay({ zOrder: 0 }, () => stub); });
      callInsideComponent('ToastWidget', () => { useOverlay({ zOrder: 100 }, () => stub); });
    })));
    expect(overlays).toHaveLength(2);
    // Order follows insertion: PopupWidget first (zOrder: 0), ToastWidget second (zOrder: 100)
    expect(overlays[0].zOrder).toBe(0);
    expect(overlays[1].zOrder).toBe(100);
  });
});
