import { describe, it, expect } from 'vitest';
import path from 'path';
import fs from 'fs';
import { build } from '@espcompose/cli';
import { createEsphomeTarget } from '@espcompose/target-esphome';
import { createProjectTest } from './helpers';

const projectsDir = path.resolve(__dirname, '..', 'projects');

describe('ESPHome Compose Build', () => {
  it('basic-device', async () => {
    await createProjectTest(projectsDir, 'basic-device');
  });

  it('sensor-device', async () => {
    await createProjectTest(projectsDir, 'sensor-device');
  });

  it('function-component-device', async () => {
    await createProjectTest(projectsDir, 'function-component-device');
  });

  it('script-device', async () => {
    await createProjectTest(projectsDir, 'script-device');
  });

  it('dashboard-device', async () => {
    await createProjectTest(projectsDir, 'dashboard-device');
  });

  it('lvgl-device', async () => {
    await createProjectTest(projectsDir, 'lvgl-device');
  });

  it('design-system-device', async () => {
    await createProjectTest(projectsDir, 'design-system-device');
  });

  it('trigger-device', async () => {
    await createProjectTest(projectsDir, 'trigger-device');
  });

  it('ha-binding-device', async () => {
    await createProjectTest(projectsDir, 'ha-binding-device');
  });

  it('ha-dynamic-device', async () => {
    await createProjectTest(projectsDir, 'ha-dynamic-device');
  });

  it('reactive-device', async () => {
    await createProjectTest(projectsDir, 'reactive-device');
  });

  // Additional feature tests
  it('embed-device', async () => {
    await createProjectTest(projectsDir, 'embed-device');
  });

  it('device-script-device', async () => {
    await createProjectTest(projectsDir, 'device-script-device');
  });

  it('project-device', async () => {
    await createProjectTest(projectsDir, 'project-device');
  });

  // Multi-source reactive runtime test (C++ Signal/Memo/Effect)
  it('multi-source-reactive-device', async () => {
    await createProjectTest(projectsDir, 'multi-source-reactive-device');
  });

  // Auto-reactive transform test (compiler auto-wraps Signal expressions)
  it('auto-reactive-device', async () => {
    await createProjectTest(projectsDir, 'auto-reactive-device');
  });

  // useImage + useFont hook injection and deduplication
  it('image-font-device', async () => {
    await createProjectTest(projectsDir, 'image-font-device');
  });

  // CSS-like style prop expansion and mergeStyles
  it('style-device', async () => {
    await createProjectTest(projectsDir, 'style-device');
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
      await createProjectTest(projectsDir, 'library-contract-device');
    } finally {
      fs.rmSync(path.join(projectPath, 'node_modules'), { recursive: true, force: true });
    }
  });

  // Action tree compiler — bare arrow functions → ESPHome action sequences
  it('action-tree-device', async () => {
    await createProjectTest(projectsDir, 'action-tree-device');
  });

  // Reactive theme switching: two themes, theme.select(), full token reactivity
  it('reactive-theme-device', async () => {
    await createProjectTest(projectsDir, 'reactive-theme-device');
  });

  // Component cascade: ReactiveNode flows through 3 component layers
  it('fancy-light-cascade-device', async () => {
    await createProjectTest(projectsDir, 'fancy-light-cascade-device');
  });

  // TriggerHandler in variable initializers + primitive slots in useMemo
  it('trigger-variable-device', async () => {
    await createProjectTest(projectsDir, 'trigger-variable-device');
  });
});
