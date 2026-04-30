// AUTO-GENERATED — DO NOT EDIT. Source: metadata/entity-domains.json

/* eslint-disable */

import type { IRType } from '../ir/types.js';

// ── Types ────────────────────────────────────────────────────────────────────

export type ExprType = 'bool' | 'float' | 'string';
export type UICategory = 'toggleable' | 'sensor' | 'binary' | 'cover' | 'button';

export interface EntityPropertyDescriptor {
  readonly name: string;
  readonly propertyKey: string;
  readonly exprType: ExprType;
  readonly sourceDomain: string;
}

export interface EntityActionDescriptor {
  readonly name: string;
  readonly service: string;
  readonly resultState: string | null;
  readonly defaultAttributes: Readonly<Record<string, unknown>> | null;
}

export interface EntityDomainDescriptor {
  readonly domain: string;
  readonly valueType: IRType;
  readonly defaultState: string;
  readonly activeState: string | null;
  readonly uiCategory: UICategory;
  readonly properties: readonly EntityPropertyDescriptor[];
  readonly actions: readonly EntityActionDescriptor[];
}

export interface ReactivePropertyConfig {
  readonly propertyKey: string;
  readonly sourceDomain: string;
  readonly exprType: ExprType;
}

// ── Domain registry ──────────────────────────────────────────────────────────

export const ENTITY_DOMAINS: Readonly<Record<string, EntityDomainDescriptor>> = {
  light: {
    domain: "light",
    valueType: {"kind":"type","type":"bool"},
    defaultState: "off",
    activeState: "on",
    uiCategory: "toggleable",
    properties: [
      { name: "isOn", propertyKey: "state", exprType: "bool", sourceDomain: "binary_sensor" },
      { name: "brightness", propertyKey: "brightness", exprType: "float", sourceDomain: "light" },
      { name: "stateText", propertyKey: "state", exprType: "string", sourceDomain: "text_sensor" },
    ],
    actions: [
      { name: "toggle", service: "toggle", resultState: null, defaultAttributes: null },
      { name: "turnOn", service: "turn_on", resultState: "on", defaultAttributes: {"brightness":255} },
      { name: "turnOff", service: "turn_off", resultState: "off", defaultAttributes: null },
    ],
  },
  switch: {
    domain: "switch",
    valueType: {"kind":"type","type":"bool"},
    defaultState: "off",
    activeState: "on",
    uiCategory: "toggleable",
    properties: [
      { name: "isOn", propertyKey: "state", exprType: "bool", sourceDomain: "binary_sensor" },
    ],
    actions: [
      { name: "toggle", service: "toggle", resultState: null, defaultAttributes: null },
      { name: "turnOn", service: "turn_on", resultState: "on", defaultAttributes: null },
      { name: "turnOff", service: "turn_off", resultState: "off", defaultAttributes: null },
    ],
  },
  sensor: {
    domain: "sensor",
    valueType: {"kind":"type","type":"float"},
    defaultState: "0",
    activeState: null,
    uiCategory: "sensor",
    properties: [
      { name: "value", propertyKey: "state", exprType: "float", sourceDomain: "sensor" },
      { name: "stateText", propertyKey: "state", exprType: "string", sourceDomain: "text_sensor" },
    ],
    actions: [
    ],
  },
  binary_sensor: {
    domain: "binary_sensor",
    valueType: {"kind":"type","type":"bool"},
    defaultState: "off",
    activeState: "on",
    uiCategory: "binary",
    properties: [
      { name: "isOn", propertyKey: "state", exprType: "bool", sourceDomain: "binary_sensor" },
      { name: "stateText", propertyKey: "state", exprType: "string", sourceDomain: "text_sensor" },
    ],
    actions: [
    ],
  },
  fan: {
    domain: "fan",
    valueType: {"kind":"type","type":"bool"},
    defaultState: "off",
    activeState: "on",
    uiCategory: "toggleable",
    properties: [
      { name: "isOn", propertyKey: "state", exprType: "bool", sourceDomain: "binary_sensor" },
    ],
    actions: [
      { name: "toggle", service: "toggle", resultState: null, defaultAttributes: null },
      { name: "turnOn", service: "turn_on", resultState: "on", defaultAttributes: null },
      { name: "turnOff", service: "turn_off", resultState: "off", defaultAttributes: null },
    ],
  },
  cover: {
    domain: "cover",
    valueType: {"kind":"type","type":"bool"},
    defaultState: "closed",
    activeState: "open",
    uiCategory: "cover",
    properties: [
      { name: "isOpen", propertyKey: "position", exprType: "float", sourceDomain: "cover" },
    ],
    actions: [
      { name: "open", service: "open", resultState: "open", defaultAttributes: null },
      { name: "close", service: "close", resultState: "closed", defaultAttributes: null },
      { name: "stop", service: "stop", resultState: null, defaultAttributes: null },
    ],
  },
  number: {
    domain: "number",
    valueType: {"kind":"type","type":"float"},
    defaultState: "0",
    activeState: null,
    uiCategory: "sensor",
    properties: [
      { name: "value", propertyKey: "state", exprType: "float", sourceDomain: "sensor" },
    ],
    actions: [
    ],
  },
  select: {
    domain: "select",
    valueType: {"kind":"type","type":"string"},
    defaultState: "",
    activeState: null,
    uiCategory: "sensor",
    properties: [
      { name: "stateText", propertyKey: "state", exprType: "string", sourceDomain: "text_sensor" },
    ],
    actions: [
    ],
  },
  text_sensor: {
    domain: "text_sensor",
    valueType: {"kind":"type","type":"string"},
    defaultState: "",
    activeState: null,
    uiCategory: "sensor",
    properties: [
      { name: "stateText", propertyKey: "state", exprType: "string", sourceDomain: "text_sensor" },
    ],
    actions: [
    ],
  },
  button: {
    domain: "button",
    valueType: {"kind":"type","type":"bool"},
    defaultState: "",
    activeState: null,
    uiCategory: "button",
    properties: [
    ],
    actions: [
      { name: "press", service: "press", resultState: null, defaultAttributes: null },
    ],
  },
  lock: {
    domain: "lock",
    valueType: {"kind":"type","type":"bool"},
    defaultState: "locked",
    activeState: "unlocked",
    uiCategory: "toggleable",
    properties: [
      { name: "isOn", propertyKey: "state", exprType: "bool", sourceDomain: "binary_sensor" },
    ],
    actions: [
      { name: "lock", service: "lock", resultState: "locked", defaultAttributes: null },
      { name: "unlock", service: "unlock", resultState: "unlocked", defaultAttributes: null },
    ],
  },
  climate: {
    domain: "climate",
    valueType: {"kind":"type","type":"bool"},
    defaultState: "off",
    activeState: null,
    uiCategory: "sensor",
    properties: [
    ],
    actions: [
    ],
  },
};

// ── Derived helpers ──────────────────────────────────────────────────────────

export type EntityDomainName = keyof typeof ENTITY_DOMAINS;

export const KNOWN_DOMAIN_NAMES: ReadonlySet<string> = new Set(Object.keys(ENTITY_DOMAINS));

export function getEntityDomain(domain: string): EntityDomainDescriptor | undefined {
  return ENTITY_DOMAINS[domain];
}

export function isKnownDomain(domain: string): boolean {
  return domain in ENTITY_DOMAINS;
}

export function defaultStateForDomain(domain: string): string {
  const desc = ENTITY_DOMAINS[domain];
  if (!desc) throw new Error(`Unknown entity domain: ${domain}`);
  return desc.defaultState;
}

// ── Reactive property map (flattened from domain properties) ─────────────────

export const REACTIVE_PROPERTY_MAP: Readonly<Record<string, ReactivePropertyConfig>> = {
  isOn: { propertyKey: "state", sourceDomain: "binary_sensor", exprType: "bool" },
  brightness: { propertyKey: "brightness", sourceDomain: "light", exprType: "float" },
  stateText: { propertyKey: "state", sourceDomain: "text_sensor", exprType: "string" },
  value: { propertyKey: "state", sourceDomain: "sensor", exprType: "float" },
  isOpen: { propertyKey: "position", sourceDomain: "cover", exprType: "float" },
};
