// ── Overlay Controller descriptor ────────────────────────────────────────────

import { IR_INT, irScalar } from '../../ir/types';
import {
  OVERLAY_TEMPLATE_KEY,
  OVERLAY_INSTANCE_INDEX,
  OVERLAY_Z_ORDER,
  OVERLAY_LIFECYCLE_SCRIPT_ID,
} from '../../hooks/useOverlay';
import type { ClosureDescriptor } from './registry';

/** Shape of an OverlayController's hidden symbol-keyed internal fields. */
export interface OverlayControllerInternal {
  [OVERLAY_TEMPLATE_KEY]: string;
  [OVERLAY_INSTANCE_INDEX]: number;
  [OVERLAY_Z_ORDER]: number;
  [OVERLAY_LIFECYCLE_SCRIPT_ID]?: string;
}

function isOverlayController(v: unknown): v is OverlayControllerInternal {
  return v != null && typeof v === 'object' && OVERLAY_TEMPLATE_KEY in (v as object);
}

export const overlayControllerDescriptor: ClosureDescriptor<OverlayControllerInternal> = {
  match: isOverlayController,

  toClosureKey(v) {
    return `overlay:${v[OVERLAY_TEMPLATE_KEY]}`;
  },

  irType: IR_INT,

  toClosureField(bindingName) {
    return { kind: 'closure_field' as const, name: `${bindingName}_instance_index`, irType: IR_INT };
  },

  toClosureValue(v) {
    return irScalar(v[OVERLAY_INSTANCE_INDEX]);
  },
};
