// ────────────────────────────────────────────────────────────────────────────
// IR-based simulator renderer — SemanticIR → RuntimeNode[]
//
// Walks the SemanticIR config tree and produces the same RuntimeNode[] that
// the old hook-patching renderer creates, but without any SDK hook
// interception, Proxy, or withScriptScope wrapping.
//
// The renderer:
//   1. Finds the LVGL section in ir.sections
//   2. Walks the IR tree extracting pages and widgets
//   3. Classifies each prop: IRReactive → ReactiveProp, IRRef → RefProp,
//      IRAction → ActionProp, IRScalar → StaticProp
//   4. Wires reactive props to JS Signal/Memo for MockProvider-driven updates
//
// This replaces: runtime/hooks.ts + runtime/render.ts for the build pipeline.
// The existing hooks/render are kept for standalone use (testing, REPL).
// ────────────────────────────────────────────────────────────────────────────

import type { ExprNode } from '@esphome/compose';
import type { SemanticIR, IRValue, IRObject, IRReactive, IRRef, IRAction, IRSecret, IRTriggerVar, ActionNode } from '@esphome/compose/internals';
import type { RuntimeNode, RuntimeProp, RuntimeDependency, ActionStep } from '../types';
import { Signal, Scheduler } from '../runtime/signals';
import type { MockProvider } from '../providers/mock-provider';
import { exprToJs } from './expr-to-js.js';
import type { JsLoweringContext } from './expr-to-js.js';

// ────────────────────────────────────────────────────────────────────────────
// Entity signal management — wires HA entity state to JS Signals
// ────────────────────────────────────────────────────────────────────────────

interface EntitySignals {
  stateSignal: Signal<string>;
  isOnSignal: Signal<boolean>;
  attributeSignals: Map<string, Signal<unknown>>;
}

class EntitySignalRegistry {
  private entitySignals = new Map<string, EntitySignals>();
  private provider: MockProvider;

  constructor(provider: MockProvider) {
    this.provider = provider;
  }

  getOrCreate(entityId: string): EntitySignals {
    let entry = this.entitySignals.get(entityId);
    if (entry) return entry;

    this.provider.ensureEntity(entityId);
    const state = this.provider.getEntityState(entityId);

    const stateSignal = new Signal<string>(state.state);
    const isOnSignal = new Signal<boolean>(state.state === 'on');
    const attributeSignals = new Map<string, Signal<unknown>>();

    for (const [key, val] of Object.entries(state.attributes)) {
      attributeSignals.set(key, new Signal<unknown>(val));
    }

    entry = { stateSignal, isOnSignal, attributeSignals };
    this.entitySignals.set(entityId, entry);

    // Subscribe to provider changes
    this.provider.onEntityChange(entityId, (newState) => {
      stateSignal.set(newState.state);
      isOnSignal.set(newState.state === 'on');
      for (const [key, val] of Object.entries(newState.attributes)) {
        let attrSig = attributeSignals.get(key);
        if (!attrSig) {
          attrSig = new Signal<unknown>(val);
          attributeSignals.set(key, attrSig);
        } else {
          attrSig.set(val);
        }
      }
      Scheduler.instance().flush();
    });

    return entry;
  }
}

// ────────────────────────────────────────────────────────────────────────────
// Walk context
// ────────────────────────────────────────────────────────────────────────────

interface IRRenderContext {
  entityRegistry: EntitySignalRegistry;
  provider: MockProvider;
  nodeCounter: number;
}

// ────────────────────────────────────────────────────────────────────────────
// IR value → RuntimeProp classification
// ────────────────────────────────────────────────────────────────────────────

function irValueToRuntimeProp(
  key: string,
  value: IRValue,
  ctx: IRRenderContext,
): RuntimeProp {
  switch (value.kind) {
    case 'reactive':
      return irReactiveToRuntimeProp(value, ctx);

    case 'ref':
      return { kind: 'ref', refId: (value as IRRef).token };

    case 'action':
      return irActionToRuntimeProp(value as IRAction, ctx);

    case 'secret':
      return { kind: 'static', value: `***${(value as IRSecret).key}***` };

    case 'trigger_var':
      return { kind: 'static', value: `\${${(value as IRTriggerVar).name}}` };

    case 'scalar':
      return { kind: 'static', value: value.value };

    case 'null':
      return { kind: 'static', value: null };

    case 'array':
      // Arrays as prop values — flatten to their static representation
      return { kind: 'static', value: value.items.map(item => irValueToPlain(item)) };

    case 'object':
      // Nested objects (e.g. style sub-objects) — flatten to plain for now
      return { kind: 'static', value: irObjectToPlain(value as IRObject) };

    default:
      return { kind: 'static', value: null };
  }
}

function irValueToPlain(value: IRValue): unknown {
  switch (value.kind) {
    case 'scalar': return value.value;
    case 'null': return null;
    case 'array': return value.items.map(irValueToPlain);
    case 'object': return irObjectToPlain(value);
    case 'reactive': return reactiveDefaultValue(value);
    case 'ref': return (value as IRRef).token;
    case 'secret': return `***${(value as IRSecret).key}***`;
    case 'trigger_var': return `\${${(value as IRTriggerVar).name}}`;
    default: return null;
  }
}

function irObjectToPlain(obj: IRObject): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const entry of obj.entries) {
    result[entry.key] = irValueToPlain(entry.value);
  }
  return result;
}

// ── Reactive prop handling ───────────────────────────────────────────────────

function irReactiveToRuntimeProp(
  reactive: IRReactive,
  ctx: IRRenderContext,
): RuntimeProp {
  const node = reactive.node;
  const deps: RuntimeDependency[] = [];

  // Extract dependency info and wire JS signals
  for (const dep of node.dependencies) {
    deps.push({
      sourceId: dep.sourceId,
      sourceType: dep.sourceType === 'theme' ? 'theme' : 'ha_entity',
      property: node.property ?? dep.triggerType ?? 'state',
    });

    // Ensure entity signals exist for HA dependencies
    if (dep.sourceType !== 'theme') {
      const entityId = dep.sourceId;
      if (entityId) {
        ctx.entityRegistry.getOrCreate(entityId);
      }
    }
  }

  // Use ExprIR for evaluation if available, otherwise fall back to type-based defaults.
  let evaluate: () => unknown;
  let current: unknown;

  if (node.exprIR) {
    const jsCtx = buildJsLoweringContext(node.exprIR, ctx);
    const evaluator = exprToJs(node.exprIR, jsCtx);
    try { current = evaluator(); } catch { current = reactiveDefaultValue(reactive); }
    evaluate = evaluator;
  } else {
    current = reactiveDefaultValue(reactive);
    evaluate = () => reactiveDefaultValue(reactive);
  }

  return {
    kind: 'reactive',
    current,
    evaluate,
    dependencies: deps,
  };
}

// ── ExprIR → JS lowering context builder ─────────────────────────────────────

/**
 * Derive the generated sensor ID from an HA entity ID.
 * Matches the pattern used by the SDK: `ha_${entityId.replace('.', '_')}`
 */
function entityIdToGeneratedId(entityId: string): string {
  return `ha_${entityId.replace('.', '_')}`;
}

/**
 * Walk an ExprNode tree and call the visitor on each node.
 */
function walkExprNode(node: ExprNode, visitor: (n: ExprNode) => void): void {
  visitor(node);
  switch (node.kind) {
    case 'binary': walkExprNode(node.left, visitor); walkExprNode(node.right, visitor); break;
    case 'unary': case 'postfix': walkExprNode(node.operand, visitor); break;
    case 'ternary': walkExprNode(node.test, visitor); walkExprNode(node.consequent, visitor); walkExprNode(node.alternate, visitor); break;
    case 'call': node.args.forEach(a => walkExprNode(a, visitor)); break;
    case 'concat': node.parts.forEach(p => walkExprNode(p, visitor)); break;
    case 'to_string': case 'group': walkExprNode(node.expr, visitor); break;
    case 'resolve_font': walkExprNode(node.family, visitor); walkExprNode(node.size, visitor); break;
  }
}

/**
 * Build a JsLoweringContext for evaluating an ExprNode in the simulator.
 * Creates entity getters wired to the EntitySignalRegistry.
 */
function buildJsLoweringContext(exprIR: ExprNode, ctx: IRRenderContext): JsLoweringContext {
  const entityGetters = new Map<string, () => unknown>();

  walkExprNode(exprIR, (node) => {
    if (node.kind === 'entity_prop') {
      const key = `${node.entityId}::${node.property}`;
      if (entityGetters.has(key)) return;

      const genId = entityIdToGeneratedId(node.entityId);
      const signals = ctx.entityRegistry.getOrCreate(genId);

      switch (node.property) {
        case 'isOn':
        case 'isOpen':
          entityGetters.set(key, () => signals.isOnSignal.get());
          break;
        case 'value':
        case 'brightness':
          entityGetters.set(key, () => {
            const raw = signals.stateSignal.get();
            const num = Number(raw);
            return isNaN(num) ? 0 : num;
          });
          break;
        case 'stateText':
        case 'state':
          entityGetters.set(key, () => signals.stateSignal.get());
          break;
        default:
          entityGetters.set(key, () => signals.stateSignal.get());
      }
    }
  });

  return {
    signalGetters: new Map(),
    memoGetters: new Map(),
    slotGetters: new Map(),
    entityGetters,
    themeGetters: new Map(),
  };
}

/**
 * Derive a sensible default value from a ReactiveNode's type metadata.
 * This is the initial value shown in the simulator before any state changes.
 */
function reactiveDefaultValue(reactive: IRReactive): unknown {
  const node = reactive.node;
  const exprType = node.exprType ?? '';

  switch (exprType) {
    case 'bool': return false;
    case 'float':
    case 'int': return 0;
    case 'string': return '';
    case 'font_ptr': return 'montserrat_14';
    case 'color': return 0x000000;
    default: return 0;
  }
}

// ── Action prop handling ─────────────────────────────────────────────────────

function irActionToRuntimeProp(
  action: IRAction,
  ctx: IRRenderContext,
): RuntimeProp {
  const steps = interpretActionSteps(action.actions);

  const handler = async (..._args: unknown[]) => {
    for (const step of steps) {
      await executeActionStep(step, ctx);
    }
  };

  return {
    kind: 'action',
    handler,
    meta: steps,
  };
}

/**
 * Convert ActionNode[] from SemanticIR to simulator-friendly ActionStep[] format.
 * ActionNode is the target-agnostic IR from the CLI compiler.
 */
function interpretActionSteps(actions: ActionNode[]): ActionStep[] {
  const steps: ActionStep[] = [];
  for (const action of actions) {
    if (action == null || typeof action !== 'object') continue;
    const node = action;

    // Check for ActionNode format (has 'kind' property)
    if ('kind' in node) {
      switch (node.kind) {
        case 'native': {
          // Parse actionKey like 'light.toggle' into target and method
          const [target, method] = node.actionKey.split('.');
          const config = typeof node.config === 'string'
            ? { id: node.config }
            : node.config as Record<string, unknown>;
          steps.push({
            type: 'component_action',
            target: String(config.id ?? target),
            method: method ?? 'toggle',
            params: config,
          });
          break;
        }
        case 'ha_service': {
          const rawEntityId = node.data?.entity_id;
          const entityId = rawEntityId == null ? ''
            : typeof rawEntityId === 'string' ? rawEntityId
            : String((rawEntityId as { value?: unknown }).value ?? '');
          const data: Record<string, unknown> = {};
          if (node.data) {
            for (const [k, v] of Object.entries(node.data)) {
              if (typeof v !== 'object' || v === null) {
                data[k] = v;
              } else {
                data[k] = (v as { kind: string; value?: unknown }).kind === 'literal'
                  ? (v as { value: unknown }).value
                  : v;
              }
            }
          }
          steps.push({
            type: 'ha_service',
            action: node.action,
            entityId,
            data,
          });
          break;
        }
        case 'delay':
          steps.push({ type: 'delay', duration: node.duration });
          break;
        case 'logger':
          steps.push({
            type: 'log',
            message: node.message,
            level: node.level,
          });
          break;
        case 'script_execute':
          steps.push({
            type: 'component_action',
            target: node.scriptId,
            method: 'execute',
          });
          break;
        case 'theme_select':
          steps.push({
            type: 'theme_select',
            themeName: node.themeName,
          });
          break;
        case 'if':
          steps.push({
            type: 'conditional',
            condition: () => true, // TODO: evaluate condition
            then: interpretActionSteps(node.then),
            else: node.else ? interpretActionSteps(node.else) : undefined,
          });
          break;
        // Ignore other action types for simulator (they'd need more complex handling)
        default:
          break;
      }
    }
  }
  return steps;
}

async function executeActionStep(step: ActionStep, ctx: IRRenderContext): Promise<void> {
  switch (step.type) {
    case 'ha_service': {
      const parts = step.action.split('.');
      const domain = parts[0] ?? '';
      const service = parts[1] ?? '';
      const entityId = step.entityId;
      if (domain && service && entityId) {
        ctx.provider.callService(domain, service, entityId, step.data as Record<string, unknown>);
        Scheduler.instance().flush();
      }
      break;
    }
    case 'delay': {
      const ms = parseDelay(step.duration);
      if (ms > 0) await new Promise(resolve => setTimeout(resolve, Math.min(ms, 100)));
      break;
    }
    case 'log':
      console.log(`[Simulator] ${step.level}: ${step.message}`);
      break;
    case 'component_action':
      console.log(`[Simulator] ${step.target}.${step.method}()`);
      break;
  }
}

function parseDelay(duration: string): number {
  const match = duration.match(/^(\d+)(ms|s|min)?$/);
  if (!match) return 0;
  const val = parseInt(match[1], 10);
  switch (match[2]) {
    case 's': return val * 1000;
    case 'min': return val * 60000;
    default: return val;
  }
}

// ────────────────────────────────────────────────────────────────────────────
// LVGL IR tree → RuntimeNode[] conversion
// ────────────────────────────────────────────────────────────────────────────

/** Known LVGL trigger/event prop names (snake_case in IR). */
const TRIGGER_PROPS = new Set([
  'on_press', 'on_release', 'on_click', 'on_long_press',
  'on_long_press_repeat', 'on_value_change', 'on_value',
  'on_checked_change', 'on_ready', 'on_cancel',
]);

function isActionPropKey(key: string): boolean {
  return TRIGGER_PROPS.has(key) || key.startsWith('on_');
}

/**
 * Convert an IR widget object to a RuntimeNode.
 *
 * The IR widget shape is: { id: "rw_xxx", text: <IRValue>, x: 10, widgets: [...] }
 */
function irWidgetObjectToRuntimeNode(
  widgetType: string,
  obj: IRObject,
  ctx: IRRenderContext,
): RuntimeNode {
  const id = findScalarEntry(obj, 'id')
    ?? `sim_${widgetType}_${ctx.nodeCounter++}`;

  const props: Record<string, RuntimeProp> = {};
  const childNodes: RuntimeNode[] = [];

  for (const entry of obj.entries) {
    const key = entry.key;

    // Skip the id prop (tracked separately)
    if (key === 'id') continue;

    // Nested widgets array
    if (key === 'widgets') {
      if (entry.value.kind === 'array') {
        childNodes.push(...irWidgetsArrayToRuntimeNodes(entry.value.items, ctx));
      }
      continue;
    }

    // Action/trigger props
    if (isActionPropKey(key) && entry.value.kind === 'action') {
      props[key] = irActionToRuntimeProp(entry.value as IRAction, ctx);
      continue;
    }
    // Action props that are arrays (compiled action lists)
    if (isActionPropKey(key) && entry.value.kind === 'array') {
      const actionItems = entry.value.items.map(irValueToPlain) as ActionNode[];
      const steps = interpretActionSteps(actionItems);
      props[key] = {
        kind: 'action',
        handler: async () => {
          for (const step of steps) await executeActionStep(step, ctx);
        },
        meta: steps,
      };
      continue;
    }

    // Regular props
    props[key] = irValueToRuntimeProp(key, entry.value, ctx);
  }

  return { id, type: widgetType, props, children: childNodes };
}

/**
 * Find a scalar string value for a given key in an IR object.
 */
function findScalarEntry(obj: IRObject, key: string): string | undefined {
  const entry = obj.entries.find(e => e.key === key);
  if (entry && entry.value.kind === 'scalar' && typeof entry.value.value === 'string') {
    return entry.value.value;
  }
  return undefined;
}

/**
 * Convert a widgets array (IR) to RuntimeNode[].
 *
 * Each item in the array is an object with one key (the widget type)
 * whose value is the widget's props object:
 *   [{ label: { text: "Hello", id: "lbl1" } }, { button: { ... } }]
 */
function irWidgetsArrayToRuntimeNodes(
  items: IRValue[],
  ctx: IRRenderContext,
): RuntimeNode[] {
  const nodes: RuntimeNode[] = [];

  for (const item of items) {
    if (item.kind !== 'object') continue;

    // Each widget item has one key = widget type
    for (const entry of (item as IRObject).entries) {
      if (entry.value.kind === 'object') {
        nodes.push(irWidgetObjectToRuntimeNode(entry.key, entry.value as IRObject, ctx));
      }
    }
  }

  return nodes;
}

/**
 * Build RuntimeNode[] from the LVGL section in the IR.
 *
 * LVGL section structure:
 *   lvgl: { displays: [...], pages: [{ widgets: [...] }, ...] }
 */
function buildLvglNodesFromIR(lvglValue: IRValue, ctx: IRRenderContext): RuntimeNode[] {
  if (lvglValue.kind !== 'object') return [];

  const lvglObj = lvglValue as IRObject;
  const pagesEntry = lvglObj.entries.find(e => e.key === 'pages');
  if (!pagesEntry || pagesEntry.value.kind !== 'array') return [];

  const nodes: RuntimeNode[] = [];

  for (const page of pagesEntry.value.items) {
    if (page.kind !== 'object') continue;
    const pageObj = page as IRObject;

    const id = findScalarEntry(pageObj, 'id') ?? `sim_page_${ctx.nodeCounter++}`;
    const pageProps: Record<string, RuntimeProp> = {};
    const pageChildren: RuntimeNode[] = [];

    for (const entry of pageObj.entries) {
      if (entry.key === 'id') continue;
      if (entry.key === 'widgets' && entry.value.kind === 'array') {
        pageChildren.push(...irWidgetsArrayToRuntimeNodes(entry.value.items, ctx));
        continue;
      }
      pageProps[entry.key] = irValueToRuntimeProp(entry.key, entry.value, ctx);
    }

    nodes.push({ id, type: 'page', props: pageProps, children: pageChildren });
  }

  return nodes;
}

// ────────────────────────────────────────────────────────────────────────────
// Public API
// ────────────────────────────────────────────────────────────────────────────

/**
 * Lower a SemanticIR to RuntimeNode[] for the simulator.
 *
 * Walks the IR config tree looking for the LVGL section, then converts
 * pages and widgets into RuntimeNodes with classified props.
 * Wires reactive props to JS Signals from the MockProvider.
 */
export function lowerToSimulator(
  ir: SemanticIR,
  provider: MockProvider,
): RuntimeNode[] {
  Scheduler.reset();

  const ctx: IRRenderContext = {
    entityRegistry: new EntitySignalRegistry(provider),
    provider,
    nodeCounter: 0,
  };

  // Register all HA entities from the IR so the MockProvider has them
  for (const entity of ir.esphome.haEntities) {
    provider.ensureEntity(entity.entityId);
  }

  // Find the LVGL section
  const lvglSection = ir.esphome.sections.find(s => s.key === 'lvgl');
  if (!lvglSection) return [];

  return buildLvglNodesFromIR(lvglSection.value, ctx);
}
