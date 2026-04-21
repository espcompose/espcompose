// ────────────────────────────────────────────────────────────────────────────
// JSX dev runtime for @espcompose/core
//
// Auto-imported by esbuild when using:
//   jsx: 'automatic', jsxDev: true, jsxImportSource: '@espcompose/core'
//
// esbuild's jsxDev mode calls jsxDEV(type, props, key, isStatic, source, self)
// where `source` carries the original TSX file/line/column. We attach it to
// the returned element so Phase 3 errors can report source locations.
// ────────────────────────────────────────────────────────────────────────────

import type { EspComposeElement, FunctionComponent, JsxSourceLocation } from './types';
export { Fragment } from './runtime';

export function jsxDEV(
  type: string | symbol | FunctionComponent,
  props: Record<string, unknown>,
  _key?: string,
  _isStaticChildren?: boolean,
  source?: JsxSourceLocation,
  _self?: unknown,
): EspComposeElement {
  const { children, ...rest } = props;
  let childArray: EspComposeElement[] | undefined;
  if (children != null) {
    childArray = (Array.isArray(children) ? children : [children])
      .flat()
      .filter((c): c is EspComposeElement => c != null);
  }
  return {
    type,
    props: {
      ...rest,
      ...(childArray && childArray.length > 0 ? { children: childArray } : {}),
    },
    ...(source ? { __source: source } : {}),
  };
}
