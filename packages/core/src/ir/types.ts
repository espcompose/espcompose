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

import type { IRReactiveNode } from '../reactive';
import type { IRBinding, IRHAEntity } from '../hooks';
import type { IRActionNode } from './action-types';
import type { ExprType } from './expr-types';
import type { IRWidget, IROverlayTier } from './widget-types';
import type { IRStyleTransition, IRAnimateTransition } from './contribution-types';

// ────────────────────────────────────────────────────────────────────────────
// Script definition
// ────────────────────────────────────────────────────────────────────────────

/** ESPHome script execution mode. Controls behavior when re-triggered while already running. */
export type ScriptMode = 'single' | 'restart' | 'queued' | 'parallel';

// ────────────────────────────────────────────────────────────────────────────
// IRType — target-agnostic value type descriptor
// ────────────────────────────────────────────────────────────────────────────

/**
 * Base scalar type. Always present on `IRType`. Target-agnostic — the
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
 * mapping from `IRType` to its concrete representation.
 *
 * Examples (logical):
 *   { type: 'int' }                              → integer scalar
 *   { type: 'string' }                           → string scalar
 *   { type: 'string', format: 'id_ref' }         → identifier reference
 *   { type: 'float', isArray: true }             → float array
 */
export interface IRType {
  readonly kind: 'type';
  /** Base scalar — always present. */
  readonly type: IRScalarType;
  /** Semantic qualifier (e.g. `'id_ref'`). Optional. */
  readonly format?: IRScalarFormat;
  /** Collection flag. When true, the value is an array of `type`. */
  readonly isArray?: boolean;
}

/** A single parameter declaration for a parameterized ESPHome script. */
export interface IRScriptParamDecl {
  readonly kind: 'script_param_decl';
  /** Parameter name (used as identifier in the script body). */
  name: string;
  /** Target-agnostic type descriptor. The lowering target maps this to a concrete type. */
  irType: IRType;
}

// ────────────────────────────────────────────────────────────────────────────
// Closure model (canonical: template + closure_table + closure_index)
// ────────────────────────────────────────────────────────────────────────────

/**
 * One column in a script's closure table.
 *
 * The set of `ClosureField`s defines the table's struct layout; per-instance
 * values populate rows in the same order.
 */
export interface ClosureField {
  readonly kind: 'closure_field';
  /** Struct field name (also referenced in body as `closure.<name>`). */
  name: string;
  /**
   * Target-agnostic type descriptor. Drives both target lowering (struct field
   * type) and body-rewriting (presence of `format: 'id_ref' | 'entity'`).
   *
   * Examples:
   *   { type: 'int' }                       — plain scalar
   *   { type: 'int', format: 'id_ref' }     — index into id-ref lookup table
   *   { type: 'string', format: 'entity' }  — HA entity id
   */
  irType: IRType;
}

/** The deterministic, ordered shape of a script's closure table. */
export interface ClosureShape {
  readonly kind: 'closure_shape';
  /** Ordered list of fields; order is part of the template's identity. */
  fields: ClosureField[];
}

/** One row of the closure table: concrete values for every field in the shape. */
export interface ClosureInstance {
  readonly kind: 'closure_instance';
  /** Field-name → value map. Keys MUST match the script's `closureShape.fields[].name`. */
  values: Record<string, IRScalar>;
}

export interface IRScript {
  readonly kind: 'script';
  id: string;
  /** Execution mode. Omit for ESPHome default ('single'). */
  mode?: ScriptMode;
  /**
   * Maximum concurrent/queued runs. Only meaningful when `mode` is
   * `'queued'` or `'parallel'`. Omit to use the ESPHome default (0 = unlimited).
   */
  maxRuns?: number;
  /** User-defined parameters from the script's arrow function signature. */
  userParams?: IRScriptParamDecl[];
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
  readonly kind: 'theme_scope';
  /** Human-readable scope name (e.g. 'espcompose:ui'). */
  scope: string;
  /** 8-char hex hash of the scope — used as C++ identifier fragment. */
  scopeId: string;
  names: string[];
  defaultIndex: number;
  /** For each signal path, ordered values across themes + expression type. */
  values: Map<string, { values: IRScalar[]; exprType: ExprType }>;
}

// ────────────────────────────────────────────────────────────────────────────
// Resolved component (config values converted to IRValue tree)
// ────────────────────────────────────────────────────────────────────────────

/**
 * A component definition (image, font, etc.) with its config resolved to
 * IRValue. The raw `IRComponent` from the hooks layer has
 * `config: Record<string, unknown>`; this resolved version wraps config
 * values in the IRValue tree for consistent typing.
 */
export interface IRComponent {
  readonly kind: 'component';
  section: string;
  id: string;
  config: IRValue;
}

// ────────────────────────────────────────────────────────────────────────────
// Branded array registries
//
// Each registry is a plain array intersected with a `kind` discriminator.
// This avoids stutter (e.g. `entities.entities`) while remaining iterable
// and carrying a discriminator for the IR walker / JSON serializer.
// ────────────────────────────────────────────────────────────────────────────

/** Branded array of top-level config sections. */
export type IRSectionRegistry = IRSection[] & { readonly kind: 'section_registry' };

/** Branded array of HA entities discovered during the render pass. */
export type IREntityRegistry = IRHAEntity[] & { readonly kind: 'entity_registry' };

/** Branded array of component definitions (images, fonts, globals) from hooks. */
export type IRComponentRegistry = IRComponent[] & { readonly kind: 'component_registry' };

/** Branded array of script definitions from useScript(). */
export type IRScriptRegistry = IRScript[] & { readonly kind: 'script_registry' };

/** Branded array of theme scope data from the theme registry. */
export type IRThemeRegistry = IRThemeData[] & { readonly kind: 'theme_registry' };

/**
 * Create a branded array — a plain array with an attached `kind` discriminator.
 *
 * The result is iterable, indexable, and carries `.kind` for the IR walker.
 */
export function brandArray<T, K extends string>(items: T[], kind: K): T[] & { readonly kind: K } {
  return Object.assign(items, { kind } as const);
}

// ────────────────────────────────────────────────────────────────────────────
// Reactive registry
// ────────────────────────────────────────────────────────────────────────────

/**
 * Reactive side-channel data: bindings, memos, and effects.
 * Memos are derived values (useMemo / __espcompose.compiled).
 * Effects are side-effects (useEffect) that generate C++ on_state triggers.
 *
 * These are the authoritative sources for reactive data — hook-registered
 * nodes may not appear in the config tree.
 */
export interface IRReactiveRegistry {
  readonly kind: 'reactive_registry';
  /** Reactive bindings linking memo/effect nodes to widget props */
  bindings: IRBinding[];

  /** Memo nodes (kind === 'memo') registered during the render pass */
  memos: IRReactiveNode[];

  /** Effect nodes (kind === 'effect') registered during the render pass */
  effects: IRReactiveNode[];
}

// ────────────────────────────────────────────────────────────────────────────
// UI registry
// ────────────────────────────────────────────────────────────────────────────

/**
 * UI data produced for a single `<lvgl>` element.
 * Pages and top-level widgets are kept separate because pages have distinct
 * semantics (router targets) even though they share the widget shape.
 */
export interface IRUIRegistry {
  readonly kind: 'ui_registry';
  /** Ref token of the originating `<lvgl>` element. Used to correlate overlays, actions, and displays. */
  readonly lvgl: string;
  /** Top-level lvgl section config (camelCase) — all values are typed `IRValue` nodes. */
  readonly config: Record<string, IRValue>;
  /** `<lvgl-page>` subtrees. */
  readonly pages: IRWidget[];
  /** Non-page top-level widgets. */
  readonly widgets: IRWidget[];
  /** Overlay subtrees grouped by zOrder, ascending. */
  readonly overlays: IROverlayTier[];
  /** Declarative style transitions — lowered to C++ `lv_style_transition_dsc_t` structs. */
  readonly styleTransitions: IRStyleTransition[];
  /** Animated binding transitions — lowered to C++ `lv_anim_t` in binding Effect closures. */
  readonly animateTransitions: IRAnimateTransition[];
}

// ────────────────────────────────────────────────────────────────────────────
// Semantic IR root
// ────────────────────────────────────────────────────────────────────────────

/**
 * The complete semantic IR for a device project.
 *
 * This is the central contract between the compiler frontend (TSX → IR) and
 * target backends (esphome-target). Backends consume a
 * SemanticIR and produce target-specific output (YAML + C++ headers).
 *
 * The tree has seven flat top-level children — no intermediate grouping.
 * Branded-array registries (sections, entities, components, scripts, themes)
 * are directly iterable and carry a `.kind` discriminator.
 */
export interface SemanticIR {
  readonly kind: 'semantic_ir';

  /** Top-level config sections (esphome:, wifi:, sensor:, etc.) */
  sections: IRSectionRegistry;

  /** HA entities for auto-generated sensor imports */
  entities: IREntityRegistry;

  /** Component definitions (images, fonts, globals) with resolved configs */
  components: IRComponentRegistry;

  /** Named script definitions from useScript() */
  scripts: IRScriptRegistry;

  /** Theme scope data from the theme registry */
  themes: IRThemeRegistry;

  /** Reactive bindings, memos, and effects */
  reactives: IRReactiveRegistry;

  /** UI widget trees — one per `<lvgl>` element. Empty array when no `<lvgl>` is present. */
  uis: IRUIRegistry[];
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
  | IRTriggerVar
  | IRType;

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
  /** Variable name → resolved ref token string for resolving ref references in actions. */
  refBindings?: Record<string, string>;
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
  if (!refBindings) return { kind: 'action', actions };
  const resolved: Record<string, string> = {};
  for (const [k, v] of Object.entries(refBindings)) {
    if (v != null) resolved[k] = String(v);
  }
  return { kind: 'action', actions, ...(Object.keys(resolved).length > 0 ? { refBindings: resolved } : {}) };
}

export function irSecret(key: string): IRSecret {
  return { kind: 'secret', key };
}

export function irTriggerVar(name: string): IRTriggerVar {
  return { kind: 'trigger_var', name };
}

export function irType(type: IRScalarType, opts?: { format?: IRScalarFormat; isArray?: boolean }): IRType {
  return { kind: 'type', type, ...(opts?.format ? { format: opts.format } : {}), ...(opts?.isArray ? { isArray: true } : {}) };
}

// ── Well-known IRType constants ─────────────────────────────────────────────

/** `int` scalar */
export const IR_INT = { kind: 'type', type: 'int' } as const satisfies IRType;
/** `float` scalar */
export const IR_FLOAT = { kind: 'type', type: 'float' } as const satisfies IRType;
/** `bool` scalar */
export const IR_BOOL = { kind: 'type', type: 'bool' } as const satisfies IRType;
/** `string` scalar */
export const IR_STRING = { kind: 'type', type: 'string' } as const satisfies IRType;

/** `int` array */
export const IR_INT_ARRAY = { kind: 'type', type: 'int', isArray: true } as const satisfies IRType;
/** `float` array */
export const IR_FLOAT_ARRAY = { kind: 'type', type: 'float', isArray: true } as const satisfies IRType;
/** `bool` array */
export const IR_BOOL_ARRAY = { kind: 'type', type: 'bool', isArray: true } as const satisfies IRType;
/** `string` array */
export const IR_STRING_ARRAY = { kind: 'type', type: 'string', isArray: true } as const satisfies IRType;

/** `int` with `id_ref` format — ESPHome component/widget ID reference */
export const IR_ID_REF = { kind: 'type', type: 'int', format: 'id_ref' } as const satisfies IRType;
/** `string` with `entity` format — Home Assistant entity ID */
export const IR_ENTITY = { kind: 'type', type: 'string', format: 'entity' } as const satisfies IRType;

