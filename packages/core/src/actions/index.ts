export { delay, logger, lambda } from './primitives';
export { waitUntil } from './primitives';

export { findClosureDescriptor, registerClosureDescriptor, CLOSURE_INDEX } from './closure';
export type { ClosureDescriptor, OverlayControllerInternal } from './closure';

export { isTriggerVar, TriggerVar } from './triggers';

export { TRIGGER_REGISTRY, getTriggerSignature } from './trigger-registry';
export type { TriggerSignature, TriggerVariable } from './trigger-registry';

export { resolveOverlayControllerRefs, cleanOverlayControllerRefs } from './resolve/overlay';
export { resolveControllerMethodCalls, cleanControllerRefs } from './resolve/controller';
export { resolveAnimationControllerRefs, cleanAnimationControllerRefs } from './resolve/animation';
export { resolveScriptHandleClosureIndex, cleanScriptHandleRefs } from './resolve/script-handle';
export { RESOLVE_METHOD_CALL } from './resolve/symbols';
export type { MethodCallResolvable } from './resolve/symbols';
