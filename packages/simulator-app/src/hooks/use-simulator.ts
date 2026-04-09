import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { SemanticIR, IRObject } from '@espcompose/core/internals';
import {
  extractDisplayConfig,
  lowerToSimulator,
  MockProvider,
  Scheduler,
  type RuntimeNode,
  type ServerMessage,
  type LoweringResult,
} from '../runtime';
import { useWebSocket, type ConnectionStatus } from './use-websocket';
import { debug } from '../utils/debug';

// ── Entity domain keys that ESPHome exposes to HA ────────────────────────────

const ENTITY_DOMAIN_KEYS = new Set([
  'light',
  'switch',
  'sensor',
  'binary_sensor',
  'fan',
  'cover',
  'climate',
  'number',
  'select',
  'text_sensor',
  'button',
  'lock',
  'media_player',
  'siren',
  'valve',
  'alarm_control_panel',
  'update',
  'text',
  'date',
  'time',
  'datetime',
  'event',
]);

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
    if (!ENTITY_DOMAIN_KEYS.has(section.key)) continue;
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
  /** Current active page index (for page visibility in Canvas). */
  getCurrentPageIndex: () => number;
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

  const { status: connectionStatus, messageQueue, drainMessages, send } = useWebSocket(wsUrl);

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

  // Keep a ref to the latest lowering result so the page index getter works
  const loweringRef = useRef<LoweringResult | null>(null);

  // Track automation timers so they're cleaned up on re-lower
  const automationTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Track whether the HA bridge is active (suppresses mock timers)
  const bridgeActiveRef = useRef(false);

  // Track whether the server was started with --ha-bridge (never mock in this mode)
  const bridgeModeRef = useRef(false);

  const flushAndRerender = useCallback(() => {
    Scheduler.instance().flush();
    setRenderVersion((v: number) => v + 1);
  }, []);

  // ── Process incoming WS messages ──────────────────────────────────────────

  useEffect(() => {
    if (messageQueue.length === 0) return;

    for (const msg of messageQueue) {

    switch (msg.type) {
      case 'connected':
        debug('sim', `connected – project=${msg.payload.projectName} bridgeMode=${!!msg.payload.bridgeMode}`);
        setProjectName(msg.payload.projectName);
        bridgeModeRef.current = !!msg.payload.bridgeMode;
        // Request the current IR from the server
        send({ type: 'ready' });
        break;

      case 'ir_update': {
        debug('sim', 'ir_update received');
        const newIR = msg.payload.ir;
        setIR(newIR);
        setBuildStatus('ready');
        setBuildError(null);

        // Cancel any pending automation timers from a previous lowering
        for (const t of automationTimersRef.current) clearTimeout(t);
        automationTimersRef.current = [];

        // Lower IR → LoweringResult
        Scheduler.reset();
        const newProvider = new MockProvider();
        newProvider.bridgeMode = bridgeModeRef.current;
        const result = lowerToSimulator(newIR, newProvider);
        const display = extractDisplayConfig(newIR);
        debug('sim', `lowered: ${result.nodes.length} nodes, ${result.automations.length} automations`);

        // Wire the re-render callback so page navigation triggers React updates
        result.setRerenderCallback(() => {
          setRenderVersion((v: number) => v + 1);
        });

        // Forward entity service calls to the bridge when in bridge mode.
        // In bridge mode this always forwards (even before bridge reports ready)
        // so the message is queued on the server side for the bridge process.
        newProvider.onServiceCallHook = (domain, action, entityId, data) => {
          if (bridgeModeRef.current) {
            send({
              type: 'entity_interaction',
              payload: { entity_id: entityId, domain, action, data },
            });
          }
        };

        loweringRef.current = result;
        providerRef.current = newProvider;
        setProvider(newProvider);
        setNodes(result.nodes);
        setDisplayWidth(display?.width ?? 320);
        setDisplayHeight(display?.height ?? 480);
        setRenderVersion((v: number) => v + 1);

        // Send native device entities to the server for bridge forwarding.
        // Native entities are IR sections with entity-domain keys (light,
        // switch, sensor, …) that have a `name` and are not `internal: true`.
        // These are the entities the device OWNS and exposes to HA — NOT the
        // `haEntities` which are imports FROM HA (platform: homeassistant).
        const nativeEntities = extractNativeEntities(newIR);
        const haEntities = newIR.esphome?.haEntities ?? [];
        debug('sim', `entities: native=${nativeEntities.length} ha=${haEntities.length}`);
        if (nativeEntities.length > 0) debug('sim', 'nativeEntities', nativeEntities);
        if (haEntities.length > 0) debug('sim', 'haEntities', haEntities);

        if (nativeEntities.length > 0 || haEntities.length > 0) {
          debug('sim', 'sending entity_definitions');
          // Extract device name from the esphome section
          const esphomeSection = newIR.esphome?.sections.find((s) => s.key === 'esphome');
          const deviceName =
            esphomeSection?.value.kind === 'object'
              ? (esphomeSection.value.entries.find((e) => e.key === 'name')?.value as { value?: string })
                  ?.value ?? 'espcompose'
              : 'espcompose';

          send({
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

        // Schedule mock automations only when NOT in bridge mode.
        // When the bridge is active, the real client_connected event comes
        // from HA via the bridge → Node → ha_command WS message.
        if (!bridgeModeRef.current) {
          for (const auto of result.automations) {
            if (auto.trigger === 'api.on_client_connected') {
              const timer = setTimeout(() => {
                console.log('[Simulator] Mock: api.on_client_connected fired');
                auto.execute();
              }, 10_000);
              automationTimersRef.current.push(timer);
            }
          }
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
        const active = msg.payload.status === 'ready';
        debug('sim', `bridge_status: ${msg.payload.status}`);
        bridgeActiveRef.current = active;
        if (active) {
          // Bridge just became ready — cancel any mock timers
          for (const t of automationTimersRef.current) clearTimeout(t);
          automationTimersRef.current = [];
          console.log('[Simulator] HA bridge ready — mock timers cancelled');
        }
        break;
      }

      case 'ha_command': {
        // Real HA command — apply to simulator state and fire automations
        const { entity_id, domain, action, data } = msg.payload;
        debug('sim', `ha_command: ${domain}.${action} → ${entity_id}`, data);

        // Fire on_client_connected automations when HA subscribes
        if (action === 'client_connected') {
          const result = loweringRef.current;
          if (result) {
            for (const auto of result.automations) {
              if (auto.trigger === 'api.on_client_connected') {
                auto.execute();
              }
            }
          }
        } else {
          // Apply state change from HA without firing the bridge hook
          // (avoids infinite loop back to HA)
          const p = providerRef.current;
          if (p) {
            p.applyRemoteService(domain, action, entity_id, data as Record<string, unknown> | undefined);
            flushAndRerender();
          }
        }
        break;
      }

      case 'ha_state_update': {
        // HA pushed a state change for an imported entity — update MockProvider
        const { entity_id, state, attribute } = msg.payload;
        debug('sim', `ha_state_update: ${entity_id} = ${state} (attr=${attribute})`);

        const p = providerRef.current;
        if (p) {
          if (attribute) {
            // Attribute-specific update (e.g. brightness)
            p.setEntityState(entity_id, { attributes: { [attribute]: state } });
          } else {
            // Main state update
            p.setEntityState(entity_id, { state });
          }
          flushAndRerender();
        }
        break;
      }
    }
    } // end for

    drainMessages();
  }, [messageQueue, send, drainMessages]);

  const getCurrentPageIndex = useCallback(
    () => loweringRef.current?.getCurrentPageIndex() ?? 0,
    [],
  );

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
    getCurrentPageIndex,
  };
}
