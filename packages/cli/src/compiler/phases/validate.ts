import type { IRValue, IRSection, SemanticIR } from '@espcompose/core/internals';
import { logWarn } from '../../utils/log.js';
import type { PhaseContext } from './types';

/**
 * Phase 3b: Validate IR
 *
 * Walks the SemanticIR config tree after the execute phase and warns about
 * null values — typically caused by missing environment variables or
 * undefined props that survived into the rendered output.
 */
export function validatePhase(ctx: PhaseContext): void {
  if (!ctx.executeResult) return;

  const nullPaths = collectNullPaths(ctx.executeResult.ir);
  if (nullPaths.length === 0) return;

  console.warn('');
  for (const p of nullPaths) {
    logWarn(`  ⚠ Null value at ${p} — is an environment variable or prop missing?`);
  }
  console.warn('');
}

function collectNullPaths(ir: SemanticIR): string[] {
  const paths: string[] = [];
  for (const section of ir.esphome.sections) {
    walkSection(section, paths);
  }
  return paths;
}

function walkSection(section: IRSection, paths: string[]): void {
  walkValue(section.value, section.key, paths);
}

function walkValue(value: IRValue, path: string, paths: string[]): void {
  switch (value.kind) {
    case 'null':
      paths.push(path);
      break;
    case 'object':
      for (const entry of value.entries) {
        walkValue(entry.value, `${path}.${entry.key}`, paths);
      }
      break;
    case 'array':
      for (let i = 0; i < value.items.length; i++) {
        walkValue(value.items[i], `${path}[${i}]`, paths);
      }
      break;
    // scalar, reactive, ref, action, secret, trigger_var — leaf nodes, no nulls
  }
}
