import * as path from 'path';
import type { Command } from 'commander';
import { withErrorHandler } from '../utils';

export function registerSimulateCommand(program: Command) {
  program
    .command('simulate [projectDir]')
    .description(
      'Build a browser-based LVGL UI simulator preview.\n' +
      'Renders the project\'s LVGL widgets in an HTML file with mock HA entity\n' +
      'data and reactive bindings, then opens it in the default browser.\n' +
      'No firmware build or flash required.',
    )
    .option('-w, --width <px>', 'Viewport width in pixels', '320')
    .option('--height <px>', 'Viewport height in pixels', '480')
    .option('--debug', 'Keep .espcompose-build/ intermediate files for inspection')
    .action(withErrorHandler('Simulator', async (projectDir?: string, opts?: { width?: string; height?: string; debug?: boolean }) => {
      const { build } = await import('../compiler');
      const { createSimulatorTarget } = await import('@espcompose/target-simulator');
      const resolvedDir = path.resolve(projectDir ?? '.');
      const target = createSimulatorTarget({
        width: Number(opts?.width ?? 320),
        height: Number(opts?.height ?? 480),
      });
      console.log(`Building simulator for ${resolvedDir}…`);
      await build(resolvedDir, target, { debug: opts?.debug });
      console.log('✓ Simulator opened in browser');
    }));
}
