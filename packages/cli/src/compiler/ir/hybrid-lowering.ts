// ────────────────────────────────────────────────────────────────────────────
// Hybrid Lowering — decides whether a project needs the C++ reactive runtime
//
// Analyzes the IR tree to determine the reactive strategy:
//   - All bindings are single-source with no memo/effect → ESPHome-native
//     triggers (zero-overhead, existing Expression path)
//   - Any multi-source binding, memo, or effect → inject C++ reactive runtime
//     (espcompose_reactive.h + generated espcompose_bindings.h)
//
// Phase E: implements the decision logic and generates C++ binding code.
// ────────────────────────────────────────────────────────────────────────────

import type { IRRoot, IRValue } from './types.js';

export type ReactiveStrategy = 'native' | 'runtime';

export interface ReactiveAnalysis {
  strategy: ReactiveStrategy;
  /** Total number of reactive bindings in the project. */
  bindingCount: number;
  /** Number of multi-source bindings that require the runtime. */
  multiSourceCount: number;
  /** Whether any memo() or effect() nodes are present. */
  hasMemoOrEffect: boolean;
}

/**
 * Analyze an IR tree to determine the reactive strategy.
 *
 * Currently uses a simple heuristic: if any !lambda values exist
 * in the config, assume ESPHome-native. The full analysis (detecting
 * ReactiveNode instances) will be added when IR construction walks
 * the JSX tree directly.
 */
export function analyzeReactiveStrategy(ir: IRRoot): ReactiveAnalysis {
  let lambdaCount = 0;

  function walkValue(val: IRValue): void {
    switch (val.kind) {
      case 'lambda':
        lambdaCount++;
        break;
      case 'object':
        for (const entry of val.entries) {
          walkValue(entry.value);
        }
        break;
      case 'array':
        for (const item of val.items) {
          walkValue(item);
        }
        break;
    }
  }

  for (const section of ir.sections) {
    walkValue(section.value);
  }

  // Phase E: always use native strategy for now.
  // When IR construction captures ReactiveNode instances directly,
  // this will check for multi-source deps and memo/effect nodes.
  return {
    strategy: 'native',
    bindingCount: lambdaCount,
    multiSourceCount: 0,
    hasMemoOrEffect: false,
  };
}
