export {
  IRReactiveNode,
  isIRReactiveNode,
  startTracking,
  stopTracking,
  trackDependency,
  isTracking,
} from './node';
export type { Signal, IRReactiveNodeKind, IRDependency, IRReactiveNodeConfig } from './node';

export { useReactive, useReactiveMap, reactiveIsNaN } from './utils';
export type { Reactive, WidgetProps, WidgetPropsWithChildren } from './utils';

export { REACTIVE_PROPERTY_MAP } from './properties';
export type {
  InferReactiveProperties,
  SensorReactiveProps,
  BinarySensorReactiveProps,
  LightReactiveProps,
  SwitchReactiveProps,
  FanReactiveProps,
  CoverReactiveProps,
  ReactivePropertyConfig,
} from './properties';

export { __espcompose } from './compiler-plumbing';
