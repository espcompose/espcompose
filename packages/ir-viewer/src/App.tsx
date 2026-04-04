import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  AppBar,
  Box,
  CircularProgress,
  CssBaseline,
  FormControlLabel,
  Switch,
  TextField,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from '@mui/material';
import type { IRData, TreeNode } from './types';
import { buildTree } from './transform';
import { IRTreeView } from './IRTreeView';
import { DetailPanel } from './DetailPanel';

const theme = createTheme({ palette: { mode: 'dark' } });

// ── Data loading ───────────────────────────────────────────────────────────
// The CLI injects `window.__IR_DATA = {...}` into the HTML before </body>.
// This avoids fetch() + CORS issues when the file is opened via file://.

declare global {
  interface Window { __IR_DATA?: IRData; }
}

type LoadState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'ok'; data: IRData };

function useIRData(): LoadState {
  const [state] = useState<LoadState>(() => {
    if (window.__IR_DATA) {
      return { status: 'ok', data: window.__IR_DATA };
    }
    return { status: 'error', message: 'No IR data found. Run espcompose with --debug to generate the viewer.' };
  });

  return state;
}

// ── Resizable panel hook ───────────────────────────────────────────────────

const MIN_TREE   = 220;
const MIN_DETAIL = 180;

function useResizableSplit(initialWidth = 560) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging     = useRef(false);
  const [treeWidth, setTreeWidth] = useState(initialWidth);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragging.current || !containerRef.current) return;
      const rect     = containerRef.current.getBoundingClientRect();
      const newWidth = Math.max(MIN_TREE, Math.min(rect.width - MIN_DETAIL, e.clientX - rect.left));
      setTreeWidth(Math.round(newWidth));
    };
    const onUp = () => {
      if (!dragging.current) return;
      dragging.current = false;
      document.body.style.cursor    = '';
      document.body.style.userSelect = '';
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup',   onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup',   onUp);
    };
  }, []);

  const onDividerMouseDown = useCallback(() => {
    dragging.current = true;
    document.body.style.cursor    = 'col-resize';
    document.body.style.userSelect = 'none';
  }, []);

  return { containerRef, treeWidth, onDividerMouseDown };
}

// ── App ────────────────────────────────────────────────────────────────────

export function App() {
  const loadState = useIRData();

  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);
  const [searchQuery, setSearchQuery]   = useState('');
  const [showInternal, setShowInternal] = useState(false);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setSearchQuery(val), 200);
  }, []);

  const treeNodes = useMemo(() => {
    if (loadState.status !== 'ok') return [];
    return buildTree(loadState.data, showInternal);
  }, [loadState, showInternal]);

  const { containerRef, treeWidth, onDividerMouseDown } = useResizableSplit(560);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        {/* ── Top bar ─────────────────────────────────────────────────── */}
        <AppBar position="static" color="default" elevation={2}>
          <Toolbar variant="dense" sx={{ gap: 1, flexWrap: 'wrap', minHeight: 48, py: 0.5 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1rem', mr: 1, whiteSpace: 'nowrap' }}>
              ESPCompose IR
            </Typography>
            <TextField
              size="small"
              placeholder="Search nodes…"
              onChange={handleSearchChange}
              sx={{ flex: '1 1 200px', minWidth: 180 }}
            />
            <FormControlLabel
              control={
                <Switch
                  size="small"
                  checked={showInternal}
                  onChange={e => setShowInternal(e.target.checked)}
                />
              }
              label="Internal"
              sx={{ mr: 0 }}
            />
          </Toolbar>
        </AppBar>

        {/* ── Body ────────────────────────────────────────────────────── */}
        {loadState.status === 'loading' && (
          <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
            <CircularProgress size={24} />
            <Typography variant="body2" color="text.secondary">Loading ir-debug.json…</Typography>
          </Box>
        )}

        {loadState.status === 'error' && (
          <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="body2" color="error.main">
              Failed to load ir-debug.json: {loadState.message}
            </Typography>
          </Box>
        )}

        {loadState.status === 'ok' && (
          <Box ref={containerRef} sx={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
            {/* ── Tree panel (left) ──────────────────────────────────── */}
            <Box
              sx={{
                width: treeWidth,
                flexShrink: 0,
                overflow: 'auto',
                p: 1,
              }}
            >
              <IRTreeView
                nodes={treeNodes}
                onSelect={setSelectedNode}
                searchQuery={searchQuery}
              />
            </Box>

            {/* ── Drag handle ────────────────────────────────────────── */}
            <Box
              onMouseDown={onDividerMouseDown}
              sx={{
                width: 5,
                flexShrink: 0,
                cursor: 'col-resize',
                bgcolor: 'divider',
                borderLeft:  '1px solid',
                borderRight: '1px solid',
                borderColor: 'divider',
                transition: 'background-color 0.1s, border-color 0.1s',
                '&:hover': {
                  bgcolor: 'primary.dark',
                  borderColor: 'primary.main',
                },
              }}
            />

            {/* ── Detail panel (right) ───────────────────────────────── */}
            <Box
              sx={{
                flex: 1,
                minWidth: MIN_DETAIL,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
              }}
            >
              <DetailPanel node={selectedNode} />
            </Box>
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
}
// This avoids fetch() + CORS issues when the file is opened via file://.

declare global {
  interface Window { __IR_DATA?: IRData; }
}
