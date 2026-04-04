#!/usr/bin/env tsx
/**
 * Proof-of-concept: run the demo project through the simulator target.
 *
 * Pipeline:
 *   build(projectDir, createSimulatorTarget()) — full compiler pipeline
 *   through the ComposeTarget interface → HTML file opened in browser.
 *
 * Usage:
 *   pnpm tsx scripts/run-simulator-ir.ts
 */

import * as path from 'path';
import { build } from '../packages/cli/src/compiler/compiler';
import { createSimulatorTarget } from '../packages/target-simulator/src/target';

async function main() {
  const demoDir = path.resolve(__dirname, '../packages/demo');
  console.log(`\n=== Simulator Target ===`);
  console.log(`  Project: ${demoDir}\n`);

  const target = createSimulatorTarget({ width: 320, height: 480 });
  await build(demoDir, target);

  console.log('\n=== Done ===\n');
}

main().catch((err) => {
  console.error('\nFailed:', err);
  process.exit(1);
});
