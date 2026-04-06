/** Resolve a typography variant to reactive font properties. */

import { useMemo, isIRReactiveNode, useReactive } from '@espcompose/core';
import type { Reactive, IRReactiveNode, Signal } from '@espcompose/core';
import type { TextVariant } from '../theme/types';
import { themeLeaf } from './utils';

export function useTypography(variant: Reactive<TextVariant>): {
  fontFamily: Signal<string>;
  fontSize: Signal<number>;
} {
  const resolved = useReactive(variant);
  if (isIRReactiveNode(resolved)) {
    return {
      fontFamily: useMemo(() => themeLeaf('typography', (resolved as IRReactiveNode<TextVariant>).get(), 'fontFamily')),
      fontSize: useMemo(() => themeLeaf('typography', (resolved as IRReactiveNode<TextVariant>).get(), 'fontSize')),
    };
  }
  return {
    fontFamily: themeLeaf('typography', resolved, 'fontFamily'),
    fontSize: themeLeaf('typography', resolved, 'fontSize'),
  };
}
