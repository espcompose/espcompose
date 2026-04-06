/**
 * ESLint rule: @espcompose/eslint/no-reactive-map-object
 *
 * Prevents `useReactiveMap()` callbacks from returning objects.
 *
 * When the callback returns an object, the reactive branch wraps the entire
 * object in a single `useMemo` — producing one `IRReactiveNode<{...}>`
 * instead of individual `Signal` values per field. Downstream code expecting
 * individual `Signal` properties will break silently.
 *
 * The fix is to call `useReactiveMap()` once per field:
 *
 * BAD:
 *   useReactiveMap(value, (v) => ({ bg: themeLeaf('colors', v, 'bg'), text: themeLeaf('colors', v, 'text') }))
 *
 * GOOD:
 *   {
 *     bg: useReactiveMap(value, (v) => themeLeaf('colors', v, 'bg')),
 *     text: useReactiveMap(value, (v) => themeLeaf('colors', v, 'text')),
 *   }
 */

import { ESLintUtils } from '@typescript-eslint/utils';
import type { TSESTree } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://github.com/xmlguy74/espcompose/blob/main/docs/rules/${name}.md`,
);

type MessageIds = 'reactiveMapObject';

/**
 * Collect all ReturnStatement nodes in the immediate block of a function body.
 * Does not recurse into nested functions/arrows (they have their own return scope).
 */
function collectReturnStatements(
  node: TSESTree.Statement,
  results: TSESTree.ReturnStatement[],
): void {
  switch (node.type) {
    case 'ReturnStatement':
      results.push(node);
      break;
    case 'BlockStatement':
      for (const stmt of node.body) {
        collectReturnStatements(stmt, results);
      }
      break;
    case 'IfStatement':
      collectReturnStatements(node.consequent, results);
      if (node.alternate) collectReturnStatements(node.alternate, results);
      break;
    case 'SwitchStatement':
      for (const c of node.cases) {
        for (const stmt of c.consequent) {
          collectReturnStatements(stmt, results);
        }
      }
      break;
    case 'TryStatement':
      collectReturnStatements(node.block, results);
      if (node.handler) collectReturnStatements(node.handler.body, results);
      if (node.finalizer) collectReturnStatements(node.finalizer, results);
      break;
    case 'ForStatement':
    case 'ForInStatement':
    case 'ForOfStatement':
    case 'WhileStatement':
    case 'DoWhileStatement':
      collectReturnStatements(node.body, results);
      break;
    case 'LabeledStatement':
      collectReturnStatements(node.body, results);
      break;
    // Skip: FunctionDeclaration, nested scopes — their returns are their own
    default:
      break;
  }
}

/**
 * Look up a variable binding in the immediate block scope of a function body.
 * Returns the initializer expression if found, otherwise undefined.
 */
function resolveIdentifierInBlock(
  name: string,
  block: TSESTree.BlockStatement,
): TSESTree.Expression | undefined {
  for (const stmt of block.body) {
    if (stmt.type !== 'VariableDeclaration') continue;
    for (const decl of stmt.declarations) {
      if (decl.id.type === 'Identifier' && decl.id.name === name && decl.init) {
        return decl.init;
      }
    }
  }
  return undefined;
}

/**
 * Check whether an expression is (or resolves to) an ObjectExpression.
 * Handles:
 *   - Direct ObjectExpression
 *   - `expr as Type` (TSAsExpression wrapping ObjectExpression)
 *   - Identifier that was declared in the same block with an object initializer
 */
function isObjectish(
  expr: TSESTree.Expression,
  block: TSESTree.BlockStatement | null,
): boolean {
  // Unwrap `as` casts: `return { a: 1 } as Foo`
  let unwrapped = expr;
  while (unwrapped.type === 'TSAsExpression' || unwrapped.type === 'TSSatisfiesExpression') {
    unwrapped = unwrapped.expression;
  }

  if (unwrapped.type === 'ObjectExpression') return true;

  // Identifier → trace to variable initializer in same block
  if (unwrapped.type === 'Identifier' && block) {
    const init = resolveIdentifierInBlock(unwrapped.name, block);
    if (init) return isObjectish(init, block);
  }

  return false;
}

/**
 * Try to resolve an Identifier to a FunctionDeclaration or
 * variable-assigned FunctionExpression/ArrowFunctionExpression
 * in the current scope's ancestor statements.
 */
function resolveFunctionBinding(
  name: string,
  node: TSESTree.Node,
): TSESTree.FunctionDeclaration | TSESTree.FunctionExpression | TSESTree.ArrowFunctionExpression | null {
  // Walk up to find the enclosing block or program
  let current: TSESTree.Node | undefined = node.parent;
  while (current && current.type !== 'BlockStatement' && current.type !== 'Program') {
    current = current.parent;
  }
  if (!current) return null;

  const stmts = current.type === 'BlockStatement' ? current.body : (current as TSESTree.Program).body;
  for (const stmt of stmts) {
    // function resolve(v) { ... }
    if (
      stmt.type === 'FunctionDeclaration' &&
      stmt.id?.name === name
    ) {
      return stmt;
    }
    // const resolve = (v) => { ... }  or  const resolve = function(v) { ... }
    if (stmt.type === 'VariableDeclaration') {
      for (const decl of stmt.declarations) {
        if (
          decl.id.type === 'Identifier' &&
          decl.id.name === name &&
          decl.init &&
          (decl.init.type === 'ArrowFunctionExpression' || decl.init.type === 'FunctionExpression')
        ) {
          return decl.init;
        }
      }
    }
  }
  return null;
}

/**
 * Analyze a function node (arrow, function expression, or declaration) for
 * object-returning patterns. Returns the node to report if found.
 */
function findObjectReturn(
  fn: TSESTree.ArrowFunctionExpression | TSESTree.FunctionExpression | TSESTree.FunctionDeclaration,
): TSESTree.Node | null {
  // Arrow with expression body: (v) => ({ ... })
  if (fn.type === 'ArrowFunctionExpression' && fn.body.type !== 'BlockStatement') {
    if (isObjectish(fn.body, null)) return fn.body;
    return null;
  }

  // Block body — collect return statements
  const body = fn.type === 'ArrowFunctionExpression' ? fn.body as TSESTree.BlockStatement : fn.body;
  if (!body || body.type !== 'BlockStatement') return null;

  const returns: TSESTree.ReturnStatement[] = [];
  collectReturnStatements(body, returns);

  for (const ret of returns) {
    if (ret.argument && isObjectish(ret.argument, body)) {
      return ret;
    }
  }
  return null;
}

export default createRule<[], MessageIds>({
  name: 'no-reactive-map-object',
  meta: {
    type: 'problem',
    docs: {
      description:
        'Disallow useReactiveMap() callbacks that return objects. ' +
        'Each field should use its own useReactiveMap() call to produce individual Signal values.',
    },
    messages: {
      reactiveMapObject:
        'useReactiveMap() callback returns an object. Each property will NOT be an ' +
        'individual Signal. Call useReactiveMap() once per field instead.',
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      CallExpression(node: TSESTree.CallExpression) {
        // Match useReactiveMap(...)
        if (
          node.callee.type !== 'Identifier' ||
          node.callee.name !== 'useReactiveMap'
        ) {
          return;
        }

        // 2nd argument is the mapper callback
        const mapper = node.arguments[1];
        if (!mapper) return;

        // Case 1 & 2: Inline arrow or function expression
        if (
          mapper.type === 'ArrowFunctionExpression' ||
          mapper.type === 'FunctionExpression'
        ) {
          const bad = findObjectReturn(mapper);
          if (bad) {
            context.report({ node: bad, messageId: 'reactiveMapObject' });
          }
          return;
        }

        // Case 4: Named function reference — useReactiveMap(value, resolve)
        if (mapper.type === 'Identifier') {
          const fn = resolveFunctionBinding(mapper.name, node);
          if (fn) {
            const bad = findObjectReturn(fn);
            if (bad) {
              context.report({ node: bad, messageId: 'reactiveMapObject' });
            }
          }
        }
      },
    };
  },
});
