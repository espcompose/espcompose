/**
 * ESLint rule: @esphome/compose-eslint/no-build-in-component
 *
 * Prevents `build.run()` calls inside function components (JSX-returning
 * functions). `build.run()` must be called at the module's top level
 * during the 'module' phase — calling it inside a component means it
 * would execute during the 'render' phase, which throws a PhaseError
 * at runtime.
 *
 * This catches the mistake statically so users get a clear lint error
 * instead of a confusing runtime exception.
 */

import { ESLintUtils } from '@typescript-eslint/utils';
import type { TSESTree } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://github.com/xmlguy74/espcompose/blob/main/docs/rules/${name}.md`,
);

type MessageIds = 'buildInComponent';

export default createRule<[], MessageIds>({
  name: 'no-build-in-component',
  meta: {
    type: 'problem',
    docs: {
      description:
        'Disallow build.run() calls inside function components. ' +
        'build.run() must be called at the module top level.',
    },
    messages: {
      buildInComponent:
        'build.run() cannot be called inside a component. ' +
        'Move it to the module top level where it runs during the build phase.',
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    // Track whether we're inside a function that returns JSX (a component).
    // We use a simple heuristic: any function containing JSX elements is a component.
    let functionDepth = 0;
    let insideComponent = false;
    const componentStack: boolean[] = [];

    function enterFunction() {
      functionDepth++;
      componentStack.push(insideComponent);
      insideComponent = false;
    }

    function exitFunction() {
      functionDepth--;
      insideComponent = componentStack.pop() ?? false;
    }

    return {
      FunctionDeclaration: enterFunction,
      'FunctionDeclaration:exit': exitFunction,
      FunctionExpression: enterFunction,
      'FunctionExpression:exit': exitFunction,
      ArrowFunctionExpression: enterFunction,
      'ArrowFunctionExpression:exit': exitFunction,

      // Mark functions containing JSX as components
      JSXElement() {
        if (functionDepth > 0) {
          insideComponent = true;
        }
      },
      JSXFragment() {
        if (functionDepth > 0) {
          insideComponent = true;
        }
      },

      // Detect build.run() calls
      CallExpression(node: TSESTree.CallExpression) {
        if (functionDepth === 0) return; // top-level is fine

        if (
          node.callee.type === 'MemberExpression' &&
          node.callee.object.type === 'Identifier' &&
          node.callee.object.name === 'build' &&
          node.callee.property.type === 'Identifier' &&
          node.callee.property.name === 'run'
        ) {
          // build.run() inside any function body — report it.
          // Even if we haven't seen JSX yet, build.run() should only be at top level.
          context.report({
            node,
            messageId: 'buildInComponent',
          });
        }
      },
    };
  },
});
