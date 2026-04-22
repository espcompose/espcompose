/**
 * Internal utilities shared by theme-aware hooks.
 * @internal — not part of the public API.
 *
 * Wraps the UITheme handle, pre-binding the UI scope for themeLeaf access.
 */

import { UITheme } from '../theme/scope';

/**
 * Scoped themeLeaf — traverses the reactive theme proxy by key path.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function themeLeaf(...path: string[]): any {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let cursor: any = UITheme.use();
  for (const key of path) {
    cursor = cursor?.[key];
  }
  return cursor;
}
