/**
 * Resolve a status color token.
 * Returns an object where each color is a Signal.
 */

import { useReactiveMap } from '@espcompose/core';
import type { Reactive, Signal } from '@espcompose/core';
import type { StatusToken } from '../theme/types';
import { themeLeaf } from './utils';

export function useStatus(value: Reactive<StatusToken>): {
  bg: Signal<string>;
  text: Signal<string>;
  bgPressed: Signal<string>;
} {
  return {
    bg: useReactiveMap(value, (v) => themeLeaf('colors', v, 'bg')),
    text: useReactiveMap(value, (v) => themeLeaf('colors', v, 'text')),
    bgPressed: useReactiveMap(value, (v) => themeLeaf('colors', v, 'bgPressed')),
  };
}
