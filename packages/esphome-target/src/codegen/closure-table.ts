// ────────────────────────────────────────────────────────────────────────────
// closure-table.ts — Generate C++ closure tables for parameterized scripts
//
// For each `IRScript` whose `closureShape` is populated, emit:
//   1. A struct declaring the closure-row layout
//        struct scr_abcd1234_closure_t { const char* light_id; int brightness; };
//   2. A static const array of rows for per-instance values
//        static const scr_abcd1234_closure_t scr_abcd1234_closures[] = {
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
  IRScalar,
  IRType,
} from '@espcompose/core/internals';
import { irTypeToCpp, irTypeZeroLiteral } from '../lowering';
import { sanitizeBindingName } from '../yaml-utils.js';

/** Per-template closure table emission. */
export interface ClosureTableDecl {
  /** Script id this table belongs to. */
  scriptId: string;
  /** C++ struct name (e.g. `scr_abcd1234_closure_t`). */
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

/** Closure struct name derived from script id, kept in snake_case so
 *  the e2e snapshot stabiliser regex handles it without special-casing. */
export function closureStructName(scriptId: string): string {
  return `${scriptId}_closure_t`;
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

/** Format an `IRScalar` closure cell as a C++ literal, guided by the field's `IRType`. */
export function formatClosureValue(v: IRScalar, irType: IRType): string {
  switch (irType.type) {
    case 'int':    return Number.isInteger(v.value as number) ? String(v.value) : String(Math.trunc(v.value as number));
    case 'float':  {
      const n = v.value as number;
      if (!Number.isFinite(n)) return '0.0f';
      // C++ float literal requires a decimal point before the `f` suffix.
      const s = String(n);
      return s.includes('.') || s.includes('e') || s.includes('E') ? `${s}f` : `${s}.0f`;
    }
    case 'bool':   return v.value ? 'true' : 'false';
    case 'string': return cppStringLiteral(String(v.value));
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
    if (val) {
      const id = String(val.value);
      let idx = idToIndex.get(id);
      if (idx === undefined) {
        idx = ids.length;
        ids.push(id);
        idToIndex.set(id, idx);
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
    if (f.irType.format === 'id_ref') {
      idRefIndices.set(f.name, buildIdRefIndex(f.name, decl.rows));
    }
  }

  // ── Typed-pointer lookup arrays for id_ref fields ──
  // ESPHome's `id(X)` returns `T&` for LVGL widgets but `T*` for component
  // accessors (light, switch, sensor, …). We normalize both via the
  // `_ec_id_ptr` overload set emitted at the top of the bindings header
  // so the array element type is always `T*`.
  for (const f of decl.fields) {
    if (f.irType.format !== 'id_ref') continue;
    const idx = idRefIndices.get(f.name)!;
    if (idx.ids.length === 0) continue;
    // Strip the _idx suffix from the field name to get the binding name,
    // then pluralise for the array variable name.
    const baseName = f.name.endsWith('_idx') ? f.name.slice(0, -4) : f.name;
    const arrayVarName = `ec_${decl.scriptId}_${sanitizeBindingName(baseName)}s`;
    const firstId = idx.ids[0];
    lines.push(
      `static decltype(_ec_id_ptr(id(${firstId}))) const ${arrayVarName}[] = {`,
    );
    for (let i = 0; i < idx.ids.length; i++) {
      const comma = i < idx.ids.length - 1 ? ',' : '';
      lines.push(`  _ec_id_ptr(id(${idx.ids[i]}))${comma}`);
    }
    lines.push('};');
  }

  // ── Struct ──
  lines.push(`struct ${decl.structName} {`);
  for (const f of decl.fields) {
    lines.push(`  ${irTypeToCpp(f.irType)} ${sanitizeBindingName(f.name)};`);
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
      if (f.irType.format === 'id_ref') {
        const idx = idRefIndices.get(f.name);
        return idx ? String(idx.indexByRow[i]) : '0';
      }
      if (!val) {
        return defaultCppLiteral(f);
      }
      return formatClosureValue(val, f.irType);
    });
    const comma = i < decl.rows.length - 1 ? ',' : '';
    lines.push(`  { ${cells.join(', ')} }${comma}`);
  }
  lines.push('};');

  return lines;
}

/** Zero-value literal for a field whose row entry is missing. */
function defaultCppLiteral(f: ClosureField): string {
  return irTypeZeroLiteral(f.irType);
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
