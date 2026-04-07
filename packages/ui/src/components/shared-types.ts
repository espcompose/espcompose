/**
 * Shared prop interfaces for the LVGL design system components.
 *
 * 3-tier prop architecture:
 *   1. Semantic props (top-level) — what the component is/does
 *   2. style (CssStyleProps)      — visual overrides (bg, border, width, etc.)
 *   3. style (escape hatch)      — raw visual overrides
 */

import type { CssStyleProps } from '@espcompose/core';

// ────────────────────────────────────────────────────────────────────────────
// Tier 2: Visual escape hatch
// ────────────────────────────────────────────────────────────────────────────

/**
 * Visual style overrides — the full CSS-like style prop surface from core.
 * Used as the `style` escape hatch on all components.
 */
export type StyleProps = CssStyleProps;

// ────────────────────────────────────────────────────────────────────────────
// Shared component types
// ────────────────────────────────────────────────────────────────────────────

export type ButtonVariant = 'solid' | 'outline';
