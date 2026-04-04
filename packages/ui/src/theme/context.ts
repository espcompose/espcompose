/**
 * Theme context — reactive edition.
 *
 * The old compile-time ThemeContext/ThemeProvider/useTheme() are replaced by
 * the SDK's reactive theme system.  useReactiveTheme() returns a proxy
 * whose leaf properties are ReactiveNodes tied to C++ theme memos.
 *
 * This file re-exports the SDK hooks for convenience so existing UI
 * component imports from '../theme/context' continue to work.
 */

export { useReactiveTheme } from '@espcompose/core';

