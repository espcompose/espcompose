// ────────────────────────────────────────────────────────────────────────────
// Component Aliases — Hand-Curated Top-Level Ref Shortcuts
//
// Each line re-exports a namespaced ref type as a convenient top-level alias.
// The full set is always available via Components.<Group>.<TypeRef>.
//
// To add an alias: add an export line below, then rebuild.
// To find the canonical path: look in generated/markers.ts → Components namespace.
// ────────────────────────────────────────────────────────────────────────────

import type { Components } from './generated/markers.js';

// ── Core entity types ────────────────────────────────────────────────────────

export type AlarmControlPanelRef = Components.AlarmControlPanel.AlarmControlPanelRef;
export type BinarySensorRef = Components.BinarySensor.BinarySensorRef;
export type ButtonRef = Components.Button.ButtonRef;
export type ClimateRef = Components.Climate.ClimateRef;
export type CoverRef = Components.Cover.CoverRef;
export type DateRef = Components.Datetime.DateEntityRef;
export type DatetimeRef = Components.Datetime.DateTimeEntityRef;
export type EventRef = Components.Event.EventRef;
export type FanRef = Components.Fan.FanRef;
export type LightOutputRef = Components.Light.LightOutputRef;
export type LightStateRef = Components.Light.LightStateRef;
export type LockRef = Components.Lock.LockRef;
export type MediaPlayerRef = Components.MediaPlayer.MediaPlayerRef;
export type NumberRef = Components.Number.NumberRef;
export type SelectRef = Components.Select.SelectRef;
export type SensorRef = Components.Sensor.SensorRef;
export type SwitchRef = Components.Switch.SwitchRef;
export type TextRef = Components.Text.TextRef;
export type TextSensorRef = Components.TextSensor.TextSensorRef;
export type TimeRef = Components.Datetime.TimeEntityRef;
export type UpdateEntityRef = Components.Update.UpdateEntityRef;
export type ValveRef = Components.Valve.ValveRef;

// ── Display / UI ─────────────────────────────────────────────────────────────

export type AnimationRef = Components.Animation.AnimationRef;
export type DisplayRef = Components.Display.DisplayRef;
export type FontRef = Components.Font.FontRef;
export type ImageRef = Components.Image.ImageRef;
export type LvglComponentRef = Components.Lvgl.LvglComponentRef;
export type TouchscreenRef = Components.Touchscreen.TouchscreenRef;

// ── Output ───────────────────────────────────────────────────────────────────

export type BinaryOutputRef = Components.Output.BinaryOutputRef;
export type FloatOutputRef = Components.Output.FloatOutputRef;
export type LEDCOutputRef = Components.Ledc.LEDCOutputRef;

// ── Audio ────────────────────────────────────────────────────────────────────

export type I2SAudioComponentRef = Components.I2SAudio.I2SAudioComponentRef;
export type SpeakerRef = Components.Speaker.SpeakerRef;

// ── Infrastructure / buses ───────────────────────────────────────────────────

export type I2CBusRef = Components.I2C.I2CBusRef;
export type SPIComponentRef = Components.SPI.SPIComponentRef;
export type UARTComponentRef = Components.UART.UARTComponentRef;
export type WiFiComponentRef = Components.Wifi.WiFiComponentRef;

// ── Common components ────────────────────────────────────────────────────────

export type GPIOSwitchRef = Components.GPIO.GPIOSwitchRef;
export type InternalTemperatureSensorRef = Components.InternalTemperature.InternalTemperatureSensorRef;
export type IntervalTriggerRef = Components.Interval.IntervalTriggerRef;
export type OutputSwitchRef = Components.Output.OutputSwitchRef;
export type ScriptRef = Components.Script.ScriptRef;
export type StepperRef = Components.Stepper.StepperRef;

// ── Time ─────────────────────────────────────────────────────────────────────

export type RealTimeClockRef = Components.Time.RealTimeClockRef;
