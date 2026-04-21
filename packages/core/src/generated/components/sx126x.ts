// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp, TimePeriod, TriggerHandler } from "../../types";
import type { _CoreComponent } from "../bases";
import type { __marker_spi_SPIComponent, __marker_sx126x_SX126x } from "../markers";
export interface Sx126xProps extends _CoreComponent {
    /** enum: Bandwidth can be `4_8kHz`, `5_8kHz`, `7_3kHz`, `9_7kHz`, `11_7kHz`, `14_6kHz`, `19_5kHz`, `23_4kHz`, `29_3kHz`,... */
    bandwidth?: "10_4kHz" | "117_3kHz" | "11_7kHz" | "125_0kHz" | "14_6kHz" | "156_2kHz" | "15_6kHz" | "187_2kHz" | "19_5kHz" | "20_8kHz" | "234_3kHz" | "23_4kHz" | "250_0kHz" | "29_3kHz" | "312_0kHz" | "31_3kHz" | "373_6kHz" | "39_0kHz" | "41_7kHz" | "467_0kHz" | "46_9kHz" | "4_8kHz" | "500_0kHz" | "58_6kHz" | "5_8kHz" | "62_5kHz" | "78_2kHz" | "7_3kHz" | "7_8kHz" | "93_8kHz" | "9_7kHz";
    /** int: Bit rate of the signal. Normally the inverse of the bit duration, eg 1 / 208 us is 4800 bps. */
    bitrate?: number;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): Busy pin.
     * @yamlKey busy_pin
     */
    busyPin: Pin;
    /**
     * enum: Coding rate, values can be `CR_4_5`, `CR_4_6`, `CR_4_7` or `CR_4_8`. Defaults to `CR_4_5`.
     * @yamlKey coding_rate
     */
    codingRate?: "CR_4_5" | "CR_4_6" | "CR_4_7" | "CR_4_8";
    /**
     * bool: Enables a 16 bit CRC calculation/check. Defaults to `false`.
     * @yamlKey crc_enable
     */
    crcEnable?: boolean;
    /**
     * int: Initial CRC value as a hex integer. Defaults to 0x1D0F.
     * @yamlKey crc_initial
     */
    crcInitial?: number;
    /**
     * bool: Inverts the CRC if enabled. Defaults to `true`.
     * @yamlKey crc_inverted
     */
    crcInverted?: boolean;
    /**
     * int: CRC polynomial as a hex integer. Defaults to 0x1021.
     * @yamlKey crc_polynomial
     */
    crcPolynomial?: number;
    /**
     * int: Size of the CRC in bytes, either 1 or 2. Defaults to 2.
     * @yamlKey crc_size
     */
    crcSize?: number;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): SPI chip select pin.
     * @yamlKey cs_pin
     */
    csPin: Pin;
    /** @yamlKey data_rate */
    dataRate?: unknown;
    /** frequency: Transmitter FSK frequency deviation, values range from 0 to 100 kHz. Defaults to `5kHz`. */
    deviation?: number;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): Digital IO pin 1.
     * @yamlKey dio1_pin
     */
    dio1Pin: Pin;
    /** frequency: Frequency in Hz of the transceiver. */
    frequency: number;
    /**
     * enum: Valid values are `sx1261`, `sx1262`, `sx1268` or `llcc68`.
     * @yamlKey hw_version
     */
    hwVersion: "llcc68" | "sx1261" | "sx1262" | "sx1268";
    /** enum: Modulation can be `FSK` or `LORA`. */
    modulation: "FSK" | "LORA";
    /**
     * [Automation](https://esphome.io/automations): An automation to perform when a packet has been decoded. Variable x of ...
     * @yamlKey on_packet
     */
    onPacket?: TriggerHandler;
    /**
     * int: Transmitter power, range is from -3 to 15 dBm when `hw_version` is `sx1261` and from -3 to 22 dBm otherwise.
     * @yamlKey pa_power
     */
    paPower?: number;
    /**
     * enum: Transmitter PA ramp, can be `10us`, `20us`, `40us`, `80us`, `200us`, `800us`, `1700us` or `3400us`.
     * @yamlKey pa_ramp
     */
    paRamp?: "10us" | "1700us" | "200us" | "20us" | "3400us" | "40us" | "800us" | "80us";
    /**
     * int: Length of the packet. Maximum length is 255.
     * @yamlKey payload_length
     */
    payloadLength?: number;
    /**
     * int: Minimum length of the preamble in bytes required by the receiver. Preamble detector is disabled if the size is 0...
     * @yamlKey preamble_detect
     */
    preambleDetect?: number;
    /**
     * int: Length of the preamble in bytes to be sent by the transmitter. This value should be larger than `preamble_detect...
     * @yamlKey preamble_size
     */
    preambleSize?: number;
    /** @yamlKey release_device */
    releaseDevice?: boolean;
    /**
     * bool: Used to indicate if DIO2 controls an external RF switch.
     * @yamlKey rf_switch
     */
    rfSwitch: boolean;
    /**
     * [Pin Schema](https://esphome.io/guides/configuration-types#pin-schema): Reset pin.
     * @yamlKey rst_pin
     */
    rstPin: Pin;
    /**
     * bool: Start the receiver automatically on boot or after transmitting.
     * @yamlKey rx_start
     */
    rxStart?: boolean;
    /** enum: Transmitter data shaping can be `GAUSSIAN_BT_0_3`, `GAUSSIAN_BT_0_5`, `GAUSSIAN_BT_0_7`, `GAUSSIAN_BT_1_0` or `... */
    shaping?: "GAUSSIAN_BT_0_3" | "GAUSSIAN_BT_0_5" | "GAUSSIAN_BT_0_7" | "GAUSSIAN_BT_1_0" | "NONE";
    /** @yamlKey spi_id */
    spiId?: RefProp<__marker_spi_SPIComponent>;
    /** @yamlKey spi_mode */
    spiMode?: "0" | "1" | "2" | "3" | "MODE0" | "MODE1" | "MODE2" | "MODE3";
    /**
     * int: Spreading factor, values range from 6 to 12. Defaults to 7.
     * @yamlKey spreading_factor
     */
    spreadingFactor?: number;
    /**
     * list: Synchronization bytes, list of 1 to 8 bytes, found after the preamble and before the payload.
     * @yamlKey sync_value
     */
    syncValue?: Array<number>;
    /**
     * [Time](https://esphome.io/guides/configuration-types#time): The time needed for the TCXO to stabilize.
     * @yamlKey tcxo_delay
     */
    tcxoDelay?: TimePeriod;
    /**
     * enum: Reference voltage of the external TCXO controlled by DIO3. If there is no TCXO this should be set to `NONE`. Va...
     * @yamlKey tcxo_voltage
     */
    tcxoVoltage?: "1_6V" | "1_7V" | "1_8V" | "2_2V" | "2_4V" | "2_7V" | "3_0V" | "3_3V" | "NONE";
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            sx126x: Sx126xProps & ComponentProps<__marker_sx126x_SX126x>;
        }
    }
}
