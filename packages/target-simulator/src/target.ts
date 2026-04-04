// ────────────────────────────────────────────────────────────────────────────
// Simulator ComposeTarget implementation
//
// Implements the generic ComposeTarget interface for the browser-based
// LVGL UI simulator. Builds a self-contained HTML file from SemanticIR,
// writes it to disk, and opens it in the default browser.
// ────────────────────────────────────────────────────────────────────────────

import * as fs from 'fs';
import * as path from 'path';
import { exec } from 'child_process';
import type { ComposeTarget, EmitRequest, EmitResult } from '@espcompose/core/internals';
import { simulatorBuildFromIR } from './build';

export interface SimulatorTargetOptions {
  width?: number;
  height?: number;
}

export function createSimulatorTarget(options?: SimulatorTargetOptions): ComposeTarget {
  return {
    name: 'simulator',

    async emit(request: EmitRequest): Promise<EmitResult> {
      const { ir, outDir, projectDir } = request;
      const projectName = path.basename(path.resolve(projectDir));

      const result = simulatorBuildFromIR(ir, {
        width: options?.width,
        height: options?.height,
        projectName,
      });

      fs.mkdirSync(outDir, { recursive: true });
      const htmlPath = path.join(outDir, 'simulator.html');
      fs.writeFileSync(htmlPath, result.html, 'utf8');

      // Open in default browser
      openInBrowser(htmlPath);

      return { files: [htmlPath] };
    },
  };
}

function openInBrowser(filePath: string): void {
  const url = `file://${filePath}`;
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
