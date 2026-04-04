// ────────────────────────────────────────────────────────────────────────────
// useImage() — Image component hook
//
// Creates an ESPHome image component definition and returns a typed Ref<Image>.
// Deduplicates: multiple calls with the same file + type + resize produce
// the same component and return the same ref.
//
// Must be called inside a function component body (render pass).
// The compiler injects the registered image definitions into the final YAML.
// ────────────────────────────────────────────────────────────────────────────

import type { ImageProps } from '../generated/components/image';
import type { image_Image } from '../generated/markers';
import type { Ref } from '../types';
import { RefHandle } from '../types';
import { assertHookContext } from './useState';
import { registerComponent } from './useReactiveScope';

// ────────────────────────────────────────────────────────────────────────────
// Cache — deduplication within a render pass
// ────────────────────────────────────────────────────────────────────────────

const imageCache = new Map<string, Ref<image_Image>>();

/** Clear the image cache. Called at the start of each render pass. */
export function clearImageCache(): void {
  imageCache.clear();
}

// ────────────────────────────────────────────────────────────────────────────
// Cache key — deterministic from the config that matters
// ────────────────────────────────────────────────────────────────────────────

function imageCacheKey(props: ImageProps): string {
  return JSON.stringify([
    props.file,
    props.type,
    props.resize ?? '',
    props.transparency ?? '',
    props.invertAlpha ?? '',
    props.dither ?? '',
    props.byteOrder ?? '',
  ]);
}

// ────────────────────────────────────────────────────────────────────────────
// Public API
// ────────────────────────────────────────────────────────────────────────────

/**
 * Create an ESPHome image component and return a typed ref to it.
 *
 * The image definition is registered for injection into the final YAML config.
 * If the same image configuration is requested multiple times (same file, type,
 * resize, etc.), the existing ref is returned without creating a duplicate.
 *
 * @example
 * const bg = useImage({ file: './assets/background.png', type: 'RGB565', resize: '320x240' });
 * <lvgl-image src={bg} />
 */
export function useImage(props: ImageProps): Ref<image_Image> {
  assertHookContext('useImage()');

  const key = imageCacheKey(props);
  const cached = imageCache.get(key);
  if (cached) return cached;

  const ref = new RefHandle<image_Image>() as unknown as Ref<image_Image>;
  const id = ref.toString();

  registerComponent({
    kind: 'component',
    section: 'image',
    id,
    config: {
      id,
      file: props.file,
      type: props.type,
      ...(props.resize != null ? { resize: props.resize } : {}),
      ...(props.transparency != null ? { transparency: props.transparency } : {}),
      ...(props.invertAlpha != null ? { invert_alpha: props.invertAlpha } : {}),
      ...(props.dither != null ? { dither: props.dither } : {}),
      ...(props.byteOrder != null ? { byte_order: props.byteOrder } : {}),
    },
  });

  imageCache.set(key, ref);
  return ref;
}
