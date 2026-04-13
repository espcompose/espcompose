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
 *   esphome:infrastructure — core services (wifi, api, logger, ota, buses, etc.)
 *   esphome:platform       — platform components (sensor, binary_sensor, light, etc.)
 *   esphome:display        — display and touchscreen components
 *   lvgl:root              — <lvgl> element
 *   lvgl:page              — <lvgl-page> container
 *   lvgl:widget            — any LVGL visual element (leaf or container)
 *   ec:canvas              — <ec-canvas> composited rendering host
 *   ec:canvas-zone         — <ec-canvas-background>, <ec-canvas-content>, <ec-canvas-overlay>
 *   ec:paint-primitive     — <ec-rect>, <ec-line>, and future paint primitives
 */

import type { IntrinsicIntentMeta } from './intents';

export const INTRINSIC_INTENT_REGISTRY: Readonly<Record<string, IntrinsicIntentMeta>> = {
  // ─── ESPHome root ──────────────────────────────────────────────────────────
  esphome: {
    intents: ['esphome:root'],
    allowedChildIntents: [
      'esphome:infrastructure',
      'esphome:platform',
      'esphome:display',
      'lvgl:root',
    ],
  },

  // ─── Infrastructure ────────────────────────────────────────────────────────
  wifi: { intents: ['esphome:infrastructure'] },
  api: { intents: ['esphome:infrastructure'] },
  logger: { intents: ['esphome:infrastructure'] },
  ota: { intents: ['esphome:infrastructure'] },
  i2c: { intents: ['esphome:infrastructure'] },
  spi: { intents: ['esphome:infrastructure'] },
  uart: { intents: ['esphome:infrastructure'] },
  mqtt: { intents: ['esphome:infrastructure'] },
  ethernet: { intents: ['esphome:infrastructure'] },
  mdns: { intents: ['esphome:infrastructure'] },
  web_server: { intents: ['esphome:infrastructure'] },
  web_server_base: { intents: ['esphome:infrastructure'] },
  web_server_idf: { intents: ['esphome:infrastructure'] },
  captive_portal: { intents: ['esphome:infrastructure'] },
  debug: { intents: ['esphome:infrastructure'] },
  preferences: { intents: ['esphome:infrastructure'] },
  esp32: { intents: ['esphome:infrastructure'] },
  esp8266: { intents: ['esphome:infrastructure'] },
  rp2040: { intents: ['esphome:infrastructure'] },
  bk72xx: { intents: ['esphome:infrastructure'] },
  libretiny: { intents: ['esphome:infrastructure'] },
  rtl87xx: { intents: ['esphome:infrastructure'] },
  ln882x: { intents: ['esphome:infrastructure'] },
  host: { intents: ['esphome:infrastructure'] },
  nrf52: { intents: ['esphome:infrastructure'] },
  psram: { intents: ['esphome:infrastructure'] },
  esp_ldo: { intents: ['esphome:infrastructure'] },
  deep_sleep: { intents: ['esphome:infrastructure'] },
  safe_mode: { intents: ['esphome:infrastructure'] },
  external_components: { intents: ['esphome:infrastructure'] },
  substitutions: { intents: ['esphome:infrastructure'] },
  packages: { intents: ['esphome:infrastructure'] },
  globals: { intents: ['esphome:infrastructure'] },
  interval: { intents: ['esphome:infrastructure'] },
  time: { intents: ['esphome:infrastructure'] },
  sun: { intents: ['esphome:infrastructure'] },
  json: { intents: ['esphome:infrastructure'] },
  http_request: { intents: ['esphome:infrastructure'] },
  network: { intents: ['esphome:infrastructure'] },
  i2s_audio: { intents: ['esphome:infrastructure'] },
  audio: { intents: ['esphome:infrastructure'] },
  esp32_ble: { intents: ['esphome:infrastructure'] },
  esp32_ble_tracker: { intents: ['esphome:infrastructure'] },
  esp32_ble_server: { intents: ['esphome:infrastructure'] },
  esp32_ble_beacon: { intents: ['esphome:infrastructure'] },
  bluetooth_proxy: { intents: ['esphome:infrastructure'] },
  esp32_improv: { intents: ['esphome:infrastructure'] },
  improv_serial: { intents: ['esphome:infrastructure'] },
  espnow: { intents: ['esphome:infrastructure'] },
  wireguard: { intents: ['esphome:infrastructure'] },
  socket: { intents: ['esphome:infrastructure'] },
  udp: { intents: ['esphome:infrastructure'] },
  power_supply: { intents: ['esphome:infrastructure'] },
  status_led: { intents: ['esphome:infrastructure'] },
  one_wire: { intents: ['esphome:infrastructure'] },
  dallas: { intents: ['esphome:infrastructure'] },
  modbus: { intents: ['esphome:infrastructure'] },
  modbus_controller: { intents: ['esphome:infrastructure'] },
  remote_receiver: { intents: ['esphome:infrastructure'] },
  remote_transmitter: { intents: ['esphome:infrastructure'] },
  runtime_stats: { intents: ['esphome:infrastructure'] },
  async_tcp: { intents: ['esphome:infrastructure'] },

  // ─── I2C expanders / bus devices ───────────────────────────────────────────
  pcf8574: { intents: ['esphome:infrastructure'] },
  mcp23008: { intents: ['esphome:infrastructure'] },
  mcp23016: { intents: ['esphome:infrastructure'] },
  mcp23017: { intents: ['esphome:infrastructure'] },
  mcp23s08: { intents: ['esphome:infrastructure'] },
  mcp23s17: { intents: ['esphome:infrastructure'] },
  pca9554: { intents: ['esphome:infrastructure'] },
  pca6416a: { intents: ['esphome:infrastructure'] },
  pca9685: { intents: ['esphome:infrastructure'] },
  sx1509: { intents: ['esphome:infrastructure'] },
  tca9548a: { intents: ['esphome:infrastructure'] },
  tca9555: { intents: ['esphome:infrastructure'] },
  xl9535: { intents: ['esphome:infrastructure'] },
  ch422g: { intents: ['esphome:infrastructure'] },
  ch423: { intents: ['esphome:infrastructure'] },
  pi4ioe5v6408: { intents: ['esphome:infrastructure'] },
  max6956: { intents: ['esphome:infrastructure'] },
  sn74hc165: { intents: ['esphome:infrastructure'] },
  sn74hc595: { intents: ['esphome:infrastructure'] },

  // ─── Platform components ───────────────────────────────────────────────────
  sensor: { intents: ['esphome:platform'] },
  binary_sensor: { intents: ['esphome:platform'] },
  text_sensor: { intents: ['esphome:platform'] },
  switch: { intents: ['esphome:platform'] },
  button: { intents: ['esphome:platform'] },
  number: { intents: ['esphome:platform'] },
  select: { intents: ['esphome:platform'] },
  text: { intents: ['esphome:platform'] },
  light: { intents: ['esphome:platform'] },
  fan: { intents: ['esphome:platform'] },
  cover: { intents: ['esphome:platform'] },
  climate: { intents: ['esphome:platform'] },
  lock: { intents: ['esphome:platform'] },
  valve: { intents: ['esphome:platform'] },
  alarm_control_panel: { intents: ['esphome:platform'] },
  event: { intents: ['esphome:platform'] },
  update: { intents: ['esphome:platform'] },
  media_player: { intents: ['esphome:platform'] },
  microphone: { intents: ['esphome:platform'] },
  speaker: { intents: ['esphome:platform'] },
  voice_assistant: { intents: ['esphome:platform'] },
  output: { intents: ['esphome:platform'] },
  script: { intents: ['esphome:platform'] },
  stepper: { intents: ['esphome:platform'] },
  servo: { intents: ['esphome:platform'] },
  sprinkler: { intents: ['esphome:platform'] },
  datetime: { intents: ['esphome:platform'] },
  audio_adc: { intents: ['esphome:platform'] },
  audio_dac: { intents: ['esphome:platform'] },
  rtttl: { intents: ['esphome:platform'] },
  water_heater: { intents: ['esphome:platform'] },
  media_source: { intents: ['esphome:platform'] },

  // ─── Display ───────────────────────────────────────────────────────────────
  display: { intents: ['esphome:display'] },
  touchscreen: { intents: ['esphome:display'] },
  animation: { intents: ['esphome:display'] },
  image: { intents: ['esphome:display'] },
  font: { intents: ['esphome:display'] },
  color: { intents: ['esphome:display'] },
  graph: { intents: ['esphome:display'] },
  qr_code: { intents: ['esphome:display'] },

  // ─── LVGL ──────────────────────────────────────────────────────────────────
  lvgl: {
    intents: ['lvgl:root'],
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
};
