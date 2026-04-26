import { describe, it, expect } from 'vitest';
import { structuralFingerprint, assertPopupStructuralIdentity } from './hooks/popup-fingerprint';
import type { EspComposeElement } from './types';

function el(type: string | ((...args: unknown[]) => unknown), props: Record<string, unknown> = {}, children?: EspComposeElement | EspComposeElement[]): EspComposeElement {
  const childArr = children === undefined ? undefined : Array.isArray(children) ? children : [children];
  return { type: type as never, props: { ...props, ...(childArr !== undefined ? { children: childArr } : {}) }, __source: undefined as never };
}

describe('structuralFingerprint', () => {
  it('produces identical fingerprints for trees that differ only in prop values', () => {
    const a = el('lvgl-label', { text: 'On' });
    const b = el('lvgl-label', { text: 'Off' });
    expect(structuralFingerprint(a)).toBe(structuralFingerprint(b));
  });

  it('differs when prop key sets differ', () => {
    const a = el('lvgl-button', { text: 'X' });
    const b = el('lvgl-button', { text: 'X', disabled: true });
    expect(structuralFingerprint(a)).not.toBe(structuralFingerprint(b));
  });

  it('differs when child counts differ', () => {
    const a = el('lvgl-obj', {}, [el('lvgl-label', { text: 'a' })]);
    const b = el('lvgl-obj', {}, [el('lvgl-label', { text: 'a' }), el('lvgl-label', { text: 'b' })]);
    expect(structuralFingerprint(a)).not.toBe(structuralFingerprint(b));
  });

  it('differs when child types differ', () => {
    const a = el('lvgl-obj', {}, [el('lvgl-slider', {})]);
    const b = el('lvgl-obj', {}, [el('lvgl-label', { text: 'X' })]);
    expect(structuralFingerprint(a)).not.toBe(structuralFingerprint(b));
  });

  it('uses function component name', () => {
    function Card() { return null as never; }
    function Button() { return null as never; }
    const a = el(Card, { variant: 'a' });
    const b = el(Card, { variant: 'b' });
    const c = el(Button, { variant: 'a' });
    expect(structuralFingerprint(a)).toBe(structuralFingerprint(b));
    expect(structuralFingerprint(a)).not.toBe(structuralFingerprint(c));
  });

  it('ignores ref prop in the structural set', () => {
    const a = el('lvgl-button', { text: 'X' });
    const b = el('lvgl-button', { text: 'X', ref: { current: null } });
    expect(structuralFingerprint(a)).toBe(structuralFingerprint(b));
  });
});

describe('assertPopupStructuralIdentity', () => {
  const wrap = (rendered: EspComposeElement) => ({ index: 0, rendered });

  it('passes when 0-1 instances', () => {
    expect(() => assertPopupStructuralIdentity('k', [])).not.toThrow();
    expect(() => assertPopupStructuralIdentity('k', [wrap(el('div'))])).not.toThrow();
  });

  it('passes when all instances structurally identical', () => {
    const inst = [
      { index: 0, rendered: el('lvgl-obj', {}, [el('lvgl-label', { text: 'A' })]) },
      { index: 1, rendered: el('lvgl-obj', {}, [el('lvgl-label', { text: 'B' })]) },
      { index: 2, rendered: el('lvgl-obj', {}, [el('lvgl-label', { text: 'C' })]) },
    ];
    expect(() => assertPopupStructuralIdentity('LightButton', inst)).not.toThrow();
  });

  it('throws on structural divergence with diagnostic', () => {
    const inst = [
      { index: 0, rendered: el('lvgl-obj', {}, [el('lvgl-slider', {}), el('lvgl-label', { text: 'X' })]) },
      { index: 1, rendered: el('lvgl-obj', {}, [el('lvgl-label', { text: 'Y' })]) },
    ];
    expect(() => assertPopupStructuralIdentity('LightButton', inst)).toThrow(
      /divergent structures.*Instance 0.*Instance 1/s,
    );
  });
});
