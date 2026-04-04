import { describe, it, expect } from 'vitest';
import { Command } from 'commander';
import {
  registerInitCommand,
  registerTranspileCommand,
  registerConfigCommand,
  registerCompileCommand,
  registerRunCommand,
  registerLogsCommand,
  registerSimulateCommand,
  registerTransformLibCommand,
  registerLibraryCommand,
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
      expectedOptions: ['--debug'],
    },
    {
      name: 'config',
      register: registerConfigCommand,
      expectedName: 'config',
      expectedOptions: ['--debug'],
    },
    {
      name: 'compile',
      register: registerCompileCommand,
      expectedName: 'compile',
      expectedOptions: ['--debug'],
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
      expectedOptions: ['--width', '--height', '--debug'],
    },
    {
      name: 'transform-lib',
      register: registerTransformLibCommand,
      expectedName: 'transform-lib',
      expectedOptions: ['--entry', '--outDir', '--tsconfig'],
    },
    {
      name: 'library',
      register: registerLibraryCommand,
      expectedName: 'library',
      expectedOptions: ['--entry', '--outDir', '--tsconfig'],
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
