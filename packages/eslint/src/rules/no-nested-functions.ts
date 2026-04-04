/**
 * ESLint rule: @espcompose/eslint/no-nested-functions
 *
 * Prevents function declarations nested inside other functions or arrow
 * function components. In ESPHome Compose, only top-level function
 * declarations are transformed into ESPHome scripts. Nested function
 * declarations look like they would become scripts but are silently ignored
 * by the compiler, leading to runtime "Tag not resolved for Function value"
 * errors.
 *
 * Users should move script functions to the module's top level, or use
 * inline arrow functions directly in trigger props where the compiler can
 * convert them to action arrays.
 */

import { ESLintUtils } from '@typescript-eslint/utils';
import type { TSESTree } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://github.com/xmlguy74/espcompose/blob/main/docs/rules/${name}.md`,
);

type MessageIds = 'nestedFunction';

export default createRule<[], MessageIds>({
  name: 'no-nested-functions',
  meta: {
    type: 'problem',
    docs: {
      description:
        'Disallow function declarations nested inside other functions. ' +
        'Only top-level function declarations are compiled into ESPHome scripts.',
    },
    messages: {
      nestedFunction:
        'Function declaration "{{ name }}" is nested inside another function. ' +
        'Move it to the module\'s top level so the compiler can transform it into an ESPHome script, ' +
        'or use an inline arrow function in the trigger prop.',
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    // Track nesting depth of function-like scopes.
    let functionDepth = 0;

    function enterFunction() {
      functionDepth++;
    }

    function exitFunction() {
      functionDepth--;
    }

    return {
      // Track all function-like boundaries (declarations, expressions, arrows)
      FunctionDeclaration(node: TSESTree.FunctionDeclaration) {
        if (functionDepth > 0 && node.id) {
          context.report({
            node,
            messageId: 'nestedFunction',
            data: { name: node.id.name },
          });
        }
        enterFunction();
      },
      'FunctionDeclaration:exit': exitFunction,

      FunctionExpression: enterFunction,
      'FunctionExpression:exit': exitFunction,

      ArrowFunctionExpression: enterFunction,
      'ArrowFunctionExpression:exit': exitFunction,
    };
  },
});
