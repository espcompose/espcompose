// ────────────────────────────────────────────────────────────────────────────
// Semantic IR — barrel exports
// ────────────────────────────────────────────────────────────────────────────

export type {
  SemanticIR,
  IRSection,
  IRValue,
  IRScalar,
  IRObject,
  IREntry,
  IRArray,
  IRNull,
  IRReactive,
  IRRef,
  IRAction,
  IRSecret,
  IRTriggerVar,
  IRThemeData,
  IRScriptDefinition,
} from './types';

export {
  irSection,
  irScalar,
  irObject,
  irEntry,
  irArray,
  irNull,
  irReactive,
  irRef,
  irAction,
  irSecret,
  irTriggerVar,
  isIRScalar,
  isIRObject,
  isIRArray,
  isIRNull,
  isIRReactive,
  isIRRef,
  isIRAction,
  isIRSecret,
  isIRTriggerVar,
} from './types';

export { buildSemanticIR } from './build';
export type { BuildSemanticIRInput } from './build';

export { lowerSemanticIR, irValueToConfig as semanticIRValueToConfig } from './lower';

export { collectFromIR, collectReactiveNodes, collectBindings } from './traverse';
export type { IRTreeCollected } from './traverse';

// ── Expression IR ────────────────────────────────────────────────────────────
export type {
  ExprType,
  BinaryOp,
  UnaryOp,
  PostfixOp,
  BuiltinFn,
  ExprLiteral,
  ExprSignalRead,
  ExprMemoRead,
  ExprBinary,
  ExprUnary,
  ExprPostfix,
  ExprTernary,
  ExprCall,
  ExprConcat,
  ExprToString,
  ExprGroup,
  ExprSlot,
  ExprResolveFont,
  ExprThemeRead,
  ExprEntityProp,
  ExprComponentRead,
  ExprTriggerVar,
  ExprNode,
} from './expr-types';
