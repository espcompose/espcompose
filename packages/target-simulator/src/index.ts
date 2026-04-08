// ────────────────────────────────────────────────────────────────────────────
// @espcompose/target-simulator — Browser-based LVGL UI preview
// ────────────────────────────────────────────────────────────────────────────

// ComposeTarget implementation (static HTML export path)
export { createSimulatorTarget, type SimulatorTargetOptions } from './target';
export { simulatorBuildFromIR, type SimulatorBuildResult } from './build';

// Dev server (live reload path)
export { startDevServer, type DevServer, type DevServerOptions } from './server/dev-server';
export { startFileWatcher, type FileWatcher, type FileWatcherOptions } from './server/file-watcher';
