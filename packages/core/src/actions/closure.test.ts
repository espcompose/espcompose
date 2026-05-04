import { describe, it, expect } from 'vitest';
import {
  findClosureDescriptor,
  overlayControllerDescriptor,
  scriptHandleDescriptor,
  identityDescriptor,
} from './closure';
import { IR_ID_REF, IR_INT } from '../ir/types';
import {
  OVERLAY_TEMPLATE_KEY,
  OVERLAY_INSTANCE_INDEX,
  OVERLAY_Z_ORDER,
} from '../hooks/useOverlay';

// ── Mock helpers ────────────────────────────────────────────────────────────

function makeOverlayCtrl(templateKey: string, instanceIndex: number, zOrder = 0) {
  return {
    show() { /* noop */ },
    hide() { /* noop */ },
    [OVERLAY_TEMPLATE_KEY]: templateKey,
    [OVERLAY_INSTANCE_INDEX]: instanceIndex,
    [OVERLAY_Z_ORDER]: zOrder,
  };
}

function makeScriptHandle(id: string) {
  const fn = function scriptCall() { /* noop */ } as unknown as {
    id: string; execute: () => void; stop: () => void;
  };
  Object.defineProperties(fn, {
    id: { value: id },
    execute: { value: () => { /* noop */ } },
    stop: { value: () => { /* noop */ } },
  });
  return fn;
}

// ── Tests ───────────────────────────────────────────────────────────────────

describe('ClosureDescriptor — OverlayController', () => {
  it('matches overlay controllers', () => {
    const ctrl = makeOverlayCtrl('toast_abc', 2, 100);
    expect(overlayControllerDescriptor.match(ctrl)).toBe(true);
  });

  it('does not match plain objects', () => {
    expect(overlayControllerDescriptor.match({ foo: 'bar' })).toBe(false);
    expect(overlayControllerDescriptor.match(null)).toBe(false);
    expect(overlayControllerDescriptor.match(42)).toBe(false);
  });

  it('closure key is based on templateKey', () => {
    const ctrl0 = makeOverlayCtrl('toast_abc', 0, 100);
    const ctrl1 = makeOverlayCtrl('toast_abc', 1, 100);
    const ctrlOther = makeOverlayCtrl('popup_xyz', 0, 0);

    expect(overlayControllerDescriptor.toClosureKey(ctrl0)).toBe('overlay:toast_abc');
    expect(overlayControllerDescriptor.toClosureKey(ctrl1)).toBe('overlay:toast_abc');
    expect(overlayControllerDescriptor.toClosureKey(ctrlOther)).toBe('overlay:popup_xyz');

    // Same template → same key (will dedup)
    expect(overlayControllerDescriptor.toClosureKey(ctrl0))
      .toBe(overlayControllerDescriptor.toClosureKey(ctrl1));
  });
});

describe('ClosureDescriptor — ScriptHandle', () => {
  it('matches script handles', () => {
    const handle = makeScriptHandle('my_script');
    expect(scriptHandleDescriptor.match(handle)).toBe(true);
  });

  it('does not match plain functions', () => {
    expect(scriptHandleDescriptor.match(() => { /* noop */ })).toBe(false);
  });

  it('closure key is based on script id', () => {
    const handle = makeScriptHandle('activate');
    expect(scriptHandleDescriptor.toClosureKey(handle)).toBe('script:activate');
  });
});

describe('ClosureDescriptor — Identity fallback', () => {
  it('matches anything', () => {
    expect(identityDescriptor.match(42)).toBe(true);
    expect(identityDescriptor.match('hello')).toBe(true);
    expect(identityDescriptor.match(null)).toBe(true);
    expect(identityDescriptor.match(undefined)).toBe(true);
  });

  it('closure key uses JSON.stringify', () => {
    expect(identityDescriptor.toClosureKey(42)).toBe('identity:42');
    expect(identityDescriptor.toClosureKey('hello')).toBe('identity:"hello"');
  });
});

describe('findClosureDescriptor', () => {
  it('returns overlay descriptor for overlay controllers', () => {
    const ctrl = makeOverlayCtrl('test', 0);
    expect(findClosureDescriptor(ctrl)).toBe(overlayControllerDescriptor);
  });

  it('returns script handle descriptor for script handles', () => {
    const handle = makeScriptHandle('test');
    expect(findClosureDescriptor(handle)).toBe(scriptHandleDescriptor);
  });

  it('returns null for plain values that no descriptor matches', () => {
    expect(findClosureDescriptor(42)).toBeNull();
    expect(findClosureDescriptor('hello')).toBeNull();
  });
});

// ── Canonical closure-shape protocol ──────────────────────────────────────

describe('ClosureDescriptor — canonical protocol (toClosureField/toClosureValue)', () => {
  it('overlay controller declares scalar instance_index field', () => {
    const ctrl = makeOverlayCtrl('toast_abc', 7);
    expect(overlayControllerDescriptor.irType).toEqual(IR_INT);
    const field = overlayControllerDescriptor.toClosureField?.('myCtrl', ctrl);
    expect(field).toEqual({ kind: 'closure_field', name: 'myCtrl_instance_index', irType: IR_INT });
    expect(overlayControllerDescriptor.toClosureValue?.(ctrl))
      .toEqual({ kind: 'scalar', value: 7 });
  });

  it('script handle declares id_ref field with int storage (index into lookup table)', () => {
    const handle = makeScriptHandle('activate');
    expect(scriptHandleDescriptor.irType).toEqual(IR_ID_REF);
    const field = scriptHandleDescriptor.toClosureField?.('act', handle);
    expect(field).toEqual({ kind: 'closure_field', name: 'act_idx', irType: IR_ID_REF });
    expect(scriptHandleDescriptor.toClosureValue?.(handle))
      .toEqual({ kind: 'scalar', value: 'activate' });
  });
});
