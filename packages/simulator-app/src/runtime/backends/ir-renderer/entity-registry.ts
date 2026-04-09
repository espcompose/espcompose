import { Signal, Scheduler } from '../../runtime/signals';
import type { MockProvider } from '../../providers/mock-provider';
import { getEntityDomain } from '@espcompose/core/internals';

export interface EntitySignals {
  stateSignal: Signal<string>;
  isOnSignal: Signal<boolean>;
  attributeSignals: Map<string, Signal<unknown>>;
}

/** Determine active state for an entity based on its domain descriptor. */
function isActiveState(entityId: string, stateStr: string): boolean {
  const domain = entityId.split('.')[0] ?? '';
  const desc = getEntityDomain(domain);
  // Unknown domain or domain with no active state concept → never "active"
  if (!desc?.activeState) return false;
  return stateStr === desc.activeState;
}

export class EntitySignalRegistry {
  private entitySignals = new Map<string, EntitySignals>();
  private provider: MockProvider;

  constructor(provider: MockProvider) {
    this.provider = provider;
  }

  getOrCreate(entityId: string): EntitySignals {
    let entry = this.entitySignals.get(entityId);
    if (entry) return entry;

    this.provider.ensureEntity(entityId);
    const state = this.provider.getEntityState(entityId);

    const stateSignal = new Signal<string>(state.state);
    const isOnSignal = new Signal<boolean>(isActiveState(entityId, state.state));
    const attributeSignals = new Map<string, Signal<unknown>>();

    for (const [key, val] of Object.entries(state.attributes)) {
      attributeSignals.set(key, new Signal<unknown>(val));
    }

    entry = { stateSignal, isOnSignal, attributeSignals };
    this.entitySignals.set(entityId, entry);

    // Subscribe to provider changes
    this.provider.onEntityChange(entityId, (newState) => {
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
