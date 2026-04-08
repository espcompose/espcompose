/**
 * TypeScript representation of the ESPHome JSON schema format.
 * These types describe the structure of https://schema.esphome.io/<version>/esphome.json
 */

export interface SchemaConfigVar {
  /** Whether the field is user-required, optional, a string-keyed map, or auto-generated.
   *  Some schema entries omit this field entirely (e.g. the `id` field on spi-based
   *  components) — treat an absent key the same as 'Optional'. */
  key?: 'Required' | 'Optional' | 'String' | 'GeneratedID';
  /** ESPHome type name for the value. Absent means the type is unspecified. */
  type?: string;
  /** Markdown documentation string. */
  docs?: string;
  /** When true, the value is a list of this type. */
  is_list?: boolean;
  /** Present when type === 'enum'. Keys are valid string values. */
  values?: Record<string, string | null>;
  /** Present when type === 'schema'. Describes the nested object's shape. */
  schema?: SchemaDefinition;
  /** Additional ESPHome-specific type constraint (e.g. 'port', 'positive_not_null_int'). */
  data_type?: string;
  /** Default value as a string. */
  default?: string;
  /** Whether the field accepts ESPHome template expressions. */
  templatable?: boolean;
  /** Present on own-component identity fields. Describes the C++ class.
   *  Usually accompanies key === 'GeneratedID', but some schemas use
   *  'Required' or 'Optional' instead (e.g. slow_pwm). */
  id_type?: { class: string; parents: string[] };
  /** Present when type === 'use_id'. The class of ID being referenced. */
  use_id_type?: string;
  /** Present when key === 'String'. Constrains the key type. */
  key_type?: string;
  /** Present when type === 'pin'. Lists accepted pin modes (e.g. ['input', 'output']). */
  modes?: string[];
}

export interface SchemaDefinition {
  config_vars?: Record<string, SchemaConfigVar>;
  extends?: string[];
}

export interface ConfigSchemaEntry {
  type: 'schema';
  schema: SchemaDefinition;
  maybe?: string;
}

/**
 * A CONFIG_SCHEMA with `type: "typed"` describes a discriminated union of
 * sub-schemas, each selectable by a string key (e.g. `dac_type: internal`).
 * Used by platform components like `i2s_audio.speaker` and `i2s_audio.microphone`.
 */
export interface TypedConfigSchemaEntry {
  type: 'typed';
  typed_key: string;
  types: Record<string, SchemaDefinition>;
}

export interface ComponentSchemas {
  CONFIG_SCHEMA?: ConfigSchemaEntry | TypedConfigSchemaEntry;
  [key: string]: unknown;
}

export interface ComponentEntry {
  schemas: ComponentSchemas;
}

export interface PlatformEntry {
  docs?: string;
}

export interface ComponentRef {
  dependencies?: string[];
  docs?: string;
}

export interface CoreEntry {
  schemas: Record<string, unknown>;
  platforms: Record<string, PlatformEntry>;
  components: Record<string, ComponentRef>;
  action?: Record<string, unknown>;
  condition?: Record<string, unknown>;
  pins?: string[];
}

export interface RootSchema {
  esphome: ComponentEntry;
  core: CoreEntry;
  [key: string]: ComponentEntry;
}

/**
 * Maps "source.SchemaName" (e.g. "core.COMPONENT_SCHEMA") to a SchemaDefinition.
 * Built from the root esphome.json and all fetched platform JSONs after the
 * initial fetch phase, then threaded through all code-generation functions so
 * that schema `extends` references can be resolved.
 */
export type SchemaRegistry = Map<string, SchemaDefinition>;
