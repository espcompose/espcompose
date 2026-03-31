import { describe, it, expect, beforeEach } from 'vitest';
import { setPhase, PhaseError } from './phase';
import {
  device,
  DeviceLambda,
  isDeviceLambda,
  getIncludes,
  clearIncludes,
} from './device';
import { type TriggerVar, isTriggerVar, createTriggerArgs } from './trigger-args';

describe('device', () => {
  beforeEach(() => {
    setPhase('idle');
    clearIncludes();
  });

  describe('device.include()', () => {
    it('registers an include path', () => {
      setPhase('module');
      device.include('my_component.h');
      expect(getIncludes()).toContain('my_component.h');
    });

    it('deduplicates identical paths', () => {
      setPhase('module');
      device.include('my_component.h');
      device.include('my_component.h');
      expect(getIncludes()).toHaveLength(1);
    });

    it('tracks multiple different includes', () => {
      setPhase('module');
      device.include('a.h');
      device.include('b.h');
      expect(getIncludes()).toEqual(['a.h', 'b.h']);
    });

    it('clearIncludes() wipes the registry', () => {
      setPhase('module');
      device.include('a.h');
      clearIncludes();
      expect(getIncludes()).toHaveLength(0);
    });

    it('throws in idle phase', () => {
      expect(() => device.include('nope.h')).toThrow(PhaseError);
    });
  });

  describe('device.lambda()', () => {
    it('returns a DeviceLambda instance', () => {
      setPhase('module');
      const lam = device.lambda<number>('return id(sensor).state;');
      expect(lam).toBeInstanceOf(DeviceLambda);
      expect(lam.code).toBe('return id(sensor).state;');
    });

    it('throws in idle phase', () => {
      expect(() => device.lambda('nope')).toThrow(PhaseError);
    });
  });

  describe('type guards', () => {
    it('isDeviceLambda() recognizes DeviceLambda', () => {
      setPhase('module');
      const lam = device.lambda('code');
      expect(isDeviceLambda(lam)).toBe(true);
    });

    it('isDeviceLambda() rejects non-DeviceLambda', () => {
      expect(isDeviceLambda({})).toBe(false);
      expect(isDeviceLambda('string')).toBe(false);
    });
  });

  describe('TriggerArgs utils', () => {
    it('createTriggerArgs returns proxy that yields TriggerVars', () => {
      const args = createTriggerArgs<{ x: number; y: string }>();
      const x = (args as unknown as Record<string, TriggerVar>).x;
      const y = (args as unknown as Record<string, TriggerVar>).y;
      expect(isTriggerVar(x)).toBe(true);
      expect(isTriggerVar(y)).toBe(true);
      expect(x.name).toBe('x');
      expect(y.name).toBe('y');
    });

    it('isTriggerVar rejects non-TriggerVar', () => {
      expect(isTriggerVar(42)).toBe(false);
      expect(isTriggerVar('hello')).toBe(false);
      expect(isTriggerVar(null)).toBe(false);
    });
  });
});
