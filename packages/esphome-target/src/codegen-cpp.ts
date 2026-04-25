// ────────────────────────────────────────────────────────────────────────────
// C++ Backend — Generate espcompose_bindings.h from SemanticIR
//
// Uses the side-channel arrays on ir.espcompose.reactive as the authoritative
// source and delegates to the existing buildRuntimeConfig and generateBindingsHeader
// functions.
// ────────────────────────────────────────────────────────────────────────────

import type { SemanticIR, PopupDefinition, IRValue, IRAction, IRActionNode, IRExprNode } from '@espcompose/core/internals';
import { buildRuntimeConfig } from './reactive-config.js';
import { generateBindingsHeader } from './bindings-codegen.js';
import type { ReactiveRuntimeConfig } from './bindings-codegen.js';
import { processPopupMux } from './popup-mux.js';

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
export function generateCppFromIR(ir: SemanticIR, popups?: PopupDefinition[]): CppBackendResult | null {
  const { reactive, themes } = ir.espcompose;

  // Extract globals from components (section === 'globals')
  const globalComponents = ir.esphome.components.filter(c => c.section === 'globals');

  // Process popup definitions to build mux signals and muxed bindings.
  // This must happen before buildRuntimeConfig so the muxed bindings and
  // additional reactive nodes are included in the reactive pipeline.
  const popupMux = popups && popups.length > 0
    ? processPopupMux(popups, ir.esphome.haEntities.length)
    : null;

  // Merge popup-sourced data into the reactive pipeline
  const allBindings = popupMux
    ? [...reactive.bindings, ...popupMux.muxedBindings]
    : reactive.bindings;
  const allReactiveNodes = popupMux
    ? [...reactive.memos, ...reactive.effects, ...popupMux.additionalReactiveNodes]
    : [...reactive.memos, ...reactive.effects];

  const hasReactiveContent = allBindings.length > 0
    || allReactiveNodes.length > 0
    || (themes != null && themes.length > 0);

  if (!hasReactiveContent) return null;

  // Scan the IR config tree for theme_read references and popup_show template
  // keys. This catches theme tokens referenced by popup widgets in top_layer
  // whose bindings may not flow through the reactive pipeline (e.g. when
  // popup definitions are missing or incomplete).
  const { themeRefs, popupShowKeys } = collectIRTreeReferences(ir);

  const runtimeConfig = buildRuntimeConfig(
    allReactiveNodes,
    allBindings,
    ir.esphome.haEntities,
    themes,
    [],
    globalComponents,
    popupMux?.muxSignalIndices,
    themeRefs.size > 0 ? themeRefs : undefined,
  );

  // Inject popup mux signals into the runtime config
  if (popupMux && popupMux.muxSignals.length > 0) {
    runtimeConfig.signals.push(...popupMux.muxSignals);
  }

  // Ensure mux signals exist for all popup_show actions in the IR tree.
  // If popup definitions didn't flow through processPopupMux(), the action
  // lambdas still reference espcompose::sig_popup_<key>_mux — we must
  // declare the signal so the C++ compiles.
  for (const key of popupShowKeys) {
    const muxSigName = `sig_popup_${key}_mux`;
    if (!runtimeConfig.signals.some(s => s.name === muxSigName)) {
      runtimeConfig.signals.push({ name: muxSigName, cppType: 'int32_t' });
    }
  }

  // Replace divergent action trees inside popup top_layer widgets with
  // muxed dispatch chains (if-actions checking the mux signal).
  if (popupMux && popupMux.muxedActions.size > 0) {
    replacePopupActionsInIR(ir, popupMux.muxedActions);
  }

  return {
    runtimeConfig,
    bindingsHeaderContent: generateBindingsHeader(runtimeConfig),
  };
}

// ────────────────────────────────────────────────────────────────────────────
// IR tree replacement for muxed popup actions
// ────────────────────────────────────────────────────────────────────────────

/**
 * Walk the SemanticIR's LVGL top_layer widgets and replace divergent
 * `IRAction` nodes with muxed dispatch chains.
 *
 * The `replacements` map is keyed by `templateKey:position` where position
 * is the sequential index of the action within the popup's widget tree
 * (depth-first traversal order, matching the capture order in lvgl.ts).
 *
 * This mutates the IR tree in place — the IRAction.actions array is replaced
 * with the muxed IRActionNode[] dispatch chain.
 */
function replacePopupActionsInIR(
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

  // Walk each popup widget's subtree separately with a per-template counter.
  // Popup widgets are wrapped in `obj` containers with `id: popup_{templateKey}`.
  for (const item of widgetsEntry.value.items) {
    if (item.kind !== 'object') continue;

    // Each popup wrapper is { obj: { id: "popup_xxx", ... } }
    const objEntry = item.entries.find(e => e.key === 'obj');
    if (!objEntry || objEntry.value.kind !== 'object') continue;

    const idEntry = objEntry.value.entries.find(e => e.key === 'id');
    if (!idEntry || idEntry.value.kind !== 'scalar') continue;

    const id = String(idEntry.value.value);
    if (!id.startsWith('popup_')) continue;

    const templateKey = id.slice('popup_'.length);
    if (!templateKeys.has(templateKey)) continue;

    // Walk this popup's subtree with a dedicated action counter.
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

// ────────────────────────────────────────────────────────────────────────────
// IR tree scanning — collect theme_read refs and popup_show template keys
// ────────────────────────────────────────────────────────────────────────────

/**
 * Walk the IR config tree and collect:
 *   1. Theme memo names referenced by reactive IR values (theme_read exprs)
 *   2. Popup template keys referenced by popup_show actions
 *
 * These are used to prevent tree-shaking from removing theme tokens that are
 * still referenced by YAML initial-value lambdas, and to ensure mux signals
 * are declared for all popup_show actions even when popup definitions didn't
 * flow through processPopupMux().
 */
function collectIRTreeReferences(ir: SemanticIR): {
  themeRefs: Set<string>;
  popupShowKeys: Set<string>;
} {
  const themeRefs = new Set<string>();
  const popupShowKeys = new Set<string>();

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
      if (action.kind === 'popup_show' && action.templateKey) {
        popupShowKeys.add(action.templateKey);
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

  return { themeRefs, popupShowKeys };
}

/**
 * Recursively collect `thm_<scopeId>_<path>` names from an IRExprNode tree.
 */
function collectThemeReadsFromExpr(expr: IRExprNode, refs: Set<string>): void {
  if (!expr || typeof expr !== 'object') return;
  if (expr.kind === 'theme_read') {
    refs.add(`thm_${expr.scopeId}_${expr.path}`);
    return;
  }
  // Recurse into composite expression nodes
  if ('left' in expr) collectThemeReadsFromExpr((expr as { left: IRExprNode }).left, refs);
  if ('right' in expr) collectThemeReadsFromExpr((expr as { right: IRExprNode }).right, refs);
  if ('operand' in expr) collectThemeReadsFromExpr((expr as { operand: IRExprNode }).operand, refs);
  if ('test' in expr) collectThemeReadsFromExpr((expr as { test: IRExprNode }).test, refs);
  if ('consequent' in expr) collectThemeReadsFromExpr((expr as { consequent: IRExprNode }).consequent, refs);
  if ('alternate' in expr) collectThemeReadsFromExpr((expr as { alternate: IRExprNode }).alternate, refs);
  if ('args' in expr && Array.isArray((expr as { args?: unknown }).args)) {
    for (const a of (expr as { args: IRExprNode[] }).args) collectThemeReadsFromExpr(a, refs);
  }
  if ('parts' in expr && Array.isArray((expr as { parts?: unknown }).parts)) {
    for (const p of (expr as { parts: IRExprNode[] }).parts) collectThemeReadsFromExpr(p, refs);
  }
  if ('expr' in expr && typeof (expr as { expr?: unknown }).expr === 'object') {
    collectThemeReadsFromExpr((expr as { expr: IRExprNode }).expr, refs);
  }
  if ('cases' in expr && Array.isArray((expr as { cases?: unknown }).cases)) {
    for (const c of (expr as { cases: IRExprNode[] }).cases) collectThemeReadsFromExpr(c, refs);
  }
  if ('index' in expr && typeof (expr as { index?: unknown }).index === 'object') {
    collectThemeReadsFromExpr((expr as { index: IRExprNode }).index, refs);
  }
}
