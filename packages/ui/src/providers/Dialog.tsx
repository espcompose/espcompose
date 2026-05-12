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
import { withVisibilityStack, createLvglContextProvider, useOverlayTier, createContext, createElement } from '@espcompose/core';
import type { OverlayTierHandle } from '@espcompose/core';
import { Backdrop } from '../components';

// ────────────────────────────────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────────────────────────────────

/** Context carrying the dialog tier handle for `useDialog()`. */
export const DialogTierContext = createContext<OverlayTierHandle | null>(null);

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
  const tier = useOverlayTier(
    { zOrder: 0 },
    <Backdrop
      style={{
        width: '100%',
        height: '100%',
      }}
    />,
  );
  return createElement(
    'context',
    { context: DialogTierContext, value: tier },
    withVisibilityStack({ maxDepth, zOrder: 0 }, children),
  );
}

export const DialogProviderComponent = createLvglContextProvider(DialogProvider);
