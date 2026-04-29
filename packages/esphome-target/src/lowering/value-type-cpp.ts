// ────────────────────────────────────────────────────────────────────────────
// value-type-cpp.ts — Map target-agnostic IRValueType to C++ / ESPHome types
//
// The core library exposes `IRValueType` (target-agnostic). The ESPHome
// target owns the concrete C++ representation — this module is the single
// source of that mapping.
// ────────────────────────────────────────────────────────────────────────────

import type { IRValueType } from '@espcompose/core/internals';

/**
 * Map an `IRValueType` to its concrete C++ type string used in struct fields,
 * lambda return types, function parameters, etc.
 *
 * Examples:
 *   { type: 'int' }                          → 'int'
 *   { type: 'float' }                        → 'float'
 *   { type: 'bool' }                         → 'bool'
 *   { type: 'string' }                       → 'std::string'
 *   { type: 'string', format: 'id_ref' }     → 'const char*'
 *   { type: 'string', format: 'entity' }     → 'const char*'
 *   { type: 'int', isArray: true }           → 'std::vector<int>'
 */
export function valueTypeToCpp(vt: IRValueType): string {
  const base = baseCppType(vt);
  if (vt.isArray) return `std::vector<${base}>`;
  return base;
}

function baseCppType(vt: IRValueType): string {
  switch (vt.type) {
    case 'int': return 'int';
    case 'float': return 'float';
    case 'bool': return 'bool';
    case 'string':
      // id_ref / entity tokens are stored as raw C strings.
      if (vt.format === 'id_ref' || vt.format === 'entity') return 'const char*';
      return 'std::string';
  }
}

/**
 * Map an `IRValueType` to the ESPHome YAML `parameters:` type keyword.
 *
 * ESPHome accepts: `int`, `float`, `bool`, `string`.
 */
export function valueTypeToEsphomeParam(vt: IRValueType): string {
  // ESPHome script parameters don't have a separate id_ref keyword;
  // id-ref slots are passed as `int` (the lookup-table index).
  if (vt.format === 'id_ref') return 'int';
  switch (vt.type) {
    case 'int': return 'int';
    case 'float': return 'float';
    case 'bool': return 'bool';
    case 'string': return 'string';
  }
}

/** Zero-value C++ literal for an `IRValueType`. */
export function valueTypeZeroLiteral(vt: IRValueType): string {
  if (vt.isArray) return '{}';
  switch (vt.type) {
    case 'int': return '0';
    case 'float': return '0.0f';
    case 'bool': return 'false';
    case 'string':
      if (vt.format === 'id_ref' || vt.format === 'entity') return 'nullptr';
      return '""';
  }
}
