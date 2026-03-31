/**
 * ESLint rule: @esphome/compose-eslint/require-define-project
 *
 * Requires that the default export of an ESPCompose project file uses
 * `defineProject()` instead of exporting a bare JSX element or an IIFE.
 *
 * ✅ Valid:   export default defineProject({ device: (<esphome ...>) });
 * ❌ Invalid: export default (<esphome ...>);
 * ❌ Invalid: export default (() => { ... })();
 */

import { ESLintUtils } from '@typescript-eslint/utils';
import type { TSESTree } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://github.com/xmlguy74/espcompose/blob/main/docs/rules/${name}.md`,
);

type MessageIds = 'requireDefineProject';

export default createRule<[], MessageIds>({
  name: 'require-define-project',
  meta: {
    type: 'problem',
    docs: {
      description:
        'Require default export to use defineProject() wrapper. ' +
        'Bare JSX exports and IIFEs are not allowed.',
    },
    messages: {
      requireDefineProject:
        'Default export must use defineProject(). ' +
        'Replace `export default (<esphome ...>)` with ' +
        '`export default defineProject({ device: (<esphome ...>) })`.',
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      ExportDefaultDeclaration(node: TSESTree.ExportDefaultDeclaration) {
        const decl = node.declaration;

        // Allow: export default defineProject(...)
        if (
          decl.type === 'CallExpression' &&
          decl.callee.type === 'Identifier' &&
          decl.callee.name === 'defineProject'
        ) {
          return;
        }

        // Allow: export default defineProject(...) via member expression e.g. sdk.defineProject(...)
        if (
          decl.type === 'CallExpression' &&
          decl.callee.type === 'MemberExpression' &&
          decl.callee.property.type === 'Identifier' &&
          decl.callee.property.name === 'defineProject'
        ) {
          return;
        }

        // Everything else is invalid — bare JSX, IIFEs, identifiers, etc.
        context.report({
          node,
          messageId: 'requireDefineProject',
        });
      },
    };
  },
});
