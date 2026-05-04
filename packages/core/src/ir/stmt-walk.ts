// ────────────────────────────────────────────────────────────────────────────
// Statement IR — Structural walkers
//
// Provides utilities to extract all IRExpression nodes nested inside a
// statement block. Used by scanners (theme reads, source names, fingerprints)
// that need to walk the full reactive dependency tree.
// ────────────────────────────────────────────────────────────────────────────

import type { IRExpression } from './expr-types.js';
import type { IRStatement, IRStatementBlock } from './stmt-types.js';

/**
 * Collect all IRExpression nodes that appear directly within a statement
 * (initializers, conditions, assignment values, return expressions).
 *
 * Does NOT recurse into child expressions — callers should combine this with
 * `getExprChildren` for deep traversal.
 */
function getStatementExpressions(stmt: IRStatement): IRExpression[] {
  switch (stmt.kind) {
    case 'stmt:var_decl':
      return [stmt.initializer];
    case 'stmt:assign':
      return [stmt.value];
    case 'stmt:if':
      return [
        stmt.condition,
        ...stmt.then.flatMap(getStatementExpressions),
        ...(stmt.else ? stmt.else.flatMap(getStatementExpressions) : []),
      ];
    case 'stmt:for_range':
      return [
        stmt.start,
        stmt.end,
        ...stmt.body.flatMap(getStatementExpressions),
      ];
    case 'stmt:while':
      return [
        stmt.condition,
        ...stmt.body.flatMap(getStatementExpressions),
      ];
    case 'stmt:return':
      return [stmt.value];
    default: {
      const _exhaustive: never = stmt;
      throw new Error(`getStatementExpressions: unhandled kind '${(_exhaustive as { kind: string }).kind}'`);
    }
  }
}

/**
 * Collect all top-level IRExpression nodes nested within a statement block.
 *
 * Returns the "root" expressions from each statement — callers can then
 * recurse via `getExprChildren` to walk the full expression trees.
 */
export function getStatementBlockExpressions(block: IRStatementBlock): IRExpression[] {
  return block.statements.flatMap(getStatementExpressions);
}
