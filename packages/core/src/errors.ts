/**
 * Throws when a compile-time-only stub is invoked at render time.
 *
 * @param method  What was called (e.g. `"global.set()"`, `"script.execute()"`).
 * @param kind    Category of the marker (e.g. `"Global mutations"`, `"Script actions"`).
 */
export function throwCompileTimeOnly(method: string, kind: string): never {
  throw new Error(
    `${method} cannot be used during the render phase. ` +
    `${kind} are compile-time markers resolved at build time.`,
  );
}
