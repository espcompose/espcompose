/**
 * Dialog.Provider — context-based dialog stacking.
 *
 * Wraps `withVisibilityStack()` from core to provide nested dialog support.
 * Without this provider, `useDialog()` falls back to depth-1 behavior
 * (no stacking, fully backward compatible).
 *
 * @example
 * <Dialog.Provider maxDepth={3}>
 *   <MyApp />
 * </Dialog.Provider>
 */

import type { EspComposeElement } from '@espcompose/core';
import { withVisibilityStack, createLvglContextProvider } from '@espcompose/core';

// ────────────────────────────────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────────────────────────────────

export interface DialogProviderProps {
  /**
   * Maximum dialog stack depth. When exceeded, additional `show()` calls
   * log a warning and are ignored.
   *
   * @default 1
   */
  maxDepth?: number;

  /** Child elements that can use `useDialog()` with stacking. */
  children?: EspComposeElement | EspComposeElement[];
}

// ────────────────────────────────────────────────────────────────────────────
// Provider
// ────────────────────────────────────────────────────────────────────────────

function DialogProvider(props: DialogProviderProps): EspComposeElement {
  const { maxDepth = 1, children } = props;
  return withVisibilityStack({ maxDepth, zOrder: 0 }, children);
}

export const DialogProviderComponent = createLvglContextProvider(DialogProvider);
