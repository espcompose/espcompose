// ────────────────────────────────────────────────────────────────────────────
// ExprNode → C++ expression lowering
//
// Converts target-agnostic ExprNode AST trees into C++ expression strings
// for the ESPHome firmware reactive runtime.
// ────────────────────────────────────────────────────────────────────────────

import type {
  ExprNode,
} from '@esphome/compose';
import type {
  ExprType,
  BinaryOp,
  BuiltinFn,
} from '@esphome/compose/internals';

// ── Lowering context ─────────────────────────────────────────────────────────

export interface CppLoweringContext {
  /** Map signal index → C++ signal variable name (e.g. `sig_ha_light_office`) */
  signalNames: Map<number, string>;
  /** Map memo index → C++ memo variable name (e.g. `memo_0`) */
  memoNames: Map<number, string>;
  /** Map slot index → C++ expression string (substituted at IR assembly) */
  slotExprs: Map<number, string>;
  /** Map entity ID → generated component ID (e.g. `ha_light_office`) */
  entityComponentIds: Map<string, string>;
  /** Map theme signal path → C++ variable name (e.g. `thm_colors_primary_bg`) */
  themeVarNames: Map<string, string>;
}

// ── Main lowering function ───────────────────────────────────────────────────

export function exprToCpp(node: ExprNode, ctx: CppLoweringContext): string {
  switch (node.kind) {
    case 'literal':
      return literalToCpp(node.value, node.type);

    case 'signal_read': {
      const name = ctx.signalNames.get(node.signalIndex);
      if (!name) throw new Error(`Unknown signal index: ${node.signalIndex}`);
      return `${name}.get()`;
    }

    case 'memo_read': {
      const name = ctx.memoNames.get(node.memoIndex);
      if (!name) throw new Error(`Unknown memo index: ${node.memoIndex}`);
      return `${name}.get()`;
    }

    case 'binary':
      return `${exprToCpp(node.left, ctx)} ${node.op} ${exprToCpp(node.right, ctx)}`;

    case 'unary':
      return `${node.op}${exprToCpp(node.operand, ctx)}`;

    case 'postfix':
      return `${exprToCpp(node.operand, ctx)}${node.op}`;

    case 'ternary':
      return `${exprToCpp(node.test, ctx)} ? ${exprToCpp(node.consequent, ctx)} : ${exprToCpp(node.alternate, ctx)}`;

    case 'call':
      return `${builtinToCpp(node.fn)}(${node.args.map(a => exprToCpp(a, ctx)).join(', ')})`;

    case 'concat':
      return node.parts.map(p => exprToCpp(p, ctx)).join(' + ');

    case 'to_string': {
      const inner = exprToCpp(node.expr, ctx);
      return `std::to_string(${inner})`;
    }

    case 'group':
      return `(${exprToCpp(node.expr, ctx)})`;

    case 'slot': {
      const expr = ctx.slotExprs.get(node.slotIndex);
      if (!expr) throw new Error(`Unresolved slot: ${node.slotIndex}`);
      return expr;
    }

    case 'resolve_font': {
      const family = exprToCpp(node.family, ctx);
      const size = exprToCpp(node.size, ctx);
      return `resolve_font(${family}, ${size})`;
    }

    case 'theme_read': {
      const name = ctx.themeVarNames.get(node.path);
      if (!name) throw new Error(`Unknown theme path: ${node.path}`);
      return `${name}.get()`;
    }

    case 'entity_prop': {
      const compId = ctx.entityComponentIds.get(node.entityId);
      if (!compId) throw new Error(`Unknown entity: ${node.entityId}`);
      return `sig_${compId}.get()`;
    }

    case 'component_read':
      return `id(${node.componentId}).state`;

    case 'trigger_var':
      return node.name;

    default:
      throw new Error(`Unknown ExprNode kind: ${(node as ExprNode).kind}`);
  }
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function literalToCpp(value: string | number | boolean, type: ExprType): string {
  switch (type) {
    case 'string':
      return `std::string("${escapeForCpp(String(value))}")`;
    case 'bool':
      return value ? 'true' : 'false';
    case 'float':
      return String(value);
    case 'int':
      return String(value);
    case 'color':
      return `lv_color_hex(0x${String(value).replace(/^#/, '')})`;
    case 'font_ptr':
      return String(value);
    default:
      return String(value);
  }
}

function escapeForCpp(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n').replace(/\r/g, '\\r');
}

const BUILTIN_TO_CPP: Record<BuiltinFn, string> = {
  math_abs: 'std::abs',
  math_min: 'std::min',
  math_max: 'std::max',
  math_round: 'std::round',
  math_floor: 'std::floor',
  math_ceil: 'std::ceil',
  math_sqrt: 'std::sqrt',
  math_pow: 'std::pow',
  math_log: 'std::log',
  math_log2: 'std::log2',
  math_log10: 'std::log10',
  math_sin: 'std::sin',
  math_cos: 'std::cos',
  math_tan: 'std::tan',
  is_nan: 'std::isnan',
};

function builtinToCpp(fn: BuiltinFn): string {
  return BUILTIN_TO_CPP[fn];
}

// ── ExprType → C++ type mapping ──────────────────────────────────────────────

export function exprTypeToCpp(type: ExprType): string {
  switch (type) {
    case 'int': return 'int32_t';
    case 'float': return 'float';
    case 'string': return 'std::string';
    case 'bool': return 'bool';
    case 'color': return 'lv_color_t';
    case 'font_ptr': return 'const lv_font_t*';
    default: return 'float';
  }
}
