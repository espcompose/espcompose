import type { ComposeTarget } from '@espcompose/core/internals';
import type { CompileResult } from '../compiler/compiler';

type BuildFn = (projectDir: string, target: ComposeTarget, options?: { debug?: boolean; wireframe?: boolean }) => Promise<CompileResult>;

/** Run the transpile step (TSX → YAML). */
export async function transpileProject(
  resolvedDir: string,
  yamlPath: string,
  buildFn: BuildFn,
  createTarget: () => ComposeTarget,
  options?: { debug?: boolean; wireframe?: boolean },
): Promise<CompileResult> {
  console.log(`Transpiling ${resolvedDir} → .espcompose/esphome.yaml`);
  const result = await buildFn(resolvedDir, createTarget(), { debug: options?.debug, wireframe: options?.wireframe });
  console.log(`✓ Written to ${yamlPath}`);
  return result;
}
