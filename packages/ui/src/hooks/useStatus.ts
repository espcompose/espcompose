/**
 * Resolve a status color token.
 * Returns an object where each color is a IRReactiveNode.
 */

import { useMemo, isIRReactiveNode, useReactive } from '@espcompose/core';
import type { Reactive, IRReactiveNode, Signal } from '@espcompose/core';
import type { StatusToken } from '../theme/types';
import { themeLeaf } from './utils';

export function useStatus(value: Reactive<StatusToken>): {
  bg: Signal<string>;
  text: Signal<string>;
  bgPressed: Signal<string>;
} {
  const resolved = useReactive(value);
  if (isIRReactiveNode(resolved)) {
    return {
      bg: useMemo(() => themeLeaf('colors', (resolved as IRReactiveNode<StatusToken>).get(), 'bg')),
      text: useMemo(() => themeLeaf('colors', (resolved as IRReactiveNode<StatusToken>).get(), 'text')),
      bgPressed: useMemo(() => themeLeaf('colors', (resolved as IRReactiveNode<StatusToken>).get(), 'bgPressed')),
    };
  }
  return {
    bg: themeLeaf('colors', resolved, 'bg'),
    text: themeLeaf('colors', resolved, 'text'),
    bgPressed: themeLeaf('colors', resolved, 'bgPressed'),
  };
}
