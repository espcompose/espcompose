/**
 * ESLint rule: @espcompose/eslint/no-hook-outside-component
 *
 * Prevents hook calls (useHAEntity, useScript, useRef, useMemo, useEffect)
 * outside function component bodies. These hooks must be called during a
 * render pass — calling them at the module top level means they execute
 * during module evaluation, which throws at runtime.
 *
 * This catches the mistake statically so users get a clear lint error
 * instead of a confusing runtime exception.
 */

import { ESLintUtils } from '@typescript-eslint/utils';
import type { TSESTree } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://github.com/xmlguy74/espcompose/blob/main/docs/rules/${name}.md`,
);

type MessageIds = 'hookOutsideComponent';

const HOOK_NAMES = new Set([
  'useHAEntity',
  'useScript',
  'useRef',
  'useMemo',
  'useEffect',
]);

export default createRule<[], MessageIds>({
  name: 'no-hook-outside-component',
  meta: {
    type: 'problem',
    docs: {
      description:
        'Disallow hook calls (useHAEntity, useScript, useRef, useMemo, useEffect) outside ' +
        'function component bodies. Hooks must be called during render.',
    },
    messages: {
      hookOutsideComponent:
        '{{ hookName }}() must be called inside a function component body. ' +
        'Move it inside a component that returns JSX.',
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    // Track function nesting depth. Depth 0 = module top level.
    let functionDepth = 0;

    function enterFunction() {
      functionDepth++;
    }

    function exitFunction() {
      functionDepth--;
    }

    return {
      FunctionDeclaration: enterFunction,
      'FunctionDeclaration:exit': exitFunction,
      FunctionExpression: enterFunction,
      'FunctionExpression:exit': exitFunction,
      ArrowFunctionExpression: enterFunction,
      'ArrowFunctionExpression:exit': exitFunction,

      // Detect hook calls at top level
      CallExpression(node: TSESTree.CallExpression) {
        if (functionDepth > 0) return; // inside a function body — OK

        let hookName: string | null = null;

        // Direct call: useHAEntity('light.office')
        if (
          node.callee.type === 'Identifier' &&
          HOOK_NAMES.has(node.callee.name)
        ) {
          hookName = node.callee.name;
        }



        if (hookName) {
          context.report({
            node,
            messageId: 'hookOutsideComponent',
            data: { hookName },
          });
        }
      },
    };
  },
});
