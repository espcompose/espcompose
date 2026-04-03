// ────────────────────────────────────────────────────────────────────────────
// IR Debug — Serialize SemanticIR to JSON and generate an interactive HTML viewer.
//
// When --debug is passed to the CLI, the compiler writes:
//   .espcompose-build/ir-debug.json  — raw JSON representation
//   .espcompose-build/ir-debug.html  — self-contained interactive tree viewer
// ────────────────────────────────────────────────────────────────────────────

import * as fs from 'fs';
import * as path from 'path';
import Handlebars from 'handlebars';
import type { SemanticIR } from '@esphome/compose/internals';

// ────────────────────────────────────────────────────────────────────────────
// Serialization
// ────────────────────────────────────────────────────────────────────────────

/**
 * Produce a JSON-safe plain object from a SemanticIR.
 *
 * Handles:
 *   - ReactiveNode class-instance fields → stripped (valueOf, toString, isSingleSource, __reactive_node__)
 *   - IRThemeData.leafData    → Map converted to a plain object
 *   - ReactiveBinding.expression → sanitized ReactiveNode
 *
 * Everything else (IRValue tree, ExprNode ASTs, scalars) passes through.
 */
export function serializeIR(ir: SemanticIR): Record<string, unknown> {
  return {
    esphome: {
      sections: ir.esphome.sections,
      haEntities: ir.esphome.haEntities,
      components: ir.esphome.components,
      scripts: ir.esphome.scripts,
    },
    espcompose: {
      reactive: {
        bindings: ir.espcompose.reactive.bindings.map(b => ({
          ...b,
          expression: sanitizeReactiveNode(b.expression),
        })),
        memos: ir.espcompose.reactive.memos.map(sanitizeReactiveNode),
        effects: ir.espcompose.reactive.effects.map(sanitizeReactiveNode),
      },
      themes: ir.espcompose.themes
        ? {
            themeNames: ir.espcompose.themes.themeNames,
            defaultIndex: ir.espcompose.themes.defaultIndex,
            leafData: Object.fromEntries(ir.espcompose.themes.leafData),
          }
        : undefined,
    },
  };
}

/** Strip non-serializable class-instance fields from a ReactiveNode. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function sanitizeReactiveNode(node: any): Record<string, unknown> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { valueOf, toString, isSingleSource, __reactive_node__, ...rest } = node as Record<string, unknown>;
  return rest;
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
 * Write ir-debug.json and ir-debug.html to the build directory.
 * Returns the absolute path to the HTML file.
 */
export function writeIRDebugFiles(ir: SemanticIR, buildDir: string): string {
  const serialized = serializeIR(ir);
  const json = JSON.stringify(serialized, circularReplacer(), 2);

  fs.mkdirSync(buildDir, { recursive: true });
  fs.writeFileSync(path.join(buildDir, 'ir-debug.json'), json, 'utf8');

  const htmlPath = path.join(buildDir, 'ir-debug.html');
  fs.writeFileSync(htmlPath, generateHTML(json), 'utf8');

  return htmlPath;
}

// ────────────────────────────────────────────────────────────────────────────
// HTML viewer generation
// ────────────────────────────────────────────────────────────────────────────

function generateHTML(irJson: string): string {
  // The JSON is embedded as a JS variable. We escape </script> to prevent
  // premature tag closure, and escape <!-- to prevent comment injection.
  const safeJson = irJson
    .replace(/<\/script/gi, '<\\/script')
    .replace(/<!--/g, '<\\!--');

  // Locate templates relative to the package root. The compiled bundle places
  // this file in dist/ (one level up from templates/), while vitest runs it
  // from src/compiler/ (two levels up). Try both.
  const distPath = path.resolve(__dirname, '..', 'templates', 'ir-debug');
  const srcPath = path.resolve(__dirname, '..', '..', 'templates', 'ir-debug');
  const templateDir = fs.existsSync(distPath) ? distPath : srcPath;
  const css = fs.readFileSync(path.join(templateDir, 'ir-debug.css'), 'utf8');
  const js = fs.readFileSync(path.join(templateDir, 'ir-debug.js'), 'utf8');
  const htmlTemplate = fs.readFileSync(path.join(templateDir, 'ir-debug.html.hbs'), 'utf8');

  return Handlebars.compile(htmlTemplate, { noEscape: true })({ css, js, data: safeJson });
}

