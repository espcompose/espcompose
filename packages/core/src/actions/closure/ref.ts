// ── Ref descriptor ──────────────────────────────────────────────────────────

import { IR_ID_REF, irScalar } from '../../ir/types';
import { isRef } from '../../types';
import type { ClosureDescriptor } from './registry';

export const refDescriptor: ClosureDescriptor<{ toString(): string }> = {
  match(v): v is { toString(): string } {
    return isRef(v);
  },

  toClosureKey(v) {
    return `ref:${v.toString()}`;
  },

  irType: IR_ID_REF,

  toClosureField(bindingName) {
    return { kind: 'closure_field' as const, name: `${bindingName}_idx`, irType: IR_ID_REF };
  },

  toClosureValue(v) {
    return irScalar(v.toString());
  },
};
