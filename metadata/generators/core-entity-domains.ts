/**
 * Generator: core entity domains
 *
 * Produces packages/core/src/generated/entity-domains.ts with:
 * - ENTITY_DOMAINS record (full domain descriptors)
 * - KNOWN_DOMAIN_NAMES set
 * - Helper functions: getEntityDomain(), isKnownDomain(), getDomainSensorType()
 * - REACTIVE_PROPERTY_MAP (flattened from domain property descriptors)
 * - defaultStateForDomain()
 */

import * as fs from 'fs';
import * as path from 'path';
import type { DomainMap, DomainDescriptor, GeneratorResult } from './types.js';
import { FILE_HEADER } from './types.js';

export function generateCoreEntityDomains(domains: DomainMap, repoRoot: string): GeneratorResult {
  const outputPath = path.join(repoRoot, 'packages/core/src/generated/entity-domains.ts');

  const lines: string[] = [
    FILE_HEADER,
    '/* eslint-disable */',
    '',
    '// ── Types ────────────────────────────────────────────────────────────────────',
    '',
    "export type SensorPlatform = 'binary_sensor' | 'sensor' | 'text_sensor';",
    "export type ExprType = 'bool' | 'float' | 'string';",
    "export type UICategory = 'toggleable' | 'sensor' | 'binary' | 'cover' | 'button';",
    '',
    'export interface EntityPropertyDescriptor {',
    '  readonly name: string;',
    '  readonly cppPath: string;',
    '  readonly triggerType: string;',
    '  readonly exprType: ExprType;',
    '  readonly sourceDomain: string;',
    '}',
    '',
    'export interface EntityActionDescriptor {',
    '  readonly name: string;',
    '  readonly service: string;',
    '  readonly resultState: string | null;',
    '  readonly defaultAttributes: Readonly<Record<string, unknown>> | null;',
    '}',
    '',
    'export interface EntityDomainDescriptor {',
    '  readonly domain: string;',
    '  readonly sensorPlatform: SensorPlatform;',
    '  readonly cppType: string;',
    '  readonly defaultState: string;',
    '  readonly activeState: string | null;',
    '  readonly uiCategory: UICategory;',
    '  readonly properties: readonly EntityPropertyDescriptor[];',
    '  readonly actions: readonly EntityActionDescriptor[];',
    '}',
    '',
    'export interface ReactivePropertyConfig {',
    '  readonly property: string;',
    '  readonly triggerType: string;',
    '  readonly sourceDomain: string;',
    '  readonly exprType: ExprType;',
    '}',
    '',
    '// ── Domain registry ──────────────────────────────────────────────────────────',
    '',
  ];

  // Generate ENTITY_DOMAINS
  lines.push('export const ENTITY_DOMAINS: Readonly<Record<string, EntityDomainDescriptor>> = {');
  for (const [name, desc] of Object.entries(domains)) {
    lines.push(`  ${name}: {`);
    lines.push(`    domain: ${JSON.stringify(name)},`);
    lines.push(`    sensorPlatform: ${JSON.stringify(desc.sensorPlatform)},`);
    lines.push(`    cppType: ${JSON.stringify(desc.cppType)},`);
    lines.push(`    defaultState: ${JSON.stringify(desc.defaultState)},`);
    lines.push(`    activeState: ${JSON.stringify(desc.activeState)},`);
    lines.push(`    uiCategory: ${JSON.stringify(desc.uiCategory)},`);

    // Properties
    lines.push('    properties: [');
    for (const prop of desc.properties) {
      lines.push(`      { name: ${JSON.stringify(prop.name)}, cppPath: ${JSON.stringify(prop.cppPath)}, triggerType: ${JSON.stringify(prop.triggerType)}, exprType: ${JSON.stringify(prop.exprType)}, sourceDomain: ${JSON.stringify(prop.sourceDomain)} },`);
    }
    lines.push('    ],');

    // Actions
    lines.push('    actions: [');
    for (const action of desc.actions) {
      const parts = [
        `name: ${JSON.stringify(action.name)}`,
        `service: ${JSON.stringify(action.service)}`,
        `resultState: ${JSON.stringify(action.resultState ?? null)}`,
        `defaultAttributes: ${action.defaultAttributes ? JSON.stringify(action.defaultAttributes) : 'null'}`,
      ];
      lines.push(`      { ${parts.join(', ')} },`);
    }
    lines.push('    ],');

    lines.push('  },');
  }
  lines.push('};');
  lines.push('');

  // KNOWN_DOMAIN_NAMES
  lines.push('// ── Derived helpers ──────────────────────────────────────────────────────────');
  lines.push('');
  lines.push('export type EntityDomainName = keyof typeof ENTITY_DOMAINS;');
  lines.push('');
  lines.push('export const KNOWN_DOMAIN_NAMES: ReadonlySet<string> = new Set(Object.keys(ENTITY_DOMAINS));');
  lines.push('');

  // Helper functions
  lines.push('export function getEntityDomain(domain: string): EntityDomainDescriptor | undefined {');
  lines.push('  return ENTITY_DOMAINS[domain];');
  lines.push('}');
  lines.push('');

  lines.push('export function isKnownDomain(domain: string): boolean {');
  lines.push('  return domain in ENTITY_DOMAINS;');
  lines.push('}');
  lines.push('');

  lines.push("export function getDomainSensorType(domain: string): SensorPlatform {");
  lines.push('  const desc = ENTITY_DOMAINS[domain];');
  lines.push('  if (!desc) throw new Error(`Unknown entity domain: ${domain}`);');
  lines.push('  return desc.sensorPlatform;');
  lines.push('}');
  lines.push('');

  // defaultStateForDomain
  lines.push('export function defaultStateForDomain(domain: string): string {');
  lines.push('  const desc = ENTITY_DOMAINS[domain];');
  lines.push('  if (!desc) throw new Error(`Unknown entity domain: ${domain}`);');
  lines.push('  return desc.defaultState;');
  lines.push('}');
  lines.push('');

  // REACTIVE_PROPERTY_MAP — flattened from domain property descriptors
  // The existing REACTIVE_PROPERTY_MAP uses the "first domain that defines this property"
  // as the sourceDomain. We replicate that by iterating domains in order and taking the
  // first occurrence of each property name.
  lines.push('// ── Reactive property map (flattened from domain properties) ─────────────────');
  lines.push('');
  lines.push('export const REACTIVE_PROPERTY_MAP: Readonly<Record<string, ReactivePropertyConfig>> = {');

  const seenProperties = new Map<string, { domain: string; desc: DomainDescriptor }>();
  for (const [domainName, desc] of Object.entries(domains)) {
    for (const prop of desc.properties) {
      if (!seenProperties.has(prop.name)) {
        seenProperties.set(prop.name, { domain: domainName, desc });
      }
    }
  }

  for (const [domainName, desc] of Object.entries(domains)) {
    for (const prop of desc.properties) {
      const first = seenProperties.get(prop.name);
      if (first && first.domain === domainName) {
        // This domain is the canonical source for this property
        lines.push(`  ${prop.name}: { property: ${JSON.stringify(prop.cppPath)}, triggerType: ${JSON.stringify(prop.triggerType)}, sourceDomain: ${JSON.stringify(prop.sourceDomain)}, exprType: ${JSON.stringify(prop.exprType)} },`);
      }
    }
  }

  lines.push('};');
  lines.push('');

  const content = lines.join('\n');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, content, 'utf8');
  return { outputPath, linesWritten: lines.length };
}
