// ────────────────────────────────────────────────────────────────────────────
// Dev server — HTTP static file server + WebSocket for simulator hot reload
//
// Serves the pre-built simulator React app (static files) and provides a
// WebSocket endpoint at `/ws` for pushing SemanticIR updates, build status,
// and (future) HA bridge events to connected browser clients.
// ────────────────────────────────────────────────────────────────────────────

import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';
import { WebSocketServer, WebSocket } from 'ws';
import type { SemanticIR } from '@espcompose/core/internals';
import {
  encodeServerMessage,
  isClientMessage,
  parseMessage,
  type ServerMessage,
} from '@espcompose/simulator-app/runtime';
import type { BridgeManager } from './bridge-manager';

// ── MIME type map for static file serving ────────────────────────────────────

const MIME_TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.map': 'application/json',
};

// ── Public interface ─────────────────────────────────────────────────────────

export interface DevServerOptions {
  /** Absolute path to the directory containing the built React app. */
  staticDir: string;
  /** Absolute path to the project root (for serving assets). Optional. */
  projectDir?: string;
  /** Absolute path to the project source directory (where user .tsx files live). */
  sourceDir?: string;
  /** Port to listen on. Default: 5420. */
  port?: number;
  /** Initial SemanticIR to send to connecting clients. */
  initialIR?: SemanticIR;
  /** Project name shown in the browser UI. */
  projectName?: string;
  /** Bridge manager (mock or real HA bridge). Always required. */
  bridge: BridgeManager;
}

export interface DevServer {
  /** The port the server is listening on. */
  readonly port: number;
  /** Broadcast an IR update to all connected clients. */
  broadcastIR(ir: SemanticIR): void;
  /** Broadcast a build-start event to all connected clients. */
  broadcastBuildStart(): void;
  /** Broadcast a build-error event to all connected clients. */
  broadcastBuildError(message: string, phase?: string, stack?: string): void;
  /** Broadcast bridge status to all connected clients. */
  broadcastBridgeStatus(status: string, haClients?: number, port?: number, error?: string): void;
  /** Broadcast an HA command to all connected browser clients. */
  broadcastHACommand(cmd: { entity_id: string; domain: string; action: string; data?: Record<string, unknown> }): void;
  /** Broadcast an HA entity state push to all connected browser clients. */
  broadcastHAStateUpdate(update: { entity_id: string; state: string; attribute: string }): void;
  /** Gracefully shut down the HTTP and WebSocket servers. */
  close(): Promise<void>;
}

// ── Implementation ───────────────────────────────────────────────────────────

export function startDevServer(options: DevServerOptions): Promise<DevServer> {
  const {
    staticDir,
    projectDir,
    sourceDir,
    port = 5420,
    initialIR,
    projectName = 'espcompose',
    bridge,
  } = options;

  let currentIR: SemanticIR | undefined = initialIR;
  const clients = new Set<WebSocket>();

  // ── Cached state for late-joining clients ────────────────────────────────

  /** Last bridge_status message so reconnecting clients get the current status. */
  let lastBridgeStatus: ServerMessage | undefined;

  /** Cached HA entity states keyed by "entity_id" or "entity_id::attribute". */
  const haStateCache = new Map<string, { entity_id: string; state: string; attribute: string }>();

  // ── HTTP server: serve static files ──────────────────────────────────────

  const server = http.createServer((req, res) => {
    const url = new URL(req.url ?? '/', `http://localhost:${port}`);
    let filePath = path.join(staticDir, decodeURIComponent(url.pathname));

    // Default to index.html for SPA routing
    if (url.pathname === '/' || url.pathname === '') {
      filePath = path.join(staticDir, 'index.html');
    }

    // Try to serve from project source directory if available
    // This handles image/font assets referenced in source code (e.g. ./assets/logo.png)
    const assetRoot = sourceDir ?? projectDir;
    if (assetRoot && url.pathname.startsWith('/__project__/')) {
      const relativePath = decodeURIComponent(url.pathname.slice('/__project__/'.length));
      const assetPath = path.join(assetRoot, relativePath);
      const resolved = path.resolve(assetPath);
      const allowedRoot = path.resolve(assetRoot);
      
      if (resolved.startsWith(allowedRoot)) {
        fs.stat(resolved, (err, stats) => {
          if (!err && stats?.isFile()) {
            const ext = path.extname(resolved).toLowerCase();
            const contentType = MIME_TYPES[ext] ?? 'application/octet-stream';
            res.writeHead(200, { 'Content-Type': contentType });
            fs.createReadStream(resolved).pipe(res);
            return;
          }
          serveStaticFile();
        });
        return;
      }
    }

    serveStaticFile();

    function serveStaticFile() {
      // Prevent path traversal
      const resolved = path.resolve(filePath);
      if (!resolved.startsWith(path.resolve(staticDir))) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
      }

      fs.stat(resolved, (err, stats) => {
        if (err || !stats?.isFile()) {
          // SPA fallback: serve index.html for non-file paths
          const indexPath = path.join(staticDir, 'index.html');
          fs.readFile(indexPath, (indexErr, data) => {
            if (indexErr) {
              res.writeHead(404);
              res.end('Not Found');
              return;
            }
            res.writeHead(200, {
              'Content-Type': 'text/html; charset=utf-8',
              'Cache-Control': 'no-cache, no-store, must-revalidate',
            });
            res.end(data);
          });
          return;
        }

        const ext = path.extname(resolved).toLowerCase();
        const contentType = MIME_TYPES[ext] ?? 'application/octet-stream';
        // Hashed assets (Vite output) get long cache; HTML gets no-cache
        const cacheControl = ext === '.html'
          ? 'no-cache, no-store, must-revalidate'
          : 'public, max-age=31536000, immutable';
        res.writeHead(200, { 'Content-Type': contentType, 'Cache-Control': cacheControl });
        fs.createReadStream(resolved).pipe(res);
      });
    }
  });

  // ── WebSocket server ─────────────────────────────────────────────────────

  const wss = new WebSocketServer({ server, path: '/ws' });

  wss.on('connection', (ws: WebSocket) => {
    clients.add(ws);
    console.log(`  [dev-server] WS client connected (total: ${clients.size})`);

    // Send connected message with server info
    sendToClient(ws, {
      type: 'connected',
      payload: { projectName, version: '0.1.0', port },
    });

    // Send current IR immediately — no round-trip handshake needed.
    if (currentIR) {
      sendToClient(ws, { type: 'ir_update', payload: { ir: currentIR } });
    }
    // Send cached bridge status so the client knows the bridge state.
    if (lastBridgeStatus) {
      sendToClient(ws, lastBridgeStatus);
    }
    // Send cached HA entity states so the client starts with current values.
    for (const update of haStateCache.values()) {
      sendToClient(ws, { type: 'ha_state_update', payload: update });
    }

    ws.on('message', (raw: unknown) => {
      const parsed = parseMessage(String(raw));
      if (!isClientMessage(parsed)) return;
      console.log(`  [dev-server] WS message: ${(parsed as { type: string }).type}`);

      if (parsed.type === 'ready') {
        // Client explicitly requests state — resend everything.
        if (currentIR) {
          sendToClient(ws, { type: 'ir_update', payload: { ir: currentIR } });
        }
        if (lastBridgeStatus) {
          sendToClient(ws, lastBridgeStatus);
        }
        for (const update of haStateCache.values()) {
          sendToClient(ws, { type: 'ha_state_update', payload: update });
        }
      }

      // Forward bridge-related messages to the bridge
      if (parsed.type === 'entity_definitions') {
        console.log('  [dev-server] entity_definitions received');
        bridge.send({
          type: 'define_node',
          payload: {
            name: parsed.payload.device_name,
            api_encryption_key: parsed.payload.api_encryption_key,
            entities: parsed.payload.entities,
            ha_entity_imports: parsed.payload.ha_entity_imports,
          },
        });
      }

      if (parsed.type === 'entity_interaction') {
        bridge.send({
          type: 'entity_state_update',
          payload: {
            entity_id: parsed.payload.entity_id,
            state: '',
            action: parsed.payload.action,
            attributes: parsed.payload.data,
          },
        });
      }
    });

    ws.on('close', () => {
      clients.delete(ws);
    });

    ws.on('error', () => {
      clients.delete(ws);
    });
  });

  // ── Broadcast helpers ────────────────────────────────────────────────────

  function broadcast(msg: ServerMessage): void {
    const data = encodeServerMessage(msg);
    for (const ws of clients) {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(data);
      }
    }
  }

  function sendToClient(ws: WebSocket, msg: ServerMessage): void {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(encodeServerMessage(msg));
    }
  }

  // ── Start listening ──────────────────────────────────────────────────────

  return new Promise<DevServer>((resolve, reject) => {
    server.on('error', reject);

    server.listen(port, () => {
      resolve({
        port,

        broadcastIR(ir: SemanticIR) {
          currentIR = ir;
          broadcast({ type: 'ir_update', payload: { ir } });
        },

        broadcastBuildStart() {
          broadcast({ type: 'build_start' });
        },

        broadcastBuildError(message: string, phase?: string, stack?: string) {
          broadcast({ type: 'build_error', payload: { message, phase, stack } });
        },

        broadcastBridgeStatus(
          bridgeStatus: string,
          haClients?: number,
          bridgePort?: number,
          error?: string,
        ) {
          const msg: ServerMessage = {
            type: 'bridge_status',
            payload: { status: bridgeStatus, ha_clients: haClients ?? 0, port: bridgePort, error },
          };
          lastBridgeStatus = msg;
          broadcast(msg);
        },

        broadcastHACommand(cmd: { entity_id: string; domain: string; action: string; data?: Record<string, unknown> }) {
          broadcast({
            type: 'ha_command',
            payload: cmd,
          });
        },

        broadcastHAStateUpdate(update: { entity_id: string; state: string; attribute: string }) {
          // Cache so reconnecting clients get current values
          const cacheKey = update.attribute
            ? `${update.entity_id}::${update.attribute}`
            : update.entity_id;
          haStateCache.set(cacheKey, update);
          broadcast({
            type: 'ha_state_update',
            payload: update,
          });
        },

        async close() {
          // Close all WS connections
          for (const ws of clients) {
            ws.close();
          }
          clients.clear();

          // Close WS server
          await new Promise<void>((res, rej) =>
            wss.close((err?: Error) => (err ? rej(err) : res())),
          );

          // Close HTTP server
          await new Promise<void>((res, rej) =>
            server.close((err?: Error) => (err ? rej(err) : res())),
          );
        },
      });
    });
  });
}
