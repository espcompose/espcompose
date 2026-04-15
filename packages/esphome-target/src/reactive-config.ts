/**
 * Reactive runtime config builder — transforms collected render-pass data
 * (reactive nodes, bindings, HA entities) into the ReactiveRuntimeConfig
 * consumed by the C++ header generator.
 *
 * Also provides config-level injection helpers: HA sensor imports with
 * signal.set() triggers, esphome.includes, and external component wiring.
 */

import { injectHASensorImports } from './reactive-injector.js';
import { generateSignalSetLambda, computeMaxNodes } from './bindings-codegen.js';
import type { SignalDecl, MemoDecl, EffectDecl, WidgetBindingDecl, ThemeMemoDecl, TriggerFunctionDecl, ReactiveRuntimeConfig } from './bindings-codegen.js';
import { Scalar } from 'yaml';
import { exprToCpp, exprTypeToCpp, buildEntityComponentIds } from './expr-to-cpp.js';
import type { CppLoweringContext } from './expr-to-cpp.js';
import type { IRExprNode } from '@espcompose/core';
import type { ExprType } from '@espcompose/core/internals';
import { getEntityDomain } from '@espcompose/core/internals';

// ────────────────────────────────────────────────────────────────────────────
// Sensor type → C++ type mapping
// ────────────────────────────────────────────────────────────────────────────

function mapSensorTypeToCppType(sensorType: string): string {
  const domain = getEntityDomain(sensorType);
  if (!domain) throw new Error(`Unknown sensor type / entity domain: '${sensorType}'`);
  return domain.cppType;
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
        // Fallback: use sourceId if we can't extract path from IR
        const name = `thm_${dep.sourceId === '__theme__' ? dep.triggerType : dep.sourceId}`;
        if (!names.includes(name)) names.push(name);
      }
    } else {
      // HA entity dependency — signal name is sig_${sourceId}
      const sigName = `sig_${dep.sourceId}`;
      if (signalMap.has(sigName) && !names.includes(sigName)) {
        names.push(sigName);
      }
    }
  }
  return names;
}

/**
 * Collect all theme_read paths from an IRExprNode tree.
 */
function collectThemePaths(node: IRExprNode | undefined): string[] {
  if (!node) return [];
  if (node.kind === 'theme_read') return [node.path];
  const paths: string[] = [];
  switch (node.kind) {
    case 'binary':
      paths.push(...collectThemePaths(node.left), ...collectThemePaths(node.right));
      break;
    case 'unary':
    case 'postfix':
      paths.push(...collectThemePaths(node.operand));
      break;
    case 'ternary':
      paths.push(...collectThemePaths(node.test), ...collectThemePaths(node.consequent), ...collectThemePaths(node.alternate));
      break;
    case 'call':
      for (const arg of node.args) paths.push(...collectThemePaths(arg));
      break;
    case 'concat':
      for (const part of node.parts) paths.push(...collectThemePaths(part));
      break;
    case 'to_string':
    case 'group':
      paths.push(...collectThemePaths(node.expr));
      break;
    case 'resolve_font':
      paths.push(...collectThemePaths(node.family), ...collectThemePaths(node.size));
      break;
    case 'type_cast':
    case 'format_string':
      paths.push(...collectThemePaths(node.expr));
      break;
    case 'null_coalesce':
      paths.push(...collectThemePaths(node.left), ...collectThemePaths(node.right));
      break;
    case 'string_method':
      paths.push(...collectThemePaths(node.object));
      for (const arg of node.args) paths.push(...collectThemePaths(arg));
      break;
  }
  return paths;
}

// ────────────────────────────────────────────────────────────────────────────
// Theme data interface (passed from the compiler after render)
// ────────────────────────────────────────────────────────────────────────────

export interface ThemeData {
  themeNames: string[];
  defaultIndex: number;
  /** For each signal path, ordered values across themes + value type (ExprType compatible). */
  leafData: Map<string, { values: unknown[]; valueType: string }>;
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
  themeData?: ThemeData,
  compiledTriggers?: TriggerFunctionDecl[],
): ReactiveRuntimeConfig {
  // Collect unique signals from HA entities
  const signalMap = new Map<string, SignalDecl>();
  for (const entity of entities) {
    const sigName = `sig_${entity.generatedId}`;
    if (!signalMap.has(sigName)) {
      signalMap.set(sigName, { name: sigName, cppType: mapSensorTypeToCppType(entity.sensorType) });
    }
  }

  // ── Build CppLoweringContext from entity/theme data ────────────────────
  const entityComponentIds = buildEntityComponentIds(entities);

  const themeVarNames = new Map<string, string>();
  if (themeData) {
    for (const signalPath of themeData.leafData.keys()) {
      themeVarNames.set(signalPath, `thm_${signalPath}`);
    }
  }

  const cppCtx: CppLoweringContext = {
    signalNames: new Map(),
    memoNames: new Map(),
    slotExprs: new Map(),
    entityComponentIds,
    themeVarNames,
  };

  // ── Validate: detect untransformed reactive nodes ─────────────────────
  const uncompiledNodes = reactiveNodes.filter(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (n: any) => n.kind === 'memo' && !n.exprIR,
  );
  if (uncompiledNodes.length > 0) {
    const summary = uncompiledNodes.map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (n: any) => `  - ${n.kind} with ${n.dependencies?.length ?? 0} dependency(ies)`,
    ).join('\n');
    throw new Error(
      `Found ${uncompiledNodes.length} reactive expression(s) that were not compiled.\n` +
      `This usually means a component library provides reactive JSX but was not\n` +
      `built with \`espcompose build --library\`. Uncompiled nodes:\n` +
      `${summary}\n\n` +
      `If you are the library author, run:\n` +
      `  espcompose build --library\n` +
      `to produce a distributable library with pre-compiled reactive expressions.`,
    );
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
      const exprIR: IRExprNode | undefined = node.exprIR;
      const irType = exprIR && 'type' in exprIR ? (exprIR as { type?: string }).type as ExprType | undefined : undefined;
      const cppReturnType = node.exprType ? exprTypeToCpp(node.exprType) : (irType ? exprTypeToCpp(irType) : 'float');
      const cppExpression = exprIR ? exprToCpp(exprIR, cppCtx) : '/* no ExprIR */';

      const sourceSignals = deriveSourceSignals(node, signalMap, themeVarNames);

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
          sourceSignals,
        });
      }

      // Populate memoNames for downstream memo_read references
      cppCtx.memoNames.set(node.nodeId, `memo_${memoIdx - 1}`);
    } else if (node.kind === 'effect') {
      const sourceNames = deriveSourceSignals(node, signalMap, themeVarNames);
      const cppBody = node.exprIR ? exprToCpp(node.exprIR, cppCtx) : '0 /* no ExprIR */';
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

    if (expr.kind === 'memo') {
      // Memo-backed binding: read from the runtime memo variable.
      const canonNodeId = memoCanonical.get(expr.nodeId) ?? expr.nodeId;
      const memoName = cppCtx.memoNames.get(canonNodeId) ?? cppCtx.memoNames.get(expr.nodeId) ?? 'memo_0';
      valueExpr = `${memoName}.get()`;
      const irType = expr.exprIR && 'type' in expr.exprIR ? (expr.exprIR as { type?: string }).type as ExprType | undefined : undefined;
      cppType = expr.exprType ? exprTypeToCpp(expr.exprType) : (irType ? exprTypeToCpp(irType) : 'float');
      sourceNames = [memoName];
    } else if (expr.dependencies?.[0]?.sourceType === 'theme') {
      // Theme-sourced binding: read from the generated theme memo
      const themeIR = expr.exprIR as { kind: string; path?: string; type?: string } | undefined;
      const themePath = themeIR?.kind === 'theme_read' ? themeIR.path : undefined;
      const sigName = themePath ? `thm_${themePath}` : `thm_unknown`;
      valueExpr = `${sigName}.get()`;
      const leafData = themePath ? themeData?.leafData.get(themePath) : undefined;
      // Convert valueType (ExprType) to C++ type; fallback to exprType if available
      const leafValueType = leafData?.valueType as ExprType | undefined;
      cppType = leafValueType ? exprTypeToCpp(leafValueType) : (expr.exprType ? exprTypeToCpp(expr.exprType) : 'int32_t');
      sourceNames = [sigName];
    } else {
      // Single-source binding: read directly from signal
      const sigName = `sig_${expr.sourceId}`;
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

  // Build theme memos from theme data
  const allThemeMemos: ThemeMemoDecl[] = [];

  if (themeData && themeData.themeNames.length > 0) {
    for (const [signalPath, leaf] of themeData.leafData) {
      // Convert valueType (ExprType) to C++ type for code generation
      const leafValueType = leaf.valueType as ExprType;
      allThemeMemos.push({
        name: `thm_${signalPath}`,
        cppType: exprTypeToCpp(leafValueType),
        values: leaf.values,
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

  // Filter theme memos to only those referenced.
  const themeMemos = referencedThemeMemos.size > 0
    ? allThemeMemos.filter(tm => referencedThemeMemos.has(tm.name))
    : allThemeMemos;

  return {
    signals: Array.from(signalMap.values()),
    memos,
    effects,
    widgetBindings,
    themeMemos: themeMemos.length > 0 ? themeMemos : undefined,
    themeDefaultIndex: themeData?.defaultIndex,
    themeNames: themeData && themeData.themeNames.length > 0 ? themeData.themeNames : undefined,
    triggerFunctions: compiledTriggers && compiledTriggers.length > 0 ? compiledTriggers : undefined,
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
    const sourceId = sig.name.replace(/^sig_/, '');
    injectSignalTrigger(result, sourceId, sig.name, sig.cppType);
  }

  // Step 4: Inject build_flag for HA service calls in compiled triggers
  if (runtimeConfig.triggerFunctions?.some(fn => fn.body.includes('call_ha_service('))) {
    result = injectBuildFlag(result, 'USE_API_HOMEASSISTANT_SERVICES');
  }

  // Step 5: Inject USE_LVGL_FONT when theme memos contain font_ptr values
  if (runtimeConfig.themeMemos?.some(tm => tm.cppType === 'const lv_font_t*')) {
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
  cppType: string,
): void {
  // Determine the trigger type based on C++ type
  const triggerType = cppType === 'bool' ? 'on_state' : 'on_value';

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
