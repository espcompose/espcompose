// ────────────────────────────────────────────────────────────────────────────
// JSX automatic runtime for @espcompose/core
//
// Auto-imported by TypeScript/esbuild when using:
//   "jsx": "react-jsx" + "jsxImportSource": "@espcompose/core"
//
// The automatic transform calls jsx(type, props) where children are already
// inside props.children — unlike the classic transform which passes children
// as separate arguments to createElement().
// ────────────────────────────────────────────────────────────────────────────

import type { EspComposeElement, FunctionComponent } from './types';
export { Fragment } from './serialize';

export function jsx(
  type: string | symbol | FunctionComponent,
  props: Record<string, unknown>,
): EspComposeElement {
  // Normalise children to a flat array (the transform may pass a single
  // child directly or an array for multiple children).
  const { children, ...rest } = props;
  if (children == null) {
    return { type, props: rest };
  }
  const childArray = (Array.isArray(children) ? children : [children])
    .flat()
    .filter((c): c is EspComposeElement => c != null);
  return {
    type,
    props: {
      ...rest,
      ...(childArray.length > 0 ? { children: childArray } : {}),
    },
  };
}

// jsxs is called for elements with multiple static children — same logic.
export { jsx as jsxs };
