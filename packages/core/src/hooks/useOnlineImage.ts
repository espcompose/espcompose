// ────────────────────────────────────────────────────────────────────────────
// useOnlineImage() — Online Image component hook
//
// Creates an ESPHome online_image component definition and returns a typed
// Ref<OnlineImageRef>. The ref exposes actions: setUrl(), release(), and
// componentUpdate() for manual refresh control.
//
// Also auto-registers a singleton http_request component (required
// dependency for online_image).
//
// Deduplicates: multiple calls with the same url + format + resize produce
// the same component and return the same ref.
//
// Must be called inside a function component body (render pass).
// ────────────────────────────────────────────────────────────────────────────

import type { OnlineImageRef } from '../component-aliases';
import type { Ref } from '../types';
import { RefHandle } from '../types';
import { assertHookContext } from './useState';
import { registerComponent } from './useReactiveScope';

// ────────────────────────────────────────────────────────────────────────────
// Public options — curated subset of OnlineImageProps for the hook API
// ────────────────────────────────────────────────────────────────────────────

export interface UseOnlineImageOptions {
  /** URL to download the image from. */
  url: string;
  /** Image encoding format on the server. */
  format: 'BMP' | 'JPEG' | 'JPG' | 'PNG';
  /** Internal pixel encoding for LVGL. */
  type?: 'BINARY' | 'GRAYSCALE' | 'RGB565' | 'RGB';
  /** Resize to fit inside `WIDTHxHEIGHT`, preserving aspect ratio. */
  resize?: string;
  /** Alpha channel handling. */
  transparency?: 'opaque' | 'chroma_key' | 'alpha_channel';
  /** Byte order for RGB565 images. */
  byteOrder?: 'BIG_ENDIAN' | 'LITTLE_ENDIAN';
  /** Download buffer size in bytes (default 65536). */
  bufferSize?: number;
  /**
   * How often to re-download the image (e.g. `'5s'`, `'30s'`, `'1min'`).
   * Defaults to `'never'`.
   */
  updateInterval?: string;
}

// ────────────────────────────────────────────────────────────────────────────
// Cache — deduplication within a render pass
// ────────────────────────────────────────────────────────────────────────────

const onlineImageCache = new Map<string, Ref<OnlineImageRef>>();

/** Clear the online image cache. Called at the start of each render pass. */
export function clearOnlineImageCache(): void {
  onlineImageCache.clear();
}

function cacheKey(opts: UseOnlineImageOptions): string {
  return JSON.stringify([
    opts.url,
    opts.format,
    opts.type ?? '',
    opts.resize ?? '',
    opts.transparency ?? '',
    opts.byteOrder ?? '',
    opts.bufferSize ?? '',
    opts.updateInterval ?? '',
  ]);
}

// ────────────────────────────────────────────────────────────────────────────
// Public API
// ────────────────────────────────────────────────────────────────────────────

/**
 * Create an ESPHome online_image component and return a typed ref to it.
 *
 * The online image definition is registered for injection into the final YAML
 * config. By default, `update_interval` is omitted (ESPHome defaults to
 * `never`), so the image is only fetched when you call `ref.componentUpdate()`
 * from a trigger or script.
 *
 * @example
 * const cam = useOnlineImage({
 *   url: 'http://frigate.local:5000/api/driveway/latest.jpg?h=240',
 *   format: 'JPEG',
 *   type: 'RGB565',
 *   resize: '426x240',
 * });
 *
 * // Poll manually from a script:
 * const poll = useScript(async () => {
 *   while (true) { cam.componentUpdate(); await delay('3s'); }
 * }, { mode: 'single' });
 *
 * // Wire to page lifecycle:
 * useAttachedTrigger(pageRef, 'onLoad', () => { poll.execute(); });
 * useAttachedTrigger(pageRef, 'onLeave', () => { poll.stop(); });
 *
 * <Image src={cam} style={{ width: 426, height: 240 }} />
 */
export function useOnlineImage(opts: UseOnlineImageOptions): Ref<OnlineImageRef> {
  assertHookContext('useOnlineImage()');

  const key = cacheKey(opts);
  const cached = onlineImageCache.get(key);
  if (cached) return cached;


  const ref = new RefHandle<OnlineImageRef>() as unknown as Ref<OnlineImageRef>;
  const id = ref.toString();

  registerComponent({
    kind: 'component',
    section: 'online_image',
    id,
    config: {
      id,
      url: opts.url,
      format: opts.format,
      ...(opts.type != null ? { type: opts.type } : {}),
      ...(opts.resize != null ? { resize: opts.resize } : {}),
      ...(opts.transparency != null ? { transparency: opts.transparency } : {}),
      ...(opts.byteOrder != null ? { byte_order: opts.byteOrder } : {}),
      ...(opts.bufferSize != null ? { buffer_size: opts.bufferSize } : {}),
      ...(opts.updateInterval != null ? { update_interval: opts.updateInterval } : {}),
    },
  });

  onlineImageCache.set(key, ref);
  return ref;
}
