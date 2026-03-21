/**
 * Converts a TypeScript expression AST node to a C++ string suitable for use
 * as an ESPHome condition lambda body (i.e. `return <cpp_expr>;`).
 *
 * This covers the subset of TypeScript expressions that have direct C++ equivalents
 * and that are realistic in script condition contexts.
 *
 * Supported node kinds:
 *   - Binary expressions: >, <, >=, <=, === / == → ==, !== / != → !=, &&, ||, +, -, *, /
 *   - Prefix unary: ! (logical not), - (negation)
 *   - Parenthesized expressions
 *   - Identifiers (resolved from const-map or passed through by name)
 *   - Numeric / string / boolean / null / undefined literals
 *   - Template literals (no tagged, no nested)
 *
 * Unsupported nodes return an error object; callers emit diagnostics.
 */

import ts from 'typescript';

/** Inlined const values accumulated while processing a function body. */
export type ConstMap = Map<string, string>;

export type CppResult =
  | { ok: true; cpp: string }
  | { ok: false; error: string };

/**
 * Convert a TypeScript expression node to a C++ expression string.
 *
 * @param node     - The TypeScript expression node to convert.
 * @param constMap - Map of locally-declared `const` names → their C++ value strings.
 *                   Identifiers in this map are inlined; otherwise used by name.
 */
export function exprToCpp(node: ts.Expression, constMap: ConstMap = new Map()): CppResult {
  if (ts.isParenthesizedExpression(node)) {
    const inner = exprToCpp(node.expression, constMap);
    if (!inner.ok) return inner;
    return { ok: true, cpp: `(${inner.cpp})` };
  }

  if (ts.isBinaryExpression(node)) {
    return binaryToCpp(node, constMap);
  }

  if (ts.isPrefixUnaryExpression(node)) {
    return prefixToCpp(node, constMap);
  }

  if (ts.isIdentifier(node)) {
    const name = node.text;
    if (constMap.has(name)) return { ok: true, cpp: constMap.get(name)! };
    return { ok: true, cpp: name };
  }

  if (ts.isNumericLiteral(node)) {
    return { ok: true, cpp: node.text };
  }

  if (ts.isStringLiteral(node)) {
    // Wrap in std::string for comparison contexts; callers may unwrap for action args
    return { ok: true, cpp: JSON.stringify(node.text) };
  }

  if (node.kind === ts.SyntaxKind.TrueKeyword) {
    return { ok: true, cpp: 'true' };
  }

  if (node.kind === ts.SyntaxKind.FalseKeyword) {
    return { ok: true, cpp: 'false' };
  }

  if (node.kind === ts.SyntaxKind.NullKeyword || node.kind === ts.SyntaxKind.UndefinedKeyword) {
    return { ok: true, cpp: 'nullptr' };
  }

  if (ts.isTemplateExpression(node)) {
    return templateToCpp(node, constMap);
  }

  return {
    ok: false,
    error: `Expression type '${ts.SyntaxKind[node.kind]}' is not supported in script conditions or action arguments.`,
  };
}

// ────────────────────────────────────────────────────────────────────────────
// Internal helpers
// ────────────────────────────────────────────────────────────────────────────

function binaryToCpp(node: ts.BinaryExpression, constMap: ConstMap): CppResult {
  const left = exprToCpp(node.left, constMap);
  if (!left.ok) return left;
  const right = exprToCpp(node.right, constMap);
  if (!right.ok) return right;

  const op = binaryOpToCpp(node.operatorToken.kind);
  if (!op) {
    return {
      ok: false,
      error: `Binary operator '${node.operatorToken.getText()}' is not supported in script expressions.`,
    };
  }
  return { ok: true, cpp: `${left.cpp} ${op} ${right.cpp}` };
}

function binaryOpToCpp(kind: ts.SyntaxKind): string | null {
  switch (kind) {
    case ts.SyntaxKind.GreaterThanToken:            return '>';
    case ts.SyntaxKind.LessThanToken:               return '<';
    case ts.SyntaxKind.GreaterThanEqualsToken:       return '>=';
    case ts.SyntaxKind.LessThanEqualsToken:          return '<=';
    case ts.SyntaxKind.EqualsEqualsToken:            return '==';
    case ts.SyntaxKind.EqualsEqualsEqualsToken:      return '==';
    case ts.SyntaxKind.ExclamationEqualsToken:       return '!=';
    case ts.SyntaxKind.ExclamationEqualsEqualsToken: return '!=';
    case ts.SyntaxKind.AmpersandAmpersandToken:      return '&&';
    case ts.SyntaxKind.BarBarToken:                  return '||';
    case ts.SyntaxKind.PlusToken:                    return '+';
    case ts.SyntaxKind.MinusToken:                   return '-';
    case ts.SyntaxKind.AsteriskToken:                return '*';
    case ts.SyntaxKind.SlashToken:                   return '/';
    default:                                         return null;
  }
}

function prefixToCpp(node: ts.PrefixUnaryExpression, constMap: ConstMap): CppResult {
  const operand = exprToCpp(node.operand as ts.Expression, constMap);
  if (!operand.ok) return operand;
  switch (node.operator) {
    case ts.SyntaxKind.ExclamationToken:
      return { ok: true, cpp: `!${operand.cpp}` };
    case ts.SyntaxKind.MinusToken:
      return { ok: true, cpp: `-${operand.cpp}` };
    default:
      return { ok: false, error: `Prefix operator '${ts.SyntaxKind[node.operator]}' is not supported.` };
  }
}

function templateToCpp(node: ts.TemplateExpression, constMap: ConstMap): CppResult {
  // Build up a std::string concatenation:
  //   `Hello ${name}!` → "Hello " + name + "!"
  const parts: string[] = [];

  if (node.head.text) parts.push(JSON.stringify(node.head.text));

  for (const span of node.templateSpans) {
    const inner = exprToCpp(span.expression, constMap);
    if (!inner.ok) return inner;
    parts.push(inner.cpp);
    if (span.literal.text) parts.push(JSON.stringify(span.literal.text));
  }

  return { ok: true, cpp: parts.join(' + ') || '""' };
}
