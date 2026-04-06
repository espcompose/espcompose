/**
 * Resolve a component size token.
 * Returns an object where each dimension is a Signal.
 */

import { useReactiveMap } from '@espcompose/core';
import type { Reactive, Signal } from '@espcompose/core';
import type { SizeToken } from '../theme/types';
import { themeLeaf } from './utils';

export function useSize(value: Reactive<SizeToken>): {
  height: Signal<number>;
  fontSize: Signal<number>;
  paddingX: Signal<number>;
  paddingY: Signal<number>;
} {
  return {
    height: useReactiveMap(value, (v) => themeLeaf('sizes', v, 'height')),
    fontSize: useReactiveMap(value, (v) => themeLeaf('sizes', v, 'fontSize')),
    paddingX: useReactiveMap(value, (v) => themeLeaf('sizes', v, 'paddingX')),
    paddingY: useReactiveMap(value, (v) => themeLeaf('sizes', v, 'paddingY')),
  };
}
