// ── Script Handle descriptor ────────────────────────────────────────────────

import { IR_ID_REF, irScalar } from '../../ir/types';
import type { ClosureDescriptor } from './registry';

interface ScriptHandleLike {
  id: string;
  execute: () => void;
  stop: () => void;
}

function isScriptHandle(v: unknown): v is ScriptHandleLike {
  return typeof v === 'function' && 'id' in (v as unknown as Record<string, unknown>) && 'execute' in (v as unknown as Record<string, unknown>);
}

export const scriptHandleDescriptor: ClosureDescriptor<ScriptHandleLike> = {
  match: isScriptHandle,

  toClosureKey(v) {
    return `script:${v.id}`;
  },

  irType: IR_ID_REF,

  toClosureField(bindingName) {
    return { kind: 'closure_field' as const, name: `${bindingName}_idx`, irType: IR_ID_REF };
  },

  toClosureValue(v) {
    return irScalar(v.id);
  },
};
