/**
 * Generator: esphome-target sensor platforms
 *
 * Produces packages/esphome-target/src/generated/sensor-platforms.ts:
 * - SensorPlatform type
 * - DOMAIN_SENSOR_PLATFORMS — domain → primary sensor platform mapping
 * - getDomainSensorType() — lookup wrapper
 * - exprTypeToPlatform() — ExprType → SensorPlatform switch
 *
 * These are ESPHome-specific concepts that don't belong in core.
 */

import * as fs from 'fs';
import * as path from 'path';
import type { DomainMap, GeneratorResult } from './types.js';
import { FILE_HEADER } from './types.js';

export function generateEsphomeTargetSensorPlatforms(
  domains: DomainMap,
  repoRoot: string,
): GeneratorResult {
  const outputPath = path.join(
    repoRoot,
    'packages/esphome-target/src/generated/sensor-platforms.ts',
  );

  const lines: string[] = [
    FILE_HEADER,
    '/* eslint-disable */',
    '',
    "import type { ExprType } from '@espcompose/core/internals';",
    '',
    '// ── Types ────────────────────────────────────────────────────────────────────',
    '',
    "export type SensorPlatform = 'binary_sensor' | 'sensor' | 'text_sensor';",
    '',
    '// ── Domain → platform mapping ────────────────────────────────────────────────',
    '',
    'export const DOMAIN_SENSOR_PLATFORMS: Readonly<Record<string, SensorPlatform>> = {',
  ];

  for (const [name, desc] of Object.entries(domains)) {
    lines.push(`  ${name}: ${JSON.stringify(desc.sensorPlatform)},`);
  }

  lines.push('};');
  lines.push('');

  // getDomainSensorType
  lines.push('export function getDomainSensorType(domain: string): SensorPlatform {');
  lines.push('  const platform = DOMAIN_SENSOR_PLATFORMS[domain];');
  lines.push('  if (!platform) throw new Error(`Unknown entity domain: ${domain}`);');
  lines.push('  return platform;');
  lines.push('}');
  lines.push('');

  // exprTypeToPlatform
  lines.push('/** Derive the ESPHome sensor platform from an expression type. */');
  lines.push('export function exprTypeToPlatform(exprType: ExprType): SensorPlatform {');
  lines.push('  switch (exprType) {');
  lines.push("    case 'float': return 'sensor';");
  lines.push("    case 'bool': return 'binary_sensor';");
  lines.push("    case 'string': return 'text_sensor';");
  lines.push("    default: throw new Error(`Cannot derive sensor platform from ExprType '${exprType}'`);");
  lines.push('  }');
  lines.push('}');
  lines.push('');

  const content = lines.join('\n');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, content, 'utf8');
  return { outputPath, linesWritten: lines.length };
}
