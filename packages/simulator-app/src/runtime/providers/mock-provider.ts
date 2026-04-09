// ────────────────────────────────────────────────────────────────────────────
// MockProvider — in-memory data provider for the simulator
//
// Provides simulated HA entity state that the simulator hooks read from.
// Entities are auto-registered during render and can be manipulated via
// the UI control panel or programmatically.
// ────────────────────────────────────────────────────────────────────────────

import type { DataProvider, EntityState } from '../types';
import { getEntityDomain } from '@espcompose/core/internals';

/** Default state for entities by domain. */
function defaultStateForDomain(domain: string): EntityState {
  const desc = getEntityDomain(domain);
  if (!desc) return { state: 'unknown', attributes: {}, domain };
  return { state: desc.defaultState, attributes: {}, domain };
}

export class MockProvider implements DataProvider {
  private entities = new Map<string, EntityState>();
  private listeners = new Map<string, Set<(state: EntityState) => void>>();
  /** Maps raw HA entity IDs (e.g. 'light.office') to generated IDs (e.g. 'ha_light_office'). */
  private entityAliases = new Map<string, string>();

  /** When true, callService skips local state effects — state comes from HA only. */
  bridgeMode = false;

  /** Optional callback invoked after every callService — used to forward to bridge. */
  onServiceCallHook?: (domain: string, action: string, entityId: string, data?: Record<string, unknown>) => void;

  /**
   * Register an alias so that service calls using a raw HA entity ID
   * (e.g. 'light.office') resolve to the generated ID used internally
   * (e.g. 'ha_light_office').
   */
  registerEntityAlias(rawId: string, generatedId: string): void {
    this.entityAliases.set(rawId, generatedId);
  }

  /** Resolve an entity ID through the alias map, falling back to the original ID. */
  private resolveEntityId(entityId: string): string {
    return this.entityAliases.get(entityId) ?? entityId;
  }

  /**
   * Ensure an entity exists with default state for its domain.
   * Called automatically during render when useHAEntity() registers entities.
   */
  ensureEntity(entityId: string): void {
    if (!this.entities.has(entityId)) {
      const domain = entityId.split('.')[0] ?? 'unknown';
      this.entities.set(entityId, defaultStateForDomain(domain));
    }
  }

  getEntityState(entityId: string): EntityState {
    this.ensureEntity(entityId);
    return this.entities.get(entityId)!;
  }

  setEntityState(entityId: string, partial: Partial<EntityState>): void {
    this.ensureEntity(entityId);
    const current = this.entities.get(entityId)!;
    const updated: EntityState = {
      state: partial.state ?? current.state,
      attributes: { ...current.attributes, ...partial.attributes },
      domain: current.domain,
    };
    this.entities.set(entityId, updated);
    this.notifyListeners(entityId, updated);
  }

  onEntityChange(entityId: string, cb: (state: EntityState) => void): () => void {
    if (!this.listeners.has(entityId)) {
      this.listeners.set(entityId, new Set());
    }
    this.listeners.get(entityId)!.add(cb);
    return () => {
      this.listeners.get(entityId)?.delete(cb);
    };
  }

  callService(domain: string, action: string, entityId: string, data?: Record<string, unknown>): void {
    // In bridge mode, skip local mock state — the real state comes from HA.
    if (!this.bridgeMode) {
      // Resolve raw HA entity IDs (e.g. 'light.office') to generated IDs
      // (e.g. 'ha_light_office') so the state update reaches the correct
      // entity signals.
      this._applyServiceEffect(domain, action, this.resolveEntityId(entityId), data);
    }

    // Notify hook with the raw entity ID (bridge forwarding needs the
    // original HA entity ID, not the generated one).
    this.onServiceCallHook?.(domain, action, entityId, data);
  }

  /**
   * Apply a service call's state effect coming from the remote HA bridge.
   * Updates local state so the UI reflects the change, but does NOT fire the
   * bridge hook (would cause an infinite loop back to HA).
   */
  applyRemoteService(domain: string, action: string, entityId: string, data?: Record<string, unknown>): void {
    this._applyServiceEffect(domain, action, entityId, data);
  }

  /** Apply common state effects for well-known service calls. */
  private _applyServiceEffect(domain: string, action: string, entityId: string, data?: Record<string, unknown>): void {
    const desc = getEntityDomain(domain);
    if (!desc) {
      console.error(`[MockProvider] Unknown entity domain '${domain}' for service call: ${domain}.${action}(${entityId})`);
      return;
    }

    const actionDesc = desc.actions.find(a => a.service === action);
    if (!actionDesc) {
      console.error(`[MockProvider] Unknown action '${action}' for domain '${domain}': ${domain}.${action}(${entityId})`);
      return;
    }

    // Toggle actions: flip between active and default state
    if (actionDesc.resultState === null && desc.activeState !== null) {
      const current = this.getEntityState(entityId);
      const newState = current.state === desc.activeState ? desc.defaultState : desc.activeState;
      const attrs: Record<string, unknown> = { ...current.attributes };
      // Apply default attributes when transitioning to active
      if (newState === desc.activeState && actionDesc.defaultAttributes) {
        for (const [k, v] of Object.entries(actionDesc.defaultAttributes)) {
          attrs[k] = data?.[k] ?? attrs[k] ?? v;
        }
      }
      this.setEntityState(entityId, { state: newState, attributes: attrs });
      return;
    }

    // Explicit result state actions
    if (actionDesc.resultState !== null) {
      const attrs: Record<string, unknown> = {};
      // Apply any data overrides (e.g. brightness for light.turn_on)
      if (data) {
        for (const [k, v] of Object.entries(data)) {
          if (v != null) attrs[k] = v;
        }
      }
      this.setEntityState(entityId, { state: actionDesc.resultState, attributes: attrs });
      return;
    }

    // Fallback for actions with no result state and no active state (e.g. button.press)
    console.log(`[MockProvider] service call: ${domain}.${action}(${entityId})`, data ?? '');
  }

  /** Get all registered entity IDs. */
  getEntityIds(): string[] {
    return Array.from(this.entities.keys());
  }

  /** Reset all entities to default state. */
  reset(): void {
    for (const [entityId, entity] of this.entities) {
      this.entities.set(entityId, defaultStateForDomain(entity.domain));
      this.notifyListeners(entityId, this.entities.get(entityId)!);
    }
  }

  private notifyListeners(entityId: string, state: EntityState): void {
    const cbs = this.listeners.get(entityId);
    if (cbs) {
      for (const cb of cbs) {
        cb(state);
      }
    }
  }
}
