/**
 * usePopup — Convenience wrapper around `useOverlay` at z-order tier 0.
 *
 * Popups occupy the base overlay tier. They are drawn above normal content
 * but below toasts and notifications. This hook is API-compatible with
 * the original `usePopup()` from earlier releases — existing call-sites
 * can switch to the @espcompose/ui import with no other changes.
 */

import { useOverlay, useLvglVisibility } from '@espcompose/core';
import type { OverlayFactory, LvglVisibilityController } from '@espcompose/core';

export type PopupController = LvglVisibilityController;

export type PopupFactory = OverlayFactory;

/**
 * Create a popup overlay (z-order 0).
 *
 * @param factory  Render callback `(ctrl) => <Popup>…</Popup>`
 * @returns        An `LvglVisibilityController` with `.show()` / `.hide()`.
 */
export function usePopup(factory: PopupFactory): PopupController {
  return useLvglVisibility(useOverlay({ zOrder: 0 }, factory));
}
