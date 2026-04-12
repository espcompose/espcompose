// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { TriggerHandler, TimePeriod, MACAddress } from "../types";

// ── ::esphome::hub75::HUB75Display ───────────────────────────────────

export interface HUB75Display_SetBrightnessParams {
  brightness: number;
}

export interface HUB75DisplayActions {
  /**
   * This action allows you to dynamically change the brightness of the display at runtime.
   * @actionKey hub75.set_brightness
   */
  setBrightness(params?: HUB75Display_SetBrightnessParams): void;
}

// ── ags10::AGS10Component ────────────────────────────────────────────

export interface AGS10Component_NewI2cAddressParams {
  /** **int**: New I2C address.

  *See also: [AGS10 Volatile Organic Compound (VOC) Sensor](https://esphome.io/components/sensor/ags10#in-some-trigger)* */
  address: number;
}

export interface AGS10Component_SetZeroPointParams {
  mode: "FACTORY_DEFAULT" | "CURRENT_VALUE" | "CUSTOM_VALUE";
  value?: number;
}

export interface AGS10ComponentActions {
  /**
   * I2C address of AGS10 can be modified, and it is possible to use multiple AGS10 sensors on one bus. After sending the command for address changing, the new address is saved and takes effect immediately even after power-off.
   * @actionKey ags10.new_i2c_address
   */
  newI2cAddress(params?: AGS10Component_NewI2cAddressParams): void;
  /**
   * Zero-point of AGS10 has been calibrated before leaving factory. User can re-calibrate the zero-point as needed.
   * @actionKey ags10.set_zero_point
   */
  setZeroPoint(params?: AGS10Component_SetZeroPointParams): void;
}

// ── aic3204::AIC3204 ─────────────────────────────────────────────────

export interface AIC3204_SetAutoMuteModeParams {
  /** **int**: The auto-mute mode to be used; must be in the range of 0 (auto-mute disabled) to 7.

  *See also: [AIC3204](https://esphome.io/components/audio_dac/aic3204#aic3204set_auto_mute_mode-action)* */
  mode: number;
}

export interface AIC3204Actions {
  /**
   * This action sets the auto-mute mode of the AIC3204. See page 111 in the [reference manual](https://www.ti.com/lit/ml/slaa557/slaa557.pdf?ts=1727495047647&ref_url=ti.com) for more information.
   * @actionKey aic3204.set_auto_mute_mode
   */
  setAutoMuteMode(params?: AIC3204_SetAutoMuteModeParams): void;
}

// ── alarm_control_panel::AlarmControlPanel ───────────────────────────

export interface AlarmControlPanel_ArmAwayParams {
  code?: string;
}

export interface AlarmControlPanel_ArmHomeParams {
  code?: string;
}

export interface AlarmControlPanel_ArmNightParams {
  code?: string;
}

export interface AlarmControlPanel_DisarmParams {
  code?: string;
}

export interface AlarmControlPanel_PendingParams {
  code?: string;
}

export interface AlarmControlPanel_TriggeredParams {
  code?: string;
}

export interface AlarmControlPanel_ChimeParams {
  code?: string;
}

export interface AlarmControlPanel_ReadyParams {
  code?: string;
}

export interface AlarmControlPanelActions {
  /**
   * This action arms the alarm in away mode. The `code` is required when *requires_code_to_arm* is *true*.
   * @actionKey alarm_control_panel.arm_away
   */
  armAway(params?: AlarmControlPanel_ArmAwayParams): void;
  /**
   * This action arms the alarm in home mode. The `code` is required when *requires_code_to_arm* is *true*.
   * @actionKey alarm_control_panel.arm_home
   */
  armHome(params?: AlarmControlPanel_ArmHomeParams): void;
  /**
   * This action arms the alarm in night mode. The `code` is required when *requires_code_to_arm* is *true*.
   * @actionKey alarm_control_panel.arm_night
   */
  armNight(params?: AlarmControlPanel_ArmNightParams): void;
  /**
   * This action disarms the alarm. The `code` is required when *codes* is not empty.
   * @actionKey alarm_control_panel.disarm
   */
  disarm(params?: AlarmControlPanel_DisarmParams): void;
  /**
   * This action puts the alarm in pending state (the state before triggered after *pending_time*).
   * @actionKey alarm_control_panel.pending
   */
  pending(params?: AlarmControlPanel_PendingParams): void;
  /**
   * This action puts the alarm in triggered state.
   * @actionKey alarm_control_panel.triggered
   */
  triggered(params?: AlarmControlPanel_TriggeredParams): void;
  /** @actionKey alarm_control_panel.chime */
  chime(params?: AlarmControlPanel_ChimeParams): void;
  /** @actionKey alarm_control_panel.ready */
  ready(params?: AlarmControlPanel_ReadyParams): void;
}

// ── animation::Animation ─────────────────────────────────────────────

export interface Animation_SetFrameParams {
  frame: number;
}

export interface AnimationActions {
  /**
   * Moves the animation to a specific frame. This is equivalent to the `id(my_animation).set_frame(frame);` lambda call.
   * @actionKey animation.set_frame
   */
  setFrame(params?: Animation_SetFrameParams): void;
  /**
   * Moves the animation to the previous frame. This is equivalent to the `id(my_animation).prev_frame();` lambda call.
   * @actionKey animation.prev_frame
   */
  prevFrame(): void;
  /**
   * Moves the animation to the next frame. This is equivalent to the `id(my_animation).next_frame();` lambda call.
   * @actionKey animation.next_frame
   */
  nextFrame(): void;
}

// ── api::APIServer ───────────────────────────────────────────────────

export interface APIServer_RespondParams {
  /** **boolean**: Whether the action succeeded. Defaults to `true`.

  *See also: [Native API Component](https://esphome.io/components/api#configuration-variables)* */
  success?: boolean;
  /** **string**: An error message to include when `success` is `false`. Defaults to an empty string.

  *See also: [Native API Component](https://esphome.io/components/api#configuration-variables)* */
  /** @yamlKey error_message */
  errorMessage?: string;
  /** **[lambda](/automations/templates#config-lambda)**: A lambda that populates a JSON object with response data. The lambda receives a `root` variable of type [`JsonObject`](https://arduinojson.org/v7/api/jsonobject/) that you can populate with key-value pairs.

  *See also: [Native API Component](https://esphome.io/components/api#configuration-variables)* */
  data?: unknown;
}

export interface APIServer_ServiceParams {
  service?: string;
  /** **string**: The Home Assistant [Action](https://www.home-assistant.io/docs/scripts/service-calls/) to perform.

  *See also: [Native API Component](https://esphome.io/components/api#configuration-variables)* */
  action?: string;
  /** **mapping**: Optional *static* data to perform the action with.

  *See also: [Native API Component](https://esphome.io/components/api#configuration-variables)* */
  data?: Record<string, unknown>;
  /** **mapping**: Optional template data to perform the action with. This is evaluated on the Home Assistant side with Home Assistant's templating engine.

  *See also: [Native API Component](https://esphome.io/components/api#configuration-variables)* */
  /** @yamlKey data_template */
  dataTemplate?: Record<string, unknown>;
  /** **mapping**: Optional variables that can be used in the `data_template`. Values are [lambdas](/automations/templates#config-lambda) and will be evaluated before sending the request.

  *See also: [Native API Component](https://esphome.io/components/api#configuration-variables)* */
  variables?: Record<string, unknown>;
  /** **string**: Optional Jinja template to process the action response data. This template is evaluated on the Home Assistant side with Home Assistant's templating engine. Requires `capture_response: true`.

  *See also: [Native API Component](https://esphome.io/components/api#configuration-variables)* */
  /** @yamlKey response_template */
  responseTemplate?: string;
  /** **boolean**: Enable capturing the response from the Home Assistant action call. When enabled, `on_success` must be configured. Defaults to `false`.

  *See also: [Native API Component](https://esphome.io/components/api#configuration-variables)* */
  /** @yamlKey capture_response */
  captureResponse?: boolean;
  /** **[Automation](/automations)**: Optional automation to execute when the Home Assistant action call succeeds. When `capture_response: true`, the response data is available as a `response` variable of type `JsonObjectConst`. See [Action Response Handling](https://esphome.io/components/api#action-response-handling).

  *See also: [Native API Component](https://esphome.io/components/api#configuration-variables)* */
  /** @yamlKey on_success */
  onSuccess?: TriggerHandler;
  /** **[Automation](/automations)**: Optional automation to execute when the Home Assistant action call fails. See [Action Response Handling](https://esphome.io/components/api#action-response-handling).

  *See also: [Native API Component](https://esphome.io/components/api#configuration-variables)* */
  /** @yamlKey on_error */
  onError?: TriggerHandler;
}

export interface APIServer_ActionParams {
  service?: string;
  /** **string**: The Home Assistant [Action](https://www.home-assistant.io/docs/scripts/service-calls/) to perform.

  *See also: [Native API Component](https://esphome.io/components/api#configuration-variables)* */
  action?: string;
  /** **mapping**: Optional *static* data to perform the action with.

  *See also: [Native API Component](https://esphome.io/components/api#configuration-variables)* */
  data?: Record<string, unknown>;
  /** **mapping**: Optional template data to perform the action with. This is evaluated on the Home Assistant side with Home Assistant's templating engine.

  *See also: [Native API Component](https://esphome.io/components/api#configuration-variables)* */
  /** @yamlKey data_template */
  dataTemplate?: Record<string, unknown>;
  /** **mapping**: Optional variables that can be used in the `data_template`. Values are [lambdas](/automations/templates#config-lambda) and will be evaluated before sending the request.

  *See also: [Native API Component](https://esphome.io/components/api#configuration-variables)* */
  variables?: Record<string, unknown>;
  /** **string**: Optional Jinja template to process the action response data. This template is evaluated on the Home Assistant side with Home Assistant's templating engine. Requires `capture_response: true`.

  *See also: [Native API Component](https://esphome.io/components/api#configuration-variables)* */
  /** @yamlKey response_template */
  responseTemplate?: string;
  /** **boolean**: Enable capturing the response from the Home Assistant action call. When enabled, `on_success` must be configured. Defaults to `false`.

  *See also: [Native API Component](https://esphome.io/components/api#configuration-variables)* */
  /** @yamlKey capture_response */
  captureResponse?: boolean;
  /** **[Automation](/automations)**: Optional automation to execute when the Home Assistant action call succeeds. When `capture_response: true`, the response data is available as a `response` variable of type `JsonObjectConst`. See [Action Response Handling](https://esphome.io/components/api#action-response-handling).

  *See also: [Native API Component](https://esphome.io/components/api#configuration-variables)* */
  /** @yamlKey on_success */
  onSuccess?: TriggerHandler;
  /** **[Automation](/automations)**: Optional automation to execute when the Home Assistant action call fails. See [Action Response Handling](https://esphome.io/components/api#action-response-handling).

  *See also: [Native API Component](https://esphome.io/components/api#configuration-variables)* */
  /** @yamlKey on_error */
  onError?: TriggerHandler;
}

export interface APIServer_EventParams {
  /** **string**: The event to create - must begin with `esphome.`

  *See also: [Native API Component](https://esphome.io/components/api#configuration-variables)* */
  event: string;
  /** **mapping**: Optional *static* data to pass along with the event.

  *See also: [Native API Component](https://esphome.io/components/api#configuration-variables)* */
  data?: Record<string, unknown>;
  /** **mapping**: Optional template data to pass along with the event. This is evaluated on the Home Assistant side with Home Assistant's templating engine.

  *See also: [Native API Component](https://esphome.io/components/api#configuration-variables)* */
  /** @yamlKey data_template */
  dataTemplate?: Record<string, unknown>;
  /** **mapping**: Optional variables that can be used in the `data_template`. Values are [lambdas](/automations/templates#config-lambda) and will be evaluated before sending the request.

  *See also: [Native API Component](https://esphome.io/components/api#configuration-variables)* */
  variables?: Record<string, unknown>;
}

export interface APIServer_TagScannedParams {
  /** **string**: The id of the scanned tag

  *See also: [Native API Component](https://esphome.io/components/api#configuration-variables)* */
  tag: string;
}

export interface APIServerActions {
  /**
   * This action sends a response back to the client that called the user-defined action. It can report success/error status and optionally include JSON data.
   * @actionKey api.respond
   */
  respond(params?: APIServer_RespondParams): void;
  /** @actionKey homeassistant.service */
  service(params?: APIServer_ServiceParams): void;
  /**
   * > [!NOTE] > Be sure to [follow the instructions above](https://esphome.io/components/api#api-actions) to tell Home Assistant to allow > your device to perform actions.
   * @actionKey homeassistant.action
   */
  action(params?: APIServer_ActionParams): void;
  /**
   * > [!NOTE] > Be sure to [follow the instructions above](https://esphome.io/components/api#api-actions) to tell Home Assistant to allow > your device to perform actions.
   * @actionKey homeassistant.event
   */
  event(params?: APIServer_EventParams): void;
  /**
   * > [!NOTE] > Be sure to [follow the instructions above](https://esphome.io/components/api#api-actions) to tell Home Assistant to allow > your device to make action calls.
   * @actionKey homeassistant.tag_scanned
   */
  tagScanned(params?: APIServer_TagScannedParams): void;
}

// ── at581x::AT581XComponent ──────────────────────────────────────────

export interface AT581XComponent_SettingsParams {
  /** **boolean**: If set to true, a reset of the analog frontend will be performed before changing other options. Ignored if not set or set to `false`. Upon applying the settings a frontend reset will be performed anyway, this is only useful if the sensor is not answering or locked up.

  *See also: [AirTouch AT581x Radar](https://esphome.io/components/at581x#configuration-variables)* */
  /** @yamlKey hw_frontend_reset */
  hwFrontendReset?: boolean;
  /** **enum**: Any of the possible frequencies (5696, 5715, 5730, 5748, 5765, 5784, 5800, 5819, 5836, 5851, 5869, 5888) in MHz. Defaults to `5800MHz`.

  *See also: [AirTouch AT581x Radar](https://esphome.io/components/at581x#configuration-variables)* */
  frequency?: "5696000000.0" | "5715000000.0" | "5730000000.0" | "5748000000.0" | "5765000000.0" | "5784000000.0" | "5800000000.0" | "5819000000.0" | "5836000000.0" | "5851000000.0" | "5869000000.0" | "5888000000.0";
  /** **int**: A unitless number, in range 0-1023, specifying the maximum distance to detect motion

  *See also: [AirTouch AT581x Radar](https://esphome.io/components/at581x#configuration-variables)* */
  /** @yamlKey sensing_distance */
  sensingDistance?: number;
  /** **int**: The delay to perform self check and calibration on power on. Recommended not to change this

  *See also: [AirTouch AT581x Radar](https://esphome.io/components/at581x#configuration-variables)* */
  /** @yamlKey poweron_selfcheck_time */
  poweronSelfcheckTime?: number;
  /** **int**: Any of the possible power profile (48, 56, 63, 70, 77, 91, 105, 115, 40, 44, 47, 51, 54, 61, 68, 78) in µA

  *See also: [AirTouch AT581x Radar](https://esphome.io/components/at581x#configuration-variables)* */
  /** @yamlKey power_consumption */
  powerConsumption?: number;
  /** **int**: The delay after an end-of-trigger event where the detection will not trigger anymore. Max 65535ms

  *See also: [AirTouch AT581x Radar](https://esphome.io/components/at581x#configuration-variables)* */
  /** @yamlKey protect_time */
  protectTime?: number;
  /** **int**: The delay while a detection must be active to change the state of the sensor. Max 65535ms

  *See also: [AirTouch AT581x Radar](https://esphome.io/components/at581x#configuration-variables)* */
  /** @yamlKey trigger_base */
  triggerBase?: number;
  /** **int**: The delay that the output will stay high after a detection event. This is usually what you want to change.

  *See also: [AirTouch AT581x Radar](https://esphome.io/components/at581x#configuration-variables)* */
  /** @yamlKey trigger_keep */
  triggerKeep?: number;
  /** **int**: The analog gain to use for threshold test. Any value in range 0-12, with 12 being the lowest gain and 0 the highest

  *See also: [AirTouch AT581x Radar](https://esphome.io/components/at581x#configuration-variables)* */
  /** @yamlKey stage_gain */
  stageGain?: number;
}

export interface AT581XComponentActions {
  /**
   * Restart the sensor.
   * @actionKey at581x.reset
   */
  reset(): void;
  /**
   * > [!WARNING] > The hardware frontend reset option is only required to reset the frontend in case it is struck, before sending the > new configuration. However, a frontend reset is always performed after changing the settings.
   * @actionKey at581x.settings
   */
  settings(params?: AT581XComponent_SettingsParams): void;
}

// ── audio_adc::AudioAdc ──────────────────────────────────────────────

export interface AudioAdc_SetMicGainParams {
  /** @yamlKey mic_gain */
  micGain: unknown;
}

export interface AudioAdcActions {
  /**
   * This action sets the (microphone) gain of the ADC.
   * @actionKey audio_adc.set_mic_gain
   */
  setMicGain(params?: AudioAdc_SetMicGainParams): void;
}

// ── audio_dac::AudioDac ──────────────────────────────────────────────

export interface AudioDac_SetVolumeParams {
  volume: unknown;
}

export interface AudioDacActions {
  /**
   * This action mutes the output of the DAC.
   * @actionKey audio_dac.mute_on
   */
  muteOn(): void;
  /**
   * This action unmutes the output of the DAC.
   * @actionKey audio_dac.mute_off
   */
  muteOff(): void;
  /**
   * This action sets the output volume of the DAC.
   * @actionKey audio_dac.set_volume
   */
  setVolume(params?: AudioDac_SetVolumeParams): void;
}

// ── binary_sensor::BinarySensor ──────────────────────────────────────

export interface BinarySensor_PublishParams {
  /** **boolean**: The state to publish.

  *See also: [Template Binary Sensor](https://esphome.io/components/binary_sensor/template#in-some-trigger)* */
  state: boolean;
}

export interface BinarySensorActions {
  /**
   * This action will invalidate the current state of the sensor. It is most useful with the Template binary sensor. After the state is invalidated, it will be reported to Home Assistant as `unknown`. Example:
   * @actionKey binary_sensor.invalidate_state
   */
  invalidateState(): void;
  /**
   * You can also publish a state to a template binary sensor from elsewhere in your YAML file with the `binary_sensor.template.publish` action.
   * @actionKey template.binary_sensor.publish
   */
  publish(params?: BinarySensor_PublishParams): void;
}

// ── bl0906::BL0906 ───────────────────────────────────────────────────

export interface BL0906Actions {
  /** @actionKey bl0906.reset_energy */
  resetEnergy(): void;
}

// ── ble_client::BLEClient ────────────────────────────────────────────

export interface BLEClient_BleWriteParams {
  /** **UUID**: UUID of the service to write to.

  *See also: [BLE Client](https://esphome.io/components/ble_client#configuration-variables)* */
  /** @yamlKey service_uuid */
  serviceUuid: unknown;
  /** **UUID**: UUID of the service's characteristic to write to.

  *See also: [BLE Client](https://esphome.io/components/ble_client#configuration-variables)* */
  /** @yamlKey characteristic_uuid */
  characteristicUuid: unknown;
  /** **list of bytes**: The value to be written.

  *See also: [BLE Client](https://esphome.io/components/ble_client#configuration-variables)* */
  value: number[];
}

export interface BLEClient_NumericComparisonReplyParams {
  /** **boolean**: Should be `true` if the passkeys displayed on both BLE devices are matching.

  *See also: [BLE Client](https://esphome.io/components/ble_client#configuration-variables)* */
  accept: boolean;
}

export interface BLEClient_PasskeyReplyParams {
  /** **int**: The 6-digit passkey.

  *See also: [BLE Client](https://esphome.io/components/ble_client#configuration-variables)* */
  passkey: number;
}

export interface BLEClientActions {
  /**
   * This action disconnects a device that was connected with the `ble_client.connect` action. Execution of the automation block sequence resumes after the disconnect has completed.
   * @actionKey ble_client.disconnect
   */
  disconnect(): void;
  /**
   * This action is useful only for devices with `auto_connect: false` and allows a connection to be made from within an automation. Once connected other actions like `ble_write` can be used. This is useful where a BLE server needs only to be interacted with occasionally, and thus does not need a constant connection held.
   * @actionKey ble_client.connect
   */
  connect(): void;
  /**
   * This action triggers a write to a specified BLE characteristic. The write is attempted in a best-effort fashion and will only succeed if the `ble_client`  's connection has been established and the peripheral exposes the expected BLE service and characteristic. Execution of the automation block sequence resumes after the write has completed. A write failure will *not* stop execution of succeeding actions (this allows a disconnect to be executed, for example.)
   * @actionKey ble_client.ble_write
   */
  bleWrite(params?: BLEClient_BleWriteParams): void;
  /**
   * This action triggers an authentication attempt after a numeric comparison.
   * @actionKey ble_client.numeric_comparison_reply
   */
  numericComparisonReply(params?: BLEClient_NumericComparisonReplyParams): void;
  /**
   * This action triggers an authentication attempt using the specified `passkey`.
   * @actionKey ble_client.passkey_reply
   */
  passkeyReply(params?: BLEClient_PasskeyReplyParams): void;
  /**
   * This action removes a device from the security database and manages unpairing.
   * @actionKey ble_client.remove_bond
   */
  removeBond(): void;
}

// ── bm8563::BM8563 ───────────────────────────────────────────────────

export interface BM8563_StartTimerParams {
  /** **[Time](/guides/configuration-types#config-time)**: The time duration for the timer.

  *See also: [BM8563 Time Source](https://esphome.io/components/time/bm8563#bm8563start_timer-action)* */
  duration: TimePeriod;
}

export interface BM8563Actions {
  /**
   * This [Action](/automations/actions#config-action) triggers a synchronization of the current system time to the RTC hardware.
   * @actionKey bm8563.write_time
   */
  writeTime(): void;
  /**
   * This [Action](/automations/actions#config-action) starts the RTC timer.
   * @actionKey bm8563.start_timer
   */
  startTimer(params?: BM8563_StartTimerParams): void;
  /**
   * This [Action](/automations/actions#config-action) triggers a synchronization of the current system time from the RTC hardware.
   * @actionKey bm8563.read_time
   */
  readTime(): void;
}

// ── button::Button ───────────────────────────────────────────────────

export interface ButtonActions {
  /**
   * This is an [Action](/automations/actions#all-actions) for pressing a button in an Automation.
   * @actionKey button.press
   */
  press(): void;
}

// ── canbus::CanbusComponent ──────────────────────────────────────────

export interface CanbusComponent_SendParams {
  /** @yamlKey can_id */
  canId?: number;
  /** @yamlKey use_extended_id */
  useExtendedId?: boolean;
  /** @yamlKey remote_transmission_request */
  remoteTransmissionRequest?: boolean;
  data: unknown;
}

export interface CanbusComponentActions {
  /**
   * The CAN bus can transmit frames by means of the `canbus.send` action. There are several ways to use it:
   * @actionKey canbus.send
   */
  send(params?: CanbusComponent_SendParams): void;
}

// ── cc1101::CC1101Component ──────────────────────────────────────────

export interface CC1101Component_SendPacketParams {
  /** **list**: The packet to send, length should match the configured `packet_length`.

  *See also: [CC1101 Low-Power Sub-1 GHz RF Transceiver](https://esphome.io/components/cc1101#configuration-variables)* */
  data: unknown;
}

export interface CC1101Component_SetFrequencyParams {
  /** **frequency**: The frequency to set. Range: `300MHz` to `928MHz`.

  *See also: [CC1101 Low-Power Sub-1 GHz RF Transceiver](https://esphome.io/components/cc1101#configuration-variables)* */
  value: unknown;
}

export interface CC1101Component_SetOutputPowerParams {
  /** **float**: The output power in dBm. Range: `-30` to `11`.

  *See also: [CC1101 Low-Power Sub-1 GHz RF Transceiver](https://esphome.io/components/cc1101#configuration-variables)* */
  value: number;
}

export interface CC1101Component_SetModulationTypeParams {
  /** **enum**: The modulation type. Options: `ASK/OOK`, `2-FSK`, `4-FSK`, `GFSK`, `MSK`.

  *See also: [CC1101 Low-Power Sub-1 GHz RF Transceiver](https://esphome.io/components/cc1101#configuration-variables)* */
  value: "2-FSK" | "GFSK" | "ASK/OOK" | "4-FSK" | "MSK";
}

export interface CC1101Component_SetSymbolRateParams {
  /** **float**: The symbol rate in baud. Range: `600` to `500000`.

  *See also: [CC1101 Low-Power Sub-1 GHz RF Transceiver](https://esphome.io/components/cc1101#configuration-variables)* */
  value: number;
}

export interface CC1101Component_SetRxAttenuationParams {
  /** **enum**: The attenuation level. Options: `0dB`, `6dB`, `12dB`, `18dB`.

  *See also: [CC1101 Low-Power Sub-1 GHz RF Transceiver](https://esphome.io/components/cc1101#configuration-variables)* */
  value: "0dB" | "6dB" | "12dB" | "18dB";
}

export interface CC1101Component_SetDcBlockingFilterParams {
  /** **boolean**: `true` to enable, `false` to disable.

  *See also: [CC1101 Low-Power Sub-1 GHz RF Transceiver](https://esphome.io/components/cc1101#configuration-variables)* */
  value: boolean;
}

export interface CC1101Component_SetManchesterParams {
  /** **boolean**: `true` to enable, `false` to disable.

  *See also: [CC1101 Low-Power Sub-1 GHz RF Transceiver](https://esphome.io/components/cc1101#configuration-variables)* */
  value: boolean;
}

export interface CC1101Component_SetFilterBandwidthParams {
  /** **frequency**: The filter bandwidth. Range: `58kHz` to `812kHz`.

  *See also: [CC1101 Low-Power Sub-1 GHz RF Transceiver](https://esphome.io/components/cc1101#configuration-variables)* */
  value: unknown;
}

export interface CC1101Component_SetFskDeviationParams {
  /** **frequency**: The frequency deviation. Range: `1.5kHz` to `381kHz`.

  *See also: [CC1101 Low-Power Sub-1 GHz RF Transceiver](https://esphome.io/components/cc1101#configuration-variables)* */
  value: unknown;
}

export interface CC1101Component_SetMskDeviationParams {
  /** **int**: The deviation index. Range: `1` to `8`.

  *See also: [CC1101 Low-Power Sub-1 GHz RF Transceiver](https://esphome.io/components/cc1101#configuration-variables)* */
  value: number;
}

export interface CC1101Component_SetChannelParams {
  /** **int**: The channel number. Range: `0` to `255`.

  *See also: [CC1101 Low-Power Sub-1 GHz RF Transceiver](https://esphome.io/components/cc1101#configuration-variables)* */
  value: number;
}

export interface CC1101Component_SetChannelSpacingParams {
  /** **frequency**: The spacing between channels. Range: `25kHz` to `405kHz`.

  *See also: [CC1101 Low-Power Sub-1 GHz RF Transceiver](https://esphome.io/components/cc1101#configuration-variables)* */
  value: unknown;
}

export interface CC1101Component_SetIfFrequencyParams {
  /** **frequency**: The intermediate frequency. Range: `25kHz` to `788kHz`.

  *See also: [CC1101 Low-Power Sub-1 GHz RF Transceiver](https://esphome.io/components/cc1101#configuration-variables)* */
  value: unknown;
}

export interface CC1101ComponentActions {
  /**
   * This [action](/automations/actions#all-actions) puts the radio into an idle state.
   * @actionKey cc1101.set_idle
   */
  setIdle(): void;
  /**
   * This [action](/automations/actions#all-actions) resets the CC1101 chip and re-applies configuration.
   * @actionKey cc1101.reset
   */
  reset(): void;
  /**
   * This [action](/automations/actions#all-actions) puts the radio into RX mode and switches `gdo0_pin` to input mode.
   * @actionKey cc1101.begin_rx
   */
  beginRx(): void;
  /**
   * This [action](/automations/actions#all-actions) puts the radio into TX mode and switches `gdo0_pin` to output mode.
   * @actionKey cc1101.begin_tx
   */
  beginTx(): void;
  /**
   * This [action](/automations/actions#all-actions) transmits a packet. Only available when `packet_mode` is enabled.
   * @actionKey cc1101.send_packet
   */
  sendPacket(params?: CC1101Component_SendPacketParams): void;
  /**
   * This [action](/automations/actions#all-actions) changes the operating frequency at runtime.
   * @actionKey cc1101.set_frequency
   */
  setFrequency(params?: CC1101Component_SetFrequencyParams): void;
  /**
   * This [action](/automations/actions#all-actions) changes the transmission power at runtime.
   * @actionKey cc1101.set_output_power
   */
  setOutputPower(params?: CC1101Component_SetOutputPowerParams): void;
  /**
   * This [action](/automations/actions#all-actions) changes the modulation type at runtime.
   * @actionKey cc1101.set_modulation_type
   */
  setModulationType(params?: CC1101Component_SetModulationTypeParams): void;
  /**
   * This [action](/automations/actions#all-actions) changes the symbol rate at runtime.
   * @actionKey cc1101.set_symbol_rate
   */
  setSymbolRate(params?: CC1101Component_SetSymbolRateParams): void;
  /**
   * This [action](/automations/actions#all-actions) changes the internal RX attenuation at runtime.
   * @actionKey cc1101.set_rx_attenuation
   */
  setRxAttenuation(params?: CC1101Component_SetRxAttenuationParams): void;
  /**
   * This [action](/automations/actions#all-actions) enables or disables the DC blocking filter at runtime.
   * @actionKey cc1101.set_dc_blocking_filter
   */
  setDcBlockingFilter(params?: CC1101Component_SetDcBlockingFilterParams): void;
  /**
   * This [action](/automations/actions#all-actions) enables or disables Manchester encoding at runtime.
   * @actionKey cc1101.set_manchester
   */
  setManchester(params?: CC1101Component_SetManchesterParams): void;
  /**
   * This [action](/automations/actions#all-actions) changes the receive filter bandwidth at runtime.
   * @actionKey cc1101.set_filter_bandwidth
   */
  setFilterBandwidth(params?: CC1101Component_SetFilterBandwidthParams): void;
  /**
   * This [action](/automations/actions#all-actions) changes the FSK/GFSK frequency deviation at runtime.
   * @actionKey cc1101.set_fsk_deviation
   */
  setFskDeviation(params?: CC1101Component_SetFskDeviationParams): void;
  /**
   * This [action](/automations/actions#all-actions) changes the MSK deviation index at runtime.
   * @actionKey cc1101.set_msk_deviation
   */
  setMskDeviation(params?: CC1101Component_SetMskDeviationParams): void;
  /**
   * This [action](/automations/actions#all-actions) changes the channel number at runtime.
   * @actionKey cc1101.set_channel
   */
  setChannel(params?: CC1101Component_SetChannelParams): void;
  /**
   * This [action](/automations/actions#all-actions) changes the channel spacing at runtime.
   * @actionKey cc1101.set_channel_spacing
   */
  setChannelSpacing(params?: CC1101Component_SetChannelSpacingParams): void;
  /**
   * This [action](/automations/actions#all-actions) changes the intermediate frequency at runtime.
   * @actionKey cc1101.set_if_frequency
   */
  setIfFrequency(params?: CC1101Component_SetIfFrequencyParams): void;
}

// ── climate::Climate ─────────────────────────────────────────────────

export interface Climate_ControlParams {
  /** **string**: Put the climate device in a specific mode. One of

  *See also: [Climate Component](https://esphome.io/components/climate#climatecontrol-action)* */
  mode?: string;
  /** **float**: Set the target temperature of a climate device.

  *See also: [Climate Component](https://esphome.io/components/climate#climatecontrol-action)* */
  /** @yamlKey target_temperature */
  targetTemperature?: number;
  /** **float**: Set the lower target temperature of a climate device with a two-point target temperature.

  *See also: [Climate Component](https://esphome.io/components/climate#climatecontrol-action)* */
  /** @yamlKey target_temperature_low */
  targetTemperatureLow?: number;
  /** **float**: Set the higher target temperature of a climate device with a two-point target temperature.

  *See also: [Climate Component](https://esphome.io/components/climate#climatecontrol-action)* */
  /** @yamlKey target_temperature_high */
  targetTemperatureHigh?: number;
  /** **float**: Set the target humidity of a climate device.

  *See also: [Climate Component](https://esphome.io/components/climate#climatecontrol-action)* */
  /** @yamlKey target_humidity */
  targetHumidity?: number;
  /** **string**: Set the fan mode of the climate device. One of `ON`, `OFF`, `AUTO`, `LOW`, `MEDIUM`, `HIGH`, `MIDDLE`, `FOCUS`, `DIFFUSE`, `QUIET`.

  *See also: [Climate Component](https://esphome.io/components/climate#climatecontrol-action)* */
  /** @yamlKey fan_mode */
  fanMode?: string;
  /** **string**: Set one of the supported custom_fan_modes of the climate device.

  *See also: [Climate Component](https://esphome.io/components/climate#climatecontrol-action)* */
  /** @yamlKey custom_fan_mode */
  customFanMode?: string;
  /** **string**: Set the preset of the climate device. One of `ECO`, `AWAY`, `BOOST`, `COMFORT`, `HOME`, `SLEEP`, `ACTIVITY`.

  *See also: [Climate Component](https://esphome.io/components/climate#climatecontrol-action)* */
  preset?: string;
  /** **string**: Set one of the supported custom_presets of the climate device.

  *See also: [Climate Component](https://esphome.io/components/climate#climatecontrol-action)* */
  /** @yamlKey custom_preset */
  customPreset?: string;
  /** **string**: Set the swing mode of the climate device. One of `OFF`, `BOTH`, `VERTICAL`, `HORIZONTAL`.

  *See also: [Climate Component](https://esphome.io/components/climate#climatecontrol-action)* */
  /** @yamlKey swing_mode */
  swingMode?: string;
}

export interface ClimateActions {
  /**
   * This is an [Action](/automations/actions#all-actions) for setting parameters for climate devices.
   * @actionKey climate.control
   */
  control(params?: Climate_ControlParams): void;
}

// ── cm1106::CM1106Component ──────────────────────────────────────────

export interface CM1106ComponentActions {
  /**
   * This [action](/automations/actions#all-actions) executes zero point calibration command on the sensor with the given ID.
   * @actionKey cm1106.calibrate_zero
   */
  calibrateZero(): void;
}

// ── cover::Cover ─────────────────────────────────────────────────────

export interface Cover_ControlParams {
  /** **boolean**: Whether to stop the cover.

  *See also: [Cover Component](https://esphome.io/components/cover#covercontrol-action)* */
  stop?: boolean;
  /** **string**: The state to set the cover to - one of `OPEN` or `CLOSE`.

  *See also: [Cover Component](https://esphome.io/components/cover#covercontrol-action)* */
  state?: string;
  /** **float**: The cover position to set.

  *See also: [Cover Component](https://esphome.io/components/cover#covercontrol-action)* */
  position?: number;
  /** **float**: The tilt position to set. In range 0% - 100%.

  *See also: [Cover Component](https://esphome.io/components/cover#covercontrol-action)* */
  tilt?: number;
}

export interface Cover_PublishParams {
  /** The state to publish. One of `OPEN`, `CLOSED`. If using a lambda, use `COVER_OPEN` or `COVER_CLOSED`.

  *See also: [Template Cover](https://esphome.io/components/cover/template#in-some-trigger)* */
  state?: "OPEN" | "CLOSED";
  /** **float**: The position to publish, from 0 (CLOSED) to 1.0 (OPEN)

  *See also: [Template Cover](https://esphome.io/components/cover/template#in-some-trigger)* */
  position?: number;
  /** **string**: The current operation mode to publish. One of `IDLE`, `OPENING` and `CLOSING`. If using a lambda, use `COVER_OPERATION_IDLE`, `COVER_OPERATION_OPENING`, and `COVER_OPERATION_CLOSING`.

  *See also: [Template Cover](https://esphome.io/components/cover/template#in-some-trigger)* */
  /** @yamlKey current_operation */
  currentOperation?: string;
  /** **float**: The tilt position to publish, from 0 (CLOSED) to 1.0 (OPEN)

  *See also: [Template Cover](https://esphome.io/components/cover/template#in-some-trigger)* */
  tilt?: number;
}

export interface CoverActions {
  /**
   * This [action](/automations/actions#all-actions) opens the cover with the given ID when executed.
   * @actionKey cover.open
   */
  open(): void;
  /**
   * This [action](/automations/actions#all-actions) closes the cover with the given ID when executed.
   * @actionKey cover.close
   */
  close(): void;
  /**
   * This [action](/automations/actions#all-actions) stops the cover with the given ID when executed.
   * @actionKey cover.stop
   */
  stop(): void;
  /**
   * This [action](/automations/actions#all-actions) toggles the cover with the given ID when executed, cycling through the states close/stop/open/stop... This allows the cover to be controlled by a single push button.
   * @actionKey cover.toggle
   */
  toggle(): void;
  /**
   * This [action](/automations/actions#all-actions) is a more generic version of the other cover actions and allows all cover attributes to be set.
   * @actionKey cover.control
   */
  control(params?: Cover_ControlParams): void;
  /**
   * You can also publish a state to a template cover from elsewhere in your YAML file with the `cover.template.publish` action.
   * @actionKey template.cover.publish
   */
  publish(params?: Cover_PublishParams): void;
}

// ── cs5460a::CS5460AComponent ────────────────────────────────────────

export interface CS5460AComponentActions {
  /**
   * This action can be used in automations to interrupt the current *computation cycle* and start a new one. This is useful if you're measuring multiple current/power values using a single CS5460A chip and a signal multiplexer. As an example you can measure the power usage on up to wall sockets in a house by using one voltage transformer and 16 current transformers, each on the cable leading to the corresponding wall socket. One side of all the current transformers connects directly to your CS5460A current input terminal (plus any filtering and protection circuitry as recommended in the datasheet), while the other side each connects to one channel of a CD74HC4067 analog multiplexer. The multiplexer's single signal pin then connects to the CS5460A's second current input terminal. Every time the CS5460A sensor publishes a new power value, an automation can switch the multiplexer to the next channel but it needs to interrupt the *computation cycle* automatically started when the previous one ended, and start a new cycle that uses current samples only from the new CD74HC4067 multiplexer channel.
   * @actionKey cs5460a.restart
   */
  restart(): void;
}

// ── datetime::DateTimeEntity ─────────────────────────────────────────

export interface DateTimeEntity_SetParams {
  /** **string**: The value to set the datetime to.

  *See also: [Datetime Component](https://esphome.io/components/datetime#using-a-lambda)* */
  datetime: string;
}

export interface DateTimeEntityActions {
  /**
   * This is an [Action](/automations/actions#all-actions) for setting a datetime datetime state. The `datetime` provided can be in one of 3 formats:
   * @actionKey datetime.datetime.set
   */
  set(params?: DateTimeEntity_SetParams): void;
}

// ── datetime::TimeEntity ─────────────────────────────────────────────

export interface TimeEntity_SetParams {
  /** **string**: The value to set the datetime to.

  *See also: [Datetime Component](https://esphome.io/components/datetime#using-a-lambda)* */
  time: string;
}

export interface TimeEntityActions {
  /**
   * This is an [Action](/automations/actions#all-actions) for setting a datetime time state. The `time` provided can be in one of 3 formats:
   * @actionKey time.datetime.set
   */
  set(params?: TimeEntity_SetParams): void;
}

// ── deep_sleep::DeepSleepComponent ───────────────────────────────────

export interface DeepSleepComponent_EnterParams {
  /** The time duration to stay in deep sleep mode. If a template is used, it should return a value in milliseconds.

  *See also: [Deep Sleep Component](https://esphome.io/components/deep_sleep#esp32-can-sleep-until-a-specific-time-of-day)* */
  /** @yamlKey sleep_duration */
  sleepDuration?: Record<string, unknown>;
  /** **string**: The time of day to wake up. Only on ESP32.

  *See also: [Deep Sleep Component](https://esphome.io/components/deep_sleep#esp32-can-sleep-until-a-specific-time-of-day)* */
  until?: string;
  /** **[ID](/guides/configuration-types#id)**: The ID of the time component to use for the `until` option. Only on ESP32.

  *See also: [Deep Sleep Component](https://esphome.io/components/deep_sleep#esp32-can-sleep-until-a-specific-time-of-day)* */
  /** @yamlKey time_id */
  timeId?: unknown;
}

export interface DeepSleepComponentActions {
  /**
   * This action makes the given deep sleep component enter deep sleep immediately.
   * @actionKey deep_sleep.enter
   */
  enter(params?: DeepSleepComponent_EnterParams): void;
  /**
   * This action allows the given deep sleep component to enter deep sleep, after previously being prevented.
   * @actionKey deep_sleep.allow
   */
  allow(): void;
  /**
   * This action prevents the given deep sleep component from entering deep sleep. Useful for keeping the ESP active during data transfer or OTA updating (See note below for more information).
   * @actionKey deep_sleep.prevent
   */
  prevent(): void;
}

// ── dfplayer::DFPlayer ───────────────────────────────────────────────

export interface DFPlayer_PlayMp3Params {
  /** **int**: The file number inside the `mp3` folder to play.

  *See also: [DF-Player mini](https://esphome.io/components/dfplayer#dfplayerplay_mp3-action)* */
  file: number;
}

export interface DFPlayer_PlayParams {
  /** **int**: The global track number (from all tracks in the device).

  *See also: [DF-Player mini](https://esphome.io/components/dfplayer#dfplayerplay-action)* */
  file: number;
  /** **boolean**: Repeats playing the same track. Defaults to `false`.

  *See also: [DF-Player mini](https://esphome.io/components/dfplayer#dfplayerplay-action)* */
  loop?: boolean;
}

export interface DFPlayer_PlayFolderParams {
  /** **int**: The folder number.

  *See also: [DF-Player mini](https://esphome.io/components/dfplayer#dfplayerplay_folder-action)* */
  folder: number;
  /** **int**: The file number inside the folder to play. Optional only if `loop` is not set.

  *See also: [DF-Player mini](https://esphome.io/components/dfplayer#dfplayerplay_folder-action)* */
  file?: number;
  /** **boolean**: Repeats playing all files in the folder. Causes `file` to be ignored. Defaults to `false`.

  *See also: [DF-Player mini](https://esphome.io/components/dfplayer#dfplayerplay_folder-action)* */
  loop?: boolean;
}

export interface DFPlayer_SetDeviceParams {
  device: "USB" | "TF_CARD";
}

export interface DFPlayer_SetVolumeParams {
  /** **int**: The volume value. Valid values goes from `0` to `30`.

  *See also: [DF-Player mini](https://esphome.io/components/dfplayer#dfplayerset_volume-action)* */
  volume: number;
}

export interface DFPlayer_SetEqParams {
  /** **enum**: Eq Preset value. Valid values are `NORMAL`, `POP`, `ROCK`, `JAZZ`, `CLASSIC` and `BASS`.

  *See also: [DF-Player mini](https://esphome.io/components/dfplayer#dfplayerset_eq-action)* */
  /** @yamlKey eq_preset */
  eqPreset: "NORMAL" | "POP" | "ROCK" | "JAZZ" | "CLASSIC" | "BASS";
}

export interface DFPlayerActions {
  /**
   * Starts playback of next track or skips to the next track.
   * @actionKey dfplayer.play_next
   */
  playNext(): void;
  /**
   * Plays the previously played track.
   * @actionKey dfplayer.play_previous
   */
  playPrevious(): void;
  /**
   * Plays a track inside the folder `mp3`. Files inside the folder must be numbered from 1 to 9999, like `0001.mp3`, `0002.mp3`, ... etc. The folder name needs to be `mp3`, placed under the SD card root directory, and the mp3 file name needs to be 4 digits, for example, "0001.mp3", placed under the mp3 folder. If you want, you can add additional text after the number in the filename, for example, `0001hello.mp3`, but must always be referenced by number only in yaml.
   * @actionKey dfplayer.play_mp3
   */
  playMp3(params?: DFPlayer_PlayMp3Params): void;
  /**
   * Plays a track.
   * @actionKey dfplayer.play
   */
  play(params?: DFPlayer_PlayParams): void;
  /**
   * Plays files inside numbered folders, folders must be numbered from 1 and with leading zeros. Like `01`, `02`, ... etc. Files inside the folders must be numbered with two leading zeros, like `001.mp3`, `002.mp3`, ... etc. Folder numbers can range from 1 to 99 and file name from 1 to 255 or folder number from 1 to 10 and file number from 1 to 1000.
   * @actionKey dfplayer.play_folder
   */
  playFolder(params?: DFPlayer_PlayFolderParams): void;
  /**
   * Changes the device in use. Valid values are `TF_CARD` and `USB`.
   * @actionKey dfplayer.set_device
   */
  setDevice(params?: DFPlayer_SetDeviceParams): void;
  /**
   * Changes volume.
   * @actionKey dfplayer.set_volume
   */
  setVolume(params?: DFPlayer_SetVolumeParams): void;
  /**
   * Turn volume up.
   * @actionKey dfplayer.volume_up
   */
  volumeUp(): void;
  /**
   * Turn volume down.
   * @actionKey dfplayer.volume_down
   */
  volumeDown(): void;
  /**
   * Changes audio equalization preset.
   * @actionKey dfplayer.set_eq
   */
  setEq(params?: DFPlayer_SetEqParams): void;
  /**
   * Enters sleep mode. Playback is stopped and the action `dfplayer.set_device: TF_CARD` should be send for playback to be enabled again.
   * @actionKey dfplayer.sleep
   */
  sleep(): void;
  /**
   * Module reset.
   * @actionKey dfplayer.reset
   */
  reset(): void;
  /**
   * Starts playing a track or resumes paused playback.
   * @actionKey dfplayer.start
   */
  start(): void;
  /**
   * Pauses playback, playback can be resumed from the same position with `dfplayer.start`.
   * @actionKey dfplayer.pause
   */
  pause(): void;
  /**
   * Stops playback.
   * @actionKey dfplayer.stop
   */
  stop(): void;
  /**
   * Randomly plays all tracks.
   * @actionKey dfplayer.random
   */
  random(): void;
}

// ── dfrobot_sen0395::DfrobotSen0395Component ─────────────────────────

export interface DfrobotSen0395Component_SettingsParams {
  /** **boolean**: If set to `true`, a factory reset of the sensor will be performed (before changing other options if present). Ignored if not set or set to `false`.

  *See also: [DFRobot mmWave Radar](https://esphome.io/components/dfrobot_sen0395#configuration-variables)* */
  /** @yamlKey factory_reset */
  factoryReset?: boolean;
  /** **list**: A list of detection segments. A segment specifies from where to where detection should trigger. One to four segments and ranges from 0cm to 9m may be specified. Distances should be defined in steps of 15cm. Note that the specified ranges are rounded internally. Segments can be defined in a one or two dimensional list. Pairs of values must be defined (from distance to distance). The default is one range from 0cm to 3m. **Examples** In the above example, if a person was present in the range between 0cm and 3m (distance from the sensor) or between 5.1m and 6.6m the sensor would trigger (meaning a person was detected). If a person is present between 3.1m and 5m or 6.7m and 9m it would not trigger. Section values can be defined using lambdas, so you can set the distances depending on other entities. Distances are defined as a float in meters (10cm = 0.1). If you return a negative value (-1) the segment will not be set.

  *See also: [DFRobot mmWave Radar](https://esphome.io/components/dfrobot_sen0395#configuration-variables)* */
  /** @yamlKey detection_segments */
  detectionSegments?: unknown;
  /** @yamlKey output_latency */
  outputLatency?: Record<string, unknown>;
  /** **int**: Set the sensitivity of the sensor. Ranges from 0 to 9. Return 0-9. Returning -1 keeps the value unchanged.

  *See also: [DFRobot mmWave Radar](https://esphome.io/components/dfrobot_sen0395#configuration-variables)* */
  sensitivity?: number;
}

export interface DfrobotSen0395ComponentActions {
  /**
   * Restart the sensor.
   * @actionKey dfrobot_sen0395.reset
   */
  reset(): void;
  /**
   * > [!WARNING] > Each change to the configuration of the mmWave radar triggers a write to its internal flash/EEPROM. > Write cycles to this memory are limited, so avoid the practice of changing settings frequently. > Determine the appropriate settings for your device and avoid changing them unless absolutely necessary.
   * @actionKey dfrobot_sen0395.settings
   */
  settings(params?: DfrobotSen0395Component_SettingsParams): void;
}

// ── ds1307::DS1307Component ──────────────────────────────────────────

export interface DS1307ComponentActions {
  /**
   * This [Action](/automations/actions#all-actions) triggers a synchronization of the current system time to the RTC hardware.
   * @actionKey ds1307.write_time
   */
  writeTime(): void;
  /**
   * This [Action](/automations/actions#all-actions) triggers a synchronization of the current system time from the RTC hardware.
   * @actionKey ds1307.read_time
   */
  readTime(): void;
}

// ── duty_time_sensor::DutyTimeSensor ─────────────────────────────────

export interface DutyTimeSensorActions {
  /**
   * This action starts/resume time tracking. In lambdas, you may use the `start()` method.
   * @actionKey duty_time.sensor.start
   */
  start(): void;
  /**
   * This action suspends time tracking. Causes the sensor to be updated, including the `last_time` sensor. In lambdas, you may use the `stop()` method.
   * @actionKey duty_time.sensor.stop
   */
  stop(): void;
  /**
   * This action resets the duty time counter. Causes a sensor update. Does not affect the `last_time` sensor. In lambdas, you may use the `reset()` method.
   * @actionKey duty_time.sensor.reset
   */
  reset(): void;
}

// ── esp32_ble_tracker::ESP32BLETracker ───────────────────────────────

export interface ESP32BLETracker_StartScanParams {
  /** **boolean**: Whether to start the scan in continuous mode. Defaults to `false`

  *See also: [ESP32 Bluetooth Low Energy Tracker Hub](https://esphome.io/components/esp32_ble_tracker#configuration-variables)* */
  continuous?: boolean;
}

export interface ESP32BLETrackerActions {
  /**
   * Start a Bluetooth scan. If there is a scan already in progress, then the action is ignored.
   * @actionKey esp32_ble_tracker.start_scan
   */
  startScan(params?: ESP32BLETracker_StartScanParams): void;
  /**
   * Stops the bluetooth scanning. It can be started again with the above start scan action.
   * @actionKey esp32_ble_tracker.stop_scan
   */
  stopScan(): void;
}

// ── esp8266_pwm::ESP8266PWM ──────────────────────────────────────────

export interface ESP8266PWM_SetFrequencyParams {
  /** The frequency to set in Hz.

  *See also: [ESP8266 Software PWM Output](https://esphome.io/components/output/esp8266_pwm#outputesp8266_pwmset_frequency-action)* */
  frequency: number;
}

export interface ESP8266PWMActions {
  /**
   * This [Action](/automations/actions#all-actions) allows you to manually change the frequency of an ESP8266 PWM channel at runtime. Use cases include controlling a passive buzzer (for pitch control).
   * @actionKey esp8266_pwm.output.set_frequency
   */
  setFrequency(params?: ESP8266PWM_SetFrequencyParams): void;
}

// ── espnow::ESPNowComponent ──────────────────────────────────────────

export interface ESPNowComponent_BroadcastParams {
  /** **MAC Address**: The Peer address that needs to be removed from the list of allowed peers.

  *See also: [ESPNow communication Component](https://esphome.io/components/espnow#configuration-variables)* */
  address?: MACAddress;
  /** **string or list of bytes**: The data to be sent.

  *See also: [ESPNow communication Component](https://esphome.io/components/espnow#configuration-variables)* */
  data: string | number[];
  /** **[Automation](/automations)**: An automation to perform when the data is sent successfully.

  *See also: [ESPNow communication Component](https://esphome.io/components/espnow#configuration-variables)* */
  /** @yamlKey on_sent */
  onSent?: TriggerHandler[];
  /** **[Automation](/automations)**: An automation to perform when the data could not be sent.

  *See also: [ESPNow communication Component](https://esphome.io/components/espnow#configuration-variables)* */
  /** @yamlKey on_error */
  onError?: TriggerHandler[];
  /** **boolean**: The automation will wait for the data to be sent and for the `on_sent` or `on_error` actions to be finished before continuing with the next action. Defaults to `true`.

  *See also: [ESPNow communication Component](https://esphome.io/components/espnow#configuration-variables)* */
  /** @yamlKey wait_for_sent */
  waitForSent?: boolean;
  /** **boolean**: If set to `false`, the next action will not be triggered if the data could not be sent. Defaults to `true`.

  *See also: [ESPNow communication Component](https://esphome.io/components/espnow#configuration-variables)* */
  /** @yamlKey continue_on_error */
  continueOnError?: boolean;
}

export interface ESPNowComponent_SendParams {
  /** **MAC Address**: The Peer address that needs to be removed from the list of allowed peers.

  *See also: [ESPNow communication Component](https://esphome.io/components/espnow#configuration-variables)* */
  address: MACAddress;
  /** **string or list of bytes**: The data to be sent.

  *See also: [ESPNow communication Component](https://esphome.io/components/espnow#configuration-variables)* */
  data: string | number[];
  /** **[Automation](/automations)**: An automation to perform when the data is sent successfully.

  *See also: [ESPNow communication Component](https://esphome.io/components/espnow#configuration-variables)* */
  /** @yamlKey on_sent */
  onSent?: TriggerHandler[];
  /** **[Automation](/automations)**: An automation to perform when the data could not be sent.

  *See also: [ESPNow communication Component](https://esphome.io/components/espnow#configuration-variables)* */
  /** @yamlKey on_error */
  onError?: TriggerHandler[];
  /** **boolean**: The automation will wait for the data to be sent and for the `on_sent` or `on_error` actions to be finished before continuing with the next action. Defaults to `true`.

  *See also: [ESPNow communication Component](https://esphome.io/components/espnow#configuration-variables)* */
  /** @yamlKey wait_for_sent */
  waitForSent?: boolean;
  /** **boolean**: If set to `false`, the next action will not be triggered if the data could not be sent. Defaults to `true`.

  *See also: [ESPNow communication Component](https://esphome.io/components/espnow#configuration-variables)* */
  /** @yamlKey continue_on_error */
  continueOnError?: boolean;
}

export interface ESPNowComponent_SetChannelParams {
  /** **int**: This can be a value between `0` and `15`. The maximum channel number depends on the country or region where you are using the device (for example, channels 1-11 are allowed in the US and most of Europe, 1-13 in many other countries, and 1-14 in Japan). For details, see the [Wi-Fi channel regulations by country](https://en.wikipedia.org/wiki/List_of_WLAN_channels) or consult the [Espressif ESP-NOW documentation](https://docs.espressif.com/projects/esp-idf/en/stable/esp32/api-reference/network/esp_now.html). `0` means that espnow will set the channel number itself (most of the time it would be `1`  ).

  *See also: [ESPNow communication Component](https://esphome.io/components/espnow#configuration-variables)* */
  channel: number;
}

export interface ESPNowComponentActions {
  /**
   * This is an [Action](/automations/actions#all-actions) for sending a data packet over the espnow protocol to any device that is listening.
   * @actionKey espnow.broadcast
   */
  broadcast(params?: ESPNowComponent_BroadcastParams): void;
  /**
   * This is an [Action](/automations/actions#all-actions) for sending a data packet over the espnow protocol.
   * @actionKey espnow.send
   */
  send(params?: ESPNowComponent_SendParams): void;
  /**
   * This is an [Action](/automations/actions#all-actions) to change the channel that espnow is sending and receiving on.
   * @actionKey espnow.set_channel
   */
  setChannel(params?: ESPNowComponent_SetChannelParams): void;
}

// ── event::Event ─────────────────────────────────────────────────────

export interface Event_TriggerParams {
  /** **string**: The type of event to trigger.

  *See also: [Event Component](https://esphome.io/components/event#eventtrigger-action)* */
  /** @yamlKey event_type */
  eventType: string;
}

export interface EventActions {
  /**
   * This action allows for the triggering of an event from within an automation.
   * @actionKey event.trigger
   */
  trigger(params?: Event_TriggerParams): void;
}

// ── ezo_pmp::EzoPMP ──────────────────────────────────────────────────

export interface EzoPMP_DoseVolumeParams {
  /** **float**: The volume to dose in milliliters. If negative, pump will run in reverse.

  *See also: [Atlas Scientific Peristaltic Pump](https://esphome.io/components/ezo_pmp#configuration-variables)* */
  volume: number;
}

export interface EzoPMP_DoseVolumeOverTimeParams {
  /** **float**: The volume to dose in milliliters. If negative, pump will run in reverse.

  *See also: [Atlas Scientific Peristaltic Pump](https://esphome.io/components/ezo_pmp#configuration-variables)* */
  volume: number;
  /** **int**: The time (in minutes) the pump will take to dose the volume requested.

  *See also: [Atlas Scientific Peristaltic Pump](https://esphome.io/components/ezo_pmp#configuration-variables)* */
  duration: number;
}

export interface EzoPMP_DoseWithConstantFlowRateParams {
  /** **float**: The volume to dose in milliliters every minute. If negative, pump will run in reverse.

  *See also: [Atlas Scientific Peristaltic Pump](https://esphome.io/components/ezo_pmp#configuration-variables)* */
  /** @yamlKey volume_per_minute */
  volumePerMinute: number;
  /** **int**: The time (in minutes) the pump will dose the volume requested every minute.

  *See also: [Atlas Scientific Peristaltic Pump](https://esphome.io/components/ezo_pmp#configuration-variables)* */
  duration: number;
}

export interface EzoPMP_SetCalibrationVolumeParams {
  /** **float**: The volume measured as part of the calibration process.

  *See also: [Atlas Scientific Peristaltic Pump](https://esphome.io/components/ezo_pmp#configuration-variables)* */
  volume: number;
}

export interface EzoPMP_ChangeI2cAddressParams {
  /** **int**: The new I2C address for the pump.

  *See also: [Atlas Scientific Peristaltic Pump](https://esphome.io/components/ezo_pmp#configuration-variables)* */
  address: number;
}

export interface EzoPMP_ArbitraryCommandParams {
  command: string;
}

export interface EzoPMPActions {
  /**
   * Use this action to make the LED on the Pump control board to blink for a minute. The pump will not respond to any other action while the LED is blinking.
   * @actionKey ezo_pmp.find
   */
  find(): void;
  /**
   * Use this action in an [automations](/automations) to have the peristaltic pump dose continuously at the [Maximum Flow Rate](https://esphome.io/components/ezo_pmp#ezo_pmp-max_flow_rate_sensor). The pump will automatically stop after 20 days of running in continuous mode.
   * @actionKey ezo_pmp.dose_continuously
   */
  doseContinuously(): void;
  /**
   * Clear the values of the [Current Volume Dosed](https://esphome.io/components/ezo_pmp#ezo_pmp-current_volume_dosed_sensor), [Total Volume Dosed](https://esphome.io/components/ezo_pmp#ezo_pmp-total_volume_dosed_sensor) and [Absolute Total Volume Dosed](https://esphome.io/components/ezo_pmp#ezo_pmp-absolute_total_volume_dosed_sensor) sensors.
   * @actionKey ezo_pmp.clear_total_volume_dosed
   */
  clearTotalVolumeDosed(): void;
  /**
   * Clear the calibration values stored in the pump. You can check the calibration status by using the [Calibration Status](https://esphome.io/components/ezo_pmp#ezo_pmp-calibration_status_text_sensor) sensor.
   * @actionKey ezo_pmp.clear_calibration
   */
  clearCalibration(): void;
  /**
   * Use this action to pause a Dosing command that was previously issued. To determine if the dosing is paused or not, you can use the [Is Paused](https://esphome.io/components/ezo_pmp#ezo_pmp-is_paused_binary_sensor) sensor. If the pump is currently paused, issuing this action again will unpause it.
   * @actionKey ezo_pmp.pause_dosing
   */
  pauseDosing(): void;
  /**
   * Use this action to stop the current Dosing command.
   * @actionKey ezo_pmp.stop_dosing
   */
  stopDosing(): void;
  /**
   * Use this action in an [automations](/automations) to have the peristaltic pump dose an specific volume (in milliliters) at the [Maximum Flow Rate](https://esphome.io/components/ezo_pmp#ezo_pmp-max_flow_rate_sensor). If the volume is negative the pump will run backwards.
   * @actionKey ezo_pmp.dose_volume
   */
  doseVolume(params?: EzoPMP_DoseVolumeParams): void;
  /**
   * Use this action in an [automations](/automations) to have the peristaltic pump dose an specific `volume` (in milliliters) over the provided `duration` (in minutes). At the end of the time period the pump will have dosed the specified `volume`. If the volume is negative the pump will run backwards.
   * @actionKey ezo_pmp.dose_volume_over_time
   */
  doseVolumeOverTime(params?: EzoPMP_DoseVolumeOverTimeParams): void;
  /**
   * Use this action in an [automations](/automations) to have the peristaltic pump dose an specific `volume` (in milliliters) every minute for the provided `duration` (in minutes). At the end of the time period the pump will have dosed the specified `volume` times the `duration`. If the volume is negative the pump will run backwards.
   * @actionKey ezo_pmp.dose_with_constant_flow_rate
   */
  doseWithConstantFlowRate(params?: EzoPMP_DoseWithConstantFlowRateParams): void;
  /**
   * Use this action to calibrate the peristaltic pump. The EZO-PMP needs two forms of calibration: absolute volume and volume over time. You can check the calibration status by using the [Calibration Status](https://esphome.io/components/ezo_pmp#ezo_pmp-calibration_status_text_sensor) sensor. For the procedure on calibrating the pump check the datasheet.
   * @actionKey ezo_pmp.set_calibration_volume
   */
  setCalibrationVolume(params?: EzoPMP_SetCalibrationVolumeParams): void;
  /**
   * Changes the i2c address of the pump to the provided value. After the address is changed you must upload a new version of the ESPHome firmware with the updated I2C address for the pump to work.
   * @actionKey ezo_pmp.change_i2c_address
   */
  changeI2cAddress(params?: EzoPMP_ChangeI2cAddressParams): void;
  /** @actionKey ezo_pmp.arbitrary_command */
  arbitraryCommand(params?: EzoPMP_ArbitraryCommandParams): void;
}

// ── fan::Fan ─────────────────────────────────────────────────────────

export interface Fan_TurnOnParams {
  /** **boolean**: Set the oscillation state of the fan. Defaults to not affecting oscillation.

  *See also: [Fan Component](https://esphome.io/components/fan#fanturn_on-action)* */
  oscillating?: boolean;
  /** **int**: Set the speed level of the fan. Can be a number between 1 and the maximum speed level of the fan.

  *See also: [Fan Component](https://esphome.io/components/fan#fanturn_on-action)* */
  speed?: number;
  /** **string**: Set the direction of the fan. Can be either `forward` or `reverse`. Defaults to not changing the direction.

  *See also: [Fan Component](https://esphome.io/components/fan#fanturn_on-action)* */
  direction?: string;
}

export interface Fan_CycleSpeedParams {
  /** **boolean**: Determines if the fan will cycle off after cycling though its highest speed. Can be `true` or `false`. If `false` fan will cycle to its lowest speed instead of turning off. Defaults to `true`.

  *See also: [Fan Component](https://esphome.io/components/fan#fancycle_speed-action)* */
  /** @yamlKey off_speed_cycle */
  offSpeedCycle?: boolean;
}

export interface FanActions {
  /**
   * Toggles the ON/OFF state of the fan with the given ID when executed.
   * @actionKey fan.toggle
   */
  toggle(): void;
  /**
   * Turns the fan with the given ID off when executed.
   * @actionKey fan.turn_off
   */
  turnOff(): void;
  /**
   * Turns the fan with the given ID on when executed.
   * @actionKey fan.turn_on
   */
  turnOn(params?: Fan_TurnOnParams): void;
  /**
   * Increments through speed levels of the fan with the given ID when executed. If the fan's speed level is set to maximum when executed, fan will cycle off unless `off_speed_cycle` is set to `false`.
   * @actionKey fan.cycle_speed
   */
  cycleSpeed(params?: Fan_CycleSpeedParams): void;
}

// ── fingerprint_grow::FingerprintGrowComponent ───────────────────────

export interface FingerprintGrowComponent_EnrollParams {
  /** **int**: The slot number to enroll the new fingerprint into. Limited to the fingerprint capacity available on the reader.

  *See also: [Grow Fingerprint Reader](https://esphome.io/components/fingerprint_grow#configuration-variables)* */
  /** @yamlKey finger_id */
  fingerId: number;
  /** **int**: Number of times to scan the finger to be enrolled. Limited to the number of character buffers available on the reader. Defaults to 2.

  *See also: [Grow Fingerprint Reader](https://esphome.io/components/fingerprint_grow#configuration-variables)* */
  /** @yamlKey num_scans */
  numScans?: number;
}

export interface FingerprintGrowComponent_DeleteParams {
  /** **int**: The slot number of the enrolled fingerprint to delete.

  *See also: [Grow Fingerprint Reader](https://esphome.io/components/fingerprint_grow#configuration-variables)* */
  /** @yamlKey finger_id */
  fingerId: number;
}

export interface FingerprintGrowComponent_LedControlParams {
  /** **boolean**: The state to set the LED.

  *See also: [Grow Fingerprint Reader](https://esphome.io/components/fingerprint_grow#configuration-variables)* */
  state: boolean;
}

export interface FingerprintGrowComponent_AuraLedControlParams {
  /** **string**: The state to set the LED. One of `BREATHING`, `FLASHING`, `ALWAYS_ON`, `ALWAYS_OFF`, `GRADUAL_ON` and `GRADUAL_OFF`.

  *See also: [Grow Fingerprint Reader](https://esphome.io/components/fingerprint_grow#configuration-variables)* */
  state: string;
  /** **int**: The duration each cycle lasts, a factor of 10ms. Only relevant for `BREATHING`, `FLASHING`, `GRADUAL_ON` and `GRADUAL_OFF` states. The total duration is defined by 10ms *speed* count. Range is 0 to 255.

  *See also: [Grow Fingerprint Reader](https://esphome.io/components/fingerprint_grow#configuration-variables)* */
  speed: number;
  /** **string**: The LED color to activate. For R503, one of `RED`, `BLUE` and `PURPLE`. For R503-RGB, one of `RED`, `BLUE`, `PURPLE`, `GREEN`, `YELLOW`, `CYAN` and `WHITE`.

  *See also: [Grow Fingerprint Reader](https://esphome.io/components/fingerprint_grow#configuration-variables)* */
  color: string;
  /** **int**: How many times to repeat the pattern. Only relevant for `BREATHING` and `FLASHING` states. 0 for infinite, or 1 to 255.

  *See also: [Grow Fingerprint Reader](https://esphome.io/components/fingerprint_grow#configuration-variables)* */
  count: number;
}

export interface FingerprintGrowComponentActions {
  /**
   * Starts the fingerprint enrollment process on the slot number defined.
   * @actionKey fingerprint_grow.enroll
   */
  enroll(params?: FingerprintGrowComponent_EnrollParams): void;
  /**
   * Cancels the current fingerprint enrollment process. Triggers the `on_enrollment_failed` trigger.
   * @actionKey fingerprint_grow.cancel_enroll
   */
  cancelEnroll(): void;
  /**
   * Removes the enrolled fingerprint from the slot number defined.
   * @actionKey fingerprint_grow.delete
   */
  delete(params?: FingerprintGrowComponent_DeleteParams): void;
  /**
   * Removes all enrolled fingerprints.
   * @actionKey fingerprint_grow.delete_all
   */
  deleteAll(): void;
  /**
   * Turns on or off the LED on the reader. Only available on select models. If you have the R503 or R503-RGB use [`fingerprint_grow.aura_led_control` Action](https://esphome.io/components/fingerprint_grow#fingerprint_grow-aura_led_control) instead.
   * @actionKey fingerprint_grow.led_control
   */
  ledControl(params?: FingerprintGrowComponent_LedControlParams): void;
  /**
   * Controls the Aura LED on the reader. Only available on select models. NOTE: The R503 has 2 variants with different LED colour options.
   * @actionKey fingerprint_grow.aura_led_control
   */
  auraLedControl(params?: FingerprintGrowComponent_AuraLedControlParams): void;
}

// ── globals::GlobalsComponent ────────────────────────────────────────

export interface GlobalsComponent_SetParams {
  /** The value to set the global variable to.

  *See also: [Global Variables](https://esphome.io/components/globals#configuration-variables)* */
  value: string;
}

export interface GlobalsComponentActions {
  /**
   * This [Action](/automations/actions#all-actions) allows you to change the value of a `global` variable without having to use the lambda syntax.
   * @actionKey globals.set
   */
  set(params?: GlobalsComponent_SetParams): void;
}

// ── grove_tb6612fng::GroveMotorDriveTB6612FNG ────────────────────────

export interface GroveMotorDriveTB6612FNG_RunParams {
  channel: number;
  speed: number;
  direction: "FORWARD" | "BACKWARD";
}

export interface GroveMotorDriveTB6612FNG_BreakParams {
  channel: number;
}

export interface GroveMotorDriveTB6612FNG_StopParams {
  channel: number;
}

export interface GroveMotorDriveTB6612FNG_ChangeAddressParams {
  address: number;
}

export interface GroveMotorDriveTB6612FNGActions {
  /**
   * Set the motor to spin by defining the direction and speed of the rotation, speed is a range from 0 to 255
   * @actionKey grove_tb6612fng.run
   */
  run(params?: GroveMotorDriveTB6612FNG_RunParams): void;
  /**
   * Set the motor channel to be on break mode which it ensure the wheel wont spin even if forced or pushed
   * @actionKey grove_tb6612fng.break
   */
  break(params?: GroveMotorDriveTB6612FNG_BreakParams): void;
  /**
   * Set the motor to stop motion but wont stop to spin in case there is a force pulling down, you would want to use break action if this is your case
   * @actionKey grove_tb6612fng.stop
   */
  stop(params?: GroveMotorDriveTB6612FNG_StopParams): void;
  /**
   * Set the board to be on standby when is not used for a long time which reduces power consumptions and any jerking motion when stationary
   * @actionKey grove_tb6612fng.standby
   */
  standby(): void;
  /**
   * Set the board to be awake, every esphome is restarted the default mode is set to standby to ensure the motor wont spin accidentally
   * @actionKey grove_tb6612fng.no_standby
   */
  noStandby(): void;
  /**
   * If you require connecting multiple boards at once, the address can be changed using this action. The address can be changed to a value in the range of `0x01 - 0x7f` inclusive.
   * @actionKey grove_tb6612fng.change_address
   */
  changeAddress(params?: GroveMotorDriveTB6612FNG_ChangeAddressParams): void;
}

// ── haier::HaierClimateBase ──────────────────────────────────────────

export interface HaierClimateBaseActions {
  /**
   * This action turns the AC display off.
   * @actionKey haier.climate.display_off
   */
  displayOff(): void;
  /**
   * This action turns the AC display on.
   * @actionKey haier.climate.display_on
   */
  displayOn(): void;
  /**
   * Turn off health mode.
   * @actionKey haier.climate.health_off
   */
  healthOff(): void;
  /**
   * Turn on health mode (UV light sterilization).
   * @actionKey haier.climate.health_on
   */
  healthOn(): void;
  /**
   * This action toggles AC power
   * @actionKey haier.climate.power_toggle
   */
  powerToggle(): void;
  /**
   * This action turns AC power off
   * @actionKey haier.climate.power_off
   */
  powerOff(): void;
  /**
   * This action turns AC power on.
   * @actionKey haier.climate.power_on
   */
  powerOn(): void;
}

// ── haier::HonClimate ────────────────────────────────────────────────

export interface HonClimate_SetVerticalAirflowParams {
  /** @yamlKey vertical_airflow */
  verticalAirflow: "HEALTH_UP" | "MAX_UP" | "UP" | "CENTER" | "DOWN" | "HEALTH_DOWN";
}

export interface HonClimate_SetHorizontalAirflowParams {
  /** @yamlKey horizontal_airflow */
  horizontalAirflow: "MAX_LEFT" | "LEFT" | "CENTER" | "RIGHT" | "MAX_RIGHT";
}

export interface HonClimateActions {
  /**
   * (supported only by hOn) This action disables beep feedback on every command sent to AC (keep in mind that this will not work for IR remote commands).
   * @actionKey haier.climate.beeper_off
   */
  beeperOff(): void;
  /**
   * (supported only by hOn) This action enables beep feedback on every command sent to AC.
   * @actionKey haier.climate.beeper_on
   */
  beeperOn(): void;
  /**
   * (supported only by hOn) Start 56°C steri-cleaning.
   * @actionKey haier.climate.start_steri_cleaning
   */
  startSteriCleaning(): void;
  /**
   * (supported only by hOn) Start [self-cleaning](https://www.haier.com/in/blogs/beat-the-summer-heat-with-haier-self-cleaning-ac.shtml).
   * @actionKey haier.climate.start_self_cleaning
   */
  startSelfCleaning(): void;
  /**
   * (supported only by hOn) Set direction for vertical airflow if the vertical swing is disabled. Possible values: Health_Up, Max_Up, Up, Center, Down, Health_Down.
   * @actionKey haier.climate.set_vertical_airflow
   */
  setVerticalAirflow(params?: HonClimate_SetVerticalAirflowParams): void;
  /**
   * (supported only by hOn) Set direction for horizontal airflow if the horizontal swing is disabled. Possible values: `Max_Left`, `Left`, `Center`, `Right`, `Max_Right`.
   * @actionKey haier.climate.set_horizontal_airflow
   */
  setHorizontalAirflow(params?: HonClimate_SetHorizontalAirflowParams): void;
}

// ── hbridge::HBridgeFan ──────────────────────────────────────────────

export interface HBridgeFanActions {
  /**
   * Set all h-bridge pins high, shorting the fan/motor's windings and forcing the motor to actively stop.
   * @actionKey hbridge.fan.brake
   */
  brake(): void;
}

// ── hc8::HC8Component ────────────────────────────────────────────────

export interface HC8Component_CalibrateParams {
  baseline: number;
}

export interface HC8ComponentActions {
  /**
   * This [action](/automations/actions#all-actions) executes baseline calibration command on the sensor with the given ID.
   * @actionKey hc8.calibrate
   */
  calibrate(params?: HC8Component_CalibrateParams): void;
}

// ── hdc302x::HDC302XComponent ────────────────────────────────────────

export interface HDC302XComponent_HeaterOnParams {
  power?: unknown;
  duration?: Record<string, unknown>;
}

export interface HDC302XComponentActions {
  /**
   * This [action](/automations/actions#all-actions) enables the integrated heater on the sensor with the given ID. The heater can be used to remove condensation from the humidity sensor or to verify sensor functionality.
   * @actionKey hdc302x.heater_on
   */
  heaterOn(params?: HDC302XComponent_HeaterOnParams): void;
  /**
   * This [action](/automations/actions#all-actions) disables the integrated heater on the sensor with the given ID. After turning off the heater, allow several minutes for the sensor to cool down before expecting accurate readings.
   * @actionKey hdc302x.heater_off
   */
  heaterOff(): void;
}

// ── hlk_fm22x::HlkFm22xComponent ─────────────────────────────────────

export interface HlkFm22xComponent_EnrollParams {
  name: string;
  direction: number;
}

export interface HlkFm22xComponent_DeleteParams {
  /** @yamlKey face_id */
  faceId: number;
}

export interface HlkFm22xComponentActions {
  /**
   * Starts the face enrollment process with a name and direction. To successfully enroll a face, you need to successfully and consecutively scan the face from all directions. A failure in one direction will require enrolling the face again from the start.
   * @actionKey hlk_fm22x.enroll
   */
  enroll(params?: HlkFm22xComponent_EnrollParams): void;
  /**
   * Removes the enrolled face from the slot number defined.
   * @actionKey hlk_fm22x.delete
   */
  delete(params?: HlkFm22xComponent_DeleteParams): void;
  /**
   * Removes all enrolled faces.
   * @actionKey hlk_fm22x.delete_all
   */
  deleteAll(): void;
  /**
   * Scans and tries to match to an enrolled face. Triggers one of the on_face_scan triggers.
   * @actionKey hlk_fm22x.scan
   */
  scan(): void;
  /**
   * Resets the module. Can be useful after a failed enrollment or scan if the module isn't responding correctly. If this command fails it will mark the module as failed.
   * @actionKey hlk_fm22x.reset
   */
  reset(): void;
}

// ── http_request::HttpRequestComponent ───────────────────────────────

export interface HttpRequestComponent_SendParams {
  /** **string**: URL to which to send the request.

  *See also: [HTTP Request](https://esphome.io/components/http_request#configuration-variables)* */
  url: string;
  /** **mapping**: Map of HTTP headers. Values are [templatable](/automations/templates).

  *See also: [HTTP Request](https://esphome.io/components/http_request#configuration-variables)* */
  /** @yamlKey request_headers */
  requestHeaders?: Record<string, unknown>;
  /** **list of strings**: List of the names of HTTP headers to collect from the response.

  *See also: [HTTP Request](https://esphome.io/components/http_request#configuration-variables)* */
  /** @yamlKey collect_headers */
  collectHeaders?: string[];
  /** **boolean**: when set to `true`, the response data will be captured and placed into the `body` variable as a `std::string` for use in [lambdas](/automations/templates#config-lambda). Defaults to `false`.

  *See also: [HTTP Request](https://esphome.io/components/http_request#configuration-variables)* */
  /** @yamlKey capture_response */
  captureResponse?: boolean;
  /** **[Automation](/automations)**: An automation to perform after the request is received.

  *See also: [HTTP Request](https://esphome.io/components/http_request#configuration-variables)* */
  /** @yamlKey on_response */
  onResponse?: TriggerHandler;
  /** **[Automation](/automations)**: An automation to perform if the request cannot be completed.

  *See also: [HTTP Request](https://esphome.io/components/http_request#configuration-variables)* */
  /** @yamlKey on_error */
  onError?: TriggerHandler;
  /** **integer**: The maximum buffer size to be used to store the response. Defaults to `1 kB`.

  *See also: [HTTP Request](https://esphome.io/components/http_request#configuration-variables)* */
  /** @yamlKey max_response_buffer_size */
  maxResponseBufferSize?: number;
  /** **string**: HTTP method to use (`GET`, `POST`, `PUT`, `DELETE`, `PATCH`  ).

  *See also: [HTTP Request](https://esphome.io/components/http_request#configuration-variables)* */
  method: string;
  body?: string;
  json?: Record<string, unknown>;
}

export interface HttpRequestComponent_PostParams {
  /** **string**: URL to which to send the request.

  *See also: [HTTP Request](https://esphome.io/components/http_request#configuration-variables)* */
  url: string;
  /** **mapping**: Map of HTTP headers. Values are [templatable](/automations/templates).

  *See also: [HTTP Request](https://esphome.io/components/http_request#configuration-variables)* */
  /** @yamlKey request_headers */
  requestHeaders?: Record<string, unknown>;
  /** **list of strings**: List of the names of HTTP headers to collect from the response.

  *See also: [HTTP Request](https://esphome.io/components/http_request#configuration-variables)* */
  /** @yamlKey collect_headers */
  collectHeaders?: string[];
  /** **boolean**: when set to `true`, the response data will be captured and placed into the `body` variable as a `std::string` for use in [lambdas](/automations/templates#config-lambda). Defaults to `false`.

  *See also: [HTTP Request](https://esphome.io/components/http_request#configuration-variables)* */
  /** @yamlKey capture_response */
  captureResponse?: boolean;
  /** **[Automation](/automations)**: An automation to perform after the request is received.

  *See also: [HTTP Request](https://esphome.io/components/http_request#configuration-variables)* */
  /** @yamlKey on_response */
  onResponse?: TriggerHandler;
  /** **[Automation](/automations)**: An automation to perform if the request cannot be completed.

  *See also: [HTTP Request](https://esphome.io/components/http_request#configuration-variables)* */
  /** @yamlKey on_error */
  onError?: TriggerHandler;
  /** **integer**: The maximum buffer size to be used to store the response. Defaults to `1 kB`.

  *See also: [HTTP Request](https://esphome.io/components/http_request#configuration-variables)* */
  /** @yamlKey max_response_buffer_size */
  maxResponseBufferSize?: number;
  /** **string**: A HTTP body string to send with request.

  *See also: [HTTP Request](https://esphome.io/components/http_request#configuration-variables)* */
  body?: string;
  /** **mapping**: A HTTP body in JSON format. Values are [templatable](/automations/templates). See [Examples](https://esphome.io/components/http_request#http_request-examples).

  *See also: [HTTP Request](https://esphome.io/components/http_request#configuration-variables)* */
  json?: Record<string, unknown>;
}

export interface HttpRequestComponent_GetParams {
  /** **string**: URL to which to send the request.

  *See also: [HTTP Request](https://esphome.io/components/http_request#configuration-variables)* */
  url: string;
  /** **mapping**: Map of HTTP headers. Values are [templatable](/automations/templates).

  *See also: [HTTP Request](https://esphome.io/components/http_request#configuration-variables)* */
  /** @yamlKey request_headers */
  requestHeaders?: Record<string, unknown>;
  /** **list of strings**: List of the names of HTTP headers to collect from the response.

  *See also: [HTTP Request](https://esphome.io/components/http_request#configuration-variables)* */
  /** @yamlKey collect_headers */
  collectHeaders?: string[];
  /** **boolean**: when set to `true`, the response data will be captured and placed into the `body` variable as a `std::string` for use in [lambdas](/automations/templates#config-lambda). Defaults to `false`.

  *See also: [HTTP Request](https://esphome.io/components/http_request#configuration-variables)* */
  /** @yamlKey capture_response */
  captureResponse?: boolean;
  /** **[Automation](/automations)**: An automation to perform after the request is received.

  *See also: [HTTP Request](https://esphome.io/components/http_request#configuration-variables)* */
  /** @yamlKey on_response */
  onResponse?: TriggerHandler;
  /** **[Automation](/automations)**: An automation to perform if the request cannot be completed.

  *See also: [HTTP Request](https://esphome.io/components/http_request#configuration-variables)* */
  /** @yamlKey on_error */
  onError?: TriggerHandler;
  /** **integer**: The maximum buffer size to be used to store the response. Defaults to `1 kB`.

  *See also: [HTTP Request](https://esphome.io/components/http_request#configuration-variables)* */
  /** @yamlKey max_response_buffer_size */
  maxResponseBufferSize?: number;
}

export interface HttpRequestComponentActions {
  /**
   * This [action](/automations/actions#all-actions) sends a request.
   * @actionKey http_request.send
   */
  send(params?: HttpRequestComponent_SendParams): void;
  /**
   * This [action](/automations/actions#all-actions) sends a POST request.
   * @actionKey http_request.post
   */
  post(params?: HttpRequestComponent_PostParams): void;
  /**
   * This [action](/automations/actions#all-actions) sends a GET request.
   * @actionKey http_request.get
   */
  get(params?: HttpRequestComponent_GetParams): void;
}

// ── http_request::OtaHttpRequestComponent ────────────────────────────

export interface OtaHttpRequestComponent_FlashParams {
  /** **string**: The URL of the file containing an [MD5sum](https://en.wikipedia.org/wiki/Md5sum) of the firmware file pointed to by `url` (below). May not be used with `md5` (above); must be specified if `md5` is not.

  *See also: [OTA Update via HTTP Request](https://esphome.io/components/ota/http_request#configuration-variables)* */
  /** @yamlKey md5_url */
  md5Url?: string;
  /** **string**: The [MD5sum](https://en.wikipedia.org/wiki/Md5sum) of the firmware file pointed to by `url` (below). May not be used with `md5_url` (below); must be specified if `md5_url` is not.

  *See also: [OTA Update via HTTP Request](https://esphome.io/components/ota/http_request#configuration-variables)* */
  md5?: string;
  /** **string**: The password to use for HTTP basic authentication.

  *See also: [OTA Update via HTTP Request](https://esphome.io/components/ota/http_request#configuration-variables)* */
  password?: string;
  /** **string**: The username to use for HTTP basic authentication.

  *See also: [OTA Update via HTTP Request](https://esphome.io/components/ota/http_request#configuration-variables)* */
  username?: string;
  /** **string**: The URL of the binary file containing the (new) firmware to be installed.

  *See also: [OTA Update via HTTP Request](https://esphome.io/components/ota/http_request#configuration-variables)* */
  url: string;
}

export interface OtaHttpRequestComponentActions {
  /**
   * This action triggers the download and installation of the updated firmware from the configured URL. As it's an ESPHome [action](/automations/actions#all-actions), it may be used in any ESPHome [automation(s)](/automations).
   * @actionKey http_request.ota.flash
   */
  flash(params?: OtaHttpRequestComponent_FlashParams): void;
}

// ── htu21d::HTU21DComponent ──────────────────────────────────────────

export interface HTU21DComponent_SetHeaterLevelParams {
  level: number;
}

export interface HTU21DComponent_SetHeaterParams {
  status: boolean;
}

export interface HTU21DComponentActions {
  /** @actionKey htu21d.set_heater_level */
  setHeaterLevel(params?: HTU21DComponent_SetHeaterLevelParams): void;
  /** @actionKey htu21d.set_heater */
  setHeater(params?: HTU21DComponent_SetHeaterParams): void;
}

// ── integration::IntegrationSensor ───────────────────────────────────

export interface IntegrationSensor_SetValueParams {
  /** **float**: The value to set the integration sensor to.

  *See also: [Integration Sensor](https://esphome.io/components/sensor/integration#sensorintegrationset_value-action)* */
  value: number;
}

export interface IntegrationSensorActions {
  /**
   * This [Action](/automations/actions#all-actions) allows you to reset the value of the integration sensor to zero. For example this can be used to reset the integration sensor to zero at midnight with a time-based automation.
   * @actionKey integration.sensor.reset
   */
  reset(): void;
  /**
   * This [Action](/automations/actions#all-actions) allows you to set the integration sensor to a specific value. For example, it can be used to set the sensor to the battery capacity when it is fully charged.
   * @actionKey integration.sensor.set_value
   */
  setValue(params?: IntegrationSensor_SetValueParams): void;
}

// ── key_collector::KeyCollector ──────────────────────────────────────

export interface KeyCollectorActions {
  /**
   * This action activates a `key_collector`. It will start accepting keys. If there is more than one key collector, you will need to provide the `id` of the one to enable.
   * @actionKey key_collector.enable
   */
  enable(): void;
  /**
   * This action deactivates a `key_collector`. It will stop accepting keys and will clear any already collected ones. If there is more than one key collector, you will need to provide the `id` of the one to disable.
   * @actionKey key_collector.disable
   */
  disable(): void;
}

// ── ledc::LEDCOutput ─────────────────────────────────────────────────

export interface LEDCOutput_SetFrequencyParams {
  /** The frequency to set in Hz.

  *See also: [ESP32 LEDC Output](https://esphome.io/components/output/ledc#outputledcset_frequency-action)* */
  frequency: unknown;
}

export interface LEDCOutputActions {
  /**
   * This [Action](/automations/actions#all-actions) allows you to manually change the frequency of an LEDC channel at runtime. Use cases include controlling a passive buzzer (for pitch control).
   * @actionKey ledc.output.set_frequency
   */
  setFrequency(params?: LEDCOutput_SetFrequencyParams): void;
}

// ── libretiny_pwm::LibreTinyPWM ──────────────────────────────────────

export interface LibreTinyPWM_SetFrequencyParams {
  /** The frequency to set in Hz.

  *See also: [LibreTiny PWM Output](https://esphome.io/components/output/libretiny_pwm#outputlibretiny_pwmset_frequency-action)* */
  frequency: number;
}

export interface LibreTinyPWMActions {
  /**
   * This [Action](/automations/actions#all-actions) allows you to manually change the frequency of a LibreTiny PWM channel at runtime. Use cases include controlling a passive buzzer (for pitch control).
   * @actionKey libretiny_pwm.output.set_frequency
   */
  setFrequency(params?: LibreTinyPWM_SetFrequencyParams): void;
}

// ── light::AddressableLightState ─────────────────────────────────────

export interface AddressableLightState_AddressableSetParams {
  /** @yamlKey range_from */
  rangeFrom?: number;
  /** @yamlKey range_to */
  rangeTo?: number;
  /** @yamlKey color_brightness */
  colorBrightness?: unknown;
  red?: unknown;
  green?: unknown;
  blue?: unknown;
  white?: unknown;
}

export interface AddressableLightStateActions {
  /**
   * This [Action](/automations/actions#all-actions) allows you to manually set a range of LEDs on an addressable light to a specific color.
   * @actionKey light.addressable_set
   */
  addressableSet(params?: AddressableLightState_AddressableSetParams): void;
}

// ── light::LightState ────────────────────────────────────────────────

export interface LightState_ToggleParams {
  /** @yamlKey transition_length */
  transitionLength?: Record<string, unknown>;
}

export interface LightState_ControlParams {
  /** @yamlKey color_mode */
  colorMode?: "ON_OFF" | "BRIGHTNESS" | "WHITE" | "COLOR_TEMPERATURE" | "COLD_WARM_WHITE" | "RGB" | "RGB_WHITE" | "RGB_COLOR_TEMPERATURE" | "RGB_COLD_WARM_WHITE";
  /** **boolean**: The ON/OFF state for the light.

  *See also: [Light Component](https://esphome.io/components/light#configuration-variables)* */
  state?: boolean;
  brightness?: unknown;
  /** @yamlKey color_brightness */
  colorBrightness?: unknown;
  red?: unknown;
  green?: unknown;
  blue?: unknown;
  white?: unknown;
  /** @yamlKey color_temperature */
  colorTemperature?: unknown;
  /** @yamlKey cold_white */
  coldWhite?: unknown;
  /** @yamlKey warm_white */
  warmWhite?: unknown;
  /** @yamlKey transition_length */
  transitionLength?: Record<string, unknown>;
  /** @yamlKey flash_length */
  flashLength?: Record<string, unknown>;
  effect?: string;
}

export interface LightState_TurnOnParams {
  /** @yamlKey color_mode */
  colorMode?: "ON_OFF" | "BRIGHTNESS" | "WHITE" | "COLOR_TEMPERATURE" | "COLD_WARM_WHITE" | "RGB" | "RGB_WHITE" | "RGB_COLOR_TEMPERATURE" | "RGB_COLD_WARM_WHITE";
  /** **boolean**: The ON/OFF state for the light.

  *See also: [Light Component](https://esphome.io/components/light#configuration-variables)* */
  state?: boolean;
  brightness?: unknown;
  /** @yamlKey color_brightness */
  colorBrightness?: unknown;
  red?: unknown;
  green?: unknown;
  blue?: unknown;
  white?: unknown;
  /** @yamlKey color_temperature */
  colorTemperature?: unknown;
  /** @yamlKey cold_white */
  coldWhite?: unknown;
  /** @yamlKey warm_white */
  warmWhite?: unknown;
  /** @yamlKey transition_length */
  transitionLength?: Record<string, unknown>;
  /** @yamlKey flash_length */
  flashLength?: Record<string, unknown>;
  effect?: string;
}

export interface LightState_TurnOffParams {
  /** @yamlKey transition_length */
  transitionLength?: Record<string, unknown>;
  state?: unknown;
}

export interface LightState_DimRelativeParams {
  /** @yamlKey relative_brightness */
  relativeBrightness: unknown;
  /** @yamlKey transition_length */
  transitionLength?: Record<string, unknown>;
  /** @yamlKey brightness_limits */
  brightnessLimits?: Record<string, unknown>;
}

export interface LightStateActions {
  /**
   * This action toggles a light with the given ID when executed.
   * @actionKey light.toggle
   */
  toggle(params?: LightState_ToggleParams): void;
  /**
   * This [Action](/automations/actions#all-actions) is a generic call to change the state of a light - it is essentially just a combination of the turn_on and turn_off calls.
   * @actionKey light.control
   */
  control(params?: LightState_ControlParams): void;
  /**
   * This action turns a light with the given ID on when executed.
   * @actionKey light.turn_on
   */
  turnOn(params?: LightState_TurnOnParams): void;
  /**
   * This action turns a light with the given ID off when executed.
   * @actionKey light.turn_off
   */
  turnOff(params?: LightState_TurnOffParams): void;
  /**
   * This [Action](/automations/actions#all-actions) allows you to dim a light that supports brightness by a relative amount.
   * @actionKey light.dim_relative
   */
  dimRelative(params?: LightState_DimRelativeParams): void;
}

// ── lightwaverf::LightWaveRF ─────────────────────────────────────────

export interface LightWaveRF_SendRawParams {
  /** **string**: The name to give for the action

  *See also: [LightWaveRF](https://esphome.io/components/lightwaverf#configuration-variables)* */
  name: string;
  /** **list hex**: The raw dump in an array of hex

  *See also: [LightWaveRF](https://esphome.io/components/lightwaverf#configuration-variables)* */
  code: unknown;
  /** **int**: The number of times the message will be repeated

  *See also: [LightWaveRF](https://esphome.io/components/lightwaverf#configuration-variables)* */
  repeat?: number;
  /** **boolean**: Send the signal inverted

  *See also: [LightWaveRF](https://esphome.io/components/lightwaverf#configuration-variables)* */
  inverted?: boolean;
  /** @yamlKey pulse_length */
  pulseLength?: number;
}

export interface LightWaveRFActions {
  /**
   * Send the raw data that has been captured via the dump system
   * @actionKey lightwaverf.send_raw
   */
  sendRaw(params?: LightWaveRF_SendRawParams): void;
}

// ── lock::Lock ───────────────────────────────────────────────────────

export interface LockActions {
  /**
   * This action opens (e.g. unlatch) a lock with the given ID off when executed.
   * @actionKey lock.open
   */
  open(): void;
  /**
   * This action locks a lock with the given ID on when executed.
   * @actionKey lock.lock
   */
  lock(): void;
  /**
   * This action unlocks a lock with the given ID off when executed.
   * @actionKey lock.unlock
   */
  unlock(): void;
}

// ── logger::Logger ───────────────────────────────────────────────────

export interface Logger_LogParams {
  /** **string**: The format for the message in [printf-style](/components/display#display-printf).

  *See also: [Logger Component](https://esphome.io/components/logger#loggerlog-action)* */
  format: string;
  /** **list of [lambda](/automations/templates#config-lambda)**: The optional arguments for the

  *See also: [Logger Component](https://esphome.io/components/logger#loggerlog-action)* */
  args?: unknown[];
  /** **string**: The [log level](https://esphome.io/components/logger#logger-log_levels) to print the message

  *See also: [Logger Component](https://esphome.io/components/logger#loggerlog-action)* */
  level?: string;
  /** **string**: The tag (seen in front of the message in the logs) to print the message

  *See also: [Logger Component](https://esphome.io/components/logger#loggerlog-action)* */
  tag?: string;
}

export interface Logger_SetLevelParams {
  level: "NONE" | "ERROR" | "WARN" | "INFO" | "DEBUG" | "VERBOSE" | "VERY_VERBOSE";
  tag?: string;
}

export interface LoggerActions {
  /**
   * Print a formatted message to the logs.
   * @actionKey logger.log
   */
  log(params?: Logger_LogParams): void;
  /**
   * Set the log level at runtime. The level can only be set to a level that is no less severe than the global log level.
   * @actionKey logger.set_level
   */
  setLevel(params?: Logger_SetLevelParams): void;
}

// ── lv_style_t ───────────────────────────────────────────────────────

export interface lv_style_t_UpdateParams {
  checked?: Record<string, unknown>;
  focused?: Record<string, unknown>;
  /** @yamlKey focus_key */
  focusKey?: Record<string, unknown>;
  edited?: Record<string, unknown>;
  hovered?: Record<string, unknown>;
  pressed?: Record<string, unknown>;
  scrolled?: Record<string, unknown>;
  disabled?: Record<string, unknown>;
  /** @yamlKey user_1 */
  user1?: unknown;
  /** @yamlKey user_2 */
  user2?: unknown;
  /** @yamlKey user_3 */
  user3?: unknown;
  /** @yamlKey user_4 */
  user4?: unknown;
  align?: unknown;
  /** @yamlKey arc_opa */
  arcOpa?: unknown;
  /** @yamlKey arc_color */
  arcColor?: unknown;
  /** @yamlKey arc_rounded */
  arcRounded?: unknown;
  /** @yamlKey arc_width */
  arcWidth?: unknown;
  /** @yamlKey anim_time */
  animTime?: unknown;
  /** @yamlKey bg_color */
  bgColor?: unknown;
  /** @yamlKey bg_grad */
  bgGrad?: unknown;
  /** @yamlKey bg_grad_color */
  bgGradColor?: unknown;
  /** @yamlKey bg_dither_mode */
  bgDitherMode?: unknown;
  /** @yamlKey bg_grad_dir */
  bgGradDir?: unknown;
  /** @yamlKey bg_grad_stop */
  bgGradStop?: unknown;
  /** @yamlKey bg_image_opa */
  bgImageOpa?: unknown;
  /** @yamlKey bg_image_recolor */
  bgImageRecolor?: unknown;
  /** @yamlKey bg_image_recolor_opa */
  bgImageRecolorOpa?: unknown;
  /** @yamlKey bg_image_src */
  bgImageSrc?: unknown;
  /** @yamlKey bg_image_tiled */
  bgImageTiled?: unknown;
  /** @yamlKey bg_main_stop */
  bgMainStop?: unknown;
  /** @yamlKey bg_opa */
  bgOpa?: unknown;
  /** @yamlKey border_color */
  borderColor?: unknown;
  /** @yamlKey border_opa */
  borderOpa?: unknown;
  /** @yamlKey border_post */
  borderPost?: unknown;
  /** @yamlKey border_side */
  borderSide?: unknown;
  /** @yamlKey border_width */
  borderWidth?: unknown;
  /** @yamlKey clip_corner */
  clipCorner?: unknown;
  /** @yamlKey color_filter_opa */
  colorFilterOpa?: unknown;
  height?: unknown;
  /** @yamlKey image_recolor */
  imageRecolor?: unknown;
  /** @yamlKey image_recolor_opa */
  imageRecolorOpa?: unknown;
  /** @yamlKey line_width */
  lineWidth?: unknown;
  /** @yamlKey line_dash_width */
  lineDashWidth?: unknown;
  /** @yamlKey line_dash_gap */
  lineDashGap?: unknown;
  /** @yamlKey line_rounded */
  lineRounded?: unknown;
  /** @yamlKey line_color */
  lineColor?: unknown;
  opa?: unknown;
  /** @yamlKey opa_layered */
  opaLayered?: unknown;
  /** @yamlKey outline_color */
  outlineColor?: unknown;
  /** @yamlKey outline_opa */
  outlineOpa?: unknown;
  /** @yamlKey outline_pad */
  outlinePad?: unknown;
  /** @yamlKey outline_width */
  outlineWidth?: unknown;
  /** @yamlKey pad_all */
  padAll?: unknown;
  /** @yamlKey pad_bottom */
  padBottom?: unknown;
  /** @yamlKey pad_left */
  padLeft?: unknown;
  /** @yamlKey pad_right */
  padRight?: unknown;
  /** @yamlKey pad_top */
  padTop?: unknown;
  /** @yamlKey shadow_color */
  shadowColor?: unknown;
  /** @yamlKey shadow_ofs_x */
  shadowOfsX?: unknown;
  /** @yamlKey shadow_ofs_y */
  shadowOfsY?: unknown;
  /** @yamlKey shadow_opa */
  shadowOpa?: unknown;
  /** @yamlKey shadow_spread */
  shadowSpread?: unknown;
  /** @yamlKey shadow_width */
  shadowWidth?: unknown;
  /** @yamlKey text_align */
  textAlign?: unknown;
  /** @yamlKey text_color */
  textColor?: unknown;
  /** @yamlKey text_decor */
  textDecor?: unknown;
  /** @yamlKey text_font */
  textFont?: unknown;
  /** @yamlKey text_letter_space */
  textLetterSpace?: unknown;
  /** @yamlKey text_line_space */
  textLineSpace?: unknown;
  /** @yamlKey text_opa */
  textOpa?: unknown;
  /** @yamlKey transform_angle */
  transformAngle?: unknown;
  /** @yamlKey transform_height */
  transformHeight?: unknown;
  /** @yamlKey transform_pivot_x */
  transformPivotX?: unknown;
  /** @yamlKey transform_pivot_y */
  transformPivotY?: unknown;
  /** @yamlKey transform_zoom */
  transformZoom?: unknown;
  /** @yamlKey translate_x */
  translateX?: unknown;
  /** @yamlKey translate_y */
  translateY?: unknown;
  /** @yamlKey max_height */
  maxHeight?: unknown;
  /** @yamlKey max_width */
  maxWidth?: unknown;
  /** @yamlKey min_height */
  minHeight?: unknown;
  /** @yamlKey min_width */
  minWidth?: unknown;
  radius?: unknown;
  width?: unknown;
  x?: unknown;
  y?: unknown;
  /** @yamlKey scrollbar_mode */
  scrollbarMode?: unknown;
  /** @yamlKey scroll_dir */
  scrollDir?: unknown;
  /** @yamlKey scroll_snap_x */
  scrollSnapX?: unknown;
  /** @yamlKey scroll_snap_y */
  scrollSnapY?: unknown;
  hidden?: unknown;
  clickable?: unknown;
  /** @yamlKey click_focusable */
  clickFocusable?: unknown;
  checkable?: unknown;
  scrollable?: unknown;
  /** @yamlKey scroll_elastic */
  scrollElastic?: unknown;
  /** @yamlKey scroll_momentum */
  scrollMomentum?: unknown;
  /** @yamlKey scroll_one */
  scrollOne?: unknown;
  /** @yamlKey scroll_chain_hor */
  scrollChainHor?: unknown;
  /** @yamlKey scroll_chain_ver */
  scrollChainVer?: unknown;
  /** @yamlKey scroll_chain */
  scrollChain?: unknown;
  /** @yamlKey scroll_on_focus */
  scrollOnFocus?: unknown;
  /** @yamlKey scroll_with_arrow */
  scrollWithArrow?: unknown;
  snappable?: unknown;
  /** @yamlKey press_lock */
  pressLock?: unknown;
  /** @yamlKey event_bubble */
  eventBubble?: unknown;
  /** @yamlKey gesture_bubble */
  gestureBubble?: unknown;
  /** @yamlKey adv_hittest */
  advHittest?: unknown;
  /** @yamlKey ignore_layout */
  ignoreLayout?: unknown;
  floating?: unknown;
  /** @yamlKey overflow_visible */
  overflowVisible?: unknown;
  /** @yamlKey layout_1 */
  layout1?: unknown;
  /** @yamlKey layout_2 */
  layout2?: unknown;
  /** @yamlKey widget_1 */
  widget1?: unknown;
  /** @yamlKey widget_2 */
  widget2?: unknown;
  main?: Record<string, unknown>;
  id?: Record<string, unknown>[];
  state?: Record<string, unknown>;
  text?: unknown;
  /** @yamlKey pivot_x */
  pivotX?: unknown;
  /** @yamlKey pivot_y */
  pivotY?: unknown;
  angle?: unknown;
  zoom?: unknown;
  /** @yamlKey offset_x */
  offsetX?: unknown;
  /** @yamlKey offset_y */
  offsetY?: unknown;
  antialias?: unknown;
  mode?: unknown;
  src?: unknown;
  indicator?: Record<string, unknown>;
  knob?: Record<string, unknown>;
}

export interface lv_style_tActions {
  /** @actionKey button.lvgl.update */
  update(params?: lv_style_t_UpdateParams): void;
}

// ── lvgl::LvglComponent ──────────────────────────────────────────────

export interface LvglComponent_UpdateParams {
  /** @yamlKey disp_bg_image */
  dispBgImage?: "none";
  /** @yamlKey disp_bg_color */
  dispBgColor?: unknown;
  /** @yamlKey disp_bg_opa */
  dispBgOpa?: unknown;
}

export interface LvglComponent_PauseParams {
  /** @yamlKey show_snow */
  showSnow?: unknown;
}

export interface LvglComponent_PageNextParams {
  /** Page transition animation. Defaults to NONE. */
  animation?: "NONE" | "MOVE_LEFT" | "MOVE_RIGHT" | "FADE_IN" | "OUT_LEFT" | "OUT_RIGHT" | "OUT_TOP" | "OUT_BOTTOM";
  /** Animation duration (e.g. "300ms"). Defaults to 50ms. */
  time?: string;
}

export interface LvglComponent_PagePreviousParams {
  /** Page transition animation. Defaults to NONE. */
  animation?: "NONE" | "MOVE_LEFT" | "MOVE_RIGHT" | "FADE_IN" | "OUT_LEFT" | "OUT_RIGHT" | "OUT_TOP" | "OUT_BOTTOM";
  /** Animation duration (e.g. "300ms"). Defaults to 50ms. */
  time?: string;
}

export interface LvglComponent_PageShowParams {
  /** The page ref to navigate to. */
  id: unknown;
  /** Page transition animation. Defaults to NONE. */
  animation?: "NONE" | "MOVE_LEFT" | "MOVE_RIGHT" | "FADE_IN" | "OUT_LEFT" | "OUT_RIGHT" | "OUT_TOP" | "OUT_BOTTOM";
  /** Animation duration (e.g. "300ms"). Defaults to 50ms. */
  time?: string;
}

export interface LvglComponentActions {
  /**
   * This [action](/automations/actions#actions-action) allows changing/updating the `disp_bg_color` or `disp_bg_image` configuration variables of the main component, making it possible to change the background color or wallpaper at any time.
   * @actionKey lvgl.update
   */
  update(params?: LvglComponent_UpdateParams): void;
  /**
   * This [action](/automations/actions#actions-action) pauses the activity of LVGL, including rendering.
   * @actionKey lvgl.pause
   */
  pause(params?: LvglComponent_PauseParams): void;
  /**
   * This [action](/automations/actions#actions-action) resumes the activity of LVGL, including rendering.
   * @actionKey lvgl.resume
   */
  resume(): void;
  /**
   * Navigate to the next LVGL page.
   * @actionKey lvgl.page.next
   */
  pageNext(params?: LvglComponent_PageNextParams): void;
  /**
   * Navigate to the previous LVGL page.
   * @actionKey lvgl.page.previous
   */
  pagePrevious(params?: LvglComponent_PagePreviousParams): void;
  /**
   * Navigate to a specific LVGL page by ref.
   * @actionKey lvgl.page.show
   */
  pageShow(params?: LvglComponent_PageShowParams): void;
}

// ── max17043::MAX17043Component ──────────────────────────────────────

export interface MAX17043ComponentActions {
  /** @actionKey max17043.sleep_mode */
  sleepMode(): void;
}

// ── max6956::MAX6956 ─────────────────────────────────────────────────

export interface MAX6956_SetBrightnessGlobalParams {
  /** @yamlKey brightness_global */
  brightnessGlobal: number;
}

export interface MAX6956_SetBrightnessModeParams {
  /** @yamlKey brightness_mode */
  brightnessMode: "global" | "segment";
}

export interface MAX6956Actions {
  /** @actionKey max6956.set_brightness_global */
  setBrightnessGlobal(params?: MAX6956_SetBrightnessGlobalParams): void;
  /** @actionKey max6956.set_brightness_mode */
  setBrightnessMode(params?: MAX6956_SetBrightnessModeParams): void;
}

// ── max7219digit::MAX7219Component ───────────────────────────────────

export interface MAX7219Component_InvertOnParams {
  state?: unknown;
}

export interface MAX7219Component_InvertOffParams {
  state?: unknown;
}

export interface MAX7219Component_TurnOnParams {
  state?: unknown;
}

export interface MAX7219Component_TurnOffParams {
  state?: unknown;
}

export interface MAX7219Component_ReverseOnParams {
  state?: unknown;
}

export interface MAX7219Component_ReverseOffParams {
  state?: unknown;
}

export interface MAX7219Component_IntensityParams {
  intensity?: number;
}

export interface MAX7219ComponentActions {
  /**
   * This action `max7219digit.invert_on` will invert the display. So background pixels are on and text pixels are off. `max7219digit.invert_off` sets the display back to normal. The background pixels are only set at the next update, the pixels drawn in the various functions like print, line, etc. are directly influenced by the invert command.
   * @actionKey max7219digit.invert_on
   */
  invertOn(params?: MAX7219Component_InvertOnParams): void;
  /** @actionKey max7219digit.invert_off */
  invertOff(params?: MAX7219Component_InvertOffParams): void;
  /**
   * The display can be switched on and off "dynamically" with the actions `max7219digit.turn_on` / `max7219digit.turn_off`.
   * @actionKey max7219digit.turn_on
   */
  turnOn(params?: MAX7219Component_TurnOnParams): void;
  /** @actionKey max7219digit.turn_off */
  turnOff(params?: MAX7219Component_TurnOffParams): void;
  /**
   * With these actions you can reverse the display direction from left-to-right to right-to-left.
   * @actionKey max7219digit.reverse_on
   */
  reverseOn(params?: MAX7219Component_ReverseOnParams): void;
  /** @actionKey max7219digit.reverse_off */
  reverseOff(params?: MAX7219Component_ReverseOffParams): void;
  /**
   * The intensity of the screen can be set "dynamically" with this action.
   * @actionKey max7219digit.intensity
   */
  intensity(params?: MAX7219Component_IntensityParams): void;
}

// ── media_player::MediaPlayer ────────────────────────────────────────

export interface MediaPlayer_PlayMediaParams {
  /** @yamlKey media_url */
  mediaUrl: unknown;
  announcement?: boolean;
}

export interface MediaPlayer_PlayParams {
  announcement?: boolean;
}

export interface MediaPlayer_PauseParams {
  announcement?: boolean;
}

export interface MediaPlayer_StopParams {
  announcement?: boolean;
}

export interface MediaPlayer_ToggleParams {
  announcement?: boolean;
}

export interface MediaPlayer_VolumeUpParams {
  announcement?: boolean;
}

export interface MediaPlayer_VolumeDownParams {
  announcement?: boolean;
}

export interface MediaPlayer_TurnOnParams {
  announcement?: boolean;
}

export interface MediaPlayer_TurnOffParams {
  announcement?: boolean;
}

export interface MediaPlayer_NextParams {
  announcement?: boolean;
}

export interface MediaPlayer_PreviousParams {
  announcement?: boolean;
}

export interface MediaPlayer_MuteParams {
  announcement?: boolean;
}

export interface MediaPlayer_UnmuteParams {
  announcement?: boolean;
}

export interface MediaPlayer_RepeatOffParams {
  announcement?: boolean;
}

export interface MediaPlayer_RepeatOneParams {
  announcement?: boolean;
}

export interface MediaPlayer_RepeatAllParams {
  announcement?: boolean;
}

export interface MediaPlayer_ShuffleParams {
  announcement?: boolean;
}

export interface MediaPlayer_UnshuffleParams {
  announcement?: boolean;
}

export interface MediaPlayer_GroupJoinParams {
  announcement?: boolean;
}

export interface MediaPlayer_ClearPlaylistParams {
  announcement?: boolean;
}

export interface MediaPlayer_VolumeSetParams {
  volume: unknown;
}

export interface MediaPlayerActions {
  /**
   * This action will start playing the specified media.
   * @actionKey media_player.play_media
   */
  playMedia(params?: MediaPlayer_PlayMediaParams): void;
  /**
   * This action will resume playing the media player.
   * @actionKey media_player.play
   */
  play(params?: MediaPlayer_PlayParams): void;
  /**
   * This action pauses the current playback.
   * @actionKey media_player.pause
   */
  pause(params?: MediaPlayer_PauseParams): void;
  /**
   * This action stops the current playback.
   * @actionKey media_player.stop
   */
  stop(params?: MediaPlayer_StopParams): void;
  /**
   * This action will pause or resume the current playback.
   * @actionKey media_player.toggle
   */
  toggle(params?: MediaPlayer_ToggleParams): void;
  /**
   * This action will increase the volume of the media player.
   * @actionKey media_player.volume_up
   */
  volumeUp(params?: MediaPlayer_VolumeUpParams): void;
  /**
   * This action will decrease the volume of the media player.
   * @actionKey media_player.volume_down
   */
  volumeDown(params?: MediaPlayer_VolumeDownParams): void;
  /**
   * This action will turn on the media player.
   * @actionKey media_player.turn_on
   */
  turnOn(params?: MediaPlayer_TurnOnParams): void;
  /**
   * This action will turn off the media player.
   * @actionKey media_player.turn_off
   */
  turnOff(params?: MediaPlayer_TurnOffParams): void;
  /**
   * This action will skip to the next track.
   * @actionKey media_player.next
   */
  next(params?: MediaPlayer_NextParams): void;
  /**
   * This action will skip to the previous track.
   * @actionKey media_player.previous
   */
  previous(params?: MediaPlayer_PreviousParams): void;
  /**
   * This action will mute the media player.
   * @actionKey media_player.mute
   */
  mute(params?: MediaPlayer_MuteParams): void;
  /**
   * This action will unmute the media player.
   * @actionKey media_player.unmute
   */
  unmute(params?: MediaPlayer_UnmuteParams): void;
  /**
   * This action will turn off repeat mode.
   * @actionKey media_player.repeat_off
   */
  repeatOff(params?: MediaPlayer_RepeatOffParams): void;
  /**
   * This action will set the media player to repeat the current track.
   * @actionKey media_player.repeat_one
   */
  repeatOne(params?: MediaPlayer_RepeatOneParams): void;
  /**
   * This action will set the media player to repeat all tracks.
   * @actionKey media_player.repeat_all
   */
  repeatAll(params?: MediaPlayer_RepeatAllParams): void;
  /**
   * This action will enable shuffle mode.
   * @actionKey media_player.shuffle
   */
  shuffle(params?: MediaPlayer_ShuffleParams): void;
  /**
   * This action will disable shuffle mode.
   * @actionKey media_player.unshuffle
   */
  unshuffle(params?: MediaPlayer_UnshuffleParams): void;
  /**
   * This action will join the media player to a group.
   * @actionKey media_player.group_join
   */
  groupJoin(params?: MediaPlayer_GroupJoinParams): void;
  /**
   * This action will clear the media player's playlist.
   * @actionKey media_player.clear_playlist
   */
  clearPlaylist(params?: MediaPlayer_ClearPlaylistParams): void;
  /**
   * This action will set the volume of the media player.
   * @actionKey media_player.volume_set
   */
  volumeSet(params?: MediaPlayer_VolumeSetParams): void;
}

// ── mhz19::MHZ19Component ────────────────────────────────────────────

export interface MHZ19Component_DetectionRangeSetParams {
  /** @yamlKey detection_range */
  detectionRange: "2000" | "5000" | "10000";
}

export interface MHZ19ComponentActions {
  /**
   * This [action](/automations/actions#all-actions) disables automatic baseline calibration on the sensor with the given ID.
   * @actionKey mhz19.abc_disable
   */
  abcDisable(): void;
  /**
   * This [action](/automations/actions#all-actions) enables automatic baseline calibration on the sensor with the given ID.
   * @actionKey mhz19.abc_enable
   */
  abcEnable(): void;
  /**
   * This [action](/automations/actions#all-actions) executes zero point calibration command on the sensor with the given ID.
   * @actionKey mhz19.calibrate_zero
   */
  calibrateZero(): void;
  /**
   * This [action](/automations/actions#all-actions) configures the detection range of the sensor with the given ID.
   * @actionKey mhz19.detection_range_set
   */
  detectionRangeSet(params?: MHZ19Component_DetectionRangeSetParams): void;
}

// ── micro_wake_word::MicroWakeWord ───────────────────────────────────

export interface MicroWakeWordActions {
  /** @actionKey micro_wake_word.stop */
  stop(): void;
  /** @actionKey micro_wake_word.start */
  start(): void;
}

// ── micro_wake_word::WakeWordModel ───────────────────────────────────

export interface WakeWordModelActions {
  /** @actionKey micro_wake_word.disable_model */
  disableModel(): void;
  /** @actionKey micro_wake_word.enable_model */
  enableModel(): void;
}

// ── microphone::Microphone ───────────────────────────────────────────

export interface MicrophoneActions {
  /**
   * This action will start capturing audio data from the microphone. The data will be passed to any components listening and will be available in the `on_data` trigger.
   * @actionKey microphone.capture
   */
  capture(): void;
  /**
   * This action will stop capturing audio data from the microphone.
   * @actionKey microphone.stop_capture
   */
  stopCapture(): void;
  /**
   * This action will apply a software mute to the audio data from the microphone before passing it to any listening components.
   * @actionKey microphone.mute
   */
  mute(): void;
  /**
   * This action will disable applying a software mute initiated with `microphone.mute`.
   * @actionKey microphone.unmute
   */
  unmute(): void;
}

// ── midea::ac::AirConditioner ────────────────────────────────────────

export interface AirConditioner_FollowMeParams {
  /** **float**: Sets the value of an internal temperature sensor. The value will be **clamped** to the range:

  *See also: [Midea Air Conditioner](https://esphome.io/components/climate/midea#midea_acfollow_me-action)* */
  temperature: number;
  /** **boolean**: Specifies if the `temperature` value is in Fahrenheit. When set to `true`, the temperature is parsed and sent in Fahrenheit. Defaults to `false` (Celsius).

  *See also: [Midea Air Conditioner](https://esphome.io/components/climate/midea#midea_acfollow_me-action)* */
  /** @yamlKey use_fahrenheit */
  useFahrenheit?: boolean;
  /** **boolean**: Sets beep on update. Defaults to `false`.

  *See also: [Midea Air Conditioner](https://esphome.io/components/climate/midea#midea_acfollow_me-action)* */
  beeper?: boolean;
}

export interface AirConditionerActions {
  /**
   * This action transmits an IR FollowMe command telling the air conditioner a more accurate room temperature value to be used instead of the internal indoor unit sensor.
   * @actionKey midea_ac.follow_me
   */
  followMe(params?: AirConditioner_FollowMeParams): void;
  /**
   * This action toggle ac screen. Works via UART if supported or [Remote Transmitter](/components/remote_transmitter/).
   * @actionKey midea_ac.display_toggle
   */
  displayToggle(): void;
  /**
   * This action adjust the louver by one step. [Remote Transmitter](/components/remote_transmitter/) required.
   * @actionKey midea_ac.swing_step
   */
  swingStep(): void;
  /**
   * This action turn on beeper feedback.
   * @actionKey midea_ac.beeper_on
   */
  beeperOn(): void;
  /**
   * This action turn off beeper feedback.
   * @actionKey midea_ac.beeper_off
   */
  beeperOff(): void;
  /**
   * This action turn on power. The mode and preset will be restored to the last state before turned off.
   * @actionKey midea_ac.power_on
   */
  powerOn(): void;
  /**
   * This action turn off power.
   * @actionKey midea_ac.power_off
   */
  powerOff(): void;
  /**
   * This action toggle the power state. Identical to pressing the power button on the remote control.
   * @actionKey midea_ac.power_toggle
   */
  powerToggle(): void;
}

// ── mqtt::MQTTClientComponent ────────────────────────────────────────

export interface MQTTClientComponent_PublishParams {
  topic: unknown;
  /** **string**: The message content.

  *See also: [MQTT Client Component](https://esphome.io/components/mqtt#configuration-variables)* */
  payload: string;
  /** **int**: The [Quality of

  *See also: [MQTT Client Component](https://esphome.io/components/mqtt#configuration-variables)* */
  qos?: number;
  /** **boolean**: If the published message should

  *See also: [MQTT Client Component](https://esphome.io/components/mqtt#configuration-variables)* */
  retain?: boolean;
}

export interface MQTTClientComponent_PublishJsonParams {
  topic: unknown;
  /** **[lambda](/automations/templates#config-lambda)**: The message content.

  *See also: [MQTT Client Component](https://esphome.io/components/mqtt#configuration-variables)* */
  payload: unknown;
  /** **int**: The [Quality of Service](https://www.hivemq.com/blog/mqtt-essentials-part-6-mqtt-quality-of-service-levels)

  *See also: [MQTT Client Component](https://esphome.io/components/mqtt#configuration-variables)* */
  qos?: number;
  /** **boolean**: If the published message should

  *See also: [MQTT Client Component](https://esphome.io/components/mqtt#configuration-variables)* */
  retain?: boolean;
}

export interface MQTTClientComponentActions {
  /**
   * Publish an MQTT message on a topic using this action in automations.
   * @actionKey mqtt.publish
   */
  publish(params?: MQTTClientComponent_PublishParams): void;
  /**
   * Publish a JSON-formatted MQTT message on a topic using this action in automations.
   * @actionKey mqtt.publish_json
   */
  publishJson(params?: MQTTClientComponent_PublishJsonParams): void;
  /**
   * This action turns on the MQTT component on demand.
   * @actionKey mqtt.enable
   */
  enable(): void;
  /**
   * This action turns off the MQTT component on demand.
   * @actionKey mqtt.disable
   */
  disable(): void;
}

// ── nau7802::NAU7802Sensor ───────────────────────────────────────────

export interface NAU7802SensorActions {
  /** @actionKey nau7802.calibrate_gain */
  calibrateGain(): void;
  /** @actionKey nau7802.calibrate_external_offset */
  calibrateExternalOffset(): void;
  /** @actionKey nau7802.calibrate_internal_offset */
  calibrateInternalOffset(): void;
}

// ── nextion::Nextion ─────────────────────────────────────────────────

export interface Nextion_SetBrightnessParams {
  brightness: unknown;
}

export interface NextionActions {
  /**
   * You can use this [action](/automations/actions#actions-action) to set the brightness of the Nextion's backlight.
   * @actionKey nextion.display.set_brightness
   */
  setBrightness(params?: Nextion_SetBrightnessParams): void;
}

// ── nextion::NextionBinarySensor ─────────────────────────────────────

export interface NextionBinarySensor_PublishParams {
  /** **string**: The boolean state to publish.

  *See also: [Nextion Binary Sensor Component](https://esphome.io/components/binary_sensor/nextion#configuration-variables)* */
  state: string;
  /** **bool**: Publish new state to Home Assistant. Default is true.

  *See also: [Nextion Binary Sensor Component](https://esphome.io/components/binary_sensor/nextion#configuration-variables)* */
  /** @yamlKey publish_state */
  publishState?: boolean;
  /** **bool**: Publish new state to Nextion display which will update component. Default is true.

  *See also: [Nextion Binary Sensor Component](https://esphome.io/components/binary_sensor/nextion#configuration-variables)* */
  /** @yamlKey send_to_nextion */
  sendToNextion?: boolean;
}

export interface NextionBinarySensorActions {
  /**
   * You can also publish a state to a Nextion binary sensor from elsewhere in your YAML file with the `binary_sensor.nextion.publish` action.
   * @actionKey nextion.binary_sensor.publish
   */
  publish(params?: NextionBinarySensor_PublishParams): void;
}

// ── nextion::NextionSensor ───────────────────────────────────────────

export interface NextionSensor_PublishParams {
  /** **string**: The float state to publish.

  *See also: [Nextion Sensor Component](https://esphome.io/components/sensor/nextion#in-some-trigger)* */
  state: string;
  /** **bool**: Publish new state to Home Assistant. Default is true.

  *See also: [Nextion Sensor Component](https://esphome.io/components/sensor/nextion#in-some-trigger)* */
  /** @yamlKey publish_state */
  publishState?: boolean;
  /** **bool**: Publish new state to Nextion display which will update component. Default is true.

  *See also: [Nextion Sensor Component](https://esphome.io/components/sensor/nextion#in-some-trigger)* */
  /** @yamlKey send_to_nextion */
  sendToNextion?: boolean;
}

export interface NextionSensorActions {
  /**
   * You can also publish a state to a Nextion sensor from elsewhere in your YAML file with the `sensor.nextion.publish` action.
   * @actionKey nextion.sensor.publish
   */
  publish(params?: NextionSensor_PublishParams): void;
}

// ── nextion::NextionSwitch ───────────────────────────────────────────

export interface NextionSwitch_PublishParams {
  /** **string**: The boolean state to publish.

  *See also: [Nextion Switch Component](https://esphome.io/components/switch/nextion#in-some-trigger)* */
  state: string;
  /** **bool**: Publish new state to Home Assistant. Default is true.

  *See also: [Nextion Switch Component](https://esphome.io/components/switch/nextion#in-some-trigger)* */
  /** @yamlKey publish_state */
  publishState?: boolean;
  /** **bool**: Publish new state to Nextion display which will update component. Default is true.

  *See also: [Nextion Switch Component](https://esphome.io/components/switch/nextion#in-some-trigger)* */
  /** @yamlKey send_to_nextion */
  sendToNextion?: boolean;
}

export interface NextionSwitchActions {
  /**
   * You can also publish a state to a Nextion switch from elsewhere in your YAML file with the `switch.nextion.publish` action.
   * @actionKey nextion.switch.publish
   */
  publish(params?: NextionSwitch_PublishParams): void;
}

// ── nextion::NextionTextSensor ───────────────────────────────────────

export interface NextionTextSensor_PublishParams {
  /** **string**: The string to publish.

  *See also: [Nextion Text Sensor Component](https://esphome.io/components/text_sensor/nextion#in-some-trigger)* */
  state: string;
  /** **bool**: Publish new state to Home Assistant. Default is true.

  *See also: [Nextion Text Sensor Component](https://esphome.io/components/text_sensor/nextion#in-some-trigger)* */
  /** @yamlKey publish_state */
  publishState?: boolean;
  /** **bool**: Publish new state to Nextion display which will update component. Default is true.

  *See also: [Nextion Text Sensor Component](https://esphome.io/components/text_sensor/nextion#in-some-trigger)* */
  /** @yamlKey send_to_nextion */
  sendToNextion?: boolean;
}

export interface NextionTextSensorActions {
  /**
   * You can also publish a state to a Nextion text sensor from elsewhere in your YAML file with the `text_sensor.nextion.publish` action.
   * @actionKey nextion.text_sensor.publish
   */
  publish(params?: NextionTextSensor_PublishParams): void;
}

// ── number::Number ───────────────────────────────────────────────────

export interface Number_SetParams {
  /** **float**: The value to set the number to.

  *See also: [Number Component](https://esphome.io/components/number#numberset-action)* */
  value: number;
}

export interface Number_OperationParams {
  /** **string**: What operation to perform on the number component. One of `TO_MIN`, `TO_MAX`, `DECREMENT` or `INCREMENT` (case insensitive). When writing a lambda for this field, then return one of the following enum values: `NUMBER_OP_TO_MIN`, `NUMBER_OP_TO_MAX`, `NUMBER_OP_DECREMENT` or `NUMBER_OP_INCREMENT`.

  *See also: [Number Component](https://esphome.io/components/number#or-templated-lambda)* */
  operation: string;
  /** **bool**: Can be used with `DECREMENT` or `INCREMENT` to specify whether or not to wrap around the value when respectively the minimum or maximum value of the number is exceeded.

  *See also: [Number Component](https://esphome.io/components/number#or-templated-lambda)* */
  cycle?: boolean;
}

export interface Number_DecrementParams {
  /** **boolean**: Whether or not to set the number to its maximum value when the decrement pushes the value below its minimum value. This will only work when the number component uses a minimum and maximum value. Defaults to `true`.

  *See also: [Number Component](https://esphome.io/components/number#shorthand)* */
  cycle?: boolean;
}

export interface Number_IncrementParams {
  /** **boolean**: Whether or not to set the number to its minimum value when the increment pushes the value beyond its maximum value. This will only work when the number component uses a minimum and maximum value. Defaults to `true`.

  *See also: [Number Component](https://esphome.io/components/number#shorthand)* */
  cycle?: boolean;
}

export interface NumberActions {
  /**
   * You can also set the number for the Home Assistant number from elsewhere in your YAML file with the [`number.set` Action](/components/number#number-set_action).
   * @actionKey number.set
   */
  set(params?: Number_SetParams): void;
  /**
   * This is an [Action](/automations/actions#all-actions) that can be used to perform an operation on a number component (set to minimum or maximum value, decrement, increment), using a generic templatable action call.
   * @actionKey number.operation
   */
  operation(params?: Number_OperationParams): void;
  /**
   * This is an [Action](/automations/actions#all-actions) setting a number to its maximum value, given a number component that has a maximum value defined for it.
   * @actionKey number.to_max
   */
  toMax(): void;
  /**
   * This is an [Action](/automations/actions#all-actions) setting a number to its minimum value, given a number component that has a minimum value defined for it.
   * @actionKey number.to_min
   */
  toMin(): void;
  /**
   * This is an [Action](/automations/actions#all-actions) for decrementing a number value by its step size (default: 1).
   * @actionKey number.decrement
   */
  decrement(params?: Number_DecrementParams): void;
  /**
   * This is an [Action](/automations/actions#all-actions) for incrementing a number value by its step size (default: 1).
   * @actionKey number.increment
   */
  increment(params?: Number_IncrementParams): void;
}

// ── online_image::OnlineImage ────────────────────────────────────────

export interface OnlineImage_SetUrlParams {
  /** **url**: The new URL to download the image from.

  *See also: [Online Image Component](https://esphome.io/components/online_image#configuration-variables)* */
  url: string;
  /** **bool**: If `true`, the image will be updated (fetched) immediately after setting the new URL. If `false`, the URL will be set but the image will **not** be updated until you call the `update` action. Defaults to `true`

  *See also: [Online Image Component](https://esphome.io/components/online_image#configuration-variables)* */
  update?: boolean;
}

export interface OnlineImageActions {
  /**
   * Release the memory currently used by an image. Can be used if different display pages need different images, to avoid wasting memory on an image that is currently not being displayed.
   * @actionKey online_image.release
   */
  release(): void;
  /**
   * Change the URL where the image is downloaded from. A re-download will be automatically triggered unless `update` is set to `false`.
   * @actionKey online_image.set_url
   */
  setUrl(params?: OnlineImage_SetUrlParams): void;
}

// ── output::BinaryOutput ─────────────────────────────────────────────

export interface BinaryOutputActions {
  /**
   * This action turns the output with the given ID on when executed.
   * @actionKey output.turn_on
   */
  turnOn(): void;
  /**
   * This action turns the output with the given ID off when executed.
   * @actionKey output.turn_off
   */
  turnOff(): void;
}

// ── output::FloatOutput ──────────────────────────────────────────────

export interface FloatOutput_SetLevelParams {
  level: unknown;
}

export interface FloatOutput_SetMinPowerParams {
  /** @yamlKey min_power */
  minPower: unknown;
}

export interface FloatOutput_SetMaxPowerParams {
  /** @yamlKey max_power */
  maxPower: unknown;
}

export interface FloatOutputActions {
  /**
   * This action sets the float output to the given level when executed.
   * @actionKey output.set_level
   */
  setLevel(params?: FloatOutput_SetLevelParams): void;
  /**
   * This action sets the minimum output power level for the specified float output platform. It allows you to dynamically adjust the `min_power` configuration variable at runtime.
   * @actionKey output.set_min_power
   */
  setMinPower(params?: FloatOutput_SetMinPowerParams): void;
  /**
   * This action sets the maximum output power level for the specified float output platform. It allows you to dynamically adjust the `max_power` configuration variable at runtime.
   * @actionKey output.set_max_power
   */
  setMaxPower(params?: FloatOutput_SetMaxPowerParams): void;
}

// ── pcf85063::PCF85063Component ──────────────────────────────────────

export interface PCF85063ComponentActions {
  /**
   * This [Action](/automations/actions#all-actions) triggers a synchronization of the current system time to the RTC hardware.
   * @actionKey pcf85063.write_time
   */
  writeTime(): void;
  /**
   * This [Action](/automations/actions#all-actions) triggers a synchronization of the current system time from the RTC hardware.
   * @actionKey pcf85063.read_time
   */
  readTime(): void;
}

// ── pcf8563::PCF8563Component ────────────────────────────────────────

export interface PCF8563ComponentActions {
  /**
   * This [Action](/automations/actions#all-actions) triggers a synchronization of the current system time to the RTC hardware.
   * @actionKey pcf8563.write_time
   */
  writeTime(): void;
  /**
   * This [Action](/automations/actions#all-actions) triggers a synchronization of the current system time from the RTC hardware.
   * @actionKey pcf8563.read_time
   */
  readTime(): void;
}

// ── pid::PIDClimate ──────────────────────────────────────────────────

export interface PIDClimate_AutotuneParams {
  /** **float**: The noiseband of the process (=sensor) variable. The value of the PID controller must be able to reach this value. Defaults to `0.25`.

  *See also: [PID Climate](https://esphome.io/components/climate/pid#climatepidautotune-action)* */
  noiseband?: number;
  /** **float**: The positive output power to drive the heat output at. Defaults to `1.0`.

  *See also: [PID Climate](https://esphome.io/components/climate/pid#climatepidautotune-action)* */
  /** @yamlKey positive_output */
  positiveOutput?: number;
  /** **float**: The negative output power to drive the cool output at. Defaults to `-1.0`.

  *See also: [PID Climate](https://esphome.io/components/climate/pid#climatepidautotune-action)* */
  /** @yamlKey negative_output */
  negativeOutput?: number;
}

export interface PIDClimate_SetControlParametersParams {
  /** **float**: The factor for the proportional term of the PID controller.

  *See also: [PID Climate](https://esphome.io/components/climate/pid#climatepidset_control_parameters-action)* */
  kp: number;
  /** **float**: The factor for the integral term of the PID controller. Defaults to `0`.

  *See also: [PID Climate](https://esphome.io/components/climate/pid#climatepidset_control_parameters-action)* */
  ki?: number;
  /** **float**: The factor for the derivative term of the PID controller. Defaults to `0`.

  *See also: [PID Climate](https://esphome.io/components/climate/pid#climatepidset_control_parameters-action)* */
  kd?: number;
}

export interface PIDClimateActions {
  /**
   * This action resets the integral term of the PID controller to 0. This might be necessary under certain conditions to avoid the control loop to overshoot (or undershoot) a target.
   * @actionKey pid.climate.reset_integral_term
   */
  resetIntegralTerm(): void;
  /**
   * This action starts the autotune process of the PID controller.
   * @actionKey pid.climate.autotune
   */
  autotune(params?: PIDClimate_AutotuneParams): void;
  /**
   * This action sets new values for the control parameters of the PID controller. This can be used to manually tune the PID controller. Make sure to take update the values you want on the YAML file! They will reset on the next reboot.
   * @actionKey pid.climate.set_control_parameters
   */
  setControlParameters(params?: PIDClimate_SetControlParametersParams): void;
}

// ── pmwcs3::PMWCS3Component ──────────────────────────────────────────

export interface PMWCS3Component_NewI2cAddressParams {
  /** **int**: New I2C address.

  *See also: [PMWCS3 Capacitive Soil Moisture and Temperature Sensor](https://esphome.io/components/sensor/pmwcs3#in-some-trigger)* */
  address: number;
}

export interface PMWCS3ComponentActions {
  /**
   * The pmwcs3 probe can to be also calibrated in water saturated conditions. Install the probe into a glass of water. The water calibration is also a 30s procedure.
   * @actionKey pmwcs3.water_calibration
   */
  waterCalibration(): void;
  /**
   * The pmwcs3 probe can to be calibrated in dry/air conditions. The air calibration is a 30s procedure.
   * @actionKey pmwcs3.air_calibration
   */
  airCalibration(): void;
  /**
   * A new I2C address can be set (for multi-probes cases for example)
   * @actionKey pmwcs3.new_i2c_address
   */
  newI2cAddress(params?: PMWCS3Component_NewI2cAddressParams): void;
}

// ── pulse_counter::PulseCounterSensor ────────────────────────────────

export interface PulseCounterSensor_SetTotalPulsesParams {
  value: number;
}

export interface PulseCounterSensorActions {
  /**
   * Using this action, you are able to reset/set the total pulse count. This can be useful if you would like the `total` sensor to match what you see on your meter you are trying to match.
   * @actionKey pulse_counter.set_total_pulses
   */
  setTotalPulses(params?: PulseCounterSensor_SetTotalPulsesParams): void;
}

// ── pulse_meter::PulseMeterSensor ────────────────────────────────────

export interface PulseMeterSensor_SetTotalPulsesParams {
  value: number;
}

export interface PulseMeterSensorActions {
  /**
   * Using this action, you are able to reset/set the total pulse count. This can be useful if you would like the `total` sensor to match what you see on your meter you are trying to match.
   * @actionKey pulse_meter.set_total_pulses
   */
  setTotalPulses(params?: PulseMeterSensor_SetTotalPulsesParams): void;
}

// ── pzemac::PZEMAC ───────────────────────────────────────────────────

export interface PZEMACActions {
  /**
   * This action resets the total energy value of the pzemac device with the given ID when executed.
   * @actionKey pzemac.reset_energy
   */
  resetEnergy(): void;
}

// ── pzemdc::PZEMDC ───────────────────────────────────────────────────

export interface PZEMDCActions {
  /**
   * This action resets the total energy value of the pzemdc device with the given ID when executed.
   * @actionKey pzemdc.reset_energy
   */
  resetEnergy(): void;
}

// ── remote_transmitter::RemoteTransmitterComponent ───────────────────

export interface RemoteTransmitterComponent_DigitalWriteParams {
  /** **bool**: The output value of the pin.

  *See also: [Remote Transmitter](https://esphome.io/components/remote_transmitter#configuration-variables)* */
  value: boolean;
}

export interface RemoteTransmitterComponentActions {
  /**
   * This [action](/automations/actions#all-actions) sets the output value of the pin.
   * @actionKey remote_transmitter.digital_write
   */
  digitalWrite(params?: RemoteTransmitterComponent_DigitalWriteParams): void;
}

// ── rf_bridge::RFBridgeComponent ─────────────────────────────────────

export interface RFBridgeComponent_SendCodeParams {
  sync: number;
  low: number;
  high: number;
  code: number;
}

export interface RFBridgeComponent_SendAdvancedCodeParams {
  length: number;
  protocol: number;
  code: string;
}

export interface RFBridgeComponent_SendRawParams {
  raw: string;
}

export interface RFBridgeComponent_BeepParams {
  duration: number;
}

export interface RFBridgeComponentActions {
  /**
   * Send a standard (0xA5) RF code using this action in automations.
   * @actionKey rf_bridge.send_code
   */
  sendCode(params?: RFBridgeComponent_SendCodeParams): void;
  /**
   * Tell the RF Bridge to learn new protocol timings using this action in automations. A new code with timings will be returned to [`on_code_received` Trigger](https://esphome.io/components/rf_bridge#rf_bridge-on_code_received)
   * @actionKey rf_bridge.learn
   */
  learn(): void;
  /**
   * Tell the RF Bridge to listen for the advanced/extra protocols defined in the portisch firmware. The decoded codes with length and protocol will be returned to [`on_advanced_code_received` Trigger](https://esphome.io/components/rf_bridge#rf_bridge-on_advanced_code_received)
   * @actionKey rf_bridge.start_advanced_sniffing
   */
  startAdvancedSniffing(): void;
  /**
   * Tell the RF Bridge to stop listening for the advanced/extra protocols defined in the portisch firmware.
   * @actionKey rf_bridge.stop_advanced_sniffing
   */
  stopAdvancedSniffing(): void;
  /**
   * Tell the RF Bridge to dump raw sniffing data. Useful for getting codes for unsupported protocols. The raw data will be available in the log and can later be used with [`rf_bridge.send_raw` Action](https://esphome.io/components/rf_bridge#rf_bridge-send_raw_action) action.
   * @actionKey rf_bridge.start_bucket_sniffing
   */
  startBucketSniffing(): void;
  /**
   * Send an RF code using this action in automations.
   * @actionKey rf_bridge.send_advanced_code
   */
  sendAdvancedCode(params?: RFBridgeComponent_SendAdvancedCodeParams): void;
  /**
   * Send a raw command to the onboard radio chip. The OEM RF firmware is able to raw send only standard signals (usually short), for other signals (B0 transmit), flashing the RF chip with Portisch or Mightymos firmware is needed.
   * @actionKey rf_bridge.send_raw
   */
  sendRaw(params?: RFBridgeComponent_SendRawParams): void;
  /**
   * Activate the internal buzzer to make a beep.
   * @actionKey rf_bridge.beep
   */
  beep(params?: RFBridgeComponent_BeepParams): void;
}

// ── rp2040_pwm::RP2040PWM ────────────────────────────────────────────

export interface RP2040PWM_SetFrequencyParams {
  frequency: number;
}

export interface RP2040PWMActions {
  /** @actionKey rp2040_pwm.output.set_frequency */
  setFrequency(params?: RP2040PWM_SetFrequencyParams): void;
}

// ── rtttl::Rtttl ─────────────────────────────────────────────────────

export interface Rtttl_PlayParams {
  /** **string**: The RTTTL string.

  *See also: [RTTTL Buzzer](https://esphome.io/components/rtttl#rtttlplay-action)* */
  rtttl: string;
}

export interface RtttlActions {
  /**
   * Plays an RTTTL tone.
   * @actionKey rtttl.play
   */
  play(params?: Rtttl_PlayParams): void;
  /**
   * Stops playback.
   * @actionKey rtttl.stop
   */
  stop(): void;
}

// ── rx8130::RX8130Component ──────────────────────────────────────────

export interface RX8130ComponentActions {
  /**
   * This [Action](/automations/actions#config-action) triggers a synchronization of the current system time to the RTC hardware.
   * @actionKey rx8130.write_time
   */
  writeTime(): void;
  /**
   * This [Action](/automations/actions#config-action) triggers a synchronization of the current system time from the RTC hardware.
   * @actionKey rx8130.read_time
   */
  readTime(): void;
}

// ── safe_mode::SafeModeComponent ─────────────────────────────────────

export interface SafeModeComponentActions {
  /**
   * This action marks the boot as successful, preventing safe mode from being invoked. This is useful for devices that take a sensor reading and then enter deep sleep, rather than waiting for the `boot_is_good_after` time to elapse.
   * @actionKey safe_mode.mark_successful
   */
  markSuccessful(): void;
}

// ── scd30::SCD30Component ────────────────────────────────────────────

export interface SCD30Component_ForceRecalibrationWithReferenceParams {
  value: number;
}

export interface SCD30ComponentActions {
  /** @actionKey scd30.force_recalibration_with_reference */
  forceRecalibrationWithReference(params?: SCD30Component_ForceRecalibrationWithReferenceParams): void;
}

// ── scd4x::SCD4XComponent ────────────────────────────────────────────

export interface SCD4XComponent_PerformForcedCalibrationParams {
  value: number;
}

export interface SCD4XComponentActions {
  /**
   * This [action](/automations/actions#all-actions) manually calibrates the sensor to the provided value in ppm. Operate the SCD4x in the operation mode later used in normal sensor operation (periodic measurement, low power periodic measurement or single shot) for > 3 minutes in an environment with homogenous and constant CO2 concentration before performing a forced recalibration. As of March 2025, the global monthly mean CO₂ concentration is 426 ppm.
   * @actionKey scd4x.perform_forced_calibration
   */
  performForcedCalibration(params?: SCD4XComponent_PerformForcedCalibrationParams): void;
  /**
   * This [action](/automations/actions#all-actions) triggers a factory reset of the sensor. Calibration settings are restored from factory settings.
   * @actionKey scd4x.factory_reset
   */
  factoryReset(): void;
}

// ── script::Script ───────────────────────────────────────────────────

export interface ScriptActions {
  /**
   * This action executes the script. The script **mode** dictates what will happen if the script was already running.
   * @actionKey script.execute
   */
  execute(): void;
  /**
   * This action allows you to stop a given script during execution. If the script is not running, it does nothing. This is useful if you want to stop a script that contains a `delay` action, `wait_until` action, or is inside a `while` loop, etc. You can also call this action from the script itself, and any subsequent action will not be executed.
   * @actionKey script.stop
   */
  stop(): void;
  /**
   * This action suspends execution of the automation until a script has finished executing.
   * @actionKey script.wait
   */
  wait(): void;
}

// ── select::Select ───────────────────────────────────────────────────

export interface Select_SetParams {
  /** **string**: The option to set the select to.

  *See also: [Select Component](https://esphome.io/components/select#selectset-action)* */
  option: string;
}

export interface Select_SetIndexParams {
  /** **int**: The index offset of the option to be activated.

  *See also: [Select Component](https://esphome.io/components/select#selectset_index-action)* */
  index: number;
}

export interface Select_PreviousParams {
  /** **boolean**: Whether or not to jump to the last option of the select when the first option is currently selected. Defaults to `true`.

  *See also: [Select Component](https://esphome.io/components/select#shorthand)* */
  cycle?: boolean;
}

export interface Select_NextParams {
  /** **boolean**: Whether or not to jump back to the first option of the select when the last option is currently selected. Defaults to `true`.

  *See also: [Select Component](https://esphome.io/components/select#shorthand)* */
  cycle?: boolean;
}

export interface Select_OperationParams {
  /** **string**: The operation to perform. One of `FIRST`, `LAST`, `PREVIOUS` or `NEXT` (case insensitive). When writing a lambda for this field, then return one of the following enum values: `SELECT_OP_FIRST`, `SELECT_OP_LAST`, `SELECT_OP_PREVIOUS` or `SELECT_OP_NEXT`.

  *See also: [Select Component](https://esphome.io/components/select#or-templated-lambdas)* */
  operation: string;
  /** **bool**: Can be used for options `NEXT` and `PREVIOUS` to specify whether or not to wrap around the options list when respectively the last or first option in the select is currently active.

  *See also: [Select Component](https://esphome.io/components/select#or-templated-lambdas)* */
  cycle?: boolean;
}

export interface SelectActions {
  /**
   * You can also set an option for the template select from elsewhere in your YAML file with the [`select.set` Action](/components/select#select-set_action).
   * @actionKey select.set
   */
  set(params?: Select_SetParams): void;
  /**
   * This is an [Action](/automations/actions#all-actions) for setting the active option using its index offset.
   * @actionKey select.set_index
   */
  setIndex(params?: Select_SetIndexParams): void;
  /**
   * This is an [Action](/automations/actions#all-actions) for selecting the last option in a select component.
   * @actionKey select.last
   */
  last(): void;
  /**
   * This is an [Action](/automations/actions#all-actions) for selecting the first option in a select component.
   * @actionKey select.first
   */
  first(): void;
  /**
   * This is an [Action](/automations/actions#all-actions) for selecting the previous option in a select component.
   * @actionKey select.previous
   */
  previous(params?: Select_PreviousParams): void;
  /**
   * This is an [Action](/automations/actions#all-actions) for selecting the next option in a select component.
   * @actionKey select.next
   */
  next(params?: Select_NextParams): void;
  /**
   * This is an [Action](/automations/actions#all-actions) that can be used to change the active option in a select component (first, last, previous or next), using a generic templatable action call.
   * @actionKey select.operation
   */
  operation(params?: Select_OperationParams): void;
}

// ── sen5x::SEN5XComponent ────────────────────────────────────────────

export interface SEN5XComponentActions {
  /**
   * This [action](/automations/actions#all-actions) manually starts fan-cleaning.
   * @actionKey sen5x.start_fan_autoclean
   */
  startFanAutoclean(): void;
}

// ── senseair::SenseAirComponent ──────────────────────────────────────

export interface SenseAirComponentActions {
  /**
   * This [action](/automations/actions#all-actions) requests the currently configured ABC interval from the sensor with the given ID. The value will be printed in ESPHome logs.
   * @actionKey senseair.abc_get_period
   */
  abcGetPeriod(): void;
  /**
   * This [action](/automations/actions#all-actions) disables Automatic Baseline Calibration on the sensor with the given ID.
   * @actionKey senseair.abc_disable
   */
  abcDisable(): void;
  /**
   * This [action](/automations/actions#all-actions) enables Automatic Baseline Calibration on the sensor with the given ID. ABC will be activated with the default interval of 180 hours.
   * @actionKey senseair.abc_enable
   */
  abcEnable(): void;
  /**
   * This [action](/automations/actions#all-actions) requests the result of the background calibration procedure from the sensor with the given ID. The value will be printed in ESPHome logs.
   * @actionKey senseair.background_calibration_result
   */
  backgroundCalibrationResult(): void;
  /**
   * This [action](/automations/actions#all-actions) initiates a background calibration on the sensor with the given ID: the current CO2 level will be used as a reference for the 400ppm threshold. Ensure that the sensor is in a stable environment with fresh ambient air, preferably near a window that has already been opened for a sufficient time.
   * @actionKey senseair.background_calibration
   */
  backgroundCalibration(): void;
}

// ── sensor::Sensor ───────────────────────────────────────────────────

export interface Sensor_SetValueParams {
  /** **int**: The value to set the internal counter to.

  *See also: [Rotary Encoder Sensor](https://esphome.io/components/sensor/rotary_encoder#in-some-trigger)* */
  value: number;
}

export interface Sensor_PublishParams {
  /** **float**: The state to publish.

  *See also: [Template Sensor](https://esphome.io/components/sensor/template#in-some-trigger)* */
  state: number;
}

export interface SensorActions {
  /**
   * The internal state of the rotary encoder can be manually changed to any value with this action. After executing this action, rotating the encoder further will increase/decrease the state relative to the newly set internal value.
   * @actionKey rotary_encoder.sensor.set_value
   */
  setValue(params?: Sensor_SetValueParams): void;
  /**
   * You can also publish a state to a template sensor from elsewhere in your YAML file with the `sensor.template.publish` action.
   * @actionKey template.sensor.publish
   */
  publish(params?: Sensor_PublishParams): void;
}

// ── servo::Servo ─────────────────────────────────────────────────────

export interface Servo_WriteParams {
  /** **percentage**: The target level. Range is from -100% to 100% (-1.0 to 1.0).

  *See also: [Servo Component](https://esphome.io/components/servo#servowrite-action)* */
  level: number;
}

export interface ServoActions {
  /**
   * To use your servo motor in [automations](/automations) or templates, you can use this action to set the target level of the servo from -100% to 100%.
   * @actionKey servo.write
   */
  write(params?: Servo_WriteParams): void;
  /**
   * This [Action](/automations/actions#all-actions) allows you to disable the output on a servo motor - this will make the servo motor stop immediately and disable its active control.
   * @actionKey servo.detach
   */
  detach(): void;
}

// ── sim800l::Sim800LComponent ────────────────────────────────────────

export interface Sim800LComponent_SendSmsParams {
  /** **string**: The message recipient. number.

  *See also: [Sim800L Component](https://esphome.io/components/sim800l#configuration-variables)* */
  recipient: string;
  /** **string**: The message content.

  *See also: [Sim800L Component](https://esphome.io/components/sim800l#configuration-variables)* */
  message: string;
}

export interface Sim800LComponent_DialParams {
  /** **string**: The number to dial.

  *See also: [Sim800L Component](https://esphome.io/components/sim800l#configuration-variables)* */
  recipient: string;
}

export interface Sim800LComponent_SendUssdParams {
  ussd: string;
}

export interface Sim800LComponentActions {
  /**
   * Send a SMS message to a phone recipient using this action in automations.
   * @actionKey sim800l.send_sms
   */
  sendSms(params?: Sim800LComponent_SendSmsParams): void;
  /**
   * Dial to a phone recipient using this action in automations.
   * @actionKey sim800l.dial
   */
  dial(params?: Sim800LComponent_DialParams): void;
  /**
   * Answers an incoming call.
   * @actionKey sim800l.connect
   */
  connect(): void;
  /**
   * Sends a ussd code to the network.
   * @actionKey sim800l.send_ussd
   */
  sendUssd(params?: Sim800LComponent_SendUssdParams): void;
  /**
   * Disconnects a call, either dialed in or received.
   * @actionKey sim800l.disconnect
   */
  disconnect(): void;
}

// ── sound_level::SoundLevelComponent ─────────────────────────────────

export interface SoundLevelComponentActions {
  /**
   * Stops measuring sound levels. Does nothing in passive mode.
   * @actionKey sound_level.stop
   */
  stop(): void;
  /**
   * Starts measuring sound levels. Does nothing in passive mode.
   * @actionKey sound_level.start
   */
  start(): void;
}

// ── speaker_source::SpeakerSourceMediaPlayer ─────────────────────────

export interface SpeakerSourceMediaPlayer_SetPlaylistDelayParams {
  /** **enum**: Which pipeline to set the delay for. One of `media` or `announcement`.

  *See also: [Speaker Source Media Player](https://esphome.io/components/media_player/speaker_source#speaker_sourceset_playlist_delay-action)* */
  pipeline: "media" | "announcement";
  /** **[Time](/guides/configuration-types#time)**: The delay between playlist tracks.

  *See also: [Speaker Source Media Player](https://esphome.io/components/media_player/speaker_source#speaker_sourceset_playlist_delay-action)* */
  delay: TimePeriod;
}

export interface SpeakerSourceMediaPlayerActions {
  /**
   * This action sets the delay between consecutive tracks in a pipeline's playlist. This can be useful to add a pause between announcement files or between media tracks.
   * @actionKey speaker_source.set_playlist_delay
   */
  setPlaylistDelay(params?: SpeakerSourceMediaPlayer_SetPlaylistDelayParams): void;
}

// ── speaker::Speaker ─────────────────────────────────────────────────

export interface Speaker_PlayParams {
  /** **list of bytes**: The raw audio data to play.

  *See also: [Speaker Components](https://esphome.io/components/speaker#speakerplay-action)* */
  data: number[];
}

export interface Speaker_VolumeSetParams {
  volume: unknown;
}

export interface SpeakerActions {
  /**
   * This action will start playing raw audio data from the speaker.
   * @actionKey speaker.play
   */
  play(params?: Speaker_PlayParams): void;
  /**
   * This action will stop playing audio data from the speaker and discard the unplayed data.
   * @actionKey speaker.stop
   */
  stop(): void;
  /**
   * This action will stop playing audio data from the speaker after all data **is** played.
   * @actionKey speaker.finish
   */
  finish(): void;
  /**
   * This action will set the volume of the speaker.
   * @actionKey speaker.volume_set
   */
  volumeSet(params?: Speaker_VolumeSetParams): void;
  /**
   * This action will mute the speaker.
   * @actionKey speaker.mute_on
   */
  muteOn(): void;
  /**
   * This action will unmute the speaker.
   * @actionKey speaker.mute_off
   */
  muteOff(): void;
}

// ── speaker::SpeakerMediaPlayer ──────────────────────────────────────

export interface SpeakerMediaPlayer_PlayOnDeviceMediaFileParams {
  /** **[ID](/guides/configuration-types#id)**: The ID of the media file.

  *See also: [Speaker Audio Media Player](https://esphome.io/components/media_player/speaker#media_playerspeakerplay_on_device_media_file-action)* */
  /** @yamlKey media_file */
  mediaFile: unknown;
  /** **boolean**: Whether to play back the file as an announcement or media stream. Defaults to `false`.

  *See also: [Speaker Audio Media Player](https://esphome.io/components/media_player/speaker#media_playerspeakerplay_on_device_media_file-action)* */
  announcement?: boolean;
  /** **boolean**: Whether to add the media file to the end of the pipeline's internal playlist. Defaults to `false`.

  *See also: [Speaker Audio Media Player](https://esphome.io/components/media_player/speaker#media_playerspeakerplay_on_device_media_file-action)* */
  enqueue?: boolean;
}

export interface SpeakerMediaPlayerActions {
  /**
   * This action will play a on-device media file.
   * @actionKey speaker.media_player.play_on_device_media_file
   */
  playOnDeviceMediaFile(params?: SpeakerMediaPlayer_PlayOnDeviceMediaFileParams): void;
}

// ── sprinkler::Sprinkler ─────────────────────────────────────────────

export interface Sprinkler_SetDividerParams {
  divider: number;
}

export interface Sprinkler_SetMultiplierParams {
  multiplier: number;
}

export interface Sprinkler_QueueValveParams {
  /** @yamlKey run_duration */
  runDuration?: Record<string, unknown>;
  /** @yamlKey valve_number */
  valveNumber: number;
}

export interface Sprinkler_SetRepeatParams {
  repeat: number;
}

export interface Sprinkler_SetValveRunDurationParams {
  /** @yamlKey run_duration */
  runDuration: Record<string, unknown>;
  /** @yamlKey valve_number */
  valveNumber: number;
}

export interface Sprinkler_StartSingleValveParams {
  /** @yamlKey run_duration */
  runDuration?: Record<string, unknown>;
  /** @yamlKey valve_number */
  valveNumber: number;
}

export interface SprinklerActions {
  /**
   * The divider value sets both the multiplier and repeat values as follows:
   * @actionKey sprinkler.set_divider
   */
  setDivider(params?: Sprinkler_SetDividerParams): void;
  /**
   * Sets the multiplier value used to proportionally increase or decrease the run duration for all valves/zones. For seasonal changes, it's easier to use the multiplier to adjust the watering time instead of adjusting the run durations directly. Set your run duration to the time you want for 'mild' weather (spring/autumn) and then use the multiplier to increase (summer) or decrease (winter) the calculated run times. When a given valve is activated, this value is multiplied by the valve's run duration (see below) to determine the valve's actual run duration. *Note that a multiplier value of zero is allowed; if the multiplier value is zero, the sprinkler controller will not start any valves.* **This can result in confusing/unexpected behavior if a visual indication of this condition is not available!**
   * @actionKey sprinkler.set_multiplier
   */
  setMultiplier(params?: Sprinkler_SetMultiplierParams): void;
  /**
   * Adds the specified valve into the controller's queue. When the queue is enabled, valves in the queue take precedence over valves scheduled as a part of a full cycle of the system (when auto-advance is enabled). If `run_duration` is not specified or is zero, the sprinkler controller will use the valve's configured run duration. Valves are numbered in the order they appear in the sprinkler controller's configuration starting at zero (0). *Note that, at present, the queue has a hard-coded limit of 100 entries to limit memory use.* Please see [The Sprinkler Controller Queue](https://esphome.io/components/sprinkler#sprinkler-controller-sprinkler_controller_queue) section below for more detail and examples.
   * @actionKey sprinkler.queue_valve
   */
  queueValve(params?: Sprinkler_QueueValveParams): void;
  /**
   * Specifies the number of times full cycles should be repeated. **Note that the total number of cycles the controller will run is equal to the repeat value plus one.** For example, with a `repeat` value of 1, the initial cycle will run, then the repeat cycle will run, resulting in a total of two cycles.
   * @actionKey sprinkler.set_repeat
   */
  setRepeat(params?: Sprinkler_SetRepeatParams): void;
  /**
   * Sets the run duration for the specified valve. When the valve is activated, this value is multiplied by the multiplier value (see above) to determine the valve's actual run duration.
   * @actionKey sprinkler.set_valve_run_duration
   */
  setValveRunDuration(params?: Sprinkler_SetValveRunDurationParams): void;
  /**
   * Starts the controller running valves from its queue. If no valves are in the queue, this action does nothing; otherwise, this disables the controller's "auto-advance" feature so that only queued valves/zones will run. Queued valves will remain on for either the amount of time specified in the queue request or for their configured `run_duration` multiplied by the controller's multiplier value (if the queue request run duration is not specified or is zero). *Note that queued valves ignore whether the valve is enabled; that is, queued valves will always run once the controller is started, unless, of course, the queue is (manually) cleared prior to the queue reaching them. Also note that, at present, the queue has a hard-coded limit of 100 entries to limit memory use.* See [The Sprinkler Controller Queue](https://esphome.io/components/sprinkler#sprinkler-controller-sprinkler_controller_queue) section below for more detail.
   * @actionKey sprinkler.start_from_queue
   */
  startFromQueue(): void;
  /**
   * Starts a full cycle of the system. This enables the controller's "auto-advance" feature and disables the queue. The controller will iterate through all enabled valves/zones. They will each run for their configured `run_duration` multiplied by the controller's multiplier value. *Note that if NO valves are enabled when this action is called, the controller will automatically enable all valves.*
   * @actionKey sprinkler.start_full_cycle
   */
  startFullCycle(): void;
  /**
   * Starts a single valve. This disables the controller's "auto-advance" and queue features so that only this valve/zone will run. The valve will remain on for the specified duration or (if `run_duration` is not specified or is zero) for its configured `run_duration` multiplied by the controller's multiplier value. *Note that this action ignores whether the valve is enabled; that is, when called, the specified valve will always run.* Valves are numbered in the order they appear in the sprinkler controller's configuration starting at zero (0).
   * @actionKey sprinkler.start_single_valve
   */
  startSingleValve(params?: Sprinkler_StartSingleValveParams): void;
  /**
   * Initiates a shutdown of all valves/the system, respecting any configured pump or valve stop delays.
   * @actionKey sprinkler.shutdown
   */
  shutdown(): void;
  /**
   * Resumes a cycle placed on hold with `sprinkler.pause`, but if no cycle was paused, starts a full cycle (equivalent to `sprinkler.start_full_cycle`  ).
   * @actionKey sprinkler.resume_or_start_full_cycle
   */
  resumeOrStartFullCycle(): void;
  /**
   * Resumes a cycle placed on hold with `sprinkler.pause`. If there is no paused cycle, this action will do nothing.
   * @actionKey sprinkler.resume
   */
  resume(): void;
  /**
   * Immediately turns off all valves, saving the active valve and the amount of time remaining so that the cycle may be resumed later on.
   * @actionKey sprinkler.pause
   */
  pause(): void;
  /**
   * Advances to the previous valve (numerically). If `manual_selection_delay` is configured, the controller will wait before activating the selected valve. If no valve is active, the last valve (as they appear in the controller's configuration) will be started. Setting `next_prev_ignore_disabled` to `true` will cause this action to skip valves that are not enabled via their valve enable switch (see above).
   * @actionKey sprinkler.previous_valve
   */
  previousValve(): void;
  /**
   * Advances to the next valve (numerically). If `manual_selection_delay` is configured, the controller will wait before activating the selected valve. If no valve is active, the first valve (as they appear in the controller's configuration) will be started. Setting `next_prev_ignore_disabled` to `true` will cause this action to skip valves that are not enabled via their valve enable switch (see above).
   * @actionKey sprinkler.next_valve
   */
  nextValve(): void;
  /**
   * Removes all queued valves from the controller's queue. Please see [The Sprinkler Controller Queue](https://esphome.io/components/sprinkler#sprinkler-controller-sprinkler_controller_queue) section below for more detail and examples.
   * @actionKey sprinkler.clear_queued_valves
   */
  clearQueuedValves(): void;
}

// ── sps30::SPS30Component ────────────────────────────────────────────

export interface SPS30ComponentActions {
  /**
   * This [action](/automations/actions#all-actions) manually puts the sensor into idle mode.
   * @actionKey sps30.stop_measurement
   */
  stopMeasurement(): void;
  /**
   * This [action](/automations/actions#all-actions) manually puts the sensor into measurement mode.
   * @actionKey sps30.start_measurement
   */
  startMeasurement(): void;
  /**
   * This [action](/automations/actions#all-actions) manually starts fan-cleaning.
   * @actionKey sps30.start_fan_autoclean
   */
  startFanAutoclean(): void;
}

// ── stepper::Stepper ─────────────────────────────────────────────────

export interface Stepper_SetTargetParams {
  /** **int**: The target position in steps.

  *See also: [Stepper Component](https://esphome.io/components/stepper#stepperset_target-action)* */
  target: number;
}

export interface Stepper_ReportPositionParams {
  /** **int**: The position to report in steps.

  *See also: [Stepper Component](https://esphome.io/components/stepper#stepperreport_position-action)* */
  position: number;
}

export interface Stepper_SetSpeedParams {
  /** **float**: The speed in `steps/s` (steps per seconds) to drive the stepper at.

  *See also: [Stepper Component](https://esphome.io/components/stepper#stepperset_speed-action)* */
  speed: number;
}

export interface Stepper_SetAccelerationParams {
  /** **float**: The acceleration in `steps/s^2` (steps per seconds squared) to use when starting to move.

  *See also: [Stepper Component](https://esphome.io/components/stepper#stepperset_acceleration-action)* */
  acceleration: number;
}

export interface Stepper_SetDecelerationParams {
  /** **float**: The same as `acceleration`, but for when the motor is decelerating shortly before reaching the set position.

  *See also: [Stepper Component](https://esphome.io/components/stepper#stepperset_deceleration-action)* */
  deceleration: number;
}

export interface StepperActions {
  /**
   * To use your stepper motor in [automations](/automations) or templates, you can use this action to set the target position (in steps). The stepper will always run towards the target position and stop once it has reached the target.
   * @actionKey stepper.set_target
   */
  setTarget(params?: Stepper_SetTargetParams): void;
  /**
   * All steppers start out with a target and current position of `0` on boot. However, if you for example want to home a stepper motor, it can be useful to **report** the stepper where it is currently at.
   * @actionKey stepper.report_position
   */
  reportPosition(params?: Stepper_ReportPositionParams): void;
  /**
   * This [Action](/automations/actions#all-actions) allows you to set the speed of a stepper at runtime.
   * @actionKey stepper.set_speed
   */
  setSpeed(params?: Stepper_SetSpeedParams): void;
  /**
   * This [Action](/automations/actions#all-actions) allows you to set the acceleration of a stepper at runtime.
   * @actionKey stepper.set_acceleration
   */
  setAcceleration(params?: Stepper_SetAccelerationParams): void;
  /**
   * This [Action](/automations/actions#all-actions) allows you to set the deceleration of a stepper at runtime.
   * @actionKey stepper.set_deceleration
   */
  setDeceleration(params?: Stepper_SetDecelerationParams): void;
}

// ── switch_::Switch ──────────────────────────────────────────────────

export interface Switch_ControlParams {
  /** **boolean**: The state to set the switch to. `true` turns the switch on, `false` turns it off.

  *See also: [Switch Component](https://esphome.io/components/switch#switchcontrol-action)* */
  state: boolean;
}

export interface Switch_PublishParams {
  /** **boolean**: The state to publish.

  *See also: [Template Switch](https://esphome.io/components/switch/template#in-some-trigger)* */
  state: boolean;
}

export interface SwitchActions {
  /**
   * This action allows you to control a switch with more flexibility than the basic `turn_on` and `turn_off` actions. It accepts a templatable `state` parameter, making it useful when the desired switch state is determined dynamically.
   * @actionKey switch.control
   */
  control(params?: Switch_ControlParams): void;
  /**
   * This action turns a switch with the given ID on when executed.
   * @actionKey switch.turn_on
   */
  turnOn(): void;
  /**
   * This action turns a switch with the given ID off when executed.
   * @actionKey switch.turn_off
   */
  turnOff(): void;
  /**
   * This action toggles a switch with the given ID when executed.
   * @actionKey switch.toggle
   */
  toggle(): void;
  /**
   * You can also publish a state to a template switch from elsewhere in your YAML file with the `switch.template.publish` action.
   * @actionKey template.switch.publish
   */
  publish(params?: Switch_PublishParams): void;
}

// ── sx126x::SX126x ───────────────────────────────────────────────────

export interface SX126x_SendPacketParams {
  /** **list**: The packet to send, length should match the configured payload_length.

  *See also: [SX126x Component](https://esphome.io/components/sx126x#configuration-variables)* */
  data: unknown;
}

export interface SX126xActions {
  /**
   * This [action](/automations/actions#all-actions) sets the `sx126x` mode to standby.
   * @actionKey sx126x.set_mode_standby
   */
  setModeStandby(): void;
  /**
   * This [action](/automations/actions#all-actions) sets the `sx126x` mode to sleep.
   * @actionKey sx126x.set_mode_sleep
   */
  setModeSleep(): void;
  /**
   * This [action](/automations/actions#all-actions) sets the `sx126x` mode to rx.
   * @actionKey sx126x.set_mode_rx
   */
  setModeRx(): void;
  /**
   * This [action](/automations/actions#all-actions) sets the `sx126x` mode to tx.
   * @actionKey sx126x.set_mode_tx
   */
  setModeTx(): void;
  /**
   * This [action](/automations/actions#all-actions) runs the `sx126x` image calibration.
   * @actionKey sx126x.run_image_cal
   */
  runImageCal(): void;
  /**
   * This [action](/automations/actions#all-actions) sends a packet.
   * @actionKey sx126x.send_packet
   */
  sendPacket(params?: SX126x_SendPacketParams): void;
}

// ── sx127x::SX127x ───────────────────────────────────────────────────

export interface SX127x_SendPacketParams {
  /** **list**: The packet to send, length should match the configured payload_length.

  *See also: [SX127x Component](https://esphome.io/components/sx127x#configuration-variables)* */
  data: unknown;
}

export interface SX127xActions {
  /**
   * This [action](/automations/actions#all-actions) sets the `sx127x` mode to standby.
   * @actionKey sx127x.set_mode_standby
   */
  setModeStandby(): void;
  /**
   * This [action](/automations/actions#all-actions) sets the `sx127x` mode to sleep.
   * @actionKey sx127x.set_mode_sleep
   */
  setModeSleep(): void;
  /**
   * This [action](/automations/actions#all-actions) sets the `sx127x` mode to rx.
   * @actionKey sx127x.set_mode_rx
   */
  setModeRx(): void;
  /**
   * This [action](/automations/actions#all-actions) sets the `sx127x` mode to tx.
   * @actionKey sx127x.set_mode_tx
   */
  setModeTx(): void;
  /**
   * This [action](/automations/actions#all-actions) runs the `sx127x` image calibration, must be in standby mode.
   * @actionKey sx127x.run_image_cal
   */
  runImageCal(): void;
  /**
   * This [action](/automations/actions#all-actions) sends a packet, the `sx127x` needs to be in packet mode.
   * @actionKey sx127x.send_packet
   */
  sendPacket(params?: SX127x_SendPacketParams): void;
}

// ── template_::TemplateLock ──────────────────────────────────────────

export interface TemplateLock_PublishParams {
  /** **boolean**: The state to publish.

  *See also: [Template Lock](https://esphome.io/components/lock/template#in-some-trigger)* */
  state: boolean;
}

export interface TemplateLockActions {
  /**
   * You can also publish a state to a template lock from elsewhere in your YAML file with the `lock.template.publish` action.
   * @actionKey template.lock.publish
   */
  publish(params?: TemplateLock_PublishParams): void;
}

// ── template_::TemplateValve ─────────────────────────────────────────

export interface TemplateValve_PublishParams {
  /** The state to publish. One of `OPEN`, `CLOSED`. If using a lambda, use `VALVE_OPEN` or `VALVE_CLOSED`.

  *See also: [Template Valve](https://esphome.io/components/valve/template#in-some-trigger)* */
  state?: "OPEN" | "CLOSED";
  /** **float**: The position to publish, from 0 (CLOSED) to 1.0 (OPEN)

  *See also: [Template Valve](https://esphome.io/components/valve/template#in-some-trigger)* */
  position?: number;
  /** **string**: The current operation mode to publish. One of `IDLE`, `OPENING` and `CLOSING`. If using a lambda, use `VALVE_OPERATION_IDLE`, `VALVE_OPERATION_OPENING`, and `VALVE_OPERATION_CLOSING`.

  *See also: [Template Valve](https://esphome.io/components/valve/template#in-some-trigger)* */
  /** @yamlKey current_operation */
  currentOperation?: string;
}

export interface TemplateValveActions {
  /**
   * You can also publish a state to a template valve from elsewhere in your YAML filewith the `valve.template.publish` action.
   * @actionKey template.valve.publish
   */
  publish(params?: TemplateValve_PublishParams): void;
}

// ── template_::TemplateWaterHeater ───────────────────────────────────

export interface TemplateWaterHeater_PublishParams {
  /** **float**: The current measured temperature to publish.

  *See also: [Template Water Heater](https://esphome.io/components/water_heater/template#example-action)* */
  /** @yamlKey current_temperature */
  currentTemperature?: number;
  /** **float**: The target setpoint temperature to publish.

  *See also: [Template Water Heater](https://esphome.io/components/water_heater/template#example-action)* */
  /** @yamlKey target_temperature */
  targetTemperature?: number;
  /** **string**: The operation mode to publish. See [Water Heater Modes](/components/water_heater#water-heater-modes) for options.

  *See also: [Template Water Heater](https://esphome.io/components/water_heater/template#example-action)* */
  mode?: string;
  /** **boolean**: The away mode state to publish.

  *See also: [Template Water Heater](https://esphome.io/components/water_heater/template#example-action)* */
  away?: boolean;
  /** **boolean**: The boolean On/Off state to publish.

  *See also: [Template Water Heater](https://esphome.io/components/water_heater/template#example-action)* */
  /** @yamlKey is_on */
  isOn?: boolean;
}

export interface TemplateWaterHeaterActions {
  /**
   * You can also publish state to a template water heater from elsewhere in your YAML file with the `water_heater.template.publish` action.
   * @actionKey template.water_heater.publish
   */
  publish(params?: TemplateWaterHeater_PublishParams): void;
}

// ── text_sensor::TextSensor ──────────────────────────────────────────

export interface TextSensor_PublishParams {
  /** **string**: The state to publish.

  *See also: [Template Text Sensor](https://esphome.io/components/text_sensor/template#in-some-trigger)* */
  state: string;
}

export interface TextSensorActions {
  /**
   * You can also publish a state to a template text sensor from elsewhere in your YAML file with the `text_sensor.template.publish` action.
   * @actionKey template.text_sensor.publish
   */
  publish(params?: TextSensor_PublishParams): void;
}

// ── text::Text ───────────────────────────────────────────────────────

export interface Text_SetParams {
  /** **string**: The value to set the text to.

  *See also: [Text Component](https://esphome.io/components/text#textset-action)* */
  value: string;
}

export interface TextActions {
  /**
   * This is an [Action](/automations/actions#all-actions) for setting a text state.
   * @actionKey text.set
   */
  set(params?: Text_SetParams): void;
}

// ── tm1651::TM1651Display ────────────────────────────────────────────

export interface TM1651Display_SetBrightnessParams {
  /** **int**: There is three levels of brightness (`1`, `2` or `3`  ) from lowest to highest brightness.

  *See also: [TM1651 Battery Display](https://esphome.io/components/tm1651#configuration-variables)* */
  brightness: number;
}

export interface TM1651Display_SetLevelParams {
  /** **int**: Level from 0 to 7

  *See also: [TM1651 Battery Display](https://esphome.io/components/tm1651#configuration-variables)* */
  level: number;
}

export interface TM1651Display_SetLevelPercentParams {
  /** **int**: Level from 0 to 100

  *See also: [TM1651 Battery Display](https://esphome.io/components/tm1651#configuration-variables)* */
  /** @yamlKey level_percent */
  levelPercent: number;
}

export interface TM1651DisplayActions {
  /**
   * This [Action](/automations/actions#all-actions) allows you to manually change the brightness of the battery display at runtime.
   * @actionKey tm1651.set_brightness
   */
  setBrightness(params?: TM1651Display_SetBrightnessParams): void;
  /**
   * This [Action](/automations/actions#all-actions) changes the level of the battery display at runtime.
   * @actionKey tm1651.set_level
   */
  setLevel(params?: TM1651Display_SetLevelParams): void;
  /**
   * This [Action](/automations/actions#all-actions) changes the level of the battery display at runtime. Automatically calculates input level in percentages to actual level for the display.
   * @actionKey tm1651.set_level_percent
   */
  setLevelPercent(params?: TM1651Display_SetLevelPercentParams): void;
  /**
   * This [Action](/automations/actions#all-actions) turns off all the LEDs.
   * @actionKey tm1651.turn_off
   */
  turnOff(): void;
  /**
   * This [Action](/automations/actions#all-actions) turns on the LEDs.
   * @actionKey tm1651.turn_on
   */
  turnOn(): void;
}

// ── uart::UARTComponent ──────────────────────────────────────────────

export interface UARTComponent_WriteParams {
  data: unknown;
}

export interface UARTComponentActions {
  /**
   * This [Action](/automations/actions#all-actions) sends a defined UART signal to the given UART bus.
   * @actionKey uart.write
   */
  write(params?: UARTComponent_WriteParams): void;
}

// ── udp::UDPComponent ────────────────────────────────────────────────

export interface UDPComponent_WriteParams {
  data: unknown;
}

export interface UDPComponentActions {
  /**
   * To write data to the UDP port, use the `udp.write` action. This action takes a single argument, the data to write to the UDP port.
   * @actionKey udp.write
   */
  write(params?: UDPComponent_WriteParams): void;
}

// ── ufire_ec::UFireECComponent ───────────────────────────────────────

export interface UFireECComponent_CalibrateProbeParams {
  /** **float**: Solution reference EC value.

  *See also: [uFire Isolated EC sensor](https://esphome.io/components/sensor/ufire_ec#in-some-trigger)* */
  solution: number;
  /** **float**: Solution current temperature.

  *See also: [uFire Isolated EC sensor](https://esphome.io/components/sensor/ufire_ec#in-some-trigger)* */
  temperature: number;
}

export interface UFireECComponentActions {
  /**
   * The EC probe have to be calibrated. For this you need know the EC reference value and temperature of the calibration solution.
   * @actionKey ufire_ec.calibrate_probe
   */
  calibrateProbe(params?: UFireECComponent_CalibrateProbeParams): void;
  /**
   * Reset the current calibration on the sensor.
   * @actionKey ufire_ec.reset
   */
  reset(): void;
}

// ── ufire_ise::UFireISEComponent ─────────────────────────────────────

export interface UFireISEComponent_CalibrateProbeLowParams {
  /** **float**: Solution reference pH value.

  *See also: [uFire ISE pH sensor](https://esphome.io/components/sensor/ufire_ise#in-some-trigger)* */
  solution: number;
}

export interface UFireISEComponent_CalibrateProbeHighParams {
  /** **float**: Solution reference pH value.

  *See also: [uFire ISE pH sensor](https://esphome.io/components/sensor/ufire_ise#in-some-trigger)* */
  solution: number;
}

export interface UFireISEComponentActions {
  /**
   * The pH probe have to be calibrated. For this you need to know the pH reference value of the calibration low solution.
   * @actionKey ufire_ise.calibrate_probe_low
   */
  calibrateProbeLow(params?: UFireISEComponent_CalibrateProbeLowParams): void;
  /**
   * The pH probe have to be calibrated. For this you need to know the pH reference value of the calibration high solution.
   * @actionKey ufire_ise.calibrate_probe_high
   */
  calibrateProbeHigh(params?: UFireISEComponent_CalibrateProbeHighParams): void;
  /**
   * Reset the current calibration on the sensor.
   * @actionKey ufire_ise.reset
   */
  reset(): void;
}

// ── update::UpdateEntity ─────────────────────────────────────────────

export interface UpdateEntity_PerformParams {
  /** **boolean**: Perform the update even if the device is already running the same version. Defaults to `false`.

  *See also: [Update Core](https://esphome.io/components/update#updateperform-action)* */
  /** @yamlKey force_update */
  forceUpdate?: boolean;
}

export interface UpdateEntityActions {
  /**
   * This action allows you to trigger the update entity to start the update process.
   * @actionKey update.perform
   */
  perform(params?: UpdateEntity_PerformParams): void;
  /**
   * This action allows you to trigger the update entity to check for, but not install, updates.
   * @actionKey update.check
   */
  check(): void;
}

// ── valve::Valve ─────────────────────────────────────────────────────

export interface Valve_ControlParams {
  /** **boolean**: Whether to stop the valve.

  *See also: [Valve Component](https://esphome.io/components/valve#valvecontrol-action)* */
  stop?: boolean;
  /** **string**: The state to set the valve to - one of `OPEN` or `CLOSE`.

  *See also: [Valve Component](https://esphome.io/components/valve#valvecontrol-action)* */
  state?: string;
  /** **float**: The valve position to set.

  *See also: [Valve Component](https://esphome.io/components/valve#valvecontrol-action)* */
  position?: number;
}

export interface ValveActions {
  /**
   * This [action](/automations/actions#all-actions) opens the valve with the given ID when executed.
   * @actionKey valve.open
   */
  open(): void;
  /**
   * This [action](/automations/actions#all-actions) closes the valve with the given ID when executed.
   * @actionKey valve.close
   */
  close(): void;
  /**
   * This [action](/automations/actions#all-actions) stops the valve with the given ID when executed.
   * @actionKey valve.stop
   */
  stop(): void;
  /**
   * This [action](/automations/actions#all-actions) toggles the valve with the given ID when executed, cycling through the states close/stop/open/stop... This allows the valve to be controlled by a single push button.
   * @actionKey valve.toggle
   */
  toggle(): void;
  /**
   * This [action](/automations/actions#all-actions) is a more generic version of the other valve actions and allows all valve attributes to be set.
   * @actionKey valve.control
   */
  control(params?: Valve_ControlParams): void;
}

// ── voice_assistant::VoiceAssistant ──────────────────────────────────

export interface VoiceAssistant_StartParams {
  /** **boolean**: Enable silence detection. Defaults to `true`.

  *See also: [Voice Assistant](https://esphome.io/components/voice_assistant#configuration-variables)* */
  /** @yamlKey silence_detection */
  silenceDetection?: boolean;
  /** **string**: The wake word that was used to trigger the voice assistant when using on-device wake word such as [Micro Wake Word](/components/micro_wake_word/).

  *See also: [Voice Assistant](https://esphome.io/components/voice_assistant#configuration-variables)* */
  /** @yamlKey wake_word */
  wakeWord?: string;
}

export interface VoiceAssistantActions {
  /**
   * Listens for one voice command then stops.
   * @actionKey voice_assistant.start
   */
  start(params?: VoiceAssistant_StartParams): void;
  /**
   * Start listening for voice commands. This will start listening again after the response audio has finished playing. Some errors will stop the cycle. Call `voice_assistant.stop` to stop the cycle.
   * @actionKey voice_assistant.start_continuous
   */
  startContinuous(): void;
  /**
   * Stop listening for voice commands.
   * @actionKey voice_assistant.stop
   */
  stop(): void;
}

// ── wireguard::Wireguard ─────────────────────────────────────────────

export interface WireguardActions {
  /**
   * This action enables the component and starts the connection to the remote peer.
   * @actionKey wireguard.enable
   */
  enable(): void;
  /**
   * This action drops down the active VPN link (if any) and disables the component.
   * @actionKey wireguard.disable
   */
  disable(): void;
}

// ── zigbee::ZigbeeComponent ──────────────────────────────────────────

export interface ZigbeeComponentActions {
  /**
   * This [action](/automations/actions#config-action) triggers a factory reset of the Zigbee device. It handles leaving the Zigbee network.
   * @actionKey zigbee.factory_reset
   */
  factoryReset(): void;
}

// ── Class to actions mapping ─────────────────────────────────────────────

export interface ClassActionMap {
  "::esphome::hub75::HUB75Display": HUB75DisplayActions;
  "ags10::AGS10Component": AGS10ComponentActions;
  "aic3204::AIC3204": AIC3204Actions;
  "alarm_control_panel::AlarmControlPanel": AlarmControlPanelActions;
  "animation::Animation": AnimationActions;
  "api::APIServer": APIServerActions;
  "at581x::AT581XComponent": AT581XComponentActions;
  "audio_adc::AudioAdc": AudioAdcActions;
  "audio_dac::AudioDac": AudioDacActions;
  "binary_sensor::BinarySensor": BinarySensorActions;
  "bl0906::BL0906": BL0906Actions;
  "ble_client::BLEClient": BLEClientActions;
  "bm8563::BM8563": BM8563Actions;
  "button::Button": ButtonActions;
  "canbus::CanbusComponent": CanbusComponentActions;
  "cc1101::CC1101Component": CC1101ComponentActions;
  "climate::Climate": ClimateActions;
  "cm1106::CM1106Component": CM1106ComponentActions;
  "cover::Cover": CoverActions;
  "cs5460a::CS5460AComponent": CS5460AComponentActions;
  "datetime::DateTimeEntity": DateTimeEntityActions;
  "datetime::TimeEntity": TimeEntityActions;
  "deep_sleep::DeepSleepComponent": DeepSleepComponentActions;
  "dfplayer::DFPlayer": DFPlayerActions;
  "dfrobot_sen0395::DfrobotSen0395Component": DfrobotSen0395ComponentActions;
  "ds1307::DS1307Component": DS1307ComponentActions;
  "duty_time_sensor::DutyTimeSensor": DutyTimeSensorActions;
  "esp32_ble_tracker::ESP32BLETracker": ESP32BLETrackerActions;
  "esp8266_pwm::ESP8266PWM": ESP8266PWMActions;
  "espnow::ESPNowComponent": ESPNowComponentActions;
  "event::Event": EventActions;
  "ezo_pmp::EzoPMP": EzoPMPActions;
  "fan::Fan": FanActions;
  "fingerprint_grow::FingerprintGrowComponent": FingerprintGrowComponentActions;
  "globals::GlobalsComponent": GlobalsComponentActions;
  "grove_tb6612fng::GroveMotorDriveTB6612FNG": GroveMotorDriveTB6612FNGActions;
  "haier::HaierClimateBase": HaierClimateBaseActions;
  "haier::HonClimate": HonClimateActions;
  "hbridge::HBridgeFan": HBridgeFanActions;
  "hc8::HC8Component": HC8ComponentActions;
  "hdc302x::HDC302XComponent": HDC302XComponentActions;
  "hlk_fm22x::HlkFm22xComponent": HlkFm22xComponentActions;
  "http_request::HttpRequestComponent": HttpRequestComponentActions;
  "http_request::OtaHttpRequestComponent": OtaHttpRequestComponentActions;
  "htu21d::HTU21DComponent": HTU21DComponentActions;
  "integration::IntegrationSensor": IntegrationSensorActions;
  "key_collector::KeyCollector": KeyCollectorActions;
  "ledc::LEDCOutput": LEDCOutputActions;
  "libretiny_pwm::LibreTinyPWM": LibreTinyPWMActions;
  "light::AddressableLightState": AddressableLightStateActions;
  "light::LightState": LightStateActions;
  "lightwaverf::LightWaveRF": LightWaveRFActions;
  "lock::Lock": LockActions;
  "logger::Logger": LoggerActions;
  "lv_style_t": lv_style_tActions;
  "lvgl::LvglComponent": LvglComponentActions;
  "max17043::MAX17043Component": MAX17043ComponentActions;
  "max6956::MAX6956": MAX6956Actions;
  "max7219digit::MAX7219Component": MAX7219ComponentActions;
  "media_player::MediaPlayer": MediaPlayerActions;
  "mhz19::MHZ19Component": MHZ19ComponentActions;
  "micro_wake_word::MicroWakeWord": MicroWakeWordActions;
  "micro_wake_word::WakeWordModel": WakeWordModelActions;
  "microphone::Microphone": MicrophoneActions;
  "midea::ac::AirConditioner": AirConditionerActions;
  "mqtt::MQTTClientComponent": MQTTClientComponentActions;
  "nau7802::NAU7802Sensor": NAU7802SensorActions;
  "nextion::Nextion": NextionActions;
  "nextion::NextionBinarySensor": NextionBinarySensorActions;
  "nextion::NextionSensor": NextionSensorActions;
  "nextion::NextionSwitch": NextionSwitchActions;
  "nextion::NextionTextSensor": NextionTextSensorActions;
  "number::Number": NumberActions;
  "online_image::OnlineImage": OnlineImageActions;
  "output::BinaryOutput": BinaryOutputActions;
  "output::FloatOutput": FloatOutputActions;
  "pcf85063::PCF85063Component": PCF85063ComponentActions;
  "pcf8563::PCF8563Component": PCF8563ComponentActions;
  "pid::PIDClimate": PIDClimateActions;
  "pmwcs3::PMWCS3Component": PMWCS3ComponentActions;
  "pulse_counter::PulseCounterSensor": PulseCounterSensorActions;
  "pulse_meter::PulseMeterSensor": PulseMeterSensorActions;
  "pzemac::PZEMAC": PZEMACActions;
  "pzemdc::PZEMDC": PZEMDCActions;
  "remote_transmitter::RemoteTransmitterComponent": RemoteTransmitterComponentActions;
  "rf_bridge::RFBridgeComponent": RFBridgeComponentActions;
  "rp2040_pwm::RP2040PWM": RP2040PWMActions;
  "rtttl::Rtttl": RtttlActions;
  "rx8130::RX8130Component": RX8130ComponentActions;
  "safe_mode::SafeModeComponent": SafeModeComponentActions;
  "scd30::SCD30Component": SCD30ComponentActions;
  "scd4x::SCD4XComponent": SCD4XComponentActions;
  "script::Script": ScriptActions;
  "select::Select": SelectActions;
  "sen5x::SEN5XComponent": SEN5XComponentActions;
  "senseair::SenseAirComponent": SenseAirComponentActions;
  "sensor::Sensor": SensorActions;
  "servo::Servo": ServoActions;
  "sim800l::Sim800LComponent": Sim800LComponentActions;
  "sound_level::SoundLevelComponent": SoundLevelComponentActions;
  "speaker_source::SpeakerSourceMediaPlayer": SpeakerSourceMediaPlayerActions;
  "speaker::Speaker": SpeakerActions;
  "speaker::SpeakerMediaPlayer": SpeakerMediaPlayerActions;
  "sprinkler::Sprinkler": SprinklerActions;
  "sps30::SPS30Component": SPS30ComponentActions;
  "stepper::Stepper": StepperActions;
  "switch_::Switch": SwitchActions;
  "sx126x::SX126x": SX126xActions;
  "sx127x::SX127x": SX127xActions;
  "template_::TemplateLock": TemplateLockActions;
  "template_::TemplateValve": TemplateValveActions;
  "template_::TemplateWaterHeater": TemplateWaterHeaterActions;
  "text_sensor::TextSensor": TextSensorActions;
  "text::Text": TextActions;
  "tm1651::TM1651Display": TM1651DisplayActions;
  "uart::UARTComponent": UARTComponentActions;
  "udp::UDPComponent": UDPComponentActions;
  "ufire_ec::UFireECComponent": UFireECComponentActions;
  "ufire_ise::UFireISEComponent": UFireISEComponentActions;
  "update::UpdateEntity": UpdateEntityActions;
  "valve::Valve": ValveActions;
  "voice_assistant::VoiceAssistant": VoiceAssistantActions;
  "wireguard::Wireguard": WireguardActions;
  "zigbee::ZigbeeComponent": ZigbeeComponentActions;
}

/**
 * Infers available action methods for a marker type using structural brand
 * checking. Uses intersection (&) so that a derived marker inherits actions
 * from all ancestor classes.
 *
 * @example
 * InferActions<LightOutputRef>          // → LightStateActions
 * InferActions<FloatOutputRef>           // → BinaryOutputActions & FloatOutputActions
 * InferActions<I2CBusRef>                // → {} (no actions)
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type InferActions<T> =
  (T extends { readonly __brand_esphome_hub75_HUB75Display?: true } ? HUB75DisplayActions : {})
  & (T extends { readonly __brand_ags10_AGS10Component?: true } ? AGS10ComponentActions : {})
  & (T extends { readonly __brand_aic3204_AIC3204?: true } ? AIC3204Actions : {})
  & (T extends { readonly __brand_alarm_control_panel_AlarmControlPanel?: true } ? AlarmControlPanelActions : {})
  & (T extends { readonly __brand_animation_Animation?: true } ? AnimationActions : {})
  & (T extends { readonly __brand_api_APIServer?: true } ? APIServerActions : {})
  & (T extends { readonly __brand_at581x_AT581XComponent?: true } ? AT581XComponentActions : {})
  & (T extends { readonly __brand_audio_adc_AudioAdc?: true } ? AudioAdcActions : {})
  & (T extends { readonly __brand_audio_dac_AudioDac?: true } ? AudioDacActions : {})
  & (T extends { readonly __brand_binary_sensor_BinarySensor?: true } ? BinarySensorActions : {})
  & (T extends { readonly __brand_bl0906_BL0906?: true } ? BL0906Actions : {})
  & (T extends { readonly __brand_ble_client_BLEClient?: true } ? BLEClientActions : {})
  & (T extends { readonly __brand_bm8563_BM8563?: true } ? BM8563Actions : {})
  & (T extends { readonly __brand_button_Button?: true } ? ButtonActions : {})
  & (T extends { readonly __brand_canbus_CanbusComponent?: true } ? CanbusComponentActions : {})
  & (T extends { readonly __brand_cc1101_CC1101Component?: true } ? CC1101ComponentActions : {})
  & (T extends { readonly __brand_climate_Climate?: true } ? ClimateActions : {})
  & (T extends { readonly __brand_cm1106_CM1106Component?: true } ? CM1106ComponentActions : {})
  & (T extends { readonly __brand_cover_Cover?: true } ? CoverActions : {})
  & (T extends { readonly __brand_cs5460a_CS5460AComponent?: true } ? CS5460AComponentActions : {})
  & (T extends { readonly __brand_datetime_DateTimeEntity?: true } ? DateTimeEntityActions : {})
  & (T extends { readonly __brand_datetime_TimeEntity?: true } ? TimeEntityActions : {})
  & (T extends { readonly __brand_deep_sleep_DeepSleepComponent?: true } ? DeepSleepComponentActions : {})
  & (T extends { readonly __brand_dfplayer_DFPlayer?: true } ? DFPlayerActions : {})
  & (T extends { readonly __brand_dfrobot_sen0395_DfrobotSen0395Component?: true } ? DfrobotSen0395ComponentActions : {})
  & (T extends { readonly __brand_ds1307_DS1307Component?: true } ? DS1307ComponentActions : {})
  & (T extends { readonly __brand_duty_time_sensor_DutyTimeSensor?: true } ? DutyTimeSensorActions : {})
  & (T extends { readonly __brand_esp32_ble_tracker_ESP32BLETracker?: true } ? ESP32BLETrackerActions : {})
  & (T extends { readonly __brand_esp8266_pwm_ESP8266PWM?: true } ? ESP8266PWMActions : {})
  & (T extends { readonly __brand_espnow_ESPNowComponent?: true } ? ESPNowComponentActions : {})
  & (T extends { readonly __brand_event_Event?: true } ? EventActions : {})
  & (T extends { readonly __brand_ezo_pmp_EzoPMP?: true } ? EzoPMPActions : {})
  & (T extends { readonly __brand_fan_Fan?: true } ? FanActions : {})
  & (T extends { readonly __brand_fingerprint_grow_FingerprintGrowComponent?: true } ? FingerprintGrowComponentActions : {})
  & (T extends { readonly __brand_globals_GlobalsComponent?: true } ? GlobalsComponentActions : {})
  & (T extends { readonly __brand_grove_tb6612fng_GroveMotorDriveTB6612FNG?: true } ? GroveMotorDriveTB6612FNGActions : {})
  & (T extends { readonly __brand_haier_HaierClimateBase?: true } ? HaierClimateBaseActions : {})
  & (T extends { readonly __brand_haier_HonClimate?: true } ? HonClimateActions : {})
  & (T extends { readonly __brand_hbridge_HBridgeFan?: true } ? HBridgeFanActions : {})
  & (T extends { readonly __brand_hc8_HC8Component?: true } ? HC8ComponentActions : {})
  & (T extends { readonly __brand_hdc302x_HDC302XComponent?: true } ? HDC302XComponentActions : {})
  & (T extends { readonly __brand_hlk_fm22x_HlkFm22xComponent?: true } ? HlkFm22xComponentActions : {})
  & (T extends { readonly __brand_http_request_HttpRequestComponent?: true } ? HttpRequestComponentActions : {})
  & (T extends { readonly __brand_http_request_OtaHttpRequestComponent?: true } ? OtaHttpRequestComponentActions : {})
  & (T extends { readonly __brand_htu21d_HTU21DComponent?: true } ? HTU21DComponentActions : {})
  & (T extends { readonly __brand_integration_IntegrationSensor?: true } ? IntegrationSensorActions : {})
  & (T extends { readonly __brand_key_collector_KeyCollector?: true } ? KeyCollectorActions : {})
  & (T extends { readonly __brand_ledc_LEDCOutput?: true } ? LEDCOutputActions : {})
  & (T extends { readonly __brand_libretiny_pwm_LibreTinyPWM?: true } ? LibreTinyPWMActions : {})
  & (T extends { readonly __brand_light_AddressableLightState?: true } ? AddressableLightStateActions : {})
  & (T extends { readonly __brand_light_LightState?: true } ? LightStateActions : {})
  & (T extends { readonly __brand_lightwaverf_LightWaveRF?: true } ? LightWaveRFActions : {})
  & (T extends { readonly __brand_lock_Lock?: true } ? LockActions : {})
  & (T extends { readonly __brand_logger_Logger?: true } ? LoggerActions : {})
  & (T extends { readonly __brand_lv_style_t?: true } ? lv_style_tActions : {})
  & (T extends { readonly __brand_lvgl_LvglComponent?: true } ? LvglComponentActions : {})
  & (T extends { readonly __brand_max17043_MAX17043Component?: true } ? MAX17043ComponentActions : {})
  & (T extends { readonly __brand_max6956_MAX6956?: true } ? MAX6956Actions : {})
  & (T extends { readonly __brand_max7219digit_MAX7219Component?: true } ? MAX7219ComponentActions : {})
  & (T extends { readonly __brand_media_player_MediaPlayer?: true } ? MediaPlayerActions : {})
  & (T extends { readonly __brand_mhz19_MHZ19Component?: true } ? MHZ19ComponentActions : {})
  & (T extends { readonly __brand_micro_wake_word_MicroWakeWord?: true } ? MicroWakeWordActions : {})
  & (T extends { readonly __brand_micro_wake_word_WakeWordModel?: true } ? WakeWordModelActions : {})
  & (T extends { readonly __brand_microphone_Microphone?: true } ? MicrophoneActions : {})
  & (T extends { readonly __brand_midea_ac_AirConditioner?: true } ? AirConditionerActions : {})
  & (T extends { readonly __brand_mqtt_MQTTClientComponent?: true } ? MQTTClientComponentActions : {})
  & (T extends { readonly __brand_nau7802_NAU7802Sensor?: true } ? NAU7802SensorActions : {})
  & (T extends { readonly __brand_nextion_Nextion?: true } ? NextionActions : {})
  & (T extends { readonly __brand_nextion_NextionBinarySensor?: true } ? NextionBinarySensorActions : {})
  & (T extends { readonly __brand_nextion_NextionSensor?: true } ? NextionSensorActions : {})
  & (T extends { readonly __brand_nextion_NextionSwitch?: true } ? NextionSwitchActions : {})
  & (T extends { readonly __brand_nextion_NextionTextSensor?: true } ? NextionTextSensorActions : {})
  & (T extends { readonly __brand_number_Number?: true } ? NumberActions : {})
  & (T extends { readonly __brand_online_image_OnlineImage?: true } ? OnlineImageActions : {})
  & (T extends { readonly __brand_output_BinaryOutput?: true } ? BinaryOutputActions : {})
  & (T extends { readonly __brand_output_FloatOutput?: true } ? FloatOutputActions : {})
  & (T extends { readonly __brand_pcf85063_PCF85063Component?: true } ? PCF85063ComponentActions : {})
  & (T extends { readonly __brand_pcf8563_PCF8563Component?: true } ? PCF8563ComponentActions : {})
  & (T extends { readonly __brand_pid_PIDClimate?: true } ? PIDClimateActions : {})
  & (T extends { readonly __brand_pmwcs3_PMWCS3Component?: true } ? PMWCS3ComponentActions : {})
  & (T extends { readonly __brand_pulse_counter_PulseCounterSensor?: true } ? PulseCounterSensorActions : {})
  & (T extends { readonly __brand_pulse_meter_PulseMeterSensor?: true } ? PulseMeterSensorActions : {})
  & (T extends { readonly __brand_pzemac_PZEMAC?: true } ? PZEMACActions : {})
  & (T extends { readonly __brand_pzemdc_PZEMDC?: true } ? PZEMDCActions : {})
  & (T extends { readonly __brand_remote_transmitter_RemoteTransmitterComponent?: true } ? RemoteTransmitterComponentActions : {})
  & (T extends { readonly __brand_rf_bridge_RFBridgeComponent?: true } ? RFBridgeComponentActions : {})
  & (T extends { readonly __brand_rp2040_pwm_RP2040PWM?: true } ? RP2040PWMActions : {})
  & (T extends { readonly __brand_rtttl_Rtttl?: true } ? RtttlActions : {})
  & (T extends { readonly __brand_rx8130_RX8130Component?: true } ? RX8130ComponentActions : {})
  & (T extends { readonly __brand_safe_mode_SafeModeComponent?: true } ? SafeModeComponentActions : {})
  & (T extends { readonly __brand_scd30_SCD30Component?: true } ? SCD30ComponentActions : {})
  & (T extends { readonly __brand_scd4x_SCD4XComponent?: true } ? SCD4XComponentActions : {})
  & (T extends { readonly __brand_script_Script?: true } ? ScriptActions : {})
  & (T extends { readonly __brand_select_Select?: true } ? SelectActions : {})
  & (T extends { readonly __brand_sen5x_SEN5XComponent?: true } ? SEN5XComponentActions : {})
  & (T extends { readonly __brand_senseair_SenseAirComponent?: true } ? SenseAirComponentActions : {})
  & (T extends { readonly __brand_sensor_Sensor?: true } ? SensorActions : {})
  & (T extends { readonly __brand_servo_Servo?: true } ? ServoActions : {})
  & (T extends { readonly __brand_sim800l_Sim800LComponent?: true } ? Sim800LComponentActions : {})
  & (T extends { readonly __brand_sound_level_SoundLevelComponent?: true } ? SoundLevelComponentActions : {})
  & (T extends { readonly __brand_speaker_source_SpeakerSourceMediaPlayer?: true } ? SpeakerSourceMediaPlayerActions : {})
  & (T extends { readonly __brand_speaker_Speaker?: true } ? SpeakerActions : {})
  & (T extends { readonly __brand_speaker_SpeakerMediaPlayer?: true } ? SpeakerMediaPlayerActions : {})
  & (T extends { readonly __brand_sprinkler_Sprinkler?: true } ? SprinklerActions : {})
  & (T extends { readonly __brand_sps30_SPS30Component?: true } ? SPS30ComponentActions : {})
  & (T extends { readonly __brand_stepper_Stepper?: true } ? StepperActions : {})
  & (T extends { readonly __brand_switch__Switch?: true } ? SwitchActions : {})
  & (T extends { readonly __brand_sx126x_SX126x?: true } ? SX126xActions : {})
  & (T extends { readonly __brand_sx127x_SX127x?: true } ? SX127xActions : {})
  & (T extends { readonly __brand_template__TemplateLock?: true } ? TemplateLockActions : {})
  & (T extends { readonly __brand_template__TemplateValve?: true } ? TemplateValveActions : {})
  & (T extends { readonly __brand_template__TemplateWaterHeater?: true } ? TemplateWaterHeaterActions : {})
  & (T extends { readonly __brand_text_sensor_TextSensor?: true } ? TextSensorActions : {})
  & (T extends { readonly __brand_text_Text?: true } ? TextActions : {})
  & (T extends { readonly __brand_tm1651_TM1651Display?: true } ? TM1651DisplayActions : {})
  & (T extends { readonly __brand_uart_UARTComponent?: true } ? UARTComponentActions : {})
  & (T extends { readonly __brand_udp_UDPComponent?: true } ? UDPComponentActions : {})
  & (T extends { readonly __brand_ufire_ec_UFireECComponent?: true } ? UFireECComponentActions : {})
  & (T extends { readonly __brand_ufire_ise_UFireISEComponent?: true } ? UFireISEComponentActions : {})
  & (T extends { readonly __brand_update_UpdateEntity?: true } ? UpdateEntityActions : {})
  & (T extends { readonly __brand_valve_Valve?: true } ? ValveActions : {})
  & (T extends { readonly __brand_voice_assistant_VoiceAssistant?: true } ? VoiceAssistantActions : {})
  & (T extends { readonly __brand_wireguard_Wireguard?: true } ? WireguardActions : {})
  & (T extends { readonly __brand_zigbee_ZigbeeComponent?: true } ? ZigbeeComponentActions : {});
