/**
 * ESLint rule: @esphome/compose-eslint/no-unsupported-trigger-body
 *
 * Detects arrow functions assigned to TriggerHandler-typed JSX props (or
 * createScript bodies) and validates their statement-level contents. Reports
 * constructs that have no ESPHome action equivalent before the compiler
 * runs, giving users earlier and more actionable feedback.
 *
 * Uses TypeScript type information when available: calls are allowed if the
 * callee or its receiver has the ACTION_BRAND phantom property from the SDK.
 * Falls back to allowing all calls when type info is unavailable.
 *
 * Unsupported constructs:
 * - Variable declarations (const, let, var)
 * - switch, try/catch, throw, do/while
 * - for-in, for-of loops
 * - Complex for-loops (not the simple `for (let i = 0; i < N; i++)` pattern)
 * - Return statements
 * - Nested arrow/function expression declarations
 */

import { ESLintUtils } from '@typescript-eslint/utils';
import type { TSESTree } from '@typescript-eslint/utils';
import type ts from 'typescript';

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://github.com/xmlguy74/espcompose/blob/main/docs/rules/${name}.md`,
);

type MessageIds = 'unsupportedConstruct' | 'unsupportedCall';

/**
 * Match the mangled form of the ACTION_BRAND unique-symbol property.
 *
 * TypeScript internally mangles `declare const ACTION_BRAND: unique symbol`
 * property keys to `__@ACTION_BRAND@<id>` (e.g. `__@ACTION_BRAND@42`).
 */
const ACTION_BRAND_RE = /^__@ACTION_BRAND@\d+$/;

/**
 * Check if a TypeScript type carries the ACTION_BRAND phantom property.
 * Recursively checks union and intersection types.
 */
function hasActionBrand(type: ts.Type): boolean {
  if (type.isIntersection()) {
    return type.types.some(t => hasActionBrand(t));
  }
  if (type.isUnion()) {
    return type.types.some(t => hasActionBrand(t));
  }
  for (const prop of type.getProperties()) {
    if (ACTION_BRAND_RE.test(prop.name)) {
      return true;
    }
  }
  return false;
}

export default createRule<[], MessageIds>({
  name: 'no-unsupported-trigger-body',
  meta: {
    type: 'problem',
    docs: {
      description:
        'Disallow unsupported constructs in trigger handler bodies. ' +
        'ESPHome actions have no equivalent for variable declarations, ' +
        'switch statements, try/catch, or arbitrary function calls.',
    },
    messages: {
      unsupportedConstruct:
        '{{ construct }} is not supported in trigger handlers. ' +
        'ESPHome actions have no equivalent. {{ suggestion }}',
      unsupportedCall:
        '"{{ name }}()" is not a recognized ESPHome action in a trigger handler. ' +
        'Only component actions (ref.method()), HA entity actions, logger.log(), ' +
        'delay(), and script operations are supported.',
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    // Try to get TypeScript type checker for type-aware detection
    let checker: ts.TypeChecker | undefined;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let services: any;
    try {
      services = ESLintUtils.getParserServices(context, true);
      if (services?.program) {
        checker = services.program.getTypeChecker();
      }
    } catch {
      // No type info available — fall through to permissive mode
    }

    /**
     * Type-aware check: does this node's resolved TS type carry ACTION_BRAND?
     * Returns undefined if type info is unavailable (no checker).
     */
    function nodeHasActionBrand(node: TSESTree.Node): boolean | undefined {
      if (!checker || !services?.esTreeNodeToTSNodeMap) return undefined;
      try {
        const tsNode = services.esTreeNodeToTSNodeMap.get(node);
        if (!tsNode) return undefined;
        const type = checker.getTypeAtLocation(tsNode);
        return hasActionBrand(type);
      } catch {
        return undefined;
      }
    }

    /**
     * Check if a function node is a trigger handler body:
     * - Arrow function as JSX attribute value
     * - Arrow function as first argument to createScript()
     */
    function isTriggerHandlerContext(
      node: TSESTree.ArrowFunctionExpression | TSESTree.FunctionExpression,
    ): boolean {
      const parent = node.parent;
      if (!parent) return false;

      // JSX attribute: onPress={() => { ... }}
      if (parent.type === 'JSXExpressionContainer') {
        const grandparent = parent.parent;
        if (grandparent?.type === 'JSXAttribute') {
          return true;
        }
      }

      // createScript(() => { ... })
      if (parent.type === 'CallExpression') {
        const callee = parent.callee;
        if (callee.type === 'Identifier' && callee.name === 'createScript') {
          return true;
        }
      }

      return false;
    }

    /**
     * Check if a call expression is a known action pattern using type info.
     *
     * When type info is available: checks if the callee or its receiver
     * has the ACTION_BRAND phantom property.
     *
     * When type info is unavailable: allows all calls (no false positives).
     */
    function isActionCall(expr: TSESTree.CallExpression): boolean {
      const callee = expr.callee;

      // Direct function call: delay(), waitUntil(), scriptHandle()
      if (callee.type === 'Identifier') {
        const branded = nodeHasActionBrand(callee);
        // If no type info, allow the call (no false positives)
        if (branded === undefined) return true;
        return branded;
      }

      // Property call: ref.toggle(), logger.log(), theme.select(), etc.
      if (callee.type === 'MemberExpression' && callee.property.type === 'Identifier') {
        if (callee.object.type === 'Identifier') {
          const branded = nodeHasActionBrand(callee.object);
          // If no type info, allow the call
          if (branded === undefined) return true;
          return branded;
        }
      }

      return false;
    }

    /**
     * Validate a single statement inside a trigger handler body.
     */
    function validateStatement(stmt: TSESTree.Statement): void {
      switch (stmt.type) {
        case 'ExpressionStatement': {
          const expr = stmt.expression;
          // Await expressions are fine (delay, waitUntil, script calls)
          if (expr.type === 'AwaitExpression') {
            // Validate the inner expression
            const inner = expr.argument;
            if (inner.type === 'CallExpression') {
              // Identifier calls in await: check brand
              if (inner.callee.type === 'Identifier') {
                const branded = nodeHasActionBrand(inner.callee);
                // If no type info or branded, allow
                if (branded === undefined || branded) return;
                context.report({
                  node: inner,
                  messageId: 'unsupportedCall',
                  data: { name: getCallName(inner) },
                });
                return;
              }
              if (!isActionCall(inner)) {
                context.report({
                  node: inner,
                  messageId: 'unsupportedCall',
                  data: { name: getCallName(inner) },
                });
              }
            }
            return;
          }
          // Non-await call expressions
          if (expr.type === 'CallExpression') {
            if (!isActionCall(expr)) {
              context.report({
                node: expr,
                messageId: 'unsupportedCall',
                data: { name: getCallName(expr) },
              });
            }
            return;
          }
          // Any other expression statement (assignment, etc.)
          context.report({
            node: stmt,
            messageId: 'unsupportedConstruct',
            data: {
              construct: 'Expression statement',
              suggestion: 'Use only action calls (ref.method(), delay(), etc.) in trigger handlers.',
            },
          });
          return;
        }

        case 'IfStatement':
          // if/else is supported — validate the branches recursively
          validateStatementBody(stmt.consequent);
          if (stmt.alternate) {
            validateStatementBody(stmt.alternate);
          }
          return;

        case 'WhileStatement':
          validateStatementBody(stmt.body);
          return;

        case 'ForStatement':
          // Only simple counted for-loops are supported
          if (!isSimpleCountedFor(stmt)) {
            context.report({
              node: stmt,
              messageId: 'unsupportedConstruct',
              data: {
                construct: 'Complex for-loop',
                suggestion:
                  'Only simple counted for-loops (for (let i = 0; i < N; i++)) are supported. ' +
                  "ESPHome's repeat action requires a fixed count.",
              },
            });
            return;
          }
          validateStatementBody(stmt.body);
          return;

        case 'BlockStatement':
          for (const s of stmt.body) {
            validateStatement(s);
          }
          return;

        // ── Unsupported constructs ──────────────────────────────────────

        case 'VariableDeclaration':
          context.report({
            node: stmt,
            messageId: 'unsupportedConstruct',
            data: {
              construct: 'Variable declaration',
              suggestion: 'ESPHome actions cannot store intermediate values.',
            },
          });
          return;

        case 'ReturnStatement':
          context.report({
            node: stmt,
            messageId: 'unsupportedConstruct',
            data: {
              construct: 'Return statement',
              suggestion: 'Trigger handlers run to completion.',
            },
          });
          return;

        case 'SwitchStatement':
          context.report({
            node: stmt,
            messageId: 'unsupportedConstruct',
            data: {
              construct: 'Switch statement',
              suggestion: 'Use if/else chains instead.',
            },
          });
          return;

        case 'TryStatement':
          context.report({
            node: stmt,
            messageId: 'unsupportedConstruct',
            data: {
              construct: 'Try/catch',
              suggestion: 'ESPHome actions have no error handling mechanism.',
            },
          });
          return;

        case 'ThrowStatement':
          context.report({
            node: stmt,
            messageId: 'unsupportedConstruct',
            data: {
              construct: 'Throw statement',
              suggestion: 'ESPHome actions have no error handling mechanism.',
            },
          });
          return;

        case 'DoWhileStatement':
          context.report({
            node: stmt,
            messageId: 'unsupportedConstruct',
            data: {
              construct: 'Do/while loop',
              suggestion: 'Use while loops instead.',
            },
          });
          return;

        case 'ForInStatement':
        case 'ForOfStatement':
          context.report({
            node: stmt,
            messageId: 'unsupportedConstruct',
            data: {
              construct: stmt.type === 'ForInStatement' ? 'For-in loop' : 'For-of loop',
              suggestion: 'ESPHome actions have no iteration equivalent.',
            },
          });
          return;

        default:
          context.report({
            node: stmt,
            messageId: 'unsupportedConstruct',
            data: {
              construct: `${stmt.type}`,
              suggestion: 'This construct has no ESPHome action equivalent.',
            },
          });
      }
    }

    function validateStatementBody(stmt: TSESTree.Statement): void {
      if (stmt.type === 'BlockStatement') {
        for (const s of stmt.body) {
          validateStatement(s);
        }
      } else {
        validateStatement(stmt);
      }
    }

    /**
     * Check if a for-statement matches: for (let i = 0; i < N; i++)
     */
    function isSimpleCountedFor(stmt: TSESTree.ForStatement): boolean {
      const { init, test, update } = stmt;

      // Init: let/var i = 0
      if (!init || init.type !== 'VariableDeclaration') return false;
      if (init.declarations.length !== 1) return false;
      const decl = init.declarations[0];
      if (decl.id.type !== 'Identifier') return false;
      if (!decl.init || decl.init.type !== 'Literal' || decl.init.value !== 0) return false;
      const varName = decl.id.name;

      // Condition: i < N where N is a numeric literal
      if (!test || test.type !== 'BinaryExpression') return false;
      if (test.operator !== '<') return false;
      if (test.left.type !== 'Identifier' || test.left.name !== varName) return false;
      if (test.right.type !== 'Literal' || typeof test.right.value !== 'number') return false;

      // Update: i++ or ++i
      if (!update) return false;
      if (update.type === 'UpdateExpression' && update.operator === '++') {
        if (update.argument.type !== 'Identifier' || update.argument.name !== varName) return false;
        return true;
      }

      return false;
    }

    function getCallName(call: TSESTree.CallExpression): string {
      const callee = call.callee;
      if (callee.type === 'Identifier') return callee.name;
      if (callee.type === 'MemberExpression' && callee.property.type === 'Identifier') {
        if (callee.object.type === 'Identifier') {
          return `${callee.object.name}.${callee.property.name}`;
        }
        return callee.property.name;
      }
      return '<expression>';
    }

    return {
      ArrowFunctionExpression(node: TSESTree.ArrowFunctionExpression) {
        if (!isTriggerHandlerContext(node)) return;
        if (node.body.type === 'BlockStatement') {
          for (const stmt of node.body.body) {
            validateStatement(stmt);
          }
        }
        // Expression body (single expression) — validated naturally as the expression itself
      },

      FunctionExpression(node: TSESTree.FunctionExpression) {
        if (!isTriggerHandlerContext(node)) return;
        if (node.body.type === 'BlockStatement') {
          for (const stmt of node.body.body) {
            validateStatement(stmt);
          }
        }
      },
    };
  },
});
