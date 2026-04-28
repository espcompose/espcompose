// ────────────────────────────────────────────────────────────────────────────
// closure-table.ts — Generate C++ closure tables for parameterized scripts
//
// For each `IRScript` whose `closureShape` is populated, emit:
//   1. A struct declaring the closure-row layout
//        struct EcScript1Closure { const char* light_id; int brightness; };
//   2. A static const array of rows for per-instance values
//        static const EcScript1Closure ec_script_1_closures[] = {
//          { "kitchen_light", 100 },
//          { "bedroom_light", 60 },
//        };
//
// These are emitted into espcompose_bindings.h alongside other tables.
// Script bodies that reference closure fields (`closure.<name>`) can resolve
// the row via the `closure_index` script parameter that this phase prepends.
// ────────────────────────────────────────────────────────────────────────────

import type {
  IRScript,
  ClosureField,
  ClosureInstance,
  IRClosureValue,
} from '@espcompose/core/internals';

/** Per-template closure table emission. */
export interface ClosureTableDecl {
  /** Script id this table belongs to. */
  scriptId: string;
  /** C++ struct name (e.g. `EcScript1Closure`). */
  structName: string;
  /** C++ array name (e.g. `ec_script_1_closures`). */
  arrayName: string;
  /** Ordered closure-shape fields. */
  fields: ClosureField[];
  /** Per-instance rows (length == number of call sites). */
  rows: ClosureInstance[];
}

// ────────────────────────────────────────────────────────────────────────────
// Naming helpers
// ────────────────────────────────────────────────────────────────────────────

/** Convert snake_case / arbitrary id → PascalCase suffixed with `Closure`. */
export function closureStructName(scriptId: string): string {
  const parts = scriptId.split(/[^A-Za-z0-9]+/).filter(Boolean);
  const pascal = parts.map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join('');
  return `${pascal || 'Script'}Closure`;
}

/** Per-template C++ identifier for the closure-table array. */
export function closureArrayName(scriptId: string): string {
  return `${scriptId}_closures`;
}

// ────────────────────────────────────────────────────────────────────────────
// Build emission descriptor from IR
// ────────────────────────────────────────────────────────────────────────────

/**
 * Build a `ClosureTableDecl` for a single script if it has a populated
 * `closureShape` + `closureTable`. Returns `null` when the script has no
 * closure (most scripts).
 */
export function buildClosureTableDecl(script: IRScript): ClosureTableDecl | null {
  if (!script.closureShape || script.closureShape.fields.length === 0) return null;
  const rows = script.closureTable ?? [];
  return {
    scriptId: script.id,
    structName: closureStructName(script.id),
    arrayName: closureArrayName(script.id),
    fields: script.closureShape.fields,
    rows,
  };
}

// ────────────────────────────────────────────────────────────────────────────
// C++ code generation
// ────────────────────────────────────────────────────────────────────────────

/** Format an `IRClosureValue` as a C++ literal. */
export function formatClosureValue(v: IRClosureValue): string {
  switch (v.kind) {
    case 'int':    return Number.isInteger(v.value) ? String(v.value) : String(Math.trunc(v.value));
    case 'float':  return Number.isFinite(v.value) ? `${v.value}f` : '0.0f';
    case 'bool':   return v.value ? 'true' : 'false';
    case 'string': return cppStringLiteral(v.value);
    case 'id_ref': return cppStringLiteral(v.id); // fallback — overridden by id_ref index in generateClosureTableLines
    case 'entity': return cppStringLiteral(v.entityId);
  }
}

function cppStringLiteral(s: string): string {
  // Conservative escape: backslash, double-quote, control chars.
  const escaped = s.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\t/g, '\\t');
  return `"${escaped}"`;
}

/**
 * For a given id_ref field across all rows, build an ordered list of unique IDs
 * and a per-row index map. Returns { ids: string[], indexByRow: number[] }.
 */
function buildIdRefIndex(
  fieldName: string,
  rows: ClosureInstance[],
): { ids: string[]; indexByRow: number[] } {
  const idToIndex = new Map<string, number>();
  const ids: string[] = [];
  const indexByRow: number[] = [];
  for (const row of rows) {
    const val = row.values[fieldName];
    if (val && val.kind === 'id_ref') {
      let idx = idToIndex.get(val.id);
      if (idx === undefined) {
        idx = ids.length;
        ids.push(val.id);
        idToIndex.set(val.id, idx);
      }
      indexByRow.push(idx);
    } else {
      indexByRow.push(0); // default index
    }
  }
  return { ids, indexByRow };
}

/**
 * Generate the C++ struct + static array declarations for a single
 * closure table. For id_ref fields, also emits typed-pointer lookup
 * arrays using `decltype(id(X))*` to avoid needing a cppType catalog.
 *
 * Returns an array of lines (no trailing newline).
 */
export function generateClosureTableLines(decl: ClosureTableDecl): string[] {
  const lines: string[] = [];

  // ── Build id_ref index maps ──
  const idRefIndices = new Map<string, { ids: string[]; indexByRow: number[] }>();
  for (const f of decl.fields) {
    if (f.kind === 'id_ref') {
      idRefIndices.set(f.name, buildIdRefIndex(f.name, decl.rows));
    }
  }

  // ── Typed-pointer lookup arrays for id_ref fields ──
  for (const f of decl.fields) {
    if (f.kind !== 'id_ref') continue;
    const idx = idRefIndices.get(f.name)!;
    if (idx.ids.length === 0) continue;
    // Strip the _idx suffix from the field name to get the binding name,
    // then pluralise for the array variable name.
    const baseName = f.name.endsWith('_idx') ? f.name.slice(0, -4) : f.name;
    const arrayVarName = `ec_${decl.scriptId}_${baseName}s`;
    const firstId = idx.ids[0];
    lines.push(
      `static decltype(id(${firstId}))* const ${arrayVarName}[] = {`,
    );
    for (let i = 0; i < idx.ids.length; i++) {
      const comma = i < idx.ids.length - 1 ? ',' : '';
      lines.push(`  id(${idx.ids[i]})${comma}`);
    }
    lines.push('};');
  }

  // ── Struct ──
  lines.push(`struct ${decl.structName} {`);
  for (const f of decl.fields) {
    lines.push(`  ${f.cppType} ${f.name};`);
  }
  lines.push('};');

  // ── Array ──
  if (decl.rows.length === 0) {
    // Still emit an empty array so symbols resolve; ESPHome won't reach it.
    lines.push(`static const ${decl.structName} ${decl.arrayName}[1] = {};`);
    return lines;
  }

  lines.push(`static const ${decl.structName} ${decl.arrayName}[] = {`);
  for (let i = 0; i < decl.rows.length; i++) {
    const row = decl.rows[i];
    const cells = decl.fields.map((f) => {
      const val = row.values[f.name];
      // For id_ref fields, emit the integer index into the lookup array.
      if (f.kind === 'id_ref') {
        const idx = idRefIndices.get(f.name);
        return idx ? String(idx.indexByRow[i]) : '0';
      }
      if (!val) {
        return defaultCppLiteral(f);
      }
      return formatClosureValue(val);
    });
    const comma = i < decl.rows.length - 1 ? ',' : '';
    lines.push(`  { ${cells.join(', ')} }${comma}`);
  }
  lines.push('};');

  return lines;
}

/** Zero-value literal for a field whose row entry is missing. */
function defaultCppLiteral(f: ClosureField): string {
  switch (f.cppType) {
    case 'int':         return '0';
    case 'float':       return '0.0f';
    case 'bool':        return 'false';
    case 'string':      return '""';
    case 'const char*': return 'nullptr';
  }
}

/**
 * Generate the full closure-table block for the bindings header. Aggregates
 * across all scripts that have a closure shape. Returns an empty string
 * when no script has a closure table.
 */
export function generateAllClosureTables(scripts: IRScript[]): string {
  const decls = scripts
    .map(buildClosureTableDecl)
    .filter((d): d is ClosureTableDecl => d !== null);
  if (decls.length === 0) return '';

  const lines: string[] = [];
  lines.push('// ── Script closure tables ──');
  for (const decl of decls) {
    lines.push(...generateClosureTableLines(decl));
    lines.push('');
  }
  return lines.join('\n');
}
