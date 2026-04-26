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
const THEME_BRAND_RE = /^__@THEME_BRAND@\d+$/;
const POPUP_BRAND_RE = /^__@POPUP_BRAND@\d+$/;

/**
 * Check whether an alias symbol was declared inside `@espcompose/core`.
 *
 * Works for both:
 *   - Monorepo source paths (`packages/core/src/…`)
 *   - Resolved node_modules paths (`@espcompose/core/…`)
 */
export function isFromEspcomposeCore(symbol: ts.Symbol): boolean {
  const declarations = symbol.getDeclarations();
  if (!declarations) return false;
  return declarations.some(d => {
    const fileName = d.getSourceFile().fileName;
    return fileName.includes('@espcompose/core') ||
           fileName.includes('packages/core/');
  });
}

/**
 * Check whether a call expression's callee resolves to a specific named export
 * from `@espcompose/core`.
 *
 * Resolves through import aliases so that `import { useRef as ref }` still
 * matches `isCoreHookCall(callExpr, 'useRef', checker)`.
 */
export function isCoreExportCall(
  callExpr: ts.CallExpression,
  memberName: string | string[],
  checker: ts.TypeChecker,
): boolean {
  const callee = callExpr.expression;
  if (!ts.isIdentifier(callee)) return false;

  const names = Array.isArray(memberName) ? memberName : [memberName];

  const sym = checker.getSymbolAtLocation(callee);
  if (!sym) return false;

  // Resolve through import aliases (e.g. `import { useRef as ref }`)
  const resolved = sym.flags & ts.SymbolFlags.Alias
    ? checker.getAliasedSymbol(sym)
    : sym;

  if (!names.includes(resolved.name)) return false;
  return isFromEspcomposeCore(resolved);
}

/**
 * Check whether a tagged template expression's tag resolves to a specific
 * named export from `@espcompose/core`.
 *
 * Resolves through import aliases so that `import { lambda as cpp }` still
 * matches `isCoreExportTaggedTemplate(expr, 'lambda', checker)`.
 */
export function isCoreExportTaggedTemplate(
  expr: ts.TaggedTemplateExpression,
  memberName: string,
  checker: ts.TypeChecker,
): boolean {
  const tag = expr.tag;
  if (!ts.isIdentifier(tag)) return false;

  const sym = checker.getSymbolAtLocation(tag);
  if (!sym) return false;

  const resolved = sym.flags & ts.SymbolFlags.Alias
    ? checker.getAliasedSymbol(sym)
    : sym;

  if (resolved.name !== memberName) return false;
  return isFromEspcomposeCore(resolved);
}

/**
 * Check whether a call expression is `obj.method()` where `obj` resolves to
 * a specific named export from `@espcompose/core`.
 *
 * Resolves through import aliases so that `import { logger as log }` still
 * matches `isCorePropertyCall(callExpr, 'logger', 'log', checker)`.
 */
export function isCorePropertyCall(
  callExpr: ts.CallExpression,
  objectName: string,
  methodName: string,
  checker: ts.TypeChecker,
): boolean {
  if (!ts.isPropertyAccessExpression(callExpr.expression)) return false;
  if (callExpr.expression.name.text !== methodName) return false;

  const objExpr = callExpr.expression.expression;
  if (!ts.isIdentifier(objExpr)) return false;

  const sym = checker.getSymbolAtLocation(objExpr);
  if (!sym) return false;

  const resolved = sym.flags & ts.SymbolFlags.Alias
    ? checker.getAliasedSymbol(sym)
    : sym;

  if (resolved.name !== objectName) return false;
  return isFromEspcomposeCore(resolved);
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
 * Check whether a type carries the THEME_BRAND unique-symbol property.
 */
export function hasThemeBrand(type: ts.Type): boolean {
  for (const prop of type.getProperties()) {
    if (THEME_BRAND_RE.test(prop.name)) {
      return true;
    }
  }
  return false;
}

/**
 * Check whether a type carries the POPUP_BRAND unique-symbol property.
 */
export function hasPopupBrand(type: ts.Type): boolean {
  for (const prop of type.getProperties()) {
    if (POPUP_BRAND_RE.test(prop.name)) {
      return true;
    }
  }
  return false;
}



/**
 * Extract the literal scope string from a ThemeHandle's `scope` property type.
 *
 * The `scope` property is typed as a string literal via the `Scope` generic
 * (e.g. `readonly scope: 'espcompose:ui'`).  This function reads that literal
 * value from the type system.
 *
 * @returns The scope string, or `undefined` if the type is not a string literal.
 */
export function extractThemeScopeFromType(type: ts.Type, checker: ts.TypeChecker): string | undefined {
  const scopeProp = type.getProperty('scope');
  if (!scopeProp) return undefined;

  const scopeType = checker.getTypeOfSymbol(scopeProp);
  if (scopeType.isStringLiteral()) {
    return scopeType.value;
  }
  return undefined;
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
