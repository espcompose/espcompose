export type {
  IRRoot,
  IRSection,
  IRValue,
  IRScalar,
  IRObject,
  IRArray,
  IRLambda,
  IRNull,
  IREntry,
} from './types.js';

export {
  irRoot,
  irSection,
  irScalar,
  irObject,
  irArray,
  irLambda,
  irNull,
  irEntry,
  isIRScalar,
  isIRObject,
  isIRArray,
  isIRLambda,
  isIRNull,
} from './types.js';

export { buildIR, configValueToIR } from './build-ir.js';
export { lowerIR, irValueToConfig } from './lower-ir.js';
