/**
 * Internal utilities shared by theme-aware hooks.
 * @internal — not part of the public API.
 *
 * Wraps themeLeaf from @espcompose/core, pre-binding the UI scope.
 */

import { themeLeaf as coreThemeLeaf } from '@espcompose/core';
import { UI_THEME_SCOPE } from '../theme/scope';

/**
 * Scoped themeLeaf — automatically uses the UI theme scope.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function themeLeaf(...path: string[]): any {
  return coreThemeLeaf(UI_THEME_SCOPE, ...path);
}
