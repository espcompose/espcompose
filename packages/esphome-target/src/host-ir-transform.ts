// ────────────────────────────────────────────────────────────────────────────
// Host IR Transform — Post-process SemanticIR for ESPHome host platform
//
// Transforms a hardware-targeted SemanticIR (e.g. ESP32 + ILI9xxx display)
// into one targeting the ESPHome host platform with SDL2 rendering.
// Used by `espcompose run --host` to enable high-fidelity UI simulation
// without physical hardware.
// ────────────────────────────────────────────────────────────────────────────

import type { SemanticIR, IRSection, IRObject, IREntry, IRValue } from '@espcompose/core/internals';
import { irSection, irScalar, irObject, irEntry } from '@espcompose/core/internals';

export interface HostTransformOptions {
  /** Override SDL display width. */
  width?: number;
  /** Override SDL display height. */
  height?: number;
}

// ── Device platform section keys (replaced by `host:`) ──────────────────

const DEVICE_PLATFORM_KEYS = new Set([
  'esp32',
  'esp8266',
  'rp2040',
  'bk72xx',
  'rtl87xx',
]);

// ── Sections allowed on the host platform ───────────────────────────────
// Only whitelisted sections pass through. Unknown/hardware sections are
// dropped by default — this is safer than a blacklist because new hardware
// components won't accidentally break host mode.

const HOST_ALLOWED_SECTIONS = new Set([
  // Core
  'esphome',
  'api',
  'logger',
  'external_components',
  'globals',
  'substitutions',

  // UI
  'display',       // replaced with SDL
  'touchscreen',   // replaced with SDL
  'lvgl',
  'font',
  'image',
  'animation',
  'color',

  // HA integration & virtual entities
  'homeassistant',
  'sensor',
  'text_sensor',
  'binary_sensor',
  'number',
  'select',
  'switch',
  'button',
  'lock',
  'cover',
  'fan',
  'climate',
  'valve',
  'update',
  'alarm_control_panel',
  'datetime',
  'date',
  'time',
  'event',
  'media_player',

  // Automations
  'script',
  'interval',
  'on_boot',
]);

// ── Known display model → dimensions ────────────────────────────────────

const KNOWN_DISPLAY_DIMENSIONS: Record<string, { width: number; height: number }> = {
  ILI9341: { width: 320, height: 240 },
  ILI9342: { width: 320, height: 240 },
  ILI9481: { width: 480, height: 320 },
  ILI948118: { width: 480, height: 320 },
  ILI9486: { width: 480, height: 320 },
  ILI9488: { width: 480, height: 320 },
  ST7789V: { width: 240, height: 320 },
  ST7735: { width: 160, height: 128 },
  ST7796: { width: 480, height: 320 },
  ST7701S: { width: 480, height: 480 },
  GC9A01A: { width: 240, height: 240 },
  SSD1351: { width: 128, height: 128 },
};

const DEFAULT_DIMENSIONS = { width: 320, height: 240 };

// ── Helpers ─────────────────────────────────────────────────────────────

function findEntry(obj: IRObject, key: string): IREntry | undefined {
  return obj.entries.find(e => e.key === key);
}

function getScalarValue(value: IRValue): string | number | boolean | undefined {
  return value.kind === 'scalar' ? value.value : undefined;
}

/**
 * Extract the `id` entry from an IR display section value.
 * The display value may be an IRObject (single display) or IRArray (display list).
 */
function extractDisplayId(displayValue: IRValue): IREntry | undefined {
  if (displayValue.kind === 'object') {
    return findEntry(displayValue, 'id');
  }
  if (displayValue.kind === 'array' && displayValue.items.length > 0) {
    const first = displayValue.items[0];
    if (first.kind === 'object') {
      return findEntry(first, 'id');
    }
  }
  return undefined;
}

/**
 * Find `rotation` in the `lvgl` section.
 * ESPHome 2026.4+ requires rotation in the LVGL config (not the display)
 * when LVGL is active.
 */
function findLvglRotation(sections: readonly IRSection[]): number | undefined {
  const lvglSection = sections.find(s => s.key === 'lvgl');
  if (!lvglSection || lvglSection.value.kind !== 'object') return undefined;
  const rotEntry = findEntry(lvglSection.value, 'rotation');
  if (!rotEntry) return undefined;
  const val = getScalarValue(rotEntry.value);
  return typeof val === 'number' ? val : undefined;
}

/**
 * Infer display dimensions from the existing display config,
 * accounting for rotation (90°/270° swaps width↔height).
 *
 * Resolution order:
 * 1. Explicit `dimensions` in the display config (SDL-style)
 * 2. Model-based inference from KNOWN_DISPLAY_DIMENSIONS
 * 3. Default fallback (320×240)
 *
 * After resolving dimensions, if rotation is 90° or 270° the width and
 * height are swapped so the SDL window opens at the final orientation.
 */
function inferDisplayDimensions(
  displayValue: IRValue,
  lvglRotation?: number,
): { width: number; height: number } {
  const obj = displayValue.kind === 'object'
    ? displayValue
    : displayValue.kind === 'array' && displayValue.items[0]?.kind === 'object'
      ? displayValue.items[0]
      : undefined;

  if (!obj) return DEFAULT_DIMENSIONS;

  let dims = DEFAULT_DIMENSIONS;

  // Check for explicit dimensions
  const dimsEntry = findEntry(obj, 'dimensions');
  if (dimsEntry && dimsEntry.value.kind === 'object') {
    const w = findEntry(dimsEntry.value, 'width');
    const h = findEntry(dimsEntry.value, 'height');
    if (w && h) {
      const wv = getScalarValue(w.value);
      const hv = getScalarValue(h.value);
      if (typeof wv === 'number' && typeof hv === 'number') {
        dims = { width: wv, height: hv };
      }
    }
  } else {
    // Infer from model name
    const modelEntry = findEntry(obj, 'model');
    if (modelEntry) {
      const model = getScalarValue(modelEntry.value);
      if (typeof model === 'string') {
        const known = KNOWN_DISPLAY_DIMENSIONS[model];
        if (known) dims = known;
      }
    }
  }

  // If rotation is 90° or 270°, swap to get final orientation.
  // Check display first, then fall back to LVGL rotation (ESPHome 2026.4+
  // requires rotation in the LVGL config when LVGL is active).
  const rotationEntry = findEntry(obj, 'rotation');
  const rot = rotationEntry ? getScalarValue(rotationEntry.value) : lvglRotation;
  if (rot === 90 || rot === 270) {
    dims = { width: dims.height, height: dims.width };
  }

  return dims;
}

// ── Display properties portable to SDL ──────────────────────────────────
// These base display schema properties are valid on any display platform
// (including SDL) and should be carried over from the original config.
//
// NOTE: `rotation` is intentionally excluded. On hardware, rotation tells
// the driver to remap the framebuffer. For SDL, we bake rotation into the
// window dimensions (swapping w↔h for 90°/270°) so the window opens at
// the correct final orientation.

const PORTABLE_DISPLAY_KEYS = new Set([
  'update_interval',
  'auto_clear_enabled',
  'show_test_card',
  'pages',
  'lambda',
  'on_page_change',
]);

/**
 * Build an SDL display section preserving portable properties from the original.
 */
function buildSdlDisplay(
  originalDisplayValue: IRValue,
  width: number,
  height: number,
): IRObject {
  const entries: IREntry[] = [
    irEntry('platform', irScalar('sdl')),
    irEntry('dimensions', irObject([
      irEntry('width', irScalar(width)),
      irEntry('height', irScalar(height)),
    ])),
  ];

  // Preserve display id for LVGL reference integrity
  const idEntry = extractDisplayId(originalDisplayValue);
  if (idEntry) {
    entries.push(idEntry);
  }

  // Carry over portable display properties (rotation, update_interval, etc.)
  const obj = originalDisplayValue.kind === 'object'
    ? originalDisplayValue
    : originalDisplayValue.kind === 'array' && originalDisplayValue.items[0]?.kind === 'object'
      ? originalDisplayValue.items[0]
      : undefined;

  if (obj) {
    for (const entry of obj.entries) {
      if (PORTABLE_DISPLAY_KEYS.has(entry.key)) {
        entries.push(entry);
      }
    }
  }

  return irObject(entries);
}

/**
 * Build an SDL touchscreen section.
 */
function buildSdlTouchscreen(): IRObject {
  return irObject([
    irEntry('platform', irScalar('sdl')),
  ]);
}

// ── Logger entry keys unsupported on host ───────────────────────────────

const LOGGER_STRIP_KEYS = new Set([
  'hardware_uart',
  'baud_rate',
]);

/**
 * Strip hardware-specific entries from the logger section.
 * The `hardware_uart` and `baud_rate` options are only available on
 * physical platforms, not on the host platform.
 */
function stripLoggerHardwareEntries(value: IRValue): IRValue {
  if (value.kind !== 'object') return value;
  const filtered = value.entries.filter(e => !LOGGER_STRIP_KEYS.has(e.key));
  if (filtered.length === value.entries.length) return value;
  return irObject(filtered);
}

// ── Main transform ──────────────────────────────────────────────────────

/**
 * Transform a SemanticIR for the ESPHome host platform.
 *
 * - Replaces device platform sections (esp32, esp8266, etc.) with `host:`
 * - Replaces display with SDL display (preserving id for LVGL refs)
 * - Replaces touchscreen with SDL touchscreen
 * - Strips hardware-specific entries from logger
 * - Only passes through whitelisted sections; unknown sections are dropped
 *
 * Returns a new SemanticIR — does not mutate the input.
 */
export function transformIRForHost(
  ir: SemanticIR,
  options?: HostTransformOptions,
): SemanticIR {
  const sections = ir.esphome.sections;
  const result: IRSection[] = [];
  let hostSectionInjected = false;

  for (const section of sections) {
    // Replace device platform with host
    if (DEVICE_PLATFORM_KEYS.has(section.key)) {
      if (!hostSectionInjected) {
        result.push(irSection('host', irObject([])));
        hostSectionInjected = true;
      }
      continue;
    }

    // Drop sections not in the whitelist
    if (!HOST_ALLOWED_SECTIONS.has(section.key)) {
      continue;
    }

    // Replace display with SDL
    if (section.key === 'display') {
      const lvglRotation = findLvglRotation(sections);
      const inferred = inferDisplayDimensions(section.value, lvglRotation);
      const width = options?.width ?? inferred.width;
      const height = options?.height ?? inferred.height;
      result.push(irSection('display', buildSdlDisplay(section.value, width, height)));
      continue;
    }

    // Replace touchscreen with SDL
    if (section.key === 'touchscreen') {
      result.push(irSection('touchscreen', buildSdlTouchscreen()));
      continue;
    }

    // Strip hardware-specific entries from logger
    if (section.key === 'logger') {
      result.push(irSection('logger', stripLoggerHardwareEntries(section.value)));
      continue;
    }

    // Pass through all other sections unchanged
    result.push(section);
  }

  // If no device platform section was found, inject host anyway
  if (!hostSectionInjected) {
    result.unshift(irSection('host', irObject([])));
  }

  return {
    kind: 'semantic_ir',
    esphome: {
      ...ir.esphome,
      sections: result,
    },
    espcompose: ir.espcompose,
  };
}
