import { describe, it, expect } from 'vitest';
import path from 'path';
import fs from 'fs';
import { build } from '@esphome/compose-cli';
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

  // Untransformed library detection — build should fail with a clear error
  it('uncompiled-lib-device (detects untransformed library)', async () => {
    const projectPath = path.resolve(projectsDir, 'uncompiled-lib-device');
    const fakeLibDir = path.join(projectPath, 'node_modules', '@test', 'reactive-lib');

    // Create a fake pre-built library that uses useMemo() without transform-lib
    fs.mkdirSync(fakeLibDir, { recursive: true });
    fs.writeFileSync(
      path.join(fakeLibDir, 'package.json'),
      JSON.stringify({ name: '@test/reactive-lib', main: 'index.js' }),
    );
    fs.writeFileSync(
      path.join(fakeLibDir, 'index.js'),
      [
        '"use strict";',
        'const { useHAEntity, useMemo } = require("@esphome/compose");',
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
        build(projectPath),
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
    // and _reactive.compiled() calls (as transform-lib would produce)
    fs.mkdirSync(fakeLibDir, { recursive: true });
    fs.writeFileSync(
      path.join(fakeLibDir, 'package.json'),
      JSON.stringify({ name: '@test/compiled-lib', main: 'index.js' }),
    );
    fs.writeFileSync(
      path.join(fakeLibDir, 'index.js'),
      [
        '"use strict";',
        'const __espcompose_format__ = 1;',
        'exports.__espcompose_format__ = __espcompose_format__;',
        'const { _reactive, useHAEntity } = require("@esphome/compose");',
        'const { jsx } = require("@esphome/compose/jsx-runtime");',
        'function StatusSensor() {',
        '  const light = useHAEntity("light.office");',
        '  const text = _reactive.compiled({',
        '    cpp: "sig_ha_light_office.get() ? std::string(\\"On\\") : std::string(\\"Off\\")",',
        '    type: "std::string",',
        '    deps: [{',
        '      signalName: "sig_ha_light_office",',
        '      sourceId: "ha_light_office",',
        '      triggerType: "on_state",',
        '      sourceDomain: "binary_sensor",',
        '      cppType: "bool"',
        '    }]',
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
});
