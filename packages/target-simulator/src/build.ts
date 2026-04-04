// ────────────────────────────────────────────────────────────────────────────
// Simulator build pipeline
//
// Converts a SemanticIR (produced by the CLI compiler) into a
// SimulatorBuildResult containing RuntimeNode[] and rendered HTML.
// ────────────────────────────────────────────────────────────────────────────

import { Scheduler } from './runtime/signals';
import { MockProvider } from './providers/mock-provider';
import { renderSimulatorPage } from './renderer/lvgl-dom';
import { lowerToSimulator } from './backends/ir-renderer';
import type { RuntimeNode } from './types';
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
    width?: number;
    height?: number;
    projectName?: string;
  },
): SimulatorBuildResult {
  const provider = new MockProvider();
  Scheduler.reset();

  const nodes = lowerToSimulator(ir, provider);

  console.log(`  Rendered ${countNodes(nodes)} widget(s) (IR path)`);

  const html = renderSimulatorPage({
    nodes,
    width: options?.width ?? 320,
    height: options?.height ?? 480,
    provider,
    projectName: options?.projectName ?? 'Simulator',
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
