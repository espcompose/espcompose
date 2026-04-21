// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TimePeriod, TriggerHandler } from "../../types";
import type { _CoreComponent, _LightAddressableLight, _LightBinaryLight, _LightBrightnessOnlyLight, _LightRgbLight } from "../bases";
import type { __marker_Device, __marker_beken_spi_led_strip_BekenSPILEDStripLightOutput, __marker_binary_BinaryLightOutput, __marker_color_temperature_CTLightOutput, __marker_cwww_CWWWLightOutput, __marker_esp32_rmt_led_strip_ESP32RMTLEDStripLightOutput, __marker_hbridge_HBridgeLightOutput, __marker_light_AddressableLightState, __marker_light_LightState, __marker_lv_led_t, __marker_lvgl_LVLight, __marker_m5stack_8angle_M5Stack8AngleComponent, __marker_m5stack_8angle_M5Stack8AngleLightOutput, __marker_monochromatic_MonochromaticLightOutput, __marker_neopixelbus_NeoPixelBusLightOutputBase, __marker_output_BinaryOutput, __marker_output_FloatOutput, __marker_partition_PartitionLightOutput, __marker_rgb_RGBLightOutput, __marker_rgbct_RGBCTLightOutput, __marker_rgbw_RGBWLightOutput, __marker_rgbww_RGBWWLightOutput, __marker_rp2040_pio_led_strip_RP2040PIOLEDStripLightOutput, __marker_shelly_dimmer_ShellyDimmer, __marker_sonoff_d1_SonoffD1Output, __marker_spi_SPIComponent, __marker_spi_led_strip_SpiLedStrip, __marker_status_led_StatusLEDLightOutput, __marker_tuya_Tuya, __marker_tuya_TuyaLight, __marker_uart_UARTComponent, __marker_web_server_WebServer, __marker_zigbee_ZigbeeComponent } from "../markers";
interface PartitionSegmentsProps {
    /** int: The index of the first LED to address in the segment. Counting starts with 0, so first LED is 0. */
    from: number;
    /** [ID](https://esphome.io/guides/configuration-types#id): The ID of the addressable light to be controlled by this segm... */
    id: RefProp<__marker_light_AddressableLightState>;
    /** boolean: Whether to reverse the order of LEDs in this segment. Defaults to `false`. */
    reversed?: boolean;
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): The ID of a single addressable or non-addressable light. If a...
     * @yamlKey single_light_id
     */
    singleLightId: RefProp<__marker_light_LightState>;
    /** int: The index of the last LED to address in this segment. */
    to: number;
}
interface ShellyDimmerCurrentPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface ShellyDimmerCurrentPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface ShellyDimmerCurrentProps {
    /**
     * int: Set the number of digits after the decimal point that data consumers should use. While this does not change the ...
     * @yamlKey accuracy_decimals
     */
    accuracyDecimals?: number;
    availability?: ShellyDimmerCurrentPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/sensor/#device-class](https:...
     * @yamlKey device_class
     */
    deviceClass?: "" | "absolute_humidity" | "apparent_power" | "aqi" | "area" | "atmospheric_pressure" | "battery" | "blood_glucose_concentration" | "carbon_dioxide" | "carbon_monoxide" | "conductivity" | "current" | "data_rate" | "data_size" | "date" | "distance" | "duration" | "energy" | "energy_distance" | "energy_storage" | "frequency" | "gas" | "humidity" | "illuminance" | "irradiance" | "moisture" | "monetary" | "nitrogen_dioxide" | "nitrogen_monoxide" | "nitrous_oxide" | "ozone" | "ph" | "pm1" | "pm10" | "pm25" | "pm4" | "power" | "power_factor" | "precipitation" | "precipitation_intensity" | "pressure" | "reactive_energy" | "reactive_power" | "signal_strength" | "sound_pressure" | "speed" | "sulphur_dioxide" | "temperature" | "temperature_delta" | "timestamp" | "volatile_organic_compounds" | "volatile_organic_compounds_parts" | "voltage" | "volume" | "volume_flow_rate" | "volume_storage" | "water" | "weight" | "wind_direction" | "wind_speed";
    /** @yamlKey device_id */
    deviceId?: RefProp<__marker_Device>;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    discovery?: boolean;
    /**
     * string: The category of the entity. See [https://developers.home-assistant.io/docs/core/entity/#generic-properties](h...
     * @yamlKey entity_category
     */
    entityCategory?: "" | "diagnostic";
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
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a raw value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler;
    qos?: unknown;
    retain?: boolean;
    /**
     * string: The state class for the sensor. See [https://developers.home-assistant.io/docs/core/entity/sensor/#available-...
     * @yamlKey state_class
     */
    stateClass?: "" | "measurement" | "measurement_angle" | "total" | "total_increasing";
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement the sensor should advertise its values with. This does not actually do a...
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: ShellyDimmerCurrentPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface ShellyDimmerFirmwareProps {
    sha256?: unknown;
    update?: boolean;
    url?: unknown;
    version: unknown;
}
interface ShellyDimmerPowerPropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface ShellyDimmerPowerPropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface ShellyDimmerPowerProps {
    /**
     * int: Set the number of digits after the decimal point that data consumers should use. While this does not change the ...
     * @yamlKey accuracy_decimals
     */
    accuracyDecimals?: number;
    availability?: ShellyDimmerPowerPropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/sensor/#device-class](https:...
     * @yamlKey device_class
     */
    deviceClass?: "" | "absolute_humidity" | "apparent_power" | "aqi" | "area" | "atmospheric_pressure" | "battery" | "blood_glucose_concentration" | "carbon_dioxide" | "carbon_monoxide" | "conductivity" | "current" | "data_rate" | "data_size" | "date" | "distance" | "duration" | "energy" | "energy_distance" | "energy_storage" | "frequency" | "gas" | "humidity" | "illuminance" | "irradiance" | "moisture" | "monetary" | "nitrogen_dioxide" | "nitrogen_monoxide" | "nitrous_oxide" | "ozone" | "ph" | "pm1" | "pm10" | "pm25" | "pm4" | "power" | "power_factor" | "precipitation" | "precipitation_intensity" | "pressure" | "reactive_energy" | "reactive_power" | "signal_strength" | "sound_pressure" | "speed" | "sulphur_dioxide" | "temperature" | "temperature_delta" | "timestamp" | "volatile_organic_compounds" | "volatile_organic_compounds_parts" | "voltage" | "volume" | "volume_flow_rate" | "volume_storage" | "water" | "weight" | "wind_direction" | "wind_speed";
    /** @yamlKey device_id */
    deviceId?: RefProp<__marker_Device>;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    discovery?: boolean;
    /**
     * string: The category of the entity. See [https://developers.home-assistant.io/docs/core/entity/#generic-properties](h...
     * @yamlKey entity_category
     */
    entityCategory?: "" | "diagnostic";
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
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a raw value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler;
    qos?: unknown;
    retain?: boolean;
    /**
     * string: The state class for the sensor. See [https://developers.home-assistant.io/docs/core/entity/sensor/#available-...
     * @yamlKey state_class
     */
    stateClass?: "" | "measurement" | "measurement_angle" | "total" | "total_increasing";
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement the sensor should advertise its values with. This does not actually do a...
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: ShellyDimmerPowerPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface ShellyDimmerVoltagePropsAvailabilityProps {
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
    topic: unknown;
}
interface ShellyDimmerVoltagePropsWebServerProps {
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey web_server_id */
    webServerId?: RefProp<__marker_web_server_WebServer>;
}
interface ShellyDimmerVoltageProps {
    /**
     * int: Set the number of digits after the decimal point that data consumers should use. While this does not change the ...
     * @yamlKey accuracy_decimals
     */
    accuracyDecimals?: number;
    availability?: ShellyDimmerVoltagePropsAvailabilityProps;
    /**
     * string: The device class for the sensor. See [https://www.home-assistant.io/integrations/sensor/#device-class](https:...
     * @yamlKey device_class
     */
    deviceClass?: "" | "absolute_humidity" | "apparent_power" | "aqi" | "area" | "atmospheric_pressure" | "battery" | "blood_glucose_concentration" | "carbon_dioxide" | "carbon_monoxide" | "conductivity" | "current" | "data_rate" | "data_size" | "date" | "distance" | "duration" | "energy" | "energy_distance" | "energy_storage" | "frequency" | "gas" | "humidity" | "illuminance" | "irradiance" | "moisture" | "monetary" | "nitrogen_dioxide" | "nitrogen_monoxide" | "nitrous_oxide" | "ozone" | "ph" | "pm1" | "pm10" | "pm25" | "pm4" | "power" | "power_factor" | "precipitation" | "precipitation_intensity" | "pressure" | "reactive_energy" | "reactive_power" | "signal_strength" | "sound_pressure" | "speed" | "sulphur_dioxide" | "temperature" | "temperature_delta" | "timestamp" | "volatile_organic_compounds" | "volatile_organic_compounds_parts" | "voltage" | "volume" | "volume_flow_rate" | "volume_storage" | "water" | "weight" | "wind_direction" | "wind_speed";
    /** @yamlKey device_id */
    deviceId?: RefProp<__marker_Device>;
    /**
     * boolean: If true, then this entity should not be added to any client's frontend, (usually Home Assistant) without the...
     * @yamlKey disabled_by_default
     */
    disabledByDefault?: boolean;
    discovery?: boolean;
    /**
     * string: The category of the entity. See [https://developers.home-assistant.io/docs/core/entity/#generic-properties](h...
     * @yamlKey entity_category
     */
    entityCategory?: "" | "diagnostic";
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
    /** icon: Manually set the icon to use for the sensor in the frontend. */
    icon?: string;
    /** boolean: Mark this component as internal. Internal components will not be exposed to the frontend (like Home Assistan... */
    internal?: boolean;
    /** string: The name for the sensor. At least one of id and name must be specified. */
    name?: string;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a raw value is received that hasn't passe...
     * @yamlKey on_raw_value
     */
    onRawValue?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a new value is published. See [`on_value`...
     * @yamlKey on_value
     */
    onValue?: TriggerHandler;
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a published value transition from outside...
     * @yamlKey on_value_range
     */
    onValueRange?: TriggerHandler;
    qos?: unknown;
    retain?: boolean;
    /**
     * string: The state class for the sensor. See [https://developers.home-assistant.io/docs/core/entity/sensor/#available-...
     * @yamlKey state_class
     */
    stateClass?: "" | "measurement" | "measurement_angle" | "total" | "total_increasing";
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /**
     * string: Manually set the unit of measurement the sensor should advertise its values with. This does not actually do a...
     * @yamlKey unit_of_measurement
     */
    unitOfMeasurement?: string;
    /** @yamlKey web_server */
    webServer?: ShellyDimmerVoltagePropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<__marker_zigbee_ZigbeeComponent>;
}
interface BekenSpiLedStripProps extends _LightAddressableLight {
    /** enum: The chipset to apply known timings from. */
    chipset: "APA106" | "SK6812" | "SM16703" | "WS2812";
    /**
     * boolean: Set to `true` if the strip is RGBW. Defaults to `false`.
     * @yamlKey is_rgbw
     */
    isRgbw?: boolean;
    /**
     * boolean: Set to `true` if the strip is WRGB. Defaults to `false`.
     * @yamlKey is_wrgb
     */
    isWrgb?: boolean;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): A time interval used to limit the number of commands a li...
     * @yamlKey max_refresh_rate
     */
    maxRefreshRate?: TimePeriod;
    /**
     * int: The number of LEDs in the strip.
     * @yamlKey num_leds
     */
    numLeds: number;
    /** [Pin](https://esphome.io/guides/configuration-types#pin): The pin for the data line of the light. */
    pin: Pin;
    /**
     * string: The RGB order of the strip.
     * @yamlKey rgb_order
     */
    rgbOrder: "BGR" | "BRG" | "GBR" | "GRB" | "RBG" | "RGB";
}
interface BinaryProps extends _LightBinaryLight {
    /** [ID](https://esphome.io/guides/configuration-types#id): The id of the binary [Output Component](https://esphome.io/co... */
    output: RefProp<__marker_output_BinaryOutput>;
}
interface ColorTemperatureProps extends _LightRgbLight {
    /**
     * float: The coldest color temperature supported by this light. This is the lowest value when expressed in [mireds](htt...
     * @yamlKey cold_white_color_temperature
     */
    coldWhiteColorTemperature: number;
    /**
     * float: The warmest color temperature supported by this light. This is the highest value when expressed in [mireds](ht...
     * @yamlKey warm_white_color_temperature
     */
    warmWhiteColorTemperature: number;
}
interface CwwwProps extends _LightRgbLight {
    /**
     * float: The color temperature (in [mireds](https://en.wikipedia.org/wiki/Mired) or Kelvin) of the cold white channel. ...
     * @yamlKey cold_white_color_temperature
     */
    coldWhiteColorTemperature?: number;
    /**
     * boolean: When enabled, this will keep the overall brightness of the cold and warm white channels constant by limiting...
     * @yamlKey constant_brightness
     */
    constantBrightness?: boolean;
    /**
     * float: The color temperature (in [mireds](https://en.wikipedia.org/wiki/Mired) or Kelvin) of the warm white channel. ...
     * @yamlKey warm_white_color_temperature
     */
    warmWhiteColorTemperature?: number;
}
interface Esp32RmtLedStripProps extends _LightAddressableLight, _CoreComponent {
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The time to hold the data line high for a `0` bit.
     * @yamlKey bit0_high
     */
    bit0High?: TimePeriod;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The time to hold the data line low for a `0` bit.
     * @yamlKey bit0_low
     */
    bit0Low?: TimePeriod;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The time to hold the data line high for a `1` bit.
     * @yamlKey bit1_high
     */
    bit1High?: TimePeriod;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The time to hold the data line low for a `1` bit.
     * @yamlKey bit1_low
     */
    bit1Low?: TimePeriod;
    /** enum: The name of the chipset used; determines signal timing. Not required if [specifying the timings manually](https... */
    chipset?: "APA106" | "SK6812" | "SM16703" | "WS2811" | "WS2812";
    /**
     * boolean: Set to `true` if the strip is RGBW. Defaults to `false`.
     * @yamlKey is_rgbw
     */
    isRgbw?: boolean;
    /**
     * boolean: Set to `true` if the strip is WRGB. Defaults to `false`.
     * @yamlKey is_wrgb
     */
    isWrgb?: boolean;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): A time interval used to limit the number of commands a li...
     * @yamlKey max_refresh_rate
     */
    maxRefreshRate?: TimePeriod;
    /**
     * int: The number of LEDs in the strip.
     * @yamlKey num_leds
     */
    numLeds: number;
    /** [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): The pin for the data line of the light. */
    pin: Pin;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The time to hold the data line high after writing the sta...
     * @yamlKey reset_high
     */
    resetHigh?: TimePeriod;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The time to hold the data line low after writing the stat...
     * @yamlKey reset_low
     */
    resetLow?: TimePeriod;
    /**
     * string: The RGB order of the strip.
     * @yamlKey rgb_order
     */
    rgbOrder: "BGR" | "BRG" | "GBR" | "GRB" | "RBG" | "RGB";
    /**
     * int: When `use_dma` is enabled, this sets the size of the driver's internal DMA buffer. When DMA is disabled, it spec...
     * @yamlKey rmt_symbols
     */
    rmtSymbols?: number;
    /**
     * boolean: Enable DMA on variants that support it. If enabled `rmt_symbols` controls the DMA buffer size and can be set...
     * @yamlKey use_dma
     */
    useDma?: boolean;
    /**
     * boolean: Set to `false` to force internal RAM allocation even if you have the PSRAM component enabled. This can be us...
     * @yamlKey use_psram
     */
    usePsram?: boolean;
}
interface FastledClocklessProps {
    /** string: Set a chipset to use. See [Supported Chipsets](https://esphome.io/components/light/fastled#fastled_spi-chipse... */
    chipset: "APA104" | "APA106" | "GW6205" | "GW6205_400" | "LPD1886" | "LPD1886_8BIT" | "NEOPIXEL" | "PL9823" | "SK6812" | "SK6822" | "SM16703" | "TM1803" | "TM1804" | "TM1809" | "TM1829" | "UCS1903" | "UCS1903B" | "UCS1904" | "UCS2903" | "WS2811" | "WS2811_400" | "WS2812" | "WS2812B" | "WS2813" | "WS2852";
    /** [Pin](https://esphome.io/guides/configuration-types#pin): The pin for the data line of the FastLED light. */
    pin: Pin;
}
interface FastledSpiProps {
    chipset: "APA102" | "DOTSTAR" | "LPD8806" | "P9813" | "SK9822" | "SM16716" | "WS2801" | "WS2803";
    /** @yamlKey clock_pin */
    clockPin: Pin;
    /** @yamlKey data_pin */
    dataPin: Pin;
    /** @yamlKey data_rate */
    dataRate?: unknown;
}
interface HbridgeProps extends _LightRgbLight {
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): The id of the first float [Output Component](https://esphome....
     * @yamlKey pin_a
     */
    pinA: RefProp<__marker_output_FloatOutput>;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): The id of the second float [Output Component](https://esphome...
     * @yamlKey pin_b
     */
    pinB: RefProp<__marker_output_FloatOutput>;
}
interface LvglProps extends _LightRgbLight {
    widget: RefProp<__marker_lv_led_t>;
}
interface M5stack8angleProps extends _LightAddressableLight {
    /** @yamlKey m5stack_8angle_id */
    m5stack8angleId?: RefProp<__marker_m5stack_8angle_M5Stack8AngleComponent>;
}
interface MonochromaticProps extends _LightBrightnessOnlyLight {
    /** [ID](https://esphome.io/guides/configuration-types#id): The id of the float [Output Component](https://esphome.io/com... */
    output: RefProp<__marker_output_FloatOutput>;
}
interface NeopixelbusProps extends _LightAddressableLight, _CoreComponent {
    /**
     * [Pin](https://esphome.io/guides/configuration-types#pin): The pin for the clock line of the light, for two-wire lights.
     * @yamlKey clock_pin
     */
    clockPin?: Pin;
    /**
     * [Pin](https://esphome.io/guides/configuration-types#pin): The pin for the data line of the light, for two-wire lights.
     * @yamlKey data_pin
     */
    dataPin?: Pin;
    /** boolean: Invert data output, for use with n-type transistors. Defaults to `no`. */
    invert?: boolean;
    /** string: The method used to transmit the data. By default, ESPHome will try to use the best method available for this ... */
    method?: string;
    /**
     * int: The number of LEDs attached.
     * @yamlKey num_leds
     */
    numLeds: number;
    /** [Pin](https://esphome.io/guides/configuration-types#pin): The pin for the data line of the light. */
    pin?: Pin;
    /** string: The type of light. This is used to specify if it is an RGBW or RGB light and in which order the colors are. D... */
    type?: string;
    /** string: The chipset of the light. The following options are supported: */
    variant: "400kbps" | "800kbps" | "apa106" | "dotstar" | "lc8812" | "lpd6803" | "lpd8806" | "p9813" | "sk6812" | "tm1814" | "tm1829" | "tm1914" | "ws2801" | "ws2811" | "ws2812" | "ws2812x" | "ws2813";
}
interface PartitionProps extends _LightAddressableLight {
    /** list: A list of segments included in this partition. *For addressable segments:* */
    segments: Array<PartitionSegmentsProps>;
}
interface RgbProps extends _LightRgbLight {
}
interface RgbctProps extends _LightRgbLight {
    /**
     * float: The coldest color temperature supported by this light. This is the lowest value when expressed in [mireds](htt...
     * @yamlKey cold_white_color_temperature
     */
    coldWhiteColorTemperature: number;
    /**
     * boolean: When enabled, this will prevent white leds being on at the same time as RGB leds. See [Color Interlock](http...
     * @yamlKey color_interlock
     */
    colorInterlock?: boolean;
    /**
     * float: The warmest color temperature supported by this light. This is the highest value when expressed in [mireds](ht...
     * @yamlKey warm_white_color_temperature
     */
    warmWhiteColorTemperature: number;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): The id of the float [Output Component](https://esphome.io/com...
     * @yamlKey white_brightness
     */
    whiteBrightness: RefProp<__marker_output_FloatOutput>;
}
interface RgbwProps extends _LightRgbLight {
    /**
     * boolean: When enabled, this will prevent white leds being on at the same time as RGB leds. See [Color Interlock](http...
     * @yamlKey color_interlock
     */
    colorInterlock?: boolean;
}
interface RgbwwProps extends _LightRgbLight {
    /**
     * float: The color temperature (in [mireds](https://en.wikipedia.org/wiki/Mired) or Kelvin) of the cold white channel. ...
     * @yamlKey cold_white_color_temperature
     */
    coldWhiteColorTemperature?: number;
    /**
     * boolean: When enabled, this will prevent white leds being on at the same time as RGB leds. See [Color Interlock](http...
     * @yamlKey color_interlock
     */
    colorInterlock?: boolean;
    /**
     * boolean: When enabled, this will keep the overall brightness of the cold and warm white channels constant by limiting...
     * @yamlKey constant_brightness
     */
    constantBrightness?: boolean;
    /**
     * float: The color temperature (in [mireds](https://en.wikipedia.org/wiki/Mired) or Kelvin) of the warm white channel. ...
     * @yamlKey warm_white_color_temperature
     */
    warmWhiteColorTemperature?: number;
}
interface Rp2040PioLedStripProps extends _LightAddressableLight {
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The time to hold the data line high for a `0` bit.
     * @yamlKey bit0_high
     */
    bit0High?: TimePeriod;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The time to hold the data line low for a `0` bit.
     * @yamlKey bit0_low
     */
    bit0Low?: TimePeriod;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The time to hold the data line high for a `1` bit.
     * @yamlKey bit1_high
     */
    bit1High?: TimePeriod;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The time to hold the data line low for a `1` bit.
     * @yamlKey bit1_low
     */
    bit1Low?: TimePeriod;
    /** enum: The chipset to apply known timings from. */
    chipset?: "SK6812" | "SM16703" | "WS2812" | "WS2812B";
    /**
     * boolean: Set to `true` if the strip is RGBW. Defaults to `false`.
     * @yamlKey is_rgbw
     */
    isRgbw?: boolean;
    /**
     * int: The number of LEDs in the strip.
     * @yamlKey num_leds
     */
    numLeds: number;
    /** [Pin](https://esphome.io/guides/configuration-types#pin): The pin for the data line of the light. */
    pin: Pin;
    /** int: The PIO peripheral to use. If using multiple strips, you can use up to 4 strips per PIO. Must be one of `0` or `1`. */
    pio: "0" | "1";
    /**
     * string: The RGB order of the strip.
     * @yamlKey rgb_order
     */
    rgbOrder: "BGR" | "BRG" | "GBR" | "GRB" | "RBG" | "RGB";
}
interface ShellyDimmerProps extends _LightBrightnessOnlyLight, _CoreComponent {
    /**
     * [Pin](https://esphome.io/guides/configuration-types#pin): Pin connected with "BOOT0" of STM32. The default is "GPIO4".
     * @yamlKey boot0_pin
     */
    boot0Pin?: Pin;
    /** Sensor of the current in Amperes. All options from [Sensor](https://esphome.io/components/sensor). */
    current?: ShellyDimmerCurrentProps;
    firmware?: ShellyDimmerFirmwareProps;
    /**
     * boolean: [Dimming mode](https://en.wikipedia.org/wiki/Dimmer#Solid-state_dimmer): `true` means leading edge, `false` ...
     * @yamlKey leading_edge
     */
    leadingEdge?: boolean;
    /**
     * int: Maximum brightness value on a scale from 0..1000, the default is 1000.
     * @yamlKey max_brightness
     */
    maxBrightness?: number;
    /**
     * int: Minimum brightness value on a scale from 0..1000, the default is 0.
     * @yamlKey min_brightness
     */
    minBrightness?: number;
    /**
     * [Pin](https://esphome.io/guides/configuration-types#pin): Pin connected with "NRST" of STM32. The default is "GPIO5".
     * @yamlKey nrst_pin
     */
    nrstPin?: Pin;
    /** Sensor of the active power in Watts. Only accurate if neutral is connected. All options from [Sensor](https://esphome... */
    power?: ShellyDimmerPowerProps;
    /**
     * [ID](https://esphome.io/guides/configuration-types#id): Manually specify the ID of the UART hub.
     * @yamlKey uart_id
     */
    uartId?: RefProp<__marker_uart_UARTComponent>;
    /** @yamlKey update_interval */
    updateInterval?: unknown;
    /** Sensor of the voltage in Volts. Only accurate if neutral is connected. All options from [Sensor](https://esphome.io/c... */
    voltage?: ShellyDimmerVoltageProps;
    /**
     * int: Brightness threshold below which the dimmer switches on later in mains current cycle. [This might help with dimm...
     * @yamlKey warmup_brightness
     */
    warmupBrightness?: number;
}
interface SonoffD1Props extends _LightBrightnessOnlyLight, _CoreComponent {
    /**
     * int: The highest dimmer value allowed. Use this to hard-limit light intensity for your setup. For some bulbs this par...
     * @yamlKey max_value
     */
    maxValue?: number;
    /**
     * int: The lowest dimmer value allowed. Acceptable value for your setup will depend on actual light bulbs installed and...
     * @yamlKey min_value
     */
    minValue?: number;
    /** @yamlKey uart_id */
    uartId?: RefProp<__marker_uart_UARTComponent>;
    /**
     * boolean: Set to `True` if your setup uses Sonoff RM433 or any other radio remote control. Properly setting this param...
     * @yamlKey use_rm433_remote
     */
    useRm433Remote?: boolean;
}
interface SpiLedStripProps extends _LightAddressableLight {
    /** @yamlKey cs_pin */
    csPin?: Pin;
    /**
     * Set the data rate of the SPI interface to the display. One of `80MHz`, `40MHz`, `20MHz`, `10MHz`, `5MHz`, `2MHz`, `1M...
     * @yamlKey data_rate
     */
    dataRate?: unknown;
    /**
     * int: The number of LEDs attached. The default is 1.
     * @yamlKey num_leds
     */
    numLeds?: number;
    /** @yamlKey release_device */
    releaseDevice?: boolean;
    /** @yamlKey spi_id */
    spiId?: RefProp<__marker_spi_SPIComponent>;
    /** @yamlKey spi_mode */
    spiMode?: "0" | "1" | "2" | "3" | "MODE0" | "MODE1" | "MODE2" | "MODE3";
}
interface StatusLedProps extends _LightBinaryLight {
    output?: RefProp<__marker_output_BinaryOutput>;
    pin?: Pin;
}
interface TuyaProps extends _LightBrightnessOnlyLight, _CoreComponent {
    /** @yamlKey cold_white_color_temperature */
    coldWhiteColorTemperature?: unknown;
    /** @yamlKey color_datapoint */
    colorDatapoint?: number;
    /** @yamlKey color_interlock */
    colorInterlock?: boolean;
    /** @yamlKey color_temperature_datapoint */
    colorTemperatureDatapoint?: number;
    /** @yamlKey color_temperature_invert */
    colorTemperatureInvert?: boolean;
    /** @yamlKey color_temperature_max_value */
    colorTemperatureMaxValue?: number;
    /** @yamlKey color_type */
    colorType?: "HSV" | "RGB" | "RGBHSV";
    /** @yamlKey color_type_lowercase */
    colorTypeLowercase?: boolean;
    /** @yamlKey dimmer_datapoint */
    dimmerDatapoint?: number;
    /** @yamlKey max_value */
    maxValue?: number;
    /** @yamlKey min_value */
    minValue?: number;
    /** @yamlKey min_value_datapoint */
    minValueDatapoint?: number;
    /** @yamlKey switch_datapoint */
    switchDatapoint?: number;
    /** @yamlKey tuya_id */
    tuyaId?: RefProp<__marker_tuya_Tuya>;
    /** @yamlKey warm_white_color_temperature */
    warmWhiteColorTemperature?: unknown;
}
export type LightProps = ({
    platform: "beken_spi_led_strip";
} & BekenSpiLedStripProps & ComponentProps<__marker_beken_spi_led_strip_BekenSPILEDStripLightOutput>) | ({
    platform: "binary";
} & BinaryProps & ComponentProps<__marker_binary_BinaryLightOutput>) | ({
    platform: "color_temperature";
} & ColorTemperatureProps & ComponentProps<__marker_color_temperature_CTLightOutput>) | ({
    platform: "cwww";
} & CwwwProps & ComponentProps<__marker_cwww_CWWWLightOutput>) | ({
    platform: "esp32_rmt_led_strip";
} & Esp32RmtLedStripProps & ComponentProps<__marker_esp32_rmt_led_strip_ESP32RMTLEDStripLightOutput>) | ({
    platform: "fastled_clockless";
} & FastledClocklessProps & ComponentProps) | ({
    platform: "fastled_spi";
} & FastledSpiProps & ComponentProps) | ({
    platform: "hbridge";
} & HbridgeProps & ComponentProps<__marker_hbridge_HBridgeLightOutput>) | ({
    platform: "lvgl";
} & LvglProps & ComponentProps<__marker_lvgl_LVLight>) | ({
    platform: "m5stack_8angle";
} & M5stack8angleProps & ComponentProps<__marker_m5stack_8angle_M5Stack8AngleLightOutput>) | ({
    platform: "monochromatic";
} & MonochromaticProps & ComponentProps<__marker_monochromatic_MonochromaticLightOutput>) | ({
    platform: "neopixelbus";
} & NeopixelbusProps & ComponentProps<__marker_neopixelbus_NeoPixelBusLightOutputBase>) | ({
    platform: "partition";
} & PartitionProps & ComponentProps<__marker_partition_PartitionLightOutput>) | ({
    platform: "rgb";
} & RgbProps & ComponentProps<__marker_rgb_RGBLightOutput>) | ({
    platform: "rgbct";
} & RgbctProps & ComponentProps<__marker_rgbct_RGBCTLightOutput>) | ({
    platform: "rgbw";
} & RgbwProps & ComponentProps<__marker_rgbw_RGBWLightOutput>) | ({
    platform: "rgbww";
} & RgbwwProps & ComponentProps<__marker_rgbww_RGBWWLightOutput>) | ({
    platform: "rp2040_pio_led_strip";
} & Rp2040PioLedStripProps & ComponentProps<__marker_rp2040_pio_led_strip_RP2040PIOLEDStripLightOutput>) | ({
    platform: "shelly_dimmer";
} & ShellyDimmerProps & ComponentProps<__marker_shelly_dimmer_ShellyDimmer>) | ({
    platform: "sonoff_d1";
} & SonoffD1Props & ComponentProps<__marker_sonoff_d1_SonoffD1Output>) | ({
    platform: "spi_led_strip";
} & SpiLedStripProps & ComponentProps<__marker_spi_led_strip_SpiLedStrip>) | ({
    platform: "status_led";
} & StatusLedProps & ComponentProps<__marker_status_led_StatusLEDLightOutput>) | ({
    platform: "tuya";
} & TuyaProps & ComponentProps<__marker_tuya_TuyaLight>);
declare global {
    namespace JSX {
        interface IntrinsicElements {
            light: LightProps;
        }
    }
}
