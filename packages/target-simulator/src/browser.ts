// ────────────────────────────────────────────────────────────────────────────
// @espcompose/target-simulator/browser — Browser-safe exports only
//
// This entry point contains NO Node.js built-in imports (fs, http, path, etc.)
// and is safe to bundle with Vite/Rollup for browser consumption.
// The simulator React app should import from this entry point.
// ────────────────────────────────────────────────────────────────────────────

// WS protocol types (shared between server and React app)
export {
  type ServerMessage,
  type ClientMessage,
  type ConnectedMessage,
  type IRUpdateMessage,
  type BuildStartMessage,
  type BuildErrorMessage,
  type ReadyMessage,
  isServerMessage,
  isClientMessage,
  encodeServerMessage,
  encodeClientMessage,
  parseMessage,
} from './server/ws-protocol';

// IR lowering (used by the React app to convert SemanticIR → RuntimeNode[])
export { lowerToSimulator } from './backends/ir-renderer';

// Runtime types (used by the React app for widget rendering)
export type {
  RuntimeNode,
  RuntimeProp,
  StaticProp,
  ReactiveProp,
  ActionProp,
  RefProp,
  ActionStep,
  DataProvider,
  EntityState,
} from './types';

// Runtime (used by the React app for reactive updates)
export { Signal, Memo, Effect, Scheduler } from './runtime/signals';

// Mock provider (used by the React app for entity simulation)
export { MockProvider } from './providers/mock-provider';

// Style utilities (used by the React app widget renderer)
export { lvglPropsToStyle, lvglColorToCss, getStaticValue, escapeHtml } from './renderer/lvgl-styles';

// Theme CSS generation (used by the React app for theme injection)
export { generateThemeStyleBlock, generateThemeSwitchScript, themePathToCssVar } from './renderer/theme-css';
