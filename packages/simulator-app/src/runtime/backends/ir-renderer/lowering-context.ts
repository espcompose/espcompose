import type { IRExprNode } from '@espcompose/core';
import type { IRReactive, IRThemeData } from '@espcompose/core/internals';
import { REACTIVE_PROPERTY_MAP } from '@espcompose/core/internals';
import type { JsLoweringContext } from '../expr-to-js.js';
import type { EntitySignalRegistry } from './entity-registry.js';
import type { MockProvider } from '../../providers/mock-provider';

// ── Walk context shared across the ir-renderer modules ───────────────────────

export interface IRRenderContext {
  entityRegistry: EntitySignalRegistry;
  provider: MockProvider;
  nodeCounter: number;
  /** Theme data from the SemanticIR (undefined if no themes registered). */
  themeData?: IRThemeData;
  /** Active theme index — mutable so theme_select actions can update it. */
  themeIndex: number;
  /** Mapping from image component IDs (tokens) to file path + optional resize. */
  imageMap: Map<string, { file: string; resize?: string }>;
  /** Mapping from font component ref tokens to CSS font strings (e.g. "28px 'Roboto', sans-serif"). */
  fontMap: Map<string, string>;
  /** Active page index — mutable so page navigation actions can update it. */
  currentPageIndex: number;
  /** Total number of LVGL pages. */
  pageCount: number;
  /** Page indices marked with skip: true (excluded from page cycling). */
  skipPages: Set<number>;
  /** Callback to notify React of state changes (page navigation, etc). */
  requestRerender?: () => void;
}

// ── ExprIR → JS lowering context builder ─────────────────────────────────────

/**
 * Derive the generated sensor ID from an HA entity ID.
 * Matches the pattern used by the SDK: `ha_${entityId.replace('.', '_')}`
 */
export function entityIdToGeneratedId(entityId: string): string {
  return `ha_${entityId.replace('.', '_')}`;
}

/**
 * Walk an IRExprNode tree and call the visitor on each node.
 *
 * Covers every variant in the IRExprNode union. Adding a new variant
 * without updating this function will cause a compile error via the
 * exhaustive check in the default branch.
 */
export function walkIRExprNode(node: IRExprNode, visitor: (n: IRExprNode) => void): void {
  visitor(node);
  switch (node.kind) {
    case 'literal':
    case 'signal_read':
    case 'memo_read':
    case 'theme_read':
    case 'entity_prop':
    case 'component_read':
    case 'trigger_var':
    case 'slot':
      // Leaf nodes — no children to recurse into.
      break;
    case 'binary':
      walkIRExprNode(node.left, visitor);
      walkIRExprNode(node.right, visitor);
      break;
    case 'unary':
    case 'postfix':
      walkIRExprNode(node.operand, visitor);
      break;
    case 'ternary':
      walkIRExprNode(node.test, visitor);
      walkIRExprNode(node.consequent, visitor);
      walkIRExprNode(node.alternate, visitor);
      break;
    case 'call':
      node.args.forEach(a => walkIRExprNode(a, visitor));
      break;
    case 'concat':
      node.parts.forEach(p => walkIRExprNode(p, visitor));
      break;
    case 'to_string':
    case 'group':
    case 'type_cast':
    case 'format_string':
      walkIRExprNode(node.expr, visitor);
      break;
    case 'resolve_font':
      walkIRExprNode(node.family, visitor);
      walkIRExprNode(node.size, visitor);
      break;
    case 'null_coalesce':
      walkIRExprNode(node.left, visitor);
      walkIRExprNode(node.right, visitor);
      break;
    case 'string_method':
      walkIRExprNode(node.object, visitor);
      node.args.forEach(a => walkIRExprNode(a, visitor));
      break;
    default: {
      // Exhaustive check — if a new IRExprNode kind is added and not handled
      // above, TypeScript will report an error here at compile time.
      const _exhaustive: never = node;
      throw new Error(`Unhandled IRExprNode kind in walkIRExprNode: ${(_exhaustive as IRExprNode).kind}`);
    }
  }
}

/**
 * Build a JsLoweringContext for evaluating an IRExprNode in the simulator.
 * Creates entity getters wired to the EntitySignalRegistry and theme getters
 * wired to the IR theme leaf data.
 */
export function buildJsLoweringContext(exprIR: IRExprNode, ctx: IRRenderContext): JsLoweringContext {
  const entityGetters = new Map<string, () => unknown>();
  const themeGetters = new Map<string, () => unknown>();

  walkIRExprNode(exprIR, (node) => {
    if (node.kind === 'entity_prop') {
      const key = `${node.entityId}::${node.property}`;
      if (entityGetters.has(key)) return;

      const genId = entityIdToGeneratedId(node.entityId);
      const signals = ctx.entityRegistry.getOrCreate(genId);

      // 'state' is a raw passthrough — not in REACTIVE_PROPERTY_MAP
      if (node.property === 'state') {
        entityGetters.set(key, () => signals.stateSignal.get());
        return;
      }

      const propDesc = REACTIVE_PROPERTY_MAP[node.property];
      if (!propDesc) {
        throw new Error(`Unknown entity property '${node.property}' for entity '${node.entityId}'`);
      }

      switch (propDesc.exprType) {
        case 'bool':
          entityGetters.set(key, () => signals.isOnSignal.get());
          break;
        case 'float':
          entityGetters.set(key, () => {
            const raw = signals.stateSignal.get();
            const num = Number(raw);
            return isNaN(num) ? 0 : num;
          });
          break;
        case 'string':
          entityGetters.set(key, () => signals.stateSignal.get());
          break;
      }
    }

    if (node.kind === 'theme_read') {
      if (themeGetters.has(node.path)) return;
      const leaf = ctx.themeData?.leafData.get(node.path);
      if (leaf) {
        if (leaf.valueType === 'font_ptr') {
          // Font pointer leaves store ref tokens — resolve to CSS font strings
          themeGetters.set(node.path, () => {
            const refToken = leaf.values[ctx.themeIndex] ?? leaf.values[0];
            return ctx.fontMap.get(String(refToken)) ?? refToken;
          });
        } else {
          // Closure captures ctx so theme_select updates are reflected.
          themeGetters.set(node.path, () => leaf.values[ctx.themeIndex] ?? leaf.values[0]);
        }
      }
    }
  });

  return {
    signalGetters: new Map(),
    memoGetters: new Map(),
    slotGetters: new Map(),
    entityGetters,
    themeGetters,
    resolveFont: (family: string, size: number) => {
      // Handle gfonts:// references and local file paths
      let fontFamily: string;
      if (family.startsWith('gfonts://')) {
        fontFamily = `'${family.slice('gfonts://'.length)}'`;
      } else {
        // Local font — use the basename as the font-family name
        const basename = family.replace(/^.*[\\/]/, '').replace(/\.[^.]+$/, '');
        fontFamily = `'${basename}'`;
      }
      return `${size}px ${fontFamily}, sans-serif`;
    },
  };
}

/**
 * Derive a sensible default value from a IRReactiveNode's type metadata.
 * This is the initial value shown in the simulator before any state changes.
 */
export function reactiveDefaultValue(reactive: IRReactive): unknown {
  const node = reactive.node;
  const exprType = node.exprType ?? '';

  switch (exprType) {
    case 'bool': return false;
    case 'float':
    case 'int': return 0;
    case 'string': return '';
    case 'font_ptr': return "14px 'Roboto', sans-serif";
    case 'color': return 0x000000;
    default: return 0;
  }
}
