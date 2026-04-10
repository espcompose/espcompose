import { useCallback, useMemo, useRef, useState } from 'react';
import type { SemanticIR, IRObject } from '@espcompose/core/internals';
import { KNOWN_DOMAIN_NAMES } from '@espcompose/core/internals';
import {
  extractDisplayConfig,
  lowerToSimulator,
  EntityStore,
  Scheduler,
  entityIdToGeneratedId,
  type ServerMessage,
  type RuntimeNode,
  type LoweringResult,
} from '../runtime';
import { useWebSocket, type ConnectionStatus } from './use-websocket';
import { debug } from '../utils/debug';

/**
 * Extract native device entities from IR sections.
 *
 * In ESPHome, an entity is exposed to HA when:
 * - It has a `name` property (no name → implicitly internal)
 * - It is NOT marked `internal: true`
 * - Its section key is a recognised entity domain
 */
function extractNativeEntities(
  ir: SemanticIR,
): Array<{ entity_id: string; domain: string; name: string; unique_id: string }> {
  const sections = ir.esphome?.sections ?? [];

  // Get device name for building entity_id
  const esphomeSection = sections.find((s) => s.key === 'esphome');
  const deviceSlug =
    esphomeSection?.value.kind === 'object'
      ? String(
          (esphomeSection.value.entries.find((e) => e.key === 'name')?.value as { value?: string })?.value ??
            'espcompose',
        )
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '_')
      : 'espcompose';

  const entities: Array<{ entity_id: string; domain: string; name: string; unique_id: string }> = [];

  for (const section of sections) {
    if (!KNOWN_DOMAIN_NAMES.has(section.key)) continue;
    if (section.value.kind !== 'object') continue;

    // A section may be a single entity (object) or an array of entities.
    // Walk all objects that could be entity configs.
    const objects: IRObject[] = [];
    if (section.value.kind === 'object') {
      // Check if this is an array section (items inside)
      objects.push(section.value);
    }

    for (const obj of objects) {
      const nameEntry = obj.entries.find((e) => e.key === 'name');
      const internalEntry = obj.entries.find((e) => e.key === 'internal');

      // No name → implicitly internal, skip
      if (!nameEntry || nameEntry.value.kind !== 'scalar') continue;

      const name = String(nameEntry.value.value);
      if (!name) continue;

      // Explicitly internal → skip
      if (
        internalEntry &&
        internalEntry.value.kind === 'scalar' &&
        internalEntry.value.value === true
      ) {
        continue;
      }

      // Build entity_id: domain.device_slug_entity_slug
      const entitySlug = name.toLowerCase().replace(/[^a-z0-9]+/g, '_');
      const entityId = `${section.key}.${entitySlug}`;
      const uniqueId = `${deviceSlug}_${entitySlug}`;

      entities.push({
        entity_id: entityId,
        domain: section.key,
        name,
        unique_id: uniqueId,
      });
    }
  }

  return entities;
}

// ── Types ────────────────────────────────────────────────────────────────────

export type BuildStatus = 'idle' | 'building' | 'error' | 'ready';

export interface SimulatorState {
  /** Current RuntimeNode tree (lowered from IR). */
  nodes: RuntimeNode[];
  /** Entity state store. */
  entityStore: EntityStore | null;
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
  /** Send an entity interaction to the server (toggle, sensor change, etc.). */
  sendEntityInteraction: (domain: string, action: string, entityId: string, data?: Record<string, unknown>) => void;
  /** Current active page index (for page visibility in Canvas). */
  getCurrentPageIndex: () => number;
}

// ── Hook ─────────────────────────────────────────────────────────────────────

/**
 * Top-level simulator state management hook.
 *
 * Connects to the dev server WS, receives SemanticIR updates,
 * lowers them to RuntimeNode[] via `lowerToSimulator()`, and
 * manages the EntityStore + Scheduler lifecycle.
 */
export function useSimulator(): SimulatorState {
  // Derive WS URL from current page location
  const wsUrl = useMemo(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    return `${protocol}//${window.location.host}/ws`;
  }, []);

  const [nodes, setNodes] = useState<RuntimeNode[]>([]);
  const [entityStore, setEntityStore] = useState<EntityStore | null>(null);
  const [ir, setIR] = useState<SemanticIR | null>(null);
  const [buildStatus, setBuildStatus] = useState<BuildStatus>('idle');
  const [buildError, setBuildError] = useState<string | null>(null);
  const [projectName, setProjectName] = useState('espcompose');
  const [displayWidth, setDisplayWidth] = useState(320);
  const [displayHeight, setDisplayHeight] = useState(480);
  const [renderVersion, setRenderVersion] = useState(0);

  // Keep a ref to the current entity store so callbacks always use the latest
  const entityStoreRef = useRef<EntityStore | null>(null);

  // Keep a ref to the latest lowering result so the page index getter works
  const loweringRef = useRef<LoweringResult | null>(null);

  // Keep a stable ref to `send` so the onEntityInteraction callback doesn't go stale
  const sendRef = useRef<(msg: import('../runtime').ClientMessage) => void>(() => {});

  const flushAndRerender = useCallback(() => {
    Scheduler.instance().flush();
    setRenderVersion((v: number) => v + 1);
  }, []);

  /** Send an entity interaction to the server via WS. */
  const sendEntityInteraction = useCallback(
    (domain: string, action: string, entityId: string, data?: Record<string, unknown>) => {
      sendRef.current({
        type: 'entity_interaction',
        payload: { entity_id: entityId, domain, action, data },
      });
    },
    [],
  );

  // ── Process WS messages immediately via callback ──────────────────────────

  const handleMessage = useCallback((msg: ServerMessage) => {
    switch (msg.type) {
      case 'connected':
        debug('sim', `connected – project=${msg.payload.projectName}`);
        setProjectName(msg.payload.projectName);
        break;

      case 'ir_update': {
        debug('sim', 'ir_update received');
        const newIR = msg.payload.ir;
        setIR(newIR);
        setBuildStatus('ready');
        setBuildError(null);

        // Lower IR → LoweringResult
        Scheduler.reset();
        const newStore = new EntityStore();

        const onEntityInteraction = (domain: string, action: string, entityId: string, data?: Record<string, unknown>) => {
          sendRef.current({
            type: 'entity_interaction',
            payload: { entity_id: entityId, domain, action, data },
          });
        };

        const result = lowerToSimulator(newIR, newStore, onEntityInteraction);
        const display = extractDisplayConfig(newIR);
        debug('sim', `lowered: ${result.nodes.length} nodes, ${result.automations.length} automations`);

        // Wire the re-render callback so page navigation triggers React updates
        result.setRerenderCallback(() => {
          setRenderVersion((v: number) => v + 1);
        });

        loweringRef.current = result;
        entityStoreRef.current = newStore;
        setEntityStore(newStore);
        setNodes(result.nodes);
        setDisplayWidth(display?.width ?? 320);
        setDisplayHeight(display?.height ?? 480);
        setRenderVersion((v: number) => v + 1);

        // Send native device entities to the server for bridge forwarding.
        const nativeEntities = extractNativeEntities(newIR);
        const haEntities = newIR.esphome?.haEntities ?? [];
        debug('sim', `entities: native=${nativeEntities.length} ha=${haEntities.length}`);
        if (nativeEntities.length > 0) debug('sim', 'nativeEntities', nativeEntities);
        if (haEntities.length > 0) debug('sim', 'haEntities', haEntities);

        if (nativeEntities.length > 0 || haEntities.length > 0) {
          debug('sim', 'sending entity_definitions');
          const esphomeSection = newIR.esphome?.sections.find((s) => s.key === 'esphome');
          const deviceName =
            esphomeSection?.value.kind === 'object'
              ? (esphomeSection.value.entries.find((e) => e.key === 'name')?.value as { value?: string })
                  ?.value ?? 'espcompose'
              : 'espcompose';

          sendRef.current({
            type: 'entity_definitions',
            payload: {
              device_name: deviceName,
              entities: nativeEntities,
              ha_entity_imports: haEntities.map(
                (e: { entityId: string; domain: string; generatedId: string; attribute?: string }) => ({
                  entity_id: e.entityId,
                  domain: e.domain,
                  generated_id: e.generatedId,
                  attribute: e.attribute,
                }),
              ),
            },
          });
        } else {
          debug('sim', 'SKIPPED entity_definitions — no entities found');
        }

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

      case 'bridge_status': {
        debug('sim', `bridge_status: ${msg.payload.status}`);
        break;
      }

      case 'ha_command': {
        const { entity_id, domain, action, data } = msg.payload;
        debug('sim', `ha_command: ${domain}.${action} → ${entity_id}`, data);

        if (action === 'client_connected') {
          const result = loweringRef.current;
          if (result) {
            for (const auto of result.automations) {
              if (auto.trigger === 'api.on_client_connected') {
                auto.execute();
              }
            }
          }
        }
        break;
      }

      case 'ha_state_update': {
        const { entity_id, state, attribute } = msg.payload;
        const genId = entityIdToGeneratedId(entity_id);
        debug('sim', `ha_state_update: ${entity_id} → ${genId} = ${state} (attr=${attribute})`);

        const store = entityStoreRef.current;
        if (store) {
          if (attribute) {
            store.setEntityState(genId, { attributes: { [attribute]: state } });
          } else {
            store.setEntityState(genId, { state });
          }
          flushAndRerender();
        }
        break;
      }
    }
  }, [flushAndRerender]);

  const { status: connectionStatus, send } = useWebSocket(wsUrl, handleMessage);

  // Keep sendRef current so callbacks created during lowering use the latest `send`
  sendRef.current = send;

  const getCurrentPageIndex = useCallback(
    () => loweringRef.current?.getCurrentPageIndex() ?? 0,
    [],
  );

  return {
    nodes,
    entityStore,
    ir,
    buildStatus,
    buildError,
    connectionStatus,
    projectName,
    displayWidth,
    displayHeight,
    renderVersion,
    flushAndRerender,
    sendEntityInteraction,
    getCurrentPageIndex,
  };
}
