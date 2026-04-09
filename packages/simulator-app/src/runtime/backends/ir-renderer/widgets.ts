import type { IRValue, IRObject, IRAction, IRRef, IRActionNode } from '@espcompose/core/internals';
import type { RuntimeNode, RuntimeProp } from '../../types';
import type { IRRenderContext } from './lowering-context.js';
import { irValueToRuntimeProp, irValueToPlain } from './props.js';
import { irActionToRuntimeProp, interpretActionSteps, executeActionStep } from './actions.js';

function isActionPropKey(key: string): boolean {
  return key.startsWith('on_');
}

/**
 * Convert an IR widget object to a RuntimeNode.
 *
 * The IR widget shape is: { id: "rw_xxx", text: <IRValue>, x: 10, widgets: [...] }
 */
function irWidgetObjectToRuntimeNode(
  widgetType: string,
  obj: IRObject,
  ctx: IRRenderContext,
): RuntimeNode {
  const id = findScalarEntry(obj, 'id')
    ?? `sim_${widgetType}_${ctx.nodeCounter++}`;

  const props: Record<string, RuntimeProp> = {};
  const childNodes: RuntimeNode[] = [];

  for (const entry of obj.entries) {
    const key = entry.key;

    // Skip the id prop (tracked separately)
    if (key === 'id') continue;

    // Nested widgets array
    if (key === 'widgets') {
      if (entry.value.kind === 'array') {
        childNodes.push(...irWidgetsArrayToRuntimeNodes(entry.value.items, ctx));
      }
      continue;
    }

    // Action/trigger props
    if (isActionPropKey(key) && entry.value.kind === 'action') {
      props[key] = irActionToRuntimeProp(entry.value as IRAction, ctx);
      continue;
    }
    // Action props that are arrays (compiled action lists)
    if (isActionPropKey(key) && entry.value.kind === 'array') {
      const actionItems = entry.value.items.map(irValueToPlain) as IRActionNode[];
      const steps = interpretActionSteps(actionItems);
      props[key] = {
        kind: 'action',
        handler: async () => {
          for (const step of steps) await executeActionStep(step, ctx);
        },
        meta: steps,
      };
      continue;
    }

    // Special handling for text_font refs — resolve ref token to CSS font string
    if (key === 'text_font' && entry.value.kind === 'ref') {
      const refToken = (entry.value as IRRef).token;
      const cssFont = ctx.fontMap.get(refToken);
      if (cssFont) {
        props[key] = { kind: 'static', value: cssFont };
        continue;
      }
    }

    // Special handling for image 'src' prop — resolve ref token to file path
    if (widgetType === 'image' && key === 'src') {
      let srcToken: string | undefined;
      if (entry.value.kind === 'ref') {
        srcToken = (entry.value as IRRef).token;
      } else if (entry.value.kind === 'scalar' && typeof entry.value.value === 'string') {
        srcToken = entry.value.value;
      }
      if (srcToken) {
        const imageEntry = ctx.imageMap.get(srcToken);
        if (imageEntry) {
          // Strip leading ./ and prefix with /__project__/ so the dev server
          // resolves the file relative to the project directory
          const cleaned = imageEntry.file.replace(/^\.\//, '');
          const browserPath = `/__project__/${cleaned}`;
          props[key] = { kind: 'static', value: browserPath };

          // Apply resize dimensions if specified and no explicit width/height set
          if (imageEntry.resize) {
            const match = imageEntry.resize.match(/^(\d+)x(\d+)$/);
            if (match) {
              if (!props.width) props.width = { kind: 'static', value: Number(match[1]) };
              if (!props.height) props.height = { kind: 'static', value: Number(match[2]) };
            }
          }
          continue;
        }
      }
    }

    // Regular props
    props[key] = irValueToRuntimeProp(key, entry.value, ctx);
  }

  return { id, type: widgetType, props, children: childNodes };
}

/**
 * Find a scalar string value for a given key in an IR object.
 */
function findScalarEntry(obj: IRObject, key: string): string | undefined {
  const entry = obj.entries.find(e => e.key === key);
  if (entry && entry.value.kind === 'scalar' && typeof entry.value.value === 'string') {
    return entry.value.value;
  }
  return undefined;
}

/**
 * Convert a widgets array (IR) to RuntimeNode[].
 *
 * Each item in the array is an object with one key (the widget type)
 * whose value is the widget's props object:
 *   [{ label: { text: "Hello", id: "lbl1" } }, { button: { ... } }]
 */
function irWidgetsArrayToRuntimeNodes(
  items: IRValue[],
  ctx: IRRenderContext,
): RuntimeNode[] {
  const nodes: RuntimeNode[] = [];

  for (const item of items) {
    if (item.kind !== 'object') continue;

    // Each widget item has one key = widget type
    for (const entry of (item as IRObject).entries) {
      if (entry.value.kind === 'object') {
        nodes.push(irWidgetObjectToRuntimeNode(entry.key, entry.value as IRObject, ctx));
      }
    }
  }

  return nodes;
}

/**
 * Build RuntimeNode[] from the LVGL section in the IR.
 *
 * LVGL section structure:
 *   lvgl: { displays: [...], pages: [{ widgets: [...] }, ...] }
 *
 * Also populates ctx.pageCount and ctx.skipPages so the page navigator
 * and Canvas know which pages exist and which are excluded from cycling.
 */
export function buildLvglNodesFromIR(lvglValue: IRValue, ctx: IRRenderContext): RuntimeNode[] {
  if (lvglValue.kind !== 'object') return [];

  const lvglObj = lvglValue as IRObject;
  const pagesEntry = lvglObj.entries.find(e => e.key === 'pages');
  if (!pagesEntry || pagesEntry.value.kind !== 'array') return [];

  const nodes: RuntimeNode[] = [];
  let pageIndex = 0;

  for (const page of pagesEntry.value.items) {
    if (page.kind !== 'object') continue;
    const pageObj = page as IRObject;

    const id = findScalarEntry(pageObj, 'id') ?? `sim_page_${ctx.nodeCounter++}`;
    const pageProps: Record<string, RuntimeProp> = {};
    const pageChildren: RuntimeNode[] = [];

    // Check for skip flag
    const skipEntry = pageObj.entries.find(e => e.key === 'skip');
    if (skipEntry && skipEntry.value.kind === 'scalar' && skipEntry.value.value === true) {
      ctx.skipPages.add(pageIndex);
    }

    for (const entry of pageObj.entries) {
      if (entry.key === 'id') continue;
      if (entry.key === 'widgets' && entry.value.kind === 'array') {
        pageChildren.push(...irWidgetsArrayToRuntimeNodes(entry.value.items, ctx));
        continue;
      }
      pageProps[entry.key] = irValueToRuntimeProp(entry.key, entry.value, ctx);
    }

    // Embed the page index so Canvas can control visibility
    pageProps['__pageIndex'] = { kind: 'static', value: pageIndex };

    nodes.push({ id, type: 'page', props: pageProps, children: pageChildren });
    pageIndex++;
  }

  ctx.pageCount = pageIndex;

  return nodes;
}
