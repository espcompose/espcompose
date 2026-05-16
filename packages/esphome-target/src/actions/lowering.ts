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
  IRAnimateAction,
  IRCondition,
  IRDurationLiteral,
  IRExpression,
  IRNativeAction,
  IRRefAnnotation,
  IRType,
} from '@espcompose/core/internals';
import { IR_INT } from '@espcompose/core/internals';
import { exprToCpp, type CppLoweringContext } from '../lowering';
import { lookupActionEmitter, formatCppLiteral, type ActionCppEmitter } from './cpp-emitters.js';
import { irTypeToCpp } from '../lowering';
import { sanitizeBindingName } from '../yaml-utils.js';

// ── Action lowering context ─────────────────────────────────────────────

/**
 * Context for action tree lowering. Passed explicitly to avoid module-level
 * mutable singletons.
 */
export interface ActionLoweringContext {
  /** Set of global IDs that have BoundSignal declarations in the reactive runtime. */
  reactiveGlobalIds: Set<string>;
  /** Signal index → name map for resolving signal_read in action conditions. */
  signalNames: Map<number, string>;
  /** When true, wrap action lambdas with performance timing instrumentation. */
  perf?: boolean;
  /**
   * When lowering inside an `IRScript` body, maps each `ref` slot binding name
   * to the literal ESPHome ID token to emit. Single-instance scripts populate
   * this; closure-table scripts leave the binding out and instead register it
   * in {@link scriptClosureNames} below.
   *
   * When unset (e.g. lowering trigger handlers), `ref` slots fall through to
   * the default behaviour where `slot.name` is already a literal token.
   */
  scriptRefBindings?: Record<string, string>;
  /**
   * Set of binding names declared in the enclosing script's `closureShape`.
   * `ref` slots whose name appears here are emitted as `closure.<name>`
   * (the per-instance C++ closure-row is in scope via the lambda preamble).
   */
  scriptClosureNames?: Set<string>;
  /**
   * ESPHome script ID for the enclosing script. Required when rewriting
   * native ref actions to lambdas — the generated C++ accessor references
   * the per-script typed-pointer lookup table: `ec_<scriptId>_<field>s[...]`.
   */
  scriptId?: string;
  /**
   * Set of overlay tier keys that have a wrapper widget. Used by overlay
   * show/hide lowering to conditionally emit tier wrapper show/hide logic.
   */
  tiersWithWrapper?: Set<string>;
  /**
   * Set of overlay tier keys whose overlays call `lv_obj_move_foreground()`
   * on show, enabling last-shown-wins z-order within a tier (needed for
   * stacked dialogs).  When omitted, the overlay keeps its declared
   * sibling order.
   */
  tiersWithBringToFront?: Set<string>;
}

// ── JSON-safe lambda marker ─────────────────────────────────────────────
// Lowered actions are embedded in source via JSON.stringify (in the script
// transformer), so we use a plain marker object instead of a YAML Scalar.
// The serialiser restores these to !lambda scalars at consumption time.
export interface LambdaMarker { __lambda__: string }
function lambdaMarker(code: string): LambdaMarker { return { __lambda__: code }; }

/** Format a literal duration as the ESPHome YAML scalar form (`'500ms'`, `'3s'`). */
function formatDuration(d: IRDurationLiteral): string {
  return `${d.value}${d.unit}`;
}

// ── Lowering ───────────────────────────────────────────────────────────────

/**
 * Lower an action-position IRExpression to its YAML-ready value.
 *
 * Fast paths:
 *   - `expr:literal` → raw value
 *   - `expr:trigger_var` → lambda returning the C++ variable
 *
 * All other expressions are lowered to C++ via `exprToCpp` and wrapped in
 * a `return ...;` lambda. Already-resolved primitive values (e.g. dynamic
 * entity IDs spliced in by `serializeWithExpressions`) pass through
 * unchanged.
 */
function lowerParam(param: IRExpression | string | number | boolean, ctx: ActionLoweringContext): unknown {
  if (typeof param !== 'object' || param === null) return param;
  switch (param.kind) {
    case 'expr:literal':
      return param.value;
    case 'expr:trigger_var':
      return lambdaMarker(`return ${param.name};`);
    default: {
      const cppCtx = createConditionLoweringContext(ctx);
      return lambdaMarker(`return ${exprToCpp(param, cppCtx)};`);
    }
  }
}

/**
 * Lower a single config value: IRExpression, nested dict, or already-resolved
 * primitive.
 */
function lowerConfigValue(value: IRActionConfigValue, ctx: ActionLoweringContext): unknown {
  if (typeof value !== 'object' || value === null) return value;
  if (value.kind === 'config_dict') {
    const dict: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value.entries)) {
      dict[k] = lowerConfigValue(v, ctx);
    }
    return dict;
  }
  return lowerParam(value, ctx);
}

/**
 * Lower an IRActionConfig to its YAML-ready value.
 */
function lowerConfig(config: IRActionConfig, ctx: ActionLoweringContext): unknown {
  if (typeof config === 'string') {
    return config;
  }
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(config)) {
    result[key] = lowerConfigValue(value, ctx);
  }
  return result;
}

/**
 * Create a lowering context for condition expressions.
 * Uses the provided `signalNames` map so that muxed overlay conditions
 * (which reference signal indices) can resolve signal names.
 */
function createConditionLoweringContext(ctx: ActionLoweringContext): CppLoweringContext {
  return {
    signalNames: new Map(ctx.signalNames),
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
function lowerCondition(condition: IRCondition, ctx: ActionLoweringContext): unknown {
  switch (condition.kind) {
    case 'lambda_condition': {
      const cppCtx = createConditionLoweringContext(ctx);
      const cppExpr = exprToCpp(condition.exprIR, cppCtx);
      // ESPHome expects conditions as a list of condition type mappings.
      // A lambda condition is: [{ lambda: !lambda "return expr;" }]
      return [{ lambda: lambdaMarker(`return ${cppExpr};`) }];
    }
    case 'native':
      return { [condition.conditionKey]: lowerConfig(condition.config, ctx) };
  }
}

/**
 * Lower the value of a global_set action to a C++ expression string.
 * Fast paths for `expr:literal` and `expr:trigger_var`; everything else
 * lowers via `exprToCpp`.
 */
function lowerGlobalSetValue(value: IRExpression, irType: IRType, ctx: ActionLoweringContext): string {
  const cppType = irTypeToCpp(irType);
  switch (value.kind) {
    case 'expr:literal': {
      const v = value.value;
      if (typeof v === 'boolean') return v ? 'true' : 'false';
      if (typeof v === 'string') {
        if (cppType === 'std::string') return `std::string("${escapeStringForCpp(v)}")`;
        return `"${escapeStringForCpp(v)}"`;
      }
      return String(v);
    }
    case 'expr:trigger_var':
      return value.name;
    default: {
      const cppCtx = createConditionLoweringContext(ctx);
      return exprToCpp(value, cppCtx);
    }
  }
}

// ── Native→lambda rewrite helpers ────────────────────────────────────────

/**
 * Find the first refSlot in a native action that is closure-bound
 * (i.e. its bindingName corresponds to an id_ref field in the closure shape).
 * id_ref fields are named `<bindingName>_idx` in the closure struct.
 */
function findClosureBoundRefSlot(
  action: IRNativeAction,
  ctx: ActionLoweringContext,
): IRRefAnnotation | undefined {
  if (!action.refSlots || !ctx.scriptClosureNames) return undefined;
  return action.refSlots.find(s => ctx.scriptClosureNames!.has(`${s.bindingName}_idx`));
}

/**
 * Rewrite a native ref action as a lambda action using the ACTION_CPP_EMITTERS
 * catalog. The generated C++ dereferences the typed-pointer lookup table that
 * the closure-table emitter produces.
 *
 * Throws a hard build error if the action key is not catalogued — per the
 * no-fallback policy, missing emitters are build failures, never silent
 * degradation to legacy N-script emission.
 */
function synthesizeNativeAsLambda(
  action: IRNativeAction,
  closureSlot: IRRefAnnotation,
  ctx: ActionLoweringContext,
): { lambda: LambdaMarker } {
  // lvgl.widget.update uses LVGL free functions (lv_obj_add_flag /
  // lv_obj_clear_flag) that don't fit the accessor->method() emitter
  // pattern. Handle it directly before the catalog lookup.
  if (action.domain === 'lvgl' && action.operation === 'widget.update') {
    return synthesizeLvglWidgetUpdate(action, closureSlot, ctx);
  }

  const actionKey = `${action.domain}.${action.operation}`;
  const emitter = lookupActionEmitter(actionKey);
  if (!emitter) {
    throw new Error(
      `[espcompose] Missing ACTION_CPP_EMITTERS entry for '${actionKey}'. ` +
      `Cannot rewrite closure-bound ref action to lambda. ` +
      `Add an entry to packages/esphome-target/src/action-cpp-emitters.ts ` +
      `for this action key.`,
    );
  }

  const scriptId = ctx.scriptId;
  if (!scriptId) {
    throw new Error(
      `[espcompose] scriptId missing in ActionLoweringContext while rewriting ` +
      `'${actionKey}' to lambda. This is a compiler bug.`,
    );
  }

  const bindingName = closureSlot.bindingName;
  // Accessor: dereference the typed-pointer lookup array using the closure-row index.
  // The lookup array lives in the `espcompose::` namespace alongside the closure
  // table, so qualify it explicitly to keep the lambda body namespace-agnostic.
  const safeName = sanitizeBindingName(bindingName);
  const accessor = `espcompose::ec_${scriptId}_${safeName}s[closure.${safeName}_idx]`;

  const code = renderEmitterCall(accessor, emitter, action.config, closureSlot);
  return { lambda: lambdaMarker(code) };
}

/**
 * Synthesize a lambda for `lvgl.widget.update` with a closure-bound ref.
 *
 * LVGL widget actions use free functions (`lv_obj_add_flag` / `lv_obj_clear_flag`)
 * rather than the `accessor->method()` pattern used by ESPHome components.
 * The `hidden` config value determines which function to emit.
 */
function synthesizeLvglWidgetUpdate(
  action: IRNativeAction,
  closureSlot: IRRefAnnotation,
  ctx: ActionLoweringContext,
): { lambda: LambdaMarker } {
  const scriptId = ctx.scriptId;
  if (!scriptId) {
    throw new Error(
      `[espcompose] scriptId missing in ActionLoweringContext while rewriting ` +
      `'lvgl.widget.update' to lambda. This is a compiler bug.`,
    );
  }

  const bindingName = closureSlot.bindingName;
  const safeName = sanitizeBindingName(bindingName);
  const accessor = `espcompose::ec_${scriptId}_${safeName}s[closure.${safeName}_idx]`;

  // Extract the `hidden` flag to decide which LVGL function to emit.
  const hidden = typeof action.config === 'object' && action.config !== null
    ? (action.config as Record<string, unknown>)['hidden']
    : undefined;
  const fn = hidden === true ? 'lv_obj_add_flag' : 'lv_obj_clear_flag';
  return { lambda: lambdaMarker(`${fn}(${accessor}, LV_OBJ_FLAG_HIDDEN);`) };
}

/**
 * Render the C++ method call for a given emitter + accessor.
 *
 * - Fluent (e.g. `light.toggle`):  `accessor->toggle().perform();`
 * - Fluent with params:  `accessor->turn_on().set_brightness(0.5f).perform();`
 * - Non-fluent zero-arg: `accessor->toggle();`
 * - Non-fluent with positional params: `accessor->set_level(0.5f);`
 */
function renderEmitterCall(
  accessor: string,
  emitter: ActionCppEmitter,
  config: IRActionConfig,
  idSlot: IRRefAnnotation,
): string {
  if (emitter.fluent) {
    let call = `${accessor}->${emitter.method}()`;
    // Append param setters from the config (excluding the id slot).
    for (const param of emitter.params) {
      const rawValue = extractConfigParam(config, param.name, idSlot);
      if (rawValue !== undefined) {
        const setter = param.cppSetter ?? `set_${param.name}`;
        call += `.${setter}(${formatCppLiteral(rawValue, param.cppType)})`;
      }
    }
    call += '.perform();';
    return call;
  }

  // Non-fluent: collect positional params, then emit as method(args...).
  const positionalArgs: string[] = [];
  for (const param of emitter.params) {
    const rawValue = extractConfigParam(config, param.name, idSlot);
    if (rawValue !== undefined) {
      positionalArgs.push(formatCppLiteral(rawValue, param.cppType));
    }
  }
  if (positionalArgs.length > 0) {
    return `${accessor}->${emitter.method}(${positionalArgs.join(', ')});`;
  }
  return `${accessor}->${emitter.method}();`;
}

/**
 * Extract a non-id config parameter's raw value from the action config.
 */
function extractConfigParam(
  config: IRActionConfig,
  paramName: string,
  idSlot: IRRefAnnotation,
): unknown {
  // Bare-string configs have no extra params.
  if (typeof config === 'string') return undefined;
  // Skip the id slot key (only relevant for object configs).
  if (idSlot.kind === 'object' && paramName === idSlot.key) return undefined;
  const value = config[paramName];
  if (value === undefined) return undefined;
  // Unwrap IRLiteralExpression literals
  if (typeof value === 'object' && value !== null && 'kind' in value) {
    const param = value as { kind: string; value?: unknown };
    if (param.kind === 'expr:literal') return param.value;
    // TODO: trigger_var and other expression params in closure-rewritten
    // actions would need C++ variable references — not yet supported.
    return undefined;
  }
  return value;
}

/**
 * Lower a single IRActionNode to its ESPHome YAML-ready config object.
 */
function lowerAction(action: IRActionNode, ctx: ActionLoweringContext): unknown {
  switch (action.kind) {
    case 'action:native': {
      // ── Closure-bound ref detection ──────────────────────────────
      // If this native action references a ref that's bound through a
      // closure-table column, it cannot be expressed as a YAML native
      // action (which requires a static id). Rewrite to a lambda using
      // the ACTION_CPP_EMITTERS catalog.
      const closureBoundSlot = findClosureBoundRefSlot(action, ctx);
      if (closureBoundSlot) {
        return synthesizeNativeAsLambda(action, closureBoundSlot, ctx);
      }      // ── Perf instrumentation for visibility changes ─────────────
      // YAML-level actions can't carry inline timing. Rewrite
      // lvgl.widget.update with `hidden` to a lambda when perf is on.
      if (ctx.perf && action.domain === 'lvgl' && action.operation === 'widget.update' &&
          typeof action.config === 'object' && action.config !== null && 'hidden' in action.config) {
        const widgetId = (action.config as Record<string, unknown>).id as string;
        const hidden = (action.config as Record<string, unknown>).hidden;
        const flag = hidden ? 'lv_obj_add_flag' : 'lv_obj_clear_flag';
        return { lambda: lambdaMarker(
          `uint32_t _t0 = millis(); ` +
          `${flag}(id(${widgetId}), LV_OBJ_FLAG_HIDDEN); ` +
          `ESP_LOGI("ec_perf", "widget.update hidden=${hidden ? 'true' : 'false'}(%s): %lums", "${escapeStringForCpp(widgetId)}", (unsigned long)(millis() - _t0));`
        )};
      }      return { [`${action.domain}.${action.operation}`]: lowerConfig(action.config, ctx) };
    }

    case 'action:ha_service': {
      const serviceConfig: Record<string, unknown> = { action: action.action };
      if (action.data) {
        const staticData: Record<string, unknown> = {};
        const templateData: Record<string, string> = {};
        const variables: Record<string, unknown> = {};

        for (const [key, param] of Object.entries(action.data)) {
          if (typeof param === 'object' && param !== null && param.kind === 'expr:trigger_var') {
            // Trigger variable: route through variables + data_template so
            // HA receives the runtime value rather than a literal token.
            variables[param.name] = lambdaMarker(`return ${param.name};`);
            templateData[key] = `{{ ${param.name} }}`;
          } else if (typeof param === 'object' && param !== null && 'kind' in param &&
                     param.kind !== 'expr:literal') {
            // Compiled expression: lower to C++ and route through variables + data_template
            const varName = `${key}_expr`;
            const cppCtx = createConditionLoweringContext(ctx);
            const cppExpr = exprToCpp(param as IRExpression, cppCtx);
            variables[varName] = lambdaMarker(`return ${cppExpr};`);
            templateData[key] = `{{ ${varName} }}`;
          } else {
            staticData[key] = lowerParam(param, ctx);
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

    case 'action:logger':
      if (action.level) {
        return { 'logger.log': { format: action.message, level: action.level } };
      }
      return { 'logger.log': action.message };

    case 'action:delay':
      if (action.duration.kind === 'script_param') {
        return { delay: lambdaMarker(`return ${action.duration.name};`) };
      }
      return { delay: formatDuration(action.duration) };

    case 'action:wait_until': {
      const config: Record<string, unknown> = {
        condition: lowerCondition(action.condition, ctx),
      };
      if (action.timeout) {
        config.timeout = action.timeout.kind === 'never'
          ? 'never'
          : action.timeout.kind === 'duration'
            ? formatDuration(action.timeout)
            : (() => { throw new Error('[espcompose] Script-param timeout not yet supported'); })();
      }
      return { wait_until: config };
    }

    case 'action:if': {
      const config: Record<string, unknown> = {
        condition: lowerCondition(action.condition, ctx),
        then: lowerActionTree(action.then, ctx),
      };
      if (action.else) {
        config.else = lowerActionTree(action.else, ctx);
      }
      return { if: config };
    }

    case 'action:while':
      return {
        while: {
          condition: lowerCondition(action.condition, ctx),
          then: lowerActionTree(action.then, ctx),
        },
      };

    case 'action:repeat':
      return {
        repeat: {
          count: action.count,
          then: lowerActionTree(action.then, ctx),
        },
      };

    case 'action:script_execute': {
      const execArgs: Record<string, unknown> = { id: action.scriptId };
      if (action.closureIndex !== undefined) {
        execArgs['closure_index'] = action.closureIndex;
      }
      if (action.userArgs) {
        for (const [k, v] of Object.entries(action.userArgs)) {
          execArgs[k] = lowerParam(v, ctx);
        }
      }
      return { 'script.execute': execArgs };
    }

    case 'action:script_wait':
      return { 'script.wait': { id: action.scriptId } };

    case 'action:script_stop':
      return { 'script.stop': { id: action.scriptId } };

    case 'action:theme_select':
      if (ctx.perf) {
        return { lambda: lambdaMarker(
          `uint32_t _t0 = millis(); ` +
          `espcompose::select_theme_${action.scopeId}("${escapeStringForCpp(action.themeName)}"); ` +
          `ESP_LOGI("ec_perf", "theme_select(%s): %lums", "${escapeStringForCpp(action.themeName)}", (unsigned long)(millis() - _t0));`
        )};
      }
      return { lambda: lambdaMarker(`espcompose::select_theme_${action.scopeId}("${escapeStringForCpp(action.themeName)}");`) };

    case 'action:global_set': {
      const valueStr = lowerGlobalSetValue(action.value, action.irType, ctx);
      if (ctx.reactiveGlobalIds.has(action.globalId)) {
        // Reactive global — write through BoundSignal (also writes native storage) + flush
        const sigName = `sig_global_${action.globalId}`;
        return { lambda: lambdaMarker(
          `espcompose::${sigName}.set(${valueStr}); espcompose::flush();`
        )};
      }
      // Non-reactive global — plain globals.set YAML action
      return { 'globals.set': { id: action.globalId, value: lambdaMarker(`return ${valueStr};`) } };
    }

    case 'action:array_set': {
      const idxStr = lowerGlobalSetValue(action.index, IR_INT, ctx);
      const valStr = lowerGlobalSetValue(action.value, action.irType, ctx);
      if (ctx.reactiveGlobalIds.has(action.globalId)) {
        const sigName = `sig_global_${action.globalId}`;
        return { lambda: lambdaMarker(
          `espcompose::${sigName}.get_mut()[${idxStr}] = ${valStr}; ` +
          `espcompose::${sigName}.notify(); espcompose::flush();`
        )};
      }
      return { lambda: lambdaMarker(`id(${action.globalId})[${idxStr}] = ${valStr};`) };
    }

    case 'action:array_push': {
      const valStr = lowerGlobalSetValue(action.value, action.irType, ctx);
      if (ctx.reactiveGlobalIds.has(action.globalId)) {
        const sigName = `sig_global_${action.globalId}`;
        return { lambda: lambdaMarker(
          `espcompose::${sigName}.get_mut().push_back(${valStr}); ` +
          `espcompose::${sigName}.notify(); espcompose::flush();`
        )};
      }
      return { lambda: lambdaMarker(`id(${action.globalId}).push_back(${valStr});`) };
    }

    case 'action:array_clear': {
      if (ctx.reactiveGlobalIds.has(action.globalId)) {
        const sigName = `sig_global_${action.globalId}`;
        return { lambda: lambdaMarker(
          `espcompose::${sigName}.get_mut().clear(); ` +
          `espcompose::${sigName}.notify(); espcompose::flush();`
        )};
      }
      return { lambda: lambdaMarker(`id(${action.globalId}).clear();`) };
    }

    case 'action:lambda_action': {
      // Reconstruct C++ code from fragments + slots
      let code = action.fragments[0];
      for (let i = 0; i < action.slots.length; i++) {
        const slot = action.slots[i];
        switch (slot.kind) {
          case 'interp:ref':
            // In script scope, prefer closure-table or per-script
            // refBindings resolution. Fall through to slot.name for
            // trigger handlers where slot.name is already a literal token.
            if (ctx.scriptClosureNames && ctx.scriptClosureNames.has(slot.name)) {
              code += `closure.${sanitizeBindingName(slot.name)}`;
            } else if (ctx.scriptRefBindings && slot.name in ctx.scriptRefBindings) {
              code += ctx.scriptRefBindings[slot.name];
            } else {
              // Ref names are already resolved to ESPHome ID tokens by the
              // serialize layer. The user's template literal controls the
              // surrounding C++ (e.g. `id(${ref})`), so we emit just the name.
              code += slot.name;
            }
            break;
          case 'interp:global':
            code += `id(${slot.id})`;
            break;
          case 'interp:trigger_var':
            code += slot.varName;
            break;
          case 'interp:script_param':
            code += slot.name;
            break;
          case 'interp:literal':
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

    case 'action:overlay_show': {
      // Set the mux signal to this instance's index, show each content child
      // within the overlay wrapper (children carry hidden flag, wrapper is always-visible),
      // optionally move wrapper to the foreground (last-shown-wins z-order within tier),
      // show tier wrapper if tier has one, and flush.
      const muxSig = `sig_${action.templateKey}_mux`;
      const overlayId = `${action.templateKey}`;
      const indexExpr = typeof action.instanceIndex === 'number'
        ? String(action.instanceIndex)
        : action.instanceIndex.name;
      const hasWrapper = ctx.tiersWithWrapper?.has(action.tierKey) ?? false;
      const tierWrapperId = hasWrapper ? `tw_${action.tierKey}` : '';
      const bringToFront = ctx.tiersWithBringToFront?.has(action.tierKey) ?? false;

      const showChildren = `{ lv_obj_t* w = id(${overlayId}); for(int i=0;i<(int)lv_obj_get_child_count(w);i++) lv_obj_clear_flag(lv_obj_get_child(w,i),LV_OBJ_FLAG_HIDDEN); }`;
      const showTierWrapper = tierWrapperId
        ? ` lv_obj_clear_flag(id(${tierWrapperId}),LV_OBJ_FLAG_HIDDEN);`
        : '';
      const moveForeground = bringToFront
        ? ` lv_obj_move_foreground(id(${overlayId}));`
        : '';

      if (ctx.perf) {
        return { lambda: lambdaMarker(
          `uint32_t _t0 = millis(); ` +
          `espcompose::${muxSig}.set(${indexExpr}); ` +
          `uint32_t _t1 = millis(); ` +
          `espcompose::flush(); ` +
          `uint32_t _t2 = millis(); ` +
          showChildren +
          showTierWrapper +
          moveForeground +
          ` uint32_t _t3 = millis(); ` +
          `ESP_LOGI("ec_perf", "overlay_show(%s): mux=%lums flush=%lums show=%lums total=%lums", ` +
          `"${escapeStringForCpp(overlayId)}", (unsigned long)(_t1-_t0), (unsigned long)(_t2-_t1), (unsigned long)(_t3-_t2), (unsigned long)(_t3-_t0));`
        )};
      }
      return { lambda: lambdaMarker(
        `espcompose::${muxSig}.set(${indexExpr}); espcompose::flush(); ` +
        showChildren +
        showTierWrapper +
        moveForeground
      )};
    }

    case 'action:overlay_hide': {
      // Hide content children within the overlay wrapper, then conditionally
      // hide the shared tier wrapper if no other overlay in this tier is visible.
      const overlayId = `${action.templateKey}`;
      const hasWrapper = ctx.tiersWithWrapper?.has(action.tierKey) ?? false;
      const tierWrapperId = hasWrapper ? `tw_${action.tierKey}` : '';

      const hideChildren = `{ lv_obj_t* w = id(${overlayId}); for(int i=0;i<(int)lv_obj_get_child_count(w);i++) lv_obj_add_flag(lv_obj_get_child(w,i),LV_OBJ_FLAG_HIDDEN); }`;

      // Tier wrapper conditional hide: iterate tier's children (overlay wrappers),
      // skip the tier wrapper itself, check if any sibling wrapper has a visible child.
      let hideTierWrapper = '';
      if (tierWrapperId) {
        hideTierWrapper = ` { lv_obj_t* tier = lv_obj_get_parent(id(${overlayId})); ` +
          `lv_obj_t* tw = id(${tierWrapperId}); bool any = false; ` +
          `for(int i=0;i<(int)lv_obj_get_child_count(tier);i++){` +
          `lv_obj_t* s = lv_obj_get_child(tier,i); if(s==tw) continue; ` +
          `for(int j=0;j<(int)lv_obj_get_child_count(s);j++){` +
          `if(!lv_obj_has_flag(lv_obj_get_child(s,j),LV_OBJ_FLAG_HIDDEN)){any=true;break;}` +
          `} if(any) break;` +
          `} if(!any) lv_obj_add_flag(tw,LV_OBJ_FLAG_HIDDEN); }`;
      }

      if (ctx.perf) {
        return { lambda: lambdaMarker(
          `uint32_t _t0 = millis(); ` +
          hideChildren + hideTierWrapper +
          ` ESP_LOGI("ec_perf", "overlay_hide(%s): %lums", "${escapeStringForCpp(overlayId)}", (unsigned long)(millis() - _t0));`
        )};
      }
      return { lambda: lambdaMarker(hideChildren + hideTierWrapper) };
    }

    case 'action:controller_method_call':
      throw new Error(
        `Unresolved controller_method_call action (controllerRef: ${action.controllerRef}, ` +
        `method: ${action.methodName}). Controller method calls must be resolved before lowering.`,
      );

    case 'action:animate':
      return lowerAnimateAction(action, ctx);
  }
}

// ── Animate action lowering ──────────────────────────────────────────────

/**
 * Lower an IRAnimateAction to an ESPHome `espcompose.animate` YAML action.
 *
 * Emits ESPHome-friendly names (snake_case prop, part/state strings).
 * The Python component resolves these to LVGL C constants at codegen time.
 */
function lowerAnimateAction(action: IRAnimateAction, ctx: ActionLoweringContext): unknown {
  // Resolve widget ID — check scriptRefBindings for closure-table scripts,
  // then fall through to literal targetRef.
  let widgetId = action.targetRef;
  if (ctx.scriptRefBindings && ctx.scriptRefBindings[action.targetRef]) {
    widgetId = ctx.scriptRefBindings[action.targetRef];
  }

  const config: Record<string, unknown> = {
    widget: widgetId,
    prop: action.styleProp,
    from: action.from,
    to: action.to,
    duration: action.durationMs,
    easing: action.easing,
  };
  if (action.part) {
    config.part = action.part;
  }
  if (action.state) {
    config.state = action.state;
  }
  if (action.delayMs && action.delayMs > 0) {
    config.delay = action.delayMs;
  }
  return { 'espcompose.animate': config };
}

/**
 * Lower an array of IRActionNode nodes to ESPHome YAML-ready config objects.
 *
 * Each action becomes one entry in an ESPHome action list (the `then:` array
 * in triggers, scripts, etc.).
 */
export function lowerActionTree(actions: IRActionNode[], ctx: ActionLoweringContext = { reactiveGlobalIds: new Set(), signalNames: new Map() }): unknown[] {
  const lowered = actions.map(a => lowerAction(a, ctx));
  return mergeAdjacentLambdas(lowered);
}

// ── Adjacent-lambda merging ──────────────────────────────────────────────
// Each `{ lambda: ... }` in an ESPHome action list becomes a separate
// `LambdaAction<>` template instantiation (class, vtable, heap alloc).
// When consecutive actions are all plain lambdas we merge them into one,
// wrapping each body in `{ }` for variable-name isolation, separated by
// newlines for readability.
//
// A run is broken whenever:
//   - a non-lambda action is encountered (delay, script.execute, if, …)
//   - a lambda body contains `return` — in the original form, subsequent
//     LambdaActions still execute; in a merged lambda they would not.

function isLambdaAction(v: unknown): v is { lambda: LambdaMarker } {
  if (v === null || typeof v !== 'object' || !('lambda' in v)) return false;
  const lam = (v as Record<string, unknown>).lambda;
  return lam !== null && typeof lam === 'object' && '__lambda__' in (lam as object);
}

function mergeAdjacentLambdas(actions: unknown[]): unknown[] {
  if (actions.length <= 1) return actions;

  const result: unknown[] = [];
  let i = 0;

  while (i < actions.length) {
    const action = actions[i];
    if (!isLambdaAction(action)) {
      result.push(action);
      i++;
      continue;
    }

    // Collect a run of consecutive lambda actions.
    const run: string[] = [action.lambda.__lambda__];
    let j = i + 1;

    while (j < actions.length) {
      // If the last body in the run contains `return`, stop — merging
      // would make subsequent bodies unreachable.
      if (/\breturn\b/.test(run[run.length - 1])) break;

      const next = actions[j];
      if (!isLambdaAction(next)) break;

      run.push(next.lambda.__lambda__);
      j++;
    }

    if (run.length === 1) {
      result.push(action);
    } else {
      const merged = run.map(body => `{ ${body} }`).join('\n');
      result.push({ lambda: lambdaMarker(merged) });
    }

    i = j;
  }

  return result;
}

/**
 * Escape a string for embedding in C++ code.
 */
export function escapeStringForCpp(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n').replace(/\r/g, '\\r');
}
