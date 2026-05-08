/**
 * Reactive runtime config builder — transforms collected render-pass data
 * (reactive nodes, bindings, HA entities) into the ReactiveRuntimeConfig
 * consumed by the C++ header generator.
 *
 * Also provides config-level injection helpers: HA sensor imports with
 * signal.set() triggers, esphome.includes, and external component wiring.
 */

import { injectHASensorImports } from './reactive-injector.js';
import { generateSignalSetLambda, computeMaxNodes } from './bindings.js';
import type { SignalDecl, BoundSignalDecl, MemoDecl, EffectDecl, WidgetBindingDecl, ThemeMemoDecl, TriggerFunctionDecl, ReactiveRuntimeConfig } from './bindings.js';
import { Scalar } from 'yaml';
import { exprToCpp, exprTypeToCpp, buildEntityComponentIds, toCppId } from '../lowering';
import { statementBlockToCpp } from '../lowering/stmt-to-cpp.js';
import type { CppLoweringContext } from '../lowering';
import type { IRExpression } from '@espcompose/core/internals';
import { getExprChildren } from '@espcompose/core/internals';
import type { ExprType, IRType, IRScalar } from '@espcompose/core/internals';
import { getEntityDomain } from '@espcompose/core/internals';
import { irTypeToCpp } from '../lowering';
import { sourceDomainToTrigger } from '../lowering';

// ────────────────────────────────────────────────────────────────────────────
// Sensor type → C++ type mapping
// ────────────────────────────────────────────────────────────────────────────

function mapSensorTypeToCppType(sensorType: string): string {
  const domain = getEntityDomain(sensorType);
  if (!domain) throw new Error(`Unknown sensor type / entity domain: '${sensorType}'`);
  return irTypeToCpp(domain.irType);
}

/**
 * Derive C++ source signal/memo names from a reactive node's dependencies.
 * Used for wiring the reactive graph (Signal → Memo → Effect).
 */
function deriveSourceSignals(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  node: any,
  signalMap: Map<string, SignalDecl>,
  themeVarNames: Map<string, string>,
  globalSignalNames?: Map<string, string>,
): string[] {
  const names: string[] = [];
  for (const dep of node.dependencies ?? []) {
    if (dep.sourceType === 'theme') {
      // Theme dependency — derive signal name from ExprIR or dependency metadata
      const exprIR = node.exprIR;
      const themePaths = collectThemePaths(exprIR);
      for (const path of themePaths) {
        const name = themeVarNames.get(path) ?? `thm_${path}`;
        if (!names.includes(name)) names.push(name);
      }
      if (themePaths.length === 0) {
        // Fallback: use themePath if we can't extract path from IR
        const name = `thm_${dep.themePath ?? dep.sourceId}`;
        if (!names.includes(name)) names.push(name);
      }
    } else if (dep.sourceType === 'global') {
      // Global dependency — BoundSignal name is sig_global_${sourceId}
      const sigName = globalSignalNames?.get(dep.sourceId);
      if (sigName && !names.includes(sigName)) {
        names.push(sigName);
      }
    } else if (dep.sourceType === 'overlay_mux') {
      // Overlay mux dependency — signal name is the sourceId itself (sig_ovrl_X_mux)
      const sigName = dep.sourceId;
      if (!names.includes(sigName)) {
        names.push(sigName);
      }
    } else {
      // HA entity dependency — sourceId has been remapped to target ID by
      // remapEntityIdsInIR before we reach this point.
      const sigName = `sig_${toCppId(dep.sourceId)}`;
      if (signalMap.has(sigName) && !names.includes(sigName)) {
        names.push(sigName);
      }
    }
  }
  return names;
}

/**
 * Collect all theme_read scoped keys (`scopeId_path`) from an IRExpression tree.
 */
function collectThemePaths(node: IRExpression | undefined): string[] {
  if (!node) return [];
  if (node.kind === 'expr:theme_read') return [`${node.scopeId}_${node.path}`];
  return getExprChildren(node).flatMap(collectThemePaths);
}

/**
 * Walk an IRExpression tree and collect all reactive source names (signals,
 * memos, theme vars) that the expression depends on. Used to derive the
 * correct wiring for muxed popup bindings whose expressions reference
 * multiple entity signals across mux cases.
 */
function collectExprSourceNames(
  node: IRExpression,
  ctx: CppLoweringContext,
  signalMap: Map<string, SignalDecl>,
): string[] {
  const names = new Set<string>();
  walkExprForSources(node, ctx, signalMap, names);
  return Array.from(names);
}

function walkExprForSources(
  node: IRExpression,
  ctx: CppLoweringContext,
  signalMap: Map<string, SignalDecl>,
  out: Set<string>,
): void {
  switch (node.kind) {
    case 'expr:signal_read': {
      const name = ctx.signalNames.get(node.signalIndex);
      if (name) out.add(name);
      break;
    }
    case 'expr:memo_read': {
      const name = ctx.memoNames.get(node.memoId);
      if (name) out.add(name);
      break;
    }
    case 'expr:entity_prop': {
      const compId = ctx.entityComponentIds.get(`${node.entityId}#${node.propertyKey}`) ?? ctx.entityComponentIds.get(node.entityId);
      if (compId) {
        const sigName = `sig_${toCppId(compId)}`;
        if (signalMap.has(sigName)) out.add(sigName);
      }
      break;
    }
    case 'expr:theme_read': {
      const scopedKey = `${node.scopeId}_${node.path}`;
      const name = ctx.themeVarNames.get(scopedKey) ?? `thm_${scopedKey}`;
      out.add(name);
      break;
    }
    case 'expr:global_read':
      out.add(`sig_global_${node.globalId}`);
      break;
    default:
      for (const child of getExprChildren(node)) {
        walkExprForSources(child, ctx, signalMap, out);
      }
  }
}

// ────────────────────────────────────────────────────────────────────────────
// Theme scope data interface (passed from the compiler after render)
// ────────────────────────────────────────────────────────────────────────────

export interface ThemeScopeData {
  /** Human-readable scope name (e.g. 'espcompose:ui'). */
  scope: string;
  /** 8-char hex hash of the scope — C++ identifier fragment. */
  scopeId: string;
  names: string[];
  defaultIndex: number;
  /** For each signal path, ordered values across themes + expr type (ExprType compatible). */
  values: Map<string, { values: IRScalar[]; exprType: string }>;
}

// ────────────────────────────────────────────────────────────────────────────
// Runtime config builder
// ────────────────────────────────────────────────────────────────────────────

/**
 * Build a ReactiveRuntimeConfig from the collected render-pass data.
 */
export function buildRuntimeConfig(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reactiveNodes: any[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bindings: any[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  entities: any[],
  themes?: ThemeScopeData[],
  compiledTriggers?: TriggerFunctionDecl[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  globalComponents?: any[],
  /** Extra signal index → name entries (e.g. popup mux signals). */
  extraSignalNames?: Map<number, string>,
  /** Additional theme memo names that must survive tree-shaking (e.g. tokens
   *  referenced by reactive IR values in the config tree that are not in the
   *  reactive bindings pipeline — popup widgets serialized into top_layer). */
  additionalThemeRefs?: Set<string>,
): ReactiveRuntimeConfig {
  // Collect unique signals from HA entities
  const signalMap = new Map<string, SignalDecl>();
  for (const entity of entities) {
    const id = entity.targetId ?? entity.generatedId;
    const platform = entity.platform ?? entity.sensorType;
    if (!id || !platform) continue;
    const sigName = `sig_${toCppId(id)}`;
    if (!signalMap.has(sigName)) {
      signalMap.set(sigName, {
        name: sigName,
        cppType: mapSensorTypeToCppType(platform),
        sourceDomain: platform,
      });
    }
  }

  // Collect BoundSignal declarations for globals that have reactive dependents.
  // A global is reactive if any IRReactiveNode has a dependency with sourceType='global'
  // and sourceId matching the global's component ID.
  const reactiveGlobalIds = new Set<string>();
  for (const node of reactiveNodes) {
    if (node.dependencies) {
      for (const dep of node.dependencies) {
        if (dep.sourceType === 'global') {
          reactiveGlobalIds.add(dep.sourceId);
        }
      }
    }
  }
  // Also check bindings for direct global signal references
  for (const binding of bindings) {
    const expr = binding.expression;
    if (expr?.dependencies) {
      for (const dep of expr.dependencies) {
        if (dep.sourceType === 'global') {
          reactiveGlobalIds.add(dep.sourceId);
        }
      }
    }
  }

  const globalSignals: BoundSignalDecl[] = [];
  if (globalComponents) {
    for (const comp of globalComponents) {
      if (reactiveGlobalIds.has(comp.id)) {
        // Extract IRType directly from the config tree (kind: 'type' node).
        const vtEntry = comp.config?.entries?.find((e: { key: string }) => e.key === 'irType');
        const vt: IRType | undefined = vtEntry?.value?.kind === 'type' ? vtEntry.value as IRType : undefined;
        // Extract initial_value (IRScalar) so the BoundSignal can hold a
        // local copy that's valid before bind() runs.
        const ivEntry = comp.config?.entries?.find((e: { key: string }) => e.key === 'initial_value');
        const initialValue: string | undefined =
          ivEntry?.value?.kind === 'scalar' ? String(ivEntry.value.value) : undefined;
        globalSignals.push({
          name: `sig_global_${comp.id}`,
          cppType: vt ? irTypeToCpp(vt) : 'int',
          globalId: comp.id,
          ...(initialValue !== undefined ? { initialValue } : {}),
        });
      }
    }
  }

  // ── Build CppLoweringContext from entity/theme data ────────────────────
  const entityComponentIds = buildEntityComponentIds(entities);

  const themeVarNames = new Map<string, string>();
  if (themes) {
    for (const scopeData of themes) {
      for (const signalPath of scopeData.values.keys()) {
        themeVarNames.set(`${scopeData.scopeId}_${signalPath}`, `thm_${scopeData.scopeId}_${signalPath}`);
      }
    }
  }

  const cppCtx: CppLoweringContext = {
    signalNames: new Map(extraSignalNames),
    memoNames: new Map(),
    slotExprs: new Map(),
    entityComponentIds,
    themeVarNames,
  };

  // Build a lookup map from global ID → BoundSignal C++ name
  const globalSignalNames = new Map<string, string>();
  for (const gs of globalSignals) {
    globalSignalNames.set(gs.globalId, gs.name);
  }

  // Build memo declarations from IRReactiveNode instances, deduplicating
  // identical memos (same expression + return type + sources).
  const memos: MemoDecl[] = [];
  const effects: EffectDecl[] = [];
  let memoIdx = 0;
  let effectIdx = 0;

  // Memo deduplication: signature → canonical memo nodeId
  const memoSignatureMap = new Map<string, string>();
  // Maps each memo's nodeId → canonical nodeId (only for duplicates)
  const memoCanonical = new Map<string, string>();
  // Maps each memo's nodeId → sequential C++ index
  const memoNodeIdToIdx = new Map<string, number>();

  for (const node of reactiveNodes) {
    if (node.kind === 'memo') {
      const exprIR: IRExpression | undefined = node.exprIR;

      let cppReturnType: string;
      let cppExpression: string;
      let cppBodyLines: string[] | undefined;

      if (exprIR?.kind === 'expr:function') {
        // Multi-statement memo body
        cppReturnType = exprTypeToCpp(exprIR.returnType);
        cppBodyLines = statementBlockToCpp(exprIR.body, cppCtx);
        cppExpression = cppBodyLines.join(' '); // for signature dedup
      } else {
        const irType = exprIR && 'type' in exprIR ? (exprIR as { type?: string }).type as ExprType | undefined : undefined;
        cppReturnType = node.exprType ? exprTypeToCpp(node.exprType) : (irType ? exprTypeToCpp(irType) : 'float');
        cppExpression = exprIR ? exprToCpp(exprIR, cppCtx) : '/* no ExprIR */';
      }

      const sourceSignals = deriveSourceSignals(node, signalMap, themeVarNames, globalSignalNames);

      const signature = `${cppReturnType}:${cppExpression}:${[...sourceSignals].sort().join(',')}`;
      const canonical = memoSignatureMap.get(signature);

      if (canonical !== undefined) {
        // Duplicate — emit as alias
        const thisIdx = memoIdx++;
        memoNodeIdToIdx.set(node.nodeId, thisIdx);
        memoCanonical.set(node.nodeId, canonical);
        memos.push({
          index: thisIdx,
          cppReturnType,
          cppExpression,
          cppBodyLines,
          sourceSignals,
          canonicalIndex: memoNodeIdToIdx.get(canonical)!,
        });
      } else {
        const thisIdx = memoIdx++;
        memoNodeIdToIdx.set(node.nodeId, thisIdx);
        memoSignatureMap.set(signature, node.nodeId);
        memos.push({
          index: thisIdx,
          cppReturnType,
          cppExpression,
          cppBodyLines,
          sourceSignals,
        });
      }

      // Populate memoNames for downstream memo_read references
      cppCtx.memoNames.set(node.nodeId, `memo_${memoIdx - 1}`);
    } else if (node.kind === 'effect') {
      const sourceNames = deriveSourceSignals(node, signalMap, themeVarNames, globalSignalNames);
      const effectIR = node.exprIR;
      const cppBody = effectIR ? exprToCpp(effectIR, cppCtx) : '0 /* no ExprIR */';
      effects.push({
        index: effectIdx++,
        cppBody,
        sourceNames,
      });
    }
  }

  // Build widget binding declarations from reactive bindings.
  const widgetBindings: WidgetBindingDecl[] = [];
  let bindingIdx = 0;

  for (const binding of bindings) {
    const expr = binding.expression;

    let valueExpr: string;
    let cppType: string;
    let sourceNames: string[];

    // Muxed overlay binding: the exprIR has been replaced with a mux node by
    // processOverlayMux. Lower it inline instead of reading from a single memo.
    const hasMuxDep = expr.dependencies?.some(
      (d: { sourceType?: string }) => d.sourceType === 'overlay_mux',
    );
    if (hasMuxDep && expr.exprIR?.kind === 'expr:mux') {
      valueExpr = exprToCpp(expr.exprIR, cppCtx);
      const irType = expr.exprIR && 'type' in expr.exprIR ? (expr.exprIR as { type?: string }).type as ExprType | undefined : undefined;
      cppType = expr.exprType ? exprTypeToCpp(expr.exprType) : (irType ? exprTypeToCpp(irType) : 'float');
      // Collect all reactive source names referenced in the mux expression
      // tree: the mux signal itself + all per-instance entity signals/memos.
      sourceNames = collectExprSourceNames(expr.exprIR, cppCtx, signalMap);
    } else if (expr.kind === 'memo') {
      // Memo-backed binding: read from the runtime memo variable.
      const canonNodeId = memoCanonical.get(expr.nodeId) ?? expr.nodeId;
      const memoName = cppCtx.memoNames.get(canonNodeId) ?? cppCtx.memoNames.get(expr.nodeId);
      if (!memoName) {
        const mapSize = cppCtx.memoNames.size;
        const knownKeys = Array.from(cppCtx.memoNames.keys()).join(', ');
        throw new Error(
          `[espcompose] Memo binding node '${expr.nodeId}' (canonical: '${canonNodeId}') not found in memoNames map.\n` +
          `  binding target: ${binding.targetType}#${binding.targetId}.${binding.targetProp}\n` +
          `  expr.kind=${expr.kind}, exprType=${expr.exprType ?? 'undefined'}\n` +
          `  memoNames has ${mapSize} entries: [${knownKeys}]`,
        );
      }
      valueExpr = `${memoName}.get()`;
      const irType = expr.exprIR && 'type' in expr.exprIR ? (expr.exprIR as { type?: string }).type as ExprType | undefined : undefined;
      cppType = expr.exprType ? exprTypeToCpp(expr.exprType) : (irType ? exprTypeToCpp(irType) : 'float');
      sourceNames = [memoName];
    } else if (expr.dependencies?.[0]?.sourceType === 'theme') {
      // Theme-sourced binding: read from the generated theme memo
      const themeIR = expr.exprIR as { kind: string; scope?: string; scopeId?: string; path?: string; type?: string } | undefined;
      const themeScopeId = themeIR?.kind === 'expr:theme_read' ? themeIR.scopeId : undefined;
      const themePath = themeIR?.kind === 'expr:theme_read' ? themeIR.path : undefined;
      const scopedKey = themeScopeId && themePath ? `${themeScopeId}_${themePath}` : undefined;
      const sigName = scopedKey ? themeVarNames.get(scopedKey) ?? `thm_${scopedKey}` : `thm_unknown`;
      valueExpr = `${sigName}.get()`;
      // Look up leaf data from the matching scope
      let leafData: { values: IRScalar[]; exprType: string } | undefined;
      if (themeIR?.scope && themePath && themes) {
        const scopeData = themes.find(s => s.scope === themeIR.scope);
        leafData = scopeData?.values.get(themePath);
      }
      // Convert exprType (ExprType) to C++ type; fallback to exprType if available
      const leafExprType = leafData?.exprType as ExprType | undefined;
      cppType = leafExprType ? exprTypeToCpp(leafExprType) : (expr.exprType ? exprTypeToCpp(expr.exprType) : 'int32_t');
      sourceNames = [sigName];
    } else if (expr.dependencies?.[0]?.sourceType === 'global') {
      // Global-sourced binding: read directly from the BoundSignal
      const globalId = expr.dependencies[0].sourceId;
      const sigName = globalSignalNames.get(globalId) ?? `sig_global_${globalId}`;
      valueExpr = `${sigName}.get()`;
      cppType = expr.exprType ? exprTypeToCpp(expr.exprType) : 'std::string';
      sourceNames = [sigName];
    } else {
      // Single-source binding: read directly from signal
      const sigName = `sig_${toCppId(expr.sourceId)}`;
      valueExpr = `${sigName}.get()`;
      const signalDecl = signalMap.get(sigName);
      cppType = signalDecl?.cppType ?? (expr.exprType ? exprTypeToCpp(expr.exprType) : 'bool');
      sourceNames = [sigName];
    }

    widgetBindings.push({
      index: bindingIdx++,
      widgetType: binding.targetType.replace(/^lvgl_/, ''),
      widgetId: binding.targetId,
      prop: binding.targetProp,
      valueExpr,
      cppType,
      sourceNames,
      ...(binding.part ? { part: binding.part } : {}),
      ...(binding.state ? { state: binding.state } : {}),
    });
  }

  // Build theme memos from per-scope theme data
  const allThemeMemos: ThemeMemoDecl[] = [];
  const themeScopeConfigs: import('./bindings.js').ThemeScopeConfig[] = [];

  if (themes) {
    for (const scopeData of themes) {
      if (scopeData.names.length === 0) continue;
      const scopeMemos: ThemeMemoDecl[] = [];
      for (const [signalPath, leaf] of scopeData.values) {
        const leafExprType = leaf.exprType as ExprType;
        const memo: ThemeMemoDecl = {
          name: `thm_${scopeData.scopeId}_${signalPath}`,
          cppType: exprTypeToCpp(leafExprType),
          values: leaf.values.map(s => s.value),
        };
        allThemeMemos.push(memo);
        scopeMemos.push(memo);
      }
      themeScopeConfigs.push({
        scope: scopeData.scope,
        scopeId: scopeData.scopeId,
        themeMemos: scopeMemos,
        defaultIndex: scopeData.defaultIndex,
        themeNames: scopeData.names,
      });
    }
  }

  // ── Theme tree-shaking: only emit theme memos actually referenced ──
  // Collect all theme memo names referenced by widget bindings and user memos.
  const referencedThemeMemos = new Set<string>();
  for (const binding of widgetBindings) {
    for (const s of binding.sourceNames) {
      if (s.startsWith('thm_')) referencedThemeMemos.add(s);
    }
  }
  for (const memo of memos) {
    for (const s of memo.sourceSignals) {
      if (s.startsWith('thm_')) referencedThemeMemos.add(s);
    }
  }
  for (const effect of effects) {
    for (const s of effect.sourceNames) {
      if (s.startsWith('thm_')) referencedThemeMemos.add(s);
    }
  }
  // Include theme memos referenced by the IR config tree (e.g. popup widgets
  // serialized into top_layer whose bindings may not be in the reactive pipeline).
  if (additionalThemeRefs) {
    for (const ref of additionalThemeRefs) referencedThemeMemos.add(ref);
  }

  // Filter theme scope configs to only include referenced memos.
  const filteredScopeConfigs = themeScopeConfigs.map(sc => ({
    ...sc,
    themeMemos: referencedThemeMemos.size > 0
      ? sc.themeMemos.filter(tm => referencedThemeMemos.has(tm.name))
      : sc.themeMemos,
  })).filter(sc => sc.themeMemos.length > 0);

  return {
    signals: Array.from(signalMap.values()),
    globalSignals,
    memos,
    effects,
    widgetBindings,
    themes: filteredScopeConfigs.length > 0 ? filteredScopeConfigs : undefined,
    triggerFunctions: compiledTriggers && compiledTriggers.length > 0 ? compiledTriggers : undefined,
    memoNames: new Map(cppCtx.memoNames),
  };
}

// ────────────────────────────────────────────────────────────────────────────
// Config injection helpers
// ────────────────────────────────────────────────────────────────────────────

/**
 * Append a value to a YAML section, handling undefined/scalar/array coercion.
 */
function appendToYamlSection(
  obj: Record<string, unknown>,
  key: string,
  value: unknown,
): void {
  const existing = obj[key];
  if (existing === undefined || existing === null) {
    obj[key] = [value];
  } else if (Array.isArray(existing)) {
    existing.push(value);
  } else {
    obj[key] = [existing, value];
  }
}

/**
 * Inject HA sensor imports + signal.set() triggers for the C++ runtime path.
 */
export function injectReactiveBindingsRuntime(
  config: Record<string, unknown>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bindings: any[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  entities: any[],
  runtimeConfig: ReactiveRuntimeConfig,
): Record<string, unknown> {
  // Step 1: Import HA sensors (sensor imports only, no native widget triggers)
  let result = injectHASensorImports(config, entities);

  // Step 2: Inject includes + runtime bootstrap for the C++ runtime
  result = injectRuntimeIncludes(result);

  // Step 3: Inject signal.set() triggers on each HA sensor source
  for (const sig of runtimeConfig.signals) {
    if (!sig.sourceDomain) continue; // skip non-HA-bound signals (overlay-mux, etc.)
    const sourceId = sig.name.replace(/^sig_/, '');
    injectSignalTrigger(result, sourceId, sig.name, sig.sourceDomain);
  }

  // Step 4: Inject build_flag for HA service calls in compiled triggers
  if (runtimeConfig.triggerFunctions?.some(fn => fn.body.includes('call_ha_service('))) {
    result = injectBuildFlag(result, 'USE_API_HOMEASSISTANT_SERVICES');
  }

  // Step 5: Inject USE_LVGL_FONT when theme memos contain font_ref values
  if (runtimeConfig.themes?.some(sc => sc.themeMemos.some(tm => tm.cppType === 'const lv_font_t*'))) {
    result = injectBuildFlag(result, 'USE_LVGL_FONT');
  }

  // Step 6: Inject ESPCOMPOSE_MAX_NODES as a build flag so the reactive
  // engine header (compiled in the external component TU) sees the correct
  // capacity before any #include.
  const maxNodes = computeMaxNodes(runtimeConfig);
  result = injectBuildFlags(result, [`-DESPCOMPOSE_MAX_NODES=${maxNodes}`]);

  return result;
}

/**
 * Inject external_components and espcompose runtime config into the config.
 */
function injectRuntimeIncludes(config: Record<string, unknown>): Record<string, unknown> {
  const result = { ...config };

  // Inject esphome.includes for the bindings header.  The bindings header
  // must be compiled inside main.cpp (via includes:) so that the lambdas can
  // resolve widget ID globals (rw_xxx) that ESPHome declares in main.cpp.
  const esphome = (result.esphome ?? {}) as Record<string, unknown>;
  const includes = Array.isArray(esphome.includes) ? [...esphome.includes as unknown[]] : [];
  includes.push('espcompose_bindings.h');
  result.esphome = { ...esphome, includes };

  // Inject external_components as a top-level key (not under esphome:).
  // The external component provides the runtime class and reactive engine.
  const externalComponents = Array.isArray(result.external_components)
    ? [...(result.external_components as unknown[])]
    : [];

  // Add espcompose runtime component from relative path.
  // The path points to the parent directory — ESPHome looks for espcompose/__init__.py inside it.
  externalComponents.push({
    source: {
      type: 'local',
      path: './external_components',
    },
    components: ['espcompose'],
  });

  result.external_components = externalComponents;

  // Configure the espcompose runtime component with default flush budget (microseconds per loop iteration).
  // The espcompose platform config is a top-level key.
  if (!result.espcompose) {
    result.espcompose = {
      flush_budget_us: 2000,
    };
  }

  return result;
}

/**
 * Inject one or more -D build flags into platformio_options, deduplicating by define name.
 */
function injectBuildFlags(config: Record<string, unknown>, flags: string[]): Record<string, unknown> {
  const result = { ...config };
  const esphome = { ...((result.esphome ?? {}) as Record<string, unknown>) };
  const existing = esphome.platformio_options as Record<string, unknown> | undefined;
  const pioOpts = { ...(existing ?? {}) };

  const existingFlags = typeof pioOpts.build_flags === 'string'
    ? [pioOpts.build_flags]
    : Array.isArray(pioOpts.build_flags)
      ? [...pioOpts.build_flags as string[]]
      : [];

  for (const flag of flags) {
    if (!existingFlags.some((f: string) => f === flag)) {
      existingFlags.push(flag);
    }
  }

  pioOpts.build_flags = existingFlags;
  esphome.platformio_options = pioOpts;
  result.esphome = esphome;
  return result;
}

function injectBuildFlag(config: Record<string, unknown>, define: string): Record<string, unknown> {
  return injectBuildFlags(config, [`-D${define}`]);
}

/**
 * Inject a signal.set() trigger on an HA sensor source in the config.
 */
function injectSignalTrigger(
  config: Record<string, unknown>,
  sourceId: string,
  signalName: string,
  sourceDomain: string,
): void {
  // Determine the trigger type based on the source domain (semantic).
  const triggerType = sourceDomainToTrigger(sourceDomain);

  // Generate the signal.set() lambda
  const lambdaBody = generateSignalSetLambda(signalName, 'x');

  // Create lambda scalar
  const s = new Scalar(lambdaBody);
  s.type = Scalar.QUOTE_DOUBLE;
  s.tag = '!lambda';

  // Search all sensor sections for the source component
  for (const sectionKey of Object.keys(config)) {
    const section = config[sectionKey];
    if (!section || typeof section !== 'object') continue;

    const entries = Array.isArray(section) ? section : [section];
    for (const entry of entries) {
      if (entry && typeof entry === 'object' && !Array.isArray(entry)) {
        const obj = entry as Record<string, unknown>;
        if (obj.id === sourceId) {
          appendToYamlSection(obj, triggerType, { lambda: s });
          return;
        }
      }
    }
  }
}
