// ────────────────────────────────────────────────────────────────────────────
// MockProvider — in-memory data provider for the simulator
//
// Provides simulated HA entity state that the simulator hooks read from.
// Entities are auto-registered during render and can be manipulated via
// the UI control panel or programmatically.
// ────────────────────────────────────────────────────────────────────────────

import type { DataProvider, EntityState } from '../types';

/** Default state for entities by domain. */
function defaultStateForDomain(domain: string): EntityState {
  switch (domain) {
    case 'light':
    case 'switch':
    case 'fan':
      return { state: 'off', attributes: { brightness: 0 }, domain };
    case 'cover':
      return { state: 'closed', attributes: {}, domain };
    case 'sensor':
    case 'number':
      return { state: '0', attributes: { unit_of_measurement: '' }, domain };
    case 'binary_sensor':
      return { state: 'off', attributes: {}, domain };
    default:
      return { state: 'unknown', attributes: {}, domain };
  }
}

export class MockProvider implements DataProvider {
  private entities = new Map<string, EntityState>();
  private listeners = new Map<string, Set<(state: EntityState) => void>>();

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
    // Apply common state effects for well-known actions
    const fullAction = `${domain}.${action}`;
    switch (fullAction) {
      case 'light.toggle':
      case 'switch.toggle':
      case 'fan.toggle': {
        const current = this.getEntityState(entityId);
        const newState = current.state === 'on' ? 'off' : 'on';
        const attrs: Record<string, unknown> = { ...current.attributes };
        if (domain === 'light' && newState === 'on') {
          attrs.brightness = data?.brightness ?? attrs.brightness ?? 255;
        }
        this.setEntityState(entityId, { state: newState, attributes: attrs });
        break;
      }
      case 'light.turn_on':
      case 'switch.turn_on':
      case 'fan.turn_on': {
        const attrs: Record<string, unknown> = {};
        if (data?.brightness != null) attrs.brightness = data.brightness;
        this.setEntityState(entityId, { state: 'on', attributes: attrs });
        break;
      }
      case 'light.turn_off':
      case 'switch.turn_off':
      case 'fan.turn_off':
        this.setEntityState(entityId, { state: 'off' });
        break;
      case 'cover.open':
        this.setEntityState(entityId, { state: 'open' });
        break;
      case 'cover.close':
        this.setEntityState(entityId, { state: 'closed' });
        break;
      case 'cover.stop':
        this.setEntityState(entityId, { state: 'stopped' });
        break;
      default:
        // Unknown action — log but don't crash
        console.log(`[MockProvider] service call: ${fullAction}(${entityId})`, data ?? '');
        break;
    }
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
