/**
 * Resolve a component size token.
 * Returns an object where each dimension is a IRReactiveNode<number>.
 */

import { useMemo, isIRReactiveNode, useReactive } from '@espcompose/core';
import type { Reactive, IRReactiveNode, Signal } from '@espcompose/core';
import type { SizeToken } from '../theme/types';
import { themeLeaf } from './utils';

export function useSize(value: Reactive<SizeToken>): {
  height: Signal<number>;
  fontSize: Signal<number>;
  paddingX: Signal<number>;
  paddingY: Signal<number>;
} {
  const resolved = useReactive(value);
  if (isIRReactiveNode(resolved)) {
    return {
      height: useMemo(() => themeLeaf('sizes', (resolved as IRReactiveNode<SizeToken>).get(), 'height')),
      fontSize: useMemo(() => themeLeaf('sizes', (resolved as IRReactiveNode<SizeToken>).get(), 'fontSize')),
      paddingX: useMemo(() => themeLeaf('sizes', (resolved as IRReactiveNode<SizeToken>).get(), 'paddingX')),
      paddingY: useMemo(() => themeLeaf('sizes', (resolved as IRReactiveNode<SizeToken>).get(), 'paddingY')),
    };
  }
  return {
    height: themeLeaf('sizes', resolved, 'height'),
    fontSize: themeLeaf('sizes', resolved, 'fontSize'),
    paddingX: themeLeaf('sizes', resolved, 'paddingX'),
    paddingY: themeLeaf('sizes', resolved, 'paddingY'),
  };
}
