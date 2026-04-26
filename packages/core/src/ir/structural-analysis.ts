// ────────────────────────────────────────────────────────────────────────────
// Structural Similarity Analysis for IRExprNode and IRActionNode trees
//
// Walks N expression (or action) trees in lockstep to detect when all
// instances share identical structure and differ only at specific leaf
// positions ("holes").  Returns a template tree with slot sentinels plus a
// list of holes — downstream consumers decide how to replace each hole
// (e.g. table_lookup for literal holes, localized mux for signal_read holes).
//
// Pure functions, no side effects. Returns 'divergent' for any structure
// that is not explicitly recognizable — never silently degrades.
// ────────────────────────────────────────────────────────────────────────────

import type { IRExprNode, ExprType } from './expr-types.js';
import type { IRActionNode, IRActionParam, IRLiteralParam, IRHAServiceAction } from './action-types.js';

// ── Expression Structural Analysis ───────────────────────────────────────────

export interface ExprLiteralHole {
  readonly holeId: number;
  readonly holeKind: 'literal';
  readonly values: readonly (string | number | boolean)[];
  readonly type: ExprType;
}

export interface ExprSignalReadHole {
  readonly holeId: number;
  readonly holeKind: 'signal_read';
  readonly signalIndices: readonly number[];
  // Type context from the expression tree — inferred from how the signal
  // value is used (e.g. 'bool' for a ternary condition, 'float' for a
  // binary arithmetic operand).
  readonly type: ExprType;
}

export type ExprHole = ExprLiteralHole | ExprSignalReadHole;

export type ExprStructuralAnalysis =
  | { readonly kind: 'identical' }
  | { readonly kind: 'optimizable'; readonly template: IRExprNode; readonly holes: readonly ExprHole[] }
  | { readonly kind: 'divergent' };

/**
 * Walk N expression trees in lockstep and detect structural similarity.
 *
 * Returns:
 * - `'identical'`    — all N trees are structurally and value-identical
 * - `'optimizable'`  — same structure, differing only at leaf positions (holes)
 * - `'divergent'`    — different structure at some position, cannot optimise
 *
 * Requires at least 2 expressions. Returns `'identical'` for a 1-element array.
 */
export function analyzeExprStructure(exprs: readonly IRExprNode[]): ExprStructuralAnalysis {
  if (exprs.length === 0) return { kind: 'identical' };
  if (exprs.length === 1) return { kind: 'identical' };

  const holes: ExprHole[] = [];
  let nextHoleId = 0;

  const template = walkLockstep(exprs, () => nextHoleId++, holes);
  if (template === null) return { kind: 'divergent' };
  if (holes.length === 0) return { kind: 'identical' };
  return { kind: 'optimizable', template, holes };
}

// ── Lockstep walker ──────────────────────────────────────────────────────────
//
// Returns the template node (with slot sentinels for holes), or null if
// the trees are structurally divergent.

function walkLockstep(
  nodes: readonly IRExprNode[],
  allocHoleId: () => number,
  holes: ExprHole[],
): IRExprNode | null {
  const first = nodes[0];

  // All nodes must have the same kind
  for (let i = 1; i < nodes.length; i++) {
    if (nodes[i].kind !== first.kind) return null;
  }

  switch (first.kind) {
    // ── Leaf nodes ─────────────────────────────────────────────────────
    case 'literal': {
      const typed = nodes as readonly (typeof first)[];
      // All must have same type
      for (let i = 1; i < typed.length; i++) {
        if (typed[i].type !== first.type) return null;
      }
      // Check if values are all identical
      let allSame = true;
      for (let i = 1; i < typed.length; i++) {
        if (typed[i].value !== first.value) { allSame = false; break; }
      }
      if (allSame) return first;
      // Varying literal → hole
      const holeId = allocHoleId();
      holes.push({
        holeId,
        holeKind: 'literal',
        values: typed.map(n => n.value),
        type: first.type,
      });
      return { kind: 'slot', slotIndex: holeId } as IRExprNode;
    }

    case 'signal_read': {
      const typed = nodes as readonly (typeof first)[];
      let allSame = true;
      for (let i = 1; i < typed.length; i++) {
        if (typed[i].signalIndex !== first.signalIndex) { allSame = false; break; }
      }
      if (allSame) return first;
      // Varying signal → hole.  Type must be inferred from usage context
      // by the caller; we default to 'bool' as a conservative choice but
      // the hole consumer should use the binding's known ExprType.
      const holeId = allocHoleId();
      holes.push({
        holeId,
        holeKind: 'signal_read',
        signalIndices: typed.map(n => n.signalIndex),
        type: 'bool',
      });
      return { kind: 'slot', slotIndex: holeId } as IRExprNode;
    }

    case 'memo_read': {
      const typed = nodes as readonly (typeof first)[];
      for (let i = 1; i < typed.length; i++) {
        if (typed[i].memoId !== first.memoId) return null;
      }
      return first;
    }

    case 'theme_read': {
      const typed = nodes as readonly (typeof first)[];
      for (let i = 1; i < typed.length; i++) {
        if (typed[i].scopeId !== first.scopeId || typed[i].path !== first.path) return null;
      }
      return first;
    }

    case 'entity_prop': {
      const typed = nodes as readonly (typeof first)[];
      for (let i = 1; i < typed.length; i++) {
        if (typed[i].entityId !== first.entityId || typed[i].property !== first.property) return null;
      }
      return first;
    }

    case 'global_read': {
      const typed = nodes as readonly (typeof first)[];
      for (let i = 1; i < typed.length; i++) {
        if (typed[i].globalId !== first.globalId) return null;
      }
      return first;
    }

    case 'component_read': {
      const typed = nodes as readonly (typeof first)[];
      for (let i = 1; i < typed.length; i++) {
        if (typed[i].componentId !== first.componentId || typed[i].sensorIndex !== first.sensorIndex) return null;
      }
      return first;
    }

    case 'trigger_var': {
      const typed = nodes as readonly (typeof first)[];
      for (let i = 1; i < typed.length; i++) {
        if (typed[i].name !== first.name) return null;
      }
      return first;
    }

    case 'slot': {
      const typed = nodes as readonly (typeof first)[];
      for (let i = 1; i < typed.length; i++) {
        if (typed[i].slotIndex !== first.slotIndex) return null;
      }
      return first;
    }

    // ── Mux / table_lookup — structural nodes that may themselves appear
    //    inside expressions being compared. Treat them as divergent since
    //    optimising already-muxed trees would be nested mux-over-mux. ───
    case 'mux':
    case 'table_lookup':
      return null;

    // ── Generic op node — compare tag + scalar attrs, walk children ────
    case 'op': {
      const typed = nodes as readonly (typeof first)[];
      for (let i = 1; i < typed.length; i++) {
        const other = typed[i];
        if (other.op.tag !== first.op.tag) return null;
        if (other.children.length !== first.children.length) return null;
        // Compare all scalar attrs on the op descriptor (everything except tag)
        for (const key of Object.keys(first.op)) {
          if (key !== 'tag' && (first.op as Record<string, unknown>)[key] !== (other.op as Record<string, unknown>)[key]) return null;
        }
      }
      const children: IRExprNode[] = [];
      for (let c = 0; c < first.children.length; c++) {
        const child = walkLockstep(typed.map(n => n.children[c]), allocHoleId, holes);
        if (child === null) return null;
        children.push(child);
      }
      return { ...first, children };
    }

    default: {
      // Exhaustiveness guard — if a new IRExprNode kind is added without
      // handling here, TypeScript will flag this at compile time.
      const _exhaustive: never = first;
      throw new Error(`analyzeExprStructure: unhandled kind '${(_exhaustive as { kind: string }).kind}'`);
    }
  }
}

// ── Action Structural Analysis ───────────────────────────────────────────────

export interface ActionParamHole {
  /** Index of the action within the per-instance action array. */
  readonly actionIndex: number;
  /** Dot-path to the varying param within the action, e.g. "data.entity_id". */
  readonly paramPath: string;
  /** Per-instance literal values for this param. */
  readonly values: readonly (string | number | boolean)[];
  /** Inferred ExprType from the values. */
  readonly type: ExprType;
}

export type ActionStructuralAnalysis =
  | { readonly kind: 'identical' }
  | { readonly kind: 'optimizable'; readonly templateActions: IRActionNode[]; readonly varyingParams: readonly ActionParamHole[] }
  | { readonly kind: 'divergent' };

/**
 * Walk N action arrays in lockstep and detect structural similarity.
 *
 * Returns:
 * - `'identical'`    — all arrays are structurally and value-identical
 * - `'optimizable'`  — same structure, differing only in literal data params
 * - `'divergent'`    — different structure at some position
 *
 * Currently supports `ha_service` actions with literal `data` param holes.
 * Other action kinds are compared for exact identity — any difference
 * returns `divergent`.
 */
export function analyzeActionStructure(instances: readonly (readonly IRActionNode[])[]): ActionStructuralAnalysis {
  if (instances.length <= 1) return { kind: 'identical' };

  const first = instances[0];
  // All instances must have the same number of actions
  for (let i = 1; i < instances.length; i++) {
    if (instances[i].length !== first.length) return { kind: 'divergent' };
  }

  const holes: ActionParamHole[] = [];
  const templateActions: IRActionNode[] = [];

  for (let a = 0; a < first.length; a++) {
    const action0 = first[a];
    // All must have the same kind
    for (let i = 1; i < instances.length; i++) {
      if (instances[i][a].kind !== action0.kind) return { kind: 'divergent' };
    }

    switch (action0.kind) {
      case 'ha_service': {
        const typed = instances.map(inst => inst[a] as IRHAServiceAction);
        const result = analyzeHAServiceActions(typed, a, holes);
        if (result === null) return { kind: 'divergent' };
        templateActions.push(result);
        break;
      }
      default: {
        // For all other action kinds, require exact identity via
        // JSON serialisation (same approach as actionFingerprint).
        const fp0 = JSON.stringify(action0);
        for (let i = 1; i < instances.length; i++) {
          if (JSON.stringify(instances[i][a]) !== fp0) return { kind: 'divergent' };
        }
        templateActions.push(action0);
      }
    }
  }

  if (holes.length === 0) return { kind: 'identical' };
  return { kind: 'optimizable', templateActions, varyingParams: holes };
}

// ── ha_service action analysis ───────────────────────────────────────────────

function analyzeHAServiceActions(
  actions: readonly IRHAServiceAction[],
  actionIndex: number,
  holes: ActionParamHole[],
): IRHAServiceAction | null {
  const first = actions[0];

  // Action name must be identical
  for (let i = 1; i < actions.length; i++) {
    if (actions[i].action !== first.action) return null;
  }

  // No data on any instance — identical
  if (!first.data) {
    for (let i = 1; i < actions.length; i++) {
      if (actions[i].data) return null;
    }
    return first;
  }

  // All must have data with the same keys
  const keys = Object.keys(first.data);
  for (let i = 1; i < actions.length; i++) {
    const d = actions[i].data;
    if (!d) return null;
    const otherKeys = Object.keys(d);
    if (otherKeys.length !== keys.length) return null;
    for (const k of keys) {
      if (!(k in d)) return null;
    }
  }

  // Compare each data param
  const templateData: Record<string, IRActionParam> = {};

  for (const key of keys) {
    const param0 = first.data[key];

    // Normalise: bare primitives (from runtime-resolved expression params in
    // the compiled bundle) are treated like { kind: 'literal', value: ... }.
    const norm0 = normaliseLiteralParam(param0);
    const isLiteral0 = norm0 !== null;

    if (!isLiteral0) {
      // Non-literal (trigger_var, expression, etc.): require exact identity
      for (let i = 1; i < actions.length; i++) {
        const paramI = actions[i].data![key];
        if (normaliseLiteralParam(paramI) !== null) return null; // kind mismatch
        if (JSON.stringify(paramI) !== JSON.stringify(param0)) return null;
      }
      templateData[key] = param0;
      continue;
    }

    // Literal param — check if all values are identical or varying
    let allSame = true;
    const values: (string | number | boolean)[] = [norm0.value];
    for (let i = 1; i < actions.length; i++) {
      const normI = normaliseLiteralParam(actions[i].data![key]);
      if (normI === null) return null; // kind mismatch → divergent
      values.push(normI.value);
      if (normI.value !== norm0.value) { allSame = false; }
    }

    if (allSame) {
      templateData[key] = norm0;
    } else {
      // Varying literal → record hole, keep norm0 as placeholder in template
      holes.push({
        actionIndex,
        paramPath: `data.${key}`,
        values,
        type: inferTypeFromValues(values),
      });
      // Placeholder — will be replaced by reactive_expr in Phase 5
      templateData[key] = norm0;
    }
  }

  return { kind: 'ha_service', action: first.action, data: templateData };
}

/**
 * Normalise an action param to `IRLiteralParam` if it is a literal or bare
 * primitive.  Runtime-resolved expression params (via `serializeWithExpressions`
 * in the compiled bundle) arrive as bare strings/numbers/booleans rather than
 * `{ kind: 'literal', value: ... }` objects.  Returns `null` for non-literal params.
 */
function normaliseLiteralParam(param: IRActionParam | string | number | boolean): IRLiteralParam | null {
  if (typeof param === 'string' || typeof param === 'number' || typeof param === 'boolean') {
    return { kind: 'literal', value: param };
  }
  if (typeof param === 'object' && param !== null && 'kind' in param && param.kind === 'literal') {
    return param as IRLiteralParam;
  }
  return null;
}

/** Infer ExprType from a set of literal values. */
function inferTypeFromValues(values: readonly (string | number | boolean)[]): ExprType {
  if (values.length === 0) return 'string';
  const first = values[0];
  if (typeof first === 'string') return 'string';
  if (typeof first === 'boolean') return 'bool';
  if (Number.isInteger(first)) return 'int';
  return 'float';
}
