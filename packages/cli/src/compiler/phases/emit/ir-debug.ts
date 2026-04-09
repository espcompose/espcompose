// ────────────────────────────────────────────────────────────────────────────
// IR Debug — Serialize SemanticIR to JSON and deploy the pre-built viewer.
//
// When --debug is passed to the CLI, the compiler writes:
//   .espcompose-build/ir-debug.json  — raw JSON (for external tooling)
//   .espcompose-build/ir-debug.html  — self-contained viewer (all assets + data inlined)
//
// vite-plugin-singlefile produces a single index.html with all JS/CSS inline.
// The CLI injects `window.__IR_DATA = {...}` so the viewer never needs fetch(),
// making it safe to open directly via file:// with no CORS issues.
// ────────────────────────────────────────────────────────────────────────────

import * as fs from 'fs';
import * as path from 'path';
import type { SemanticIR } from '@espcompose/core/internals';

// ────────────────────────────────────────────────────────────────────────────
// Serialization
// ────────────────────────────────────────────────────────────────────────────

/**
 * Produce a JSON-safe plain object from a SemanticIR.
 *
 * Handles:
 *   - IRReactiveNode class-instance fields → spread to plain object. Prototype
 *     members (valueOf, toString, isSingleSource) are not own enumerable props
 *     so they are dropped automatically. `__`-prefixed fields (e.g.
 *     __reactive_node__) are preserved in the JSON; the viewer hides them by
 *     default and exposes a toggle to show them.
 *   - IRThemeData.leafData    → Map converted to a plain object
 *   - IRBinding.expression → sanitized IRReactiveNode
 *
 * Everything else (IRValue tree, IRExprNode ASTs, scalars) passes through.
 */
export function serializeIR(ir: SemanticIR): Record<string, unknown> {
  return {
    kind: ir.kind,
    esphome: {
      kind: ir.esphome.kind,
      sections: ir.esphome.sections,
      haEntities: ir.esphome.haEntities,
      components: ir.esphome.components,
      scripts: ir.esphome.scripts,
    },
    espcompose: {
      kind: ir.espcompose.kind,
      reactive: {
        kind: ir.espcompose.reactive.kind,
        bindings: ir.espcompose.reactive.bindings.map(b => ({
          ...b,
          expression: sanitizeIRReactiveNode(b.expression),
        })),
        memos: ir.espcompose.reactive.memos.map(sanitizeIRReactiveNode),
        effects: ir.espcompose.reactive.effects.map(sanitizeIRReactiveNode),
      },
      themes: ir.espcompose.themes
        ? {
            kind: ir.espcompose.themes.kind,
            themeNames: ir.espcompose.themes.themeNames,
            defaultIndex: ir.espcompose.themes.defaultIndex,
            leafData: Object.fromEntries(ir.espcompose.themes.leafData),
          }
        : undefined,
    },
  };
}

/**
 * Convert a IRReactiveNode class instance to a plain object.
 *
 * Spreading own enumerable properties drops prototype members (valueOf,
 * toString, isSingleSource) automatically. `__`-prefixed brand fields are
 * intentionally kept — the viewer filters them at render time.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function sanitizeIRReactiveNode(node: any): Record<string, unknown> {
  return { ...(node as Record<string, unknown>) };
}

/**
 * JSON.stringify replacer that detects true circular references.
 *
 * Uses an ancestor stack so that shared references (the same object
 * reachable from multiple paths) are serialized fully each time.
 * Only objects forming an actual cycle in the current path are
 * replaced with '[circular]'.
 */
function circularReplacer() {
  const ancestors: object[] = [];
  return function (this: unknown, _key: string, value: unknown) {
    if (typeof value === 'function') return undefined;
    if (typeof value !== 'object' || value === null) return value;

    // Pop ancestors until we find our parent (this === the object that owns _key)
    while (ancestors.length > 0 && ancestors[ancestors.length - 1] !== this) {
      ancestors.pop();
    }
    if (ancestors.includes(value)) return '[circular]';
    ancestors.push(value);
    return value;
  };
}

// ────────────────────────────────────────────────────────────────────────────
// File writing
// ────────────────────────────────────────────────────────────────────────────

/**
 * Write ir-debug.json and ir-debug.html to buildDir.
 * Returns the absolute path to ir-debug.html.
 *
 * ir-debug.html is a fully self-contained file: the pre-built viewer
 * (all JS/CSS inlined via vite-plugin-singlefile) with the IR data
 * injected as `window.__IR_DATA = {...}` — no fetch() needed at runtime,
 * so it opens cleanly via file://.
 */
export function writeIRDebugFiles(ir: SemanticIR, buildDir: string): string {
  const serialized = serializeIR(ir);
  const json = JSON.stringify(serialized, circularReplacer(), 2);

  fs.mkdirSync(buildDir, { recursive: true });

  // Write the raw JSON alongside for external tooling.
  fs.writeFileSync(path.join(buildDir, 'ir-debug.json'), json, 'utf8');

  const htmlPath = path.join(buildDir, 'ir-debug.html');
  fs.writeFileSync(htmlPath, generateHTML(json), 'utf8');

  return htmlPath;
}

// ────────────────────────────────────────────────────────────────────────────
// HTML viewer generation
// ────────────────────────────────────────────────────────────────────────────

function generateHTML(irJson: string): string {
  // Locate the pre-built single-file viewer HTML. In the compiled bundle
  // __dirname is dist/ (one level from package root); under vitest it is
  // src/compiler/phases/emit/ (four levels from package root). Try production path first.
  const prodPath = path.resolve(__dirname, '..', 'assets', 'ir-viewer', 'index.html');
  const devPath  = path.resolve(__dirname, '..', '..', '..', '..', 'assets', 'ir-viewer', 'index.html');
  const templatePath = fs.existsSync(prodPath) ? prodPath : devPath;
  const template = fs.readFileSync(templatePath, 'utf8');

  // Escape </script> and <!-- in the JSON to prevent tag injection.
  const safeJson = irJson
    .replace(/<\/script/gi, '<\\/script')
    .replace(/<!--/g, '<\\!--');

  // Inject window.__IR_DATA before </body> so it is available synchronously
  // when the inlined React bundle executes.
  const injection = `<script>window.__IR_DATA = ${safeJson};</script>`;
  return template.replace('</body>', `${injection}\n</body>`);
}
