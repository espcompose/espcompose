// ────────────────────────────────────────────────────────────────────────────
// IRStatementBlock → C++ statement lowering
//
// Converts target-agnostic IRStatementBlock trees into C++ statement lines
// for multi-statement memo lambdas in the ESPHome reactive runtime.
// ────────────────────────────────────────────────────────────────────────────

import type { IRStatement, IRStatementBlock } from '@espcompose/core/internals';
import { exprToCpp } from './expr-to-cpp.js';
import type { CppLoweringContext } from './expr-to-cpp.js';

/**
 * Lower an IRStatementBlock to C++ statement lines.
 *
 * Returns an array of C++ lines (without trailing semicolons on block constructs).
 * The caller wraps these in the lambda body.
 */
export function statementBlockToCpp(block: IRStatementBlock, ctx: CppLoweringContext): string[] {
  return lowerStatements(block.statements, ctx, 0);
}

function lowerStatements(stmts: IRStatement[], ctx: CppLoweringContext, indent: number): string[] {
  const lines: string[] = [];
  for (const stmt of stmts) {
    lines.push(...lowerStatement(stmt, ctx, indent));
  }
  return lines;
}

function lowerStatement(stmt: IRStatement, ctx: CppLoweringContext, indent: number): string[] {
  const pad = '  '.repeat(indent);
  switch (stmt.kind) {
    case 'stmt:var_decl': {
      const init = exprToCpp(stmt.initializer, ctx);
      return [`${pad}auto ${stmt.name} = ${init};`];
    }

    case 'stmt:assign': {
      const value = exprToCpp(stmt.value, ctx);
      return [`${pad}${stmt.target} ${stmt.op} ${value};`];
    }

    case 'stmt:if': {
      const cond = exprToCpp(stmt.condition, ctx);
      const lines: string[] = [];
      lines.push(`${pad}if (${cond}) {`);
      lines.push(...lowerStatements(stmt.then, ctx, indent + 1));
      if (stmt.else && stmt.else.length > 0) {
        lines.push(`${pad}} else {`);
        lines.push(...lowerStatements(stmt.else, ctx, indent + 1));
      }
      lines.push(`${pad}}`);
      return lines;
    }

    case 'stmt:for_range': {
      const start = exprToCpp(stmt.start, ctx);
      const end = exprToCpp(stmt.end, ctx);
      const lines: string[] = [];
      lines.push(`${pad}for (int ${stmt.varName} = ${start}; ${stmt.varName} < ${end}; ${stmt.varName}++) {`);
      lines.push(...lowerStatements(stmt.body, ctx, indent + 1));
      lines.push(`${pad}}`);
      return lines;
    }

    case 'stmt:while': {
      const cond = exprToCpp(stmt.condition, ctx);
      const lines: string[] = [];
      lines.push(`${pad}while (${cond}) {`);
      lines.push(...lowerStatements(stmt.body, ctx, indent + 1));
      lines.push(`${pad}}`);
      return lines;
    }

    case 'stmt:return': {
      const value = exprToCpp(stmt.value, ctx);
      return [`${pad}return ${value};`];
    }

    default: {
      const _exhaustive: never = stmt;
      throw new Error(`Unknown IRStatement kind: ${(_exhaustive as { kind: string }).kind}`);
    }
  }
}
