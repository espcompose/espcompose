// ────────────────────────────────────────────────────────────────────────────
// IRExprNode → C++ expression lowering
//
// Converts target-agnostic IRExprNode AST trees into C++ expression strings
// for the ESPHome firmware reactive runtime.
// ────────────────────────────────────────────────────────────────────────────

import type {
  IRExprNode,
} from '@espcompose/core';
import type {
  ExprType,
  BuiltinFn,
  StringMethod,
} from '@espcompose/core/internals';

// ── Lowering context ─────────────────────────────────────────────────────────

export interface CppLoweringContext {
  /** Map signal index → C++ signal variable name (e.g. `sig_ha_light_office`) */
  signalNames: Map<number, string>;
  /** Map memo nodeId → C++ memo variable name (e.g. `memo_0`) */
  memoNames: Map<string, string>;
  /** Map slot index → C++ expression string (substituted at IR assembly) */
  slotExprs: Map<number, string>;
  /** Map entity ID → generated component ID (e.g. `ha_light_office`) */
  entityComponentIds: Map<string, string>;
  /** Map theme signal path → C++ variable name (e.g. `thm_colors_primary_bg`) */
  themeVarNames: Map<string, string>;
}

// ── Main lowering function ───────────────────────────────────────────────────

export function exprToCpp(node: IRExprNode, ctx: CppLoweringContext): string {
  switch (node.kind) {
    case 'literal':
      return literalToCpp(node.value, node.type);

    case 'signal_read': {
      const name = ctx.signalNames.get(node.signalIndex);
      if (!name) throw new Error(`Unknown signal index: ${node.signalIndex}`);
      return `${name}.get()`;
    }

    case 'memo_read': {
      const name = ctx.memoNames.get(node.memoId);
      if (!name) throw new Error(`Unknown memo id: ${node.memoId}`);
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

    case 'type_cast':
      return typeCastToCpp(exprToCpp(node.expr, ctx), node.fromType, node.toType);

    case 'format_string':
      return `str_sprintf("${node.format}", ${exprToCpp(node.expr, ctx)})`;

    case 'null_coalesce':
      return nullCoalesceToCpp(exprToCpp(node.left, ctx), exprToCpp(node.right, ctx), node.type);

    case 'string_method':
      return stringMethodToCpp(node.method, exprToCpp(node.object, ctx), node.args.map(a => exprToCpp(a, ctx)));

    default:
      throw new Error(`Unknown IRExprNode kind: ${(node as IRExprNode).kind}`);
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
  math_trunc: 'static_cast<int32_t>',
  math_sqrt: 'std::sqrt',
  math_pow: 'std::pow',
  math_log: 'std::log',
  math_log2: 'std::log2',
  math_log10: 'std::log10',
  math_sin: 'std::sin',
  math_cos: 'std::cos',
  math_tan: 'std::tan',
  math_clamp: 'std::clamp',
  is_nan: 'std::isnan',
};

function builtinToCpp(fn: BuiltinFn): string {
  return BUILTIN_TO_CPP[fn];
}

// ── Type cast helpers ────────────────────────────────────────────────────────

function typeCastToCpp(expr: string, fromType: ExprType, toType: ExprType): string {
  if (fromType === toType) return expr;

  if (toType === 'string') {
    if (fromType === 'bool') return `(${expr}) ? std::string("true") : std::string("false")`;
    return `std::to_string(${expr})`;
  }
  if (toType === 'float') {
    if (fromType === 'string') return `std::stof(${expr})`;
    return `static_cast<float>(${expr})`;
  }
  if (toType === 'int') {
    if (fromType === 'string') return `std::stoi(${expr})`;
    return `static_cast<int32_t>(${expr})`;
  }
  if (toType === 'bool') {
    if (fromType === 'string') return `!(${expr}).empty()`;
    return `static_cast<bool>(${expr})`;
  }
  return `static_cast<${exprTypeToCpp(toType)}>(${expr})`;
}

// ── Null coalesce helpers ────────────────────────────────────────────────────

function nullCoalesceToCpp(left: string, right: string, type: ExprType): string {
  if (type === 'float') return `std::isnan(${left}) ? ${right} : ${left}`;
  if (type === 'string') return `(${left}).empty() ? ${right} : ${left}`;
  // For int/bool, there's no natural null — return left as-is
  return left;
}

// ── String method helpers ────────────────────────────────────────────────────

function stringMethodToCpp(method: StringMethod, obj: string, args: string[]): string {
  switch (method) {
    case 'length':
      return `static_cast<int>(${obj}.length())`;
    case 'toUpperCase':
      return `([](std::string s){ for(auto &c:s) c=toupper(c); return s; })(${obj})`;
    case 'toLowerCase':
      return `([](std::string s){ for(auto &c:s) c=tolower(c); return s; })(${obj})`;
    case 'substring':
      if (args.length === 2) return `${obj}.substr(${args[0]}, (${args[1]}) - (${args[0]}))`;
      if (args.length === 1) return `${obj}.substr(${args[0]})`;
      return obj;
    case 'charAt':
      return `std::string(1, ${obj}.at(${args[0]}))`;
    case 'indexOf': {
      return `static_cast<int>(${obj}.find(${args[0]}) != std::string::npos ? ${obj}.find(${args[0]}) : -1)`;
    }
    case 'trim':
      return `([](std::string s){ s.erase(0,s.find_first_not_of(" \\t\\n\\r")); s.erase(s.find_last_not_of(" \\t\\n\\r")+1); return s; })(${obj})`;
    default:
      throw new Error(`Unknown string method: ${method}`);
  }
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
