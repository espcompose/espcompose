// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

// Shared base interfaces mirroring ESPHome schema "extends" hierarchy.
// These are imported by individual component files.

/* eslint-disable */

import type { IPv4Address, MACAddress, Pin, RefProp, TimePeriod, TriggerHandler } from "../types";
import type { __marker_Color, __marker_Device, __marker_audio_dac_AudioDac, __marker_bedjet_BedJetHub, __marker_binary_sensor_BinarySensor, __marker_ble_client_BLEClient, __marker_display_Display, __marker_emc2101_Emc2101Component, __marker_esp32_ble_tracker_ESP32BLETracker, __marker_i2s_audio_I2SAudioComponent, __marker_modbus_controller_ModbusController, __marker_msa3xx_MSA3xxComponent, __marker_nextion_Nextion, __marker_packet_transport_PacketTransport, __marker_pipsolar_Pipsolar, __marker_power_supply_PowerSupply, __marker_pylontech_PylontechComponent, __marker_sensor_Sensor, __marker_spi_QuadSPIComponent, __marker_teleinfo_TeleInfo, __marker_time_RealTimeClock, __marker_uart_UARTComponent, __marker_udp_UDPComponent, __marker_uponor_smatrix_UponorSmatrixComponent, __marker_web_server_WebServer, __marker_zigbee_ZigbeeComponent } from "./markers";
export interface CoreMqttComponentAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
export interface AlarmControlPanelWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
export interface BinarySensorWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
export interface Bk72xxConfigFrameworkProps {
    debug?: Array<"CLIENT" | "FDB" | "LWIP" | "LWIP_ASSERT" | "MDNS" | "NONE" | "OTA" | "SERVER" | "SSL" | "WIFI">;
    /** @yamlKey gpio_recover */
    gpioRecover?: boolean;
    loglevel?: "DEBUG" | "ERROR" | "FATAL" | "INFO" | "NONE" | "TRACE" | "VERBOSE" | "WARN";
    options?: Record<string, string>;
    /** @yamlKey sdk_silent */
    sdkSilent?: "all" | "auto" | "none";
    source?: string;
    /** @yamlKey uart_port */
    uartPort?: "0" | "1" | "2";
    version?: string;
}
export interface ButtonWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
export interface ClimateVisualProps {
    /**
     * percentage: The maximum humidity the climate device can reach. Used to set the range of the frontend gauge.
     * @yamlKey max_humidity
     */
    maxHumidity?: number;
    /**
     * float: The maximum temperature the climate device can reach. Used to set the range of the frontend gauge.
     * @yamlKey max_temperature
     */
    maxTemperature?: number;
    /**
     * percentage: The minimum humidity the climate device can reach. Used to set the range of the frontend gauge.
     * @yamlKey min_humidity
     */
    minHumidity?: number;
    /**
     * float: The minimum temperature the climate device can reach. Used to set the range of the frontend gauge.
     * @yamlKey min_temperature
     */
    minTemperature?: number;
    /**
     * float: The granularity with which the target temperature can be controlled. Can be a single number, or split as below:
     * @yamlKey temperature_step
     */
    temperatureStep?: number;
}
export interface ClimateWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
export interface CoverWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
export interface DatetimeWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
export interface DisplayFullDisplayPagesProps {
    lambda: unknown;
}
export interface UpdateWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
export interface EthernetBaseManualIpProps {
    /** IPv4 address: The main DNS server to use. */
    dns1?: IPv4Address;
    /** IPv4 address: The backup DNS server to use. */
    dns2?: IPv4Address;
    /** IPv4 address: The gateway of the local network. */
    gateway: IPv4Address;
    /**
     * IPv4 address: The static IP of your node.
     * @yamlKey static_ip
     */
    staticIp: IPv4Address;
    /** IPv4 address: The subnet of the local network. */
    subnet: IPv4Address;
}
export interface EthernetRmiiClkProps {
    mode: "CLK_EXT_IN" | "CLK_OUT";
    pin: Pin;
}
export interface EthernetRmiiPhyRegistersProps {
    /** hex: The register address as a hex number (e.g. `0x10` for address 16) */
    address: unknown;
    /**
     * hex: (RTL8201 only) Register page number to select before writing (e.g. `0x07` for page 7)
     * @yamlKey page_id
     */
    pageId?: unknown;
    /** hex: The value of the register to set as a hex number (e.g. `0x1FFA` ) */
    value: unknown;
}
export interface EventWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
export interface FanWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
export interface LightInitialStateProps {
    blue?: unknown;
    brightness?: unknown;
    /** @yamlKey cold_white */
    coldWhite?: unknown;
    /** @yamlKey color_brightness */
    colorBrightness?: unknown;
    /** @yamlKey color_mode */
    colorMode?: "BRIGHTNESS" | "COLD_WARM_WHITE" | "COLOR_TEMPERATURE" | "ON_OFF" | "RGB" | "RGB_COLD_WARM_WHITE" | "RGB_COLOR_TEMPERATURE" | "RGB_WHITE" | "WHITE";
    /** @yamlKey color_temperature */
    colorTemperature?: unknown;
    green?: unknown;
    red?: unknown;
    /** boolean: The ON/OFF state for the light. */
    state?: boolean;
    /** @yamlKey warm_white */
    warmWhite?: unknown;
    white?: unknown;
}
export interface LightWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
export interface LockWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
export interface Msa3xxCommonCalibrationProps {
    /** @yamlKey offset_x */
    offsetX?: unknown;
    /** @yamlKey offset_y */
    offsetY?: unknown;
    /** @yamlKey offset_z */
    offsetZ?: unknown;
}
export interface Msa3xxCommonTransformProps {
    /** @yamlKey mirror_x */
    mirrorX?: boolean;
    /** @yamlKey mirror_y */
    mirrorY?: boolean;
    /** @yamlKey mirror_z */
    mirrorZ?: boolean;
    /** @yamlKey swap_xy */
    swapXy?: boolean;
}
export interface NumberWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
export interface PackagesPackageFilesProps {
    path: unknown;
    vars?: Record<string, unknown>;
}
export interface PacketTransportEncryptionEncryptionProps {
    key: string;
}
export interface PacketTransportTransportBinarySensorsProps {
    /** @yamlKey broadcast_id */
    broadcastId?: unknown;
    id: RefProp<__marker_binary_sensor_BinarySensor>;
}
export interface PacketTransportTransportProvidersPropsEncryptionProps {
    key: string;
}
export interface PacketTransportTransportProvidersProps {
    encryption?: PacketTransportTransportProvidersPropsEncryptionProps;
    name: unknown;
}
export interface PacketTransportTransportSensorsProps {
    /** @yamlKey broadcast_id */
    broadcastId?: unknown;
    id: RefProp<__marker_sensor_Sensor>;
}
export interface QspiDbiDisplayBaseDimensionsProps {
    /** int: Specifies height of display in pixels. */
    height: number;
    /**
     * int: Specify an offset for the y-direction of the display. Default is 0.
     * @yamlKey offset_height
     */
    offsetHeight?: number;
    /**
     * int: Specify an offset for the x-direction of the display, typically used when a display is smaller than the maximum ...
     * @yamlKey offset_width
     */
    offsetWidth?: number;
    /** int: Specifies width of display. */
    width: number;
}
export interface SelectWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
export interface SensorWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
export interface SwitchWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
export interface TextWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
export interface TextSensorWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
export interface TouchscreenCalibrationProps {
    /**
     * int: The raw value corresponding to the right
     * @yamlKey x_max
     */
    xMax: number;
    /**
     * int: The raw value corresponding to the left
     * @yamlKey x_min
     */
    xMin: number;
    /**
     * int: The raw value corresponding to the bottom
     * @yamlKey y_max
     */
    yMax: number;
    /**
     * int: The raw value corresponding to the top
     * @yamlKey y_min
     */
    yMin: number;
}
export interface TouchscreenTransformProps {
    /**
     * boolean: If true, mirror the x axis.
     * @yamlKey mirror_x
     */
    mirrorX?: boolean;
    /**
     * boolean: If true, mirror the y axis.
     * @yamlKey mirror_y
     */
    mirrorY?: boolean;
    /**
     * boolean: If true, exchange the x and y axes.
     * @yamlKey swap_xy
     */
    swapXy?: boolean;
}
export interface ValveWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
export interface WaterHeaterVisualProps {
    /**
     * float: Override the maximum temperature shown in the frontend.
     * @yamlKey max_temperature
     */
    maxTemperature?: number;
    /**
     * float: Override the minimum temperature shown in the frontend.
     * @yamlKey min_temperature
     */
    minTemperature?: number;
    /**
     * float: Override the temperature steps shown in the frontend.
     * @yamlKey target_temperature_step
     */
    targetTemperatureStep?: number;
}
//  alarm_control_panel._ALARM_CONTROL_PANEL_SCHEMA
export interface _AlarmControlPanel extends _CoreEntityBase, _CoreMqttCommandComponent {
    /** string: Manually specify the ID for code generation. At least one of id and name must be specified. */
    id?: string;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the alarm state changes t...
     * @yamlKey on_armed_away
     */
    onArmedAway?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the alarm state changes t...
     * @yamlKey on_armed_home
     */
    onArmedHome?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the alarm state changes t...
     * @yamlKey on_armed_night
     */
    onArmedNight?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the alarm state changes t...
     * @yamlKey on_arming
     */
    onArming?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when a zone has been marked as...
     * @yamlKey on_chime
     */
    onChime?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the alarm clears. See [`o...
     * @yamlKey on_cleared
     */
    onCleared?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the alarm state changes t...
     * @yamlKey on_disarmed
     */
    onDisarmed?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the alarm state changes t...
     * @yamlKey on_pending
     */
    onPending?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the logical 'and' of all ...
     * @yamlKey on_ready
     */
    onReady?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the alarm changes state. ...
     * @yamlKey on_state
     */
    onState?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the alarm triggers. See [...
     * @yamlKey on_triggered
     */
    onTriggered?: TriggerHandler;
    /** @yamlKey web_server */
    webServer?: AlarmControlPanelWebServerProps;
}
//  core.ENTITY_BASE_SCHEMA
export interface _CoreEntityBase {
    /** @yamlKey device_id */
    deviceId?: RefProp<__marker_Device>;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /**
     * string: The category of the entity. See [https://developers.home-assistant.io/docs/core/entity/#generic-properties](h...
     * @yamlKey entity_category
     */
    entityCategory?: string;
    /** icon: Manually set the icon to use for the binary sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the binary sensor. At least one of id and name must be specified. */
    name?: string;
}
//  core.MQTT_COMMAND_COMPONENT_SCHEMA
export interface _CoreMqttCommandComponent extends _CoreMqttComponent {
    /** @yamlKey command_retain */
    commandRetain?: boolean;
    /** @yamlKey command_topic */
    commandTopic?: unknown;
}
//  core.MQTT_COMPONENT_SCHEMA
export interface _CoreMqttComponent {
    availability?: CoreMqttComponentAvailabilityProps;
    discovery?: boolean;
    qos?: unknown;
    retain?: boolean;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
}
//  as3935.AS3935_SCHEMA
export interface _As3935 {
    /** boolean: Enable/disable oscillator calibration on startup. It is recommended to perform antenna tuning procedure firs... */
    calibration?: boolean;
    /** int: This setting will add capacitance to the series RLC antenna on the product to help tune its resonance. The datas... */
    capacitance?: number;
    /**
     * int: The antenna is designed to resonate at 500kHz and so can be tuned with the following setting. The accuracy of th...
     * @yamlKey div_ratio
     */
    divRatio?: "0" | "128" | "16" | "32" | "64";
    /** boolean: Indicates if the sensor is used indoor. Defaults to `true`. */
    indoor?: boolean;
    /**
     * [Pin](https://esphome.io/guides/configuration-types#pin): The IRQ pin, which indicates if a lightning strike has been...
     * @yamlKey irq_pin
     */
    irqPin: Pin;
    /**
     * int: The number of lightnings that must appear in a 15-minute time window before a lightning storm is detected. 15 mi...
     * @yamlKey lightning_threshold
     */
    lightningThreshold?: "1" | "16" | "5" | "9";
    /**
     * boolean: This setting will return whether or not disturbers trigger the IRQ Pin. Defaults to `false`.
     * @yamlKey mask_disturber
     */
    maskDisturber?: boolean;
    /**
     * int: Noise floor level is compared to known reference voltage. If this level is exceeded the chip will issue an inter...
     * @yamlKey noise_level
     */
    noiseLevel?: number;
    /**
     * int: Helps to differentiate between false events and actual lightning. Increasing this value increases robustness at ...
     * @yamlKey spike_rejection
     */
    spikeRejection?: number;
    /**
     * boolean: Start sensor in antenna tuning mode. It will emit oscillator frequency to be read on the INT pin. Please fol...
     * @yamlKey tune_antenna
     */
    tuneAntenna?: boolean;
    /**
     * int: Determines the threshold for events that trigger the IRQ pin. Defaults to `2`.
     * @yamlKey watchdog_threshold
     */
    watchdogThreshold?: number;
}
//  bedjet.BEDJET_CLIENT_SCHEMA
export interface _BedjetClient {
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): The ID of the Bedjet component.
     * @yamlKey bedjet_id
     */
    bedjetId?: RefProp<__marker_bedjet_BedJetHub>;
}
//  binary_sensor._BINARY_SENSOR_SCHEMA
export interface _BinarySensor extends _CoreEntityBase, _CoreMqttComponent {
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/binary_sensor/#device-class]...
     * @yamlKey device_class
     */
    deviceClass?: "" | "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    /** list: A list of filters to apply on the binary sensor values such as inverting signals. See [Binary Sensor Filters](h... */
    filters?: Array<unknown>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is held down for a specified p...
     * @yamlKey on_click
     */
    onClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed twice for specified...
     * @yamlKey on_double_click
     */
    onDoubleClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed in a specific seque...
     * @yamlKey on_multi_click
     */
    onMultiClick?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is released. See [`on_release`...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a state change is published. See [`on_sta...
     * @yamlKey on_state
     */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /**
     * boolean: If true, any applicable triggers will be fired when the binary sensor state changes from `unknown` to a vali...
     * @yamlKey trigger_on_initial_state
     */
    triggerOnInitialState?: boolean;
    /** @yamlKey web_server */
    webServer?: BinarySensorWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
//  bk72xx.CONFIG_SCHEMA
export interface _Bk72xxConfig {
    board: string;
    family?: "BK7231N" | "BK7231Q" | "BK7231T" | "BK7251" | "LN882H" | "RTL8710B" | "RTL8720C";
    framework?: Bk72xxConfigFrameworkProps;
}
//  ble_client.BLE_CLIENT_SCHEMA
export interface _BleClient {
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): ID of the associated BLE client.
     * @yamlKey ble_client_id
     */
    bleClientId?: RefProp<__marker_ble_client_BLEClient>;
}
//  bme68x_bsec2.CONFIG_SCHEMA_BASE
export interface _Bme68xBsec2ConfigSchemaBase {
    /** @yamlKey algorithm_output */
    algorithmOutput?: "classification" | "regression";
    model: "bme680" | "bme688";
    /** @yamlKey operating_age */
    operatingAge?: "28d" | "4d";
    /** @yamlKey sample_rate */
    sampleRate?: "LP" | "ULP";
    /** @yamlKey state_save_interval */
    stateSaveInterval?: TimePeriod;
    /** @yamlKey supply_voltage */
    supplyVoltage?: "1.8V" | "3.3V";
    /** @yamlKey temperature_offset */
    temperatureOffset?: unknown;
}
//  bthome_mithermometer.BLE_DEVICE_SCHEMA
export interface _BthomeMithermometerBleDevice {
    /** @yamlKey esp32_ble_id */
    esp32BleId?: RefProp<__marker_esp32_ble_tracker_ESP32BLETracker>;
}
//  button._BUTTON_SCHEMA
export interface _Button extends _CoreEntityBase, _CoreMqttCommandComponent {
    /**
     * string: The device class for the button. See [https://www.home-assistant.io/integrations/button/#device-class](https:...
     * @yamlKey device_class
     */
    deviceClass?: "" | "identify" | "restart" | "update";
    /** string: Manually specify the ID for code generation. At least one of id and name must be specified. */
    id?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the button is pressed. See [`on_press`](h...
     * @yamlKey on_press
     */
    onPress?: TriggerHandler;
    /** @yamlKey web_server */
    webServer?: ButtonWebServerProps;
}
//  canbus.CANBUS_SCHEMA
export interface _Canbus extends _CoreComponent {
    /** @yamlKey bit_rate */
    bitRate?: "1000KBPS" | "100KBPS" | "10KBPS" | "125KBPS" | "12K5BPS" | "16KBPS" | "1KBPS" | "200KBPS" | "20KBPS" | "250KBPS" | "25KBPS" | "31K25BPS" | "33KBPS" | "40KBPS" | "500KBPS" | "50KBPS" | "5KBPS" | "800KBPS" | "80KBPS" | "83K3BPS" | "95KBPS";
    /** @yamlKey can_id */
    canId: number;
    /** @yamlKey on_frame */
    onFrame?: TriggerHandler;
    /** @yamlKey use_extended_id */
    useExtendedId?: boolean;
}
//  core.COMPONENT_SCHEMA
export interface _CoreComponent {
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
}
//  climate._CLIMATE_SCHEMA
export interface _Climate extends _CoreEntityBase, _CoreMqttCommandComponent {
    /**
     * string: The topic to publish climate device action changes to.
     * @yamlKey action_state_topic
     */
    actionStateTopic?: string;
    /** @yamlKey away_command_topic */
    awayCommandTopic?: unknown;
    /** @yamlKey away_state_topic */
    awayStateTopic?: unknown;
    /**
     * string: The topic to publish current humidity changes to.
     * @yamlKey current_humidity_state_topic
     */
    currentHumidityStateTopic?: string;
    /**
     * string: The topic to publish current temperature changes to.
     * @yamlKey current_temperature_state_topic
     */
    currentTemperatureStateTopic?: string;
    /**
     * string: The topic to receive fan mode commands on.
     * @yamlKey fan_mode_command_topic
     */
    fanModeCommandTopic?: string;
    /**
     * string: The topic to publish fan mode changes to.
     * @yamlKey fan_mode_state_topic
     */
    fanModeStateTopic?: string;
    /** string: Manually specify the ID for code generation. At least one of id and name must be specified. */
    id?: string;
    /**
     * string: The topic to receive climate device mode commands on.
     * @yamlKey mode_command_topic
     */
    modeCommandTopic?: string;
    /**
     * string: The topic to publish climate device mode changes to.
     * @yamlKey mode_state_topic
     */
    modeStateTopic?: string;
    /** @yamlKey on_control */
    onControl?: TriggerHandler;
    /** @yamlKey on_state */
    onState?: TriggerHandler;
    /**
     * string: The topic to receive preset commands on.
     * @yamlKey preset_command_topic
     */
    presetCommandTopic?: string;
    /**
     * string: The topic to publish preset changes to.
     * @yamlKey preset_state_topic
     */
    presetStateTopic?: string;
    /**
     * string: The topic to receive swing mode commands on.
     * @yamlKey swing_mode_command_topic
     */
    swingModeCommandTopic?: string;
    /**
     * string: The topic to publish swing mode changes to.
     * @yamlKey swing_mode_state_topic
     */
    swingModeStateTopic?: string;
    /**
     * string: The topic to receive target humidity commands on.
     * @yamlKey target_humidity_command_topic
     */
    targetHumidityCommandTopic?: string;
    /**
     * string: The topic to publish target humidity changes to.
     * @yamlKey target_humidity_state_topic
     */
    targetHumidityStateTopic?: string;
    /**
     * string: The topic to receive target temperature commands on.
     * @yamlKey target_temperature_command_topic
     */
    targetTemperatureCommandTopic?: string;
    /**
     * string: The topic to receive higher target temperature commands on.
     * @yamlKey target_temperature_high_command_topic
     */
    targetTemperatureHighCommandTopic?: string;
    /**
     * string: The topic to publish higher target temperature changes to.
     * @yamlKey target_temperature_high_state_topic
     */
    targetTemperatureHighStateTopic?: string;
    /**
     * string: The topic to receive lower target temperature commands on.
     * @yamlKey target_temperature_low_command_topic
     */
    targetTemperatureLowCommandTopic?: string;
    /**
     * string: The topic to publish lower target temperature changes to.
     * @yamlKey target_temperature_low_state_topic
     */
    targetTemperatureLowStateTopic?: string;
    /**
     * string: The topic to publish target temperature changes to.
     * @yamlKey target_temperature_state_topic
     */
    targetTemperatureStateTopic?: string;
    /** Visual settings for the climate device - these do not affect operation and are solely for controlling how the climate... */
    visual?: ClimateVisualProps;
    /** @yamlKey web_server */
    webServer?: ClimateWebServerProps;
}
//  cover._COVER_SCHEMA
export interface _Cover extends _CoreEntityBase, _CoreMqttCommandComponent {
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/cover/#device-class](https:/...
     * @yamlKey device_class
     */
    deviceClass?: "" | "awning" | "blind" | "curtain" | "damper" | "door" | "garage" | "gate" | "shade" | "shutter" | "window";
    /** string: Manually specify the ID for code generation. At least one of id and name must be specified. */
    id?: string;
    /**
     * boolean: When set to `true`, state changes will be published only to the `state_topic` as a single JSON object per st...
     * @yamlKey mqtt_json_state_payload
     */
    mqttJsonStatePayload?: boolean;
    /** @yamlKey on_closed */
    onClosed?: TriggerHandler;
    /** @yamlKey on_closing */
    onClosing?: TriggerHandler;
    /** @yamlKey on_idle */
    onIdle?: TriggerHandler;
    /** @yamlKey on_open */
    onOpen?: TriggerHandler;
    /** @yamlKey on_opened */
    onOpened?: TriggerHandler;
    /** @yamlKey on_opening */
    onOpening?: TriggerHandler;
    /**
     * string: The topic to receive cover position commands on.
     * @yamlKey position_command_topic
     */
    positionCommandTopic?: string;
    /**
     * string: The topic to publish cover position changes to. Not valid if `mqtt_json_state_payload` is set to `true`.
     * @yamlKey position_state_topic
     */
    positionStateTopic?: string;
    /**
     * string: The topic to receive cover tilt commands on.
     * @yamlKey tilt_command_topic
     */
    tiltCommandTopic?: string;
    /**
     * string: The topic to publish cover cover tilt state changes to. Not valid if `mqtt_json_state_payload` is set to `true`.
     * @yamlKey tilt_state_topic
     */
    tiltStateTopic?: string;
    /** @yamlKey web_server */
    webServer?: CoverWebServerProps;
}
//  datetime._DATETIME_SCHEMA
export interface _Datetime extends _CoreEntityBase, _CoreMqttCommandComponent {
    /** @yamlKey on_value */
    onValue?: TriggerHandler;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): The ID of the time entity. Automatically set to the ID of a t...
     * @yamlKey time_id
     */
    timeId?: RefProp<__marker_time_RealTimeClock>;
    /** @yamlKey web_server */
    webServer?: DatetimeWebServerProps;
}
//  display.BASIC_DISPLAY_SCHEMA
export interface _DisplayBasicDisplay extends _CoreComponent {
    /** [lambda](https://esphome.io/automations/templates#config-lambda): The lambda to use for rendering the content on the ... */
    lambda?: unknown;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): Display update frequency. Defaults to `16ms` (~60 FPS). S...
     * @yamlKey update_interval
     */
    updateInterval?: TimePeriod;
}
//  display.FULL_DISPLAY_SCHEMA
export interface _DisplayFullDisplay extends _DisplayBasicDisplay {
    /**
     * boolean: Whether to automatically clear the display data before each lambda call, or to keep the existing display con...
     * @yamlKey auto_clear_enabled
     */
    autoClearEnabled?: boolean;
    /** @yamlKey on_page_change */
    onPageChange?: TriggerHandler;
    /** list: Show pages instead of a single lambda. See [Display Pages](https://esphome.io/components/display#display-pages). */
    pages?: Array<DisplayFullDisplayPagesProps>;
    /** Set the rotation of the display. Everything you draw in `lambda:` will be rotated by this option. One of `0°` (defaul... */
    rotation?: unknown;
    /** @yamlKey show_test_card */
    showTestCard?: boolean;
}
//  emc2101.EMC2101_COMPONENT_SCHEMA
export interface _Emc2101Component {
    /** @yamlKey emc2101_id */
    emc2101Id?: RefProp<__marker_emc2101_Emc2101Component>;
}
//  esp32_hosted.BASE_SCHEMA
export interface _Esp32HostedBase {
    /** @yamlKey active_high */
    activeHigh: boolean;
    /** @yamlKey reset_pin */
    resetPin: Pin;
    variant: "ESP32" | "ESP32C2" | "ESP32C3" | "ESP32C5" | "ESP32C6" | "ESP32C61" | "ESP32H2" | "ESP32P4" | "ESP32S2" | "ESP32S3";
}
//  esp32_hosted.update.BASE_SCHEMA
export interface _Esp32HostedUpdateBase extends _Update, _CoreComponent {
    /** @yamlKey update_interval */
    updateInterval?: unknown;
}
//  update._UPDATE_SCHEMA
export interface _Update extends _CoreEntityBase, _CoreMqttCommandComponent {
    /**
     * string: The device class for the update entity. See [https://www.home-assistant.io/integrations/binary_sensor/#device...
     * @yamlKey device_class
     */
    deviceClass?: "" | "firmware";
    /** [ID](https://esphome.io/guides/configuration-types#id): Manually specify the ID used for code generation. At least on... */
    id?: unknown;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when an update is available.
     * @yamlKey on_update_available
     */
    onUpdateAvailable?: TriggerHandler;
    /** @yamlKey web_server */
    webServer?: UpdateWebServerProps;
}
//  ethernet.BASE_SCHEMA
export interface _EthernetBase extends _CoreComponent {
    /** string: Set the domain of the node hostname used for uploading. For example, if it's set to `.local`, all uploads wil... */
    domain?: string;
    /**
     * MAC Address: Set the MAC address of the ethernet interface.
     * @yamlKey mac_address
     */
    macAddress?: MACAddress;
    /**
     * Manually configure the static IP of the node.
     * @yamlKey manual_ip
     */
    manualIp?: EthernetBaseManualIpProps;
    /**
     * [Automation](https://esphome.io/automations): An action to be performed when a connection is established.
     * @yamlKey on_connect
     */
    onConnect?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An action to be performed when the connection is dropped.
     * @yamlKey on_disconnect
     */
    onDisconnect?: TriggerHandler;
    /**
     * string: Manually override what address to use to connect to the ESP. Defaults to auto-generated value. For example, i...
     * @yamlKey use_address
     */
    useAddress?: string;
}
//  ethernet.RMII_SCHEMA
export interface _EthernetRmii extends _EthernetBase {
    clk?: EthernetRmiiClkProps;
    /** @yamlKey clk_mode */
    clkMode?: "GPIO0_IN" | "GPIO0_OUT" | "GPIO16_OUT" | "GPIO17_OUT";
    /**
     * [Pin](https://esphome.io/guides/configuration-types#pin): The MDC pin of the board. Usually this is `GPIO23`.
     * @yamlKey mdc_pin
     */
    mdcPin: Pin;
    /**
     * [Pin](https://esphome.io/guides/configuration-types#pin): The MDIO pin of the board. Usually this is `GPIO18`.
     * @yamlKey mdio_pin
     */
    mdioPin: Pin;
    /**
     * int: The PHY addr type of the Ethernet controller. Defaults to 0.
     * @yamlKey phy_addr
     */
    phyAddr?: number;
    /**
     * mapping: Arbitrary PHY register values to set after Ethernet initialization.
     * @yamlKey phy_registers
     */
    phyRegisters?: Array<EthernetRmiiPhyRegistersProps>;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The pin controlling the power/reset status of...
     * @yamlKey power_pin
     */
    powerPin?: Pin;
}
//  ethernet.SPI_SCHEMA
export interface _EthernetSpi extends _EthernetBase {
    /**
     * [Pin](https://esphome.io/guides/configuration-types#pin): The SPI clock pin.
     * @yamlKey clk_pin
     */
    clkPin: Pin;
    /**
     * float: The SPI clock speed. ESP32 only. Any frequency between `8MHz` and `80MHz` is allowed, but the nearest integer ...
     * @yamlKey clock_speed
     */
    clockSpeed?: number;
    /**
     * [Pin](https://esphome.io/guides/configuration-types#pin): The SPI chip select pin.
     * @yamlKey cs_pin
     */
    csPin: Pin;
    /** string: Controls which ESP-IDF SPI implementation should be used. Value may be either `spi2` or `spi3`. */
    interface?: "spi2" | "spi3";
    /**
     * [Pin](https://esphome.io/guides/configuration-types#pin): The interrupt pin. This variable is required for older fram...
     * @yamlKey interrupt_pin
     */
    interruptPin?: Pin;
    /**
     * [Pin](https://esphome.io/guides/configuration-types#pin): The SPI MISO pin.
     * @yamlKey miso_pin
     */
    misoPin: Pin;
    /**
     * [Pin](https://esphome.io/guides/configuration-types#pin): The SPI MOSI pin.
     * @yamlKey mosi_pin
     */
    mosiPin: Pin;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): If `interrupt_pin` is not set, set the time interval for ...
     * @yamlKey polling_interval
     */
    pollingInterval?: TimePeriod;
    /**
     * [Pin](https://esphome.io/guides/configuration-types#pin): The reset pin.
     * @yamlKey reset_pin
     */
    resetPin?: Pin;
}
//  event._EVENT_SCHEMA
export interface _Event extends _CoreEntityBase, _CoreMqttComponent {
    /**
     * string: The device class for the event. The following device classes are supported by event entities:
     * @yamlKey device_class
     */
    deviceClass?: "" | "button" | "doorbell" | "motion";
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when an event is triggered.
     * @yamlKey on_event
     */
    onEvent?: TriggerHandler;
    /** @yamlKey web_server */
    webServer?: EventWebServerProps;
}
//  fan._FAN_SCHEMA
export interface _Fan extends _CoreEntityBase, _CoreMqttCommandComponent {
    /**
     * string: The topic to receive fan direction commands on (options: forward, reverse, toggle).
     * @yamlKey direction_command_topic
     */
    directionCommandTopic?: string;
    /**
     * string: The topic to publish fan direction state changes to (options: forward, reverse).
     * @yamlKey direction_state_topic
     */
    directionStateTopic?: string;
    /** string: Manually specify the ID for code generation. At least one of id and name must be specified. */
    id?: string;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the fan direction is chan...
     * @yamlKey on_direction_set
     */
    onDirectionSet?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the fan oscillating state...
     * @yamlKey on_oscillating_set
     */
    onOscillatingSet?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the fan preset mode is ch...
     * @yamlKey on_preset_set
     */
    onPresetSet?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the fan speed is changed....
     * @yamlKey on_speed_set
     */
    onSpeedSet?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the fan state is changed....
     * @yamlKey on_state
     */
    onState?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the fan is turned off. Se...
     * @yamlKey on_turn_off
     */
    onTurnOff?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the fan is turned on. See...
     * @yamlKey on_turn_on
     */
    onTurnOn?: TriggerHandler;
    /**
     * string: The topic to receive oscillation commands on.
     * @yamlKey oscillation_command_topic
     */
    oscillationCommandTopic?: string;
    /**
     * string: The topic to publish fan oscillation state changes to.
     * @yamlKey oscillation_state_topic
     */
    oscillationStateTopic?: string;
    /**
     * Control how the fan attempts to restore state on boot.
     * @yamlKey restore_mode
     */
    restoreMode?: "ALWAYS_OFF" | "ALWAYS_ON" | "NO_RESTORE" | "RESTORE_DEFAULT_OFF" | "RESTORE_DEFAULT_ON" | "RESTORE_INVERTED_DEFAULT_OFF" | "RESTORE_INVERTED_DEFAULT_ON";
    /**
     * string: The topic to receive speed commands on (options: LOW, MEDIUM, HIGH).
     * @yamlKey speed_command_topic
     */
    speedCommandTopic?: string;
    /**
     * int: The topic to receive numeric speed commands on (range: 0 to speed count).
     * @yamlKey speed_level_command_topic
     */
    speedLevelCommandTopic?: number;
    /**
     * int: The topic to publish numeric fan speed state changes to (range: 0 to speed count).
     * @yamlKey speed_level_state_topic
     */
    speedLevelStateTopic?: number;
    /**
     * string: The topic to publish fan speed state changes to (options: LOW, MEDIUM, HIGH).
     * @yamlKey speed_state_topic
     */
    speedStateTopic?: string;
    /** @yamlKey web_server */
    webServer?: FanWebServerProps;
}
//  homeassistant.HOME_ASSISTANT_IMPORT_CONTROL_SCHEMA
export interface _HomeassistantHomeAssistantImportControl {
    /**
     * string: The entity ID to import / control from Home Assistant.
     * @yamlKey entity_id
     */
    entityId: string;
    internal?: boolean;
}
//  homeassistant.HOME_ASSISTANT_IMPORT_SCHEMA
export interface _HomeassistantHomeAssistantImport {
    /** string: The name of the state attribute to import from the specified entity. The entity state is used when this optio... */
    attribute?: string;
    /**
     * string: The entity ID to import from Home Assistant.
     * @yamlKey entity_id
     */
    entityId: string;
    internal?: boolean;
}
//  i2s_audio.microphone.BASE_SCHEMA
export interface _I2sAudioMicrophoneBase extends _Microphone, _CoreComponent {
    channel?: "left" | "mono" | "right" | "stereo";
    /** @yamlKey correct_dc_offset */
    correctDcOffset?: boolean;
    /** @yamlKey i2s_audio_id */
    i2sAudioId?: RefProp<__marker_i2s_audio_I2SAudioComponent>;
    /** @yamlKey i2s_mode */
    i2sMode?: "primary" | "secondary";
    /** @yamlKey mclk_multiple */
    mclkMultiple?: "128" | "256" | "384" | "512";
    /** @yamlKey use_apll */
    useApll?: boolean;
}
//  microphone.MICROPHONE_SCHEMA
export interface _Microphone {
    /**
     * int: The bits per sample to use as input to the component. May be restricted by the component to a specific value.
     * @yamlKey bits_per_sample
     */
    bitsPerSample?: number | "8bit" | "16bit" | "24bit" | "32bit";
    /** @yamlKey num_channels */
    numChannels?: number;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when new data is received.
     * @yamlKey on_data
     */
    onData?: TriggerHandler;
    /** @yamlKey sample_rate */
    sampleRate?: number;
}
//  i2s_audio.speaker.BASE_SCHEMA
export interface _I2sAudioSpeakerBase extends _Speaker, _CoreComponent {
    /** @yamlKey buffer_duration */
    bufferDuration?: TimePeriod;
    channel?: "left" | "mono" | "right" | "stereo";
    /** @yamlKey i2s_audio_id */
    i2sAudioId?: RefProp<__marker_i2s_audio_I2SAudioComponent>;
    /** @yamlKey i2s_mode */
    i2sMode?: "primary" | "secondary";
    /** @yamlKey mclk_multiple */
    mclkMultiple?: "128" | "256" | "384" | "512";
    timeout?: "never";
    /** @yamlKey use_apll */
    useApll?: boolean;
}
//  speaker.SPEAKER_SCHEMA
export interface _Speaker {
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): The [audio DAC](https://esphome.io/components/audio_dac/) to ...
     * @yamlKey audio_dac
     */
    audioDac?: RefProp<__marker_audio_dac_AudioDac>;
    /**
     * positive integer: The audio sample bit depth after resampling. Defaults to the output speaker's bits per sample.
     * @yamlKey bits_per_sample
     */
    bitsPerSample?: number | "8bit" | "16bit" | "24bit" | "32bit";
    /** @yamlKey num_channels */
    numChannels?: number;
    /**
     * positive integer: Sample rate to convert to. Must be between `8000` and `48000`. Defaults to the output speaker's sam...
     * @yamlKey sample_rate
     */
    sampleRate?: number;
}
//  light.ADDRESSABLE_LIGHT_SCHEMA
export interface _LightAddressableLight extends _LightRgbLight {
}
//  light.RGB_LIGHT_SCHEMA
export interface _LightRgbLight extends _LightBrightnessOnlyLight {
}
//  light.BRIGHTNESS_ONLY_LIGHT_SCHEMA
export interface _LightBrightnessOnlyLight extends _Light {
}
//  light.LIGHT_SCHEMA
export interface _Light extends _CoreEntityBase, _CoreMqttCommandComponent {
    /** percentage: The blue channel of the light. */
    blue?: number;
    /** percentage: The primary brightness of the light; applies to all channels (both color and white) of the light. */
    brightness?: number;
    /**
     * percentage: The brightness of the cold white channel. Cannot be used at the same time as *color_temperature*.
     * @yamlKey cold_white
     */
    coldWhite?: number;
    /**
     * list of float: Apply a color correction to each color channel. This defines the maximum brightness of each channel. F...
     * @yamlKey color_correct
     */
    colorCorrect?: unknown;
    /**
     * float: The color temperature (in [mireds](https://en.wikipedia.org/wiki/Mired) or Kelvin) of the white channel.
     * @yamlKey color_temperature
     */
    colorTemperature?: number;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The default transition length to use when no transition l...
     * @yamlKey default_transition_length
     */
    defaultTransitionLength?: TimePeriod;
    /** list: A list of [light effects](https://esphome.io/components/light#light-effects) to use for this light. */
    effects?: unknown;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The transition length to use when flash is called. Defaul...
     * @yamlKey flash_transition_length
     */
    flashTransitionLength?: TimePeriod;
    /**
     * float: Apply a [gamma correction factor](https://en.wikipedia.org/wiki/Gamma_correction) to the light channels. Defau...
     * @yamlKey gamma_correct
     */
    gammaCorrect?: number;
    /** percentage: The green channel of the light. */
    green?: number;
    /**
     * The initial state the light should be set to on bootup. This state will be applied when the state is not restored bas...
     * @yamlKey initial_state
     */
    initialState?: LightInitialStateProps;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the light's set state is ...
     * @yamlKey on_state
     */
    onState?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the light is turned off. ...
     * @yamlKey on_turn_off
     */
    onTurnOff?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the light is turned on. S...
     * @yamlKey on_turn_on
     */
    onTurnOn?: TriggerHandler;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): The [Power Supply](https://esphome.io/components/power_supply...
     * @yamlKey power_supply
     */
    powerSupply?: unknown;
    /** percentage: The red channel of the light. */
    red?: number;
    /**
     * Control how the light attempts to restore state on bootup.
     * @yamlKey restore_mode
     */
    restoreMode?: "ALWAYS_OFF" | "ALWAYS_ON" | "RESTORE_AND_OFF" | "RESTORE_AND_ON" | "RESTORE_DEFAULT_OFF" | "RESTORE_DEFAULT_ON" | "RESTORE_INVERTED_DEFAULT_OFF" | "RESTORE_INVERTED_DEFAULT_ON";
    /**
     * percentage: The brightness of the warm white channel. Cannot be used at the same time as *color_temperature*.
     * @yamlKey warm_white
     */
    warmWhite?: number;
    /** @yamlKey web_server */
    webServer?: LightWebServerProps;
    /** percentage: The brightness of the white channel. */
    white?: number;
}
//  light.BINARY_LIGHT_SCHEMA
export interface _LightBinaryLight extends _Light {
}
//  lock._LOCK_SCHEMA
export interface _Lock extends _CoreEntityBase, _CoreMqttCommandComponent {
    /** string: Manually specify the ID for code generation. At least one of id and name must be specified. */
    id?: string;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the lock is locked. See [...
     * @yamlKey on_lock
     */
    onLock?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the lock is unlocked. See...
     * @yamlKey on_unlock
     */
    onUnlock?: TriggerHandler;
    /** @yamlKey web_server */
    webServer?: LockWebServerProps;
}
//  media_player._MEDIA_PLAYER_SCHEMA
export interface _MediaPlayer extends _CoreEntityBase {
    /** string: Manually specify the ID for code generation. At least one of id and name must be specified. */
    id?: string;
    /** @yamlKey on_announcement */
    onAnnouncement?: TriggerHandler;
    /** @yamlKey on_idle */
    onIdle?: TriggerHandler;
    /** @yamlKey on_pause */
    onPause?: TriggerHandler;
    /** @yamlKey on_play */
    onPlay?: TriggerHandler;
    /** @yamlKey on_state */
    onState?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when media_player is turned off, implements th...
     * @yamlKey on_turn_off
     */
    onTurnOff?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when media_player is turned on, implements the...
     * @yamlKey on_turn_on
     */
    onTurnOn?: TriggerHandler;
}
//  modbus_controller.ModbusItemBaseSchema
export interface _ModbusControllerModbusitembaseschema {
    address?: number;
    bitmask?: number;
    /** @yamlKey byte_offset */
    byteOffset?: number;
    /** @yamlKey custom_command */
    customCommand?: Array<number>;
    /** @yamlKey force_new_range */
    forceNewRange?: boolean;
    lambda?: unknown;
    /** @yamlKey modbus_controller_id */
    modbusControllerId?: RefProp<__marker_modbus_controller_ModbusController>;
    offset?: number;
    /** @yamlKey response_size */
    responseSize?: number;
    /** @yamlKey skip_updates */
    skipUpdates?: number;
}
//  msa3xx.MSA_SENSOR_SCHEMA
export interface _Msa3xxMsaSensor {
    /** @yamlKey msa3xx_id */
    msa3xxId?: RefProp<__marker_msa3xx_MSA3xxComponent>;
}
//  msa3xx._COMMON_SCHEMA
export interface _Msa3xxCommon extends _CoreComponent {
    calibration?: Msa3xxCommonCalibrationProps;
    /** @yamlKey on_active */
    onActive?: TriggerHandler;
    /** @yamlKey on_double_tap */
    onDoubleTap?: TriggerHandler;
    /** @yamlKey on_freefall */
    onFreefall?: TriggerHandler;
    /** @yamlKey on_orientation */
    onOrientation?: TriggerHandler;
    /** @yamlKey on_tap */
    onTap?: TriggerHandler;
    /** string: The range of the sensor measurements. One of `2G`, `4G`, `8G`, `16G`. Defaults to `2G` which means it picks u... */
    range?: "16G" | "2G" | "4G" | "8G";
    transform?: Msa3xxCommonTransformProps;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The interval for updating acceleration sensors. Defaults ...
     * @yamlKey update_interval
     */
    updateInterval?: TimePeriod;
}
//  nextion.binary_sensor.CONFIG_BINARY_SENSOR_SCHEMA
export interface _NextionBinarySensorConfigBinarySensor {
    /**
     * [Color](https://esphome.io/components/display#config-color): The background color
     * @yamlKey background_color
     */
    backgroundColor?: RefProp<__marker_Color>;
    /**
     * string: The name of the Nextion component.
     * @yamlKey component_name
     */
    componentName?: string;
    /**
     * [Color](https://esphome.io/components/display#config-color): The foreground color
     * @yamlKey foreground_color
     */
    foregroundColor?: RefProp<__marker_Color>;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): The ID of the Nextion display.
     * @yamlKey nextion_id
     */
    nextionId?: RefProp<__marker_nextion_Nextion>;
    /**
     * string: The name of the Nextion variable. Any value over `0` is considered to be on
     * @yamlKey variable_name
     */
    variableName?: string;
    /** boolean: Visible or not */
    visible?: boolean;
}
//  nextion.sensor.CONFIG_SENSOR_COMPONENT_SCHEMA
export interface _NextionSensorConfigSensorComponent extends _NextionBinarySensorConfigBinarySensor {
    /** @yamlKey font_id */
    fontId?: number;
}
//  number._NUMBER_SCHEMA
export interface _Number extends _CoreEntityBase, _CoreMqttCommandComponent {
    /**
     * string: The device class for the number. See [https://www.home-assistant.io/integrations/number/#device-class](https:...
     * @yamlKey device_class
     */
    deviceClass?: "" | "absolute_humidity" | "apparent_power" | "aqi" | "area" | "atmospheric_pressure" | "battery" | "blood_glucose_concentration" | "carbon_dioxide" | "carbon_monoxide" | "conductivity" | "current" | "data_rate" | "data_size" | "distance" | "duration" | "energy" | "energy_distance" | "energy_storage" | "frequency" | "gas" | "humidity" | "illuminance" | "irradiance" | "moisture" | "monetary" | "nitrogen_dioxide" | "nitrogen_monoxide" | "nitrous_oxide" | "ozone" | "ph" | "pm1" | "pm10" | "pm25" | "pm4" | "power" | "power_factor" | "precipitation" | "precipitation_intensity" | "pressure" | "reactive_energy" | "reactive_power" | "signal_strength" | "sound_pressure" | "speed" | "sulphur_dioxide" | "temperature" | "temperature_delta" | "volatile_organic_compounds" | "volatile_organic_compounds_parts" | "voltage" | "volume" | "volume_flow_rate" | "volume_storage" | "water" | "weight" | "wind_direction" | "wind_speed";
    /** string: Manually specify the ID for code generation. At least one of id and name must be specified. */
    id?: string;
    /** string: Defines how the number should be displayed in the frontend. See [https://developers.home-assistant.io/docs/co... */
    mode?: "AUTO" | "BOX" | "SLIDER";
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    /**
     * string: Manually set the unit of measurement for the number.
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: NumberWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
//  ota.BASE_OTA_SCHEMA
export interface _OtaBaseOta {
    /** @yamlKey on_abort */
    onAbort?: TriggerHandler;
    /** @yamlKey on_begin */
    onBegin?: TriggerHandler;
    /** @yamlKey on_end */
    onEnd?: TriggerHandler;
    /** @yamlKey on_error */
    onError?: TriggerHandler;
    /** @yamlKey on_progress */
    onProgress?: TriggerHandler;
    /** @yamlKey on_state_change */
    onStateChange?: TriggerHandler;
}
//  output.BINARY_OUTPUT_SCHEMA
export interface _OutputBinaryOutput {
    inverted?: boolean;
    /** @yamlKey power_supply */
    powerSupply?: RefProp<__marker_power_supply_PowerSupply>;
}
//  output.FLOAT_OUTPUT_SCHEMA
export interface _OutputFloatOutput extends _OutputBinaryOutput {
    /** @yamlKey max_power */
    maxPower?: unknown;
    /** @yamlKey min_power */
    minPower?: unknown;
    /** @yamlKey zero_means_zero */
    zeroMeansZero?: boolean;
}
//  packages.PACKAGE_SCHEMA
export interface _PackagesPackage {
    file?: unknown;
    /** List of files to include. Can be one of: */
    files?: Array<PackagesPackageFilesProps>;
    /** string: Password to be used for authentication, if required. */
    password?: string;
    /** string: Base common path of included files. */
    path?: string;
    /** string: The Git ref(erence) to be used when pulling content from the repository. */
    ref?: string;
    /** [Time](https://esphome.io/guides/configuration-types#time): The interval at which the content from the repository sho... */
    refresh?: string;
    /** string: The URL for the repository. */
    url: string;
    /** string: Username to be used for authentication, if required. */
    username?: string;
}
//  packet_transport.ENCRYPTION_SCHEMA
export interface _PacketTransportEncryption {
    encryption?: PacketTransportEncryptionEncryptionProps;
}
//  packet_transport.TRANSPORT_SCHEMA
export interface _PacketTransportTransport extends _CoreComponent, _PacketTransportEncryption {
    /** @yamlKey binary_sensors */
    binarySensors?: Array<PacketTransportTransportBinarySensorsProps>;
    /** @yamlKey ping_pong_enable */
    pingPongEnable?: boolean;
    /** @yamlKey ping_pong_recycle_time */
    pingPongRecycleTime?: TimePeriod;
    providers?: Array<PacketTransportTransportProvidersProps>;
    /** @yamlKey rolling_code_enable */
    rollingCodeEnable?: boolean;
    sensors?: Array<PacketTransportTransportSensorsProps>;
    /** @yamlKey update_interval */
    updateInterval?: unknown;
}
//  packet_transport.binary_sensor.STATUS_SENSOR_SCHEMA
export interface _PacketTransportBinarySensorStatusSensor extends _BinarySensor {
    /** string: The name of the provider node. */
    provider: string;
    /** @yamlKey transport_id */
    transportId?: RefProp<__marker_packet_transport_PacketTransport>;
}
//  pipsolar.PIPSOLAR_COMPONENT_SCHEMA
export interface _PipsolarComponent {
    /** @yamlKey pipsolar_id */
    pipsolarId: RefProp<__marker_pipsolar_Pipsolar>;
}
//  pn532.PN532_SCHEMA
export interface _Pn532 extends _CoreComponent {
    /** @yamlKey on_finished_write */
    onFinishedWrite?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a tag is read. See [pn532-on_tag](https:/...
     * @yamlKey on_tag
     */
    onTag?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a tag is removed. See [`on_tag_removed`](...
     * @yamlKey on_tag_removed
     */
    onTagRemoved?: TriggerHandler;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The duration of each scan on the PN532. This affects the ...
     * @yamlKey update_interval
     */
    updateInterval?: TimePeriod;
}
//  pylontech.PYLONTECH_COMPONENT_SCHEMA
export interface _PylontechComponent {
    /** Which battery to monitor. 1 stands for the main battery, 2..16 for child batteries. */
    battery: number;
    /**
     * Manually specify the ID of the pylontech instance if there are multiple.
     * @yamlKey pylontech_id
     */
    pylontechId?: RefProp<__marker_pylontech_PylontechComponent>;
}
//  qspi_dbi.display.BASE_SCHEMA
export interface _QspiDbiDisplayBase extends _DisplayFullDisplay {
    /** int: A brightness value in the range 0-255 */
    brightness?: number;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The chip select pin.
     * @yamlKey cs_pin
     */
    csPin?: Pin;
    /**
     * int: Set the data rate of the SPI interface to the display. One of `80MHz`, `40MHz`, `20MHz`, `10MHz` (default), `5MH...
     * @yamlKey data_rate
     */
    dataRate?: number;
    /** Dimensions of the screen, specified either as *width* x *height* (e.g `320x240` ) or with separate config keys. */
    dimensions: QspiDbiDisplayBaseDimensionsProps;
    /**
     * boolean: When set, all partial display updates will start at the origin (0,0). Defaults to false.
     * @yamlKey draw_from_origin
     */
    drawFromOrigin?: boolean;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The display enable pin.
     * @yamlKey enable_pin
     */
    enablePin?: Pin;
    /**
     * A list of byte arrays: Specifies the init sequence for the display. This is required when using the `CUSTOM` model - ...
     * @yamlKey init_sequence
     */
    initSequence?: Array<unknown>;
    /** @yamlKey release_device */
    releaseDevice?: boolean;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The RESET pin.
     * @yamlKey reset_pin
     */
    resetPin?: Pin;
    /** @yamlKey spi_id */
    spiId?: RefProp<__marker_spi_QuadSPIComponent>;
    /**
     * Set the mode for the SPI interface to the display. Default is `MODE0`.
     * @yamlKey spi_mode
     */
    spiMode?: "0" | "1" | "2" | "3" | "MODE0" | "MODE1" | "MODE2" | "MODE3";
}
//  rc522.RC522_SCHEMA
export interface _Rc522 extends _CoreComponent {
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a tag is read. See [`on_tag` Trigger](htt...
     * @yamlKey on_tag
     */
    onTag?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform after a tag is removed. See [`on_tag_removed` ...
     * @yamlKey on_tag_removed
     */
    onTagRemoved?: TriggerHandler;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The pin connected to the RST line. Some tests...
     * @yamlKey reset_pin
     */
    resetPin?: Pin;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The duration of each scan on the RC522. This affects the ...
     * @yamlKey update_interval
     */
    updateInterval?: TimePeriod;
}
//  select._SELECT_SCHEMA
export interface _Select extends _CoreEntityBase, _CoreMqttCommandComponent {
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey web_server */
    webServer?: SelectWebServerProps;
}
//  sensor._SENSOR_SCHEMA
export interface _Sensor extends _CoreEntityBase, _CoreMqttComponent {
    /**
     * int: Set the number of digits after the decimal point that data consumers should use. While this does not change the ...
     * @yamlKey accuracy_decimals
     */
    accuracyDecimals?: number;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/sensor/#device-class](https:...
     * @yamlKey device_class
     */
    deviceClass?: "" | "absolute_humidity" | "apparent_power" | "aqi" | "area" | "atmospheric_pressure" | "battery" | "blood_glucose_concentration" | "carbon_dioxide" | "carbon_monoxide" | "conductivity" | "current" | "data_rate" | "data_size" | "date" | "distance" | "duration" | "energy" | "energy_distance" | "energy_storage" | "frequency" | "gas" | "humidity" | "illuminance" | "irradiance" | "moisture" | "monetary" | "nitrogen_dioxide" | "nitrogen_monoxide" | "nitrous_oxide" | "ozone" | "ph" | "pm1" | "pm10" | "pm25" | "pm4" | "power" | "power_factor" | "precipitation" | "precipitation_intensity" | "pressure" | "reactive_energy" | "reactive_power" | "signal_strength" | "sound_pressure" | "speed" | "sulphur_dioxide" | "temperature" | "temperature_delta" | "timestamp" | "volatile_organic_compounds" | "volatile_organic_compounds_parts" | "voltage" | "volume" | "volume_flow_rate" | "volume_storage" | "water" | "weight" | "wind_direction" | "wind_speed";
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): Manually set the time in which the sensor values should b...
     * @yamlKey expire_after
     */
    expireAfter?: TimePeriod;
    /** Specify filters to use for some basic transforming of values. See [Sensor Filters](https://esphome.io/components/sens... */
    filters?: Array<unknown>;
    /**
     * boolean: If true, this option will force the frontend (usually Home Assistant) to create a state changed event when t...
     * @yamlKey force_update
     */
    forceUpdate?: boolean;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a raw value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: number;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler<{
        x: number;
    }>;
    /**
     * string: The state class for the sensor. See [https://developers.home-assistant.io/docs/core/entity/sensor/#available-...
     * @yamlKey state_class
     */
    stateClass?: "" | "measurement" | "measurement_angle" | "total" | "total_increasing";
    /**
     * string: Manually set the unit of measurement the sensor should advertise its values with. This does not actually do a...
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: SensorWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
//  sn74hc595._COMMON_SCHEMA
export interface _Sn74hc595Common {
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): Pin connected to SN74HC595 RCLK (ST_CP) pin
     * @yamlKey latch_pin
     */
    latchPin: Pin;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): Pin connected to SN74HC595 OE pin
     * @yamlKey oe_pin
     */
    oePin?: Pin;
    /**
     * int: Number of daisy-chained shift registers, up-to 256. Defaults to `1`.
     * @yamlKey sr_count
     */
    srCount?: number;
}
//  stepper.STEPPER_SCHEMA
export interface _Stepper {
    /** float: The acceleration in `steps/s^2` (steps per seconds squared) to use when starting to move. The default is `inf`... */
    acceleration?: number;
    /** float: The same as `acceleration`, but for when the motor is decelerating shortly before reaching the set position. D... */
    deceleration?: number;
    /**
     * float: The maximum speed in `steps/s` (steps per seconds) to drive the stepper at. Note most steppers can't step prop...
     * @yamlKey max_speed
     */
    maxSpeed: number;
}
//  switch._SWITCH_SCHEMA
export interface _Switch extends _CoreEntityBase, _CoreMqttCommandComponent {
    /**
     * string: The device class for the switch. See [https://www.home-assistant.io/integrations/switch/#device-class](https:...
     * @yamlKey device_class
     */
    deviceClass?: "" | "outlet" | "switch";
    /** string: Manually specify the ID for code generation. At least one of id and name must be specified. */
    id?: string;
    /** boolean: Whether to invert the binary state, i.e. report ON states as OFF and vice versa. Defaults to `false`. */
    inverted?: boolean;
    /** @yamlKey on_state */
    onState?: TriggerHandler<{
        x: boolean;
    }>;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the switch is turned off....
     * @yamlKey on_turn_off
     */
    onTurnOff?: TriggerHandler;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): An automation to perform when the switch is turned on. ...
     * @yamlKey on_turn_on
     */
    onTurnOn?: TriggerHandler;
    /**
     * Control how the switch attempts to restore state on bootup. NOTE : Not all components consider restore_mode. Check th...
     * @yamlKey restore_mode
     */
    restoreMode?: "ALWAYS_OFF" | "ALWAYS_ON" | "DISABLED" | "RESTORE_DEFAULT_OFF" | "RESTORE_DEFAULT_ON" | "RESTORE_INVERTED_DEFAULT_OFF" | "RESTORE_INVERTED_DEFAULT_ON";
    /** @yamlKey web_server */
    webServer?: SwitchWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
//  teleinfo.TELEINFO_LISTENER_SCHEMA
export interface _TeleinfoListener {
    /** @yamlKey tag_name */
    tagName: string;
    /** @yamlKey teleinfo_id */
    teleinfoId?: RefProp<__marker_teleinfo_TeleInfo>;
}
//  template.datetime._BASE_SCHEMA
export interface _TemplateDatetime_Base extends _CoreComponent {
    /** [lambda](https://esphome.io/automations/templates#config-lambda): Lambda to be evaluated every update interval to get... */
    lambda?: unknown;
    /** boolean: Whether to operate in optimistic mode - when in this mode, any command sent to the template datetime will im... */
    optimistic?: boolean;
    /**
     * boolean: Saves and loads the state to RTC/Flash. Cannot be used with `lambda`. Defaults to `false`.
     * @yamlKey restore_value
     */
    restoreValue?: boolean;
    /**
     * [Action](https://esphome.io/automations/actions#all-actions): The action that should be performed when the remote (li...
     * @yamlKey set_action
     */
    setAction?: TriggerHandler;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The interval on which to update the datetime by executing...
     * @yamlKey update_interval
     */
    updateInterval?: TimePeriod;
}
//  text._TEXT_SCHEMA
export interface _Text extends _CoreEntityBase, _CoreMqttComponent {
    /** string: Defines how the text should be displayed in the frontend. One of `text` or `password`. */
    mode: "PASSWORD" | "TEXT";
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler;
    /** @yamlKey web_server */
    webServer?: TextWebServerProps;
}
//  text_sensor._TEXT_SENSOR_SCHEMA
export interface _TextSensor extends _CoreEntityBase, _CoreMqttComponent {
    /**
     * string: The device class for the sensor. Only the `timestamp` and `date` device classes are supported. Set to `""` to...
     * @yamlKey device_class
     */
    deviceClass?: "" | "date" | "timestamp";
    filters?: Array<unknown>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler<{
        x: string;
    }>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler<{
        x: string;
    }>;
    /** @yamlKey web_server */
    webServer?: TextSensorWebServerProps;
}
//  time.TIME_SCHEMA
export interface _Time extends _CoreComponent {
    /** [ID](https://esphome.io/guides/configuration-types#id): Specify the ID of the time for use in lambdas. */
    id?: unknown;
    /**
     * [Automation](https://esphome.io/automations): Automation to run at specific intervals using a cron-like syntax. See [...
     * @yamlKey on_time
     */
    onTime?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): Automation to run when the time source could be (re-)synchronized.. See...
     * @yamlKey on_time_sync
     */
    onTimeSync?: TriggerHandler;
    /** string: Manually tell ESPHome what time zone to use with [this format](https://www.gnu.org/software/libc/manual/html_... */
    timezone?: string;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): How often to synchronize the device time from the source....
     * @yamlKey update_interval
     */
    updateInterval?: TimePeriod;
}
//  touchscreen.TOUCHSCREEN_SCHEMA
export interface _Touchscreen extends _CoreComponent {
    /** Some touchscreens require calibration on a per-device basis. */
    calibration?: TouchscreenCalibrationProps;
    /** [ID](https://esphome.io/guides/configuration-types#id): The display to use this touchscreen with. */
    display?: RefProp<__marker_display_Display>;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the touchscreen is no longer touched. See...
     * @yamlKey on_release
     */
    onRelease?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the touchscreen is touched. See [`on_touc...
     * @yamlKey on_touch
     */
    onTouch?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when the touchscreen is touched. See [`on_upda...
     * @yamlKey on_update
     */
    onUpdate?: TriggerHandler;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): A timeout for touchscreens that do not report the end of ...
     * @yamlKey touch_timeout
     */
    touchTimeout?: TimePeriod;
    /** Transform the touchscreen presentation using hardware. All defaults are `false`. */
    transform?: TouchscreenTransformProps;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The touchscreen polling interval - used only if an interr...
     * @yamlKey update_interval
     */
    updateInterval?: TimePeriod;
}
//  uart.UART_DEVICE_SCHEMA
export interface _UartDevice {
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): Manually specify the ID of the [UART Component](https://espho...
     * @yamlKey uart_id
     */
    uartId?: RefProp<__marker_uart_UARTComponent>;
}
//  udp.UDP_SCHEMA
export interface _Udp {
    /** @yamlKey udp_id */
    udpId?: RefProp<__marker_udp_UDPComponent>;
}
//  uponor_smatrix.UPONOR_SMATRIX_DEVICE_SCHEMA
export interface _UponorSmatrixDevice {
    /** int: The 32 bit device address of the thermostat. See [Getting started](https://esphome.io/components/uponor_smatrix#... */
    address: number;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): Manually specify the ID of the `uponor_smatrix` hub component...
     * @yamlKey uponor_smatrix_id
     */
    uponorSmatrixId?: RefProp<__marker_uponor_smatrix_UponorSmatrixComponent>;
}
//  valve._VALVE_SCHEMA
export interface _Valve extends _CoreEntityBase, _CoreMqttCommandComponent {
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/components/valve/](https://www.home-assis...
     * @yamlKey device_class
     */
    deviceClass?: "" | "gas" | "water";
    /** @yamlKey on_closed */
    onClosed?: TriggerHandler;
    /** @yamlKey on_open */
    onOpen?: TriggerHandler;
    /**
     * string: The topic to receive valve position commands on.
     * @yamlKey position_command_topic
     */
    positionCommandTopic?: string;
    /**
     * string: The topic to publish valve position changes to.
     * @yamlKey position_state_topic
     */
    positionStateTopic?: string;
    /** @yamlKey web_server */
    webServer?: ValveWebServerProps;
}
//  water_heater._WATER_HEATER_SCHEMA
export interface _WaterHeater extends _CoreEntityBase {
    /** [ID](https://esphome.io/guides/configuration-types#id): The water heater to control. */
    id?: unknown;
    /** string: The operation mode to set. See [Modes](https://esphome.io/components/water_heater#water-heater-modes) for ava... */
    mode?: string;
    /**
     * list: Static list of operation modes that will be exposed to the frontend (for example Home Assistant). When not spec...
     * @yamlKey supported_modes
     */
    supportedModes?: unknown;
    /**
     * float: The target temperature to set (e.g., `60.0`).
     * @yamlKey target_temperature
     */
    targetTemperature?: number;
    /** Configuration for the frontend representation. */
    visual?: WaterHeaterVisualProps;
}
