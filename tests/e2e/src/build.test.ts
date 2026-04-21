import { describe, it, expect, afterAll } from 'vitest';
import path from 'path';
import fs from 'fs';
import { build } from '@espcompose/cli';
import { createEsphomeTarget } from '@espcompose/esphome-target';
import { createProjectTest } from './helpers';
import type { TestTiming } from './helpers';

const projectsDir = path.resolve(__dirname, '..', 'projects');

// Collect timing data from each test for the summary report.
const timings: TestTiming[] = [];

/** Run createProjectTest and record timing. */
async function runTimed(projectName: string): Promise<void> {
  const timing = await createProjectTest(projectsDir, projectName);
  timings.push(timing);
}

describe('ESPHome Compose Build', () => {
  afterAll(() => {
    if (timings.length === 0) return;

    // ── Per-project table ──
    const rows = timings.map((t) => ({
      Project: t.project,
      'Espcompose (ms)': Math.round(t.espcomposeMs),
      'ESPHome (ms)': Math.round(t.esphomeValidationMs),
      'Total (ms)': Math.round(t.espcomposeMs + t.esphomeValidationMs),
    }));
    console.log('\n── E2E Timing Summary ──');
    console.table(rows);

    // ── Aggregate breakdown ──
    const totalEspcompose = timings.reduce((s, t) => s + t.espcomposeMs, 0);
    const totalEsphome = timings.reduce((s, t) => s + t.esphomeValidationMs, 0);
    const total = totalEspcompose + totalEsphome;
    console.log(
      `\nAggregate: espcompose ${Math.round(totalEspcompose)}ms (${((totalEspcompose / total) * 100).toFixed(1)}%) ` +
      `| esphome validation ${Math.round(totalEsphome)}ms (${((totalEsphome / total) * 100).toFixed(1)}%) ` +
      `| total ${Math.round(total)}ms`,
    );

    // ── Per-phase aggregate ──
    const phaseMap = new Map<string, number>();
    for (const t of timings) {
      for (const p of t.phases) {
        phaseMap.set(p.phase, (phaseMap.get(p.phase) ?? 0) + p.durationMs);
      }
    }
    const phaseRows = [...phaseMap.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([phase, ms]) => ({ Phase: phase, 'Total (ms)': Math.round(ms), '%': ((ms / totalEspcompose) * 100).toFixed(1) }));
    console.log('\n── Phase Breakdown (aggregate across all projects) ──');
    console.table(phaseRows);
  });
  it('sensor-device', async () => {
    await runTimed('sensor-device');
  });

  it('dashboard-device', async () => {
    await runTimed('dashboard-device');
  });

  it('lvgl-device', async () => {
    await runTimed('lvgl-device');
  });

  it('design-system-device', async () => {
    await runTimed('design-system-device');
  });

  it('trigger-device', async () => {
    await runTimed('trigger-device');
  });

  it('ha-binding-device', async () => {
    await runTimed('ha-binding-device');
  });

  it('ha-dynamic-device', async () => {
    await runTimed('ha-dynamic-device');
  });

  it('reactive-device', async () => {
    await runTimed('reactive-device');
  });

  it('device-script-device', async () => {
    await runTimed('device-script-device');
  });

  // useGlobal hook — global variable registration and set actions
  it('globals-device', async () => {
    await runTimed('globals-device');
  });

  it('project-device', async () => {
    await runTimed('project-device');
  });

  // Multi-source reactive runtime test (C++ Signal/Memo/Effect)
  it('multi-source-reactive-device', async () => {
    await runTimed('multi-source-reactive-device');
  });

  // Auto-reactive transform test (compiler auto-wraps Signal expressions)
  it('auto-reactive-device', async () => {
    await runTimed('auto-reactive-device');
  });

  // useImage + useFont hook injection and deduplication
  it('image-font-device', async () => {
    await runTimed('image-font-device');
  });

  // CSS-like style prop expansion and mergeStyles
  it('style-device', async () => {
    await runTimed('style-device');
  });

  // Boot screen with LVGL page navigation actions
  it('boot-screen-device', async () => {
    await runTimed('boot-screen-device');
  });

  // Ref action through props — type-based tag resolution for page navigation
  it('prop-ref-action-device', async () => {
    await runTimed('prop-ref-action-device');
  });

  // Ref forwarding through design system widgets (<Screen ref={...}>)
  it('widget-ref-device', async () => {
    await runTimed('widget-ref-device');
  });

  // Typed LVGL widget refs — exercises lv_obj_t/lv_style_t brand inheritance
  // and ref-resolved widgetUpdate / widgetRedraw / sliderUpdate actions.
  it('lvgl-widget-ref-device', async () => {
    await runTimed('lvgl-widget-ref-device');
  });

  // Untransformed library detection — build should fail with a clear error
  it('uncompiled-lib-device (detects untransformed library)', async () => {
    const projectPath = path.resolve(projectsDir, 'uncompiled-lib-device');
    const fakeLibDir = path.join(projectPath, 'node_modules', '@test', 'reactive-lib');

    // Create a fake pre-built library that uses useMemo() without build --library
    fs.mkdirSync(fakeLibDir, { recursive: true });
    fs.writeFileSync(
      path.join(fakeLibDir, 'package.json'),
      JSON.stringify({ name: '@test/reactive-lib', main: 'index.js' }),
    );
    fs.writeFileSync(
      path.join(fakeLibDir, 'index.js'),
      [
        '"use strict";',
        'const { useHAEntity, useMemo } = require("@espcompose/core");',
        'function BadWidget() {',
        '  const light = useHAEntity("light.fake_test");',
        '  useMemo(() => light.isOn ? "On" : "Off");',
        '  return null;',
        '}',
        'exports.BadWidget = BadWidget;',
      ].join('\n'),
    );

    try {
      await expect(
        build(projectPath, createEsphomeTarget()),
      ).rejects.toThrow('reactive expression(s) that were not compiled');
    } finally {
      fs.rmSync(path.join(projectPath, 'node_modules'), { recursive: true, force: true });
    }
  });

  // Compiled library with format version — build should succeed
  it('library-contract-device (consumes compiled library)', async () => {
    const projectPath = path.resolve(projectsDir, 'library-contract-device');
    const fakeLibDir = path.join(projectPath, 'node_modules', '@test', 'compiled-lib');

    // Create a fake pre-compiled library with __espcompose_format__ marker
    // and __espcompose.compiled() calls (as build --library would produce)
    fs.mkdirSync(fakeLibDir, { recursive: true });
    fs.writeFileSync(
      path.join(fakeLibDir, 'package.json'),
      JSON.stringify({ name: '@test/compiled-lib', main: 'index.js' }),
    );
    fs.writeFileSync(
      path.join(fakeLibDir, 'index.js'),
      [
        '"use strict";',
        'const __espcompose_format__ = 2;',
        'exports.__espcompose_format__ = __espcompose_format__;',
        'const { __espcompose, useHAEntity } = require("@espcompose/core");',
        'const { jsx } = require("@espcompose/core/jsx-runtime");',
        'function StatusSensor() {',
        '  const light = useHAEntity("light.office");',
        '  const text = __espcompose.compiled({',
        '    type: "string",',
        '    deps: [{',
        '      sourceId: "ha_light_office",',
        '      triggerType: "on_state",',
        '      sourceDomain: "binary_sensor"',
        '    }],',
        '    expr: {"kind":"ternary","test":{"kind":"entity_prop","entityId":"light.office","property":"isOn","type":"bool"},"consequent":{"kind":"literal","value":"On","type":"string"},"alternate":{"kind":"literal","value":"Off","type":"string"}}',
        '  });',
        '  return jsx("text_sensor", { platform: "template", name: "Light Status", id: "light_status" });',
        '}',
        'exports.StatusSensor = StatusSensor;',
      ].join('\n'),
    );

    try {
      await runTimed('library-contract-device');
    } finally {
      fs.rmSync(path.join(projectPath, 'node_modules'), { recursive: true, force: true });
    }
  });

  // Action tree compiler — bare arrow functions → ESPHome action sequences
  it('action-tree-device', async () => {
    await runTimed('action-tree-device');
  });

  // Reactive theme switching: two themes, theme.select(), full token reactivity
  it('reactive-theme-device', async () => {
    await runTimed('reactive-theme-device');
  });

  // Component cascade: ReactiveNode flows through 3 component layers
  it('fancy-light-cascade-device', async () => {
    await runTimed('fancy-light-cascade-device');
  });

  // TriggerHandler in variable initializers + primitive slots in useMemo
  it('trigger-variable-device', async () => {
    await runTimed('trigger-variable-device');
  });

  // secret() — emits !secret references in YAML and writes secrets.yaml
  it('secret-device', async () => {
    await runTimed('secret-device');
  });

  // ec-canvas — composited rendering host with paint primitives + widget content
  it('canvas-device', async () => {
    await runTimed('canvas-device');
  });

  // useLvgl() hook — implicit LVGL ref via context, no prop drilling
  it('use-lvgl-hook-device', async () => {
    await runTimed('use-lvgl-hook-device');
  });
});
