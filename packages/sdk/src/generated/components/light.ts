// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp } from "../../types";
import type { _CoreComponent, _LightAddressableLight, _LightBinaryLight, _LightBrightnessOnlyLight, _LightRgbLight } from "../bases";
import type { beken_spi_led_strip_BekenSPILEDStripLightOutput, binary_BinaryLightOutput, color_temperature_CTLightOutput, cwww_CWWWLightOutput, esp32_rmt_led_strip_ESP32RMTLEDStripLightOutput, hbridge_HBridgeLightOutput, light_AddressableLightState, light_LightState, lv_led_t, lvgl_LVLight, m5stack_8angle_M5Stack8AngleComponent, m5stack_8angle_M5Stack8AngleLightOutput, monochromatic_MonochromaticLightOutput, neopixelbus_NeoPixelBusLightOutputBase, output_BinaryOutput, output_FloatOutput, partition_PartitionLightOutput, rgb_RGBLightOutput, rgbct_RGBCTLightOutput, rgbw_RGBWLightOutput, rgbww_RGBWWLightOutput, rp2040_pio_led_strip_RP2040PIOLEDStripLightOutput, shelly_dimmer_ShellyDimmer, sonoff_d1_SonoffD1Output, spi_SPIComponent, spi_led_strip_SpiLedStrip, status_led_StatusLEDLightOutput, tuya_Tuya, tuya_TuyaLight, uart_UARTComponent, web_server_WebServer, zigbee_ZigbeeComponent } from "../markers";
interface BekenSpiLedStripMaxRefreshRateProps {
    days?: unknown;
    hours?: unknown;
    minutes?: unknown;
    seconds?: unknown;
    milliseconds?: unknown;
    microseconds?: unknown;
}
interface Esp32RmtLedStripMaxRefreshRateProps {
    days?: unknown;
    hours?: unknown;
    minutes?: unknown;
    seconds?: unknown;
    milliseconds?: unknown;
    microseconds?: unknown;
}
interface Esp32RmtLedStripBit0HighProps {
    days?: unknown;
    hours?: unknown;
    minutes?: unknown;
    seconds?: unknown;
    milliseconds?: unknown;
    microseconds?: unknown;
}
interface Esp32RmtLedStripBit0LowProps {
    days?: unknown;
    hours?: unknown;
    minutes?: unknown;
    seconds?: unknown;
    milliseconds?: unknown;
    microseconds?: unknown;
}
interface Esp32RmtLedStripBit1HighProps {
    days?: unknown;
    hours?: unknown;
    minutes?: unknown;
    seconds?: unknown;
    milliseconds?: unknown;
    microseconds?: unknown;
}
interface Esp32RmtLedStripBit1LowProps {
    days?: unknown;
    hours?: unknown;
    minutes?: unknown;
    seconds?: unknown;
    milliseconds?: unknown;
    microseconds?: unknown;
}
interface Esp32RmtLedStripResetHighProps {
    days?: unknown;
    hours?: unknown;
    minutes?: unknown;
    seconds?: unknown;
    milliseconds?: unknown;
    microseconds?: unknown;
}
interface Esp32RmtLedStripResetLowProps {
    days?: unknown;
    hours?: unknown;
    minutes?: unknown;
    seconds?: unknown;
    milliseconds?: unknown;
    microseconds?: unknown;
}
interface PartitionSegmentsProps {
    /** @yamlKey setup_priority */
    setupPriority?: unknown;
    /** [ID](/guides/configuration-types#id): The ID of the addressable light to be controlled by this segment. */
    id: RefProp<light_AddressableLightState>;
    /** int: The index of the first LED to address in the segment. Counting starts with 0, so first LED is 0. */
    from: number;
    /** int: The index of the last LED to address in this segment. */
    to: number;
    /** boolean: Whether to reverse the order of LEDs in this segment. Defaults to `false`. */
    reversed?: boolean;
    /**
     * [ID](/guides/configuration-types#id): The ID of a single addressable or non-addressable light. If an addressable ligh...
     * @yamlKey single_light_id
     */
    singleLightId: RefProp<light_LightState>;
}
interface ShellyDimmerFirmwareProps {
    url?: unknown;
    sha256?: unknown;
    version: unknown;
    update?: boolean;
}
interface ShellyDimmerPowerPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface ShellyDimmerPowerPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface ShellyDimmerPowerPropsExpireAfterProps {
    days?: unknown;
    hours?: unknown;
    minutes?: unknown;
    seconds?: unknown;
    milliseconds?: unknown;
    microseconds?: unknown;
}
interface ShellyDimmerPowerProps {
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
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: ShellyDimmerPowerPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: ShellyDimmerPowerPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey unit_of_measurement */
    unitOfMeasurement?: unknown;
    /** @yamlKey accuracy_decimals */
    accuracyDecimals?: unknown;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    /** @yamlKey state_class */
    stateClass?: "" | "measurement" | "total_increasing" | "total" | "measurement_angle";
    /** @yamlKey force_update */
    forceUpdate?: boolean;
    /** @yamlKey expire_after */
    expireAfter?: ShellyDimmerPowerPropsExpireAfterProps;
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: () => void;
    /** @yamlKey on_raw_value */
    onRawValue?: () => void;
    /** @yamlKey on_value_range */
    onValueRange?: () => void;
}
interface ShellyDimmerVoltagePropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface ShellyDimmerVoltagePropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface ShellyDimmerVoltagePropsExpireAfterProps {
    days?: unknown;
    hours?: unknown;
    minutes?: unknown;
    seconds?: unknown;
    milliseconds?: unknown;
    microseconds?: unknown;
}
interface ShellyDimmerVoltageProps {
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
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: ShellyDimmerVoltagePropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: ShellyDimmerVoltagePropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey unit_of_measurement */
    unitOfMeasurement?: unknown;
    /** @yamlKey accuracy_decimals */
    accuracyDecimals?: unknown;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    /** @yamlKey state_class */
    stateClass?: "" | "measurement" | "total_increasing" | "total" | "measurement_angle";
    /** @yamlKey force_update */
    forceUpdate?: boolean;
    /** @yamlKey expire_after */
    expireAfter?: ShellyDimmerVoltagePropsExpireAfterProps;
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: () => void;
    /** @yamlKey on_raw_value */
    onRawValue?: () => void;
    /** @yamlKey on_value_range */
    onValueRange?: () => void;
}
interface ShellyDimmerCurrentPropsAvailabilityProps {
    topic: unknown;
    /** @yamlKey payload_available */
    payloadAvailable?: unknown;
    /** @yamlKey payload_not_available */
    payloadNotAvailable?: unknown;
}
interface ShellyDimmerCurrentPropsWebServerProps {
    /** @yamlKey web_server_id */
    webServerId?: RefProp<web_server_WebServer>;
    /** @yamlKey sorting_weight */
    sortingWeight?: unknown;
    /** @yamlKey sorting_group_id */
    sortingGroupId?: number;
}
interface ShellyDimmerCurrentPropsExpireAfterProps {
    days?: unknown;
    hours?: unknown;
    minutes?: unknown;
    seconds?: unknown;
    milliseconds?: unknown;
    microseconds?: unknown;
}
interface ShellyDimmerCurrentProps {
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
    /** @yamlKey entity_category */
    entityCategory?: unknown;
    /** @yamlKey device_id */
    deviceId?: unknown;
    qos?: unknown;
    retain?: boolean;
    discovery?: boolean;
    /** @yamlKey subscribe_qos */
    subscribeQos?: unknown;
    /** @yamlKey state_topic */
    stateTopic?: unknown;
    availability?: ShellyDimmerCurrentPropsAvailabilityProps;
    /** @yamlKey web_server */
    webServer?: ShellyDimmerCurrentPropsWebServerProps;
    /** @yamlKey zigbee_id */
    zigbeeId?: RefProp<zigbee_ZigbeeComponent>;
    /** @yamlKey unit_of_measurement */
    unitOfMeasurement?: unknown;
    /** @yamlKey accuracy_decimals */
    accuracyDecimals?: unknown;
    /** @yamlKey device_class */
    deviceClass?: unknown;
    /** @yamlKey state_class */
    stateClass?: "" | "measurement" | "total_increasing" | "total" | "measurement_angle";
    /** @yamlKey force_update */
    forceUpdate?: boolean;
    /** @yamlKey expire_after */
    expireAfter?: ShellyDimmerCurrentPropsExpireAfterProps;
    filters?: Array<unknown>;
    /** @yamlKey on_value */
    onValue?: () => void;
    /** @yamlKey on_raw_value */
    onRawValue?: () => void;
    /** @yamlKey on_value_range */
    onValueRange?: () => void;
}
interface BekenSpiLedStripProps extends _LightAddressableLight {
    /** [Pin](/guides/configuration-types#pin): The pin for the data line of the light. */
    pin: Pin;
    /**
     * int: The number of LEDs in the strip.
     * @yamlKey num_leds
     */
    numLeds: number;
    /**
     * string: The RGB order of the strip.
     * @yamlKey rgb_order
     */
    rgbOrder: "RGB" | "RBG" | "GRB" | "GBR" | "BGR" | "BRG";
    /**
     * [Time](/guides/configuration-types#time): A time interval used to limit the number of commands a light can handle per...
     * @yamlKey max_refresh_rate
     */
    maxRefreshRate?: BekenSpiLedStripMaxRefreshRateProps;
    /** enum: The chipset to apply known timings from. */
    chipset: "WS2812" | "SK6812" | "APA106" | "SM16703";
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
}
interface ColorTemperatureProps extends _LightRgbLight {
    /**
     * [ID](/guides/configuration-types#id): The id of the float [Output Component](/components/output/) to use for the colo...
     * @yamlKey color_temperature
     */
    colorTemperature: RefProp<output_FloatOutput>;
    /** [ID](/guides/configuration-types#id): The id of the float [Output Component](/components/output/) to use for the brig... */
    brightness: RefProp<output_FloatOutput>;
    /**
     * float: The coldest color temperature supported by this light. This is the lowest value when expressed in [mireds](htt...
     * @yamlKey cold_white_color_temperature
     */
    coldWhiteColorTemperature: unknown;
    /**
     * float: The warmest color temperature supported by this light. This is the highest value when expressed in [mireds](ht...
     * @yamlKey warm_white_color_temperature
     */
    warmWhiteColorTemperature: unknown;
}
interface CwwwProps extends _LightRgbLight {
    /**
     * [ID](/guides/configuration-types#id): The id of the float [Output Component](/components/output/) to use for the cold...
     * @yamlKey cold_white
     */
    coldWhite: RefProp<output_FloatOutput>;
    /**
     * [ID](/guides/configuration-types#id): The id of the float [Output Component](/components/output/) to use for the warm...
     * @yamlKey warm_white
     */
    warmWhite: RefProp<output_FloatOutput>;
    /**
     * float: The color temperature (in [mireds](https://en.wikipedia.org/wiki/Mired) or Kelvin) of the cold white channel. ...
     * @yamlKey cold_white_color_temperature
     */
    coldWhiteColorTemperature?: unknown;
    /**
     * float: The color temperature (in [mireds](https://en.wikipedia.org/wiki/Mired) or Kelvin) of the warm white channel. ...
     * @yamlKey warm_white_color_temperature
     */
    warmWhiteColorTemperature?: unknown;
    /**
     * boolean: When enabled, this will keep the overall brightness of the cold and warm white channels constant by limiting...
     * @yamlKey constant_brightness
     */
    constantBrightness?: boolean;
}
interface Esp32RmtLedStripProps extends _LightAddressableLight, _CoreComponent {
    /** [Pin Schema](/guides/configuration-types#pin-schema): The pin for the data line of the light. */
    pin: Pin;
    /**
     * int: The number of LEDs in the strip.
     * @yamlKey num_leds
     */
    numLeds: number;
    /**
     * string: The RGB order of the strip.
     * @yamlKey rgb_order
     */
    rgbOrder: "RGB" | "RBG" | "GRB" | "GBR" | "BGR" | "BRG";
    /**
     * int: When `use_dma` is enabled, this sets the size of the driver's internal DMA buffer. When DMA is disabled, it spec...
     * @yamlKey rmt_symbols
     */
    rmtSymbols?: number;
    /**
     * [Time](/guides/configuration-types#time): A time interval used to limit the number of commands a light can handle per...
     * @yamlKey max_refresh_rate
     */
    maxRefreshRate?: Esp32RmtLedStripMaxRefreshRateProps;
    /** enum: The name of the chipset used; determines signal timing. Not required if [specifying the timings manually](https... */
    chipset?: "WS2811" | "WS2812" | "SK6812" | "APA106" | "SM16703";
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
     * boolean: Enable DMA on variants that support it. If enabled `rmt_symbols` controls the DMA buffer size and can be set...
     * @yamlKey use_dma
     */
    useDma?: boolean;
    /**
     * boolean: Set to `false` to force internal RAM allocation even if you have the PSRAM component enabled. This can be us...
     * @yamlKey use_psram
     */
    usePsram?: boolean;
    /**
     * [Time](/guides/configuration-types#time): The time to hold the data line high for a `0` bit.
     * @yamlKey bit0_high
     */
    bit0High?: Esp32RmtLedStripBit0HighProps;
    /**
     * [Time](/guides/configuration-types#time): The time to hold the data line low for a `0` bit.
     * @yamlKey bit0_low
     */
    bit0Low?: Esp32RmtLedStripBit0LowProps;
    /**
     * [Time](/guides/configuration-types#time): The time to hold the data line high for a `1` bit.
     * @yamlKey bit1_high
     */
    bit1High?: Esp32RmtLedStripBit1HighProps;
    /**
     * [Time](/guides/configuration-types#time): The time to hold the data line low for a `1` bit.
     * @yamlKey bit1_low
     */
    bit1Low?: Esp32RmtLedStripBit1LowProps;
    /**
     * [Time](/guides/configuration-types#time): The time to hold the data line high after writing the state. Defaults to `0...
     * @yamlKey reset_high
     */
    resetHigh?: Esp32RmtLedStripResetHighProps;
    /**
     * [Time](/guides/configuration-types#time): The time to hold the data line low after writing the state. Defaults to `0 ...
     * @yamlKey reset_low
     */
    resetLow?: Esp32RmtLedStripResetLowProps;
}
interface FastledClocklessProps {
    /** string: Set a chipset to use. See [Supported Chipsets](https://esphome.io/components/light/fastled#fastled_spi-chipse... */
    chipset: "NEOPIXEL" | "TM1829" | "TM1809" | "TM1804" | "TM1803" | "UCS1903" | "UCS1903B" | "UCS1904" | "UCS2903" | "WS2812" | "WS2852" | "WS2812B" | "SK6812" | "SK6822" | "APA106" | "PL9823" | "WS2811" | "WS2813" | "APA104" | "WS2811_400" | "GW6205" | "GW6205_400" | "LPD1886" | "LPD1886_8BIT" | "SM16703";
    /** [Pin](/guides/configuration-types#pin): The pin for the data line of the FastLED light. */
    pin: Pin;
}
interface FastledSpiProps {
    chipset: "LPD8806" | "WS2801" | "WS2803" | "SM16716" | "P9813" | "APA102" | "SK9822" | "DOTSTAR";
    /** @yamlKey data_pin */
    dataPin: Pin;
    /** @yamlKey clock_pin */
    clockPin: Pin;
    /** @yamlKey data_rate */
    dataRate?: unknown;
}
interface MonochromaticProps extends _LightBrightnessOnlyLight {
    /** [ID](/guides/configuration-types#id): The id of the float [Output Component](/components/output/) to use for this light. */
    output: RefProp<output_FloatOutput>;
}
interface NeopixelbusProps extends _LightAddressableLight, _CoreComponent {
    /** string: The type of light. This is used to specify if it is an RGBW or RGB light and in which order the colors are. D... */
    type?: unknown;
    /** string: The chipset of the light. The following options are supported: */
    variant: "ws2811" | "ws2812" | "ws2812x" | "ws2813" | "sk6812" | "tm1814" | "tm1829" | "tm1914" | "800kbps" | "400kbps" | "apa106" | "lc8812" | "dotstar" | "ws2801" | "lpd6803" | "lpd8806" | "p9813";
    /** string: The method used to transmit the data. By default, ESPHome will try to use the best method available for this ... */
    method?: unknown;
    /** boolean: Invert data output, for use with n-type transistors. Defaults to `no`. */
    invert?: boolean;
    /** [Pin](/guides/configuration-types#pin): The pin for the data line of the light. */
    pin?: Pin;
    /**
     * [Pin](/guides/configuration-types#pin): The pin for the clock line of the light, for two-wire lights.
     * @yamlKey clock_pin
     */
    clockPin?: Pin;
    /**
     * [Pin](/guides/configuration-types#pin): The pin for the data line of the light, for two-wire lights.
     * @yamlKey data_pin
     */
    dataPin?: Pin;
    /**
     * int: The number of LEDs attached.
     * @yamlKey num_leds
     */
    numLeds: number;
}
interface PartitionProps extends _LightAddressableLight {
    /** list: A list of segments included in this partition. *For addressable segments:* */
    segments: Array<PartitionSegmentsProps>;
}
interface RgbProps extends _LightRgbLight {
    /** [ID](/guides/configuration-types#id): The id of the float [Output Component](/components/output/) to use for the red ... */
    red: RefProp<output_FloatOutput>;
    /** [ID](/guides/configuration-types#id): The id of the float [Output Component](/components/output/) to use for the gree... */
    green: RefProp<output_FloatOutput>;
    /** [ID](/guides/configuration-types#id): The id of the float [Output Component](/components/output/) to use for the blue... */
    blue: RefProp<output_FloatOutput>;
}
interface RgbctProps extends _LightRgbLight {
    /** [ID](/guides/configuration-types#id): The id of the float [Output Component](/components/output/) to use for the red ... */
    red: RefProp<output_FloatOutput>;
    /** [ID](/guides/configuration-types#id): The id of the float [Output Component](/components/output/) to use for the gree... */
    green: RefProp<output_FloatOutput>;
    /** [ID](/guides/configuration-types#id): The id of the float [Output Component](/components/output/) to use for the blue... */
    blue: RefProp<output_FloatOutput>;
    /**
     * [ID](/guides/configuration-types#id): The id of the float [Output Component](/components/output/) to use for the colo...
     * @yamlKey color_temperature
     */
    colorTemperature: RefProp<output_FloatOutput>;
    /**
     * [ID](/guides/configuration-types#id): The id of the float [Output Component](/components/output/) to use for the brig...
     * @yamlKey white_brightness
     */
    whiteBrightness: RefProp<output_FloatOutput>;
    /**
     * float: The coldest color temperature supported by this light. This is the lowest value when expressed in [mireds](htt...
     * @yamlKey cold_white_color_temperature
     */
    coldWhiteColorTemperature: unknown;
    /**
     * float: The warmest color temperature supported by this light. This is the highest value when expressed in [mireds](ht...
     * @yamlKey warm_white_color_temperature
     */
    warmWhiteColorTemperature: unknown;
    /**
     * boolean: When enabled, this will prevent white leds being on at the same time as RGB leds. See [Color Interlock](/com...
     * @yamlKey color_interlock
     */
    colorInterlock?: boolean;
}
interface RgbwProps extends _LightRgbLight {
    /** [ID](/guides/configuration-types#id): The id of the float [Output Component](/components/output/) to use for the red ... */
    red: RefProp<output_FloatOutput>;
    /** [ID](/guides/configuration-types#id): The id of the float [Output Component](/components/output/) to use for the gree... */
    green: RefProp<output_FloatOutput>;
    /** [ID](/guides/configuration-types#id): The id of the float [Output Component](/components/output/) to use for the blue... */
    blue: RefProp<output_FloatOutput>;
    /** [ID](/guides/configuration-types#id): The id of the float [Output Component](/components/output/) to use for the whit... */
    white: RefProp<output_FloatOutput>;
    /**
     * boolean: When enabled, this will prevent white leds being on at the same time as RGB leds. See [Color Interlock](http...
     * @yamlKey color_interlock
     */
    colorInterlock?: boolean;
}
interface RgbwwProps extends _LightRgbLight {
    /** [ID](/guides/configuration-types#id): The id of the float [Output Component](/components/output/) to use for the red ... */
    red: RefProp<output_FloatOutput>;
    /** [ID](/guides/configuration-types#id): The id of the float [Output Component](/components/output/) to use for the gree... */
    green: RefProp<output_FloatOutput>;
    /** [ID](/guides/configuration-types#id): The id of the float [Output Component](/components/output/) to use for the blue... */
    blue: RefProp<output_FloatOutput>;
    /**
     * [ID](/guides/configuration-types#id): The id of the float [Output Component](/components/output/) to use for the cold...
     * @yamlKey cold_white
     */
    coldWhite: RefProp<output_FloatOutput>;
    /**
     * [ID](/guides/configuration-types#id): The id of the float [Output Component](/components/output/) to use for the warm...
     * @yamlKey warm_white
     */
    warmWhite: RefProp<output_FloatOutput>;
    /**
     * float: The color temperature (in [mireds](https://en.wikipedia.org/wiki/Mired) or Kelvin) of the cold white channel. ...
     * @yamlKey cold_white_color_temperature
     */
    coldWhiteColorTemperature?: unknown;
    /**
     * float: The color temperature (in [mireds](https://en.wikipedia.org/wiki/Mired) or Kelvin) of the warm white channel. ...
     * @yamlKey warm_white_color_temperature
     */
    warmWhiteColorTemperature?: unknown;
    /**
     * boolean: When enabled, this will keep the overall brightness of the cold and warm white channels constant by limiting...
     * @yamlKey constant_brightness
     */
    constantBrightness?: boolean;
    /**
     * boolean: When enabled, this will prevent white leds being on at the same time as RGB leds. See [Color Interlock](/com...
     * @yamlKey color_interlock
     */
    colorInterlock?: boolean;
}
interface Rp2040PioLedStripProps extends _LightAddressableLight {
    /** [Pin](/guides/configuration-types#pin): The pin for the data line of the light. */
    pin: Pin;
    /**
     * int: The number of LEDs in the strip.
     * @yamlKey num_leds
     */
    numLeds: number;
    /**
     * string: The RGB order of the strip.
     * @yamlKey rgb_order
     */
    rgbOrder: "RGB" | "RBG" | "GRB" | "GBR" | "BGR" | "BRG";
    /** int: The PIO peripheral to use. If using multiple strips, you can use up to 4 strips per PIO. Must be one of `0` or `1`. */
    pio: "0" | "1";
    /** enum: The chipset to apply known timings from. */
    chipset?: "WS2812" | "WS2812B" | "SK6812" | "SM16703" | "CUSTOM";
    /**
     * boolean: Set to `true` if the strip is RGBW. Defaults to `false`.
     * @yamlKey is_rgbw
     */
    isRgbw?: boolean;
    /**
     * [Time](/guides/configuration-types#time): The time to hold the data line high for a `0` bit.
     * @yamlKey bit0_high
     */
    bit0High?: unknown;
    /**
     * [Time](/guides/configuration-types#time): The time to hold the data line low for a `0` bit.
     * @yamlKey bit0_low
     */
    bit0Low?: unknown;
    /**
     * [Time](/guides/configuration-types#time): The time to hold the data line high for a `1` bit.
     * @yamlKey bit1_high
     */
    bit1High?: unknown;
    /**
     * [Time](/guides/configuration-types#time): The time to hold the data line low for a `1` bit.
     * @yamlKey bit1_low
     */
    bit1Low?: unknown;
}
interface ShellyDimmerProps extends _LightBrightnessOnlyLight, _CoreComponent {
    firmware?: ShellyDimmerFirmwareProps;
    /**
     * [Pin](/guides/configuration-types#pin): Pin connected with "NRST" of STM32. The default is "GPIO5".
     * @yamlKey nrst_pin
     */
    nrstPin?: Pin;
    /**
     * [Pin](/guides/configuration-types#pin): Pin connected with "BOOT0" of STM32. The default is "GPIO4".
     * @yamlKey boot0_pin
     */
    boot0Pin?: Pin;
    /**
     * boolean: [Dimming mode](https://en.wikipedia.org/wiki/Dimmer#Solid-state_dimmer): `true` means leading edge, `false` ...
     * @yamlKey leading_edge
     */
    leadingEdge?: boolean;
    /**
     * int: Brightness threshold below which the dimmer switches on later in mains current cycle. [This might help with dimm...
     * @yamlKey warmup_brightness
     */
    warmupBrightness?: number;
    /**
     * int: Minimum brightness value on a scale from 0..1000, the default is 0.
     * @yamlKey min_brightness
     */
    minBrightness?: number;
    /**
     * int: Maximum brightness value on a scale from 0..1000, the default is 1000.
     * @yamlKey max_brightness
     */
    maxBrightness?: number;
    /** Sensor of the active power in Watts. Only accurate if neutral is connected. All options from [Sensor](/components/sen... */
    power?: ShellyDimmerPowerProps;
    /** Sensor of the voltage in Volts. Only accurate if neutral is connected. All options from [Sensor](/components/sensor). */
    voltage?: ShellyDimmerVoltageProps;
    /** Sensor of the current in Amperes. All options from [Sensor](/components/sensor). */
    current?: ShellyDimmerCurrentProps;
    /** @yamlKey update_interval */
    updateInterval?: unknown;
    /**
     * [ID](/guides/configuration-types#id): Manually specify the ID of the UART hub.
     * @yamlKey uart_id
     */
    uartId?: RefProp<uart_UARTComponent>;
}
interface SonoffD1Props extends _LightBrightnessOnlyLight, _CoreComponent {
    /**
     * boolean: Set to `True` if your setup uses Sonoff RM433 or any other radio remote control. Properly setting this param...
     * @yamlKey use_rm433_remote
     */
    useRm433Remote?: boolean;
    /**
     * int: The lowest dimmer value allowed. Acceptable value for your setup will depend on actual light bulbs installed and...
     * @yamlKey min_value
     */
    minValue?: number;
    /**
     * int: The highest dimmer value allowed. Use this to hard-limit light intensity for your setup. For some bulbs this par...
     * @yamlKey max_value
     */
    maxValue?: number;
    /** @yamlKey uart_id */
    uartId?: RefProp<uart_UARTComponent>;
}
interface SpiLedStripProps extends _LightAddressableLight {
    /**
     * int: The number of LEDs attached. The default is 1.
     * @yamlKey num_leds
     */
    numLeds?: number;
    /** @yamlKey spi_id */
    spiId?: RefProp<spi_SPIComponent>;
    /**
     * Set the data rate of the SPI interface to the display. One of `80MHz`, `40MHz`, `20MHz`, `10MHz`, `5MHz`, `2MHz`, `1M...
     * @yamlKey data_rate
     */
    dataRate?: unknown;
    /** @yamlKey spi_mode */
    spiMode?: "0" | "1" | "2" | "3" | "MODE0" | "MODE1" | "MODE2" | "MODE3";
    /** @yamlKey release_device */
    releaseDevice?: boolean;
    /** @yamlKey cs_pin */
    csPin?: Pin;
}
interface BinaryProps extends _LightBinaryLight {
    /** [ID](/guides/configuration-types#id): The id of the binary [Output Component](/components/output/) to use for this li... */
    output: RefProp<output_BinaryOutput>;
}
interface HbridgeProps extends _LightRgbLight {
    /**
     * [ID](/guides/configuration-types#id): The id of the first float [Output Component](/components/output/) to use for th...
     * @yamlKey pin_a
     */
    pinA: RefProp<output_FloatOutput>;
    /**
     * [ID](/guides/configuration-types#id): The id of the second float [Output Component](/components/output/) to use for t...
     * @yamlKey pin_b
     */
    pinB: RefProp<output_FloatOutput>;
}
interface LvglProps extends _LightRgbLight {
    widget: RefProp<lv_led_t>;
}
interface M5stack8angleProps extends _LightAddressableLight {
    /** @yamlKey m5stack_8angle_id */
    m5stack8angleId?: RefProp<m5stack_8angle_M5Stack8AngleComponent>;
}
interface StatusLedProps extends _LightBinaryLight {
    pin?: Pin;
    output?: RefProp<output_BinaryOutput>;
}
interface TuyaProps extends _LightBrightnessOnlyLight, _CoreComponent {
    /** @yamlKey tuya_id */
    tuyaId?: RefProp<tuya_Tuya>;
    /** @yamlKey dimmer_datapoint */
    dimmerDatapoint?: number;
    /** @yamlKey min_value_datapoint */
    minValueDatapoint?: number;
    /** @yamlKey switch_datapoint */
    switchDatapoint?: number;
    /** @yamlKey color_datapoint */
    colorDatapoint?: number;
    /** @yamlKey color_type */
    colorType?: "RGB" | "HSV" | "RGBHSV";
    /** @yamlKey color_type_lowercase */
    colorTypeLowercase?: boolean;
    /** @yamlKey color_interlock */
    colorInterlock?: boolean;
    /** @yamlKey color_temperature_datapoint */
    colorTemperatureDatapoint?: number;
    /** @yamlKey color_temperature_invert */
    colorTemperatureInvert?: boolean;
    /** @yamlKey min_value */
    minValue?: number;
    /** @yamlKey max_value */
    maxValue?: number;
    /** @yamlKey color_temperature_max_value */
    colorTemperatureMaxValue?: number;
    /** @yamlKey cold_white_color_temperature */
    coldWhiteColorTemperature?: unknown;
    /** @yamlKey warm_white_color_temperature */
    warmWhiteColorTemperature?: unknown;
}
export type LightProps = ({
    platform: "beken_spi_led_strip";
} & BekenSpiLedStripProps & ComponentProps<beken_spi_led_strip_BekenSPILEDStripLightOutput>) | ({
    platform: "color_temperature";
} & ColorTemperatureProps & ComponentProps<color_temperature_CTLightOutput>) | ({
    platform: "cwww";
} & CwwwProps & ComponentProps<cwww_CWWWLightOutput>) | ({
    platform: "esp32_rmt_led_strip";
} & Esp32RmtLedStripProps & ComponentProps<esp32_rmt_led_strip_ESP32RMTLEDStripLightOutput>) | ({
    platform: "fastled_clockless";
} & FastledClocklessProps & ComponentProps) | ({
    platform: "fastled_spi";
} & FastledSpiProps & ComponentProps) | ({
    platform: "monochromatic";
} & MonochromaticProps & ComponentProps<monochromatic_MonochromaticLightOutput>) | ({
    platform: "neopixelbus";
} & NeopixelbusProps & ComponentProps<neopixelbus_NeoPixelBusLightOutputBase>) | ({
    platform: "partition";
} & PartitionProps & ComponentProps<partition_PartitionLightOutput>) | ({
    platform: "rgb";
} & RgbProps & ComponentProps<rgb_RGBLightOutput>) | ({
    platform: "rgbct";
} & RgbctProps & ComponentProps<rgbct_RGBCTLightOutput>) | ({
    platform: "rgbw";
} & RgbwProps & ComponentProps<rgbw_RGBWLightOutput>) | ({
    platform: "rgbww";
} & RgbwwProps & ComponentProps<rgbww_RGBWWLightOutput>) | ({
    platform: "rp2040_pio_led_strip";
} & Rp2040PioLedStripProps & ComponentProps<rp2040_pio_led_strip_RP2040PIOLEDStripLightOutput>) | ({
    platform: "shelly_dimmer";
} & ShellyDimmerProps & ComponentProps<shelly_dimmer_ShellyDimmer>) | ({
    platform: "sonoff_d1";
} & SonoffD1Props & ComponentProps<sonoff_d1_SonoffD1Output>) | ({
    platform: "spi_led_strip";
} & SpiLedStripProps & ComponentProps<spi_led_strip_SpiLedStrip>) | ({
    platform: "binary";
} & BinaryProps & ComponentProps<binary_BinaryLightOutput>) | ({
    platform: "hbridge";
} & HbridgeProps & ComponentProps<hbridge_HBridgeLightOutput>) | ({
    platform: "lvgl";
} & LvglProps & ComponentProps<lvgl_LVLight>) | ({
    platform: "m5stack_8angle";
} & M5stack8angleProps & ComponentProps<m5stack_8angle_M5Stack8AngleLightOutput>) | ({
    platform: "status_led";
} & StatusLedProps & ComponentProps<status_led_StatusLEDLightOutput>) | ({
    platform: "tuya";
} & TuyaProps & ComponentProps<tuya_TuyaLight>);
declare global {
    namespace JSX {
        interface IntrinsicElements {
            light: LightProps;
        }
    }
}
