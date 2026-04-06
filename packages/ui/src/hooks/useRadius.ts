/** Resolve a radius token to a reactive pixel value. */

import { useMemo, isIRReactiveNode, useReactive } from '@espcompose/core';
import type { Reactive, IRReactiveNode, Signal } from '@espcompose/core';
import type { RadiusToken } from '../theme/types';
import { themeLeaf } from './utils';

export function useRadius(
  value: Reactive<RadiusToken>,
): Signal<number> {
  const resolved = useReactive(value);
  if (isIRReactiveNode(resolved)) {
    return useMemo(() => {
      return themeLeaf('radii', (resolved as IRReactiveNode<RadiusToken>).get());
    });
  }
  // plain string token
  return themeLeaf('radii', resolved as RadiusToken);
}
