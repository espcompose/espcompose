// ────────────────────────────────────────────────────────────────────────────
// IRExpression optimizer — constant-folding and dead branch elimination.
//
// Pure function on the IRExpression tree (no target context needed).
// Applied in the core compile pipeline after SemanticIR is built so that
// every target receives already-optimized IR.
//
// Key optimization: when useReactiveMap() expands a finite string-literal
// union, it builds a chained ternary comparing the input against all union
// members. If the input is itself a ternary with literal branches (e.g.
// `signal ? "primary" : "secondary"`), most comparisons are dead code.
// This pass folds them away.
// ────────────────────────────────────────────────────────────────────────────

import type { IRExpression, IROpExpression, IRLiteralExpression } from './expr-types.js';
import type { SemanticIR } from './types.js';
import type { IRReactiveNode } from '../reactive/node.js';

// ── Public API ───────────────────────────────────────────────────────────────

/**
 * Optimize all IRExpression trees in a SemanticIR.
 *
 * Walks reactive bindings, memos, and effects, applying `optimizeExpr()`
 * to each `exprIR` field. Mutates nodes in-place for efficiency.
 */
export function optimizeSemanticIR(ir: SemanticIR): void {
  const { reactives } = ir;
  for (const binding of reactives.bindings) {
    optimizeNode(binding.expression);
  }
  for (const memo of reactives.memos) {
    optimizeNode(memo);
  }
  for (const effect of reactives.effects) {
    optimizeNode(effect);
  }
}

function optimizeNode(node: IRReactiveNode): void {
  if (node.exprIR) {
    node.exprIR = optimizeExpr(node.exprIR);
  }
}

/**
 * Recursively optimize an IRExpression tree bottom-up.
 *
 * Current optimizations:
 * - **Ternary-literal equality folding**:
 *   `(cond ? lit_X : lit_Y) == lit_Z`  →  `cond` | `!cond` | `false`
 * - **Dead branch elimination**:
 *   `ternary(true, A, B)` → `A`,  `ternary(false, A, B)` → `B`
 * - **Double negation collapse**: `!(!A)` → `A`
 */
export function optimizeExpr(node: IRExpression): IRExpression {
  // Leaf nodes — nothing to optimize
  if (!hasChildren(node)) return node;

  // Recurse into children first (bottom-up)
  const optimized = optimizeChildren(node);

  // Apply peephole rules at this node
  return applyRules(optimized);
}

// ── Internals ────────────────────────────────────────────────────────────────

function hasChildren(node: IRExpression): boolean {
  return node.kind === 'expr:op' || node.kind === 'expr:mux' ||
    node.kind === 'expr:table_lookup' || node.kind === 'expr:function';
}

/** Recurse into children of structural/op nodes. */
function optimizeChildren(node: IRExpression): IRExpression {
  switch (node.kind) {
    case 'expr:op': {
      const newChildren = node.children.map(c => optimizeExpr(c));
      if (newChildren.every((c, i) => c === node.children[i])) return node;
      return { ...node, children: newChildren };
    }
    case 'expr:mux': {
      const newIndex = optimizeExpr(node.index);
      const newCases = node.cases.map(c => optimizeExpr(c));
      if (newIndex === node.index && newCases.every((c, i) => c === node.cases[i])) return node;
      return { ...node, index: newIndex, cases: newCases };
    }
    case 'expr:table_lookup': {
      const newIndex = optimizeExpr(node.index);
      if (newIndex === node.index) return node;
      return { ...node, index: newIndex };
    }
    // expr:function has a statement block body — don't recurse into statements
    default:
      return node;
  }
}

/** Apply peephole optimization rules to a single node (children already optimized). */
function applyRules(node: IRExpression): IRExpression {
  if (node.kind !== 'expr:op') return node;

  const op = node.op;

  // Rule 0: Strip unnecessary group wrappers — (expr) → expr
  if (op.tag === 'group') {
    return node.children[0];
  }

  // Rule 1: Dead branch elimination for ternary with literal condition
  if (op.tag === 'ternary') {
    return foldTernaryLiteralCondition(node);
  }

  // Rule 2: Ternary-literal equality folding
  if (op.tag === 'binary' && (op.op === '==' || op.op === '!=')) {
    return foldTernaryLiteralEquality(node);
  }

  // Rule 3: Double negation collapse
  if (op.tag === 'unary' && op.op === '!') {
    return foldDoubleNegation(node);
  }

  return node;
}

// ── Rule 1: ternary(literal_bool, A, B) ──────────────────────────────────

function foldTernaryLiteralCondition(node: IROpExpression): IRExpression {
  const [cond, consequent, alternate] = node.children;
  if (!isLiteral(cond)) return node;
  return isTruthy(cond as IRLiteralExpression) ? consequent : alternate;
}

// ── Rule 2: (cond ? lit_X : lit_Y) == lit_Z ─────────────────────────────

function foldTernaryLiteralEquality(node: IROpExpression): IRExpression {
  const op = node.op as { tag: 'binary'; op: '==' | '!=' };
  const [left, right] = node.children;

  // Try both orientations: (ternary == literal) and (literal == ternary)
  const result = tryFoldEq(left, right, op.op) ?? tryFoldEq(right, left, op.op);
  return result ?? node;
}

/**
 * Try to fold `ternaryExpr op literalExpr` where:
 * - `ternaryExpr` is `ternary(cond, literal_X, literal_Y)`
 * - `literalExpr` is `literal(Z)`
 * - `op` is `==` or `!=`
 */
function tryFoldEq(
  ternaryCandidate: IRExpression,
  literalCandidate: IRExpression,
  op: '==' | '!=',
): IRExpression | undefined {
  if (!isLiteral(literalCandidate)) return undefined;
  if (!isTernaryOp(ternaryCandidate)) return undefined;

  const [cond, consequent, alternate] = (ternaryCandidate as IROpExpression).children;
  if (!isLiteral(consequent) || !isLiteral(alternate)) return undefined;

  const z = (literalCandidate as IRLiteralExpression).value;
  const x = (consequent as IRLiteralExpression).value;
  const y = (alternate as IRLiteralExpression).value;

  let result: IRExpression;
  if (z === x && z !== y) {
    // (cond ? X : Y) == X → cond
    result = cond;
  } else if (z === y && z !== x) {
    // (cond ? X : Y) == Y → !cond
    result = negate(cond);
  } else if (z !== x && z !== y) {
    // (cond ? X : Y) == Z where Z ∉ {X, Y} → false
    result = { kind: 'expr:literal', value: false, type: 'bool' } as IRLiteralExpression;
  } else {
    // z === x && z === y → both branches produce the same value, so == is always true
    result = { kind: 'expr:literal', value: true, type: 'bool' } as IRLiteralExpression;
  }

  // For != invert the result
  if (op === '!=') {
    result = negate(result);
  }

  // Run rules again on the result (e.g. !false → true)
  return applyRules(result);
}

// ── Rule 3: !(!A) ──────────────────────────────────────────────────────

function foldDoubleNegation(node: IROpExpression): IRExpression {
  const inner = node.children[0];

  // !!A → A
  if (inner.kind === 'expr:op' && inner.op.tag === 'unary' && inner.op.op === '!') {
    return inner.children[0];
  }

  // !true → false, !false → true
  if (isLiteral(inner)) {
    const val = (inner as IRLiteralExpression).value;
    if (typeof val === 'boolean') {
      return { kind: 'expr:literal', value: !val, type: 'bool' } as IRLiteralExpression;
    }
  }

  return node;
}

// ── Utilities ────────────────────────────────────────────────────────────────

function isLiteral(node: IRExpression): node is IRLiteralExpression {
  return node.kind === 'expr:literal';
}

function isTernaryOp(node: IRExpression): boolean {
  return node.kind === 'expr:op' && (node as IROpExpression).op.tag === 'ternary';
}

function isTruthy(node: IRLiteralExpression): boolean {
  return !!node.value;
}

function negate(node: IRExpression): IRExpression {
  return { kind: 'expr:op', op: { tag: 'unary', op: '!' }, children: [node] } as IROpExpression;
}
