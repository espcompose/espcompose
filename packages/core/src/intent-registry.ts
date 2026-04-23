/**
 * Intent registry for intrinsic ESPHome Compose elements
 *
 * Maps JSX tag names to their intent metadata. This file is hand-maintained
 * (not auto-generated) because intent hierarchy rules are semantic decisions
 * that cannot be inferred from the ESPHome JSON schema.
 *
 * Components NOT listed here are treated as pass-through by the ESLint rule
 * (no validation applied), ensuring backwards compatibility.
 *
 * Intent taxonomy:
 *   esphome:root           — <esphome> root element
 *   esphome:component      — any direct child of <esphome> (infrastructure, platforms, display, lvgl)
 *   lvgl:page              — <lvgl-page> container
 *   lvgl:widget            — any LVGL visual element (leaf or container)
 *   ec:canvas              — <ec-canvas> composited rendering host
 *   ec:canvas-zone         — <ec-canvas-background>, <ec-canvas-content>, <ec-canvas-overlay>
 *   ec:paint-primitive     — <ec-rect>, <ec-line>, <ec-arc>, <ec-polygon>, <ec-text>, <ec-image>
 */

import type { IntrinsicIntentMeta } from './intents';

export const INTRINSIC_INTENT_REGISTRY: Readonly<Record<string, IntrinsicIntentMeta>> = {
  // ─── ESPHome root ──────────────────────────────────────────────────────────
  esphome: {
    intents: ['esphome:root'],
    allowedChildIntents: ['esphome:component'],
  },

  // ─── Infrastructure ────────────────────────────────────────────────────────
  wifi: { intents: ['esphome:component'] },
  api: { intents: ['esphome:component'] },
  logger: { intents: ['esphome:component'] },
  ota: { intents: ['esphome:component'] },
  i2c: { intents: ['esphome:component'] },
  spi: { intents: ['esphome:component'] },
  uart: { intents: ['esphome:component'] },
  mqtt: { intents: ['esphome:component'] },
  ethernet: { intents: ['esphome:component'] },
  mdns: { intents: ['esphome:component'] },
  web_server: { intents: ['esphome:component'] },
  web_server_base: { intents: ['esphome:component'] },
  web_server_idf: { intents: ['esphome:component'] },
  captive_portal: { intents: ['esphome:component'] },
  debug: { intents: ['esphome:component'] },
  preferences: { intents: ['esphome:component'] },
  esp32: { intents: ['esphome:component'] },
  esp8266: { intents: ['esphome:component'] },
  rp2040: { intents: ['esphome:component'] },
  bk72xx: { intents: ['esphome:component'] },
  libretiny: { intents: ['esphome:component'] },
  rtl87xx: { intents: ['esphome:component'] },
  ln882x: { intents: ['esphome:component'] },
  host: { intents: ['esphome:component'] },
  nrf52: { intents: ['esphome:component'] },
  psram: { intents: ['esphome:component'] },
  esp_ldo: { intents: ['esphome:component'] },
  deep_sleep: { intents: ['esphome:component'] },
  safe_mode: { intents: ['esphome:component'] },
  external_components: { intents: ['esphome:component'] },
  substitutions: { intents: ['esphome:component'] },
  packages: { intents: ['esphome:component'] },
  globals: { intents: ['esphome:component'] },
  interval: { intents: ['esphome:component'] },
  time: { intents: ['esphome:component'] },
  sun: { intents: ['esphome:component'] },
  json: { intents: ['esphome:component'] },
  http_request: { intents: ['esphome:component'] },
  network: { intents: ['esphome:component'] },
  i2s_audio: { intents: ['esphome:component'] },
  audio: { intents: ['esphome:component'] },
  esp32_ble: { intents: ['esphome:component'] },
  esp32_ble_tracker: { intents: ['esphome:component'] },
  esp32_ble_server: { intents: ['esphome:component'] },
  esp32_ble_beacon: { intents: ['esphome:component'] },
  bluetooth_proxy: { intents: ['esphome:component'] },
  esp32_improv: { intents: ['esphome:component'] },
  improv_serial: { intents: ['esphome:component'] },
  espnow: { intents: ['esphome:component'] },
  wireguard: { intents: ['esphome:component'] },
  socket: { intents: ['esphome:component'] },
  udp: { intents: ['esphome:component'] },
  power_supply: { intents: ['esphome:component'] },
  status_led: { intents: ['esphome:component'] },
  one_wire: { intents: ['esphome:component'] },
  dallas: { intents: ['esphome:component'] },
  modbus: { intents: ['esphome:component'] },
  modbus_controller: { intents: ['esphome:component'] },
  remote_receiver: { intents: ['esphome:component'] },
  remote_transmitter: { intents: ['esphome:component'] },
  runtime_stats: { intents: ['esphome:component'] },
  async_tcp: { intents: ['esphome:component'] },

  // ─── I2C expanders / bus devices ───────────────────────────────────────────
  pcf8574: { intents: ['esphome:component'] },
  mcp23008: { intents: ['esphome:component'] },
  mcp23016: { intents: ['esphome:component'] },
  mcp23017: { intents: ['esphome:component'] },
  mcp23s08: { intents: ['esphome:component'] },
  mcp23s17: { intents: ['esphome:component'] },
  pca9554: { intents: ['esphome:component'] },
  pca6416a: { intents: ['esphome:component'] },
  pca9685: { intents: ['esphome:component'] },
  sx1509: { intents: ['esphome:component'] },
  tca9548a: { intents: ['esphome:component'] },
  tca9555: { intents: ['esphome:component'] },
  xl9535: { intents: ['esphome:component'] },
  ch422g: { intents: ['esphome:component'] },
  ch423: { intents: ['esphome:component'] },
  pi4ioe5v6408: { intents: ['esphome:component'] },
  max6956: { intents: ['esphome:component'] },
  sn74hc165: { intents: ['esphome:component'] },
  sn74hc595: { intents: ['esphome:component'] },

  // ─── Platform components ───────────────────────────────────────────────────
  sensor: { intents: ['esphome:component'] },
  binary_sensor: { intents: ['esphome:component'] },
  text_sensor: { intents: ['esphome:component'] },
  switch: { intents: ['esphome:component'] },
  button: { intents: ['esphome:component'] },
  number: { intents: ['esphome:component'] },
  select: { intents: ['esphome:component'] },
  text: { intents: ['esphome:component'] },
  light: { intents: ['esphome:component'] },
  fan: { intents: ['esphome:component'] },
  cover: { intents: ['esphome:component'] },
  climate: { intents: ['esphome:component'] },
  lock: { intents: ['esphome:component'] },
  valve: { intents: ['esphome:component'] },
  alarm_control_panel: { intents: ['esphome:component'] },
  event: { intents: ['esphome:component'] },
  update: { intents: ['esphome:component'] },
  media_player: { intents: ['esphome:component'] },
  microphone: { intents: ['esphome:component'] },
  speaker: { intents: ['esphome:component'] },
  voice_assistant: { intents: ['esphome:component'] },
  output: { intents: ['esphome:component'] },
  script: { intents: ['esphome:component'] },
  stepper: { intents: ['esphome:component'] },
  servo: { intents: ['esphome:component'] },
  sprinkler: { intents: ['esphome:component'] },
  datetime: { intents: ['esphome:component'] },
  audio_adc: { intents: ['esphome:component'] },
  audio_dac: { intents: ['esphome:component'] },
  rtttl: { intents: ['esphome:component'] },
  water_heater: { intents: ['esphome:component'] },
  media_source: { intents: ['esphome:component'] },

  // ─── Display ───────────────────────────────────────────────────────────────
  display: { intents: ['esphome:component'] },
  touchscreen: { intents: ['esphome:component'] },
  animation: { intents: ['esphome:component'] },
  image: { intents: ['esphome:component'] },
  font: { intents: ['esphome:component'] },
  color: { intents: ['esphome:component'] },
  graph: { intents: ['esphome:component'] },
  qr_code: { intents: ['esphome:component'] },

  // ─── LVGL ──────────────────────────────────────────────────────────────────
  lvgl: {
    intents: ['esphome:component'],
    allowedChildIntents: ['lvgl:page', 'lvgl:widget'],
  },

  'lvgl-page': {
    intents: ['lvgl:page'],
    allowedChildIntents: ['lvgl:widget'],
  },

  // Containers — accept child widgets
  'lvgl-obj': {
    intents: ['lvgl:widget'],
    allowedChildIntents: ['lvgl:widget'],
  },
  'lvgl-button': {
    intents: ['lvgl:widget'],
    allowedChildIntents: ['lvgl:widget'],
  },
  'lvgl-buttonmatrix': {
    intents: ['lvgl:widget'],
    allowedChildIntents: ['lvgl:widget'],
  },
  'lvgl-container': {
    intents: ['lvgl:widget'],
    allowedChildIntents: ['lvgl:widget'],
  },
  'lvgl-tabview': {
    intents: ['lvgl:widget'],
    allowedChildIntents: ['lvgl:widget'],
  },
  'lvgl-tileview': {
    intents: ['lvgl:widget'],
    allowedChildIntents: ['lvgl:widget'],
  },
  'lvgl-lv-tileview-tile-t': {
    intents: ['lvgl:widget'],
    allowedChildIntents: ['lvgl:widget'],
  },

  // Leaf widgets — no children
  'lvgl-label': { intents: ['lvgl:widget'], allowedChildIntents: [] },
  'lvgl-image': { intents: ['lvgl:widget'], allowedChildIntents: [] },
  'lvgl-animimg': { intents: ['lvgl:widget'], allowedChildIntents: [] },
  'lvgl-arc': { intents: ['lvgl:widget'], allowedChildIntents: [] },
  'lvgl-line': { intents: ['lvgl:widget'], allowedChildIntents: [] },
  'lvgl-canvas': { intents: ['lvgl:widget'], allowedChildIntents: [] },
  'lvgl-checkbox': { intents: ['lvgl:widget'], allowedChildIntents: [] },
  'lvgl-dropdown': { intents: ['lvgl:widget'], allowedChildIntents: [] },
  'lvgl-dropdown-list': { intents: ['lvgl:widget'], allowedChildIntents: [] },
  'lvgl-textarea': { intents: ['lvgl:widget'], allowedChildIntents: [] },
  'lvgl-keyboard': { intents: ['lvgl:widget'], allowedChildIntents: [] },
  'lvgl-led': { intents: ['lvgl:widget'], allowedChildIntents: [] },
  'lvgl-bar': { intents: ['lvgl:widget'], allowedChildIntents: [] },
  'lvgl-meter': { intents: ['lvgl:widget'], allowedChildIntents: [] },
  'lvgl-qrcode': { intents: ['lvgl:widget'], allowedChildIntents: [] },
  'lvgl-roller': { intents: ['lvgl:widget'], allowedChildIntents: [] },
  'lvgl-slider': { intents: ['lvgl:widget'], allowedChildIntents: [] },
  'lvgl-spinbox': { intents: ['lvgl:widget'], allowedChildIntents: [] },
  'lvgl-spinner': { intents: ['lvgl:widget'], allowedChildIntents: [] },
  'lvgl-switch': { intents: ['lvgl:widget'], allowedChildIntents: [] },
  'lvgl-btnmatrix-btn': { intents: ['lvgl:widget'], allowedChildIntents: [] },

  // ─── ec-canvas (composited rendering) ──────────────────────────────────────
  'ec-canvas': {
    intents: ['ec:canvas', 'lvgl:widget'],
    allowedChildIntents: ['ec:canvas-zone'],
  },
  'ec-canvas-background': {
    intents: ['ec:canvas-zone'],
    allowedChildIntents: ['ec:paint-primitive'],
  },
  'ec-canvas-content': {
    intents: ['ec:canvas-zone'],
    allowedChildIntents: ['lvgl:widget'],
  },
  'ec-canvas-overlay': {
    intents: ['ec:canvas-zone'],
    allowedChildIntents: ['ec:paint-primitive'],
  },

  // Paint primitives — leaf elements, no children
  'ec-rect': { intents: ['ec:paint-primitive'], allowedChildIntents: [] },
  'ec-line': { intents: ['ec:paint-primitive'], allowedChildIntents: [] },
  'ec-arc': { intents: ['ec:paint-primitive'], allowedChildIntents: [] },
  'ec-polygon': { intents: ['ec:paint-primitive'], allowedChildIntents: [] },
  'ec-text': { intents: ['ec:paint-primitive'], allowedChildIntents: [] },
  'ec-image': { intents: ['ec:paint-primitive'], allowedChildIntents: [] },
};
