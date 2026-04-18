/**
 * Intent resolution utilities for ESLint rules.
 *
 * Resolves intent metadata from JSX elements by:
 * - Looking up intrinsic elements in the INTRINSIC_INTENT_REGISTRY
 * - Extracting symbol-branded intents from function component types via TypeChecker
 */

import type { TSESTree } from '@typescript-eslint/utils';
import type ts from 'typescript';
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
 * extract symbol-branded intents from `createComponent` calls.
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

// ────────────────────────────────────────────────────────────────────────────
// Type-based intent resolution (requires TypeScript type checker)
// ────────────────────────────────────────────────────────────────────────────

const INTENTS_RE = /^__@INTENTS@\d+$/;
const ALLOWED_CHILD_INTENTS_RE = /^__@ALLOWED_CHILD_INTENTS@\d+$/;
const CONTEXT_RE = /^__@CONTEXT@\d+$/;
const CONTEXT_TRANSPARENT_RE = /^__@CONTEXT_TRANSPARENT@\d+$/;

/**
 * Extract string literal values from a readonly tuple type.
 * Returns undefined if the type is not a resolvable tuple of string literals.
 */
function extractStringTuple(type: ts.Type, checker: ts.TypeChecker): readonly string[] | undefined {
  if (checker.typeToString(type) === 'undefined') return undefined;

  if (checker.isTupleType(type)) {
    const typeArgs = checker.getTypeArguments(type as ts.TypeReference);
    const strings: string[] = [];
    for (const arg of typeArgs) {
      if (arg.isStringLiteral()) {
        strings.push(arg.value);
      } else {
        return undefined;
      }
    }
    return strings;
  }

  return undefined;
}

/**
 * Resolve intent metadata from a TypeScript type by detecting symbol-branded
 * intent properties (__@INTENTS@..., __@ALLOWED_CHILD_INTENTS@..., etc.).
 *
 * Returns null if the type has no intent branding.
 */
export function resolveIntentsFromType(
  type: ts.Type,
  checker: ts.TypeChecker,
): ResolvedIntents | null {
  let intentsProp: ts.Symbol | undefined;
  let allowedChildIntentsProp: ts.Symbol | undefined;
  let contextProp: ts.Symbol | undefined;
  let contextTransparentProp: ts.Symbol | undefined;

  for (const prop of type.getProperties()) {
    if (INTENTS_RE.test(prop.name)) intentsProp = prop;
    else if (ALLOWED_CHILD_INTENTS_RE.test(prop.name)) allowedChildIntentsProp = prop;
    else if (CONTEXT_RE.test(prop.name)) contextProp = prop;
    else if (CONTEXT_TRANSPARENT_RE.test(prop.name)) contextTransparentProp = prop;
  }

  if (!intentsProp) return null;

  const intentsType = checker.getTypeOfSymbol(intentsProp);
  const intents = extractStringTuple(intentsType, checker);
  if (!intents) return null;

  let allowedChildIntents: readonly string[] | undefined;
  if (allowedChildIntentsProp) {
    const aciType = checker.getTypeOfSymbol(allowedChildIntentsProp);
    allowedChildIntents = extractStringTuple(aciType, checker);
  }

  let context: readonly string[] | undefined;
  if (contextProp) {
    const ctxType = checker.getTypeOfSymbol(contextProp);
    context = extractStringTuple(ctxType, checker);
  }

  let contextTransparent = false;
  if (contextTransparentProp) {
    const ctType = checker.getTypeOfSymbol(contextTransparentProp);
    contextTransparent = checker.typeToString(ctType) === 'true';
  }

  return {
    intents,
    allowedChildIntents,
    context,
    contextTransparent,
  };
}
