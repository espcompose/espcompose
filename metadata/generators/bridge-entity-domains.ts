/**
 * Generator: bridge entity domains (Python)
 *
 * Produces packages/simulator-bridge/src/generated/entity_domains.py with:
 * - DOMAINS dict — per-domain metadata
 * - KNOWN_DOMAINS frozenset
 * - DEFAULT_STATES dict
 * - ACTION_SERVICE_MAP — domain → action → service suffix
 * - ACTION_RESULT_STATES — domain.service → result state
 */

import * as fs from 'fs';
import * as path from 'path';
import type { DomainMap, GeneratorResult } from './types.js';

const PY_HEADER = '# AUTO-GENERATED — DO NOT EDIT. Source: metadata/entity-domains.json\n';

export function generateBridgeEntityDomains(domains: DomainMap, repoRoot: string): GeneratorResult {
  const outputPath = path.join(repoRoot, 'packages/simulator-bridge/src/generated/entity_domains.py');

  const lines: string[] = [
    PY_HEADER,
    '"""',
    'Centralized entity domain metadata generated from entity-domains.json.',
    '"""',
    '',
    'from __future__ import annotations',
    '',
    '',
    '# ── Domain metadata ──────────────────────────────────────────────────────────',
    '',
    'DOMAINS: dict[str, dict] = {',
  ];

  for (const [name, desc] of Object.entries(domains)) {
    lines.push(`    ${JSON.stringify(name)}: {`);
    lines.push(`        "sensor_platform": ${JSON.stringify(desc.sensorPlatform)},`);
    lines.push(`        "default_state": ${JSON.stringify(desc.defaultState)},`);
    lines.push(`        "active_state": ${desc.activeState !== null ? JSON.stringify(desc.activeState) : 'None'},`);
    lines.push(`        "ui_category": ${JSON.stringify(desc.uiCategory)},`);
    lines.push('    },');
  }

  lines.push('}');
  lines.push('');
  lines.push('');

  // KNOWN_DOMAINS
  lines.push('KNOWN_DOMAINS: frozenset[str] = frozenset(DOMAINS.keys())');
  lines.push('');
  lines.push('');

  // DEFAULT_STATES
  lines.push('DEFAULT_STATES: dict[str, str] = {');
  lines.push('    k: v["default_state"] for k, v in DOMAINS.items()');
  lines.push('}');
  lines.push('');
  lines.push('');

  // ACTION_SERVICE_MAP — domain → { camelName → service_suffix }
  lines.push('# Maps domain → action name → HA service suffix');
  lines.push('ACTION_SERVICE_MAP: dict[str, dict[str, str]] = {');
  for (const [name, desc] of Object.entries(domains)) {
    if (desc.actions.length === 0) continue;
    const entries = desc.actions
      .map(a => `${JSON.stringify(a.name)}: ${JSON.stringify(a.service)}`)
      .join(', ');
    lines.push(`    ${JSON.stringify(name)}: {${entries}},`);
  }
  lines.push('}');
  lines.push('');
  lines.push('');

  // ACTION_RESULT_STATES — "domain.service" → result state (or None)
  lines.push('# Maps "domain.service" → expected result state (None = toggle/unknown)');
  lines.push('ACTION_RESULT_STATES: dict[str, str | None] = {');
  for (const [name, desc] of Object.entries(domains)) {
    for (const action of desc.actions) {
      const key = `${name}.${action.service}`;
      const val = action.resultState !== null && action.resultState !== undefined
        ? JSON.stringify(action.resultState)
        : 'None';
      lines.push(`    ${JSON.stringify(key)}: ${val},`);
    }
  }
  lines.push('}');
  lines.push('');

  const content = lines.join('\n');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, content, 'utf8');
  return { outputPath, linesWritten: lines.length };
}
