/**
 * Convert reactive font properties to a resolved LVGL font pointer.
 *
 * If both inputs are IRReactiveNodes, creates a derived memo whose C++
 * expression calls `resolve_font(family, size)` and returns
 * `const lv_font_t*` directly. If both are static, returns a concrete
 * string like `montserrat_28`.
 */

import { isIRReactiveNode, __espcompose } from '@espcompose/core';
import type { IRReactiveNode, Signal, IRExprNode } from '@espcompose/core';

export function useFont(def: {
  fontFamily: string | Signal<string>;
  fontSize: number | Signal<number>;
}): string | IRReactiveNode<string> {
  const famReactive = isIRReactiveNode(def.fontFamily);
  const szReactive = isIRReactiveNode(def.fontSize);

  if (!famReactive && !szReactive) {
    // eslint-disable-next-line @espcompose/eslint/no-untracked-signal -- narrowed by isIRReactiveNode() guards above
    return `${def.fontFamily}_${def.fontSize}`;
  }

  const deps = [
    ...(famReactive ? (def.fontFamily as unknown as IRReactiveNode<string>).dependencies : []),
    ...(szReactive ? (def.fontSize as unknown as IRReactiveNode<number>).dependencies : []),
  ];

  // Build ExprResolveFont IR node
  const famIR: IRExprNode = famReactive
    ? (def.fontFamily as unknown as IRReactiveNode<string>).exprIR ?? { kind: 'literal', value: '', type: 'string' }
    : { kind: 'literal', value: def.fontFamily as string, type: 'string' };
  const szIR: IRExprNode = szReactive
    ? (def.fontSize as unknown as IRReactiveNode<number>).exprIR ?? { kind: 'literal', value: 0, type: 'float' }
    : { kind: 'literal', value: def.fontSize as number, type: 'float' };

  return __espcompose.derivedMemo<string>({
    exprType: 'font_ptr',
    dependencies: deps,
    exprIR: { kind: 'resolve_font', family: famIR, size: szIR },
  });
}
