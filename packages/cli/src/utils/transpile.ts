import type { ComposeTarget } from '@espcompose/core/internals';

type BuildFn = (projectDir: string, target: ComposeTarget, options?: { debug?: boolean }) => Promise<void>;

/** Run the transpile step (TSX → YAML). */
export async function transpileProject(
  resolvedDir: string,
  yamlPath: string,
  buildFn: BuildFn,
  createTarget: () => ComposeTarget,
  options?: { debug?: boolean },
): Promise<void> {
  console.log(`Transpiling ${resolvedDir} → .espcompose/esphome.yaml`);
  await buildFn(resolvedDir, createTarget(), { debug: options?.debug });
  console.log(`✓ Written to ${yamlPath}`);
}
