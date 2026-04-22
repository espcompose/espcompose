import { describe, afterAll } from 'vitest';
import path from 'path';
import fs from 'fs';
import { projectTest, projectsDir } from '../run-project';

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

describe('library-contract-device', () => {
  projectTest('library-contract-device');

  afterAll(() => {
    fs.rmSync(path.join(projectPath, 'node_modules'), { recursive: true, force: true });
  });
});
