// ────────────────────────────────────────────────────────────────────────────
// Popup structural fingerprint
//
// Compares rendered popup subtrees across instances of a shared popup
// template to enforce structural identity. The fingerprint encodes:
//
//   - element types in tree position (intrinsic tag name OR function
//     component name)
//   - prop key shape (sorted, ignoring values — values legitimately differ
//     across instances; only structural prop presence matters)
//   - children nesting depth and order
//
// It deliberately ignores prop *values*: instance #0 may bind `light.kitchen`
// to a slider while instance #1 binds `light.bedroom` — the structures are
// identical, only the entity differs. Values are handled by the table-driven
// codegen (Phase 6) via mux + table_lookup.
//
// Throwing here gives the user a clear, early error instead of producing
// silently-broken muxed code.
// ────────────────────────────────────────────────────────────────────────────

import type { EspComposeElement } from '../types';
import { Fragment } from '../serialize';

const CHILDREN_KEY = 'children';
const REF_KEY = 'ref';

/**
 * Compute a structural fingerprint for a popup's rendered output.
 *
 * The fingerprint is a deterministic string that two structurally-identical
 * trees will share. Function components are represented by their `.name`,
 * intrinsic elements by their string tag, fragments by `<>`. Prop keys are
 * sorted; `children` and `ref` are excluded from the prop-key set since
 * they're handled positionally / out-of-band.
 */
export function structuralFingerprint(
  el: EspComposeElement | EspComposeElement[] | null | undefined,
): string {
  if (el == null) return '∅';
  if (Array.isArray(el)) {
    return `[${el.map(structuralFingerprint).join(',')}]`;
  }
  let type: string;
  if (typeof el.type === 'function') {
    type = `<${el.type.name || 'anonymous'}>`;
  } else if (el.type === Fragment) {
    type = '<>';
  } else {
    type = String(el.type);
  }
  const props = (el.props ?? {}) as Record<string, unknown>;
  const propKeys = Object.keys(props)
    .filter((k) => k !== CHILDREN_KEY && k !== REF_KEY)
    .sort()
    .join(',');
  const children = (props as { children?: EspComposeElement | EspComposeElement[] }).children;
  const childFp = children !== undefined ? structuralFingerprint(children) : '';
  return `${type}{${propKeys}}(${childFp})`;
}

/**
 * Validate that all popup instances under a single template produced the
 * same structure. Throws on the first mismatch with a directive error.
 *
 * Called by the LVGL serializer once all instances have been collected.
 */
export function assertPopupStructuralIdentity(
  templateKey: string,
  instances: ReadonlyArray<{
    index: number;
    rendered: EspComposeElement | EspComposeElement[] | null | undefined;
  }>,
): void {
  if (instances.length < 2) return;
  const canonical = structuralFingerprint(instances[0].rendered);
  for (let i = 1; i < instances.length; i++) {
    const fp = structuralFingerprint(instances[i].rendered);
    if (fp !== canonical) {
      throw new Error(
        `usePopup() template '${templateKey}' produced divergent structures across instances.\n` +
        `  Instance 0 fingerprint: ${canonical}\n` +
        `  Instance ${i} fingerprint: ${fp}\n\n` +
        `All instances of a shared popup must produce the same widget structure ` +
        `because the popup is deduplicated. Move conditional rendering outside the ` +
        `popup factory, or use a reactive expression (useMemo) for value differences ` +
        `instead of structural differences.`,
      );
    }
  }
}
