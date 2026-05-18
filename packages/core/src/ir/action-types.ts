// ────────────────────────────────────────────────────────────────────────────
// Action IR Types — Target-agnostic action representation
//
// These types represent the semantic intent of user-written trigger handlers
// and callbacks. They describe WHAT actions to perform, not HOW to perform
// them. The lowering to target-specific formats (ESPHome YAML)
// happens in the respective target packages.
// ────────────────────────────────────────────────────────────────────────────

import type { IRExpression } from './expr-types.js';
import type { IRType } from './types.js';

// ── Script param reference ─────────────────────────────────────────────────

/**
 * Reference to a script parameter inside the script body.
 * Used in place of a literal value when the value is supplied per call-site.
 */
export interface IRScriptParamRef {
  readonly kind: 'script_param';
  /** The parameter name — must match an entry in the script's parameter list. */
  name: string;
}

// ── Action Nodes ───────────────────────────────────────────────────────────

/**
 * Side-channel: identifies a config slot whose value is a ref binding name.
 *
 * Native actions resolve ref values to the underlying ESPHome ID token at
 * compile time, losing the binding-name context the lowering pass needs to
 * detect closure-bound refs and rewrite to lambda actions. This side-channel
 * preserves the original binding name alongside the resolved config so the
 * native→lambda rewrite can correlate config positions back to
 * their originating bindings.
 *
 * Two variants:
 *   - `bare`: the action's config IS the bare string
 *     (e.g. `light.toggle: r_x`).
 *   - `object`: a key inside an object config
 *     (e.g. `light.turn_on: { id: r_x, brightness: 0.5 }` → key: 'id').
 *
 * `bindingName` is the user-facing variable name of the ref (e.g. `light`),
 * matched against `IRScript.closureShape.fields[].name` at lowering time.
 */
export type IRRefAnnotation =
  | { kind: 'bare'; bindingName: string }
  | { kind: 'object'; key: string; bindingName: string };

/** A component-specific action (light.toggle, switch.turn_on, fan.turn_off, etc.) */
export interface IRNativeAction {
  kind: 'action:native';
  /**
   * Semantic component domain (e.g. 'light', 'switch', 'fan', 'lvgl').
   * Target maps `(domain, operation)` to its native action path at lowering.
   */
  domain: string;
  /**
   * Semantic operation verb (e.g. 'toggle', 'turn_on', 'widget.update').
   * May contain dots for nested operation paths.
   */
  operation: string;
  /** Action config — may be a scalar ID string, or an object with params */
  config: IRActionConfig;
  /**
   * Optional side-channel describing which config positions hold ref-binding
   * names. Populated by the action compiler for any native action whose `id:`
   * slot (or other ref-typed param) was bound from a script-scope ref.
   *
   * Used at lowering time to detect closure-bound refs and trigger native→lambda
   * rewrite. Empty/absent means no rewrite is possible (action treats config as
   * literal data).
   */
  refSlots?: IRRefAnnotation[];
}

/** A Home Assistant service call */
export interface IRHAServiceAction {
  kind: 'action:ha_service';
  /** Fully qualified HA action name, e.g. 'light.turn_on' */
  action: string;
  /** Optional data payload for the service call */
  data?: Record<string, IRExpression>;
}

/** logger.log action */
export interface IRLoggerAction {
  kind: 'action:logger';
  message: string;
  level?: string;
}

/** Semantic time unit for durations and timeouts. */
export type IRDurationUnit = 'ms' | 's' | 'min' | 'h';

/** Literal duration value with explicit unit (target formats to YAML string). */
export interface IRDurationLiteral {
  kind: 'duration';
  value: number;
  unit: IRDurationUnit;
}

/** Duration — literal value+unit or a closure-captured scalar parameter. */
export type IRDuration = IRDurationLiteral | IRScriptParamRef;

/** Sentinel for an indefinite/never-firing timeout. */
export interface IRTimeoutNever { kind: 'never'; }

/** Timeout — a duration or the `never` sentinel. */
export type IRTimeout = IRDuration | IRTimeoutNever;

/** delay action */
export interface IRDelayAction {
  kind: 'action:delay';
  /**
   * Duration — either a literal value+unit or an `IRScriptParamRef`
   * referencing a closure-captured scalar.
   */
  duration: IRDuration;
}

/** wait_until action */
export interface IRWaitUntilAction {
  kind: 'action:wait_until';
  condition: IRCondition;
  /** Optional timeout — duration or `never` sentinel. */
  timeout?: IRTimeout;
}

/** if/else action */
export interface IRIfAction {
  kind: 'action:if';
  condition: IRCondition;
  then: IRActionNode[];
  else?: IRActionNode[];
}

/** while loop action */
export interface IRWhileAction {
  kind: 'action:while';
  condition: IRCondition;
  then: IRActionNode[];
}

/** repeat action */
export interface IRRepeatAction {
  kind: 'action:repeat';
  count: number;
  then: IRActionNode[];
}

/** script.execute action */
export interface IRScriptExecuteAction {
  kind: 'action:script_execute';
  scriptId: string;
  /** User-provided arguments (from the call site). */
  userArgs?: Record<string, IRExpression>;
  /**
   * Index into the script's `closureTable` row that supplies this call site's
   * captured values. The `closure_index` script parameter receives this number.
   */
  closureIndex?: number;
}

/** script.wait action */
export interface IRScriptWaitAction {
  kind: 'action:script_wait';
  scriptId: string;
}

/** script.stop action */
export interface IRScriptStopAction {
  kind: 'action:script_stop';
  scriptId: string;
}

/** Theme selection action */
export interface IRThemeSelectAction {
  kind: 'action:theme_select';
  /** Human-readable scope name (e.g. 'espcompose:ui'). */
  scope: string;
  /** 8-char hex hash of the scope — C++ identifier fragment. */
  scopeId: string;
  themeName: string;
}

/**
 * Global variable set action.
 *
 * The compiler always emits this kind for globalHandle.set() calls.
 * The ESPHome target lowerer decides at emit time whether to generate
 * a BoundSignal write (if the global has reactive dependents) or a
 * plain globals.set: YAML action (if non-reactive).
 */
export interface IRGlobalSetAction {
  kind: 'action:global_set';
  /** Auto-generated ESPHome global ID. */
  globalId: string;
  /** Target-agnostic type descriptor of the global. */
  irType: IRType;
  /** Value to set — IR expression (literal, trigger var, or compiled). */
  value: IRExpression;
}

/** Array element set: handle.set(index, value) → vec[i] = val */
export interface IRArraySetAction {
  kind: 'action:array_set';
  globalId: string;
  irType: IRType;
  index: IRExpression;
  value: IRExpression;
}

/** Array push: handle.push(value) → vec.push_back(val) */
export interface IRArrayPushAction {
  kind: 'action:array_push';
  globalId: string;
  irType: IRType;
  value: IRExpression;
}

/** Array clear: handle.clear() → vec.clear() */
export interface IRArrayClearAction {
  kind: 'action:array_clear';
  globalId: string;
  irType: IRType;
}

/** Overlay show action — sets the mux index and shows the shared overlay. */
export interface IROverlayShowAction {
  kind: 'action:overlay_show';
  /** Template key identifying the shared overlay definition. */
  templateKey: string;
  /**
   * This instance's mux index (written to the mux signal on show).
   * When inside a parameterized script, this may be an IRScriptParamRef
   * that resolves to the parameter's C++ identifier at lowering time.
   */
  instanceIndex: number | IRScriptParamRef;
  /** Z-order tier for deterministic stacking in top_layer. */
  zOrder: number;
  /** Deterministic tier key (e.g. 'tier_abc123'). Used for tier wrapper show/hide. */
  tierKey: string;
  /**
   * Controller variable name — when present, templateKey, instanceIndex,
   * and zOrder are resolved at runtime from __refBindings[controllerRef].
   */
  controllerRef?: string;
}

/** Overlay hide action — hides the shared overlay (not muxed). */
export interface IROverlayHideAction {
  kind: 'action:overlay_hide';
  /** Template key identifying the shared overlay definition. */
  templateKey: string;
  /** Z-order tier (carried for naming consistency). */
  zOrder: number;
  /** Deterministic tier key (e.g. 'tier_abc123'). Used for tier wrapper show/hide. */
  tierKey: string;
  /**
   * Controller variable name — when present, templateKey is resolved at
   * runtime from __refBindings[controllerRef][OVERLAY_TEMPLATE_KEY].
   */
  controllerRef?: string;
}

/** A single interpolation inside a lambda tagged template. */
export type IRLambdaInterpolation =
  | { kind: 'interp:ref'; name: string }                         // → id(<resolved_ref_token>)
  | { kind: 'interp:global'; id: string }                        // → id(<global_id>)
  | { kind: 'interp:trigger_var'; varName: string }              // → raw C++ variable name
  | { kind: 'interp:script_param'; name: string }                // → raw C++ script parameter name
  | { kind: 'interp:literal'; value: string | number | boolean };// → literal C++ value

/** Inline C++ lambda action — emitted as a !lambda block in YAML. */
export interface IRLambdaAction {
  kind: 'action:lambda_action';
  /** Static string fragments from the tagged template (N+1 entries for N slots). */
  fragments: string[];
  /** Typed interpolations — interleaved with fragments to reconstruct C++ code. */
  slots: IRLambdaInterpolation[];
}

// ── Discriminated Union ────────────────────────────────────────────────────

export type IRActionNode =
  | IRNativeAction
  | IRHAServiceAction
  | IRLoggerAction
  | IRDelayAction
  | IRWaitUntilAction
  | IRIfAction
  | IRWhileAction
  | IRRepeatAction
  | IRScriptExecuteAction
  | IRScriptWaitAction
  | IRScriptStopAction
  | IRThemeSelectAction
  | IRGlobalSetAction
  | IRArraySetAction
  | IRArrayPushAction
  | IRArrayClearAction
  | IRLambdaAction
  | IROverlayShowAction
  | IROverlayHideAction
  | IRControllerMethodCallAction
  | IRAnimateAction;

// ── Condition Types ────────────────────────────────────────────────────────

/** A lambda condition — compiled from a boolean expression to IRExpression IR */
export interface IRLambdaCondition {
  kind: 'lambda_condition';
  /** Target-agnostic expression IR for the condition */
  exprIR: IRExpression;
}

/** A native condition (e.g. binary_sensor.is_on) */
export interface IRNativeCondition {
  kind: 'native';
  /** Condition key, e.g. 'binary_sensor.is_on' */
  conditionKey: string;
  config: IRActionConfig;
}

export type IRCondition =
  | IRLambdaCondition
  | IRNativeCondition;

// ── Action Parameter Types ─────────────────────────────────────────────────

/**
 * A nested object value inside an action config — used for actions like
 * `lvgl.widget.update` whose params include sub-part dictionaries
 * (e.g. `knob: { padding: 8 }`).  Recursive: nested dicts can themselves
 * contain primitives, IRExpressions, or further nested dicts.
 */
export interface IRActionConfigDict {
  kind: 'config_dict';
  entries: Record<string, IRActionConfigValue>;
}

export type IRActionConfigValue =
  | IRExpression
  | IRActionConfigDict
  | string
  | number
  | boolean;

/** Config for native actions — either a simple ID or an object with params */
export type IRActionConfig =
  | string
  | Record<string, IRActionConfigValue>;

// ── Constructors ───────────────────────────────────────────────────────────

export function irNativeAction(domain: string, operation: string, config: IRActionConfig, refSlots?: IRRefAnnotation[]): IRNativeAction {
  return { kind: 'action:native', domain, operation, config, ...(refSlots && refSlots.length > 0 ? { refSlots } : {}) };
}

/**
 * Split a dotted action key string (e.g. 'light.toggle', 'lvgl.widget.update')
 * into `{ domain, operation }`. Splits at the first dot; operation may
 * contain further dots (e.g. 'widget.update' for the 'lvgl' domain).
 * Throws if the key has no dot — every native action must be domain-qualified.
 */
export function splitActionKey(key: string): { domain: string; operation: string } {
  const i = key.indexOf('.');
  if (i < 0) {
    throw new Error(`[espcompose] Action key '${key}' has no domain prefix; expected '<domain>.<operation>'.`);
  }
  return { domain: key.slice(0, i), operation: key.slice(i + 1) };
}

/**
 * Parse a duration string written by users (`'500ms'`, `'1s'`, `'2min'`,
 * `'1h'`) into a structured `IRDurationLiteral`. Returns `null` if the
 * string is not a recognized duration.
 */
export function parseDurationString(s: string): IRDurationLiteral | null {
  const m = /^(\d+(?:\.\d+)?)(ms|s|min|h)$/.exec(s);
  if (!m) return null;
  return { kind: 'duration', value: Number(m[1]), unit: m[2] as IRDurationUnit };
}

/**
 * Parse a timeout string — like `parseDurationString` but also accepts the
 * special sentinel `'never'`. Returns `null` if unrecognized.
 */
export function parseTimeoutString(s: string): IRTimeout | null {
  if (s === 'never') return { kind: 'never' };
  return parseDurationString(s);
}

export function irHAServiceAction(action: string, data?: Record<string, IRExpression>): IRHAServiceAction {
  return { kind: 'action:ha_service', action, ...(data ? { data } : {}) };
}

export function irLoggerAction(message: string, level?: string): IRLoggerAction {
  return { kind: 'action:logger', message, ...(level ? { level } : {}) };
}

export function irDelayAction(duration: IRDuration): IRDelayAction {
  return { kind: 'action:delay', duration };
}

export function irWaitUntilAction(condition: IRCondition, timeout?: IRTimeout): IRWaitUntilAction {
  return { kind: 'action:wait_until', condition, ...(timeout ? { timeout } : {}) };
}

export function irIfAction(condition: IRCondition, then: IRActionNode[], elseActions?: IRActionNode[]): IRIfAction {
  return { kind: 'action:if', condition, then, ...(elseActions ? { else: elseActions } : {}) };
}

export function irWhileAction(condition: IRCondition, then: IRActionNode[]): IRWhileAction {
  return { kind: 'action:while', condition, then };
}

export function irRepeatAction(count: number, then: IRActionNode[]): IRRepeatAction {
  return { kind: 'action:repeat', count, then };
}

export function irScriptExecute(
  scriptId: string,
  args?: {
    userArgs?: Record<string, IRExpression>;
    closureIndex?: number;
  },
): IRScriptExecuteAction {
  return {
    kind: 'action:script_execute',
    scriptId,
    ...(args?.userArgs ? { userArgs: args.userArgs } : {}),
    ...(args?.closureIndex !== undefined ? { closureIndex: args.closureIndex } : {}),
  };
}

export function irScriptWait(scriptId: string): IRScriptWaitAction {
  return { kind: 'action:script_wait', scriptId };
}

export function irScriptStop(scriptId: string): IRScriptStopAction {
  return { kind: 'action:script_stop', scriptId };
}

export function irThemeSelect(scope: string, scopeId: string, themeName: string): IRThemeSelectAction {
  return { kind: 'action:theme_select', scope, scopeId, themeName };
}

export function irGlobalSet(globalId: string, irType: IRType, value: IRExpression): IRGlobalSetAction {
  return { kind: 'action:global_set', globalId, irType, value };
}

export function irArraySet(globalId: string, irType: IRType, index: IRExpression, value: IRExpression): IRArraySetAction {
  return { kind: 'action:array_set', globalId, irType, index, value };
}

export function irArrayPush(globalId: string, irType: IRType, value: IRExpression): IRArrayPushAction {
  return { kind: 'action:array_push', globalId, irType, value };
}

export function irArrayClear(globalId: string, irType: IRType): IRArrayClearAction {
  return { kind: 'action:array_clear', globalId, irType };
}

export function irLambdaCondition(exprIR: IRExpression): IRLambdaCondition {
  return { kind: 'lambda_condition', exprIR };
}

export function irLambdaAction(fragments: string[], slots: IRLambdaInterpolation[]): IRLambdaAction {
  return { kind: 'action:lambda_action', fragments, slots };
}

export function irOverlayShow(templateKey: string, instanceIndex: number | IRScriptParamRef, zOrder: number, tierKey: string, controllerRef?: string): IROverlayShowAction {
  return { kind: 'action:overlay_show', templateKey, instanceIndex, zOrder, tierKey, ...(controllerRef ? { controllerRef } : {}) };
}

export function irOverlayHide(templateKey: string, zOrder: number, tierKey: string, controllerRef?: string): IROverlayHideAction {
  return { kind: 'action:overlay_hide', templateKey, zOrder, tierKey, ...(controllerRef ? { controllerRef } : {}) };
}

// ── Controller Method Call ─────────────────────────────────────────────────

/** Generic controller method call — resolved to script_execute at serialization. */
export interface IRControllerMethodCallAction {
  kind: 'action:controller_method_call';
  /** Controller variable name — resolved from __refBindings at serialization. */
  controllerRef: string;
  /** Method name on the controller (e.g. 'show', 'hide'). */
  methodName: string;
  /** Named arguments passed to the method (e.g. parameterized show). */
  args?: Record<string, IRExpression>;
}

export function irControllerMethodCall(controllerRef: string, methodName: string, args?: Record<string, IRExpression>): IRControllerMethodCallAction {
  return { kind: 'action:controller_method_call', controllerRef, methodName, ...(args && { args }) };
}

// ── Animate Action (async property animation) ─────────────────────────────

/** Async widget property animation — awaitable in scripts. */
export interface IRAnimateAction {
  kind: 'action:animate';
  /** Ref binding name for the target widget. */
  targetRef: string;
  /** Style property in LVGL snake_case form (e.g. 'translate_y', 'opa'). */
  styleProp: string;
  /** Start value (integer). */
  from: number;
  /** End value (integer). */
  to: number;
  /** Duration in milliseconds. */
  durationMs: number;
  /** Easing key (e.g. 'ease_out', 'linear'). */
  easing: string;
  /** LVGL part name (e.g. 'indicator', 'knob'). Omit for 'main'. */
  part?: string;
  /** LVGL state name (e.g. 'pressed', 'disabled'). Omit for 'default'. */
  state?: string;
  /** Start delay in milliseconds. */
  delayMs?: number;
}

export function irAnimateAction(
  targetRef: string,
  styleProp: string,
  from: number,
  to: number,
  durationMs: number,
  easing: string,
  part?: string,
  state?: string,
  delayMs?: number,
): IRAnimateAction {
  return {
    kind: 'action:animate',
    targetRef,
    styleProp,
    from,
    to,
    durationMs,
    easing,
    ...(part ? { part } : {}),
    ...(state ? { state } : {}),
    ...(delayMs ? { delayMs } : {}),
  };
}

