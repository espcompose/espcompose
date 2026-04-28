// ────────────────────────────────────────────────────────────────────────────
// Semantic IR — target-agnostic intermediate representation
//
// Captures the FULL information from a render pass: the config tree structure
// with semantic value nodes that preserve IRReactiveNodes, Refs, compiled
// actions, and secrets — all BEFORE serialization flattens them.
//
// This IR is consumed by backends:
//   - YAML+C++ backend: produces ESPHome YAML + espcompose_bindings.h
// ────────────────────────────────────────────────────────────────────────────

import type { IRReactiveNode } from '../reactive-node';
import type { IRBinding, IRHAEntity, IRComponent } from '../hooks/useReactiveScope';
import type { IRActionNode } from './action-types';

// ────────────────────────────────────────────────────────────────────────────
// Script definition
// ────────────────────────────────────────────────────────────────────────────

/** ESPHome script execution mode. Controls behavior when re-triggered while already running. */
export type ScriptMode = 'single' | 'restart' | 'queued' | 'parallel';

// ────────────────────────────────────────────────────────────────────────────
// IRValueType — target-agnostic value type descriptor
// ────────────────────────────────────────────────────────────────────────────

/**
 * Base scalar type. Always present on `IRValueType`. Target-agnostic — the
 * lowering target (e.g. esphome-target) maps these to concrete C++ types.
 */
export type IRScalarType = 'int' | 'float' | 'bool' | 'string';

/**
 * Optional semantic qualifier on a value. Drives target-specific storage and
 * code rewriting. Examples:
 *   - 'id_ref' : value is a reference to an ESPHome component/widget id.
 *                Stored as a string token; consumers may resolve via `id(...)`.
 *   - 'entity' : value is a Home Assistant entity id.
 */
export type IRScalarFormat = 'id_ref' | 'entity';

/**
 * Target-agnostic value type descriptor used throughout the IR.
 *
 * Replaces ad-hoc backend-specific type strings. The lowering target owns the
 * mapping from `IRValueType` to its concrete representation.
 *
 * Examples (logical):
 *   { type: 'int' }                              → integer scalar
 *   { type: 'string' }                           → string scalar
 *   { type: 'string', format: 'id_ref' }         → identifier reference
 *   { type: 'float', isArray: true }             → float array
 */
export interface IRValueType {
  /** Base scalar — always present. */
  readonly type: IRScalarType;
  /** Semantic qualifier (e.g. `'id_ref'`). Optional. */
  readonly format?: IRScalarFormat;
  /** Collection flag. When true, the value is an array of `type`. */
  readonly isArray?: boolean;
}

/** A single parameter declaration for a parameterized ESPHome script. */
export interface IRScriptParam {
  /** Parameter name (used as identifier in the script body). */
  name: string;
  /** Target-agnostic value type. The lowering target maps this to a concrete type. */
  valueType: IRValueType;
}

/**
 * Reference to a script parameter inside the script body.
 * Used in place of a literal value when the value is supplied per call-site.
 */
export interface IRScriptParamRef {
  readonly kind: 'script_param';
  /** The parameter name — must match an entry in the script's parameter list. */
  name: string;
}

// ────────────────────────────────────────────────────────────────────────────
// Closure model (canonical: template + closure_table + closure_index)
// ────────────────────────────────────────────────────────────────────────────

/**
 * Semantic kind of a closure field. Drives how the field is materialized in
 * the closure-table struct and how body references are rewritten.
 *
 *   - 'scalar'  : plain value (int/float/bool/string), stored in the table row
 *                 and referenced as `closure.<field>` in the script body.
 *   - 'id_ref'  : ESPHome component/widget ID. Stored as a string token (or
 *                 lookup-table index); native YAML actions whose `id:` slot
 *                 binds to this field get rewritten to lambdas calling
 *                 `id(closure.<field>)`.
 *   - 'entity'  : Home Assistant entity id. Same storage as id_ref; entity-
 *                 specific actions get rewritten via descriptor.
 *
 * @deprecated Subsumed by `IRValueType.format`. Retained transitionally.
 */
export type ClosureFieldKind = 'scalar' | 'id_ref' | 'entity';

/**
 * One column in a script's closure table.
 *
 * The set of `ClosureField`s defines the table's struct layout; per-instance
 * values populate rows in the same order.
 */
export interface ClosureField {
  /** Struct field name (also referenced in body as `closure.<name>`). */
  name: string;
  /**
   * Target-agnostic value type. Drives both target lowering (struct field
   * type) and body-rewriting (presence of `format: 'id_ref' | 'entity'`).
   *
   * Examples:
   *   { type: 'int' }                       — plain scalar
   *   { type: 'int', format: 'id_ref' }     — index into id-ref lookup table
   *   { type: 'string', format: 'entity' }  — HA entity id
   */
  valueType: IRValueType;
}

/** The deterministic, ordered shape of a script's closure table. */
export interface ClosureShape {
  /** Ordered list of fields; order is part of the template's identity. */
  fields: ClosureField[];
}

/**
 * A literal value used to populate a single closure-table cell.
 *
 * Distinct from `IRActionParam` (which carries trigger-var/expression kinds)
 * because closure-table rows are pure compile-time constants.
 */
export type IRClosureValue =
  | { kind: 'int'; value: number }
  | { kind: 'float'; value: number }
  | { kind: 'bool'; value: boolean }
  | { kind: 'string'; value: string }
  | { kind: 'id_ref'; id: string }
  | { kind: 'entity'; entityId: string };

/** One row of the closure table: concrete values for every field in the shape. */
export interface ClosureInstance {
  /** Field-name → value map. Keys MUST match the script's `closureShape.fields[].name`. */
  values: Record<string, IRClosureValue>;
}

export interface IRScript {
  readonly kind: 'script';
  id: string;
  /** Execution mode. Omit for ESPHome default ('single'). */
  mode?: ScriptMode;
  /** User-defined parameters from the script's arrow function signature. */
  userParams?: IRScriptParam[];
  /**
   * Canonical closure shape (template-level). Defines the closure-table
   * struct layout. Populated by the compile-time dedup pass.
   */
  closureShape?: ClosureShape;
  /**
   * Per-instance rows of the closure table. Each entry's index is the
   * `closureIndex` passed by the corresponding call site. Populated by
   * the compile-time dedup pass.
   */
  closureTable?: ClosureInstance[];
  /**
   * Per-script binding name → literal ESPHome ID token map for `ref` slots
   * inside this script's body. Used by the YAML lowerer to resolve
   * structured `ref` slots without mutating shared IR.
   *
   * When unset, ref slots are assumed to be either pre-resolved to literal
   * tokens or covered by `closureShape`.
   */
  refBindings?: Record<string, string>;
  then: IRActionNode[];
}

// ────────────────────────────────────────────────────────────────────────────
// Theme data (per-scope)
// ────────────────────────────────────────────────────────────────────────────

export interface IRThemeData {
  readonly kind: 'theme_data';
  /** Human-readable scope name (e.g. 'espcompose:ui'). */
  scope: string;
  /** 8-char hex hash of the scope — used as C++ identifier fragment. */
  scopeId: string;
  themeNames: string[];
  defaultIndex: number;
  /** For each signal path, ordered values across themes + value type (ExprType compatible). */
  leafData: Map<string, { values: unknown[]; valueType: string }>;
}

// ────────────────────────────────────────────────────────────────────────────
// Semantic IR root
// ────────────────────────────────────────────────────────────────────────────

/**
 * ESPHome-targeted data: config tree, HA entities, components, and scripts.
 * All of this becomes ESPHome YAML or injected YAML sections.
 */
export interface IRESPHomeData {
  readonly kind: 'esphome_data';
  /** Top-level config sections (esphome:, wifi:, lvgl:, sensor:, etc.) */
  sections: IRSection[];

  /** HA entities for auto-generated sensor imports */
  haEntities: IRHAEntity[];

  /** Component definitions (images, fonts) for injection */
  components: IRComponent[];

  /** Named script definitions from useScript() */
  scripts: IRScript[];
}

/**
 * Reactive side-channel data: bindings, memos, and effects.
 * Memos are derived values (useMemo / __espcompose.compiled).
 * Effects are side-effects (useEffect) that generate C++ on_state triggers.
 *
 * These are the authoritative sources for reactive data — hook-registered
 * nodes may not appear in the config tree.
 */
export interface IRReactiveData {
  readonly kind: 'reactive_data';
  /** Reactive bindings linking memo/effect nodes to widget props */
  bindings: IRBinding[];

  /** Memo nodes (kind === 'memo') registered during the render pass */
  memos: IRReactiveNode[];

  /** Effect nodes (kind === 'effect') registered during the render pass */
  effects: IRReactiveNode[];
}

/**
 * ESPCompose-owned data: the reactive runtime and theme system.
 * This drives C++ header generation and is target-agnostic.
 */
export interface IRESPComposeData {
  readonly kind: 'espcompose_data';
  /** Reactive bindings, memos, and effects */
  reactive: IRReactiveData;

  /** Theme data from the theme registry (undefined if no themes) */
  themes?: IRThemeData[];
}

/**
 * The complete semantic IR for a device project.
 *
 * This is the central contract between the compiler frontend (TSX → IR) and
 * target backends (esphome-target). Backends consume a
 * SemanticIR and produce target-specific output (YAML + C++ headers).
 *
 * The config tree contains semantic value nodes (IRReactive, IRRef, etc.)
 * that preserve pre-serialization data.
 */
export interface SemanticIR {
  readonly kind: 'semantic_ir';
  /** ESPHome-targeted sections, HA entities, components, and scripts */
  esphome: IRESPHomeData;

  /** ESPCompose reactive runtime and theme data */
  espcompose: IRESPComposeData;
}

// ────────────────────────────────────────────────────────────────────────────
// Config tree nodes — semantic, target-agnostic value types
// ────────────────────────────────────────────────────────────────────────────

/** A top-level config section. */
export interface IRSection {
  readonly kind: 'section';
  key: string;
  value: IRValue;
}

/**
 * Union of all IR value types in the config tree.
 *
 * Unlike the old YAML-shaped IR, these types preserve semantic information:
 * - IRReactive wraps the original IRReactiveNode (not a lambda string)
 * - IRRef wraps the original Ref object (not a token string)
 * - IRAction wraps the raw compiled action tree (not YAML-resolved actions)
 * - IRSecret wraps the secret key (not a !secret tagged scalar)
 * - IRTriggerVar wraps the trigger variable info (not a lambda string)
 */
export type IRValue =
  | IRScalar
  | IRObject
  | IRArray
  | IRNull
  | IRReactive
  | IRRef
  | IRAction
  | IRSecret
  | IRTriggerVar;

/** A literal scalar value (string, number, boolean). */
export interface IRScalar {
  kind: 'scalar';
  value: string | number | boolean;
  /** When true, the string needs special handling to avoid YAML 1.1 boolean ambiguity. */
  quoted?: boolean;
}

/** An object with ordered key-value entries. */
export interface IRObject {
  kind: 'object';
  entries: IREntry[];
}

export interface IREntry {
  readonly kind: 'entry';
  key: string;
  value: IRValue;
}

/** An array of values. */
export interface IRArray {
  kind: 'array';
  items: IRValue[];
}

/** Null / empty value. */
export interface IRNull {
  kind: 'null';
}

/**
 * A reactive binding — wraps the original IRReactiveNode directly.
 *
 * Preserves the full reactive metadata (dependencies, ExprIR, return type,
 * kind) that backends need. No target-specific encoding.
 *
 * The ESPHome backend lowers ExprIR to C++ via exprToCpp().
 */
export interface IRReactive {
  kind: 'reactive';
  /** The original IRReactiveNode instance with full metadata. */
  node: IRReactiveNode;
}

/**
 * A cross-component reference — wraps the serialized ref token.
 *
 * Backends use the token to resolve component IDs in the final output.
 */
export interface IRRef {
  kind: 'ref';
  /** The serialized token string (e.g. "r_k7m3dh9z2"). */
  token: string;
}

/**
 * A compiled action tree — wraps the raw pre-resolution action metadata.
 *
 * Preserves the action steps and ref bindings BEFORE ref tokens are
 * resolved, so backends can interpret actions semantically.
 */
export interface IRAction {
  kind: 'action';
  /** The raw compiled action tree (pre-ref-resolution). */
  actions: IRActionNode[];
  /** Variable name → Ref mappings for resolving ref references in actions. */
  refBindings?: Record<string, unknown>;
}

/**
 * A secret value — wraps the secret key.
 */
export interface IRSecret {
  kind: 'secret';
  key: string;
}

/**
 * A trigger variable reference — wraps the trigger var info.
 *
 * Represents access to a trigger-provided variable (e.g. `x` in on_value).
 */
export interface IRTriggerVar {
  kind: 'trigger_var';
  /** The variable name (e.g. "x"). */
  name: string;
}

// ────────────────────────────────────────────────────────────────────────────
// Constructors
// ────────────────────────────────────────────────────────────────────────────

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
  return { kind: 'entry', key, value };
}

export function irArray(items: IRValue[]): IRArray {
  return { kind: 'array', items };
}

export function irNull(): IRNull {
  return { kind: 'null' };
}

export function irReactive(node: IRReactiveNode): IRReactive {
  return { kind: 'reactive', node };
}

export function irRef(token: string): IRRef {
  return { kind: 'ref', token };
}

export function irAction(actions: IRActionNode[], refBindings?: Record<string, unknown>): IRAction {
  return { kind: 'action', actions, ...(refBindings ? { refBindings } : {}) };
}

export function irSecret(key: string): IRSecret {
  return { kind: 'secret', key };
}

export function irTriggerVar(name: string): IRTriggerVar {
  return { kind: 'trigger_var', name };
}

