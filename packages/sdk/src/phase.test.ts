import { describe, it, expect, beforeEach } from 'vitest';
import { setPhase, getPhase, assertPhase, PhaseError } from './phase';

describe('phase', () => {
  beforeEach(() => {
    setPhase('idle');
  });

  describe('setPhase / getPhase', () => {
    it('starts in idle', () => {
      expect(getPhase()).toBe('idle');
    });

    it('can set to module', () => {
      setPhase('module');
      expect(getPhase()).toBe('module');
    });

    it('can set to render', () => {
      setPhase('render');
      expect(getPhase()).toBe('render');
    });

    it('can cycle back to idle', () => {
      setPhase('module');
      setPhase('render');
      setPhase('idle');
      expect(getPhase()).toBe('idle');
    });
  });

  describe('assertPhase', () => {
    it('passes when phase matches single expected', () => {
      setPhase('module');
      expect(() => assertPhase('module', 'test')).not.toThrow();
    });

    it('passes when phase matches one of multiple expected', () => {
      setPhase('render');
      expect(() => assertPhase(['module', 'render'], 'test')).not.toThrow();
    });

    it('throws PhaseError when phase does not match', () => {
      setPhase('idle');
      expect(() => assertPhase('module', 'build.run()')).toThrow(PhaseError);
    });

    it('error message names the API and both phases', () => {
      setPhase('idle');
      try {
        assertPhase('module', 'build.run()');
      } catch (e) {
        expect(e).toBeInstanceOf(PhaseError);
        expect((e as PhaseError).message).toContain('build.run()');
        expect((e as PhaseError).message).toContain("'module'");
        expect((e as PhaseError).message).toContain("'idle'");
      }
    });

    it('error message lists multiple expected phases', () => {
      setPhase('idle');
      try {
        assertPhase(['module', 'render'], 'embed.string()');
      } catch (e) {
        expect(e).toBeInstanceOf(PhaseError);
        const msg = (e as PhaseError).message;
        expect(msg).toContain("'module'");
        expect(msg).toContain("'render'");
      }
    });
  });

  describe('PhaseError', () => {
    it('has name PhaseError', () => {
      const err = new PhaseError('test');
      expect(err.name).toBe('PhaseError');
    });

    it('is an instance of Error', () => {
      const err = new PhaseError('test');
      expect(err).toBeInstanceOf(Error);
    });
  });
});
