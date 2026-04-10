// ────────────────────────────────────────────────────────────────────────────
// EntityStore — reactive entity state store for the simulator frontend
//
// Pure state store with no domain logic. Receives state updates from the
// server (via ha_command / ha_state_update WS messages) and notifies
// Signal subscribers so the UI re-renders.
// ────────────────────────────────────────────────────────────────────────────

export interface EntityState {
  state: string;
  attributes: Record<string, unknown>;
  domain: string;
  /** The ESPHome sensor platform type (binary_sensor, sensor, text_sensor). */
  sensorType?: 'binary_sensor' | 'sensor' | 'text_sensor';
}

/** Default state for an entity based on its domain prefix. */
function defaultState(domain: string): EntityState {
  return { state: '', attributes: {}, domain };
}

export class EntityStore {
  private entities = new Map<string, EntityState>();
  private listeners = new Map<string, Set<(state: EntityState) => void>>();

  /** Ensure an entity exists. If not, creates it with a default state. */
  ensureEntity(entityId: string, meta?: { domain?: string; sensorType?: EntityState['sensorType'] }): void {
    if (!this.entities.has(entityId)) {
      const domain = meta?.domain ?? (entityId.includes('.') ? entityId.split('.')[0] : 'unknown');
      const state = defaultState(domain);
      if (meta?.sensorType) state.sensorType = meta.sensorType;
      this.entities.set(entityId, state);
    } else if (meta?.sensorType) {
      const existing = this.entities.get(entityId)!;
      if (!existing.sensorType) {
        existing.sensorType = meta.sensorType;
      }
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

  /** Get all registered entity IDs. */
  getEntityIds(): string[] {
    return Array.from(this.entities.keys());
  }

  /** Reset all entities to default state. */
  reset(): void {
    for (const [entityId, entity] of this.entities) {
      const resetState = defaultState(entity.domain);
      this.entities.set(entityId, resetState);
      this.notifyListeners(entityId, resetState);
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
