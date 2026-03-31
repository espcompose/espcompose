import { describe, it, expect } from 'vitest';
import { defineProject, isProjectDefinition } from './project';

// Minimal mock EspComposeElement for testing
const mockElement = {
  type: 'esphome',
  props: { name: 'test-device', children: [] },
};

describe('project', () => {
  describe('defineProject()', () => {
    it('returns a ProjectDefinition with the device element', () => {
      const project = defineProject({ device: mockElement });
      expect(project.device).toBe(mockElement);
    });

    it('is recognized by isProjectDefinition()', () => {
      const project = defineProject({ device: mockElement });
      expect(isProjectDefinition(project)).toBe(true);
    });
  });

  describe('isProjectDefinition()', () => {
    it('returns false for plain objects', () => {
      expect(isProjectDefinition({})).toBe(false);
      expect(isProjectDefinition({ device: mockElement })).toBe(false);
    });

    it('returns false for null/undefined', () => {
      expect(isProjectDefinition(null)).toBe(false);
      expect(isProjectDefinition(undefined)).toBe(false);
    });

    it('returns false for primitives', () => {
      expect(isProjectDefinition('string')).toBe(false);
      expect(isProjectDefinition(42)).toBe(false);
    });
  });
});
