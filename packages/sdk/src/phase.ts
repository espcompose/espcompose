// ────────────────────────────────────────────────────────────────────────────
// Phase Tracking
//
// Tracks which compilation phase is currently active so that SDK APIs can
// assert they are called in the correct context. The compiler sets the phase
// during execution; SDK functions like build.run() and bind.haEntity() check
// it and throw a clear error if called in the wrong phase.
//
// Phases:
//   'idle'   — no compilation in progress
//   'module' — user module is being evaluated (build.run allowed)
//   'render' — JSX tree is being rendered (bind.* allowed)
// ────────────────────────────────────────────────────────────────────────────

export type Phase = 'idle' | 'module' | 'render';

let currentPhase: Phase = 'idle';

/**
 * Set the current compilation phase.
 * Called by the compiler during the execute step — not intended for user code.
 */
export function setPhase(phase: Phase): void {
  currentPhase = phase;
}

/** Get the current compilation phase. */
export function getPhase(): Phase {
  return currentPhase;
}

/**
 * Assert that the current phase is one of the expected phases.
 * Throws `PhaseError` with a clear message naming the API and phase mismatch.
 */
export function assertPhase(expected: Phase | Phase[], api: string): void {
  const allowed = Array.isArray(expected) ? expected : [expected];
  if (!allowed.includes(currentPhase)) {
    throw new PhaseError(
      `${api} can only be called during the ${allowed.map(p => `'${p}'`).join(' or ')} phase, ` +
      `but was called during the '${currentPhase}' phase.`,
    );
  }
}

/**
 * Error thrown when an API is called during the wrong compilation phase.
 */
export class PhaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PhaseError';
  }
}
