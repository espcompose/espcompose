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
import type { SemanticIR, IRValue, IRObject, IRArray, IRAction, IRSecret, IRTriggerVar, IRType } from '@espcompose/core/internals';
import { getTriggerSignature } from '@espcompose/core/internals';
import type { IRActionNode, IRUIRegistry, IRWidget } from '@espcompose/core/internals';
import { injectHASensorImports, injectReactiveBindingsRuntime } from './codegen';
import type { CppLoweringContext } from './lowering';
import { buildEntityComponentIds, irTypeToEsphomeParam, irTypeToCpp, resolveEntityPropertyCppPath, sourceDomainToTrigger } from './lowering';
import type { CppBackendResult } from './codegen';
import { lowerActionTree, type ActionLoweringContext } from './actions';
import { transformEcCanvasWidgets, translateLvglStyleValues, lowerLvglWidgetTree, type LvglValueLoweringContext } from './lvgl';
import { camelToSnake } from './yaml-utils.js';
import { buildEntityIdMap } from './ha-entity-classifier.js';

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

/** Sentinel returned by irValueToYaml to signal "omit this entry from the parent object". */
const SKIP_ENTRY = Symbol('SKIP_ENTRY');

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

/**
 * Like `restoreLambdaMarkers`, but prepends `prefix` to every lambda body
 * encountered in the tree. Used when emitting a parameterized script body
 * that needs `auto& closure = ...;` available in every lambda action.
 */
function restoreLambdaMarkersWithPrefix(value: unknown, prefix: string): unknown {
  if (isLambdaMarker(value)) return createYamlLambda(`${prefix}${value.__lambda__}`);
  if (Array.isArray(value)) return value.map((v) => restoreLambdaMarkersWithPrefix(v, prefix));
  if (value !== null && typeof value === 'object') {
    const obj: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      obj[k] = restoreLambdaMarkersWithPrefix(v, prefix);
    }
    return obj;
  }
  return value;
}

// ── Ref binding resolution ───────────────────────────────────────────────
// Resolves ref variable names in actions to their runtime ref tokens.

function resolveRefBindingsInValue(
  value: unknown,
  refBindings: Record<string, string>,
): unknown {
  if (value === null || value === undefined) return value;
  if (typeof value === 'string') {
    const bound = refBindings[value];
    if (bound !== undefined) {
      return bound;
    }
    return value;
  }
  if (Array.isArray(value)) {
    return value.map(item => resolveRefBindingsInValue(item, refBindings));
  }
  if (typeof value === 'object') {
    const obj: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      if (k === '__lambda__' && typeof v === 'string') {
        // Resolve ref names embedded in lambda code: refName → resolvedToken
        // The user controls the surrounding C++ (e.g. `id(${ref})`), so we
        // replace just the bare ref name, not wrapping in id().
        let code = v;
        for (const [refName, bound] of Object.entries(refBindings)) {
          code = code.replaceAll(refName, bound);
        }
        obj[k] = code;
      } else {
        obj[k] = resolveRefBindingsInValue(v, refBindings);
      }
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
      if (exprIR?.kind === 'expr:theme_read') {
        const scopedKey = `${exprIR.scopeId}_${exprIR.path}`;
        const varName = ctx?.themeVarNames.get(scopedKey) ?? `thm_${scopedKey}`;
        return `return espcompose::${varName}.get();`;
      }
      return `return 0;`;
    }

    // HA entity expression — read directly from the ESPHome component
    if (node.sourceId && node.propertyKey) {
      if (!node.sourceDomain) {
        throw new Error(
          `[espcompose] HA entity expression missing sourceDomain ` +
            `(sourceId='${node.sourceId}', propertyKey='${node.propertyKey}')`,
        );
      }
      const resolvedId = ctx?.entityIdRemap?.get(node.sourceId) ?? node.sourceId;
      const raw = `id(${resolvedId})${resolveEntityPropertyCppPath(node.sourceDomain, node.propertyKey)}`;
      const exprType = node.exprType;
      // Check if we need type conversion (e.g. stateText: bool → string)
      if (exprType === 'string' && node.sourceDomain) {
        const trigger = sourceDomainToTrigger(node.sourceDomain);
        const sig = getTriggerSignature(node.sourceDomain, trigger);
        const sourceVT = sig?.variables[0]?.irType;
        const sourceType = sourceVT ? irTypeToCpp(sourceVT) : undefined;
        if (sourceType && sourceType !== 'std::string') {
          return `return ${wrapInitialConversion(raw, sourceType)};`;
        }
      }
      return `return ${raw};`;
    }
  }

  // Memo: read from runtime memo variable
  const memoName = ctx?.memoNames?.get(node.nodeId);
  if (!memoName) {
    const mapSize = ctx?.memoNames?.size ?? 0;
    const knownKeys = ctx?.memoNames ? Array.from(ctx.memoNames.keys()).join(', ') : '(no ctx)';
    const deps = (node.dependencies ?? []).map((d: { sourceId?: string; sourceType?: string }) => `${d.sourceType ?? '?'}:${d.sourceId ?? '?'}`).join(', ');
    const exprKind = node.exprIR?.kind ?? 'none';
    const pipeline = ctx?.pipelineInfo ?? '(no pipeline info)';
    throw new Error(
      `[espcompose] Memo node '${node.nodeId}' not found in memoNames map.\n` +
      `  node.kind=${node.kind}, exprType=${node.exprType ?? 'undefined'}, exprIR.kind=${exprKind}\n` +
      `  dependencies=[${deps}]\n` +
      `  pipeline: ${pipeline}\n` +
      `  memoNames has ${mapSize} entries: [${knownKeys}]\n` +
      `This memo was referenced in the IR config tree but was not included in the reactive pipeline.`,
    );
  }
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
function irValueToYaml(node: IRValue, ctx?: CppLoweringContext, actionCtx?: ActionLoweringContext): unknown {
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

    case 'reactive': {
      // font_ref values are set by the reactive Effect after on_boot —
      // skip emitting an initial-value lambda in the YAML because ESPHome
      // evaluates it during LVGL widget setup, before fonts are ready.
      const reactiveNode = (node as { node: { exprType?: string } }).node;
      if (reactiveNode?.exprType === 'font_ref') {
        return SKIP_ENTRY;
      }
      return createYamlLambda(generateInitialValueLambda(reactiveNode, ctx));
    }

    case 'ref':
      return node.token;

    case 'action': {
      const actionNode = node as IRAction;
      // Lower IRActionNode[] to ESPHome YAML format, then resolve ref bindings
      let actions: unknown[] = lowerActionTree(actionNode.actions, actionCtx);
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

    case 'type':
      // IRType nodes are handled structurally by component lowering (e.g. globals).
      // If one leaks into generic YAML emission, skip it.
      return SKIP_ENTRY;

    case 'array':
      return (node as IRArray).items.map(item => irValueToYaml(item, ctx, actionCtx));

    case 'object': {
      const obj: Record<string, unknown> = {};
      for (const entry of (node as IRObject).entries) {
        const val = irValueToYaml(entry.value, ctx, actionCtx);
        if (val !== SKIP_ENTRY) {
          obj[camelToSnake(entry.key)] = val;
        }
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
function lowerIRConfig(ir: SemanticIR, ctx?: CppLoweringContext, actionCtx?: ActionLoweringContext): Record<string, unknown> {
  const config: Record<string, unknown> = {};
  for (const section of ir.sections) {
    config[camelToSnake(section.key)] = irValueToYaml(section.value, ctx, actionCtx);
  }
  return config;
}

// ────────────────────────────────────────────────────────────────────────────
// Public API
// ────────────────────────────────────────────────────────────────────────────

// ── LVGL tree overlay action replacement ─────────────────────────────────

/**
 * Walk an IRWidget subtree, counting action arrays and replacing them
 * using the muxed action map.
 */
function walkWidgetForActionReplacement(
  widget: IRWidget,
  templateKey: string,
  counter: { index: number },
  replacements: Map<string, IRActionNode[]>,
): void {
  // Check each prop for IRAction values
  for (const key of Object.keys(widget.props)) {
    const val = widget.props[key];
    if (val.kind === 'action') {
      const mapKey = `${templateKey}:${counter.index}`;
      const muxed = replacements.get(mapKey);
      if (muxed) {
        (widget.props as Record<string, IRValue>)[key] = { kind: 'action', actions: muxed } as IRValue;
      }
      counter.index++;
    }
  }
  // Recurse into children
  for (const child of widget.children) {
    walkWidgetForActionReplacement(child, templateKey, counter, replacements);
  }
}

/**
 * Apply overlay mux action replacements to the IRWidgetTree's overlay tiers.
 * Mutates the tree in-place, replacing action arrays at the correct positions.
 */
function replaceOverlayActionsInLvglTree(
  tree: IRUIRegistry,
  replacements: Map<string, IRActionNode[]>,
): void {
  // Extract template keys from the replacement map
  const templateKeys = new Set<string>();
  for (const key of replacements.keys()) {
    templateKeys.add(key.split(':')[0]);
  }

  for (const tier of tree.overlays) {
    for (const overlay of tier.overlays) {
      if (!templateKeys.has(overlay.templateKey)) continue;
      const counter = { index: 0 };
      for (const widget of overlay.widgets) {
        walkWidgetForActionReplacement(widget, overlay.templateKey, counter, replacements);
      }
    }
  }
}

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
  const reactiveNodes = [...ir.reactives.memos, ...ir.reactives.effects];
  const bindings = ir.reactives.bindings;

  // ── Build remapped entities for HA sensor injection ──────────────────
  // Note: reactive node sourceIds are already remapped by target.ts before
  // this function is called. We only need remapped entities for injection.
  // Widget-tree reactive nodes still carry semantic IDs — entityIdRemap
  // resolves them lazily during lambda generation.
  const { semanticToTarget, remappedEntities } = buildEntityIdMap([...ir.entities]);

  // Build a CppLoweringContext for initial value lambda generation
  let cppCtx: CppLoweringContext | undefined;
  if (cppResult) {
    const entityComponentIds = buildEntityComponentIds(remappedEntities);
    const themeVarNames = new Map<string, string>();
    if (ir.themes.length > 0) {
      for (const scopeData of ir.themes) {
        for (const signalPath of scopeData.values.keys()) {
          themeVarNames.set(`${scopeData.scopeId}_${signalPath}`, `thm_${scopeData.scopeId}_${signalPath}`);
        }
      }
    }
    // Use authoritative memoNames from the C++ backend (includes overlay memos
    // and respects deduplication order). Falls back to local rebuild only if
    // the C++ backend didn't provide memo names (shouldn't happen in practice).
    let memoNames: Map<string, string>;
    if (cppResult.runtimeConfig.memoNames && cppResult.runtimeConfig.memoNames.size > 0) {
      memoNames = cppResult.runtimeConfig.memoNames;
    } else {
      memoNames = new Map<string, string>();
      let memoIdx = 0;
      for (const node of reactiveNodes) {
        if (node.kind === 'memo') {
          memoNames.set(node.nodeId, `memo_${memoIdx}`);
          memoIdx++;
        }
      }
    }
    cppCtx = {
      signalNames: new Map(),
      memoNames,
      slotExprs: new Map(),
      entityComponentIds,
      themeVarNames,
      pipelineInfo: cppResult.pipelineInfo,
      entityIdRemap: semanticToTarget,
    };
  }

  // Build action lowering context so global_set knows whether to emit
  // BoundSignal C++ lambda or plain globals.set YAML, and so action
  // conditions can resolve overlay mux signal names.
  const actionCtx: ActionLoweringContext = {
    reactiveGlobalIds: cppResult?.runtimeConfig?.globalSignals
      ? new Set(cppResult.runtimeConfig.globalSignals.map(gs => gs.globalId))
      : new Set(),
    signalNames: (() => {
      const sigMap = new Map<number, string>();
      if (cppResult?.runtimeConfig?.signals) {
        cppResult.runtimeConfig.signals.forEach((s, i) => sigMap.set(i, s.name));
      }
      return sigMap;
    })(),
  };

  const loweredConfig = lowerIRConfig(ir, cppCtx, actionCtx);

  // ── Lower typed LVGL widget tree to YAML section ─────────────────────
  // The IR now carries a first-class `IRWidgetTree` on `esphome.lvglTree`
  // instead of embedding pre-lowered YAML in the generic sections array.
  if (ir.ui) {
    // Build reactive node lookup map (nodeId → reactive node instance)
    const reactiveNodeMap = new Map<string, unknown>();
    for (const node of reactiveNodes) {
      reactiveNodeMap.set(node.nodeId, node);
    }
    // Expression nodes are not in memos/effects — they're on bindings
    for (const binding of ir.reactives.bindings) {
      if (!reactiveNodeMap.has(binding.expression.nodeId)) {
        reactiveNodeMap.set(binding.expression.nodeId, binding.expression);
      }
    }
    // Include overlay-mux additional reactive nodes (created during C++ codegen)
    if (cppResult?.additionalReactiveNodes) {
      for (const node of cppResult.additionalReactiveNodes) {
        if (!reactiveNodeMap.has(node.nodeId)) {
          reactiveNodeMap.set(node.nodeId, node);
        }
      }
    }
    // Include expression nodes from overlay muxed bindings
    if (cppResult?.overlayBindings) {
      for (const binding of cppResult.overlayBindings) {
        if (!reactiveNodeMap.has(binding.expression.nodeId)) {
          reactiveNodeMap.set(binding.expression.nodeId, binding.expression);
        }
      }
    }

    const lvglValueCtx: LvglValueLoweringContext = {
      lowerReactiveMarker(nodeId: string) {
        const node = reactiveNodeMap.get(nodeId) as { exprType?: string } | undefined;
        if (node?.exprType === 'font_ref') return undefined; // skip
        return createYamlLambda(generateInitialValueLambda(node, cppCtx));
      },
      lowerActions(actions: unknown[]) {
        const lowered = lowerActionTree(actions as IRActionNode[], actionCtx);
        return restoreLambdaMarkers(lowered) as unknown[];
      },
      lowerQuoted(value: string) {
        const s = new Scalar(value);
        s.type = Scalar.QUOTE_SINGLE;
        return s;
      },
      lowerLambda(body: string) {
        return createYamlLambda(body);
      },
      lowerIRValue(value: IRValue) {
        const result = irValueToYaml(value, cppCtx, actionCtx);
        return result === SKIP_ENTRY ? undefined : result;
      },
    };

    // Apply overlay mux action replacements to the LVGL tree's overlay tiers.
    // This mirrors replaceOverlayActionsInIR but operates on the IRWidgetTree
    // structure (action arrays in widget props) instead of the generic sections.
    if (cppResult?.muxedActions) {
      replaceOverlayActionsInLvglTree(ir.ui, cppResult.muxedActions);
    }

    loweredConfig['lvgl'] = lowerLvglWidgetTree(ir.ui, lvglValueCtx);
  }

  let finalConfig: Record<string, unknown>;
  if (cppResult) {
    finalConfig = injectReactiveBindingsRuntime(
      loweredConfig,
      bindings,
      remappedEntities,
      cppResult.runtimeConfig,
    );
  } else {
    finalConfig = injectHASensorImports(loweredConfig, remappedEntities);
  }

  if (ir.components.length > 0) {
    for (const comp of ir.components) {
      const section = comp.section;
      if (!finalConfig[section]) {
        finalConfig[section] = [];
      }
      // Lower IRValue config back to a plain object for YAML emission
      let outConfig = irValueToYaml(comp.config) as Record<string, unknown>;
      // Globals components carry a target-agnostic `irType: IRType` node
      // (kind: 'type'). irValueToYaml skips it via SKIP_ENTRY, so we extract
      // the IRType directly from the config tree and convert to C++ type.
      if (section === 'globals') {
        const configObj = comp.config as IRObject;
        const vtEntry = configObj.entries.find(e => e.key === 'irType');
        if (vtEntry && vtEntry.value.kind === 'type') {
          const vt = vtEntry.value as IRType;
          outConfig = { ...outConfig, type: irTypeToCpp(vt) };
        }
      }
      (finalConfig[section] as unknown[]).push(outConfig);
    }
  }

  if (ir.scripts.length > 0) {
    finalConfig['script'] = ir.scripts.map((s) => {
      const params: Record<string, string> = {};
      // closure_index ALWAYS comes first when this script has a closure shape.
      if (s.closureShape && s.closureShape.fields.length > 0) {
        params['closure_index'] = 'int';
      }
      if (s.userParams) {
        for (const p of s.userParams) params[p.name] = irTypeToEsphomeParam(p.irType);
      }
      const hasParams = Object.keys(params).length > 0;

      // Build a per-script lowering context so `ref` slots can be resolved
      // either against the script's `refBindings` (literal tokens) or its
      // `closureShape` (per-instance closure-table fields).
      const scriptCtx: typeof actionCtx = {
        ...actionCtx,
        scriptRefBindings: s.refBindings,
        scriptClosureNames: s.closureShape && s.closureShape.fields.length > 0
          ? new Set(s.closureShape.fields.map((f) => f.name))
          : undefined,
        scriptId: s.id,
      };

      // When the script has a closure shape, every lambda inside its body must
      // dereference the per-instance closure row via the closure_index param.
      const lowered = lowerActionTree(s.then, scriptCtx);
      const restored = (s.closureShape && s.closureShape.fields.length > 0)
        ? restoreLambdaMarkersWithPrefix(
            lowered,
            `auto& closure = espcompose::${s.id}_closures[closure_index]; (void)closure; `,
          )
        : restoreLambdaMarkers(lowered);

      return {
        id: s.id,
        ...(s.mode && s.mode !== 'single' ? { mode: s.mode } : {}),
        ...(s.maxRuns != null && s.maxRuns > 0 ? { max_runs: s.maxRuns } : {}),
        ...(hasParams ? { parameters: params } : {}),
        then: restored as unknown[],
      };
    });
  }

  // Transform ec_canvas widgets → native canvas widgets.
  transformEcCanvasWidgets(finalConfig);

  // Translate semantic LVGL style values (e.g. 'transparent', 'fit-content',
  // 'fr(1)') to LVGL C-macro spellings (TRANSP, SIZE_CONTENT, FR(1)) on the
  // final lvgl section.
  if (finalConfig['lvgl'] != null) {
    translateLvglStyleValues(finalConfig['lvgl']);
  }

  return finalConfig;
}
