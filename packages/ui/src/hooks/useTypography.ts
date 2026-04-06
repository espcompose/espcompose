/** Resolve a typography variant to reactive font properties. */

import { useReactiveMap } from '@espcompose/core';
import type { Reactive, Signal } from '@espcompose/core';
import type { TextVariant } from '../theme/types';
import { themeLeaf } from './utils';

export function useTypography(variant: Reactive<TextVariant>): {
  fontFamily: Signal<string>;
  fontSize: Signal<number>;
} {
  return {
    fontFamily: useReactiveMap(variant, (v) => themeLeaf('typography', v, 'fontFamily')),
    fontSize: useReactiveMap(variant, (v) => themeLeaf('typography', v, 'fontSize')),
  };
}
