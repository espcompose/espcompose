// ────────────────────────────────────────────────────────────────────────────
// IR Action Tree
//
// Typed intermediate representation for ESPHome action sequences. Every
// user-visible TS statement in a trigger handler compiles to one of these
// nodes. The lowering pass converts the tree to plain config objects that
// the YAML emitter can serialize directly.
//
// Lambdas appear ONLY as:
//   1. Condition expressions (if/while/wait_until) — compiler-internal
//   2. Reactive plumbing (theme.select, signal wiring) — compiler-internal
//   3. Templatable params with trigger variables — compiler-internal
//
// There is NO user-facing lambda action.
// ────────────────────────────────────────────────────────────────────────────

import { createLambdaScalar } from '@esphome/compose';

// ── Action Nodes ───────────────────────────────────────────────────────────

/** A component-specific action (light.toggle, switch.turn_on, fan.turn_off, etc.) */
export interface IRNativeAction {
  kind: 'native';
  /** ESPHome action key, e.g. 'light.toggle', 'switch.turn_on' */
  actionKey: string;
  /** Action config — may be a scalar ID string, or an object with params */
  config: IRActionConfig;
}

/** A Home Assistant service call via homeassistant.action */
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

/** delay: Nms */
export interface IRDelayAction {
  kind: 'delay';
  /** Duration string, e.g. '500ms', '1s', '2min' */
  duration: string;
}

/** wait_until: { condition, timeout? } */
export interface IRWaitUntilAction {
  kind: 'wait_until';
  condition: IRCondition;
  /** Optional timeout string, e.g. '10s' */
  timeout?: string;
}

/** if: { condition, then, else? } */
export interface IRIfAction {
  kind: 'if';
  condition: IRCondition;
  then: IRAction[];
  else?: IRAction[];
}

/** while: { condition, then } */
export interface IRWhileAction {
  kind: 'while';
  condition: IRCondition;
  then: IRAction[];
}

/** repeat: { count, then } */
export interface IRRepeatAction {
  kind: 'repeat';
  count: number;
  then: IRAction[];
}

/** script.execute: id */
export interface IRScriptExecute {
  kind: 'script_execute';
  scriptId: string;
}

/** script.wait: id */
export interface IRScriptWait {
  kind: 'script_wait';
  scriptId: string;
}

/** script.stop: id */
export interface IRScriptStop {
  kind: 'script_stop';
  scriptId: string;
}

/**
 * Compiler-internal lambda action.
 * Used ONLY for reactive plumbing (theme.select, signal wiring).
 * Never user-facing.
 */
export interface IRInternalLambda {
  kind: 'internal_lambda';
  code: string;
}

// ── Discriminated Union ────────────────────────────────────────────────────

export type IRAction =
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
  | IRInternalLambda;

// ── Condition Types ────────────────────────────────────────────────────────

/** A C++ lambda condition — compiled from a TS boolean expression */
export interface IRLambdaCondition {
  kind: 'lambda';
  /** C++ expression that evaluates to bool, e.g. 'id(sensor).state > 30' */
  expression: string;
}

/** A native ESPHome condition (future extension) */
export interface IRNativeCondition {
  kind: 'native';
  /** ESPHome condition key, e.g. 'binary_sensor.is_on' */
  conditionKey: string;
  config: IRActionConfig;
}

export type IRCondition =
  | IRLambdaCondition
  | IRNativeCondition;

// ── Action Parameter Types ─────────────────────────────────────────────────

/** A literal value — emitted directly as YAML scalar */
export interface IRLiteralParam {
  kind: 'literal';
  value: string | number | boolean;
}

/** A trigger variable reference — emitted as !lambda 'return <varName>;' */
export interface IRTriggerVarParam {
  kind: 'trigger_var';
  varName: string;
}

export type IRActionParam =
  | IRLiteralParam
  | IRTriggerVarParam;

/** Config for native actions — either a simple ID or an object with params */
export type IRActionConfig =
  | string
  | Record<string, IRActionParam | string | number | boolean>;

// ── Constructors ───────────────────────────────────────────────────────────

export function irNativeAction(actionKey: string, config: IRActionConfig): IRNativeAction {
  return { kind: 'native', actionKey, config };
}

export function irHAServiceAction(action: string, data?: Record<string, IRActionParam>): IRHAServiceAction {
  return { kind: 'ha_service', action, ...(data ? { data } : {}) };
}

export function irLoggerAction(message: string, level?: string): IRLoggerAction {
  return { kind: 'logger', message, ...(level ? { level } : {}) };
}

export function irDelayAction(duration: string): IRDelayAction {
  return { kind: 'delay', duration };
}

export function irWaitUntilAction(condition: IRCondition, timeout?: string): IRWaitUntilAction {
  return { kind: 'wait_until', condition, ...(timeout ? { timeout } : {}) };
}

export function irIfAction(condition: IRCondition, then: IRAction[], elseActions?: IRAction[]): IRIfAction {
  return { kind: 'if', condition, then, ...(elseActions ? { else: elseActions } : {}) };
}

export function irWhileAction(condition: IRCondition, then: IRAction[]): IRWhileAction {
  return { kind: 'while', condition, then };
}

export function irRepeatAction(count: number, then: IRAction[]): IRRepeatAction {
  return { kind: 'repeat', count, then };
}

export function irScriptExecute(scriptId: string): IRScriptExecute {
  return { kind: 'script_execute', scriptId };
}

export function irScriptWait(scriptId: string): IRScriptWait {
  return { kind: 'script_wait', scriptId };
}

export function irScriptStop(scriptId: string): IRScriptStop {
  return { kind: 'script_stop', scriptId };
}

export function irInternalLambda(code: string): IRInternalLambda {
  return { kind: 'internal_lambda', code };
}

export function irLambdaCondition(expression: string): IRLambdaCondition {
  return { kind: 'lambda', expression };
}

export function irNativeCondition(conditionKey: string, config: IRActionConfig): IRNativeCondition {
  return { kind: 'native', conditionKey, config };
}

// ── Lowering ───────────────────────────────────────────────────────────────

/**
 * Lower an IRActionParam to its YAML-ready value.
 */
function lowerParam(param: IRActionParam): unknown {
  switch (param.kind) {
    case 'literal':
      return param.value;
    case 'trigger_var':
      return createLambdaScalar(`return ${param.varName};`);
  }
}

/**
 * Lower an IRActionConfig to its YAML-ready value.
 */
function lowerConfig(config: IRActionConfig): unknown {
  if (typeof config === 'string') {
    return config;
  }
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(config)) {
    if (typeof value === 'object' && value !== null && 'kind' in value) {
      result[key] = lowerParam(value as IRActionParam);
    } else {
      result[key] = value;
    }
  }
  return result;
}

/**
 * Lower an IRCondition to ESPHome condition config.
 */
function lowerCondition(condition: IRCondition): unknown {
  switch (condition.kind) {
    case 'lambda':
      return createLambdaScalar(`return ${condition.expression};`);
    case 'native':
      return { [condition.conditionKey]: lowerConfig(condition.config) };
  }
}

/**
 * Lower a single IRAction to its ESPHome YAML-ready config object.
 */
function lowerAction(action: IRAction): unknown {
  switch (action.kind) {
    case 'native':
      return { [action.actionKey]: lowerConfig(action.config) };

    case 'ha_service': {
      const serviceConfig: Record<string, unknown> = { action: action.action };
      if (action.data) {
        const data: Record<string, unknown> = {};
        for (const [key, param] of Object.entries(action.data)) {
          data[key] = lowerParam(param);
        }
        serviceConfig.data = data;
      }
      return { 'homeassistant.action': serviceConfig };
    }

    case 'logger':
      if (action.level) {
        return { 'logger.log': { format: action.message, level: action.level } };
      }
      return { 'logger.log': action.message };

    case 'delay':
      return { delay: action.duration };

    case 'wait_until': {
      const config: Record<string, unknown> = {
        condition: lowerCondition(action.condition),
      };
      if (action.timeout) {
        config.timeout = action.timeout;
      }
      return { wait_until: config };
    }

    case 'if': {
      const config: Record<string, unknown> = {
        condition: lowerCondition(action.condition),
        then: lowerActionTree(action.then),
      };
      if (action.else) {
        config.else = lowerActionTree(action.else);
      }
      return { if: config };
    }

    case 'while':
      return {
        while: {
          condition: lowerCondition(action.condition),
          then: lowerActionTree(action.then),
        },
      };

    case 'repeat':
      return {
        repeat: {
          count: action.count,
          then: lowerActionTree(action.then),
        },
      };

    case 'script_execute':
      return { 'script.execute': { id: action.scriptId } };

    case 'script_wait':
      return { 'script.wait': { id: action.scriptId } };

    case 'script_stop':
      return { 'script.stop': { id: action.scriptId } };

    case 'internal_lambda':
      return { lambda: createLambdaScalar(action.code) };
  }
}

/**
 * Lower an array of IRAction nodes to ESPHome YAML-ready config objects.
 *
 * Each action becomes one entry in an ESPHome action list (the `then:` array
 * in triggers, scripts, etc.).
 */
export function lowerActionTree(actions: IRAction[]): unknown[] {
  return actions.map(lowerAction);
}
