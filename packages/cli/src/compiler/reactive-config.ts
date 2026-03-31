/**
 * Reactive runtime config builder — transforms collected render-pass data
 * (reactive nodes, bindings, HA entities) into the ReactiveRuntimeConfig
 * consumed by the C++ header generator.
 *
 * Also provides config-level injection helpers: HA sensor imports with
 * signal.set() triggers, esphome.includes, and on_boot wiring.
 */

import { injectHASensorImports } from './reactive-injector.js';
import { generateSignalSetLambda } from './reactive-runtime/codegen.js';
import type { SignalDecl, MemoDecl, EffectDecl, WidgetBindingDecl, ThemeMemoDecl, TriggerFunctionDecl, ReactiveRuntimeConfig } from './reactive-runtime/codegen.js';
import { Scalar } from 'yaml';

// ────────────────────────────────────────────────────────────────────────────
// Sensor type → C++ type mapping
// ────────────────────────────────────────────────────────────────────────────

function mapSensorTypeToCppType(sensorType: string): string {
  if (sensorType === 'sensor') return 'float';
  if (sensorType === 'text_sensor') return 'std::string';
  return 'bool';
}

// ────────────────────────────────────────────────────────────────────────────
// Theme data interface (passed from the compiler after render)
// ────────────────────────────────────────────────────────────────────────────

export interface ThemeData {
  themeNames: string[];
  defaultIndex: number;
  /** For each signal path, ordered values across themes + C++ type. */
  leafData: Map<string, { values: unknown[]; cppType: string }>;
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

  // ── Validate: detect untransformed reactive nodes ─────────────────────
  // When a library ships reactive code without running `espcompose transform-lib`,
  // `bind.memo()` hits the runtime fallback path and creates ReactiveNodes with
  // a telltale marker in cppExpression. Detect this and fail early with a clear
  // message instead of silently generating broken C++.
  const uncompiledNodes = reactiveNodes.filter(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (n: any) => typeof n.cppExpression === 'string' && n.cppExpression.includes('uncompiled'),
  );
  if (uncompiledNodes.length > 0) {
    const summary = uncompiledNodes.map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (n: any) => `  - ${n.kind} with ${n.dependencies?.length ?? 0} dependency(ies)`,
    ).join('\n');
    throw new Error(
      `Found ${uncompiledNodes.length} reactive expression(s) that were not compiled.\n` +
      `This usually means a component library provides reactive JSX but was not\n` +
      `built with \`espcompose transform-lib\`. Uncompiled nodes:\n` +
      `${summary}\n\n` +
      `If you are the library author, add a transform step to your build:\n` +
      `  espcompose transform-lib --entry src/index.ts --outDir .espcompose-build/\n` +
      `Then build from the transformed sources.`,
    );
  }

  // Build memo declarations from ReactiveNode instances, deduplicating
  // identical memos (same expression + return type + sources).
  const memos: MemoDecl[] = [];
  const effects: EffectDecl[] = [];
  let memoIdx = 0;
  let effectIdx = 0;

  // Memo deduplication: signature → canonical memo index
  const memoSignatureMap = new Map<string, number>();
  // Maps each memo's assigned index → canonical index (only for duplicates)
  const memoCanonical = new Map<number, number>();

  for (const node of reactiveNodes) {
    if (node.kind === 'memo') {
      const sourceSignals = node.dependencies
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((d: any) => d.cppSignalName)
        .filter(Boolean);

      const signature = `${node.cppReturnType ?? 'std::string'}:${node.cppExpression}:${[...sourceSignals].sort().join(',')}`;
      const canonical = memoSignatureMap.get(signature);

      if (canonical !== undefined) {
        // Duplicate — emit as alias
        const thisIdx = memoIdx++;
        memoCanonical.set(thisIdx, canonical);
        memos.push({
          index: thisIdx,
          cppReturnType: node.cppReturnType ?? 'std::string',
          cppExpression: node.cppExpression,
          sourceSignals,
          canonicalIndex: canonical,
        });
      } else {
        const thisIdx = memoIdx++;
        memoSignatureMap.set(signature, thisIdx);
        memos.push({
          index: thisIdx,
          cppReturnType: node.cppReturnType ?? 'std::string',
          cppExpression: node.cppExpression,
          sourceSignals,
        });
      }
    } else if (node.kind === 'effect') {
      const sourceNames = node.dependencies
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((d: any) => d.cppSignalName)
        .filter(Boolean);
      effects.push({
        index: effectIdx++,
        cppBody: node.cppExpression,
        sourceNames,
      });
    }
  }

  // Build widget binding declarations from reactive bindings.
  // In the runtime path, each binding becomes an Effect that wires
  // signal/memo → LVGL widget update.
  const widgetBindings: WidgetBindingDecl[] = [];
  let bindingIdx = 0;

  for (const binding of bindings) {
    const expr = binding.expression;

    let valueExpr: string;
    let cppType: string;
    let sourceNames: string[];

    if (expr.kind === 'memo') {
      // Memo-backed binding: read from the runtime memo variable.
      // Normalize to canonical memo index if this is a duplicate.
      const mIdx = expr._index >= 0 ? expr._index : 0;
      const canonIdx = memoCanonical.get(mIdx) ?? mIdx;
      valueExpr = `memo_${canonIdx}.get()`;
      cppType = expr.cppReturnType ?? 'std::string';
      sourceNames = [`memo_${canonIdx}`];
    } else if (expr.dependencies?.[0]?.sourceType === 'theme') {
      // Theme-sourced binding: read from the generated theme memo
      const sigName = expr.cppSignalName ?? expr.dependencies[0].cppSignalName;
      valueExpr = `${sigName}.get()`;
      cppType = expr.dependencies[0].cppType ?? expr.cppType ?? 'int32_t';
      sourceNames = [sigName];
    } else {
      // Single-source binding: read directly from signal
      const sigName = expr.cppSignalName ?? `sig_${expr.sourceId}`;
      valueExpr = `${sigName}.get()`;
      // Use the actual signal's C++ type (from signalMap), not the expression's
      // declared type.  e.g. stateText has cppType 'std::string' but the
      // underlying signal for a binary_sensor is Signal<bool>.
      const signalDecl = signalMap.get(sigName);
      cppType = signalDecl?.cppType ?? expr.cppType ?? 'bool';
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
  const fontNames = new Set<string>();

  if (themeData && themeData.themeNames.length > 0) {
    for (const [signalPath, leaf] of themeData.leafData) {
      allThemeMemos.push({
        name: `thm_${signalPath}`,
        cppType: leaf.cppType,
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

  // Collect font names only from retained typography theme memos.
  if (themeData && themeData.themeNames.length > 0) {
    for (const tm of themeMemos) {
      const signalPath = tm.name.replace(/^thm_/, '');
      if (signalPath.startsWith('typography_') && signalPath.endsWith('_fontFamily')) {
        const basePath = signalPath.replace(/_fontFamily$/, '_fontSize');
        const sizeLeaf = themeData.leafData.get(basePath);
        if (sizeLeaf) {
          for (let i = 0; i < themeData.themeNames.length; i++) {
            const family = String(tm.values[i]);
            const size = Number(sizeLeaf.values[i]);
            fontNames.add(`${family}_${size}`);
          }
        }
      }
    }
  }

  return {
    signals: Array.from(signalMap.values()),
    memos,
    effects,
    widgetBindings,
    themeMemos: themeMemos.length > 0 ? themeMemos : undefined,
    themeDefaultIndex: themeData?.defaultIndex,
    fontNames: fontNames.size > 0 ? Array.from(fontNames) : undefined,
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

  // Step 2: Inject includes + on_boot for the C++ runtime
  result = injectRuntimeIncludes(result);

  // Step 3: Inject signal.set() triggers on each HA sensor source
  for (const sig of runtimeConfig.signals) {
    const sourceId = sig.name.replace(/^sig_/, '');
    injectSignalTrigger(result, sourceId, sig.name, sig.cppType);
  }

  // Step 4: Inject build_flags to enable LVGL fonts used by theme memos
  if (runtimeConfig.fontNames && runtimeConfig.fontNames.length > 0) {
    result = injectFontBuildFlags(result, runtimeConfig.fontNames);
  }

  // Step 5: Inject build_flag for HA service calls in compiled triggers
  if (runtimeConfig.triggerFunctions?.some(fn => fn.body.includes('call_ha_service('))) {
    result = injectBuildFlag(result, 'USE_API_HOMEASSISTANT_SERVICES');
  }

  return result;
}

/**
 * Inject esphome.includes and on_boot into the config for the C++ runtime.
 */
function injectRuntimeIncludes(config: Record<string, unknown>): Record<string, unknown> {
  const result = { ...config };

  // Inject includes — espcompose_bindings.h MUST come first so its
  // #define ESPCOMPOSE_MAX_NODES override is seen before reactive.h.
  // Both files must be listed so ESPHome copies them to the build tree.
  const esphome = (result.esphome ?? {}) as Record<string, unknown>;
  const includes = Array.isArray(esphome.includes) ? [...esphome.includes] : [];
  includes.push('espcompose_bindings.h', 'espcompose_reactive.h');
  result.esphome = { ...esphome, includes };

  // Inject on_boot to call espcompose::setup()
  // Priority -10 ensures this runs AFTER LVGL and display are initialised,
  // so that Effects can safely call LVGL widget APIs.
  const espHome = result.esphome as Record<string, unknown>;
  const existingOnBoot = espHome.on_boot;
  const setupAction = {
    priority: -10,
    then: [{
      lambda: 'espcompose::setup();',
    }],
  };

  if (existingOnBoot) {
    espHome.on_boot = Array.isArray(existingOnBoot)
      ? [...existingOnBoot, setupAction]
      : [existingOnBoot, setupAction];
  } else {
    espHome.on_boot = setupAction;
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

function injectFontBuildFlags(config: Record<string, unknown>, fontNames: string[]): Record<string, unknown> {
  const flags = fontNames.map(fn => `-DLV_FONT_${fn.toUpperCase()}=1`);
  return injectBuildFlags(config, flags);
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
