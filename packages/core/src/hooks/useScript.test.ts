// Unit tests for the closure-shape helpers (classifyBindings,
// closureShapeSignature, buildClosureRow). These are pure functions that
// drive useScript()'s dedup correctness.

import { describe, it, expect } from 'vitest';
import {
  classifyBindings,
  closureShapeSignature,
  buildClosureRow,
} from './useScript';
import type { ClosureShape } from '../ir/types';

// ── Test helpers ────────────────────────────────────────────────────────────

function makeOverlayCtrl(templateKey: string, instanceIndex: number) {
  return {
    show() { /* noop */ },
    hide() { /* noop */ },
    __templateKey: templateKey,
    __instanceIndex: instanceIndex,
    __zOrder: 100,
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

// ── classifyBindings ────────────────────────────────────────────────────────

describe('classifyBindings', () => {
  it('returns empty shape for empty bindings', () => {
    expect(classifyBindings({})).toEqual({ fields: [] });
  });

  it('skips bindings with no matching descriptor', () => {
    const shape = classifyBindings({ junk: 42, str: 'abc' });
    expect(shape.fields).toEqual([]);
  });

  it('emits scalar field for overlay controller', () => {
    const ctrl = makeOverlayCtrl('toast', 0);
    const shape = classifyBindings({ ctrl });
    expect(shape.fields).toEqual([
      { name: 'ctrl_instance_index', valueType: { type: 'int' } },
    ]);
  });

  it('emits id_ref field for script handle', () => {
    const h = makeScriptHandle('do_thing');
    const shape = classifyBindings({ act: h });
    expect(shape.fields).toEqual([
      { name: 'act_idx', valueType: { type: 'int', format: 'id_ref' } },
    ]);
  });

  it('orders fields alphabetically by binding name', () => {
    const shape = classifyBindings({
      zCtrl: makeOverlayCtrl('z', 1),
      aCtrl: makeOverlayCtrl('a', 0),
      mAct: makeScriptHandle('m'),
    });
    expect(shape.fields.map((f) => f.name)).toEqual([
      'aCtrl_instance_index',
      'mAct_idx',
      'zCtrl_instance_index',
    ]);
  });

  it('mixes descriptor outputs in declaration order', () => {
    const shape = classifyBindings({
      light: makeScriptHandle('light_id'),
      overlay: makeOverlayCtrl('o', 2),
    });
    expect(shape.fields).toEqual([
      { name: 'light_idx', valueType: { type: 'int', format: 'id_ref' } },
      { name: 'overlay_instance_index', valueType: { type: 'int' } },
    ]);
  });
});

// ── closureShapeSignature ───────────────────────────────────────────────────

describe('closureShapeSignature', () => {
  it('returns empty string for empty shape', () => {
    expect(closureShapeSignature({ fields: [] })).toBe('');
  });

  it('produces a deterministic signature', () => {
    const shape: ClosureShape = {
      fields: [
        { name: 'a_idx', valueType: { type: 'int', format: 'id_ref' } },
        { name: 'b_instance_index', valueType: { type: 'int' } },
      ],
    };
    expect(closureShapeSignature(shape))
      .toBe('a_idx:int:id_ref,b_instance_index:int');
  });

  it('distinguishes shapes that differ only by format qualifier', () => {
    const a: ClosureShape = { fields: [{ name: 'x', valueType: { type: 'int' } }] };
    const b: ClosureShape = { fields: [{ name: 'x', valueType: { type: 'int', format: 'id_ref' } }] };
    expect(closureShapeSignature(a)).not.toBe(closureShapeSignature(b));
  });

  it('distinguishes shapes that differ only by field order', () => {
    const a: ClosureShape = {
      fields: [
        { name: 'x', valueType: { type: 'int' } },
        { name: 'y', valueType: { type: 'int' } },
      ],
    };
    const b: ClosureShape = {
      fields: [
        { name: 'y', valueType: { type: 'int' } },
        { name: 'x', valueType: { type: 'int' } },
      ],
    };
    expect(closureShapeSignature(a)).not.toBe(closureShapeSignature(b));
  });
});

// ── buildClosureRow ─────────────────────────────────────────────────────────

describe('buildClosureRow', () => {
  it('returns an empty row when shape has no fields', () => {
    const ctrl = makeOverlayCtrl('toast', 0);
    const row = buildClosureRow({ ctrl }, { fields: [] });
    expect(row.values).toEqual({});
  });

  it('populates a row with the correct value per descriptor', () => {
    const ctrl = makeOverlayCtrl('toast', 5);
    const shape = classifyBindings({ ctrl });
    const row = buildClosureRow({ ctrl }, shape);
    expect(row.values).toEqual({
      ctrl_instance_index: { kind: 'int', value: 5 },
    });
  });

  it('skips bindings with no descriptor', () => {
    const ctrl = makeOverlayCtrl('toast', 1);
    const shape = classifyBindings({ ctrl, junk: 42 });
    const row = buildClosureRow({ ctrl, junk: 42 }, shape);
    expect(Object.keys(row.values)).toEqual(['ctrl_instance_index']);
  });

  it('produces id_ref values for script handles', () => {
    const h = makeScriptHandle('act');
    const shape = classifyBindings({ act: h });
    const row = buildClosureRow({ act: h }, shape);
    expect(row.values).toEqual({
      act_idx: { kind: 'id_ref', id: 'act' },
    });
  });

  it('different per-instance values produce different rows for the same shape', () => {
    const ctrlA = makeOverlayCtrl('toast', 0);
    const ctrlB = makeOverlayCtrl('toast', 1);
    const shape = classifyBindings({ ctrl: ctrlA });

    const rowA = buildClosureRow({ ctrl: ctrlA }, shape);
    const rowB = buildClosureRow({ ctrl: ctrlB }, shape);

    expect(rowA.values.ctrl_instance_index).toEqual({ kind: 'int', value: 0 });
    expect(rowB.values.ctrl_instance_index).toEqual({ kind: 'int', value: 1 });
    // Same shape signature → same template, distinct rows
    expect(closureShapeSignature(shape))
      .toBe(closureShapeSignature(classifyBindings({ ctrl: ctrlB })));
  });
});
