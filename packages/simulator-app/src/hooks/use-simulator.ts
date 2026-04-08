import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { SemanticIR } from '@espcompose/core/internals';
import {
  extractDisplayConfig,
  lowerToSimulator,
  MockProvider,
  Scheduler,
  type RuntimeNode,
  type ServerMessage,
} from '../runtime';
import { useWebSocket, type ConnectionStatus } from './use-websocket';

// ── Types ────────────────────────────────────────────────────────────────────

export type BuildStatus = 'idle' | 'building' | 'error' | 'ready';

export interface SimulatorState {
  /** Current RuntimeNode tree (lowered from IR). */
  nodes: RuntimeNode[];
  /** Mock entity provider. */
  provider: MockProvider | null;
  /** Current SemanticIR (raw, for devtools / theme extraction). */
  ir: SemanticIR | null;
  /** Build lifecycle status. */
  buildStatus: BuildStatus;
  /** Last build error message, if any. */
  buildError: string | null;
  /** WebSocket connection status. */
  connectionStatus: ConnectionStatus;
  /** Project name from the server. */
  projectName: string;
  /** Display dimensions from the server. */
  displayWidth: number;
  displayHeight: number;
  /** Increment to trigger re-renders after entity state changes. */
  renderVersion: number;
  /** Call after modifying entity state to flush reactive updates. */
  flushAndRerender: () => void;
}

// ── Hook ─────────────────────────────────────────────────────────────────────

/**
 * Top-level simulator state management hook.
 *
 * Connects to the dev server WS, receives SemanticIR updates,
 * lowers them to RuntimeNode[] via `lowerToSimulator()`, and
 * manages the MockProvider + Scheduler lifecycle.
 */
export function useSimulator(): SimulatorState {
  // Derive WS URL from current page location
  const wsUrl = useMemo(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    return `${protocol}//${window.location.host}/ws`;
  }, []);

  const { status: connectionStatus, lastMessage, send } = useWebSocket(wsUrl);

  const [nodes, setNodes] = useState<RuntimeNode[]>([]);
  const [provider, setProvider] = useState<MockProvider | null>(null);
  const [ir, setIR] = useState<SemanticIR | null>(null);
  const [buildStatus, setBuildStatus] = useState<BuildStatus>('idle');
  const [buildError, setBuildError] = useState<string | null>(null);
  const [projectName, setProjectName] = useState('espcompose');
  const [displayWidth, setDisplayWidth] = useState(320);
  const [displayHeight, setDisplayHeight] = useState(480);
  const [renderVersion, setRenderVersion] = useState(0);

  // Keep a ref to the current provider so flushAndRerender always uses the latest
  const providerRef = useRef<MockProvider | null>(null);

  const flushAndRerender = useCallback(() => {
    Scheduler.instance().flush();
    setRenderVersion((v: number) => v + 1);
  }, []);

  // ── Process incoming WS messages ──────────────────────────────────────────

  useEffect(() => {
    if (!lastMessage) return;

    const msg: ServerMessage = lastMessage;

    switch (msg.type) {
      case 'connected':
        setProjectName(msg.payload.projectName);
        // Request the current IR from the server
        send({ type: 'ready' });
        break;

      case 'ir_update': {
        const newIR = msg.payload.ir;
        setIR(newIR);
        setBuildStatus('ready');
        setBuildError(null);

        // Lower IR → RuntimeNode[]
        Scheduler.reset();
        const newProvider = new MockProvider();
        const newNodes = lowerToSimulator(newIR, newProvider);
        const display = extractDisplayConfig(newIR);

        providerRef.current = newProvider;
        setProvider(newProvider);
        setNodes(newNodes);
        setDisplayWidth(display?.width ?? 320);
        setDisplayHeight(display?.height ?? 480);
        setRenderVersion((v: number) => v + 1);
        break;
      }

      case 'build_start':
        setBuildStatus('building');
        setBuildError(null);
        break;

      case 'build_error':
        setBuildStatus('error');
        setBuildError(msg.payload.message);
        break;
    }
  }, [lastMessage, send]);

  return {
    nodes,
    provider,
    ir,
    buildStatus,
    buildError,
    connectionStatus,
    projectName,
    displayWidth,
    displayHeight,
    renderVersion,
    flushAndRerender,
  };
}
