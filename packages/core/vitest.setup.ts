// Test setup for `@espcompose/core` unit tests.
//
// Core tests exercise the render pipeline without loading a real target.
// The HA entity classifier still requires a stub for tests that exercise
// `useHAEntity()`.
import { setHAEntityClassifier } from './src/entity/ha-classifier';

// Stub HA entity classifier mirroring the ESPHome target's mintTargetId/
// classifyPlatform rules. Tests that exercise `useHAEntity()` rely on this.
setHAEntityClassifier(({ entityId, domain, attribute, facet }) => {
  const base = `ha_${entityId.replace('.', '_')}`;
  const targetId = attribute
    ? `${base}_${attribute}`
    : facet === 'stateText'
      ? `${base}_state_text`
      : base;
  let platform: string;
  if (attribute) platform = 'sensor';
  else if (facet === 'stateText') platform = 'text_sensor';
  else if (domain === 'sensor' || domain === 'number') platform = 'sensor';
  else if (domain === 'text_sensor' || domain === 'select') platform = 'text_sensor';
  else platform = 'binary_sensor';
  return { targetId, platform };
});
