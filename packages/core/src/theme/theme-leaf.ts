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
 * Safely access a nested path on the reactive theme proxy.
 *
 * @example
 * themeLeaf('colors', 'primary', 'bg')  // → IRReactiveNode for theme.colors.primary.bg
 * themeLeaf('spacing', 'md')            // → IRReactiveNode for theme.spacing.md
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function themeLeaf(...path: string[]): any {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let cursor: any = useTheme();
  for (const key of path) {
    cursor = cursor?.[key];
  }
  return cursor;
}
