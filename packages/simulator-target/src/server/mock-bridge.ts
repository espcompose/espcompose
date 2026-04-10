// ────────────────────────────────────────────────────────────────────────────
// MockBridge — in-process entity state simulation for the dev server
//
// Implements the BridgeManager interface to provide the same contract as the
// Python ESPHome bridge, but runs entirely in-process with no external
// dependencies. Used when `--ha-bridge` is not set.
//
// Responsibilities:
//   - Register entities from define_node messages
//   - Simulate domain-specific service effects (toggle, turn_on, turn_off, etc.)
//   - Fire bridge_ready, client_connected, entity_command, ha_state_update callbacks
// ────────────────────────────────────────────────────────────────────────────

import { getEntityDomain } from '@espcompose/core/internals';
import type { BridgeManager, BridgeManagerOptions, BridgeStatus } from './bridge-manager';
import type { NodeToBridgeMessage, BridgeToNodeMessage } from './bridge-protocol';

// ── Internal entity state ────────────────────────────────────────────────────

interface MockEntityState {
  state: string;
  attributes: Record<string, unknown>;
  domain: string;
}

function defaultStateForDomain(domain: string): MockEntityState {
  const desc = getEntityDomain(domain);
  if (!desc) return { state: 'unknown', attributes: {}, domain };
  return { state: desc.defaultState, attributes: {}, domain };
}

// ── Implementation ───────────────────────────────────────────────────────────

export function createMockBridge(options: Pick<BridgeManagerOptions, 'onMessage' | 'onStatusChange'>): BridgeManager {
  const { onMessage, onStatusChange } = options;

  let status: BridgeStatus = 'stopped';
  const entities = new Map<string, MockEntityState>();
  const timers: ReturnType<typeof setTimeout>[] = [];

  function setStatus(newStatus: BridgeStatus, error?: string): void {
    status = newStatus;
    onStatusChange?.(newStatus, error);
  }

  function emit(msg: BridgeToNodeMessage): void {
    onMessage?.(msg);
  }

  function handleDefineNode(msg: NodeToBridgeMessage & { type: 'define_node' }): void {
    // Clear any pending timers from a previous define_node (e.g. StrictMode remount)
    for (const t of timers) clearTimeout(t);
    timers.length = 0;

    entities.clear();

    // Register native device entities
    for (const entity of msg.payload.entities) {
      entities.set(entity.entity_id, defaultStateForDomain(entity.domain));
    }

    // Register imported HA entities with default domain state
    if (msg.payload.ha_entity_imports) {
      for (const imp of msg.payload.ha_entity_imports) {
        entities.set(imp.entity_id, defaultStateForDomain(imp.domain));
      }
    }

    setStatus('ready');
    emit({
      type: 'bridge_ready',
      payload: { port: 0, version: '1.0.0-mock', protocol_version: 1 },
    });

    // Simulate a client connecting after 5 seconds (matches typical HA handshake).
    const timer = setTimeout(() => {
      emit({
        type: 'client_connected',
        payload: { address: '127.0.0.1', client_info: 'mock-bridge' },
      });
    }, 5_000);
    timers.push(timer);
  }

  function handleEntityStateUpdate(msg: NodeToBridgeMessage & { type: 'entity_state_update' }): void {
    const { entity_id, action, attributes } = msg.payload;
    console.log(`  [mock-bridge] entity_state_update: ${entity_id} action=${action} attrs=${JSON.stringify(attributes)}`);
    if (!action) return;

    // Parse "domain.service" from the action field, or derive domain from entity_id
    const entityDomain = entity_id.split('.')[0] ?? '';
    const desc = getEntityDomain(entityDomain);
    if (!desc) {
      emit({
        type: 'bridge_error',
        payload: { message: `Unknown entity domain '${entityDomain}' for ${entity_id}`, fatal: false },
      });
      return;
    }

    const actionDesc = desc.actions.find(a => a.service === action);
    if (!actionDesc) {
      emit({
        type: 'bridge_error',
        payload: { message: `Unknown action '${action}' for domain '${entityDomain}'`, fatal: false },
      });
      return;
    }

    // Ensure entity exists
    if (!entities.has(entity_id)) {
      entities.set(entity_id, defaultStateForDomain(entityDomain));
    }
    const current = entities.get(entity_id)!;

    let newState: string = current.state;
    const newAttrs: Record<string, unknown> = { ...current.attributes };

    // Toggle actions: flip between active and default state
    if (actionDesc.resultState === null && desc.activeState !== null) {
      newState = current.state === desc.activeState ? desc.defaultState : desc.activeState;
      if (newState === desc.activeState && actionDesc.defaultAttributes) {
        for (const [k, v] of Object.entries(actionDesc.defaultAttributes)) {
          newAttrs[k] = attributes?.[k] ?? newAttrs[k] ?? v;
        }
      }
      // When toggling to the off/default state, clear numeric attributes to NaN
      // to match real Home Assistant behaviour.
      if (newState === desc.defaultState) {
        for (const k of Object.keys(newAttrs)) {
          if (typeof newAttrs[k] === 'number' || !isNaN(Number(newAttrs[k]))) {
            newAttrs[k] = 'NaN';
          }
        }
      }
    }
    // Explicit result state actions
    else if (actionDesc.resultState !== null) {
      newState = actionDesc.resultState;
      // When transitioning to the off/default state, clear numeric attributes.
      if (newState === desc.defaultState) {
        for (const k of Object.keys(newAttrs)) {
          if (typeof newAttrs[k] === 'number' || !isNaN(Number(newAttrs[k]))) {
            newAttrs[k] = 'NaN';
          }
        }
      }
      if (attributes) {
        for (const [k, v] of Object.entries(attributes)) {
          if (v != null) newAttrs[k] = v;
        }
      }
    }

    // Update internal state
    entities.set(entity_id, { state: newState, attributes: newAttrs, domain: entityDomain });

    // Emit entity_command so the dev server can broadcast ha_command
    emit({
      type: 'entity_command',
      payload: { entity_id, domain: entityDomain, action, data: attributes },
    });

    // Emit ha_state_update for the main state
    console.log(`  [mock-bridge] → ha_state_update: ${entity_id} state=${newState}`);
    emit({
      type: 'ha_state_update',
      payload: { entity_id, state: newState, attribute: '' },
    });

    // Emit ha_state_update for each attribute that changed
    for (const [key, val] of Object.entries(newAttrs)) {
      console.log(`  [mock-bridge] → ha_state_update: ${entity_id} ${key}=${String(val)}`);
      emit({
        type: 'ha_state_update',
        payload: { entity_id, state: String(val), attribute: key },
      });
    }
  }

  function send(msg: NodeToBridgeMessage): void {
    switch (msg.type) {
      case 'define_node':
        handleDefineNode(msg as NodeToBridgeMessage & { type: 'define_node' });
        break;
      case 'entity_state_update':
        handleEntityStateUpdate(msg as NodeToBridgeMessage & { type: 'entity_state_update' });
        break;
      case 'batch_entity_state_update':
        for (const update of msg.payload.updates) {
          handleEntityStateUpdate({
            type: 'entity_state_update',
            payload: { entity_id: update.entity_id, state: update.state, attributes: update.attributes },
          } as NodeToBridgeMessage & { type: 'entity_state_update' });
        }
        break;
    }
  }

  async function close(): Promise<void> {
    for (const t of timers) clearTimeout(t);
    timers.length = 0;
    setStatus('stopped');
  }

  // Start as "starting" then immediately ready once define_node arrives
  setStatus('starting');

  return {
    get status() { return status; },
    send,
    close,
  };
}
