// AUTO-GENERATED — DO NOT EDIT.
// Regenerate with: pnpm codegen

/* eslint-disable */

import type { ComponentProps, Pin, RefProp } from "../../types";
import type { _CoreComponent } from "../bases";
import type { spi_SPIComponent, sx126x_SX126x } from "../markers";
export interface Sx126xTcxoDelayProps {
    days?: unknown;
    hours?: unknown;
    minutes?: unknown;
    seconds?: unknown;
    milliseconds?: unknown;
    microseconds?: unknown;
}
export interface Sx126xProps extends _CoreComponent {
    /** enum: Bandwidth can be `4_8kHz`, `5_8kHz`, `7_3kHz`, `9_7kHz`, `11_7kHz`, `14_6kHz`, `19_5kHz`, `23_4kHz`, `29_3kHz`,... */
    bandwidth?: "4_8kHz" | "5_8kHz" | "7_3kHz" | "9_7kHz" | "11_7kHz" | "14_6kHz" | "19_5kHz" | "23_4kHz" | "29_3kHz" | "39_0kHz" | "46_9kHz" | "58_6kHz" | "78_2kHz" | "93_8kHz" | "117_3kHz" | "156_2kHz" | "187_2kHz" | "234_3kHz" | "312_0kHz" | "373_6kHz" | "467_0kHz" | "7_8kHz" | "10_4kHz" | "15_6kHz" | "20_8kHz" | "31_3kHz" | "41_7kHz" | "62_5kHz" | "125_0kHz" | "250_0kHz" | "500_0kHz";
    /** int: Bit rate of the signal. Normally the inverse of the bit duration, eg 1 / 208 us is 4800 bps. */
    bitrate?: number;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): Busy pin.
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
     * bool: Inverts the CRC if enabled. Defaults to `true`.
     * @yamlKey crc_inverted
     */
    crcInverted?: boolean;
    /**
     * int: Size of the CRC in bytes, either 1 or 2. Defaults to 2.
     * @yamlKey crc_size
     */
    crcSize?: number;
    /**
     * int: CRC polynomial as a hex integer. Defaults to 0x1021.
     * @yamlKey crc_polynomial
     */
    crcPolynomial?: unknown;
    /**
     * int: Initial CRC value as a hex integer. Defaults to 0x1D0F.
     * @yamlKey crc_initial
     */
    crcInitial?: unknown;
    /** frequency: Transmitter FSK frequency deviation, values range from 0 to 100 kHz. Defaults to `5kHz`. */
    deviation?: unknown;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): Digital IO pin 1.
     * @yamlKey dio1_pin
     */
    dio1Pin: Pin;
    /** frequency: Frequency in Hz of the transceiver. */
    frequency: unknown;
    /**
     * enum: Valid values are `sx1261`, `sx1262`, `sx1268` or `llcc68`.
     * @yamlKey hw_version
     */
    hwVersion: "sx1261" | "sx1262" | "sx1268" | "llcc68";
    /** enum: Modulation can be `FSK` or `LORA`. */
    modulation: "LORA" | "FSK";
    /**
     * [Automation](/automations): An automation to perform when a packet has been decoded. Variable x of type `std::vector<...
     * @yamlKey on_packet
     */
    onPacket?: () => void;
    /**
     * int: Transmitter power, range is from -3 to 15 dBm when `hw_version` is `sx1261` and from -3 to 22 dBm otherwise.
     * @yamlKey pa_power
     */
    paPower?: number;
    /**
     * enum: Transmitter PA ramp, can be `10us`, `20us`, `40us`, `80us`, `200us`, `800us`, `1700us` or `3400us`.
     * @yamlKey pa_ramp
     */
    paRamp?: "10us" | "20us" | "40us" | "80us" | "200us" | "800us" | "1700us" | "3400us";
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
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): Reset pin.
     * @yamlKey rst_pin
     */
    rstPin: Pin;
    /**
     * bool: Start the receiver automatically on boot or after transmitting.
     * @yamlKey rx_start
     */
    rxStart?: boolean;
    /**
     * bool: Used to indicate if DIO2 controls an external RF switch.
     * @yamlKey rf_switch
     */
    rfSwitch: boolean;
    /** enum: Transmitter data shaping can be `GAUSSIAN_BT_0_3`, `GAUSSIAN_BT_0_5`, `GAUSSIAN_BT_0_7`, `GAUSSIAN_BT_1_0` or `... */
    shaping?: "GAUSSIAN_BT_0_3" | "GAUSSIAN_BT_0_5" | "GAUSSIAN_BT_0_7" | "GAUSSIAN_BT_1_0" | "NONE";
    /**
     * int: Spreading factor, values range from 6 to 12. Defaults to 7.
     * @yamlKey spreading_factor
     */
    spreadingFactor?: number;
    /**
     * list: Synchronization bytes, list of 1 to 8 bytes, found after the preamble and before the payload.
     * @yamlKey sync_value
     */
    syncValue?: Array<unknown>;
    /**
     * enum: Reference voltage of the external TCXO controlled by DIO3. If there is no TCXO this should be set to `NONE`. Va...
     * @yamlKey tcxo_voltage
     */
    tcxoVoltage?: "1_6V" | "1_7V" | "1_8V" | "2_2V" | "2_4V" | "2_7V" | "3_0V" | "3_3V" | "NONE";
    /**
     * [Time](/guides/configuration-types#time): The time needed for the TCXO to stabilize.
     * @yamlKey tcxo_delay
     */
    tcxoDelay?: Sx126xTcxoDelayProps;
    /** @yamlKey spi_id */
    spiId?: RefProp<spi_SPIComponent>;
    /** @yamlKey data_rate */
    dataRate?: unknown;
    /** @yamlKey spi_mode */
    spiMode?: "0" | "1" | "2" | "3" | "MODE0" | "MODE1" | "MODE2" | "MODE3";
    /** @yamlKey release_device */
    releaseDevice?: boolean;
    /**
     * [Pin Schema](/guides/configuration-types#pin-schema): SPI chip select pin.
     * @yamlKey cs_pin
     */
    csPin: Pin;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            sx126x: Sx126xProps & ComponentProps<sx126x_SX126x>;
        }
    }
}
