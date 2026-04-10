// ────────────────────────────────────────────────────────────────────────────
// @espcompose/simulator-target — Browser-based LVGL UI preview
// ────────────────────────────────────────────────────────────────────────────

// Dev server (live reload path)
export { startDevServer, type DevServer, type DevServerOptions } from './server/dev-server';
export { startFileWatcher, type FileWatcher, type FileWatcherOptions } from './server/file-watcher';

// Bridge (HA integration)
export { createBridgeManager, type BridgeManager, type BridgeManagerOptions, type BridgeStatus } from './server/bridge-manager';
export { createMockBridge } from './server/mock-bridge';
export type {
  EntityDefinition,
  HAEntityImport,
  NodeToBridgeMessage,
  BridgeToNodeMessage,
  DefineNodeMessage,
  EntityStateUpdateMessage,
  BatchEntityStateUpdateMessage,
  BridgeReadyMessage,
  EntityCommandMessage,
  BridgeErrorMessage,
} from './server/bridge-protocol';
