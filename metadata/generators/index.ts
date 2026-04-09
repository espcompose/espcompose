export { generateCoreEntityDomains } from './core-entity-domains.js';
export { generateCoreEntityTriggers } from './core-entity-triggers.js';
export { generateBridgeEntityDomains } from './bridge-entity-domains.js';

import type { GeneratorResult, DomainMap } from './types.js';
import { generateCoreEntityDomains } from './core-entity-domains.js';
import { generateCoreEntityTriggers } from './core-entity-triggers.js';
import { generateBridgeEntityDomains } from './bridge-entity-domains.js';

export type { GeneratorResult, DomainMap };

/** All generators, in execution order. */
export const generators: Array<(domains: DomainMap, repoRoot: string) => GeneratorResult> = [
  generateCoreEntityDomains,
  generateCoreEntityTriggers,
  generateBridgeEntityDomains,
];
