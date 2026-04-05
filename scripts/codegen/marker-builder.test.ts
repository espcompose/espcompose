/**
 * Unit tests for marker-builder.ts — verifies the generated markers.ts output
 * shape including Components namespace, top-level aliases, and brand stability.
 *
 * Run with: npx vitest run scripts/codegen/marker-builder.test.ts
 */
import { describe, it, expect } from 'vitest';
import { buildMarkersFileContent } from './marker-builder.js';
import { componentKeyToGroupName } from './type-mapper.js';

// ────────────────────────────────────────────────────────────────────────────
// componentKeyToGroupName
// ────────────────────────────────────────────────────────────────────────────

describe('componentKeyToGroupName', () => {
  it('converts simple names to PascalCase', () => {
    expect(componentKeyToGroupName('light')).toBe('Light');
    expect(componentKeyToGroupName('sensor')).toBe('Sensor');
    expect(componentKeyToGroupName('cover')).toBe('Cover');
  });

  it('converts multi-word snake_case to PascalCase', () => {
    expect(componentKeyToGroupName('binary_sensor')).toBe('BinarySensor');
    expect(componentKeyToGroupName('modbus_controller')).toBe('ModbusController');
    expect(componentKeyToGroupName('text_sensor')).toBe('TextSensor');
  });

  it('normalizes known acronyms to ALL-CAPS', () => {
    expect(componentKeyToGroupName('i2c')).toBe('I2C');
    expect(componentKeyToGroupName('uart')).toBe('UART');
    expect(componentKeyToGroupName('spi')).toBe('SPI');
    expect(componentKeyToGroupName('gpio')).toBe('GPIO');
    expect(componentKeyToGroupName('adc')).toBe('ADC');
    expect(componentKeyToGroupName('i2s')).toBe('I2S');
  });

  it('normalizes acronyms within compound names', () => {
    expect(componentKeyToGroupName('ble_client')).toBe('BLEClient');
    expect(componentKeyToGroupName('i2s_audio')).toBe('I2SAudio');
  });

  it('strips trailing underscore (C++ reserved word escape)', () => {
    expect(componentKeyToGroupName('switch_')).toBe('Switch');
    expect(componentKeyToGroupName('number_')).toBe('Number');
  });
});

// ────────────────────────────────────────────────────────────────────────────
// buildMarkersFileContent
// ────────────────────────────────────────────────────────────────────────────

describe('buildMarkersFileContent', () => {
  /** Helper: build markers from a simple list of C++ classes with optional parents. */
  function buildMarkers(
    classes: string[],
    parents: Record<string, string[]> = {},
    virtualBrands?: Map<string, string[]>,
  ): string {
    const classSet = new Set(classes);
    const parentMap = new Map(Object.entries(parents));
    return buildMarkersFileContent(classSet, parentMap, virtualBrands);
  }

  it('emits __marker_ prefixed internal interfaces', () => {
    const output = buildMarkers(['light::Light']);
    expect(output).toContain('export interface __marker_light_Light');
    // Old flattened name should NOT be present
    expect(output).not.toMatch(/export interface light_Light\b/);
  });

  it('emits Components namespace with nested groups', () => {
    const output = buildMarkers(['light::Light', 'sensor::Sensor']);
    expect(output).toContain('export namespace Components');
    expect(output).toContain('export namespace Light');
    expect(output).toContain('export namespace Sensor');
    expect(output).toContain('export type LightRef = __marker_light_Light');
    expect(output).toContain('export type SensorRef = __marker_sensor_Sensor');
  });

  it('emits unique top-level aliases with Ref suffix', () => {
    const output = buildMarkers(['light::Light', 'sensor::Sensor']);
    expect(output).toContain('export type LightRef = Components.Light.LightRef');
    expect(output).toContain('export type SensorRef = Components.Sensor.SensorRef');
  });

  it('normalizes acronyms in group names', () => {
    const output = buildMarkers(['i2c::I2CBus', 'uart::UARTComponent']);
    expect(output).toContain('export namespace I2C');
    expect(output).toContain('export namespace UART');
    expect(output).toContain('export type I2CBusRef = __marker_i2c_I2CBus');
    expect(output).toContain('export type UARTComponentRef = __marker_uart_UARTComponent');
    // Top-level aliases
    expect(output).toContain('export type I2CBusRef = Components.I2C.I2CBusRef');
    expect(output).toContain('export type UARTComponentRef = Components.UART.UARTComponentRef');
  });

  it('handles switch_ namespace (C++ reserved word escape)', () => {
    const output = buildMarkers(['switch_::Switch']);
    expect(output).toContain('export namespace Switch');
    expect(output).toContain('export type SwitchRef = __marker_switch__Switch');
    expect(output).toContain('export type SwitchRef = Components.Switch.SwitchRef');
  });

  it('strips leading :: from class names', () => {
    const output = buildMarkers(['::esphome::hub75::HUB75Display']);
    expect(output).toContain('export interface __marker_esphome_hub75_HUB75Display');
    // Brand should not have double underscore from leading ::
    expect(output).toContain('__brand_esphome_hub75_HUB75Display');
    expect(output).not.toContain('__brand__esphome');
    // Multi-level namespace: esphome::hub75 → EsphomeHub75
    expect(output).toContain('export namespace EsphomeHub75');
    expect(output).toContain('export type HUB75DisplayRef');
  });

  it('skips top-level alias when leaf names collide', () => {
    // Two groups produce the same leaf name "WidgetRef"
    const output = buildMarkers(['foo::Widget', 'bar::Widget']);
    // Both should exist in their respective namespaces
    expect(output).toContain('export namespace Foo');
    expect(output).toContain('export namespace Bar');
    // But neither should get a top-level alias
    const topLevelAliasCount = (output.match(/^export type WidgetRef = Components\./gm) ?? []).length;
    expect(topLevelAliasCount).toBe(0);
  });

  it('does not emit namespace entries for root-level classes', () => {
    const output = buildMarkers(['Component', 'EntityBase']);
    // Internal interfaces should exist
    expect(output).toContain('export interface __marker_Component');
    expect(output).toContain('export interface __marker_EntityBase');
    // But no namespace entries or top-level aliases
    expect(output).not.toContain('Components.Component');
    expect(output).not.toContain('export type ComponentRef');
    expect(output).not.toContain('export type EntityBaseRef');
  });

  it('preserves brand property names (stability)', () => {
    const output = buildMarkers(
      ['light::LightState', 'EntityBase', 'Component'],
      { 'light::LightState': ['EntityBase', 'Component'] },
    );
    // Brand names use flat marker names, NOT __marker_ prefixed
    expect(output).toContain('readonly __brand_light_LightState?: true');
    expect(output).toContain('readonly __brand_EntityBase?: true');
    expect(output).toContain('readonly __brand_Component?: true');
    // Must NOT have __brand___marker_
    expect(output).not.toContain('__brand___marker_');
  });

  it('includes virtual brands from namespace-bridged actions', () => {
    const virtualBrands = new Map([
      ['light_LightOutput', ['light_LightState']],
    ]);
    const output = buildMarkers(
      ['light::LightOutput', 'light::LightState'],
      {},
      virtualBrands,
    );
    // LightOutput should have its own brand AND the virtual brand
    expect(output).toContain('readonly __brand_light_LightOutput?: true');
    expect(output).toContain('readonly __brand_light_LightState?: true');
  });

  it('does not emit old-style flattened public names', () => {
    const output = buildMarkers([
      'light::Light',
      'sensor::Sensor',
      'i2c::I2CBus',
    ]);
    // None of the old patterns should appear as public exports
    expect(output).not.toMatch(/export type light_Light\b/);
    expect(output).not.toMatch(/export type sensor_Sensor\b/);
    expect(output).not.toMatch(/export type i2c_I2CBus\b/);
    // Old-style aliases like "Light = light_Light" should not exist
    expect(output).not.toMatch(/export type Light =/);
    expect(output).not.toMatch(/export type Sensor =/);
  });

  it('produces deterministic output', () => {
    const classes = ['sensor::Sensor', 'light::Light', 'i2c::I2CBus'];
    const output1 = buildMarkers(classes);
    const output2 = buildMarkers(classes);
    expect(output1).toBe(output2);
  });
});
