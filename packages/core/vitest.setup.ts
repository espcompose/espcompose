// Test setup for `@espcompose/core` unit tests.
//
// Core tests exercise the render pipeline without loading a real target. The
// pipeline calls `getYamlShaper()` (target-supplied) for camelCase →
// snake_case key conversion and JSX-element-to-YAML-key mapping. Provide an
// ESPHome-equivalent default here so the tests can run in isolation.
import { setYamlShaper } from './src/lvgl/yaml-hook';
import { setHAEntityClassifier } from './src/entity/ha-classifier';

setYamlShaper({
  transformPropKey: (key: string): string =>
    key
      .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
      .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
      .toLowerCase(),
  transformElementType: (type: string): string =>
    type.startsWith('lvgl-') ? type.slice(5).replace(/-/g, '_') : type,
});

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
