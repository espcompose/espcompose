/**
 * Internal utilities shared by theme-aware hooks.
 * @internal — not part of the public API.
 */

import { useTheme } from '@espcompose/core';

/**
 * Safely access a nested path on the reactive theme proxy.
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
