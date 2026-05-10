import { describe, it, expect } from 'vitest';
import { lowerAnimationToCpp, lowerAnimationStartAction, lowerAnimationStopAction } from './animation-lowering';
import type { AttachAnimationContribution } from '@espcompose/core/internals';

function makeAnim(overrides: Partial<AttachAnimationContribution> = {}): AttachAnimationContribution {
  return {
    kind: 'attach-animation',
    targetRef: 'r_widget_abc',
    animationId: 'anim_test1',
    property: 'opa',
    from: 0,
    to: 255,
    durationMs: 500,
    sourceId: 'test',
    ...overrides,
  };
}

describe('lowerAnimationToCpp', () => {
  it('generates exec callback, var declaration, and init code', () => {
    const result = lowerAnimationToCpp(makeAnim(), 'id(r_widget_abc).get_obj()');
    expect(result.animId).toBe('anim_test1');
    expect(result.execCallback).toContain('lv_obj_set_style_opa');
    expect(result.execCallback).toContain('anim_test1_exec_cb');
    expect(result.varDeclaration).toBe('static lv_anim_t anim_test1;');
    expect(result.initCode).toContain('lv_anim_init');
    expect(result.initCode).toContain('lv_anim_set_values');
    expect(result.initCode).toContain('0, 255');
    expect(result.initCode).toContain('lv_anim_set_time');
    expect(result.initCode).toContain('500');
    // initCode should NOT contain the static variable declaration
    expect(result.initCode).not.toContain('static lv_anim_t');
  });

  it('sets easing path callback', () => {
    const result = lowerAnimationToCpp(makeAnim({ easing: 'ease-in-out' }), 'obj');
    expect(result.initCode).toContain('lv_anim_path_ease_in_out');
  });

  it('defaults to linear easing', () => {
    const result = lowerAnimationToCpp(makeAnim(), 'obj');
    expect(result.initCode).toContain('lv_anim_path_linear');
  });

  it('sets delay', () => {
    const result = lowerAnimationToCpp(makeAnim({ delayMs: 200 }), 'obj');
    expect(result.initCode).toContain('lv_anim_set_delay');
    expect(result.initCode).toContain('200');
  });

  it('sets repeat count', () => {
    const result = lowerAnimationToCpp(makeAnim({ repeat: 3 }), 'obj');
    expect(result.initCode).toContain('lv_anim_set_repeat_count');
    expect(result.initCode).toContain('3');
  });

  it('sets infinite repeat', () => {
    const result = lowerAnimationToCpp(makeAnim({ repeat: -1 }), 'obj');
    expect(result.initCode).toContain('LV_ANIM_REPEAT_INFINITE');
  });

  it('sets playback time', () => {
    const result = lowerAnimationToCpp(makeAnim({ playback: { durationMs: 300 } }), 'obj');
    expect(result.initCode).toContain('lv_anim_set_playback_time');
    expect(result.initCode).toContain('300');
  });

  it('auto-starts when configured', () => {
    const result = lowerAnimationToCpp(makeAnim({ autoStart: true }), 'obj');
    expect(result.initCode).toContain('lv_anim_start');
  });

  it('does not auto-start by default', () => {
    const result = lowerAnimationToCpp(makeAnim(), 'obj');
    expect(result.initCode).not.toContain('lv_anim_start');
  });

  it('builds selector with part and state', () => {
    const result = lowerAnimationToCpp(makeAnim({ part: 'indicator', state: 'pressed' }), 'obj');
    expect(result.execCallback).toContain('LV_PART_INDICATOR');
    expect(result.execCallback).toContain('LV_STATE_PRESSED');
  });

  it('throws on unknown property', () => {
    expect(() =>
      lowerAnimationToCpp(makeAnim({ property: 'nonexistent_prop' }), 'obj'),
    ).toThrow(/Cannot animate property/);
  });
});

describe('lowerAnimationStartAction', () => {
  it('generates lv_anim_start code', () => {
    expect(lowerAnimationStartAction('anim_fade')).toBe('lv_anim_start(&espcompose::anim_fade);');
  });
});

describe('lowerAnimationStopAction', () => {
  it('generates lv_anim_custom_del code', () => {
    expect(lowerAnimationStopAction('anim_fade')).toBe('lv_anim_custom_del(&espcompose::anim_fade, nullptr);');
  });
});
