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

  it('reactive-device', async () => {
    await createProjectTest(projectsDir, 'reactive-device');
  });

  // New authoring model tests (defineProject, build.run, embed.*, device.script)
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

  // Untransformed library detection — build should fail with a clear error
  it('uncompiled-lib-device (detects untransformed library)', async () => {
    const projectPath = path.resolve(projectsDir, 'uncompiled-lib-device');
    const fakeLibDir = path.join(projectPath, 'node_modules', '@test', 'reactive-lib');

    // Create a fake pre-built library that uses bind.memo() without transform-lib
    fs.mkdirSync(fakeLibDir, { recursive: true });
    fs.writeFileSync(
      path.join(fakeLibDir, 'package.json'),
      JSON.stringify({ name: '@test/reactive-lib', main: 'index.js' }),
    );
    fs.writeFileSync(
      path.join(fakeLibDir, 'index.js'),
      [
        '"use strict";',
        'const { bind } = require("@esphome/compose");',
        'function BadWidget() {',
        '  const light = bind.haEntity("light.fake_test");',
        '  bind.memo(() => light.isOn ? "On" : "Off");',
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

  // Action tree compiler — bare arrow functions → ESPHome action sequences
  it('action-tree-device', async () => {
    await createProjectTest(projectsDir, 'action-tree-device');
  });
});
