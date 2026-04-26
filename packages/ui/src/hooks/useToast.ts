/**
 * useToast — Convenience wrapper around `useOverlay` at z-order tier 100.
 *
 * Toasts are rendered above popups but below system-critical overlays.
 * The higher z-order tier ensures toasts always float above any open popup.
 */

import { useOverlay } from '@espcompose/core';
import type { OverlayController, OverlayFactory } from '@espcompose/core';

/** Factory function that receives an OverlayController and returns JSX. */
export type ToastFactory = OverlayFactory;

/**
 * Create a toast overlay (z-order 100).
 *
 * @param factory  Render callback `(ctrl) => <Toast>…</Toast>`
 * @returns        An `OverlayController` with `.show()` / `.dismiss()`.
 */
export function useToast(factory: ToastFactory): OverlayController {
  return useOverlay({ zOrder: 100 }, factory);
}
