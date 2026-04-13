/**
 * Shared brand-checking utilities for @espcompose/core type brands.
 *
 * Detects `Ref<T>`, `RefProp<T>`, and `BINDING_BRAND`-typed values by
 * inspecting TypeScript's internal unique-symbol property encoding.
 * The alias check additionally verifies the alias originates from
 * `@espcompose/core` to avoid false positives with identically-named
 * types from other packages (e.g. Vue's `Ref`).
 */

import ts from 'typescript';

// ────────────────────────────────────────────────────────────────────────────
// Internals
// ────────────────────────────────────────────────────────────────────────────

const REF_BRAND_RE = /^__@REF_BRAND@\d+$/;
const BINDING_BRAND_RE = /^__@BINDING_BRAND@\d+$/;

/**
 * Check whether an alias symbol was declared inside `@espcompose/core`.
 *
 * Works for both:
 *   - Monorepo source paths (`packages/core/src/…`)
 *   - Resolved node_modules paths (`@espcompose/core/…`)
 */
function isFromEspcomposeCore(symbol: ts.Symbol): boolean {
  const declarations = symbol.getDeclarations();
  if (!declarations) return false;
  return declarations.some(d => {
    const fileName = d.getSourceFile().fileName;
    return fileName.includes('@espcompose/core') ||
           fileName.includes('packages/core/');
  });
}

// ────────────────────────────────────────────────────────────────────────────
// Public API
// ────────────────────────────────────────────────────────────────────────────

/**
 * Check whether a type carries the REF_BRAND unique-symbol property.
 */
export function hasRefBrand(type: ts.Type): boolean {
  for (const prop of type.getProperties()) {
    if (REF_BRAND_RE.test(prop.name)) {
      return true;
    }
  }
  return false;
}

/**
 * Check whether a type carries the BINDING_BRAND unique-symbol property.
 */
export function hasBindingBrand(type: ts.Type): boolean {
  for (const prop of type.getProperties()) {
    if (BINDING_BRAND_RE.test(prop.name)) {
      return true;
    }
  }
  return false;
}

/**
 * Check whether a symbol's type is `Ref<T>` or `RefProp<T>` from @espcompose/core.
 *
 * Uses two strategies:
 *   1. Alias check — when TS preserves the type alias, verify its name AND
 *      that the declaration originates from `@espcompose/core`.
 *   2. Structural brand check — falls back to detecting the REF_BRAND
 *      unique-symbol property for cases where the alias is lost
 *      (e.g. destructured props).
 */
export function isRefType(checker: ts.TypeChecker, symbol: ts.Symbol): boolean {
  const type = checker.getTypeOfSymbol(symbol);
  // Direct alias check — works for `const x: Ref<T> = ...`
  if (type.aliasSymbol) {
    const name = type.aliasSymbol.name;
    if ((name === 'Ref' || name === 'RefProp') && isFromEspcomposeCore(type.aliasSymbol)) {
      return true;
    }
  }
  // Structural brand check — works for destructured props where alias is lost.
  // Ref<T> always carries a REF_BRAND unique symbol property.
  return hasRefBrand(type);
}
