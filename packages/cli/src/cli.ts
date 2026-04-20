#!/usr/bin/env node

import { program } from 'commander';
import {
  registerInitCommand,
  registerTranspileCommand,
  registerConfigCommand,
  registerBuildCommand,
  registerRunCommand,
  registerLogsCommand,
  registerUpgradeCommand,
} from './commands';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const packageJson = require('../package.json') as { version: string };

program
  .name('espcompose')
  .description('ESPHome Compose CLI — Transpile TSX component trees to ESPHome YAML and manage devices')
  .version(packageJson.version);

registerInitCommand(program);
registerTranspileCommand(program);
registerConfigCommand(program);
registerBuildCommand(program);
registerRunCommand(program);
registerLogsCommand(program);
registerUpgradeCommand(program);

program.parse();
