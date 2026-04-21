import type {
  IRData,
  IREntry,
  IRSection,
  IRValue,
  IRHAEntity,
  IRComponent,
  IRScript,
  IRBinding,
  NodeKind,
  TreeNode,
} from './types';

let _idSeq = 0;
function uid(prefix: string): string {
  return `${prefix}_${_idSeq++}`;
}

// ── LVGL widget type registry ──────────────────────────────────────────────
// A "widget" in LVGL's ESPHome DSL is an object with exactly one entry whose
// key is one of these type names. The outer object is purely a type wrapper —
// we unwrap it and show the inner properties directly.

const LVGL_WIDGET_TYPES = new Set([
  'label', 'obj', 'button', 'btn', 'slider', 'checkbox', 'switch',
  'dropdown', 'line', 'image', 'img', 'arc', 'bar', 'spinner',
  'animimg', 'keyboard', 'textarea', 'scale', 'led', 'roller',
  'tabview', 'tab', 'tileview', 'tile', 'chart', 'table', 'qrcode',
  'lottie', 'canvas', 'page', 'spinbox',
]);

function isWidget(val: IRValue): boolean {
  if (val.kind !== 'object') return false;
  const entries = val.entries ?? [];
  return (
    entries.length === 1 &&
    LVGL_WIDGET_TYPES.has(entries[0].key) &&
    entries[0].value?.kind === 'object'
  );
}

// ── Per-IRValue builders ───────────────────────────────────────────────────
// buildIRValue: given an IRValue and its parent entry key, produce a TreeNode.
// Scalars are never tree children — they live only in the detail panel.
// We call this when we know we WANT to show the value as a tree node.

function buildIRValue(
  entryKey: string,
  val: IRValue,
  idSuffix: string,
): TreeNode {
  switch (val.kind) {
    case 'object':
      if (isWidget(val)) return buildWidget(val, idSuffix);
      return buildIRObject(entryKey, val, idSuffix);

    case 'array':
      return buildIRArray(entryKey, val, idSuffix);

    case 'ref':
      return {
        id: uid(idSuffix),
        label: entryKey,
        chip: String(val.token ?? ''),
        chipColor: 'secondary',
        nodeKind: 'iv-ref',
        data: val,
      };

    case 'reactive':
      return buildIRReactive(entryKey, val, idSuffix);

    case 'action':
      return buildIRAction(entryKey, val, idSuffix);

    default:
      // Unknown or scalar — treat as leaf
      return {
        id: uid(idSuffix),
        label: entryKey,
        chip: val.kind,
        nodeKind: 'iv-object',
        data: val,
      };
  }
}

// ── IRObject ───────────────────────────────────────────────────────────────
// Rule: do NOT add an "entries" wrapper node. Instead:
//   - Scalar + ref entries → detail panel only (preview table)
//   - Array, object, reactive, action entries → become direct tree children
//     using the entry key as the child label

function buildIRObject(label: string, val: IRValue, idSuffix: string): TreeNode {
  const children = buildObjectChildren(val.entries ?? [], idSuffix);
  return {
    id: uid(idSuffix),
    label,
    chip: children.length > 0 ? `{${(val.entries ?? []).length}}` : undefined,
    nodeKind: 'iv-object',
    data: val,
    children: children.length > 0 ? children : undefined,
  };
}

function buildObjectChildren(entries: IREntry[], idPrefix: string): TreeNode[] {
  const nodes: TreeNode[] = [];
  for (const entry of entries) {
    const v = entry.value;
    if (!v) continue;
    // Scalars and refs are preview-only. Everything else becomes a tree child.
    if (v.kind === 'scalar' || v.kind === 'ref') continue;
    nodes.push(buildIRValue(entry.key, v, `${idPrefix}_${entry.key}`));
  }
  return nodes;
}

// ── IRArray ────────────────────────────────────────────────────────────────
// Rule: items become DIRECT children. No "items" wrapper node.

function buildIRArray(label: string, val: IRValue, idSuffix: string): TreeNode {
  const items = val.items ?? [];
  const children = items.map((item, i) => buildArrayItem(item, `${idSuffix}_${i}`, i));
  return {
    id: uid(idSuffix),
    label,
    chip: `[${items.length}]`,
    chipColor: 'default',
    nodeKind: 'iv-array',
    data: val,
    children: children.length > 0 ? children : undefined,
  };
}

function buildArrayItem(item: IRValue, idSuffix: string, index: number): TreeNode {
  // Widgets get special label handling
  if (isWidget(item)) return buildWidget(item, idSuffix);

  switch (item.kind) {
    case 'object': {
      // Try to find an id/name entry for the label
      const entries = item.entries ?? [];
      const idEntry = entries.find(e => e.key === 'id' && e.value?.kind === 'scalar');
      const nameEntry = entries.find(e => e.key === 'name' && e.value?.kind === 'scalar');
      const label = String(idEntry?.value?.value ?? nameEntry?.value?.value ?? index);
      const children = buildObjectChildren(entries, idSuffix);
      return {
        id: uid(idSuffix),
        label,
        chip: `{${entries.length}}`,
        nodeKind: 'iv-object',
        data: item,
        children: children.length > 0 ? children : undefined,
      };
    }
    case 'ref':
      return {
        id: uid(idSuffix),
        label: String(index),
        chip: String(item.token ?? ''),
        chipColor: 'secondary',
        nodeKind: 'iv-ref',
        data: item,
      };
    case 'scalar':
      return {
        id: uid(idSuffix),
        label: String(index),
        chip: String(item.value ?? ''),
        nodeKind: 'iv-object',
        data: item,
      };
    case 'reactive':
      return buildIRReactive(String(index), item, idSuffix);
    default:
      return buildIRValue(String(index), item, idSuffix);
  }
}

// ── IRWidget ───────────────────────────────────────────────────────────────
// A widget is an object with exactly one entry whose key is a widget type.
// We unwrap it: the tree node IS the widget, not the wrapper.

function buildWidget(val: IRValue, idSuffix: string): TreeNode {
  const entry = (val.entries ?? [])[0];      // the single entry
  const widgetType = entry?.key ?? 'widget';
  const inner = entry?.value;               // inner object with widget properties

  const children = inner?.kind === 'object'
    ? buildObjectChildren(inner.entries ?? [], idSuffix)
    : [];

  return {
    id: uid(idSuffix),
    label: widgetType,
    chip: 'widget',
    chipColor: 'warning',
    nodeKind: 'iv-widget',
    data: { widgetType, props: inner },
    children: children.length > 0 ? children : undefined,
  };
}

// ── IRReactive ─────────────────────────────────────────────────────────────
// Reactive values are leaves in the tree — the detail panel shows the expression.

function buildIRReactive(label: string, val: IRValue, idSuffix: string): TreeNode {
  const node = val.node;
  const chip = node ? `${node.kind}/${node.exprType}` : 'reactive';
  return {
    id: uid(idSuffix),
    label,
    chip,
    chipColor: 'info',
    nodeKind: 'iv-reactive',
    data: val,
  };
}

// ── IRAction ──────────────────────────────────────────────────────────────
// An action value contains an array of action sub-nodes.

function buildIRAction(label: string, val: IRValue, idSuffix: string): TreeNode {
  const actions = val.actions ?? [];
  const children = actions.map((act, i) => {
    const a = act as Record<string, unknown>;
    const kind = typeof a.kind === 'string' ? a.kind : `action ${i}`;
    return {
      id: uid(`${idSuffix}_action_${i}`),
      label: kind,
      chip: typeof a.action === 'string' ? a.action : undefined,
      nodeKind: 'script-action' as NodeKind,
      data: act,
    };
  });
  return {
    id: uid(idSuffix),
    label,
    chip: `[${actions.length}]`,
    chipColor: 'warning',
    nodeKind: 'iv-action',
    data: val,
    children: children.length > 0 ? children : undefined,
  };
}

// ── Top-level builder ──────────────────────────────────────────────────────

/**
 * Build the viewer tree from serialized IR data.
 * Uses the `kind` discriminant on each container to validate the data shape
 * and route to the correct builder.
 */
export function buildTree(data: IRData, showInternal = false): TreeNode[] {
  _idSeq = 0;
  void showInternal;

  // Validate top-level discriminant
  if (data.kind !== 'semantic_ir') {
    console.warn(`[ir-viewer] Expected kind 'semantic_ir', got '${data.kind}'`);
  }

  const roots: TreeNode[] = [];
  if (data.esphome)    roots.push(buildEsphome(data.esphome));
  if (data.espcompose) roots.push(buildEspcompose(data.espcompose));
  return roots;
}

// ── esphome subtree ────────────────────────────────────────────────────────

function buildEsphome(esphome: IRData['esphome']): TreeNode {
  const children: TreeNode[] = [];

  if (esphome.sections?.length) {
    children.push({
      id: uid('sections'),
      label: 'sections',
      chip: String(esphome.sections.length),
      nodeKind: 'group',
      data: esphome.sections,
      children: esphome.sections.map(buildSection),
    });
  }
  if (esphome.haEntities?.length) {
    children.push({
      id: uid('haEntities'),
      label: 'haEntities',
      chip: String(esphome.haEntities.length),
      nodeKind: 'group',
      data: esphome.haEntities,
      children: esphome.haEntities.map(buildHAEntity),
    });
  }
  if (esphome.components?.length) {
    children.push({
      id: uid('components'),
      label: 'components',
      chip: String(esphome.components.length),
      nodeKind: 'group',
      data: esphome.components,
      children: esphome.components.map(buildComponent),
    });
  }
  if (esphome.scripts?.length) {
    children.push({
      id: uid('scripts'),
      label: 'scripts',
      chip: String(esphome.scripts.length),
      nodeKind: 'group',
      data: esphome.scripts,
      children: esphome.scripts.map(buildScript),
    });
  }

  return { id: uid('esphome'), label: 'esphome', nodeKind: 'root', data: esphome, children };
}

// Each section's VALUE is an IRValue (usually `kind:"object"`).
// We inline the object's complex entries as direct children of the section node.
// Simple entries (scalar, ref) go to the detail panel only.

function buildSection(section: IRSection): TreeNode {
  const val = section.value;
  let children: TreeNode[] | undefined;

  if (val.kind === 'object') {
    const complex = buildObjectChildren(val.entries ?? [], `section_${section.key}`);
    children = complex.length > 0 ? complex : undefined;
  } else if (val.kind === 'array') {
    const items = val.items ?? [];
    const built = items.map((item, i) => buildArrayItem(item, `section_${section.key}_${i}`, i));
    children = built.length > 0 ? built : undefined;
  }

  return {
    id: uid(`section_${section.key}`),
    label: section.key,
    chip: val.kind,
    chipColor: 'primary',
    nodeKind: 'section',
    data: section,
    children,
  };
}

function buildHAEntity(entity: IRHAEntity): TreeNode {
  return {
    id: uid(`entity_${entity.generatedId}`),
    label: entity.entityId,
    chip: entity.sensorType,
    chipColor: 'success',
    nodeKind: 'ha-entity',
    data: entity,
  };
}

function buildComponent(comp: IRComponent): TreeNode {
  return {
    id: uid(`comp_${comp.id}`),
    label: comp.id,
    chip: comp.section,
    chipColor: 'info',
    nodeKind: 'component',
    data: comp,
  };
}

function buildScript(script: IRScript): TreeNode {
  const children = script.then.map((action, i) => {
    const a = action as Record<string, unknown>;
    const kind = typeof a.kind === 'string' ? a.kind : `action ${i}`;
    return {
      id: uid(`script_${script.id}_action_${i}`),
      label: kind,
      nodeKind: 'script-action' as NodeKind,
      data: action,
    };
  });
  return {
    id: uid(`script_${script.id}`),
    label: script.id,
    chip: `${script.then.length} actions`,
    chipColor: 'warning',
    nodeKind: 'script',
    data: script,
    children: children.length > 0 ? children : undefined,
  };
}

// ── espcompose subtree ─────────────────────────────────────────────────────

function buildEspcompose(espcompose: IRData['espcompose']): TreeNode {
  const children: TreeNode[] = [];

  const { reactive } = espcompose;
  if (reactive) {
    const reactiveChildren: TreeNode[] = [];

    if (reactive.bindings?.length) {
      reactiveChildren.push({
        id: uid('bindings'),
        label: 'bindings',
        chip: String(reactive.bindings.length),
        nodeKind: 'group',
        data: reactive.bindings,
        children: reactive.bindings.map((b, i) => buildBinding(b, i)),
      });
    }
    if (reactive.memos?.length) {
      reactiveChildren.push({
        id: uid('memos'),
        label: 'memos',
        chip: String(reactive.memos.length),
        nodeKind: 'group',
        data: reactive.memos,
        children: reactive.memos.map((m, i) => buildIRReactiveNode(m, i, 'memo')),
      });
    }
    if (reactive.effects?.length) {
      reactiveChildren.push({
        id: uid('effects'),
        label: 'effects',
        chip: String(reactive.effects.length),
        nodeKind: 'group',
        data: reactive.effects,
        children: reactive.effects.map((e, i) => buildIRReactiveNode(e, i, 'effect')),
      });
    }

    children.push({
      id: uid('reactive'),
      label: 'reactive',
      nodeKind: 'group',
      data: reactive,
      children: reactiveChildren,
    });
  }

  if (espcompose.themeScopes && espcompose.themeScopes.length > 0) {
    const scopeChildren = espcompose.themeScopes.map((scope) => {
      const leafTokens = Object.entries(scope.leafData);
      return {
        id: uid(`scope_${scope.scopeId}`),
        label: `${scope.scope}`,
        chip: `${scope.themeNames.length} theme${scope.themeNames.length !== 1 ? 's' : ''}`,
        chipColor: 'secondary' as const,
        nodeKind: 'theme-group' as NodeKind,
        data: scope,
        children: leafTokens.map(([token, val]) => ({
          id: uid(`leaf_${scope.scopeId}_${token}`),
          label: token,
          chip: val.valueType,
          nodeKind: 'theme-leaf' as NodeKind,
          data: { token, ...val },
        })),
      };
    });
    children.push({
      id: uid('themes'),
      label: 'themes',
      chip: `${espcompose.themeScopes.length} scope${espcompose.themeScopes.length !== 1 ? 's' : ''}`,
      chipColor: 'secondary',
      nodeKind: 'group',
      data: espcompose.themeScopes,
      children: scopeChildren,
    });
  }

  return { id: uid('espcompose'), label: 'espcompose', nodeKind: 'root', data: espcompose, children };
}

function buildBinding(binding: IRBinding, i: number): TreeNode {
  const parts = [binding.targetId, binding.targetProp];
  if (binding.part)  parts.push(binding.part);
  if (binding.state) parts.push(binding.state);
  return {
    id: uid(`binding_${i}`),
    label: parts.join('.'),
    chip: binding.targetType,
    chipColor: 'info',
    nodeKind: 'binding',
    data: binding,
  };
}

function buildIRReactiveNode(node: unknown, i: number, type: 'memo' | 'effect'): TreeNode {
  const obj = typeof node === 'object' && node !== null && !Array.isArray(node)
    ? (node as Record<string, unknown>)
    : null;
  const label = obj && typeof obj.nodeId === 'string' ? obj.nodeId : `${type} ${i}`;
  const exprType = obj && typeof obj.exprType === 'string' ? obj.exprType : '';
  return {
    id: uid(`${type}_${i}`),
    label,
    chip: exprType || type,
    chipColor: 'info',
    nodeKind: 'reactive-node',
    data: node,
  };
}
