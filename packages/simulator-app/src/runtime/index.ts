// Frontend-owned simulator runtime exports.

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

export { exprToJs, type JsLoweringContext } from './backends/expr-to-js';
export { lowerToSimulator } from './backends/ir-renderer';

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

export { Signal, Memo, Effect, Scheduler } from './runtime/signals';
export { MockProvider } from './providers/mock-provider';
export { lvglPropsToStyle, lvglColorToCss, getStaticValue, escapeHtml } from './renderer/lvgl-styles';
export { generateThemeStyleBlock, generateThemeSwitchScript, themePathToCssVar } from './renderer/theme-css';
export { extractDisplayConfig, type DisplayConfig } from './extract-display-config';