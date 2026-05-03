// ────────────────────────────────────────────────────────────────────────────
// Closure Protocol — barrel re-exports + descriptor registration
// ────────────────────────────────────────────────────────────────────────────

// Symbols
export { CLOSURE_INDEX } from './symbols';

// Registry
export { registerClosureDescriptor, findClosureDescriptor } from './registry';
export type { ClosureDescriptor } from './registry';

// Descriptors
export { overlayControllerDescriptor } from './overlay';
export type { OverlayControllerInternal } from './overlay';
export { scriptHandleDescriptor } from './script-handle';
export { refDescriptor } from './ref';
export { controllerDescriptor } from './controller';
export { identityDescriptor } from './identity';

// ── Registration ────────────────────────────────────────────────────────────
// Register built-in descriptors in order of specificity.
// More specific descriptors MUST come before generic ones.
// The identity fallback is NOT registered — findClosureDescriptor returns null
// when no registered descriptor matches.

import { registerClosureDescriptor } from './registry';
import { controllerDescriptor } from './controller';
import { overlayControllerDescriptor } from './overlay';
import { scriptHandleDescriptor } from './script-handle';
import { refDescriptor } from './ref';

registerClosureDescriptor(controllerDescriptor);
registerClosureDescriptor(overlayControllerDescriptor);
registerClosureDescriptor(scriptHandleDescriptor);
registerClosureDescriptor(refDescriptor);
