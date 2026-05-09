/**
 * usePopup — Convenience wrapper around `useOverlay` at z-order tier 0.
 *
 * Popups occupy the base overlay tier. They are drawn above normal content
 * but below toasts and notifications. This hook is API-compatible with
 * the original `usePopup()` from earlier releases — existing call-sites
 * can switch to the @espcompose/ui import with no other changes.
 *
 * When used inside a `<Popup.Provider maxDepth={N}>`, popups participate
 * in the visibility stack — showing a new popup saves the current one,
 * and dismissing restores it. Without a provider, behaves as depth-1
 * (simple show/hide, no stacking).
 */

import { useOverlay, useVisibility, useVisibilityStack } from '@espcompose/core';
import type { VisibilityController, EspComposeElement } from '@espcompose/core';

export type PopupController = VisibilityController;

export type PopupFactory = (ctrl: PopupController) => EspComposeElement | EspComposeElement[];

/**
 * Create a popup overlay (z-order 0).
 *
 * @param factory  Render callback `(ctrl) => <Popup>…</Popup>`
 * @returns        A `VisibilityController` with `.show()` / `.hide()`.
 */
export function usePopup(factory: PopupFactory): PopupController {
  const stack = useVisibilityStack();
  const ctrl = useOverlay({ zOrder: 0 }, factory);

  if (stack) {
    return stack.register(ctrl);
  }
  return useVisibility(ctrl);
}
