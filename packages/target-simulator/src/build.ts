// ────────────────────────────────────────────────────────────────────────────
// Simulator build pipeline
//
// Converts a SemanticIR (produced by the CLI compiler) into a
// SimulatorBuildResult containing RuntimeNode[] and rendered HTML.
// ────────────────────────────────────────────────────────────────────────────

import { Scheduler, MockProvider, lowerToSimulator, extractDisplayConfig, type RuntimeNode } from '@espcompose/simulator-app/runtime';
import { renderSimulatorPage } from './renderer/lvgl-dom';
import type { SemanticIR } from '@espcompose/core/internals';

// ── Build result ─────────────────────────────────────────────────────────────

export interface SimulatorBuildResult {
  nodes: RuntimeNode[];
  provider: MockProvider;
  html: string;
  /** Flush pending reactive updates after mutating entity state. */
  flush: () => void;
}

// ── IR-based simulator build ─────────────────────────────────────────────────

/**
 * Build the simulator from a SemanticIR.
 *
 * The real compiler has already run (AST transforms, bundle, execute,
 * render, capture) and produced a SemanticIR. This function converts
 * it to RuntimeNode[] for the browser.
 */
export function simulatorBuildFromIR(
  ir: SemanticIR,
  options?: {
    projectName?: string;
  },
): SimulatorBuildResult {
  const provider = new MockProvider();
  Scheduler.reset();

  const nodes = lowerToSimulator(ir, provider);

  console.log(`  Rendered ${countNodes(nodes)} widget(s) (IR path)`);

  // Resolve display dimensions from the frontend-owned runtime helpers.
  const irConfig = extractDisplayConfig(ir);
  const width = irConfig?.width ?? 320;
  const height = irConfig?.height ?? 480;

  const html = renderSimulatorPage({
    nodes,
    width,
    height,
    provider,
    projectName: options?.projectName ?? 'Simulator',
    themeData: ir.espcompose.themes,
  });

  return { nodes, provider, html, flush: () => Scheduler.instance().flush() };
}

// ── Utilities ────────────────────────────────────────────────────────────────

function countNodes(nodes: RuntimeNode[]): number {
  let count = nodes.length;
  for (const n of nodes) {
    count += countNodes(n.children);
  }
  return count;
}
