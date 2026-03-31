// ────────────────────────────────────────────────────────────────────────────
// Ref Registry — maps ref tokens to their element tag and component classes
//
// During render, when a component with a `ref` prop is processed, we register
// the ref token → element tag mapping. This allows trigger handler bodies
// to call ref action methods (e.g. `lightRef.toggle()`) and have them
// resolve to the correct ESPHome YAML action key.
// ────────────────────────────────────────────────────────────────────────────

const refTagMap = new Map<string, string>();
const refClassMap = new Map<string, string[]>();

/** Register a ref token's element tag. Called during render/serialization. */
export function registerRefTag(token: string, elementTag: string): void {
  refTagMap.set(token, elementTag);
}

/** Look up the element tag for a ref token. */
export function getRefTag(token: string): string | undefined {
  return refTagMap.get(token);
}

/** Look up the action classes for a ref token. */
export function getRefClasses(token: string): string[] | undefined {
  return refClassMap.get(token);
}

/** Clear between compile runs. */
export function clearRefRegistry(): void {
  refTagMap.clear();
  refClassMap.clear();
}
