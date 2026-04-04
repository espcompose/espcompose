import type { Command } from 'commander';
import { withErrorHandler } from '../../utils';

export function registerInitCommand(program: Command) {
  program
    .command('init <name>')
    .description(
      'Create a new ESPHome Compose project with a minimal starter template. ' +
      'Sets up the SDK, CLI, ESLint plugin, and TypeScript configuration.',
    )
    .option('-b, --board <board>', 'ESP32 board identifier', 'esp32dev')
    .option('--library', 'Create a component library project instead of a device project')
    .action(withErrorHandler('Init', async (name: string, opts: { board: string; library?: boolean }) => {
      const { initProject } = await import('./init');
      initProject(name, { board: opts.board, library: opts.library });
    }));
}
