/**
 * ESLint rule: @esphome/compose-eslint/no-untracked-signal
 *
 * Warns when a reactive Signal<T> value is used in a variable assignment
 * outside of a reactive context (bind.memo, bind.effect, or a
 * JSX attribute expression).
 *
 * The compiler's auto-reactive transform only detects Signal<T> usage
 * inside JSX attribute expressions. If a reactive value is extracted to
 * a variable first, the compiler can't auto-wrap it.
 *
 * Two detection modes:
 *   1. **Type-aware** (when TypeScript parser services are available):
 *      Detects ANY expression typed as Signal<T> — works for HA entities,
 *      theme resolvers, and arbitrary library functions that return Signals.
 *   2. **Heuristic fallback** (no type info): Tracks importHAEntity() /
 *      bind.haEntity() variables and checks known property names.
 *
 * BAD (reactivity lost — value is computed eagerly):
 *   const w = dims.paddingX * 2 + 80;          // dims.paddingX is Signal<number>
 *   const status = officeLight.isOn ? "A" : "B";
 *
 * GOOD (compiler auto-wraps the reactive expression):
 *   <label text={officeLight.isOn ? "A" : "B"} />
 *
 * GOOD (explicitly wrapped in bind.memo):
 *   const w = bind.memo(() => dims.paddingX * 2 + 80);
 */

import { ESLintUtils } from '@typescript-eslint/utils';
import type { TSESTree } from '@typescript-eslint/utils';
import type ts from 'typescript';

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://github.com/xmlguy74/espcompose/blob/main/docs/rules/${name}.md`,
);

type MessageIds = 'untrackedSignal' | 'untrackedSignalType';

/** Known reactive property names on HA entity bindings (heuristic fallback). */
const SIGNAL_PROPS = new Set(['isOn', 'isOpen', 'value', 'stateText', 'brightness']);

/**
 * Match the mangled form of a unique-symbol property.
 *
 * TypeScript internally mangles `declare const SIGNAL_BRAND: unique symbol`
 * property keys to `__@SIGNAL_BRAND@<id>` (e.g. `__@SIGNAL_BRAND@37`).
 * A bare `includes('SIGNAL_BRAND')` would false-positive on any property
 * whose name happens to contain that substring, so we anchor on the
 * `__@…@<digits>` envelope.
 */
const SIGNAL_BRAND_RE = /^__@SIGNAL_BRAND@\d+$/;

/**
 * Check if a TypeScript type carries the SIGNAL_BRAND phantom property,
 * matching the CLI's expr-compiler.ts `hasSignalBrand()`.
 */
function hasSignalBrand(type: ts.Type): boolean {
  if (type.isIntersection()) {
    return type.types.some(t => hasSignalBrand(t));
  }
  if (type.isUnion()) {
    return type.types.some(t => hasSignalBrand(t));
  }
  for (const prop of type.getProperties()) {
    if (SIGNAL_BRAND_RE.test(prop.name)) {
      return true;
    }
  }
  return false;
}

/**
 * Get a human-readable label for the reported node.
 */
function getExpressionLabel(node: TSESTree.Node): string {
  if (
    node.type === 'MemberExpression' &&
    node.property.type === 'Identifier'
  ) {
    return `.${node.property.name}`;
  }
  if (node.type === 'Identifier') {
    return node.name;
  }
  return 'expression';
}

export default createRule<[], MessageIds>({
  name: 'no-untracked-signal',
  meta: {
    type: 'problem',
    docs: {
      description:
        'Disallow accessing reactive Signal properties outside of a reactive context (bind.memo, JSX attribute, etc.)',
    },
    messages: {
      untrackedSignal:
        'Reactive property "{{prop}}" accessed outside of a reactive context. ' +
        'Move this expression into a JSX attribute (auto-transformed) or wrap it in bind.memo().',
      untrackedSignalType:
        'Signal value "{{prop}}" used outside of a reactive context. ' +
        'Wrap this expression in bind.memo() or move it into a JSX attribute.',
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    // Track variables that hold HA entity bindings (heuristic mode)
    const entityVars = new Set<string>();

    // Track nested reactive context depth (bind.memo, bind.effect, etc.)
    let reactiveDepth = 0;

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
      // No type info available — fall through to heuristic mode
    }

    // Already-reported node positions to avoid duplicate reports
    // (type-aware mode and heuristic mode may both flag the same node)
    const reported = new Set<string>();

    function nodeKey(node: TSESTree.Node): string {
      return `${node.loc.start.line}:${node.loc.start.column}`;
    }

    function isEntityCreation(node: TSESTree.CallExpression): boolean {
      const callee = node.callee;
      if (callee.type === 'Identifier' && callee.name === 'importHAEntity') {
        return true;
      }
      if (
        callee.type === 'MemberExpression' &&
        callee.object.type === 'Identifier' &&
        callee.object.name === 'bind' &&
        callee.property.type === 'Identifier' &&
        callee.property.name === 'haEntity'
      ) {
        return true;
      }
      return false;
    }

    function isReactiveCall(node: TSESTree.CallExpression): boolean {
      const callee = node.callee;
      if (
        callee.type === 'MemberExpression' &&
        callee.object.type === 'Identifier' &&
        callee.object.name === 'bind' &&
        callee.property.type === 'Identifier'
      ) {
        return ['memo', 'effect', 'isNaN', 'derivedMemo'].includes(
          callee.property.name,
        );
      }
      return false;
    }

    function isInJsxAttribute(node: TSESTree.Node): boolean {
      let current: TSESTree.Node | undefined = node.parent;
      while (current) {
        if (current.type === 'JSXExpressionContainer') return true;
        if (current.type === 'VariableDeclarator') return false;
        current = current.parent;
      }
      return false;
    }

    /**
     * Type-aware check: does this node's TS type carry SIGNAL_BRAND?
     */
    function nodeHasSignalType(node: TSESTree.Node): boolean {
      if (!checker || !services?.esTreeNodeToTSNodeMap) return false;
      try {
        const tsNode = services.esTreeNodeToTSNodeMap.get(node);
        if (!tsNode) return false;
        const type = checker.getTypeAtLocation(tsNode);
        return hasSignalBrand(type);
      } catch {
        return false;
      }
    }

    function reportTypeAware(node: TSESTree.Node): void {
      const key = nodeKey(node);
      if (reported.has(key)) return;
      reported.add(key);
      const prop = getExpressionLabel(node);
      context.report({
        node,
        messageId: 'untrackedSignalType',
        data: { prop },
      });
    }

    return {
      // Track HA entity variable declarations (heuristic)
      VariableDeclarator(node) {
        if (
          node.id.type === 'Identifier' &&
          node.init?.type === 'CallExpression' &&
          isEntityCreation(node.init)
        ) {
          entityVars.add(node.id.name);
        }
      },

      // Track reactive context entry/exit
      CallExpression(node) {
        if (isReactiveCall(node)) {
          reactiveDepth++;
        }
      },
      'CallExpression:exit'(node: TSESTree.CallExpression) {
        if (isReactiveCall(node)) {
          reactiveDepth--;
        }
      },

      // ── Heuristic check: HA entity Signal property access ────────────
      MemberExpression(node) {
        // Skip type-aware check here — handled below
        if (
          node.object.type !== 'Identifier' ||
          !entityVars.has(node.object.name) ||
          node.property.type !== 'Identifier' ||
          !SIGNAL_PROPS.has(node.property.name)
        ) {
          return;
        }

        if (reactiveDepth > 0) return;
        if (isInJsxAttribute(node)) return;

        const key = nodeKey(node);
        if (reported.has(key)) return;
        reported.add(key);

        context.report({
          node,
          messageId: 'untrackedSignal',
          data: { prop: `.${node.property.name}` },
        });
      },

      // ── Type-aware check: any Signal<T> used in computation ──────────
      // Fires for member expressions like dims.paddingX in `dims.paddingX * 2`
      // and identifiers like `mySignal` in `mySignal + 1`.
      'BinaryExpression > MemberExpression'(node: TSESTree.MemberExpression) {
        if (!checker) return;
        if (reactiveDepth > 0) return;
        if (isInJsxAttribute(node)) return;
        if (nodeHasSignalType(node)) {
          reportTypeAware(node);
        }
      },
      'BinaryExpression > Identifier'(node: TSESTree.Identifier) {
        if (!checker) return;
        if (reactiveDepth > 0) return;
        if (isInJsxAttribute(node)) return;
        if (nodeHasSignalType(node)) {
          reportTypeAware(node);
        }
      },

      // Signal used as ternary condition outside reactive context
      'ConditionalExpression > MemberExpression'(node: TSESTree.MemberExpression) {
        if (!checker) return;
        if (reactiveDepth > 0) return;
        if (isInJsxAttribute(node)) return;
        // Only flag if used as the condition (not consequent/alternate passthrough)
        if (node.parent && (node.parent as TSESTree.ConditionalExpression).test === node) {
          if (nodeHasSignalType(node)) {
            reportTypeAware(node);
          }
        }
      },
      'ConditionalExpression > Identifier'(node: TSESTree.Identifier) {
        if (!checker) return;
        if (reactiveDepth > 0) return;
        if (isInJsxAttribute(node)) return;
        if (node.parent && (node.parent as TSESTree.ConditionalExpression).test === node) {
          if (nodeHasSignalType(node)) {
            reportTypeAware(node);
          }
        }
      },

      // Signal used as template literal expression outside reactive context
      'TemplateLiteral > MemberExpression'(node: TSESTree.MemberExpression) {
        if (!checker) return;
        if (reactiveDepth > 0) return;
        if (isInJsxAttribute(node)) return;
        if (nodeHasSignalType(node)) {
          reportTypeAware(node);
        }
      },
      'TemplateLiteral > Identifier'(node: TSESTree.Identifier) {
        if (!checker) return;
        if (reactiveDepth > 0) return;
        if (isInJsxAttribute(node)) return;
        if (nodeHasSignalType(node)) {
          reportTypeAware(node);
        }
      },
    };
  },
});
