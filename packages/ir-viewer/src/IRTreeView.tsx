import React, { useMemo, useState } from 'react';
import { Box, Chip, Typography } from '@mui/material';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import type { TreeNode } from './types';

// ── RichLabel ──────────────────────────────────────────────────────────────

function RichLabel({ node }: { node: TreeNode }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, py: '1px' }}>
      <Typography
        variant="body2"
        sx={{ fontFamily: 'monospace', fontWeight: 500, fontSize: '0.825rem', lineHeight: 1.4 }}
      >
        {node.label}
      </Typography>
      {node.chip && (
        <Chip
          size="small"
          label={node.chip}
          color={node.chipColor ?? 'default'}
          sx={{ height: 16, fontSize: '0.65rem', '& .MuiChip-label': { px: '5px' } }}
        />
      )}
    </Box>
  );
}

// ── RecursiveTreeItem ──────────────────────────────────────────────────────

function RecursiveTreeItem({
  node,
  onSelect,
}: {
  node: TreeNode;
  onSelect: (node: TreeNode) => void;
}) {
  return (
    <TreeItem
      itemId={node.id}
      label={<RichLabel node={node} />}
      onClick={() => onSelect(node)}
    >
      {node.children?.map(child => (
        <RecursiveTreeItem key={child.id} node={child} onSelect={onSelect} />
      ))}
    </TreeItem>
  );
}

// ── IRTreeView ─────────────────────────────────────────────────────────────

interface IRTreeViewProps {
  nodes: TreeNode[];
  onSelect: (node: TreeNode) => void;
  searchQuery: string;
}

function getAllIds(nodes: TreeNode[]): string[] {
  const ids: string[] = [];
  function walk(n: TreeNode) {
    if (n.children?.length) {
      ids.push(n.id);
      n.children.forEach(walk);
    }
  }
  nodes.forEach(walk);
  return ids;
}

function matchingAncestorIds(nodes: TreeNode[], query: string): string[] {
  if (!query) return [];
  const q = query.toLowerCase();
  const ancestors = new Set<string>();

  function walk(node: TreeNode): boolean {
    const selfMatch = node.label.toLowerCase().includes(q) || !!node.chip?.toLowerCase().includes(q);
    const childMatch = node.children?.some(c => walk(c)) ?? false;
    if ((selfMatch || childMatch) && node.children?.length) ancestors.add(node.id);
    return selfMatch || childMatch;
  }
  nodes.forEach(walk);
  return [...ancestors];
}

export function IRTreeView({ nodes, onSelect, searchQuery }: IRTreeViewProps) {
  const allIds = useMemo(() => getAllIds(nodes), [nodes]);
  const [manualExpanded, setManualExpanded] = useState<string[]>(allIds.slice(0, 10));

  const searchExpanded = useMemo(() => matchingAncestorIds(nodes, searchQuery), [nodes, searchQuery]);

  const expandedItems = useMemo(() => {
    if (searchQuery) return [...new Set([...manualExpanded, ...searchExpanded])];
    return manualExpanded;
  }, [manualExpanded, searchExpanded, searchQuery]);

  const filteredNodes = useMemo(() => {
    if (!searchQuery) return nodes;
    const q = searchQuery.toLowerCase();
    function filterNode(node: TreeNode): TreeNode | null {
      const selfMatch = node.label.toLowerCase().includes(q) || !!node.chip?.toLowerCase().includes(q);
      const filteredChildren = node.children?.map(filterNode).filter(Boolean) as TreeNode[] | undefined;
      if (selfMatch || filteredChildren?.length) {
        return { ...node, children: filteredChildren?.length ? filteredChildren : undefined };
      }
      return null;
    }
    return nodes.map(filterNode).filter(Boolean) as TreeNode[];
  }, [nodes, searchQuery]);

  return (
    <SimpleTreeView
      expandedItems={expandedItems}
      onExpandedItemsChange={(_, ids) => setManualExpanded(ids)}
      sx={{ '& .MuiTreeItem-content': { py: '1px' } }}
    >
      {filteredNodes.map(node => (
        <RecursiveTreeItem key={node.id} node={node} onSelect={onSelect} />
      ))}
    </SimpleTreeView>
  );
}
