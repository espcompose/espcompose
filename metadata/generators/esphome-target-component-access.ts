/**
 * Generator: esphome-target component access
 *
 * Produces packages/esphome-target/src/generated/component-access.ts:
 * - ENTITY_PROPERTY_CPP_PATHS — (sourceDomain, propertyKey) → C++ access
 *   suffix appended directly to `id(comp_id)`.
 *
 * Also cross-validates that every (sourceDomain, propertyKey) referenced
 * by any property in entity-domains.json has a matching componentAccess
 * entry — failing codegen if not.
 */

import * as fs from 'fs';
import * as path from 'path';
import type { DomainMap, GeneratorResult } from './types.js';
import { FILE_HEADER } from './types.js';

export function generateEsphomeTargetComponentAccess(
  domains: DomainMap,
  repoRoot: string,
): GeneratorResult {
  const outputPath = path.join(
    repoRoot,
    'packages/esphome-target/src/generated/component-access.ts',
  );

  // ── Cross-validate: every referenced (sourceDomain, propertyKey) must exist
  for (const [domainName, desc] of Object.entries(domains)) {
    for (const prop of desc.properties) {
      const src = domains[prop.sourceDomain];
      if (!src) {
        throw new Error(
          `[codegen] ${domainName}.${prop.name}: sourceDomain '${prop.sourceDomain}' is not a defined domain`,
        );
      }
      if (src.componentAccess[prop.propertyKey] === undefined) {
        throw new Error(
          `[codegen] ${domainName}.${prop.name}: no componentAccess entry for ` +
            `'${prop.sourceDomain}.${prop.propertyKey}'. Add it under domains.${prop.sourceDomain}.componentAccess in metadata/entity-domains.json.`,
        );
      }
    }
  }

  const lines: string[] = [
    FILE_HEADER,
    '/* eslint-disable */',
    '',
    '/**',
    ' * Lookup table of (sourceDomain, propertyKey) → C++ access suffix appended',
    ' * directly to `id(comp_id)`. The suffix includes the leading \'.\' or \'->\'.',
    ' *',
    ' * Generated from metadata/entity-domains.json. Each entry corresponds to a',
    ' * domain\'s `componentAccess` map. Cross-validated at codegen time against',
    ' * every property\'s (sourceDomain, propertyKey) reference.',
    ' */',
    'export const ENTITY_PROPERTY_CPP_PATHS: Readonly<Record<string, Readonly<Record<string, string>>>> = {',
  ];

  for (const [domainName, desc] of Object.entries(domains)) {
    const entries = Object.entries(desc.componentAccess);
    if (entries.length === 0) continue;
    lines.push(`  ${domainName}: {`);
    for (const [key, cppPath] of entries) {
      lines.push(`    ${JSON.stringify(key)}: ${JSON.stringify(cppPath)},`);
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
