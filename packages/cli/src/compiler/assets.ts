/**
 * Asset resolution and copying for the ESPHome Compose compiler.
 *
 * Walks a rendered config object looking for props whose YAML key is a known
 * filesystem path (e.g. `file` on image/font components).  For each relative
 * path found, the file is copied into the build output directory and the path
 * is rewritten so it is relative to the emitted YAML file.
 *
 * Files are named with a content-hash suffix (`<stem>-<hash8><ext>`) to avoid
 * collisions between files with the same name but different contents, and to
 * deduplicate identical files referenced from multiple components.
 *
 * Skips absolute paths, URLs, MDI/MDIL/Memory icon references, and gfonts:// URIs.
 */

import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';

/** YAML keys whose values represent filesystem paths. */
const FILE_PATH_YAML_KEYS = new Set<string>([
  'file',
]);

/**
 * Returns true if the value looks like a non-filesystem reference that
 * should be left as-is (URLs, MDI icons, Google Fonts URIs, etc.).
 */
function isNonFilePath(value: string): boolean {
  return /^https?:\/\//.test(value)
    || /^mdi:/.test(value)
    || /^mdil:/.test(value)
    || /^memory:/.test(value)
    || /^gfonts:\/\//.test(value);
}

/**
 * Compute a content-hash decorated filename: `<stem>-<hash8><ext>`.
 */
function hashedName(absSource: string): string {
  const buf = fs.readFileSync(absSource);
  const hash = crypto.createHash('sha256').update(buf).digest('hex').slice(0, 8);
  const ext = path.extname(absSource);
  const stem = path.basename(absSource, ext);
  return `${stem}-${hash}${ext}`;
}

/**
 * Walk the config tree, resolve relative file paths, copy assets, and rewrite
 * paths in-place.
 *
 * @param config     The rendered config object (snake_case keys, pre-toYAML).
 * @param sourceDir  The directory of the original TSX entry file.
 * @param outDir     The build output directory (where esphome.yaml lives).
 * @returns          List of asset files that were copied.
 */
export function resolveAssets(
  config: Record<string, unknown>,
  sourceDir: string,
  outDir: string,
): string[] {
  const assetsDir = path.join(outDir, 'assets');
  const copied: string[] = [];

  // Maps absolute source path → relative output path (dedup + reuse)
  const resolvedMap = new Map<string, string>();

  walkAndRewrite(config, sourceDir, assetsDir, outDir, copied, resolvedMap);

  return copied;
}

function walkAndRewrite(
  obj: unknown,
  sourceDir: string,
  assetsDir: string,
  outDir: string,
  copied: string[],
  resolvedMap: Map<string, string>,
): void {
  if (Array.isArray(obj)) {
    for (const item of obj) {
      walkAndRewrite(item, sourceDir, assetsDir, outDir, copied, resolvedMap);
    }
    return;
  }

  if (obj == null || typeof obj !== 'object') return;

  const record = obj as Record<string, unknown>;
  for (const [key, value] of Object.entries(record)) {
    if (FILE_PATH_YAML_KEYS.has(key) && typeof value === 'string') {
      // Skip non-filesystem references
      if (isNonFilePath(value)) continue;

      // Skip absolute paths — user has explicitly managed them
      if (path.isAbsolute(value)) continue;

      const absSource = path.resolve(sourceDir, value);

      // Already resolved this exact file — reuse the output path
      const existing = resolvedMap.get(absSource);
      if (existing) {
        record[key] = existing;
        continue;
      }

      if (!fs.existsSync(absSource)) {
        console.warn(
          `[espcompose] Asset not found: ${value} (resolved to ${absSource})`
        );
        continue;
      }

      // Ensure assets directory exists
      fs.mkdirSync(assetsDir, { recursive: true });

      // Content-hash decorated name avoids collisions AND deduplicates
      const destName = hashedName(absSource);
      const destPath = path.join(assetsDir, destName);

      // Only copy if the hashed file isn't already on disk (multi-compile scenario)
      if (!fs.existsSync(destPath)) {
        fs.copyFileSync(absSource, destPath);
      }
      copied.push(destPath);

      // Rewrite the value to be relative from the YAML output directory
      const relPath = path.relative(outDir, destPath);
      resolvedMap.set(absSource, relPath);
      record[key] = relPath;
    } else if (typeof value === 'object' && value != null) {
      walkAndRewrite(value, sourceDir, assetsDir, outDir, copied, resolvedMap);
    }
  }
}
