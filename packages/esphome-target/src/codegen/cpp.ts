// ────────────────────────────────────────────────────────────────────────────
// C++ Backend — Generate espcompose_bindings.h from SemanticIR
//
// Uses the side-channel arrays on ir.espcompose.reactive as the authoritative
// source and delegates to the existing buildRuntimeConfig and generateBindingsHeader
// functions.
// ────────────────────────────────────────────────────────────────────────────

import type { SemanticIR, OverlayDefinition, IRValue, IRAction, IRActionNode, IRExpression, IRScript, IRBinding } from '@espcompose/core/internals';
import type { IRReactiveNode } from '@espcompose/core';
import { buildRuntimeConfig } from './reactive-config.js';
import { generateBindingsHeader } from './bindings.js';
import type { ReactiveRuntimeConfig } from './bindings.js';
import { processOverlayMux } from './overlay-mux.js';
import { generateAllClosureTables } from './closure-table.js';
import type { RemappedHAEntity } from '../ha-entity-classifier.js';

export interface CppBackendResult {
  runtimeConfig: ReactiveRuntimeConfig;
  bindingsHeaderContent: string;
  /** Diagnostic string describing the reactive pipeline composition. */
  pipelineInfo?: string;
  /** Additional reactive nodes created by the overlay mux system.
   *  These must be included in the YAML lowering reactive node map. */
  additionalReactiveNodes?: IRReactiveNode[];
  /** Overlay muxed bindings whose expression nodes need to be in the reactive node map. */
  overlayBindings?: IRBinding[];
  /** Overlay muxed action replacements (templateKey:position → muxed actions). */
  muxedActions?: Map<string, IRActionNode[]>;
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
export function generateCppFromIR(ir: SemanticIR, overlays?: OverlayDefinition[], remappedEntities?: RemappedHAEntity[]): CppBackendResult | null {
  const { reactive, themes } = ir.espcompose;

  // Extract globals from components (section === 'globals')
  const globalComponents = ir.esphome.components.filter(c => c.section === 'globals');

  // Process overlay definitions to build mux signals and muxed bindings.
  // This must happen before buildRuntimeConfig so the muxed bindings and
  // additional reactive nodes are included in the reactive pipeline.
  const overlayMux = overlays && overlays.length > 0
    ? processOverlayMux(overlays, (remappedEntities ?? ir.esphome.haEntities).length)
    : null;

  // Merge overlay-sourced data into the reactive pipeline
  const allBindings = overlayMux
    ? [...reactive.bindings, ...overlayMux.muxedBindings]
    : reactive.bindings;
  const allReactiveNodes = overlayMux
    ? [...reactive.memos, ...reactive.effects, ...overlayMux.additionalReactiveNodes]
    : [...reactive.memos, ...reactive.effects];

  const hasReactiveContent = allBindings.length > 0
    || allReactiveNodes.length > 0
    || (themes != null && themes.length > 0);

  // Check for scripts with closure tables — these need C++ struct/array
  // declarations even when there's no reactive content.
  const closureTablesBlock = generateAllClosureTables(ir.esphome.scripts as IRScript[]);
  const hasClosureTables = closureTablesBlock.length > 0;

  if (!hasReactiveContent && !hasClosureTables) return null;

  if (!hasReactiveContent && hasClosureTables) {
    // No reactive content, but closure tables exist — emit a minimal
    // bindings header with just the closure table declarations.
    const minimalConfig: ReactiveRuntimeConfig = {
      signals: [],
      globalSignals: [],
      memos: [],
      effects: [],
      widgetBindings: [],
      closureTablesBlock,
    };
    return {
      runtimeConfig: minimalConfig,
      bindingsHeaderContent: generateBindingsHeader(minimalConfig),
    };
  }

  // Scan the IR config tree for theme_read references and overlay_show template
  // keys. This catches theme tokens referenced by overlay widgets in top_layer
  // whose bindings may not flow through the reactive pipeline (e.g. when
  // overlay definitions are missing or incomplete).
  const { themeRefs, overlayShowKeys } = collectIRTreeReferences(ir);

  const runtimeConfig = buildRuntimeConfig(
    allReactiveNodes,
    allBindings,
    remappedEntities ?? ir.esphome.haEntities,
    themes,
    [],
    globalComponents,
    overlayMux?.muxSignalIndices,
    themeRefs.size > 0 ? themeRefs : undefined,
  );

  // Inject overlay mux signals into the runtime config
  if (overlayMux && overlayMux.muxSignals.length > 0) {
    runtimeConfig.signals.push(...overlayMux.muxSignals);
  }

  // Inject static data tables from table-driven mux optimisation
  if (overlayMux && overlayMux.tables.length > 0) {
    if (!runtimeConfig.tables) runtimeConfig.tables = [];
    runtimeConfig.tables.push(...overlayMux.tables);
  }

  // Ensure mux signals exist for all overlay_show actions in the IR tree.
  // If overlay definitions didn't flow through processOverlayMux(), the action
  // lambdas still reference espcompose::sig_overlay_<key>_mux — we must
  // declare the signal so the C++ compiles.
  for (const key of overlayShowKeys) {
    const muxSigName = `sig_overlay_${key}_mux`;
    if (!runtimeConfig.signals.some(s => s.name === muxSigName)) {
      runtimeConfig.signals.push({ name: muxSigName, cppType: 'int32_t' });
    }
  }

  // Replace divergent action trees inside overlay top_layer widgets with
  // muxed dispatch chains (if-actions checking the mux signal).
  if (overlayMux && overlayMux.muxedActions.size > 0) {
    replaceOverlayActionsInIR(ir, overlayMux.muxedActions);
  }

  // Attach pre-computed closure tables to the runtime config.
  if (hasClosureTables) {
    runtimeConfig.closureTablesBlock = closureTablesBlock;
  }

  return {
    runtimeConfig,
    bindingsHeaderContent: generateBindingsHeader(runtimeConfig),
    additionalReactiveNodes: overlayMux?.additionalReactiveNodes,
    overlayBindings: overlayMux?.muxedBindings,
    muxedActions: overlayMux?.muxedActions.size ? overlayMux.muxedActions : undefined,
    pipelineInfo: `${reactive.memos.length} main memos, ${reactive.effects.length} effects, ` +
      `${overlayMux?.additionalReactiveNodes.length ?? 0} overlay nodes ` +
      `(${overlayMux?.additionalReactiveNodes.filter(n => n.kind === 'memo').length ?? 0} overlay memos), ` +
      `${allReactiveNodes.length} total nodes ` +
      `[overlays arg: ${overlays === undefined ? 'undefined' : `array(${overlays.length})`}, ` +
      `instances: ${overlays?.reduce((s, p) => s + p.instances.length, 0) ?? 0}, ` +
      `per-instance captured nodes: ${overlays?.flatMap(p => p.instances.map(i => i.capturedReactiveNodes?.length ?? -1)).join(',') ?? 'n/a'}]`,
  };
}

// ────────────────────────────────────────────────────────────────────────────
// IR tree replacement for muxed overlay actions
// ────────────────────────────────────────────────────────────────────────────

/**
 * Walk the SemanticIR's LVGL top_layer widgets and replace divergent
 * `IRAction` nodes with muxed dispatch chains.
 *
 * The `replacements` map is keyed by `templateKey:position` where position
 * is the sequential index of the action within the overlay's widget tree
 * (depth-first traversal order, matching the capture order in lvgl.ts).
 *
 * This mutates the IR tree in place — the IRAction.actions array is replaced
 * with the muxed IRActionNode[] dispatch chain.
 */
function replaceOverlayActionsInIR(
  ir: SemanticIR,
  replacements: Map<string, IRActionNode[]>,
): void {
  // Navigate: sections → 'lvgl' → value.entries → 'top_layer' → widgets
  const lvglSection = ir.esphome.sections.find(s => s.key === 'lvgl');
  if (!lvglSection || lvglSection.value.kind !== 'object') return;

  const topLayerEntry = lvglSection.value.entries.find(e => e.key === 'top_layer');
  if (!topLayerEntry || topLayerEntry.value.kind !== 'object') return;

  const widgetsEntry = topLayerEntry.value.entries.find(e => e.key === 'widgets');
  if (!widgetsEntry || widgetsEntry.value.kind !== 'array') return;

  // Extract template keys from the replacement map to know which templates
  // have muxed actions.
  const templateKeys = new Set<string>();
  for (const key of replacements.keys()) {
    templateKeys.add(key.split(':')[0]);
  }

  // Walk each overlay widget's subtree separately with a per-template counter.
  // With the tier container architecture, the structure is:
  //   top_layer → widgets[]
  //     └─ { obj: { id: "overlay_tier_<zOrder>", widgets: [...] } }
  //         └─ { obj: { id: "overlay_<templateKey>", widgets: [...] } }
  //             └─ popup/toast content with action handlers
  //
  // We need to dig through the tier containers to find the overlay wrappers.
  for (const tierItem of widgetsEntry.value.items) {
    if (tierItem.kind !== 'object') continue;

    // Each tier container is { obj: { id: "overlay_tier_N", widgets: [...] } }
    const tierObjEntry = tierItem.entries.find(e => e.key === 'obj');
    if (!tierObjEntry || tierObjEntry.value.kind !== 'object') continue;

    const tierIdEntry = tierObjEntry.value.entries.find(e => e.key === 'id');
    if (!tierIdEntry || tierIdEntry.value.kind !== 'scalar') continue;

    const tierId = String(tierIdEntry.value.value);
    if (!tierId.startsWith('overlay_tier_')) continue;

    // Find the widgets array inside the tier container
    const tierWidgetsEntry = tierObjEntry.value.entries.find(e => e.key === 'widgets');
    if (!tierWidgetsEntry || tierWidgetsEntry.value.kind !== 'array') continue;

    // Now walk the overlay wrappers inside this tier
    for (const item of tierWidgetsEntry.value.items) {
      if (item.kind !== 'object') continue;

      // Each overlay wrapper is { obj: { id: "overlay_xxx", ... } }
      const objEntry = item.entries.find(e => e.key === 'obj');
      if (!objEntry || objEntry.value.kind !== 'object') continue;

      const idEntry = objEntry.value.entries.find(e => e.key === 'id');
      if (!idEntry || idEntry.value.kind !== 'scalar') continue;

      const id = String(idEntry.value.value);
      if (!id.startsWith('overlay_')) continue;

      const templateKey = id.slice('overlay_'.length);
      if (!templateKeys.has(templateKey)) continue;

      // Walk this overlay's subtree with a dedicated action counter.
      let actionIndex = 0;

      function walkIRValue(value: IRValue): void {
        if (value.kind === 'action') {
          const action = value as IRAction;
          const key = `${templateKey}:${actionIndex}`;
          const muxed = replacements.get(key);
          if (muxed) {
            action.actions = muxed;
          }
          actionIndex++;
        } else if (value.kind === 'object') {
          for (const entry of value.entries) {
            walkIRValue(entry.value);
          }
        } else if (value.kind === 'array') {
          for (const innerItem of value.items) {
            walkIRValue(innerItem);
          }
        }
      }

      walkIRValue(objEntry.value);
    }
  }
}

// ────────────────────────────────────────────────────────────────────────────
// IR tree scanning — collect theme_read refs and overlay_show template keys
// ────────────────────────────────────────────────────────────────────────────

/**
 * Walk the IR config tree and collect:
 *   1. Theme memo names referenced by reactive IR values (theme_read exprs)
 *   2. Overlay template keys referenced by overlay_show actions
 *
 * These are used to prevent tree-shaking from removing theme tokens that are
 * still referenced by YAML initial-value lambdas, and to ensure mux signals
 * are declared for all overlay_show actions even when overlay definitions didn't
 * flow through processOverlayMux().
 */
function collectIRTreeReferences(ir: SemanticIR): {
  themeRefs: Set<string>;
  overlayShowKeys: Set<string>;
} {
  const themeRefs = new Set<string>();
  const overlayShowKeys = new Set<string>();

  function walkIRValue(val: IRValue): void {
    switch (val.kind) {
      case 'reactive': {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const node = (val as any).node;
        if (node?.exprIR) {
          collectThemeReadsFromExpr(node.exprIR, themeRefs);
        }
        break;
      }
      case 'action': {
        const actionNode = val as IRAction;
        walkActionNodes(actionNode.actions);
        break;
      }
      case 'object': {
        for (const entry of val.entries) {
          walkIRValue(entry.value);
        }
        break;
      }
      case 'array': {
        for (const item of val.items) {
          walkIRValue(item);
        }
        break;
      }
    }
  }

  function walkActionNodes(actions: IRActionNode[]): void {
    for (const action of actions) {
      if (action.kind === 'action:overlay_show' && action.templateKey) {
        overlayShowKeys.add(action.templateKey);
      }
      if ('then' in action && Array.isArray((action as { then?: unknown }).then)) {
        walkActionNodes((action as { then: IRActionNode[] }).then);
      }
      if ('else' in action && Array.isArray((action as { else?: unknown }).else)) {
        walkActionNodes((action as { else: IRActionNode[] }).else);
      }
    }
  }

  for (const section of ir.esphome.sections) {
    walkIRValue(section.value);
  }

  return { themeRefs, overlayShowKeys };
}

/**
 * Recursively collect `thm_<scopeId>_<path>` names from an IRExpression tree.
 */
function collectThemeReadsFromExpr(expr: IRExpression, refs: Set<string>): void {
  if (!expr || typeof expr !== 'object') return;
  if (expr.kind === 'expr:theme_read') {
    refs.add(`thm_${expr.scopeId}_${expr.path}`);
    return;
  }
  // Recurse into composite expression nodes
  if ('left' in expr) collectThemeReadsFromExpr((expr as { left: IRExpression }).left, refs);
  if ('right' in expr) collectThemeReadsFromExpr((expr as { right: IRExpression }).right, refs);
  if ('operand' in expr) collectThemeReadsFromExpr((expr as { operand: IRExpression }).operand, refs);
  if ('test' in expr) collectThemeReadsFromExpr((expr as { test: IRExpression }).test, refs);
  if ('consequent' in expr) collectThemeReadsFromExpr((expr as { consequent: IRExpression }).consequent, refs);
  if ('alternate' in expr) collectThemeReadsFromExpr((expr as { alternate: IRExpression }).alternate, refs);
  if ('args' in expr && Array.isArray((expr as { args?: unknown }).args)) {
    for (const a of (expr as { args: IRExpression[] }).args) collectThemeReadsFromExpr(a, refs);
  }
  if ('parts' in expr && Array.isArray((expr as { parts?: unknown }).parts)) {
    for (const p of (expr as { parts: IRExpression[] }).parts) collectThemeReadsFromExpr(p, refs);
  }
  if ('expr' in expr && typeof (expr as { expr?: unknown }).expr === 'object') {
    collectThemeReadsFromExpr((expr as { expr: IRExpression }).expr, refs);
  }
  if ('cases' in expr && Array.isArray((expr as { cases?: unknown }).cases)) {
    for (const c of (expr as { cases: IRExpression[] }).cases) collectThemeReadsFromExpr(c, refs);
  }
  if ('index' in expr && typeof (expr as { index?: unknown }).index === 'object') {
    collectThemeReadsFromExpr((expr as { index: IRExpression }).index, refs);
  }
}
