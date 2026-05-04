---
"@espcompose/eslint": patch
"@espcompose/core": patch
"@espcompose/cli": patch
"@espcompose/ui": patch
---

### @espcompose/core

- Added `useTransientOverlay` hook — a queue/slot mechanic primitive for transient overlay lifecycles (toasts, notifications, snackbars). Supports configurable `maxVisible` slots, `overflow` policies (`replace`, `queue`, `drop`), and `autoHide` durations.
- Added `useVisibility` hook — composable show/hide lifecycle for LVGL widgets and overlay controllers with optional auto-hide sequencing backed by ESPHome scripts.
- Refactored `useOverlay` internals to use symbol-keyed fields (`OVERLAY_TEMPLATE_KEY`, `OVERLAY_INSTANCE_INDEX`, `OVERLAY_Z_ORDER`) instead of dunder string properties, making overlay identity invisible to consumers.
- Added `RESOLVE_METHOD_CALL` protocol symbol allowing controllers to self-resolve method calls into domain-specific IR actions without hardcoding in the generic resolver.
- Refactored closure system into modular files under `actions/closure/` with a descriptor registry pattern. Replaced dunder properties with `CLOSURE_INDEX` symbol.
- Added `generateDeterministicId` utility using FNV-1a hashing for reproducible C++-safe identifiers derived from hook paths.
- Added statement-level IR types (`IRStatementBlock`, `IRVarDeclStatement`, `IRAssignStatement`, `IRIfStatement`, `IRForRangeStatement`, `IRWhileStatement`, `IRReturnStatement`) for multi-statement memo lambdas.
- Centralized ID generation functions into `id.ts`.
- Removed deprecated `useLvglVisibility` hook (replaced by `useVisibility`).
- Removed deprecated dependency tracking logic related to the "run and listen" strategy.

### @espcompose/cli

- Added statement compiler (`stmt-compiler.ts`) that compiles TypeScript AST from `useMemo` arrow function bodies into `IRStatementBlock` IR nodes.
- Added asset path transformer that rewrites relative paths in `useImage()` and `useFont()` calls to be relative to the entry file's source directory.
- Updated reactive transformer to support the new statement block IR and transient overlay slot globals.

### @espcompose/ui

- Rewrote `useToast` hook to delegate to `useTransientOverlay` from core. Now supports `maxVisible` (multi-slot toasts with compacted stacking), `overflow` policies, and configurable `queueLength`. Default `autoHide` is `'3s'`.

### @espcompose/eslint

- Removed `useEffect` from valid hook tracking in `no-hook-outside-component` and `no-untracked-signal` test cases (reflecting removal of useEffect from the public hook set).
