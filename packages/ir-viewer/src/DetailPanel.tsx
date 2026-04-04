import React, { useRef, useEffect, useState } from 'react';
import { Box, Chip, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import Tree from 'react-d3-tree';
import type { RawNodeDatum, RenderCustomNodeElementFn } from 'react-d3-tree';
import type { IREntry, IRValue, IRReactiveNode, IRExprNode, IRThemeData, TreeNode } from './types';

// ── Shared primitives ──────────────────────────────────────────────────────

interface PropRow { key: string; value: unknown; color?: string }

function cellColor(v: unknown): string {
  if (v === null || v === undefined) return '#585b70';
  if (typeof v === 'boolean') return '#f38ba8';
  if (typeof v === 'number')  return '#fab387';
  return '#a6e3a1';
}

function PropTable({ rows }: { rows: PropRow[] }) {
  if (rows.length === 0) return null;
  return (
    <Table size="small" sx={{ tableLayout: 'fixed' }}>
      <TableBody>
        {rows.map(({ key, value, color }) => (
          <TableRow key={key} hover sx={{ '&:last-child td': { borderBottom: 0 } }}>
            <TableCell sx={{ width: '42%', fontFamily: 'monospace', fontSize: '0.78rem', color: '#89b4fa', py: 0.5, borderColor: 'divider' }}>
              {key}
            </TableCell>
            <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.78rem', wordBreak: 'break-all', py: 0.5, borderColor: 'divider', color: color ?? cellColor(value) }}>
              {value === null || value === undefined ? 'null' : String(value)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

// ── IRValue entry extractor ────────────────────────────────────────────────

function entriesToRows(entries: IREntry[]): PropRow[] {
  const rows: PropRow[] = [];
  for (const { key, value: v } of entries) {
    if (v.kind === 'scalar') {
      rows.push({ key, value: v.value });
    } else if (v.kind === 'ref') {
      rows.push({ key, value: v.token, color: '#cba6f7' });
    }
  }
  return rows;
}

function complexCount(entries: IREntry[]): number {
  return entries.filter(e => e.value.kind !== 'scalar' && e.value.kind !== 'ref').length;
}

// ── Expression tree viewer ────────────────────────────────────────────────

function exprKindColor(kind: string): string {
  switch (kind) {
    case 'ternary':      return '#f9e2af';
    case 'binary':       return '#fab387';
    case 'call':         return '#89b4fa';
    case 'theme_read':
    case 'theme_select': return '#f5c2e7';
    case 'entity_prop':  return '#a6e3a1';
    case 'literal':      return '#cba6f7';
    case 'trigger_var':  return '#74c7ec';
    case 'resolve_font': return '#89dceb';
    case 'ha_service':   return '#eba0ac';
    default:             return '#cdd6f4';
  }
}

function exprScalarFields(expr: IRExprNode): [string, string][] {
  return Object.entries(expr)
    .filter(([k, v]) => k !== 'kind' && (v === null || typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean'))
    .map(([k, v]) => [k, v === null ? 'null' : String(v)]);
}

function exprChildEntries(expr: IRExprNode): [string, IRExprNode][] {
  const out: [string, IRExprNode][] = [];
  for (const [key, val] of Object.entries(expr)) {
    if (key === 'kind') continue;
    if (val && typeof val === 'object' && !Array.isArray(val) && typeof (val as IRExprNode).kind === 'string') {
      out.push([key, val as IRExprNode]);
    } else if (Array.isArray(val)) {
      (val as unknown[]).forEach((item, i) => {
        if (item && typeof item === 'object' && typeof (item as IRExprNode).kind === 'string') {
          out.push([`${key}[${i}]`, item as IRExprNode]);
        }
      });
    }
  }
  return out;
}

// ── IRExprNode → RawNodeDatum converter ─────────────────────────────────────

function exprToD3(expr: IRExprNode, edgeLabel?: string): RawNodeDatum {
  const scalars = exprScalarFields(expr);
  const childExprs = exprChildEntries(expr);
  const attributes: Record<string, string> = {};
  for (const [k, v] of scalars) {
    attributes[k] = v.length > 26 ? v.slice(0, 25) + '\u2026' : v;
  }
  return {
    name: edgeLabel ? `${edgeLabel}: ${expr.kind}` : expr.kind,
    attributes,
    children: childExprs.length > 0
      ? childExprs.map(([key, child]) => exprToD3(child, key))
      : undefined,
  };
}

// ── Custom SVG node renderer ───────────────────────────────────────────────

function renderIRExprNode({ nodeDatum }: Parameters<RenderCustomNodeElementFn>[0]) {
  const raw = nodeDatum.name;
  const colonIdx = raw.indexOf(': ');
  const edgeLabel = colonIdx >= 0 ? raw.slice(0, colonIdx) : undefined;
  const kind = colonIdx >= 0 ? raw.slice(colonIdx + 2) : raw;
  const color = exprKindColor(kind);
  const attrs = Object.entries(nodeDatum.attributes ?? {}).filter(([, v]) => v !== '');

  const BOX_W = 190;
  const ROW_H = 17;
  const boxH = (edgeLabel ? 15 : 0) + 30 + attrs.length * ROW_H + 10;

  return (
    <foreignObject x={-BOX_W / 2} y={-boxH / 2} width={BOX_W} height={boxH}>
      <div style={{
        width: BOX_W + 'px',
        height: boxH + 'px',
        background: '#1e1e2e',
        border: `1.5px solid ${color}`,
        borderTop: `3px solid ${color}`,
        borderRadius: '6px',
        padding: '5px 9px 6px',
        fontFamily: 'ui-monospace, "Cascadia Code", Menlo, Consolas, monospace',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}>
        {edgeLabel && (
          <div style={{ color: '#9399b2', fontSize: '9px', lineHeight: '1.4', marginBottom: '2px' }}>
            {edgeLabel}
          </div>
        )}
        <div style={{ color, fontWeight: 'bold', fontSize: '13px', lineHeight: '1.4', marginBottom: attrs.length > 0 ? '3px' : 0 }}>
          {kind}
        </div>
        {attrs.map(([k, v]) => (
          <div key={k} style={{ fontSize: '10px', lineHeight: '1.6', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            <span style={{ color: '#89b4fa' }}>{k}</span>
            <span style={{ color: '#585b70' }}>: </span>
            <span style={{ color: '#a6e3a1' }}>{String(v)}</span>
          </div>
        ))}
      </div>
    </foreignObject>
  );
}

// ── ExprTreeD3 — react-d3-tree expression viewer ──────────────────────────

function ExprTreeD3({ expr }: { expr: IRExprNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;
      setDims({ width, height });
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const d3Data = exprToD3(expr);
  const translate = { x: 90, y: dims ? dims.height / 2 : 120 };

  return (
    <Box
      ref={containerRef}
      sx={{
        width: '100%', height: '100%', minHeight: 200,
        position: 'relative',
        bgcolor: '#11111b',
        borderRadius: 1,
        overflow: 'hidden',
        // colour the connector paths (react-d3-tree default class)
        '& .rd3t-link': { stroke: '#6c7086 !important', strokeWidth: '1.5px !important' },
      }}
    >
      {dims && (
        <Tree
          data={d3Data}
          orientation="horizontal"
          translate={translate}
          dimensions={dims}
          renderCustomNodeElement={renderIRExprNode}
          nodeSize={{ x: 240, y: 100 }}
          separation={{ siblings: 1, nonSiblings: 1.3 }}
          pathFunc="step"
          zoom={0.85}
          collapsible={false}
        />
      )}
    </Box>
  );
}

function ReactiveDetails({ rn }: { rn: IRReactiveNode }) {
  const deps = rn.dependencies ?? [];
  const uniqueSources = [...new Set(deps.map(d => d.sourceId))];
  const rows: PropRow[] = [
    { key: 'kind',     value: rn.kind },
    { key: 'nodeId',   value: rn.nodeId },
    { key: 'exprType', value: rn.exprType },
  ];
  if (uniqueSources.length > 0) {
    rows.push({ key: 'sources', value: uniqueSources.join(', '), color: '#f5c2e7' });
  }
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
      <PropTable rows={rows} />
      {rn.exprIR && (
        <>
          <Box sx={{ px: 2, pt: 1.5, pb: 0.25 }}>
            <Typography variant="caption" color="text.secondary"
              sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', fontSize: '0.62rem' }}>
              expression
            </Typography>
          </Box>
          <Box sx={{ px: 2, pt: 0.5, pb: 1.5, flex: 1, display: 'flex', flexDirection: 'column' }}>
            <ExprTreeD3 expr={rn.exprIR} />
          </Box>
        </>
      )}
    </Box>
  );
}

function EmptyHint({ children }: { children: string }) {
  return (
    <Box sx={{ px: 2, py: 1.5 }}>
      <Typography variant="caption" color="text.disabled" sx={{ fontStyle: 'italic' }}>{children}</Typography>
    </Box>
  );
}

// ── SectionHeader ─────────────────────────────────────────────────────────

function SectionHeader({
  label, chip, chipColor,
}: {
  label: string;
  chip?: string;
  chipColor?: TreeNode['chipColor'];
}) {
  return (
    <Box
      sx={{
        px: 2, py: 1,
        borderBottom: '1px solid', borderColor: 'divider',
        flexShrink: 0,
        display: 'flex', alignItems: 'center', gap: 1, minHeight: 36,
      }}
    >
      <Typography variant="subtitle2" sx={{ fontFamily: 'monospace', fontWeight: 700, lineHeight: 1.3 }}>
        {label}
      </Typography>
      {chip && (
        <Chip
          size="small" label={chip} color={chipColor ?? 'default'}
          sx={{ height: 18, fontSize: '0.65rem', '& .MuiChip-label': { px: '6px' } }}
        />
      )}
    </Box>
  );
}

// ── SubHeader — secondary section title within a card ─────────────────────

function SubHeader({ children }: { children: string }) {
  return (
    <Box sx={{ px: 2, pt: 1.5, pb: 0.25 }}>
      <Typography variant="caption" color="text.secondary"
        sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', fontSize: '0.62rem' }}>
        {children}
      </Typography>
    </Box>
  );
}

// ── IR-kind cards ──────────────────────────────────────────────────────────

function SectionCard({ node }: { node: TreeNode }) {
  const section = node.data as { key: string; value: IRValue };
  const val = section.value;
  const rows = val?.kind === 'object' ? entriesToRows(val.entries ?? []) : [];
  const nested = val?.kind === 'object' ? complexCount(val.entries ?? []) : 0;
  const isArray = val?.kind === 'array';
  return (
    <>
      <SectionHeader label={section.key} chip={val?.kind} chipColor="primary" />
      {rows.length > 0 && <PropTable rows={rows} />}
      {rows.length === 0 && !isArray && <EmptyHint>No scalar properties.</EmptyHint>}
      {isArray && (
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="body2" color="text.secondary">
            {(val.items ?? []).length} item{(val.items ?? []).length !== 1 ? 's' : ''} — expand in tree
          </Typography>
        </Box>
      )}
      {nested > 0 && (
        <Box sx={{ px: 2, py: 0.5 }}>
          <Typography variant="caption" color="text.disabled">
            {nested} nested value{nested !== 1 ? 's' : ''} — expand in tree
          </Typography>
        </Box>
      )}
    </>
  );
}

function IRObjectCard({ node }: { node: TreeNode }) {
  const val = node.data as IRValue;
  const entries = val.entries ?? [];
  const rows = entriesToRows(entries);
  const nested = complexCount(entries);
  return (
    <>
      <SectionHeader label={node.label} chip={node.chip} chipColor={node.chipColor} />
      {rows.length > 0 ? <PropTable rows={rows} /> : <EmptyHint>No scalar properties.</EmptyHint>}
      {nested > 0 && (
        <Box sx={{ px: 2, py: 0.5 }}>
          <Typography variant="caption" color="text.disabled">
            {nested} nested value{nested !== 1 ? 's' : ''} — expand in tree
          </Typography>
        </Box>
      )}
    </>
  );
}

function IRArrayCard({ node }: { node: TreeNode }) {
  const val = node.data as IRValue;
  const items = val.items ?? [];
  const kindCounts: Record<string, number> = {};
  for (const it of items) kindCounts[it.kind] = (kindCounts[it.kind] ?? 0) + 1;
  const summary = Object.entries(kindCounts).map(([k, n]) => `${n}× ${k}`).join(', ');
  return (
    <>
      <SectionHeader label={node.label} chip={`[${items.length}]`} chipColor="default" />
      <Box sx={{ px: 2, pt: 1.5, pb: 1 }}>
        {summary && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>{summary}</Typography>
        )}
        {items.length > 0 && (
          <Typography variant="caption" color="text.disabled">Expand in tree to browse items.</Typography>
        )}
      </Box>
    </>
  );
}

function IRWidgetCard({ node }: { node: TreeNode }) {
  const { widgetType, props } = node.data as { widgetType: string; props?: IRValue };
  const entries = props?.entries ?? [];
  const rows = entriesToRows(entries);
  const nested = complexCount(entries);
  return (
    <>
      <SectionHeader label={widgetType} chip="widget" chipColor="warning" />
      {rows.length > 0 ? <PropTable rows={rows} /> : <EmptyHint>No scalar properties.</EmptyHint>}
      {nested > 0 && (
        <Box sx={{ px: 2, py: 0.5 }}>
          <Typography variant="caption" color="text.disabled">
            {nested} nested value{nested !== 1 ? 's' : ''} — expand in tree
          </Typography>
        </Box>
      )}
    </>
  );
}

function IRRefCard({ node }: { node: TreeNode }) {
  const val = node.data as IRValue;
  return (
    <>
      <SectionHeader label={node.label} chip="ref" chipColor="secondary" />
      <Box sx={{ px: 2, py: 1.5 }}>
        <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.85rem', color: '#cba6f7' }}>
          {String(val.token ?? '—')}
        </Typography>
      </Box>
    </>
  );
}

function IRReactiveCard({ node }: { node: TreeNode }) {
  const val = node.data as IRValue;
  const rn = val.node as IRReactiveNode | undefined;
  return (
    <>
      <SectionHeader label={node.label} chip="reactive" chipColor="info" />
      {rn ? <ReactiveDetails rn={rn} /> : <EmptyHint>No reactive node data.</EmptyHint>}
    </>
  );
}

function IRActionCard({ node }: { node: TreeNode }) {
  const val = node.data as IRValue;
  const actions = val.actions ?? [];
  return (
    <>
      <SectionHeader label={node.label} chip={`${actions.length} actions`} chipColor="warning" />
      {actions.length === 0 ? (
        <EmptyHint>No actions.</EmptyHint>
      ) : (
        <Box sx={{ px: 2, pt: 1 }}>
          {actions.map((act, i) => {
            const a = act as Record<string, unknown>;
            return (
              <Typography key={i} variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.78rem', py: 0.25 }}>
                <span style={{ color: '#fab387' }}>{String(a.kind ?? i)}</span>
                {typeof a.action === 'string' && (
                  <span style={{ color: '#a6e3a1' }}> · {a.action}</span>
                )}
              </Typography>
            );
          })}
        </Box>
      )}
    </>
  );
}

// ── Domain-level cards ─────────────────────────────────────────────────────

function HAEntityCard({ node }: { node: TreeNode }) {
  const e = node.data as {
    kind: string;
    entityId: string;
    domain: string;
    sensorType: string;
    generatedId: string;
    attribute?: string;
  };
  return (
    <>
      <SectionHeader label={e.entityId} chip={e.sensorType} chipColor="success" />
      <PropTable rows={[
        { key: 'kind',        value: e.kind,        color: '#585b70' },
        { key: 'entityId',    value: e.entityId },
        { key: 'domain',      value: e.domain },
        { key: 'sensorType',  value: e.sensorType },
        { key: 'generatedId', value: e.generatedId },
        ...(e.attribute != null ? [{ key: 'attribute', value: e.attribute }] : []),
      ]} />
    </>
  );
}

function ComponentCard({ node }: { node: TreeNode }) {
  const c = node.data as { kind: string; section: string; id: string; config: Record<string, unknown> };
  const configRows: PropRow[] = Object.entries(c.config ?? {})
    .filter(([, v]) => v === null || typeof v !== 'object')
    .map(([key, value]) => ({ key, value }));
  return (
    <>
      <SectionHeader label={c.id} chip={c.section} chipColor="info" />
      <PropTable rows={[{ key: 'kind', value: c.kind, color: '#585b70' }]} />
      <SubHeader>config</SubHeader>
      {configRows.length > 0 ? <PropTable rows={configRows} /> : <EmptyHint>No scalar config properties.</EmptyHint>}
    </>
  );
}

function ScriptCard({ node }: { node: TreeNode }) {
  const s = node.data as { kind: string; id: string; then: unknown[] };
  return (
    <>
      <SectionHeader label={s.id} chip={`${s.then?.length ?? 0} actions`} chipColor="warning" />
      <PropTable rows={[{ key: 'kind', value: s.kind, color: '#585b70' }, { key: 'id', value: s.id }, { key: 'actions', value: s.then?.length ?? 0 }]} />
    </>
  );
}

function ScriptActionCard({ node }: { node: TreeNode }) {
  const a = node.data as Record<string, unknown>;
  const rows: PropRow[] = Object.entries(a)
    .filter(([, v]) => v === null || typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean')
    .map(([key, value]) => ({ key, value }));
  return (
    <>
      <SectionHeader label={node.label} chip={node.chip} chipColor="warning" />
      {rows.length > 0 ? <PropTable rows={rows} /> : <EmptyHint>Expand children for details.</EmptyHint>}
    </>
  );
}

function BindingCard({ node }: { node: TreeNode }) {
  const b = node.data as {
    kind: string; targetId: string; targetType: string; targetProp: string;
    part?: string; state?: string; expression: IRReactiveNode;
  };
  const label = [b.targetId, b.targetProp, b.part, b.state].filter(Boolean).join('.');
  return (
    <>
      <SectionHeader label={label} chip={b.targetType} chipColor="info" />
      <SubHeader>target</SubHeader>
      <PropTable rows={[
        { key: 'kind',       value: b.kind, color: '#585b70' },
        { key: 'targetId',   value: b.targetId },
        { key: 'targetProp', value: b.targetProp },
        { key: 'targetType', value: b.targetType },
        ...(b.part  != null ? [{ key: 'part',  value: b.part }]  : []),
        ...(b.state != null ? [{ key: 'state', value: b.state }] : []),
      ]} />
      {b.expression && (
        <>
          <SubHeader>expression</SubHeader>
          <ReactiveDetails rn={b.expression} />
        </>
      )}
    </>
  );
}

function IRReactiveNodeCard({ node }: { node: TreeNode }) {
  const obj = node.data as IRReactiveNode;
  return (
    <>
      <SectionHeader label={node.label} chip={node.chip} chipColor="info" />
      {obj ? <ReactiveDetails rn={obj} /> : <EmptyHint>No data.</EmptyHint>}
    </>
  );
}

function ThemeGroupCard({ node }: { node: TreeNode }) {
  const d = node.data as IRThemeData;
  return (
    <>
      <SectionHeader label="themes" chip={node.chip} chipColor="secondary" />
      <PropTable rows={[
        { key: 'themes',       value: d.themeNames?.join(', ') ?? '' },
        { key: 'defaultIndex', value: d.defaultIndex ?? 0 },
        { key: 'tokens',       value: Object.keys(d.leafData ?? {}).length },
      ]} />
    </>
  );
}

function ThemeLeafCard({ node }: { node: TreeNode }) {
  const d = node.data as { token: string; values: unknown[]; valueType: string };
  const values = d.values ?? [];
  return (
    <>
      <SectionHeader label={d.token} chip={d.valueType} />
      <PropTable rows={[{ key: 'valueType', value: d.valueType }, { key: 'count', value: values.length }]} />
      {values.length > 0 && (
        <>
          <SubHeader>values</SubHeader>
          <Box sx={{ px: 2, pb: 1 }}>
            {values.map((v, i) => (
              <Typography
                key={i}
                variant="body2"
                sx={{ fontFamily: 'monospace', fontSize: '0.78rem', color: '#a6e3a1' }}
              >
                {String(v)}
              </Typography>
            ))}
          </Box>
        </>
      )}
    </>
  );
}

function GroupCard({ node }: { node: TreeNode }) {
  const count = Array.isArray(node.data)
    ? node.data.length
    : (node.children?.length ?? 0);
  return (
    <>
      <SectionHeader label={node.label} chip={node.chip} chipColor={node.chipColor} />
      <Box sx={{ px: 2, py: 1.5 }}>
        <Typography variant="body2" color="text.secondary">
          {count} item{count !== 1 ? 's' : ''}
        </Typography>
      </Box>
    </>
  );
}

// ── DetailPanel ────────────────────────────────────────────────────────────

interface DetailPanelProps {
  node: TreeNode | null;
}

export function DetailPanel({ node }: DetailPanelProps) {
  if (!node) {
    return (
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'text.disabled' }}>
        <Typography variant="body2">Select a node to inspect its data</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
      {node.nodeKind === 'section'        && <SectionCard      node={node} />}
      {node.nodeKind === 'iv-object'      && <IRObjectCard     node={node} />}
      {node.nodeKind === 'iv-array'       && <IRArrayCard      node={node} />}
      {node.nodeKind === 'iv-widget'      && <IRWidgetCard     node={node} />}
      {node.nodeKind === 'iv-ref'         && <IRRefCard        node={node} />}
      {node.nodeKind === 'iv-reactive'    && <IRReactiveCard   node={node} />}
      {node.nodeKind === 'iv-action'      && <IRActionCard     node={node} />}
      {node.nodeKind === 'ha-entity'      && <HAEntityCard     node={node} />}
      {node.nodeKind === 'component'      && <ComponentCard    node={node} />}
      {node.nodeKind === 'script'         && <ScriptCard       node={node} />}
      {node.nodeKind === 'script-action'  && <ScriptActionCard node={node} />}
      {node.nodeKind === 'binding'        && <BindingCard      node={node} />}
      {node.nodeKind === 'reactive-node'  && <IRReactiveNodeCard node={node} />}
      {node.nodeKind === 'theme-group'    && <ThemeGroupCard   node={node} />}
      {node.nodeKind === 'theme-leaf'     && <ThemeLeafCard    node={node} />}
      {(node.nodeKind === 'group' || node.nodeKind === 'root') && <GroupCard node={node} />}
    </Box>
  );
}
