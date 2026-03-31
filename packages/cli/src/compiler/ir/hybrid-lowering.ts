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
import { irSection, irScalar, irObject, irArray, irEntry } from './types.js';

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

/**
 * If the runtime strategy is chosen, inject the runtime includes into the IR.
 * Adds `espcompose_reactive.h` and `espcompose_bindings.h` to the
 * `esphome.includes:` section, and adds an `on_boot:` handler that
 * calls `espcompose_setup()`.
 */
export function injectRuntimeIncludes(ir: IRRoot): IRRoot {
  const esphomeIdx = ir.sections.findIndex(s => s.key === 'esphome');
  if (esphomeIdx === -1) return ir;

  const esphomeSection = ir.sections[esphomeIdx];
  if (esphomeSection.value.kind !== 'object') return ir;

  // Add includes — espcompose_bindings.h MUST come first so its
  // #define ESPCOMPOSE_MAX_NODES override is seen before reactive.h.
  // Both files must be listed so ESPHome copies them to the build tree.
  const includesEntry = esphomeSection.value.entries.find(e => e.key === 'includes');
  const newIncludes = [
    irScalar('espcompose_bindings.h'),
    irScalar('espcompose_reactive.h'),
  ];

  const updatedEntries = [...esphomeSection.value.entries];

  if (includesEntry && includesEntry.value.kind === 'array') {
    // Append to existing includes
    const idx = updatedEntries.indexOf(includesEntry);
    updatedEntries[idx] = irEntry('includes', irArray([
      ...includesEntry.value.items,
      ...newIncludes,
    ]));
  } else {
    // Add new includes entry
    updatedEntries.push(irEntry('includes', irArray(newIncludes)));
  }

  // Add on_boot handler that calls espcompose::setup()
  // Priority -10 ensures this runs AFTER LVGL and display are initialised.
  updatedEntries.push(irEntry('on_boot', irObject([
    irEntry('priority', irScalar(-10)),
    irEntry('then', irArray([
      irObject([irEntry('lambda', irScalar('espcompose::setup();'))]),
    ])),
  ])));

  const updatedSection = irSection('esphome', irObject(updatedEntries));
  const updatedSections = [...ir.sections];
  updatedSections[esphomeIdx] = updatedSection;

  return { kind: 'root', sections: updatedSections };
}
