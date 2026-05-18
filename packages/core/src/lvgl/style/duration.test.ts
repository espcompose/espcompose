import { describe, it, expect } from 'vitest';
import { isDurationValue, parseDurationToMs } from './duration';

describe('isDurationValue', () => {
  it('accepts bare numbers', () => {
    expect(isDurationValue(0)).toBe(true);
    expect(isDurationValue(500)).toBe(true);
    expect(isDurationValue(1.5)).toBe(true);
  });

  it('rejects non-finite numbers', () => {
    expect(isDurationValue(Infinity)).toBe(false);
    expect(isDurationValue(-Infinity)).toBe(false);
    expect(isDurationValue(NaN)).toBe(false);
  });

  it('accepts valid duration strings', () => {
    expect(isDurationValue('500ms')).toBe(true);
    expect(isDurationValue('2s')).toBe(true);
    expect(isDurationValue('1min')).toBe(true);
    expect(isDurationValue('1h')).toBe(true);
    expect(isDurationValue('1.5s')).toBe(true);
    expect(isDurationValue('0ms')).toBe(true);
  });

  it('rejects invalid strings', () => {
    expect(isDurationValue('foo')).toBe(false);
    expect(isDurationValue('500')).toBe(false);
    expect(isDurationValue('')).toBe(false);
    expect(isDurationValue('ms')).toBe(false);
    expect(isDurationValue('5x')).toBe(false);
    expect(isDurationValue('2sec')).toBe(false);
  });

  it('rejects non-number non-string values', () => {
    expect(isDurationValue(null)).toBe(false);
    expect(isDurationValue(undefined)).toBe(false);
    expect(isDurationValue(true)).toBe(false);
    expect(isDurationValue({})).toBe(false);
  });
});

describe('parseDurationToMs', () => {
  it('returns bare numbers as-is', () => {
    expect(parseDurationToMs(0)).toBe(0);
    expect(parseDurationToMs(500)).toBe(500);
    expect(parseDurationToMs(1.5)).toBe(1.5);
  });

  it('parses millisecond strings', () => {
    expect(parseDurationToMs('500ms')).toBe(500);
    expect(parseDurationToMs('0ms')).toBe(0);
    expect(parseDurationToMs('100ms')).toBe(100);
  });

  it('parses second strings', () => {
    expect(parseDurationToMs('2s')).toBe(2000);
    expect(parseDurationToMs('1.5s')).toBe(1500);
    expect(parseDurationToMs('0s')).toBe(0);
  });

  it('parses minute strings', () => {
    expect(parseDurationToMs('1min')).toBe(60_000);
    expect(parseDurationToMs('2min')).toBe(120_000);
  });

  it('parses hour strings', () => {
    expect(parseDurationToMs('1h')).toBe(3_600_000);
    expect(parseDurationToMs('0.5h')).toBe(1_800_000);
  });

  it('throws on invalid strings', () => {
    expect(() => parseDurationToMs('bad' as never)).toThrow('[espcompose] Invalid duration value');
  });
});
