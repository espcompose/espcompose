// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

// Shared base interfaces mirroring ESPHome schema "extends" hierarchy.
// These are imported by individual component files.

/* eslint-disable */

import type { Pin, Ref } from "../types";
import type { Color, audio_dac_AudioDac, bedjet_BedJetHub, binary_sensor_BinarySensor, ble_client_BLEClient, display_Display, emc2101_Emc2101Component, esp32_ble_tracker_ESP32BLETracker, i2s_audio_I2SAudioComponent, modbus_controller_ModbusController, msa3xx_MSA3xxComponent, nextion_Nextion, packet_transport_PacketTransport, pipsolar_Pipsolar, power_supply_PowerSupply, pylontech_PylontechComponent, sensor_Sensor, spi_QuadSPIComponent, teleinfo_TeleInfo, time_RealTimeClock, uart_UARTComponent, udp_UDPComponent, uponor_smatrix_UponorSmatrixComponent, web_server_WebServer, zigbee_ZigbeeComponent } from "./markers";
export interface EthernetBaseManualIpProps {
    /**
     * IPv4 address: The static IP of your node.
     * @yamlKey static_ip
     */
    staticIp: unknown;
    /** IPv4 address: The gateway of the local network. */
    gateway: unknown;
    /** IPv4 address: The subnet of the local network. */
    subnet: unknown;
    /** IPv4 address: The main DNS server to use. */
    dns1?: unknown;
    /** IPv4 address: The backup DNS server to use. */
    dns2?: unknown;
}
export interface EthernetRmiiClkProps {
    mode: "CLK_EXT_IN" | "CLK_OUT";
    pin: Pin;
}
export interface EthernetRmiiPhyRegistersProps {
    /** hex: The register address as a hex number (e.g. `0x10` for address 16) */
    address: unknown;
    /** hex: The value of the register to set as a hex number (e.g. `0x1FFA` ) */
    value: unknown;
    /**
     * hex: (RTL8201 only) Register page number to select before writing (e.g. `0x07` for page 7)
     * @yamlKey page_id
     */
    pageId?: unknown;
}
export interface EthernetSpiPollingIntervalProps {
    days?: unknown;
    hours?: unknown;
    minutes?: unknown;
    seconds?: unknown;
    milliseconds?: unknown;
    microseconds?: unknown;
}
export interface Bk72xxConfigFrameworkProps {
    version?: string;
    source?: string;
    loglevel?: "VERBOSE" | "TRACE" | "DEBUG" | "INFO" | "WARN" | "ERROR" | "FATAL" | "NONE";
    debug?: Array<"NONE" | "WIFI" | "CLIENT" | "SERVER" | "SSL" | "OTA" | "FDB" | "MDNS" | "LWIP" | "LWIP_ASSERT">;
    /** @yamlKey sdk_silent */
    sdkSilent?: "all" | "auto" | "none";
    /** @yamlKey uart_port */
    uartPort?: "0" | "1" | "2";
    /** @yamlKey gpio_recover */
    gpioRecover?: boolean;
    options?: Record<string, string>;
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
export interface PackagesPackageFilesProps {
    path: unknown;
    vars?: Record<string, unknown>;
}
export interface CoreMqttComponentAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
export interface AlarmControlPanelWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: Ref<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
export interface BinarySensorWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: Ref<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
export interface TouchscreenTransformProps {
    /**
     * boolean: If true, exchange the x and y axes.
     * @yamlKey swap_xy
     */
    swapXy?: boolean;
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
}
export interface TouchscreenTouchTimeoutProps {
    days?: unknown;
    hours?: unknown;
    minutes?: unknown;
    seconds?: unknown;
    milliseconds?: unknown;
    microseconds?: unknown;
}
export interface TouchscreenCalibrationProps {
    /**
     * int: The raw value corresponding to the left
     * @yamlKey x_min
     */
    xMin: number;
    /**
     * int: The raw value corresponding to the right
     * @yamlKey x_max
     */
    xMax: number;
    /**
     * int: The raw value corresponding to the top
     * @yamlKey y_min
     */
    yMin: number;
    /**
     * int: The raw value corresponding to the bottom
     * @yamlKey y_max
     */
    yMax: number;
}
export interface ButtonWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: Ref<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
export interface ClimateWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: Ref<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
export interface ClimateVisualProps {
    /** @yamlKey min_temperature */
    minTemperature?: unknown;
    /** @yamlKey max_temperature */
    maxTemperature?: unknown;
    /** @yamlKey temperature_step */
    temperatureStep?: unknown;
    /** @yamlKey min_humidity */
    minHumidity?: unknown;
    /** @yamlKey max_humidity */
    maxHumidity?: unknown;
}
export interface CoverWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: Ref<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
export interface DisplayFullDisplayPagesProps {
    lambda: unknown;
}
export interface QspiDbiDisplayBaseDimensionsProps {
    /** int: Specifies width of display. */
    width: unknown;
    /** int: Specifies height of display in pixels. */
    height: unknown;
    /**
     * int: Specify an offset for the y-direction of the display. Default is 0.
     * @yamlKey offset_height
     */
    offsetHeight?: unknown;
    /**
     * int: Specify an offset for the x-direction of the display, typically used when a display is smaller than the maximum ...
     * @yamlKey offset_width
     */
    offsetWidth?: unknown;
}
export interface FanWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: Ref<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
export interface LightWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: Ref<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
export interface LightInitialStateProps {
    /** @yamlKey color_mode */
    colorMode?: "ON_OFF" | "BRIGHTNESS" | "WHITE" | "COLOR_TEMPERATURE" | "COLD_WARM_WHITE" | "RGB" | "RGB_WHITE" | "RGB_COLOR_TEMPERATURE" | "RGB_COLD_WARM_WHITE";
    /** boolean: The ON/OFF state for the light. */
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
}
export interface LightBrightnessOnlyLightDefaultTransitionLengthProps {
    days?: unknown;
    hours?: unknown;
    minutes?: unknown;
    seconds?: unknown;
    milliseconds?: unknown;
    microseconds?: unknown;
}
export interface LightBrightnessOnlyLightFlashTransitionLengthProps {
    days?: unknown;
    hours?: unknown;
    minutes?: unknown;
    seconds?: unknown;
    milliseconds?: unknown;
    microseconds?: unknown;
}
export interface SensorWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: Ref<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
export interface SensorExpireAfterProps {
    days?: unknown;
    hours?: unknown;
    minutes?: unknown;
    seconds?: unknown;
    milliseconds?: unknown;
    microseconds?: unknown;
}
export interface I2sAudioSpeakerBaseBufferDurationProps {
    days?: unknown;
    hours?: unknown;
    minutes?: unknown;
    seconds?: unknown;
    milliseconds?: unknown;
    microseconds?: unknown;
}
export interface TextSensorWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: Ref<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
export interface DatetimeWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: Ref<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
export interface EventWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: Ref<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
export interface LockWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: Ref<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
export interface NumberWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: Ref<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
export interface PacketTransportEncryptionEncryptionProps {
    key: string;
}
export interface PacketTransportTransportPingPongRecycleTimeProps {
    days?: unknown;
    hours?: unknown;
    minutes?: unknown;
    seconds?: unknown;
    milliseconds?: unknown;
    microseconds?: unknown;
}
export interface PacketTransportTransportSensorsProps {
    id: Ref<sensor_Sensor>;
    /** @yamlKey broadcast_id */
    broadcastId?: unknown;
}
export interface PacketTransportTransportBinarySensorsProps {
    id: Ref<binary_sensor_BinarySensor>;
    /** @yamlKey broadcast_id */
    broadcastId?: unknown;
}
export interface PacketTransportTransportProvidersPropsEncryptionProps {
    key: string;
}
export interface PacketTransportTransportProvidersProps {
    encryption?: PacketTransportTransportProvidersPropsEncryptionProps;
    name: unknown;
}
export interface SelectWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: Ref<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
export interface SwitchWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: Ref<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
export interface TextWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: Ref<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
export interface UpdateWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: Ref<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
export interface ValveWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: Ref<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
export interface WaterHeaterVisualProps {
    /** @yamlKey min_temperature */
    minTemperature?: unknown;
    /** @yamlKey max_temperature */
    maxTemperature?: unknown;
    /** @yamlKey target_temperature_step */
    targetTemperatureStep?: unknown;
}
//  core.COMPONENT_SCHEMA
export interface _CoreComponent {
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
}
//  as3935.AS3935_SCHEMA
export interface _As3935 {
    /**
     * [Pin](/guides/configuration-types#pin): The IRQ pin, which indicates if a lightning strike has been detected.
     * @yamlKey irq_pin
     */
    irqPin: Pin;
    /** boolean: Indicates if the sensor is used indoor. Defaults to `true`. */
    indoor?: boolean;
    /**
     * int: Noise floor level is compared to known reference voltage. If this level is exceeded the chip will issue an inter...
     * @yamlKey noise_level
     */
    noiseLevel?: number;
    /**
     * int: Determines the threshold for events that trigger the IRQ pin. Defaults to `2`.
     * @yamlKey watchdog_threshold
     */
    watchdogThreshold?: number;
    /**
     * int: Helps to differentiate between false events and actual lightning. Increasing this value increases robustness at ...
     * @yamlKey spike_rejection
     */
    spikeRejection?: number;
    /**
     * int: The number of lightnings that must appear in a 15-minute time window before a lightning storm is detected. 15 mi...
     * @yamlKey lightning_threshold
     */
    lightningThreshold?: "1" | "5" | "9" | "16";
    /**
     * boolean: This setting will return whether or not disturbers trigger the IRQ Pin. Defaults to `false`.
     * @yamlKey mask_disturber
     */
    maskDisturber?: boolean;
    /**
     * int: The antenna is designed to resonate at 500kHz and so can be tuned with the following setting. The accuracy of th...
     * @yamlKey div_ratio
     */
    divRatio?: "0" | "16" | "32" | "64" | "128";
    /** int: This setting will add capacitance to the series RLC antenna on the product to help tune its resonance. The datas... */
    capacitance?: number;
    /**
     * boolean: Start sensor in antenna tuning mode. It will emit oscillator frequency to be read on the INT pin. Please fol...
     * @yamlKey tune_antenna
     */
    tuneAntenna?: boolean;
    /** boolean: Enable/disable oscillator calibration on startup. It is recommended to perform antenna tuning procedure firs... */
    calibration?: boolean;
}
//  core.ENTITY_BASE_SCHEMA
export interface _CoreEntityBase {
    /** string: The name for the sensor. */
    name?: unknown;
    /** boolean: Whether the sensor should be exposed via API (e.g. to Home Assistant.) Defaults to `true` if name is not set... */
    internal?: boolean;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    /** icon: Manually set the icon to use for the light in the frontend. */
    icon?: unknown;
    /**
     * string: The category of the entity. See [this list](https://developers.home-assistant.io/docs/core/entity/#generic-pr...
     * @yamlKey entity_category
     */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
}
//  ethernet.RMII_SCHEMA
export interface _EthernetRmii extends _EthernetBase {
    /**
     * [Pin](/guides/configuration-types#pin): The MDC pin of the board. Usually this is `GPIO23`.
     * @yamlKey mdc_pin
     */
    mdcPin: Pin;
    /**
     * [Pin](/guides/configuration-types#pin): The MDIO pin of the board. Usually this is `GPIO18`.
     * @yamlKey mdio_pin
     */
    mdioPin: Pin;
    /** @yamlKey clk_mode */
    clkMode?: "GPIO0_IN" | "GPIO0_OUT" | "GPIO16_OUT" | "GPIO17_OUT";
    clk?: EthernetRmiiClkProps;
    /**
     * int: The PHY addr type of the Ethernet controller. Defaults to 0.
     * @yamlKey phy_addr
     */
    phyAddr?: number;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The pin controlling the power/reset status of the Ethernet cont...
     * @yamlKey power_pin
     */
    powerPin?: Pin;
    /**
     * mapping: Arbitrary PHY register values to set after Ethernet initialization.
     * @yamlKey phy_registers
     */
    phyRegisters?: Array<EthernetRmiiPhyRegistersProps>;
}
//  ethernet.BASE_SCHEMA
export interface _EthernetBase extends _CoreComponent {
    /**
     * Manually configure the static IP of the node.
     * @yamlKey manual_ip
     */
    manualIp?: EthernetBaseManualIpProps;
    /** string: Set the domain of the node hostname used for uploading. For example, if it's set to `.local`, all uploads wil... */
    domain?: unknown;
    /**
     * string: Manually override what address to use to connect to the ESP. Defaults to auto-generated value. For example, i...
     * @yamlKey use_address
     */
    useAddress?: string;
    /**
     * MAC Address: Set the MAC address of the ethernet interface.
     * @yamlKey mac_address
     */
    macAddress?: unknown;
    /**
     * [Automation](/automations): An action to be performed when a connection is established.
     * @yamlKey on_connect
     */
    onConnect?: () => void;
    /**
     * [Automation](/automations): An action to be performed when the connection is dropped.
     * @yamlKey on_disconnect
     */
    onDisconnect?: () => void;
}
//  ethernet.SPI_SCHEMA
export interface _EthernetSpi extends _EthernetBase {
    /**
     * [Pin](/guides/configuration-types#pin): The SPI clock pin.
     * @yamlKey clk_pin
     */
    clkPin: Pin;
    /**
     * [Pin](/guides/configuration-types#pin): The SPI MISO pin.
     * @yamlKey miso_pin
     */
    misoPin: Pin;
    /**
     * [Pin](/guides/configuration-types#pin): The SPI MOSI pin.
     * @yamlKey mosi_pin
     */
    mosiPin: Pin;
    /**
     * [Pin](/guides/configuration-types#pin): The SPI chip select pin.
     * @yamlKey cs_pin
     */
    csPin: Pin;
    /**
     * [Pin](/guides/configuration-types#pin): The interrupt pin. This variable is required for older frameworks. See below.
     * @yamlKey interrupt_pin
     */
    interruptPin?: Pin;
    /**
     * [Pin](/guides/configuration-types#pin): The reset pin.
     * @yamlKey reset_pin
     */
    resetPin?: Pin;
    /**
     * float: The SPI clock speed. Any frequency between `8MHz` and `80MHz` is allowed, but the nearest integer division of ...
     * @yamlKey clock_speed
     */
    clockSpeed?: number;
    /**
     * [Time](/guides/configuration-types#time): If `interrupt_pin` is not set, set the time interval for periodic polling. ...
     * @yamlKey polling_interval
     */
    pollingInterval?: EthernetSpiPollingIntervalProps;
}
//  bk72xx.CONFIG_SCHEMA
export interface _Bk72xxConfig {
    board: string;
    family?: "BK7231N" | "BK7231Q" | "BK7231T" | "BK7251" | "LN882H" | "RTL8710B" | "RTL8720C";
    framework?: Bk72xxConfigFrameworkProps;
}
//  bthome_mithermometer.BLE_DEVICE_SCHEMA
export interface _BthomeMithermometerBleDevice {
    /** @yamlKey esp32_ble_id */
    esp32BleId?: Ref<esp32_ble_tracker_ESP32BLETracker>;
}
//  msa3xx._COMMON_SCHEMA
export interface _Msa3xxCommon extends _CoreComponent {
    /** string: The range of the sensor measurements. One of `2G`, `4G`, `8G`, `16G`. Defaults to `2G` which means it picks u... */
    range?: "2G" | "4G" | "8G" | "16G";
    calibration?: Msa3xxCommonCalibrationProps;
    transform?: Msa3xxCommonTransformProps;
    /** @yamlKey on_active */
    onActive?: () => void;
    /** @yamlKey on_tap */
    onTap?: () => void;
    /** @yamlKey on_double_tap */
    onDoubleTap?: () => void;
    /** @yamlKey on_freefall */
    onFreefall?: () => void;
    /** @yamlKey on_orientation */
    onOrientation?: () => void;
    /**
     * [Time](/guides/configuration-types#time): The interval for updating acceleration sensors. Defaults to `10s`.
     * @yamlKey update_interval
     */
    updateInterval?: unknown;
}
//  packages.PACKAGE_SCHEMA
export interface _PackagesPackage {
    /** string: The URL for the repository. */
    url: unknown;
    /** string: Base common path of included files. */
    path?: string;
    /** string: Username to be used for authentication, if required. */
    username?: string;
    /** string: Password to be used for authentication, if required. */
    password?: string;
    file?: unknown;
    /** List of files to include. Can be one of: */
    files?: Array<PackagesPackageFilesProps>;
    /** string: The Git ref(erence) to be used when pulling content from the repository. */
    ref?: unknown;
    /** [Time](/guides/configuration-types#time): The interval at which the content from the repository should be refreshed. */
    refresh?: string;
}
//  pn532.PN532_SCHEMA
export interface _Pn532 extends _CoreComponent {
    /**
     * [Automation](/automations): An automation to perform when a tag is read. See [pn532-on_tag](https://esphome.io/compon...
     * @yamlKey on_tag
     */
    onTag?: () => void;
    /** @yamlKey on_finished_write */
    onFinishedWrite?: () => void;
    /**
     * [Automation](/automations): An automation to perform when a tag is removed. See [`on_tag_removed`](https://esphome.io...
     * @yamlKey on_tag_removed
     */
    onTagRemoved?: () => void;
    /**
     * [Time](/guides/configuration-types#time): The duration of each scan on the PN532. This affects the duration that the ...
     * @yamlKey update_interval
     */
    updateInterval?: unknown;
}
//  rc522.RC522_SCHEMA
export interface _Rc522 extends _CoreComponent {
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The pin connected to the RST line. Some tests shows the RC522 w...
     * @yamlKey reset_pin
     */
    resetPin?: Pin;
    /**
     * [Automation](/automations): An automation to perform when a tag is read. See [`on_tag` Trigger](https://esphome.io/co...
     * @yamlKey on_tag
     */
    onTag?: () => void;
    /**
     * [Automation](/automations): An automation to perform after a tag is removed. See [`on_tag_removed` Trigger](https://e...
     * @yamlKey on_tag_removed
     */
    onTagRemoved?: () => void;
    /**
     * [Time](/guides/configuration-types#time): The duration of each scan on the RC522. This affects the duration that the ...
     * @yamlKey update_interval
     */
    updateInterval?: unknown;
}
//  sn74hc595._COMMON_SCHEMA
export interface _Sn74hc595Common {
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): Pin connected to SN74HC595 RCLK (ST_CP) pin
     * @yamlKey latch_pin
     */
    latchPin: Pin;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): Pin connected to SN74HC595 OE pin
     * @yamlKey oe_pin
     */
    oePin?: Pin;
    /**
     * int: Number of daisy-chained shift registers, up to 256. Defaults to `1`.
     * @yamlKey sr_count
     */
    srCount?: number;
}
//  uart.UART_DEVICE_SCHEMA
export interface _UartDevice {
    /**
     * [ID](/guides/configuration-types#id): Manually specify the ID of the [UART Component](/components/uart) if you want t...
     * @yamlKey uart_id
     */
    uartId?: Ref<uart_UARTComponent>;
}
//  alarm_control_panel._ALARM_CONTROL_PANEL_SCHEMA
export interface _AlarmControlPanel extends _CoreEntityBase, _CoreMqttCommandComponent {
    /** @yamlKey web_server */
    webServer?: AlarmControlPanelWebServerProps;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_triggered */
    onTriggered?: () => void;
    /** @yamlKey on_arming */
    onArming?: () => void;
    /** @yamlKey on_pending */
    onPending?: () => void;
    /** @yamlKey on_armed_home */
    onArmedHome?: () => void;
    /** @yamlKey on_armed_night */
    onArmedNight?: () => void;
    /** @yamlKey on_armed_away */
    onArmedAway?: () => void;
    /** @yamlKey on_disarmed */
    onDisarmed?: () => void;
    /** @yamlKey on_cleared */
    onCleared?: () => void;
    /** @yamlKey on_chime */
    onChime?: () => void;
    /** @yamlKey on_ready */
    onReady?: () => void;
}
//  core.MQTT_COMMAND_COMPONENT_SCHEMA
export interface _CoreMqttCommandComponent extends _CoreMqttComponent {
    /** @yamlKey command_topic */
    commandTopic?: unknown;
    /** @yamlKey command_retain */
    commandRetain?: boolean;
}
//  core.MQTT_COMPONENT_SCHEMA
export interface _CoreMqttComponent {
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: CoreMqttComponentAvailabilityProps;
}
//  binary_sensor._BINARY_SENSOR_SCHEMA
export interface _BinarySensor extends _CoreEntityBase, _CoreMqttComponent {
    /** @yamlKey web_server */
    webServer?: BinarySensorWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: Ref<zigbee_ZigbeeComponent>;
    /** @yamlKey publish_initial_state */
    publishInitialState?: unknown;
    /** @yamlKey trigger_on_initial_state */
    triggerOnInitialState?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "battery" | "battery_charging" | "carbon_monoxide" | "cold" | "connectivity" | "door" | "" | "garage_door" | "gas" | "heat" | "light" | "lock" | "moisture" | "motion" | "moving" | "occupancy" | "opening" | "plug" | "power" | "presence" | "problem" | "running" | "safety" | "smoke" | "sound" | "tamper" | "update" | "vibration" | "window";
    filters?: Array<unknown>;
    /** @yamlKey on_press */
    onPress?: () => void;
    /** @yamlKey on_release */
    onRelease?: () => void;
    /** @yamlKey on_click */
    onClick?: () => void;
    /** @yamlKey on_double_click */
    onDoubleClick?: () => void;
    /** @yamlKey on_multi_click */
    onMultiClick?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
}
//  homeassistant.HOME_ASSISTANT_IMPORT_SCHEMA
export interface _HomeassistantHomeAssistantImport {
    /**
     * string: The entity ID to import from Home Assistant.
     * @yamlKey entity_id
     */
    entityId: unknown;
    /** string: The name of the state attribute to import from the specified entity. The entity state is used when this optio... */
    attribute?: string;
    internal?: boolean;
}
//  nextion.binary_sensor.CONFIG_BINARY_SENSOR_SCHEMA
export interface _NextionBinarySensorConfigBinarySensor {
    /**
     * [ID](/guides/configuration-types#id): The ID of the Nextion display.
     * @yamlKey nextion_id
     */
    nextionId?: Ref<nextion_Nextion>;
    /**
     * [Color](/components/display#config-color): The background color
     * @yamlKey background_color
     */
    backgroundColor?: Ref<Color>;
    /**
     * [Color](/components/display#config-color): The foreground color
     * @yamlKey foreground_color
     */
    foregroundColor?: Ref<Color>;
    /** boolean: Visible or not */
    visible?: boolean;
    /**
     * string: The name of the Nextion component.
     * @yamlKey component_name
     */
    componentName?: unknown;
    /**
     * string: The name of the Nextion variable. Any value over `0` is considered to be on
     * @yamlKey variable_name
     */
    variableName?: unknown;
}
//  packet_transport.binary_sensor.STATUS_SENSOR_SCHEMA
export interface _PacketTransportBinarySensorStatusSensor extends _BinarySensor {
    /** @yamlKey transport_id */
    transportId?: Ref<packet_transport_PacketTransport>;
    /** string: The name of the provider node. */
    provider: unknown;
}
//  touchscreen.TOUCHSCREEN_SCHEMA
export interface _Touchscreen extends _CoreComponent {
    /** [ID](/guides/configuration-types#id): The display to use this touchscreen with. */
    display?: Ref<display_Display>;
    /** Transform the touchscreen presentation using hardware. All defaults are `false`. */
    transform?: TouchscreenTransformProps;
    /**
     * [Time](/guides/configuration-types#time): A timeout for touchscreens that do not report the end of touch. The default...
     * @yamlKey touch_timeout
     */
    touchTimeout?: TouchscreenTouchTimeoutProps;
    /** Some touchscreens require calibration on a per-device basis. */
    calibration?: TouchscreenCalibrationProps;
    /**
     * [Automation](/automations): An automation to perform when the touchscreen is touched. See [`on_touch` Trigger](https:...
     * @yamlKey on_touch
     */
    onTouch?: () => void;
    /**
     * [Automation](/automations): An automation to perform when the touchscreen is touched. See [`on_update` Trigger](https...
     * @yamlKey on_update
     */
    onUpdate?: () => void;
    /**
     * [Automation](/automations): An automation to perform when the touchscreen is no longer touched. See [`on_release` Tri...
     * @yamlKey on_release
     */
    onRelease?: () => void;
    /**
     * [Time](/guides/configuration-types#time): The touchscreen polling interval - used only if an interrupt pin is not in ...
     * @yamlKey update_interval
     */
    updateInterval?: unknown;
}
//  modbus_controller.ModbusItemBaseSchema
export interface _ModbusControllerModbusitembaseschema {
    /** @yamlKey modbus_controller_id */
    modbusControllerId?: Ref<modbus_controller_ModbusController>;
    address?: number;
    /** @yamlKey custom_command */
    customCommand?: Array<unknown>;
    offset?: number;
    /** @yamlKey byte_offset */
    byteOffset?: number;
    bitmask?: unknown;
    /** @yamlKey skip_updates */
    skipUpdates?: number;
    /** @yamlKey force_new_range */
    forceNewRange?: boolean;
    lambda?: unknown;
    /** @yamlKey response_size */
    responseSize?: number;
}
//  msa3xx.MSA_SENSOR_SCHEMA
export interface _Msa3xxMsaSensor {
    /** @yamlKey msa3xx_id */
    msa3xxId?: Ref<msa3xx_MSA3xxComponent>;
}
//  pipsolar.PIPSOLAR_COMPONENT_SCHEMA
export interface _PipsolarComponent {
    /** @yamlKey pipsolar_id */
    pipsolarId: Ref<pipsolar_Pipsolar>;
}
//  button._BUTTON_SCHEMA
export interface _Button extends _CoreEntityBase, _CoreMqttCommandComponent {
    /** @yamlKey web_server */
    webServer?: ButtonWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "" | "identify" | "restart" | "update";
    /** @yamlKey on_press */
    onPress?: () => void;
}
//  canbus.CANBUS_SCHEMA
export interface _Canbus extends _CoreComponent {
    /** @yamlKey can_id */
    canId: number;
    /** @yamlKey bit_rate */
    bitRate?: "1KBPS" | "5KBPS" | "10KBPS" | "12K5BPS" | "16KBPS" | "20KBPS" | "25KBPS" | "31K25BPS" | "33KBPS" | "40KBPS" | "50KBPS" | "80KBPS" | "83K3BPS" | "95KBPS" | "100KBPS" | "125KBPS" | "200KBPS" | "250KBPS" | "500KBPS" | "800KBPS" | "1000KBPS";
    /** @yamlKey use_extended_id */
    useExtendedId?: boolean;
    /** @yamlKey on_frame */
    onFrame?: () => void;
}
//  climate._CLIMATE_SCHEMA
export interface _Climate extends _CoreEntityBase, _CoreMqttCommandComponent {
    /** @yamlKey web_server */
    webServer?: ClimateWebServerProps;
    visual?: ClimateVisualProps;
    /** @yamlKey action_state_topic */
    actionStateTopic?: unknown;
    /** @yamlKey away_command_topic */
    awayCommandTopic?: unknown;
    /** @yamlKey away_state_topic */
    awayStateTopic?: unknown;
    /** @yamlKey current_temperature_state_topic */
    currentTemperatureStateTopic?: unknown;
    /** @yamlKey current_humidity_state_topic */
    currentHumidityStateTopic?: unknown;
    /** @yamlKey fan_mode_command_topic */
    fanModeCommandTopic?: unknown;
    /** @yamlKey fan_mode_state_topic */
    fanModeStateTopic?: unknown;
    /** @yamlKey mode_command_topic */
    modeCommandTopic?: unknown;
    /** @yamlKey mode_state_topic */
    modeStateTopic?: unknown;
    /** @yamlKey preset_command_topic */
    presetCommandTopic?: unknown;
    /** @yamlKey preset_state_topic */
    presetStateTopic?: unknown;
    /** @yamlKey swing_mode_command_topic */
    swingModeCommandTopic?: unknown;
    /** @yamlKey swing_mode_state_topic */
    swingModeStateTopic?: unknown;
    /** @yamlKey target_temperature_command_topic */
    targetTemperatureCommandTopic?: unknown;
    /** @yamlKey target_temperature_state_topic */
    targetTemperatureStateTopic?: unknown;
    /** @yamlKey target_temperature_high_command_topic */
    targetTemperatureHighCommandTopic?: unknown;
    /** @yamlKey target_temperature_high_state_topic */
    targetTemperatureHighStateTopic?: unknown;
    /** @yamlKey target_temperature_low_command_topic */
    targetTemperatureLowCommandTopic?: unknown;
    /** @yamlKey target_temperature_low_state_topic */
    targetTemperatureLowStateTopic?: unknown;
    /** @yamlKey target_humidity_command_topic */
    targetHumidityCommandTopic?: unknown;
    /** @yamlKey target_humidity_state_topic */
    targetHumidityStateTopic?: unknown;
    /** @yamlKey on_control */
    onControl?: () => void;
    /** @yamlKey on_state */
    onState?: () => void;
}
//  bedjet.BEDJET_CLIENT_SCHEMA
export interface _BedjetClient {
    /**
     * [ID](/guides/configuration-types#id): The ID of the Bedjet component.
     * @yamlKey bedjet_id
     */
    bedjetId?: Ref<bedjet_BedJetHub>;
}
//  uponor_smatrix.UPONOR_SMATRIX_DEVICE_SCHEMA
export interface _UponorSmatrixDevice {
    /**
     * [ID](/guides/configuration-types#id): Manually specify the ID of the `uponor_smatrix` hub component if you want to us...
     * @yamlKey uponor_smatrix_id
     */
    uponorSmatrixId?: Ref<uponor_smatrix_UponorSmatrixComponent>;
    /** int: The 32 bit device address of the thermostat. See [Getting started](https://esphome.io/components/uponor_smatrix#... */
    address: unknown;
}
//  cover._COVER_SCHEMA
export interface _Cover extends _CoreEntityBase, _CoreMqttCommandComponent {
    /** @yamlKey web_server */
    webServer?: CoverWebServerProps;
    /** @yamlKey mqtt_json_state_payload */
    mqttJsonStatePayload?: boolean;
    /** @yamlKey device_class */
    deviceClass?: "awning" | "blind" | "curtain" | "damper" | "door" | "" | "garage" | "gate" | "shade" | "shutter" | "window";
    /** @yamlKey position_command_topic */
    positionCommandTopic?: unknown;
    /** @yamlKey position_state_topic */
    positionStateTopic?: unknown;
    /** @yamlKey tilt_command_topic */
    tiltCommandTopic?: unknown;
    /** @yamlKey tilt_state_topic */
    tiltStateTopic?: unknown;
    /** @yamlKey on_open */
    onOpen?: () => void;
    /** @yamlKey on_opened */
    onOpened?: () => void;
    /** @yamlKey on_closed */
    onClosed?: () => void;
    /** @yamlKey on_closing */
    onClosing?: () => void;
    /** @yamlKey on_opening */
    onOpening?: () => void;
    /** @yamlKey on_idle */
    onIdle?: () => void;
}
//  display.FULL_DISPLAY_SCHEMA
export interface _DisplayFullDisplay extends _DisplayBasicDisplay {
    /** Set the rotation of the display. Everything you draw in `lambda:` will be rotated by this option. One of `0°` (defaul... */
    rotation?: unknown;
    /** list: Show pages instead of a single lambda. See [Display Pages](/components/display#display-pages). */
    pages?: Array<DisplayFullDisplayPagesProps>;
    /** @yamlKey on_page_change */
    onPageChange?: () => void;
    /**
     * boolean: If the display should be cleared before each update. Defaults to `true` if a lambda or pages are configured,...
     * @yamlKey auto_clear_enabled
     */
    autoClearEnabled?: unknown;
    /** @yamlKey show_test_card */
    showTestCard?: boolean;
}
//  display.BASIC_DISPLAY_SCHEMA
export interface _DisplayBasicDisplay extends _CoreComponent {
    /** [lambda](/automations/templates#config-lambda): The lambda to use for rendering the content on the display. See [Disp... */
    lambda?: unknown;
    /**
     * [Time](/guides/configuration-types#time): The interval to re-draw the screen. Defaults to `5s`.
     * @yamlKey update_interval
     */
    updateInterval?: unknown;
}
//  ble_client.BLE_CLIENT_SCHEMA
export interface _BleClient {
    /**
     * [ID](/guides/configuration-types#id): ID of the associated BLE client.
     * @yamlKey ble_client_id
     */
    bleClientId?: Ref<ble_client_BLEClient>;
}
//  qspi_dbi.display.BASE_SCHEMA
export interface _QspiDbiDisplayBase extends _DisplayFullDisplay {
    /**
     * A list of byte arrays: Specifies the init sequence for the display. This is required when using the `CUSTOM` model - ...
     * @yamlKey init_sequence
     */
    initSequence?: Array<unknown>;
    /** Dimensions of the screen, specified either as *width* x *height* (e.g `320x240` ) or with separate config keys. */
    dimensions: QspiDbiDisplayBaseDimensionsProps;
    /**
     * boolean: When set, all partial display updates will start at the origin (0,0). Defaults to false.
     * @yamlKey draw_from_origin
     */
    drawFromOrigin?: boolean;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The RESET pin.
     * @yamlKey reset_pin
     */
    resetPin?: Pin;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The display enable pin.
     * @yamlKey enable_pin
     */
    enablePin?: Pin;
    /** int: A brightness value in the range 0-255 */
    brightness?: number;
    /** @yamlKey spi_id */
    spiId?: Ref<spi_QuadSPIComponent>;
    /**
     * int: Set the data rate of the SPI interface to the display. One of `80MHz`, `40MHz`, `20MHz`, `10MHz` (default), `5MH...
     * @yamlKey data_rate
     */
    dataRate?: unknown;
    /**
     * Set the mode for the SPI interface to the display. Default is `MODE0`.
     * @yamlKey spi_mode
     */
    spiMode?: "0" | "1" | "2" | "3" | "MODE0" | "MODE1" | "MODE2" | "MODE3";
    /** @yamlKey release_device */
    releaseDevice?: boolean;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): The chip select pin.
     * @yamlKey cs_pin
     */
    csPin?: Pin;
}
//  fan._FAN_SCHEMA
export interface _Fan extends _CoreEntityBase, _CoreMqttCommandComponent {
    /** @yamlKey web_server */
    webServer?: FanWebServerProps;
    /** @yamlKey restore_mode */
    restoreMode?: "NO_RESTORE" | "ALWAYS_OFF" | "ALWAYS_ON" | "RESTORE_DEFAULT_OFF" | "RESTORE_DEFAULT_ON" | "RESTORE_INVERTED_DEFAULT_OFF" | "RESTORE_INVERTED_DEFAULT_ON";
    /** @yamlKey direction_state_topic */
    directionStateTopic?: unknown;
    /** @yamlKey direction_command_topic */
    directionCommandTopic?: unknown;
    /** @yamlKey oscillation_state_topic */
    oscillationStateTopic?: unknown;
    /** @yamlKey oscillation_command_topic */
    oscillationCommandTopic?: unknown;
    /** @yamlKey speed_level_state_topic */
    speedLevelStateTopic?: unknown;
    /** @yamlKey speed_level_command_topic */
    speedLevelCommandTopic?: unknown;
    /** @yamlKey speed_state_topic */
    speedStateTopic?: unknown;
    /** @yamlKey speed_command_topic */
    speedCommandTopic?: unknown;
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_turn_on */
    onTurnOn?: () => void;
    /** @yamlKey on_turn_off */
    onTurnOff?: () => void;
    /** @yamlKey on_direction_set */
    onDirectionSet?: () => void;
    /** @yamlKey on_oscillating_set */
    onOscillatingSet?: () => void;
    /** @yamlKey on_speed_set */
    onSpeedSet?: () => void;
    /** @yamlKey on_preset_set */
    onPresetSet?: () => void;
}
//  light.ADDRESSABLE_LIGHT_SCHEMA
export interface _LightAddressableLight extends _LightRgbLight {
    /** @yamlKey color_correct */
    colorCorrect?: unknown;
    /** @yamlKey power_supply */
    powerSupply?: Ref<power_supply_PowerSupply>;
}
//  light.RGB_LIGHT_SCHEMA
export interface _LightRgbLight extends _LightBrightnessOnlyLight {
}
//  light.BRIGHTNESS_ONLY_LIGHT_SCHEMA
export interface _LightBrightnessOnlyLight extends _Light {
    /** @yamlKey gamma_correct */
    gammaCorrect?: unknown;
    /** @yamlKey default_transition_length */
    defaultTransitionLength?: LightBrightnessOnlyLightDefaultTransitionLengthProps;
    /** @yamlKey flash_transition_length */
    flashTransitionLength?: LightBrightnessOnlyLightFlashTransitionLengthProps;
    effects?: unknown;
}
//  light.LIGHT_SCHEMA
export interface _Light extends _CoreEntityBase, _CoreMqttCommandComponent {
    /** @yamlKey web_server */
    webServer?: LightWebServerProps;
    /**
     * Control how the light attempts to restore state on bootup.
     * @yamlKey restore_mode
     */
    restoreMode?: "RESTORE_DEFAULT_OFF" | "RESTORE_DEFAULT_ON" | "ALWAYS_OFF" | "ALWAYS_ON" | "RESTORE_INVERTED_DEFAULT_OFF" | "RESTORE_INVERTED_DEFAULT_ON" | "RESTORE_AND_OFF" | "RESTORE_AND_ON";
    /**
     * [Action](/automations/actions#all-actions): An automation to perform when the light is turned on. See [`light.on_turn...
     * @yamlKey on_turn_on
     */
    onTurnOn?: () => void;
    /**
     * [Action](/automations/actions#all-actions): An automation to perform when the light is turned off. See [`light.on_tur...
     * @yamlKey on_turn_off
     */
    onTurnOff?: () => void;
    /**
     * [Action](/automations/actions#all-actions): An automation to perform when the light's set state is changed. See [`lig...
     * @yamlKey on_state
     */
    onState?: () => void;
    /**
     * The initial state the light should be set to on bootup. This state will be applied when the state is not restored bas...
     * @yamlKey initial_state
     */
    initialState?: LightInitialStateProps;
}
//  light.BINARY_LIGHT_SCHEMA
export interface _LightBinaryLight extends _Light {
    effects?: unknown;
}
//  media_player._MEDIA_PLAYER_SCHEMA
export interface _MediaPlayer extends _CoreEntityBase {
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_idle */
    onIdle?: () => void;
    /** @yamlKey on_play */
    onPlay?: () => void;
    /** @yamlKey on_pause */
    onPause?: () => void;
    /** @yamlKey on_announcement */
    onAnnouncement?: () => void;
    /**
     * [Automation](/automations): An automation to perform when media_player is turned on, implements the `supports_turn_of...
     * @yamlKey on_turn_on
     */
    onTurnOn?: () => void;
    /**
     * [Automation](/automations): An automation to perform when media_player is turned off, implements the `supports_turn_o...
     * @yamlKey on_turn_off
     */
    onTurnOff?: () => void;
}
//  ota.BASE_OTA_SCHEMA
export interface _OtaBaseOta {
    /** @yamlKey on_state_change */
    onStateChange?: () => void;
    /** @yamlKey on_abort */
    onAbort?: () => void;
    /** @yamlKey on_begin */
    onBegin?: () => void;
    /** @yamlKey on_end */
    onEnd?: () => void;
    /** @yamlKey on_error */
    onError?: () => void;
    /** @yamlKey on_progress */
    onProgress?: () => void;
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
//  output.BINARY_OUTPUT_SCHEMA
export interface _OutputBinaryOutput {
    /** @yamlKey power_supply */
    powerSupply?: Ref<power_supply_PowerSupply>;
    inverted?: boolean;
}
//  emc2101.EMC2101_COMPONENT_SCHEMA
export interface _Emc2101Component {
    /** @yamlKey emc2101_id */
    emc2101Id?: Ref<emc2101_Emc2101Component>;
}
//  sensor._SENSOR_SCHEMA
export interface _Sensor extends _CoreEntityBase, _CoreMqttComponent {
    /** @yamlKey web_server */
    webServer?: SensorWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: Ref<zigbee_ZigbeeComponent>;
    /** @yamlKey unit_of_measurement */
    unitOfMeasurement?: string;
    /** @yamlKey accuracy_decimals */
    accuracyDecimals?: number;
    /** @yamlKey device_class */
    deviceClass?: "absolute_humidity" | "apparent_power" | "aqi" | "area" | "atmospheric_pressure" | "battery" | "blood_glucose_concentration" | "carbon_dioxide" | "carbon_monoxide" | "conductivity" | "current" | "data_rate" | "data_size" | "date" | "distance" | "duration" | "" | "energy" | "energy_distance" | "energy_storage" | "frequency" | "gas" | "humidity" | "illuminance" | "irradiance" | "moisture" | "monetary" | "nitrogen_dioxide" | "nitrogen_monoxide" | "nitrous_oxide" | "ozone" | "ph" | "pm1" | "pm10" | "pm25" | "pm4" | "power" | "power_factor" | "precipitation" | "precipitation_intensity" | "pressure" | "reactive_energy" | "reactive_power" | "signal_strength" | "sound_pressure" | "speed" | "sulphur_dioxide" | "temperature" | "temperature_delta" | "timestamp" | "volatile_organic_compounds" | "volatile_organic_compounds_parts" | "voltage" | "volume" | "volume_flow_rate" | "volume_storage" | "water" | "weight" | "wind_direction" | "wind_speed";
    /** @yamlKey state_class */
    stateClass?: "" | "measurement" | "total_increasing" | "total" | "measurement_angle";
    /** @yamlKey force_update */
    forceUpdate?: boolean;
    /** @yamlKey expire_after */
    expireAfter?: SensorExpireAfterProps;
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: () => void;
    /** @yamlKey on_raw_value */
    onRawValue?: () => void;
    /** @yamlKey on_value_range */
    onValueRange?: () => void;
}
//  nextion.sensor.CONFIG_SENSOR_COMPONENT_SCHEMA
export interface _NextionSensorConfigSensorComponent extends _NextionBinarySensorConfigBinarySensor {
    /** @yamlKey font_id */
    fontId?: number;
}
//  pylontech.PYLONTECH_COMPONENT_SCHEMA
export interface _PylontechComponent {
    /**
     * Manually specify the ID of the pylontech instance if there are multiple.
     * @yamlKey pylontech_id
     */
    pylontechId?: Ref<pylontech_PylontechComponent>;
    /** Which battery to monitor. 1 stands for the main battery, 2..16 for child batteries. */
    battery: number;
}
//  teleinfo.TELEINFO_LISTENER_SCHEMA
export interface _TeleinfoListener {
    /** @yamlKey teleinfo_id */
    teleinfoId?: Ref<teleinfo_TeleInfo>;
    /** @yamlKey tag_name */
    tagName: string;
}
//  speaker.SPEAKER_SCHEMA
export interface _Speaker {
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
    /**
     * [ID](/guides/configuration-types#id): The [audio DAC](/components/audio_dac/) to use for volume control.
     * @yamlKey audio_dac
     */
    audioDac?: Ref<audio_dac_AudioDac>;
}
//  i2s_audio.speaker.BASE_SCHEMA
export interface _I2sAudioSpeakerBase extends _Speaker, _CoreComponent {
    /** @yamlKey i2s_audio_id */
    i2sAudioId?: Ref<i2s_audio_I2SAudioComponent>;
    channel?: "mono" | "left" | "right" | "stereo";
    /** @yamlKey i2s_mode */
    i2sMode?: "primary" | "secondary";
    /** @yamlKey use_apll */
    useApll?: boolean;
    /** @yamlKey bits_per_channel */
    bitsPerChannel?: "8" | "16" | "24" | "32" | "default";
    /** @yamlKey mclk_multiple */
    mclkMultiple?: "128" | "256" | "384" | "512";
    /** @yamlKey buffer_duration */
    bufferDuration?: I2sAudioSpeakerBaseBufferDurationProps;
    timeout?: "never";
}
//  stepper.STEPPER_SCHEMA
export interface _Stepper {
    /**
     * float: The maximum speed in `steps/s` (steps per seconds) to drive the stepper at. Note most steppers can't step prop...
     * @yamlKey max_speed
     */
    maxSpeed: unknown;
    /** float: The acceleration in `steps/s^2` (steps per seconds squared) to use when starting to move. The default is `inf`... */
    acceleration?: unknown;
    /** float: The same as `acceleration`, but for when the motor is decelerating shortly before reaching the set position. D... */
    deceleration?: unknown;
}
//  text_sensor._TEXT_SENSOR_SCHEMA
export interface _TextSensor extends _CoreEntityBase, _CoreMqttComponent {
    /** @yamlKey web_server */
    webServer?: TextSensorWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "date" | "" | "timestamp";
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: () => void;
    /** @yamlKey on_raw_value */
    onRawValue?: () => void;
}
//  time.TIME_SCHEMA
export interface _Time extends _CoreComponent {
    /** string: Manually tell ESPHome what time zone to use with [this format](https://www.gnu.org/software/libc/manual/html_... */
    timezone?: unknown;
    /**
     * [Automation](/automations): Automation to run at specific intervals using a cron-like syntax. See [`on_time` Trigger]...
     * @yamlKey on_time
     */
    onTime?: () => void;
    /**
     * [Automation](/automations): Automation to run when the time source could be (re-)synchronized.. See [`on_time_sync` T...
     * @yamlKey on_time_sync
     */
    onTimeSync?: () => void;
    /**
     * [Time](/guides/configuration-types#time): How often to synchronize the device time from the source. Defaults to `15min`.
     * @yamlKey update_interval
     */
    updateInterval?: unknown;
}
//  datetime._DATETIME_SCHEMA
export interface _Datetime extends _CoreEntityBase, _CoreMqttCommandComponent {
    /** @yamlKey on_value */
    onValue?: () => void;
    /** @yamlKey time_id */
    timeId?: Ref<time_RealTimeClock>;
    /** @yamlKey web_server */
    webServer?: DatetimeWebServerProps;
}
//  template.datetime._BASE_SCHEMA
export interface _TemplateDatetime_Base extends _CoreComponent {
    /** [lambda](/automations/templates#config-lambda): Lambda to be evaluated every update interval to get the current value... */
    lambda?: unknown;
    /** boolean: Whether to operate in optimistic mode - when in this mode, any command sent to the template datetime will im... */
    optimistic?: boolean;
    /**
     * [Action](/automations/actions#all-actions): The action that should be performed when the remote (like Home Assistant'...
     * @yamlKey set_action
     */
    setAction?: () => void;
    /**
     * boolean: Saves and loads the state to RTC/Flash. Cannot be used with `lambda`. Defaults to `false`.
     * @yamlKey restore_value
     */
    restoreValue?: boolean;
    /**
     * [Time](/guides/configuration-types#time): The interval on which to update the datetime by executing the `lambda`. Def...
     * @yamlKey update_interval
     */
    updateInterval?: unknown;
}
//  event._EVENT_SCHEMA
export interface _Event extends _CoreEntityBase, _CoreMqttComponent {
    /** @yamlKey web_server */
    webServer?: EventWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "button" | "doorbell" | "" | "motion";
    /** @yamlKey on_event */
    onEvent?: () => void;
}
//  lock._LOCK_SCHEMA
export interface _Lock extends _CoreEntityBase, _CoreMqttCommandComponent {
    /** @yamlKey web_server */
    webServer?: LockWebServerProps;
    /** @yamlKey on_lock */
    onLock?: () => void;
    /** @yamlKey on_unlock */
    onUnlock?: () => void;
}
//  i2s_audio.microphone.BASE_SCHEMA
export interface _I2sAudioMicrophoneBase extends _Microphone, _CoreComponent {
    /** @yamlKey i2s_audio_id */
    i2sAudioId?: Ref<i2s_audio_I2SAudioComponent>;
    channel?: "mono" | "left" | "right" | "stereo";
    /** @yamlKey i2s_mode */
    i2sMode?: "primary" | "secondary";
    /** @yamlKey use_apll */
    useApll?: boolean;
    /** @yamlKey bits_per_channel */
    bitsPerChannel?: "8" | "16" | "24" | "32" | "default";
    /** @yamlKey mclk_multiple */
    mclkMultiple?: "128" | "256" | "384" | "512";
    /** @yamlKey correct_dc_offset */
    correctDcOffset?: boolean;
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
    /** @yamlKey sample_rate */
    sampleRate?: number;
    /**
     * [Automation](/automations): An automation to perform when new data is received.
     * @yamlKey on_data
     */
    onData?: () => void;
}
//  number._NUMBER_SCHEMA
export interface _Number extends _CoreEntityBase, _CoreMqttCommandComponent {
    /** @yamlKey web_server */
    webServer?: NumberWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: Ref<zigbee_ZigbeeComponent>;
    /** @yamlKey on_value */
    onValue?: () => void;
    /** @yamlKey on_value_range */
    onValueRange?: () => void;
    /** @yamlKey unit_of_measurement */
    unitOfMeasurement?: string;
    mode?: "AUTO" | "BOX" | "SLIDER";
    /** @yamlKey device_class */
    deviceClass?: "absolute_humidity" | "apparent_power" | "aqi" | "area" | "atmospheric_pressure" | "battery" | "blood_glucose_concentration" | "carbon_dioxide" | "carbon_monoxide" | "conductivity" | "current" | "data_rate" | "data_size" | "distance" | "duration" | "" | "energy" | "energy_distance" | "energy_storage" | "frequency" | "gas" | "humidity" | "illuminance" | "irradiance" | "moisture" | "monetary" | "nitrogen_dioxide" | "nitrogen_monoxide" | "nitrous_oxide" | "ozone" | "ph" | "pm1" | "pm10" | "pm25" | "pm4" | "power" | "power_factor" | "precipitation" | "precipitation_intensity" | "pressure" | "reactive_energy" | "reactive_power" | "signal_strength" | "sound_pressure" | "speed" | "sulphur_dioxide" | "temperature" | "temperature_delta" | "volatile_organic_compounds" | "volatile_organic_compounds_parts" | "voltage" | "volume" | "volume_flow_rate" | "volume_storage" | "water" | "weight" | "wind_direction" | "wind_speed";
}
//  homeassistant.HOME_ASSISTANT_IMPORT_CONTROL_SCHEMA
export interface _HomeassistantHomeAssistantImportControl {
    /**
     * string: The entity ID to import / control from Home Assistant.
     * @yamlKey entity_id
     */
    entityId: unknown;
    internal?: boolean;
}
//  packet_transport.TRANSPORT_SCHEMA
export interface _PacketTransportTransport extends _CoreComponent, _PacketTransportEncryption {
    /** @yamlKey update_interval */
    updateInterval?: unknown;
    /** @yamlKey rolling_code_enable */
    rollingCodeEnable?: boolean;
    /** @yamlKey ping_pong_enable */
    pingPongEnable?: boolean;
    /** @yamlKey ping_pong_recycle_time */
    pingPongRecycleTime?: PacketTransportTransportPingPongRecycleTimeProps;
    sensors?: Array<PacketTransportTransportSensorsProps>;
    /** @yamlKey binary_sensors */
    binarySensors?: Array<PacketTransportTransportBinarySensorsProps>;
    providers?: Array<PacketTransportTransportProvidersProps>;
}
//  packet_transport.ENCRYPTION_SCHEMA
export interface _PacketTransportEncryption {
    encryption?: PacketTransportEncryptionEncryptionProps;
}
//  udp.UDP_SCHEMA
export interface _Udp {
    /** @yamlKey udp_id */
    udpId?: Ref<udp_UDPComponent>;
}
//  select._SELECT_SCHEMA
export interface _Select extends _CoreEntityBase, _CoreMqttCommandComponent {
    /** @yamlKey web_server */
    webServer?: SelectWebServerProps;
    /** @yamlKey on_value */
    onValue?: () => void;
}
//  switch._SWITCH_SCHEMA
export interface _Switch extends _CoreEntityBase, _CoreMqttCommandComponent {
    /** @yamlKey web_server */
    webServer?: SwitchWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: Ref<zigbee_ZigbeeComponent>;
    inverted?: boolean;
    /** @yamlKey restore_mode */
    restoreMode?: "RESTORE_DEFAULT_OFF" | "RESTORE_DEFAULT_ON" | "ALWAYS_OFF" | "ALWAYS_ON" | "RESTORE_INVERTED_DEFAULT_OFF" | "RESTORE_INVERTED_DEFAULT_ON" | "DISABLED";
    /** @yamlKey on_state */
    onState?: () => void;
    /** @yamlKey on_turn_on */
    onTurnOn?: () => void;
    /** @yamlKey on_turn_off */
    onTurnOff?: () => void;
    /** @yamlKey device_class */
    deviceClass?: "" | "outlet" | "switch";
}
//  text._TEXT_SCHEMA
export interface _Text extends _CoreEntityBase, _CoreMqttComponent {
    /** @yamlKey web_server */
    webServer?: TextWebServerProps;
    /** @yamlKey on_value */
    onValue?: () => void;
    mode: "TEXT" | "PASSWORD";
}
//  esp32_hosted.update.BASE_SCHEMA
export interface _Esp32HostedUpdateBase extends _Update, _CoreComponent {
    /** @yamlKey update_interval */
    updateInterval?: unknown;
}
//  update._UPDATE_SCHEMA
export interface _Update extends _CoreEntityBase, _CoreMqttCommandComponent {
    /** @yamlKey web_server */
    webServer?: UpdateWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "" | "firmware";
    /** @yamlKey on_update_available */
    onUpdateAvailable?: () => void;
}
//  valve._VALVE_SCHEMA
export interface _Valve extends _CoreEntityBase, _CoreMqttCommandComponent {
    /** @yamlKey web_server */
    webServer?: ValveWebServerProps;
    /** @yamlKey device_class */
    deviceClass?: "" | "gas" | "water";
    /** @yamlKey position_command_topic */
    positionCommandTopic?: unknown;
    /** @yamlKey position_state_topic */
    positionStateTopic?: unknown;
    /** @yamlKey on_open */
    onOpen?: () => void;
    /** @yamlKey on_closed */
    onClosed?: () => void;
}
//  water_heater._WATER_HEATER_SCHEMA
export interface _WaterHeater extends _CoreEntityBase {
    visual?: WaterHeaterVisualProps;
}
