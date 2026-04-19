// ────────────────────────────────────────────────────────────────────────────
// themeLeaf — safe nested path accessor on the reactive theme proxy
//
// Traverses the deep reactive theme proxy by key path, returning the
// IRReactiveNode at the leaf.  Used by design-system token hooks
// (useSize, useStatus, useSpacing, etc.) to map token strings to
// reactive theme values.
// ────────────────────────────────────────────────────────────────────────────

import { useTheme } from './reactive-proxy';

/**
 * Safely access a nested path on the reactive theme proxy for a given scope.
 *
 * @param scope — theme scope identifier (e.g. 'espcompose:ui')
 * @param path  — property path segments (e.g. 'colors', 'primary', 'bg')
 *
 * @example
 * themeLeaf('espcompose:ui', 'colors', 'primary', 'bg')  // → IRReactiveNode
 * themeLeaf('espcompose:ui', 'spacing', 'md')             // → IRReactiveNode
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function themeLeaf(scope: string, ...path: string[]): any {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let cursor: any = useTheme(scope);
  for (const key of path) {
    cursor = cursor?.[key];
  }
  return cursor;
}
