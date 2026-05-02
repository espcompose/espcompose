export { generateCoreEntityDomains } from './core-entity-domains.js';
export { generateCoreEntityTriggers } from './core-entity-triggers.js';
export { generateEsphomeTargetComponentAccess } from './esphome-target-component-access.js';
export { generateEsphomeTargetSensorPlatforms } from './esphome-target-sensor-platforms.js';

import type { GeneratorResult, DomainMap } from './types.js';
import { generateCoreEntityDomains } from './core-entity-domains.js';
import { generateCoreEntityTriggers } from './core-entity-triggers.js';
import { generateEsphomeTargetComponentAccess } from './esphome-target-component-access.js';
import { generateEsphomeTargetSensorPlatforms } from './esphome-target-sensor-platforms.js';

export type { GeneratorResult, DomainMap };

/** All generators, in execution order. */
export const generators: Array<(domains: DomainMap, repoRoot: string) => GeneratorResult> = [
  generateCoreEntityDomains,
  generateCoreEntityTriggers,
  generateEsphomeTargetComponentAccess,
  generateEsphomeTargetSensorPlatforms,
];
