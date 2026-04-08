import * as path from 'path';
import { exec } from 'child_process';
import type { Command } from 'commander';
import { withErrorHandler } from '../utils';

export function registerSimulateCommand(program: Command) {
  program
    .command('simulate [projectDir]')
    .description(
      'Start a live simulator dev server.\n' +
      'Compiles the project to SemanticIR, launches an HTTP + WebSocket server\n' +
      'hosting the React simulator app, and watches source files for changes.\n' +
      'When files change, the project is recompiled and the browser updates\n' +
      'automatically via WebSocket hot reload.',
    )
    .option('-w, --width <px>', 'Viewport width in pixels (auto-detected from project if omitted)')
    .option('--height <px>', 'Viewport height in pixels (auto-detected from project if omitted)')
    .option('-p, --port <port>', 'Dev server port', '5420')
    .option('--debug', 'Keep .espcompose-build/ intermediate files for inspection')
    .option('--no-open', 'Do not open the browser automatically')
    .action(withErrorHandler('Simulator', async (
      projectDir?: string,
      opts?: { width?: string; height?: string; port?: string; debug?: boolean; open?: boolean },
    ) => {
      const { compileToIR } = await import('../compiler');
      const { startDevServer, startFileWatcher } = await import('@espcompose/target-simulator');

      const resolvedDir = path.resolve(projectDir ?? '.');
      const port = Number(opts?.port ?? 5420);
      // Pass undefined when not explicitly set so the dev server can auto-detect from IR
      const displayWidth = opts?.width != null ? Number(opts.width) : undefined;
      const displayHeight = opts?.height != null ? Number(opts.height) : undefined;
      const projectName = path.basename(resolvedDir);

      // Resolve the pre-built simulator-app dist directory
      const appPkgPath = require.resolve('@espcompose/simulator-app/package.json');
      const staticDir = path.join(path.dirname(appPkgPath), 'dist');

      // ── Initial compile ──────────────────────────────────────────────────
      console.log(`Building simulator for ${resolvedDir}…`);
      let currentIR = await compileToIR(resolvedDir);
      console.log('✓ Initial build complete');

      // ── Start dev server ─────────────────────────────────────────────────
      const server = await startDevServer({
        staticDir,
        port,
        initialIR: currentIR,
        projectName,
        displayWidth,
        displayHeight,
      });

      const url = `http://localhost:${server.port}`;
      console.log(`\n  Simulator running at ${url}\n`);

      // Open browser
      if (opts?.open !== false) {
        openInBrowser(url);
      }

      // ── File watcher ─────────────────────────────────────────────────────
      const watcher = startFileWatcher({
        projectDir: resolvedDir,
        onChange: async () => {
          console.log('\n  Source changed — rebuilding…');
          server.broadcastBuildStart();
          try {
            currentIR = await compileToIR(resolvedDir);
            server.broadcastIR(currentIR);
            console.log('  ✓ Rebuild complete');
          } catch (err) {
            const message = err instanceof Error ? err.message : String(err);
            const stack = err instanceof Error ? err.stack : undefined;
            server.broadcastBuildError(message, undefined, stack);
            console.error('  ✗ Rebuild failed:', message);
          }
        },
      });

      // ── Graceful shutdown ────────────────────────────────────────────────
      const shutdown = async () => {
        console.log('\n  Shutting down simulator…');
        watcher.close();
        await server.close();
        process.exit(0);
      };

      process.on('SIGINT', shutdown);
      process.on('SIGTERM', shutdown);
    }));
}

function openInBrowser(url: string): void {
  switch (process.platform) {
    case 'darwin':
      exec(`open "${url}"`);
      break;
    case 'win32':
      exec(`start "" "${url}"`);
      break;
    default:
      exec(`xdg-open "${url}"`);
      break;
  }
}
