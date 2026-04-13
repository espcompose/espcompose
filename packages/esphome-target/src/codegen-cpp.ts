// ────────────────────────────────────────────────────────────────────────────
// C++ Backend — Generate espcompose_bindings.h from SemanticIR
//
// Uses the side-channel arrays on ir.espcompose.reactive as the authoritative
// source and delegates to the existing buildRuntimeConfig and generateBindingsHeader
// functions.
// ────────────────────────────────────────────────────────────────────────────

import type { SemanticIR } from '@espcompose/core/internals';
import { buildRuntimeConfig } from './reactive-config.js';
import { generateBindingsHeader } from './bindings-codegen.js';
import type { ReactiveRuntimeConfig } from './bindings-codegen.js';

export interface CppBackendResult {
  runtimeConfig: ReactiveRuntimeConfig;
  bindingsHeaderContent: string;
}

/**
 * Generate C++ reactive runtime headers from a SemanticIR.
 *
 * Uses the side-channel arrays (bindings, reactiveNodes) as the
 * authoritative source since hook-registered data may not appear
 * in the config tree.
 *
 * Returns null if the IR has no reactive content (no reactive nodes,
 * no themes).
 */
export function generateCppFromIR(ir: SemanticIR): CppBackendResult | null {
  const { reactive, themes } = ir.espcompose;
  const hasReactiveContent = reactive.bindings.length > 0
    || reactive.memos.length > 0
    || reactive.effects.length > 0
    || (themes != null);

  if (!hasReactiveContent) return null;

  const runtimeConfig = buildRuntimeConfig(
    [...reactive.memos, ...reactive.effects],
    reactive.bindings,
    ir.esphome.haEntities,
    themes,
    [],
  );

  return {
    runtimeConfig,
    bindingsHeaderContent: generateBindingsHeader(runtimeConfig),
  };
}
