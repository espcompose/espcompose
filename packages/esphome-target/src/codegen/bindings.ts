// ────────────────────────────────────────────────────────────────────────────
// codegen.ts — Generate espcompose_bindings.h for the C++ reactive runtime
//
// Takes the collected reactive data (signals, memos, effects, widget bindings)
// and produces a C++ header that wires them into the runtime.
//
// The generated header is included alongside espcompose_reactive.h via
// esphome.includes: and exposes a factory for a true ESPHome component
// instance that owns setup/loop lifecycle for the dependency graph.
// ────────────────────────────────────────────────────────────────────────────

import { LVGL_PART_FLAGS, LVGL_STATE_FLAGS } from '../lvgl';
import { LVGL_STYLE_PROP_TABLE, resolveLvglStyleConstant } from '../lvgl';
import * as fs from 'fs';
import * as path from 'path';

/** Convert a camelCase identifier to snake_case for ESPHome/LVGL table lookups. */
function camelToSnake(s: string): string {
  return s.replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`);
}

// ── Input data types ───────────────────────────────────────────────────────

export interface SignalDecl {
  /** C++ variable name (e.g. `sig_ha_light_kitchen_floods`). */
  name: string;
  /** C++ type (e.g. `bool`, `float`, `std::string`). */
  cppType: string;
  /**
   * Semantic ESPHome source-domain (e.g. `sensor`, `binary_sensor`,
   * `text_sensor`). Used by the YAML lowering to pick the trigger key
   * (`on_state` / `on_value`) on the source component. Optional for signals
   * that are not bound to an HA sensor source (e.g. overlay-mux signals).
   */
  sourceDomain?: string;
}

export interface MemoDecl {
  /** Unique index for this memo (e.g. 0, 1, 2...). */
  index: number;
  /** C++ return type (e.g. `std::string`, `float`, `bool`). */
  cppReturnType: string;
  /** C++ expression body (from memo-codegen). Single-expression memos only. */
  cppExpression: string;
  /**
   * C++ statement lines for multi-statement memo bodies.
   * When set, the lambda emits these lines instead of `return cppExpression;`.
   */
  cppBodyLines?: string[];
  /** Signal names this memo depends on. */
  sourceSignals: string[];
  /**
   * If set, this memo is a duplicate of the canonical memo at this index.
   * Codegen emits `auto& memo_N = memo_M;` instead of a full declaration.
   */
  canonicalIndex?: number;
}

export interface EffectDecl {
  /** Unique index for this effect. */
  index: number;
  /** C++ callback body (from memo-codegen for user effects). */
  cppBody: string;
  /** Signal/memo names this effect depends on. */
  sourceNames: string[];
}

export interface WidgetBindingDecl {
  /** Unique index for this binding. */
  index: number;
  /** LVGL widget type (e.g. `label`, `button`). */
  widgetType: string;
  /** ESPHome widget ID (e.g. `status_label`). */
  widgetId: string;
  /** Widget property being bound (e.g. `text`, `checked`). */
  prop: string;
  /** C++ value expression (e.g. `memo_0.get()` or `sig_X.get()`). */
  valueExpr: string;
  /** C++ type of the value (e.g. `std::string`, `bool`, `float`). */
  cppType: string;
  /** Source node names this Effect should be wired to. */
  sourceNames: string[];
  /** LVGL part name (snake_case) if targeting a sub-part, e.g. `'indicator'`. */
  part?: string;
  /** LVGL state name (snake_case) if targeting a state variant, e.g. `'pressed'`. */
  state?: string;
}

/** Declaration for a theme memo (reads from a value array indexed by theme_index). */
export interface ThemeMemoDecl {
  /** C++ variable name (e.g. `thm_colors_primary_bg`). */
  name: string;
  /** C++ value type (e.g. `lv_color_t`, `int32_t`, `std::string`). */
  cppType: string;
  /** Ordered values across all themes, used to generate the static array. */
  values: (string | number | boolean)[];
}

/** Declaration for a compiled trigger function (from device.inline/device.script). */
export interface TriggerFunctionDecl {
  /** C++ function name (e.g. `trigger_fn_0`). */
  name: string;
  /** Ordered parameter list with C++ types. */
  params: { name: string; cppType: string }[];
  /** C++ function body (statements, no outer braces). */
  body: string;
}

/** Configuration for a single theme scope in the reactive runtime. */
export interface ThemeScopeConfig {
  /** Human-readable scope name (e.g. 'espcompose:ui'). */
  scope: string;
  /** 8-char hex hash — C++ identifier fragment. */
  scopeId: string;
  /** Theme memo declarations within this scope. */
  themeMemos: ThemeMemoDecl[];
  /** Default theme index within this scope. */
  defaultIndex: number;
  /** Ordered theme variant names. */
  themeNames: string[];
}

/** Declaration for a BoundSignal — wraps a pointer to an ESPHome global. */
export interface BoundSignalDecl {
  /** C++ variable name (e.g. `sig_global_my_counter`). */
  name: string;
  /** C++ type (e.g. `int`, `bool`, `float`, `std::string`). */
  cppType: string;
  /** ESPHome global component ID (used for bind() call). */
  globalId: string;
  /** Optional initial value literal (matching the ESPHome global's `initial_value`).
   *  Used to seed BoundSignal's local copy so `get()` is safe before bind(). */
  initialValue?: string;
}

/** A compile-time static data table emitted in the bindings header. */
export interface TableDecl {
  /** C++ identifier for the array (e.g. `tbl_popup_abc_entity_ids`). */
  name: string;
  /** Element C++ type (e.g. `const char*`, `int32_t`, `bool`). */
  elementCppType: string;
  /** Pre-formatted C++ literal strings for each element. */
  values: string[];
}

export interface ReactiveRuntimeConfig {
  signals: SignalDecl[];
  /** BoundSignal declarations for globals with reactive dependents. */
  globalSignals: BoundSignalDecl[];
  memos: MemoDecl[];
  effects: EffectDecl[];
  widgetBindings: WidgetBindingDecl[];
  /** Per-scope theme configurations. */
  themes?: ThemeScopeConfig[];
  /** Compiled trigger functions (from device.inline/device.script AST compilation). */
  triggerFunctions?: TriggerFunctionDecl[];
  /** Map from IRReactiveNode nodeId → sequential C++ memo name (e.g. `memo_0`).
   *  Used by the YAML backend to reference the correct memo variables. */
  memoNames?: Map<string, string>;
  /** Static data tables for table-driven mux optimisation. */
  tables?: TableDecl[];
  /** Pre-formatted closure-table block (struct + array per parameterized script). */
  closureTablesBlock?: string;
  /** Declarative style transitions to emit as static lv_style_transition_dsc_t structs. */
  styleTransitions?: StyleTransitionDecl[];
  /** Animated binding transitions — augment Effect closures with lv_anim_t interpolation. */
  animateTransitions?: AnimateTransitionDecl[];
}

// ── Style transition C++ declarations ──────────────────────────────────────

export interface StyleTransitionDecl {
  /** Target widget ref ID (used to look up the lv_obj_t at runtime). */
  targetRef: string;
  /** Widget type — pages use `.obj` access. */
  targetType?: string;
  /** LVGL part (snake_case, e.g. 'indicator'). Defaults to 'main'. */
  part?: string;
  /** LVGL state (snake_case, e.g. 'pressed'). Defaults to 'default'. */
  state?: string;
  /** Transition descriptor groups — each becomes one lv_style_transition_dsc_t. */
  descriptors: StyleTransitionDescriptorDecl[];
}

export interface StyleTransitionDescriptorDecl {
  /** snake_case LVGL style property names (e.g. 'bg_color', 'opa'). */
  properties: string[];
  /** Duration in milliseconds. */
  durationMs: number;
  /** LVGL easing path callback name (e.g. 'lv_anim_path_ease_out'). */
  easingCb: string;
  /** Delay in milliseconds. */
  delayMs: number;
}

// ── Animate transition C++ declarations ────────────────────────────────────

export interface AnimateTransitionDecl {
  /** Target widget ref ID. */
  targetRef: string;
  /** snake_case LVGL style property name (e.g. 'pad_bottom'). */
  property: string;
  /** Duration in milliseconds. */
  durationMs: number;
  /** LVGL easing path callback name (e.g. 'lv_anim_path_ease_out'). */
  easingCb: string;
  /** Direction constraint: 'decrease' | 'increase' | 'both'. */
  direction: 'decrease' | 'increase' | 'both';
}

// ── C++ code generation ────────────────────────────────────────────────────

/**
 * Generate the full contents of espcompose_bindings.h.
 */
export function generateBindingsHeader(config: ReactiveRuntimeConfig): string {
  const lines: string[] = [];

  const themeScopes = config.themes ?? [];
  const allThemeMemos = themeScopes.flatMap(sc => sc.themeMemos);

  lines.push('// Auto-generated by espcompose — do not edit');
  lines.push('#pragma once');
  lines.push('');
  lines.push('#include "esphome/components/espcompose/espcompose_reactive.h"');
  lines.push('#include "esphome/components/espcompose/espcompose_runtime.h"');
  lines.push('#include "esphome/components/espcompose/espcompose_animate.h"');
  lines.push('');

  // Provide operator!= for LVGL color types (needed by Signal/Memo<lv_color_t>::update)
  const hasColorType = allThemeMemos.some(tm => tm.cppType === 'lv_color_t');
  if (hasColorType) {
    lines.push('inline bool operator!=(lv_color_t a, lv_color_t b) { return memcmp(&a, &b, sizeof(lv_color_t)) != 0; }');
    lines.push('');
  }

  lines.push('namespace espcompose {');
  lines.push('');
  lines.push('using esphome::id;');
  lines.push('using esphome::to_string;');
  lines.push('');
  lines.push('// ── id() result normalizer ──');
  lines.push('// ESPHome\'s `id(X)` returns `T&` for LVGL widgets but `T*` for component');
  lines.push('// accessors. These overloads collapse both to a uniform `T*`, so closure');
  lines.push('// tables can store one normalized lookup-array element type.');
  lines.push('template<typename T> constexpr T* _ec_id_ptr(T& v) noexcept { return &v; }');
  lines.push('template<typename T> constexpr T* _ec_id_ptr(T* v) noexcept { return v; }');
  lines.push('');

  // ── HA service call helper ─────────────────────────────────────────────
  const triggerFunctions = config.triggerFunctions ?? [];
  const needsHAHelper = triggerFunctions.some(fn => fn.body.includes('call_ha_service('));
  if (needsHAHelper) {
    lines.push('// ── HA service call helper ──');
    lines.push('inline std::string num_to_str(float v) {');
    lines.push('  int i = static_cast<int>(v);');
    lines.push('  if (static_cast<float>(i) == v) return std::to_string(i);');
    lines.push('  char buf[32]; snprintf(buf, sizeof(buf), "%g", static_cast<double>(v));');
    lines.push('  return buf;');
    lines.push('}');
    lines.push('inline void call_ha_service(const char* service,');
    lines.push('    std::initializer_list<std::pair<const char*, std::string>> data) {');
    lines.push('  esphome::api::HomeassistantActionRequest msg;');
    lines.push('  msg.service = esphome::StringRef(service);');
    lines.push('  msg.data.init(data.size());');
    lines.push('  for (const auto& kv : data) {');
    lines.push('    auto& entry = msg.data.emplace_back();');
    lines.push('    entry.key = esphome::StringRef(kv.first);');
    lines.push('    entry.value = esphome::StringRef(kv.second);');
    lines.push('  }');
    lines.push('  esphome::api::global_api_server->send_homeassistant_action(msg);');
    lines.push('}');
    lines.push('');
  }

  // ── Signal declarations ────────────────────────────────────────────────
  if (config.signals.length > 0) {
    lines.push('// ── Signals (one per HA entity source) ──');
    for (const sig of config.signals) {
      lines.push(`Signal<${sig.cppType}> ${sig.name};`);
    }
    lines.push('');
  }

  // ── BoundSignal declarations (one per reactive global) ─────────────────
  if (config.globalSignals.length > 0) {
    lines.push('// ── BoundSignals (one per reactive global variable) ──');
    for (const gs of config.globalSignals) {
      // Seed BoundSignal with the global's initial_value so reads before
      // bind() (e.g. inline LVGL widget style initializers in main.cpp's
      // setup() function) return well-defined data instead of dereferencing
      // a null pointer.
      if (gs.initialValue !== undefined) {
        lines.push(`BoundSignal<${gs.cppType}> ${gs.name}(${gs.cppType}(${gs.initialValue}));`);
      } else {
        lines.push(`BoundSignal<${gs.cppType}> ${gs.name};`);
      }
    }
    lines.push('');
  }

  // ── Theme infrastructure (per-scope) ────────────────────────────────
  for (const sc of themeScopes) {
    const indexName = `theme_index_${sc.scopeId}`;
    lines.push(`// ── Theme scope: ${sc.scope} (${sc.scopeId}) ──`);
    lines.push(`Signal<int32_t> ${indexName};`);
    lines.push('');

    for (const tm of sc.themeMemos) {
      const arrName = `${tm.name}_vals`;
      const valStrs = tm.values.map((v) => toCppLiteral(v, tm.cppType));
      const arrType = cppArrayType(tm.cppType);

      if (tm.cppType === 'const lv_font_t*') {
        // Font pointers must be resolved lazily — ESPHome Font components
        // aren't ready at static-init time.  Use a local static inside the
        // lambda so the array is initialised on first access (after setup()).
        const storagePrefix = arrType.startsWith('const ') ? 'static' : 'static const';
        lines.push(`Memo<${tm.cppType}> ${tm.name}([]() -> ${tm.cppType} {`);
        lines.push(`  ${storagePrefix} ${arrType} ${arrName}[] = {${valStrs.join(', ')}};`);
        lines.push(`  return ${arrName}[${indexName}.get()];`);
        lines.push('});');
      } else {
        const storagePrefix = arrType.startsWith('const ') ? 'static' : 'static const';
        lines.push(`${storagePrefix} ${arrType} ${arrName}[] = {${valStrs.join(', ')}};`);
        lines.push(`Memo<${tm.cppType}> ${tm.name}([]() -> ${tm.cppType} {`);
        if (tm.cppType === 'std::string') {
          lines.push(`  return std::string(${arrName}[${indexName}.get()]);`);
        } else {
          lines.push(`  return ${arrName}[${indexName}.get()];`);
        }
        lines.push('});');
      }
      lines.push('');
    }

    // select_theme_<scopeId>(name) — maps theme name to index and requests flush
    if (sc.themeNames.length > 0) {
      lines.push(`void select_theme_${sc.scopeId}(const char* name) {`);
      for (let i = 0; i < sc.themeNames.length; i++) {
        const cond = i === 0 ? 'if' : 'else if';
        lines.push(`  ${cond} (strcmp(name, "${sc.themeNames[i]}") == 0) { ${indexName}.set(${i}); }`);
      }
      lines.push('  espcompose::flush();');
      lines.push('}');
      lines.push('');
    }
  }

  // ── Static data tables ─────────────────────────────────────────────────
  if (config.tables && config.tables.length > 0) {
    lines.push('// ── Static data tables (table-driven mux) ──');
    for (const tbl of config.tables) {
      const prefix = tbl.elementCppType.startsWith('const ') ? 'static' : 'static const';
      lines.push(`${prefix} ${tbl.elementCppType} ${tbl.name}[] = {`);
      for (let i = 0; i < tbl.values.length; i++) {
        const comma = i < tbl.values.length - 1 ? ',' : '';
        lines.push(`  ${tbl.values[i]}${comma}`);
      }
      lines.push('};');
      lines.push('');
    }
  }

  // ── Script closure tables ───────────────────────────────────────────────
  if (config.closureTablesBlock && config.closureTablesBlock.length > 0) {
    lines.push(config.closureTablesBlock);
    lines.push('');
  }

  // ── Memo declarations (with alias deduplication) ───────────────────────
  const canonicalMemos = config.memos.filter(m => m.canonicalIndex == null);
  const aliasMemos = config.memos.filter(m => m.canonicalIndex != null);

  if (canonicalMemos.length > 0) {
    lines.push('// ── Memos (derived values) ──');
    for (const memo of canonicalMemos) {
      lines.push(`Memo<${memo.cppReturnType}> memo_${memo.index}([]() -> ${memo.cppReturnType} {`);
      if (memo.cppBodyLines && memo.cppBodyLines.length > 0) {
        for (const bodyLine of memo.cppBodyLines) {
          lines.push(`  ${bodyLine}`);
        }
      } else {
        lines.push(`  return ${memo.cppExpression};`);
      }
      lines.push('});');
      lines.push('');
    }
  }

  if (aliasMemos.length > 0) {
    lines.push('// ── Memo aliases (deduplicated) ──');
    for (const memo of aliasMemos) {
      lines.push(`auto& memo_${memo.index} = memo_${memo.canonicalIndex};`);
    }
    lines.push('');
  }

  // ── Compiled trigger functions ───────────────────────────────────────────
  if (triggerFunctions.length > 0) {
    lines.push('// ── Compiled trigger functions (from device.inline/device.script) ──');
    for (const fn of triggerFunctions) {
      const params = fn.params.map(p => `${p.cppType} ${p.name}`).join(', ');
      lines.push(`void ${fn.name}(${params}) {`);
      for (const line of fn.body.split('\n')) {
        lines.push(`  ${line}`);
      }
      lines.push('}');
      lines.push('');
    }
  }

  // ── Style transition static declarations ──────────────────────────────────
  const styleTransitions = config.styleTransitions ?? [];
  if (styleTransitions.length > 0) {
    lines.push('// ── Style transition descriptors ──');
    let transIdx = 0;
    for (const trans of styleTransitions) {
      for (let d = 0; d < trans.descriptors.length; d++) {
        const desc = trans.descriptors[d];
        const propConstants = desc.properties.map(p => resolveLvglStyleConstant(p));
        lines.push(`static const lv_style_prop_t ec_trans_props_${transIdx}[] = {${propConstants.join(', ')}, 0};`);
        lines.push(`static lv_style_transition_dsc_t ec_trans_dsc_${transIdx};`);
        lines.push(`static lv_style_t ec_trans_style_${transIdx};`);
        transIdx++;
      }
    }
    lines.push('');
  }

  // ── Animate transition exec callbacks & validation ────────────────────
  const animateTransitions = config.animateTransitions ?? [];
  // Build lookup: "widgetId:prop_snake" → AnimateTransitionDecl
  const animateTransitionMap = new Map<string, AnimateTransitionDecl>();
  if (animateTransitions.length > 0) {
    // Validate all animate transitions target real bindings with animatable types.
    const ANIMATABLE_CPP_TYPES = new Set(['lv_coord_t', 'lv_opa_t', 'uint32_t']);

    for (const at of animateTransitions) {
      // Find matching binding
      const matchingBinding = config.widgetBindings.find(b =>
        b.widgetId === at.targetRef && camelToSnake(b.prop) === at.property,
      );
      if (!matchingBinding) {
        throw new Error(
          `useAnimateTransition: no reactive binding found for property '${at.property}' ` +
          `on widget '${at.targetRef}'. The property must have a reactive value in the style object.`,
        );
      }

      // Validate the C++ type is animatable (int32_t-based)
      const descriptor = LVGL_STYLE_PROP_TABLE[at.property];
      if (!descriptor) {
        throw new Error(
          `useAnimateTransition: property '${at.property}' is not a known LVGL style property.`,
        );
      }
      if (!ANIMATABLE_CPP_TYPES.has(descriptor.cppType)) {
        throw new Error(
          `useAnimateTransition: property '${at.property}' has C++ type '${descriptor.cppType}' ` +
          `which is not animatable. Only numeric types (lv_coord_t, lv_opa_t, uint32_t) can be animated.`,
        );
      }

      const key = `${at.targetRef}:${at.property}`;
      animateTransitionMap.set(key, at);
    }

    // Emit deduplicated exec callbacks (one per property name)
    const emittedProps = new Set<string>();
    lines.push('// ── Animate transition exec callbacks ──');
    for (const at of animateTransitions) {
      if (emittedProps.has(at.property)) continue;
      emittedProps.add(at.property);

      const descriptor = LVGL_STYLE_PROP_TABLE[at.property]!;
      // Standard style setter pattern: lv_obj_set_style_<lvglSetter>(obj, val, selector)
      // The selector is fixed at LV_PART_MAIN | LV_STATE_DEFAULT for exec callbacks;
      // the animation operates on the object directly.
      lines.push(`static void _ec_anim_exec_${at.property}(void* obj, int32_t v) {`);
      lines.push(`  lv_obj_set_style_${descriptor.lvglSetter}((lv_obj_t*)obj, (${descriptor.cppType})v, LV_PART_MAIN | LV_STATE_DEFAULT);`);
      lines.push('}');
    }
    lines.push('');
  }

  // ── Runtime bootstrap ──────────────────────────────────────────────────
  lines.push('// ── Bootstrap: wire dependency graph ──');
  lines.push('void bootstrap_runtime() {');
  lines.push('  auto runtime = ::espcompose::EspcomposeRuntimeComponent::get_instance();');
  lines.push('  if (runtime == nullptr) {');
  lines.push('    ESP_LOGE("espcompose", "Runtime component not initialized before bootstrap");');
  lines.push('    return;');
  lines.push('  }');

  // Set per-scope theme_index defaults
  for (const sc of themeScopes) {
    lines.push(`  theme_index_${sc.scopeId}.set(${sc.defaultIndex});`);
  }
  if (themeScopes.length > 0) lines.push('');

  // Bind global BoundSignals to ESPHome global storage
  if (config.globalSignals.length > 0) {
    lines.push('  // ── Bind global BoundSignals to ESPHome global storage ──');
    for (const gs of config.globalSignals) {
      lines.push(`  ${gs.name}.bind(&id(${gs.globalId}));`);
    }
    lines.push('');
  }



  // ── User effect declarations (static local — constructed once at setup) ──
  if (config.effects.length > 0) {
    lines.push('  // ── User effects (side-effects) ──');
    for (const effect of config.effects) {
      lines.push(`  static Effect effect_${effect.index}([]() {`);
      lines.push(`    ${effect.cppBody}`);
      lines.push('  });');
      lines.push('');
    }
  }

  // ── Widget binding effects (static local, batched by source) ───────────
  if (config.widgetBindings.length > 0) {
    lines.push('  // ── Widget binding effects ──');

    // Group bindings by their reactive source(s) for batched Effects.
    const bindingGroups = new Map<string, WidgetBindingDecl[]>();
    for (const binding of config.widgetBindings) {
      const key = [...binding.sourceNames].sort().join(',');
      const group = bindingGroups.get(key) ?? [];
      group.push(binding);
      bindingGroups.set(key, group);
    }

    for (const [, bindings] of bindingGroups) {
      const first = bindings[0];
      if (bindings.length === 1) {
        // Single binding — no batching needed
        const animCode = tryGenerateAnimatedUpdateCode(first, animateTransitionMap);
        if (animCode) {
          lines.push(`  static Effect binding_${first.index}([]() {`);
          for (const line of animCode) lines.push(`    ${line}`);
          lines.push('  });');
          lines.push('');
        } else {
          const updateCode = generateWidgetUpdateCode(first);
          lines.push(`  static Effect binding_${first.index}([]() {`);
          lines.push(`    ${updateCode}`);
          lines.push('  });');
          lines.push('');
        }
      } else {
        // Batched: one Effect for all bindings from the same source(s).
        // Cache the source value to avoid redundant .get() calls.
        lines.push(`  static Effect binding_${first.index}([]() {`);
        // Collect unique value expressions and cache each one.
        const exprToVar = new Map<string, string>();
        let varIdx = 0;
        for (const b of bindings) {
          if (!exprToVar.has(b.valueExpr)) {
            const varName = `_src${varIdx > 0 ? varIdx : ''}`;
            lines.push(`    auto ${varName} = ${b.valueExpr};`);
            exprToVar.set(b.valueExpr, varName);
            varIdx++;
          }
        }
        for (const b of bindings) {
          const cachedVar = exprToVar.get(b.valueExpr)!;
          const animCode = tryGenerateAnimatedUpdateCode({ ...b, valueExpr: cachedVar }, animateTransitionMap);
          if (animCode) {
            for (const line of animCode) lines.push(`    ${line}`);
          } else {
            const updateCode = generateWidgetUpdateCode({ ...b, valueExpr: cachedVar });
            lines.push(`    ${updateCode}`);
          }
        }
        lines.push('  });');
        lines.push('');
      }
    }
  }

  // Nodes self-schedule during construction (dirty=true + schedule(this)),
  // so no explicit schedule block is needed here.

  // Note: We intentionally do NOT batch style refreshes via
  // lv_obj_enable_style_refresh(false) + lv_obj_report_style_change(NULL).
  // The blanket NULL recalc is O(all_widgets) and takes 300ms+ on complex UIs.
  // Inline per-object refresh during node updates is O(changed_widgets) and
  // typically completes in <2ms.
  // ── Style transition init ──────────────────────────────────────────────
  if (styleTransitions.length > 0) {
    lines.push('');
    lines.push('  // ── Style transition initialization ──');
    let transIdx = 0;
    for (const trans of styleTransitions) {
      const obj = trans.targetType === 'page'
        ? `id(${trans.targetRef}).obj`
        : `&id(${trans.targetRef})`;
      for (let d = 0; d < trans.descriptors.length; d++) {
        const desc = trans.descriptors[d];
        lines.push(`  lv_style_transition_dsc_init(&ec_trans_dsc_${transIdx}, ec_trans_props_${transIdx}, ${desc.easingCb}, ${desc.durationMs}, ${desc.delayMs}, NULL);`);
        lines.push(`  lv_style_init(&ec_trans_style_${transIdx});`);
        lines.push(`  lv_style_set_transition(&ec_trans_style_${transIdx}, &ec_trans_dsc_${transIdx});`);
        const selector = computeTransitionSelector(trans.part, trans.state);
        lines.push(`  lv_obj_add_style(${obj}, &ec_trans_style_${transIdx}, ${selector});`);
        transIdx++;
      }
    }
  }

  lines.push('');

  lines.push('  espcompose::flush();  // Initial flush to process dirty nodes marked during setup');
  lines.push('}');

  lines.push('');
  lines.push('}  // namespace espcompose');

  return lines.join('\n');
}

/**
 * Compute the LVGL style selector flag from binding part/state metadata.
 * Returns e.g. 'LV_PART_MAIN | LV_STATE_DEFAULT' or 'LV_PART_INDICATOR | LV_STATE_PRESSED'.
 */
function computeStyleFlag(binding: WidgetBindingDecl): string {
  const partKey = binding.part ? camelToSnake(binding.part) : 'main';
  const stateKey = binding.state ? camelToSnake(binding.state) : 'default';
  const partFlag = LVGL_PART_FLAGS[partKey];
  const stateFlag = LVGL_STATE_FLAGS[stateKey];
  if (!partFlag) {
    throw new Error(`Unknown LVGL part '${partKey}' for widget binding`);
  }
  if (!stateFlag) {
    throw new Error(`Unknown LVGL state '${stateKey}' for widget binding`);
  }
  return `(static_cast<lv_style_selector_t>(${partFlag}) | static_cast<lv_style_selector_t>(${stateFlag}))`;
}

/**
 * Compute LVGL style selector for a style transition.
 * Parts and states come in snake_case from the lowering pipeline.
 */
function computeTransitionSelector(part?: string, state?: string): string {
  const partKey = part ? camelToSnake(part) : 'main';
  const stateKey = state ? camelToSnake(state) : 'default';
  const partFlag = LVGL_PART_FLAGS[partKey];
  const stateFlag = LVGL_STATE_FLAGS[stateKey];
  if (!partFlag) {
    throw new Error(`Unknown LVGL part '${partKey}' for style transition`);
  }
  if (!stateFlag) {
    throw new Error(`Unknown LVGL state '${stateKey}' for style transition`);
  }
  return `(static_cast<lv_style_selector_t>(${partFlag}) | static_cast<lv_style_selector_t>(${stateFlag}))`;
}

/** Map an easing key (e.g. 'ease_out') to the LVGL C function pointer name. */
const EASING_TO_LV_PATH: Record<string, string> = {
  'linear': 'lv_anim_path_linear',
  'ease_in': 'lv_anim_path_ease_in',
  'ease_out': 'lv_anim_path_ease_out',
  'ease_in_out': 'lv_anim_path_ease_in_out',
  'overshoot': 'lv_anim_path_overshoot',
  'bounce': 'lv_anim_path_bounce',
  'step': 'lv_anim_path_step',
};

/**
 * Resolve an easing key to the LVGL C path callback function name.
 * Falls back to linear for unknown values.
 */
export function resolveEasingCb(easingKey: string): string {
  return EASING_TO_LV_PATH[easingKey] ?? 'lv_anim_path_linear';
}

/**
 * Generate C++ code for updating an LVGL widget property.
 *
 * Widget-specific props (text, checked, value, hidden) have dedicated logic.
 * Style props are resolved via LVGL_STYLE_PROP_TABLE for data-driven codegen.
 */
function generateWidgetUpdateCode(binding: WidgetBindingDecl): string {
  const { widgetId, widgetType, prop, valueExpr, cppType } = binding;
  // Pages are LvPageType (not lv_obj_t); access the inner .obj pointer
  const obj = widgetType === 'page' ? `id(${widgetId}).obj` : `&id(${widgetId})`;

  // ── Widget-specific props (need per-widget-type logic) ─────────────

  // Text properties
  if (prop === 'text') {
    if (widgetType === 'label' || widgetType === 'textarea') {
      if (cppType === 'std::string') {
        return `lv_label_set_text(${obj}, ${valueExpr}.c_str());`;
      }
      if (cppType === 'bool') {
        return `lv_label_set_text(${obj}, ${valueExpr} ? "on" : "off");`;
      }
      return `lv_label_set_text(${obj}, to_string(${valueExpr}).c_str());`;
    }
    if (widgetType === 'button' || widgetType === 'checkbox') {
      const childObj = `lv_obj_get_child(${obj}, 0)`;
      if (cppType === 'std::string') {
        return `lv_label_set_text(${childObj}, ${valueExpr}.c_str());`;
      }
      if (cppType === 'bool') {
        return `lv_label_set_text(${childObj}, ${valueExpr} ? "on" : "off");`;
      }
      return `lv_label_set_text(${childObj}, to_string(${valueExpr}).c_str());`;
    }
  }

  // Checked state (bool)
  if (prop === 'checked') {
    return `if (${valueExpr}) { lv_obj_add_state(${obj}, LV_STATE_CHECKED); } else { lv_obj_clear_state(${obj}, LV_STATE_CHECKED); }`;
  }

  // Value properties (widget-type-specific setters)
  if (prop === 'value') {
    if (widgetType === 'slider' || widgetType === 'arc' || widgetType === 'bar') {
      return `lv_${widgetType}_set_value(${obj}, static_cast<int32_t>(${valueExpr}), LV_ANIM_ON);`;
    }
    if (widgetType === 'spinbox') {
      return `lv_spinbox_set_value(${obj}, static_cast<int32_t>(${valueExpr}));`;
    }
  }

  // Hidden flag (not a style property)
  if (prop === 'hidden') {
    return `if (${valueExpr}) { lv_obj_add_flag(${obj}, LV_OBJ_FLAG_HIDDEN); } else { lv_obj_clear_flag(${obj}, LV_OBJ_FLAG_HIDDEN); }`;
  }

  // ── Table-driven style props ───────────────────────────────────────

  const descriptor = LVGL_STYLE_PROP_TABLE[camelToSnake(prop)];
  if (descriptor) {
    const STYLE_FLAG = computeStyleFlag(binding);
    const val = descriptor.cast ? descriptor.cast.replace('$V', valueExpr) : valueExpr;

    // Special: pad_all fans out to 4 pad directions
    if (descriptor.special === 'pad_all') {
      return [
        `{ auto _v = ${val};`,
        `lv_obj_set_style_pad_top(${obj}, _v, ${STYLE_FLAG});`,
        `lv_obj_set_style_pad_bottom(${obj}, _v, ${STYLE_FLAG});`,
        `lv_obj_set_style_pad_left(${obj}, _v, ${STYLE_FLAG});`,
        `lv_obj_set_style_pad_right(${obj}, _v, ${STYLE_FLAG}); }`,
      ].join(' ');
    }

    // Special: text_font — the value is already const lv_font_t* (from theme font_ref memo)
    if (descriptor.special === 'text_font') {
      return `lv_obj_set_style_text_font(${obj}, ${valueExpr}, ${STYLE_FLAG});`;
    }

    // Special: width/height use lv_obj_set_width/height (not set_style_*)
    if (descriptor.special === 'size_width') {
      return `lv_obj_set_width(${obj}, ${val});`;
    }
    if (descriptor.special === 'size_height') {
      return `lv_obj_set_height(${obj}, ${val});`;
    }

    // Standard style setter
    return `lv_obj_set_style_${descriptor.lvglSetter}(${obj}, ${val}, ${STYLE_FLAG});`;
  }

  // Unsupported prop
  return `/* unsupported: ${widgetType}.${prop} */`;
}

/**
 * Try to generate animated update code for a widget binding.
 *
 * Returns an array of C++ lines if the binding matches an animate transition,
 * or null if no animation applies (caller should use direct setter).
 *
 * The generated code uses lv_anim_t to interpolate from the current widget
 * value to the new reactive value, with an optional direction guard.
 */
function tryGenerateAnimatedUpdateCode(
  binding: WidgetBindingDecl,
  animateTransitionMap: Map<string, AnimateTransitionDecl>,
): string[] | null {
  const snakeProp = camelToSnake(binding.prop);
  const key = `${binding.widgetId}:${snakeProp}`;
  const at = animateTransitionMap.get(key);
  if (!at) return null;

  const descriptor = LVGL_STYLE_PROP_TABLE[snakeProp];
  if (!descriptor) return null;

  const obj = binding.widgetType === 'page'
    ? `id(${binding.widgetId}).obj`
    : `&id(${binding.widgetId})`;
  const cast = descriptor.cast ? descriptor.cast.replace('$V', binding.valueExpr) : binding.valueExpr;

  // Read current value from widget: lv_obj_get_style_<prop>(obj, part_flag)
  const partKey = binding.part ? camelToSnake(binding.part) : 'main';
  const partFlag = LVGL_PART_FLAGS[partKey] ?? 'LV_PART_MAIN';
  const getCurrent = `lv_obj_get_style_${descriptor.lvglSetter}(${obj}, ${partFlag})`;

  const directSetter = `lv_obj_set_style_${descriptor.lvglSetter}(${obj}, ${cast}, ${computeStyleFlag(binding)});`;

  const codeLines: string[] = [];
  codeLines.push(`{ auto _target = ${cast};`);
  codeLines.push(`  auto _cur = ${getCurrent};`);

  // Direction guard
  const needsGuard = at.direction !== 'both';
  if (needsGuard) {
    const cond = at.direction === 'decrease' ? '_target < _cur' : '_target > _cur';
    codeLines.push(`  if (${cond}) {`);
    codeLines.push(`    lv_anim_t _a;`);
    codeLines.push(`    lv_anim_init(&_a);`);
    codeLines.push(`    lv_anim_set_var(&_a, ${obj});`);
    codeLines.push(`    lv_anim_set_values(&_a, _cur, _target);`);
    codeLines.push(`    lv_anim_set_time(&_a, ${at.durationMs});`);
    codeLines.push(`    lv_anim_set_exec_cb(&_a, _ec_anim_exec_${snakeProp});`);
    codeLines.push(`    lv_anim_set_path_cb(&_a, ${at.easingCb});`);
    codeLines.push(`    lv_anim_start(&_a);`);
    codeLines.push(`  } else {`);
    codeLines.push(`    ${directSetter}`);
    codeLines.push(`  }`);
  } else {
    // Always animate
    codeLines.push(`  if (_target != _cur) {`);
    codeLines.push(`    lv_anim_t _a;`);
    codeLines.push(`    lv_anim_init(&_a);`);
    codeLines.push(`    lv_anim_set_var(&_a, ${obj});`);
    codeLines.push(`    lv_anim_set_values(&_a, _cur, _target);`);
    codeLines.push(`    lv_anim_set_time(&_a, ${at.durationMs});`);
    codeLines.push(`    lv_anim_set_exec_cb(&_a, _ec_anim_exec_${snakeProp});`);
    codeLines.push(`    lv_anim_set_path_cb(&_a, ${at.easingCb});`);
    codeLines.push(`    lv_anim_start(&_a);`);
    codeLines.push(`  }`);
  }
  codeLines.push('}');

  return codeLines;
}

// ── Theme value helpers ────────────────────────────────────────────────────

/**
 * Convert a JS theme leaf value to a C++ literal expression.
 */
function toCppLiteral(value: unknown, cppType: string): string {
  if (cppType === 'lv_color_t') {
    const hex = String(value).replace(/^#/, '');
    return `lv_color_hex(0x${hex})`;
  }
  if (cppType === 'const lv_font_t*') {
    // Font ref token (e.g. 'r_abc123') — id() returns esphome::font::Font,
    // call .get_lv_font() to obtain the const lv_font_t* pointer.
    return `id(${String(value)}).get_lv_font()`;
  }
  if (cppType === 'std::string' || cppType === 'const char*') {
    return `"${String(value)}"`;
  }
  if (cppType === 'float') {
    return `${Number(value)}f`;
  }
  // int32_t, bool, etc.
  return String(value);
}

/**
 * Return the C array element type for a theme value array.
 * For std::string we store char* and construct std::string in the memo.
 */
function cppArrayType(cppType: string): string {
  if (cppType === 'std::string') return 'char* const';
  if (cppType === 'const char*') return 'const char*';
  return cppType;
}

// ── Trigger lambda generation ──────────────────────────────────────────────

/**
 * Generate the C++ lambda body for an on_state/on_value trigger that
 * sets a signal and flushes the scheduler.
 *
 * @param signalName - C++ signal variable name (e.g. `sig_ha_light_kitchen`)
 * @param triggerVar - The trigger variable name (e.g. `x` for bool, `x` for float)
 * @returns Lambda body string for YAML `!lambda`
 */

export function generateSignalSetLambda(
  signalName: string,
  triggerVar = 'x'
): string {
  return [
    `espcompose::${signalName}.set(${triggerVar});`,
    `espcompose::flush();`,
  ].join(' ');
}
/**
 * Generate the C++ lambda body for a widget's initial value.
 * Reads from the signal/memo to provide the initial prop value.
 *
 * @param valueExpr - C++ expression for the value (e.g. `sig_X.get()`, `memo_0.get()`)
 * @param cppType - C++ type of the value
 * @returns Lambda body string for YAML `!lambda`
 */
export function generateInitialValueLambda(valueExpr: string, cppType: string): string {
  if (cppType === 'std::string') {
    return `return espcompose::${valueExpr}.c_str();`;
  }
  return `return espcompose::${valueExpr};`;
}

/**
 * Return the contents of espcompose_reactive.h by reading the static asset file.
 */
export function getRuntimeHeaderContent(): string {
  const assetPath = path.resolve(__dirname, '..', '..', 'assets', 'external-component', 'espcompose_reactive.h');
  return fs.readFileSync(assetPath, 'utf8');
}
