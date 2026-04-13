// ────────────────────────────────────────────────────────────────────────────
// useLvgl hook
//
// Provides implicit access to the enclosing <lvgl> element's ref from
// anywhere inside an LVGL widget tree. Eliminates the need to manually
// pass the lvgl ref through component props.
//
// The context is automatically injected by `buildLvglSection()` when it
// processes an <lvgl> element, so user code only needs to call the hook.
// ────────────────────────────────────────────────────────────────────────────

import type { Ref } from '../types';
import type { LvglComponentRef } from '../component-aliases';
import { createContext, useContext } from './useContext';
import { assertHookContext } from './useState';

/** @internal — pushed by buildLvglSection(), consumed by useLvgl(). */
export const LvglContext = createContext<Ref<LvglComponentRef> | undefined>(undefined);

/**
 * Returns the ref of the nearest enclosing `<lvgl>` element.
 *
 * Throws if called outside an LVGL tree.
 *
 * Use this hook to access LVGL page-navigation actions (pageNext, pagePrevious,
 * pageShow, etc.) without manually passing the ref through component props.
 *
 * @example
 * function NavButton({ target }: { target: Ref }) {
 *   const lvgl = useLvgl();
 *   return (
 *     <Button text="Go" onPress={() => { lvgl.pageShow({ id: target }); }} />
 *   );
 * }
 */
export function useLvgl(): Ref<LvglComponentRef> {
  assertHookContext('useLvgl()');
  const ref = useContext(LvglContext);
  if (ref == null) {
    throw new Error('useLvgl() must be called inside an <lvgl> tree.');
  }
  return ref;
}
