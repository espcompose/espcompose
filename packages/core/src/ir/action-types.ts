// ────────────────────────────────────────────────────────────────────────────
// Action IR Types — Target-agnostic action representation
//
// These types represent the semantic intent of user-written trigger handlers
// and callbacks. They describe WHAT actions to perform, not HOW to perform
// them. The lowering to target-specific formats (ESPHome YAML)
// happens in the respective target packages.
// ────────────────────────────────────────────────────────────────────────────

import type { IRExprNode } from './expr-types.js';
import type { IRScriptParamRef, IRValueType } from './types.js';

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
export type IRRefSlot =
  | { kind: 'bare'; bindingName: string }
  | { kind: 'object'; key: string; bindingName: string };

/** A component-specific action (light.toggle, switch.turn_on, fan.turn_off, etc.) */
export interface IRNativeAction {
  kind: 'native';
  /** Action key, e.g. 'light.toggle', 'switch.turn_on' */
  actionKey: string;
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
  refSlots?: IRRefSlot[];
}

/** A Home Assistant service call */
export interface IRHAServiceAction {
  kind: 'ha_service';
  /** Fully qualified HA action name, e.g. 'light.turn_on' */
  action: string;
  /** Optional data payload for the service call */
  data?: Record<string, IRActionParam>;
}

/** logger.log action */
export interface IRLoggerAction {
  kind: 'logger';
  message: string;
  level?: string;
}

/** delay action */
export interface IRDelayAction {
  kind: 'delay';
  /**
   * Duration — either a literal string (e.g. '500ms', '1s', '2min') or an
   * `IRScriptParamRef` referencing a closure-captured scalar.
   */
  duration: string | IRScriptParamRef;
}

/** wait_until action */
export interface IRWaitUntilAction {
  kind: 'wait_until';
  condition: IRCondition;
  /** Optional timeout string, e.g. '10s' */
  timeout?: string;
}

/** if/else action */
export interface IRIfAction {
  kind: 'if';
  condition: IRCondition;
  then: IRActionNode[];
  else?: IRActionNode[];
}

/** while loop action */
export interface IRWhileAction {
  kind: 'while';
  condition: IRCondition;
  then: IRActionNode[];
}

/** repeat action */
export interface IRRepeatAction {
  kind: 'repeat';
  count: number;
  then: IRActionNode[];
}

/** script.execute action */
export interface IRScriptExecute {
  kind: 'script_execute';
  scriptId: string;
  /** User-provided arguments (from the call site). */
  userArgs?: Record<string, IRActionParam>;
  /**
   * Index into the script's `closureTable` row that supplies this call site's
   * captured values. The `closure_index` script parameter receives this number.
   */
  closureIndex?: number;
}

/** script.wait action */
export interface IRScriptWait {
  kind: 'script_wait';
  scriptId: string;
}

/** script.stop action */
export interface IRScriptStop {
  kind: 'script_stop';
  scriptId: string;
}

/** Theme selection action */
export interface IRThemeSelect {
  kind: 'theme_select';
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
export interface IRGlobalSet {
  kind: 'global_set';
  /** Auto-generated ESPHome global ID. */
  globalId: string;
  /** Target-agnostic value type of the global. */
  valueType: IRValueType;
  /** Value to set — literal, trigger var, or compiled expression. */
  value: IRActionParam | IRExprNode;
}

/** Array element set: handle.set(index, value) → vec[i] = val */
export interface IRArraySet {
  kind: 'array_set';
  globalId: string;
  valueType: IRValueType;
  index: IRActionParam | IRExprNode;
  value: IRActionParam | IRExprNode;
}

/** Array push: handle.push(value) → vec.push_back(val) */
export interface IRArrayPush {
  kind: 'array_push';
  globalId: string;
  valueType: IRValueType;
  value: IRActionParam | IRExprNode;
}

/** Array clear: handle.clear() → vec.clear() */
export interface IRArrayClear {
  kind: 'array_clear';
  globalId: string;
  valueType: IRValueType;
}

/** Overlay show action — sets the mux index and shows the shared overlay. */
export interface IROverlayShow {
  kind: 'overlay_show';
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
  /**
   * Controller variable name — when present, templateKey, instanceIndex,
   * and zOrder are resolved at runtime from __refBindings[controllerRef].
   */
  controllerRef?: string;
}

/** Overlay hide action — hides the shared overlay (not muxed). */
export interface IROverlayHide {
  kind: 'overlay_hide';
  /** Template key identifying the shared overlay definition. */
  templateKey: string;
  /** Z-order tier (carried for naming consistency). */
  zOrder: number;
  /**
   * Controller variable name — when present, templateKey is resolved at
   * runtime from __refBindings[controllerRef].__templateKey.
   */
  controllerRef?: string;
}

/** A single interpolation slot inside a lambda tagged template. */
export type IRLambdaSlot =
  | { kind: 'ref'; name: string }                         // → id(<resolved_ref_token>)
  | { kind: 'global'; id: string }                        // → id(<global_id>)
  | { kind: 'trigger_var'; varName: string }               // → raw C++ variable name
  | { kind: 'script_param'; name: string }                 // → raw C++ script parameter name
  | { kind: 'literal'; value: string | number | boolean }; // → literal C++ value

/** Inline C++ lambda action — emitted as a !lambda block in YAML. */
export interface IRLambdaAction {
  kind: 'lambda_action';
  /** Static string fragments from the tagged template (N+1 entries for N slots). */
  fragments: string[];
  /** Typed interpolation slots — interleaved with fragments to reconstruct C++ code. */
  slots: IRLambdaSlot[];
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
  | IRScriptExecute
  | IRScriptWait
  | IRScriptStop
  | IRThemeSelect
  | IRGlobalSet
  | IRArraySet
  | IRArrayPush
  | IRArrayClear
  | IRLambdaAction
  | IROverlayShow
  | IROverlayHide
  | IRControllerMethodCall;

// ── Condition Types ────────────────────────────────────────────────────────

/** A lambda condition — compiled from a boolean expression to IRExprNode IR */
export interface IRLambdaCondition {
  kind: 'lambda_condition';
  /** Target-agnostic expression IR for the condition */
  exprIR: IRExprNode;
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

/** A literal value — emitted directly */
export interface IRLiteralParam {
  kind: 'literal';
  value: string | number | boolean;
}

/** A trigger variable reference */
export interface IRTriggerVarParam {
  kind: 'trigger_var';
  varName: string;
}

/** A runtime expression — resolved at execution time */
export interface IRExpressionParam {
  kind: 'expression';
  /** The expression text, e.g. 'entity.__entityId__' */
  jsExpression: string;
}

/** A reactive IR expression — lowered to C++ via exprToCpp at codegen time */
export interface IRReactiveExprParam {
  kind: 'reactive_expr';
  exprIR: IRExprNode;
}

export type IRActionParam =
  | IRLiteralParam
  | IRTriggerVarParam
  | IRExpressionParam
  | IRReactiveExprParam;

/**
 * A nested object value inside an action config — used for actions like
 * `lvgl.widget.update` whose params include sub-part dictionaries
 * (e.g. `knob: { padding: 8 }`).  Recursive: nested dicts can themselves
 * contain primitives, params, or further nested dicts.
 */
export interface IRActionConfigDict {
  kind: 'config_dict';
  entries: Record<string, IRActionConfigValue>;
}

export type IRActionConfigValue =
  | IRActionParam
  | IRActionConfigDict
  | string
  | number
  | boolean;

/** Config for native actions — either a simple ID or an object with params */
export type IRActionConfig =
  | string
  | Record<string, IRActionConfigValue>;

// ── Constructors ───────────────────────────────────────────────────────────

export function irNativeAction(actionKey: string, config: IRActionConfig, refSlots?: IRRefSlot[]): IRNativeAction {
  return { kind: 'native', actionKey, config, ...(refSlots && refSlots.length > 0 ? { refSlots } : {}) };
}

export function irHAServiceAction(action: string, data?: Record<string, IRActionParam>): IRHAServiceAction {
  return { kind: 'ha_service', action, ...(data ? { data } : {}) };
}

export function irLoggerAction(message: string, level?: string): IRLoggerAction {
  return { kind: 'logger', message, ...(level ? { level } : {}) };
}

export function irDelayAction(duration: string | IRScriptParamRef): IRDelayAction {
  return { kind: 'delay', duration };
}

export function irWaitUntilAction(condition: IRCondition, timeout?: string): IRWaitUntilAction {
  return { kind: 'wait_until', condition, ...(timeout ? { timeout } : {}) };
}

export function irIfAction(condition: IRCondition, then: IRActionNode[], elseActions?: IRActionNode[]): IRIfAction {
  return { kind: 'if', condition, then, ...(elseActions ? { else: elseActions } : {}) };
}

export function irWhileAction(condition: IRCondition, then: IRActionNode[]): IRWhileAction {
  return { kind: 'while', condition, then };
}

export function irRepeatAction(count: number, then: IRActionNode[]): IRRepeatAction {
  return { kind: 'repeat', count, then };
}

export function irScriptExecute(
  scriptId: string,
  args?: {
    userArgs?: Record<string, IRActionParam>;
    closureIndex?: number;
  },
): IRScriptExecute {
  return {
    kind: 'script_execute',
    scriptId,
    ...(args?.userArgs ? { userArgs: args.userArgs } : {}),
    ...(args?.closureIndex !== undefined ? { closureIndex: args.closureIndex } : {}),
  };
}

export function irScriptWait(scriptId: string): IRScriptWait {
  return { kind: 'script_wait', scriptId };
}

export function irScriptStop(scriptId: string): IRScriptStop {
  return { kind: 'script_stop', scriptId };
}

export function irThemeSelect(scope: string, scopeId: string, themeName: string): IRThemeSelect {
  return { kind: 'theme_select', scope, scopeId, themeName };
}

export function irGlobalSet(globalId: string, valueType: IRValueType, value: IRActionParam | IRExprNode): IRGlobalSet {
  return { kind: 'global_set', globalId, valueType, value };
}

export function irArraySet(globalId: string, valueType: IRValueType, index: IRActionParam | IRExprNode, value: IRActionParam | IRExprNode): IRArraySet {
  return { kind: 'array_set', globalId, valueType, index, value };
}

export function irArrayPush(globalId: string, valueType: IRValueType, value: IRActionParam | IRExprNode): IRArrayPush {
  return { kind: 'array_push', globalId, valueType, value };
}

export function irArrayClear(globalId: string, valueType: IRValueType): IRArrayClear {
  return { kind: 'array_clear', globalId, valueType };
}

export function irLambdaCondition(exprIR: IRExprNode): IRLambdaCondition {
  return { kind: 'lambda_condition', exprIR };
}

export function irLambdaAction(fragments: string[], slots: IRLambdaSlot[]): IRLambdaAction {
  return { kind: 'lambda_action', fragments, slots };
}

export function irOverlayShow(templateKey: string, instanceIndex: number | IRScriptParamRef, zOrder: number, controllerRef?: string): IROverlayShow {
  return { kind: 'overlay_show', templateKey, instanceIndex, zOrder, ...(controllerRef ? { controllerRef } : {}) };
}

export function irOverlayHide(templateKey: string, zOrder: number, controllerRef?: string): IROverlayHide {
  return { kind: 'overlay_hide', templateKey, zOrder, ...(controllerRef ? { controllerRef } : {}) };
}

// ── Controller Method Call ─────────────────────────────────────────────────

/** Generic controller method call — resolved to script_execute at serialization. */
export interface IRControllerMethodCall {
  kind: 'controller_method_call';
  /** Controller variable name — resolved from __refBindings at serialization. */
  controllerRef: string;
  /** Method name on the controller (e.g. 'show', 'hide'). */
  methodName: string;
}

export function irControllerMethodCall(controllerRef: string, methodName: string): IRControllerMethodCall {
  return { kind: 'controller_method_call', controllerRef, methodName };
}

