// ────────────────────────────────────────────────────────────────────────────
// C++ Backend — Generate espcompose_bindings.h from SemanticIR
//
// Uses the side-channel arrays on ir.espcompose.reactive as the authoritative
// source and delegates to the existing buildRuntimeConfig and generateBindingsHeader
// functions.
// ────────────────────────────────────────────────────────────────────────────

import type { SemanticIR, OverlayDefinition, IRValue, IRAction, IRActionNode, IRExpression, IRScript, IRBinding, IRStyleTransition, IRAnimateTransition } from '@espcompose/core/internals';
import type { IRReactiveNode } from '@espcompose/core/internals';
import { getExprChildren } from '@espcompose/core/internals';
import { buildRuntimeConfig } from './reactive-config.js';
import { generateBindingsHeader, resolveEasingCb } from './bindings.js';
import type { ReactiveRuntimeConfig, StyleTransitionDecl, AnimateTransitionDecl } from './bindings.js';
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
  const reactive = ir.reactives;
  const themes = ir.themes;

  // Extract globals from components (section === 'globals')
  const globalComponents = ir.components.filter(c => c.section === 'globals');

  // Process overlay definitions to build mux signals and muxed bindings.
  // This must happen before buildRuntimeConfig so the muxed bindings and
  // additional reactive nodes are included in the reactive pipeline.
  const overlayMux = overlays && overlays.length > 0
    ? processOverlayMux(overlays, (remappedEntities ?? [...ir.entities]).length)
    : null;

  // Merge overlay-sourced data into the reactive pipeline
  const allBindings = overlayMux
    ? [...reactive.bindings, ...overlayMux.muxedBindings]
    : reactive.bindings;
  const mergedReactiveNodes = overlayMux
    ? [...reactive.memos, ...reactive.effects, ...overlayMux.additionalReactiveNodes]
    : [...reactive.memos, ...reactive.effects];

  // ── Dead memo elimination ──────────────────────────────────────────────
  // Walk the complete binding + effect graph to find which memos are
  // actually referenced.  Unreferenced memos are dead code — typically
  // per-instance overlay memos whose computations were inlined by the mux
  // system — and can be safely dropped to save RAM and CPU on the target.
  // Widget tree initial-value lambdas that referenced pruned memos are
  // handled gracefully in generateInitialValueLambda (lower-yaml.ts) by
  // emitting a type-appropriate default; the reactive Effect sets the
  // correct value on the first flush before the display is visible.
  const allReactiveNodes = pruneDeadMemos(mergedReactiveNodes, allBindings);

  const hasReactiveContent = allBindings.length > 0
    || allReactiveNodes.length > 0
    || themes.length > 0;

  // Check for scripts with closure tables — these need C++ struct/array
  // declarations even when there's no reactive content.
  const closureTablesBlock = generateAllClosureTables([...ir.scripts] as IRScript[]);
  const hasClosureTables = closureTablesBlock.length > 0;

  // Collect declarative style transitions from all UI registries.
  const allStyleTransitions = ir.uis.flatMap(ui => ui.styleTransitions);
  const styleTransitionDecls = allStyleTransitions.length > 0
    ? lowerStyleTransitions(allStyleTransitions)
    : undefined;

  // Collect animated binding transitions from all UI registries.
  const allAnimateTransitions = ir.uis.flatMap(ui => ui.animateTransitions);
  const animateTransitionDecls = allAnimateTransitions.length > 0
    ? lowerAnimateTransitions(allAnimateTransitions)
    : undefined;

  if (!hasReactiveContent && !hasClosureTables && !styleTransitionDecls) return null;

  if (!hasReactiveContent && (hasClosureTables || styleTransitionDecls)) {
    // No reactive content, but closure tables or style transitions exist —
    // emit a minimal bindings header with just those declarations.
    const minimalConfig: ReactiveRuntimeConfig = {
      signals: [],
      globalSignals: [],
      memos: [],
      effects: [],
      widgetBindings: [],
      closureTablesBlock: hasClosureTables ? closureTablesBlock : undefined,
      styleTransitions: styleTransitionDecls,
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
    remappedEntities ?? [...ir.entities],
    [...themes],
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
  // lambdas still reference espcompose::sig_<key>_mux — we must
  // declare the signal so the C++ compiles.
  for (const key of overlayShowKeys) {
    const muxSigName = `sig_${key}_mux`;
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

  // Attach style transition declarations.
  if (styleTransitionDecls) {
    runtimeConfig.styleTransitions = styleTransitionDecls;
  }

  // Attach animated binding transition declarations.
  if (animateTransitionDecls) {
    runtimeConfig.animateTransitions = animateTransitionDecls;
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

// ── Style transition IR → C++ lowering ─────────────────────────────────────

/** Convert a camelCase identifier to snake_case. */
function camelToSnake(s: string): string {
  return s.replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`);
}

/**
 * Lower `IRStyleTransition[]` from the semantic IR into `StyleTransitionDecl[]`
 * ready for C++ emission in `generateBindingsHeader()`.
 *
 * Converts property names from LVGL camelCase (e.g. 'bgColor') to snake_case
 * (e.g. 'bg_color') and resolves easing keys to LVGL path callback names.
 */
function lowerStyleTransitions(transitions: IRStyleTransition[]): StyleTransitionDecl[] {
  return transitions.map((t): StyleTransitionDecl => ({
    targetRef: t.targetRef,
    part: t.part,
    state: t.state,
    descriptors: t.descriptors.map(d => ({
      properties: d.properties.map(camelToSnake),
      durationMs: d.durationMs,
      easingCb: resolveEasingCb(d.easing),
      delayMs: d.delayMs,
    })),
  }));
}

/**
 * Lower `IRAnimateTransition[]` from the semantic IR into `AnimateTransitionDecl[]`
 * ready for augmenting widget binding Effects in `generateBindingsHeader()`.
 *
 * Converts property name from LVGL camelCase to snake_case and resolves
 * easing keys to LVGL path callback names.
 */
function lowerAnimateTransitions(transitions: IRAnimateTransition[]): AnimateTransitionDecl[] {
  return transitions.map((t): AnimateTransitionDecl => ({
    targetRef: t.targetRef,
    property: camelToSnake(t.property),
    durationMs: t.durationMs,
    easingCb: resolveEasingCb(t.easing),
    direction: t.direction,
  }));
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
  const lvglSection = ir.sections.find(s => s.key === 'lvgl');
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
  //         └─ { obj: { id: "<templateKey>", widgets: [...] } }
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
          collectThemeReadsFromIR(node.exprIR, themeRefs);
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

  for (const section of ir.sections) {
    walkIRValue(section.value);
  }

  return { themeRefs, overlayShowKeys };
}

/**
 * Recursively collect `thm_<scopeId>_<path>` names from an IRExpression tree.
 */
function collectThemeReadsFromIR(ir: IRExpression, refs: Set<string>): void {
  collectThemeReadsFromExpr(ir, refs);
}

function collectThemeReadsFromExpr(expr: IRExpression, refs: Set<string>): void {
  if (!expr || typeof expr !== 'object') return;
  if (expr.kind === 'expr:theme_read') {
    refs.add(`thm_${expr.scopeId}_${expr.path}`);
    return;
  }
  // Function expression — descend via getExprChildren (walks statement block)
  if (expr.kind === 'expr:function') {
    for (const child of getExprChildren(expr)) {
      collectThemeReadsFromExpr(child, refs);
    }
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

// ── Dead memo elimination ──────────────────────────────────────────────────
//
// Whole-program pass that removes unreferenced memos from the reactive node
// list.  A memo is "referenced" if:
//   - A binding's expression is backed by the memo (expression.kind === 'memo')
//   - An expression tree contains an `expr:memo_read` pointing to the memo
//   - Another referenced memo transitively references it
//
// Unreferenced memos are dead code — typically per-instance overlay memos
// whose computations were inlined by the mux system.  Widget tree initial-
// value lambdas handle pruned memos gracefully by emitting safe defaults.

/**
 * Recursively collect all memo IDs referenced via `expr:memo_read` in an
 * expression tree.
 */
function collectMemoReads(expr: IRExpression, out: Set<string>): void {
  if (expr.kind === 'expr:memo_read') {
    out.add((expr as { memoId: string }).memoId);
    return;
  }
  for (const child of getExprChildren(expr)) {
    collectMemoReads(child, out);
  }
}

/**
 * Remove unreferenced memos from a reactive node list.  Walks all bindings
 * and non-memo nodes (effects) to discover which memos are live, then
 * computes a transitive closure over memo→memo dependencies.
 */
function pruneDeadMemos(
  reactiveNodes: IRReactiveNode[],
  bindings: IRBinding[],
): IRReactiveNode[] {
  // Fast path: nothing to prune
  const hasMemos = reactiveNodes.some(n => n.kind === 'memo');
  if (!hasMemos) return reactiveNodes;

  // 1. Index all memos
  const memoMap = new Map<string, IRReactiveNode>();
  for (const node of reactiveNodes) {
    if (node.kind === 'memo') memoMap.set(node.nodeId, node);
  }

  // 2. Collect directly referenced memo IDs
  const referencedIds = new Set<string>();

  // 2a. Bindings whose expression IS a memo (kind === 'memo')
  for (const binding of bindings) {
    const expr = binding.expression;
    if (expr.kind === 'memo') referencedIds.add(expr.nodeId);
    if (expr.exprIR) collectMemoReads(expr.exprIR, referencedIds);
  }

  // 2b. Effects and other non-memo nodes may reference memos in their exprIR
  for (const node of reactiveNodes) {
    if (node.kind !== 'memo' && node.exprIR) {
      collectMemoReads(node.exprIR, referencedIds);
    }
  }

  // 3. Transitive closure: referenced memos may themselves reference others
  let prevSize = 0;
  while (referencedIds.size > prevSize) {
    prevSize = referencedIds.size;
    for (const memoId of referencedIds) {
      const node = memoMap.get(memoId);
      if (node?.exprIR) collectMemoReads(node.exprIR, referencedIds);
    }
  }

  // 4. Filter: keep all non-memo nodes + referenced memos
  const prunedCount = [...memoMap.keys()].filter(id => !referencedIds.has(id)).length;
  if (prunedCount === 0) return reactiveNodes;

  return reactiveNodes.filter(n => n.kind !== 'memo' || referencedIds.has(n.nodeId));
}
