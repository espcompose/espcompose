// ────────────────────────────────────────────────────────────────────────────
// Closure symbols — symbol-keyed internal fields for closure protocol objects
// ────────────────────────────────────────────────────────────────────────────

/**
 * Closure-table row index, attached to ScriptHandle and OverlayController
 * objects at render time by `useScript`. The action resolvers read this to
 * patch `IRScriptExecuteAction.closureIndex` in the compiled action tree.
 */
export const CLOSURE_INDEX: unique symbol = Symbol('closure.index');
