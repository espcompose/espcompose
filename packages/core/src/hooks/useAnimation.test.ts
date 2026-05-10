import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { setCurrentHookPath } from './useState';
import { withContributionScope } from './useContributionScope';
import { useAnimation } from './useAnimation';
import type { AnimationConfig } from './useAnimation';
import type { AttachAnimationContribution } from '../ir/contribution-types';
import { ANIMATION_ID } from '../actions/resolve/symbols';

function withHookContext<T>(fn: () => T): T {
  setCurrentHookPath('test_component');
  try {
    return fn();
  } finally {
    setCurrentHookPath(null);
  }
}

const baseConfig: AnimationConfig = {
  property: 'opacity',
  from: 0,
  to: 255,
  duration: '500ms',
};

describe('useAnimation', () => {
  beforeEach(() => {
    setCurrentHookPath(null);
  });

  afterEach(() => {
    setCurrentHookPath(null);
  });

  it('throws when called outside a hook context', () => {
    expect(() => useAnimation({ toString: () => 'ref' }, baseConfig)).toThrow(/inside a function component/);
  });

  it('registers an attach-animation contribution', () => {
    const result = withHookContext(() =>
      withContributionScope(() => {
        const ref = { toString: () => 'r_widget_abc' };
        useAnimation(ref, baseConfig);
      }),
    );
    expect(result.contributions).toHaveLength(1);
    const contrib = result.contributions[0] as AttachAnimationContribution;
    expect(contrib.kind).toBe('attach-animation');
    expect(contrib.targetRef).toBe('r_widget_abc');
    expect(contrib.property).toBe('opacity');
    expect(contrib.from).toBe(0);
    expect(contrib.to).toBe(255);
    expect(contrib.durationMs).toBe(500);
  });

  it('parses duration string to milliseconds', () => {
    const result = withHookContext(() =>
      withContributionScope(() => {
        useAnimation({ toString: () => 'ref' }, { ...baseConfig, duration: '2s' });
      }),
    );
    const contrib = result.contributions[0] as AttachAnimationContribution;
    expect(contrib.durationMs).toBe(2000);
  });

  it('accepts bare number duration (ms)', () => {
    const result = withHookContext(() =>
      withContributionScope(() => {
        useAnimation({ toString: () => 'ref' }, { ...baseConfig, duration: 300 });
      }),
    );
    const contrib = result.contributions[0] as AttachAnimationContribution;
    expect(contrib.durationMs).toBe(300);
  });

  it('passes optional fields through', () => {
    const result = withHookContext(() =>
      withContributionScope(() => {
        useAnimation({ toString: () => 'ref' }, {
          ...baseConfig,
          delay: '100ms',
          easing: 'ease-in-out',
          repeat: 3,
          repeatDelay: '50ms',
          autoStart: true,
          part: 'indicator',
          state: 'pressed',
        });
      }),
    );
    const contrib = result.contributions[0] as AttachAnimationContribution;
    expect(contrib.delayMs).toBe(100);
    expect(contrib.easing).toBe('ease-in-out');
    expect(contrib.repeat).toBe(3);
    expect(contrib.repeatDelayMs).toBe(50);
    expect(contrib.autoStart).toBe(true);
    expect(contrib.part).toBe('indicator');
    expect(contrib.state).toBe('pressed');
  });

  it('normalizes repeat: Infinity to -1', () => {
    const result = withHookContext(() =>
      withContributionScope(() => {
        useAnimation({ toString: () => 'ref' }, { ...baseConfig, repeat: Infinity });
      }),
    );
    const contrib = result.contributions[0] as AttachAnimationContribution;
    expect(contrib.repeat).toBe(-1);
  });

  it('handles playback: true', () => {
    const result = withHookContext(() =>
      withContributionScope(() => {
        useAnimation({ toString: () => 'ref' }, { ...baseConfig, playback: true });
      }),
    );
    const contrib = result.contributions[0] as AttachAnimationContribution;
    expect(contrib.playback).toEqual({});
  });

  it('handles playback object with durations', () => {
    const result = withHookContext(() =>
      withContributionScope(() => {
        useAnimation({ toString: () => 'ref' }, {
          ...baseConfig,
          playback: { duration: '1s', delay: '200ms' },
        });
      }),
    );
    const contrib = result.contributions[0] as AttachAnimationContribution;
    expect(contrib.playback).toEqual({ durationMs: 1000, delayMs: 200 });
  });

  it('returns a controller with start() and stop() methods that throw', () => {
    const ctrl = withHookContext(() =>
      withContributionScope(() =>
        useAnimation({ toString: () => 'ref' }, baseConfig),
      ),
    ).result;
    expect(typeof ctrl.start).toBe('function');
    expect(typeof ctrl.stop).toBe('function');
    expect(() => ctrl.start()).toThrow();
    expect(() => ctrl.stop()).toThrow();
  });

  it('returns a controller with ANIMATION_ID symbol', () => {
    const ctrl = withHookContext(() =>
      withContributionScope(() =>
        useAnimation({ toString: () => 'ref' }, baseConfig),
      ),
    ).result;
    // Internal field for action compiler to read (symbol-keyed)
    expect((ctrl as Record<symbol, string>)[ANIMATION_ID]).toMatch(/^anim_/);
  });
});
