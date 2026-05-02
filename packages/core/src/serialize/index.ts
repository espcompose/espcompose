export {
  Fragment,
  flattenFragments,
  extractElementProps,
  transformPropKeys,
  compactObject,
  transformElementType,
  serializeValue,
  serializeValuesPreservingKeys,
  startSerializationCapture,
  stopSerializationCapture,
  createLambdaScalar,
  setCurrentSource,
  resolveRefBindingsInActions,
} from './capture';
export type { SerializationCaptures } from './capture';

export { LambdaMarker, SecretMarker, QuotedMarker, isSerializeMarker } from './markers';

export { secret, SecretValue, isSecretValue, getSecrets, clearSecrets } from './secret';

export { registerRefTag, getRefTag, clearRefRegistry } from './ref-registry';
