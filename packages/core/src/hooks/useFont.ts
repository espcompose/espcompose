// ────────────────────────────────────────────────────────────────────────────
// useFont() — Font component hook
//
// Creates an ESPHome font component definition and returns a typed Ref<Font>.
// Deduplicates: multiple calls with the same file + size + bpp produce
// the same component and return the same ref.
//
// Must be called inside a function component body (render pass).
// The compiler injects the registered font definitions into the final YAML.
// ────────────────────────────────────────────────────────────────────────────

import type { FontProps } from '../generated/components/font';
import type { font_Font } from '../generated/markers';
import type { Ref } from '../types';
import { RefHandle } from '../types';
import { assertHookContext } from './useState';
import { registerComponent } from './useReactiveScope';

// ────────────────────────────────────────────────────────────────────────────
// Cache — deduplication within a render pass
// ────────────────────────────────────────────────────────────────────────────

const fontCache = new Map<string, Ref<font_Font>>();

/** Clear the font cache. Called at the start of each render pass. */
export function clearFontCache(): void {
  fontCache.clear();
}

// ────────────────────────────────────────────────────────────────────────────
// Cache key — deterministic from the config that matters
// ────────────────────────────────────────────────────────────────────────────

function fontCacheKey(props: FontProps): string {
  return JSON.stringify([
    props.file,
    props.size ?? '',
    props.bpp ?? '',
    props.glyphsets ?? [],
    props.glyphs ?? [],
    props.ignoreMissingGlyphs ?? '',
    props.extras ?? [],
  ]);
}

// ────────────────────────────────────────────────────────────────────────────
// Public API
// ────────────────────────────────────────────────────────────────────────────

/**
 * Create an ESPHome font component and return a typed ref to it.
 *
 * The font definition is registered for injection into the final YAML config.
 * If the same font configuration is requested multiple times (same file, size,
 * bpp, glyphs, etc.), the existing ref is returned without creating a duplicate.
 *
 * @example
 * const roboto = useFont({ file: 'gfonts://Roboto', size: 20 });
 * <lvgl-label textFont={roboto} text="Hello" />
 */
export function useFont(props: FontProps): Ref<font_Font> {
  assertHookContext('useFont()');

  const key = fontCacheKey(props);
  const cached = fontCache.get(key);
  if (cached) return cached;

  const ref = new RefHandle<font_Font>() as unknown as Ref<font_Font>;
  const id = ref.toString();

  const config: Record<string, unknown> = {
    id,
    file: props.file,
  };
  if (props.size != null) config.size = props.size;
  if (props.bpp != null) config.bpp = props.bpp;
  if (props.glyphsets != null) config.glyphsets = props.glyphsets;
  if (props.glyphs != null) config.glyphs = props.glyphs;
  if (props.ignoreMissingGlyphs != null) config.ignore_missing_glyphs = props.ignoreMissingGlyphs;
  if (props.extras != null) {
    config.extras = props.extras.map((e) => ({
      file: e.file,
      glyphs: e.glyphs,
    }));
  }

  registerComponent({
    kind: 'component',
    section: 'font',
    id,
    config,
  });

  fontCache.set(key, ref);
  return ref;
}
