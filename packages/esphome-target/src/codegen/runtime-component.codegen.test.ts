import { describe, it, expect } from 'vitest';
import { generateBindingsHeader, generateSignalSetLambda, getRuntimeHeaderContent, type ReactiveRuntimeConfig } from './bindings-codegen.js';
import { injectReactiveBindingsRuntime } from './reactive-config.js';

describe('runtime component codegen', () => {
  it('generates callback lambdas that request flush via static instance getter', () => {
    const lambda = generateSignalSetLambda('sig_ha_sensor_temp');

    expect(lambda).toContain('EspcomposeRuntimeComponent::get_instance()');
    expect(lambda).toContain('rt->request_flush()');
    expect(lambda).not.toContain('Scheduler::instance().flush()');
  });

  it('emits bootstrap and reactive runtime symbols (component class in external component)', () => {
    const runtimeConfig: ReactiveRuntimeConfig = {
      signals: [],
      memos: [],
      effects: [],
      widgetBindings: [],
      globalSignals: [],
    };

    const header = generateBindingsHeader(runtimeConfig);
    const runtimeHeader = getRuntimeHeaderContent();

    // Reactive engine still in espcompose_reactive.h
    expect(runtimeHeader).toContain('bool flush_for_budget_us(uint32_t budget_us)');
    // EspcomposeRuntimeComponent now lives in the external component, not the reactive header
    expect(runtimeHeader).not.toContain('class EspcomposeRuntimeComponent');

    // Bindings header wires graph via bootstrap and uses static getter
    expect(header).toContain('void bootstrap_runtime()');
    expect(header).toContain('EspcomposeRuntimeComponent::get_instance()');
    expect(header).toContain('rt->request_flush()');
    expect(header).toContain('#include "esphome/components/espcompose/espcompose_runtime.h"');
    expect(header).not.toContain('void runtime_loop()');
  });
});

describe('runtime component yaml wiring', () => {
  it('injects external_components reference and espcompose config', () => {
    const runtimeConfig: ReactiveRuntimeConfig = {
      signals: [],
      memos: [],
      effects: [],
      widgetBindings: [],
      globalSignals: [],
    };

    const inputConfig = {
      esphome: {},
    };

    const output = injectReactiveBindingsRuntime(inputConfig, [], [], runtimeConfig);
    const esphome = output.esphome as Record<string, unknown>;
    const externalComps = output.external_components as Array<{ source?: { type?: string; path?: string }; components?: string[] }>;
    const espcomposeConfig = output.espcompose as Record<string, unknown>;

    // external_components is a top-level key
    expect(externalComps).toBeDefined();
    expect(externalComps?.length).toBeGreaterThan(0);
    expect(externalComps?.[0]?.source?.type).toBe('local');
    expect(externalComps?.[0]?.source?.path).toBe('./external_components');
    expect(externalComps?.[0]?.components).toEqual(['espcompose']);

    // espcompose platform config is top-level (not nested under esphome)
    expect(espcomposeConfig?.flush_budget_us).toBe(2000);
    expect(esphome.espcompose).toBeUndefined();
    expect(esphome.external_components).toBeUndefined();

    // esphome.includes injects the bindings header into main.cpp
    expect(esphome.includes).toEqual(['espcompose_bindings.h']);
  });
});
