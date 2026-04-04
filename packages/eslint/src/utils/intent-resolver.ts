/**
 * Intent resolution utilities for ESLint rules.
 *
 * Resolves intent metadata from JSX elements by:
 * - Looking up intrinsic elements in the INTRINSIC_INTENT_REGISTRY
 * - Extracting symbol-branded intents from function component references
 */

import type { TSESTree } from '@typescript-eslint/utils';
import { INTRINSIC_INTENT_REGISTRY } from '@espcompose/core/internals';
import type { IntrinsicIntentMeta } from '@espcompose/core';

// Re-export for convenience
export type { IntrinsicIntentMeta };

export interface ResolvedIntents {
  intents: readonly string[];
  allowedChildIntents: readonly string[] | undefined;
  context: readonly string[] | undefined;
  contextTransparent: boolean;
}

/**
 * Get the tag name string from a JSX opening element.
 * Returns the name for simple identifiers and member expressions.
 */
export function getJSXTagName(node: TSESTree.JSXOpeningElement): string {
  if (node.name.type === 'JSXIdentifier') {
    return node.name.name;
  }
  if (node.name.type === 'JSXMemberExpression') {
    return flattenMemberExpression(node.name);
  }
  // JSXNamespacedName
  return `${node.name.namespace.name}:${node.name.name.name}`;
}

function flattenMemberExpression(node: TSESTree.JSXMemberExpression): string {
  if (node.object.type === 'JSXMemberExpression') {
    return `${flattenMemberExpression(node.object)}.${node.property.name}`;
  }
  return `${node.object.name}.${node.property.name}`;
}

/**
 * Check if a JSX tag name refers to an intrinsic element (lowercase or contains hyphen).
 */
export function isIntrinsicElement(tagName: string): boolean {
  const firstChar = tagName[0];
  return firstChar === firstChar.toLowerCase() && firstChar !== firstChar.toUpperCase();
}

/**
 * Resolve intent metadata for an intrinsic element by tag name.
 * Returns undefined if the element is not in the intent registry (pass-through).
 */
export function resolveIntrinsicIntents(tagName: string): ResolvedIntents | undefined {
  const meta: IntrinsicIntentMeta | undefined = INTRINSIC_INTENT_REGISTRY[tagName];
  if (!meta) return undefined;

  return {
    intents: meta.intents,
    allowedChildIntents: meta.allowedChildIntents,
    context: meta.context,
    contextTransparent: meta.contextTransparent ?? false,
  };
}

/**
 * Resolve intent metadata for a JSX element.
 *
 * For intrinsic elements: looks up the INTRINSIC_INTENT_REGISTRY.
 * For component elements: attempts to trace the component reference and
 * extract symbol-branded intents from `createIntentComponent` calls.
 *
 * Returns undefined for unbranded / unresolvable elements (treated as pass-through).
 */
export function resolveElementIntents(
  openingElement: TSESTree.JSXOpeningElement,
  /** For component refs: map from variable name → resolved intent metadata */
  componentIntentCache: Map<string, ResolvedIntents | null>,
): ResolvedIntents | undefined {
  const tagName = getJSXTagName(openingElement);

  // Intrinsic elements: direct registry lookup
  if (isIntrinsicElement(tagName)) {
    return resolveIntrinsicIntents(tagName);
  }

  // Component elements: check the cache (populated by import analysis)
  const cached = componentIntentCache.get(tagName);
  if (cached !== undefined) {
    return cached ?? undefined;
  }

  // Unresolvable — treat as pass-through
  return undefined;
}

/**
 * Walk up the JSX ancestor chain to find the first parent element with
 * explicit allowedChildIntents (not undefined = pass-through).
 *
 * Returns the resolved intents and the JSX element node, or undefined if
 * no constraining parent is found.
 */
export function findConstrainingParent(
  ancestors: TSESTree.Node[],
  componentIntentCache: Map<string, ResolvedIntents | null>,
): { resolved: ResolvedIntents; element: TSESTree.JSXElement } | undefined {
  // Walk from innermost to outermost ancestor
  for (let i = ancestors.length - 1; i >= 0; i--) {
    const ancestor = ancestors[i];
    if (ancestor.type !== 'JSXElement') continue;

    const resolved = resolveElementIntents(ancestor.openingElement, componentIntentCache);
    if (!resolved) continue;

    // Skip pass-through parents (allowedChildIntents === undefined)
    if (resolved.allowedChildIntents === undefined) continue;

    return { resolved, element: ancestor };
  }

  return undefined;
}

/**
 * Walk up the ancestor chain to find the nearest context-establishing ancestor.
 * Returns the context array, or undefined if no context is found.
 */
export function findNearestContext(
  ancestors: TSESTree.Node[],
  componentIntentCache: Map<string, ResolvedIntents | null>,
): { context: readonly string[]; element: TSESTree.JSXElement } | undefined {
  for (let i = ancestors.length - 1; i >= 0; i--) {
    const ancestor = ancestors[i];
    if (ancestor.type !== 'JSXElement') continue;

    const resolved = resolveElementIntents(ancestor.openingElement, componentIntentCache);
    if (!resolved) continue;

    if (resolved.context && resolved.context.length > 0) {
      return { context: resolved.context, element: ancestor };
    }
  }

  return undefined;
}
