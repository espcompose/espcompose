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
import type {
  __marker_lv_obj_t,
  __marker_lv_style_t,
  __marker_LvPageType,
  __marker_lv_animimg_t,
  __marker_lv_arc_t,
  __marker_lv_bar_t,
  __marker_lv_button_t,
  __marker_lv_canvas_t,
  __marker_lv_checkbox_t,
  __marker_lv_dropdown_list_t,
  __marker_lv_image_t,
  __marker_lv_label_t,
  __marker_lv_led_t,
  __marker_lv_meter_t,
  __marker_lv_slider_t,
  __marker_lv_spinbox_t,
  __marker_lv_spinner_t,
  __marker_lv_switch_t,
  __marker_lv_tabview_t,
  __marker_lv_textarea_t,
  __marker_lv_tileview_t,
  __marker_lv_tileview_tile_t,
  __marker_LvButtonMatrixType,
  __marker_LvDropdownType,
  __marker_LvKeyboardType,
  __marker_LvLineType,
  __marker_LvRollerType,
} from './generated/markers.js';

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

// ── LVGL Widget Refs ─────────────────────────────────────────────────────────
//
// Each LVGL widget intrinsic (`<lvgl-slider>`, `<lvgl-button>`, etc.) accepts a
// typed `ref` that exposes ESPHome actions specific to that widget plus the
// common `widgetUpdate()`/`widgetRedraw()`/`widgetRefresh()` actions inherited
// from `lv_obj_t`/`lv_style_t`.
//
// Use `LvglWidgetRef` when you need a generic reference to any LVGL widget
// (only `widgetUpdate`/`widgetRedraw`/`widgetRefresh` are guaranteed).
// Use the per-widget refs to also unlock widget-specific actions
// (`sliderUpdate`, `canvasFill`, `spinboxIncrement`, etc.).

/** Generic LVGL widget ref — exposes `widgetUpdate`, `widgetRedraw`, `widgetRefresh`. */
export type LvglWidgetRef = __marker_lv_obj_t;
/** LVGL style mixin — exposes per-widget update actions (`sliderUpdate`, etc.). */
export type LvglStyleRef = __marker_lv_style_t;
/** LVGL page ref — exposes `pageShow()`. */
export type LvglPageRef = __marker_LvPageType;

export type LvglAnimimgRef = __marker_lv_animimg_t;
export type LvglArcRef = __marker_lv_arc_t;
export type LvglBarRef = __marker_lv_bar_t;
export type LvglButtonRef = __marker_lv_button_t;
export type LvglButtonMatrixRef = __marker_LvButtonMatrixType;
export type LvglCanvasRef = __marker_lv_canvas_t;
export type LvglCheckboxRef = __marker_lv_checkbox_t;
export type LvglDropdownRef = __marker_LvDropdownType;
export type LvglDropdownListRef = __marker_lv_dropdown_list_t;
export type LvglImageRef = __marker_lv_image_t;
export type LvglKeyboardRef = __marker_LvKeyboardType;
export type LvglLabelRef = __marker_lv_label_t;
export type LvglLedRef = __marker_lv_led_t;
export type LvglLineRef = __marker_LvLineType;
export type LvglMeterRef = __marker_lv_meter_t;
export type LvglRollerRef = __marker_LvRollerType;
export type LvglSliderRef = __marker_lv_slider_t;
export type LvglSpinboxRef = __marker_lv_spinbox_t;
export type LvglSpinnerRef = __marker_lv_spinner_t;
export type LvglSwitchRef = __marker_lv_switch_t;
export type LvglTabviewRef = __marker_lv_tabview_t;
export type LvglTextareaRef = __marker_lv_textarea_t;
export type LvglTileviewRef = __marker_lv_tileview_t;
export type LvglTileviewTileRef = __marker_lv_tileview_tile_t;

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
