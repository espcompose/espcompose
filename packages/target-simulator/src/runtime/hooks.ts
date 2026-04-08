// ────────────────────────────────────────────────────────────────────────────
// Simulator hooks — JS-native replacements for SDK hooks
//
// @deprecated This module is the LEGACY hook-interception render path.
// The production simulator pipeline uses the IR-based renderer in
// backends/ir-renderer.ts which consumes SemanticIR directly.
//
// This module is retained for unit/integration tests that exercise
// individual hooks (useHAEntity, useMemo, useRef, useEffect) in
// isolation. It should NOT be used in the build pipeline.
//
// These functions mirror the SDK's hook API but are backed by the
// simulator's JS reactive runtime (Signal/Memo/Effect) and MockProvider.
// ────────────────────────────────────────────────────────────────────────────

import { Signal, Memo, Effect, Scheduler } from './signals';
import type { MockProvider } from '../providers/mock-provider';

// ── Global simulator context ─────────────────────────────────────────────────

let _provider: MockProvider | null = null;
let _hookPathActive = false;

/** Tracking stack for memo dependency collection — mirrors SDK's reactive-node.ts */
const trackingStack: TrackedDep[][] = [];

export interface TrackedDep {
  signal: Signal<unknown>;
  sourceId: string;
  sourceType: 'ha_entity' | 'theme' | 'ref' | 'local';
  property: string;
}

function startTracking(): void {
  trackingStack.push([]);
}

function stopTracking(): TrackedDep[] {
  return trackingStack.pop() ?? [];
}

function trackDep(dep: TrackedDep): void {
  if (trackingStack.length === 0) return;
  const frame = trackingStack[trackingStack.length - 1];
  if (!frame.some(d => d.signal === dep.signal)) {
    frame.push(dep);
  }
}

function isTracking(): boolean {
  return trackingStack.length > 0;
}

// ── Context setup / teardown ─────────────────────────────────────────────────

export function setSimulatorProvider(provider: MockProvider): void {
  _provider = provider;
}

export function getSimulatorProvider(): MockProvider {
  if (!_provider) throw new Error('Simulator provider not set. Call setSimulatorProvider() first.');
  return _provider;
}

export function enterHookScope(): void {
  _hookPathActive = true;
}

export function exitHookScope(): void {
  _hookPathActive = false;
}

function assertHookContext(name: string): void {
  if (!_hookPathActive) {
    throw new Error(`${name} must be called inside a component body (during simulator render).`);
  }
}

// ── Signal registry — shared signals for entity properties ───────────────────

interface EntitySignals {
  stateSignal: Signal<string>;
  attributeSignals: Map<string, Signal<unknown>>;
  /** Derived boolean signal: state === 'on' */
  isOnSignal: Signal<boolean>;
}

const entitySignalMap = new Map<string, EntitySignals>();

/** Reset the signal registry between renders. */
export function resetSignalRegistry(): void {
  entitySignalMap.clear();
  refCounter = 0;
  refMap.clear();
  imageCounter = 0;
  fontCounter = 0;
}

function getOrCreateEntitySignals(entityId: string): EntitySignals {
  let entry = entitySignalMap.get(entityId);
  if (entry) return entry;

  const provider = getSimulatorProvider();
  provider.ensureEntity(entityId);
  const state = provider.getEntityState(entityId);

  const stateSignal = new Signal<string>(state.state);
  const isOnSignal = new Signal<boolean>(state.state === 'on');
  const attributeSignals = new Map<string, Signal<unknown>>();

  for (const [key, val] of Object.entries(state.attributes)) {
    attributeSignals.set(key, new Signal<unknown>(val));
  }

  entry = { stateSignal, isOnSignal, attributeSignals };
  entitySignalMap.set(entityId, entry);

  // Subscribe to provider changes to update signals
  provider.onEntityChange(entityId, (newState) => {
    stateSignal.set(newState.state);
    isOnSignal.set(newState.state === 'on');
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

// ── useHAEntity() ────────────────────────────────────────────────────────────

interface SimBinding {
  [key: string]: unknown;
  __entityId__: string;
  __domain__: string;
}

/**
 * Simulator version of useHAEntity().
 * Returns a binding object with reactive properties backed by JS Signals.
 * Action methods (toggle, turnOn, turnOff) call through to the MockProvider.
 */
export function useHAEntity(entityId: string, _options?: { domain?: string }): unknown {
  assertHookContext('useHAEntity()');

  const domain = _options?.domain ?? entityId.split('.')[0] ?? 'unknown';
  const signals = getOrCreateEntitySignals(entityId);
  const provider = getSimulatorProvider();

  function createTrackedGetter<T>(signal: Signal<T>, sourceId: string, property: string): T {
    if (isTracking()) {
      trackDep({
        signal: signal as Signal<unknown>,
        sourceId,
        sourceType: 'ha_entity',
        property,
      });
    }
    return signal.get();
  }

  // Build domain-specific binding with tracking proxies
  const binding: SimBinding = {
    __entityId__: entityId,
    __domain__: domain,
  };

  // Create property descriptors for reactive getters
  switch (domain) {
    case 'light':
      Object.defineProperties(binding, {
        isOn: {
          get: () => createTrackedGetter(signals.isOnSignal, entityId, 'isOn'),
          enumerable: true,
        },
        brightness: {
          get: () => {
            let sig = signals.attributeSignals.get('brightness');
            if (!sig) {
              sig = new Signal<unknown>(0);
              signals.attributeSignals.set('brightness', sig);
            }
            if (isTracking()) {
              trackDep({ signal: sig, sourceId: entityId, sourceType: 'ha_entity', property: 'brightness' });
            }
            return sig.get() as number;
          },
          enumerable: true,
        },
        stateText: {
          get: () => createTrackedGetter(signals.stateSignal, entityId, 'stateText'),
          enumerable: true,
        },
      });
      binding.toggle = () => provider.callService('light', 'toggle', entityId);
      binding.turnOn = (params?: Record<string, unknown>) => provider.callService('light', 'turn_on', entityId, params);
      binding.turnOff = (params?: Record<string, unknown>) => provider.callService('light', 'turn_off', entityId, params);
      break;

    case 'switch':
      Object.defineProperties(binding, {
        isOn: {
          get: () => createTrackedGetter(signals.isOnSignal, entityId, 'isOn'),
          enumerable: true,
        },
      });
      binding.toggle = () => provider.callService('switch', 'toggle', entityId);
      binding.turnOn = () => provider.callService('switch', 'turn_on', entityId);
      binding.turnOff = () => provider.callService('switch', 'turn_off', entityId);
      break;

    case 'sensor':
    case 'number':
      Object.defineProperties(binding, {
        value: {
          get: () => {
            const raw = createTrackedGetter(signals.stateSignal, entityId, 'value');
            return Number(raw) || 0;
          },
          enumerable: true,
        },
        stateText: {
          get: () => createTrackedGetter(signals.stateSignal, entityId, 'stateText'),
          enumerable: true,
        },
      });
      break;

    case 'binary_sensor':
      Object.defineProperties(binding, {
        isOn: {
          get: () => createTrackedGetter(signals.isOnSignal, entityId, 'isOn'),
          enumerable: true,
        },
        stateText: {
          get: () => createTrackedGetter(signals.stateSignal, entityId, 'stateText'),
          enumerable: true,
        },
      });
      break;

    case 'cover':
      Object.defineProperties(binding, {
        isOpen: {
          get: () => {
            const state = createTrackedGetter(signals.stateSignal, entityId, 'isOpen');
            return state === 'open';
          },
          enumerable: true,
        },
      });
      binding.open = () => provider.callService('cover', 'open', entityId);
      binding.close = () => provider.callService('cover', 'close', entityId);
      binding.stop = () => provider.callService('cover', 'stop', entityId);
      break;

    default:
      // Fallback: binary_sensor-like
      Object.defineProperties(binding, {
        isOn: {
          get: () => createTrackedGetter(signals.isOnSignal, entityId, 'isOn'),
          enumerable: true,
        },
        stateText: {
          get: () => createTrackedGetter(signals.stateSignal, entityId, 'stateText'),
          enumerable: true,
        },
      });
      break;
  }

  return binding;
}

// ── useMemo() ────────────────────────────────────────────────────────────────

/**
 * Simulator version of useMemo().
 * Captures the closure and its dependencies, creating a JS Memo node
 * that re-evaluates when signals change.
 */
export function useMemo<T>(fn: () => T): T {
  assertHookContext('useMemo()');

  startTracking();
  const value = fn();
  const deps = stopTracking();

  if (deps.length === 0) {
    // Pure computation — no reactive dependencies
    return value;
  }

  // Create a Memo node backed by the JS reactive runtime
  const memo = new Memo<T>(fn, value);
  memo.wire(deps.map(d => d.signal));

  // Register for later wiring to effects
  _memoRegistry.push({ memo, deps });

  return value;
}

interface MemoRegistration<T = unknown> {
  memo: Memo<T>;
  deps: TrackedDep[];
}
const _memoRegistry: MemoRegistration[] = [];

export function getMemoRegistry(): MemoRegistration[] {
  return _memoRegistry;
}

export function clearMemoRegistry(): void {
  _memoRegistry.length = 0;
}

// ── useEffect() ──────────────────────────────────────────────────────────────

/**
 * Simulator version of useEffect().
 * Creates a JS Effect node wired to tracked dependency signals.
 */
export function useEffect(fn: () => void): void {
  assertHookContext('useEffect()');

  startTracking();
  fn();
  const deps = stopTracking();

  if (deps.length > 0) {
    const effect = new Effect(fn);
    effect.wire(deps.map(d => d.signal));
  }
}

// ── useRef() ─────────────────────────────────────────────────────────────────

let refCounter = 0;
const refMap = new Map<string, string>(); // token → element type (filled during render)

/**
 * Simulator version of useRef().
 * Returns a ref-like object with a generated ID and mock action methods.
 */
export function useRef<_T = unknown>(): SimRef {
  assertHookContext('useRef()');
  const token = `sim_ref_${refCounter++}`;
  return new SimRef(token);
}

export class SimRef {
  readonly _token: string;

  constructor(token: string) {
    this._token = token;
  }

  toString(): string {
    return this._token;
  }

  toJSON(): string {
    return this._token;
  }
}

export function registerSimRefTag(token: string, elementType: string): void {
  refMap.set(token, elementType);
}

// ── useScript() ──────────────────────────────────────────────────────────────

/**
 * Simulator version of useScript().
 * Returns a callable script handle that logs execution.
 */
export function useScript(fn: (() => void) | (() => Promise<void>)): SimScriptHandle {
  assertHookContext('useScript()');
  const id = `sim_script_${refCounter++}`;

  const handle = async function scriptHandle() {
    console.log(`[Simulator] script.execute: ${id}`);
    await fn();
  } as SimScriptHandle;

  Object.defineProperties(handle, {
    id: { value: id, enumerable: true },
    execute: { value: () => { console.log(`[Simulator] script.execute: ${id}`); fn(); }, enumerable: true },
    stop: { value: () => { console.log(`[Simulator] script.stop: ${id}`); }, enumerable: true },
    isRunning: { value: false, enumerable: true },
  });

  return handle;
}

export interface SimScriptHandle {
  (): Promise<void>;
  readonly id: string;
  execute(): void;
  stop(): void;
  readonly isRunning: boolean;
}

// ── useImage() ───────────────────────────────────────────────────────────────

let imageCounter = 0;

/**
 * Simulator version of useImage().
 * Returns a placeholder ref string (the simulator doesn't load actual images).
 */
export function useImage(_props: Record<string, unknown>): string {
  assertHookContext('useImage()');
  return `sim_image_${imageCounter++}`;
}

// ── useFont() ────────────────────────────────────────────────────────────────

let fontCounter = 0;

/**
 * Simulator version of useFont().
 * Returns a placeholder ref string.
 */
export function useFont(_props: Record<string, unknown>): string {
  assertHookContext('useFont()');
  return `sim_font_${fontCounter++}`;
}

// ── IRReactiveNode class reference ─────────────────────────────────────────────

let _IRReactiveNodeClass: (new (config: Record<string, unknown>) => unknown) | null = null;

/** Must be called once after loading the SDK module, before render. */
export function setIRReactiveNodeClass(cls: new (config: Record<string, unknown>) => unknown): void {
  _IRReactiveNodeClass = cls;
}

/** Get the IRReactiveNode class (used by the simulator render for mock nodes). */
export function getIRReactiveNodeClass(): (new (config: Record<string, unknown>) => unknown) | null {
  return _IRReactiveNodeClass;
}

// ── useTheme() ─────────────────────────────────────────────────────────────

/** Reference to SDK's getThemeRegistry, set during build setup. */
let _getThemeRegistry: (() => { getThemes(): Map<string, { values: Map<string, unknown> }> }) | null = null;

export function setGetThemeRegistry(fn: () => unknown): void {
  _getThemeRegistry = fn as typeof _getThemeRegistry;
}

/**
 * Simulator version of useTheme().
 *
 * Returns a deeply-nested proxy where leaf access returns either:
 * - The actual theme value (for the active/first theme) for static rendering
 * - A IRReactiveNode if needed for isIRReactiveNode checks
 *
 * Reads from the SDK's global theme registry (populated by ThemeProvider
 * during render) to get the first theme's flattened values.
 */
export function useTheme(): unknown {
  // Get flattened theme data from the SDK registry
  const flatValues = getActiveThemeValues();
  return createThemeProxy(flatValues, []);
}

function getActiveThemeValues(): Map<string, unknown> {
  if (!_getThemeRegistry) return new Map();
  try {
    const registry = _getThemeRegistry();
    const themes = registry.getThemes();
    if (themes.size === 0) return new Map();
    // Use the first registered theme
    const first = themes.values().next().value;
    if (!first?.values) return new Map();
    // Theme values are Record<string, {value, cppType}> with underscore keys
    const result = new Map<string, unknown>();
    const values = first.values as unknown as Record<string, { value: unknown }>;
    for (const [key, leaf] of Object.entries(values)) {
      result.set(key, leaf.value);
    }
    return result;
  } catch {
    return new Map();
  }
}

function createThemeProxy(flatValues: Map<string, unknown>, path: string[]): unknown {
  return new Proxy({} as Record<string, unknown>, {
    get(_target, prop) {
      if (typeof prop !== 'string') return undefined;
      // Build the underscore-delimited key matching flattenTheme output
      const currentPath = [...path, prop].join('_');

      // Check if this exact path is a leaf value in the flattened theme
      const leafValue = flatValues.get(currentPath);
      if (leafValue !== undefined) {
        return createMockReactiveLeaf(leafValue, [...path, prop]);
      }

      // Check if any path starts with currentPath + '_' (it's an intermediate)
      const prefix = currentPath + '_';
      for (const key of flatValues.keys()) {
        if (key.startsWith(prefix)) {
          return createThemeProxy(flatValues, [...path, prop]);
        }
      }

      // Not found — return a sub-proxy (for paths that may not exist yet)
      return createThemeProxy(flatValues, [...path, prop]);
    },
  });
}

function createMockReactiveLeaf(value: unknown, _path: string[]): unknown {
  if (_IRReactiveNodeClass) {
    const exprType = typeof value === 'number' ? 'int'
      : typeof value === 'boolean' ? 'bool'
      : typeof value === 'string' && (String(value).startsWith('0x') || String(value).startsWith('#')) ? 'color'
      : 'string';
    const node = new _IRReactiveNodeClass({
      kind: 'expression',
      dependencies: [],
      exprType,
      sourceId: '__theme__',
      sourceDomain: '__theme__',
    }) as Record<string, unknown>;
    // Override valueOf/get to return the real theme value for the simulator
    node._simValue = value;
    node.get = () => value;
    node.valueOf = () => value as object;
    node.toString = () => String(value);
    return node;
  }
  return {
    __reactive_node__: true,
    get: () => value,
    valueOf: () => value,
    toString: () => String(value),
  };
}

// ── Utility exports ──────────────────────────────────────────────────────────

export { startTracking, stopTracking, trackDep, isTracking };
export type { TrackedDep as SimTrackedDep };
