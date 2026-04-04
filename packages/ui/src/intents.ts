/**
 * Intent constants for @espcompose/ui design system.
 *
 * These are owned by the UI package — the base SDK is unaware of them.
 * Most DS components declare only `lvgl:widget` for LVGL container placement.
 * These two intents enforce strict parent-child pairing.
 */

/** Design system intents — structural parent-child constraints. */
export const COMPOSE_UI_INTENTS = {
  /** Col can only be placed inside Row. */
  COL: 'compose-ui:col',
  /** GridItem can only be placed inside Grid. */
  GRID_ITEM: 'compose-ui:grid-item',
} as const;
