/**
 * Unit tests for ref forwarding through function components.
 *
 * Validates that refs passed to function components are automatically
 * forwarded to the root intrinsic element returned by the component.
 */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, createElement } from './runtime';
import { RefHandle } from './types';
import { setCurrentHookPath } from './hooks/useState';
import { withReactiveScope } from './hooks/useReactiveScope';
import { clearRefRegistry, getRefTag } from './ref-registry';
import type { EspComposeElement, FunctionComponent } from './types';

// ── Helpers ────────────────────────────────────────────────────────────────

function renderInScope(element: EspComposeElement): unknown {
  let result: unknown;
  setCurrentHookPath('test');
  withReactiveScope(() => {
    result = render(element);
  });
  setCurrentHookPath(null);
  return result;
}

/** Simple wrapper component that renders an intrinsic element. */
function Wrapper(props: { name?: string; children?: EspComposeElement[] }) {
  return createElement('wifi', { ssid: props.name ?? 'default' });
}

/** Nested wrapper: component that renders another component. */
function Outer(props: { label?: string }) {
  return createElement(Wrapper, { name: props.label ?? 'nested' });
}

// ── Tests ──────────────────────────────────────────────────────────────────

describe('ref forwarding through function components', () => {
  beforeEach(() => {
    clearRefRegistry();
  });

  afterEach(() => {
    clearRefRegistry();
  });

  it('forwards ref from function component to root intrinsic element', () => {
    const ref = new RefHandle();
    const token = ref.toString();

    const el = createElement(Wrapper, { name: 'TestWifi', ref });
    const result = renderInScope(el) as Record<string, unknown>;

    // The intrinsic `wifi` element should have the ref token as `id`
    expect(result).toHaveProperty('wifi');
    const wifi = result.wifi as Record<string, unknown>;
    expect(wifi.id).toBe(token);
    expect(wifi.ssid).toBe('TestWifi');

    // ref-registry should map the token to the intrinsic tag
    expect(getRefTag(token)).toBe('wifi');
  });

  it('forwards ref through nested function components', () => {
    const ref = new RefHandle();
    const token = ref.toString();

    const el = createElement(Outer, { label: 'NestedWifi', ref });
    const result = renderInScope(el) as Record<string, unknown>;

    expect(result).toHaveProperty('wifi');
    const wifi = result.wifi as Record<string, unknown>;
    expect(wifi.id).toBe(token);
    expect(wifi.ssid).toBe('NestedWifi');
    expect(getRefTag(token)).toBe('wifi');
  });

  it('does not pass ref to the component function props', () => {
    let receivedProps: Record<string, unknown> | undefined;

    function Inspector(props: Record<string, unknown>) {
      receivedProps = { ...props };
      return createElement('api', null);
    }

    const ref = new RefHandle();
    const el = createElement(Inspector as FunctionComponent, { ref, extra: 'value' });
    renderInScope(el);

    // The component should not receive `ref` in its props
    expect(receivedProps).toBeDefined();
    expect(receivedProps!.ref).toBeUndefined();
    expect(receivedProps!.extra).toBe('value');
  });

  it('works without ref (no regression)', () => {
    const el = createElement(Wrapper, { name: 'NoRef' });
    const result = renderInScope(el) as Record<string, unknown>;

    expect(result).toHaveProperty('wifi');
    const wifi = result.wifi as Record<string, unknown>;
    expect(wifi.ssid).toBe('NoRef');
    expect(wifi.id).toBeUndefined();
  });

  it('ref on intrinsic element still works directly', () => {
    const ref = new RefHandle();
    const token = ref.toString();

    const el = createElement('logger', { level: 'DEBUG', ref });
    const result = renderInScope(el) as Record<string, unknown>;

    expect(result).toHaveProperty('logger');
    const logger = result.logger as Record<string, unknown>;
    expect(logger.id).toBe(token);
    expect(logger.level).toBe('DEBUG');
    expect(getRefTag(token)).toBe('logger');
  });

  it('warns and drops ref when component returns multiple elements', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    function MultiElement() {
      return [createElement('api', null), createElement('logger', null)];
    }

    const ref = new RefHandle();
    const el = createElement(MultiElement as unknown as FunctionComponent, { ref });
    const result = renderInScope(el);

    expect(warnSpy).toHaveBeenCalledWith(
      'Ref passed to function component that returned multiple elements; ref was not forwarded.',
    );
    // Both elements should still render, but ref is not on either
    expect(result).toEqual([{ api: null }, { logger: null }]);

    warnSpy.mockRestore();
  });
});
