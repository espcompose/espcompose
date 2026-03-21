/**
 * Maps TypeScript type nodes to ESPHome script parameter type strings.
 *
 * ESPHome script parameters are typed as C++ types. The mapping covers the
 * common TypeScript primitives that an author would use in function signatures.
 *
 * Unsupported types produce a descriptive error string (callers are responsible
 * for surfacing this as a compile diagnostic).
 */

import ts from 'typescript';

/** Mapping result — either a valid ESPHome type string or an error. */
export type TypeMapResult =
  | { ok: true; esphomeType: string }
  | { ok: false; error: string };

/**
 * Convert a TypeScript type node to an ESPHome script parameter type string.
 *
 * Supported mappings:
 *   number   → int
 *   string   → std::string
 *   boolean  → bool
 *
 * Everything else is an error.
 */
export function mapParamType(typeNode: ts.TypeNode | undefined): TypeMapResult {
  if (!typeNode) {
    // No explicit type annotation — default to int (most common in hardware scripts)
    return { ok: true, esphomeType: 'int' };
  }

  if (ts.isTypeReferenceNode(typeNode)) {
    const name = typeNode.typeName.getText();
    return mapByName(name);
  }

  if (ts.isUnionTypeNode(typeNode)) {
    return { ok: false, error: `Union types are not supported in script parameters. Use a single primitive type.` };
  }

  switch (typeNode.kind) {
    case ts.SyntaxKind.NumberKeyword:
      return { ok: true, esphomeType: 'int' };
    case ts.SyntaxKind.StringKeyword:
      return { ok: true, esphomeType: 'std::string' };
    case ts.SyntaxKind.BooleanKeyword:
      return { ok: true, esphomeType: 'bool' };
    default:
      return {
        ok: false,
        error: `Type '${typeNode.getText()}' is not supported as a script parameter. Use number, string, or boolean.`,
      };
  }
}

function mapByName(name: string): TypeMapResult {
  switch (name) {
    case 'number':
      return { ok: true, esphomeType: 'int' };
    case 'string':
      return { ok: true, esphomeType: 'std::string' };
    case 'boolean':
      return { ok: true, esphomeType: 'bool' };
    default:
      return {
        ok: false,
        error: `Type '${name}' is not supported as a script parameter. Use number, string, or boolean.`,
      };
  }
}
