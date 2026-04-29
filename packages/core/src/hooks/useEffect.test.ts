import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { setCurrentHookPath } from './useState';
import { useEffect } from './useEffect';
import { useHAEntity, clearHAEntityCache } from './useHAEntity';
import { withReactiveScope } from './useReactiveScope';

describe('useEffect', () => {
  beforeEach(() => {
    setCurrentHookPath('test');
  });

  afterEach(() => {
    setCurrentHookPath(null);
  });

  it('runs the function once immediately', () => {
    let called = false;
    useEffect(() => {
      called = true;
    });
    expect(called).toBe(true);
  });

  it('tracks deps from HA entity access', () => {
    clearHAEntityCache();
    withReactiveScope(() => {
      const sensor = useHAEntity('sensor.humidity');
      useEffect(() => {
        void sensor.value;
      });
    });
  });
});
