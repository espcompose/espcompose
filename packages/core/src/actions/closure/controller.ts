// ── Controller descriptor ───────────────────────────────────────────────────

import type { ClosureDescriptor } from './registry';
import { CONTROLLER_SCRIPTS } from '../resolve/symbols';

/** Shape of a controller's hidden internal fields (from useController). */
interface ControllerInternalShape {
  [CONTROLLER_SCRIPTS]: Record<string, unknown>;
}

function isControllerObject(v: unknown): v is ControllerInternalShape {
  return v != null && typeof v === 'object' && CONTROLLER_SCRIPTS in (v as object);
}

export const controllerDescriptor: ClosureDescriptor<ControllerInternalShape> = {
  match: isControllerObject,

  toClosureKey(v) {
    // Aggregate script IDs for dedup identity.
    const ids = Object.entries(v[CONTROLLER_SCRIPTS])
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, h]) => `${k}:${(h as { id?: string })?.id ?? ''}`)
      .join(',');
    return `controller:${ids}`;
  },

  // Controllers don't contribute closure fields directly — their
  // underlying script handles carry the closure data.
  irType: undefined,
};
