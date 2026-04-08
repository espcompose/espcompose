// ────────────────────────────────────────────────────────────────────────────
// IR-based simulator renderer — SemanticIR → RuntimeNode[]
//
// Walks the SemanticIR config tree and produces RuntimeNode[] for the
// browser simulator.
//
// The renderer:
//   1. Finds the LVGL section in ir.sections
//   2. Walks the IR tree extracting pages and widgets
//   3. Classifies each prop: IRReactive → ReactiveProp, IRRef → RefProp,
//      IRAction → ActionProp, IRScalar → StaticProp
//   4. Wires reactive props to JS Signal/Memo for MockProvider-driven updates
//   5. Populates theme getters from IR theme leaf data
// ────────────────────────────────────────────────────────────────────────────

import type { SemanticIR } from '@espcompose/core/internals';
import type { RuntimeNode } from '../../types';
import { Scheduler } from '../../runtime/signals';
import type { MockProvider } from '../../providers/mock-provider';
import { EntitySignalRegistry } from './entity-registry.js';
import type { IRRenderContext } from './lowering-context.js';
import { buildLvglNodesFromIR } from './widgets.js';
import { loadFontsFromIR, buildFontRefMap } from './fonts.js';

/**
 * Lower a SemanticIR to RuntimeNode[] for the simulator.
 *
 * Walks the IR config tree looking for the LVGL section, then converts
 * pages and widgets into RuntimeNodes with classified props.
 * Wires reactive props to JS Signals from the MockProvider.
 */
export function lowerToSimulator(
  ir: SemanticIR,
  provider: MockProvider,
): RuntimeNode[] {
  Scheduler.reset();

  const themeData = ir.espcompose.themes;

  // Build image map from IR components
  const imageMap = new Map<string, { file: string; resize?: string }>();
  for (const component of ir.esphome.components) {
    if (component.section === 'image' && typeof component.config === 'object' && component.config) {
      const config = component.config as Record<string, unknown>;
      if (config.id && config.file) {
        imageMap.set(String(config.id), {
          file: String(config.file),
          resize: typeof config.resize === 'string' ? config.resize : undefined,
        });
      }
    }
  }

  // Load fonts referenced by IR components
  loadFontsFromIR(ir);

  // Build font ref map — maps font component ref tokens to CSS font strings
  const fontMap = buildFontRefMap(ir);

  const ctx: IRRenderContext = {
    entityRegistry: new EntitySignalRegistry(provider),
    provider,
    nodeCounter: 0,
    themeData,
    themeIndex: themeData?.defaultIndex ?? 0,
    imageMap,
    fontMap,
  };

  // Register all HA entities from the IR so the MockProvider has them
  for (const entity of ir.esphome.haEntities) {
    provider.ensureEntity(entity.entityId);
  }

  // Find the LVGL section
  const lvglSection = ir.esphome.sections.find(s => s.key === 'lvgl');
  if (!lvglSection) return [];

  return buildLvglNodesFromIR(lvglSection.value, ctx);
}
