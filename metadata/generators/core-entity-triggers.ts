/**
 * Generator: core entity triggers
 *
 * Produces packages/core/src/generated/entity-domains-triggers.ts with:
 * - ENTITY_DOMAIN_TRIGGERS — entity domain trigger entries in TRIGGER_REGISTRY shape
 *
 * Only entity domain triggers are generated here.
 * LVGL widget triggers remain hand-maintained in trigger-registry.ts.
 */

import * as fs from 'fs';
import * as path from 'path';
import type { DomainMap, GeneratorResult } from './types.js';
import { FILE_HEADER } from './types.js';

export function generateCoreEntityTriggers(domains: DomainMap, repoRoot: string): GeneratorResult {
  const outputPath = path.join(repoRoot, 'packages/core/src/generated/entity-domains-triggers.ts');

  const lines: string[] = [
    FILE_HEADER,
    '/* eslint-disable */',
    '',
    'import type { TriggerSignature } from \'../trigger-registry.js\';',
    '',
    '/**',
    ' * Entity domain trigger entries, generated from metadata/entity-domains.json.',
    ' * Merged with hand-maintained LVGL triggers in trigger-registry.ts.',
    ' */',
    'export const ENTITY_DOMAIN_TRIGGERS: Readonly<Record<string, Record<string, TriggerSignature>>> = {',
  ];

  for (const [domainName, desc] of Object.entries(domains)) {
    const triggerEntries = Object.entries(desc.triggers);
    if (triggerEntries.length === 0) continue;

    lines.push(`  ${domainName}: {`);
    for (const [triggerName, sig] of triggerEntries) {
      if (sig.variables.length === 0) {
        lines.push(`    ${triggerName}: { variables: [] },`);
      } else {
        const vars = sig.variables
          .map(v => `{ name: ${JSON.stringify(v.name)}, cppType: ${JSON.stringify(v.cppType)}, tsType: ${JSON.stringify(v.tsType)} }`)
          .join(', ');
        lines.push(`    ${triggerName}: { variables: [${vars}] },`);
      }
    }
    lines.push('  },');
  }

  lines.push('};');
  lines.push('');

  const content = lines.join('\n');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, content, 'utf8');
  return { outputPath, linesWritten: lines.length };
}
