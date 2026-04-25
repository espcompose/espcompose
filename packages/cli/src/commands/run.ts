import * as path from 'path';
import type { Command } from 'commander';
import { resolvePaths, transpileProject, extractPassthroughArgs, printMetrics, withErrorHandler } from '../utils';

export function registerRunCommand(program: Command) {
  program
    .command('run [projectDir]')
    .description(
      'Transpile, compile, and upload firmware via `esphome run`. ' +
      'Pass extra flags after `--` (e.g. `espcompose run -- --device /dev/ttyUSB0`).\n' +
      'Use --host to target the ESPHome host platform with SDL2 display rendering.',
    )
    .allowUnknownOption()
    .option('--debug', 'Keep .espcompose-build/ intermediate files for inspection')
    .option('--metrics', 'Print compiler phase timing breakdown after transpile')
    .option('--host', 'Target the ESPHome host platform with SDL2 display instead of physical hardware')
    .option('--wireframe', 'Enable colored outline overlays on all widgets for layout visualization')
    .option('--width <px>', 'Override SDL display width (only with --host)', parseInt)
    .option('--height <px>', 'Override SDL display height (only with --host)', parseInt)
    .action(withErrorHandler('Run', async (projectDir?: string, opts?: {
      debug?: boolean;
      metrics?: boolean;
      host?: boolean;
      wireframe?: boolean;
      width?: number;
      height?: number;
    }) => {
      const { createEsphomeTarget, esphomeRun } = await import('@espcompose/esphome-target');
      const { resolvedDir, yamlPath } = resolvePaths(projectDir);
      const extraArgs = extractPassthroughArgs();

      if (opts?.host) {
        // Host mode: compile to IR → transform for host → emit → run
        const { compileToIR } = await import('../compiler');
        const { transformIRForHost } = await import('@espcompose/esphome-target');

        console.log(`Compiling ${resolvedDir} for ESPHome host platform…`);
        const executeResult = await compileToIR(resolvedDir, { wireframe: opts?.wireframe });
        const hostIR = transformIRForHost(executeResult.ir, {
          width: opts.width,
          height: opts.height,
        });

        // Resolve sourceDir from package.json main field (matches compile pipeline)
        const fs = await import('fs');
        const pkgPath = path.join(resolvedDir, 'package.json');
        const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8')) as { main?: string };
        const sourceDir = pkg.main
          ? path.dirname(path.resolve(resolvedDir, pkg.main))
          : resolvedDir;

        const outDir = path.join(resolvedDir, '.espcompose');
        const target = createEsphomeTarget();
        await target.emit({
          ...executeResult,
          ir: hostIR,
          projectDir: resolvedDir,
          outDir,
          sourceDir,
        });
        console.log(`✓ Written to ${yamlPath}`);

        console.log('Running esphome run (host platform)…');
        await esphomeRun(yamlPath, extraArgs);
      } else {
        // Standard mode: transpile → run on device
        const { build } = await import('../compiler');
        const result = await transpileProject(resolvedDir, yamlPath, build, createEsphomeTarget, { debug: opts?.debug, wireframe: opts?.wireframe });
        if (opts?.metrics) printMetrics(result);
        console.log('Running esphome run…');
        await esphomeRun(yamlPath, extraArgs);
      }
    }));
}
