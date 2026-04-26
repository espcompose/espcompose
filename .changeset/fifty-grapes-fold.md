---
"@espcompose/core": patch
"@espcompose/cli": patch
"@espcompose/ui": patch
---

Add popup support via `usePopup()` hook, allowing shared LVGL popup widget subtrees to be declared once and reused across multiple component instances with per-instance reactive bindings.

### `@espcompose/core`

- Added `usePopup(factory)` hook that deduplicates popup widget structure across component instances and returns a `PopupController` with `show()` and `dismiss()` methods
- Added `IRPopupShow` and `IRPopupDismiss` IR action node types
- Added popup controller reference resolution pipeline (`resolvePopupControllerRefs`, `cleanPopupControllerRefs`) run during script serialization
- Added structural fingerprinting (`assertPopupStructuralIdentity`) to enforce that all popup instances produce identical widget trees

### `@espcompose/cli`

- Added compiler support for `controller.show()` / `controller.dismiss()` action calls on `PopupController` types, lowered to `IRPopupShow` / `IRPopupDismiss`
- Added `POPUP_BRAND` type-brand detection to identify popup controller values in the action transform pipeline

### `@espcompose/ui`

- Added `Popup` component: a themed backdrop + centered container widget intended for use inside `usePopup()` factory callbacks. Accepts `padding`, `radius`, `gap`, `backdropOpacity`, and `onBackdropPress` props with theme token support
