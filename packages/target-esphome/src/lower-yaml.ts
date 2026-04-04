// ────────────────────────────────────────────────────────────────────────────
// YAML Backend — Lower SemanticIR to YAML-ready config
//
// Takes a target-agnostic SemanticIR and produces the final YAML config
// object ready for serialization via yaml.stringify(). Creates real yaml.Scalar
// instances for proper tag and quoting handling.
//
// Also performs all post-lowering injections: HA sensor imports, reactive
// bindings runtime, component definitions, and script definitions.
// ────────────────────────────────────────────────────────────────────────────

import { Scalar } from 'yaml';
import type { SemanticIR, IRValue, IRObject, IRArray, IRAction, IRSecret, IRTriggerVar } from '@espcompose/core/internals';
import { getTriggerSignature } from '@espcompose/core/internals';
import { injectHASensorImports } from './reactive-injector.js';
import { injectReactiveBindingsRuntime } from './reactive-config.js';
import type { CppLoweringContext } from './expr-to-cpp.js';
import type { CppBackendResult } from './codegen-cpp.js';
import { lowerActionTree } from './action-lowering.js';

// ── YAML Scalar constructors ─────────────────────────────────────────────

function createYamlLambda(body: string): Scalar {
  const s = new Scalar(body);
  s.type = Scalar.QUOTE_DOUBLE;
  s.tag = '!lambda';
  return s;
}

function createYamlSecret(key: string): Scalar {
  const s = new Scalar(key);
  s.tag = '!secret';
  return s;
}

// ── Lambda marker restoration ────────────────────────────────────────────
// Action trees use { __lambda__: "code" } markers for lambda values
// (they must survive JSON.stringify in the script transformer).
// Here we restore them to real YAML !lambda scalars.

function isLambdaMarker(v: unknown): v is { __lambda__: string } {
  return v !== null && typeof v === 'object' && '__lambda__' in v &&
    typeof (v as Record<string, unknown>).__lambda__ === 'string';
}

function restoreLambdaMarkers(value: unknown): unknown {
  if (isLambdaMarker(value)) return createYamlLambda(value.__lambda__);
  if (Array.isArray(value)) return value.map(restoreLambdaMarkers);
  if (value !== null && typeof value === 'object') {
    const obj: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      obj[k] = restoreLambdaMarkers(v);
    }
    return obj;
  }
  return value;
}

// ── Ref binding resolution ───────────────────────────────────────────────
// Resolves ref variable names in actions to their runtime ref tokens.

function resolveRefBindingsInValue(
  value: unknown,
  refBindings: Record<string, unknown>,
): unknown {
  if (value === null || value === undefined) return value;
  if (typeof value === 'string') {
    const bound = refBindings[value];
    if (bound !== undefined && typeof bound === 'object' && bound !== null && 'toString' in bound) {
      return bound.toString();
    }
    return value;
  }
  if (Array.isArray(value)) {
    return value.map(item => resolveRefBindingsInValue(item, refBindings));
  }
  if (typeof value === 'object') {
    const obj: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      obj[k] = resolveRefBindingsInValue(v, refBindings);
    }
    return obj;
  }
  return value;
}

// ── Initial value lambda generation ──────────────────────────────────────
// Generates C++ lambda bodies for reactive prop initial values.
// These run at boot before the reactive runtime is active, reading
// directly from ESPHome components or reactive runtime variables.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function generateInitialValueLambda(node: any, ctx?: CppLoweringContext): string {
  if (node.kind === 'expression') {
    // Theme-sourced expression — read from the generated theme memo
    if (node.dependencies?.[0]?.sourceType === 'theme') {
      const exprIR = node.exprIR;
      if (exprIR?.kind === 'theme_read') {
        const varName = ctx?.themeVarNames.get(exprIR.path) ?? `thm_${exprIR.path}`;
        return `return espcompose::${varName}.get();`;
      }
      return `return 0;`;
    }

    // HA entity expression — read directly from the ESPHome component
    if (node.sourceId && node.property) {
      const raw = `id(${node.sourceId})${node.property}`;
      const exprType = node.exprType;
      // Check if we need type conversion (e.g. stateText: bool → string)
      if (exprType === 'string' && node.sourceDomain && node.triggerType) {
        const sig = getTriggerSignature(node.sourceDomain, node.triggerType);
        const sourceType = sig?.variables[0]?.cppType;
        if (sourceType && sourceType !== 'std::string') {
          return `return ${wrapInitialConversion(raw, sourceType)};`;
        }
      }
      return `return ${raw};`;
    }
  }

  // Memo: read from runtime memo variable
  const memoName = ctx?.memoNames?.get(node.nodeId) ?? node.nodeId;
  const exprType = node.exprType;
  if (exprType === 'string') {
    return `return espcompose::${memoName}.get().c_str();`;
  }
  return `return espcompose::${memoName}.get();`;
}

/** Wrap a C++ expression for conversion to std::string for initial value lambdas. */
function wrapInitialConversion(expr: string, fromCppType: string): string {
  if (fromCppType === 'bool') return `std::string(${expr} ? "on" : "off")`;
  if (fromCppType === 'float') return `to_string(${expr})`;
  return expr;
}

// ── IR value → YAML config value ─────────────────────────────────────────

/**
 * Convert a semantic IR value node to a YAML-ready config value.
 *
 * Unlike the SDK's lowerSemanticIR() (which creates plain objects for testing),
 * this function creates real yaml.Scalar instances that the YAML serializer
 * handles correctly — preserving tags (!lambda, !secret) and quoting.
 */
function irValueToYaml(node: IRValue, ctx?: CppLoweringContext): unknown {
  switch (node.kind) {
    case 'null':
      return null;

    case 'scalar':
      if (node.quoted && typeof node.value === 'string') {
        const s = new Scalar(node.value);
        s.type = Scalar.QUOTE_SINGLE;
        return s;
      }
      return node.value;

    case 'reactive':
      return createYamlLambda(generateInitialValueLambda(node.node, ctx));

    case 'ref':
      return node.token;

    case 'action': {
      const actionNode = node as IRAction;
      // Lower IRActionNode[] to ESPHome YAML format, then resolve ref bindings
      let actions: unknown[] = lowerActionTree(actionNode.actions);
      if (actionNode.refBindings) {
        actions = actions.map(a =>
          resolveRefBindingsInValue(a, actionNode.refBindings!),
        );
      }
      return restoreLambdaMarkers(actions);
    }

    case 'secret':
      return createYamlSecret((node as IRSecret).key);

    case 'trigger_var':
      return createYamlLambda(`return ${(node as IRTriggerVar).name};`);

    case 'array':
      return (node as IRArray).items.map(item => irValueToYaml(item, ctx));

    case 'object': {
      const obj: Record<string, unknown> = {};
      for (const entry of (node as IRObject).entries) {
        obj[entry.key] = irValueToYaml(entry.value, ctx);
      }
      return obj;
    }

    default:
      return null;
  }
}

/**
 * Lower a SemanticIR config tree to a plain YAML-ready config object.
 */
function lowerIRConfig(ir: SemanticIR, ctx?: CppLoweringContext): Record<string, unknown> {
  const config: Record<string, unknown> = {};
  for (const section of ir.esphome.sections) {
    config[section.key] = irValueToYaml(section.value, ctx);
  }
  return config;
}

// ────────────────────────────────────────────────────────────────────────────
// Public API
// ────────────────────────────────────────────────────────────────────────────

/**
 * Lower a SemanticIR to a fully-assembled YAML config object.
 *
 * This is the YAML backend's main entry point. It:
 * 1. Lowers the IR config tree to YAML-ready objects (with real yaml.Scalar)
 * 2. Injects reactive bindings or HA sensor imports
 * 3. Injects component definitions (images, fonts)
 * 4. Injects script definitions
 */
export function lowerToYamlConfig(
  ir: SemanticIR,
  cppResult: CppBackendResult | null,
): Record<string, unknown> {
  // Use side-channel arrays as authoritative source for reactive data
  // (hook-registered nodes may not appear in the config tree)
  const reactiveNodes = [...ir.espcompose.reactive.memos, ...ir.espcompose.reactive.effects];
  const bindings = ir.espcompose.reactive.bindings;

  // Build a CppLoweringContext for initial value lambda generation
  let cppCtx: CppLoweringContext | undefined;
  if (cppResult) {
    const entityComponentIds = new Map<string, string>();
    for (const entity of ir.esphome.haEntities) {
      if (entity.entityId && entity.generatedId) {
        entityComponentIds.set(entity.entityId, entity.generatedId);
      }
    }
    const themeVarNames = new Map<string, string>();
    if (ir.espcompose.themes) {
      for (const signalPath of ir.espcompose.themes.leafData.keys()) {
        themeVarNames.set(signalPath, `thm_${signalPath}`);
      }
    }
    // Populate memoNames from reactive nodes
    const memoNames = new Map<string, string>();
    let memoIdx = 0;
    for (const node of reactiveNodes) {
      if (node.kind === 'memo') {
        memoNames.set(node.nodeId, `memo_${memoIdx}`);
        memoIdx++;
      }
    }
    cppCtx = {
      signalNames: new Map(),
      memoNames,
      slotExprs: new Map(),
      entityComponentIds,
      themeVarNames,
    };
  }

  const loweredConfig = lowerIRConfig(ir, cppCtx);

  let finalConfig: Record<string, unknown>;
  if (cppResult) {
    finalConfig = injectReactiveBindingsRuntime(
      loweredConfig,
      bindings,
      ir.esphome.haEntities,
      cppResult.runtimeConfig,
    );
  } else {
    finalConfig = injectHASensorImports(loweredConfig, ir.esphome.haEntities);
  }

  if (ir.esphome.components.length > 0) {
    for (const comp of ir.esphome.components) {
      const section = comp.section;
      if (!finalConfig[section]) {
        finalConfig[section] = [];
      }
      (finalConfig[section] as unknown[]).push(comp.config);
    }
  }

  if (ir.esphome.scripts.length > 0) {
    finalConfig['script'] = ir.esphome.scripts.map((s) => ({
      id: s.id,
      then: lowerActionTree(s.then),
    }));
  }

  return finalConfig;
}
