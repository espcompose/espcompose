// ────────────────────────────────────────────────────────────────────────────
// Extract display dimensions and rotation from SemanticIR
//
// Scans the IR sections for a `display` entry and extracts `width`, `height`,
// and `rotation` so the simulator can automatically size its viewport to
// match the project's physical display configuration.
// ────────────────────────────────────────────────────────────────────────────

import type { SemanticIR, IRValue, IRObject } from '@espcompose/core/internals';

export interface DisplayConfig {
  width: number;
  height: number;
  rotation: number;
}

/**
 * Extract display configuration (width, height, rotation) from a SemanticIR.
 *
 * Looks for a `display` section and reads:
 *   - `dimensions.width` / `dimensions.height` (nested object)
 *   - `width` / `height` (top-level, e.g. addressable_light)
 *   - `rotation` (top-level, degrees: 0, 90, 180, 270)
 *
 * When rotation is 90° or 270°, the effective display dimensions are swapped
 * so the simulator viewport matches the landscape/portrait orientation.
 *
 * Returns `undefined` if no display section or no dimensions are found.
 */
export function extractDisplayConfig(ir: SemanticIR): DisplayConfig | undefined {
  const displaySection = ir.esphome.sections.find(s => s.key === 'display');
  if (!displaySection) return undefined;

  const displayValue = displaySection.value;
  if (displayValue.kind !== 'object') return undefined;

  return extractFromDisplayObject(displayValue);
}

function extractFromDisplayObject(obj: IRObject): DisplayConfig | undefined {
  let width: number | undefined;
  let height: number | undefined;
  let rotation = 0;

  for (const entry of obj.entries) {
    if (entry.key === 'dimensions' && entry.value.kind === 'object') {
      // Nested dimensions object: { width, height }
      for (const dimEntry of entry.value.entries) {
        if (dimEntry.key === 'width') {
          width = scalarNumber(dimEntry.value);
        } else if (dimEntry.key === 'height') {
          height = scalarNumber(dimEntry.value);
        }
      }
    } else if (entry.key === 'width' && width === undefined) {
      width = scalarNumber(entry.value);
    } else if (entry.key === 'height' && height === undefined) {
      height = scalarNumber(entry.value);
    } else if (entry.key === 'rotation') {
      rotation = scalarNumber(entry.value) ?? 0;
    }
  }

  if (width === undefined || height === undefined) return undefined;

  // Apply rotation: 90° and 270° swap width/height
  if (rotation === 90 || rotation === 270) {
    return { width: height, height: width, rotation };
  }

  return { width, height, rotation };
}

function scalarNumber(value: IRValue): number | undefined {
  if (value.kind === 'scalar' && typeof value.value === 'number') {
    return value.value;
  }
  return undefined;
}
