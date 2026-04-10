import { Signal, Scheduler } from '../../runtime/signals';
import type { EntityStore } from '../../entity-store';
import { getEntityDomain } from '@espcompose/core/internals';

export interface EntitySignals {
  stateSignal: Signal<string>;
  isOnSignal: Signal<boolean>;
  attributeSignals: Map<string, Signal<unknown>>;
}

/** Extract the HA domain from an entity ID (raw or generated).
 *  Raw:       'light.office'      → 'light'
 *  Generated: 'ha_light_office'   → 'light'
 */
export function domainFromEntityId(entityId: string): string {
  if (entityId.includes('.')) return entityId.split('.')[0] ?? '';
  if (entityId.startsWith('ha_')) return entityId.slice(3).split('_')[0] ?? '';
  return '';
}

/** Determine active state for an entity based on its domain descriptor. */
function isActiveState(entityId: string, stateStr: string): boolean {
  const domain = domainFromEntityId(entityId);
  const desc = getEntityDomain(domain);
  // Unknown domain or domain with no active state concept → never "active"
  if (!desc?.activeState) return false;
  return stateStr === desc.activeState;
}

export class EntitySignalRegistry {
  private entitySignals = new Map<string, EntitySignals>();
  private entityStore: EntityStore;

  constructor(entityStore: EntityStore) {
    this.entityStore = entityStore;
  }

  getOrCreate(entityId: string): EntitySignals {
    let entry = this.entitySignals.get(entityId);
    if (entry) return entry;

    this.entityStore.ensureEntity(entityId);
    const state = this.entityStore.getEntityState(entityId);

    const stateSignal = new Signal<string>(state.state);
    const isOnSignal = new Signal<boolean>(isActiveState(entityId, state.state));
    const attributeSignals = new Map<string, Signal<unknown>>();

    for (const [key, val] of Object.entries(state.attributes)) {
      attributeSignals.set(key, new Signal<unknown>(val));
    }

    entry = { stateSignal, isOnSignal, attributeSignals };
    this.entitySignals.set(entityId, entry);

    // Subscribe to entity store changes
    this.entityStore.onEntityChange(entityId, (newState) => {
      stateSignal.set(newState.state);
      isOnSignal.set(isActiveState(entityId, newState.state));
      for (const [key, val] of Object.entries(newState.attributes)) {
        let attrSig = attributeSignals.get(key);
        if (!attrSig) {
          attrSig = new Signal<unknown>(val);
          attributeSignals.set(key, attrSig);
        } else {
          attrSig.set(val);
        }
      }
      Scheduler.instance().flush();
    });

    return entry;
  }
}
