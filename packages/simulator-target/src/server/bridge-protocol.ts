// ────────────────────────────────────────────────────────────────────────────
// Bridge protocol — Node ↔ Python stdio JSON-line message types
//
// These types define the messages exchanged between the Node dev server and
// the Python ESPHome bridge process via newline-delimited JSON on stdio.
// The Python side reads these as plain dicts; only Node needs typed interfaces.
// ────────────────────────────────────────────────────────────────────────────

// ── Shared types ─────────────────────────────────────────────────────────────

export interface EntityDefinition {
  entity_id: string;
  domain: string;
  name: string;
  unique_id: string;
  device_class?: string;
}

export interface HAEntityImport {
  entity_id: string;
  domain: string;
  generated_id: string;
  attribute?: string;
}

// ── Node → Python messages ───────────────────────────────────────────────────

export interface DefineNodeMessage {
  type: 'define_node';
  payload: {
    name: string;
    mac_address?: string;
    api_encryption_key?: string;
    port?: number;
    /** Native device entities to expose to HA via the ESPHome API. */
    entities: EntityDefinition[];
    /** HA entities the device imports (platform: homeassistant sensor imports). */
    ha_entity_imports?: HAEntityImport[];
  };
}

export interface EntityStateUpdateMessage {
  type: 'entity_state_update';
  payload: {
    entity_id: string;
    state: string;
    attributes?: Record<string, unknown>;
  };
}

export interface BatchEntityStateUpdateMessage {
  type: 'batch_entity_state_update';
  payload: {
    updates: Array<{
      entity_id: string;
      state: string;
      attributes?: Record<string, unknown>;
    }>;
  };
}

/** Union of all messages Node can send to the Python bridge. */
export type NodeToBridgeMessage =
  | DefineNodeMessage
  | EntityStateUpdateMessage
  | BatchEntityStateUpdateMessage;

// ── Python → Node messages ───────────────────────────────────────────────────

export interface BridgeReadyMessage {
  type: 'bridge_ready';
  payload: {
    port: number;
    version: string;
    protocol_version: number;
  };
}

export interface EntityCommandMessage {
  type: 'entity_command';
  payload: {
    entity_id: string;
    domain: string;
    action: string;
    data?: Record<string, unknown>;
  };
}

export interface ClientConnectedMessage {
  type: 'client_connected';
  payload: {
    address: string;
    client_info?: string;
  };
}

export interface ClientDisconnectedMessage {
  type: 'client_disconnected';
  payload: {
    address: string;
  };
}

export interface BridgeErrorMessage {
  type: 'bridge_error';
  payload: {
    message: string;
    fatal: boolean;
  };
}

/** Union of all messages the Python bridge can send to Node. */
export type BridgeToNodeMessage =
  | BridgeReadyMessage
  | EntityCommandMessage
  | ClientConnectedMessage
  | ClientDisconnectedMessage
  | BridgeErrorMessage;

// ── Type guard ───────────────────────────────────────────────────────────────

const BRIDGE_TO_NODE_TYPES = new Set([
  'bridge_ready',
  'entity_command',
  'client_connected',
  'client_disconnected',
  'bridge_error',
]);

export function isBridgeToNodeMessage(data: unknown): data is BridgeToNodeMessage {
  return (
    typeof data === 'object' &&
    data !== null &&
    'type' in data &&
    typeof (data as { type: unknown }).type === 'string' &&
    BRIDGE_TO_NODE_TYPES.has((data as { type: string }).type)
  );
}
