import { describe, it, expect } from 'vitest';
import { resolveTransitionDescriptors } from './resolve-transition';
import type { StyleTransitionDescriptor } from './types';

describe('resolveTransitionDescriptors', () => {
  it('maps CSS property names to LVGL camelCase', () => {
    const descriptors: StyleTransitionDescriptor[] = [
      { properties: ['backgroundColor', 'opacity'], duration: 200 },
    ];
    const result = resolveTransitionDescriptors(descriptors);
    expect(result).toEqual([
      { properties: ['bgColor', 'opa'], durationMs: 200, easing: 'linear', delayMs: 0 },
    ]);
  });

  it('passes through LVGL camelCase names unchanged', () => {
    const descriptors: StyleTransitionDescriptor[] = [
      { properties: ['bgColor', 'opa'], duration: 100 },
    ];
    const result = resolveTransitionDescriptors(descriptors);
    expect(result[0].properties).toEqual(['bgColor', 'opa']);
  });

  it('parses string durations to milliseconds', () => {
    const descriptors: StyleTransitionDescriptor[] = [
      { properties: ['opacity'], duration: '300ms' },
    ];
    const result = resolveTransitionDescriptors(descriptors);
    expect(result[0].durationMs).toBe(300);
  });

  it('parses second-based durations', () => {
    const descriptors: StyleTransitionDescriptor[] = [
      { properties: ['opacity'], duration: '1.5s' },
    ];
    const result = resolveTransitionDescriptors(descriptors);
    expect(result[0].durationMs).toBe(1500);
  });

  it('maps easing aliases to LVGL keys', () => {
    const descriptors: StyleTransitionDescriptor[] = [
      { properties: ['opacity'], duration: 200, easing: 'ease-out' },
      { properties: ['opacity'], duration: 200, easing: 'ease-in-out' },
      { properties: ['opacity'], duration: 200, easing: 'bounce' },
    ];
    const result = resolveTransitionDescriptors(descriptors);
    expect(result[0].easing).toBe('ease_out');
    expect(result[1].easing).toBe('ease_in_out');
    expect(result[2].easing).toBe('bounce');
  });

  it('defaults easing to linear when omitted', () => {
    const descriptors: StyleTransitionDescriptor[] = [
      { properties: ['opacity'], duration: 200 },
    ];
    const result = resolveTransitionDescriptors(descriptors);
    expect(result[0].easing).toBe('linear');
  });

  it('resolves delay to milliseconds', () => {
    const descriptors: StyleTransitionDescriptor[] = [
      { properties: ['opacity'], duration: 200, delay: '100ms' },
    ];
    const result = resolveTransitionDescriptors(descriptors);
    expect(result[0].delayMs).toBe(100);
  });

  it('defaults delay to 0 when omitted', () => {
    const descriptors: StyleTransitionDescriptor[] = [
      { properties: ['opacity'], duration: 200 },
    ];
    const result = resolveTransitionDescriptors(descriptors);
    expect(result[0].delayMs).toBe(0);
  });

  it('handles multiple descriptors', () => {
    const descriptors: StyleTransitionDescriptor[] = [
      { properties: ['backgroundColor'], duration: '300ms', easing: 'ease-out' },
      { properties: ['opacity'], duration: '150ms', easing: 'linear' },
    ];
    const result = resolveTransitionDescriptors(descriptors);
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({
      properties: ['bgColor'],
      durationMs: 300,
      easing: 'ease_out',
      delayMs: 0,
    });
    expect(result[1]).toEqual({
      properties: ['opa'],
      durationMs: 150,
      easing: 'linear',
      delayMs: 0,
    });
  });
});
