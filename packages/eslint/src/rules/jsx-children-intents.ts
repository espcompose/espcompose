/**
 * ESLint rule: @espcompose/eslint/jsx-children-intents
 *
 * Validates that JSX children satisfy their parent's allowedChildIntents
 * and any ancestor's context requirements.
 *
 * Two validation layers:
 * 1. Parent constraint: child.intents ∩ parent.allowedChildIntents ≠ ∅
 * 2. Context constraint: child must include ancestor context in its intents
 */

import { ESLintUtils } from '@typescript-eslint/utils';
import type { TSESTree } from '@typescript-eslint/utils';
import {
  resolveElementIntents,
  findConstrainingParent,
  findNearestContext,
  getJSXTagName,
  isIntrinsicElement,
  type ResolvedIntents,
} from '../utils/intent-resolver';

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://github.com/xmlguy74/espcompose/blob/main/docs/rules/${name}.md`,
);

type MessageIds =
  | 'invalidChildIntent'
  | 'noIntentsOnChild'
  | 'missingContextIntent'
  | 'noIntentsForContext';

export default createRule<[], MessageIds>({
  name: 'jsx-children-intents',
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce valid parent-child component nesting based on declared intents',
    },
    messages: {
      invalidChildIntent:
        '"<{{ childTag }}>" with intents [{{ childIntents }}] cannot be a child of "<{{ parentTag }}>". ' +
        'Parent accepts: [{{ allowedIntents }}].',
      noIntentsOnChild:
        '"<{{ childTag }}>" has no declared intents but its parent "<{{ parentTag }}>" ' +
        'requires children with intents: [{{ allowedIntents }}].',
      missingContextIntent:
        '"<{{ childTag }}>" with intents [{{ childIntents }}] is missing required context ' +
        '[{{ requiredContext }}] established by "<{{ contextTag }}>".',
      noIntentsForContext:
        '"<{{ childTag }}>" has no declared intents but is inside a context ' +
        '[{{ requiredContext }}] established by "<{{ contextTag }}>".',
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    // Cache for component-level intent resolution (function components).
    // Maps component variable name → resolved intents or null (unbranded).
    const componentIntentCache = new Map<string, ResolvedIntents | null>();

    return {
      JSXElement(node: TSESTree.JSXElement) {
        const { children } = node;

        for (const child of children) {
          if (child.type !== 'JSXElement') continue;

          const childOpeningElement = child.openingElement;
          const childTagName = getJSXTagName(childOpeningElement);
          const childResolved = resolveElementIntents(childOpeningElement, componentIntentCache);

          // ── Layer 1: Parent constraint validation ──────────────────────
          const ancestors = context.sourceCode.getAncestors(node);
          // Include the current node in the ancestor chain for the child's perspective
          const fullAncestors = [...ancestors, node];
          const constrainingParent = findConstrainingParent(fullAncestors, componentIntentCache);

          if (constrainingParent) {
            const { resolved: parentResolved, element: parentElement } = constrainingParent;
            const parentTagName = getJSXTagName(parentElement.openingElement);
            const allowed = parentResolved.allowedChildIntents!;

            if (!childResolved) {
              // Child is unbranded but parent requires specific intents
              // Only report if the child is an intrinsic element (function components
              // without branding are pass-through for backwards compat)
              if (isIntrinsicElement(childTagName)) {
                context.report({
                  node: childOpeningElement,
                  messageId: 'noIntentsOnChild',
                  data: {
                    childTag: childTagName,
                    parentTag: parentTagName,
                    allowedIntents: allowed.join(', '),
                  },
                });
              }
            } else {
              // Check intersection: child.intents ∩ parent.allowedChildIntents
              const hasMatch = childResolved.intents.some((intent) => allowed.includes(intent));
              if (!hasMatch) {
                context.report({
                  node: childOpeningElement,
                  messageId: 'invalidChildIntent',
                  data: {
                    childTag: childTagName,
                    childIntents: childResolved.intents.join(', '),
                    parentTag: parentTagName,
                    allowedIntents: allowed.join(', '),
                  },
                });
              }
            }
          }

          // ── Layer 2: Context validation ────────────────────────────────
          // Skip context-transparent elements
          if (childResolved?.contextTransparent) continue;

          const nearestContext = findNearestContext(fullAncestors, componentIntentCache);
          if (nearestContext) {
            const { context: requiredContext, element: contextElement } = nearestContext;
            const contextTagName = getJSXTagName(contextElement.openingElement);

            if (!childResolved) {
              if (isIntrinsicElement(childTagName)) {
                context.report({
                  node: childOpeningElement,
                  messageId: 'noIntentsForContext',
                  data: {
                    childTag: childTagName,
                    requiredContext: requiredContext.join(', '),
                    contextTag: contextTagName,
                  },
                });
              }
            } else {
              // Check that child's intents include all required context values
              const missingContext = requiredContext.filter(
                (ctx) => !childResolved.intents.includes(ctx),
              );
              if (missingContext.length > 0) {
                context.report({
                  node: childOpeningElement,
                  messageId: 'missingContextIntent',
                  data: {
                    childTag: childTagName,
                    childIntents: childResolved.intents.join(', '),
                    requiredContext: missingContext.join(', '),
                    contextTag: contextTagName,
                  },
                });
              }
            }
          }
        }
      },
    };
  },
});
