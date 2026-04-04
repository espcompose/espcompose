/**
 * ESLint rule: @espcompose/compose-eslint/no-node-in-reactive
 *
 * Prevents usage of Node.js-specific APIs (process, fs, require, __dirname,
 * __filename, Buffer) inside reactive contexts — specifically inside
 * `useMemo()`, `useEffect()`, and reactive arrow functions used as
 * JSX prop values. These APIs are only available at build time (Node.js);
 * reactive code runs conceptually on the device.
 *
 * Also flags import of Node built-in modules (node:fs, node:path, etc.)
 * when used inside reactive contexts.
 */

import { ESLintUtils } from '@typescript-eslint/utils';
import type { TSESTree } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://github.com/xmlguy74/espcompose/blob/main/docs/rules/${name}.md`,
);

type MessageIds = 'nodeInReactive';

/** Node.js globals that are not available in device-reactive contexts. */
const NODE_GLOBALS = new Set([
  'process',
  'require',
  '__dirname',
  '__filename',
  'Buffer',
]);

export default createRule<[], MessageIds>({
  name: 'no-node-in-reactive',
  meta: {
    type: 'problem',
    docs: {
      description:
        'Disallow Node.js APIs inside reactive contexts (useMemo, useEffect, reactive prop functions). ' +
        'Reactive code runs on the device and cannot use Node.js-specific APIs.',
    },
    messages: {
      nodeInReactive:
        '"{{ name }}" is a Node.js API that is not available in device-reactive contexts. ' +
        'Use module-level code to compute values, then pass them into JSX props.',
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    // Track whether we're inside a reactive context.
    // Reactive contexts are:
    //   - useMemo(() => ...)
    //   - useEffect(() => ...)
    //   - Arrow functions in JSX prop values: text={() => ...}
    let reactiveDepth = 0;

    /**
     * Check if a CallExpression is useMemo() or useEffect().
     */
    function isReactiveCall(node: TSESTree.CallExpression): boolean {
      return (
        node.callee.type === 'Identifier' &&
        (node.callee.name === 'useMemo' || node.callee.name === 'useEffect')
      );
    }

    return {
      // Enter useMemo() / useEffect() callback arguments
      'CallExpression > ArrowFunctionExpression'(node: TSESTree.ArrowFunctionExpression) {
        const parent = node.parent;
        if (parent?.type === 'CallExpression' && isReactiveCall(parent)) {
          reactiveDepth++;
        }
      },
      'CallExpression > ArrowFunctionExpression:exit'(node: TSESTree.ArrowFunctionExpression) {
        const parent = node.parent;
        if (parent?.type === 'CallExpression' && isReactiveCall(parent)) {
          reactiveDepth--;
        }
      },

      // Enter JSX prop arrow functions: <x text={() => ...} />
      'JSXExpressionContainer > ArrowFunctionExpression'() {
        reactiveDepth++;
      },
      'JSXExpressionContainer > ArrowFunctionExpression:exit'() {
        reactiveDepth--;
      },

      // Check for Node.js global usage inside reactive contexts
      Identifier(node: TSESTree.Identifier) {
        if (reactiveDepth === 0) return;
        if (!NODE_GLOBALS.has(node.name)) return;

        // Skip if the identifier is a property access (e.g. obj.process)
        if (
          node.parent?.type === 'MemberExpression' &&
          node.parent.property === node &&
          !node.parent.computed
        ) {
          return;
        }

        // Skip if it's a declaration (let process = ...)
        if (
          node.parent?.type === 'VariableDeclarator' &&
          node.parent.id === node
        ) {
          return;
        }

        context.report({
          node,
          messageId: 'nodeInReactive',
          data: { name: node.name },
        });
      },
    };
  },
});
