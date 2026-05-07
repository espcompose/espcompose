import { describe, it, expect } from 'vitest';
import {
  classifyDisplay,
  resolveThemeSettings,
  adaptiveScreen,
  adaptiveInput,
  adaptiveShape,
} from './display';

// ── classifyDisplay ────────────────────────────────────────────────────────

describe('classifyDisplay', () => {
  it.each([
    [64, 'micro'],
    [127, 'micro'],
    [128, 'tiny'],
    [199, 'tiny'],
    [200, 'compact'],
    [240, 'compact'],
    [279, 'compact'],
    [280, 'medium'],
    [320, 'medium'],
    [399, 'medium'],
    [400, 'large'],
    [480, 'large'],
    [599, 'large'],
    [600, 'panel'],
    [800, 'panel'],
    [1024, 'panel'],
  ] as const)('shortest side %d → %s', (px, expected) => {
    expect(classifyDisplay(px)).toBe(expected);
  });
});

// ── resolveThemeSettings ───────────────────────────────────────────────────

describe('resolveThemeSettings', () => {
  it('fills defaults when called with no input', () => {
    const s = resolveThemeSettings();
    expect(s.width).toBe(320);
    expect(s.height).toBe(240);
    expect(s.shortestSide).toBe(240);
    expect(s.longestSide).toBe(320);
    expect(s.orientation).toBe('landscape');
    expect(s.shape).toBe('rect');
    expect(s.input).toBe('touch');
    expect(s.class).toBe('compact');
  });

  it('fills defaults when called with empty object', () => {
    const s = resolveThemeSettings({});
    expect(s.width).toBe(320);
    expect(s.height).toBe(240);
  });

  it('derives orientation from dimensions when not specified', () => {
    expect(resolveThemeSettings({ width: 320, height: 480 }).orientation).toBe('portrait');
    expect(resolveThemeSettings({ width: 480, height: 320 }).orientation).toBe('landscape');
    expect(resolveThemeSettings({ width: 240, height: 240 }).orientation).toBe('square');
  });

  it('uses explicit orientation when provided', () => {
    const s = resolveThemeSettings({ width: 480, height: 320, orientation: 'portrait' });
    expect(s.orientation).toBe('portrait');
  });

  it('computes shortestSide and longestSide', () => {
    const s = resolveThemeSettings({ width: 480, height: 320 });
    expect(s.shortestSide).toBe(320);
    expect(s.longestSide).toBe(480);
  });

  it('derives display class from shortest side', () => {
    expect(resolveThemeSettings({ width: 128, height: 64 }).class).toBe('micro');
    expect(resolveThemeSettings({ width: 480, height: 320 }).class).toBe('medium');
    expect(resolveThemeSettings({ width: 800, height: 600 }).class).toBe('panel');
  });

  it('passes through shape and input', () => {
    const s = resolveThemeSettings({ shape: 'round', input: 'rotary' });
    expect(s.shape).toBe('round');
    expect(s.input).toBe('rotary');
  });
});

// ── adaptiveScreen ─────────────────────────────────────────────────────────

describe('adaptiveScreen', () => {
  it('returns matching class value', () => {
    const result = adaptiveScreen(
      { width: 128, height: 64 },
      { micro: 1, default: 4 },
    );
    expect(result).toBe(1);
  });

  it('falls back to default for unmatched class', () => {
    const result = adaptiveScreen(
      { width: 480, height: 320 },
      { micro: 1, default: 4 },
    );
    expect(result).toBe(4);
  });

  it('handles no width/height (uses defaults)', () => {
    const result = adaptiveScreen({}, { compact: 'yes', default: 'no' });
    // default 320×240 → shortestSide=240 → compact
    expect(result).toBe('yes');
  });

  it('returns correct value for each class', () => {
    const cases = { micro: 'a', tiny: 'b', compact: 'c', medium: 'd', large: 'e', panel: 'f', default: 'z' };
    expect(adaptiveScreen({ width: 64, height: 64 }, cases)).toBe('a');
    expect(adaptiveScreen({ width: 180, height: 128 }, cases)).toBe('b');
    expect(adaptiveScreen({ width: 320, height: 240 }, cases)).toBe('c');
    expect(adaptiveScreen({ width: 480, height: 320 }, cases)).toBe('d');
    expect(adaptiveScreen({ width: 800, height: 480 }, cases)).toBe('e');
    expect(adaptiveScreen({ width: 1024, height: 600 }, cases)).toBe('f');
  });
});

// ── adaptiveInput ──────────────────────────────────────────────────────────

describe('adaptiveInput', () => {
  it('returns matching input value', () => {
    expect(adaptiveInput({ input: 'rotary' }, { rotary: 'rail', default: 'tabs' })).toBe('rail');
  });

  it('falls back to default', () => {
    expect(adaptiveInput({ input: 'touch' }, { rotary: 'rail', default: 'tabs' })).toBe('tabs');
  });

  it('defaults input to touch when not specified', () => {
    expect(adaptiveInput({}, { touch: 'yes', default: 'no' })).toBe('yes');
  });
});

// ── adaptiveShape ──────────────────────────────────────────────────────────

describe('adaptiveShape', () => {
  it('returns matching shape value', () => {
    expect(adaptiveShape({ shape: 'round' }, { round: 24, default: 8 })).toBe(24);
  });

  it('falls back to default', () => {
    expect(adaptiveShape({ shape: 'rect' }, { round: 24, default: 8 })).toBe(8);
  });

  it('defaults shape to rect when not specified', () => {
    expect(adaptiveShape({}, { rect: 'yes', default: 'no' })).toBe('yes');
  });
});
