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
export { lowerToSimulator, type LoweringResult, type AutomationTrigger } from './backends/ir-renderer';
export { entityIdToGeneratedId } from './backends/ir-renderer/lowering-context';
export { domainFromEntityId } from './backends/ir-renderer/entity-registry';

export type {
  RuntimeNode,
  RuntimeProp,
  StaticProp,
  ReactiveProp,
  ActionProp,
  RefProp,
  ActionStep,
  EntityState,
} from './types';

export { Signal, Memo, Effect, Scheduler } from './runtime/signals';
export { EntityStore } from './entity-store';
export { lvglPropsToStyle, lvglColorToCss, getStaticValue } from './renderer/lvgl-styles';
export { generateThemeStyleBlock, themePathToCssVar } from './renderer/theme-css';
export { extractDisplayConfig, type DisplayConfig } from './extract-display-config';