// ────────────────────────────────────────────────────────────────────────────
// WebSocket protocol type definitions
//
// Shared between the dev server (Node.js) and the simulator React app
// (browser). Every message is a JSON envelope with a discriminated `type`
// field and an optional typed `payload`.
//
// Extensible: add new message types here and both sides get type safety.
// ────────────────────────────────────────────────────────────────────────────

import type { SemanticIR } from '@espcompose/core/internals';

// ── Server → Client messages ─────────────────────────────────────────────────

export interface ConnectedMessage {
  type: 'connected';
  payload: {
    projectName: string;
    version: string;
    port: number;
  };
}

export interface IRUpdateMessage {
  type: 'ir_update';
  payload: {
    ir: SemanticIR;
  };
}

export interface BuildStartMessage {
  type: 'build_start';
}

export interface BuildErrorMessage {
  type: 'build_error';
  payload: {
    message: string;
    phase?: string;
    stack?: string;
  };
}

/** Union of all messages the server can send to a client. */
export type ServerMessage =
  | ConnectedMessage
  | IRUpdateMessage
  | BuildStartMessage
  | BuildErrorMessage;

// ── Client → Server messages ─────────────────────────────────────────────────

/** Client signals it is ready to receive IR data. */
export interface ReadyMessage {
  type: 'ready';
}

/** Union of all messages a client can send to the server. */
export type ClientMessage = ReadyMessage;

// ── Type guards ──────────────────────────────────────────────────────────────

export function isServerMessage(data: unknown): data is ServerMessage {
  return (
    typeof data === 'object' &&
    data !== null &&
    'type' in data &&
    typeof (data as { type: unknown }).type === 'string' &&
    ['connected', 'ir_update', 'build_start', 'build_error'].includes(
      (data as { type: string }).type,
    )
  );
}

export function isClientMessage(data: unknown): data is ClientMessage {
  return (
    typeof data === 'object' &&
    data !== null &&
    'type' in data &&
    typeof (data as { type: unknown }).type === 'string' &&
    ['ready'].includes((data as { type: string }).type)
  );
}

// ── Helpers ──────────────────────────────────────────────────────────────────

/**
 * JSON replacer that converts Map instances to plain objects
 * so they survive JSON serialisation (e.g. IRThemeData.leafData).
 */
function jsonReplacer(_key: string, value: unknown): unknown {
  if (value instanceof Map) {
    return { __map__: true, entries: Array.from((value as Map<string, unknown>).entries()) };
  }
  return value;
}

/**
 * JSON reviver that restores Map instances serialised by {@link jsonReplacer}.
 */
function jsonReviver(_key: string, value: unknown): unknown {
  if (
    typeof value === 'object' &&
    value !== null &&
    (value as Record<string, unknown>).__map__ === true &&
    Array.isArray((value as Record<string, unknown>).entries)
  ) {
    return new Map((value as { entries: [string, unknown][] }).entries);
  }
  return value;
}

/** Serialize a server message to a JSON string for sending over WS. */
export function encodeServerMessage(msg: ServerMessage): string {
  return JSON.stringify(msg, jsonReplacer);
}

/** Serialize a client message to a JSON string for sending over WS. */
export function encodeClientMessage(msg: ClientMessage): string {
  return JSON.stringify(msg, jsonReplacer);
}

/** Parse a raw WS message string. Returns null if invalid JSON. */
export function parseMessage(raw: string): unknown {
  try {
    return JSON.parse(raw, jsonReviver);
  } catch {
    return null;
  }
}
