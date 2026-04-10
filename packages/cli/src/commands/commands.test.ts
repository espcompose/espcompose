import { describe, it, expect } from 'vitest';
import { Command } from 'commander';
import {
  registerInitCommand,
  registerTranspileCommand,
  registerConfigCommand,
  registerBuildCommand,
  registerRunCommand,
  registerLogsCommand,
  registerSimulateCommand,
} from './index';

/** Helper: register a command and return its Commander metadata. */
function getRegisteredCommand(register: (program: Command) => void) {
  const program = new Command();
  register(program);
  // Commander stores subcommands in program.commands
  expect(program.commands).toHaveLength(1);
  return program.commands[0];
}

describe('command registration', () => {
  const cases: Array<{
    name: string;
    register: (p: Command) => void;
    expectedName: string;
    expectedOptions: string[];
  }> = [
    {
      name: 'init',
      register: registerInitCommand,
      expectedName: 'init',
      expectedOptions: ['--board', '--library'],
    },
    {
      name: 'transpile',
      register: registerTranspileCommand,
      expectedName: 'transpile',
      expectedOptions: ['--debug', '--library', '--entry', '--outDir', '--tsconfig'],
    },
    {
      name: 'config',
      register: registerConfigCommand,
      expectedName: 'config',
      expectedOptions: ['--debug'],
    },
    {
      name: 'build',
      register: registerBuildCommand,
      expectedName: 'build',
      expectedOptions: ['--debug', '--library', '--entry', '--outDir', '--tsconfig'],
    },
    {
      name: 'run',
      register: registerRunCommand,
      expectedName: 'run',
      expectedOptions: ['--debug'],
    },
    {
      name: 'logs',
      register: registerLogsCommand,
      expectedName: 'logs',
      expectedOptions: ['--debug'],
    },
    {
      name: 'simulate',
      register: registerSimulateCommand,
      expectedName: 'simulate',
      expectedOptions: ['--port', '--debug', '--no-open'],
    },
  ];

  for (const { name, register, expectedName, expectedOptions } of cases) {
    describe(name, () => {
      it(`registers command "${expectedName}"`, () => {
        const cmd = getRegisteredCommand(register);
        expect(cmd.name()).toBe(expectedName);
      });

      it('has a non-empty description', () => {
        const cmd = getRegisteredCommand(register);
        expect(cmd.description()).toBeTruthy();
      });

      it(`has expected options: ${expectedOptions.join(', ')}`, () => {
        const cmd = getRegisteredCommand(register);
        const optionFlags = cmd.options.map((o) => o.long);
        for (const flag of expectedOptions) {
          expect(optionFlags).toContain(flag);
        }
      });
    });
  }
});
