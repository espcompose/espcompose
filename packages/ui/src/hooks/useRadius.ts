/** Resolve a radius token to a reactive pixel value. */

import { useReactiveMap } from '@espcompose/core';
import type { Reactive, Signal } from '@espcompose/core';
import type { RadiusToken } from '../theme/types';
import { themeLeaf } from './utils';

export function useRadius(
  value: Reactive<RadiusToken>,
): Signal<number> {
  return useReactiveMap(value, (v) => themeLeaf('radii', v));
}
