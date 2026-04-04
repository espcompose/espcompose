/**
 * ESLint rule: @espcompose/eslint/no-unresolvable-ha-entity
 *
 * Reports useHAEntity() calls where the first argument is not a string
 * literal AND the domain cannot be determined. The compiler needs to know
 * the HA domain (light, switch, sensor, etc.) at compile time to generate
 * correct YAML actions and reactive bindings.
 *
 * Domain IS resolvable when:
 *   - The argument is a string literal: useHAEntity('light.kitchen')
 *   - A domain hint is provided: useHAEntity(id, { domain: 'light' })
 *   - The argument type is a constrained template literal: `light.${string}`
 *
 * Domain is NOT resolvable when:
 *   - The argument is plain `string` with no domain hint
 *   - The argument type is a union of different domains
 */

import { ESLintUtils } from '@typescript-eslint/utils';
import type { TSESTree } from '@typescript-eslint/utils';
import type ts from 'typescript';

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://github.com/xmlguy74/espcompose/blob/main/docs/rules/${name}.md`,
);

type MessageIds = 'unresolvableDomain';

const KNOWN_DOMAINS = new Set([
  'light', 'sensor', 'binary_sensor', 'switch', 'fan', 'cover',
  'number', 'text_sensor', 'select', 'lock',
]);

/**
 * Try to infer the HA domain from a TypeScript type.
 *
 * Returns the domain string if exactly one domain can be determined,
 * undefined otherwise.
 */
function inferDomainFromTsType(type: ts.Type, checker: ts.TypeChecker): string | undefined {
  // String literal type — extract domain from value
  if (type.isStringLiteral()) {
    const dotIdx = type.value.indexOf('.');
    if (dotIdx >= 0) {
      const d = type.value.slice(0, dotIdx);
      return KNOWN_DOMAINS.has(d) ? d : undefined;
    }
    return undefined;
  }

  // Template literal type: checker prints it as `light.${string}`
  const typeStr = checker.typeToString(type);
  const templateMatch = typeStr.match(/^`(\w+)\.\$\{string\}`$/);
  if (templateMatch && KNOWN_DOMAINS.has(templateMatch[1])) {
    return templateMatch[1];
  }

  // Union of template literal types — only if all branches share the same domain
  if (type.isUnion()) {
    const domains = new Set<string>();
    for (const t of type.types) {
      const tStr = checker.typeToString(t);
      const m = tStr.match(/^`(\w+)\.\$\{string\}`$/);
      if (m && KNOWN_DOMAINS.has(m[1])) {
        domains.add(m[1]);
      } else if (t.isStringLiteral()) {
        const dotIdx = t.value.indexOf('.');
        if (dotIdx >= 0) {
          const d = t.value.slice(0, dotIdx);
          if (KNOWN_DOMAINS.has(d)) domains.add(d);
        }
      }
    }
    if (domains.size === 1) return domains.values().next().value;
  }

  return undefined;
}

/**
 * Check if the second argument to useHAEntity is a domain hint object literal
 * like { domain: 'light' }.
 */
function hasDomainHint(args: TSESTree.CallExpressionArgument[]): boolean {
  if (args.length < 2) return false;
  const second = args[1];
  if (second.type !== 'ObjectExpression') return false;
  for (const prop of second.properties) {
    if (
      prop.type === 'Property' &&
      prop.key.type === 'Identifier' &&
      prop.key.name === 'domain' &&
      prop.value.type === 'Literal' &&
      typeof prop.value.value === 'string'
    ) {
      return KNOWN_DOMAINS.has(prop.value.value);
    }
  }
  return false;
}

export default createRule<[], MessageIds>({
  name: 'no-unresolvable-ha-entity',
  meta: {
    type: 'problem',
    docs: {
      description:
        'Disallow useHAEntity() calls where the HA domain cannot be determined at compile time. ' +
        'Provide a domain hint or use a constrained type for the entity ID argument.',
    },
    messages: {
      unresolvableDomain:
        'useHAEntity() cannot determine the HA domain from this argument. ' +
        'Use useHAEntity({{ argText }}, { domain: \'light\' }) or constrain the ' +
        'argument type to a template literal like `light.${string}`.',
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
      // No type info available
    }

    return {
      CallExpression(node: TSESTree.CallExpression) {
        // Match useHAEntity(...)
        if (
          node.callee.type !== 'Identifier' ||
          node.callee.name !== 'useHAEntity'
        ) {
          return;
        }

        if (node.arguments.length < 1) return;

        const firstArg = node.arguments[0];

        // String literal → always OK (static entity ID)
        if (firstArg.type === 'Literal' && typeof firstArg.value === 'string') {
          return;
        }
        // Template literal with no expressions → also OK
        if (firstArg.type === 'TemplateLiteral' && firstArg.expressions.length === 0) {
          return;
        }

        // Has domain hint in second argument → OK
        if (hasDomainHint(node.arguments)) {
          return;
        }

        // Try type-based domain inference
        if (checker && services?.esTreeNodeToTSNodeMap) {
          try {
            const tsNode = services.esTreeNodeToTSNodeMap.get(firstArg);
            if (tsNode) {
              const type = checker.getTypeAtLocation(tsNode);
              if (inferDomainFromTsType(type, checker)) {
                return; // Domain can be inferred from type
              }
            }
          } catch {
            // Type resolution failed — report the error
          }
        }

        // Domain cannot be determined — report
        const argText = context.sourceCode.getText(firstArg);
        context.report({
          node,
          messageId: 'unresolvableDomain',
          data: { argText },
        });
      },
    };
  },
});
