/**
 * JSON theme import / export for interop.
 */

import type { Theme } from './types';

/** Serialise a Theme to a JSON string. */
export function themeToJSON(theme: Theme): string {
  return JSON.stringify(theme, null, 2);
}

/** Parse a JSON string into a Theme object. */
export function themeFromJSON(json: string): Theme {
  return JSON.parse(json) as Theme;
}
