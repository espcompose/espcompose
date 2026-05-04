// ── Controller descriptor ───────────────────────────────────────────────────

import type { ClosureDescriptor } from './registry';

/** Shape of a controller's hidden internal fields (from useController). */
interface ControllerInternalShape {
  __scripts: Record<string, unknown>;
}

function isControllerObject(v: unknown): v is ControllerInternalShape {
  return v != null && typeof v === 'object' && '__scripts' in (v as Record<string, unknown>);
}

export const controllerDescriptor: ClosureDescriptor<ControllerInternalShape> = {
  match: isControllerObject,

  toClosureKey(v) {
    // Aggregate script IDs for dedup identity.
    const ids = Object.entries(v.__scripts)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, h]) => `${k}:${(h as { id?: string })?.id ?? ''}`)
      .join(',');
    return `controller:${ids}`;
  },

  // Controllers don't contribute closure fields directly — their
  // underlying script handles carry the closure data.
  irType: undefined,
};
