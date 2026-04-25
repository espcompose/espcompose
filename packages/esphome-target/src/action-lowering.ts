// ────────────────────────────────────────────────────────────────────────────
// Action Tree Lowering — IRActionNode[] → ESPHome YAML config
//
// Converts target-agnostic IRActionNode nodes to ESPHome-specific YAML config
// objects. This is the ESPHome backend for action IR.
// ────────────────────────────────────────────────────────────────────────────

import type {
  IRActionNode,
  IRActionConfig,
  IRActionConfigValue,
  IRActionParam,
  IRCondition,
  IRExprNode,
} from '@espcompose/core/internals';
import { exprToCpp, type CppLoweringContext } from './expr-to-cpp.js';

// ── Reactive global context ─────────────────────────────────────────────
// Set of global IDs that have BoundSignal declarations in the reactive runtime.
// Populated by the target before lowering actions.
let reactiveGlobalIds: Set<string> = new Set();

/**
 * Set the set of global IDs that have reactive BoundSignal wiring.
 * Must be called before lowerActionTree() when globals are present.
 */
export function setReactiveGlobalIds(ids: Set<string>): void {
  reactiveGlobalIds = ids;
}

// ── Signal name context ─────────────────────────────────────────────────
// Signal names map populated by the target before lowering actions that
// contain signal_read nodes (e.g. popup mux conditions).
let actionSignalNames: Map<number, string> = new Map();

/**
 * Set the signal names map for action condition lowering.
 * Must be called before lowerActionTree() when actions reference signals
 * (e.g. popup mux dispatch conditions).
 */
export function setActionSignalNames(names: Map<number, string>): void {
  actionSignalNames = names;
}

// ── JSON-safe lambda marker ─────────────────────────────────────────────
// Lowered actions are embedded in source via JSON.stringify (in the script
// transformer), so we use a plain marker object instead of a YAML Scalar.
// The serialiser restores these to !lambda scalars at consumption time.
export interface LambdaMarker { __lambda__: string }
function lambdaMarker(code: string): LambdaMarker { return { __lambda__: code }; }

// ── JSON-safe expression marker ─────────────────────────────────────────
// Similar to LambdaMarker, but for JS expressions that must be emitted
// as raw code rather than JSON-stringified values. The script-transformer
// replaces these markers with the actual expression text.
export interface ExpressionMarker { __expression__: string }
function expressionMarker(expr: string): ExpressionMarker { return { __expression__: expr }; }

// ── Lowering ───────────────────────────────────────────────────────────────

/**
 * Lower an IRActionParam to its YAML-ready value.
 * Also handles already-resolved primitive values (e.g., expression params
 * that were resolved at runtime via serializeWithExpressions).
 */
function lowerParam(param: IRActionParam | string | number | boolean): unknown {
  if (typeof param !== 'object' || param === null) return param;
  switch (param.kind) {
    case 'literal':
      return param.value;
    case 'trigger_var':
      return lambdaMarker(`return ${param.varName};`);
    case 'expression':
      return expressionMarker(param.jsExpression);
  }
}

/**
 * Lower a single config value: literal/trigger/expression param, nested dict,
 * or already-resolved primitive.
 */
function lowerConfigValue(value: IRActionConfigValue): unknown {
  if (typeof value !== 'object' || value === null) return value;
  if (value.kind === 'config_dict') {
    const dict: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value.entries)) {
      dict[k] = lowerConfigValue(v);
    }
    return dict;
  }
  return lowerParam(value);
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
    result[key] = lowerConfigValue(value);
  }
  return result;
}

/**
 * Create a lowering context for condition expressions.
 * Uses the module-level `actionSignalNames` map so that muxed popup conditions
 * (which reference signal indices) can resolve signal names.
 */
function createConditionLoweringContext(): CppLoweringContext {
  return {
    signalNames: new Map(actionSignalNames),
    memoNames: new Map(),
    slotExprs: new Map(),
    entityComponentIds: new Map(),
    themeVarNames: new Map(),
    actionContext: true,
  };
}

/**
 * Lower an IRCondition to ESPHome condition config.
 */
function lowerCondition(condition: IRCondition): unknown {
  switch (condition.kind) {
    case 'lambda_condition': {
      const ctx = createConditionLoweringContext();
      const cppExpr = exprToCpp(condition.exprIR, ctx);
      // ESPHome expects conditions as a list of condition type mappings.
      // A lambda condition is: [{ lambda: !lambda "return expr;" }]
      return [{ lambda: lambdaMarker(`return ${cppExpr};`) }];
    }
    case 'native':
      return { [condition.conditionKey]: lowerConfig(condition.config) };
  }
}

/**
 * Lower the value of a global_set action to a C++ expression string.
 * Handles IRActionParam (literal, trigger_var) and IRExprNode (compiled expression).
 */
function lowerGlobalSetValue(value: IRActionParam | IRExprNode, cppType: string): string {
  if (typeof value === 'object' && value !== null && 'kind' in value) {
    switch (value.kind) {
      case 'literal': {
        const v = value.value;
        if (typeof v === 'boolean') return v ? 'true' : 'false';
        if (typeof v === 'string') {
          if (cppType === 'std::string') return `std::string("${escapeStringForCpp(v)}")`;
          return `"${escapeStringForCpp(v)}"`;
        }
        return String(v);
      }
      case 'trigger_var':
        // IRTriggerVarParam uses 'varName', IRExprTriggerVar uses 'name'
        return 'varName' in value ? value.varName : value.name;
      default: {
        // IRExprNode — lower to C++ via exprToCpp
        const ctx = createConditionLoweringContext();
        return exprToCpp(value as IRExprNode, ctx);
      }
    }
  }
  return String(value);
}

/**
 * Lower a single IRActionNode to its ESPHome YAML-ready config object.
 */
function lowerAction(action: IRActionNode): unknown {
  switch (action.kind) {
    case 'native':
      return { [action.actionKey]: lowerConfig(action.config) };

    case 'ha_service': {
      const serviceConfig: Record<string, unknown> = { action: action.action };
      if (action.data) {
        const staticData: Record<string, unknown> = {};
        const templateData: Record<string, string> = {};
        const variables: Record<string, unknown> = {};

        for (const [key, param] of Object.entries(action.data)) {
          if (typeof param === 'object' && param !== null && param.kind === 'trigger_var') {
            // Dynamic value: use variables + data_template
            variables[param.varName] = lambdaMarker(`return ${param.varName};`);
            templateData[key] = `{{ ${param.varName} }}`;
          } else {
            staticData[key] = lowerParam(param as IRActionParam);
          }
        }

        if (Object.keys(staticData).length > 0) {
          serviceConfig.data = staticData;
        }
        if (Object.keys(templateData).length > 0) {
          serviceConfig.data_template = templateData;
        }
        if (Object.keys(variables).length > 0) {
          serviceConfig.variables = variables;
        }
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

    case 'theme_select':
      return { lambda: lambdaMarker(`espcompose::select_theme_${action.scopeId}("${escapeStringForCpp(action.themeName)}");`) };

    case 'global_set': {
      const valueStr = lowerGlobalSetValue(action.value, action.cppType);
      if (reactiveGlobalIds.has(action.globalId)) {
        // Reactive global — write through BoundSignal (also writes native storage) + flush
        const sigName = `sig_global_${action.globalId}`;
        return { lambda: lambdaMarker(
          `espcompose::${sigName}.set(${valueStr}); ` +
          `if (auto rt = ::espcompose::EspcomposeRuntimeComponent::get_instance()) { rt->request_flush(); }`
        )};
      }
      // Non-reactive global — plain globals.set YAML action
      return { 'globals.set': { id: action.globalId, value: lambdaMarker(`return ${valueStr};`) } };
    }

    case 'array_set': {
      const idxStr = lowerGlobalSetValue(action.index, 'int');
      const valStr = lowerGlobalSetValue(action.value, action.cppType);
      if (reactiveGlobalIds.has(action.globalId)) {
        const sigName = `sig_global_${action.globalId}`;
        return { lambda: lambdaMarker(
          `espcompose::${sigName}.get_mut()[${idxStr}] = ${valStr}; ` +
          `espcompose::${sigName}.notify(); ` +
          `if (auto rt = ::espcompose::EspcomposeRuntimeComponent::get_instance()) { rt->request_flush(); }`
        )};
      }
      return { lambda: lambdaMarker(`id(${action.globalId})[${idxStr}] = ${valStr};`) };
    }

    case 'array_push': {
      const valStr = lowerGlobalSetValue(action.value, action.cppType);
      if (reactiveGlobalIds.has(action.globalId)) {
        const sigName = `sig_global_${action.globalId}`;
        return { lambda: lambdaMarker(
          `espcompose::${sigName}.get_mut().push_back(${valStr}); ` +
          `espcompose::${sigName}.notify(); ` +
          `if (auto rt = ::espcompose::EspcomposeRuntimeComponent::get_instance()) { rt->request_flush(); }`
        )};
      }
      return { lambda: lambdaMarker(`id(${action.globalId}).push_back(${valStr});`) };
    }

    case 'array_clear': {
      if (reactiveGlobalIds.has(action.globalId)) {
        const sigName = `sig_global_${action.globalId}`;
        return { lambda: lambdaMarker(
          `espcompose::${sigName}.get_mut().clear(); ` +
          `espcompose::${sigName}.notify(); ` +
          `if (auto rt = ::espcompose::EspcomposeRuntimeComponent::get_instance()) { rt->request_flush(); }`
        )};
      }
      return { lambda: lambdaMarker(`id(${action.globalId}).clear();`) };
    }

    case 'lambda_action': {
      // Reconstruct C++ code from fragments + slots
      let code = action.fragments[0];
      for (let i = 0; i < action.slots.length; i++) {
        const slot = action.slots[i];
        switch (slot.kind) {
          case 'ref':
            // Ref names are already resolved to ESPHome ID tokens by the
            // serialize layer. The user's template literal controls the
            // surrounding C++ (e.g. `id(${ref})`), so we emit just the name.
            code += slot.name;
            break;
          case 'global':
            code += `id(${slot.id})`;
            break;
          case 'trigger_var':
            code += slot.varName;
            break;
          case 'literal':
            if (typeof slot.value === 'string') {
              code += `"${escapeStringForCpp(slot.value)}"`;
            } else {
              code += String(slot.value);
            }
            break;
        }
        code += action.fragments[i + 1];
      }
      return { lambda: lambdaMarker(code) };
    }

    case 'popup_show': {
      // Set the mux signal to this instance's index, show the popup
      // wrapper, and flush the reactive graph so bindings update.
      const muxSig = `sig_popup_${action.templateKey}_mux`;
      const popupId = `popup_${action.templateKey}`;
      return { lambda: lambdaMarker(
        `espcompose::${muxSig}.set(${action.instanceIndex}); ` +
        `if (auto rt = ::espcompose::EspcomposeRuntimeComponent::get_instance()) { rt->request_flush(); } ` +
        `lv_obj_clear_flag(id(${popupId}), LV_OBJ_FLAG_HIDDEN);`
      )};
    }

    case 'popup_dismiss': {
      // Hide the popup wrapper — not muxed, same widget across all instances.
      const popupId = `popup_${action.templateKey}`;
      return { lambda: lambdaMarker(
        `lv_obj_add_flag(id(${popupId}), LV_OBJ_FLAG_HIDDEN);`
      )};
    }
  }
}

/**
 * Lower an array of IRActionNode nodes to ESPHome YAML-ready config objects.
 *
 * Each action becomes one entry in an ESPHome action list (the `then:` array
 * in triggers, scripts, etc.).
 */
export function lowerActionTree(actions: IRActionNode[]): unknown[] {
  return actions.map(lowerAction);
}

/**
 * Escape a string for embedding in C++ code.
 */
export function escapeStringForCpp(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n').replace(/\r/g, '\\r');
}
