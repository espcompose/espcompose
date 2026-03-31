import { describe, it, expect, beforeEach } from 'vitest';
import { setPhase, PhaseError } from './phase';
import { build, BuildValue, isBuildValue } from './build';

describe('build', () => {
  beforeEach(() => {
    setPhase('idle');
  });

  describe('build.run()', () => {
    it('executes the function and returns a BuildValue', () => {
      setPhase('module');
      const result = build.run(() => 42);
      expect(result).toBeInstanceOf(BuildValue);
      expect(result.unwrap()).toBe(42);
    });

    it('captures object return values', () => {
      setPhase('module');
      const result = build.run(() => ({ name: 'my-device', port: 8080 }));
      expect(result.unwrap()).toEqual({ name: 'my-device', port: 8080 });
    });

    it('throws PhaseError when called in idle phase', () => {
      expect(() => build.run(() => 'nope')).toThrow(PhaseError);
    });

    it('throws PhaseError when called in render phase', () => {
      setPhase('render');
      expect(() => build.run(() => 'nope')).toThrow(PhaseError);
    });
  });

  describe('BuildValue proxy', () => {
    it('proxies property access to the underlying object', () => {
      setPhase('module');
      const result = build.run(() => ({ name: 'device', ssid: 'MyWifi' }));
      // Property access flows through the Proxy
      expect((result as unknown as { name: string }).name).toBe('device');
      expect((result as unknown as { ssid: string }).ssid).toBe('MyWifi');
    });

    it('returns undefined for missing properties', () => {
      setPhase('module');
      const result = build.run(() => ({ name: 'device' }));
      expect((result as unknown as Record<string, unknown>).missing).toBeUndefined();
    });

    it('preserves unwrap method through proxy', () => {
      setPhase('module');
      const result = build.run(() => 'hello');
      expect(result.unwrap()).toBe('hello');
    });

    it('returns undefined for prop access on non-object values', () => {
      setPhase('module');
      const result = build.run(() => 42);
      expect((result as unknown as Record<string, unknown>).foo).toBeUndefined();
    });
  });

  describe('isBuildValue()', () => {
    it('returns true for BuildValue', () => {
      setPhase('module');
      const val = build.run(() => 'test');
      expect(isBuildValue(val)).toBe(true);
    });

    it('returns false for plain values', () => {
      expect(isBuildValue('hello')).toBe(false);
      expect(isBuildValue(42)).toBe(false);
      expect(isBuildValue(null)).toBe(false);
      expect(isBuildValue({})).toBe(false);
    });
  });
});
