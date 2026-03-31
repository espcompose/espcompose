import { describe, it, expect, beforeEach } from 'vitest';
import { setPhase, PhaseError } from './phase';
import { build } from './build';
import {
  embed,
  EmbedValue,
  isEmbedValue,
  getSecrets,
  clearSecrets,
} from './embed';

describe('embed', () => {
  beforeEach(() => {
    setPhase('idle');
    clearSecrets();
  });

  describe('embed.string()', () => {
    it('creates a string EmbedValue from a literal', () => {
      setPhase('module');
      const val = embed.string('hello');
      expect(val).toBeInstanceOf(EmbedValue);
      expect(val.kind).toBe('string');
      expect(val.value).toBe('hello');
    });

    it('unwraps a BuildValue<string>', () => {
      setPhase('module');
      const bv = build.run(() => 'from-build');
      const val = embed.string(bv);
      expect(val.value).toBe('from-build');
    });

    it('works in render phase', () => {
      setPhase('render');
      const val = embed.string('render-time');
      expect(val.value).toBe('render-time');
    });

    it('throws in idle phase', () => {
      expect(() => embed.string('nope')).toThrow(PhaseError);
    });
  });

  describe('embed.number()', () => {
    it('creates a number EmbedValue', () => {
      setPhase('module');
      const val = embed.number(42);
      expect(val.kind).toBe('number');
      expect(val.value).toBe(42);
    });

    it('unwraps a BuildValue<number>', () => {
      setPhase('module');
      const bv = build.run(() => 99);
      const val = embed.number(bv);
      expect(val.value).toBe(99);
    });
  });

  describe('embed.secret()', () => {
    it('creates a secret EmbedValue and registers in secrets map', () => {
      setPhase('module');
      const val = embed.secret('my-password');
      expect(val.kind).toBe('secret');
      expect(val.value).toBe('my-password');
      // Secret key is attached as a non-enumerable property
      expect((val as unknown as Record<string, string>)._secretKey).toBeDefined();
    });

    it('registers secrets in getSecrets()', () => {
      setPhase('module');
      embed.secret('pass1');
      embed.secret('pass2');
      const secrets = getSecrets();
      expect(secrets.size).toBe(2);
    });

    it('clearSecrets() wipes the registry', () => {
      setPhase('module');
      embed.secret('pass1');
      clearSecrets();
      expect(getSecrets().size).toBe(0);
    });
  });

  describe('embed.json()', () => {
    it('creates a json EmbedValue from an object', () => {
      setPhase('module');
      const obj = { pins: [21, 22], mode: 'gpio' };
      const val = embed.json(obj);
      expect(val.kind).toBe('json');
      expect(val.value).toEqual(obj);
    });

    it('unwraps a BuildValue', () => {
      setPhase('module');
      const bv = build.run(() => [1, 2, 3]);
      const val = embed.json(bv);
      expect(val.value).toEqual([1, 2, 3]);
    });
  });

  describe('isEmbedValue()', () => {
    it('returns true for EmbedValue', () => {
      setPhase('module');
      expect(isEmbedValue(embed.string('test'))).toBe(true);
    });

    it('returns false for plain values', () => {
      expect(isEmbedValue('hello')).toBe(false);
      expect(isEmbedValue(42)).toBe(false);
      expect(isEmbedValue(null)).toBe(false);
    });
  });
});
