// AUTO-GENERATED — DO NOT EDIT. Source: metadata/entity-domains.json

/* eslint-disable */

import type { ExprType } from '@espcompose/core/internals';

// ── Types ────────────────────────────────────────────────────────────────────

export type SensorPlatform = 'binary_sensor' | 'sensor' | 'text_sensor';

// ── Domain → platform mapping ────────────────────────────────────────────────

export const DOMAIN_SENSOR_PLATFORMS: Readonly<Record<string, SensorPlatform>> = {
  light: "binary_sensor",
  switch: "binary_sensor",
  sensor: "sensor",
  binary_sensor: "binary_sensor",
  fan: "binary_sensor",
  cover: "binary_sensor",
  number: "sensor",
  select: "text_sensor",
  text_sensor: "text_sensor",
  button: "binary_sensor",
  lock: "binary_sensor",
  climate: "binary_sensor",
};

export function getDomainSensorType(domain: string): SensorPlatform {
  const platform = DOMAIN_SENSOR_PLATFORMS[domain];
  if (!platform) throw new Error(`Unknown entity domain: ${domain}`);
  return platform;
}

/** Derive the ESPHome sensor platform from an expression type. */
export function exprTypeToPlatform(exprType: ExprType): SensorPlatform {
  switch (exprType) {
    case 'float': return 'sensor';
    case 'bool': return 'binary_sensor';
    case 'string': return 'text_sensor';
    default: throw new Error(`Cannot derive sensor platform from ExprType '${exprType}'`);
  }
}
