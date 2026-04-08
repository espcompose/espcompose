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
} from './ws-protocol';
import { extractDisplayConfig } from '../extract-display-config';

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
  /** Port to listen on. Default: 5420. */
  port?: number;
  /** Initial SemanticIR to send to connecting clients. */
  initialIR?: SemanticIR;
  /** Project name shown in the browser UI. */
  projectName?: string;
  /** LVGL display width. */
  displayWidth?: number;
  /** LVGL display height. */
  displayHeight?: number;
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
  /** Gracefully shut down the HTTP and WebSocket servers. */
  close(): Promise<void>;
}

// ── Implementation ───────────────────────────────────────────────────────────

export function startDevServer(options: DevServerOptions): Promise<DevServer> {
  const {
    staticDir,
    port = 5420,
    initialIR,
    projectName = 'espcompose',
    displayWidth: optDisplayWidth,
    displayHeight: optDisplayHeight,
  } = options;

  let currentIR: SemanticIR | undefined = initialIR;
  const clients = new Set<WebSocket>();

  // Resolve display dimensions: CLI overrides > IR-extracted > defaults
  function resolveDisplayDims(ir?: SemanticIR): { displayWidth: number; displayHeight: number } {
    const irConfig = ir ? extractDisplayConfig(ir) : undefined;
    return {
      displayWidth: optDisplayWidth ?? irConfig?.width ?? 320,
      displayHeight: optDisplayHeight ?? irConfig?.height ?? 480,
    };
  }

  let { displayWidth, displayHeight } = resolveDisplayDims(initialIR);

  // ── HTTP server: serve static files ──────────────────────────────────────

  const server = http.createServer((req, res) => {
    const url = new URL(req.url ?? '/', `http://localhost:${port}`);
    let filePath = path.join(staticDir, decodeURIComponent(url.pathname));

    // Default to index.html for SPA routing
    if (url.pathname === '/' || url.pathname === '') {
      filePath = path.join(staticDir, 'index.html');
    }

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
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(data);
        });
        return;
      }

      const ext = path.extname(resolved).toLowerCase();
      const contentType = MIME_TYPES[ext] ?? 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': contentType });
      fs.createReadStream(resolved).pipe(res);
    });
  });

  // ── WebSocket server ─────────────────────────────────────────────────────

  const wss = new WebSocketServer({ server, path: '/ws' });

  wss.on('connection', (ws: WebSocket) => {
    clients.add(ws);

    // Send connected message with server info
    sendToClient(ws, {
      type: 'connected',
      payload: { projectName, version: '0.1.0', port, displayWidth, displayHeight },
    });

    ws.on('message', (raw: unknown) => {
      const parsed = parseMessage(String(raw));
      if (!isClientMessage(parsed)) return;

      if (parsed.type === 'ready' && currentIR) {
        sendToClient(ws, { type: 'ir_update', payload: { ir: currentIR } });
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
          // Re-extract display dimensions from the new IR
          const dims = resolveDisplayDims(ir);
          displayWidth = dims.displayWidth;
          displayHeight = dims.displayHeight;
          broadcast({ type: 'ir_update', payload: { ir } });
          // Notify clients of updated display dimensions
          broadcast({
            type: 'connected',
            payload: { projectName, version: '0.1.0', port, displayWidth, displayHeight },
          });
        },

        broadcastBuildStart() {
          broadcast({ type: 'build_start' });
        },

        broadcastBuildError(message: string, phase?: string, stack?: string) {
          broadcast({ type: 'build_error', payload: { message, phase, stack } });
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
