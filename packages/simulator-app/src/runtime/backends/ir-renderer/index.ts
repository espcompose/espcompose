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
//   6. Extracts automation triggers (e.g. api.on_client_connected)
// ────────────────────────────────────────────────────────────────────────────

import type { SemanticIR, IRObject, IRAction } from '@espcompose/core/internals';
import type { RuntimeNode } from '../../types';
import { Scheduler } from '../../runtime/signals';
import type { MockProvider } from '../../providers/mock-provider';
import { EntitySignalRegistry } from './entity-registry.js';
import type { IRRenderContext } from './lowering-context.js';
import { buildLvglNodesFromIR } from './widgets.js';
import { loadFontsFromIR, buildFontRefMap } from './fonts.js';
import { interpretActionSteps, executeActionStep } from './actions.js';

// ── Public types ─────────────────────────────────────────────────────────────

export interface AutomationTrigger {
  /** Dot-separated trigger name, e.g. 'api.on_client_connected'. */
  trigger: string;
  /** Execute the trigger's action sequence. */
  execute: () => Promise<void>;
}

export interface LoweringResult {
  /** RuntimeNode tree for the LVGL section. */
  nodes: RuntimeNode[];
  /** Current active page index (mutable). */
  getCurrentPageIndex: () => number;
  /** Total page count. */
  pageCount: number;
  /** Register a callback invoked when page navigation (or similar) changes require re-render. */
  setRerenderCallback: (cb: () => void) => void;
  /** Extracted automation triggers from non-LVGL sections. */
  automations: AutomationTrigger[];
}

// ── Main entry ───────────────────────────────────────────────────────────────

/**
 * Lower a SemanticIR to a LoweringResult for the simulator.
 *
 * Walks the IR config tree looking for the LVGL section, then converts
 * pages and widgets into RuntimeNodes with classified props.
 * Wires reactive props to JS Signals from the MockProvider.
 * Extracts automation triggers from sections like `api`.
 */
export function lowerToSimulator(
  ir: SemanticIR,
  provider: MockProvider,
): LoweringResult {
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
    currentPageIndex: 0,
    pageCount: 0,
    skipPages: new Set(),
  };

  // Register all HA entities from the IR so the MockProvider has them.
  // Use the generated ID (ha_light_office) because the EntitySignalRegistry
  // subscribes to provider changes using generated IDs, not raw entity IDs.
  for (const entity of ir.esphome.haEntities) {
    const genId = entity.generatedId || `ha_${entity.entityId.replace('.', '_')}`;
    provider.ensureEntity(genId);
  }

  // Find the LVGL section
  const lvglSection = ir.esphome.sections.find(s => s.key === 'lvgl');
  const nodes = lvglSection ? buildLvglNodesFromIR(lvglSection.value, ctx) : [];

  // Extract automations from config sections (e.g. api.on_client_connected)
  const automations = extractAutomations(ir, ctx);

  return {
    nodes,
    getCurrentPageIndex: () => ctx.currentPageIndex,
    pageCount: ctx.pageCount,
    setRerenderCallback: (cb) => { ctx.requestRerender = cb; },
    automations,
  };
}

// ── Automation extraction ────────────────────────────────────────────────────

/**
 * Walk non-LVGL IR sections looking for trigger props (on_*) that contain
 * compiled action trees. Returns executable automation entries.
 */
function extractAutomations(ir: SemanticIR, ctx: IRRenderContext): AutomationTrigger[] {
  const automations: AutomationTrigger[] = [];

  for (const section of ir.esphome.sections) {
    if (section.value.kind !== 'object') continue;
    const obj = section.value as IRObject;

    for (const entry of obj.entries) {
      // Look for trigger props like on_client_connected, on_boot, etc.
      if (!entry.key.startsWith('on_')) continue;
      if (entry.value.kind !== 'action') continue;

      const action = entry.value as IRAction;
      const steps = interpretActionSteps(action.actions);

      automations.push({
        trigger: `${section.key}.${entry.key}`,
        execute: async () => {
          for (const step of steps) {
            await executeActionStep(step, ctx);
          }
        },
      });
    }
  }

  return automations;
}
