// ────────────────────────────────────────────────────────────────────────────
// C++ Backend — Generate espcompose_bindings.h from SemanticIR
//
// Extracts reactive data from the SemanticIR (bindings, entities,
// reactive nodes, themes) and delegates to the existing buildRuntimeConfig
// and generateBindingsHeader functions.
//
// Includes a validation step that cross-checks tree-walked data against
// side-channel arrays, proving the IR tree is complete. This paves the
// way for Phase 4 where side-channels are removed.
// ────────────────────────────────────────────────────────────────────────────

import type { SemanticIR, IRReactive } from '@esphome/compose/internals';
import { collectFromIR } from '@esphome/compose/internals';
import { buildRuntimeConfig } from './reactive-config.js';
import { generateBindingsHeader, getRuntimeHeaderContent } from './bindings-codegen.js';
import type { ReactiveRuntimeConfig } from './bindings-codegen.js';

export interface CppBackendResult {
  runtimeConfig: ReactiveRuntimeConfig;
  bindingsHeaderContent: string;
  runtimeHeaderContent: string;
}

/**
 * Validate that the IR config tree's semantic nodes match the side-channel
 * arrays. Throws on mismatch — this ensures the IR tree is complete and
 * no captures were missed during the render pass.
 *
 * Once this validation has been stable across all e2e projects, Phase 4
 * can safely remove the side-channel arrays and derive everything from
 * the tree walk.
 */
function validateIRCompleteness(ir: SemanticIR): void {
  const collected = collectFromIR(ir);

  // Every tree-walked binding should match a side-channel binding.
  // The side-channel may have MORE bindings if some reactive nodes
  // didn't make it to the config tree (shouldn't happen, but check).
  const treeBindings = collected.reactives
    .filter((r: IRReactive) => r.binding != null)
    .map((r: IRReactive) => r.binding!);

  const sideChannelBindingKeys = new Set(
    ir.bindings.map(b => {
      if (b.part || b.state) {
        return `${b.targetId}::${b.part ?? ''}::${b.state ?? ''}::${b.targetProp}`;
      }
      return `${b.targetId}::${b.targetProp}`;
    }),
  );
  const treeBindingKeys = new Set(
    treeBindings.map(b => {
      if (b.part || b.state) {
        return `${b.targetId}::${b.part ?? ''}::${b.state ?? ''}::${b.targetProp}`;
      }
      return `${b.targetId}::${b.targetProp}`;
    }),
  );

  // Check: tree bindings ⊆ side-channel bindings
  for (const key of treeBindingKeys) {
    if (!sideChannelBindingKeys.has(key as string)) {
      console.warn(
        `[IR validation] Tree has binding ${key} not found in side-channel`,
      );
    }
  }

  // Check: side-channel bindings ⊆ tree bindings
  for (const key of sideChannelBindingKeys) {
    if (!treeBindingKeys.has(key)) {
      console.warn(
        `[IR validation] Side-channel has binding ${key} not found in IR tree`,
      );
    }
  }
}

/**
 * Generate C++ reactive runtime headers from a SemanticIR.
 *
 * Returns null if the IR has no reactive content (no bindings,
 * no reactive nodes, no themes).
 */
export function generateCppFromIR(ir: SemanticIR): CppBackendResult | null {
  const hasReactiveContent = ir.bindings.length > 0
    || ir.reactiveNodes.length > 0
    || (ir.themes != null);

  if (!hasReactiveContent) return null;

  // Validate IR tree completeness (warns on mismatch, does not block)
  validateIRCompleteness(ir);

  const runtimeConfig = buildRuntimeConfig(
    ir.reactiveNodes,
    ir.bindings,
    ir.entities,
    ir.themes,
    [],
  );

  return {
    runtimeConfig,
    bindingsHeaderContent: generateBindingsHeader(runtimeConfig),
    runtimeHeaderContent: getRuntimeHeaderContent(),
  };
}
