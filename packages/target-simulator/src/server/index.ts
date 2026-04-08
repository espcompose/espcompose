// Server module barrel export
export { startDevServer, type DevServer, type DevServerOptions } from './dev-server';
export { startFileWatcher, type FileWatcher, type FileWatcherOptions } from './file-watcher';
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
} from './ws-protocol';
