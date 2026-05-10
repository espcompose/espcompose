// ────────────────────────────────────────────────────────────────────────────
// Phase G architectural leak guard.
//
// Asserts that target-specific vocabulary (ESPHome YAML keys, LVGL C macros,
// duration formats, action paths, platform classification rules, snake_case
// converters, etc.) does NOT appear in @espcompose/core source files.
//
// The list mirrors the inventory from the Phase G plan. Each pattern represents
// a class of leak that has been moved to @espcompose/esphome-target.
// ────────────────────────────────────────────────────────────────────────────

import { describe, expect, it } from 'vitest';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const CORE_SRC = join(__dirname);

// Files exempt from the leak guard:
// - tests (verifying the leak vocabulary is allowed in test contexts)
// - generated/ (codegen output mirrors ESPHome schema verbatim by design)
// - this guard file itself
// - reactive-properties.ts (HA-aligned domain brand strings — semantic, not target leaks)
const EXEMPT_PATTERNS = [
  /\.test\.ts$/,
  /[/\\]generated[/\\]/,
  /leak-guard\.test\.ts$/,
  /reactive-properties\.ts$/,
];

function listTsFiles(dir: string): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const s = statSync(full);
    if (s.isDirectory()) {
      out.push(...listTsFiles(full));
    } else if (name.endsWith('.ts')) {
      out.push(full);
    }
  }
  return out;
}

interface Leak {
  /** Short name shown in failure output. */
  name: string;
  /** Regex that matches the forbidden vocabulary. */
  pattern: RegExp;
  /** Why it's a leak; what should own it instead. */
  reason: string;
  /** Optional: per-file exemptions (substring matches against relative path). */
  exemptFiles?: readonly string[];
}

const LEAKS: readonly Leak[] = [
  {
    name: 'ESPHome trigger keys',
    pattern: /'on_state'|'on_value'/,
    reason: 'ESPHome YAML automation keys must be picked by the target via sourceDomain.',
  },
  {
    name: 'ESPHome top_layer YAML key',
    pattern: /'top_layer'/,
    reason: 'ESPHome LVGL container shape is owned by esphome-target/lvgl-yaml-emitter.ts.',
  },
  {
    name: 'LVGL C macro spellings',
    pattern: /'TRANSP'|'COVER'|'SIZE_CONTENT'|'SPACE_BETWEEN'|'TOP_MID'|'BOTTOM_MID'|'ERR_DIFF'/,
    reason: 'LVGL C-token spellings live in esphome-target/lvgl-style-value-translate.ts.',
  },
  {
    name: 'Snake-case YAML utilities',
    pattern: /\bcamelToSnake\b|\bkeysToSnakeCase\b|\btoYamlKey\b/,
    reason: 'YAML key conversion is target-side; core emits camelCase semantic IR.',
  },
  {
    name: 'C++ pointer-flavored type tag',
    pattern: /'font_ptr'/,
    reason: 'ExprType uses semantic font_ref; font_ptr is the C++ lowering only.',
  },
  {
    name: 'ESPHome duration string format',
    pattern: /'\d+ms'|'\d+s'|'\d+min'/,
    reason: 'Durations are { ms: number } in IR; target formats ESPHome strings.',
    exemptFiles: ['lvgl/style/duration.ts'],
  },
];

describe('Phase G architectural leak guard (core)', () => {
  const files = listTsFiles(CORE_SRC).filter(
    f => !EXEMPT_PATTERNS.some(p => p.test(f)),
  );

  it('finds source files to scan', () => {
    expect(files.length).toBeGreaterThan(10);
  });

  for (const leak of LEAKS) {
    it(`has no leak: ${leak.name}`, () => {
      const hits: string[] = [];
      for (const file of files) {
        if (leak.exemptFiles?.some(s => file.includes(s))) continue;
        const text = readFileSync(file, 'utf8');
        const lines = text.split('\n');
        lines.forEach((line, i) => {
          // Skip comment-only lines so doc references don't trip the guard.
          const trimmed = line.trim();
          if (trimmed.startsWith('//') || trimmed.startsWith('*')) return;
          if (leak.pattern.test(line)) {
            hits.push(`${relative(CORE_SRC, file)}:${i + 1}  ${line.trim()}`);
          }
        });
      }
      if (hits.length > 0) {
        throw new Error(
          `Leak "${leak.name}" detected (${leak.reason}):\n  ${hits.join('\n  ')}`,
        );
      }
    });
  }
});
