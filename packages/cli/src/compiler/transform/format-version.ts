/**
 * Library format version constant.
 *
 * This version number is stamped into every compiled ESPCompose library
 * and checked by the consuming project's compiler / SDK at load time.
 * Bump this version whenever the compiled metadata protocol changes
 * (e.g. new fields in __espcompose.compiled() deps, new __compiled* shapes,
 * structural changes to action tree serialization).
 *
 * Version history:
 *   1 — Initial versioned format (reactive.compiled, reactive.slotted,
 *       __compiledActions, __compiledScript)
 */
export const LIBRARY_FORMAT_VERSION = 2;

/** The export name injected into compiled library entry points. */
export const FORMAT_VERSION_EXPORT = '__espcompose_format__';
