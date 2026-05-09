/**
 * Popup.Provider — context-based popup stacking.
 *
 * Wraps `withVisibilityStack()` from core to provide nested popup support.
 * Without this provider, `usePopup()` falls back to depth-1 behavior
 * (no stacking, fully backward compatible).
 *
 * @example
 * <Popup.Provider maxDepth={3}>
 *   <MyApp />
 * </Popup.Provider>
 */

import type { EspComposeElement } from '@espcompose/core';
import { withVisibilityStack, createLvglContextProvider } from '@espcompose/core';

// ────────────────────────────────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────────────────────────────────

export interface PopupProviderProps {
  /**
   * Maximum popup stack depth. When exceeded, additional `show()` calls
   * log a warning and are ignored.
   *
   * @default 1
   */
  maxDepth?: number;

  /** Child elements that can use `usePopup()` with stacking. */
  children?: EspComposeElement | EspComposeElement[];
}

// ────────────────────────────────────────────────────────────────────────────
// Provider
// ────────────────────────────────────────────────────────────────────────────

function PopupProvider(props: PopupProviderProps): EspComposeElement {
  const { maxDepth = 1, children } = props;
  return withVisibilityStack({ maxDepth, zOrder: 0 }, children);
}

export const PopupProviderComponent = createLvglContextProvider(PopupProvider);
