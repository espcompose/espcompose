// AUTO-GENERATED — DO NOT EDIT. Source: metadata/entity-domains.json

/* eslint-disable */

// ── Types ────────────────────────────────────────────────────────────────────

export type SensorPlatform = 'binary_sensor' | 'sensor' | 'text_sensor';
export type ExprType = 'bool' | 'float' | 'string';
export type UICategory = 'toggleable' | 'sensor' | 'binary' | 'cover' | 'button';

export interface EntityPropertyDescriptor {
  readonly name: string;
  readonly cppPath: string;
  readonly triggerType: string;
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
  readonly sensorPlatform: SensorPlatform;
  readonly cppType: string;
  readonly defaultState: string;
  readonly activeState: string | null;
  readonly uiCategory: UICategory;
  readonly properties: readonly EntityPropertyDescriptor[];
  readonly actions: readonly EntityActionDescriptor[];
}

export interface ReactivePropertyConfig {
  readonly property: string;
  readonly triggerType: string;
  readonly sourceDomain: string;
  readonly exprType: ExprType;
}

// ── Domain registry ──────────────────────────────────────────────────────────

export const ENTITY_DOMAINS: Readonly<Record<string, EntityDomainDescriptor>> = {
  light: {
    domain: "light",
    sensorPlatform: "binary_sensor",
    cppType: "bool",
    defaultState: "off",
    activeState: "on",
    uiCategory: "toggleable",
    properties: [
      { name: "isOn", cppPath: ".state", triggerType: "on_state", exprType: "bool", sourceDomain: "binary_sensor" },
      { name: "brightness", cppPath: ".current_values.get_brightness()", triggerType: "on_state", exprType: "float", sourceDomain: "light" },
      { name: "stateText", cppPath: ".state", triggerType: "on_state", exprType: "string", sourceDomain: "text_sensor" },
    ],
    actions: [
      { name: "toggle", service: "toggle", resultState: null, defaultAttributes: null },
      { name: "turnOn", service: "turn_on", resultState: "on", defaultAttributes: {"brightness":255} },
      { name: "turnOff", service: "turn_off", resultState: "off", defaultAttributes: null },
    ],
  },
  switch: {
    domain: "switch",
    sensorPlatform: "binary_sensor",
    cppType: "bool",
    defaultState: "off",
    activeState: "on",
    uiCategory: "toggleable",
    properties: [
      { name: "isOn", cppPath: ".state", triggerType: "on_state", exprType: "bool", sourceDomain: "binary_sensor" },
    ],
    actions: [
      { name: "toggle", service: "toggle", resultState: null, defaultAttributes: null },
      { name: "turnOn", service: "turn_on", resultState: "on", defaultAttributes: null },
      { name: "turnOff", service: "turn_off", resultState: "off", defaultAttributes: null },
    ],
  },
  sensor: {
    domain: "sensor",
    sensorPlatform: "sensor",
    cppType: "float",
    defaultState: "0",
    activeState: null,
    uiCategory: "sensor",
    properties: [
      { name: "value", cppPath: ".state", triggerType: "on_value", exprType: "float", sourceDomain: "sensor" },
      { name: "stateText", cppPath: ".state", triggerType: "on_value", exprType: "string", sourceDomain: "text_sensor" },
    ],
    actions: [
    ],
  },
  binary_sensor: {
    domain: "binary_sensor",
    sensorPlatform: "binary_sensor",
    cppType: "bool",
    defaultState: "off",
    activeState: "on",
    uiCategory: "binary",
    properties: [
      { name: "isOn", cppPath: ".state", triggerType: "on_state", exprType: "bool", sourceDomain: "binary_sensor" },
      { name: "stateText", cppPath: ".state", triggerType: "on_state", exprType: "string", sourceDomain: "text_sensor" },
    ],
    actions: [
    ],
  },
  fan: {
    domain: "fan",
    sensorPlatform: "binary_sensor",
    cppType: "bool",
    defaultState: "off",
    activeState: "on",
    uiCategory: "toggleable",
    properties: [
      { name: "isOn", cppPath: ".state", triggerType: "on_state", exprType: "bool", sourceDomain: "binary_sensor" },
    ],
    actions: [
      { name: "toggle", service: "toggle", resultState: null, defaultAttributes: null },
      { name: "turnOn", service: "turn_on", resultState: "on", defaultAttributes: null },
      { name: "turnOff", service: "turn_off", resultState: "off", defaultAttributes: null },
    ],
  },
  cover: {
    domain: "cover",
    sensorPlatform: "binary_sensor",
    cppType: "bool",
    defaultState: "closed",
    activeState: "open",
    uiCategory: "cover",
    properties: [
      { name: "isOpen", cppPath: ".position", triggerType: "on_state", exprType: "float", sourceDomain: "cover" },
    ],
    actions: [
      { name: "open", service: "open", resultState: "open", defaultAttributes: null },
      { name: "close", service: "close", resultState: "closed", defaultAttributes: null },
      { name: "stop", service: "stop", resultState: null, defaultAttributes: null },
    ],
  },
  number: {
    domain: "number",
    sensorPlatform: "sensor",
    cppType: "float",
    defaultState: "0",
    activeState: null,
    uiCategory: "sensor",
    properties: [
      { name: "value", cppPath: ".state", triggerType: "on_value", exprType: "float", sourceDomain: "sensor" },
    ],
    actions: [
    ],
  },
  select: {
    domain: "select",
    sensorPlatform: "text_sensor",
    cppType: "std::string",
    defaultState: "",
    activeState: null,
    uiCategory: "sensor",
    properties: [
      { name: "stateText", cppPath: ".state", triggerType: "on_value", exprType: "string", sourceDomain: "text_sensor" },
    ],
    actions: [
    ],
  },
  text_sensor: {
    domain: "text_sensor",
    sensorPlatform: "text_sensor",
    cppType: "std::string",
    defaultState: "",
    activeState: null,
    uiCategory: "sensor",
    properties: [
      { name: "stateText", cppPath: ".state", triggerType: "on_value", exprType: "string", sourceDomain: "text_sensor" },
    ],
    actions: [
    ],
  },
  button: {
    domain: "button",
    sensorPlatform: "binary_sensor",
    cppType: "bool",
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
    sensorPlatform: "binary_sensor",
    cppType: "bool",
    defaultState: "locked",
    activeState: "unlocked",
    uiCategory: "toggleable",
    properties: [
      { name: "isOn", cppPath: ".state", triggerType: "on_state", exprType: "bool", sourceDomain: "binary_sensor" },
    ],
    actions: [
      { name: "lock", service: "lock", resultState: "locked", defaultAttributes: null },
      { name: "unlock", service: "unlock", resultState: "unlocked", defaultAttributes: null },
    ],
  },
  climate: {
    domain: "climate",
    sensorPlatform: "binary_sensor",
    cppType: "bool",
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

export function getDomainSensorType(domain: string): SensorPlatform {
  const desc = ENTITY_DOMAINS[domain];
  if (!desc) throw new Error(`Unknown entity domain: ${domain}`);
  return desc.sensorPlatform;
}

export function defaultStateForDomain(domain: string): string {
  const desc = ENTITY_DOMAINS[domain];
  if (!desc) throw new Error(`Unknown entity domain: ${domain}`);
  return desc.defaultState;
}

// ── Reactive property map (flattened from domain properties) ─────────────────

export const REACTIVE_PROPERTY_MAP: Readonly<Record<string, ReactivePropertyConfig>> = {
  isOn: { property: ".state", triggerType: "on_state", sourceDomain: "binary_sensor", exprType: "bool" },
  brightness: { property: ".current_values.get_brightness()", triggerType: "on_state", sourceDomain: "light", exprType: "float" },
  stateText: { property: ".state", triggerType: "on_state", sourceDomain: "text_sensor", exprType: "string" },
  value: { property: ".state", triggerType: "on_value", sourceDomain: "sensor", exprType: "float" },
  isOpen: { property: ".position", triggerType: "on_state", sourceDomain: "cover", exprType: "float" },
};
