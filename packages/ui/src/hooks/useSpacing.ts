/** Resolve a spacing token to a reactive pixel value. */

import { useMemo, isIRReactiveNode, useReactive } from '@espcompose/core';
import type { Reactive, IRReactiveNode, Signal } from '@espcompose/core';
import type { SpacingToken } from '../theme/types';
import { themeLeaf } from './utils';

export function useSpacing(
  value: Reactive<SpacingToken>,
): Signal<number> {
  const resolved = useReactive(value);
  if (isIRReactiveNode(resolved)) {
    return useMemo(() => {
      return themeLeaf('spacing', (resolved as IRReactiveNode<SpacingToken>).get());
    });
  }
  // plain string token
  return themeLeaf('spacing', resolved as SpacingToken);
}
