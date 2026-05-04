import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { setCurrentHookPath } from './useState';
import { useEffect } from './useEffect';

describe('useEffect', () => {
  beforeEach(() => {
    setCurrentHookPath('test');
  });

  afterEach(() => {
    setCurrentHookPath(null);
  });

  it('throws compile-time-only error', () => {
    expect(() => {
      useEffect(() => {});
    }).toThrow();
  });
});
