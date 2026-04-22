import { describe, it, expect } from 'vitest';
import path from 'path';
import fs from 'fs';
import { build } from '@espcompose/cli';
import { createEsphomeTarget } from '@espcompose/esphome-target';
import { projectsDir } from '../run-project';

describe('uncompiled-lib-device', () => {
  it('detects untransformed library', async () => {
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
});
