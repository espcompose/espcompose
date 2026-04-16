/**
 * Public API for the LVGL widget renderer.
 *
 * The widget implementation has been split into individual files for better organization:
 * - widgets/helpers.ts - Common style and prop utilities
 * - widgets/StyleInjector.tsx - Scoped CSS injection component
 * - widgets/*.tsx - Individual widget components
 * - widgets/index.tsx - Main LvglWidget and widget map
 */
export { LvglWidget } from './widgets';
