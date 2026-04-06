/** Resolve a spacing token to a reactive pixel value. */

import { useReactiveMap } from '@espcompose/core';
import type { Reactive, Signal } from '@espcompose/core';
import type { SpacingToken } from '../theme/types';
import { themeLeaf } from './utils';

export function useSpacing(
  value: Reactive<SpacingToken>,
): Signal<number> {
  return useReactiveMap(value, (v) => themeLeaf('spacing', v));
}
