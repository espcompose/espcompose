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

import { LVGL_STYLE_PROP_TABLE, LVGL_PART_FLAGS, LVGL_STATE_FLAGS } from '@espcompose/core/internals';
import * as fs from 'fs';
import * as path from 'path';

// ── Input data types ───────────────────────────────────────────────────────

export interface SignalDecl {
  /** C++ variable name (e.g. `sig_ha_light_kitchen_floods`). */
  name: string;
  /** C++ type (e.g. `bool`, `float`, `std::string`). */
  cppType: string;
}

export interface MemoDecl {
  /** Unique index for this memo (e.g. 0, 1, 2...). */
  index: number;
  /** C++ return type (e.g. `std::string`, `float`, `bool`). */
  cppReturnType: string;
  /** C++ expression body (from memo-codegen). */
  cppExpression: string;
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
  values: unknown[];
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
}

export interface ReactiveRuntimeConfig {
  signals: SignalDecl[];
  /** BoundSignal declarations for globals with reactive dependents. */
  globalSignals: BoundSignalDecl[];
  memos: MemoDecl[];
  effects: EffectDecl[];
  widgetBindings: WidgetBindingDecl[];
  /** Per-scope theme configurations. */
  themeScopes?: ThemeScopeConfig[];
  /** Compiled trigger functions (from device.inline/device.script AST compilation). */
  triggerFunctions?: TriggerFunctionDecl[];
}

// ── C++ code generation ────────────────────────────────────────────────────

/**
 * Compute the ESPCOMPOSE_MAX_NODES capacity for the reactive runtime.
 */
export function computeMaxNodes(config: ReactiveRuntimeConfig): number {
  const themeScopes = config.themeScopes ?? [];
  const totalThemeMemos = themeScopes.reduce((sum, sc) => sum + sc.themeMemos.length, 0);
  const themeSignalCount = themeScopes.length; // one theme_index per scope
  const canonicalMemoCount = config.memos.filter(m => m.canonicalIndex == null).length;

  const bindingGroupKeys = new Set<string>();
  for (const b of config.widgetBindings) {
    bindingGroupKeys.add([...b.sourceNames].sort().join(','));
  }
  const batchedBindingCount = bindingGroupKeys.size;

  const totalNodes =
    config.signals.length +
    config.globalSignals.length +
    themeSignalCount +
    totalThemeMemos +
    canonicalMemoCount +
    config.effects.length +
    batchedBindingCount;

  return totalNodes + 16;
}

/**
 * Generate the full contents of espcompose_bindings.h.
 */
export function generateBindingsHeader(config: ReactiveRuntimeConfig): string {
  const lines: string[] = [];

  // ── Compute subscriber counts for the reactive runtime ──────────────
  const themeScopes = config.themeScopes ?? [];
  const allThemeMemos = themeScopes.flatMap(sc => sc.themeMemos);

  // Count batched binding Effects (one per unique source group)
  const bindingGroupKeys = new Set<string>();
  for (const b of config.widgetBindings) {
    bindingGroupKeys.add([...b.sourceNames].sort().join(','));
  }

  // Max fan-out: theme_index_<scopeId> → all theme memos is typically the largest.
  // Also account for signal → memos/bindings and memo → bindings.
  // Only count subscribers for canonical memos (aliases are references).
  const subscriberCounts = new Map<string, number>();
  const incSub = (src: string) => subscriberCounts.set(src, (subscriberCounts.get(src) ?? 0) + 1);
  for (const sc of themeScopes) {
    const indexName = `theme_index_${sc.scopeId}`;
    for (const _tm of sc.themeMemos) incSub(indexName);
  }
  // Account for global signal subscribers
  for (const _gs of config.globalSignals) {
    // Global signals get subscribers from memos and bindings that reference them,
    // which are already counted in the memo/effect/binding loops below.
  }
  for (const memo of config.memos) {
    if (memo.canonicalIndex != null) continue; // alias — no wiring
    for (const s of memo.sourceSignals) incSub(s);
  }
  for (const effect of config.effects) {
    for (const s of effect.sourceNames) incSub(s);
  }
  // For batched bindings, each source group subscribes once (not per-binding)
  for (const key of bindingGroupKeys) {
    const sourceNames = key.split(',');
    for (const s of sourceNames) incSub(s);
  }

  lines.push('// Auto-generated by espcompose — do not edit');
  lines.push('#pragma once');
  lines.push('');
  lines.push('#include "esphome/components/espcompose/espcompose_reactive.h"');
  lines.push('#include "esphome/components/espcompose/espcompose_runtime.h"');
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
      lines.push(`BoundSignal<${gs.cppType}> ${gs.name};`);
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
      lines.push('  if (auto rt = ::espcompose::EspcomposeRuntimeComponent::get_instance()) { rt->request_flush(); }');
      lines.push('}');
      lines.push('');
    }
  }

  // ── Memo declarations (with alias deduplication) ───────────────────────
  const canonicalMemos = config.memos.filter(m => m.canonicalIndex == null);
  const aliasMemos = config.memos.filter(m => m.canonicalIndex != null);

  if (canonicalMemos.length > 0) {
    lines.push('// ── Memos (derived values) ──');
    for (const memo of canonicalMemos) {
      lines.push(`Memo<${memo.cppReturnType}> memo_${memo.index}([]() -> ${memo.cppReturnType} {`);
      lines.push(`  return ${memo.cppExpression};`);
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

  // ── Allocate exact-sized subscriber storage for each node ──────────
  // The codegen knows the full dependency graph, so we emit perfectly-
  // sized static arrays — no wasted memory on nodes with few/no subscribers.
  lines.push('  // ── Subscriber storage (exact-sized per node) ──');
  for (const [nodeName, count] of subscriberCounts.entries()) {
    lines.push(`  static NodeBase* ${nodeName}_subs[${count}];`);
    lines.push(`  ${nodeName}.set_subscriber_storage(${nodeName}_subs, ${count});`);
  }
  lines.push('');

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
        const updateCode = generateWidgetUpdateCode(first);
        lines.push(`  static Effect binding_${first.index}([]() {`);
        lines.push(`    ${updateCode}`);
        lines.push('  });');
        lines.push('');
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
          const updateCode = generateWidgetUpdateCode({ ...b, valueExpr: cachedVar });
          lines.push(`    ${updateCode}`);
        }
        lines.push('  });');
        lines.push('');
      }
    }
  }

  // Wire theme memos (each scope's memos depend on their scope's theme_index)
  for (const sc of themeScopes) {
    const indexName = `theme_index_${sc.scopeId}`;
    for (const tm of sc.themeMemos) {
      const src = `${tm.name}_src`;
      lines.push(`  static NodeBase* ${src}[] = {&${indexName}};`);
      lines.push(`  ${tm.name}.wire(${src}, 1);`);
    }
  }

  // Wire memos (only canonical — aliases are references, not separate nodes)
  for (const memo of canonicalMemos) {
    if (memo.sourceSignals.length > 0) {
      const sourcesVar = `memo_${memo.index}_sources`;
      lines.push(`  static NodeBase* ${sourcesVar}[] = {${memo.sourceSignals.map(s => `&${s}`).join(', ')}};`);
      lines.push(`  memo_${memo.index}.wire(${sourcesVar}, ${memo.sourceSignals.length});`);
    }
  }

  // Wire user effects
  for (const effect of config.effects) {
    if (effect.sourceNames.length > 0) {
      const sourcesVar = `effect_${effect.index}_sources`;
      lines.push(`  static NodeBase* ${sourcesVar}[] = {${effect.sourceNames.map(s => `&${s}`).join(', ')}};`);
      lines.push(`  effect_${effect.index}.wire(${sourcesVar}, ${effect.sourceNames.length});`);
    }
  }

  // Wire widget binding effects (batched — one per source group)
  {
    const wiredGroups = new Map<string, WidgetBindingDecl>();
    for (const binding of config.widgetBindings) {
      const key = [...binding.sourceNames].sort().join(',');
      if (!wiredGroups.has(key)) {
        wiredGroups.set(key, binding);
      }
    }
    for (const [, binding] of wiredGroups) {
      if (binding.sourceNames.length > 0) {
        const sourcesVar = `binding_${binding.index}_sources`;
        lines.push(`  static NodeBase* ${sourcesVar}[] = {${binding.sourceNames.map(s => `&${s}`).join(', ')}};`);
        lines.push(`  binding_${binding.index}.wire(${sourcesVar}, ${binding.sourceNames.length});`);
      }
    }
  }

  // Schedule all dirty nodes so the initial flush actually processes them.
  // Constructors set dirty=true but don't enqueue, so we must do it here.
  lines.push('');
  for (const sc of themeScopes) {
    for (const tm of sc.themeMemos) {
      lines.push(`  Scheduler::instance().schedule(&${tm.name});`);
    }
  }
  // Schedule only canonical memos (aliases are references to canonicals)
  for (const memo of canonicalMemos) {
    lines.push(`  Scheduler::instance().schedule(&memo_${memo.index});`);
  }
  for (const effect of config.effects) {
    lines.push(`  Scheduler::instance().schedule(&effect_${effect.index});`);
  }
  // Schedule only one binding Effect per source group (batched)
  {
    const scheduledGroups = new Map<string, WidgetBindingDecl>();
    for (const binding of config.widgetBindings) {
      const key = [...binding.sourceNames].sort().join(',');
      if (!scheduledGroups.has(key)) {
        scheduledGroups.set(key, binding);
      }
    }
    for (const [, binding] of scheduledGroups) {
      lines.push(`  Scheduler::instance().schedule(&binding_${binding.index});`);
    }
  }

  // Register LVGL flush batching hooks so all widget updates
  // are applied in a single render pass.
  lines.push('  Scheduler::instance().set_pre_flush([]() {');
  lines.push('    lv_obj_enable_style_refresh(false);');
  lines.push('  });');
  lines.push('  Scheduler::instance().set_post_flush([]() {');
  lines.push('    lv_obj_enable_style_refresh(true);');
  lines.push('    lv_obj_report_style_change(NULL);');
  lines.push('  });');
  lines.push('');

  lines.push('  if (auto rt = ::espcompose::EspcomposeRuntimeComponent::get_instance()) {');
  lines.push('    rt->request_flush();  // Initial flush to process dirty nodes marked during setup');
  lines.push('  }');
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
  const partFlag = LVGL_PART_FLAGS[binding.part ?? 'main'] ?? 'LV_PART_MAIN';
  const stateFlag = LVGL_STATE_FLAGS[binding.state ?? 'default'] ?? 'LV_STATE_DEFAULT';
  return `(static_cast<lv_style_selector_t>(${partFlag}) | static_cast<lv_style_selector_t>(${stateFlag}))`;
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

  const descriptor = LVGL_STYLE_PROP_TABLE[prop];
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

    // Special: text_font — the value is already const lv_font_t* (from theme font_ptr memo)
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
    `if (auto rt = ::espcompose::EspcomposeRuntimeComponent::get_instance()) { rt->request_flush(); }`,
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
  const assetPath = path.resolve(__dirname, '..', 'assets', 'external-component', 'espcompose_reactive.h');
  return fs.readFileSync(assetPath, 'utf8');
}
