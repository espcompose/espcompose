import { useCallback, useEffect, useRef, useState } from 'react';
import {
  type ServerMessage,
  type ClientMessage,
  isServerMessage,
  parseMessage,
  encodeClientMessage,
} from '../runtime';
import { debug } from '../utils/debug';

// ── Types ────────────────────────────────────────────────────────────────────

export type ConnectionStatus = 'connecting' | 'connected' | 'disconnected';

export interface UseWebSocketReturn {
  /** Current connection status. */
  status: ConnectionStatus;
  /** Queue of server messages received since last drain. */
  messageQueue: ServerMessage[];
  /** Clear the message queue after processing. */
  drainMessages: () => void;
  /** Send a typed client message to the server. */
  send: (msg: ClientMessage) => void;
}

// ── Configuration ────────────────────────────────────────────────────────────

const INITIAL_RECONNECT_MS = 500;
const MAX_RECONNECT_MS = 5000;
const RECONNECT_MULTIPLIER = 1.5;

// ── Hook ─────────────────────────────────────────────────────────────────────

/**
 * WebSocket client hook with auto-reconnect.
 *
 * Connects to the simulator dev server's WS endpoint, parses incoming
 * server messages, and provides a typed `send()` for client messages.
 * Automatically reconnects with exponential backoff on disconnect.
 */
export function useWebSocket(url: string): UseWebSocketReturn {
  const [status, setStatus] = useState<ConnectionStatus>('connecting');
  const [messageQueue, setMessageQueue] = useState<ServerMessage[]>([]);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectDelayRef = useRef(INITIAL_RECONNECT_MS);
  const reconnectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const unmountedRef = useRef(false);

  const connect = useCallback(() => {
    if (unmountedRef.current) return;

    debug('ws', `connecting to ${url}`);
    const ws = new WebSocket(url);
    wsRef.current = ws;
    setStatus('connecting');

    ws.onopen = () => {
      if (unmountedRef.current) { ws.close(); return; }
      debug('ws', 'connection opened');
      setStatus('connected');
      reconnectDelayRef.current = INITIAL_RECONNECT_MS;
    };

    ws.onmessage = (event) => {
      const parsed = parseMessage(String(event.data));
      if (isServerMessage(parsed)) {
        debug('ws', `recv: ${parsed.type}`);
        setMessageQueue(prev => [...prev, parsed]);
      } else {
        debug('ws', 'recv: unknown/invalid message', parsed);
      }
    };

    ws.onclose = () => {
      if (unmountedRef.current) return;
      debug('ws', 'connection closed, scheduling reconnect');
      setStatus('disconnected');
      wsRef.current = null;
      scheduleReconnect();
    };

    ws.onerror = () => {
      // onclose will fire after onerror, which handles reconnection
      ws.close();
    };
  }, [url]);

  const scheduleReconnect = useCallback(() => {
    if (unmountedRef.current) return;
    const delay = reconnectDelayRef.current;
    reconnectDelayRef.current = Math.min(delay * RECONNECT_MULTIPLIER, MAX_RECONNECT_MS);

    reconnectTimerRef.current = setTimeout(() => {
      reconnectTimerRef.current = null;
      connect();
    }, delay);
  }, [connect]);

  const drainMessages = useCallback(() => {
    setMessageQueue([]);
  }, []);

  const send = useCallback((msg: ClientMessage) => {
    const ws = wsRef.current;
    if (ws && ws.readyState === WebSocket.OPEN) {
      debug('ws', `send: ${msg.type}`);
      ws.send(encodeClientMessage(msg));
    } else {
      debug('ws', `send DROPPED (not open): ${msg.type}`);
    }
  }, []);

  useEffect(() => {
    unmountedRef.current = false;
    connect();

    return () => {
      unmountedRef.current = true;
      if (reconnectTimerRef.current) {
        clearTimeout(reconnectTimerRef.current);
        reconnectTimerRef.current = null;
      }
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, [connect]);

  return { status, messageQueue, drainMessages, send };
}
