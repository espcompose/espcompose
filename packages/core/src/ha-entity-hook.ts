// ────────────────────────────────────────────────────────────────────────────
// HA entity classifier hook
//
// Classifying a Home Assistant entity into a target-specific platform name
// (e.g. ESPHome's `binary_sensor` / `sensor` / `text_sensor`) and minting
// the target-side component id (e.g. `ha_light_kitchen`) is target-specific
// knowledge. Core's `useHAEntity()` hook only knows the semantic HA shape
// (entity id, domain, attribute, facet), and delegates classification to
// whatever target has been wired in for the current render pass.
//
// Targets register their classifier here before render runs (typically from
// `ComposeTarget.registerRenderHooks(coreSdk)`). Core stores the resulting
// `targetId`/`platform` strings on `IRHAEntity` opaquely — it never authors
// or interprets them.
// ────────────────────────────────────────────────────────────────────────────

/**
 * Semantic input passed to a target classifier. All fields are
 * target-neutral HA vocabulary.
 */
export interface HAEntityClassifyInput {
  /** Full HA entity id, e.g. `light.kitchen_floods`. */
  entityId: string;
  /** HA domain prefix of the entity id, e.g. `light`, `sensor`. */
  domain: string;
  /** Optional HA entity attribute (e.g. `brightness`). */
  attribute?: string;
  /**
   * Optional facet hint for multi-facet bindings. Targets may use this to
   * disambiguate which sub-import to mint (e.g. the text rendering of an
   * entity's state vs the boolean state itself). `undefined` means the
   * primary state import.
   */
  facet?: 'state' | 'stateText';
}

/**
 * Target-supplied classification result. Both fields are opaque to core.
 */
export interface HAEntityClassifyResult {
  /** Target-side component id (e.g. ESPHome `id:` value). */
  targetId: string;
  /** Target-side platform/section key (e.g. ESPHome `binary_sensor`). */
  platform: string;
}

export type HAEntityClassifier = (input: HAEntityClassifyInput) => HAEntityClassifyResult;

let _classifier: HAEntityClassifier | null = null;

export function setHAEntityClassifier(fn: HAEntityClassifier): void {
  _classifier = fn;
}

export function getHAEntityClassifier(): HAEntityClassifier {
  if (_classifier == null) {
    throw new Error(
      'No HA entity classifier has been registered. ' +
        'A target must call setHAEntityClassifier() before the render pass runs.',
    );
  }
  return _classifier;
}

export function classifyHAEntity(input: HAEntityClassifyInput): HAEntityClassifyResult {
  return getHAEntityClassifier()(input);
}

export function clearHAEntityClassifier(): void {
  _classifier = null;
}
