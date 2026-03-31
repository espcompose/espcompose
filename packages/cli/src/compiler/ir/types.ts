// ────────────────────────────────────────────────────────────────────────────
// IR Node Types
//
// Intermediate representation between the rendered JSX tree (plain config
// objects) and the final YAML output. Provides a structured, typed layer
// that analysis passes can inspect and transform.
//
// Phase B: thin wrapper around the rendered config — buildIR wraps the
// output of render() into IR nodes, and lowerIR converts back. Later
// phases enhance the IR with semantic nodes (IRReactiveExpr, IRScript, etc.)
// ────────────────────────────────────────────────────────────────────────────

/**
 * Root of the IR tree. Represents the entire project configuration.
 */
export interface IRRoot {
  kind: 'root';
  sections: IRSection[];
}

/**
 * A top-level YAML section (e.g., esphome:, wifi:, sensor:, script:).
 */
export interface IRSection {
  kind: 'section';
  key: string;
  value: IRValue;
}

// ── IR Values ──────────────────────────────────────────────────────────────

export type IRValue =
  | IRScalar
  | IRObject
  | IRArray
  | IRLambda
  | IRNull;

/** A literal scalar value (string, number, boolean). */
export interface IRScalar {
  kind: 'scalar';
  value: string | number | boolean;
  /** When true, the string should be single-quoted in YAML (e.g. YAML 1.1 booleans). */
  quoted?: boolean;
}

/** An object with ordered key-value entries. */
export interface IRObject {
  kind: 'object';
  entries: IREntry[];
}

export interface IREntry {
  key: string;
  value: IRValue;
}

/** An array of values. */
export interface IRArray {
  kind: 'array';
  items: IRValue[];
}

/** A C++ lambda expression (!lambda tagged scalar in YAML). */
export interface IRLambda {
  kind: 'lambda';
  code: string;
}

/** Null / empty value. */
export interface IRNull {
  kind: 'null';
}

// ── Constructors ───────────────────────────────────────────────────────────

export function irRoot(sections: IRSection[]): IRRoot {
  return { kind: 'root', sections };
}

export function irSection(key: string, value: IRValue): IRSection {
  return { kind: 'section', key, value };
}

export function irScalar(value: string | number | boolean, quoted?: boolean): IRScalar {
  return { kind: 'scalar', value, ...(quoted ? { quoted } : {}) };
}

export function irObject(entries: IREntry[]): IRObject {
  return { kind: 'object', entries };
}

export function irEntry(key: string, value: IRValue): IREntry {
  return { key, value };
}

export function irArray(items: IRValue[]): IRArray {
  return { kind: 'array', items };
}

export function irLambda(code: string): IRLambda {
  return { kind: 'lambda', code };
}

export function irNull(): IRNull {
  return { kind: 'null' };
}

// ── Type guards ────────────────────────────────────────────────────────────

export function isIRScalar(v: IRValue): v is IRScalar {
  return v.kind === 'scalar';
}

export function isIRObject(v: IRValue): v is IRObject {
  return v.kind === 'object';
}

export function isIRArray(v: IRValue): v is IRArray {
  return v.kind === 'array';
}

export function isIRLambda(v: IRValue): v is IRLambda {
  return v.kind === 'lambda';
}

export function isIRNull(v: IRValue): v is IRNull {
  return v.kind === 'null';
}
